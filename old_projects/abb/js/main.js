import vec, { add, half, mul, div, sub, pipe, align, normalize, reverse } from "./engine/factories/vector.js";
import entity                                                             from "./engine/factories/entity.js";
import { makeDrawAll, makeUpdateAll, spliceAll }                          from "./engine/functions/loopAll.js";
import createCanvas                                                       from "./engine/promises/canvas.js";
import createKeys                                                         from "./engine/promises/keys.js";
import { loadSprites, loadAudio, loadJSON }                               from "./engine/promises/assets.js";
import setupSwitchLevel                                                   from "./states/switchLevel.js";
import { setupSettings }                                                  from "./states/settings.js";
import setupStartScreen                                                   from "./states/startScreen.js";
import setupHome                                                          from "./states/home.js";
import setupShop, { emptyProgress, updateProgress }                       from "./states/shop.js";
import levelTemplates, { difficultLevelTemplates }                        from "./levelTemplates.js";
import getClouds                                                          from "./clouds.js";
import getRain                                                            from "./rain.js";
import getMove                                                            from "./move.js";
import player                                                             from "./player.js";
import button                                                             from "./button.js";
import createLevel, { strEach, set }                                      from "./level.js";

const buttonImgs = [
    "arrow-right",
    "arrow-left",
    "play",
    "exit",
    "shop",
    "convert",
    "empty",
    "empty_x120",
    "empty_x200",
    "settings",
    "audio",
    "audio-off",
    "on",
    "off",
].map(x => "buttons/" + x);

const obstacleImgs = [];
for(let i = 0; i < 30; i++){
    obstacleImgs.push("obstacles/" + (30 + i*30));
}

const wallImgs = [];
for(let i = 0; i < 30; i++){
    wallImgs.push("walls/" + (30 + i*30));
}

const obstacleGrassImgs = [];
for(let i = 0; i < 30; i++){
    obstacleGrassImgs.push("grass/" + (30 + i*30));
}

Promise.all([
    createCanvas(900, 600),
    createKeys(
        "w",
        "a",
        "s",
        "d",
        "W",
        "A",
        "S",
        "D",
        "h",
        "H",
        " ",
        "ArrowUp",
        "ArrowLeft",
        "ArrowRight",
    ),
    loadSprites(
        "shadow-p",
        "background-normal",
        "background-rain",
        "player",
        "player-jump",
        "player-purple",
        "player-jump-purple",
        "obstacle",
        "obstacle-grass",
        "box",
        "box-particle",
        "box-of-gold",
        "box-of-gold-particle",
        "cloud",
        "helper",
        "converter",
        "helper-big",
        "point",
        "grass",
        "rare-grass",
        "grass-particle",
        "enemy",
        "enemy-piece",
        "boss",
        "crown",
        "death-counter",
        "rain",
        "door",
        "door-button",
        "rainbow",
        "rock",
        ...buttonImgs,
        ...obstacleImgs,
        ...wallImgs,
        ...obstacleGrassImgs,
    ),
    loadAudio(
        0.3,
        "jump",
        "talk",
        "point",
        "main",
        "home",
        "yes-btn",
        "not-btn",
        "door-btn",
        "tick",
        "last-tick",
    ),
    loadJSON(
        "playerFrames",
        "helperFrames",
        "converterFrames",
    ),
]).then(([ { c, ctx, scale, pointer }, keys, sprites, audio, resJSON  ]) => {
    
    document.getElementById("loading").style.display = "none";

    //initialize
    const WORLD = {
        c,
        width: 900,
        height: 600,
        pointer,
        keys,
        sprites,
        audio,
        JSON: resJSON,
        timeScl: (1/60)*1000,
        state: undefined,
        newSpawn: undefined,
        spliceAll,
        deaths: 0,
        buttons: [],
        states: {
            setupHome,
            setupShop,
            setupSettings,
            setupSwitchLevel,
            setupStartScreen,
        },
        settings: {
            cloudsOn: true,
        },
        levelTemplates,
        currentLevel: 0,
        weather: "normal",
        saveProgress(){
            //localStorage.progress = JSON.stringify(WORLD.progress);
        }
    };

	//set progress
	WORLD.progress = emptyProgress();
	WORLD.furtestLevel = 0;
	WORLD.deaths = 0;
    
	/*
    //handle progress
    if(localStorage.progress === undefined || localStorage.furtestLevel === undefined || localStorage.deaths === undefined){
        localStorage.clear();
    }
    WORLD.progress = JSON.parse(localStorage.progress);
    if(WORLD.progress.difficultLevelTimes === undefined) WORLD.progress.difficultLevelTimes = ["00:00", "00:00"]; 
    updateProgress(WORLD.progress);
    WORLD.currentLevel = JSON.parse(localStorage.furtestLevel);
    WORLD.deaths = localStorage.deaths;
	*/


    WORLD.drawAll = makeDrawAll(ctx, WORLD);
    WORLD.updateAll = makeUpdateAll(WORLD);

    //fix some audio
    audio.sounds["door-btn"].originVolume = 0.5;
    audio.sounds.main.originVolume = 0.5;
    audio.setVolume();

    WORLD.state = WORLD.states.setupStartScreen;

    let justStarted = true;

    WORLD.states.setup = () => {

        const newLevel = createLevel(WORLD.levelTemplates[WORLD.currentLevel], 0);
            
        //initialize level
        WORLD.timer = 0;
        WORLD.background = newLevel.background;
        WORLD.walls = newLevel.walls;
        WORLD.obstacles = newLevel.obstacles;
        WORLD.box = newLevel.box;
        WORLD.deathCounter = newLevel.deathCounter;
        WORLD.points = newLevel.points;
        WORLD.midground = newLevel.midground;
        WORLD.player = newLevel.player;
        WORLD.enemies = newLevel.enemies;
        WORLD.foreground = newLevel.foreground;
        WORLD.shadows = newLevel.shadows;
        if(WORLD.settings.cloudsOn) WORLD.foreground = WORLD.foreground.concat(getClouds());
        if(WORLD.weather === "rain") WORLD.background = WORLD.background.concat(getRain());
        WORLD.deathCounter.deaths = WORLD.deaths;
        //add settings button
        WORLD.midground.push(button({
            pos: vec(WORLD.width-25, 5),
            size: vec(20, 20),
            img: "buttons/settings",
            action(){
                WORLD.state = WORLD.states.setupSettings;
            }
        }));
        const audioBtn = button({
            pos: vec(WORLD.width-50, 5),
            size: vec(20, 20),
            img: "buttons/audio",
        });
        audioBtn.action = () => {
            if(WORLD.audio.sounds["main"].volume > 0){
                WORLD.audio.setVolume(0);
                audioBtn.img = "buttons/audio-off";
            }
            else{
                WORLD.audio.setVolume();
                audioBtn.img = "buttons/audio";
            }
        }
        WORLD.midground.push(audioBtn);
        //handle graphics settings
        if(!WORLD.settings.cloudsOn) WORLD.clouds = [];
        
        WORLD.startingAlpha = 1;
        WORLD.nextLevelCounter = undefined;
        WORLD.getHomeCounter = undefined;
        WORLD.offset = vec(0, 0);
        
		/*
        if(JSON.parse(localStorage.furtestLevel) === WORLD.levelTemplates.length-1 && justStarted)
            WORLD.state = WORLD.states.setupHome;
			*/
        WORLD.state = WORLD.states.game;
        justStarted = false;
    }

    /*WORLD.currentLevel = 0;
    WORLD.difficultLevel = true;
    WORLD.state = WORLD.states.setup;
    WORLD.levelTemplates = [difficultLevelTemplates[1]];
    WORLD.state = WORLD.states.setup;*/

    WORLD.controlPlayerKeys = () => {
        if(keys.a.down || keys.A.down || keys.ArrowLeft.down) WORLD.player.dir = -1;
        if(keys.d.down || keys.D.down || keys.ArrowRight.down) WORLD.player.dir = 1;
        if((keys.a.down && keys.d.down
        || !keys.a.down && !keys.d.down)
        && (keys.A.down && keys.D.down
        || !keys.A.down && !keys.D.down)
        && (keys.ArrowLeft.down && keys.ArrowRight.down
        || !keys.ArrowLeft.down && !keys.ArrowRight.down)) WORLD.player.dir = 0;
        if(keys.w.pressed || keys.W.pressed || keys[" "].pressed || keys.ArrowUp.pressed){
            WORLD.player.jump(WORLD);
        }else if((keys.w.upped || keys.W.upped || keys[" "].upped || keys.ArrowUp.upped) && WORLD.player.velocity.y < 0) WORLD.player.velocity.y = 0;
    }
    
    WORLD.states.game = () => {

        WORLD.controlPlayerKeys();

        //update logic
        WORLD.updateAll(
            WORLD.box,
            WORLD.enemies,
            WORLD.player,
            WORLD.points,
            WORLD.foreground,
            WORLD.walls,
            WORLD.background,
            WORLD.midground,
        );
    
        //check level end states
        if(WORLD.points.length <= 0 && WORLD.nextLevelCounter === undefined)
            WORLD.nextLevelCounter = 4;
        if(WORLD.nextLevelCounter > 0){
            WORLD.nextLevelCounter -= WORLD.timeScl/1000;
        }
        if(WORLD.points.length <= 0 && WORLD.nextLevelCounter <= 1){
            if(!WORLD.difficultLevel){
                WORLD.nextLevelCounter = undefined;
                WORLD.state = WORLD.states.setupSwitchLevel;
            }else{
                WORLD.progress.difficultLevelTimes[WORLD.currentLevel] = (Math.floor(WORLD.timer/60) < 10 ? "0" : "") + Math.floor(WORLD.timer/60) + ":" + (Math.floor(WORLD.timer%60) < 10 ? "0" : "") + Math.floor(WORLD.timer%60);
                WORLD.difficultLevel = false;
                WORLD.levelTemplates = levelTemplates;
                WORLD.currentLevel = levelTemplates.length-1;
                WORLD.saveProgress();
                WORLD.state = WORLD.states.setupHome;
            }
        }
        //go home
        if(keys.h.down || keys.H.down){
            WORLD.goHomeCounter = 3;
        }
        if(WORLD.goHomeCounter > 0){
            WORLD.goHomeCounter -= WORLD.timeScl/1000;
        }
        if(WORLD.goHomeCounter < 1){
            WORLD.goHomeCounter = undefined;
            if(WORLD.difficultLevel){
                WORLD.difficultLevel = false;
                WORLD.levelTemplates = levelTemplates;
                WORLD.currentLevel = levelTemplates.length-1;
            }
            WORLD.state = WORLD.states.setupHome;
        }
    
        WORLD.draw();
    }

    WORLD.draw = () => {
        ctx.save();
        ctx.scale(c.scale, c.scale);
        ctx.translate(WORLD.offset.x, WORLD.offset.y);
        ctx.drawImage((WORLD.weather === "normal" ? sprites["background-normal"] : sprites["background-rain"]), 0, 0, WORLD.width, WORLD.height);
        ctx.drawImage((WORLD.weather === "normal" ? sprites["background-normal"] : sprites["background-rain"]), WORLD.width, 0, WORLD.width, WORLD.height);
        WORLD.drawAll(
            WORLD.background,
            WORLD.walls,
            WORLD.obstacles,
            WORLD.box,
            WORLD.deathCounter,
            WORLD.points,
            WORLD.midground,
            WORLD.player,
            WORLD.enemies,
            WORLD.foreground,
            WORLD.shadows,
        );
        //draw nextLevelCounter
        if(WORLD.nextLevelCounter){
            ctx.fillStyle = "red";
            ctx.font = "25px game";
            ctx.fillText(Math.floor(WORLD.nextLevelCounter), WORLD.player.center.x - 7.5, WORLD.player.pos.y-5);
        }
        //draw goHomeCounter
        if(WORLD.goHomeCounter){
            ctx.fillStyle = "#d6b420";
            ctx.font = "25px game";
            ctx.fillText(Math.floor(WORLD.goHomeCounter), WORLD.player.center.x - 7.5, WORLD.player.pos.y-5);
        }

        //make shade in beginning of level
        if(WORLD.startingAlpha > 0){
            ctx.fillStyle = "black";
            ctx.globalAlpha = WORLD.startingAlpha;
            ctx.fillRect(-900, 0, WORLD.width*2, WORLD.height);
            ctx.globalAlpha = 1;
            WORLD.startingAlpha -= 0.05;
        }
        //darken on rainy days
        if(WORLD.weather === "rain"){
            ctx.fillStyle = "black";
            ctx.globalAlpha = 0.2;
            ctx.fillRect(0, 0, c.width*2, c.height*2);
            ctx.globalAlpha = 1;
        }
        //draw last level score
        if(WORLD.currentLevel === WORLD.levelTemplates.length-1 && WORLD.state === WORLD.states.game && !WORLD.difficultLevel){
            ctx.fillStyle = "white";
            ctx.font = "40px game"
            ctx.fillText("Victory!", 330, 150);
            ctx.font = "20px game";
            if(WORLD.deaths === 0 || WORLD.deaths === "0") ctx.fillText("flawless!", 360, 190);
            else if(WORLD.deaths === 1 || WORLD.deaths === "1") ctx.fillText("And you only died once!", 280, 190);
            else ctx.fillText("And you only died " + WORLD.deaths + " times!", 270, 190);
        }
        //draw timer on difficult levels
        if(WORLD.difficultLevel){
            WORLD.timer += 1/60;
            ctx.fillStyle = "white";
            ctx.font = "20px game";
            ctx.fillText((Math.floor(WORLD.timer/60) < 10 ? "0" : "") + Math.floor(WORLD.timer/60) + ":" + (Math.floor(WORLD.timer%60) < 10 ? "0" : "") + Math.floor(WORLD.timer%60), 30, 30);
        }

        ctx.restore();
    }
    let keyAlpha = 0.8;
    let keyPosY = 205;
    let keyPosChangeDir = 0.1;

    let lastTime = 0;
    let accTime = 0;
    let lastState = undefined;

    const loop = (time = 0) => {
        accTime += time - lastTime;
        lastTime = time;
        while(accTime > WORLD.timeScl){
            if(lastState !== WORLD.state) WORLD.saveProgress();
            lastState = WORLD.state;
            WORLD.state(WORLD, ctx);
            WORLD.pointer.pressed = false;
            WORLD.keys.reset();
            accTime -= WORLD.timeScl;
        }
        requestAnimationFrame(loop);
    }
    
    loop();
});

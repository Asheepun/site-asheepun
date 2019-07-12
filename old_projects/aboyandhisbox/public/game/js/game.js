let c, ctx, rows, cols, Delta, map, level, countDown, stage;

const offSet = new Vector(0, 0);

let deaths = 0;

window.onload = () => {
	console.log(introTune)
    introTune.play();
    stage = setup;
    mainLoop();
}

function setup(){
    spliceArrays([
        folieges,
        levels,
        walls,
        platforms,
        poofs,
        helpers,
        enemies,
        players,
        boxes,
        obstacles,
        points,
        texts,
    ]);
    Delta = 0;
    c = document.getElementById("mainCanvas");
    ctx = c.getContext("2d");
    console.log();
    c.width = grid(26);
    c.height = grid(16);
    offSet.x = 0;
    offSet.y = 0;
    initializePointer(c, offSet);
    initializeKeyboard({
        fullscreen: c,
        action: togglefs,});
    initializeLevels();
    level = levels[currentLevel];
    map = level.map;
    cols = map.length;
    rows = map[0].length;
    //countDown for when you win the level
    countDown = 0;
    buildWorld();
    mainTune.loop = true;
    stage = game;
}

function game(){
    update();
    draw();
}

function update(){
    updateArrays([
        players,
        points,
        enemies,
        helpers,
        poofs,
        texts,
    ]);
    updateOffSet();
}

function draw(){
    ctx.save();
    ctx.translate(offSet.x, offSet.y);
    drawBackground();
    drawArrays([
        walls,
        platforms,
        poofs,
        boxes,
        obstacles,
        points,
        helpers,
        players,
        folieges,
        enemies,
        texts,
    ]);
    drawLastLevel();
    drawNumbers();
    ctx.restore();
}

function dead(){
    players[0].pos.y += 20;
    updateArrays([enemies, texts]);
    draw();
}

function mainLoop(){
    if(introTune.ended) mainTune.play();
    Delta += 1/30;
    stage();
    window.setTimeout(mainLoop, 1000/30);
}

function drawLastLevel(){
    if(currentLevel === levels.length-1){
        ctx.fillStyle="green";
        ctx.font= (scl/3)*5 + "px Graduate";
        ctx.fillText("You Won!", grid(9), grid(6));
        ctx.fillStyle="black";
        ctx.font= scl + "px Graduate";
        if(deaths > 1) ctx.fillText("And you only died " + deaths + " times!", grid(7), grid(7)+scl/2);
        else if(deaths === 1) ctx.fillText("And you only died once!", grid(7), grid(7)+scl/2);
        else ctx.fillText("Flawless!", grid(10), grid(7)+scl/2);
        ctx.font= (scl/3)*2 + "px Graduate";
        ctx.fillText("Press F to toggle fullscreen.", grid(8), grid(9));
    }
}

function updateOffSet(){
    if(offSet.x > 0) offSet.x = 0;
    if(offSet.x < -rows*scl+c.width) offSet.x = -rows*scl+c.width;
    if(offSet.y > 0) offSet.y = 0;
    if(offSet.y < -cols*scl+c.height) offSet.y = -cols*scl+c.height;
}

function togglefs(){
    if(!(screen.width == window.innerWidth && screen.height == window.innerHeight)){
        scl = 40;
        stage = setup;
    }else{ 
        scl = 30;
        stage = setup;
    }
}

function drawNumbers(){
    ctx.fillStyle="red";
    ctx.font=(scl/3)*4 + "px Graduate";
    if(currentLevel != levels.length-1) 
        ctx.fillText(deaths, c.width/2 - offSet.x, 50 - offSet.y);
    if(countDown > 0)
        ctx.fillText(countDown, players[0].pos.x, players[0].pos.y-20);
}

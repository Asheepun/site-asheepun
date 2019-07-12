import vec, { add, half, mul, div, sub, pipe, align } from "./engine/factories/vector.js";
import entity                                         from "./engine/factories/entity.js";
import { checkCol }                                   from "./engine/functions/colission.js";
import addAnimate                                     from "./engine/functions/animate.js";
import button                                         from "./button.js";
import addTalk                                        from "./talk.js";

const helper = (pos = vec(-30, -30), text = "Hello!") => {
    const that = entity({ 
        pos, 
        img: "helper",
        layer: 1,
    });
    that.state = "still"
    that.dir = "left";
    that.text = text;

    addAnimate(that, {
        delay: 3,
        handleFrames: ({JSON }) => JSON.helperFrames[that.state][that.dir],
    });
    addTalk(that);
    
    that.checkCol = ({ player, audio }) => {
        if(checkCol(that, player)){ 
            if(that.state !== "talking"){
                that.state = "talking";
                audio.play("talk");
            }
        }else that.state = "still";
    }
    that.look = ({ player }) => {
        if(player.pos.x > that.pos.x + that.size.x) that.dir = "right";
        if(player.pos.x + player.size.x < that.pos.x) that.dir = "left";
    }

    that.addUpdateActions("checkCol", "look", "animate", "fixCenter");

    return that;
}

export const converter = (pos) => {
    const that = helper(pos);
    that.img = "converter";
    that.size = vec(30, 60);
    that.fixCenter();
    addAnimate(that, {
        delay: 3,
        handleFrames: ({ JSON }) => JSON.converterFrames[that.state][that.dir],
    });

    const btn = button({
        pos: vec(that.pos.x - 25, that.pos.y - 45),
        size: vec(80, 20),
        img: "buttons/convert",
        action(){
            if(WORLD.progress.completedLevels > 0){
                WORLD.progress.completedLevels--;
                WORLD.progress.coins++;
                WORLD.audio.play("yes-btn");
            }else{
                WORLD.audio.play("not-btn");
            }
        } 
    });
    that.addConverterButton = ({ midground, progress, audio }) => {
        btn.action = () => {
            if(progress.completedLevels > 0){
                progress.completedLevels--;
                progress.coins++;
                audio.play("yes-btn");
            }else{
                audio.play("not-btn");
            }
        } 
        if(that.state === "talking" && midground.indexOf(btn) === -1){
            midground.push(btn);
        }else if(that.state !== "talking" && midground.indexOf(btn) !== -1) midground.splice(midground.indexOf(btn), 1);
    }

    that.drawText = (ctx, { progress, offset }) => {
        if(that.state === "talking"){
            ctx.fillStyle = "white";
            ctx.font = "20px game";
            ctx.fillText("completed", that.pos.x - 39 - offset.x, that.pos.y - 71);
            ctx.fillText("levels: " + (progress.completedLevels - offset.x), that.pos.x - 41, that.pos.y - 50);
            ctx.fillText("coins: " + progress.coins, that.pos.x - 30 - offset.x, that.pos.y - 5);
        }
    }
    that.drawingActions.splice(0, 1);

    that.addDrawingActions("drawText");
    that.addUpdateActions("addConverterButton");

    return that;
}

export const reseter = (pos) => {
    const that = helper(pos);
    addAnimate(that, {
        delay: 3,
        handleFrames: ({ JSON }) => JSON.helperFrames[that.state][that.dir],
    });

    const btn = button({
        pos: vec(that.pos.x - 25, that.pos.y - 45),
        size: vec(80, 20),
        img: "buttons/convert",
        action(){
            if(WORLD.progress.completedLevels > 0){
                WORLD.progress.completedLevels--;
                WORLD.progress.coins++;
                WORLD.audio.play("yes-btn");
            }else{
                WORLD.audio.play("not-btn");
            }
        } 
    });
    that.addConverterButton = (WORLD) => {
        btn.action = () => {
            localStorage.clear();
            WORLD.state = WORLD.states.setup;
        } 
        if(that.state === "talking" && WORLD.midground.indexOf(btn) === -1){
            WORLD.midground.push(btn);
        }else if(that.state !== "talking" && WORLD.midground.indexOf(btn) !== -1) WORLD.midground.splice(WORLD.midground.indexOf(btn), 1);
    }

    that.drawText = (ctx, { progress, offset }) => {
        if(that.state === "talking"){
            ctx.fillStyle = "white";
            ctx.font = "20px game";
            ctx.fillText("Want to get a", that.pos.x - 39 - offset.x, that.pos.y - 71);
            ctx.fillText("better score?", that.pos.x - 39 - offset.x, that.pos.y - 46);
        }
    }
    that.drawingActions.splice(0, 1);

    that.addDrawingActions("drawText");
    that.addUpdateActions("addConverterButton");

    return that;
}

export default helper;
import vec from "./engine/factories/vector.js";

const addTalk = (that) => {
    that.textPos = vec(0, 0);
    that.talk = (ctx, { width }) => {
        if(that.state === "talking"){
            that.textPos = vec(that.center.x - (that.text.length / 2) * 12.5, that.pos.y-15);
            while(that.textPos.x < 15){
                that.textPos.x += 1;
            }
            while(that.textPos.x > width-15-(that.text.length / 2) * 12.5){
                that.textPos.x -= 1;
            }
            ctx.fillStyle = "white";
            ctx.font = "20px game";
            ctx.fillText(that.text, that.textPos.x, that.textPos.y);
        }
    }
    that.addDrawingActions("talk");
}

export default addTalk;
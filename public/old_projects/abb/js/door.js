import entity                     from "./engine/factories/entity.js";
import vec                        from "./engine/factories/vector.js";
import { checkCol }               from "./engine/functions/colission.js";
import { confettiParticleEffect } from "./obstacles.js";

export const door = (pos, i) => {
    const that = entity({
        pos,
        size: vec(30, 90),
        img: "door",
    });
    that.index = i;

    return that;
}

export const key = (pos, i) => {
    const that = entity({
        pos,
        img: "door-button"
    });
    that.down = false;
    that.index = i;
    
    let col = false;
    that.checkCol = ({ enemies, player, obstacles, audio, foreground }) => {
        if(!that.down){
            col = checkCol(that, enemies) || checkCol(that, player);
            if(col && col.velocity.y > 0){
                that.down = true;
                obstacles.forEach(o => {
                    if(o.index === that.index){
                        obstacles.splice(obstacles.indexOf(o), 1);
                        confettiParticleEffect(foreground, o.center, 10, 60, 40, "door");
                    }
                });
                that.imgPos = [30, 0, 30, 30];
                audio.play("door-btn");
            }
        }
    }
    that.addUpdateActions("checkCol");

    return that;
}
import vec     from "./engine/factories/vector.js";
import entity  from "./engine/factories/entity.js";
import addMove from "./move.js";
import { set } from "./level.js";

const getClouds = (amount = 20, offset = 0) => {
    const clouds = set();
    //add clouds
    const dist = 900/amount;
    for(let i = 0; i < amount; i++){
        const that = entity({
            pos: vec(dist*i + Math.random()*60 + offset, Math.floor(Math.random()*60)),
            size: vec(60, 30),
            alpha: 0.8,
            img: "cloud",
        });
        addMove(that, {
            dir: 1,
            gravity: 0,
            speed: 0.04,
            oubArea: [-60, -120, 1080, 600],
        });
        
        if(Math.random() < 0.5) that.imgPos[0] += 60;

        that.init = () => {
            that.pos.y = Math.floor(Math.random()*60);
            that.velocity.y = 0;
            that.speed = 0.05;
            if(Math.random() < 0.3) that.speed *= 0.8;
            if(Math.random() < 0.3) that.speed *= 1.2;
        }
        that.init();

        that.handleOubX = () => {
            if(that.velocity.x > 0) that.pos.x = that.oubArea[0];
            that.init();
        }
        that.sineWave = () => {
            that.velocity.y += Math.sin(that.pos.x/3)/2000;
        }
        that.addUpdateActions("sineWave", "fixCenter");

        clouds.push(that);
    }
    return clouds; 
}

export default getClouds;
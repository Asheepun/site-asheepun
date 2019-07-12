import vec                                  from "./engine/factories/vector.js";
import entity                               from "./engine/factories/entity.js";
import { checkCol, checkOub, checkPlatCol } from "./engine/functions/colission.js";

const addMove = (that, { speed = 0.2, gravity = 0.04, dir = 0, oubArea = [0, 0, 900, 600], moveOnGround = false }) => {
    that.dir = dir;
    that.speed = speed;
    that.gravity = gravity;
    that.oubArea = oubArea;
    that.velocity = vec(0, 0);
    that.grounded = false;
    that.maxFallSpeed = 0.4;
    that.moveOnGround = moveOnGround;
    let col, oub, platCol;

    that.move = ({ timeScl, obstacles, box, foreground }) => {

        that.velocity.x = that.dir * that.speed;

        //handlePhysics
        that.velocity.y += that.gravity;
        if(that.velocity.y > that.maxFallSpeed) that.velocity.y = that.maxFallSpeed;

        //moveY
        that.pos.y += that.velocity.y * timeScl;
        col = checkCol(that, obstacles);
        oub = checkOub(that, ...that.oubArea);
        platCol = checkPlatCol(that, box);
        if(col && that.handleColissionY){
            if(!that.grounded && that.velocity.y > 0) 
                hitGroundParticleEffect(foreground, that);
            that.handleColissionY(col);
        }
        if(platCol && that.handlePlatCol) that.handlePlatCol(box);
        if(oub && that.handleOubY) that.handleOubY();
        if(!platCol && !col) that.grounded = false;

        //moveX
        if(!(that.moveOnGround && !that.grounded))that.pos.x += that.velocity.x * timeScl;
        col = checkCol(that, obstacles);
        oub = checkOub(that, ...that.oubArea);
        if(col && that.handleColissionX) that.handleColissionX(col);
        if(oub && that.handleOubX) that.handleOubX();
        
        that.fixCenter();
    }
    
    that.addUpdateActions("move");
}

const hitGroundParticleEffect = (array, object) => {
    for(let i = 0; i <   Math.random()*15; i++){
        const that = entity({
            pos: vec(object.pos.x + Math.random()*(object.size.x-10) + 5, object.pos.y + object.size.y),
            img: "grass-particle",
            size: vec(5, 5),
            imgPos: [0, 0, 5, 5],
            rotation: Math.random()*360,
        });
        if(Math.random() < 0.4) that.img = "player";//uses the edge of the sprites hair
        addMove(that, {
            gravity: 0.02,
        });
        that.velocity.y = -Math.random()*0.2 - 0.1;
        if(that.pos.x > object.center.x) that.dir = 1;
        else that.dir = -1;
        that.speed = Math.random()*0.1;
        let fade = 0.005;
        that.fade = () => {
            fade *= 1.2;
            that.alpha -= fade;
            if(that.alpha <= 0) that.remove();
        }
        that.remove = () => array.splice(array.indexOf(that), 1);
            
        that.addUpdateActions("fade");
        array.push(that);
    }
}

export default addMove;
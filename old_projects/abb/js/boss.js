import vec, { align }             from "./engine/factories/vector.js";
import entity                     from "./engine/factories/entity.js";
import { checkCol }               from "./engine/functions/colission.js";
import { jumper, spawner, ghost}  from "./enemy.js";
import addMove                    from "./move.js";
import addTalk                    from "./talk.js";
import { addHandleColBounce }     from "./handleCol.js";
import { point, movingPoint }     from "./point.js";
import { confettiParticleEffect } from "./obstacles.js";

let createdPoints = 0;

const boss = (pos) => {
    const that = entity({
        pos,
        size: vec(210, 280),
        img: "boss",
    });
    that.jumpSpeed = 0.1;
    that.currentAttack = undefined;
    that.attacking = false;
    that.started = false;
    that.attackingCounter = 0;
    let attackCounter = 0;
    let startCounter = 0;
    let attackTime = 3;

    that.text = "Come 'ere you!";
    that.state = "talking";
    let attackText = ["Are you ready? Ha ha!", "Prepare yourself!", "Watch out for this!"];
    let chargeText = ["Here I come!", "Incoming!!!", "Run or die!"];
    const attacks = [
        getCollectCoinsAttack, 
        getFallingCoinsAttack,
        getGhostAttack,
    ];
    let currentAttackI = undefined;
    let lastAttackI = undefined;

    addTalk(that);

    addMove(that, {
        dir: 0,
        speed: 0,
        gravity: 0.005,
    });
    addHandleColBounce(that);
    
    that.handleOubX = () => {
        that.dir = 0;
        that.speed = 0;
        that.pos.x = Math.floor(that.pos.x/30)*30;
        that.text = attackText[Math.floor(Math.random()*attackText.length)];
    }

    that.jump = () => {
        if(that.grounded){
            that.velocity.y = -that.jumpSpeed;
        }
    }
    that.start = ({ player, width, height, obstacles, foreground, sortEntities }) => {
        if(player.pos.x > 210 && !that.started){
            if(startCounter === 1){
                //cover up
                foreground.push(entity({
                    pos: vec(0, 450),
                    img: "obstacles/30",
                    layer: 5,
                }));
                foreground.push(entity({
                    pos: vec(30, 450),
                    img: "obstacles/30",
                    layer: 5,
                }));
                foreground.push(entity({
                    pos: vec(120, height-60),
                    img: "obstacles/30",
                    layer: 5,
                }));
                foreground.push(entity({
                    pos: vec(150, 420),
                    img: "obstacles/30",
                    layer: 5,
                }));
                foreground.push(entity({
                    pos: vec(180, 420),
                    img: "obstacles/30",
                    layer: 5,
                }));
            }
            if(startCounter < (width-210)/30-16){
                for(let i = 0; i < height/30; i++){
                    obstacles.push(entity({
                        pos: vec(startCounter*30, i*30),
                        img: "obstacles/30",
                        layer: 1,
                    }));
                }
            }

            startCounter += 1;

            if(startCounter > 10){
                that.started = true;
                that.text = attackText[Math.floor(Math.random()*attackText.length)];
            }
        }
    }
    that.attack = (WORLD) => {
        if(that.started){
            if(!that.attacking){
                attackCounter += 1;
            }

            if(attackCounter % (60*attackTime) === 0 && !that.attacking){
                that.text = "";
                that.velocity.y = -0.2;
                that.grounded = false;
                that.loadAttack = true;
                attackTime = 11;
            }
            if(that.loadAttack && that.grounded){
                that.loadAttack = false;
                that.attacking = true;
                //make attack not repeat
                currentAttackI = Math.floor(Math.random()*attacks.length);
                while(currentAttackI === lastAttackI){
                    currentAttackI = Math.floor(Math.random()*attacks.length);
                }
                lastAttackI = currentAttackI;
                that.currentAttack = attacks[currentAttackI](that);
                
                WORLD.startingAlpha = 1;
            }

            if(that.attacking){
                that.currentAttack(WORLD);

                //check if atttack was completed
                if(createdPoints === 0){
                    that.resetAttack(WORLD);
                    that.alpha -= 0.2;
                    that.text = "What?";
                    setTimeout(() => that.text = "...", 3000);
                    return;
                }
                //check if player has colected a point
                if(createdPoints+1 > WORLD.points.length) createdPoints--;
                
                //tick
                if(that.attackingCounter === 0) WORLD.audio.play("last-tick");
                else if(that.attackingCounter % 60 === 0) WORLD.audio.play("tick");

                //end attack
                if(that.attackingCounter <= 0){
                    that.resetAttack(WORLD);
                    that.dir = -1;
                    that.speed = 0.2;
                    that.text = chargeText[Math.floor(Math.random()*chargeText.length)];
                    if(that.alpha < 1) that.alpha += 0.2;
                }

                //handle attacks time
                that.attackingCounter--;
            }
        }
    }
    that.resetAttack = (WORLD) => {
        WORLD.points.splice(1, createdPoints);
        WORLD.enemies.splice(1, WORLD.enemies.length);
        WORLD.foreground.filter(x => x.size.y > 30).forEach(x => WORLD.foreground.splice(WORLD.foreground.indexOf(x), 1));
        that.attacking = false;
        that.attackingCounter = 0;
        createdPoints = 0;
    }
    that.checkDead = ({ enemies, background, midground, points }) => {
        if(that.alpha < 0.4){
            const crown = entity({
                pos: that.pos.copy(),
                size: vec(210, 69),
                img: "crown",
            });
            addMove(crown, {
                dir: 0,
                speed: 0,
                gravity: 0.01,
            });
            crown.velocity.y = -0.2;
            addHandleColBounce(crown);
            background.push(crown);
            corpseParticleEffect({ 
                array: midground, 
                pos: that.center,
            });
            enemies.splice(0, enemies.length);
            points.splice(0, points.length);
            points.push(point(vec(785, 305)));
        }
        if(that.dir > 0) that.text = "";
    }
    that.drawAttackingCounter = (ctx) => {
        if(that.attackingCounter > 0){
            ctx.fillStyle = "red";
            ctx.font = "50px game";
            ctx.fillText(Math.floor(that.attackingCounter/60 + 1), that.center.x - 15, that.pos.y - 5);
        }
    }
    that.drawCrown = (ctx, { sprites }) => {
        ctx.globalAlpha = 1;
        ctx.drawImage(sprites.crown, that.pos.x, that.pos.y, 210, 70);
    }

    that.addUpdateActions("jump", "attack", "start", "checkDead");
    that.addDrawingActions("drawAttackingCounter", "drawCrown");

    return that;
}

const getGhostAttack = (that) => {
    that.attackingCounter = 6*60;
    createdPoints = 2;
    let initialized = false;

    return ({ points, enemies, foreground }) => {
        if(!initialized){
            points.push(point(vec(575, 515)));
            points.push(point(vec(575, 65)));

            const ghost1 = ghost(vec(480, 0));
            const ghostDrawing = ghost(vec(480, 0));
            ghost1.draw = undefined;
            enemies.push(ghost1);
            foreground.push(ghostDrawing);

            initialized = true;
        }
    }
}

const getCollectCoinsAttack = (that) => {
    that.attackingCounter = 9*60;
    createdPoints = 4;
    let initialized = false;

    return ({ points }) => {
        if(!initialized){
            points.push(point(vec(305, 65)));
            points.push(point(vec(305, 515)));
            points.push(point(vec(605, 65)));
            points.push(point(vec(605, 515)));

            initialized = true;
        }
    }
}

const getFallingCoinsAttack = (that) => {
    that.attackingCounter = 9*60;
    createdPoints = 5;
    let initialized = false;

    return ({ points }) => {

        if(!initialized){
            for(let i = 0; i < 5; i++){
                const point = movingPoint(vec(i % 2 === 0 ? 330 : 570, -i*500));
                point.dir = 0;
                points.push(point);
            }
            initialized = true;
        }

    }
}

const corpseParticleEffect = ({ array, pos }) => {
    for(let i = 0; i < 20; i++){
        const that = entity({
            pos: pos.copy().add(Math.random()*170-85, Math.random()*210-105),
            img: "enemy-piece",
            size: vec(15 + Math.floor(Math.random()*10), 15 + Math.floor(Math.random()*10)),
            alpha: 0.4,
        });
        that.imgPos = [0, 0, 15, 15];

        addMove(that, {
            dir: that.pos.x > pos.x ? 1 : -1,
            speed: (0.1*10/that.size.x),
        });
        that.velocity.y = -Math.random()*0.5,
        addHandleColBounce(that);
        that.handleColissionY = object => {
            that.speed = 0;
            that.alpha -= 0.01*Math.random();
            if(that.alpha < 0.02) that.alpha = 0;
            if(that.velocity.y > 0){
                that.grounded = true;
                that.pos.y = object.pos.y - that.size.y;
            }else{
                that.grounded = false;
                that.pos.y = object.pos.y + object.size.y;
            }
            that.velocity.y = 0;
        }
        
        array.push(that);
    }
}

export default boss;
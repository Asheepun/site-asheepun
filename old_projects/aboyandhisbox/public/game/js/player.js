const players = [];

class Player{
    constructor(posX, posY){
        this.pos = new Vector(posX, posY);
        this.size = new Vector(scl, scl);
        this.origin = new Vector(this.pos.x + this.size.x/2, this.pos.y + this.size.y/2);
        this.speed = {up: 0, down: scl/3, left: 0, right: 0,};
        this.jumping = true;
        this.jumps = 0;
        this.image = playerImg;
        this.imgPos = {x: 0, y: 0,};
        this.moveing = {up: false, down: false, left: false, right: false,};
        players.push(this)
    }
    kill(){
        deathSound.load();
        deathSound.play();
        deaths++;
        stage = dead;
        window.setTimeout(()=>{stage = setup;}, 2000);
    };
    draw(){
        ctx.drawImage(this.image,
            (this.image.width/3)*Math.floor(this.imgPos.x), this.image.height/2*this.imgPos.y,
            this.image.width/3, this.image.height/2-1,
            this.pos.x, this.pos.y, this.size.x, this.size.y);
    }
    update(){
        this.origin.x = this.pos.x + this.size.x/2;
        this.origin.y = this.pos.y + this.size.y/2;

        if(keys.w.down){
            if(!this.jumping){
                jumpSound.load();
                jumpSound.play();
                this.jumping = true;
                this.jumps ++;
                this.speed.up = this.speed.down*2;
                stopJump(this, 400);
            }
        }else {
            stopJump(this);
            this.jumping = false;
        }if(keys.a.down){
            this.speed.left = scl/6;
            this.moveing.left = true;
        }else{
            this.speed.left = 0;
            this.moveing.left = false;
        }
        if(keys.d.down){
            this.speed.right = scl/6;
            this.moveing.right = true;
        }else{
            this.speed.right = 0;
            this.moveing.right = false;
        }

        let oub = checkOub(this, map);
        if(oub.up){
            this.pos.y += scl/3;
            stopJump(this);
        }
        if(oub.down){
            this.kill(); 
            return;
        }if(oub.left) this.pos.x += this.speed.left;
        if(oub.right) this.pos.x -= this.speed.right;

        let col = checkSidesOnGrid(this, "#", map);

        if(!col.down){
            this.pos.y += this.speed.down;
            this.jumping = true;
        }if(!col.up ){
            this.pos.y -= this.speed.up;
        }else stopJump(this);
        if(!col.right)
            this.pos.x += this.speed.right;
        if(!col.left )
            this.pos.x -= this.speed.left;

        col = checkColission(this, boxes);
        if(col.down){
            this.pos.y = col.object.pos.y - this.size.x;
            if(!keys.w.down) this.jumping = false;
        }

        col = checkColission(this, platforms);
        if(col.down){
            this.pos.y = col.object.pos.y - this.size.x;
            if(!keys.w.down) this.jumping = false;
        }

        col = checkVectorColission(this.origin, enemies);
        if(col) this.kill();

        offSet.x = -this.pos.x + c.width/2 + this.size.x/2;
        offSet.y = -this.pos.y + c.height/2 + this.size.y/2;

        //animation
        if(this.moveing.right === true
        || this.moveing.left === true){
            if(this.imgPos.x < 1) this.imgPos.x = 1;
            this.imgPos.x += (1/30)*6;
            if(this.imgPos.x >= 3) this.imgPos.x = 1;
        }else this.imgPos.x = 0;

        if(pointer.pos.x > this.pos.x + this.size.x/2)
            this.imgPos.y = 0;
        else this.imgPos.y = 1;

        placeBox();
    }
}

function stopJump(character, time = 0){
    if(character.jumps != undefined){
        let jumps = character.jumps;
        window.setTimeout(()=>{hej(jumps);}, time);
        function hej(jumps){
            if(character.jumps === jumps)
                character.speed.up = 0;
        }
    }else character.speed.up = 0;
}

const enemies = new Array();

class Enemy{
    constructor(posX, posY, speedX, speedY, sizeX = scl, sizeY = scl){
        this.pos = new Vector(posX, posY);
        this.size = new Vector(sizeX, sizeY);
        this.speed = new Vector(speedX, speedY);
        this.image = enemyImg;
    }
    draw(){
        ctx.drawImage(this.image,
            this.pos.x, this.pos.y, this.size.x, this.size.y);
    }
    update(){
        this.pos.add(this.speed);
        
        let col = checkColission(this, obstacles);
        let oub = checkOub(this, map);
        if(col.hori || oub.hori) this.speed.x *= -1;
        if(col.vert || oub.vert) this.speed.y *= -1;
    }
}

class Searcher{
    constructor(posX, posY, sizeX = scl, sizeY = scl, spd = scl/10){
        this.pos = new Vector(posX, posY);
        this.size = new Vector(sizeX, sizeY);
        this.speed = new Vector(0, 0);
        this.image = enemyImg;
        this.spd = spd;
    }
    draw(){
        ctx.drawImage(this.image,
            this.pos.x, this.pos.y, this.size.x, this.size.y);
    }
    update(){
        this.pos.add(this.speed);

        players.forEach(player => {
            if(player.pos.x + 5 >= this.pos.x && player.pos.x + player.size.x - 5 <= this.pos.x + this.size.x){
                if(player.pos.y > this.pos.y){
                    this.speed.x = 0;
                    this.speed.y = this.spd;
                }
                else{
                    this.speed.x = 0;
                    this.speed.y = -this.spd;
                }
            }
            else if(player.pos.y + 5 >= this.pos.y && player.pos.y + player.size.y - 5 <= this.pos.y + this.size.y){
                if(player.pos.x > this.pos.x){
                    this.speed.y = 0;
                    this.speed.x = this.spd;
                }
                else{
                    this.speed.y = 0;
                    this.speed.x = -this.spd;
                }
            }
        });
    }
}

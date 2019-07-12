const poofs = new Array();

class Poof{
    constructor(x ,y){
        this.pos = {x: x, y: y};
        this.size = {x: scl, y: scl};
        this.speed = {x: 0, y: 5};
        this.image = boxImg;
    }
    draw(poof){
        ctx.drawImage(this.image,this.pos.x, this.pos.y, this.size.x, this.size.y);
    }
    update(poof){
        this.pos.x += this.speed.x;
        this.pos.y += this.speed.y;
    }
}
const helpers = new Array();

class Helper{
    constructor(posX, posY, text, imgY = 0){
        this.pos = new Vector(posX, posY);
        this.size = new Vector(scl, scl);
        this.text = text;
        this.talking = false;
        this.image = helperImg;
        this.imgPos = new Vector(0, imgY);
    }
    draw(){
        ctx.drawImage(this.image,
        this.image.width/4*Math.floor(this.imgPos.x), this.image.height/2*this.imgPos.y, this.image.width/4, this.image.height/2,
        this.pos.x, this.pos.y, this.size.x, this.size.y);
        if(this.talking){
            ctx.fillStyle="white";
            ctx.font=scl/2 + "px Graduate";
            let posX =  this.pos.x + this.size.x/2 - (this.text.length*scl/2)/4;
            if(posX < 0) posX = 0;
            if(posX > cols*scl) posX = this.pos.x - (this.text.length*scl)/4 - this.size.x/2;
            ctx.fillText(this.text, posX, this.pos.y - 15);
        }
    }
    update(helper){
        if(this.talking){
            if(this.imgPos.x <= 3)this.imgPos.x += 6/30;
            else this.imgPos.x = 0;
        }else this.imgPos.x = 0;

        players.forEach(player => {
            let col = checkColission(this, players);
            if(col.hit){
                if(!this.talking){
                    helloSound.load();
                    helloSound.play();
                }
                this.talking = true;
            }else this.talking = false;
        });

    }
}

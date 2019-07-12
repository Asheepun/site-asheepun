const points = new Array();

class Point{
    constructor(posX, posY){
        this.pos = new Vector(posX, posY);
        this.size = new Vector(scl/2, scl/2);
        this.image = pointImg;
        points.push(this);
    }
    draw(){
        ctx.drawImage(this.image,
            this.pos.x, this.pos.y, this.size.x, this.size.y);
    }
    update(){
        let col = checkColission(this, players);
        if(col.hit){
            points.splice(points.indexOf(this), 1);
            pointSound.play();
        }
        if(points.length === 0){
            countDown = 3;
            window.setTimeout(()=>{countDown--;}, 1000);
            window.setTimeout(()=>{countDown--;}, 2000);
            window.setTimeout(()=> {
                if(countDown){
                    if(stage === game){
                        currentLevel ++;
                        stage = setup;
                    }
                }
            }, 3000);
        }
    }
}
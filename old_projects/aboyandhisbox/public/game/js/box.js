const boxes = new Array();

class Box{
    constructor(posX, posY){
        this.pos = new Vector(posX, posY);
        this.size = {x: scl, y: scl};
        this.image = boxImg;
    }
    draw(){
        ctx.drawImage(this.image,
            this.pos.x, this.pos.y, this.size.x, this.size.y);
    }
}

function placeBox(){
    if(pointer.down){
            boxes.splice(0, boxes.length);
            if(walls.length > 0){
                    if(!checkVectorColission(pointer.pos, walls)){
                        let olle = new Box(pointer.pos.x - scl/2,
                                           pointer.pos.y - scl/2);
                        if(olle.pos.x <= 15)
                            olle.pos.x = 0;
                        if(olle.pos.y <= 15)
                            olle.pos.y = 0;
                        if(olle.pos.x % scl > 15){
                            for(let i = Math.floor(olle.pos.x); i < olle.pos.x + scl; i++){
                                if(i % scl === 0)olle.pos.x = i;
                            }
                        }
                        else{
                            for(let i = Math.floor(olle.pos.x); i > olle.pos.x-scl; i--){
                                if(i % scl === 0)olle.pos.x = i;
                            }
                        }
                        if(olle.pos.y % scl > 15){
                            for(let i = Math.floor(olle.pos.y); i < olle.pos.y + scl; i++){
                                if(i % scl === 0)olle.pos.y = i;
                            }
                        }
                        else{
                            for(let i = Math.floor(olle.pos.y); i > olle.pos.y-scl; i--){
                                if(i % scl === 0)olle.pos.y = i;
                            }
                        }
                        boxes.push(olle);
                    }else{
                        let olle = new Poof(pointer.pos.x - scl/2,
                                            pointer.pos.y - scl/2);
                        if(olle.pos.x % scl > 15){
                            for(let i = Math.floor(olle.pos.x); i < olle.pos.x + scl; i++){
                                if(i % scl === 0)olle.pos.x = i;
                            }
                        }
                        else{
                            for(let i = Math.floor(olle.pos.x); i > olle.pos.x-scl; i--){
                                if(i % scl === 0)olle.pos.x = i;
                            }
                        }
                        if(olle.pos.y % scl > 15){
                            for(let i = Math.floor(olle.pos.y); i < olle.pos.y + scl; i++){
                                if(i % scl === 0)olle.pos.y = i;
                            }
                        }
                        else{
                            for(let i = Math.floor(olle.pos.y); i > olle.pos.y-scl; i--){
                                if(i % scl === 0)olle.pos.y = i;
                            }
                        }
                        boxes.splice(0, boxes.length);
                        poofs.push(olle);
                        window.setTimeout(poof => {poofs.splice(0, 1);}, 300);
                    }
            }
            else{
                let olle = new Box();
                olle.pos.x = pointer.pos.x - scl/2;
                olle.pos.y = pointer.pos.y - scl/2;
                if(olle.pos.x <= 15)
                    olle.pos.x = 0;
                if(olle.pos.y <= 15)
                    olle.pos.y = 0;
                if(olle.pos.x % scl > 15){
                    for(let i = Math.floor(olle.pos.x); i < olle.pos.x + scl; i++){
                        if(i % scl === 0)olle.pos.x = i;
                    }
                }
                else{
                    for(let i = Math.floor(olle.pos.x); i > olle.pos.x-scl; i--){
                        if(i % scl === 0)olle.pos.x = i;
                    }
                }
                if(olle.pos.y % scl > 15){
                    for(let i = Math.floor(olle.pos.y); i < olle.pos.y + scl; i++){
                        if(i % scl === 0)olle.pos.y = i;
                    }
                }
                else{
                    for(let i = Math.floor(olle.pos.y); i > olle.pos.y-scl; i--){
                        if(i % scl === 0)olle.pos.y = i;
                    }
                }
                boxes.push(olle);
            }
        }
}
class Vector{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.mag = Math.sqrt(this.x*this.x + this.y*this.y);
    }
    divide(div){
        this.x = this.x/div;
        this.y = this.y/div;
    }
    multiply(mult){
        this.x *= mult;
        this.y *= mult;
    }
    add(vector){
        this.x += vector.x;
        this.y += vector.y;
    }
    sub(vector){
        this.x -= vector.x;
        this.y -= vector.y;
    }
    normalize(){
        this.x = this.x/this.mag;
        this.y = this.y/this.mag;        
    }
    getDifference(vector){
        return {x: this.x - vector.x, y: this.y - vector.y};
    }
};
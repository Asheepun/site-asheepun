import vec, * as v                         						from "/js/lib/vector.js";
import { checkCol, checkSetCol, checkOub, checkPlatformSetCol } from "/js/lib/colission.js";

const traitHolder = (startSpecs = {}) => {
    const that = startSpecs;
    that.methods = [];

    that.update = (GAME) => {
        that.methods.forEach(method => {
            that[method](GAME);
        });
    }

    that.addMethods = (...methods) => {
        methods.forEach(method => that.methods.push(method));
    }

    that.removeMethods = (...methods) => {
        methods.forEach(method => that.methods.splice(that.methods.indexOf(method), 1));
    }

    return that;
}

export default traitHolder;

export const addOubTrait = ({ oubArea = [0, 0, 900, 600], bounce = false }) => (that) => {
    that.oubArea = oubArea;

    that.handleOubX = () => {
        if(that.velocity.x > 0)
            that.pos.x = that.oubArea[0] + that.oubArea[2] - that.size.x;
        else
            that.pos.x = that.oubArea[0];
        if(bounce) that.velocity.x *= -1;
    }
    that.handleOubY = () => {
        if(that.velocity.y > 0){
            that.onGround = true;
            that.pos.y = oubArea[1] + oubArea[3] - that.size.y;
        }else
            that.pos.y = oubArea[1];
        if(bounce) that.velocity.y *= -1;
    }
    that.checkOub = () => checkOub(that, that.oubArea);
}

export const addColTrait = ({ bounce = false, }) => (that) => {
	that.handleColX = (obstacle) => {	
		if(that.velocity.x > 0){
			that.pos.x = obstacle.pos.x - that.size.x;
			that.onRightWall = true;
		}
		else{
			that.pos.x = obstacle.pos.x + obstacle.size.x;
			that.onLeftWall = true;
		}
		if(bounce) that.velocity.x *= -1;
		else{
			that.velocity.x = 0;
			if(that.acceleration) that.acceleration.x = 0;
		}
    }
    that.handleColY = (obstacle) => {
		if(that.velocity.y > 0){
			that.onGround = true;
			that.pos.y = obstacle.pos.y - that.size.y;
		}else
			that.pos.y = obstacle.pos.y + obstacle.size.y;
		if(bounce) that.velocity.y *= -1;
		else{
			that.velocity.y = 0;
			if(that.acceleration) that.acceleration.y = 0;
		} 
    }
}

export const addCheckColTrait = ({ sets = [], singles = [] }) => (that) => {
	that.checkCol = (GAME) => {
		sets.forEach(set => GAME.world[set].forEach((entity) => {
			if(checkCol(that, entity)) that[set + "Col"](entity, GAME);
		}));
		singles.forEach((single) => {
			if(checkCol(that, GAME.world[single])) that[single + "Col"](GAME.world[single], GAME);
		})
	}

	that.addMethods("checkCol");
}

export const addEntityTrait = ({ pos, size }) => (that) => {
    that.pos = pos;
    that.size = size;

    that.fixCenter = () => {
        that.center = v.add(that.pos, v.half(that.size));
    }

    that.fixCenter();

    that.addMethods("fixCenter");
}

export const addMoveTrait = ({ velocity = vec(0, 0), canMove = true, obstacleTypes = ["obstacles"] }) => (that) => {
	that.velocity = velocity;
    that.canMove = canMove;
    that.onGround = false;
    that.onLeftWall = false;
    that.onRightWall = false;
	that.onRoof = false;
    let oub = false;
    let col = false;
	let platCol = false;

    that.move = (GAME) => {

        col = false;
        oub = false;

        that.pos.y += that.velocity.y;
        if(that.handleOubY) oub = that.checkOub();
        if(oub) that.handleOubY(GAME);
        if(that.handleColY){
            obstacleTypes.forEach(obstacleType => {
                if(!col && GAME.world[obstacleType]) col = checkSetCol(that, GAME.world[obstacleType]);
            });
            if(col) that.handleColY(col, GAME);
            else{
				that.onGround = false;
				that.onRoof = false;
            }
        }

        col = false;
        oub = false;

        that.pos.x += that.velocity.x;
        if(that.handleOubX) oub = that.checkOub();
        if(oub) that.handleOubX(GAME);
        if(that.handleColX){
            obstacleTypes.forEach(obstacleType => {
                if(!col && GAME.world[obstacleType]) col = checkSetCol(that, GAME.world[obstacleType]);
            });
            if(col) that.handleColX(col, GAME);
			else{
                that.onLeftWall = false;
                that.onRightWall = false;
				that.resqued = false;
			}

        }

        that.fixCenter();
    }

    that.handleMove = (GAME) => {
        if(that.canMove) that.move(GAME);
    }

    that.addMethods("handleMove");
}

export const addPhysicsTrait = ({ acceleration = vec(0, 0), resistance = 1, gravity = 0 }) => (that) =>  {
	that.acceleration = acceleration;
	that.resistance = resistance;
	that.gravity = gravity;
	
	that.handlePhysics = () => {
		if(that.canMove){
			that.acceleration.y += that.gravity;
			that.velocity = v.add(that.velocity, that.acceleration);
			that.velocity = v.mul(that.velocity, that.resistance);
		}
	}
	
	that.addMethods("handlePhysics");
}

export const addSpriteTrait = ({ color, img, alpha = 1, rotation = 0, visible = true, imgPos = vec(0, 0), imgSize, drawOffset = vec(0, 0), drawSize }) => (that) => {
    that.color = color;
    that.img = img;
    that.alpha = alpha;
    that.rotation = rotation;
    that.visible = visible;
    that.imgPos = imgPos;
    that.imgSize = imgSize;
	that.facing = vec(1, 1);
	that.drawOffset = drawOffset;
	if(drawSize !== undefined) that.drawSize = drawSize;
	else that.drawSize = that.size.copy();

    that.draw = (ctx, sprites) => {
        if(that.visible){
            ctx.save();
            ctx.translate(Math.round(that.center.x), Math.round(that.center.y));
            ctx.rotate(that.rotation);
            ctx.globalAlpha = that.alpha;
            ctx.fillStyle = that.color;
            if(that.color) ctx.fillRect(Math.round(-that.size.x/2), Math.round(-that.size.y/2), that.size.x, that.size.y);
            if(that.img){
				ctx.scale(that.facing.x, that.facing.y);
				ctx.drawImage(
					sprites[that.img],
					that.imgPos.x, that.imgPos.y, that.imgSize.x, that.imgSize.y,
					-that.size.x/2 + that.drawOffset.x, -that.size.y/2 + that.drawOffset.y, that.drawSize.x, that.drawSize.y
				);
			}
            ctx.globalApha = 1;
            ctx.restore();
        }
    }
}

export const addFrameTrait = ({ delay, frames, initState = "still" }) => (that) => {
	that.frameState = initState;
	that.frames = frames;
	that.frameDelay = delay;

	let frameCounter = 0;
	that.handleFrames = ({ JSON }) => {
		frameCounter += 1;

		if(Math.floor(frameCounter/that.frameDelay) >= JSON[that.frames][that.frameState].length) frameCounter = 0;

		that.imgPos.x = JSON[that.frames][that.frameState][Math.floor(frameCounter/that.frameDelay)][0];
		that.imgPos.y = JSON[that.frames][that.frameState][Math.floor(frameCounter/that.frameDelay)][1];
	}

	that.addMethods("handleFrames");
}

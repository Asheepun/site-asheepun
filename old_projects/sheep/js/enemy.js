import traitHolder, * as traits 		from  "./lib/traits.js";
import vec, * as v 						from  "./lib/vector.js";
import gun 								from  "./gun.js";
import { checkSetCol } 					from  "./lib/colission.js";
import particle, * as particleEffects 	from  "./particles.js";

const enemy = ({ pos, size, health, color, img, imgSize, corpseSize }) => {
	const that = traitHolder(); 

	that.corpseSize = corpseSize,

	traits.addEntityTrait({
		pos,
		size,
	})(that);

	traits.addSpriteTrait({
		color,
		img,
		imgSize,
	})(that);

	traits.addMoveTrait({})(that);

	traits.addPhysicsTrait({
		gravity: 0.08,
		resistance: 0.80,
	})(that);

	traits.addColTrait({})(that);

	traits.addCheckColTrait({
		singles: ["player"],
	})(that);

	traits.addOubTrait({
		oubArea: [-90, 0, 780, 260]	
	})(that);

	that.AI = () => {
		console.log("Please add an AI to me!");
	}

	that.health = health;
	that.hit = false;
	that.damage = 0;

	that.handleHit = (GAME) => {
		if(that.hit){
			that.hit = false;
			that.health -= that.damage;
			that.velocity.add(v.pipe(
				that.hitVelocity,
				v.normalize,
				x => v.mul(x, 5),
			));

			if(that.health > 0) GAME.audio.play("hit");

			particleEffects.bloodEffect({
				pos: that.center.copy(),
				dir: v.normalize(v.reverse(that.hitVelocity)),
				world: GAME.world,
			});
		}

		if(that.health <= 0){
			that.die(GAME);
			GAME.audio.play("kill");

			if(that.corpseSize) GAME.world.add(particle({
				pos: that.pos.copy(),
				size: that.corpseSize,
				velocity: vec(v.normalize(that.hitVelocity).x * 2, -0.5),
				img: that.img + "_corpse",
				imgSize: that.corpseSize,
				gravity: 0.1,
			}), "particles", 4);
		}
	}

	that.die = ({ world: { remove, combo, player }, progress }) => {
		player.kills++;
		if(combo) combo.counter++;
		remove(that);
		if(that.gun) remove(that.gun);
	}

	that.playerCol = (player) => {
		player.hit = true;
		player.hitFromX = that.velocity.x;
	}

	that.addMethods("AI", "handleHit");

	return that;
}

export const wolf = (pos) => {
	const that = enemy({
		pos,
		size: vec(16, 20),
		health: 2,
		img: "wolf",
		imgSize: vec(16, 20),
		corpseSize: vec(20, 11),
	});

	traits.addCheckColTrait({
		singles: ["player"],
	})(that);

	traits.addFrameTrait({
		delay: 6,
		frames: "wolfFrames",
		initState: "moving",
	})(that);

	that.playerCol = (player) => {
		player.hit = true;
		player.hitVelocity = that.velocity.copy();
	}

	that.speed = 0.2;
	that.dir = 0;

	that.AI = () => {
		that.acceleration.x = that.dir*that.speed;

		if(that.hit){
			that.speed += 0.3;
			that.frameDelay = 2;
		}
	}

	let sheepCol = false;
	that.grabbing;

	that.grabSheep = ({ world: { sheep } }) => {
		if(sheep) sheepCol = checkSetCol(that, sheep);

		if(sheepCol && !sheepCol.grabbed && !that.grabbing){
			that.grabbing = sheepCol;
			that.dir *= -1;
		}

		if(that.grabbing){
			that.grabbing.grabbed = true;
			that.grabbing.grabbedPos.x = that.pos.x;
			that.grabbing.grabbedPos.y = that.pos.y
		}
	}

	that.animate = () => {
		if(that.dir > 0) that.facing.x = 1;
		if(that.dir < 0) that.facing.x = -1;
	}

	that.addMethods("grabSheep", "animate");

	return that;
}

export const squirrel = (pos) => {
	const that = enemy({
		pos,
		size: vec(17, 20),
		health: 2,
		img: "squirrel",
		imgSize: vec(17, 20),
		corpseSize: vec(20, 9),
	});

	traits.addPlatformColTrait({})(that);

	traits.addFrameTrait({
		delay: 4,
		frames: "squirrelFrames",
	})(that);

	traits.addGunTrait({
		gun: gun({
			pos: that.pos.copy(),
			size: vec(20, 10),
			shotDelay: 1,
			reloadTime: 1,
			ammoCapacity: 100,
			sound: "enemy_shoot",
			bulletSpec: {
				speed: 6,
				spread: 2,
				img: "enemy_bullet",
				size: vec(20, 10),
			}}), 
	})(that);

	//fix gun after death
	that.removeMethods("handleHit", "handleGunPos");
	that.addMethods("handleGunPos", "handleHit");

	that.oubArea = [0, 0, 600, 300];

	that.dir = 0;
	let waitCounter = 120 + Math.floor(Math.random()*60);
	let walkCounter = 0;

	that.AI = ({ world: { add, player }, audio }) => {
		waitCounter--;
		walkCounter--;

		if(waitCounter === 0){
			walkCounter = 30 + Math.floor(Math.random()*60);
			that.acceleration.x = that.dir * 0.15;
		}
		if(walkCounter === 0){
			waitCounter = 120;
			that.acceleration.x = 0;
			that.gun.shoot(that, add, audio);
		}
		that.aiming = v.pipe(
			v.sub(that.gun.center, player.center),
			v.normalize,
			v.reverse,
		);
	}

	that.animate = () => {
		if(that.dir > 0) that.facing.x = 1;
		if(that.dir < 0) that.facing.x = -1;

		if(walkCounter > 0) that.frameState = "moving";
		else that.frameState = "still";
	}

	that.addMethods("animate");

	return that;
}

export const fox = (pos) => {
	const that = enemy({
		pos,
		size: vec(20, 13),
		img: "fox",
		imgSize: vec(20, 13),
		health: 1,
		corpseSize: vec(20, 6),
	});

	traits.addFrameTrait({
		delay: 6,
		frames: "foxFrames",
		initState: "moving",
	})(that);

	traits.addCheckColTrait({
		sets: ["sheep"],
		singles: ["player"],
	})(that);

	that.speed = 0.3;

	that.sheepCol = (sheep) => {
		if(!sheep.grabbed) sheep.hit = true;
	}

	that.AI = ({ world: { bullets } }) => {
		that.acceleration.x = that.dir*that.speed;

		if(bullets) bullets.forEach(bullet => {
			if(v.sub(that.center, bullet.center).mag < 100 && that.onGround){
				that.jump();
			}
		});
	}

	that.jump = () => {
		that.velocity.y = -4.5;
		that.acceleration.y = -1;
	}

	that.animate = () => {
		if(that.dir > 0) that.facing.x = -1;
		if(that.dir < 0) that.facing.x = 1;
	}

	that.addMethods("animate");

	return that;
}

export const eagle = (pos) => {
	const that = enemy({
		pos,
		size: vec(20, 20),
		health: 1,
		img: "eagle",
		imgSize: vec(20, 20),
		corpseSize: vec(20, 12),
	});

	traits.addFrameTrait({
		delay: 5,
		frames: "eagleFrames",
		initState: "diving",
	})(that);

	that.oubArea = [-100, -100, 1000, 1000];

	let targetSheep;
	that.AI = ({ world: { sheep } }) => {
		targetSheep = sheep[0];

		if(!that.grabbing && targetSheep && !targetSheep.grabbed) that.velocity = v.pipe(
			v.sub(that.center, targetSheep.center),
			v.normalize,
			v.reverse,
			x => v.mul(x, 5),
		);
		else that.velocity = vec(0, -2);
	}

	that.handleOubX = that.handleOubY = ({ world: { remove } }) => {
		remove(that);
	}

	let sheepCol = false;
	that.grabbing;
	that.grabSheep = ({ world: { sheep } }) => {
		sheepCol = checkSetCol(that, sheep);

		if(sheepCol && !sheepCol.grabbed && !that.grabbing){
			that.grabbing = sheepCol;
		}

		if(that.grabbing){
			that.grabbing.grabbed = true;
			that.grabbing.grabbedPos.x = that.pos.x;
			that.grabbing.grabbedPos.y = that.pos.y + that.size.y-5;
		}
	
	}

	let screamed = false;
	that.scream = ({ audio: { play } }) => {
		if(!screamed){
			play("eagle");
			screamed = true;
		}
	}

	that.animate = () => {
		if(that.velocity.x > 0) that.facing.x = 1;
		if(that.velocity.x < 0) that.facing.x = -1;
		if(that.grabbing !== undefined) that.frameState = "grabbing";
	}

	that.addMethods("grabSheep", "scream", "animate");

	return that;
}

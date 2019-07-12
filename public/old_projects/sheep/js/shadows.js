import traitHolder, * as traits from  "./lib/traits.js";
import vec, * as v			    from  "./lib/vector.js";

const shadow = ({ pos, size }) => {
	const that = traitHolder();

	traits.addEntityTrait({
		pos,
		size,
	})(that);

	traits.addSpriteTrait({
		color: "black",
		alpha: 0.5,
	})(that);

	let distFromBullet = 600;
	let distFromPlayer;
	let distFromMoon;

	that.checkLightSource = ({ world: { player, bullets, enemies, moon } }) => {
		distFromPlayer = v.sub(that.center, player.center).mag;
		
		if(bullets) bullets.forEach(b => {
			if(v.sub(that.center, b.center).mag < distFromBullet)
				distFromBullet = v.sub(that.center, b.center).mag;
		});
		if(enemies) enemies.forEach(e => {
			if(v.sub(that.center, e.center).mag < distFromBullet)
				distFromBullet = v.sub(that.center, e.center).mag;
		});
		
		distFromMoon = v.sub(that.center, moon.center).mag;

		if(distFromPlayer < 30) that.alpha = 0;
		else if(distFromPlayer < 60 || distFromBullet < 50) that.alpha = 0.1;
		else if(distFromPlayer < 90) that.alpha = 0.2;
		else if(distFromMoon < 40) that.alpha = 0.3;
		else that.alpha = 0.5;

		distFromBullet = 600;
	}

	that.addMethods("checkLightSource");

	return that;
}

export default shadow;

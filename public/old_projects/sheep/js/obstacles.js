import traitHolder, * as traits  from  "./lib/traits.js";
import vec, * as v   			 from  "./lib/vector.js";

const obstacle = ({ pos, size, img }) => {
	const that = traitHolder();

	traits.addEntityTrait({
		pos,
		size,
	})(that);

	traits.addSpriteTrait({
		img,
		imgSize: that.size.copy(),
	})(that);

	return that;
}

export const topPlatform = (pos) => obstacle({
	pos,
	size: vec(600, 10),
	img: "top_platform",
});

export const bottomPlatfrom = (pos) => obstacle({
	pos,
	size: vec(180, 10),
	img: "bottom_platform",
});

export const ground = (pos) => obstacle({
	pos,
	size: vec(600, 40),
	img: "ground",
});

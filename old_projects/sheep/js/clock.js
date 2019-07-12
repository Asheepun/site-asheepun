import traitHolder, * as traits from  "./lib/traits.js";
import * as time 				from  "./lib/time.js";
import * as text 				from  "./lib/text.js";

const clock = (pos) => {
	const that = traitHolder({
		pos,
	});

	that.count = 0;

	that.tick = () => {
		that.count += 3;
	}

	that.draw = (ctx) => {

		text.white15(time.getClockText(time.getTime(that.count), 10), that.pos.x, that.pos.y, ctx);
	}

	that.addMethods("tick");
	
	return that;
}

export default clock;

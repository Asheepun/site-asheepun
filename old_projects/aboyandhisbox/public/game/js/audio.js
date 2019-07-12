const introTune = new Audio();
introTune.src="./public/game/audio/intro.m4a";

const mainTune = new Audio();
mainTune.src="./public/game/audio/main.wav";

const jumpSound = new Audio();
jumpSound.src="./public/game/audio/Jump13.wav"
jumpSound.volume = 0.4;

const pointSound = new Audio();
pointSound.src="./public/game/audio/Pickup_Coin16.wav";
pointSound.volume = 0.4;

const deathSound = new Audio();
deathSound.src="./public/game/audio/Death.wav";

const helloSound = new Audio();
helloSound.src="./public/game/audio/hello.wav";

const audioCtx = new window.AudioContext();

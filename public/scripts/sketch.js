var group;
var ball = new Sphere(0,0,0,Math.random(),Math.random(),Math.random());
var particle = new Particle(1,1);
var system = new ParticleSystem()
var img;
var song;
var texture;

var functionTogglers = document.getElementsByClassName('ui selection dropdown');
console.log(functionTogglers);
[].slice.apply(functionTogglers).forEach(toggler => toggler.addEventListener('change', () => {group.updateCircleFunctions()}))

function preload() {
	soundFormats('mp3', 'ogg');
	song = loadSound('Silver-Rocket.mp3');
	img = loadImage('sky-lights-space-dark.jpg')
  }

function setup() {
	console.log('setup');
	createCanvas(1000, 1000, WEBGL);
	group = new SphereGroup();
	group.addSpheres(15);
	group.setBlackholeFormation();

	// group.collisionTest();
	// system.addParticles(30);
	// background(0);
	// frameRate(120)
	// song.play();
	
}
	// song = loadSound('/public/scripts/audio/Silver-Rocket.mp3')

function draw() {

	noStroke();
	background(0);
	group.runBlackHoleFormation();
	// fill(255)
	
}

function keyTyped() {
	if (key === 'a'){
		let ball = new Sphere(mouseX - 500, mouseY - 500, Math.random() * 6 - 3, Math.random() * 6 - 3);
		group.addSphere(ball);
	}
	if (key === 'c') {
		document.getElementById('circular').checked = !document.getElementById('circular').checked
	}
}




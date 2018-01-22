var group;
// var ball = new Sphere(0,0,0,Math.random(),Math.random(),Math.random());
var particle = new Particle(1,1);
var system = new ParticleSystem()
var img;
var song;
var anchor = document.getElementById('anchor');
var anchorChecked = false
anchor.addEventListener('change', ()=> {
	anchorChecked = !anchorChecked;
	if (anchorChecked) group.setBlackholeFormation();
})

var addButton = document.getElementById('add-spheres-btn');
addButton.addEventListener('click', () => {
	let count = +document.getElementById('add-spheres-input').value;
	group.addSpheres(count);
	if (anchorChecked) group.setBlackholeFormation();
})

var functionTogglers = document.getElementsByClassName('ui selection dropdown');
[].slice.apply(functionTogglers).forEach(toggler => toggler.addEventListener('change', () => {group.updateCircleFunctions()}))

function preload() {
	soundFormats('mp3', 'ogg');
	// song = loadSound('Silver-Rocket.mp3');
	// img = loadImage('sky-lights-space-dark.jpg')
  }

function setup() {
	createCanvas(window.innerWidth, window.innerHeight - 75, WEBGL);
	group = new SphereGroup();
	group.addSpheres(50);
	if (anchorChecked) group.setBlackholeFormation();
	// group.collisionTest();
	// system.addParticles(30);
	// background(0);
	// frameRate(120)
	// song.play();
}

function draw() {

	noStroke();
	background(0);

	if (anchorChecked) {
		group.runBlackHoleFormation();
	}
	else group.run();


	// controls movement of center sphere
	if (keyIsDown(LEFT_ARROW))	group.blackhole.location.x += -5;
	if (keyIsDown(RIGHT_ARROW))	group.blackhole.location.x += 5;
	if (keyIsDown(UP_ARROW))	group.blackhole.location.y += -5;
	if (keyIsDown(DOWN_ARROW))	group.blackhole.location.y += 5;
	if (keyIsDown(190))			group.blackhole.location.z += 5;
	if (keyIsDown(188))			group.blackhole.location.z += -5;
	
}

function keyTyped() {
	switch (key){
		case 'a':
			let ball = new Sphere(mouseX - 500, mouseY - 500, Math.random() * 6 - 3, Math.random() * 6 - 3);
			ball.bounce = () => {};
			group.addSphere(ball);
			break;
		case 's':
			group.subtractSphere();
			break;
		case 'c':
			document.getElementById('circular').checked = !document.getElementById('circular').checked
			break;
		case 'p':
			group.blackhole.paused();
			break;
		default:
			break;
	}
}




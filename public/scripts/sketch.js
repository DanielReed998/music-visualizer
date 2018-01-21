var group = new SphereGroup();
// var ball = new Sphere(0,0);
var particle = new Particle(1,1);
var system = new ParticleSystem()
var song;

function preload() {
	soundFormats('mp3', 'ogg');
	song = loadSound('Silver-Rocket.mp3');
  }

function setup() {
	createCanvas(1000, 1000, WEBGL);
	// noStroke();
	group.addSpheres(1);
	// group.setBlackholeFormation();
	// group.collisionTest();
	// system.addParticles(30);
	// background(0);
	// frameRate(120)
	// song.play();
	
}
	// song = loadSound('/public/scripts/audio/Silver-Rocket.mp3')

function draw() {
	noStroke();
	background(50);
	// ball.move()
	// ball.display();
	// stroke(255)
	// line(0,0,0,5,5,5)
	// system.run();
	group.run(3);
	// group.runBlackHoleFormation();
	fill(255)
	pointLight(250, 250, 250, 0, 0, 1000);
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




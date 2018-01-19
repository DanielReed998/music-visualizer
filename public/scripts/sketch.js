// var SphereGroup = require('./sphere');

// let h1 = document.getElementById('music-visualiser')

// document.getElementById('change-that-h3').addEventListener('click', () => {
//     h1.innerText = 'it changed!'
// })

var group = new SphereGroup();
var object;

function setup() {
	// console.log('hitting?')
	createCanvas(1000, 1000, WEBGL);
	noStroke();
	group.addSpheres(10);
	background(0);
	// group.start();
}

function draw() {
	// console.log(height);
	noStroke();
	background(0);
	pointLight(250, 250, 250, 0, 0, 1000);
	group.run(3);

}



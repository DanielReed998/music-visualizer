const colors = [[0, 255, 0], [255, 0, 0], [0, 0, 255], [255, 0, 255], ]

class Sphere {
	constructor(x, y) {
		// this.acceleration = createVector(0, 0);
		// this.velocity = createVector(random(-1, 1), random(-1, 0));
        this.x = x;
        this.y = y;
        // this.changeX = changeX;
        // this.changeY = changeY;
        this.velocity = Math.random() * .05;
        this.radians = Math.random() * Math.PI * 2;
        this.distance = Math.random() * 100 + 200

        this.color = [25, (155*Math.random() + 100), (155*Math.random() + 100)];
        this.whichWay;
    }

    // initialDisplay() {
    //     translate(this.x, this.y)
    //     fill(this.color[0], this.color[1], this.color[2]);
    //     sphere(this.radius)
    // }
    
    display() {

        translate(this.x + mouseX - 500, this.y + mouseY - 500)
        fill(this.color);
        pointLight(250, 250, 250, 0, 0, 1000);
        // stroke(255);

        sphere(10);
        translate(-(this.x + mouseX - 500), -(this.y + mouseY - 500))
    }

    update(pulse) {
        var extraSpeed = 0;
        if (mouseIsPressed) extraSpeed = 0.05;
        else extraSpeed = 0;
        this.radians += this.velocity + extraSpeed;
        this.y = Math.sin(this.radians) * this.distance;
        this.x = Math.cos(this.radians) * this.distance;
        // this.pulse(pulse);
        this.display();
    }

    pulse(amplitude) {
        if (this.color.indexOf(255) !== -1) this.whichWay = -1;
        else if (this.color.indexOf(100) !== -1) this.whichWay = 1;
            this.color[0] += (amplitude * this.whichWay);
            this.color[1] += (amplitude * this.whichWay);
            this.color[2] += (amplitude * this.whichWay);
    }
}


class SphereGroup {
	constructor() {
		this.spheres = [];
    }
    
    addSpheres(numberToAdd) {
        for (let i=0; i < numberToAdd; i++) {
            let newSphere = new Sphere(0, 0);
            this.spheres.push(newSphere)
        }
    }

    // start() {
    //     this.spheres.forEach(sphere => {
    //         sphere.initialDisplay();
    //     })
    // }

    run(pulse) {
        this.spheres.forEach(sphere => {
            sphere.update(pulse);
        })
    }
}


class Circle {
	constructor() {
		// this.acceleration = createVector(0, 0);
		// this.velocity = createVector(random(-1, 1), random(-1, 0));
        // this.changeX = changeX;
        // this.changeY = changeY;
        this.velocity = 0.05;
        this.radians = Math.random() * Math.PI * 2;
        
        this.x = Math.cos(this.radians) * 10;

        this.y = Math.sin(this.radians) * 10;

        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    // initialDisplay() {
    //     translate(this.x, this.y)
    //     fill(this.color[0], this.color[1], this.color[2]);
    //     sphere(this.radius)
    // }
    
    display() {
        fill(this.color)
        ellipse(this.x, this.y, 10, 10)
    }

    update() {
        this.radians += this.velocity;
        this.x += Math.cos(this.radians) * 10;
        this.y += Math.sin(this.radians) * 10;

        // if (mouseX-500 > this.x + 10) this.changeX = 10;
        // else if (mouseX - 500 < this.x - 10) this.changeX = -10;
        // else this.changeX = 0;

        // if (mouseY-500 > this.y + 10) this.changeY = 10;
        // else if (mouseY-500 < this.y - 10) this.changeY = -10;
        // else this.changeY = 0;

        this.display();
    }
}


class CircleGroup {
	constructor() {
		this.circles = [];
    }
    
    addCircles(numberToAdd) {
        for (let i=0; i < numberToAdd; i++) {
            let newCircle = new Circle(0, 0);
            this.circles.push(newCircle)
        }
    }

    // start() {
    //     this.spheres.forEach(sphere => {
    //         sphere.initialDisplay();
    //     })
    // }

    run() {
        this.circles.forEach(circle => {
            circle.update();
        })
    }
}



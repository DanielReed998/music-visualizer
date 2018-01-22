


const anchorColor = document.getElementById('anchor-color')
const orbitColor = document.getElementById('orbiter-color')

const colors = {
    blueish: [0, Math.random() * 150 + 155, Math.random() * 50 + 205],
    yellowish: [Math.random() * 50 + 205, Math.random() * 120 + 185, 0],
    reddish: [Math.random() * 30 + 225, 0, Math.random() * 100 + 100],
    greenish: [0, Math.random() * 30 + 225, Math.random() * 100 + 100],
    purpleish: [Math.random() * 50 + 205, 0, Math.random() * 150 + 155],
    whiteish: 175
}

console.log(anchorColor.value)
const circleFunctions = {
    cos: value => Math.cos(value),
    sin: value => Math.sin(value),
    tan: value => Math.tan(value)
}

class Sphere {
	constructor(x, y, z, xVelocity, yVelocity, zVelocity) {
        this.location = new p5.Vector(x + width / 2,y + height / 2, z)
        // this.velocity = new p5.Vector(xVelocity, yVelocity);
        this.velocity = new p5.Vector(Math.random() * 6 - 3, Math.random() * 6 - 3, Math.random() * 6 - 3)
        this.spinVelocity = Math.random() * 0.05
        this.radians = Math.random() * Math.PI * 2;
        this.distanceX = Math.random() * 250 + 75
        this.distanceY = Math.random() * 250 + 75
        this.distanceZ = Math.random() * 250 + 75
        
        this.radius = 7
        // this.radius = 5 + Math.random()*10;
        this.lastMouse = {x: this.location.x, y: this.location.y};
        this.color = [0, Math.random() * 150 + 155, Math.random() * 50 + 205]
        // this.color = 50
        this.colorShift = 50
        this.colorDirection = 1;

        this.rope;

        this.neighbors = [];
    }

    move() {
        var extraSpeed = 1;
        if (mouseIsPressed) extraSpeed = 2;

        this.location = this.location.add(new p5.Vector(this.velocity.x*extraSpeed, this.velocity.y*extraSpeed, this.velocity.z*extraSpeed));

        this.pulse()
        this.bounce();
        this.collide();
        this.display();
    }

    spin(centerX, centerY, centerZ, xFunc, yFunc, zFunc) {

        //click event to boost the speed
        var extraSpeed = 0;
        if (mouseIsPressed) extraSpeed = 0.05 * Math.sign(this.spinVelocity);
        else extraSpeed = 0;
        
        //create motion
        this.radians += this.spinVelocity + extraSpeed;
        
        //updating based on new radians
        this.location.x = centerX + xFunc(this.radians) * this.distanceX;
        this.location.y = centerY + yFunc(this.radians) * this.distanceY;
        this.location.z = centerZ + zFunc(this.radians) * this.distanceZ;
        this.pulse();
        
        this.bounce();
        this.collide();
        this.display();
    }
    
    pulse() {
        if (this.colorShift >= 100) this.colorDirection = -3
        if (this.colorShift <= 0) this.colorDirection = 3;
        
        this.colorShift = this.colorShift + this.colorDirection
        for (let i = 0; i < 3; i++) {
            let colorVal = this.color[i];
            if ((colorVal >= 255 && Math.sign(this.colorDirection) === -1) ||
            (colorVal <= 0   && Math.sign(this.colorDirection) === 1) ||
            (colorVal >  0   && colorVal < 255)) {
                this.color[i] += this.colorDirection;
            }
        }
    }

    bounce() {
        if (this.location.x > width - this.radius * 2 || this.location.x < 0 + this.radius * 2) {
            this.velocity.x = this.velocity.x * -1
            this.spinVelocity = this.spinVelocity * -1
        }
        if (this.location.y > height - this.radius * 2 || this.location.y < 0 + this.radius * 2) {
            this.velocity.y = this.velocity.y * -1
            this.spinVelocity = this.spinVelocity * -1
        }
        if (this.location.z > 326 - this.radius * 2 || this.location.z < -1000 + this.radius * 2) {
            this.velocity.z = this.velocity.z * -1
            this.spinVelocity = this.spinVelocity * -1
        }
    }
    
    collide() {
        this.neighbors.forEach(neighbor => {
            if (neighbor.location.dist(this.location) <= (neighbor.radius + this.radius + 3)) {
                let temp = this.velocity;
                this.velocity = neighbor.velocity
                neighbor.velocity = temp;
                
                let spinTemp = this.spinVelocity;
                this.spinVelocity = neighbor.spinVelocity
                neighbor.spinVelocity = spinTemp;


            }
        })
    }

    createCollisionAnimation(vector) {

    }

    display() {        
        translate(this.location.x - width / 2, this.location.y - height / 2, this.location.z)
        fill(colors[orbitColor.value]);
        pointLight(250, 250, 250, 0, 0, 1000);
        sphere(this.radius);   
        translate(-(this.location.x - width / 2), -(this.location.y - height / 2), -this.location.z)
    }
}

class BlackHole extends Sphere {
    constructor() {
        super(0, 0, 0);
        this.velocity = new p5.Vector(Math.random() * 1 - 0.5, Math.random() * 1 - 0.5, Math.random() * 1 - 0.5);
        this.radius = 50;
        this.color = 150;
        this.isPaused = false;
    }

    paused() {
        if (this.isPaused) {
            this.velocity = new p5.Vector(Math.random() * 1 - 0.5, Math.random() * 1 - 0.5, Math.random() * 1 - 0.5);
            this.isPaused = false
        } else {
            this.velocity = new p5.Vector(0, 0, 0)
            this.isPaused = true;
        }
    }

    move() {
        this.location = this.location.add(this.velocity);
        this.bounce();
        this.collide();
        this.display();
    }

    display() {        
        translate(this.location.x - width / 2, this.location.y - height / 2, this.location.z)
        fill(colors[anchorColor.value]);
        pointLight(250, 250, 250, 0, 0, 1000);
        sphere(this.radius, 60, 60);   
        translate(-(this.location.x - width / 2), -(this.location.y - height / 2), -this.location.z)
    }

    bounce() {
        if (this.location.x > 925 - this.radius * 2 || this.location.x < 75 + this.radius * 2) {
            this.velocity.x = this.velocity.x * -1
            this.spinVelocity = this.spinVelocity * -1
        }
        if (this.location.y > 925 - this.radius * 2 || this.location.y < 75 + this.radius * 2) {
            this.velocity.y = this.velocity.y * -1
            this.spinVelocity = this.spinVelocity * -1
        }
        if (this.location.z > 300 - this.radius * 2 || this.location.z < -1000 + this.radius * 2) {
            this.velocity.z = this.velocity.z * -1
            this.spinVelocity = this.spinVelocity * -1
        }
    }
}

class SphereGroup {
    constructor() {
        this.spheres = [];
        this.blackhole = new BlackHole();
        this.circular = document.getElementById('circular');
        this.xFunc = circleFunctions[document.getElementById('x-function').value]; //These are
        this.yFunc = circleFunctions[document.getElementById('y-function').value]; //all functions
        this.zFunc = circleFunctions[document.getElementById('z-function').value]; //Math.sin, Math.cos, or Math.tan
    }

    updateCircleFunctions() {
        this.xFunc = circleFunctions[document.getElementById('x-function').value]; //These are
        this.yFunc = circleFunctions[document.getElementById('y-function').value]; //all functions
        this.zFunc = circleFunctions[document.getElementById('z-function').value];
    }
    
    addSphere(sphere) {
        sphere.neighbors = this.spheres;
        this.spheres.push(sphere);
    }

    addSpheres(numberToAdd) {
        for (let i=0; i < numberToAdd; i++) {
            let newSphere = new Sphere(Math.floor(Math.random() * 1000) - 500, Math.floor(Math.random() * 1000) - 500, Math.floor(Math.random() * 1000) - 500);
            this.spheres.push(newSphere)
        }
        for (let i = 0; i < this.spheres.length; i++) {
            let otherSpheres = [...this.spheres, this.blackhole];
            otherSpheres.splice(i, 1);
            this.spheres[i].neighbors = otherSpheres;
        }
    }

    subtractSphere() {
        this.spheres = this.spheres.slice(0, -1)
    }

    setBlackholeFormation() {
        this.blackhole.neighbors = this.spheres;
        this.blackhole.neighbors.forEach(neighbor => neighbor.bounce = () => {})
    }
    
    run() {
        this.spheres.forEach(sphere => {
            if (this.circular.checked) sphere.spin(mouseX, mouseY, 0, this.xFunc, this.yFunc, this.zFunc);
            else sphere.move();
        })
    }

    runBlackHoleFormation() {
        this.spheres.forEach(sphere => {
            sphere.spin(this.blackhole.location.x, this.blackhole.location.y, this.blackhole.location.z, this.xFunc, this.yFunc, this.zFunc)
        })
        this.blackhole.move();
    }

    // collisionTest() {
    //     let rightSphere = new Sphere(-200, 0, 1, 0)
    //     let leftSphere = new Sphere(200, 0, -1, 0)
    //     this.spheres.push(rightSphere);
    //     this.spheres.push(leftSphere);
    //     for (let i = 0; i < this.spheres.length; i++) {
    //         let otherSpheres = [...this.spheres];
    //         otherSpheres.splice(i, 1);
    //         this.spheres[i].neighbors = otherSpheres;
    //     }
    // }
}

class Rope {
    constructor(mouseCoordX, mouseCoordY, sphereX, sphereY, height) {
        this.x = (mouseCoordX + sphereX) / 2;
        this.y = (mouseCoordY + sphereY) / 2;
        this.height = height;
        this.angle = Math.atan2(mouseCoordY - sphereY, mouseCoordX - sphereX);
        this.isDisplaying = true;
    }

    update(height) {
        this.height = height
        this.display();
    }

    display() {
        if (this.isDisplaying){
            translate(this.x - 500, this.y - 500)
            rotateZ(this.angle + Math.PI / 2);
            fill(150);
            cylinder(1, this.height)
            rotateZ(-this.angle - Math.PI / 2)
            translate(-(this.x - 500), -(this.y - 500))
        }
    }

}

class Collision {
    constructor(x, y) {
        this.location = new p5.Vector(x, y);
        this.lifeSpan = 500;
    }



}



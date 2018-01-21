

class Sphere {
	constructor(x, y, xVelocity, yVelocity) {
        this.location = new p5.Vector(x+500,y+500)
        // this.velocity = new p5.Vector(xVelocity, yVelocity);
        this.velocity = new p5.Vector(Math.random() * 6 - 3, Math.random() * 6 - 3)
        this.spinVelocity = Math.random() * 0.05
        this.radians = Math.random() * Math.PI * 2;
        this.distanceX = Math.random() * 250 + 75
        this.distanceY = Math.random() * 250 + 75
        
        this.radius = 5 + Math.random()*10;
        this.lastMouse = {x: this.location.x, y: this.location.y};
        this.color = [0, Math.random() * 150 + 155, Math.random() * 50 + 205]
        // this.color = 50
        this.colorShift = 50
        this.colorDirection = 1;

        this.rope;

        this.neighbors = [];
    }

    move() {
        this.location = this.location.add(this.velocity);
        this.pulse()
        this.bounce();
        this.collide();
        this.display();
    }

    spin(centerX, centerY) {

        //click event to boost the speed
        var extraSpeed;
        if (mouseIsPressed) extraSpeed = 0.05 * Math.sign(this.spinVelocity);
        else extraSpeed = 0;
        
        //create motion
        this.radians += this.spinVelocity + extraSpeed;
        
        //updating based on new radians
        this.location.x = centerX + Math.cos(this.radians) * this.distanceX;
        this.location.y = centerY + Math.sin(this.radians) * this.distanceY;
        // this.pulse(pulse);
        
        //add ropes
        // this.rope = new Rope(mouseX, mouseY, this.location.x, this.location.y, 20)
        this.bounce();
        this.collide();
        this.display();
    }
    
    pulse() {
        if (this.colorShift >= 50) this.colorDirection = -2
        if (this.colorShift <= 0) this.colorDirection = 2;
        
        this.colorShift = this.colorShift + this.colorDirection
        for (let i = 0; i < 3; i++) {
            let colorVal = this.color[i];
            if ((colorVal >= 255 && Math.sign(this.colorDirection) === -1) ||
            (colorVal <= 0   && Math.sign(this.colorDirection) === 1) ||
            (colorVal >  0   && colorVal < 255)) {
                this.color[i] += this.colorDirection;
            }
        }
        // console.log(this.color);
    }

    bounce() {
        if (this.location.x > 1000 - this.radius * 2 || this.location.x < 0 + this.radius * 2) {
            this.velocity.x = this.velocity.x * -1
            this.spinVelocity = this.spinVelocity * -1
        }
        if (this.location.y > 1000 - this.radius * 2 || this.location.y < 0 + this.radius * 2) {
            this.velocity.y = this.velocity.y * -1
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
        // this.rope.update(Math.sqrt(Math.pow(this.location.x-mouseX, 2) + Math.pow(this.location.y-mouseY, 2)));
    
        fill(this.color);
        pointLight(250, 250, 250, 0, 0, 1000);
        // pointLight(250, 250, 250, mouseX-500, mouseY-500, 0);
        translate(this.location.x - 500, this.location.y - 500)
        sphere(this.radius);
        translate(-(this.location.x - 500), -(this.location.y - 500))
    }
}

class BlackHole extends Sphere {
    constructor() {
        super(0, 0);
        this.velocity = new p5.Vector(Math.random() * 1 - 0.5, Math.random() * 1 - 0.5);
        this.radius = 50;
        this.color = 25;
    }

    move() {
        this.location = this.location.add(this.velocity);
        this.bounce();
        this.collide();
        this.display();
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
    }
}

class SphereGroup {
    constructor() {
        this.spheres = [];
        this.blackhole = new BlackHole();
        this.circular = document.getElementById('circular');
    }
    
    addSphere(sphere) {
        sphere.neighbors = this.spheres;
        this.spheres.push(sphere);
    }

    addSpheres(numberToAdd) {
        for (let i=0; i < numberToAdd; i++) {
            let newSphere = new Sphere(Math.floor(Math.random() * 1000) - 500, Math.floor(Math.random() * 1000) - 500);
            this.spheres.push(newSphere)
        }
        for (let i = 0; i < this.spheres.length; i++) {
            let otherSpheres = [...this.spheres, this.blackhole];
            otherSpheres.splice(i, 1);
            this.spheres[i].neighbors = otherSpheres;
        }
    }

    setBlackholeFormation() {
        this.blackhole.neighbors = this.spheres;
    }
    
    run() {
        this.spheres.forEach(sphere => {
            if (this.circular.checked) sphere.spin(mouseX, mouseY);
            else sphere.move();
        })
    }

    runBlackHoleFormation() {
        this.spheres.forEach(sphere => {
            sphere.spin(this.blackhole.location.x, this.blackhole.location.y)
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



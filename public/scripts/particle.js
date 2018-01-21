class Particle {
    constructor() {
        this.x = Math.random() * 1000 - 500;
        this.y = Math.random() * 1000 - 500;
        this.velocity = new p5.Vector(Math.random() * 4 - 2, Math.random() * 4 - 2);
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.display();
    }

    display() {
        ellipse(this.x, this.y, 20);
    }
}

class ParticleSystem {
     constructor() {
         this.particles = [];
     }

     addParticles(numParticles) {
         for (let i = 0; i < numParticles; i++) {
            let particle = new Particle(); 
            this.particles.push(particle)
         }
     }

     run() {
         this.particles.forEach(particle => {
             particle.update();
         })
     }
}


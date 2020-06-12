//  Gravitation
//  @Michael Gunn

let bodies = [];
let radius = 40;
let speed = 1;
let G = 1000;

function setup() {
    createCanvas(800, 640);
    let b1 = new body(100, 300, random(speed), random(speed));
    let b2 = new body(500, 200, random(speed), random(speed));
    let b3 = new body(500, 500, random(speed), random(speed));
    bodies.push(b1);
    bodies.push(b2);
    bodies.push(b3);
}

function draw() {
    background(0);

    //walls 


    for (let body of bodies) {

        body.gravity();
        body.velocity.x += body.acceleration.x;
        body.velocity.y += body.acceleration.y;
        body.position.x += body.velocity.x;
        body.position.y += body.velocity.y;
        body.acceleration.setMag(0);
        // body.velocity.setMag(body.velocity.mag() * 0.99); //friction

        body.walls();
        ellipse(body.position.x, body.position.y, radius, radius);
    }

}

class body {
    constructor(x, y, velX, velY) {
        this.position = createVector(x, y);
        this.velocity = createVector(velX, velY);
        this.acceleration = createVector(0, 0);
        this.mass = 1;

    }

    gravity() {
        for (let b of bodies) {
            if (b !== this) {
                // let d = dist(this.position.x, this.position.y, b.position.x, b.position.y);
                let d = sqrt(pow(min(abs(this.position.x - b.position.x), width - abs(this.position.x - b.position.x)), 2) + pow(min(abs(this.position.y - b.position.y), height - abs(this.position.y - b.position.y)), 2));
                let a = p5.Vector.sub(b.position, this.position);
                if (d >= radius) {
                    a.setMag(G * b.mass / (d * d));
                    // console.log(a);
                    this.acceleration.add(a);
                } else {
                    // console.log('too small');
                }
            }
        }
    }

    walls() {
        if (this.position.x > width) {
            this.position.x = 0;
        }
        if (this.position.x < 0) {
            this.position.x = width;
        }
        if (this.position.y > height) {
            this.position.y = 0;
        }
        if (this.position.y < 0) {
            this.position.y = height;
        }
    }
}
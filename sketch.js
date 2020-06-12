//  Gravitation
//  @Michael Gunn

let bodies = [];
let colors = [];
let radius = 40;
let speed = 0;
let G = 500;
let resetButton, stableButton;

function setup() {
    createCanvas(800, 640);
    background(0);
    // let b1 = new body(100, 300, random(speed), random(speed));
    // let b2 = new body(500, 200, random(speed), random(speed));
    // let b3 = new body(500, 500, random(speed), random(speed));
    let b1 = new body(random(width * 0.2, width * 0.8), random(height * 0.2, height * 0.8), random(speed), random(speed));
    let b2 = new body(random(width * 0.2, width * 0.8), random(height * 0.2, height * 0.8), random(speed), random(speed));
    let b3 = new body(random(width * 0.2, width * 0.8), random(height * 0.2, height * 0.8), random(speed), random(speed));
    // bodies.push(b1);
    // bodies.push(b2);
    // bodies.push(b3);

    // let scale = 100;
    // let b1 = new body(-1 * scale, 0 * scale, 0.347111 * scale / 10, 0.532728 * scale / 10);
    // let b2 = new body(1 * scale, 0 * scale, 0.347111 * scale / 10, 0.532728 * scale / 10);
    // let b3 = new body(0 * scale, 0 * scale, -2 * 0.347111 * scale / 10, -2 * 0.532728 * scale / 10);
    // let p1 = 0.347111;
    // let p2 = 0.532728;
    // let b1 = new body(-10, 0, p1, p2);
    // let b2 = new body(10, 0, p1, p2);
    // let b3 = new body(0, 0, -2 * p1, -2 * p2);
    bodies = [];
    bodies.push(b1);
    bodies.push(b2);
    bodies.push(b3);
    // translate(width / 2, height / 2);
    // scale(50);

    resetButton = createButton('Reset');
    resetButton.mousePressed(reset);
    resetButton.position(30, height + 20);
    stableButton = createButton('Stable');
    stableButton.mousePressed(stable);
    stableButton.position(30, height + 50);

    let c;
    for (let i = 0; i < bodies.length; i++) {
        let r = random(255);
        let g = random(255);
        let b = random(255);
        c = color(r, g, b);
        colors.push(c);
    }
}

function draw() {
    background(0, 3);
    noStroke();
    //walls 
    // translate(width / 2, height / 2);
    // scale(20);

    let i = 0;
    for (let body of bodies) {

        body.gravity();
        body.velocity.x += body.acceleration.x;
        body.velocity.y += body.acceleration.y;
        body.position.x += body.velocity.x;
        body.position.y += body.velocity.y;
        body.acceleration.setMag(0);
        // body.velocity.setMag(body.velocity.mag() * 0.99); //friction

        // body.walls();
        fill(colors[i]);
        ellipse(body.position.x, body.position.y, radius, radius);

        i++;
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
                let d = dist(this.position.x, this.position.y, b.position.x, b.position.y);
                d = constrain(d, radius, height);
                // let d = sqrt(pow(min(abs(this.position.x - b.position.x), width - abs(this.position.x - b.position.x)), 2) + pow(min(abs(this.position.y - b.position.y), height - abs(this.position.y - b.position.y)), 2));
                //second d accounts for distance likes the edges connect to the opposite side, so two objs ob opposite edges are measured as very close
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

function reset() {
    background(0);
    bodies = [];
    let b1 = new body(random(width * 0.2, width * 0.8), random(height * 0.2, height * 0.8), random(speed), random(speed));
    let b2 = new body(random(width * 0.2, width * 0.8), random(height * 0.2, height * 0.8), random(speed), random(speed));
    let b3 = new body(random(width * 0.2, width * 0.8), random(height * 0.2, height * 0.8), random(speed), random(speed));
    bodies.push(b1);
    bodies.push(b2);
    bodies.push(b3);

}

function stable() {
    background(0);
    let scale = 20;
    let b1 = new body(-1 * scale, 0 * scale, 0.347111 * scale, 0.532728 * scale);
    let b2 = new body(1 * scale, 0 * scale, 0.347111 * scale, 0.532728 * scale);
    let b3 = new body(0 * scale, 0 * scale, -2 * 0.347111 * scale, -2 * 0.532728 * scale);
    bodies = [];
    bodies.push(b1);
    bodies.push(b2);
    bodies.push(b3);
    translate(width / 2, height / 2);
}
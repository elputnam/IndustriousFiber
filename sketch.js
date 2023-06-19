let nodes = [];
let pixels = [];
let rad = 0;
let MAX = 200;
let MIN = 0;
let H1;
let grow = 0.1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  background(10);
  rectMode(CENTER);
  frameRate(30);
  H1 = random(100,255);
  //strings
  for (var j = 0; j < 70; j++) {
		nodes[j] = new Node(random(width), random(height), random(width), random(height));
  }
  //pixels
  for (var k = 0; k < 100; k++){
    pixels[k] = new Pixel(random(width), random(height), random(0.2));
  }
}

function draw() {
  background(10, 5);
 
  for (let l = 0; l < pixels.length; l++){
    pixels[l].show();
  }
  
  for (let i = 0; i < nodes.length; i++){
    nodes[i].edges();
    nodes[i].show();
    nodes[i].move();
  }

 
  
}

class Node {
  constructor(x1, y1, x2, y2){
    this.v1 = createVector(x1, y1);
    this.v2 = createVector(x2, y2);
    // this.v3 = createVector(x3, y3);
    this.grow = grow;
  }
  move(){
    this.v1.add(random(-3, 3), random(-3, 3));
    this.v2.add(random(-1,1), random(-1, 1));
  }

  edges(){
    if (this.v1.x < 0 || this.v1.x > width){
      this.v1.x = random(width);
    }
    if (this.v1.y < 0 || this.v1.y > height){
      this.v1.y = random(height);
    }
    if (this.v2.x < 0 || this.v2.x > width){
      this.v2.x = random(width);
    }
    if (this.v2.y < 0 || this.v2.y > height){
      this.v2.y = random(height);
    }
  }
  show(){
    strokeWeight(1)
    // stroke(0, random(100), random(100));
    stroke(0, 100, 100);
    line(this.v1.x, this.v1.y, this.v2.x, this.v2.y);
     fill(0);
    // fill(180, random(100), random(100));
    noStroke();
    circle(this.v1.x, this.v1.y, 20);
    circle(this.v2.x, this.v2.y, 10);
    


  }
}

class Pixel{
  constructor(x, y, grow){
    this.v3 = createVector(x, y);
    this.grow = grow; 
  }

  show(){
    strokeWeight(3);
    stroke(0);
    // noStroke();
    fill(H1, 30);
    square(this.v3.x, this.v3.y, rad);
    rad += this.grow;

    //breathing
    if (rad <= MIN || rad >= MAX){
      this.grow *= -1;
      H1 = random(100,255);
      this.v3.x = random(width);
      this.v3.y = random(height);
    }
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}

function mousePressed(){
  let fs = fullscreen();
  fullscreen(!fs);
}
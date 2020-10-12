/*
 * @name RandomVenctor
 * @description Random venctor generation.
 */
// Define fundamental variables
let x, y;
var w_center, h_center
var colors = [];
let fr = 4000

function setup() {
  createCanvas(800 , 800);
  frameRate(fr)
  smooth(8);
  background(0)
}

function draw() {
  translate(width/2, height/2)
  var col = 255;

  // let v = createVector(random(-100, 100), random(-100, 100))
  v = p5.Vector.random2D(500, 600).mult(300)

  strokeWeight(0.8)
  stroke(col, 20)
  line(0,0, v.x, v.y)

  v2 = p5.Vector.random2D(100, 100).mult(60)

  strokeWeight(4)
  stroke(0)
  line(0,0, v2.x, v2.y)

}
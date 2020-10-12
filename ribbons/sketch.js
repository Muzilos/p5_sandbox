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
  addColors();
  smooth(8);
  background(0)
}

function draw() {
  translate(width/2, height/2)
  var col = getRandomColor();

  v = p5.Vector.random2D(500, 600).mult(300)
  makeRibbons(v, col)
}

function makeRibbons(v, col) {
  noFill();

  var strokeW = 0.5;
  
  var amount = 90;
  var frequency = random(0.9, 1.0) / 17;
  var offset = v.y;
  
  strokeWeight(strokeW);
  stroke(col,50);
  var startY = 0;
  beginShape();
    vertex(v.x, startY);
      for (var c=amount/2; c < amount; c++) {
        var sinoffset = sin(frequency*c);
        var sinX = c*(v.y/amount);
        var sinY = (sinoffset*offset);
        bezierVertex(sinX,sinY,sinX,sinY - 1,sinX,sinY);
      }
  endShape();
}

function addColors() {
  var c;
  c = color(0, 138, 176);
  colors[0] = c;
  c = color(241,100,93);
  colors[1] = c;
  c = color(0,176,133);
  colors[2] = c;
  c = color(233,108,31);
  colors[3] = c;
  c = color(241,114,172);
  colors[4] = c;
  c = color(222,57,108);
  colors[5] = c;
  c = color(231,206,0);
  colors[6] = c;
  c = color(72,22,108);
  colors[7] = c;
  c = color(44,164,74);
  colors[8] = c;


}

function getRandomColor() {

  var i = Math.floor(random(colors.length));
  var c = colors[i];
  return c;

}

function Particle(x, y, t) {
  this.x = x;
  this.y = y;
  this.t = t;
  
  this.show = function(currentT) {
    var _ratio = t / currentT;
    _alpha = map(_ratio, 0, 1, 0, 255); //points will fade out as time elaps
    fill(255, 255, 255, _alpha);
    ellipse(x, y, 5, 5);
  }
}
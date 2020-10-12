// Constants
const Y_AXIS = 1;
const X_AXIS = 2;
const cols = 20;
const rows = 20;
var t = 0;
var particleArray = [];
var colors = [];
let c1, c2;

function setup() {
  createCanvas(600, 600);
  background(0);
  c1 = color(255, 255, 255);
  c2 = color(0, 0, 0);
  fill(100);
  frameRate(6000)
}

// blue grid
function draw() {
  for (var c = 0; c < cols; c++) {
    for (var r = 0; r < rows; r++) {
        var XO = 0 + c * 50;
        var YO = 0 + r * 50;
        stroke(0);
        fill(100,149,237);
        rect(XO, YO, 50, 50);
    }
  }

  //curve
  y = width / 2 +  270 * sin(3 * t + PI / 2) - 25;
  x = height / 2 + 270 * sin(1 * t) - 25;

  particleArray.push(new Particle(x, y, t));
  for (i=0; i<particleArray.length; i++) {
    particleArray[i].show(t);
  }
  if (particleArray.length > 50) {
    particleArray.shift();
  }
  t += .01;
}

function Particle(x, y, t) {
  this.x = x;
  this.y = y;
  this.t = t;
  
  this.show = function(currentT) {
    var _ratio = t / currentT;
    _alpha = map(_ratio, 0, 1, 0, 255); //points will fade out as time elaps
    fill(255, _alpha);
    ellipse(x, y, 5, 5);
  }
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

function creatColorMap() {
  
}

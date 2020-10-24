/*
 * @name RandomVenctor
 * @description Random venctor generation.
 */
// Define fundamental variables
const cols = 30;
const rows = 30;
let x, y;
var col
var colors = [];
var particleArray = [];
let fr = 17
var t = 0;
var cur_col = 0;
var block = 50

function setup() {
  let p5_canvas = createCanvas(1200 , 1200);
  canvas = p5_canvas.canvas
  frameRate(fr)
  addColors();
  grid()
}

function draw() {
  grid()
  translate(width/2, height/2)
  v = p5.Vector.random2D(1000, 1200).mult(400)
  makeRibbons(v)
  // let secondsElapsed = frameCount/fr;
  // console.log(secondsElapsed)
}

function makeRibbons(v) {
  particleArray.push(new Ribbon(x, y, t, v));
  for (i=0; i<particleArray.length; i++) {
    particleArray[i].show(t);
  }
  if (particleArray.length > 12) {
    // particleArray.shift();
    particleArray.shift()
  }
  t += 1;
}

function grid() {
  // background(0)
  strokeWeight(0.5)
  for (let col = 0; col < cols; col++) {
    for (var r = 0; r < rows; r++) {
        var XO = 0 + col * block;
        var YO = 0 + r * block;
        // stroke('white')
        fill('black')
        // fill(185, 208, 140)
        stroke('#E062C4');
        // fill('#62E07F');
        rect(XO, YO, 50, 50);
    }
  }
}
function genColors(c, offset) {
  let value = (red(c) + green(c) + blue(c))/3;
  let newValue = value + (2*random() * offset - offset);
  let valueRatio = newValue / value;
  let newColor = color(0,0,0)
  newColor.setRed(red(c) * valueRatio)
  newColor.setGreen(green(c) * valueRatio);
  newColor.setBlue(blue(c) * valueRatio);
  // console.log(red(newColor), green(newColor), blue(newColor))
  return newColor;
}

function addColors() {
  let offset = -30
  // let c = color(random(1, 255), random(1, 255), random(1, 255))
  // let c = color(36, 24, 46);
  let c = color(143, 20, 124)
  colors[0] = c
  for(let i = 1; i < 3; i++){
    colors[i] = genColors(colors[i - 1], offset);
  }
  console.log(colors)
}

function getNextColor() {
  if (cur_col >= colors.length - 1) {
    cur_col = 0
  } else {
    cur_col = cur_col + 1
  }
  var nextCol = colors[cur_col];
  console.log(nextCol)
  return nextCol;

}

function Ribbon(x, y, t, v) {
  this.show = function(currentT) {
    _ratio = t / currentT;
    _alpha = map(_ratio, 0, 1, 0, 255); //points will fade out as time elaps    
    col = getNextColor();
    console.log(col)
    noFill()
    // fill(col)
    this.x = x;
    this.y = y;
    this.t = t;
  
    this.strokeW = 0.5;
  
    this.amount = 90;
    this.frequency = random(0.9, 1.0) / 17;
    this.offset = v.y;
    this.startY = 0;
    let mod = 2.3
    strokeWeight(this.strokeW);
  

    stroke(col, _alpha);
    beginShape();
      vertex(v.x, this.startY);
        for (let c=this.amount/2; c < this.amount; c++) {
          var sinoffset = sin(this.frequency*c);
          var sinX = c*(v.y/this.amount);
          var sinY = (sinoffset*this.offset);
          bezierVertex(sinX*mod,sinY/mod,sinX, sinY - 1,sinX/mod,sinY/mod);
        }
    endShape();
    fill(col)
    // rect(-block/2,-block*2,block,block*4);  
  }
}


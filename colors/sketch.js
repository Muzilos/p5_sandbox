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
let fr = 24
var t = 0;
// the canvas capturer instance
var capturer 
// capturer = new CCapture({
//   format: "png",
//   framerate: fr,
//   name: "noise_visualization",
//   quality: 100
// });
// const btn = document.querySelector('button')

function setup() {
  let p5_canvas = createCanvas(1200 , 1200);
  canvas = p5_canvas.canvas
  frameRate(fr)
  addColors();
  grid()
  if (capturer) capturer.start()
}

function draw() {
  grid()
  translate(width/2, height/2)
  v = p5.Vector.random2D(1000, 1200).mult(400)
  makePolygons(v, 1)
  fill(0,0,0)
  ellipse(0,0,width/5,height/5);

  let secondsElapsed = frameCount/fr;
  // console.log(secondsElapsed)
  if( capturer ) {
    capturer.capture( canvas );
    if (secondsElapsed >= 5) { 
      console.log('Saving') 
      capturer.stop();  
      capturer.save();
    }
  }
}

function makePolygons(v, mod) {
  particleArray.push(new Polygon(x, y, t, v, mod));
  for (i=0; i<particleArray.length; i++) {
    particleArray[i].show(t);
  }
  if (particleArray.length > 10) {
    // particleArray.shift();
    particleArray.shift()
  }
  t += 0.01;
}

function grid() {
  // background(0)
  for (let col = 0; col < cols; col++) {
    for (var r = 0; r < rows; r++) {
        var XO = 0 + col * 50;
        var YO = 0 + r * 50;
        // stroke('white')
        fill('black')
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
  console.log(red(newColor), green(newColor), blue(newColor))
  return newColor;
}

function addColors() {
  let offset = 29
  let c = color(random(1, 255), random(1, 255), random(1, 255))
  colors[0] = c
  for(let i = 1; i < 12; i++){
    colors[i] = genColors(colors[i - 1], offset);
  }
  console.log(colors)
}

function getRandomColor() {
  var i = Math.floor(random(colors.length));
  var c = colors[i];
  return c;

}

function Polygon(x, y, t, v, mod) {
  this.show = function(currentT) {
    _ratio = t / currentT;
    _alpha = map(_ratio, 0, 1, 0, 255); //points will fade out as time elaps    
    col = getRandomColor();
    noFill()
    // fill(col, 120)
    this.x = x;
    this.y = y;
    this.t = t;
  
    this.strokeW = 0.5;
  
    this.amount = 90;
    this.frequency = random(0.9, 1.0) / 17;
    this.offset = v.y;
    this.startY = 0;
    strokeWeight(this.strokeW);
  

    stroke(col, _alpha);
    beginShape();
      vertex(v.x, this.startY);
        for (let c=this.amount/2; c < this.amount; c++) {
          var sinoffset = sin(this.frequency*c);
          var sinX = c*(v.y/this.amount);
          var sinY = (sinoffset*this.offset);
          bezierVertex(sinX/mod,sinY/mod,sinX,sinY + 1,sinX,sinY/mod);
        }
    endShape();
  }
}

// function exportCCapture() {
//   console.log('Saving capture')
//   capturer.save()
// }
// btn.onclick = exportCCapture;

/**
 * 
 * [ 211, 140, 55, … ]
 * [ 46, 236, 166, … ]
 * [ 76, 44, 84, … ]
 * [ 143, 20, 124, … ]
 * [ 15, 41, 63, … ]
 * 
 */

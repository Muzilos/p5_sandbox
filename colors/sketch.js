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
let fr = 60
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
  makeRibbons(v)
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

function makeRibbons(v) {
  particleArray.push(new Ribbon(x, y, t, v));
  for (i=0; i<particleArray.length; i++) {
    particleArray[i].show(t);
  }
  if (particleArray.length > 10) {
    // particleArray.shift();
    particleArray.shift()
  }
  t += 1;
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
  c.setRed(red(c) * valueRatio)
  c.setGreen(green(c) * valueRatio);
  c.setBlue(blue(c) * valueRatio);

  return c;
}

function addColors() {
  let offset = 0
  var c = color(random(1, 255), random(1, 255), random(1, 255))
  console.log(c)
  c =  genColors(c, offset);
  console.log(c)
  colors[0] = c;
  c = genColors(c, offset);
  colors[1] = c;
  c = genColors(c, offset);
  colors[2] = c;
  c = genColors(c, offset);
  colors[3] = c;
  c = genColors(c, offset);
  colors[4] = c;
  c = genColors(c, offset);
  colors[5] = c;
  c = genColors(c, offset);
  colors[6] = c;
  c = genColors(c, offset);
  colors[7] = c;
  c = genColors(c, offset);
  colors[8] = c;
}

function getRandomColor() {
  var i = Math.floor(random(colors.length));
  var c = colors[i];
  return c;

}

function Ribbon(x, y, t, v) {
  this.show = function(currentT) {
    _ratio = t / currentT;
    _alpha = map(_ratio, 0, 1, 0, 255); //points will fade out as time elaps    
    col = getRandomColor();
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
    strokeWeight(this.strokeW);
  

    stroke(col, _alpha);
    beginShape();
      vertex(v.x, this.startY);
        for (let c=this.amount/2; c < this.amount; c++) {
          var sinoffset = sin(this.frequency*c);
          var sinX = c*(v.y/this.amount);
          var sinY = (sinoffset*this.offset);
          bezierVertex(sinX,sinY,sinX,sinY - 1,sinX,sinY);
        }
    endShape();
  }
}

// function exportCCapture() {
//   console.log('Saving capture')
//   capturer.save()
// }
// btn.onclick = exportCCapture;

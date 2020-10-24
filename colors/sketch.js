/*
 * @name RandomVenctor
 * @description Random venctor generation.
 */
// Define fundamental variables
const cols = 30;
const rows = 30;
let x, y;
var particleArray = [];
let fr = 24
var t = 0;
var outerEyeCol
var innerEyeCol

var mainCol = new Colors()
var bgCol = new Colors()
var midCol = new Colors()

function setup() {
  let p5_canvas = createCanvas(1200 , 1200);
  canvas = p5_canvas.canvas
  frameRate(fr)
  mainCol.addColors(5);
  bgCol.addColors(15);
  midCol.addColors(2);
  innerEyeCol = mainCol.genColors(mainCol.colors[0], -100);
  outerEyeCol = mainCol.genColors(mainCol.colors[mainCol.colors.length - 1], 100);
  grid()
}

function draw() {
  // grid()
  translate(width/2, height/2)
  
  v = p5.Vector.random2D(width, height).mult(500)
  bgPolygons(v, 150, midCol, 7)

  v = p5.Vector.random2D(width, height).mult(1000)
  bgPolygons(v, 500, bgCol,5)

  fill(bgCol.getCol())
  ellipse(0,0,width/1.4,height/1.4);

  eyeShape(width/3, width/6, width/4, outerEyeCol)
  eyeShape(width/4, width/6, width/4, innerEyeCol)
  v = p5.Vector.random2D(1000, 1200).mult(400)
  makePolygons(v, 1)
  fill(0,0,0, 200)
  ellipse(0,0,width/5,height/5);
  eyeGlint(color(255, 120))
  let secondsElapsed = frameCount/fr;
}

function makePolygons(v, mod) {
  particleArray.push(new CustomPolygon(x, y, t, v, mod));
  for (i=0; i<particleArray.length; i++) {
    particleArray[i].show(t);
  }
  if (particleArray.length > 10) {
    // particleArray.shift();
    particleArray.shift()
  }
  t += 0.01;
}

function bgPolygons(v, rad, col_ref, sides) {
  fill(col_ref.getNextColor());
  polygon(v.x, v.y, rad, sides)
}


function grid() {
  // background(0)
  for (let col = 0; col < cols; col++) {
    for (var r = 0; r < rows; r++) {
        var XO = 0 + col * 50;
        var YO = 0 + r * 50;
        // fill('black')
        fill(185, 208, 140)
        stroke('#E062C4');
        // fill('#62E07F');
        rect(XO, YO, 50, 50);
    }
  }
}

function Colors() {
  this.col
  this.colors = [];
  this.cur_col = 0;
  
  this.addColors = function(offset) {
    let c = color(random(1, 255), random(1, 255), random(1, 255))
    // let c = color(208, 142, 77)
    this.colors[0] = c
    for(let i = 1; i < 30; i++){
      this.colors[i] = this.genColors(this.colors[i - 1], offset);
    }
    console.log(this.colors)
  }

  this.getNextColor = function() {
    if (this.cur_col >= this.colors.length - 1) {
      this.cur_col = 0
    } else {
      this.cur_col = this.cur_col + 1
    }
    var c = this.colors[this.cur_col];
    // stroke(c)
    return c;
  }

  this.genColors = function(c, offset) {
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

  this.getCol = function() {
    return this.colors[this.cur_col]
  }
}


function eyeShape(edge1, edge2, edge3, eyeCol) {
  fill(eyeCol, 120)
  strokeWeight(0.5);
  stroke(eyeCol);
  beginShape();
    vertex(-edge1,0);
    bezierVertex(-edge2,-edge3,edge2,-edge3,edge1,0);
    bezierVertex(edge2,edge3,-edge2,edge3,-edge1,0)
  endShape();
}

function eyeGlint(eyeCol) {
  fill(eyeCol, 120)
  strokeWeight(0.5);
  stroke(eyeCol);
  beginShape();
    vertex(50, 50)
    rotate(-45)
    bezierVertex(30,-70,-70,-90,20,0);
  endShape();
}

function CustomPolygon(x, y, t, v, mod) {
  this.show = function(currentT) {
    _ratio = t / currentT;
    _alpha = map(_ratio, 0, 1, 0, 255); //points will fade out as time elaps    
    col = mainCol.getNextColor();
    noFill()
    fill(col, _alpha)
    this.x = x;
    this.y = y;
    this.t = t;
  
    this.strokeW = 0.5;
    stroke(col)
  
    this.amount = 90;
    this.frequency = random(0.9, 1.0) / 17;
    this.offset = v.y;
    this.startY = 0;
    strokeWeight(this.strokeW);
  

    stroke(col, _alpha);
    beginShape();
      vertex(v.x, this.startY);
        for (let c=this.amount/2; c < this.amount; c++) {
          push();
          // translate(this.frequency, height * 0.5);
          rotate(frameCount / -1.0);
          polygon(0, 0, 200, 12);
          pop();
        }
    endShape();
  }
}

function polygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

/**
 * 
 * [ 211, 140, 55, … ]
 * [ 46, 236, 166, … ]
 * [ 76, 44, 84, … ]
 * [ 143, 20, 124, … ]
 * [ 15, 41, 63, … ]
 * [ 244, 186, 96, … ]
 * [ 208, 142, 77, … ]
 * [ 185, 208, 140, … ]
 * [ 202, 192, 2, … ]
 * [ 103, 190, 225, … ]
 * 
 */

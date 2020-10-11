/*
 * @name Animation
 * @description The circle moves.
 */
// Where is the circle
let x, y;
var h_center
var w, h
let fr = 600

function setup() {
  createCanvas(500, 400);
  w = width
  h = height
  w_center = w / 2
  h_center = h / 2
  // Starts in the middle
  x = h_center;
  y = height /2;
  frameRate(fr)
  background('#fae')
}

function draw() {
  store()
  door()
}

function store() {
  // Draw a rect
  stroke(100);
  fill(100);
  rect(x, y, 24, 24);
  
  // Jiggling randomly on the horizontal axis
  x = w_center + random(-w/5, w/5);
  // Moving up at a constant speed
  y = h_center + random(-h/5, h/5);
  
  // Reset to the bottom
  if (y < 0 || y > h) {
    y = h_center;
  }
}

function door() {
    let mod_x = 0.175
    let mod_y = 0.4
    // Draw a rect
    stroke(0);
    fill('#faf');
    rect((x * mod_x), (y * mod_y), 5, 5);
    
    // Jiggling randomly on the horizontal axis
    x = w_center + random(-(w * mod_x)/5, (w * mod_x)/5);
    // Moving up at a constant speed
    y = h_center + random(-(h * mod_y)/5, (h * mod_y)/5);
    
    // Reset to the bottom
    if (y < 0 || y > h) {
      y = (h_center * mod_y);
    }  
}
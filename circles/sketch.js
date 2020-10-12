/*
 * @name Animation
 * @description The circle moves.
 */
// Where is the circle
let x, y;
var h_center
var w, h
let fr = 300


function setup() {
  createCanvas(1280, 1080);
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
  store(20, 40)
  door(10, 10)
}

function store(size_x, size_y) {
  // Draw a rect
  stroke(100);
  fill(100);
  rect(x, y, size_x, size_y);
  
  // Jiggling randomly on the horizontal axis
  x = w_center + random(-w/5, w/5);
  // Moving up at a constant speed
  y = h_center + random(-h/5, h/5);
  
  // Reset to the bottom
  if (y < 0 || y > h) {
    y = h_center;
  }
}

function door(size_x, size_y) {
    let mod_x = 0.175
    let mod_y = 0.4
    // Draw a rect
    stroke(0);
    fill('#faf');
    rect((x * mod_x), (y * mod_y), size_x, size_y);
    
    // Jiggling randomly on the horizontal axis
    x = w_center + random(-(w * mod_x)/5, (w * mod_x)/5);
    // Moving up at a constant speed
    y = h_center + random(-(h * mod_y)/5, (h * mod_y)/5);
    
    // Reset to the bottom
    if (y < 0 || y > h) {
      y = (h_center * mod_y);
    }  
}

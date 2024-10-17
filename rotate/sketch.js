// Rotation and Translate Demo
// James Mitchell
// 10/17/24


function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  rectMode(CENTER);
}

function draw() {
  background(220);

  push(); //saves the transomrmation before we do anything
  translate(200,200);
  rotate(mouseX);
  fill("red");
  rect(0,0,100,200);
  pop(); //reset to the translate before the translate
  fill("green");
  rect(width/2, height - 200, width*2, 400);
}

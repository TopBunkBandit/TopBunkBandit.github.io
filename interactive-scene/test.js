// Project Title
// Riley Sane
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
// make plinko idiot

let score = 0;
let dropperX = 250;
let dropperY = 0;
function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(220);
  rect(dropperX, dropperY, 50, 50);
  moveDropper();
  drawPegs();
  scoreFuncs();
}

function moveDropper() {
  if (dropperX >= 0) {
    if (keyIsDown(37)) {
      dropperX = dropperX - 4;
    }
  }
  if (dropperX + 50 <= 600) {
    if (keyIsDown(39)) {
      dropperX = dropperX + 4;
    }
  }
}

function drawPegs() {
  for (let y = 90; y < height - 120; y += 120) {
    for (let x = 30; x < width; x += 60) {
      circle(x, y , 15);
    }
  }
  for (let y = 150; y < height ; y += 120) {
    for (let x = 60; x < width - 30; x += 60) {
      circle(x, y , 15);
    }
  }
}

function scoreFuncs() {
  for (let x = 0; x < width; x += width/5) {
    rect(x, height - 20, width/5, 20);
  }
  text("5", width / 2, height - 5);
  text("5", 60, height - 5);
  text("5", 180, height - 5);
  text("5", 420, height - 5);
  text("5", 540, height - 5);
}
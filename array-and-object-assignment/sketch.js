// the thingy
// James Mitchell
// 9/10/24
//basically a shooting targets game
//dunno how to rotate anything so lets see how this goes
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let v0;
let v1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  v1 = createVector(30, 0);
  v0 = createVector(100, 50);
}

function draw() {
  background(220);
  
  // rotatingExample(v0, v1);
  // v1.rotate(0.01);
  point(v1, v0);

}

function testing() {
  background(220);
  let p1 = createVector(25, 25);
  let p2 = createVector(75, 75);

  strokeWeight(5);
  point(p1);
  point(p2.x, p2.y);
}

// function rotatingExample(a, b){
//   push();
//   strokeWeight(5);
//   translate(a.x, a.y);
//   line(0, 0, b.x, b.y);
//   rotate(vec.heading());
//   let arrowSize = 7;
//   translate(b.mag() - arrowSize, 0);
//   triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
//   pop();

// }



//for refrence so i dont lose the examples
//   // Rotate v1.
//   v1.rotate(0.1);

//   // Draw the black arrow.
//   drawArrow(v0, v1);
// }

// // Draws an arrow between two vectors.
// function drawArrow(base, vec) {
//   push();
//   strokeWeight(4);
//   translate(base.x, base.y);
//   line(0, 0, vec.x, vec.y);
//   rotate(vec.heading());
//   let arrowSize = 7;
//   translate(vec.mag() - arrowSize, 0);
//   triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
//   pop();
// }
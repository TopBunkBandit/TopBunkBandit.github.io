// the thingy
// James Mitchell
// 9/10/24
//basically a shooting targets game, you hit the enemy rectangles while avoiding the friendly rectangles
// dunno how to rotate anything so lets see how this goes
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let v0;
let v1;
let thePlanes = [];
let x = 0;
let y = 0;
let planeSpeed;

function setup() {
  createCanvas(windowWidth, windowHeight);
  v1 = createVector(30, 0);
  v0 = createVector(100, 50);
}

function draw() {
  background(220);
  spawnPlanes(x,y);
  displayPlane();
  movePlanes();
}

function movePlanes(){
  for (plane of thePlanes){
    plane.x += 1;
    plane.x2 +=1;
  }
}

//works for making a black rect at a location
function spawnPlanes(x, y){
  let somePlane = {
    x: x,
    x2: x +50,
    y: y,
    y2: y + 20,
    speed: planeSpeed * random(0.75, 1.25)

  };
  thePlanes.push(somePlane);

}

function displayPlane(){
  for (let plane of thePlanes){
    noStroke;
    fill("black");
    rect(plane.x, plane.y, plane.x2, plane.y2 );

  }
}




// function testing() {
//   background(220);
//   let p1 = createVector(25, 25);
//   let p2 = createVector(75, 75);

//   strokeWeight(5);
//   point(p1);
//   point(p2.x, p2.y);
// }

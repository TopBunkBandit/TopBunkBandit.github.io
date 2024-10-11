// Budget Space Invader
// James Mitchell
// 9/10/24
// current goals:
// spawn enemys and have them move down when the hit the side
// change movement to move them over by a certin amount and wait a second before going again
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let theShips = [];
let x = 0;
let y = 0;
let spawnX = 0;
let spawnY = 0;
let shipsSpeed = 5;
let goDown = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnships(spawnX,spawnY);
}

function draw() {
  background(220);
  moveshipss();
  shouldGoDown();
  displayships();
}

function moveshipss(){
  for (ships of theShips){
    ships.x += ships.speed;
  }
}

//works for making a black rectangle at a location
function spawnships(x, y){
  let someships = {
    x: x,
    enemyWidth: 50,
    y: y,
    enemyHeight: 15,
    speed: shipsSpeed * random(0.9, 1.1)
  };
  theShips.push(someships);
}

//should move the rectangle by a set amount
function displayships(){
  for (let ships of theShips){
    noStroke;
    fill("black");
    rect(ships.x, ships.y, ships.enemyWidth, ships.enemyHeight );
  }
}

//
function shouldGoDown(){
  for (let ships of theShips){
    if (ships.enemyWidth + ships.x >= width || ships.enemyWidth + ships.x < 0){
      ships.x *= -1;
      ships.x = -100;
      ships.y += 5;
    }
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

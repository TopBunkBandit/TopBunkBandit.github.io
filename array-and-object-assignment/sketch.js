// Budget Space Invader
// James Mitchell
// 9/10/24
// current goals:
// add the little person at the bottom to destroy the ships
// add ability for ships to drop bombs once per row
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let theShips = [];
let x = 0;
let y = 0;
let spawnX = 0;
let spawnY = 0;
let shipsSpeed = 20;
let goDown = false;
let lastTimeMoved = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnships();

  window.setInterval(spawnships, 3000);
}

function draw() {
  background(220);
  moveships();
  shouldGoDown();
  displayships();
}


function moveships(){
  for (ships of theShips){
    if (ships.lastMoved < millis()){
      ships.x += ships.speed;
      ships.lastMoved = millis() + 500;
    }
  }
}

//works for making a black rectangle at a location
function spawnships(){
  let someships = {
    x: 0,
    enemyWidth: 50,
    y: 0,
    enemyHeight: 15,
    speed: shipsSpeed,
    lastMoved: lastTimeMoved,
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

//detects if the ship hads reached the edge of the screen and reverses its direction
function shouldGoDown(){
  for (let ships of theShips){
    if (ships.enemyWidth + ships.x > width){
      ships.x += -ships.speed;
      ships.speed *= -1;
      ships.y += 20;
    }
    if (ships.x < 0){
      ships.x += 21;
      ships.speed *= -1;
      ships.y += 20;
    }
  }
}


// millis > lastTimeMoved
// Budget Space Invader
// James Mitchell
// 9/10/24
// current goals:
// add the little person at the bottom to destroy the ships
// add ability for ships to drop bombs once per row
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let theShips = [];
let deathLocation = [];
let x = 0;
let y = 0;
let spawnX = 0;
let spawnY = 0;
let shipsSpeed = 20;
let goDown = false;
let lastTimeMoved = 0;
let centerX;
let rotateRect = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnships();
  centerX = width/2;
  angleMode(DEGREES);

  window.setInterval(spawnships, 3000);
}

function draw() {
  background(220);
  // rotate(0);
  moveships();
  shouldGoDown();
  displayships();
  playerBase();
  // rotate(100);
  playerRect();
  
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

function playerBase(){
  noStroke();
  fill("white");
  circle(centerX, windowHeight, 75);
}

function playerRect(){
  if (keyIsDown(LEFT_ARROW)){
    rotateRect += 0.1;
  }
  if (keyIsDown(RIGHT_ARROW)){
    rotateRect -= 0.1;
  }
  noStroke();
  fill("white");
  // rect(centerX, windowHeight, 100, 200);
  rotate(rotateRect);
  rect(200, 700, 50, 100);
  
}



// THIS WORKS FOR CHANGING THE ANGLE MAYBE 
// USE ROTATERECT FOR THE ANGLE AT WHICH IT WILL ROTATE???
// JUST NEED TO MAKE THE RECT EITHER NOT CHANGE ITS Y AXIS OR MAKE IT IN A SIZE/SHAPE WHERE ITS NOT GOING TO BE NOTICABLE
// if (keyIsDown LEFT_ARROW){
//  leftRotate += 0.1
//}


// not working on it yet but this is the begining code for the enemy destruction

// function dropBombs(){
//   for (let bomb of deathLocation){
//     bomb;
//   }
// }

// function isRectDead(x, y){
//   let grave = {
//     deathX: x,
//     deathY: y,
//   };
//   deathLocation.push(grave);
// }

// function mousePressed(){
//   for (ship of theShips){
//     if (collison){

//     }
//   }
// }

// function collision(x,y,theShips){
//   let distanceAway = dist(x,y, theShips.x, theShips.y);
//   return distanceAway < theShips.x + theShips.enemyWidth && distanceAway < theShips.y + theShips.enemyHeight;

// }
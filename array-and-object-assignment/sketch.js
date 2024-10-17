// Poorly Made Budget Space Invader
// James Mitchell
// 9/10/24
// current goals:
// add the little person at the bottom to destroy the ships
// add ability for ships to drop bombs after they are destroyed, needs to be implemented along with player movement along the X axis
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let theShips = [];
let deathLocation = [];
let playerProjectiles = [];
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
  rectMode(CENTER);

  window.setInterval(spawnships, 3000);
}

function draw() {
  background(220);
  moveships();
  shouldGoDown();
  displayships();
  playerRect();
  playerBase();  
  movePlayerProjectiles();
  showPlayerProjectile();
}

//makes the ships move in more blocky movements, allowing the player to have time to react
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
    x: 10,
    enemyWidth: 50,
    y: 10,
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

//creates the white circle at the bottom of the map where the player is located
function playerBase(){
  stroke(1);
  fill("white");
  circle(centerX, windowHeight, 100);
}

//creates the "weapon" that the player will use, it rotates to match the direction the player wants it to
function playerRect(){
  if (keyIsDown(LEFT_ARROW)){
    rotateRect += 1;
  }
  if (keyIsDown(RIGHT_ARROW)){
    rotateRect -= 1;
  }
  stroke(1);
  fill("white");
  push();
  translate(250, 700);
  rotate(rotateRect);
  rect(-5, 25, 50, 100);
  pop();
}

function keyPressed(){
  if (keyIsDown(32)){
    let projectile = {
      x: 10,
      y: 10,
      radius: 25,
      speedX: 10,
      speedY: 15,
    };
    playerProjectiles.push(projectile);
  }
}

function movePlayerProjectiles(){
  for (projectiles of playerProjectiles){
    projectiles.x += projectiles.speedX;
    projectiles.y += projectiles.speedY;

  }
}

function showPlayerProjectile(){
  for (let projectile of theShips){
    noStroke;
    fill("dark green");
    circle(projectile.x, projectile.y, projectile.radius);
  }
}

// not working on it yet but this is the shell code for the enemy destruction

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
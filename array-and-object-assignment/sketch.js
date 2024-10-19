// The Game
// James Mitchell
// 9/10/24
// current goals:
// change the balls to fire at a angle and keep that angle reguardless of what the rotateRect changes to
// Extra for Experts:
// as far as im aware nothing

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
let circleCenter;
let rectCenterX;
let rectCenterY;
let moveInterval = 500;
let waitTime = 1000;
let lastTimeFired = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnships();
  centerX = width/2;
  circleCenter = height - 75;
  angleMode(DEGREES);
  // rectMode(CENTER);

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
  killOffEntitys();
}

//makes the ships move in more blocky movements, allowing the player to have time to react
function moveships(){
  for (ships of theShips){
    if (ships.lastMoved < millis()){
      ships.x += ships.speed;
      ships.lastMoved = millis() + moveInterval;
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
  circle(centerX, windowHeight, 150);
}

//creates the "weapon" that the player will use, it rotates to match the direction the player wants it to
function playerRect(){
  if (keyIsDown(LEFT_ARROW) && rotateRect > -40){
    rotateRect -= 0.5;
  }
  if (keyIsDown(RIGHT_ARROW) && rotateRect < 40){
    rotateRect += 0.5;
  }
  stroke(1);
  fill("white");
  push();
  rectMode(CENTER);
  translate(centerX - 25, circleCenter);
  rotate(rotateRect);
  rectCenterX = 20;
  rectCenterY = 25;
  rect(20, 15, 50, 100);
  pop();
}



//working on creating the projectiles
function keyPressed(){
  if (lastTimeFired < millis())
    if (keyIsDown(32)){
      let projectile = {
        ax: width/2,
        ay: height - 100,
        speedX: 1,
        speedY: 1,
        radius: 25,
      };
      playerProjectiles.push(projectile);
      lastTimeFired = millis() + waitTime
    }
    
}

//get the balls to move with a X increase based off of rotateRect at the time that the ball is launched
//currently running into issues with the balls keeping the rotateRect and moving with the rect
// they should be moving in that direction and not change direction no matter what

//idea instead of really launching the projectile, create a variable/array that will create a point for the ball to follow 
function movePlayerProjectiles(){
  for (projectiles of playerProjectiles){
    projectiles.ay -= projectiles.speedY + 3;
    projectiles.ax += rotateRect/5;
    
  }
}


//Displays the players projectiles
function showPlayerProjectile(){
  for (let projectile of playerProjectiles){
    noStroke;
    fill("purple");
    circle(projectile.ax, projectile.ay, 25);
  }
}


function killOffEntitys(){
  //removes any ships that go below the window height, will be changed later for a lose screen
  for (ship of theShips){
    if (ship.y >= height){
      let theIndex = theShips.indexOf(ship);
      theShips.splice(theIndex, 1);
    }
  }

  //removes all projectiles that leave the window to help reduce some lag when to many projectiles are being checked for colision
  for (projectile of playerProjectiles){
    if (projectile.ay < -15 || projectile.ax < -15 || projectile.ax > windowWidth + 15){
      let theIndex = playerProjectiles.indexOf(projectile);
      playerProjectiles.splice(theIndex, 1);
    } 
  }

  //collisions between the ball and the enemy
  for (ship of theShips){
    for (projectile of playerProjectiles){
      let closeX = projectile.ax;
      let closeY = projectile.ay;

      if (projectile.ax > ship.x + ship.enemyWidth) {
        closeX = ship.x + ship.enemyWidth;
      } else if(projectile.ax < ship.x){
        closeX = ship.x;
      }
      
      if (projectile.ay > ship.y + ship.enemyHeight){
        closeY = ship.y + ship.enemyHeight;
      } else if (projectile.ay < ship.y) {
        closeY = ship.y;
      }

      let distX = closeX - projectile.ax;
      let distY = closeY - projectile.ay;
      let distance = sqrt((distX * distX) + (distY * distY));

      if (distance <= projectile.radius){
        console.log("Hello World")
        let test = theShips.indexOf(ship);
        theShips.splice(test, 1);
        let test2 = playerProjectiles.indexOf(projectile);
        playerProjectiles.splice(test2, 1);
        moveInterval -= 50;
  
      } 

    }
  }

}

// not working on it yet but this is the shell code for the enemy destruction
// make sure that you check for all rects on all balls, else it may cause issues
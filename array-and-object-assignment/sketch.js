// The Game
// James Mitchell
// 9/10/24
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
let gameState = "title";
let start = false;
let bestScore = 0;
let lastRoundScore = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnships();
  centerX = width/2;
  circleCenter = height - 75;
  angleMode(DEGREES);
  // rectMode(CENTER);

  window.setInterval(spawnships,3000);
}

function draw() {
  background(200,100,40);
  if (gameState === "title"){
    displayStartScreen();
  }

  else if (gameState === "playing"){
    moveships();
    shouldGoDown();
    displayships();
    playerRect();
    playerBase();  
    movePlayerProjectiles();
    showPlayerProjectile();
    killOffEntitys();
  }

  else{
    displayEndScreen()
  }

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

//makes a entity used as the enemy
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

//displays the enemys, pretty self explanitory
function displayships(){
  for (let ships of theShips){
    noStroke;
    fill("black");
    rect(ships.x, ships.y, ships.enemyWidth, ships.enemyHeight );
  }
}

//detects if the ship hads reached the edge of the screen and reverses its direction, as well as moving it down towards the player slightly
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
  fill("blue");
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
  fill("lightblue");
  push();
  rectMode(CENTER);
  translate(centerX, circleCenter);
  rotate(rotateRect);
  rectCenterX = 20;
  rectCenterY = 25;
  rect(0, 0, 50, 100);
  pop();
}


//when the spacebar is pressed it spawns a projectile with a set angle
function keyPressed(){
  if (lastTimeFired < millis())
    if (keyIsDown(32)){
      let projectile = {
        ax: width/2,
        ay: height - 100,
        speedX: 1,
        speedY: 1,
        radius: 25,
        angle: rotateRect,
      };
      playerProjectiles.push(projectile);
      lastTimeFired = millis() + waitTime
    }
    
}

//moves the players 'bullets' at the angle they were fired from
function movePlayerProjectiles(){
  for (projectiles of playerProjectiles){
    projectiles.ay -= projectiles.speedY + 3;
    projectiles.ax += projectiles.angle/5;
    
  }
}

//Displays the players projectiles
function showPlayerProjectile(){
  for (let projectile of playerProjectiles){
    noStroke;
    fill("white");
    circle(projectile.ax, projectile.ay, 25);
  }
}


//removes unnessicary entitys if certin conditions are met
function killOffEntitys(){
  //ends the game if any enemys reach the player base
  for (ship of theShips){
    if (ship.y >= height - 150 && ship.x >= width/2){
      let theIndex = theShips.indexOf(ship);
      theShips.splice(theIndex, 1);
      gameState = "end"
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
      } 
      else if(projectile.ax < ship.x){
        closeX = ship.x;
      }
      
      if (projectile.ay > ship.y + ship.enemyHeight){
        closeY = ship.y + ship.enemyHeight;
      } 
      else if (projectile.ay < ship.y) {
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
        moveInterval -= 40;
        lastRoundScore += 1
  
      } 

    }
  }

}

//any time the program ends it will display the end screen
function displayEndScreen(){
  if (bestScore <= lastRoundScore){
    bestScore = lastRoundScore;
  } 
  background(200,100,40)
  textAlign(CENTER);
  fill(255)
  textSize(20)
  text("Game Over :(", width/2, height/2 - 75)
  text("your score:" , width/2, height/2 - 50)
  text(lastRoundScore, width/2, height/2 - 25)
  text("high score:", width/2, height/2)
  text(bestScore, width/2, height/2 + 25)
  text("Press this button to play again", width/2, height/2 + 150)
  rect(width/2 - 100 ,height/2 + 175, 200, 50 )
  
  if (start){
    gameState = "playing";
    theShips.splice(0,1000)
    moveInterval = 500;
    spawnships();
    start = false;
    lastRoundScore = 0

  }

}

//when program starts for the first time it will show the start screen
function displayStartScreen(){
  background(200,100,40)
  textAlign(CENTER);
  fill(255)
  textSize(20)
  text("Welcome to the game", width/2, height/2 - 75)
  text("The Goal is to destroy as many enemy rectangles as possible before they reach you :)", width/2, height/2 - 50)
  text("With each enemy you destroy they become faster", width/2, height/2 - 25)
  text("CONTROLS", width/2, height/2)
  text("Left arrow to rotate left", width/2, height/2 + 25)
  text("Right arrow to rotate right", width/2, height/2 + 50)
  text("Space bar to fire", width/2, height/2 + 75)
  text("Please do note that this game is very boring, this was unintentional", width/2, height/2 + - 200)
  text("Press this button to begin", width/2, height/2 + 150)
  rect(width/2 - 100 ,height/2 + 175, 200, 50 )

  if (start){
    gameState = "playing";
    start = false;
  }
  
}

//only used to start/restart the game
function mousePressed(){
  if (mouseX < width/2 + 100 && mouseX > width/2 - 100 && mouseY > height/2 + 125 && mouseY < height/2 + 225){
    start = true;
  } 
} 
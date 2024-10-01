// dodge the ball(?)
// James Mitchell
// 25/9/2024
// a little dodging game(?) avoid the other ball if you want, 
// controls are WASD for movement, double click restarts the game and scroll wheel changes your speed
// Extra for Experts:
// - mousewheel changes speed, changing the shape of the window will automatically reset the game as to prevent any issues with the borders, dunno if that counts for anything
// NOTE: this game will start out slow and progressively get faster, as such playing with a large window will cause the game to feel slower for longer and with a smaller window 
//it will feel faster. up to the player to decide if they are patient enough to play full screen or windowed
//PLEASE NOTE: the game is a little buggy and you need to double click when starting the game for the first time to get both balls to work, 
//otherwise it will just be one ball to dodge

let speed = 10;
let radius = 25;
let enemyRadius = 25;
let y = 200;
let x = 200;
let e1X = radius + 5;
let e1Y = radius + 5;
let d1x = 4;
let d1y = 2.5;
let e2X = 200 ;
let e2Y = 200 ;
let d2x = 4;
let d2y = 2.5;
let borderUpY = false;
let borderDownY = false;
let borderRightX = false;
let borderLeftX = false;
let borderEnemy1UpY = false;
let borderEnemy1DownY = false;
let borderEnemy1RightX = false;
let borderEnemy1LeftX = false;
let borderEnemy2UpY = false;
let borderEnemy2DownY = false;
let borderEnemy2RightX = false;
let borderEnemy2LeftX = false;
let lastTimeBounced = 0;
let gameOver = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

//if window shape is changed
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  e1X = radius + 5;
  e1Y = radius + 5;
  speed = 10;
  d1x = 4;
  d1y = 2.5;
  e2X = -radius + windowWidth;
  e2Y = -radius + windowHeight;
  d2x = 4;
  d2y = 2.5;
  x = windowWidth/2 - radius;
  y = windowHeight/2 - radius;
}

function draw() {
  background("lightblue");
  showCharacter();
  enemyMovement();
  checkForCollision();
  
}

function showCharacter(){
  checkForBorderX();
  checkForBorderY();
  moveTime();
  isGameOver();
  
}

//moveing your character
function moveTime(){
  //w
  if (keyIsDown(87) && borderUpY === false){
    y -= speed;
  }
  //a
  if (keyIsDown(65) && borderLeftX === false){
    x -= speed;
  }
  //s
  if (keyIsDown(83) && borderDownY === false){
    y += speed;
  }
  //d
  if (keyIsDown(68) && borderRightX === false){
    x += speed;
  } 
  fill("green");
  circle(x, y, radius*2);

}

//stops you from leaving the screen, same with the function below
function checkForBorderX(){
  if (x < radius){
    borderLeftX = true;
  }
  else{
    borderLeftX = false;
  }
  
  if (x > width - radius){
    borderRightX = true;
  }  
  else{
    borderRightX = false;
  }
}


function checkForBorderY(){
  if (y < radius){
    borderUpY = true;
  }
  else{
    borderUpY = false;
  }
  
  if (y > height - radius){
    borderDownY = true;
  }  
  else{
    borderDownY = false;
  }
}


//changing the players speed via the mouse wheel
function mouseWheel(event) {
  if (event.delta < 0 && speed <= 25){
    speed += 0.1;
  }
  else if (event.delta > 0 && speed >= 0){
    speed -= 0.1;

  }
}

//reseting the game
function doubleClicked(){
  if (gameOver){
    gameOver = false;
    e1X = radius + 5;
    e1Y = radius + 5;
    speed = 10;
    d1x = 4;
    d1y = 2.5;
    e2X = windowWidth - windowWidth/7;
    e2Y = windowHeight - windowHeight/7 ;
    d2x = 4;
    d2y = 2.5;
    x = windowWidth/2 - radius;
    y = windowHeight/2 - radius;
  }
}

function enemyMovement(){  
  moveEnemys();
  bounceEnemy1();
  bounceEnemy2();
  displayEnemy1();
  displayEnemy2();

}

function moveEnemys(){
  e1X = e1X + d1x;
  e1Y = e1Y + d1y;
  e2X = e2X + d2x;
  e2Y = e2Y + d2y;

}
//checking the borders and if the ball is on them it will bounce
function bounceEnemy1(){
  if (e1X >= width - radius || e1X <= 0 + radius) {
    if (d1x > 30){
      d1x = d1x * -1;
    }
    else{
      d1x = d1x * random(-1.5, -0.75);
    }
  }
  
  if (e1Y >= height - radius || e1Y <= 0 + radius) {
    if (d1y > 30){
      d1y = d1y * -1;
    }
    else{
      d1y = d1y * random(-1.5, -0.75);
    }
  }
}
function bounceEnemy2(){
  if (e2X >= width - radius || e2X <= 0 + radius) {
    if (d2x > 30){
      d2x = d2x * -1;
    }
    else{
      d2x = d2x * random(-1.5, -0.75);
    }
  }
  
  if (e2Y >= height - radius || e2Y <= 0 + radius) {
    if (d2y > 30){
      d2y = d2y * -1;
    }
    else{
      d2y = d2y * random(-1.5, -0.75);
    }
  }
}

function displayEnemy1(){
  if (gameOver === false){
    fill("red");
    circle(e1X, e1Y, radius*2);
  }
  else{
    fill(255);
  }
}

function displayEnemy2(){
  if (gameOver === false){
    fill("red");
    circle(e2X, e2Y, radius*2.5);
  }
  else{
    fill(255);
  }
}

//checking if the enemy balls are touching the player, and if so ending the game
function  checkForCollision(){
  if (x + radius > e1X - radius && x - radius < e1X + radius && y + radius > e1Y - radius && y - radius < e1Y + radius) {
    gameOver = true;
    
  }
  if (x + radius > e2X - radius && x - radius < e2X + radius && y + radius > e2Y - radius && y - radius < e2Y + radius) {
    gameOver = true;
    
  }

}


//ending the game, displaying some text
function isGameOver(){
  if (gameOver === true){
    fill("black");
    rect(0, 0, width, height);
    fill("white");
    stroke(0);
    textSize(20);
    text("Controls:", width/2 - 100, height/2 - 20);
    text("WASD to move, scrollwheel to change your speed", width/2 - 100, height/2 )
    text("Game Over", width/2 - 100, height/4);
    text("Double Click Left Mouse To Play", width/2 - 100, height/2 + 100);
  
    fill(255);

  }


}





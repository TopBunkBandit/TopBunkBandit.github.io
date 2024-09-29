// dodge the ball(?)
// James Mitchell
// 25/9/2024
// a little dodging game(?) avoid the other ball if you want, 
// controls are WASD for movement, double click restarts the game and scroll wheel changes your speed
// Extra for Experts:
// - mousewheel changes speed, changing the shape of the window will automatically reset the game as to prevent any issues with the borders, dunno if that counts for anything
// NOTE: this game will start out slow and progressively get faster, as such playing with a large window will cause the game to feel slower for longer and with a smaller window 
//it will feel faster. up to the player to decide if they are patient enough to play full screen or windowed

let speed = 1;
let radius = 25;
let enemyRadius = 25;
let y = 200;
let x = 200;
let eX = radius + 5;
let eY = radius + 5;
let dx = 4;
let dy = 2.5;
let borderUpY = false;
let borderDownY = false;
let borderRightX = false;
let borderLeftX = false;
let borderEnemyUpY = false;
let borderEnemyDownY = false;
let borderEnemyRightX = false;
let borderEnemyLeftX = false;
let playerPosition = (x,y);
let changePlayerColor = false;
let lastTimeBounced = 0;
let gameOver = false;
let i = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  eX = radius + 5;
  eY = radius + 5;
  speed = 1;
  dx = 4;
  dy = 2.5;
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
  fill('green')
  circle(x, y, radius*2);

}


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



function mouseWheel(event) {
  if (event.delta < 0 && speed <= 10){
    speed += 0.1;
  }
  else if (event.delta > 0 && speed >= 0){
    speed -= 0.1;

  }
}

function doubleClicked(){
  gameOver = false;
  eX = radius + 5
  eY = radius + 5
  speed = 1
  dx = 4;
  dy = 2.5;sa
  x = windowWidth/2 - radius
  y = windowHeight/2 - radius

}

function enemyMovement(){  
  moveEnemy();
  bounceEnemy();
  displayEnemy();

}

function moveEnemy(){
  eX = eX + dx;
  eY = eY + dy;

}

function bounceEnemy(){
  if (eX >= width - radius || eX <= 0 + radius) {
    rotate(random(0, 90))
    dx = dx * random(-1.5, -0.75);
  }
  
  if (eY >= height - radius || eY <= 0 + radius) {
    dy = dy * random(-1.5, -0.75);
  }
}

function displayEnemy(){
  if (gameOver === false){
    fill('redd')
    circle(eX, eY, radius*2);
  }
  else{
    fill(255);
  }
}

function checkForEnemyBorderX(){
  if (eX < radius){
    borderEnemyLeftX = true;
  }
  else{
    borderEnemyLeftX = false;
  }
  
  if (eX > width - radius){
    borderEnemyRightX = true;
  }  
  else{
    borderEnemyRightX = false;
  }
}

function checkForEnemyBorderY(){
  if (eY < radius){
    borderEnemyUpY = true;
  }
  else{
    borderEnemyUpY = false;
  }
  
  if (eY > height - radius){
    borderEnemyDownY = true;
  }  
  else{
    borderEnemyDownY = false;
  }
}

function  checkForCollision(){
  if (x + radius > eX - radius && x - radius < eX + radius && y + radius > eY - radius && y - radius < eY + radius) {
    gameOver = true;
  }

}

function isGameOver(){
  if (gameOver === true){
    fill("black")
    rect(0, 0, width, height);
    fill("white")
    stroke(0);
    textSize(20);
    text('Game Over Noob', width/2 - 100, height/2);
    fill(255);

  }


}

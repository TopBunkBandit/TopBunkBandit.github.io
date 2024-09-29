// the thingy
// James Mitchell
// 25/9/2024
// a little dodging game(?) avoid the other ball if you want, doesnt really matter
// Extra for Experts:
// - made a basic addition of allowing the mouse wheel to change the speed at which your ball moves


let speed = 1;
let radius = 25;
let enemyRadius = 25;
let y = 200;
let x = 200;
let eX = radius;
let eY = radius;
let dx = 4;
let dy = 2.5;
let borderUpY = false;
let borderDownY = false;
let borderRightX = false;
let borderLeftX = false;
let playerPosition = (x,y);
let changePlayerColor = false;
let lastTimeBounced = 0;
let gameOver = false;

function setup() {
  createCanvas(400, 400);
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
  if (!changePlayerColor){
    circle(x, y, radius*2);
  }
  else{
    fill(random(255), random(255), random(255));
    circle(x, y, radius*2);
    changePlayerColor = false;
  }
}


function checkForBorderX(){
  if (x < radius){
    borderLeftX = true;
  }
  else{
    borderLeftX = false;
  }
  
  if (x > width - radius){ds
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


function mousePressed() {
  if (mouseX <= eX + 10 && mouseX >= eY - 10){
    enemyRadius = random(10, 75);

  }
}


function mouseWheel(event) {
  if (event.delta < 0 && speed <= 25){
    speed += 0.1;
  }
  else if (event.delta > 0 && speed >= 0){
    speed -= 0.1;

  }
}

function doubleClicked(){
  gameOver = false;

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

// function bounceEnemy(){
//   if (eX >= width - radius || eX <= 0 + radius) {
//     dx = dx * -1;
//   }
  
//   if (eY >= height - radius || eY <= 0 + radius) {
//     dy = dy * -1;
//   }
// }

function bounceEnemy(){
  if (eX >= random(0, 400) && millis() >= lastTimeBounced ) {
    dx = dx * -1;
    lastTimeBounced = millis() + 500 
  }
  
  if (eY >= random(0, 400) && millis() >= lastTimeBounced) {
    dy = dy * -1;
    lastTimeBounced = millis() + 500 
  }
}


function displayEnemy(){
  if (gameOver === false){
    circle(eX, eY, radius*2);
  }
  else{
    fill(255);
  }
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

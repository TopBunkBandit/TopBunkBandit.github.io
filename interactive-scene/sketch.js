// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let speed = 1
let radius = 25
let x = 200;
let y = 200;
let borderUpY = false
let borderDownY = false
let borderRightX = false
let borderLeftX = false

function setup() {
  createCanvas(400, 400);
}


function draw() {
  background(220);
  showCharacter()
}

function showCharacter(){
  checkForBorderX()
  checkForBorderY()
  moveTime()
  circle(x, y, radius)
  
  
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
}

function checkForBorderX(){
  if (x < radius/2){
    borderLeftX = true;
  }
  else{
    borderLeftX = false;
  }
  
  if (y > height - radius/2){
    borderRightX = true;
  }  
  else{
    borderDownY = false;
  }
}

function checkForBorderY(){
  if (y < radius/2){
    borderUpY = true;
  }
  else{
    borderUpY = false;
  }
  
  if (y > height - radius/2){
    borderDownY = true;
  }  
  else{
    borderDownY = false;
  }
}


function mousePressed() {

}
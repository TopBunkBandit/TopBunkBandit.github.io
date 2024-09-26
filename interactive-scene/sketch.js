// the thingy
// James Mitchell
// 25/9/2024
//
// Extra for Experts:
// - made a basic addition of allowing the mouse


let speed = 1;
let radius = 25;
let y = 200;
let x = 200;
let borderUpY = false;
let borderDownY = false;
let borderRightX = false;
let borderLeftX = false;
let playerPosition = (x,y);
let changeColor = false;

function setup() {
  createCanvas(400, 400);
}


function draw() {
  background(220);
  showCharacter();
}

function showCharacter(){
  checkForBorderX();
  checkForBorderY();
  moveTime();
  
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
  if (!changeColor){
    circle(x, y, radius*2);
  }
  else{
    fill(random(255), random(255), random(255));
    circle(x, y, radius*2);
    changeColor = false;
  }
}


function checkForBorderX(){
  if (x < radius/2){
    borderLeftX = true;
  }
  else{
    borderLeftX = false;
  }
  
  if (x > height - radius/2){
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


// function mousePressed() {
//   if (mouseX <= x + 10 && mouseX >= x - 10){
//     radius = random(10, 75);

//   }
// }


function mouseWheel(event) {
  if (event.delta < 0 && radius <= 200){
    radius += 1;
  }
  else if (event.delta > 0 && radius >= 0){
    radius -= 1;

  }
}

function doubleClicked(){
  changeColor = !changeColor;

}


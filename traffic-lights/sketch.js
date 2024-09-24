// Traffic Light Starter Code
// James M.
// 24/9/2024

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/#/p5/millis


let isGreen = true;
let isYellow = false;
let isRed = false;
let currentTime = 0;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  drawOutlineOfLights();
  lightColors();

}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 75, 200, 10);

  //lights
  fill(255);
  if (isGreen === true){
    fill (0, 255, 0)
    ellipse(width/2, height/2 - 65, 50, 50); //top
    fill(255)
    ellipse(width/2, height/2, 50, 50); //middle
    ellipse(width/2, height/2 + 65, 50, 50); //bottom
  }
  if (isYellow === true){
    fill (255)
    ellipse(width/2, height/2 - 65, 50, 50); //top
    fill('yellow')
    ellipse(width/2, height/2, 50, 50); //middle
    fill(255)
    ellipse(width/2, height/2 + 65, 50, 50); //bottom
  }
  if (isRed === true){
    fill (255)
    ellipse(width/2, height/2 - 65, 50, 50); //top
    ellipse(width/2, height/2, 50, 50); //middle
    fill(255, 0, 0)
    ellipse(width/2, height/2 + 65, 50, 50); //bottom
  }
}

function lightColors(){
  if ((isGreen === true)&&(millis() < currentTime + 5000)){
    isGreen = false;
    isYellow = true;
    currentTime = millis();
  }
  
  if ((isYellow === true)&&(millis() < currentTime + 2000)){
    isYellow = false;
    isRed = true;
    currentTime = millis();

  }

  if ((isRed === true)&&(millis() < currentTime + 5000)){
    isRed = false;
    isGreen = true;
    currentTime = millis();
  }
}
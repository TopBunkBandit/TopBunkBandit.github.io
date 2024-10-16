// Traffic Light Starter Code
// James M.
// 9/24/2024

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/#/p5/millis

let stateLight = "green";
let lastTimeSwitched = 0;
const GREEN_LIGHT_DURATION = 3000;
const YELLOW_LIGHT_DURATION = 1000;
const RED_LIGHT_DURATION = 4000;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  drawOutlineOfLights();
  switchStateIfNeeded();
  displayCorrectLight();
  

}

function switchStateIfNeeded(){
  if (stateLight === "green" && millis() > lastTimeSwitched + GREEN_LIGHT_DURATION){
    stateLight === "yellow";
    lastTimeSwitched = millis();
  }
  else if (stateLight === "yellow" && millis() > lastTimeSwitched + YELLOW_LIGHT_DURATION){
    stateLight === "red";
    lastTimeSwitched = millis();
  }
  else if (stateLight === "red" && millis() > lastTimeSwitched + RED_LIGHT_DURATION){
    stateLight === "green";
    lastTimeSwitched = millis();
  }
}

function displayCorrectLight(){
  if (stateLight === "green"){
    fill("green");
    ellipse(width/2, height/2 + 65, 50, 50); //bottom
  }
  else if (stateLight === "yellow"){
    fill("yellow");
    ellipse(width/2, height/2, 50, 50); //middle
  }
  else if (stateLight === "red"){
    fill("red");
    ellipse(width/2, height/2 - 65, 50, 50); //top
  }
}



function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 75, 200, 10);

  //lights
  fill(255);
  ellipse(width/2, height/2 - 65, 50, 50); //top
  ellipse(width/2, height/2, 50, 50); //middle
  ellipse(width/2, height/2 + 65, 50, 50); //bottom
}
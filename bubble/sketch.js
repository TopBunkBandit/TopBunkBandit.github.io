// Bubbles obj notation demo
// how to delete obj from array
// James Mitchell 
// 10/10/24

let theBubbles = [];
let deathLocation = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 5; i++){
    spawnBubble();

  }

  //create a new bubble every .5s
  window.setInterval(spawnBubble, 500);
}

function draw() {
  background(220);
  // moveBubblesRandomly();
  moveBubblesWithNoise();
  displayBubbles();
  displayGraves();
}

function displayGraves(){
  for (let grave of deathLocation){
    textAlign(CENTER, CENTER);
    fill(0);
    text("X", grave.x, grave.y);
  }

}

function moveBubblesWithNoise(){
  for (let bubble of theBubbles){
    bubble.x = noise(bubble.timeX)*width;
    bubble.y = noise(bubble.timeY)*height;

    bubble.timeX += bubble.deltaTime;
    bubble.timeY += bubble.deltaTime;

  }

}

function moveBubblesRandomly(){
  for (bubble of theBubbles){
    let choice = random(100);
    if (choice <= 50){
      bubble.y -= bubble.speed;
    }
    else if (choice <= 65){
      bubble.y += bubble.speed;
    }
    else if (choice <= 75){
      bubble.x += bubble.speed;
    }
    else{
      bubble.x -= bubble.speed;
    }

  }

}

function spawnBubble(){
  let someBubble = {
    x: random(0, width),
    y: height + random(0,50),
    speed: random(2,5),
    radius: random(20,50),
    r: random(255),
    g: random(255),
    b: random(255),
    alpha: random(255),
    timeX: random(1000000000),
    timeY: random(1000000000),
    deltaTime: 0.01,
  };
  theBubbles.push(someBubble);
}

function displayBubbles(){
  for (let bubble of theBubbles){
    noStroke;
    fill(bubble.r, bubble.g, bubble.b, bubble.alpha);
    circle(bubble.x, bubble.y, bubble.radius*2);

  }
}

function undertaker(theX, theY){
  let grave = {
    x: theX,
    y: theY,
  };
  deathLocation.push(grave);
}

function mousePressed(){
  for (bubble of theBubbles){
    if (clickedOnBubble(mouseX, mouseY, bubble)){
      let theIndex = theBubbles.indexOf(bubble);
      theBubbles.splice(theIndex, 1);
      undertaker(mouseX, mouseY);
    }

  }
}

function clickedOnBubble(x,y,theBubble){
  let distanceAway = dist(x,y, theBubble.x, theBubble.y);
  return distanceAway < theBubble.radius;

}
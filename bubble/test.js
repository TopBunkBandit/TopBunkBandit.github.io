// Bubbles obj notation demo
// how to delete obj from array
// James Mitchell 
// 10/10/24

let theShip = [];
let deathLocation = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 5; i++){
    spawnShips();

  }

  //create a new bubble every .5s
  window.setInterval(spawnShips, 500);
}

function draw() {
  background(220);
  displayShips();
}



function moveBubblesWithNoise(){
  for (let bubble of theShip){
    bubble.x = noise(bubble.timeX)*width;
    bubble.y = noise(bubble.timeY)*height;

    bubble.timeX += bubble.deltaTime;
    bubble.timeY += bubble.deltaTime;

  }
}
function spawnShips(){
  let someShip = {
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
  theShip.push(someShip);
}

function displayShips(){
  for (let bubble of theShip){
    noStroke;
    fill(bubble.r, bubble.g, bubble.b, bubble.alpha);
    circle(bubble.x, bubble.y, bubble.radius*2);

  }
}

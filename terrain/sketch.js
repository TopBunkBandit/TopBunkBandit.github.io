// Terrain Generation demo
// James Mitchell
// 7/10/24

let terrain = [];
const NUMBER_OF_RECTS = 2000;

function setup() {
  createCanvas(windowWidth, windowHeight);
  let howWide = width / NUMBER_OF_RECTS;
  generateTerrain(howWide);
}

function draw() {
  background(220);

  for (let someRect of terrain){
    rect(someRect.x, someRect.y, someRect.w, someRect.h);

  }
}


function spawnRectangle(leftSide,rectHeight,rectWidth){
  let theRect = {
    x: leftSide,
    y: height - rectHeight,
    w: rectWidth,
    h: rectHeight,
  };
  return theRect;
}

function generateTerrain(theWidth){
  let time = 0;
  let deltaTime = 0.001;

  for (let x = 0; x <  width; x += theWidth){
    let theHeight = noise(time) * height;
    let someRect = spawnRectangle(x, theHeight, theWidth);
    terrain.push(someRect);
    time += deltaTime;
  }
}
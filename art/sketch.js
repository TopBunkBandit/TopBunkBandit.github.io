// Generative art demo
// James Mitchell
// 4/10/24


const TILESIZE = 15;
let tileArray = [];
let r;
let g;
let b;
function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let x = 0; x < width; x+= TILESIZE){
    for (let y = 0; y < height; y += TILESIZE){
      let someTile = spawnTile(x, y);
      tileArray.push(someTile);
    }
  }

}

function draw() {
  background(220);
  
  //display tile
  for (let myTile of tileArray){
    ellipse(myTile.x1, myTile.y1, myTile.x2, myTile.y2);
    r = random(255);
    b = random(255);
    g = random(255);
    stroke(r,g,b);
  }
}




function spawnTile(x,y){
  let tile;
  let choice = random(100);


  if (choice < 50){
    //negative slope
    tile = {
      x1: x - TILESIZE/2,
      y1: y - TILESIZE/2,
      x2: x + TILESIZE/2,
      y2: y + TILESIZE/2
    };
  }
  else{
    tile = {
      x1: x - TILESIZE/2,
      y1: y + TILESIZE/2,
      x2: x + TILESIZE/2,
      y2: y - TILESIZE/2
    };

  }

  return tile;
}
// Grid Based Movement
// James Mitchell
// 10/29/24

let grid;
let cellSize;
const GRID_SIZE = 25;
const IMPASSIBLE_TILE = 1;
const OPEN_TILE = 0;
const PLAYER_TILE = 9;
let shouldToggleNeighbours = false;
let player = {
  x: 0,
  y: 0,
};
let grassImg;
let pathImg;

//errors when loading img
function preload(){
  grassImg = loadImage("grass.JPG");
  pathImg = loadImage("bricks.JPG");
}

function setup() {
  if (windowHeight > windowWidth){
    createCanvas(windowWidth, windowWidth);
  }
  else{
    createCanvas(windowHeight, windowHeight);
  }
  
  cellSize = height/GRID_SIZE;
  grid = generateRandomGrid(GRID_SIZE,GRID_SIZE);

  //add player to grid
  grid[player.x][player.y] = PLAYER_TILE;
}

function draw() {
  background(220);
  displayGrid();
}

function displayGrid(){
  noStroke();
  for (let y = 0; y < GRID_SIZE; y++){
    for (let x = 0; x < GRID_SIZE; x++){
      if (grid[x][y] === IMPASSIBLE_TILE){
        // fill("black");
        image(grassImg, x*cellSize, y*cellSize, cellSize, cellSize);
      }
      else if (grid[x][y] === OPEN_TILE){
        // fill("white");
        image(pathImg, x*cellSize, y*cellSize, cellSize, cellSize);
      }
      else if (grid[x][y] === PLAYER_TILE){
        fill(255,100,130);
        square(x*cellSize,y*cellSize,cellSize);
      }
    }
  }
}

function generateRandomGrid(cols, rows){
  let newGrid = [];
  for (let y = 0; y < rows; y++){
    newGrid.push([]);
    for (let x = 0; x < cols; x++){
      //pick 0 or 1, 50% odds
      if (random(100) < 50){
        newGrid[y].push(IMPASSIBLE_TILE);
      }
      else{
        newGrid[y].push(OPEN_TILE);
      }
    }
  }
  return newGrid;
}


function keyPressed(){
  if (key === "r"){
    grid = generateRandomGrid(GRID_SIZE,GRID_SIZE);
  }
  if (key === "e"){
    grid = generateEmptyGrid(GRID_SIZE,GRID_SIZE);
  }
  if (key === "n"){
    shouldToggleNeighbours = !shouldToggleNeighbours;
  }
  //movement keys
  if (key === "w"){
    movePlayer(player.x,player.y - 1);
  }
  if (key === "a"){
    movePlayer(player.x - 1,player.y);
  }
  if (key === "s"){
    movePlayer(player.x,player.y + 1);
  }
  if (key === "d"){
    movePlayer(player.x + 1,player.y);
  }
}

function movePlayer(x,y){

  if (x >= 0 && y >= 0 && x < GRID_SIZE && y < GRID_SIZE && grid[x][y] === OPEN_TILE){
    grid[player.x][player.y] = OPEN_TILE;
    //keep track of player location
    player.x = x;
    player.y = y;
    
    //put player in grid
    grid[player.x][player.y] = PLAYER_TILE;

  }

}

function mouseWheel(){
  grid = generateRandomGrid(GRID_SIZE,GRID_SIZE);
}

function generateEmptyGrid(cols,rows){
  let newGrid = [];
  for (let y = 0; y < rows; y++){
    newGrid.push([]);
    for (let x = 0; x < cols; x++){
      newGrid[y].push(OPEN_TILE);
    }
  }
  return newGrid;
}

function mousePressed(){
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);
  toggleCell(x,y);
  if (shouldToggleNeighbours){
    toggleCell(x+1,y);
    toggleCell(x-1,y);
    toggleCell(x,y+1);
    toggleCell(x,y-1);
  }

}

function toggleCell(x,y){
  if (x >= 0 && y >= 0 && x < GRID_SIZE && y < GRID_SIZE){
    if (grid[x][y] === IMPASSIBLE_TILE){
      grid[x][y] = OPEN_TILE;
    }
    else if (grid[x][y] === OPEN_TILE){
      grid[x][y] = IMPASSIBLE_TILE;
  
    }


  }
}


function windowResized(){
  if (windowHeight > windowWidth){
    resizeCanvas(windowWidth, windowWidth);
  }
  else{
    resizeCanvas(windowHeight, windowHeight);
  }
  
  cellSize = height/GRID_SIZE;
}
// Grid Demo
// James Mitchell
// 10/22/24

//if hardcoding the grid use this
// let grid = [[1,0,1,0],
//             [0,0,1,1],
//             [1,1,1,0],
//             [0,1,1,0]];


let grid;
let cellSize;
const GRID_SIZE = 25;



function setup() {
  if (windowHeight > windowWidth){
    createCanvas(windowWidth, windowWidth);
  }
  else{
    createCanvas(windowHeight, windowHeight);
  }

  cellSize = height/GRID_SIZE;
  grid = generateRandomGrid(GRID_SIZE,GRID_SIZE);
}

function draw() {
  background(220);
  displayGrid();
}

function displayGrid(){
  noStroke();
  for (let y = 0; y < GRID_SIZE; y++){
    for (let x = 0; x < GRID_SIZE; x++){
      if (grid[x][y] === 1){
        fill("black");
      }
      else if (grid[x][y] === 0){
        fill("white");
      }
      square(x*cellSize,y*cellSize,cellSize);
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
        newGrid[y].push(1);
      }
      else{
        newGrid[y].push(0);
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
}

function mouseWheel(){
  grid = generateRandomGrid(GRID_SIZE,GRID_SIZE);
}

function generateEmptyGrid(cols,rows){
  let newGrid = [];
  for (let y = 0; y < rows; y++){
    newGrid.push([]);
    for (let x = 0; x < cols; x++){
      newGrid[y].push(0);
    }
  }
  return newGrid;

}

function mouseIsPressed(){

}
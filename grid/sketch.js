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
let shouldToggleNeighbours = true;


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
  if (key === "n"){
    shouldToggleNeighbours = !shouldToggleNeighbours;
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
    if (grid[x][y] === 1){
      grid[x][y] = 0;
    }
    else{
      grid[x][y] = 1;
  
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

// function life(rows,cols){
//   for (let y = 0; y < rows;y++){
//     for (let x = 0; x < cols; x++){
//       if (grid[x][y] === 1){
//         //check for not enough grids
//         if (checkIfLonley)
//         //check for too many grids

//         //check if can give birth

//         //remain stable if nothing happened
//       }
//     }
//   }
// }

// function checkIfLonley(x,y){
//   if (grid[x][y] === 0)
// }
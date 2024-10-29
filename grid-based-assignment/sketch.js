// Battleship (maybe)(its so jover)
// James Mitchell
// 10/28/24
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid;
let attackedGrid;
const CELL_SIZE = 20;
let rows;
let cols;
let attacked;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rows = windowHeight/CELL_SIZE;
  cols = windowWidth/CELL_SIZE;
  
  grid = gridGeneration(cols,rows);
  // need to make attackedGrid be the same as grid only that when an area within the squares are clicked it changes attacked
  // on that spot to true
  attackedGrid = grid;
}

function draw() {
  background(220);
  displayGrid();
}


function gridGeneration(cols, rows){
  let newGrid = [];
  for (let y = 0; y < rows; y++){
    newGrid.push([]);
    for (let x = 0; x < cols; x++){
      newGrid[y].push(0);
    }
  }
  return newGrid;
}

//work on only showing the grids only within the specified play area
function displayGrid(){
  for (let y = 0; y < rows; y++){
    for (let x = 0; x < cols; x++){
      if (x > 5 && x < 20 && y > 1 && y < 16){
        fill(random(100, 255),random(100, 255),random(200, 255));
        square(x*CELL_SIZE,y*CELL_SIZE,CELL_SIZE);

      }
      if (x > 5 && x < 20 && y > 20 && y < 35){
        fill(random(100, 255),random(100, 255),random(200, 255));
        square(x*CELL_SIZE,y*CELL_SIZE,CELL_SIZE);

      }
    }
  }
}

//
function mousePressed(){
  let x = Math.floor(mouseX/CELL_SIZE);
  let y = Math.floor(mouseY/CELL_SIZE);
  //rework the thingy
  if (x !== attacked && y !== attacked){
    if (x >= 0 && y >= 0){
      grid[x][y] = "hit";
  
    }
  }
}


// pretty colors :)
// fill(random(100, 255),random(100, 255),random(200, 255));

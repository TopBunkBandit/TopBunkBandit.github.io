// Battleship (maybe)(its so jover)
// James Mitchell
// 10/28/24
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid;
const CELL_SIZE = 20;
let rows;
let cols;
let playAreaHeight;
let playAreaWidth;


function setup() {
  createCanvas(windowWidth, windowHeight);
  //create the play area (make 2 rectangles on the screen in which only the squares will spawn)
  //if that doesnt work just color in and make the squares outside of the area be set to noFill()
  playAreaHeight = 100;
  playAreaWidth = 100;
  rows = windowHeight/CELL_SIZE;
  cols = windowWidth/CELL_SIZE;
  
  grid = gridGeneration(cols,rows);
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
      fill(random(100, 255),random(100, 255),random(200, 255));
      square(x*CELL_SIZE,y*CELL_SIZE,CELL_SIZE);
    }
  }
}
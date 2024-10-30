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
let setUpPhase = true;
let shipHere;
let ships;
let newSmallX = 100;
let newSmallY = 100;
let newMedX = 100;
let newMedY = 100;
let newLargeX = 100;
let newLargeY = 100;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rows = windowHeight/CELL_SIZE;
  cols = windowWidth/CELL_SIZE;
  
  grid = gridGeneration(cols,rows);
}

function draw() {
  background(220);
  if (setUpPhase){
    displayGrid();
    placeShips(mouseX, mouseY);
  }
  else{
    displayGrid();

  }
}


function gridGeneration(cols, rows){
  let newGrid = [];
  for (let y = 0; y < rows; y++){
    newGrid.push([]);
    for (let x = 0; x < cols; x++){
      newGrid[y].push("Not hit");
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
      if (x > 5 && x < 20 && y > 20 && y < 35 && !setUpPhase){
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
  if (!setUpPhase){
    if(mouseX >= CELL_SIZE*6 && mouseX <= CELL_SIZE*20){
      if (grid[x][y] !== "miss" && grid[x][y] !== "hit"){
        if (shipHere){
          grid[x][y] = "hit";
          console.log("test");
        }
        else{
          grid[x][y] = "missed";
        }
      }
    }
  }
}


// pretty colors :)
// fill(random(100, 255),random(100, 255),random(200, 255));


//adjust sizes to be 20/30/50
//better yet use this time to make a few consts for the sizes
//need to make it so this runs when overtop of one of a few ships
function placeShips(x,y){
  fill("grey");
  if(mouseIsPressed && mouseX >= newSmallX - 25 && mouseX <= newSmallX + 25 && mouseY >= newSmallY - 25 && mouseY <= newSmallY + 25){
    square(x-25,y-25,50);
    newSmallX = x;
    newSmallY = y;
    square(newMedX - 50 ,newMedY - 50 ,100);
    square(newLargeX-100,newLargeY-100,200);

  }
  else if(mouseIsPressed && mouseX >= newMedX - 50 && mouseX <= newMedX + 50 && mouseY >= newMedY - 50 && mouseY <= newMedY + 50){
    square(x - 50,y - 50,100);
    newMedX = x;
    newMedY = y;
    square(newSmallX - 25,newSmallY - 25,50);
    square(newLargeX-100,newLargeY-100,200);
  }
  else if(mouseIsPressed && mouseX >= newLargeX - 100 && mouseX <= newLargeX + 100 && mouseY >= newLargeY - 100 && mouseY <= newLargeY + 100){
    square(x - 100,y - 100, 200);
    newLargeX = x;
    newLargeY = y;
    square(newSmallX - 25,newSmallY - 25,50);
    square(newMedX - 50 ,newMedY - 50, 100);
  }
  else{
    square(newMedX - 50 ,newMedY - 50, 100);
    square(newSmallX - 25,newSmallY - 25,50);
    square(newLargeX-100,newLargeY-100,200);

  }
}
// Battleship (maybe)(its so jover)
// James Mitchell
// 10/28/24
//
// Extra for Experts:
// brain(?)

let grid;
let attackedGrid;
const CELL_SIZE = 20;
let rows;
let cols;
let attacked;
let setUpPhase = true;
let shipHere;
let ships;
let newSmallX = 200;
let newSmallY = 300;
let smallSize = CELL_SIZE;
let newMedX = 250;
let newMedY = 300;
let medSize = CELL_SIZE*2;
let newLargeX = 300;
let newLargeY = 300;
let largeSize = CELL_SIZE*3;
let calledForSmall = false;
let calledForMed = false;
let calledForLarge = false;

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
        fill("lightblue");
        square(x*CELL_SIZE,y*CELL_SIZE,CELL_SIZE);

      }
      if (x > 5 && x < 20 && y > 20 && y < 35 && !setUpPhase){
        fill("lightblue");
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


//makes sure that the 'battleships' stay within your grid and snaps to the grid without any part of it leaving the grid
function placeShips(x,y){
  fill("grey");
  //small ship
  if(mouseIsPressed && mouseX >= newSmallX - smallSize && mouseX <= newSmallX + smallSize && mouseY >= newSmallY - smallSize && mouseY <= newSmallY + smallSize){
    if(mouseX/CELL_SIZE > 6 && mouseX/CELL_SIZE < 19 && mouseY/CELL_SIZE > 2 && mouseY/CELL_SIZE < 16){
      rect(x-smallSize/2,y-smallSize/2,smallSize*2,smallSize);
      newSmallX = x;
      newSmallY = y;
      square(newMedX - medSize/2 ,newMedY - medSize/2 ,medSize);
      square(newLargeX-largeSize/2,newLargeY-largeSize/2,largeSize);
      calledForSmall = true;
      snapShipsToGrid(newSmallX,newSmallY);

    }
    else{
      calledForSmall = true;
      snapShipsToGrid(newSmallX,newSmallY);

    }

  }
  //medium battleship
  else if(mouseIsPressed && mouseX >= newMedX - medSize/1.5 && mouseX <= newMedX + medSize/1.5 && mouseY >= newMedY - medSize/1.5 && mouseY <= newMedY + medSize/1.5){
    if(mouseX/CELL_SIZE > 7 && mouseX/CELL_SIZE < 20 && mouseY/CELL_SIZE > 2 && mouseY/CELL_SIZE < 17){
      square(x - medSize/2,y - medSize/2,medSize);
      newMedX = x;
      newMedY = y;
      rect(newSmallX-smallSize/2,newSmallY-smallSize/2,smallSize*2,smallSize);
      square(newLargeX-largeSize/2,newLargeY-largeSize/2,largeSize);
      calledForMed = true;
      snapShipsToGrid(newMedX,newMedY);
    }
    else{
      calledForMed = true;
      snapShipsToGrid(newMedX,newMedY);

    }
  }
  //large battleship
  else if(mouseIsPressed && mouseX >= newLargeX - largeSize/2 && mouseX <= newLargeX + largeSize/2 && mouseY >= newLargeY - largeSize/2 && mouseY <= newLargeY + largeSize/2){
    if(mouseX/CELL_SIZE > 7 && mouseX/CELL_SIZE < 19 && mouseY/CELL_SIZE > 3 && mouseY/CELL_SIZE < 15){
      square(x - largeSize/2,y - largeSize/2, largeSize);
      newLargeX = x;
      newLargeY = y;
      rect(newSmallX-smallSize/2,newSmallY-smallSize/2,smallSize*2,smallSize);
      square(newMedX - medSize/2 ,newMedY - medSize/2, medSize);
      calledForLarge = true;
      snapShipsToGrid(newLargeX,newLargeY);
    }
    else{
      calledForLarge = true;
      snapShipsToGrid(newLargeX,newLargeY);
    }
  }
  else{
    square(newMedX - medSize/2 ,newMedY - medSize/2, medSize);

    rect(newSmallX-smallSize/2,newSmallY-smallSize/2,smallSize*2,smallSize);
    square(newLargeX-largeSize/2,newLargeY-largeSize/2,largeSize);
  }
}


//need to check for collisions so that the ships dont overlap
//add variable that is triggered when ships are all placed to let game start
function snapShipsToGrid(x,y){
  snapX = Math.floor(x/CELL_SIZE);
  snapY = Math.floor(y/CELL_SIZE);
  console.log(snapX);
  console.log(snapY);
  //SMALL WORKS I DONT KNOW WHY, MAYBE BECAUSE ITS THE SAME AS THE MEDIUM
  if (calledForSmall){
    //working code for the main square, need to adjust numbers so that the second square also causes the small ship to not lock in place
    if(!(newSmallX/CELL_SIZE  + 1 > newMedX/CELL_SIZE && newSmallX/CELL_SIZE  - 1 < newMedX/CELL_SIZE && newSmallY/CELL_SIZE + 1 > newMedY/CELL_SIZE && newSmallY/CELL_SIZE - 1 < newMedY/CELL_SIZE)){
      newSmallX = Math.floor(snapX*CELL_SIZE + CELL_SIZE/2);
      newSmallY = Math.floor(snapY*CELL_SIZE + CELL_SIZE/2);
      calledForSmall = false;
    }
  }
  //MED WORKS BECAUSE ITS 2X2, SO IT DOESNT NEED THE EXTRA CELL TO FIT WELL
  if (calledForMed){
    newMedX = Math.floor(snapX*CELL_SIZE);
    newMedY = Math.floor(snapY*CELL_SIZE);
    calledForMed= false;
  }
  //LARGE WORKS BECAUSE ITS 3 CELLS LARGE
  if (calledForLarge){
    newLargeX = Math.floor(snapX*CELL_SIZE + CELL_SIZE/2);
    newLargeY = Math.floor(snapY*CELL_SIZE + CELL_SIZE/2);
    calledForLarge = false;
  }
}
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
let smallSize = CELL_SIZE;
let newMedX = 100;
let newMedY = 100;
let medSize = CELL_SIZE*2;
let newLargeX = 100;
let newLargeY = 100;
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


//NEED TO CHANGE THIS UP SO THAT A MOUSE PRESS PICKS THE BLOCK UP INSTEAD OF HAVING TO HOLD IT
//THAT WAY THE ELSE CAN SNAP TO GRIDS THAT ARE NOT JUST ON THE EDGE
//MAYBE JUST GET RID OF THE CHECK TO SEE IF ITS NOT WITHIN A SPACE???
//HEAD EMPTY
//CODING BROKE ALL OF MY BRAIN CELLS 
function placeShips(x,y){
  fill("grey");
  if(mouseIsPressed && mouseX >= newSmallX - smallSize/2 && mouseX <= newSmallX + smallSize/2 && mouseY >= newSmallY - smallSize/2 && mouseY <= newSmallY + smallSize/2){
    if(!(mouseX/CELL_SIZE > 5 && mouseX/CELL_SIZE < 20 && mouseY/CELL_SIZE > 2 && mouseY/CELL_SIZE < 17)){
      square(x-smallSize/2,y-smallSize/2,smallSize);
      newSmallX = x;
      newSmallY = y;
      square(newMedX - medSize/2 ,newMedY - medSize/2 ,medSize);
      square(newLargeX-largeSize/2,newLargeY-largeSize/2,largeSize);

    }
    else{
      calledForSmall = true;
      snapShipsToGrid(newSmallX,newSmallY);

    }

  }
  else if(mouseIsPressed && mouseX >= newMedX - medSize/2 && mouseX <= newMedX + medSize/2 && mouseY >= newMedY - medSize/2 && mouseY <= newMedY + medSize/2){
    if(!(mouseX/CELL_SIZE > 5 && mouseX/CELL_SIZE < 20 && mouseY/CELL_SIZE > 2 && mouseY/CELL_SIZE < 17)){
      square(x - medSize/2,y - medSize/2,medSize);
      newMedX = x;
      newMedY = y;
      square(newSmallX - smallSize/2,newSmallY - smallSize/2,smallSize);
      square(newLargeX-largeSize/2,newLargeY-largeSize/2,largeSize);
    }
    else{
      calledForMed = true;
      snapShipsToGrid(newMedX,newMedY);

    }
  }
  else if(mouseIsPressed && mouseX >= newLargeX - largeSize/2 && mouseX <= newLargeX + largeSize/2 && mouseY >= newLargeY - largeSize/2 && mouseY <= newLargeY + largeSize/2){
    if(!(mouseX/CELL_SIZE > 5 && mouseX/CELL_SIZE < 20 && mouseY/CELL_SIZE > 2 && mouseY/CELL_SIZE < 17)){
      square(x - largeSize/2,y - largeSize/2, largeSize);
      newLargeX = x;
      newLargeY = y;
      square(newSmallX - smallSize/2,newSmallY - smallSize/2,smallSize);
      square(newMedX - medSize/2 ,newMedY - medSize/2, medSize);
    }
    else{
      calledForLarge = true;
      snapShipsToGrid(newLargeX,newLargeY);
    }
  }
  else{
    square(newMedX - medSize/2 ,newMedY - medSize/2, medSize);

    square(newSmallX - smallSize/2,newSmallY - smallSize/2,smallSize);

    square(newLargeX-largeSize/2,newLargeY-largeSize/2,largeSize);
  }
}

function snapShipsToGrid(x,y){
  snapX = Math.floor(x/CELL_SIZE);
  snapY = Math.floor(y/CELL_SIZE);
  console.log(snapX);
  console.log(snapY);
  //SMALL WORKS I DONT KNOW WHY, MAYBE BECAUSE ITS THE SAME AS THE MEDIUM
  if (calledForSmall){
    newSmallX = Math.floor(snapX*CELL_SIZE + CELL_SIZE/2);
    newSmallY = Math.floor(snapY*CELL_SIZE + CELL_SIZE/2);
    calledForSmall = false;
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
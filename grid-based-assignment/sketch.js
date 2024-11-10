// Battleship
// James Mitchell
// 10/28/24
//
// Extra for Experts:
//

let grid;
let enemyCheckGrid;
const CELL_SIZE = 20;
let rows;
let cols;
let setUpPhase = true;
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
let abcd = true;

//enemy ai specific variables
let aIPlacement = true;
let randSmallX;
let randMedX;
let randLargeX;
let randSmallY;
let randMedY;
let randLargeY;
let enemyShipsLeft = 15;


function setup() {
  createCanvas(windowWidth, windowHeight);
  rows = windowHeight/CELL_SIZE;
  cols = windowWidth/CELL_SIZE;

  randSmallX = Math.floor(random(13));
  randMedX = Math.floor(random(14));
  randLargeX = Math.floor(random(12));
  randSmallY = Math.floor(random(14));
  randMedY = Math.floor(random(13));
  randLargeY = Math.floor(random(12));
  
  grid = gridGeneration(cols,rows);
  enemyCheckGrid = gridGeneration(cols,rows);

}

function draw() {
  
  background(220);
  if (setUpPhase){
    displayGrid();
    placeShips(mouseX, mouseY);
    if (key === "q"){
      setUpPhase = !setUpPhase;
    }
    
  }
  else{
    displayGrid();
    if (key === " "){
      setUpPhase = !setUpPhase;
    }
    placeShips(mouseX, mouseY);
    if (aIPlacement){
      placeAIShips();
    }
    if (enemyShipsLeft === 0){
      circle(100,100,100)
    }
  }
}


function gridGeneration(cols, rows){
  let newGrid = [];
  for (let y = 0; y < rows; y++){
    newGrid.push([]);
    for (let x = 0; x < cols; x++){
      newGrid[y].push("fog");
    }
  }
  return newGrid;
}

//work on only showing the grids only within the specified play area
function displayGrid(){
  for (let y = 0; y < rows; y++){
    for (let x = 0; x < cols; x++){
      //player grid
      if (x > 5 && x < 20 && y > 1 && y < 16){
        fill("lightblue");
        square(x*CELL_SIZE,y*CELL_SIZE,CELL_SIZE);
      }
      //enemy grid
      if (x > 5 && x < 20 && y > 20 && y < 35 && !setUpPhase){
        fill("lightblue");
        square(x*CELL_SIZE,y*CELL_SIZE,CELL_SIZE);
      }
      //if you hit a empty square
      if (grid[y][x] === "missed"){
        fill("white");
        circle(x*CELL_SIZE + CELL_SIZE/2,y*CELL_SIZE + CELL_SIZE/2 ,CELL_SIZE/2);
      }
      //if you hit a ship
      if (grid[y][x] === "hit"){
        fill("red");
        circle(x*CELL_SIZE + CELL_SIZE/2,y*CELL_SIZE + CELL_SIZE/2 ,CELL_SIZE/2);
      }
    }
  }
}

//
function mousePressed(){
  let x = Math.floor(mouseX/CELL_SIZE);
  let y = Math.floor(mouseY/CELL_SIZE);

  if (!setUpPhase){
    //figure out why it says already fired here when at y = 26+
    if(x >= 6 && x <= 19 && y >= 21 && y <= 34){
      if (grid[y][x]  === "fog"){
        grid[y][x]  = "missed";
        console.log("missed");
      }

      else if (grid[y][x] === "enemy ship here"){
        grid[y][x] = "hit";
        console.log("hit");
        enemyShipsLeft -= 1
      }

      else{
        console.log("alread fired here");
        console.log(y, x);
      }
    }
 }
}


// pretty colors :)
// fill(random(100, 255),random(100, 255),random(200, 255));

//places the ships
//makes sure that the 'battleships' stay within your grid and snaps to the grid without any part of it leaving the grid
function placeShips(x,y){
  fill("grey");
  //small ship
  if (setUpPhase){

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
  else{
    while (abcd){
      console.log('yo');
      //works
      grid[Math.floor(newSmallY/CELL_SIZE)][Math.floor(newSmallX/CELL_SIZE)] = "allied ship here";
      grid[Math.floor(newSmallY/CELL_SIZE)][Math.floor(newSmallX/CELL_SIZE)+1] = "allied ship here";
      
      //works
      grid[Math.floor(newMedY/CELL_SIZE)][Math.floor(newMedX/CELL_SIZE)] = "allied ship here";
      grid[Math.floor(newMedY/CELL_SIZE) - 1][Math.floor(newMedX/CELL_SIZE)] = "allied ship here";
      grid[Math.floor(newMedY/CELL_SIZE)][Math.floor(newMedX/CELL_SIZE) - 1] = "allied ship here";
      grid[Math.floor(newMedY/CELL_SIZE) - 1][Math.floor(newMedX/CELL_SIZE) - 1] = "allied ship here";
      
      //works
      for (let m = -1; m < 2; m++){
        for (let n = -1; n < 2; n++){
          grid[Math.floor(newLargeY/CELL_SIZE)+n][Math.floor(newLargeX/CELL_SIZE)+m] = "allied ship here";
        }
      }
      abcd = false;
    }
  }
}


//need to check for collisions so that the ships dont overlap
//add variable that is triggered when ships are all placed to let game start
function snapShipsToGrid(x,y){
  snapX = Math.floor(x/CELL_SIZE);
  snapY = Math.floor(y/CELL_SIZE);
  // console.log(snapX);
  // console.log(snapY);
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

  if (key === "s"){

  }
}

function placeAIShips(){
  // // not causing errors but it is compleatly freezing the program randomly
  // while (randNumsOverlapping){
  // //this is just to make sure there are no overlapping ships
  // //checking for large square
  //   if (randLargeX !== randMedX && randLargeY !== randMedY && randLargeX + 2 !== randMedX + 1 && randLargeY + 2 !== randMedY + 1){
  //     if (randSmallX !== randMedX && randSmallY !== randMedY && randSmallX !== randMedX + 1 && randSmallY + 1 !== randMedY + 1){
  //         randNumsOverlapping = false;
  //       }
  //     }
  //   else{
  //     console.log("error: overlapping ships")
  //     randSmallX = Math.floor(random(13));
  //     randLargeX = Math.floor(random(12));
  //     randSmallY = Math.floor(random(14));
  //     randLargeY = Math.floor(random(12));
  //   }
  // }

  //maybe
  // while (enemyShipsLeft < 15){

  // }
  
  enemyCheckGrid[randSmallY+20][randSmallX+5] = "enemy ship here"
  enemyCheckGrid[randSmallY+20][randSmallX+6] = "enemy ship here"
  console.log(randSmallY+20,randSmallX+5);

  enemyCheckGrid[randMedY+20][randMedX+5] = "enemy ship here"
  enemyCheckGrid[randMedY+19][randMedX+5] = "enemy ship here"
  enemyCheckGrid[randMedY+20][randMedX+6] = "enemy ship here"
  enemyCheckGrid[randMedY+19][randMedX+6] = "enemy ship here"
  console.log(randMedY+20,randMedX+5);

  
  for (let q = -1; q < 2; q++){
    for (let p = -1; p < 2; p++){
      enemyCheckGrid[randLargeY+q + 19][randLargeX + p + 7] = "enemy ship here";
      console.log(randLargeY+19+q,randLargeX+5+p);
    }
  }


}
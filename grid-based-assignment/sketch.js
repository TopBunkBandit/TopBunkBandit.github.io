// Battleship
// James Mitchell
// 10/28/24
//
// Extra for Experts:
//

let grid;
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
let abcd = 0;
let turn = "player";
let playerShipsLeft = 15;
let selectedSquare = false;

//enemy ai specific variables
let aIPlacement = true;
let randSmallX;
let randMedX;
let randLargeX;
let randSmallY;
let randMedY;
let randLargeY;
let randomNumsOverlapping = 0;
let enemyShipsLeft = 15;
let firstSelection = true;
let robotPickedX;
let robotPickedY;
let robotHitShip = false;
let lastHitLocationX;
let lastHitLocationY;

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
  
  robotPickedX = Math.floor(random(6,20));
  robotPickedY = Math.floor(random(3,15));
  grid = gridGeneration(cols,rows);
}

function draw() {
  
  background(220);
  textSize(20);
  if (setUpPhase){
    displayGrid();
    fill("black");
    text("Please place your ships by dragging them around the grid", 500, 130);
    text("When you are ready, press S to begin", 500, 160);
    placeShips(mouseX, mouseY);
    if (key === "s"){
      setUpPhase = !setUpPhase;
    }
  }
  else{
    displayGrid();
    fill("black");
    text("this grid is the enemys grid", 500, 500);
    text("Click anywhere to make your guess", 500, 530);
    text("The enemy has the same 3 ships as you, the first to sink them all wins", 500, 560);
    placeShips(mouseX, mouseY);
    if (aIPlacement){
      placeAIShips();
    }
    else{
      playerAndRobotTurns();
    }
    if (enemyShipsLeft === 0){
      text("VICTORY",500,400);
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


// pretty colors :)
// fill(random(100, 255),random(100, 255),random(200, 255));

//places the ships
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
    while (abcd !== 1){
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
      abcd = 1;
    }
  }
}

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
  while (randomNumsOverlapping !== 1){
    grid[randSmallY+20][randSmallX+5] = "enemy ship here";
    grid[randSmallY+20][randSmallX+6] = "enemy ship here";
    console.log(randSmallY+20,randSmallX+5);

    grid[randMedY+20][randMedX+5] = "enemy ship here";
    grid[randMedY+19][randMedX+5] = "enemy ship here";
    grid[randMedY+20][randMedX+6] = "enemy ship here";
    grid[randMedY+19][randMedX+6] = "enemy ship here";
    console.log(randMedY+20,randMedX+5);

    
    for (let q = -1; q < 2; q++){
      for (let p = -1; p < 2; p++){
        grid[randLargeY+q + 19][randLargeX + p + 7] = "enemy ship here";
        console.log(randLargeY+19+q,randLargeX+5+p);
      }
    }
    let banana = 0;
    for (let v = 0; v < grid.length - 1; v++){
      for (let w = -1; w < grid[v].length - 1; w++){
        if (grid[v][w] === "enemy ship here"){
          banana += 1;
        }
      }
    }
    
    if (banana === 15){
      aIPlacement = false;
      randomNumsOverlapping += 1;
      console.log("AI grid set up");
    }
    else{
      randSmallX = Math.floor(random(13));
      randMedX = Math.floor(random(14));
      randLargeX = Math.floor(random(10));
      randSmallY = Math.floor(random(14));
      randMedY = Math.floor(random(13));
      randLargeY = Math.floor(random(10));
      banana = 0;
      console.log("overlapped, repeating process");
      for (let b = 0; b < grid.length; b++){
        for (let d = -1; d < grid[b].length; d++){
          grid[b][d] = "fog";
        }
      }
    }
  }


}


function mouseClicked(){
  selectedSquare = true;
}

function playerAndRobotTurns(){
  if(selectedSquare && turn === "player"){
    let x = Math.floor(mouseX/CELL_SIZE);
    let y = Math.floor(mouseY/CELL_SIZE);

    if(x >= 6 && x <= 19 && y >= 21 && y <= 34){
      if (grid[y][x]  === "fog"){
        grid[y][x]  = "missed";
        console.log("missed");
        turn = "robot"; 
        selectedSquare = false;

      }
      else if (grid[y][x] === "enemy ship here"){
        grid[y][x] = "hit";
        console.log("hit");
        enemyShipsLeft -= 1;
        turn = "robot"; 
        selectedSquare = false;

      }
      else{
        console.log("alread fired here");
        console.log(y, x);
      }
    }
  }


  else if (turn === "robot"){
    do{
      if (!robotHitShip){
        if (grid[robotPickedY][robotPickedX] === "fog"){
          grid[robotPickedY][robotPickedX] = "missed";
          turn = "player";
        }
        else if(grid[robotPickedY][robotPickedX] === "allied ship here"){
          grid[robotPickedY][robotPickedX] = "hit";
          playerShipsLeft -= 1;
          turn = "player";
          lastHitLocationX = robotPickedX;
          lastHitLocationY = robotPickedY;
          robotHitShip = true;
        }
        else if (grid[robotPickedY][robotPickedX] === "hit" || grid[robotPickedY][robotPickedX] === "missed"){
          console.log("already hit AI");
        }
        robotPickedX = Math.floor(random(6,20));
        robotPickedY = Math.floor(random(2,16));
      }
      else{
        //idea, check the squares in the order of Right, Down, Left, Up. 
        //then, if any of them are fog, aim there.
        //if the selected square was a ship, change the LSH to that and repeat

        //begining to search the area where it last hit a ship
        if (grid[lastHitLocationY][lastHitLocationX + 1] !== "missed" && grid[lastHitLocationY][lastHitLocationX + 1] !== "hit" && lastHitLocationX + 1 <= 20){
          if (grid[lastHitLocationY][lastHitLocationX + 1] === "allied ship here"){
            grid[lastHitLocationY][lastHitLocationX + 1] = "hit";
            lastHitLocationX = lastHitLocationX + 1;
            lastHitLocationY = lastHitLocationY;
            turn = "player";
            console.log(lastHitLocationY,lastHitLocationX);


          }
          else{
            grid[lastHitLocationY][lastHitLocationX + 1] = "missed";
            turn = "player";

          }
        }
        //not selecting a grid, look into it you fool
        else if (grid[lastHitLocationY - 1][lastHitLocationX] !== "missed" && grid[lastHitLocationY - 1][lastHitLocationX] !== "hit" && lastHitLocationY - 1 <= 3){
          if (grid[lastHitLocationY - 1][lastHitLocationX] === "allied ship here"){
            grid[lastHitLocationY - 1][lastHitLocationX] = "hit";
            lastHitLocationX = lastHitLocationX;
            lastHitLocationY = lastHitLocationY - 1;
            turn = "player";
            console.log(lastHitLocationY,lastHitLocationX);
            
          }
          else{
            grid[lastHitLocationY - 1][lastHitLocationX] = "missed";
            turn = "player";
            
          }
          
        }
        else if (grid[lastHitLocationY + 1][lastHitLocationX] !== "missed" && grid[lastHitLocationY + 1][lastHitLocationX] !== "hit" && lastHitLocationY + 1 >= 15){
          if (grid[lastHitLocationY + 1][lastHitLocationX] === "allied ship here"){
            grid[lastHitLocationY + 1][lastHitLocationX] = "hit";
            lastHitLocationX = lastHitLocationX;
            lastHitLocationY = lastHitLocationY + 1;
            turn = "player";
            console.log(lastHitLocationY,lastHitLocationX);
            
            
          }
          else{
            grid[lastHitLocationY + 1][lastHitLocationX] = "missed";
            turn = "player";
            
          }
          
        }
        else if (grid[lastHitLocationY][lastHitLocationX - 1] !== "missed" && grid[lastHitLocationY][lastHitLocationX - 1] !== "hit" && lastHitLocationX - 1 >= 6){
          if (grid[lastHitLocationY][lastHitLocationX - 1] === "allied ship here"){
            grid[lastHitLocationY][lastHitLocationX - 1] = "hit";
            lastHitLocationX = lastHitLocationX - 1;
            lastHitLocationY = lastHitLocationY;
            turn = "player";
            console.log(lastHitLocationY,lastHitLocationX);


          }
          else{
            grid[lastHitLocationY][lastHitLocationX - 1] = "missed";
            turn = "player";

          }
          
        }
        else{
          robotHitShip = false;
          turn = "player";
  
        }
      }
    }
    while(turn === "robot");
  }
}



//saved a bit of old code just in case
// if (randomDirection === 1){
//   if (grid[lastHitLocationY-1][lastHitLocationX] === "fog"){
//     grid[lastHitLocationY-1][lastHitLocationX] = "missed";
//     turn = "player";
//   }
//   else if(grid[lastHitLocationY-1][lastHitLocationX] === "allied ship here"){
//     grid[lastHitLocationY-1][lastHitLocationX] = "hit";
//     playerShipsLeft -= 1;
//     turn = "player";
//     lastHitLocationX = lastHitLocationX;
//     lastHitLocationY = lastHitLocationY-1;
//   }
// }
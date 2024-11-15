// Battleship
// James Mitchell
// 10/28/24
// A small note:
// I have no idea why the players ships are sometimes being considered empty tiles without ending the game
// It only happens once every 20 games or so, but it still happens
// Extra for Experts:
// 

let grid;
const CELL_SIZE = 20;
let rows;
let cols;
let setUpPhase = true;
let turn = "player";
let playerShipsLeft = 0;
let hasPlacedPlayerBoats = 0;
let selectedSquare = false;
let gameOver = false;
let winner;

//variables for your ships
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

  //defining the enemys ship placements
  randSmallX = Math.floor(random(13));
  randMedX = Math.floor(random(14));
  randLargeX = Math.floor(random(12));
  randSmallY = Math.floor(random(14));
  randMedY = Math.floor(random(13));
  randLargeY = Math.floor(random(12));
  
  robotPickedX = Math.floor(random(6,20));
  robotPickedY = Math.floor(random(4,15));
  grid = gridGeneration(cols,rows);
}

function draw() {
  
  background(150,200,255);
  textSize(20);
  //the set up for the game
  if (setUpPhase){
    displayGrid();
    fill("black");
    text("Please place your ships by dragging them around the grid", 500, 130);
    text("When you are ready, press S to begin", 500, 160);
    placeShips(mouseX, mouseY);
    if (keyCode === 83){
      setUpPhase = false;
    }
  }
  else{
    //the game
    if (!gameOver){
      displayGrid();
      fill("black");
      text("If the enemy is hitting your ships", 500, 400);
      text("and it is not registering please refresh the page",500,430);
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
        gameOver = true;
        winner = "player";
      }
      if (playerShipsLeft === 0){
        gameOver = true;
        winner = "robot";
      }
    }
    //the end of the game
    else{
      if (winner === "player"){
        fill("black");
        text("VICTORY",500,400);
        text("To play again please refresh this page",600,400);

      }
      else{
        fill("black");
        text("DEFEAT",500,400);
        text("To play again please refresh this page",600,400);

      }

    }
  }
}



//generates a screen wide grid so it can be divided into the player and enemy sections later
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
        fill(150,200,255);
        square(x*CELL_SIZE,y*CELL_SIZE,CELL_SIZE);
      }
      //enemy grid
      if (x > 5 && x < 20 && y > 20 && y < 35 && !setUpPhase){
        fill(150,200,255);
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

//places the ships
function placeShips(x,y){
  fill("grey");
  if (setUpPhase){
    //updates the ships position if it is in within the grid
    //small battleship
    if(mouseIsPressed && mouseX >= newSmallX - smallSize && mouseX <= newSmallX + smallSize && mouseY >= newSmallY - smallSize && mouseY <= newSmallY + smallSize){
      if(mouseX/CELL_SIZE > 6 && mouseX/CELL_SIZE < 19 && mouseY/CELL_SIZE > 2 && mouseY/CELL_SIZE < 16){
        rect(x-smallSize/2,y-smallSize/2,smallSize*2,smallSize);
        newSmallX = x;
        newSmallY = y;
        //draws the other two ships so they still show when moving the other ships
        square(newMedX - medSize/2 ,newMedY - medSize/2 ,medSize);
        square(newLargeX-largeSize/2,newLargeY-largeSize/2,largeSize);
        calledForSmall = true;
        snapShipsToGrid(newSmallX,newSmallY);
      }
      else{
        //when the mouse is released it will call this and snap the ship to the grid
        calledForSmall = true;
        snapShipsToGrid(newSmallX,newSmallY);
      }
    }
    //medium battleship
    else if(mouseIsPressed && mouseX >= newMedX - medSize/1.5 && mouseX <= newMedX + medSize/1.5 && mouseY >= newMedY - medSize/1.5 && mouseY <= newMedY + medSize/1.5){
      if(mouseX/CELL_SIZE > 7 && mouseX/CELL_SIZE < 20 && mouseY/CELL_SIZE > 3 && mouseY/CELL_SIZE < 16){
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
    //draws the ships
    else{
      square(newMedX - medSize/2 ,newMedY - medSize/2, medSize);
      rect(newSmallX-smallSize/2,newSmallY-smallSize/2,smallSize*2,smallSize);
      square(newLargeX-largeSize/2,newLargeY-largeSize/2,largeSize);
    }
  }

  //places the ships into the grid so the AI can hit them
  else{
    while (hasPlacedPlayerBoats !== 1){
      //small ship
      grid[Math.floor(newSmallY/CELL_SIZE)][Math.floor(newSmallX/CELL_SIZE)] = "allied ship here";
      grid[Math.floor(newSmallY/CELL_SIZE)][Math.floor(newSmallX/CELL_SIZE)+1] = "allied ship here";
      //medium ship
      grid[Math.floor(newMedY/CELL_SIZE)][Math.floor(newMedX/CELL_SIZE)] = "allied ship here";
      grid[Math.floor(newMedY/CELL_SIZE) - 1][Math.floor(newMedX/CELL_SIZE)] = "allied ship here";
      grid[Math.floor(newMedY/CELL_SIZE)][Math.floor(newMedX/CELL_SIZE) - 1] = "allied ship here";
      grid[Math.floor(newMedY/CELL_SIZE) - 1][Math.floor(newMedX/CELL_SIZE) - 1] = "allied ship here";
      
      //large ship
      for (let m = -1; m < 2; m++){
        for (let n = -1; n < 2; n++){
          grid[Math.floor(newLargeY/CELL_SIZE)+n][Math.floor(newLargeX/CELL_SIZE)+m] = "allied ship here";
        }
      }

      //prevents anyone from unable to lose
      for (let we = 0; we < grid.length; we++){
        for (let rt = 0; rt < grid.length; rt++){
          if (grid[we][rt] === "allied ship here"){
            playerShipsLeft += 1;
          }
        }
      }
      hasPlacedPlayerBoats = 1;
    }
  }
}

//a function used for snapping the players ships to the grids that it is on
function snapShipsToGrid(x,y){
  snapX = Math.floor(x/CELL_SIZE);
  snapY = Math.floor(y/CELL_SIZE);

  if (calledForSmall){
    //snaps the small ship to the grid
    newSmallX = Math.floor(snapX*CELL_SIZE + CELL_SIZE/2);
    newSmallY = Math.floor(snapY*CELL_SIZE + CELL_SIZE/2);
    calledForSmall = false;
  }
  //snaps the medium ship to the grid
  if (calledForMed){
    newMedX = Math.floor(snapX*CELL_SIZE);
    newMedY = Math.floor(snapY*CELL_SIZE);
    calledForMed= false;
  }
  //snaps the large ship to the grid
  if (calledForLarge){
    newLargeX = Math.floor(snapX*CELL_SIZE + CELL_SIZE/2);
    newLargeY = Math.floor(snapY*CELL_SIZE + CELL_SIZE/2);
    calledForLarge = false;
  }
}

//places the enemys ships within a certin grid
function placeAIShips(){
  //a simple loop to make sure that the ships are not going to overlap
  while (randomNumsOverlapping !== 1){
    grid[randSmallY+21][randSmallX+6] = "enemy ship here";
    grid[randSmallY+21][randSmallX+7] = "enemy ship here";

    grid[randMedY+21][randMedX+6] = "enemy ship here";
    grid[randMedY+22][randMedX+6] = "enemy ship here";
    grid[randMedY+21][randMedX+7] = "enemy ship here";
    grid[randMedY+22][randMedX+7] = "enemy ship here";
    
    for (let q = -1; q < 2; q++){
      for (let p = -1; p < 2; p++){
        grid[randLargeY+q + 22][randLargeX + p + 7] = "enemy ship here";
      }
    }
    let checkIfAllShipsPlaced = 0;
    for (let v = 0; v < grid.length - 1; v++){
      for (let w = -1; w < grid.length - 1; w++){
        if (grid[v][w] === "enemy ship here"){
          checkIfAllShipsPlaced += 1;
        }
      }
    }
    
    if (checkIfAllShipsPlaced === 15){
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
      checkIfAllShipsPlaced = 0;
      console.log("overlapped, repeating process");
      for (let b = 0; b < grid.length; b++){
        for (let d = -1; d < grid[b].length; d++){
          grid[b][d] = "fog";
        }
      }
    }
  }
}

//only used to check if the player has guessed in a spot a single time
function mouseClicked(){
  selectedSquare = true;
}

function playerAndRobotTurns(){
  //players turn
  if(selectedSquare && turn === "player"){
    let x = Math.floor(mouseX/CELL_SIZE);
    let y = Math.floor(mouseY/CELL_SIZE);

    if(x >= 6 && x <= 19 && y >= 21 && y <= 34){
      if (grid[y][x]  === "fog"){
        grid[y][x]  = "missed";
        turn = "robot"; 
        selectedSquare = false;
      }
      else if (grid[y][x] === "enemy ship here"){
        grid[y][x] = "hit";
        enemyShipsLeft -= 1;
        turn = "robot"; 
        selectedSquare = false;
      }
    }
  }

  //robots turn
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
        }
        robotPickedX = Math.floor(random(6,20));
        robotPickedY = Math.floor(random(2,16));
      }

      //begining to search the area where it last hit a ship
      else{
        //checks to the right if that has not yet been tried
        if (grid[lastHitLocationY][lastHitLocationX + 1] !== "missed" && grid[lastHitLocationY][lastHitLocationX + 1] !== "hit" && lastHitLocationX + 1 < 20){
          if (grid[lastHitLocationY][lastHitLocationX + 1] === "allied ship here"){
            grid[lastHitLocationY][lastHitLocationX + 1] = "hit";
            lastHitLocationX = lastHitLocationX + 1;
            lastHitLocationY = lastHitLocationY;
            playerShipsLeft -= 1;
            turn = "player";
          }
          else{
            grid[lastHitLocationY][lastHitLocationX + 1] = "missed";
            turn = "player";
          }
        }
        //checks below if that has not yet been tried
        else if (grid[lastHitLocationY + 1][lastHitLocationX] !== "missed" && lastHitLocationY + 1 < 16 && grid[lastHitLocationY+1][lastHitLocationX] !== "hit"){
          if (grid[lastHitLocationY + 1][lastHitLocationX] === "allied ship here"){
            grid[lastHitLocationY + 1][lastHitLocationX] = "hit";
            lastHitLocationX = lastHitLocationX;
            lastHitLocationY = lastHitLocationY + 1;
            turn = "player";
            playerShipsLeft -= 1;
            
          }
          else if (grid[lastHitLocationY + 1][lastHitLocationX] !== "hit"){
            grid[lastHitLocationY + 1][lastHitLocationX] = "missed";
            turn = "player";
          }
        }
        //checks above if that has not yet been tried
        else if (grid[lastHitLocationY - 1][lastHitLocationX] !== "missed" && lastHitLocationY - 1 > 3 && grid[lastHitLocationY-1][lastHitLocationX] !== "hit"){
          if (grid[lastHitLocationY - 1][lastHitLocationX] === "allied ship here"){
            grid[lastHitLocationY - 1][lastHitLocationX] = "hit";
            lastHitLocationX = lastHitLocationX;
            lastHitLocationY = lastHitLocationY - 1;
            turn = "player";
            playerShipsLeft -= 1;
          }
          else if (grid[lastHitLocationY - 1][lastHitLocationX] !== "hit"){
            grid[lastHitLocationY - 1][lastHitLocationX] = "missed";
            turn = "player";
            
          }
          
        }
        //checks left if that has not yet been tried
        else if (grid[lastHitLocationY][lastHitLocationX - 1] !== "missed" && grid[lastHitLocationY][lastHitLocationX - 1] !== "hit" && lastHitLocationX - 1 >= 6){
          if (grid[lastHitLocationY][lastHitLocationX - 1] === "allied ship here"){
            grid[lastHitLocationY][lastHitLocationX - 1] = "hit";
            lastHitLocationX = lastHitLocationX - 1;
            lastHitLocationY = lastHitLocationY;
            turn = "player";
            playerShipsLeft -= 1;


          }
          else{
            grid[lastHitLocationY][lastHitLocationX - 1] = "missed";
            turn = "player";

          }
          
        }
        //if all the directions have been tried, it sets the robot back to randomly guessing
        else{
          robotHitShip = false;  
        }
      }
    }
    while(turn === "robot");
  }
}
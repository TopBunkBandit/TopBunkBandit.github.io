// OOP WALKER DEMO
// James Mitchell
// 11/13/24

class Walker{
  constructor(x, y, theColor){
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.radius = 1;
    this.color = theColor;
  }

  display(){
    fill(this.color);
    noStroke();
    rect(this.x, this.y, this.radius*2);
  }

  move(){
    let a = random(4);
    if (a < 1){
      this.x += this.speed;
    }
    else if (a < 2){
      this.x -= this.speed;
    }
    else if (a < 3){
      this.y -= this.speed;
    }
    else{
      this.y += this.speed;
    }

  }
}

let walkerArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("black");
  let luce = new Walker(width/2,height/2,"Purple");
  walkerArray.push(luce);
}

function draw() {
  for (let theWalker of walkerArray){
    theWalker.display();
    theWalker.move();
  }
  
}

function mousePressed(){
  let randomColor = color(random(255),random(255),random(255));

  let someWalker = new Walker(mouseX,mouseY,randomColor);
  walkerArray.push(someWalker);
}

// let mike;
// mike = new Walker(width/2 + 20, height/2 + 50, "gold");
// mike.display();
// mike.move();
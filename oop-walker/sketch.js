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

let mike;
let luc;
function setup() {
  createCanvas(windowWidth, windowHeight);
  luc = new Walker(width/2,height/2,"Purple");
  mike = new Walker(width/2 + 20, height/2 + 50, "gold");
}

function draw() {
  // background(220);
  luc.display();
  mike.display();
  luc.move();
  mike.move();
  
}

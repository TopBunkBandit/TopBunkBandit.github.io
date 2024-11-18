// OOP Fireworks Demo
// James Mitchell
// 11/18/24

class Partical{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.dx = random(-5,+5);
    this.dy = random(-5,+5);
    this.size = 5;
    this.r = random(100, 255);
    this.g = random(100, 255);
    this.b = random(200, 255);
    this.opacity = random(255);
  }
  display(){
    noStroke();
    fill(this.r,this.g,this.b,this.opacity);
    circle(this.x,this.y,this.size);
  }

  update(){
    this.x += this.dx;
    this.y += this.dy;

    //fade away over time
    this.opacity -= 5;
  }

  isDead(){
    return this.opacity <= 0;
  }

}


let theFireworks = [];
const NUMBER_OF_PARTICALS_PER_CLICK = 250;
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  for (let firework of theFireworks){
    if (firework.isDead()){
      let index = theFireworks.indexOf(firework);
      theFireworks.splice(index,1);

    }
    else{
      firework.update();
      firework.display();      
    }
  }
}

function mousePressed(){
  for (let i = 0; i < NUMBER_OF_PARTICALS_PER_CLICK; i ++){
    let somePartical = new Partical(mouseX,mouseY);
    theFireworks.push(somePartical);
  }

}
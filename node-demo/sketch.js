// Connected Nodes OOP Demo
// James Mitchell
// 11/20/24

let points = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnPoint(width/2,height/2);
}

function draw() {
  background(0);
  //draws lines below circles
  for (let point of points){
    point.update(points);
  }


  for (let point of points){
    point.display();
  }
}

function mouseWheel(){
  let somePoint = new MovingPoint(mouseX,mouseY);
  points.push(somePoint);
}

class MovingPoint{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.radius = 10;
    this.color = color(random(100,255),random(100,255),random(200,255));
    this.xTime = random(1000);
    this.yTime = random(1000);
    this.deltaTime = 0.1;
    this.reach = 150;

    this.MIN_RADIUS = 10;
    this.MAX_RADIUS = 25;
  }

  display(){
    noStroke();
    fill(this.color);
    circle(this.x,this.y,this.radius*2);
  }

  move(){
    let dx = noise(this.xTime);
    let dy = noise(this.yTime);
    this.dx = map(dx, 0, 1, -this.speed, this.speed);
    this.dy = map(dy, 0, 1, -this.speed, this.speed);
    this.x += this.dx;
    this.y += this.dy;
    this.xTime += this.deltaTime;
    this.yTime += this.deltaTime;


  }

  wrapAroundScreen(){
    if (this.x - this.radius < 0){
      this.x = width - this.radius;
    }
    if (this.x + this.radius > width){
      this.x = this.radius;
    }
    if (this.y - this.radius < 0){
      this.y = height - this.radius;
    }
    if (this.y + this.radius > height){
      this.y = this.radius;
    }
  }

  conncetTo(pointsArray){
    for (let otherPoint of pointsArray){
      if (this !== otherPoint){
        let pointDistance = dist(this.x,this.y,otherPoint.x,otherPoint.y);
        if (pointDistance < this.reach){
          stroke(this.color);
          line(this.x,this.y,otherPoint.x,otherPoint.y);
        }
      }
    }
  }

  update(thePoints){
    this.move();
    this.wrapAroundScreen();
    this.conncetTo(thePoints);
    this.adjustSizeWithMouse();
  }

  adjustSizeWithMouse(){
    let mouseDistance = dist(this.x,this.y,mouseX,mouseY);
    let theSize = map(mouseDistance,0,this.reach,this.MAX_RADIUS,this.MIN_RADIUS);
    if (mouseDistance < this.reach){
      this.radius = theSize;
    }
    else{
      this.radius = 10;
    }
  }
}


function spawnPoint(x,y){
  let somePoint = new MovingPoint(x,y);
  points.push(somePoint);
}
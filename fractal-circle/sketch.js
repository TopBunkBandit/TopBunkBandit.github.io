// Fractal circle demo
// James Mitchell
// 12/18/24


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  recursiveCircle(width/2,height/2,mouseX);
}


function recursiveCircle(x,y,radius){
  circle(x,y,radius*2);
  
  //exit clause
  if (radius > 7.5){
    recursiveCircle(x - radius/2, y, radius/2);
    recursiveCircle(x + radius/2, y, radius/2);
  }


}
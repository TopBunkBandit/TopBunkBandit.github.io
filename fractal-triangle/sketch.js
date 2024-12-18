// Sierpinski Triangle
// James Mitchell
// 12/18/24


let initalTriangle = [
  {x: 300, y: 50,},
  {x: 50, y: 600,},
  {x: 550, y: 600},
];

let theColors = ["red","orange","yellow","green","blue","purple","black","white"];
let theDepth = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  sierpinski(initalTriangle,theDepth);
}

function mousePressed(){
  if (theDepth < 7){

    theDepth++;
  }

}


function sierpinski(points,depth){
  fill(theColors[depth]);
  noStroke();
  triangle(points[0].x, points[0].y, points[1].x, points [1].y, points[2].x, points[2].y);

  if (depth > 0){
    //draw upper triangle
    sierpinski([points[0], midPoint(points[0],points[1]), midPoint(points[0],points[2])],depth-1);


    sierpinski([points[1],midPoint(points[0],points[1]), midPoint(points[1],points[2])],depth-1);
    sierpinski([points[2],midPoint(points[0],points[2]), midPoint(points[1],points[2])],depth-1);

    
  }
}

function midPoint(point1,point2){
  let midX = (point1.x + point2.x)/2;
  let midY = (point1.y + point2.y)/2;
  return {x: midX, y: midY,};
}
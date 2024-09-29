 
function setup() { 
    // Create a canvas 
    createCanvas(400, 400); 
} 
  
function draw() { 
    // set background color 
    background(50); 
    // coordinates of the fixed point 
    var x1 = 200; 
    var y1 = 200; 
    // coordinates of the cursor 
    var x2 = mouseX; 
    var y2 = mouseY; 
    // set line color and weight 
    stroke(255); 
    strokeWeight(2); 
    // draw a line connecting 2 points 
    line(x1, y1, x2, y2); 
    fill("red"); 
    // draw a circle centered at each point 
    ellipse(x1, y1, 10); 
    ellipse(x2, y2, 10); 
    // calculate the distance between 2 points 
    d = dist(x1, y1, x2, y2); 
    noStroke(); 
    fill("lightgreen"); 
    // set text size and alignment 
    textSize(20); 
    textAlign(CENTER); 
    // display the distance calculated 
    text("distance = "+ str(d), 200, 350); 
} 
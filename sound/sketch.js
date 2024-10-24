// Sound Effects Demo
// James
// 10/16/24

let bgMusicLoop;
let clickSound;


function preload(){
  bgMusicLoop = loadSound("bgmusic.mp3");
  clickSound = loadSound("potpickup.ogg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  bgMusicLoop.amp(1.0);
  clickSound.amp(0.5);
}

function draw() {
  background(220);
}


function keyPressed(){
  if (!bgMusicLoop.isPlaying()){
    bgMusicLoop.loop();
  }

}

function mousePressed(){
  clickSound.play();
}
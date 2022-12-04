
var colorCount = 20;
var hueValues =[];
var saturationValues = [];
var brightnessValues = []

let ready= false;

var n = 0 // so that the array knows 

//text
let str = 'MEDINA RIVER PRESS TO BEGIN MEDINA RIVER PRESS TO BEGIN ';
let rotateSpeed=.006;
let startAngle =    0;     // angle where text should start
let distanceAngle = 360;   // how far (in degrees) text will go

let radius;                // set dynamically in setup()
let font;

let sinSpeed1=.006;


function preload() {  
  song = loadSound('audio/MedinaRiver.mp3');
}


function setup() {
createCanvas(windowWidth,windowHeight); 
amp = new p5.Amplitude();
amp.smooth(5);
black = color(0)
white = color(192)
colors = [black, white];

//text
radius = min(width,height) / 3;
 textSize(radius*.15);
 textAlign(CENTER, BASELINE);
 song.setVolume(.6)

  noStroke();
}

function draw() { 
      cursor(HAND);
      if (ready){
      translate(width/2,height/2);

      cursor(ARROW);
      let vol = amp.getLevel();
      let volAmp= vol*600;
      scale(vol*40);
      // ------ area tiling ------
      // count tiles
      var counter = 0;
      // row count and row height
      var rowCount = int(map(volAmp,0,20,0,volAmp*3));
      var rowHeight = -height/rowCount;
      print(rowHeight);

      for(var i=0; i<rowCount; i++) {
        // seperate each line in parts  
        // how many fragments
        var partCount = i+1;

        var parts = [0];

        for(var ii=0; ii<partCount; ii++) {
          // // sub fragments or not?
          if (random(1.0) < 0.075) {
            // take care of big values      
            var fragments = int(random(2,22));
            partCount = partCount + fragments; 
            for(var iii=0; iii<fragments; iii++) {
              parts = append(parts, random(2));
            }   
           // frameRate(volAmp)*2;
           
          }  
          else {
          var  parts = append(parts, sin(frameCount)*20);   
          }
        }

        // add all subparts
        var sumPartsTotal = 0;
        for(var ii=0; ii<partCount; ii++) 
        sumPartsTotal += parts[ii];
        // draw rects
        var sumPartsNow = 0;
        for(var ii=0; ii<parts.length; ii++) {

          coinFlip();

          sumPartsNow += parts[ii];
          rectMode(RADIUS);

          rect(map(sumPartsNow, 0,sumPartsTotal, -width,width),rowHeight*i, 
          map(parts[ii], 0,sumPartsTotal, -height,width)*-1,map(rowHeight, -height/2, 0, -height/2, height/2));
          counter++;
        
  
        }
      }  
    }
    else{ //TEXT DISPLAY
      background(192);
      translate(width/2,height/2);
      rotate(radians(millis()*rotateSpeed));
      textDisplay(1);
    }

} 

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function coinFlip() { //selects color

	var flip = random(100);
  var n2= noise(frameCount*20)*100;

	if (flip < 50) {
		fill(192);
	} else {
		fill(0);
	}


}

function textDisplay(x){
  // calculate the angle between each letter

  rotate(radians(frameCount));
  let angleBetweenLetters = radians(distanceAngle) / str.length;

  scale(sin(frameCount*sinSpeed1)*x);
  // display the text!
  push();
  //translate(width/2, height/2);        // move to circle's center
  rotate(radians(startAngle));         // rotate to where text starts
  for (let i=0; i<str.length; i++) {   // go through each letter in the text
    push();
    rotate(i * angleBetweenLetters);   // rotate to angle
    translate(0,-radius);              // and translate to edge of circle
    fill(0);
    noStroke();
    text(str[i], 0,0);                 // draw character at location
    pop();
  }
  pop();
}

function mousePressed() {
  if (!ready) {
    // initializeAudio();
    ready = true;
    song.loop();

  }
}
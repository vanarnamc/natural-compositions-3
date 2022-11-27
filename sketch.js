
 //
 // Generative Gestaltung, ISBN: 978-3-87439-759-9
 // First Edition, Hermann Schmidt, Mainz, 2009
 // Hartmut Bohnacker, Benedikt Gross, Julia Laub, Claudius Lazzeroni
 // Copyright 2009 Hartmut Bohnacker, Benedikt Gross, Julia Laub, Claudius Lazzeroni
 //
 // http://www.generative-gestaltung.de
 //
 // Licensed under the Apache License, Version 2.0 (the "License");
 // you may not use this file except in compliance with the License.
 // You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 // Unless required by applicable law or agreed to in writing, software
 // distributed under the License is distributed on an "AS IS" BASIS,
 // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 // See the License for the specific language governing permissions and
 // limitations under the License.
/**
 * generates a specific color palette and some random "rect-tilings"
 * 
 * MOUSE
 * left click          : new composition
 * 
 * KEYS
 * s                   : save png
 */

var colorCount = 20;
var hueValues =[];
var saturationValues = [];
var brightnessValues = []

let ready= false;


var n = 0 // so that the array knows 

function preload() {  
  song = loadSound('audio/MedinaRiver.mp3');
}


function setup() {
 createCanvas(windowWidth,780); 
 black = color(0)
 white = color(255)
  //colorMode(HSB,360,100,100,100);
colors = [black, white];


  noStroke();
}

function draw() { 
  
      if (ready){
      frameRate(10);
      // ------ area tiling ------
      // count tiles
      var counter = 0;
      // row count and row height
      var rowCount = int(map(mouseX,0,width,0,20));
      var rowHeight = height/rowCount;

      for(var i=0; i<rowCount; i++) {
        // seperate each line in parts  
        // how many fragments
        var partCount = i+1;

        var parts = [0];

        for(var ii=0; ii<partCount; ii++) {
          // // sub fragments or not?
          if (random(1.0) < 0.075) {
            // take care of big values      
            var fragments = int(random(2,20));
            partCount = partCount + fragments; 
            for(var iii=0; iii<fragments; iii++) {
              parts = append(parts, random(2));
            }              
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
          rect(map(sumPartsNow, 0,sumPartsTotal, 0,width),rowHeight*i, 
          map(parts[ii], 0,sumPartsTotal, 0,width)*-1,rowHeight);
          counter++;
        
  
        }
      }  
    }


} 

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function coinFlip() { //selects color

	var flip = random(100);
  var n2= noise(frameCount*20)*100;
  print(n2);

	if (flip < 50) {
		fill(238);
	} else {
		fill(0);
	}


}

function mousePressed() {
  if (!ready) {
    // initializeAudio();
    ready = true;
    song.loop();

  }
}
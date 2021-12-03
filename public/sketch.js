// 11/29/2021: YG
// This is logic code for viewer's page
// Will gradually migrate all scene logics to scenes.js

var TESTING = false;

var socket;
var bg = 255;
var bga = 1;
var r = 255, g = 255, b = 255;
var size = 10;

var users = {};

// scene control
let sceneIdx = 0; //0: Entering the Livestream  1:Making Coffee  2:Post Crash  3:The Club   4:Climax

let isViewer = true;

function setup() {

  r = random(0, 255);
  g = random(0, 255);
  b = random(0, 255);

  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.id('cnv');
  cnv.parent("vidContainer");

  socket = io.connect();

  socket.on('connect', function () {
    console.log("Connected");
  });

  socket.on('mouse', function (data) {
    users[data.id] = data;
    fillc = 255;
  });

  socket.on('blink', function () {
    if (sceneIdx == 3) club.blink();
  });

  socket.on('sceneIdx', function (idx) {
    sceneIdx = idx;
  })

  // top of show, reset all scenes
  for (let scene of scenes) scene.reset();

  noStroke();
}

function draw() {

  // Run the current scene
  scenes[sceneIdx].run();

}

var mouseWait = false;
var timesPerSecond = 5;
function mouseMoved() {
  // console.log("mousemoved");
	if (!mouseWait) {

  		var dataToSend = { s: size, x: mouseX, y: mouseY, id: socket.id, r: r, g: g, b: b };
  		socket.emit('mouse', dataToSend);

        	// stop any further events
        	mouseWait = true;
        	// after a fraction of a second, allow events again
        	setTimeout(function () {
            		mouseWait = false;
        	}, 1000 / timesPerSecond);
    } 
}

function mousePressed() {
  socket.emit('blink', {});
}


// temporary key control to swtich scenes for testing
function keyPressed() {
if (TESTING) {
  console.log(key);
  switch (key) {
    case "0":
      sceneIdx = 0;
      break;
    case "1":
      sceneIdx = 1;
      break;
    case "2":
      sceneIdx = 2;
      break;
    case "3":
      sceneIdx = 3;
      break;
    case "4":
      sceneIdx = 4;
      break;
  }
}
}

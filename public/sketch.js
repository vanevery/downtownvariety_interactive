// Change scenes
// User movement
// Patterns over video

// reveal something in the background
// fill something up - collect the values - pressure/buckling




var socket;
var bg = 0;
var bga = 1;
var pos = { x: -20, y: -20 };
var fillc = 0;
var size = 5;

var users = {};

var mic;
var levels = [];
var num = 30;
var li = 0;
var r = 255, g = 255, b = 255;

var audiostarted = false;

// scene control
let sceneIdx = 0; //0: Entering the Livestream  1:Making Coffee  2:Post Crash  3:The Club   4:Climax

function setup() {

  r = random(0, 255);
  g = random(0, 255);
  b = random(0, 255);
  //c = createCapture(AUDIO);

  let cnv = createCanvas(windowWidth, windowHeight);

  socket = io.connect();

  socket.on('connect', function () {
    console.log("Connected");
  });

  socket.on('mouse', function (data) {
    users[data.id] = data;
    fillc = 255;
  });

  socket.on('blink', function () {
    blink();
  })

  // top of show, reset all scenes
  for (let scene of scenes) scene.reset();
}

function draw() {

  // ----YG: I move all of the following into the "enter scene" under scenes.js
  // background(bg, bga);
  // fill(fillc);
  // noStroke();
  // for (const u in users) {
  //   fill(users[u].r, users[u].g, users[u].b);
  //   ellipse(users[u].x, users[u].y, users[u].s, users[u].s);
  // }
  // fillc--;

  // if (audiostarted) {
  //   //console.log(mic.getLevel());
  //   levels[li] = mic.getLevel();
  //   if (li < num - 1) {
  //     li++;
  //   } else {
  //     li = 0;
  //   }
  // }

  // Run the current scene
  scenes[sceneIdx].run();

}

function blink() {
  console.log("blink");
  bg = 128;
  bga = 128;
  setTimeout(function () {
    bg = 0;
    bga = 20;
  }, 20);
}


function mouseMoved() {
  console.log("mousemoved");
  var dataToSend = { s: size, x: mouseX, y: mouseY, id: socket.id, r: r, g: g, b: b };
  socket.emit('mouse', dataToSend);
}

function mousePressed() {
  socket.emit('blink', {});

  if (!audiostarted) {
    userStartAudio();
    mic = new p5.AudioIn(function (err) { console.log(err); });
    mic.start();
    setInterval(function () {
      size = 1000 * calculateAverage(levels);
      if (size <= 50) {
        size = 50;
      }
      if (size > 50) {
        blink();
      }
      console.log(size);
    }, 200);
    audiostarted = true;
  }
}

function calculateAverage(array) {
  var total = 0;
  var count = 0;

  array.forEach(function (item, index) {
    total += item;
    count++;
  });

  return total / count;
}


// temporary key control to swtich scenes for testing
function keyPressed() {
  console.log(key);
  switch (key) {
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
    case "5":
      sceneIdx = 5;
      break;
  }
}
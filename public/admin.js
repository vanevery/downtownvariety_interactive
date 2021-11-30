// 11/29/2021: YG
// This is admin control panel code to switch the scenes for all viewers' page and the aggregate page.

let socket;


// scene control
let sceneIdx = 0; //0: Entering the Livestream  1:Making Coffee  2:Post Crash  3:The Club   4:Climax

function setup() {

  let cnv = createCanvas(windowWidth, windowHeight);

  socket = io.connect();

  socket.on('connect', function () {
    console.log("Connected");
  });

}

function draw() {
  background(150);
  textSize(34);
  text("Scene " + sceneIdx, width/2 - 50, height/2 - 50);
  textSize(12);
  text("press 0-4 key to switch scenes.", width/2 - 50, height/2);
}

// temporary key control to swtich scenes for testing
function keyPressed() {
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

  socket.emit('sceneIdx', sceneIdx);
}
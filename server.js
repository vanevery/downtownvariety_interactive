// Express is a node module for building HTTP servers
var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({
	origin: ['https://simplemediapeerbroadcaster.itp.io:8443', 'https://simplemediapeerbroadcaster.itp.io']
	//origin: '*'
}));

// Tell Express to look in the "public" folder for any files first
app.use(express.static('public'));

// If the user just goes to the "route" / then run this function
app.get('/', function (req, res) {
  res.send('Hello World!')
});

// Here is the actual HTTP server 
var http = require('https');

// Security options - key and certificate
var fs = require('fs');
var options = {
	// key: fs.readFileSync('star_itp_io.key'),
	// cert: fs.readFileSync('star_itp_io.pem')
	key: fs.readFileSync('./certs/key.pem'),
	cert: fs.readFileSync('./certs/cert.pem')
  };
  
// We pass in the Express object and the options object
var httpServer = http.createServer(options, app);

// Listen on port 443
httpServer.listen(8443);

// WebSocket Portion
var io = require('socket.io')(httpServer, {
  cors: {
	origin: ['https://simplemediapeerbroadcaster.itp.io:8443', 'https://simplemediapeerbroadcaster.itp.io'],
	methods: ["GET", "POST"]
  }
});

var users = [];

var sceneIdx = 0;

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection', 
	// We are given a websocket object in our function
	function (socket) {
	
		console.log("We have a new client: " + socket.id);

		users.push(socket);

		socket.emit('sceneIdx', sceneIdx);

		var usernames = [];
		for (var i = 0; i < users.length; i++) {
			usernames.push(users[i].username);	
		}
		socket.emit('users',usernames);

		socket.on('username', function(data) {
			socket.username = data;

			var usernames = [];
			for (var i = 0; i < users.length; i++) {
				usernames.push(users[i].username);	
			}
			io.emit('users',usernames);
		});

		socket.on('blink', function(data) {
			io.emit('blink', data);
		});

		socket.on('mouse', function(data) {
			io.emit('mouse', data);
		});
		
		// When this user emits, client side: socket.emit('otherevent',some data);
		socket.on('chatmessage', function(data) {
			// Data comes in as whatever was sent, including objects
			console.log("Received: 'chatmessage' " + data);
			
			// Send it to all of the clients
			//socket.emit()
			// Goes to everybody
			io.emit('chatmessage', data);
			//socket.broadcast.emit('chatmessage', data);
		});

		socket.on('sceneIdx', function(data) {
			sceneIdx = data;
			io.emit('sceneIdx', sceneIdx);
		});
		
		socket.on('disconnect', function() {
			console.log("Client has disconnected " + socket.id);
		});
	}
);

console.log("Server running at port 8443.");

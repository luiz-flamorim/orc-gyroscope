// Create connection to Node.JS Server
const socket = io();

let canvas;
let roll = 0;
let pitch = 0;
let yaw = 0;

function setup() {
	canvas = createCanvas(windowWidth, windowHeight, WEBGL);

	createEasyCam();
	// angleMode(DEGREES);
}

function draw() {
	background(200);

	noStroke();
	lights();
	ambientMaterial(100, 0, 100);

	rotateZ(pitch);
	rotateX(roll);
	rotateY(yaw);
	box(100);
}

//process the incoming OSC message and use them for our sketch
function unpackOSC(message) {

	//maps phone rotation directly
	if (message.address == "/ZIGSIM/LtJrVXZVQ2X6p2jX/quaternion") {
		// roll = message.args[0];
		roll = -map(message.args[0], 0, 1, 0, PI);
		// pitch = message.args[1];
		pitch = -map(message.args[1], 0, 1, 0, PI)
		yaw = message.args[2];
		// pitch = map(message.args[1], 0, 1, 0, 180);
		// yaw = map(message.args[2], 0, 1, 0, 180);

		// roll = roll * 0.9 + newRoll * 0.1;
		// pitch = pitch * 0.9 + newPitch * 0.1;
		// yaw = yaw * 0.9 + newYaw * 0.1;
	}

	//uses the rotation rate to keep rotating in a certain direction
	// if (message.address == "/ZIGSIM/LtJrVXZVQ2X6p2jX/gyro") {
	// 	roll += map(message.args[0], -3, 3, -0.1, 0.1);
	// 	pitch += map(message.args[1], -3, 3, -0.1, 0.1);
	// 	yaw += map(message.args[2], -3, 3, -0.1, 0.1);
	// }
}

//Events we are listening for
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

// Connect to Node.JS Server
socket.on("connect", () => {
	console.log(socket.id);
});

// Callback function on the event we disconnect
socket.on("disconnect", () => {
	console.log(socket.id);
});

// Callback function to recieve message from Node.JS
socket.on("message", (_message) => {
	console.log(_message);

	unpackOSC(_message);
});

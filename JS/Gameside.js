openSockets();
var bodyElement = document.getElementsByTagName("body")[0];
bodyElement.onload += ";openSockets()";
var hostname = "";

function openSockets(){
	console.log('hi');
	document.write('socketd');
	socket = new WebSocket('ws://localhost:8080/');
	}
	
function startGamepad(){
	
}

var socket;
socket.onopen = function () {
    socket.send('whoami');
};

socket.onmessage = function (event) {
	console.log(event);
	var datadict = JSON.parse(event.data);
	if (datadict['host']){
		hostname = datadict['host'];
	}

    
};
socket.onclose = function () {
    open = false;
    alert('Lost connection!');
    
};

function getInput(){
    document.getElementById('in').value;
}

//socket.send('hello, world!');

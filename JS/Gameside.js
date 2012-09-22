openSockets();
var bodyElement = document.getElementsByTagName("body")[0];
var hostname = "";

function openSockets(){
	console.log('hi');
	//document.write('socketd');
	socket = new WebSocket('ws://localhost:8080/');
	setupSocket();
	}
	
function startCheckingUpdates(){
	var updater = window.setInterval(getUpdates,20);
}

function getUpdates(){
	socket.send('{"mode":"read"}');
}
var instructionBuffer = [];

var socket;

function setupSocket(){
	socket.onopen = function () {
	    socket.send('whoami');
	    
	};
	
	socket.onmessage = function (event) {
		console.log(event);
		var datadict = JSON.parse(event.data);
		if (datadict['host']){
			hostname = datadict['host'];
			document.getElementById('QRButt').disabled = false;
			startCheckingUpdates();
		}
		else if (datadict['update']){
			console.log(datadict['update']);
		}
	
	    
	};
	socket.onclose = function () {
	    open = false;
	    alert('Lost connection!');
	    
	};
}
function getInput(){
    document.getElementById('in').value;
}

//this is an encoded version of pad.html hardcoded to my machine just now
function getPage() {
	xmlget = new XMLHttpRequest();
	xmlget.open("GET","pad.html",false);
	xmlget.send(null);
	return xmlget.response;
}
var encodedpage = "";
function replaceHostname(page){
	page = page.replace("HOSTHERE",hostname);
	return page;
}
function encodePage(page){
	console.log(page);
	var encodedpage = window.btoa(page);
	console.log(encodedpage);
	encodedpage = "data:text/html;base64," + encodedpage;
	return encodedpage;
}


//socket.send('hello, world!');

var xmlget;
var tinyURL;
function getTinyURL(longURL) {
	xmlget = new XMLHttpRequest();
	xmlget.open("GET","http://tinyurl.com/api-create.php?url="+longURL+"",false);
	xmlget.send(null);
	console.log(xmlget);
	return xmlget.response;
}

function makeQRcode(URL){
	var img = new Image();
	img.src = "http://qr.kaywa.com/?s=8&d="+URL;
	document.getElementsByTagName('body')[0].appendChild(img);
}
function start(){
makeQRcode(getTinyURL(encodePage(replaceHostname((getPage())))));
}

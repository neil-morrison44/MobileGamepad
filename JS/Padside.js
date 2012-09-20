//script
var inputbuffer = [];
function hello(){
	alert('hello beautiful');
	}
	
function drawControls(){
	alert('TBC');
}


var ctx;




var controlsetup = {"LEFT":"DPAD","RIGHT":{"A":"BUTTON","B:BUTTON"}};
function addCanvas(){
	var canvas = document.createElement('canvas');
	canvas.id = "cntcnv";
	canvas.width = window.innerWidth;
	canvas.height = window.outerHeight;
	canvas.style.position = "absolute";
	canvas.style.top = 0;
	canvas.style.left = 0;
	canvas.style.borderStyle = "solid";
	canvas.style.borderColor = "blue";
	document.getElementsByTagName('body')[0].appendChild(canvas);
	ctx = canvas.getContext('2d');
}
addMeta('viewport','width=device-width,initial-scale=1.0,user-scalable = no');
//addCanvas();
//addWarning();
detectOrintation();

function addMeta(name,content){
	var metaElement = document.createElement('meta');
	metaElement.name = name;
	metaElement.content = content;
	document.getElementsByTagName('head')[0].appendChild(metaElement);
}

function detectOrintation(){
	if ( orientation == 0 || orientation == 180){
		killChildren();
		addWarning('Turn To Landscape');
		window.setTimeout(detectOrintation,50);
	}
	else{
		//landscape
		killChildren();
		resetBody();
		addWarning('Go Fullscreen');
		detectFullscreen();
	}
}
function detectFullscreen(){
	if (!checkifFullscreen()){
		window.setTimeout(detectFullscreen,50);
	}
	else{
		killChildren();
		resetBody();
		addCanvas();
		drawControls();
		window.onorientationchange = detectOrintation;
	}
}
function killChildren(){
	while ( document.body.firstChild ){document.body.removeChild( document.body.firstChild );};
}
function resetBody(){
	document.body.width = window.width;
	document.body.height = window.height;
}
function checkifFullscreen(){
	return (window.innerHeight == screen.width && window.innerWidth == screen.height);
}
function addWarning(text){
	var warning = document.createElement('div');
	warning.id = warning;
	warning.style.margin = 'auto';
	warning.style.display = 'block';
	warning.style.marginTop = '25%';
	warning.style.paddingTop = '10%';
	warning.style.paddingBottom = '10%';
	warning.style.height = '25%';
	warning.style.width = '75%';
	warning.style.fontWeight = 'bold';
	warning.style.textAlign = 'center';
	warning.style.fontSize = "2em";
	warning.innerHTML = text;
	warning.style.overflow = "hidden";
	warning.style.borderStyle = "solid";
	warning.style.borderRadius = "1em";
	warning.style.borderWidth = '0.5em';
	warning.style.borderColor = "gray";
	document.getElementsByTagName('body')[0].appendChild(warning);
}
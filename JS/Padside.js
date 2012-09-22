//script
var inputbuffer = [];
var canvas;
function hello(){
	//alert('hello beautiful');
	window.scrollTo(0,0);
	}
	
function drawControls(){
	//alert('TBC');
	var x = 0;
	var y = 0;
	for(var key in controlSetup){
		if (key == "LEFT"){
			if (controlSetup[key] == "DPAD"){
				drawDPAD(screen.height/5,screen.width/2);
			}
		}
		else if (key == "RIGHT"){
			if (controlSetup[key] instanceof Array){
				
				var butts = controlSetup[key];
				for (var i = 0;i < butts.length;i++){
					//alert('hi butt'+butts[i]);
					drawButton(screen.height*(0.9-(i/5)),screen.width*(0.4+(i/5)),butts[i]);
				}
				
			}
		}
	}
	addListenersToCanvas();
}
var buttons = [];

function buildRange(name,x1,y1,x2,y2){
	var range = {'name':name,'x1':x1,'y1':y1,'x2':x2,'y2':y2};
	range['isin'] = function(x,y){
		return((x >= x1 && x <= x2)&&(y >= y1 && y <= y2));
	}
	range['distFromC'] = function(x,y){
		var midx = (x1+x2)/2;
		var midy = (y1+y2)/2;
		var dist = [0,0];
		dist[0] = (midx+x)/2;
		dist[1] = (midy+y)/2;
		return dist;
	}
	return range;
}
function drawDPAD(x,y){
	ctx.save();
	var bw = 18;
	var bl = 150;
	ctx.fillStyle = "gray";
	ctx.strokeStyle = "black";
	ctx.lineWidth = "20";
	ctx.lineJoin = "round";
	ctx.strokeRect(x-bw,y-(bl/2),(bw*2),bl);
	ctx.strokeRect(x-(bl/2),y-bw,bl,(bw*2));
	
	ctx.fillRect(x-bw,y-(bl/2),(bw*2),bl);
	ctx.fillRect(x-(bl/2),y-bw,bl,(bw*2));
	ctx.restore();
	
	buttons.push(buildRange('UP',x-bw,y-(bl/2),x+(bw),y));
	buttons.push(buildRange('DOWN',x-bw,y,x+(bw),y+(bl/2)));
	
	buttons.push(buildRange('LEFT',x-(bl/2),y-bw,x,y+bw));
	buttons.push(buildRange('RIGHT',x,y-bw,x+bl,y+(bw)));
	
}

function drawButton(x,y,name){
	ctx.save();
	ctx.beginPath();
	ctx.fillStyle = "red";
	ctx.strokeStyle = "black";
	ctx.lineWidth = "20";
	ctx.lineJoin = "round";
	ctx.arc(x, y, 30, 0, Math.PI*2, true); 
	ctx.closePath();
	ctx.stroke();
	ctx.fill();
	ctx.fillStyle = "white";
	ctx.font = "Bold 40px Copperplate";
	ctx.fillText(name,x-15,y+8);
	ctx.restore();
	buttons.push(buildRange(name,x-20,y-20,x+20,y+20,60));
}

var ctx;

function touchDown(event){
	event.preventDefault();
	var touch = event.changedTouches[0];
	for(var i = 0; i < buttons.length;i++){
		if(buttons[i].isin(touch.pageX,touch.pageY)){
						
			s.send('{"mode":"update","' +buttons[i].name+'":"PRESSED"}');
			i = buttons.length;	
		}
	}
}

function touchMove(event){
	//if the changed touches is still in the button limits do nothing	
}
function touchUp(event){
	event.preventDefault();
	var touch = event.changedTouches[0];
	for(var i = 0; i < buttons.length;i++){
		if(buttons[i].isin(touch.pageX,touch.pageY)){			
			s.send('{"mode":"update","' +buttons[i].name+'":"RELEASED"}');
			i = buttons.length;
		}
	}
}

function addListenersToCanvas(){
	//alert('added');
	window.addEventListener("touchstart",touchDown,false);
	window.addEventListener("touchend",touchUp,false);
	}

var controlSetup = {"LEFT":"DPAD","RIGHT":["A","B"]}; //standard NES - start and select
function addCanvas(){
	canvas = document.createElement('canvas');
	canvas.id = "cntcnv";
	canvas.width = window.innerWidth;
	canvas.height = window.outerHeight;
	canvas.style.position = "absolute";
	canvas.style.top = 0;
	canvas.style.left = 0;
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
	warning.style.marginTop = '20%';
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
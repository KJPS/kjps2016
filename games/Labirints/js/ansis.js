var menu, level;

window.onload = function(){
	menu = document.getElementById('menu');
	level = document.getElementById('level');
};

function runStage(stnr){
    renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight, {backgroundColor: 0x0000ff });
    level.appendChild(renderer.view);
    stage = new PIXI.Container();
	
	var walls = [];
	
	if (stnr == 1) {
		walls.push(rectangle(250,0,100,550,0x00008B));
		walls.push(rectangle(650, window.innerHeight - 570,60,570,0x00008B));
		walls.push(rectangle(1000, 0,window.innerWidth - 960,300,0x00008B));
		walls.push(rectangle(710, 600,window.innerWidth - 710,240,0x00008B));
		var r = image (1,1,"image/dash.jpg");
		var speed = 7.5;
	}
	
	if (stnr == 4) {
		walls.push(rectangle(200,0,100,590,0x00008B));
		walls.push(rectangle(550,0,75,270,0x00008B));
		walls.push(rectangle(550,520,75,570,0x00008B));	
		walls.push(rectangle(865,200,100,390,0x00008B));
		walls.push(rectangle(1200,0,100,270,0x00008B));
		walls.push(rectangle(1200,500,100,500,0x00008B));
		var r = image (1,1,"image/dash.jpg");
		var speed = 7.5;
	}
	if (stnr == 2) {	
		var r = image (1,1,"image/dash.jpg");
		var speed = 7.5;
		walls.push(rectangle(200,window.innerHeight - 250,550,50,0x00008B));
		walls.push(rectangle(200,0,50,window.innerHeight - 250,0x00008B));
		walls.push(rectangle(1000,230,50,1000,0x0008B));
		walls.push(rectangle(500,230,550,50,0x0008B));
	}
	if (stnr == 3) {
		walls.push(rectangle(0,200,500,50,0x00008B));
		walls.push(rectangle(740,0,60,500,0x00008B));
		walls.push(rectangle(240,500,560,50,0x00008B));
		walls.push(rectangle(1050,200,50,1000,0x00008B));
		walls.push(rectangle(1400,0,100,550,0x00008B));
		var r = image (1,1,"image/dash.jpg");
		var speed = 7.5;
	}
	//8
	if (stnr == 5) {
		walls.push(rectangle(1400,0,100,550,0x00008B));
		var r = image (1,1,"image/dash2.jpg");
		var speed = 3.25;
		walls.push(rectangle(85,0,25,190,0x00008B));
		walls.push(rectangle(0,window.innerHeight-106,window.innerWidth,106,0x00008B));
		walls.push(rectangle(0,300,210,25,0x00008B));
		walls.push(rectangle(210,100,25,225,0x00008B));
		walls.push(rectangle(335,0,25,425,0x00008B));
		walls.push(rectangle(100,425,260,25,0x00008B));
		walls.push(rectangle(100,550,350,25,0x00008B));
		walls.push(rectangle(450,90,25,485,0x00008B));
		walls.push(rectangle(575,205,25,725,0x00008B));
		walls.push(rectangle(475,90,250,25,0x00008B));
		walls.push(rectangle(700,90,25,window.innerHeight-297,0x00008B));
		walls.push(rectangle(825,0,25,window.innerHeight-322,0x00008B));
		walls.push(rectangle(700,window.innerHeight-222,275,25,0x00008B));
		walls.push(rectangle(825,window.innerHeight-(window.innerHeight-467),300,25,0x00008B));
		walls.push(rectangle(1125,467,25,80,0x00008B));
		walls.push(rectangle(1125,525,500,25,0x00008B));
	}
	//window.innerWidth, window.innerHeight
	var b = image(1500,0,"image/full.png");
	var a = rectangle(0,0,-1,790);
	var c = rectangle(0,790,1600,1);
	var d = rectangle(0,0,1600,-1);
	var left = false;
	var right = false;
	var up = false;
	var down = false;
	var finish = false;
	move(r,1,0);
	
	onKeyDown(KEY_DOWN, function(){
		down = true;
	});

	onKeyUp(KEY_DOWN, function(){
		down = false;
	});

	onKeyDown(KEY_UP, function(){
		up = true;
	});

	onKeyUp(KEY_UP, function(){
		up = false;
	});
	
	onKeyDown(KEY_LEFT, function(){
		left = true;
	});

	onKeyUp(KEY_LEFT, function(){
		left = false;
	});

	onKeyDown(KEY_RIGHT, function(){
		right = true;
	});

	onKeyUp(KEY_RIGHT, function(){
		right = false;
	});	
	
	animate(function(){
		
		if (up) {
			moveBy(r, 0, -speed);
		}
		
		if (down) {
			moveBy(r, 0, speed);
		}
		
		if (left) {
			moveBy(r, -speed, 0);
		}
		
		if (right) {
			moveBy(r, speed, 0);
		}
		
		for (var i = 0; i < walls.length; ++i) {
			if (isCollision(r, walls[i],0)) { 
				move(r,1,0);
			}
		}
		
		if (isCollision(r, b,0)) {
			gameOver();
		}
		
		if(r.x <0)
			move(r, 0, r.y);
			
		if(r.y <0)
			move(r, r.x, 0);
			
		if (stnr == 1,2,3,4){
			if(r.y+190 >window.innerHeight){
				move(r, r.x, window.innerHeight-190);
			}
		}
		if (stnr == 5){
			if(r.y+90 >window.innerHeight){
				move(r, r.x, window.innerHeight-90);
			}
		}
		//window.innerWidth, window.innerHeight
		
	});
};

function gameOver() {
	location.reload(); 
}

function showLevel(stnr) {
	menu.style.display = "none";
	level.style.display = "block";
	runStage(stnr);
}
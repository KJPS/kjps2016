window.onload = function(){
	//Frame
	var gar=1000;
	var plat=600;

    init(gar, plat, { backgroundColor: 0x2e00a1 });
	image(0, 0, 'image/Background.png')
	//var color = parseInt(Math.random() * 255 * 255 * 255);
	
	//Charater
	var posx = 500;
	var posy=300;
	var size=40;
	var Tels = circle(posx, posy, size, 0x00ff1e);
	var speed = 5;
	var Tiny = [], Middle = [], Large = [];
	var score=10;
	
	
		//Buttons
		var left = false;
		var right = false;
		var up = false;
		var down = false;
		
		
		//Food+
		var tiny_interval = setInterval(function(){ 
			Tiny.push(circle(Math.floor((Math.random() * gar-20) + 10),Math.floor((Math.random() * plat-20) + 10),10,0xe3ff00));
		}, 1000);
		//Food-
		var middle_interval = setInterval(function(){ 
			Middle.push(circle(Math.floor((Math.random() * gar-60) + 30),Math.floor((Math.random() * plat-60) + 30),30,0xf98c24));
		}, 2500);
		//Dead
		var large_interval=setInterval(function(){ 
			Large.push(circle(Math.floor((Math.random() * gar-100) + 50),Math.floor((Math.random() * plat-100) + 50),50,0xe51f14));
		}, 4500);		

		onKeyDown(KEY_UP, function(){
			up=true;
		});
		onKeyUp(KEY_UP, function(){
			up=false;
		});
		onKeyDown(KEY_DOWN, function(){
			down=true;
		});
		onKeyUp(KEY_DOWN, function(){
			down=false;
		});
		onKeyDown(KEY_LEFT, function(){
			left=true;
		});
		onKeyUp(KEY_LEFT, function(){
			left=false;
		});
		onKeyDown(KEY_RIGHT, function(){
			right=true;
		});
		onKeyUp(KEY_RIGHT, function(){
			right=false;
		});
		
		
		
    animate(function(){
		//kods	
		
		if (up && Tels.y>0+size) {
			moveBy(Tels,0,-speed);
		}
		if (down && Tels.y<plat-size) {
			moveBy(Tels,0,speed);
		}
		if (left && Tels.x>0+size) {
			moveBy(Tels,-speed,0);
		}
		if (right && Tels.x<gar-size) {
			moveBy(Tels,speed,0);
		}		
							
			//TinyColison
			for (var i = 0; i < Tiny.length; ++i) {
				
				var TinyColision = Math.sqrt((Tiny[i].x-Tels.x)*(Tiny[i].x-Tels.x)+(Tiny[i].y-Tels.y)*(Tiny[i].y-Tels.y));
					//ColosionGameOver
					if(TinyColision<=50){	
						score=score+20;
						remove(Tiny[i]);	
						Tiny.splice(i, 1);
					}	
			}
				
			//MiddleColision
			for (var i = 0; i < Middle.length; ++i) {
				
				var MiddleColision = Math.sqrt((Middle[i].x-Tels.x)*(Middle[i].x-Tels.x)+(Middle[i].y-Tels.y)*(Middle[i].y-Tels.y));
					//ColosionGameOver
					if(MiddleColision<=70){	
						score=score-10;
						remove(Middle[i]);	
						Middle.splice(i, 1);
					}	
			}
			
			//LargeColision
			for (var i = 0; i < Large.length; ++i) {
				var LargeColision = Math.sqrt((Large[i].x-Tels.x)*(Large[i].x-Tels.x)+(Large[i].y-Tels.y)*(Large[i].y-Tels.y));
					//ColosionGameOver
					if(LargeColision<=90){	
						gameOver();
					}	
			}
			
				
			if (score<=0){
				gameOver();
			}
			if(score>=500){
				youWon();
			}
			});

	var gameOver = function(){
		clearInterval(tiny_interval);
		clearInterval(middle_interval);
		clearInterval(large_interval);
		rectangle(0, 0, 1001, 601, 0x560000); 
		image(0, 0, 'image/GameOver.png')
		text(gar * 0.1, plat * 0.35, "GAME OVER!!!", { font: '170px Chiller', fill: 0xff6262 });
		text(gar * 0.15, plat * 0.4, "GAME OVER!!!", { font: '150px Chiller', fill: 0xffa0a0 });

		pause();
		
	};
	var youWon = function(){
			clearInterval(tiny_interval);
			clearInterval(middle_interval);
			clearInterval(large_interval);
			rectangle(0, 0, 1001, 601, 0xb9ff55);
			image(0, 0, 'image/YouWin.png')
			
			text(gar * 0.11, plat * 0.35, "YOU WON!!!", { font: '110px Jokerman', fill: 0x0e6b00 });			
			text(gar * 0.15, plat * 0.4, "YOU WON!!!", { font: '100px Jokerman', fill: 0x18b000 });
			pause();
		
	};
};
	
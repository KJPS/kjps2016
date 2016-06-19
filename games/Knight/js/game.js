window.onload = function(){
    init(window.innerWidth, window.innerHeight, { backgroundColor: 0xffffff});
	
	rectangle(0, 0, 290, 6000, 0x00ff00)
    rectangle(1300, 0, 300, 6000, 0x00ff00)
	
	
	var r = image(700, 600, 'image/gabun.png');
	var coins= [];//new Array()
	var speed = 15;
	 
	var left = false
	var right = false;
	var up = false;
	var down = false;
	var score = 0;
	var spacebar = false;
	var GameOver;
	var space;
	
	onKeyDown(KEY_SPACEBAR,function(){
	   spacebar = true;
	});
	onKeyUp(KEY_SPACEBAR, function(){
	   //spacebar= false;
	   location.reload();
	});
	onKeyDown(KEY_RIGHT, function () {
		right = true;
	});
		
	onKeyUp(KEY_RIGHT, function () {
		right = false;
	});
	   
	onKeyDown(KEY_LEFT, function () {
		left = true;
	});
		
	onKeyUp(KEY_LEFT, function () {
		left = false;
	});
		
	var interval = setInterval(function() {
		var x =	Math.random()*850+350;
		coins.push(image(x, 0, 'image/bitcoin12.png'));
	},1000);
	var Highscore = text(1000,400,"Highscore: " + localStorage.getItem('Highscore2'));
    var t = text(1030, 100, "Score:"+0);
    
	animate(function(){
	
	
	
	if (score> localStorage.getItem('Highscore2')) {
	localStorage.setItem("Highscore2", score);				 
					 }
					 
		if (!GameOver){
			if (r.position.x < 0) {
				move(r, 0, r.position.y);
				return;
			}
			if (r.position.x > 3000) {
				move(r, 0, r.position.y);
				return;
			}
		
			if (left && r.position.x > window.innerWidth-1320) {
				moveBy(r, -speed,0);
			}	
			
			if (right && r.position.x < window.innerWidth-420) {
				moveBy(r, speed, 0);
			}
		}
		
		for(var i=0;i<coins.length;i++)
		{
			t.text = "Score: " + score;
			if (coins[i])
			{
				moveBy(coins[i], 0,10);
				if(Math.sqrt((r.x-coins[i].x)*(r.x-coins[i].x)+(r.y-coins[i].y)*(r.y-coins[i].y))<=45+30) {
					if(!GameOver)
						score++;
					remove(coins[i]);
					coins[i]=null;
					
			   }
			   if(coins[i].y>window.innerHeight){
					
					if(!GameOver) {
					   
						GameOver= text(600,250,"Game over",{ font: '80px arial', fill: 0x000000 });
			            text(700,380,"Press Spacebar to restart",{font: '20px arial'});
					}
			  } 
		   }
		   
		}
		
		console.log(spacebar);
		if (spacebar == true) {
			score= 0;		
			if (GameOver){
				remove (GameOver);
			}
			GameOver = null;
			for(var i=0;i<coins.length;i++)
				if (coins[i])
					remove (coins[i]);
			coins = [];
			
		}
		
	});
};
	
	
	
	  
	
	
	
window.onload = function(){
    init(window.innerWidth, window.innerHeight);
	image (0,0,"lol.png")
		var sy = 0;
		var swetins= false 
		var speed = 10;
		var color = false;
		var up = false;
			rectangle(0,600,1600,300,0x7DCB5C); 
		var t =text (600,600, "Score: ");	
		var Hscore = text ( 570,550, "Highscore: " + localStorage.getItem("DaRecord"));
		var score = 0;
		var count = 0;
		var b = rectangle(1315,5, 20,20,0x66E1FF);
		var img;
		onClick(b, function() {
		    swetins = true 
			img=image(0,0,"image/svetins.png");
			});
		var l = rectangle(1390,190,70,40,0x2Da31f);
		var d = rectangle(1400,-400,50,600,0x2Da31f);
		var u = rectangle(1390,400,70,40,0x2Da31f);
		var p = rectangle(1400,400,50,300,0x2Da31f);
		var colors = [0xFF0000, 0xFFA600, 0xFFFC00, 0x04FF00, 0x0000FF, 0xFF00F3, 0x000000, 0xFFFFFF];
		var player = rectangle(100,530,45,45,colors[0]);
	onKeyDown(KEY_SPACEBAR, function(){
		color = true;
	});
	onKeyUp(KEY_SPACEBAR, function(){
		color = false;
	});
	onKeyDown(KEY_UP, function(){
		up = true;
	});
	onKeyUp(KEY_UP, function(){
		up = false;
	});
	function gameOver(){
	    if (swetins == true) {
		text(window.innerWidth * 0.3, window.innerHeight * 0.4, "SVĒTIŅŠ IS DEAD.", { font: '72px Wildwest', fill: 0x000000 });
		}
		text(window.innerWidth * 0.45, window.innerHeight * 0.3, "R.I.P.", { font: '72px Wildwest', fill: 0x000000 });
		pause();
	};	
	animate(function(){
		moveBy(d,-7,0);
		moveBy(l,-7,0);
		moveBy(u,-7,0);
		moveBy(p,-7,0);
		 if (up && player.y>0) {
			sy = -10;
		}
		if(img) {
		move(img,player.x,player.y);
		}
		moveBy(player,0,sy);
		if (color)
		{	
			color = false;
			var x = player.x;
			var y= player.y;
			remove(player);
			player = rectangle(100,530,45,45,colors[Math.floor(Math.random()*colors.length)]);
		}
		if (player.y<530) {
			sy=sy+2;
		}
		else {
			move(player,player.x,530);
			sy=0;
		}
		if (isCollision(player, d, 0)) {
			gameOver();
		}
		if (isCollision(player, l, 0)) {
			gameOver();
		}
		if (isCollision(player, p, 0)) {
			gameOver();
		}
		if (isCollision(player, u, 0)) {
			gameOver();
		}
		if (l.x<=-80) {
			var h = Math.random()*220;
			move(l, 1390, 190+h);
			move(d, 1400, -400+h);
			move(p, 1400, 400+h);
			move(u, 1390, 400+h);
			score ++;
			count++;
			t.text ="Score: " + score;
		}
		if (count>0 && player.y==520) {
			gameOver();
		}
		if (score > localStorage.getItem("DaRecord")) {
		localStorage.setItem("DaRecord", score)
		}
		
	});
};	  
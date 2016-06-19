window.onload = function(){
	init(1400,800, { backgroundColor: 0x000000 });
	var klucis = image(650,600,'image/spaceship.png');
	//var lode = image(650,600,'image/bullet.png');
	var lodes = new Set();
	var meteorits = [];
		
	var right = false;
	var left = false;
	var space = false;
	var iet = true;
	var score = 0;
	var rez=text(100,100,'Score: 0',{fill: 0xffffff});
	var game_over_text;
	   
	onKeyDown(KEY_RIGHT,function(){
		right = true;
	});
	
	onKeyUp(KEY_RIGHT,function(){
		right = false;
	
	});
	
	onKeyDown(KEY_LEFT,function(){
		left = true;
	});
	
	onKeyUp(KEY_LEFT,function(){
		left = false;
	});
	
	onKeyDown(KEY_SPACEBAR,function(){
		lodes.add(image(klucis.x+25, klucis.y,'image/bullet.png'));
		space = true;
	});
	
	onKeyUp(KEY_SPACEBAR,function(){
		space = false;
	});
	
	animate(function(){
	
		meteorits.forEach(function(meteorite) {
			moveBy(meteorite, 0, 10);
			if (isCollision(meteorite,klucis)) {
				pause();
				iet = false;
				if (!game_over_text)
					game_over_text = text(1400/2,800/2, "Game Over !", {fill: 0xffffff});
			}
		});
		
		lodes.forEach(function(lode) {
			moveBy(lode,0,-20);
			for(var i=0,len = meteorits.length; i < len; ++i) {
				if (isCollision(lode,meteorits[i])) {
					remove(meteorits[i]);
					meteorits.splice(i, 1);
					score++;
					rez.text='Score: '+score;
				}
			}
			
		});
	
		if (right) {
			var mRight = Math.min(1400-100, klucis.x + 10);
			move(klucis,mRight, klucis.y);
		}
			
		if (left) {
			var mLeft = Math.max(10, klucis.x - 10);
			move(klucis, mLeft, klucis.y);
		}
		
		var generateMeteorite = function(){
			var level,y,
			p = klucis.position
			b = klucis.getBounds(),
			offset = 30;
		};
		
   });
   
   setInterval(function() {
	if (iet == true) {
		var x = Math.random()*1400;
		meteorits.push(image(x,0,'image/meteor.png'));
	}
   }, 500);
   
};   

   
window.onload = function(){
    init(window.innerWidth, window.innerHeight);
	image(0,0,"indux.jpg")
	var speed = 30;
	   var meteroites =[];
	var left = false;
	var right = false;
	var up = false;
	var down = false;
	   var level = 0;
	var r = image(0,0,'image/skull.png');
	var game_over = false;
	var kadri = 0;
	var level1 = text(100,100 , 'LEVEL'+meteroites.length,{'fill' : '#3399ff', 'font' : '45px arial black'});
    animate(function() {
		++kadri;
		if(kadri == 60 && ! game_over) {
			var x = parseInt (Math.random()*window.innerWidth);
			var y = parseInt (Math.random()*window.innerHeight);
			meteroites.push({
				x: Math.random() > 0.5 ? 1 : -1,
				y: Math.random() > 0.5 ? 1 : -1,
				g: image(x,y,"image/rock1.png"),
			});
			level++;
			kadri = 0;
			level1.text='LEVEL'+meteroites.length;
		}
		if (! game_over&& up && r.y > 0) {
			moveBy(r, 0, -speed);
		}
		if (! game_over && down && r.y < window.innerHeight-100 ) {
			moveBy(r, 0, speed);
		}
		if (! game_over && left && r.x > 0) {
			moveBy(r, -speed,0);
		}
		if (! game_over && right && r.x < window.innerWidth-105) {
			moveBy(r, speed,0);
		}
		
		for (var i = 0; i < meteroites.length; ++i) {
			if (! game_over)
				moveBy(meteroites[i].g, meteroites[i].x, meteroites[i].y);
			if(meteroites[i].g.position.x < 0 || meteroites[i].g.position.x > window.innerWidth) {
				if(meteroites[i].x == 1) {
					meteroites[i].x = -1;
				} else {
					meteroites[i].x = 1;
				}
			}
			if(meteroites[i].g.position.y < 0 || meteroites[i].g.position.y > window.innerHeight) {
				if(meteroites[i].y == 1) {
					meteroites[i].y = -1;
				} else {
					meteroites[i].y = 1;
				}
			} 
			
			if (isCollision(r,meteroites[i].g)){
				// game over
				game_over = true;
			}
		}
		if (game_over)
			text(700,700, "GAME OVER",{'fill' : '#6600cc', 'font' : '45px arial black'})
    });
	
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
	
    onKeyDown(KEY_RIGHT, function(){
        right = true;
    });
	
    onKeyUp(KEY_RIGHT, function(){
		right =false;
    });
	
    onKeyDown(KEY_LEFT, function(){
       left =true;
    });
	onKeyDown(KEY_SPACEBAR, function() {
		
		var color = parseInt(Math.random() * 255 * 255 * 255);
		var x = r.position.x, y = r.position.y;
		remove(r);
		r = image(20,30,'image/skull.png');
	});

    onKeyUp(KEY_LEFT, function(){
        left = false;
    });
	
	  
};

window.onload = function(){
    init(window.innerWidth, window.innerHeight, { backgroundColor: 0x1980e6	 });
	
	var t = triangle(150,150,300,150,225,249,0x33cc33);
	var speed = 20;
	var r = rectangle(750,300,50,50,0xec1313);
	var left = false;
	var right = false;
	var up = false;
	var down = false;
	animate(function(){
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
		//1600X790
		//800X345
		//http://www.w3schools.com/colors/colors_picker.asp
		//https://github.com/KJPS/kjps2016/blob/master/simry.md#remove
		//https://github.com/KJPS/kjps2016/blob/master/simry.js
		onKeyUp(KEY_RIGHT, function(){
		right = false;
		});
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
	});
};
window.onload = function(){
init(window.innerWidth, window.innerHeight, { backgroundColor: 0x31f9fd });
//var color = parseInt(Math.random() * 255 * 255 * 255);
var Tels = circle(100,100,50,50,0xadff00);
var skn = [
	image(32,-32,'image/apple.png'),
	image(32,-32,'image/apple.png'),
	image(32,-32,'image/apple.png'),
	image(32,-32,'image/apple.png')
];
var skn_atrums_x = [
0,0,0,0
];
var skn_atrums_y = [
0,0,0,0
];
moveBy(skn[0], 76, 234);
moveBy(skn[1], 376, 734);
moveBy(skn[2],755, 22);

var speed = 10 ;
var left = false;
var right = false;
var up = false;
var down = false;
//var space = false;

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
//onKeyDown(KEY_SPACE, function(){
// space=true;
//});
//onKeyUp(KEY_SPACE, function(){
// space=false;
//});


animate(function(){
for (var i = 0; i < skn.length; i=i+1)
{
	moveBy(skn[i],skn_atrums_x[i],skn_atrums_y[i]);
	skn_atrums_x[i] += Math.random()-.5;
	skn_atrums_y[i] += Math.random()-.5;
	if ( skn[i].x < 0)
	{
		skn[i].x += window.innerWidth;
	}
	if ( skn[i].x > window.innerWidth)
	{
		skn[i].x -= window.innerWidth;
	}
}




//kods
if (up && Tels.y>50) {
moveBy(Tels,0,-speed);
}
if (down && Tels.y< window.innerHeight-50) {
moveBy(Tels,0,speed);
}
if (left && Tels.x>50) {
moveBy(Tels,-speed,0);
}
if (right && Tels.x<window.innerWidth-50) {
moveBy(Tels,speed,0);
}


});
};

window.onload = function(){
init(window.innerWidth, window.innerHeight, {backgroundColor:0xffff});
	image(0,0,"image/skn.png");
    text(10,10,"EMOJY  VS  I-PHONE APPLE");
var Tels = image(10, 10, 'image/cool_emoji_mini_button (1).png');

var skn = [
	image(111,-32,'image/apple_logo.png'),
	image(111,-32,'image/apple_logo.png'),
	image(111,-32,'image/apple_logo.png'),
	image(111,-32,'image/apple_logo.png')
];
var score = 0;
var score_text=text(window.innerWidth-180,33, '');
var skn_atrums_x = [
0,0,0,0,0
];
var skn_atrums_y = [
0,0,0,0,0
];
moveBy(skn[0], 655, 234);
moveBy(skn[1], 376, 734);
moveBy(skn[2],755, 22);



setInterval(function(){ 
	skn.push(image(111,-32,'image/APPLEKING.png'));
	score = score +55;
	skn_atrums_x.push(0);
	skn_atrums_y.push(0);
}, 45000);
setInterval(function(){ 
	skn.push(image(111,-32,'image/miniboss.png'));
	score = score +100;
	skn_atrums_x.push(0);
	skn_atrums_y.push(0);
}, 60000);
setInterval(function(){ 
	skn.push(image(111,-32,'image/lielaisboos.png'));
	score = score +333;
	skn_atrums_x.push(0);
	skn_atrums_y.push(0);
}, 80000);
setInterval(function(){ 
	skn.push(image(111,-32,'image/rags.png'));
	score = score +450;
	skn_atrums_x.push(0);
	skn_atrums_y.push(0);
}, 95000);
setInterval(function(){ 
	skn.push(image(111,-32,'image/launais.png'));
	score = score +1000;
	skn_atrums_x.push(0);
	skn_atrums_y.push(0);
}, 130000);
setInterval(function(){ 
	skn.push(image(111,-32,'image/ab.png'));
	score = score +15;
	skn_atrums_x.push(0);
	skn_atrums_y.push(0);
}, 30000);
var speed = 10 ;
var left = false;
var right = false;
var up = false;
var down = false;

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
	skn_atrums_x[i] += (Math.random()-.5)*0.1;
	skn_atrums_y[i] += (Math.random()-.5)*0.1;
	if ( skn[i].x < 0)
	{
		skn[i].x += window.innerWidth;
	}
	if ( skn[i].x > window.innerWidth)
	{
		skn[i].x -= window.innerWidth;
	}
	if ( skn[i].y < 0)
	{
		skn[i].y += window.innerHeight;
	}
	if ( skn[i].y > window.innerHeight)
		skn[i].y -= window.innerHeight;
		
	if(isCollision(Tels, skn [i] ,0))
	{
	      text (window.innerWidth/2,window.innerHeight/2,'EMOJY DEAD');
		  pause();
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
score_text.text = 'score = ' + Math.round(score);
score += .1;


})
};

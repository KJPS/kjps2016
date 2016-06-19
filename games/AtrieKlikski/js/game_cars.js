window.onload = function(){
    init(window.innerWidth, window.innerHeight, { backgroundColor: 0xB5E61D });
	//Masinas
	image(0,0,'image/celss.png');
	var x=580;
	var z=580;
	text(480,10,"SHIFT",{font:"bold 50px Arial",fill:0xffffff})
	text(720,10,"ENTER",{font:"bold 50px Arial",fill:0xffffff})
	var r=rectangle(580,580,200,50,0x7F7F7F);
	var b1= image(500,x,'image/zalaais.png');
	var b2= image(750,z,'image/sarkanais.png');
    onKeyUp(16,function(){
		x=x-5;
		moveBy(b1,0,-5);
	});
	onKeyUp(13,function(){
		z=z-5;
		moveBy(b2,0,-5);
	});
	
	animate(function(){
		if (z<=20){
		text(400,350,"ENTER WINS!",{font:"bold 100px Arial",fill:0x000});
		text(595,585,"Spēlēt vēlreiz!",{font:"bold 25px Arial",fill:0xffffff});
		pause();
	}
	if (x<=20){
		text(400,350,"SHIFT WINS!",{font:"bold 100px Arial",fill:0x000});
		text(595,585,"Spēlēt vēlreiz!",{font:"bold 25px Arial",fill:0xffffff});
		pause();
	}
	onClick(r,function() {
			location.reload();
		});
	
})};

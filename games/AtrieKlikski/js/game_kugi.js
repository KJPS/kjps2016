//Kugi
window.onload = function(){
    init(window.innerWidth, window.innerHeight, { backgroundColor: 0xffffff });
image(0,0,'image/kugi.png');
    var sw=false;
	var ew=false;
	var cs=0
	var cw=0
	var ccw=text(150,4,cw);
	var ccs=text(900,4,cs);
	var x= -65;
	var z= -65;
	var p2= rectangle(154,422,292,x,0x7092BE);
	text(0,2,"Klikšķi:");
	text(750,2,"Klikšķi:");
	var r=rectangle(550,275,250,80,0xffffff);
	circle(1100,100,35,0x000000);
	circle(1085,90,10,0xffffff);
	circle(1115,90,10,0xffffff);
	rectangle(1080,110,40,30,0x000000);
	rectangle(1085,128,5,15,0xD1D1D1);
	rectangle(1098,128,5,15,0xD1D1D1);
	rectangle(1110,128,5,15,0xD1D1D1);
 var p1= rectangle(897,361,292,z,0x7092BE);
	onKeyUp(16,function(){
	 remove(p2);
	 remove(p1);
	 remove(ccw);
	 x=x+5;
	 z=z-5;
	 cw=cw+1;
	 ccw=text(150,4,cw);
	 p2=rectangle(154,422,292,x,0x7092BE);
	 p1=rectangle(897,361,292,z,0x7092BE);
	});
	onKeyUp(13,function(){
	 remove(p2);
	 remove(p1);
	 remove(ccs);
	 x=x-5;
	 z=z+5;
	 cs=cs+1;
	 ccs=text(900,4,cs);
	 p2=rectangle(154,422,292,x,0x7092BE);
	 p1=rectangle(897,361,292,z,0x7092BE);
	});
	animate(function(){
		text(260,450,"SHIFT");
		text(1000,400,"ENTER");
	if (x<=-134){
		image(0,0,'image/kugis.png');
		text(950,300,"PLAYER 2 WON!");
		text(583,300,"Spēlēt vēlreiz!",{fill: 0x000000});
		pause();
	};
	if (z<=-134){
		image(0,0,'image/kugie.png');
		text(200,350,"PLAYER 1 WON!");
		text(583,300,"Spēlēt vēlreiz!",{fill: 0x000000});
		pause();
	};
	onClick(r,function() {
		location.reload();
	});
 });
};
//Kugi
window.onload = function(){
    init(window.innerWidth, window.innerHeight, { backgroundColor: 0xffffff });
	var img = image(0,0,'image/vulkans.png');
	img.zindex = 0;
    var sw=false;
	var ew=false;
	var cs=0
	var cw=0
	var ccw=text(150,300,cw);
	var ccs=text(850,300,cs);
	var x= -268;
	var z= -268;
	var p2= rectangle(241,738,108,x,0xFF7F27);
	var kl1=text(2,300,"Klikšķi:");
	var kl2=text(700,300,"Klikšķi:");
	var r=rectangle(550,350,250,80,0xffffff);
	r.zindex = 200;
 var p1= rectangle(942,738,108,z,0xFF7F27);
	onKeyUp(16,function(){
	 remove(p2);
	 remove(p1);
	 remove(ccw);
	 x=x+10;
	 z=z-10;
	 cw=cw+1;
	 ccw=text(150,300,cw);
	 p2=rectangle(241,738,108,x,0xFF7F27);
	 p1=rectangle(942,738,108,z,0xFF7F27);
	});
	onKeyUp(13,function(){
	 remove(p2);
	 remove(p1);
	 remove(ccs);
	 x=x-10;
	 z=z+10;
	 cs=cs+1;
	 ccs=text(850,300,cs);
	 p2=rectangle(241,738,108,x,0xFF7F27);
	 p1=rectangle(942,738,108,z,0xFF7F27);
	});
	animate(function(){
		text(260,450,"SHIFT");
		text(952,450,"ENTER");
	if (x<=-535){
		img = image(0,0,'image/vulkanss.png');
		img.zindex = 100;
		var t1 =text(583,360,"Spēlēt vēlreiz!",{fill: 0x000000});
		t1.zindex=300;
		var www = text(560,300,"ENTER WON!");
		www.zindex=400;
		pause();
	};
	if (z<=-535){
		img = image(0,0,'image/vulkanse.png');
		img.zindex = 100;
		var www = text(560,300,"SHIFT WON!");
		www.zindex=400;
		var t1 =text(583,360,"Spēlēt vēlreiz!",{fill: 0x000000});
		t1.zindex=300;
		pause();
	};
	onClick(r,function() {
		location.reload();
	});
 });
};
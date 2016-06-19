//Vulkani
window.onload = function(){
    init(window.innerWidth, window.innerHeight, { backgroundColor: 0xffffff });
	var v=rectangle(0,0,1600,384,0xffffff);
	var k=rectangle(0,385,1600,384,0xffffff);
	var st=text(1300,100,"Uzspied uz mašīnas!",{font:"10px Arial"});
	var vs=image(400,0,'image/vulsak.png');
	var ks=image(425,385,'image/kugisak.png');
	ks.zindex=0;
	var tv=text(475,100,"VULKĀNI",{font:"bold 150px Arial", fill:"red"});
	var tk=text(600,500,"KUĢI",{font:"bold 150px Arial", fill:"blue"});
	var s=image(1015,430,'image/secret.png');
	var j=image(600,440,'image/Janka2.png')
	s.zindex=100;
    onClick(j,function(){
		remove(v);
		remove(j);
		remove(st);
		remove(s);
		remove(ks);
		remove(vs);
		remove(k);
		remove(tv);
		remove(tk);
		var jp1=image(0,0,'image/Janka.png');
		var jp2=image(300,0,'image/JanisKofijs.jpg');
		var jp3=image(800,0,'image/MLGJanis.jpg');
		var j1=image(0,0,'image/Kaffija.png');
		var j2=image(100,0,'image/Kaffija.png');
		var j3=image(200,0,'image/Kaffija.png');
		var j4=image(300,0,'image/Kaffija.png');
		var j5=image(400,0,'image/Kaffija.png');
		var j6=image(500,0,'image/Kaffija.png');
		var j7=image(600,0,'image/Kaffija.png');
		var j8=image(700,0,'image/Kaffija.png');
		var j9=image(800,0,'image/Kaffija.png');
		var j10=image(900,0,'image/Kaffija.png');
		var j11=image(1000,0,'image/Kaffija.png');
		var j12=image(1100,0,'image/Kaffija.png');
		var j13=image(1200,0,'image/Kaffija.png');
		var j14=image(1300,0,'image/Kaffija.png');
		var j15=image(1400,0,'image/Kaffija.png');
		var j16=image(1500,0,'image/Kaffija.png');
		animate(function(){
			moveBy(j1,0,15);
			moveBy(j2,0,10);
			moveBy(j3,0,5);
			moveBy(j4,0,15);
			moveBy(j5,0,5);
			moveBy(j6,0,15);
			moveBy(j7,0,10);
			moveBy(j8,0,5);
			moveBy(j9,0,10);
			moveBy(j10,0,5);
			moveBy(j11,0,10);
			moveBy(j12,0,15);
			moveBy(j13,0,5);
			moveBy(j14,0,15);
			moveBy(j15,0,5);
			moveBy(j16,0,10);
		});
	});
	onClick(k,function(){
		remove(v);
		remove(j);
		remove(st);
		remove(s);
		remove(ks);
		remove(vs);
		remove(k);
		remove(tv);
		remove(tk);
		image(0,0,'image/kugi.png');
    var sw=false;
	var ew=false;
	var cs=0;
	var cw=0;
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
		text(950,300,"ENTER WON!");
		text(583,300,"Spēlēt vēlreiz!",{fill: 0x000000});
		pause();
	};
	if (z<=-134){
		image(0,0,'image/kugie.png');
		text(200,350,"SHIFT WON!");
		text(583,300,"Spēlēt vēlreiz!",{fill: 0x000000});
		pause();
	};
	onClick(r,function() {
		location.reload();
	});
 });
	});
	onClick(v,function(){
		//Kugi
		remove(v);
		remove(j);
		remove(st);
		remove(s);
		remove(ks);
		remove(vs);
		remove(k);
		remove(tv);
		remove(tk);
	var img = image(0,0,'image/vulkans.png');
	img.zindex = 0;
    var sw=false;
	var ew=false;
	var cs=0;
	var cw=0;
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
});
	onClick(s,function(){
		remove(v);
		remove(st);
		remove(s);
		remove(j);
		remove(ks);
		remove(vs);
		remove(k);
		remove(tv);
		remove(tk);
		//Masinas
	image(0,0,'image/celss.png');
	var x=580;
	var z=580;
	text(480,100,"SHIFT",{font:"bold 50px Arial",fill:0xffffff})
	text(720,100,"ENTER",{font:"bold 50px Arial",fill:0xffffff})
	var r=rectangle(580,580,200,50,0x7F7F7F);
	var b1= image(500,x,'image/zalaais.png');
	var b2= image(750,z,'image/sarkanais.png');
	var sv=image(500,10,'image/istadesa.png');
	var ja=image(780,10,'image/janiscensas.png');
	var svs=image(500,x,'image/svetinsi.png');
	var jas=image(750,z,'image/Janka.png')
    onKeyUp(16,function(){
		x=x-5;
		moveBy(b1,0,-5);
		moveBy(svs,0,-5);
	});
	onKeyUp(13,function(){
		z=z-5;
		moveBy(b2,0,-5);
		moveBy(jas,0,-5);
	});
	
	animate(function(){
		if (z<=20){
		text(400,350,"JANIS WINS!",{font:"bold 100px Arial",fill:0x000});
		text(595,585,"Spēlēt vēlreiz!",{font:"bold 25px Arial",fill:0xffffff});
		pause();
	}
	if (x<=20){
		text(400,350,"SVETINS WINS!",{font:"bold 100px Arial",fill:0x000});
		text(595,585,"Spēlēt vēlreiz!",{font:"bold 25px Arial",fill:0xffffff});
		pause();
	};
	onClick(r,function() {
			location.reload();
		});
	});
	});
	animate(function(){
        
})};

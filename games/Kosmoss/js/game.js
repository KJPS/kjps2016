window.onload = function(){
    init(window.innerWidth, window.innerHeight, { backgroundColor: 0x000000 });
	var shipX=window.innerWidth/20;
	var shipY=window.innerHeight/2-80;
	var laserShot = [];
	var POWER = [];
	var lastCharge = 0;
	var lastShot =0;
	var laserEnShot = [];
	var lastEnShot = [];
	var lastEnMade =0;
	var enspTime=5000;
	var now;
	var boostDual=false;
	var dualChanc=10000;
	var lotery;
	var bomb = image(-100, -100, 'explosion.png');
	var enemyMoveY = [];
	var energy = text(5, window.innerHeight*0.95, "POWER:", { font: '24px arial', fill: 0xffffff })
	var scor = text(5, window.innerHeight*0.010, "SCORE:", { font: '24px arial', fill: 0xffffff })
	var rez=0;
	var activDual=false;
	var shipMove=0;
	var shooting=false;
	var ship = image(shipX, shipY, 'ship.png');
	var enemy = [];
	var scorNr=text(105, window.innerHeight*0.010, 0, { font: '24px arial', fill: 0xffffff })
	var handler;
	var handler1;
	var m=-2.5;
	var backElement1 = rectangle(0, 0, window.innerWidth, window.innerHeight, 0x339966)
	var backElement2 = image(window.innerWidth/2-87.5, window.innerHeight/2-100, 'button1.png');
	var boost;
	var time=0;
	var en=0;
	var coold=1100;
	var recorde=0;
	var recoil=280;
	var viens=true;
	pause();
	onClick(backElement2, function(){
		remove(backElement1);
		remove(backElement2);
		resume();
	});
	var fon = image(window.innerWidth/2-1920, window.innerHeight/2-1080, 'space1.jpg');
	fon.zindex = -1;
	onKeyDown(KEY_UP, function(){
		if(shipY>=30){
			shipMove=-3;
		}
	});
	onKeyDown(KEY_DOWN, function(){
		if(shipY+110<=window.innerHeight){
			shipMove=3;
		}
	});
	onKeyDown(KEY_LEFT, function(){
		shipMove=0;
		shooting=false;
	});
	onKeyDown(KEY_RIGHT, function(){
		if(shooting==true){
			shooting=false;
		}else{
			shooting=true;
		}
	});
	onKeyDown(KEY_SPACEBAR, function(){
		now = new Date().getTime();
		if(POWER.length>=1 && now-lastShot>=200 && viens==true){
			lastShot = new Date().getTime();
			remove(POWER[POWER.length-1]);
			POWER.splice(POWER.length-1,1);
			shooting=false;
			viens=false;
			shoot();
		}
	});
	onKeyUp(KEY_SPACEBAR, function(){
		viens=true;
	});
	function shoot(){
		if(boostDual==true){
			laserShot.push(rectangle(ship.position.x+66, ship.position.y+2, 20, 3, 0x3366ff));
			laserShot.push(rectangle(ship.position.x+66, ship.position.y+63, 20, 3, 0x3366ff));
			coold=1700;
		}else{
			laserShot.push(rectangle(ship.position.x+49, ship.position.y+32.5, 20, 3, 0x3366ff));
			coold=1100;
		}
	}
	function shootEn(x,y){
		laserEnShot.push(rectangle(x+2, y+12, 20, 3, 0xff0000));
	}
	function power(){
		POWER.push(rectangle(energy.position.x+100+21*(POWER.length), energy.position.y, 20, 24, 0x3366ff))
	}
	function enemy1(){
		var randomY = Math.random() * (window.innerHeight - 40);
		var e=image(window.innerWidth+20, randomY, 'enemy1.png');
		e.zindex = 100;
		enemy.push(e);
		m*=-1;
		en++;
		enemyMoveY.push(m);
		lastEnShot.push(new Date().getTime());
		if(en==20){
			remove(fon);
			fon = image(window.innerWidth/2-1920, window.innerHeight/2-1080, 'space3.jpg');
			fon.zindex = -1;
		}else if(en==30){
			remove(fon);
			fon = image(window.innerWidth/2-960, window.innerHeight/2-540, 'space4.jpg');
			fon.zindex = -1;
		}else if(en==40){
			remove(fon);
			fon = image(window.innerWidth/2-1440, window.innerHeight/2-900, 'space5.jpg');
			fon.zindex = -1;
		}
	}
	function dualBoost(){
		var randomY = Math.random() * (window.innerHeight - 80);
		if(randomY<30){
			randomY=30;
		}
		boost=image(window.innerWidth, randomY, 'dual.png');
		
	}
	function gameOver(){
		for(var i=0;laserShot.length>i;++i){
			remove(laserShot[i]);
		}
		laserShot.length = 0;
		for(var i=0;POWER.length>i;++i){
			remove(POWER[i]);
		}
		POWER.length = 0;
		for(var i=0;laserEnShot.length>i;++i){
			remove(laserEnShot[i]);
		}
		laserEnShot.length = 0;
		for(var i=0;enemy.length>i;++i){
			remove(enemy[i]);
		}
		enemy.length = 0;
		if(rez>localStorage.getItem('high')){
			localStorage.setItem('high',rez);
		}
		recorde=localStorage.getItem('high') ? localStorage.getItem('high') : 0;
		var backElement6 = image(window.innerWidth/2-960, window.innerHeight/2-540, 'Planets.jpg');
		var backElement5 = text(window.innerWidth/2-200, window.innerHeight/2-55, "SCORE:", { font: '48px arial', fill: 0x3366ff });
		var backElement4 = text(window.innerWidth/2, window.innerHeight/2-55, rez, { font: '48px arial', fill: 0x3366ff });
		var backElement3 = image(window.innerWidth/2-173.5, window.innerHeight/2+48, 'button2.png');
		var backElement7 = text(window.innerWidth/2-200, window.innerHeight/2-8, "HIGH SCORE:", { font: '44px arial', fill: 0x3366ff })
		var backElement8 = text(window.innerWidth/2+100, window.innerHeight/2-8, recorde, { font: '48px arial', fill: 0x3366ff });
		remove(ship);
		remove(boost);
		enspTime=5000;
		rez=0;
		en=0;
		shipMove=0;
		enemyMoveY.length=0;
		shooting=false;
		shipX=window.innerWidth/20;
		shipY=window.innerHeight/2-80;
		boostDual=false;
		viens=true;
		shooting=false;
		activDual=false;
		time=0;
		backElement3.zindex = 102;
		backElement4.zindex = 102;
		backElement5.zindex = 102;
		backElement6.zindex = 101;
		backElement7.zindex = 102;
		backElement8.zindex = 102;
		coold=180;
		recoil=280;
		onClick(backElement3, function(){
			remove(backElement3);
			remove(backElement4);
			remove(backElement5);
			remove(backElement6);
			remove(backElement7);
			remove(backElement8);
			ship = image(shipX, shipY, 'ship.png');
			move(bomb,-100,-100);
			remove(fon);
			fon = image(window.innerWidth/2-1920, window.innerHeight/2-1080, 'space1.jpg');
			fon.zindex = -1;
			resume();
		});
		pause();
	}
	animate(function(){
		remove(scorNr);
		scorNr = text(105, window.innerHeight*0.010, rez, { font: '24px arial', fill: 0xffffff })
		now = new Date().getTime();
		if(shooting==true && POWER.length>=1 && now-lastShot>=recoil){
			lastShot = new Date().getTime();
			remove(POWER[POWER.length-1]);
			POWER.splice(POWER.length-1,1);
			shoot();
		}
		if(POWER.length==0){
			recoil=480;
			handler1 = setTimeout(function(){
				recoil=280;
			}, 9000);
		}
		moveBy(ship,0,shipMove);
		shipY+=shipMove;
		if(shipY+110>=window.innerHeight || shipY<=30){
			shipMove=0;
		}
		//laserShot ship
		for(var i=0;i<laserShot.length;i++) {
			moveBy(laserShot[i],3,0);
			if(laserShot[i].position.x>window.innerWidth){
				remove(laserShot[i]);
				laserShot.splice(i,1);
				i--;
				break;
			}
			for(var j=0;j<enemy.length;j++){
				if(isCollision(laserShot[i],enemy[j],0)){
					clearTimeout(handler);
					move(bomb, laserShot[i].position.x, laserShot[i].position.y);
					handler = setTimeout(function(){
						move(bomb, -100, -100);
					}, 3000);
					remove(enemy[j]);
					enemy.splice(j,1);
					enemyMoveY.splice(j,1);
					remove(laserShot[i]);
					laserShot.splice(i,1);
					j--;
					i--;
					rez++;
					break;
				}
			}
		}
		//laserShot enemy
		for(var i=0;i<laserEnShot.length;i++) {
			moveBy(laserEnShot[i],-3,0);
			if(isCollision(laserEnShot[i],ship,0)){
				if(boostDual==true){
					time=0;
					remove(laserEnShot[i]);
					laserEnShot.splice(i,1);
					i--;
					break;
				}else{
					gameOver();
					break;
				}
			}
			if(laserEnShot[i].position.x<-20){
				remove(laserEnShot[i]);
				laserEnShot.splice(i,1);
				i--;
			}
		}
		//enemy movement(unfinished)
		for(var i=0;i<enemy.length;i++){
			if(isCollision(enemy[i],ship,0)){
				gameOver();
				break;
			}else if(enemy[i].position.x+200<=0){
				remove(enemy[i]);
				enemy.splice(i,1);
				enemyMoveY.splice(i,1);
				lastEnShot.splice(i,1);
				i--;
				break;
			}else if(enemy[i].position.y+130>=window.innerHeight){
				enemyMoveY[i]=-2.5;
			}else if(enemy[i].position.y<=30){
				enemyMoveY[i]=2.5;
			}
			moveBy(enemy[i],-1.5,enemyMoveY[i]);
			now = new Date().getTime();
			if(now-lastEnShot[i]>=1200){
				shootEn(enemy[i].position.x,enemy[i].position.y);
				lastEnShot[i] = new Date().getTime();
			}
		}
		//
		now = new Date().getTime();
		if(energy.position.x+100+21*POWER.length+60>=window.innerWidth){
			
		}else if(now-lastCharge>=coold){
			power();
			lastCharge = new Date().getTime();
		}
		now = new Date().getTime();
		if(now-lastEnMade>=enspTime){
			if(enspTime>1000){
				enspTime*=0.95;
			}
			enemy1();
			lastEnMade = new Date().getTime();
		}
		lotery=Math.random()*1000000;
		if(lotery<=dualChanc && activDual==false){
			dualBoost();
			activDual=true;
		}
		if(activDual==true){
			if(isCollision(ship, boost, 0)){
				time+=500;
				remove(ship);
				ship=image(shipX, shipY, 'ship2.png');
				boostDual=true;
				remove(boost);
				activDual=false;
			}else if(boost.position.x==-74){
				remove(boost);
				activDual=false;
			}else{
				moveBy(boost,-2.5,0);
			}
		}
		if(boostDual==true && time>0){
			time--;
		}else if(boostDual==true && time<=0){
			remove(ship);
			ship=image(shipX, shipY, 'ship.png');
			boostDual=false;
		}
	});
};

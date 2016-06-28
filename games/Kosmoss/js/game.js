window.onload = function(){
    init(window.innerWidth, window.innerHeight, { backgroundColor: 0x000000 });
	alert("'W' - move up 'S' - move down 'SPACE' shoot 'A' move slower 'D' move faster");
	var backElement1 = rectangle(0, 0, window.innerWidth, window.innerHeight, 0x339966)
	var backElement2 = image(window.innerWidth/2-87.5, window.innerHeight/2-100, 'button1.png');
	var scorNr;
	var game=false;
	var shop=false;
	var shipX;var shipY;var shipMove;
	var ship;
	var laserShot = [];var lastShot;
	var POWER = [];var lastCharge;var coold;
	var laserEnShot = [];var lastEnShot = [];
	var enemy = [];var lastEnMade;var enemyMoveY = [];var enspTime;
	var now;
	var boostDual=false;var dualTime;var dualTimer;
	var bomb;
	var spark;
	var energy;
	var scor;
	var rez;var recorde;
	var handler;var handler1;
	var enemymSpeed;
	var boost = [];var HP = [];
	var recoil;
	var HPtime;
	var shooting=false;
	var fon;
	var fon1;
	var shieldPOW;
	var shield = [];
	var starTurn=true;
	var galaxySpeed;
	var speedBuff=false;
	var speedDeBuff=false;
	pause();
	onClick(backElement2, function(){
		remove(backElement1);
		remove(backElement2);
		shieldPOW = text(window.innerWidth/2+80, window.innerHeight*0.95, "SHIELD:", { font: '24px arial', fill: 0xffffff });
		if(shieldPOW.position.x+100+16*shield.length+15<window.innerWidth){
			shield.push(rectangle(shieldPOW.position.x+100+16*shield.length, shieldPOW.position.y, 15, 24, 0x993399));
		}
		if(shieldPOW.position.x+100+16*shield.length+15<window.innerWidth){
			shield.push(rectangle(shieldPOW.position.x+100+16*shield.length, shieldPOW.position.y, 15, 24, 0x993399));
		}
		if(shieldPOW.position.x+100+16*shield.length+15<window.innerWidth){
			shield.push(rectangle(shieldPOW.position.x+100+16*shield.length, shieldPOW.position.y, 15, 24, 0x993399));
		}
		shipX=window.innerWidth/20;
		shipY=window.innerHeight/2-80;
		shipMove=0;
		ship = image(shipX, shipY, 'shipSH.png');
		ship.zindex = 99;
		lastShot = new Date().getTime();
		lastCharge = new Date().getTime();
		dualTimer = new Date().getTime();
		coold=1100;
		galaxySpeed=1;
		lastEnMade =0;
		enspTime=5000;
		boostDual=false;
		bomb = image(-100, -100, 'explosion.png');
		bomb.zindex = 101;
		spark = image(-100, -100, 'spark1.png');
		spark.zindex = 101;
		energy = text(5, window.innerHeight*0.95, "POWER:", { font: '24px arial', fill: 0xffffff });
		scor = text(5, window.innerHeight*0.010, "SCORE:", { font: '24px arial', fill: 0xffffff });
		rez=0;
		recorde=0;
		scorNr=text(105, window.innerHeight*0.010, 0, { font: '24px arial', fill: 0xffffff });
		enemymSpeed=-3.75;
		dualTime = 0;
		recoil=280;
		HPtime = new Date().getTime();
		fon = image(0, 0, 'stars1.png');
		fon.zindex = -1;
		fon1 = image(fon.position.x+window.innerWidth, 0, 'stars2.png');
		fon1.zindex = -1;
		game=true;
		resume();
	});
	onKeyDown(KEY_UP, function(){
		if(game==true){
			if(shipY>=30){
				shipMove=-4;
			}
		}
	});
	onKeyUp(KEY_UP, function(){
		if(game==true){
			if(shipY>=30){
				shipMove=0;
			}
		}
	});
	onKeyDown(KEY_DOWN, function(){
		if(game==true){
			if(shipY+130<=window.innerHeight){
				shipMove=4;
			}
		}
	});
	onKeyUp(KEY_DOWN, function(){
		if(game==true){
			if(shipY+110<=window.innerHeight){
				shipMove=0;
			}
		}
	});
	onKeyDown(KEY_LEFT, function(){
		if(game==true && speedBuff==false){
			speedDeBuff=true;
			galaxySpeed=0.75;
		}
	});
	onKeyUp(KEY_LEFT, function(){
		if(game==true && speedBuff==false){
			speedDeBuff=false;
			galaxySpeed=1;
		}
	});
	onKeyDown(KEY_RIGHT, function(){
		if(game==true && speedDeBuff==false){
			speedBuff=true;
			galaxySpeed=1.75;
		}
	});
	onKeyUp(KEY_RIGHT, function(){
		if(game==true && speedDeBuff==false){
			speedBuff=false;
			galaxySpeed=1;
		}
	});
	onKeyDown(KEY_SPACEBAR, function(){
		if(game==true){
			shooting=true;
		}
	});
	onKeyUp(KEY_SPACEBAR, function(){
		if(game==true){
			shooting=false;
		}
	});
	function shoot(){
		if(boostDual==true){
			var l = rectangle(ship.position.x+66, ship.position.y+2, 20, 3, 0x3366ff);
			l.zindex = 102;
			laserShot.push(l);
			l = rectangle(ship.position.x+66, ship.position.y+63, 20, 3, 0x3366ff)
			l.zindex = 102;
			laserShot.push(l);
			coold=1700;
		}else{
			var l = rectangle(ship.position.x+49, ship.position.y+32.5, 20, 3, 0x3366ff);
			l.zindex = 102;
			laserShot.push(l);
			coold=1100;
		}
	}
	function shootEn(x,y){
		var l = rectangle(x+2, y+12, 20, 3, 0xff0000);
		l.zindex = 102;
		laserEnShot.push(l);
	}
	function power(){
		POWER.push(rectangle(energy.position.x+100+16*POWER.length, energy.position.y, 15, 24, 0x3366ff))
	}
	function enemy1(){
		var randomEnShipY = Math.random() * (window.innerHeight - 130);
		if(randomEnShipY<=31){
			randomEnShipY=32;
		}
		var e=image(window.innerWidth+20, randomEnShipY, 'enemy1.png');
		e.zindex = 100;
		enemy.push(e);
		enemymSpeed*=-1;
		enemyMoveY.push(enemymSpeed);
		lastEnShot.push(new Date().getTime());
	}
	function dualBoost(){
		var randomDualBoostY = Math.random() * (window.innerHeight - 130);
		if(randomDualBoostY<30){
			randomDualBoostY=30;
		}
		boost.push(image(window.innerWidth, randomDualBoostY, 'dual.png'));
		
	}
	function shieldBoost(){
		var randomShieldBoostY = Math.random() * (window.innerHeight - 130);
		if(randomShieldBoostY<30){
			randomShieldBoostY=30;
		}
		HP.push(image(window.innerWidth-40, randomShieldBoostY, 'shield.png'));
		
	}
	function HPUP(){
		shield.push(rectangle(shieldPOW.position.x+100+16*shield.length, shieldPOW.position.y, 15, 24, 0x993399))
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
		for(var i=0;boost.length>i;i++){
			remove(boost[i]);
		}
		boost.length = 0;
		boostDual=false;
		for(var i=0;HP.length>i;i++){
			remove(HP[i]);
		}
		HP.length = 0;
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
		remove(fon);
		remove(fon1);
		game=false;
		shop=false;
		starTurn=true;
		enspTime=5000;
		rez=0;
		en=0;
		shipMove=0;
		enemyMoveY.length=0;
		shooting=false;
		shipX=window.innerWidth/20;
		shipY=window.innerHeight/2-80;
		viens=true;
		shooting=false;
		speedBuff=false;
		speedDeBuff=false;
		time=0;
		backElement3.zindex = 105;
		backElement4.zindex = 105;
		backElement5.zindex = 105;
		backElement6.zindex = 104;
		backElement7.zindex = 105;
		backElement8.zindex = 105;
		coold=180;
		recoil=280;
		dualTime=0;
		remove(ship);
		onClick(backElement3, function(){
			remove(backElement3);
			remove(backElement4);
			remove(backElement5);
			remove(backElement6);
			remove(backElement7);
			remove(backElement8);
			HPtime = new Date().getTime();
			lastShot = new Date().getTime();
			lastCharge = new Date().getTime();
			dualTimer = new Date().getTime();
			if(shieldPOW.position.x+100+16*shield.length+15<window.innerWidth){
				shield.push(rectangle(shieldPOW.position.x+100+16*shield.length, shieldPOW.position.y, 15, 24, 0x993399))
			}
			if(shieldPOW.position.x+100+16*shield.length+15<window.innerWidth){
				shield.push(rectangle(shieldPOW.position.x+100+16*shield.length, shieldPOW.position.y, 15, 24, 0x993399))
			}
			if(shieldPOW.position.x+100+16*shield.length+15<window.innerWidth){
				shield.push(rectangle(shieldPOW.position.x+100+16*shield.length, shieldPOW.position.y, 15, 24, 0x993399))
			}
			ship = image(shipX, shipY, 'shipSH.png');
			ship.zindex = 99;
			move(bomb,-100,-100);
			move(spark,-100,-100);
			fon = image(0, 0, 'stars1.png');
			fon.zindex = -1;
			fon1 = image(fon.position.x+window.innerWidth, 0, 'stars2.png');
			fon1.zindex = -1;
			resume();
			game=true;
		});
		pause();
	}
	animate(function(){
		if(game==true){
			//star effects
			if(fon.position.x+2732-window.innerWidth>0 && starTurn==true){
				moveBy(fon,-8.5*galaxySpeed,0);
			}else if(fon.position.x+2732>0 && fon.position.x+2732-window.innerWidth<=0){
				moveBy(fon,-8.5*galaxySpeed,0);
				moveBy(fon1,-8.5*galaxySpeed,0);
			}else if(fon.position.x+2732<=0){
				move(fon,window.innerWidth,0);
				starTurn=false;
			}
			if(fon1.position.x+4098-window.innerWidth>0 && starTurn==false){
				moveBy(fon1,-8.5*galaxySpeed,0);
			}else if(fon1.position.x+4098>0 && fon1.position.x+4098-window.innerWidth<=0){
				moveBy(fon1,-8.5*galaxySpeed,0);
				moveBy(fon,-8.5*galaxySpeed,0);
			}else if(fon1.position.x+4098<=0){
				move(fon1,window.innerWidth,0);
				starTurn=true;
			}
			//score counting
			remove(scorNr);
			scorNr = text(105, window.innerHeight*0.010, rez, { font: '24px arial', fill: 0xffffff })
			//recoil activates
			if(POWER.length==0){
				recoil=480;
				setTimeout(function(){
					recoil=280;
				}, 9000);
			}
			//ship movements
			moveBy(ship,0,shipMove);
			shipY+=shipMove;
			if(shipY+130>=window.innerHeight || shipY<=30){
				shipMove=0;
			}
			//laser makeing ship
			if(POWER.length>=1 && now-lastShot>=200 && shooting==true){
				lastShot = new Date().getTime();
				remove(POWER[POWER.length-1]);
				POWER.splice(POWER.length-1,1);
				shoot();
			}
			//explosion movements
			if(bomb.position.x!=-100){
				moveBy(bomb,-8.5*galaxySpeed,0);
			}else if(bomb.position.x!=-100 && bomb.position.x<=-65){
				move(bomb,-100,-100);
			}
			//spark movements
			if(spark.position.x!=-100){
				moveBy(spark,-8.5*galaxySpeed,0);
			}else if(spark.position.x!=-100 && spark.position.x<=-65){
				move(spark,-100,-100);
			}
			//laserShot from ship
			for(var i=0;i<laserShot.length;i++) {
				moveBy(laserShot[i],5.5*galaxySpeed,0);
				if(laserShot[i].position.x>window.innerWidth){
					remove(laserShot[i]);
					laserShot.splice(i,1);
					i--;
				}else{
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
							i--;
							rez++;
							break;
						}
					}
					for(var j=0;j<laserEnShot.length;j++){
						if(isCollision(laserShot[i],laserEnShot[j],0)){
							clearTimeout(handler1);
							move(spark, laserShot[i].position.x, laserShot[i].position.y-31);
							handler1 = setTimeout(function(){
								move(spark, -100, -100);
							}, 500);
							remove(laserEnShot[j]);
							laserEnShot.splice(j,1);
							remove(laserShot[i]);
							laserShot.splice(i,1);
							i--;
							break;
						}
					}
				}
			}
			//laserShot from enemy
			for(var i=0;i<laserEnShot.length;i++) {
				moveBy(laserEnShot[i],-5.5*galaxySpeed,0);
				//enemy laser out of range
				if(laserEnShot[i].position.x<-20){
					remove(laserEnShot[i]);
					laserEnShot.splice(i,1);
					i--;
				}else if(isCollision(laserEnShot[i],ship,0)){
					//my ship is shot
					if(shield.length==0){
						if(boostDual==true){
							dualTime=0;
							clearTimeout(handler);
							move(bomb, laserEnShot[i].position.x, laserEnShot[i].position.y);
							handler = setTimeout(function(){
								move(bomb, -100, -100);
							}, 3000);
							remove(laserEnShot[i]);
							laserEnShot.splice(i,1);
							i--;
						}else{
							gameOver();
							break;
						}
					}else if(boostDual==true && shield.length==1){
						clearTimeout(handler1);
						move(spark, laserEnShot[i].position.x-30, ship.position.y);
						handler1 = setTimeout(function(){
							move(spark, -100, -100);
						}, 500);
						remove(laserEnShot[i]);
						laserEnShot.splice(i,1);
						remove(shield[shield.length-1]);
						shield.splice(shield.length-1,1);
						remove(ship);
						ship = image(shipX , shipY , 'ship2.png');
						i--;
					}else{
						clearTimeout(handler1);
						move(spark, laserEnShot[i].position.x-30, ship.position.y);
						handler1 = setTimeout(function(){
							move(spark, -100, -100);
						}, 500);
						remove(laserEnShot[i]);
						laserEnShot.splice(i,1);
						remove(shield[shield.length-1]);
						shield.splice(shield.length-1,1);
						if(shield.length==0){
							remove(ship);
							ship = image(shipX , shipY , 'ship.png');
						}
						i--;
					}
				}
			}
			//enemy movement(unfinished)
			for(var i=0;i<enemy.length;i++){
				moveBy(enemy[i],-1.75*galaxySpeed,enemyMoveY[i]);
				//enemy hits my ship
				if(isCollision(enemy[i],ship,0)){
					if(shield.length==0){
						gameOver();
						break;
					}else if(shield.length==1){
						if(boostDual==true){
							dualTime=0;
							remove(shield[shield.length-1]);
							shield.splice(shield.length-1,1);
						}else{
							remove(shield[shield.length-1]);
							shield.splice(shield.length-1,1);
							gameOver();
							break;
						}
					}else{
						if(boostDual==true){
							dualTime=0;
							remove(shield[shield.length-1]);
							shield.splice(shield.length-1,1);
						}else if(shield.length==2){
							remove(shield[shield.length-1]);
							shield.splice(shield.length-1,1);
							remove(shield[shield.length-1]);
							shield.splice(shield.length-1,1);
							remove(ship);
							ship = image(shipX , shipY , 'ship.png');
						}else{
							remove(shield[shield.length-1]);
							shield.splice(shield.length-1,1);
							remove(shield[shield.length-1]);
							shield.splice(shield.length-1,1);
						}
						clearTimeout(handler);
						move(bomb, enemy[i].position.x, enemy[i].position.y);
						handler = setTimeout(function(){
							move(bomb, -100, -100);
						}, 3000);
						remove(enemy[i]);
						enemy.splice(i,1);
						enemyMoveY.splice(i,1);
						lastEnShot.splice(i,1);
						i--;
					}
				}else if(enemy[i].position.x+200<=0){
					remove(enemy[i]);
					enemy.splice(i,1);
					enemyMoveY.splice(i,1);
					lastEnShot.splice(i,1);
					i--;
				}else if(enemy[i].position.y+130>=window.innerHeight){
					enemyMoveY[i]*=-1;
				}else if(enemy[i].position.y<=30){
					enemyMoveY[i]*=-1;
				}
				//enemy shoots laser
				now = new Date().getTime();
				if(now-lastEnShot[i]>=1200){
					shootEn(enemy[i].position.x,enemy[i].position.y);
					lastEnShot[i] = new Date().getTime();
				}
			}
			//energy charges
			now = new Date().getTime();
			if(energy.position.x+80+16*POWER.length+60>=shieldPOW.position.x || POWER.length==18){
				
			}else if(now-lastCharge>=coold){
				power();
				lastCharge = new Date().getTime();
			}
			now = new Date().getTime();
			//enemy spawns
			if(now-lastEnMade>=enspTime){
				if(enspTime>1000){
					enspTime*=0.95;
				}
				enemy1();
				lastEnMade = new Date().getTime();
			}
			//spawns a dualBoost
			now = new Date().getTime();
			if(now-dualTimer>=7000){
				dualBoost();
				dualTimer = new Date().getTime();
			}
			for(var i=0;i<boost.length;i++){
				//dualBoost hits my ship
				if(isCollision(ship, boost[i], 0)){
					boostDual=true;
					remove(boost[i]);
					boost.splice(i,1);
					dualTime+=500;
					remove(ship);
					if(shield.length==0){
						ship = image(shipX, shipY, 'ship2.png');
					}else{
						ship = image(shipX, shipY, 'ship2SH.png');
					}
					i--;
				}else if(boost[i].position.x==-74){
					remove(boost[i]);
					boost.splice(i,1);
					i--;
				}else{
					moveBy(boost[i],-7.5*galaxySpeed,0);
				}
			}
			if(boostDual==true && dualTime>=0){
				dualTime--;
			}else if(boostDual==true && dualTime<=0){
				boostDual=false;
				remove(ship);
				if(shield.length==0){
					ship=image(shipX, shipY, 'ship.png');
				}else{
					ship=image(shipX, shipY, 'shipSH.png');
				}
			}
			//spawns a shieldBoost
			now = new Date().getTime();
			if(now-HPtime>=10000){
				shieldBoost();
				HPtime = new Date().getTime();
			}
			for(var i=0;HP.length>i;i++){
				if(shieldPOW.position.x+100+16*shield.length+15<window.innerWidth){
					//shieldBoost hits my ship
					if(isCollision(ship, HP[i], 0)){
						remove(HP[i]);
						HP.splice(i,1);
						i--;
						if(shield.length==0 && boostDual==true){
							remove(ship);
							ship = image(shipX ,shipY , 'ship2SH.png');
						}else if(shield.length==0){
							remove(ship);
							ship = image(shipX ,shipY , 'shipSH.png');
						}
						HPUP();
					}else if(HP[i].position.x==-75){
						remove(HP);
						HP.splice(i,1);
						i--;
					}else{
						moveBy(HP[i],-7.5*galaxySpeed,0);
					}
				}
			}
		}
	});
	
};

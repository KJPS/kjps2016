window.onload = function(){
    init(448, 448, { backgroundColor: 0xFFFFFF });
	var levelx=0;
	var skaits=0;
	var levely=0;
	var chance=5;
	var offsets1=5;
	var reset;
	var offsets2=5;
	var ex = [];
	var time = [];
	var flags = [];
	var bonus=[];
	var bonusindex=[];
	var charx=34;
	var kordsx = new Array(15);
	var kordsy = new Array(15);
	var chary=32;
	var flag=true;
	var bombplayer1;
	var bombplayer2;
	var bombsk1=1;
	var sakums=0;
	var grida = new Array(15);
	var bombsk2=1;
	var bombpow1=1;
	var bombpow2=1;
			var charx2=387;
			var chary2=385;
	var lauk = new Array(600);
		for (var i=0;i<600;i++)
		{
			lauk[i] = new Array(600);
		}
		var bloki = new Array(15);
		for (var i=0;i<15;i++)
		{
			bloki[i] = new Array(15);
			kordsx[i] = new Array(15);
			kordsy[i] = new Array(15);
			grida[i] = new Array(15);
		}
		for (var i=0;i<14;i++)
		{
			for (var j=0;j<14;j++)
			{
				
					grida[i][j]=image(levelx, levely, "image/floor.png");
					grida[i][j].zindex = 99;
					kordsx[i][j]=levelx;
					kordsy[i][j]=levely;
					if (level1[i][j]==1)
				{
					bloki[i][j]=image(levelx, levely, "image/wall.png");
					bloki[i][j].zindex = 100;
					kordsx[i][j]=levelx;
					kordsy[i][j]=levely;
					//lauk[levely][levelx]=1;
				}
				if (level1[i][j]==2)
				{
					bloki[i][j]=image(levelx, levely, "image/brick.png");
					bloki[i][j].zindex = 100;
					kordsx[i][j]=levelx;
					kordsy[i][j]=levely;
					//lauk[levely][levelx]=1;
					//console.log(levely, " ",levelx);
				}
				levelx+=32;
			}
			levely+=32;
			levelx=0;
		}
		//Player1
		var char_down = image(charx, chary, "image/char_front.png");
		var char_up = image(-150, 0, "image/char_back.png");
		var char_left = image(-150, 0, "image/char_left.png");
		var char_right = image(-150, 0, "image/char_right.png");
		
		char_down.zindex = 400;
		char_up.zindex = 400;
		char_left.zindex = 400;
		char_right.zindex = 400;
		
		var down=false;
		var up=false;
		var right=false;
		var left=false;
		var stepup=0;
		var stepdown=0;
		var stepright=0;
		var stepleft=0;
		var speed1=2;

		//Player2
		var speed2=2;
		var char_down2 = image(charx2, chary2, "image/char_front2.png");
		var char_up2 = image(-150, 0, "image/char_back2.png");
		var char_left2 = image(-150, 0, "image/char_left2.png");
		var char_right2 = image(-150, 0, "image/char_right2.png");
														
		char_down2.zindex = 400;
		char_up2.zindex = 400;
		char_left2.zindex = 400;
		char_right2.zindex = 400;
							
		var down2=false;
		var up2=false;
		var right2=false;
		var left2=false;
		var stepup2=0;
		var stepdown2=0;
		var stepright2=0;
		var stepleft2=0;
		var char_sekotajs2=image(-150, levely, "image/caurs2.png");
		var char_sekotajs=image(-150, levely, "image/caurs.png");
		onKeyDown(KEY_DOWN, function(){
			up=false;
			right=false;
			left=false;
			down=true;
			stepdown=speed1;
		});
		 onKeyDown(KEY_UP, function(){
			up=true;
			right=false;
			left=false;
			down=false;
			stepup=-speed1;
		});
		onKeyDown(KEY_RIGHT, function(){
			up=false;
			right=true;
			left=false;
			down=false;
			stepright=speed1;
		});
		onKeyDown(KEY_LEFT, function(){
			up=false;
			right=false;
			left=true;
			down=false;
			stepleft=-speed1;
		});
		onKeyUp(KEY_DOWN, function(){
			stepdown=0;
			down=false;
		});
		onKeyUp(KEY_UP, function(){
			stepup=0;
			up=false;
		});
		onKeyUp(KEY_RIGHT, function(){
			stepright=0;
			right=false;
		});
		onKeyUp(KEY_LEFT, function(){
			stepleft=0;
			left=false;
		});
		onKeyDown(KEY_SPACEBAR, function(){
			bomb(1);
		});
		onKeyDown(13, function(){
			bomb(2);
		});
							onKeyDown(75/*down*/, function(){
								up2=false;
								right2=false;
								left2=false;
								down2=true;
								stepdown2=speed2;
							});
							 onKeyDown(73/*up*/, function(){
								up2=true;
								right2=false;
								left2=false;
								down2=false;
								stepup2=-speed2;
							});
							onKeyDown(76/*right*/, function(){
								up2=false;
								//console.log("s");
								right2=true;
								left2=false;
								down2=false;
								stepright2=speed2;
							});
							onKeyDown(74/*left*/, function(){
								up2=false;
								right2=false;
								left2=true;
								down2=false;
								stepleft2=-speed2;
							});
							onKeyUp(75/*down*/, function(){
								stepdown2=0;
								down2=false;
							});
							onKeyUp(73/*up*/, function(){
								stepup2=0;
								up2=false;
							});
							onKeyUp(76/*right*/, function(){
								stepright2=0;
								right2=false;
							});
							onKeyUp(74/*left*/, function(){
								stepleft2=0;
								left2=false;
							});
																								animate(function(){
																									Player1Moving();
																									Player2Moving();
																									BonusCollision()
																									BombCollision();
																									RemoveBomb();
																								});
	function Player1Moving(){
		if (down)
		{
			move(char_down, charx, chary);
			move(char_right, -150, chary);
			move(char_up, -150, chary);
			move(char_left, -150, chary);
			moveBy(char_down, 0, stepdown);
			chary+=stepdown;
		}
		
		if (up)
		{
			move(char_up, charx, chary);
			move(char_right, -150, chary);
			move(char_down, -150, chary);
			move(char_left, -150, chary);
			moveBy(char_down, 0, stepup);
			chary+=stepup;
		}
		if (right)
		{
			move(char_down, -150, chary);
			move(char_up, -150, chary);
			move(char_left, -150, chary);
			move(char_right, charx, chary);
			moveBy(char_right, stepright, 0);
			charx+=stepright;
		}
		if (left)
		{
			move(char_right, -150, chary);
			move(char_up, -150, chary);
			move(char_down, -150, chary);
			move(char_left, charx, chary);
			moveBy(char_left, stepleft, 0);
			charx+=stepleft;
		}
		//Atgriezt player1 saakuma staavoklii peec pogu atlaishanas
		/*if (stepright==0 && stepleft==0 && stepup==0 && stepdown==0)
		{
		move(char_right, -150, chary);
		move(char_up, -150, chary);
		move(char_left, -150, chary);
		move(char_down, charx, chary);
		}*/
		bombplayer1=move(char_sekotajs, charx, chary);
		for (var i=0;i<14;i++)
		{
			for (var j=0;j<14;j++)
			{
				if (level1[i][j]==1 || level1[i][j]==2)
				{
			
					if (bloki[i][j] && isCollision(bloki[i][j], char_sekotajs, offsets1))
					{
						if (stepup!=0)
						{
							//console.log("dasd");
							while (bloki[i][j] && isCollision(bloki[i][j], char_up, offsets1))
							{
							moveBy(char_up, 0, 0.1);
							}
							chary+=speed1;
							stepup=0;
							up=false;
						}
						if (stepdown!=0)
						{
							while (bloki[i][j] && isCollision(bloki[i][j], char_down, offsets1-2))
							{
							moveBy(char_down, 0, -0.1);
							}
							stepdown=0;
							chary-=speed1;
							down=false;
						}
						if (stepright!=0)
						{
							while (bloki[i][j] && isCollision(bloki[i][j], char_right, offsets1))
							{
							moveBy(char_right, -0.1, 0);
							}
							stepright=0;
							charx-=speed1;
							right=false;
						}
						if (stepleft!=0)
						{
							while (bloki[i][j] && isCollision(bloki[i][j], char_left, offsets1))
							{
							moveBy(char_left, 0.1, 0);
							}
							stepleft=0;
							charx+=speed1;
							left=false;
						}
					}
				}
			}
		}
	};
								function Player2Moving(){
									if (down2)
									{
										move(char_down2, charx2, chary2);
										move(char_right2, -150, chary2);
										move(char_up2, -150, chary2);
										move(char_left2, -150, chary2);
										moveBy(char_down2, 0, stepdown2);
										chary2+=stepdown2;
									}
									
									if (up2)
									{
										move(char_up2, charx2, chary2);
										move(char_right2, -150, chary2);
										move(char_down2, -150, chary2);
										move(char_left2, -150, chary2);
										moveBy(char_down2, 0, stepup2);
										chary2+=stepup2;
									}
									if (right2)
									{
										move(char_down2, -150, chary2);
										move(char_up2, -150, chary2);
										move(char_left2, -150, chary2);
										move(char_right2, charx2, chary2);
										moveBy(char_right2, stepright2, 0);
										charx2+=stepright2;
									}
									if (left2)
									{
										move(char_right2, -150, chary2);
										move(char_up2, -150, chary2);
										move(char_down2, -150, chary2);
										move(char_left2, charx2, chary2);
										moveBy(char_left2, stepleft2, 0);
										charx2+=stepleft2;
									}
		
									bombplayer2=move(char_sekotajs2, charx2, chary2);
									for (var i=0;i<14;i++)
									{
										for (var j=0;j<14;j++)
										{
											if (level1[i][j]==1 || level1[i][j]==2)
											{
												if (bloki[i][j] && isCollision(bloki[i][j], char_sekotajs2, offsets1))
													{
														if (stepup2!=0)
														{
															//console.log("dasd");
															while (bloki[i][j] && isCollision(bloki[i][j], char_up2, offsets2))
															{
															moveBy(char_up2, 0, 0.1);
															}
															chary2+=speed2;
															stepup2=0;
															up2=false;
														}
														if (stepdown2!=0)
														{
															while (bloki[i][j] && isCollision(bloki[i][j], char_down2, offsets2-2))
															{
															moveBy(char_down2, 0, -0.1);
															}
															stepdown2=0;
															chary2-=speed2;
															down2=false;
														}
														if (stepright2!=0)
														{
															while (bloki[i][j] && isCollision(bloki[i][j], char_right2, offsets2))
															{
															moveBy(char_right2, -0.1, 0);
															}
															stepright2=0;
															charx2-=speed2;
															right2=false;
														}
														if (stepleft2!=0)
														{
															while (bloki[i][j] && isCollision(bloki[i][j], char_left2, offsets2))
															{
															moveBy(char_left2, 0.1, 0);
															}
															stepleft2=0;
															charx2+=speed2;
															left2=false;
														}
													}
											}
										}
									}
								};
			/*Check explosion collission*/
		/*	for (var k=0;k<skaits;k++)
			{
				if (ex[k] && isCollision(ex[k], char_sekotajs))
				{
					Player1GameOver();
					console.log("fsdad");
				}
			}*/
																									function BombCollision()
																									{
																										for (var l=0;l<ex.length;l++)
																									{
																									
																										if (isCollision(char_sekotajs,ex[l], offsets1))
																										{
																											GameOver(1);
																								
																										}
																										if (isCollision(char_sekotajs2,ex[l], offsets2))
																										{
																											GameOver(2);
																									
																										}
			
																									}
																									}
																									function BonusCollision()
																									{
																										for (var l=0;l<bonus.length;l++)
																										{	
																											if (bonus[l] &&( isCollision(char_sekotajs,bonus[l], 17)))
																										{
																											if (bonusindex[l]==1)
																											{
																												
																												if (speed1<3)
																												{
																													speed1+=0.2;
																												}
																											}
																											if (bonusindex[l]==2)
																											{
																												bombsk1++;
																											}
																											if (bonusindex[l]==3)
																											{
																												bombpow1++;
																											}
																											if (bonus[l] && bonusindex[l])
																										{
																										remove(bonus[l]);
																										bonus.splice(l, 1);
																										bonusindex.splice(l, 1);
																										l--;
																										}
																										}
																											if (bonus[l] && (isCollision(char_sekotajs2,bonus[l], 17)))
																										{
																											if (bonusindex[l]==1)
																											{
																												if (speed2<3)
																												{
																													speed2+=0.2;
																												}
																											}
																											if (bonusindex[l]==2)
																											{
																												bombsk2++;
																											}
																											if (bonusindex[l]==3)
																											{
																												bombpow2++;
																											}
																											if (bonus[l] && bonusindex[l])
																										{
																										remove(bonus[l]);
																										bonus.splice(l, 1);
																										bonusindex.splice(l, 1);
																										l--;
																										}
																										}
																								
																										}
																									};
			function RemoveBomb()
			{
			for (var l=0;l<ex.length;l++)
			{
				//console.log(time[l]);
				if ((new Date().getTime()-time[l])>=400)
				{
					remove(ex[l]);
					ex.splice(l, 1);
					time.splice(l, 1);
					l--;
					//console.log("test");
				}
			}
			}
	function bomb(p){
		if (p==1 && bombsk1<1)
		{
			return;
		}
		if (p==2 && bombsk2<1)
		{
			return;
		}
		if (p==2)
		{
			bombplayer1=bombplayer2;
			bombsk2--;
		}
		if (p==1)
		{
			bombsk1--;
		}
		flag=true;
		for (var i=13;i>=0 && flag;i--)
		{
			for (var j=13;j>=0;j--)
			{
				if (level1[i][j]==0)
				{
					if (grida[i][j] && isCollision(grida[i][j], bombplayer1, 8))
					{
						//console.log("dad");
						bombex(i, j, p);
						
						flag=false;
						break;
					}
				}
			}
		}
		
	};
	function bombex(i, j, p)
	{
		var bombpow=bombpow1;
		if (p==2)
		{
			bombpow=bombpow2;
		}
		var b = new Array(7);
		b[0] = image(kordsx[i][j], kordsy[i][j], "image/bomb0.png");
		b[0].zindex = 201;
		setTimeout(function(){ 
		//sakums=skaits;
		remove(b[0]);
		b[1] = image(kordsx[i][j], kordsy[i][j], "image/bomb1.png");
		b[1].zindex = 202;
			setTimeout(function(){ 
					b[2] = image(kordsx[i][j], kordsy[i][j], "image/bomb2.png");
					remove(b[1]);
					b[2].zindex = 203;
					
					setTimeout(function(){ 
					
							b[3] = image(kordsx[i][j], kordsy[i][j], "image/bomb3.png");
							remove(b[2]);
							b[3].zindex = 204;
							
							setTimeout(function(){ 
							
								b[4] = image(kordsx[i][j], kordsy[i][j], "image/bomb4.png");
								remove(b[3]);
								b[4].zindex = 205;
								setTimeout(function(){ 
								
														remove(b[4]);
														ex.push(image(kordsx[i][j], kordsy[i][j], "image/vid.png"));
														ex[ex.length-1].zindex = 400;
														time.push(new Date().getTime());
														flags[0]=true;
														flags[1]=true;
														flags[2]=true;
														flags[3]=true;
														for (var l=1;l<=bombpow;l++)
														{
														//console.log(i);
															if ((level1[i][j+l]==2 || level1[i][j+l]==0 )&& flags[0])
															{
															
																if (bloki[i][j+l]){
																if (level1[i][j+l]==2 && (Math.floor((Math.random() * chance) + 1))==2)
																{
																	Bonus(i, j+l);
																}
																	remove(bloki[i][j+l]);
																}
																
																bloki[i][j+l]=image(kordsx[i][j+l], kordsy[i][j+l], "image/floor.png");
																bloki[i][j+l].zindex=99;
																level1[i][j+l]=0;
																
																if (l<bombpow)
																{
																	ex.push(image(kordsx[i][j+l], kordsy[i][j+l], "image/hor.png"))
																	//console.log("ss");
																	ex[ex.length-1].zindex=400;
																	time.push(new Date().getTime());
																}
																else
																{
																	ex.push(image(kordsx[i][j+l], kordsy[i][j+l], "image/labb.png"))
																	ex[ex.length-1].zindex=400;
																	time.push(new Date().getTime());
																}
																
															}
															else
															{
																flags[0]=false
															}
															if ((level1[i][j-l]==2 || level1[i][j-l]==0) && flags[1])
															{
															
																if (bloki[i][j-l]){
																if (level1[i][j-l]==2 && (Math.floor((Math.random() * chance) + 1))==2)
																{
																	Bonus(i, j-l);
																}
																	remove(bloki[i][j-l]);
																}
																
																bloki[i][j-l]=image(kordsx[i][j-l], kordsy[i][j-l], "image/floor.png");
																bloki[i][j-l].zindex=99;
																level1[i][j-l]=0;
																
																if (l<bombpow)
																{
																	ex.push(image(kordsx[i][j-l], kordsy[i][j-l], "image/hor.png"))
																	ex[ex.length-1].zindex=400;
																	time.push(new Date().getTime());
																}
																else
																{
																	ex.push(image(kordsx[i][j-l], kordsy[i][j-l], "image/kreib.png"))
																	ex[ex.length-1].zindex=400;
																	time.push(new Date().getTime());
																}
																
															}
															else
															{
																flags[1]=false
															}
															if (i+l<level1.length &&(level1[i+l][j]==2 || level1[i+l][j]==0) && flags[2])
															{
															
																if (bloki[i+l][j]){
																if (level1[i+l][j]==2 && (Math.floor((Math.random() * chance) + 1))==2)
																{
																	Bonus(i+l, j);
																	//console.log("dadad");
																}
																	remove(bloki[i+l][j]);
																}
																
																bloki[i+l][j]=image(kordsx[i+l][j], kordsy[i+l][j], "image/floor.png");
																bloki[i+l][j].zindex=99;
																level1[i+l][j]=0;
																
																if (l<bombpow)
																{
																	ex.push(image(kordsx[i+l][j], kordsy[i+l][j], "image/ver.png"))
																	ex[ex.length-1].zindex=400;
																	time.push(new Date().getTime());
																}
																else
																{
																	if (i+l<level1.length)
																	{
																	ex.push(image(kordsx[i+l][j], kordsy[i+l][j], "image/apab.png"))
																	ex[ex.length-1].zindex=400;
																	time.push(new Date().getTime());
																	}
																}
																
															}
															else
															{
																flags[2]=false
															}
															
															if ((i-l>=0) &&( level1[i-l][j]==2 || level1[i-l][j]==0) && flags[3])
															{
															
															
																if (bloki[i-l][j]){
																if (level1[i-l][j]==2 && (Math.floor((Math.random() * chance) + 1))==2)
																{
																
																	Bonus(i-l, j);
																	
																}
																	remove(bloki[i-l][j]);
																}
																
																bloki[i-l][j]=image(kordsx[i-l][j], kordsy[i-l][j], "image/floor.png");
																bloki[i-l][j].zindex=99;
																level1[i-l][j]=0;
																
																
																if (l<bombpow)
																{
																	ex.push(image(kordsx[i-l][j], kordsy[i-l][j], "image/ver.png"))
																	ex[ex.length-1].zindex=400;
																	time.push(new Date().getTime());
																}
																else
																{
																if (i-l>=0)
																{
																//console.log(i-l);
																	ex.push(image(kordsx[i-l][j], kordsy[i-l][j], "image/augb.png"))
																	ex[ex.length-1].zindex=400;
																	time.push(new Date().getTime());
																}
																}
																
															}
															else
															{
																flags[3]=false
															}
														}
														setTimeout(function(){ 
														if (p==1)
														{
															bombsk1++;
														}
														if (p==2)
														{
															bombsk2++;
														}
														}, 0);
							}, 100);
						}, 400);
					}, 400);
				}, 400);
			}, 400);
	};
	function Bonus(x, y)
	{
	
		if ((Math.floor((Math.random() * 4) + 1))==3)
		{
		
			bonus.push(image(kordsx[x][y], kordsy[x][y], "image/boots.png"));
			bonus[bonus.length-1].zindex=105;
			bonusindex.push(1);
			console.log("test")
		}
		else
		{
			if ((Math.floor((Math.random() * 2) + 1))==1)
			{
			bonus.push(image(kordsx[x][y], kordsy[x][y], "image/bomb.png"));
			bonus[bonus.length-1].zindex=105;
			bonusindex.push(2);
			console.log("test")
			}
			else
			{
				bonus.push(image(kordsx[x][y], kordsy[x][y], "image/fire.png"));
				bonus[bonus.length-1].zindex=105;
				bonusindex.push(3);
				console.log("test")
			}
		
		}
	};
	function GameOver(kurs)
	{
		if (kurs==2)
		{
			var gameovertext=text(32, 190, "Player 1 Won", {'font' : '64px arial', 'fill' : '#FF8000', 'strokeThickness' : '5', 'dropShadow' : 'true'/*, 'dropShadowDistance' : ''*/})
			gameovertext.zindex=1000;
		}
		else
		{
			var gameovertext=text(32, 190, "Player 2 Won", {'font' : '64px arial', 'fill' : '#FF8000', 'strokeThickness' : '5', 'dropShadow' : 'true'/*, 'dropShadowDistance' : ''*/})
			gameovertext.zindex=1000;
		}
		var reset = image(205, 270, "image/restart.png");
		onClick(reset, function()
			{
				location.reload();
			});
		reset.zindex=800;
		pause();
		
	};
	
};
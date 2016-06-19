function spawnEnemies(amountEnemy, frequency) 
{
	//return 
	setInterval(function()
				{
					  for (var i=0; i<amountEnemy; i++)
					  {
						if (enemies.length<global_enemy_limit)
						{
							//1480, 740;
							enemies.push(new_sprite(-200,-200,0.5,0.5,'sprites/characters/enemy.png'));
							var xx=Math.random()*1000,
								yy=Math.random()*1000,
								attempts = 0;
							while(!collision_place(enemies[enemies.length-1],xx,yy) && attempts<10)
							{
								xx=Math.random()*1000;
								yy=Math.random()*1000;
								attempts++;
							}
							if (attempts<40)
							{
								enemies[enemies.length-1].x=xx;
								enemies[enemies.length-1].y=yy;
								enemies[enemies.length-1].radius=30;
								enemies[enemies.length-1].speed=4;
								stage.addChild(enemies[enemies.length-1]);
							}
						}
						
					  }
					
				}
				, frequency);
}
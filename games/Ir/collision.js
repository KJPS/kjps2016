function collision_predict(a,x,y) 
{
	var hit = false;

	if (a!=player)
	{
		var x1=a.x+a.width/2+x,
			y1=a.y+a.height/2+y,
			r1=a.radius,

			x2=player.x+player.width/2,
			y2=player.y+player.height/2,
			r2=player.radius;

	  		var distance = get_distance(x1, y1, x2, y2);

	  		if (distance<=r1+r2) 
	  			{
	  			 	hit=true; 
		  			player.xvector+=a.xvector;
		  			player.yvector+=a.yvector;
		  			player_health-=0.2;
	  			}
	}

	if (enemies.length>0)
	{
		for (var i in enemies)
		{	
			if (enemies[i]!=a)
			{
				var x1=a.x+a.width/2+x,
				y1=a.y+a.height/2+y,
				r1=a.radius,

				x2=enemies[i].x+enemies[i].width/2,
				y2=enemies[i].y+enemies[i].height/2,
				r2=enemies[i].radius;

		  		var distance = get_distance(x1, y1, x2, y2);

		  		if (distance<=r1+r2) { 
		  			hit=true; 
		  			enemies[i].xvector+=a.xvector/2;
		  			enemies[i].yvector+=a.yvector/2;}
	  		}
		}
	}

	if (obstacles.length>0)
	{
		for (var i in obstacles)
		{
			var x1=a.x+x,
					y1=a.y+y,
					r1=a.radius,

					x2=obstacles[i].x,//+enemies[i].width/2,
					y2=obstacles[i].y,//+enemies[i].height/2,
					r2=obstacles[i].radius;

		  		var distance = get_distance(x1, y1, x2, y2);

		  		if (distance<=r1+r2) 
		  		{ 
		  			hit=true; 
		  		}
		}
	}

	/*if (obstacles.length>0)
	{
		for (var i in obstacles)
		{
			var x1=a.x+x,
				y1=a.y+y,
				r=a.radius,

				x2=obstacles[i].x,
				y2=obstacles[i].y,
				w=obstacles[i].width,
				h=obstacles[i].height;

			if ((in_bounds(x1+r,y1,x2,y2,x2+w,y2+h))
			|| (in_bounds(x1-r,y1,x2,y2,x2+w,y2+h))
			|| (in_bounds(x1,y1+r,x2,y2,x2+w,y2+h))
			|| (in_bounds(x1,y1-r,x2,y2,x2+w,y2+h)))
			{
				hit = true;
			}

			if ((get_distance(x1,y1,x2,y2)<=r) 
			|| (get_distance(x1,y1,x2+w,y2)<=r)
			|| (get_distance(x1,y1,x2,y2+h)<=r)
			|| (get_distance(x1,y1,x2+w,y2+h)<=r))
			{
				hit = true;
			}
			
			/*message1.x=x1;
			message1.y=y1;
			message1.text=x2;
			message2.text=y2;
			message3.text=w;
			message4.text=h;

			/*graphics.lineStyle(2, 0x0000FF, 1);
			graphics.beginFill(0xFF700B, 1);
			graphics.drawRect(x2,y2,x2+w,y2+h);

	  		//var distance = get_distance(x1, y1, x2, y2);

	  		//if (distance<=r1+r2) { hit=true; }
		}
	}*/

  return hit;
};


function in_bounds(x,y,xx1,yy1,xx2,yy2)
{
	var rezult = false;
	if (x>=xx1 && x<=xx2)
	{
		if (y>=yy1 && y<=yy2)
		{
			rezult = true;
		}
	}

	return rezult;
}


//check if two circular objects are colliding
function collision_check(a1,a2) 
{

  var hit = false;
  var x1=a1.x+a1.width/2,
  	  y1=a1.y+a1.height/2,
  	  r1=a1.width/2,

  	  x2=a2.x+a2.width/2,
  	  y2=a2.y+a2.height/2,
  	  r2=a2.width/2;

  var distance = get_distance(x1, y1, x2, y2);

  if (distance<=r1+r2) { hit=true; }

  return hit;
};

function collision_place(a,x,y)
{
	var hit = false;

	if (collision_check(a,a.x-x,a.y-y))
	{
		hit = true;
	}
	return hit;
}



function move(a)
{
	//
	//	x vector
	//
	if (Math.abs(get_distance(a.x,a.y,a.x+a.xvector, a.y+a.yvector)>a.max_speed))
	{
		a.xvector/=a.friction;
		a.yvector/=a.friction;
	}

	if (!collision_predict(a,a.xvector,0)) 
	{
		a.x+=a.xvector;
	}
	else if (!collision_predict(a,a.xvector,-a.slope_slide))
	{
		a.x+=a.xvector;
		a.y-=a.slope_slide;
	}
	else if (!collision_predict(a,a.xvector,+a.slope_slide))
	{
		a.x+=a.xvector;
		a.y+=a.slope_slide;
	}
	else 
	{
		a.xvector/=a.friction;
	}

	///
	///
	/// now for the y vector
	///
	///

	if (!collision_predict(a,0,a.yvector)) 
	{
		a.y+=a.yvector;
	}
	else if (!collision_predict(a,-a.slope_slide,a.yvector))
	{
		a.x-=a.slope_slide;
		a.y+=a.yvector;
	}
	else if (!collision_predict(a,+a.slope_slide,a.yvector))
	{
		a.x+=a.slope_slide;
		a.y+=a.yvector;
	}
	else
	{
		a.yvector/=a.friction;
	}
}

function move_bullet(a)
{
	for (var i = 0; i<a.itterations; i++)
	{
		var state=bullet_collision_predict(a,xx,yy);
		{
			a.rotation=state;
			var xx=-Math.cos(a.rotation)*a.speed;
			var yy=-Math.sin(a.rotation)*a.speed;
			a.x+=xx;
			a.y+=yy;
		}
	}
}

function bullet_collision_predict(a,x,y) 
{
	var hit_angle = a.rotation;	// -1 - nothing
						// 1 - enemy hit;

	
	if (enemies.length>0)
	{
		for (var i in enemies)
		{	
			if (enemies[i]!=a)
			{
				var x1=a.x+x,
					y1=a.y+y,
					r1=a.radius,

					x2=enemies[i].x,//+enemies[i].width/2,
					y2=enemies[i].y,//+enemies[i].height/2,
					r2=enemies[i].radius;

		  		var distance = get_distance(x1, y1, x2, y2);

		  		if (distance<=r1+r2) 
		  		{ 
		  			hit_angle=get_angle(x1,y1,x2,y2); 
		  			enemies[i].hp-=5;
		  			a.done=true;
		  		}
	  		}
		}
	}

	if (obstacles.length>0)
	{
		for (var i in obstacles)
		{
			var x1=a.x+x,
					y1=a.y+y,
					r1=a.radius,

					x2=obstacles[i].x,//+enemies[i].width/2,
					y2=obstacles[i].y,//+enemies[i].height/2,
					r2=obstacles[i].radius;

		  		var distance = get_distance(x1, y1, x2, y2);

		  		if (distance<=r1+r2) 
		  		{ 
		  			hit_angle=get_angle(x2,y2,x1,x1); 
		  		}
		}
	}

  return hit_angle;
};

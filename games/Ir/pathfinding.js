function mark_obstacles()
{
	for (var i in obstacles)
	{
		var x1 = Math.floor(obstacles[i].x/64),
			y1 = Math.floor(obstacles[i].y/64),
			x2 = Math.ceil((obstacles[i].x+obstacles[i].width)/64),
			y2 = Math.ceil((obstacles[i].y+obstacles[i].height)/64);

		for (var x=x1; x<=x2; x++)
		{
			for (var y=y1; y<=y2; y++)
			{
				if (in_bounds(x,y,0,0,path_width,path_height))
				{
					path[x][y]=999;
				}
			}
		}
		
	}
}

function update_pathfinding(xx,yy)
{
	var mx = [],
		my = [],
		i = 0;

	for (var i in path)
	{
		for (var j in path[i])
		{
			if (path[i][j]<30)
			{
				path[i][j]=0;
			}
		}
	}

	if ((xx>=0 && xx<=path_width) && (yy>=0 && yy<=path_height))
	{
	mx.push(xx);
	my.push(yy);
	path[xx][yy]=1;
	}

	for (i=0; i<mx.length; i++)
	{
		x=mx[i];
		y=my[i];

		for(var xx=-1; xx<2; xx++)
		{
			for (var yy=-1; yy<2; yy++)
			{
				if (!(xx==0 && yy==0))
				{
					if (in_bounds(x+xx,y+yy,0,0,path_width,path_height))
					{
						if (path[x][y]<30)
						{
							if ((path[x+xx][y+yy]>path[x][y]+1)||(path[x+xx][y+yy]==0))
							{
								if (path[x+xx][y+yy]<30)
								{
									mx.push(x+xx);
									my.push(y+yy);
									path[x+xx][y+yy]=path[x][y]+1;
								}
							}
						}
					}
				}
			}
		}


		/*if (x-1>=0) 
		{
			if ((path[x-1][y]>path[x][y]+1 || path[x-1][y]==0) && (path[x-1][y]<30))
			{
				mx.push(x-1);
				my.push(y);
				path[x-1][y]=path[x][y]+1;
			}
		}
		if (x+1<=path_width) 
		{
			if ((path[x+1][y]>path[x][y]+1 || path[x+1][y]==0) && (path[x+1][y]<30)) 
			{
				mx.push(x+1);
				my.push(y);
				path[x+1][y]=path[x][y]+1;
			}
		}
		if (y-1>=0) 
		{
			if ((path[x][y-1]>path[x][y]+1 || path[x][y-1]==0) && (path[x][y-1]<30))
			{
				mx.push(x);
				my.push(y-1);
				path[x][y-1]=path[x][y]+1;
			}
		}
		if (y+1<=path_height) 
		{
			if ((path[x][y+1]>path[x][y]+1 || path[x][y+1]==0) && (path[x][y+1]<30))
			{
				mx.push(x);
				my.push(y+1);
				path[x][y+1]=path[x][y]+1;
			}
		}*/
	}

	mx.length=0;
	my.length=0;

}
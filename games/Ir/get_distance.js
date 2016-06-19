function get_distance(x1,y1,x2,y2)
{
	var distance = Math.sqrt(Math.abs(x1-x2)*Math.abs(x1-x2) + Math.abs(y1-y2)*Math.abs(y1-y2));

	return distance;
}
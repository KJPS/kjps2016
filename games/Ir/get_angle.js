function get_angle(x1,y1,x2,y2)
{
	var delta_x = x1-x2;
	var delta_y = y1-y2;
	return Math.atan2(delta_y,delta_x) ;// 3.1415;
}
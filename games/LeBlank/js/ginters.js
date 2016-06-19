window.onload = function(){
    init(window.innerWidth, window.innerHeight, { backgroundColor: 0x3399ff });
	
     image (0,0,'image/back.png');
	  rectangle (0,700, 1900, 800,0x329932);
	 var border2  = rectangle(1595,1,5,9001,0x00000); 
	 var score = 0;
	 var t = text(1350,60,"Score:",{stroke: 0xffffff,strokeThickness: 3, fill: 0x000000}); 
	 var Hscore = text( 1350,90,"Highscore: " + localStorage.getItem('Highscore'),{stroke: 0xffffff,strokeThickness: 3, fill: 0x000000});
	 var border = rectangle(0,1,5,9001,0x00000); 
	 var r =rectangle(600, 0, 35 , 35, 0x7c0c32 );
	var opstacle = []; 
	 var i;
	 for (i=0; i<19; i=i+1)
	 { 
	    opstacle.push( rectangle(i*100, 760, 97, 1000, 0x1b5e31));
	 }
    	
	var sx =5;
	var sy= 0, sr = 0;
	
	var right = false; 
	var up = false;

	      onKeyDown(KEY_UP, function(){
	        up = true;   
		  });
		
   	      onKeyUp(KEY_UP, function(){
	        up = false;  
		  });
		
	      onKeyDown(KEY_RIGHT, function(){
	         right = true; 
	      });
	   
	      onKeyUp(KEY_RIGHT, function(){
	          right = false; 
	      });
				  
    animate(function(){
		 
	    var multi = score;
		var isOnGround = false;
		sr = sy;
		
		if (multi >= 330) {
		multi=330;
		}
		
		for (var i = 0; i < opstacle.length; ++i) {
			var op = opstacle[i].position;
			var ob = opstacle[i].getBounds();
			var rp = r.position;
			var rb = r.getBounds();
			var speed = -5-(rp.x/100)
			
			if (op.x <= rp.x + rb.width && op.x + ob.width >= rp.x) {
				var dis = op.y - (rp.y+35);
				if ( dis <= -1) 
				{
				 moveBy (r, speed-sx-1 ,0) //sâns
				}
				 else
				  {
					// augða
					sr = Math.min(sr, op.y - rp.y - rb.height);
					
					if (op.y - rp.y - rb.height == 0) {
						isOnGround = true;
					}
				}
			}
			
			if (op.x<-100) 
			{
			  op.x=op.x+1900;
	     	  score++
			  t.text = "Score: " + score ;
              op.y=760-Math.random()*(70+multi)
			  }
			  moveBy (opstacle[i], speed, 0);
		}
	      if(isOnGround==true) {
	      moveBy (r,speed,0)
	    }
	    if (up && isOnGround) {
			sy=-20;
	    }
	 
	    moveBy (r, 0 ,sr);
	    sy = sy+1;
 
	var sxr = 0;  
	    
		if (right) {
			sxr = sx;
	    }
		
		moveBy (r, sxr, 0);
   if  ( isCollision (r,border2,5)){
	    moveBy (r, speed-sx-1,0)
		}

	if (isCollision (r,border,-5)) {
    	pause();
		
		if (score> localStorage.getItem('Highscore')) {
		localStorage.setItem("Highscore", score);
		} 
		
		text(700,300,'GAME OVER', {font: '36px arial',stroke: 0xffffff,strokeThickness: 3, fill: 0x000000});
		//GAME OVER 
		}
		if (op.y<400) {
			      op.y=op.y+100 ;
				}
    });
};
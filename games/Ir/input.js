var key_up = 0,
	  key_down = 0,
	  key_left = 0,
	  key_right = 0;

//Capture the keyboard arrow keys
  var left = keyboard(65), //37
      up = keyboard(87),
      right = keyboard(68),
      down = keyboard(83);

  //Left arrow key `press` method
  left.press = function() {
  	key_left=1;
  };
  left.release = function() {
  	key_left=0;
  };

  //Up
  up.press = function() {
  	key_up=1;
  };
  up.release = function() {
  	key_up=0;
  };

  //Right
  right.press = function() {
  	key_right=1;
  };
  right.release = function() {
  	key_right=0;
  };

  //Down
  down.press = function() {
  	key_down=1;
  };
  down.release = function() {
  	key_down=0;
  };


function keyboard(keyCode) {
  var key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }

    //message.text=event.keyCode;

    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
}

function update_mouse_state()
  {
    document.body.onmousedown = function() { 
      if (mouse_state==false) {on_click();}
      mouse_state=true;
    }
    document.body.onmouseup = function() {
      mouse_state=false;
    }
}
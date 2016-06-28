var TankGame = TankGame || {};
TankGame.Howtoplay = function(){};

var gameFieldX = (window.innerWidth-(61*15))/2;
var gameFieldY = (window.innerHeight-(61*10))/2;

var instrStyle = {font: "16px Arial", fill: "#ffffff"};

TankGame.Howtoplay.prototype = {
	create: function() {    


		var instructionText = "There are two players in this game. The task is to destroy the enemy's base and \nsave your own base from destruction. \n\nFirst, you have to chose where your unit (soldier, tank, ninja...) will go. It will be\nplaced wherever the yellow-glowing border is. Player 1 can change its position \nusing W and S keys and Player 2 shall use Arrow up (⬆️) and Arrow down (⬇️).\nThen you can choose what will you place there. You can do that by pressing \nthe corresponding number key. Player 1 uses standart number keys (above the letters) \nand Player 2 uses numpad number keys (on the right of the letters). You can \nsee which number corresponds to which unit by looking at the little cards \nnext to the battleground. There you can also see the price.";

		var textSprite = this.game.add.text(window.innerWidth/2,window.innerHeight/2,instructionText,instrStyle);
		textSprite.anchor.setTo(0.5);

		backbtn = this.game.add.button(centerX, centerY+200, 'back_btn', function(){
	        this.state.start('Menu');
	    }, this);
	    backbtn.height = 30;
	    backbtn.width = 100;
	    backbtn.anchor.setTo(0.5);
	    backbtn.onInputOver.add(function(){
	    	backbtn.loadTexture('back_btn_hover');
	    }, this);
	    backbtn.onInputOut.add(function(){
	    	backbtn.loadTexture('back_btn');
	    }, this);


		this.cat = this.game.add.sprite(0,gameFieldY+(61*10)-30,'gunman_walk');
	    var walk =this.cat.animations.add('walk');
	    this.cat.animations.play('walk',8,true);

	    this.cat2 = this.game.add.sprite(50,gameFieldY+(61*10)-30,'gunman_walk_blue');
	    var walk2 =this.cat2.animations.add('walk2');
	    this.cat2.animations.play('walk2',7,true);

	    game_logo = this.game.add.sprite(window.innerWidth/2,10,'game_logo_moving');
	    game_logo.anchor.setTo(0.5,0);

	    var move = game_logo.animations.add('move');
	    game_logo.animations.play('move',15,true);
	},

	update: function() {
		if(this.cat.position.x<window.innerWidth)this.cat.position.x+=1.8;
		else this.cat.position.x = -15;
		if(this.cat2.position.x<window.innerWidth)this.cat2.position.x+=2;
		else this.cat2.position.x = -15;
	},
};
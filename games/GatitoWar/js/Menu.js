var TankGame = TankGame || {};
TankGame.Menu = function(){};

var gameFieldX = (window.innerWidth-(61*15))/2;
var gameFieldY = (window.innerHeight-(61*10))/2;


TankGame.Menu.prototype = {
  create: function() {


    playbtn = this.game.add.button(centerX, centerY, 'play_btn', function(){this.state.start('Game')}, this);
    playbtn.anchor.setTo(0.5);
    playbtn.onInputOver.add(function(){
    	playbtn.loadTexture('play_btn_hover');
    }, this);
    playbtn.onInputOut.add(function(){
    	playbtn.loadTexture('play_btn');
    }, this);


    this.cat = this.game.add.sprite(0,gameFieldY+(61*10)-30,'gunman_walk');
    var walk =this.cat.animations.add('walk');
    this.cat.animations.play('walk',8,true);

    this.cat2 = this.game.add.sprite(50,gameFieldY+(61*10)-30,'gunman_walk_blue');
    var walk2 =this.cat2.animations.add('walk2');
    this.cat2.animations.play('walk2',7,true);

  },


  update: function() {
    if(this.cat.position.x<window.innerWidth)this.cat.position.x+=1.8;
    else this.cat.position.x = -15;
    if(this.cat2.position.x<window.innerWidth)this.cat2.position.x+=2;
    else this.cat2.position.x = -15;

  },

};
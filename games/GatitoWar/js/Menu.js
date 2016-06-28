var TankGame = TankGame || {};
TankGame.Menu = function(){};

var gameFieldX = (window.innerWidth-(61*15))/2;
var gameFieldY = (window.innerHeight-(61*10))/2;

TankGame.Menu.prototype = {
  create: function() {
    this.game.add.plugin(Fabrique.Plugins.InputField);

    if(!window.music_playing && JSON.parse(localStorage.getItem("options")).music){
        music = this.game.add.audio('music_menu');
        music.play();
        music.volume = 0.1;
        window.music_playing=true;
    }
    


    playbtn = this.game.add.button(centerX, centerY, 'play_btn', function(){
        var val1 = name1.value;
        var val2 = name2.value;
        if(val1=='')val1="Capple";
        if(val2=='')val2="Catter";

        var names = { 'name1': val1, 'name2': val2};
        localStorage.setItem('player_names', JSON.stringify(names));

        this.state.start('Game');

    }, this);
    playbtn.anchor.setTo(0.5);
    playbtn.onInputOver.add(function(){
    	playbtn.loadTexture('play_btn_hover');
    }, this);
    playbtn.onInputOut.add(function(){
    	playbtn.loadTexture('play_btn');
    }, this);


    howtobtn = this.game.add.button(centerX, centerY+60+20, 'howtoplay_btn', function(){
        this.state.start('Howtoplay');
    }, this);
    howtobtn.height = 32;
    howtobtn.width = 200;
    howtobtn.anchor.setTo(0.5);
    howtobtn.onInputOver.add(function(){
    	howtobtn.loadTexture('howtoplay_btn_hover');
    }, this);
    howtobtn.onInputOut.add(function(){
    	howtobtn.loadTexture('howtoplay_btn');
    }, this);


    if(JSON.parse(localStorage.getItem("options")).particles==true){
        particlesbtn = this.game.add.button(10, 10, 'particles_on', function(){
            var options = localStorage.getItem('options');
            options = JSON.parse(options);
            options.particles=false;
            localStorage.setItem("options",JSON.stringify(options));
            this.state.start('Menu');
        }, this);
    }else{
        particlesbtn = this.game.add.button(10, 10, 'particles_off', function(){
            var options = localStorage.getItem('options');
            options = JSON.parse(options);
            options.particles=true;
            localStorage.setItem("options",JSON.stringify(options));
            this.state.start('Menu');
        }, this);
    }
    
    if(JSON.parse(localStorage.getItem("options")).sounds){
        soundsbtn = this.game.add.button(60, 10, 'sounds_on', function(){
            var options = localStorage.getItem('options');
            options = JSON.parse(options);
            options.sounds=false;
            localStorage.setItem("options",JSON.stringify(options));
            this.state.start('Menu');
        }, this);
    }else{
        soundsbtn = this.game.add.button(60, 10, 'sounds_off', function(){
            var options = localStorage.getItem('options');
            options = JSON.parse(options);
            options.sounds=true;
            localStorage.setItem("options",JSON.stringify(options));
            this.state.start('Menu');
        }, this);
    }

    if(JSON.parse(localStorage.getItem("options")).music){
        musicbtn = this.game.add.button(110, 10, 'music_on', function(){
            var options = localStorage.getItem('options');
            options = JSON.parse(options);
            options.music=false;
            music.stop();
    		window.music_playing=false;
            localStorage.setItem("options",JSON.stringify(options));
            this.state.start('Menu');
        }, this);
    }else{
       musicbtn = this.game.add.button(110, 10, 'music_off', function(){
            var options = localStorage.getItem('options');
            options = JSON.parse(options);
            options.music=true;
            localStorage.setItem("options",JSON.stringify(options));
            this.state.start('Menu');
        }, this);
    }
    


    this.cat = this.game.add.sprite(0,gameFieldY+(61*10)-30,'gunman_walk');
    var walk =this.cat.animations.add('walk');
    this.cat.animations.play('walk',8,true);

    this.cat2 = this.game.add.sprite(50,gameFieldY+(61*10)-30,'gunman_walk_blue');
    var walk2 =this.cat2.animations.add('walk2');
    this.cat2.animations.play('walk2',7,true);

    game_logo = this.game.add.sprite(window.innerWidth/2,10,'game_logo_moving');
    game_logo.anchor.setTo(0.5,0);

    var move = game_logo.animations.add('move');
    game_logo.animations.play('move',20,true);

    var name1 = this.game.add.inputField(playbtn.x-300, playbtn.y-20, {
        font: '18px Arial',
        fill: '#212121',
        fontWeight: 'bold',
        width: 150,
        height:20,
        padding: 8,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 6,
        placeHolder: 'Name player1',
        placeHolderColor: '#000',
        type: Fabrique.InputType.text
    });
    var name2 = this.game.add.inputField(playbtn.x+140, playbtn.y-20, {
        font: '18px Arial',
        fill: '#212121',
        fontWeight: 'bold',
        width: 150,
        height:20,
        padding: 8,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 6,
        placeHolder: 'Name player2',
        placeHolderColor: '#000',
        type: Fabrique.InputType.text
    });
    // name1.anchor.setTo(0.5);
    if(JSON.parse(localStorage.getItem("player_names")).name1!==''){
        name1.setText(JSON.parse(localStorage.getItem("player_names")).name1);
    }
    if(JSON.parse(localStorage.getItem("player_names")).name2!==''){
        name2.setText(JSON.parse(localStorage.getItem("player_names")).name2);
    }
  },


  update: function() {
    if(this.cat.position.x<window.innerWidth)this.cat.position.x+=1.8;
    else this.cat.position.x = -15;
    if(this.cat2.position.x<window.innerWidth)this.cat2.position.x+=2;
    else this.cat2.position.x = -15;


    var options = localStorage.getItem('options');
    options = JSON.parse(options);
    if(options.particles)particlesbtn.loadTexture('particles_on');
    else particlesbtn.loadTexture('particles_off');
  },

};
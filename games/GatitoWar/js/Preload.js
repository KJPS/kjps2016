var TankGame = TankGame || {};

TankGame.Preload = function(){};

TankGame.Preload.prototype = {
  preload: function() {
    this.game.stage.disableVisibilityChange = true;

    //Parāda logo un uzliek tekstu
    this.preloadBar = this.add.sprite(centerX, centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);
    this.preloadBar.scale.setTo(2);

    //Visi logo
    this.logo_reinards = this.add.sprite(12, gameHeight-10, 'reinards_logo');
    this.logo_reinards.anchor.setTo(0,1);
    this.logo_reinards.scale.setTo(0.4);

    this.logo_niks = this.add.sprite(105, gameHeight-10, 'niks_logo');
    this.logo_niks.anchor.setTo(0,1);
    this.logo_niks.scale.setTo(0.4);

    this.logo_html5 = this.add.sprite(195, gameHeight-10, 'html5_logo');
    this.logo_html5.anchor.setTo(0,1);
    this.logo_html5.scale.setTo(0.7);

    this.logo_phaser = this.add.sprite(360, gameHeight-10, 'phaser_logo');
    this.logo_phaser.anchor.setTo(1,1);
    // this.logo_phaser.scale.setTo(0.8);

    // this.progress = this.game.add.bitmapText(400, 350, 'myFont3', 'Files loaded: ', 20)
    // this.progress.align = 'center';
    // this.progress.x = this.game.width / 2 - this.progress.textWidth / 2 -25;

    this.hint = this.game.add.bitmapText(400, 500, 'myFont3', 'Game not loading? Check if you have cookies enabled :P', 20)
    this.hint.align = 'center';
    this.hint.x = this.game.width / 2 - this.hint.textWidth / 2;

    this.author = this.game.add.bitmapText(400, 550, 'myFont3', 'Made by Niks and Reinards 2016', 20)
    this.author.align = 'center';
    this.author.x = this.game.width / 2 - this.author.textWidth / 2;

    this.load.setPreloadSprite(this.preloadBar);
    // this.game.load.onFileComplete.add(this.fileComplete, this);



    //load game assets

    // this.load.spritesheet('player1', 'assets/images/player1.png', 110, 160, 19);

    this.load.image('play_btn', 'assets/images/play.png');
    this.load.image('play_btn_hover', 'assets/images/play_hover.png');
    // this.load.image('tank_tex', 'assets/images/tank.png');
    this.load.spritesheet('tank_tex', 'assets/images/tank.png', 55, 35, 2);
    this.load.spritesheet('tank_tex_blue', 'assets/images/tank_blue.png', 55, 35, 2);
    this.load.image('base', 'assets/images/base.png');
    // this.load.image('explosion', 'assets/images/explosion.png');
    this.load.spritesheet('explosion', 'assets/images/explosion.png', 60, 60, 8);
    // this.load.image('gunman_walk_blue', 'assets/images/gunman_walk_blue.png');
    this.load.spritesheet('gunman_walk_blue', 'assets/images/gunman_walk_blue.png', 40, 40, 2);
    this.load.image('gunman_shoot', 'assets/images/gunman_shoot.png');
    this.load.image('gunman_shoot_blue', 'assets/images/gunman_shoot_blue.png');

    this.load.audio('gunshot', ['assets/audio/gunshot.ogg', 'assets/audio/gunshot.wav']);
    this.load.audio('tankshot', ['assets/audio/tankshot.ogg', 'assets/audio/tankshot.wav']);
    this.load.audio('place', ['assets/audio/place.ogg', 'assets/audio/place.wav']);
    this.load.audio('tankexplosion', ['assets/audio/tankexplosion.ogg', 'assets/audio/tankexplosion.wav']);
    this.load.image('border', 'assets/images/border.png');
    this.load.image('panel', 'assets/images/victory.png');

    //Liec zem šitā

    this.load.image('grass_tex', 'assets/images/grass.png');
    this.load.image('sand_tex', 'assets/images/sand.png');
    this.load.image('snow_tex', 'assets/images/snow.png');
    this.load.image('grass_tex_selected', 'assets/images/grassSelected.png');
    this.load.spritesheet('gunman_walk', 'assets/images/gunman_walk.png', 40, 40, 2);
    this.load.spritesheet('cat_walk', 'assets/images/cat.png', 30, 30, 2);

    this.load.image('card1', 'assets/images/card1.png');
    this.load.image('card2', 'assets/images/card2.png');
    this.load.image('bullet', 'assets/images/bullet.png');
    
    this.load.image('coin', 'assets/images/coin.png');
    this.load.image('heart', 'assets/images/heart.png');

  },
  // fileComplete: function(progress, cacheKey, success, totalLoaded, totalFiles) {
  //   this.progress.text = "Files loaded: "+totalLoaded+"/"+totalFiles;
  // },
  create: function() {
    this.state.start('Game');
  },
};


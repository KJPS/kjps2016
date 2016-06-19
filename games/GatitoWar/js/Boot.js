var TankGame = TankGame || {};

TankGame.Boot = function(){};


TankGame.Boot.prototype = {
  preload: function() {
    //Ielādē lādēšanās loga asetus (Attēlus, fontu)
    this.load.image('preloadbar', 'assets/images/preloader-bar.png');
    this.load.image('reinards_logo', 'assets/images/me_logo.png');
    this.load.image('niks_logo', 'assets/images/niks_logo.png');
    this.load.image('phaser_logo', 'assets/images/phaser_logo.png');
    this.load.image('html5_logo', 'assets/images/html5_logo.png');

    this.load.bitmapFont('myFont3', 'assets/fonts/nokia.png', 'assets/fonts/nokia.xml');
  },
  create: function() {
    //Nosaka fona krāsu
    this.game.stage.backgroundColor = '#2B200F';

    //Centering

    // this.game.stage.disableVisibilityChange = true;
    // this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    // this.game.scale.minWidth = 320;
    // this.game.scale.minHeight = 480;
    // this.game.scale.maxWidth = 768;
    // this.game.scale.maxHeight = 1152;


    //Ieslēdz Arcade fiziku
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    //Pārslēdzas uz Ielādēšanas logu
    this.state.start('Preload');
  }
};
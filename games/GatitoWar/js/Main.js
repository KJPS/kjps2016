var gameWidth = window.innerWidth;
var gameHeight = window.innerHeight;

var centerX = gameWidth/2;
var centerY = gameHeight/2;

var TankGame = TankGame || {};

TankGame.game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, '');



TankGame.game.state.add('Boot', TankGame.Boot);
TankGame.game.state.add('Preload', TankGame.Preload);
TankGame.game.state.add('Game', TankGame.Game);
TankGame.game.state.add('Menu', TankGame.Menu);
TankGame.game.state.add('Howtoplay', TankGame.Howtoplay);

TankGame.game.state.start('Boot');

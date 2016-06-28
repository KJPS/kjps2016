var TankGame = TankGame || {};
TankGame.Game = function(){};
//Game variables

var base1;
var base2;
var biome;

var money1 = 50, money2 = 50;

var gameIsOver = false;

var selectionSquare1, selectionSquare2;
var selPos1=0, selPos2=0;

var selectedEntity1=0, selectedEntity2=0;

var cards1 = [];
var cards2 = [];

var map = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];

var spritesBase1 = [];
var spritesBase2 = [];

var entitySpeeds = [0, 0.8, 1.0, 2.0, 0.4, 0.6];
var shootInterval = [
  [0,0],
  [1000,2500],//Karavīrs
  [2500,4500],//Pikaps
  [150,750],//Nindzja
  [1000, 2500],//Snaiperis
  [2000,4500]//Tanks
];

var coords = [ //virzieni (relatiivas koordinaatas), lai notiektu, kur shaut  ----  KAARTOT PEEC SVARIIGUMA (1. - vissvariigaakais)
  [ 1, 0],
  [ 0, 1],
  [ 0,-1],
  [-1, 0],
  [-1, 1],
  [ 1,-1],
  [-1,-1],
  [ 1, 1],
];

var coords_sniper = [
  [1, 0],//
  [2, 0],// Uz priekšu
  [3, 0],//
  [-1,0],// 
  [-2,0],// Uz atpakaļu
  [-3,0],// 
  [0, 1],// 
  [0, 2],// Uz leju
  [0, 3],//
  [0,-1],//
  [0,-2],// Uz augšu
  [0,-3],//
  [1,-1],//
  [2,-2],// Uz augšu slīpi
  [3,-3],//
  [1, 1],//
  [2, 2],// Uz leju slīpi
  [3, 3],//
  [-1,-1],//
  [-2,-2],// Uz augšu slīpi atpakaļ
  [-3,-3],//
  [-1, 1],//
  [-2, 2],// Uz leju slīpi atpakaļ
  [-3, 3],//

  [-2,-1],//
  [-2, 1],//
  [-1,-2],//
  [-1, 2],//
  [ 1,-2],// atziimeeti kartee ar plusiem
  [ 1, 2],//
  [ 2,-1],//
  [ 2, 1] //
];
//#..#..#
//.#+#+#.
//.+###+.
//###O###
//.+###+.
//.#+#+#.
//#..#..#

var shootPower =  [0,1,3,1,7,13];

var cost =    [0,5,25,75,80,100];
var reward =  [0,6,27,70,80,100];
var lives =   [0,4,8, 2, 7, 20];

var moneyText1;
var moneyText2;

var style;
var style2 = {font: "30px Arial", fill: "#ffffff"};

var entities = [];
var entityCount = 0;
var entityIsAlive = [];

if(JSON.parse(localStorage.getItem("options")).sounds){
  var volumeDefault = 0.2;
  var placeVolume = 0.2;
}else{
  var volumeDefault = 0.0;
  var placeVolume = 0.0;
}


var gameFieldX = (window.innerWidth-(61*15))/2;
var gameFieldY = (window.innerHeight-(61*10))/2;

TankGame.Game.prototype = {
  preload: function() {
      this.game.time.advancedTiming = true;
  },
  create: function() {


      biome = rnd(1,3);

      this.loadSounds();

      for(var i = 0; i<10;i++){
        for(var j = 0; j<15; j++){
          if(biome==1){
            this.game.stage.backgroundColor = '#ADB730';
            if(j==0)
              spritesBase1[i] = this.add.sprite( gameFieldX + 61*j, gameFieldY + 61*i,'grass_tex');
            else if(j==14)
              spritesBase2[i] = this.add.sprite( gameFieldX + 61*j, gameFieldY + 61*i,'grass_tex');
            else this.add.sprite( gameFieldX + 61*j, gameFieldY + 61*i,'grass_tex');
            style= {font: "24px Arial", fill: "#fff"}
          }else if(biome==2){
            if(j==0)
              spritesBase1[i] = this.add.sprite( gameFieldX + 61*j, gameFieldY + 61*i,'snow_tex');
            else if(j==14)
              spritesBase2[i] = this.add.sprite( gameFieldX + 61*j, gameFieldY + 61*i,'snow_tex');
            else this.add.sprite( gameFieldX + 61*j, gameFieldY + 61*i,'snow_tex');
              this.game.stage.backgroundColor = '#EBEBEB';

            style= {font: "24px Arial", fill: "#000"}
          }else{
            if(j==0)
              spritesBase1[i] = this.add.sprite( gameFieldX + 61*j, gameFieldY + 61*i,'sand_tex');
            else if(j==14)
              spritesBase2[i] = this.add.sprite( gameFieldX + 61*j, gameFieldY + 61*i,'sand_tex');
            else this.add.sprite( gameFieldX + 61*j, gameFieldY + 61*i,'sand_tex');
            this.game.stage.backgroundColor = '#BCC165';
            style= {font: "24px Arial", fill: "#fff"}
          }
        }
      }

      if(biome==2 && JSON.parse(localStorage.getItem("options")).particles){
        back_emitter = this.game.add.emitter(this.game.world.centerX, -32, 600);
        back_emitter.makeParticles('snowflakes', [0, 1, 2, 3, 4, 5]);
        back_emitter.maxParticleScale = 0.6;
        back_emitter.minParticleScale = 0.2;
        back_emitter.setYSpeed(20, 100);
        back_emitter.gravity = 0;
        back_emitter.width = this.game.world.width * 1.5;
        back_emitter.minRotation = 0;
        back_emitter.maxRotation = 40;

        mid_emitter = this.game.add.emitter(this.game.world.centerX, -32, 250);
        mid_emitter.makeParticles('snowflakes', [0, 1, 2, 3, 4, 5]);
        mid_emitter.maxParticleScale = 1.0;
        mid_emitter.minParticleScale = 0.7;
        mid_emitter.setYSpeed(50, 150);
        mid_emitter.gravity = 0;
        mid_emitter.width = this.game.world.width * 1.5;
        mid_emitter.minRotation = 0;
        mid_emitter.maxRotation = 40;

        front_emitter = this.game.add.emitter(this.game.world.centerX, -32, 50);
        front_emitter.makeParticles('snowflakes_large', [0, 1, 2, 3, 4, 5]);
        front_emitter.maxParticleScale = 0.6;
        front_emitter.minParticleScale = 0.2;
        front_emitter.setYSpeed(100, 200);
        front_emitter.gravity = 0;
        front_emitter.width = this.game.world.width * 1.5;
        front_emitter.minRotation = 0;
        front_emitter.maxRotation = 40;

        back_emitter.start(false, 14000, 20);
    mid_emitter.start(false, 12000, 40);
    front_emitter.start(false, 6000, 1000);
      }

      var border = this.add.sprite(gameFieldX-5,gameFieldY-5, 'border');
      border.width=915+10;
      border.height=609+10;

      base1 = this.add.sprite(gameFieldX, gameFieldY, 'base');
      base1.health = 100;
      base1.scale.setTo(0.5);

      base2 = this.add.sprite(15+gameFieldX+15*60, gameFieldY, 'base');
      base2.scale.setTo(-0.5,0.5);
      base2.health = 100;


      var coinP1 = this.add.sprite(5,8,'coin');
      coinP1.width = 20;
      coinP1.height = 20;
      moneyText1 = this.game.add.text(30,7,money1,style);

      var heartP1 = this.add.sprite(5,32,'heart');
      heartP1.width = 20;
      heartP1.height = 20;
      healthText1 = this.game.add.text(30,30,base1.health,style);

      var coinP2 = this.add.sprite(gameFieldX+(15*61)+10 ,8,'coin');
      coinP2.width = 20;
      coinP2.height = 20;
      moneyText2 = this.game.add.text(gameFieldX+(15*61)+35,7,money2,style);

      var heartP2 = this.add.sprite(gameFieldX+(15*61)+10,32,'heart');
      heartP2.width = 20;
      heartP2.height = 20;
      healthText2 = this.game.add.text(gameFieldX+(15*61)+35,30,base2.health,style);

      //Show names
      var names = localStorage.getItem('player_names');
      names = JSON.parse(names);
      var name1 = this.game.add.text(10,window.innerHeight-35,names.name1,style);
      var name2 = this.game.add.text(gameFieldX+61*15+15,window.innerHeight-35,names.name2,style);
      

      cards1[0] = this.game.add.sprite(10,55,'card1');
      cards2[0] = this.game.add.sprite(gameFieldX+(15*61)+12 ,55,'card1');

      cards1[1] = this.game.add.sprite(80,55,'card2');
      cards2[1] = this.game.add.sprite(gameFieldX+(15*61)+84 ,55,'card2');

      cards1[2] = this.game.add.sprite(10,140,'card3');
      cards2[2] = this.game.add.sprite(gameFieldX+(15*61)+12 ,140,'card3');

      cards1[3] = this.game.add.sprite(80,140,'card4');
      cards2[3] = this.game.add.sprite(gameFieldX+(15*61)+84 ,140,'card4');

      cards1[4] = this.game.add.sprite(10,230,'card5');
      cards2[4] = this.game.add.sprite(gameFieldX+(15*61)+12 ,230,'card5');


    selectionSquare1 = this.game.add.sprite((gameFieldX+61),gameFieldY, 'grass_tex_selected');
    selectionSquare2 = this.game.add.sprite((gameFieldX+61*13),gameFieldY, 'grass_tex_selected');

    
    //Izsauc funkciju kas saliek visus taustiņus
    this.setKeys();
  },


  update: function() {

    if(!gameIsOver){
//------------------------------------------------Saliek kartē -1 ---------------------
      for(var i = 0; i<10; i++){
        for(var j = 0; j<15; j++){
          map[i][j] = -1;
        }
      }
      for(var i = 0; i<entityCount; i++){
        if(entityIsAlive[i])
          map[ Math.floor((entities[i].position.y-gameFieldY)/61) ][ Math.floor((entities[i].position.x-gameFieldX)/61) ] = i;
      }

      //Iet cauri visiem entitijiem.........................................................................................................
      for(var i = 0; i<entityCount; i++){
        if(!entityIsAlive[i]) continue;

        if(entities[i].rotation!=0 && entities[i].targ == -1){
          rotation = 0; 
        }

        var entPosX = Math.floor((entities[i].position.x-gameFieldX)/61);
        var entPosY = Math.floor((entities[i].position.y-gameFieldY)/61);

        //ja šauj pa bāzi
        if(entities[i].targ == -2) continue;

        if(entities[i].team == 1){

          // console.log(entities[i].targ);

          if( entities[i].targ > -1 && entities[i].kind != 3){
            entities[i].rotation = this.game.physics.arcade.angleBetween(entities[i], entities[ entities[i].targ ]);
          }

          if(entPosX == 13 && entities[i].targ != -2){ // Shauj pa baazi
            entities[i].targ = -2;
            this.fireBase(i, entPosY,entities[i].team);
            continue;
          }

          if( entities[i].targ!=-1 && !entityIsAlive[ entities[i].targ ] ){
            entities[i].targ = -1;
            entities[i].rotation = 0;
            if(entities[i].kind == 1){
              entities[i].loadTexture('gunman_walk', [0,1], false);
              entities[i].animations.add('walko');
              entities[i].animations.play('walko',7,true);
              entities[i].animations.paused = false;
            }
          }

          if(entities[i].targ == -1){
            var atrasts = false;

            //šaušana

            if(entities[i].kind==4){
              for(var j = 0; j<32; j++){
                var cordNewX = entPosX + coords_sniper[j][0];
                var cordNewY = entPosY + coords_sniper[j][1];
                if(cordNewY<0 || cordNewY>9 || cordNewX<0 || cordNewX>14) continue;

                if( map[cordNewY][cordNewX]!=-1 && entities[ map[cordNewY][cordNewX] ].team  != entities[i].team){
                  entities[i].targ = map[cordNewY][cordNewX];
                  atrasts = true;
                  break;
                }
              }
            }else{
              for(var j = 0; j<8; j++){
                var cordNewX = entPosX + coords[j][0];
                var cordNewY = entPosY + coords[j][1];
                if(cordNewY<0 || cordNewY>9 || cordNewX<0 || cordNewX>14) continue;

                if( map[cordNewY][cordNewX]!=-1 && entities[ map[cordNewY][cordNewX] ].team  != entities[i].team){
                  entities[i].targ = map[cordNewY][cordNewX];
                  atrasts = true;
                  break;
                }
              }
            }

            if(atrasts) {
              if( entities[i].kind==1 ){
                entities[i].loadTexture('gunman_shoot');
              }
              if( entities[i].kind != 3 ){
                entities[i].rotation = this.game.physics.arcade.angleBetween(entities[i], entities[ entities[i].targ ]);
              }
              this.fire(i, entities[i].targ, true);

            }
          }

          if( entities[i].targ == -1 )
          if( map[entPosY][entPosX+1]==-1 ){
            if(entities[i].dirc!=1){
              entities[i].dirc = 1;
              this.rotate(i);
            }
            entities[i].position.x += entitySpeeds[ entities[i].kind ];
          } else {
            if(entities[i].dirc == 0 ){
              if(entPosY!=0 && map[entPosY-1][entPosX] == -1){
                entities[i].position.y -= entitySpeeds[ entities[i].kind ];
              } else if( entPosY!=9 && map[entPosY+1][entPosX] == -1){
                dirc = 1;
                this.rotate(i);
              }
            }          
            if(entities[i].dirc == 2 ){
              if(entPosY!=9 && map[entPosY+1][entPosX] == -1){
                entities[i].position.y += entitySpeeds[ entities[i].kind ];
              } else if( entPosY!=0 && map[entPosY-1][entPosX] == -1 ){
                dirc = 1;
                this.rotate(i);
              }
            }

            if(entities[i].dirc = 1){
              var downBest = -1;
              for(var j = entPosY+1; j<10; j++){
                if( map[j][entPosX]!=-1 ) break;
                if( map[j][entPosX+1] != entities[i].team ){
                  downBest = j;
                  break;
                }
              }
              var upBest = -1;
              for(var j = entPosY-1; j>=0; j--){
                if( map[j][entPosX]!=-1 ) break;
                if( map[j][entPosX+1] != entities[i].team ){
                  upBest = j;
                  break;
                }
              }

              if( downBest==-1 ) entities[i].dirc = 0;
              if( upBest==-1 ) entities[i].dirc = 2;

              if( downBest != -1 && upBest != -1){
                if( Math.abs( entPosY-downBest ) < Math.abs( entPosY-upBest ) ){
                  entities[i].dirc = 2;
                } else{
                  entities[i].dirc = 0;
                }
              }
              this.rotate(i);

            }
          }

        }


        if(entities[i].team == 2){

          if( entities[i].targ > -1  && entities[i].kind != 3){
            entities[i].rotation = this.game.physics.arcade.angleBetween(entities[ entities[i].targ ], entities[i]);
          }

          if(entPosX == 1 && entities[i].targ != -2){ // Shauj pa baazi
            entities[i].targ = -2;
            this.fireBase(i, entPosY,entities[i].team);
            continue;
          }

          if( entities[i].targ!=-1 && !entityIsAlive[ entities[i].targ ] ){
            entities[i].targ = -1;
            entities[i].rotation = 0;
            if(entities[i].kind == 1){
              entities[i].loadTexture('gunman_walk_blue', [0,1], false);
              entities[i].animations.add('walko');
              entities[i].animations.play('walko',7,true);
              entities[i].scale.setTo(-1,1);
              entities[i].animations.paused = false;
            }
          }

        //šaušana
          if(entities[i].targ == -1){
            var atrasts = false;

            if(entities[i].kind==4){
              for(var j = 0; j<32; j++){
                var cordNewX = entPosX + coords_sniper[j][0];
                var cordNewY = entPosY + coords_sniper[j][1];
                if(cordNewY<0 || cordNewY>9 || cordNewX<0 || cordNewX>14) continue;

                if( map[cordNewY][cordNewX]!=-1 && entities[ map[cordNewY][cordNewX] ].team  != entities[i].team){
                  entities[i].targ = map[cordNewY][cordNewX];
                  atrasts = true;
                  break;
                }
              }
            }else{
              for(var j = 0; j<8; j++){
                var cordNewX = entPosX + coords[j][0];
                var cordNewY = entPosY + coords[j][1];
                if(cordNewY<0 || cordNewY>9 || cordNewX<0 || cordNewX>14) continue;

                if( map[cordNewY][cordNewX]!=-1 && entities[ map[cordNewY][cordNewX] ].team  != entities[i].team){
                  entities[i].targ = map[cordNewY][cordNewX];
                  atrasts = true;
                  break;
                }
              }
            }


            if(atrasts) {
              if( entities[i].kind==1 ){
                entities[i].loadTexture('gunman_shoot_blue');
              }

              if(  entities[i].kind != 3 ){
                entities[i].rotation = this.game.physics.arcade.angleBetween(entities[i], entities[ entities[i].targ ]);
              }
              this.fire(i, entities[i].targ,true);
            }

          }

          if( entities[i].targ == -1 )
          if( map[entPosY][entPosX-1]==-1 ){
            if(entities[i].dirc != 1){
              entities[i].dirc = 1;
              this.rotate(i);
            }
            entities[i].position.x -= entitySpeeds[ entities[i].kind ];
          } else {
            if(entities[i].dirc == 0 ){
              if(entPosY!=0 && map[entPosY-1][entPosX] == -1){
                entities[i].position.y -= entitySpeeds[ entities[i].kind ];
              } else if( entPosY!=9 && map[entPosY+1][entPosX] == -1){
                dirc = 2;
                this.rotate(i);
              }
            }          
            if(entities[i].dirc == 2 ){
              if(entPosY!=9 && map[entPosY+1][entPosX] == -1){
                entities[i].position.y += entitySpeeds[ entities[i].kind ];
              } else if( entPosY!=0 && map[entPosY-1][entPosX] == -1){
                dirc = 0;
                this.rotate(i);
              }
            }

            if(entities[i].dirc = 1){
              var downBest = -1;
              for(var j = entPosY+1; j<10; j++){
                if( map[j][entPosX]!=-1 ) break;
                if( map[j][entPosX-1] != entities[i].team ){
                  downBest = j;
                  break;
                }
              }
              var upBest = -1;
              for(var j = entPosY-1; j>=0; j--){
                if( map[j][entPosX]!=-1 ) break;
                if( map[j][entPosX-1] != entities[i].team ){
                  upBest = j;
                  break;
                }
              }

              if( downBest==-1 ) entities[i].dirc = 0;
              if( upBest==-1 ) entities[i].dirc = 2;

              if( downBest != -1 && upBest != -1){
                if( Math.abs( entPosY-downBest ) < Math.abs( entPosY-upBest ) ){
                  entities[i].dirc = 2;
                } else{
                  entities[i].dirc = 0;
                }
              }
              this.rotate(i);

            }
          }
        }
      }

    }
    

    /*var cons = "";
    for(var i = 0; i<10; i++){
      for(var j = 0; j<15; j++){
        cons = cons + map[i][j] + " ";
      }
      cons = cons + "\n";
    }
    console.log(cons);*/

    
  },

  render: function(){
   // this.game.debug.text(this.game.time.fps, 100, 500, "#fff")
  },

  buy: function(player){
    if(!gameIsOver){
      if(player==1){

        if(map[selPos1][1] != -1 && entities[ map[selPos1][1] ].team==player ) return;

        money1 -= cost[selectedEntity1];
        this.refreshMoney();

        if(selectedEntity1==1){



          entities[entityCount] = this.game.add.sprite(gameFieldX+61+30,gameFieldY+(61*selPos1)+30,'gunman_walk');
          var walk = entities[entityCount].animations.add('walk');
          entities[entityCount].animations.play('walk',7,true);

          entities[entityCount].team = 1;
          entities[entityCount].kind = 1;
          entities[entityCount].health = 4;
          entities[entityCount].anchor.setTo(0.5);
          entities[entityCount].dirc = 1;
          entities[entityCount].targ = -1;

          entityIsAlive[entityCount] = true;
          entityCount++;
        
          selEnabled1 = false;      
        }
        if(selectedEntity1==2){

          entities[entityCount] = this.game.add.sprite(gameFieldX+61+30,gameFieldY+(61*selPos1)+30,'pickup_tex');
          var ride = entities[entityCount].animations.add('ride');
          entities[entityCount].animations.play('ride',5,true);
          entities[entityCount].team = 1;
          entities[entityCount].kind = 2;
          entities[entityCount].health = 14;
          entities[entityCount].anchor.setTo(0.5);
          entities[entityCount].dirc = 1;
          entities[entityCount].targ = -1;

          entityIsAlive[entityCount] = true;
          entityCount++;
        
          selEnabled1 = false;      
        }
        if(selectedEntity1==3){
          entities[entityCount] = this.game.add.sprite(gameFieldX+61+30,gameFieldY+(61*selPos1)+30,'ninja_walk');
          var walk = entities[entityCount].animations.add('walk');
          entities[entityCount].animations.play('walk',7,true);

          entities[entityCount].team = 1;
          entities[entityCount].kind = 3;
          entities[entityCount].health = 2;
          entities[entityCount].anchor.setTo(0.5);
          entities[entityCount].dirc = 1;
          entities[entityCount].targ = -1;

          entityIsAlive[entityCount] = true;
          entityCount++;
        
          selEnabled1 = false;      
        }
        if(selectedEntity1==4){
          entities[entityCount] = this.game.add.sprite(gameFieldX+61+30,gameFieldY+(61*selPos1)+30,'sniper_walk');
          var walk = entities[entityCount].animations.add('walk');
          entities[entityCount].animations.play('walk',3,true);

          entities[entityCount].team = 1;
          entities[entityCount].kind = 4;
          entities[entityCount].health = 7;
          entities[entityCount].anchor.setTo(0.5);
          entities[entityCount].dirc = 1;
          entities[entityCount].targ = -1;

          entityIsAlive[entityCount] = true;
          entityCount++;
        
          selEnabled1 = false;      
        }
        if(selectedEntity1==5){

          entities[entityCount] = this.game.add.sprite(gameFieldX+61+30,gameFieldY+(61*selPos1)+30,'tank_tex');
          var ride = entities[entityCount].animations.add('ride');
          entities[entityCount].animations.play('ride',5,true);
          entities[entityCount].team = 1;
          entities[entityCount].kind = 5;
          entities[entityCount].health = 14;
          entities[entityCount].anchor.setTo(0.5);
          entities[entityCount].dirc = 1;
          entities[entityCount].targ = -1;

          entityIsAlive[entityCount] = true;
          entityCount++;
        
          selEnabled1 = false;      
        }
      }
      if(player==2){

        if(map[selPos2][13] != -1 && entities[ map[selPos2][13] ].team==player ) return;

        money2 -= cost[selectedEntity2];
        this.refreshMoney();
        
        if(selectedEntity2==1){

          entities[entityCount] = this.game.add.sprite(gameFieldX+61*13+30,gameFieldY+(61*selPos2)+30,'gunman_walk_blue');
          var walk = entities[entityCount].animations.add('walk');
          entities[entityCount].animations.play('walk',7,true);
          entities[entityCount].scale.setTo(-1,1);
          entities[entityCount].team = 2;
          entities[entityCount].kind = 1;
          entities[entityCount].health = 4;
          entities[entityCount].anchor.setTo(0.5);
          entities[entityCount].dirc = 1;
          entities[entityCount].targ = -1;

          entityIsAlive[entityCount] = true;
          entityCount++;
          

          selEnabled2 = false;
        }
        if(selectedEntity2==2){

          entities[entityCount] = this.game.add.sprite(gameFieldX+61*13+30,gameFieldY+(61*selPos2)+30,'pickup_tex_blue');
          var ride = entities[entityCount].animations.add('ride');
          entities[entityCount].scale.setTo(-1,1);
          entities[entityCount].animations.play('ride',5,true);
          entities[entityCount].team = 2;
          entities[entityCount].kind = 2;
          entities[entityCount].health = 14;
          entities[entityCount].anchor.setTo(0.5);
          entities[entityCount].dirc = 1;
          entities[entityCount].targ = -1;

          entityIsAlive[entityCount] = true;
          entityCount++;
        
          selEnabled2 = false;      
        }
        if(selectedEntity2==3){
          entities[entityCount] = this.game.add.sprite(gameFieldX+61*13+30,gameFieldY+(61*selPos2)+30,'ninja_walk_blue');
          var walk = entities[entityCount].animations.add('walk');
          entities[entityCount].scale.setTo(-1,1);
          entities[entityCount].animations.play('walk',7,true);
          entities[entityCount].team = 2;
          entities[entityCount].kind = 3;
          entities[entityCount].health = 2;
          entities[entityCount].anchor.setTo(0.5);
          entities[entityCount].dirc = 1;
          entities[entityCount].targ = -1;

          entityIsAlive[entityCount] = true;
          entityCount++;
        
          selEnabled2 = false;         
        }
        if(selectedEntity2==4){
          entities[entityCount] = this.game.add.sprite(gameFieldX+61*13+30,gameFieldY+(61*selPos2)+30,'sniper_walk_blue');
          var walk = entities[entityCount].animations.add('walk');
          entities[entityCount].scale.setTo(-1,1);
          entities[entityCount].animations.play('walk',3,true);
          entities[entityCount].team = 2;
          entities[entityCount].kind = 4;
          entities[entityCount].health = 7;
          entities[entityCount].anchor.setTo(0.5);
          entities[entityCount].dirc = 1;
          entities[entityCount].targ = -1;

          entityIsAlive[entityCount] = true;
          entityCount++;
        
          selEnabled2 = false;      
        }
        if(selectedEntity2==5){

          entities[entityCount] = this.game.add.sprite(gameFieldX+61*13+30,gameFieldY+(61*selPos2)+30,'tank_tex_blue');
          var ride = entities[entityCount].animations.add('ride');
          entities[entityCount].scale.setTo(-1,1);
          entities[entityCount].animations.play('ride',5,true);
          entities[entityCount].team = 2;
          entities[entityCount].kind = 5;
          entities[entityCount].health = 14;
          entities[entityCount].anchor.setTo(0.5);
          entities[entityCount].dirc = 1;
          entities[entityCount].targ = -1;

          entityIsAlive[entityCount] = true;
          entityCount++;
        
          selEnabled2 = false;      
        }
      }

      sound_place.play();
    }
  },

  refreshMoney: function(){
    moneyText1.text = money1;
    moneyText2.text = money2;
  },

  hit: function(team,damage){
    if(team==2){
     // this.game.camera.flash("0xDB2C2C");
      base1.health-=damage;

      money2 += damage;
      this.refreshMoney();

      if(base1.health<=0){
        base1.health=0;
      }
      healthText1.text = base1.health;
    }else{
      //this.game.camera.flash("0x2C3ADB");
      base2.health-=damage;

      money1 += damage;
      this.refreshMoney();

      if(base2.health<=0){
        base2.health=0;
      }
      healthText2.text = base2.health;
    }
  },

  rotate: function(player){
      
      if( entities[player].targ == -1 && (entities[player].kind == 2 || entities[player].kind == 5 || entities[player].kind == 4)){
        //console.log('fnk rotate');
        if( entities[player].dirc == 1 ){
          this.game.add.tween( entities[player] ).to( { angle: 0 }, 500, "Linear", true);
        }
        if( entities[player].dirc == 0 ){
          this.game.add.tween( entities[player] ).to( { angle: -90 }, 500, "Linear", true);
        }
        if( entities[player].dirc == 2 ){
          this.game.add.tween( entities[player] ).to( { angle: 90 }, 500, "Linear", true); 
        }
      }
  },

  fire: function(x, y, firstTime){
    if(!gameIsOver){

      if(!firstTime){

        var bullet;
        var bullet2;
        var tviins;
        var tviins2;

        bullet = this.game.add.sprite( entities[x].position.x, entities[x].position.y, 'bullet' );
        tviins = this.game.add.tween( bullet ).to( {x: entities[y].position.x , y: entities[y].position.y}, 400, "Linear", true);

        if(entities[x].kind==2){
          bullet2 = this.game.add.sprite( entities[x].position.x, entities[x].position.y, 'bullet' );
          tviins2 = this.game.add.tween( bullet2 ).to( {x: entities[y].position.x , y: entities[y].position.y}, 600, "Linear", true);
        }

      if(entities[x].kind==1)sound_gunshot.play();
      if(entities[x].kind==2)sound_pickupshot.play();
      if(entities[x].kind==3)sound_ninjashot.play();
      if(entities[x].kind==4)sound_snipershot.play();
      if(entities[x].kind==5)sound_tankshot.play();
      //console.log(entities[x].kind);

        tviins.onComplete.add( function(){
          bullet.destroy();
          entities[y].health -= shootPower[ entities[x].kind ]*2;

          if(entities[x].kind==2)bullet2.destroy();

          if( entities[y].health <=0 ){
          
            entityIsAlive[y] = false;
            entities[y].destroy();

            if(entities[x].team==1){
              money1+=reward[entities[y].kind];
              moneyText1.text=money1;
            }else{
              money2+=reward[entities[y].kind];
              moneyText2.text=money2;
            }

                //Maacaas
            // if(entities[x].team==1){
            //   learning[entities[x].kind][0]++;
            // }else{
            //   learning2[entities[x].kind][0]++;
            // }
                

            if(entities[y].kind==5 || entities[y].kind==2){ //   SPRAADZIENS
              sound_explosion.play();
          
              var temp_explosion = this.game.add.sprite(entities[y].position.x,entities[y].position.y,'explosion');
              temp_explosion.anchor.setTo(0.5);
              var explode = temp_explosion.animations.add('explode');
              temp_explosion.animations.play('explode',14,false);
              temp_explosion.animations.currentAnim.onComplete.add(function () {
                temp_explosion.animations.stop(null, true);  
                temp_explosion.destroy();
              }, this);
            }else{
              var angel = this.game.add.sprite(entities[y].position.x,entities[y].position.y,'angel');
              angel.anchor.setTo(0.5);
              var fly = angel.animations.add('fly');
              angel.animations.play('fly',12,true);

              var tween_angel = this.game.add.tween( angel ).to( {alpha: 0 , y: entities[x].position.y-100}, 500, "Linear", true);
            
              tween_angel.onComplete.add( function(){
                angel.destroy();
              },this);

            }
          }
        },this);
      }

      this.game.time.events.add( rnd( shootInterval[ entities[x].kind ][0],shootInterval[ entities[x].kind ][1] ), function(){
        if(entityIsAlive[x] && entityIsAlive[y]){
          this.fire(x,y,false);
        }
      }, this);
    }
  },

  fireBase: function(x,y,team){
    if(!gameIsOver){
      var bullet = this.game.add.sprite( entities[x].position.x, entities[x].position.y, 'bullet' );
      var tviins;
      if(team==1){
        tviins = this.game.add.tween( bullet ).to( {x: spritesBase2[y].position.x +30, y: spritesBase2[y].position.y +30}, 700, "Linear", true);
      }
      else{
        tviins = this.game.add.tween( bullet ).to( {x: spritesBase1[y].position.x +30, y: spritesBase1[y].position.y +30}, 700, "Linear", true);
      }

      tviins.onComplete.add( function(){
        bullet.destroy();
        this.hit(team, shootPower[ entities[x].kind ]);
        if(base2.health<=0){
          this.gameOver(team);
        }
        if(base1.health<=0){
          this.gameOver(team);
        }
      },this);


      if(entities[x].kind==1)sound_gunshot.play("",volumeDefault);
      if(entities[x].kind==2)sound_tankshot.play("",volumeDefault);
      if(entities[x].kind==3)sound_ninjashot.play("",volumeDefault);
      if(entities[x].kind==4)sound_snipershot.play("",volumeDefault);
      if(entities[x].kind==5)sound_tankshot.play("",volumeDefault);

      if(team == 1){
        this.game.time.events.add( rnd( shootInterval[ entities[x].kind ][0],shootInterval[ entities[x].kind ][1] ), function(){
          if(entityIsAlive[x] && base2.health>0){
            this.fireBase(x,y,team);
          }
        }, this);
      } else {
        this.game.time.events.add( rnd( shootInterval[ entities[x].kind ][0],shootInterval[ entities[x].kind ][1] ), function(){
          if(entityIsAlive[x] && base1.health>0){
            this.fireBase(x,y,team);
          }
        }, this);
      }
    }
  },

  gameOver: function(team){
    if(!gameIsOver){
      var panel = this.game.add.sprite(window.innerWidth/2,window.innerHeight/2,'panel');
      panel.anchor.setTo(0.5);

      var winner = this.game.add.sprite(window.innerWidth/2+10,window.innerHeight/2+35, "gunman"+team);
      winner.scale.setTo(0.4);
      winner.anchor.setTo(0.5);
      if(team==1)
        winnerText = this.game.add.text(window.innerWidth/2-120,panel.y+110,JSON.parse(localStorage.getItem("player_names")).name1,style2);
      else
        winnerText = this.game.add.text(window.innerWidth/2-120,panel.y+110,JSON.parse(localStorage.getItem("player_names")).name2,style2);

      winnerText.x = Math.floor(window.innerWidth/2) - Math.floor(winnerText.width/2);

      gameIsOver = true;
    }
  },

  loadSounds: function(){
    sound_gunshot = this.game.add.audio('gunshot');
    sound_gunshot.allowMultiple = true;
    sound_gunshot.volume = volumeDefault;

    sound_pickupshot = this.game.add.audio('pickupshot');
    sound_pickupshot.allowMultiple = true;
    sound_pickupshot.volume = volumeDefault;

    sound_tankshot = this.game.add.audio('tankshot');
    sound_tankshot.allowMultiple = true;
    sound_tankshot.volume = volumeDefault;

    sound_ninjashot = this.game.add.audio('ninjashot');
    sound_ninjashot.allowMultiple = true;
    sound_ninjashot.volume = volumeDefault;

    sound_snipershot = this.game.add.audio('snipershot');
    sound_snipershot.allowMultiple = true;
    sound_snipershot.volume = volumeDefault;

    sound_explosion = this.game.add.audio('tankexplosion');
    sound_explosion.allowMultiple = true;
    sound_explosion.volume = volumeDefault;

    sound_place = this.game.add.audio('place');
    sound_place.allowMultiple = true;
    sound_place.volume = placeVolume;


  if(JSON.parse(localStorage.getItem("options")).music){
    music.stop();
    window.music_playing=false;

    if(biome==1){
        music = this.game.add.audio('music_normal');
        music.play();
        music.volume = 0.5;
        window.music_playing=true;
      }else if(biome==2){
        music = this.game.add.audio('music_winter');
        music.play();
        music.volume = 0.5;
        window.music_playing=true;
      }else{
        music = this.game.add.audio('music_desert');
        music.play();
        music.volume = 0.3;
        window.music_playing=true;
      }
  }

},

  setKeys: function(){
    var oneKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    oneKey.onDown.add(function(){
      if(money1>=cost[1] ){
        selectedEntity1=1;
        this.buy(1);
      }
    }, this);

    var twoKey = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO);
    twoKey.onDown.add(function(){
      if(money1>=cost[2]){
        selectedEntity1=2;
        this.buy(1);
      }
    }, this);

    var threeKey = this.game.input.keyboard.addKey(Phaser.Keyboard.THREE);
    threeKey.onDown.add(function(){
      if(money1>=cost[3]){
        selectedEntity1=3;
        this.buy(1);
      }
    }, this);

    var fourKey = this.game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
    fourKey.onDown.add(function(){
      if(money1>=cost[4]){
        selectedEntity1=4;
        this.buy(1);
      }
    }, this);

    var fiveKey = this.game.input.keyboard.addKey(Phaser.Keyboard.FIVE);
    fiveKey.onDown.add(function(){
      if(money1>=cost[5]){
        selectedEntity1=5;
        this.buy(1);
      }
    }, this);


    var oneKeyNumpad = this.game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_1);
    oneKeyNumpad.onDown.add(function(){
      if(money2>=cost[1]){
        selectedEntity2=1;
        this.buy(2);
      }
    }, this);

    var twoKeyNumpad = this.game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_2);
    twoKeyNumpad.onDown.add(function(){
      if(money2>=cost[2]){
        selectedEntity2=2;
        this.buy(2);
      }
    }, this);

    var threeKeyNumpad = this.game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_3);
    threeKeyNumpad.onDown.add(function(){
      if(money2>=cost[3]){
        selectedEntity2=3;
        this.buy(2);
      }
    }, this);

    var fourKeyNumpad = this.game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_4);
    fourKeyNumpad.onDown.add(function(){
      if(money2>=cost[4]){
        selectedEntity2=4;
        this.buy(2);
      }
    }, this);

    var fiveKeyNumpad = this.game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_5);
    fiveKeyNumpad.onDown.add(function(){
      if(money2>=cost[5]){
        selectedEntity2=5;
        this.buy(2);
      }
    }, this);

    //Kustina izveeles lauku
    var wKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    wKey.onDown.add(function(){
      if(selPos1>0)selPos1--;
      else selPos1=9;
      selectionSquare1.position.y = (gameFieldY)+61*selPos1;
    }, this);

    var sKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    sKey.onDown.add(function(){
      if(selPos1<9)selPos1++;
      else selPos1=0;
      selectionSquare1.position.y = (gameFieldY)+61*selPos1;
    }, this);

    var upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    upKey.onDown.add(function(){
      if(selPos2>0)selPos2--;
      else selPos2=9;
      selectionSquare2.position.y = (gameFieldY)+61*selPos2;
    }, this);

    var downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    downKey.onDown.add(function(){
      if(selPos2<9)selPos2++;
      else selPos2=0;
      selectionSquare2.position.y = (gameFieldY)+61*selPos2;
    }, this);
  }
  

};

function rnd(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
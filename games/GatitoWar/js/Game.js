var TankGame = TankGame || {};
TankGame.Game = function(){};
//Game variables

var base1;
var base2;

var money1 = 60, money2 = 60;


var selEnabled1=false, selEnabled2=false;

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

var entitySpeeds = [0, 0.8, 0.6];
var shootInterval = [
  [0,0],
  [1000,2500],
  [2000,4500]
];

var learning = [
  [0,0],
  [0,10],
  [0,20]
];
var learning2 = [
  [0,0],
  [0,10],
  [0,20]
];

var shootPower =  [0,2,10];

var cost =  [0,5,25];
var reward =  [0,7,30];

var moneyText1;
var moneyText2;

var style;
var style2 = {font: "40px Arial", fill: "#ffffff"};

var entities = [];
var entityCount = 0;
var entityIsAlive = [];

var gameFieldX = (window.innerWidth-(61*15))/2;
var gameFieldY = (window.innerHeight-(61*10))/2;

TankGame.Game.prototype = {
  preload: function() {
      this.game.time.advancedTiming = true;
  },
  create: function() {


      var biome = rnd(1,3);

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
            else this.add.sprite( gameFieldX + 61*j, gameFieldY + 61*i,'grass_tex');
              this.game.stage.backgroundColor = '#EBEBEB';

            style= {font: "24px Arial", fill: "#000"}
          }else{
            if(j==0)
              spritesBase1[i] = this.add.sprite( gameFieldX + 61*j, gameFieldY + 61*i,'sand_tex');
            else if(j==14)
              spritesBase2[i] = this.add.sprite( gameFieldX + 61*j, gameFieldY + 61*i,'sand_tex');
            else this.add.sprite( gameFieldX + 61*j, gameFieldY + 61*i,'grass_tex');
            this.game.stage.backgroundColor = '#BCC165';
            style= {font: "24px Arial", fill: "#fff"}
          }
        }
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

      

      cards1[0] = this.game.add.sprite(5,55,'card1');
      cards2[0] = this.game.add.sprite(gameFieldX+(15*61)+10 ,55,'card1');

      cards1[1] = this.game.add.sprite(70,55,'card2');
      cards2[1] = this.game.add.sprite(gameFieldX+(15*61)+80 ,55,'card2');

      /*var testGunman = this.add.sprite(100, 100, 'gunman_walk');
      var walk = testGunman.animations.add('walk');
      testGunman.animations.play('walk',15,true);*/

    var oneKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    oneKey.onDown.add(function(){
      if(!selEnabled1 && money1>=cost[1] ){
        selEnabled1=true;
        selectedEntity1=1;
        selectionSquare1 = this.game.add.sprite((gameFieldX+61),gameFieldY+61*selPos1, 'grass_tex_selected');
      }
    }, this);

    var twoKey = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO);
    twoKey.onDown.add(function(){
      if(!selEnabled1 && money1>=cost[2]){
        selEnabled1=true;
        selectedEntity1=2;
        selectionSquare1 = this.game.add.sprite((gameFieldX+61),gameFieldY+61*selPos1, 'grass_tex_selected');
      }
    }, this);


    var oneKeyNumpad = this.game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_1);
    oneKeyNumpad.onDown.add(function(){
      if(!selEnabled2 && money2>=cost[1]){
        selEnabled2=true;
        selectedEntity2=1;
        selectionSquare2 = this.game.add.sprite((gameFieldX+61*13),gameFieldY+61*selPos2, 'grass_tex_selected');
      }
    }, this);

    var twoKeyNumpad = this.game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_2);
    twoKeyNumpad.onDown.add(function(){
      if(!selEnabled2 && money2>=cost[2]){
        selEnabled2=true;
        selectedEntity2=2;
        selectionSquare2 = this.game.add.sprite((gameFieldX+61*13),gameFieldY+61*selPos2, 'grass_tex_selected');
      }
    }, this);

    var spacebarKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spacebarKey.onDown.add(function(){
      if(selEnabled1){
        this.buy(1);
      }
    }, this);

    var enterKeyNumpad = this.game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_ADD);
    enterKeyNumpad.onDown.add(function(){
      if(selEnabled2){
        this.buy(2);
      }
    }, this);


    //Kustina izveeles lauku
    var wKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    wKey.onDown.add(function(){
      if(selEnabled1){
        if(selPos1>0)selPos1--;
        else selPos1=9;
        selectionSquare1.position.y = (gameFieldY)+61*selPos1;
      }
    }, this);
    var sKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    sKey.onDown.add(function(){
      if(selEnabled1){
        if(selPos1<9)selPos1++;
        else selPos1=0;
        selectionSquare1.position.y = (gameFieldY)+61*selPos1;
      }
    }, this);
    var upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    upKey.onDown.add(function(){
      if(selEnabled2){
        if(selPos2>0)selPos2--;
        else selPos2=9;
        selectionSquare2.position.y = (gameFieldY)+61*selPos2;
      } 
    }, this);
    var downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    downKey.onDown.add(function(){
      if(selEnabled2){
        if(selPos2<9)selPos2++;
        else selPos2=0;
        selectionSquare2.position.y = (gameFieldY)+61*selPos2;
      }
    }, this);
  },


  update: function() {

    for(var i = 0; i<10; i++){
      for(var j = 0; j<15; j++){
        map[i][j] = -1;
      }
    }
    for(var i = 0; i<entityCount; i++){
      if(entityIsAlive[i])
        map[ Math.floor((entities[i].position.y-gameFieldY)/61) ][ Math.floor((entities[i].position.x-gameFieldX)/61) ] = i;
    }

    /*var cons = "";
    for(var i = 0; i<10; i++){
      for(var j = 0; j<15; j++){
        cons = cons + map[i][j] + " ";
      }
      cons = cons + "\n";
    }
    console.log(cons);*/

    //Iet cauri visiem entitijiem......................................................................
    for(var i = 0; i<entityCount; i++){
      if(!entityIsAlive[i]) continue;

      if(entities[i].team == 1){

        var entPosX = Math.floor((entities[i].position.x-gameFieldX)/61);
        var entPosY = Math.floor((entities[i].position.y-gameFieldY)/61);
        
        if(entPosX == 13 && entities[i].targ != -2){

          entities[i].targ = -2;
          this.fireBase(i, entPosY,entities[i].team);
          console.log('saak shaut');
          continue;
        }

        if(entities[i].targ == -2) continue;

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
          if( entPosX<9 && map[entPosY][entPosX+1]!=-1 && entities[ map[entPosY][entPosX+1] ].team  != entities[i].team){
            entities[i].targ = map[entPosY][entPosX+1];
            atrasts = true;
          }

          if( entPosX>0 && map[entPosY][entPosX-1]!=-1 && entities[ map[entPosY][entPosX-1] ].team  != entities[i].team){
            entities[i].targ = map[entPosY][entPosX-1];
            atrasts = true;
          }
          if(entPosY<9 && map[entPosY+1][entPosX]!=-1 && entities[ map[entPosY+1][entPosX] ].team != entities[i].team){
            entities[i].targ = map[entPosY+1][entPosX];
            atrasts = true;
          }
          if(entPosY>0 && map[entPosY-1][entPosX]!=-1 && entities[ map[entPosY-1][entPosX] ].team != entities[i].team){
            entities[i].targ = map[entPosY-1][entPosX];
            atrasts = true;
          }

          if(atrasts) {
            if( entities[i].kind==1 ){
              entities[i].loadTexture('gunman_shoot');
            }
            var lenkis  = this.game.physics.arcade.angleBetween(entities[i], entities[ entities[i].targ ]);
            this.game.add.tween( entities[i] ).to( { rotation: lenkis }, 420, "Linear", true);
            this.fire(i,entities[i].targ);
          }
        }

        if( entities[i].targ == -1 )
        if( map[entPosY][entPosX+1]==-1 ){
          entities[i].dirc = 1;
          this.rotate(i);
          entities[i].position.x += entitySpeeds[ entities[i].kind ];
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
            } else if( entPosY!=0 && map[entPosY-1][entPosX] == -1 ){
              dirc = 0;
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
        
        var entPosX = Math.floor((entities[i].position.x-gameFieldX)/61);
        var entPosY = Math.floor((entities[i].position.y-gameFieldY)/61);

        if(entPosX == 1 && entities[i].targ != -2){

          entities[i].targ = -2;
          this.fireBase(i, entPosY,entities[i].team);
          console.log('saak shaut');
          continue;
        }

        if(entities[i].targ == -2) continue;

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

        
        if(entities[i].targ == -1){
          var atrasts = false;
          if( entPosX<9 && map[entPosY][entPosX+1]!=-1 && entities[ map[entPosY][entPosX+1] ].team  != entities[i].team){
            entities[i].targ = map[entPosY][entPosX+1];
            atrasts = true;
          }
          
          if(entPosX>0 && map[entPosY][entPosX-1]!=-1 && entities[ map[entPosY][entPosX-1] ].team  != entities[i].team){
            entities[i].targ = map[entPosY][entPosX-1];
            atrasts = true;
          }
          if(entPosY<9 && map[entPosY+1][entPosX]!=-1 && entities[ map[entPosY+1][entPosX] ].team != entities[i].team){
            entities[i].targ = map[entPosY+1][entPosX];
            atrasts = true;
          }
          if(entPosY>0 && map[entPosY-1][entPosX]!=-1 && entities[ map[entPosY-1][entPosX] ].team != entities[i].team){
            entities[i].targ = map[entPosY-1][entPosX];
            atrasts = true;
          }


          if(atrasts) {
            if( entities[i].kind==1 ){
              entities[i].loadTexture('gunman_shoot_blue');
            }
            var lenkis  = this.game.physics.arcade.angleBetween(entities[ entities[i].targ ],  entities[i]);
            this.game.add.tween( entities[i] ).to( { rotation: lenkis }, 420, "Linear", true);
            this.fire(i,entities[i].targ);
          }

        }

        if( entities[i].targ == -1 )
        if( map[entPosY][entPosX-1]==-1 ){
          entities[i].dirc = 1;
          this.rotate(i);
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
  },

  render: function(){
   // this.game.debug.text(this.game.time.fps, 100, 500, "#fff")
  },

  buy: function(player){
    if(player==1){
      
      money1 -= cost[selectedEntity1];
      this.refreshMoney();

      if(selectedEntity1==1){



        entities[entityCount] = this.game.add.sprite(gameFieldX+61+30,gameFieldY+(61*selPos1)+30,'gunman_walk');
        var walk = entities[entityCount].animations.add('walk');
        entities[entityCount].animations.play('walk',7,true);

        entities[entityCount].team = 1;
        entities[entityCount].kind = 1;
        entities[entityCount].health = 5;
        entities[entityCount].anchor.setTo(0.5);
        entities[entityCount].dirc = 1;
        entities[entityCount].targ = -1;

        entityIsAlive[entityCount] = true;
        entityCount++;
      
        selEnabled1 = false;      
        selectionSquare1.destroy();
      }
      if(selectedEntity1==2){

        entities[entityCount] = this.game.add.sprite(gameFieldX+61+30,gameFieldY+(61*selPos1)+30,'tank_tex');
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
        selectionSquare1.destroy();
      }
    }
    if(player==2){

      money2 -= cost[selectedEntity2];
      this.refreshMoney();
      
      if(selectedEntity2==1){

        entities[entityCount] = this.game.add.sprite(gameFieldX+61*13+30,gameFieldY+(61*selPos2)+30,'gunman_walk_blue');
        var walk = entities[entityCount].animations.add('walk');
        entities[entityCount].animations.play('walk',7,true);
        entities[entityCount].scale.setTo(-1,1);
        entities[entityCount].team = 2;
        entities[entityCount].kind = 1;
        entities[entityCount].health = 5;
        entities[entityCount].anchor.setTo(0.5);
        entities[entityCount].dirc = 1;
        entities[entityCount].targ = -1;

        entityIsAlive[entityCount] = true;
        entityCount++;
        

        selEnabled2 = false;
        selectionSquare2.destroy();
      }
      if(selectedEntity2==2){

        entities[entityCount] = this.game.add.sprite(gameFieldX+61*13+30,gameFieldY+(61*selPos2)+30,'tank_tex_blue');
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
        selectionSquare2.destroy();
      }

    }

    sound_place.play();
  },

  refreshMoney: function(){
    moneyText1.text = money1;
    moneyText2.text = money2;
  },

  hit: function(team,damage){
    if(team==2){
     // this.game.camera.flash("0xDB2C2C");
      base1.health-=damage;

      if(base1.health<=0){
        base1.health=0;
      }
      healthText1.text = base1.health;
    }else{
      //this.game.camera.flash("0x2C3ADB");
      base2.health-=damage;
      if(base2.health<=0){
        base2.health=0;
      }
      healthText2.text = base2.health;
    }


  },

  rotate: function(player){
      
      if( entities[player].targ == -1 && entities[player].kind == 2 ){
        if( entities[player].dirc == 1 ){
          this.game.add.tween( entities[player] ).to( { angle: 0 }, 500, "Linear", true);
        }
        if( entities[player].dirc == 0 ){
          this.game.add.tween( entities[player] ).to( { angle: -90 }, 500, "Linear", true);
          //entities[player].angle = 270;
        }
        if( entities[player].dirc == 2 ){
        this.game.add.tween( entities[player] ).to( { angle: 90 }, 500, "Linear", true); 
          //entities[player].angle = 90; 
        }
      }
  },

  fire: function(x, y){
    var bullet = this.game.add.sprite( entities[x].position.x, entities[x].position.y, 'bullet' );

    var tviins = this.game.add.tween( bullet ).to( {x: entities[y].position.x , y: entities[y].position.y}, 700, "Linear", true);

    if(entities[x].kind==1)sound_gunshot.play();
    else sound_tankshot.play();

    tviins.onComplete.add( function(){
      bullet.destroy();
      entities[y].health -= shootPower[ entities[x].kind ];

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
        if(entities[x].team==1){
          learning[entities[x].kind][0]++;
        }else{
          learning2[entities[x].kind][0]++;
        }
            

        if(entities[y].kind==2){
          sound_explosion.play();
      
          var temp_explosion = this.game.add.sprite(entities[y].position.x,entities[y].position.y,'explosion');
          temp_explosion.anchor.setTo(0.5);
          var explode = temp_explosion.animations.add('explode');
          temp_explosion.animations.play('explode',14,false);
          temp_explosion.animations.currentAnim.onComplete.add(function () {
            temp_explosion.animations.stop(null, true);  
            temp_explosion.destroy();
          }, this);
        }
      }
    },this);
  

    this.game.time.events.add( rnd( shootInterval[ entities[x].kind ][0],shootInterval[ entities[x].kind ][1] ), function(){
      if(entityIsAlive[x] && entityIsAlive[y]){
        this.fire(x,y);
      }
    }, this);
  },

  fireBase: function(x,y,team){
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


    sound_gunshot.play();

    if(team == 1){
      this.game.time.events.add( rnd( shootInterval[ entities[x].kind ][0],shootInterval[ entities[x].kind ][1] ), function(){
        if(base2.health>0){
          this.fireBase(x,y,team);
        }
      }, this);
    } else {
      this.game.time.events.add( rnd( shootInterval[ entities[x].kind ][0],shootInterval[ entities[x].kind ][1] ), function(){
        if(base1.health>0){
          this.fireBase(x,y,team);
        }
      }, this);
    }

  },

  gameOver: function(team){
    var panel = this.game.add.sprite(window.innerWidth/2,window.innerHeight/2,'panel');
    panel.anchor.setTo(0.5);

    winnerText = this.game.add.text(window.innerWidth/2-120,window.innerHeight/2+50,"Player "+team+" wins",style2);
  },

  loadSounds: function(){
    sound_gunshot = this.game.add.audio('gunshot');
    sound_gunshot.allowMultiple = true;

    sound_tankshot = this.game.add.audio('tankshot');
    sound_tankshot.allowMultiple = true;

    sound_explosion = this.game.add.audio('tankexplosion');
    sound_explosion.allowMultiple = true;

    sound_place = this.game.add.audio('place');
    sound_place.allowMultiple = true;
  }

  

};

function rnd(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
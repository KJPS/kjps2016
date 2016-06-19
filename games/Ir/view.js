var renderer = PIXI.autoDetectRenderer(view_width, view_height,{backgroundColor : 0x000000});
document.body.appendChild(renderer.view);

// aliases
var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    Mouse = renderer.plugins.interaction.mouse.global;
    graphics = new PIXI.Graphics();


// 
//
//
//  GAME VARIABLES
//
//
var view_x = 0,
    view_y = 0,
    view_width = 1000,
    view_height = 800;

var view = new Container();
var stage = new Container(true);
view.addChild(stage);
stage.hitArea = new PIXI.Rectangle(0, 0, 1000, 1000); // dont laugh. This is for clicking the mouse ok.
stage.width = 1000;
stage.height = 1000;

var enemies = [];
var global_enemy_limit = 30;
var obstacles = [];
var projectiles = [];
var particles = [];

var path = [];
var path_width = 10;
var path_height = 10;
var path_player_x = 0;
var path_player_y = 0;
var messages = [];
var game_over = false;


var view_x = 0,
    view_y = 0,
    view_width = 800,
    view_height = 600,
    mouse_x=0,              //#cheating #the #system
    mouse_y=0;

var player_health=100,
    mouse_state="released",
	score = 0;

//
//
//
//  PACTA SUND SERVANDA!!!
//
//

loader
  .add('sprites/characters/enemy.png')
  .add('sprites/characters/player.png')
  .add('sprites/enviroment/environment-finished.png')
  .add('sprites/ideas/box.png')
  .add('sprites/ideas/bullet.png')
  .add('sprites/characters/enemy_dead.png')
  .add('sprites/enviroment/pillar.png')
  .load(setup);

function new_sprite(x,y,xx,yy,sprite_name)
{
  var a = new Sprite(resources[sprite_name].texture);
  a.x=x;
  a.y=y;
  a.anchor.x=xx;
  a.anchor.y=yy;
  a.radius=a.width/2;
  a.xvector = 0;
  a.yvector = 0;
  a.friction = 2;
  a.speed = 1;
  a.slope_slide = 2;
  a.max_speed=8;
  a.force_xvector=0;
  a.force_yvector=0;
  a.hp=100;
  a.itterations=1;
  a.done=false;

  return a;
}

function setup()
{
  floor=new_sprite(0,0,0.5,0.5,'sprites/enviroment/environment-finished.png');
  stage.addChild(floor);

  path_width = stage.width/64;
  path_height = stage.height/64;

  //750, 750
  player=new_sprite(0,0,0.6,0.6,'sprites/characters/player.png');
  player.friction = 2;
  player.slope_slide = 2;
  player.radius=player.width/2-2;
  stage.addChild(player);



  //
  //create entities in the game here;
  //
   spawnEnemies(10, 2500);

  //
  //obstacles
  //
  //
  //
  //

  obstacles.push(new_sprite(100,-300,0.5,0.5,'sprites/enviroment/pillar.png'))
  stage.addChild(obstacles[obstacles.length-1]);
  obstacles.push(new_sprite(-300,200,0.5,0.5,'sprites/enviroment/pillar.png'))
  stage.addChild(obstacles[obstacles.length-1]);

  
  /*obstacles.push(new_sprite(500,400,0,0,'sprites/ideas/box.png'))
  stage.addChild(obstacles[obstacles.length-1]);*/

  for (var i = 0; i<path_width; i++)
  {
    path.push([]);
    for (var j=0; j<path_height; j++)
    {
      path[i].push(0);

      //
      // for debuging pathfinding
      //
      messages.push(new PIXI.Text("data", {font: "18px sans-serif", fill: "white"}));
      messages[messages.length-1].position.set(i*64, j*64);
      //stage.addChild(messages[messages.length-1]);
    }
  }

  //mark areas in the pathfinding that the goonsquad cannot reach because they cannot pass through solid matter
  mark_obstacles();


  stage.addChild(graphics);

   update_mouse_state();

  animate();
}

//messages
message1 = new PIXI.Text("...", {font: "18px sans-serif", fill: "white"});
message1.position.set(8, 8);
view.addChild(message1);
message2 = new PIXI.Text("...", {font: "18px sans-serif", fill: "white"});
message2.position.set(8, 40);
view.addChild(message2);
message3 = new PIXI.Text("...", {font: "18px sans-serif", fill: "white"});
message3.position.set(8, 72);
view.addChild(message3);
message4 = new PIXI.Text("...", {font: "18px sans-serif", fill: "white"});
message4.position.set(8, 106);
view.addChild(message4);


function on_click()
{
  for (i=0; i<8; i++)
  {
    var b =new_sprite(player.x-Math.cos(player.rotation)*player.radius-5,player.y-Math.sin(player.rotation)*player.radius-5, 0.5, 0.5, 'sprites/ideas/bullet.png');
    b.rotation=player.rotation+0.2-Math.random()*0.4;
    b.itterations=8;
    b.speed=3;

    projectiles.push(b);

    stage.addChild(projectiles[projectiles.length-1]);
  }
}

function animate() 
{
  requestAnimationFrame(animate);

  if(player_health>0)
  { 

  message2.text=mouse_state;

  player.xprevious=player.x;
  player.yprevious=player.y;
  mouse_x=Mouse.x+view_x;
  mouse_y=Mouse.y+view_y;

  player.rotation=get_angle(player.x,player.y,mouse_x,mouse_y);

  if ((key_down && !key_up)&&(!collision_predict(player,0,player.yvector+1))) 
    {if (player.yvector<6) {player.yvector++;}}

  if ((key_up && !key_down)&&(!collision_predict(player,0,player.yvector-1))) 
    {if (player.yvector>-6) {player.yvector--;}}

  if ((key_left && !key_right)&&(!collision_predict(player,player.xvector-1,0)))
   {if (player.xvector>-6) {player.xvector--;}}

  if ((key_right && !key_left)&&(!collision_predict(player,player.xvector+1,0)))
   {if (player.xvector<6) {player.xvector++;}} 


  if ((!key_up && !key_down)||(key_up&&key_down)) {player.yvector/=player.friction;}
  if ((!key_left && !key_right)||(key_left&&key_right)) {player.xvector/=player.friction;}
  
  move(player);

  //
  // projectiles
  //


  for (var i in projectiles)
  {
    if (get_distance(projectiles[i].x,projectiles[i].y,player.x,player.y)>2000)
    {
      stage.removeChild(projectiles[i]);
      projectiles[i].destroy();
      projectiles.splice(i,1);
    }
    move_bullet(projectiles[i]);
    if (projectiles[i].done==true) 
    {
      stage.removeChild(projectiles[i]);
      projectiles[i].destroy();
      projectiles.splice(i,1);

    }
  }


  //
  // Enemy pathfinding!!!
  //


  for (var i in enemies)
  {

    /*var position_x = Math.round(enemies[i].x/64);
    var position_y = Math.round(enemies[i].y/64);
    var goal_x=position_x;
    var goal_y=position_y;
    var value = 10;

    if (in_bounds(position_x,position_y,0,0,path_width,path_height))
    {
      value = path[position_x][position_y];
    }

    if (collision_predict(enemies[i],0,0))
    {
      stage.removeChild(enemies[i]);
      enemies.splice(i,1);
    }

    for (var xx=-1; xx<2; xx++)
    {
      for (var yy=-1; yy<2; yy++)
      {
        if (in_bounds(position_x+xx,position_y+yy,0,0,path_width,path_height))
        {
          if (path[position_x+xx][position_y+yy]<value && path[position_x+xx][position_y+yy]>-1)
          {
            goal_x=position_x+xx;
            goal_y=position_y+yy;
            value=path[position_x+xx][position_y+yy];
          }
        }
      }
    }

    var direction = get_angle(enemies[i].x,enemies[i].y,goal_x*64+32,goal_y*64+32);
    var direction_to_player = get_angle(enemies[i].x,enemies[i].y,player.x,player.y);
    if (goal_x!=position_x || goal_y!=position_y)
    {
      enemies[i].xvector += Math.cos(direction)*-enemies[i].speed/3;
      enemies[i].yvector += Math.sin(direction)*-enemies[i].speed/3;
    } 
    else
    {
      enemies[i].xvector/=2;
      enemies[i].yvector/=2;
    }
    enemies[i].rotation = (direction);*/
    var direction_to_player = get_angle(enemies[i].x,enemies[i].y,player.x,player.y);
    enemies[i].rotation=direction_to_player;
    enemies[i].xvector-=Math.cos(direction_to_player)*1;
    enemies[i].yvector-=Math.sin(direction_to_player)*1;

    move(enemies[i]);


    if (enemies[i].hp<1)
    {
      particles.push(new_sprite(enemies[i].x,enemies[i].y,0.5,0.5,'sprites/characters/enemy_dead.png'));
      particles[particles.length-1].rotation=enemies[i].rotation;
      stage.addChild(particles[particles.length-1]);
	  //particles[i].zOrder=-1000;

      stage.removeChild(enemies[i]);
      enemies[i].destroy();
      enemies.splice(i,1);
	  
	  score+=10;
    }

    if (collision_predict(enemies[i],0,0))
    {
      stage.removeChild(enemies[i]);
      enemies[i].destroy();
      enemies.splice(i,1);
    }

  }

  //
  //
  //
  //
  // other stuff
  //
  //
  //
  //
  //
  //
  //

  view_x=player.x-view_width/2;
  view_y=player.y-view_height/2;

  stage.x=0-view_x+((player.x-mouse_x)/2);
  stage.y=0-view_y+((player.y-mouse_y)/2);

  if (enemies.length>-1)
  {
    var player_x = Math.round(player.x/64);
    var player_y = Math.round(player.y/64);

    if (((player_x>path_player_x)||(player_x<path_player_x))||((player_y>path_player_y)||(player_y<path_player_y)))
    {
      update_pathfinding(Math.round(player.x/64),Math.round(player.y/64));
    } 
    for (var i in messages)
    {
      var x = Math.round(messages[i].x/64);
      var y = Math.round(messages[i].y/64);
      if (x>=0 && x<= path_width)
      {
        if (y>=0 && y<=path_height)
        {
          //messages[i].text=path[x][y];
		      //messages[i].text=".";
        }
      }
    }
  }

  //
  // corpses
  //

  for (var i in particles)
  {
    //message3.text=particles[i].alpha;
    particles[i].alpha-=0.003;
    if (particles[i].alpha<0.0) 
    {
      stage.removeChild(particles[i]);
      particles[i].destroy;
      particles.splice(i,1);

    }
  }
  
  if (get_distance(player.x,player.y,floor.x,floor.y)>800)
  { 
	player_health-=0.5;}

  //
  //
  //
  //
  //
  //
  //
  //debuging pathfinding
  //

  message1.text="player health: " + Math.floor(player_health);
  message2.text="score: " + score;
  message3.text='';
  message4.text='';
  // render the container
  renderer.render(view);
  //stage.x=player.x;
  }
  else if (!game_over){
    game_over=true;
	  alert("you died! But the you gained the following score: " + score);
  }
}
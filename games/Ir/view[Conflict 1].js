var renderer = PIXI.autoDetectRenderer(view_width, view_height,{backgroundColor : 0x021321});
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
var stage = new Container();
view.addChild(stage);
stage.width = 1000;
stage.height = 1000;

var enemies = [];
var global_enemy_limit = 30;
var obstacles = [];

var path = [];
var path_width = 10;
var path_height = 10;
var path_player_x = 0;
var path_player_y = 0;
var messages = [];


var view_x = 0,
    view_y = 0,
    view_width = 800,
    view_height = 600,
    mouse_x=0,              //#cheating #the #system
    mouse_y=0;

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
  return a;
}

function setup()
{

  floor=new_sprite(-550,-550,0,0,'sprites/enviroment/environment-finished.png');
  stage.addChild(floor);

  path_width = stage.width/64;
  path_height = stage.height/64;

  path =[];
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
      messages[messages.length-1].position.set(i*64+16, j*64+16);
      stage.addChild(messages[messages.length-1]);
    }
  }

  //750, 750
  player=new_sprite(150,150,0.5,0.5,'sprites/characters/player.png');
  player.move_xvector = 0;
  player.move_yvector = 0;
  player.friction = 2;
  player.slope_slide = 2;
  player.radius=player.width/2-2;
  stage.addChild(player);



  //create entities in the game here;
  //spawnEnemies(1, 10);
/*
 obstacles.push(new_sprite(300,300,0,0,'sprites/ideas/box.png'))
  stage.addChild(obstacles[obstacles.length-1]);
*/

  stage.addChild(graphics);

  animate();
}

//messages
message1 = new PIXI.Text("...", {font: "18px sans-serif", fill: "white"});
message1.position.set(8, 8);
stage.addChild(message1);
message2 = new PIXI.Text("...", {font: "18px sans-serif", fill: "white"});
message2.position.set(8, 40);
stage.addChild(message2);
message3 = new PIXI.Text("...", {font: "18px sans-serif", fill: "white"});
message3.position.set(8, 72);
stage.addChild(message3);
message4 = new PIXI.Text("...", {font: "18px sans-serif", fill: "white"});
message4.position.set(8, 106);
stage.addChild(message4);

function animate() 
{
  requestAnimationFrame(animate);


  //message.text=get_angle(player.x,player.y,Mouse.x,Mouse.y);

  player.xprevious=player.x;
  player.yprevious=player.y;
  mouse_x=Mouse.x+view_x;
  mouse_y=Mouse.y+view_y;

  player.rotation=get_angle(player.x,player.y,mouse_x,mouse_y);

  if ((key_down && !key_up)&&(!collision_predict(player,0,player.move_yvector+1))) 
    {if (player.move_yvector<6) {player.move_yvector++;}}

  if ((key_up && !key_down)&&(!collision_predict(player,0,player.move_yvector-1))) 
    {if (player.move_yvector>-6) {player.move_yvector--;}}

  if ((key_left && !key_right)&&(!collision_predict(player,player.move_xvector-1,0)))
   {if (player.move_xvector>-6) {player.move_xvector--;}}

  if ((key_right && !key_left)&&(!collision_predict(player,player.move_xvector+1,0)))
   {if (player.move_xvector<6) {player.move_xvector++;}} 


  if ((!key_up && !key_down)||(key_up&&key_down)) {player.move_yvector/=player.friction;}
  if ((!key_left && !key_right)||(key_left&&key_right)) {player.move_xvector/=player.friction;}

///
///
/// here we deal with collision and slopes
///
///

  if (!collision_predict(player,player.move_xvector,0)) 
  {
    player.x+=player.move_xvector;
  }
  else if (!collision_predict(player,player.move_xvector,-player.slope_slide))
  {
    player.x+=player.move_xvector;
    player.y-=player.slope_slide;
  }
  else if (!collision_predict(player,player.move_xvector,+player.slope_slide))
  {
    player.x+=player.move_xvector;
    player.y+=player.slope_slide;
  }
  else 
  {
    player.move_xvector/=player.friction;
  }

///
///
///now for the y vector
///
///

  if (!collision_predict(player,0,player.move_yvector)) 
  {
    player.y+=player.move_yvector;
  }
  else if (!collision_predict(player,-player.slope_slide,player.move_yvector))
  {
    player.x-=player.slope_slide;
    player.y+=player.move_yvector;
  }
  else if (!collision_predict(player,+player.slope_slide,player.move_yvector))
  {
    player.x+=player.slope_slide;
    player.y+=player.move_yvector;
  }
  else
  {
    player.move_yvector/=player.friction;
  }


  //
  // Enemy pathfinding!!!
  //
  //
  //
  //
  //  
  //
  //
  //
  //
  //
  //
  //


  for (var i in enemies)
  {

    var position_x = Math.round(enemies[i].x/64);
    var position_y = Math.round(enemies[i].y/64);
    var goal_x=position_x;
    var goal_y=position_y;
    var value = 10;


    for (var xx=-1; xx<2; xx++)
    {
      for (var yy=-1; yy<2; yy++)
      {
        if (in_bounds(position_x+xx,position_y+yy,0,0,path_width,path_height))
        {
          if (path[position_x+xx][position_y+yy]<value)// && path[position_x+xx][position_y+yy]>-1)
          {
            goal_x=position_x+xx;
            goal_y=position_y+yy;
            value=path[position_x+xx][position_y+yy];
          }
        }
      }
    }

    message1.text=value;

    var direction = get_angle(enemies[i].x,enemies[i].y,goal_x*64+32,goal_y*64+32);
    var direction_to_player = get_angle(enemies[i].x,enemies[i].y,player.x,player.y);
    enemies[i].xvector = Math.cos(direction)*-enemies[i].speed;
    enemies[i].yvector = Math.sin(direction)*-enemies[i].speed;
    enemies[i].rotation = direction;//(direction-(direction-direction_to_player)/2);

    //
    // MOVE THEM
    //



    /*if (!collision_predict(enemies[i],enemies.xvector,0)) 
    {
      enemies[i].x+=enemies[i].xvector;
    }
    else if (!collision_predict(enemies[i],enemies[i].xvector,-enemies[i].slope_slide))
    {
      enemies[i].x+=enemies[i].xvector;
      enemies[i].y-=enemies[i].slide;
    }
    else if (!collision_predict(enemies[i],enemies[i].xvector,+enemies[i].slope_slide))
    {
      enemies[i].x+=enemies[i].xvector;
      enemies[i].y+=enemies[i].slide;
    }
    else 
    {
      enemies[i].xvector/=enemies[i].friction;
    }

    ///
    ///now for the y vector
    ///

    if (!collision_predict(enemies[i],0,enemies[i].yvector)) 
    {
      enemies[i].y+=enemies[i].yvector;
    }
    else if (!collision_predict(enemies[i],-enemies[i].slope_slide,enemies[i].yvector))
    {
      enemies[i].x-=enemies[i].slope_slide;
      enemies[i].y+=enemies[i].move_yvector;
    }
    else if (!collision_predict(enemies[i],+enemies[i].slope_slide,enemies[i].yvector))
    {
      enemies[i].x+=enemies[i].slope_slide;
      enemies[i].y+=enemies[i].yvector;
    }
    else
    {
      enemies[i].yvector/=enemies[i].friction;
    }*/
    enemies[i].x+=enemies[i].xvector;
    enemies[i].y+=enemies[i].yvector;

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
          messages[i].text=path[x][y];
        }
      }
    }
  }

  //
  //
  //
  //
  //
  //
  //
  //debuging pathfinding
  //

  message1=enemies.length;

  // render the container
  renderer.render(view);
  //stage.x=player.x;
  
}
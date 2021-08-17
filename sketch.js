var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running;
var star ,starImage, obstacle, obstacleImage;
var starGroup, obstacleGroup;
var backgroundImage;
var score;
var survivalTime=0;
var gameOver, restart;

localStorage["HighestScore"] = 0;

function preload(){
  
  backgroundImage = loadImage("mars.jpg");
  obstacleImage = loadImage("obstacle.png");
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_collided =loadAnimation("sprite.png");
  starImage = loadImage("star.png");
  restartImg = loadImage("restart1.png");
  gameOverImg = loadImage("gameOver.png");
 
}



function setup() {
  createCanvas (700,450)
  
  background = createSprite(0,0,700,450);
  background.addImage(backgroundImage);
  background.scale = 1.5;
  
  monkey = createSprite (100,400, 20, 20)
  monkey.addAnimation("monkey_running", monkey_running);
  monkey.addAnimation("monkey_collided", monkey_collided);
  monkey.scale = 0.2;
  
  //obstacle = createSprite(300,500,20,20)
 
  
  ground = createSprite(100,420,700,10);
  ground.x = ground.width /2;
  ground.visible = false;
  
  obstacleGroup = createGroup();
  starGroup = createGroup();
  
  
  score = 0;

  gameOver = createSprite(350,200);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(350,240);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
}


function draw() {

   background.velocityX = -3; 

    if (background.x < 0){
      background.x = background.width/2;
    }
  
    if (obstacleGroup.isTouching(monkey)) {
      monkey.scale = 0.1;
    }
  
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
    spawnObstacles();
    spawnstar();
  
  
   if(keyDown("space") && monkey.y >= 250) {
        monkey.velocityY = -17; 
        monkey.velocityX =0; 
    }   
  
  
      if (starGroup.isTouching(monkey)){
      starGroup.destroyEach();
      score=score+1;
    }
 
    if(obstacleGroup.isTouching(monkey)){
      gameState= END;
  }
    
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    ground.velocityX = 0;
    backgroundImage.velocityX = 0;
    starImage.VelocityX=0;
    obstacleImage.velocityX=0;
    monkey.velocityY = 0;
    monkey.velocityX = 0;          
    monkey.changeAnimation("collided",monkey_collided);
    obstacleGroup.setLifetimeEach(-1);
    starGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
       
  
    switch(score) {
      case 10: monkey.scale = 0.22;
                break;
     case 20: monkey.scale = 0.24;
                break;
    case 30: monkey.scale = 0.26;
                break;
    case 40: monkey.scale = 0.28;
                break;
    }
  
  monkey.velocityY = monkey.velocityY + 0.8

  
  
   monkey.collide(ground); 
 
  drawSprites();
  
  fill("blue")
  textSize(35);
  
  text("Score:"+ score, 500,50);

}



function spawnObstacles(){
 if (frameCount % 150 === 0){
   var obstacle = createSprite(500,370,1,1);
   obstacle.addImage(obstacleImage);
   obstacle.velocityX = -7;
   
    //generate random obstacles
    var rand = Math.round(random(1));
    switch(rand) {
      case 1: obstacle.addImage(obstacleImage);
              break;
      default: break;
    }
    
     obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.30;
    obstacle.lifetime = 500;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
    
 } 
  
}

function spawnstar() {
  if (frameCount % 160 === 0) {
    star = createSprite(600,100,40,20);
    star.y = Math.round(random(100,200));
    star.addImage(starImage);
    star.scale = 0.1;
    star.velocityX = -3;
    
    star.lifetime = 500;
    
    
    star.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
   starGroup.add(star);
    }
}
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  starGroup.destroyEach();
  
  monkey.changeAnimation("running",monkey_running);
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
  
}

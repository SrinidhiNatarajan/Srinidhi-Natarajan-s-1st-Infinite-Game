var PLAY = 1;
var END = 0;
var gameState = PLAY;

var doraemon, doraemon_running, doraemon_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var doracake
var backgroundImg
var score=0;
var jumpSound, collidedSound;

var gameOver, restart;


function preload(){
  backgroundImg = loadImage("Background.jpg")
  doraemon_running = loadAnimation("Doraemon1.png","Doraemon2.png","Doraemon3.png","Doraemon4.png","Doraemon5.png","Doraemon6.png");
  doraemon_collided = loadImage("doraemon_collided.jpg");
  doracake = loadImage("Doracake.jpg")
  mice = loadImage("Mice.png")
  groundImage = loadImage("ground.jpg");

  gameOver = loadImage("game_over.png")
  restart = loadImage("restart.png")

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  doraemon = createSprite(50,height-70,20,50)
  doraemon.addAnimation("running", doraemon_running);
  doraemon.addImage(doraemon_collided);
  doraemon.setCollider('circle',0,0,350)
  doraemon.scale = 0.08;
 
  invisibleGround =  createSprite(width/2,height-10,width,125);


  ground = createSprite(width/2,height,width,2);
  ground.addImage(groundImage);
  ground.x = width/2
  ground.velocityX = -(6 + 3*score/100);

  gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOver);
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {

  background(backgroundImg);
  textSize(20);
  fill("black")
  text("Score: "+ score,30,50);
  
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    
    if((touches.length > 0 || keyDown("SPACE")) && trex.y  >= height-120) {
      jumpSound.play( )
      trex.velocityY = -10;
       touches = [];
    }
    
    doraemon.velocityY = doraemon.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    doraemon.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
  
    if(doraemon.isTouching(trex)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    doraemon.changeAnimation("collided",doraemon_collided);
    
    doracake.setLifetimeEach(-1);
   
    if(touches.length>0 || keyDown("SPACE") || mousePressedOver(restart)) {      
      reset();
      touches = []
    }
    drawSprites();
  }
}
  function spawnDoracakes() {
    if(frameCount % 60 === 0) {
      var doracake = createSprite(600,height-95,20,30);
      doracake.setCollider('circle',0,0,45)

    
      doracake.velocityX = -(6 + 3*score/100);
      
      var rand = Math.round(random(1,2));
      switch(rand) {
        case 1: doracake.addImage(doracake);
                break;
        default: break;
      }
      
     doracake.scale = 0.3;
     doracake.lifetime = 300;
     doracake.depth = doraemon.depth;
     doraemon.depth +=1;
    }
  }
  
  function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    
    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();
    
    doraemon.changeAnimation("running",doraemon_running);
    
    score = 0;
    
  }

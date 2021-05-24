var bg,bgImg;
var player, shooterImg, shooter_shooting;
var  zombieImg,zombieImg1;
var  bulletImg;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var zombieGroup;

var score = 0;
var life = 3;
var bulletCount = 70;

var heart1, heart2, heart3

var gameState = "fight"

var lose, winning, explosionSound;
 
function preload(){
  
  heart1Img = loadImage("assets/h1.png")
  heart2Img = loadImage("assets/h2.png")
  heart3Img = loadImage("assets/h3.png")

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bulletImg = loadImage("assets/bullet.png");

  zombieImg = loadAnimation("assets/1.png","assets/2.png","assets/3.png","assets/4.png")
  
  bgImg = loadImage("assets/bg.jpeg")

  lose = loadSound("assets/lose.mp3")
  winning = loadSound("assets/win.mp3")
  explosionSound = loadSound("assets/explosion.mp3")

   
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  bg=createSprite(windowWidth/2,windowHeight/2)
  bg.addImage(bgImg)
  bg.scale=1

  //creating life
  heart1=createSprite(windowWidth-200,50);
  heart2=createSprite(windowWidth-200,50);
  heart3=createSprite(windowWidth-200,50);

  heart1.scale=0.15;
  heart2.scale=0.15;
  heart3.scale=0.15;

  heart1.addImage(heart1Img)
  heart2.addImage(heart2Img)
  heart3.addImage(heart3Img)

  //creating shouter 
  player=createSprite(windowWidth/4,windowHeight-100)
  player.addImage(shooterImg)
  
  player.scale=0.3
  zombieGroup = new Group();
  bulletsGroup = new Group();
}

function draw() {
  background(0); 
  if(life==3){
    heart1.visible=false;
    heart2.visible=false;
    heart3.visible=true;
  }
  else if (life==2){
    heart1.visible=false;
    heart2.visible=true;
    heart3.visible=false;

  }
  else if (life==1){
    heart1.visible=true;
    heart2.visible=false;
    heart3.visible=false;
  }
  else {
    heart3.visible=false;
    heart2.visible=false;
    heart1.visible=false;
    gameState='gameOver';
  }

  if(gameState == "fight"){

  if(keyDown("UP_ARROW")){
     player.y = player.y-30 
    }
    if(keyDown("DOWN_ARROW")){
      player.y = player.y+30
    }
    if(keyDown("LEFT_ARROW")){
      player.x = player.x-30
    }
    if(keyDown("RIGHT_ARROW")){
      player.x = player.x+30
    }
    spawnzombies();
    if(keyDown("space")){
     
      spawnbullets();
      explosionSound.play()
    }
     else if(keyWentUp("space")){
      player.addImage(shooterImg)
    }
    

    //if bullet is touching zombie
    for(var i=0;i<bulletsGroup.length;i++){
      for(var j=0; j<zombieGroup.length;j++)
      if(bulletsGroup[i].isTouching(zombieGroup[j])){
        zombieGroup[j].destroy();
        bulletsGroup[i].destroy();
        score=score+1
      } 
    }

    //check if zombie is touching the player
    if(zombieGroup.isTouching(player)){
      life=life-1
      gameState="lost"
    }
  }
  drawSprites();
  fill("white")
  text ("bullets="+bulletCount,windowWidth-200,100)
  text ("score="+score,windowWidth-270,100);
  
}

function spawnzombies(){
  if (frameCount % 70 == 0) {
    var r = Math.round(random(windowHeight- 400, windowHeight - 50))
    var zombie = createSprite(windowWidth, r, 20, 10);
    zombie.velocityX = -5
    zombie.scale=0.5
    zombie.addAnimation("walking",zombieImg)
    zombie.lifetime = windowWidth / 5
    zombieGroup.add(zombie);
    
}
}
function spawnbullets(){
  
    var r =player.x
    var y =player.y
    var bullet = createSprite(r,y, 20, 10);
    bullet.velocityX = +20
    bullet.scale=0.15
    bullet.addImage(bulletImg)
    bullet.lifetime = windowWidth / 5
    bulletsGroup.add(bullet);
    bulletCount=bulletCount-1
}

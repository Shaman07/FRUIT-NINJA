var knife, background1, knifeImage, background11, fruit1, fruit2;
var fruit3, fruit4, fruit1Image, fruit2Image, fruit3Image,fruit4Image;
var Enemy, ENEMY,ENEMY2;
var gameOver;


var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;

function preload(){
  knifeImage = loadImage("sword.png");
  background11 = loadImage("table.jpg");
  fruit1Image = loadImage("fruit1.png");
  fruit2Image = loadImage("fruit2.png");
  fruit3Image = loadImage("fruit3.png");
  fruit4Image = loadImage("fruit4.png");
  ENEMY = loadImage("alien1.png");
  ENEMY2 = loadImage("alien2.png");
  gameOver = loadImage("gameover.png");
}

function setup(){
  createCanvas(600,600);
  background("red");
  
  background1 = createSprite(300,300,20,20);
  background1.addImage(background11);
  background1.scale=5
  
  knife = createSprite(200,Math.round(random(30,570)),20,20);
  knife.addImage(knifeImage);
  knife.scale = 0.7;
  
  bFruitGroup = createGroup();
  aFruitGroup = createGroup();
  oFruitGroup = createGroup();
  pFruitGroup = createGroup();
  enemyGroup = createGroup();
}

function enemy(){
  Enemy = createSprite(200,Math.round(random(15,585)),20,20);
  Enemy.addImage(ENEMY);
  Enemy.lifetime = 100;
  enemyGroup.add(Enemy);
}

function orange(){
  fruit1 = createSprite(300,Math.round(random(30,570)),20,20);
  fruit1.addImage(fruit1Image);
  fruit1.scale = 0.3;
  fruit1.depth = knife.depth - 1;
  fruit1.lifetime = 150;
  oFruitGroup.add(fruit1);
  
}

function apple(){
  fruit2 = createSprite(200,Math.round(random(30,570)),20,20);
  fruit2.addImage(fruit2Image);
  fruit2.scale = 0.3;
  fruit2.depth = knife.depth - 1;
  fruit2.lifetime = 150;
  aFruitGroup.add(fruit2);
}

function pear(){
  fruit3 = createSprite(250,Math.round(random(30,570)),20,20);
  fruit3.addImage(fruit3Image);
  fruit3.scale = 0.3;
  fruit3.depth = knife.depth - 1;
  fruit3.lifetime = 150;
  pFruitGroup.add(fruit3);
}

function banana(){
  fruit4 = createSprite(400,Math.round(random(0,600)),20,20);
  fruit4.addImage(fruit4Image);
  fruit4.scale = 0.25;
  fruit4.depth = knife.depth -1 ;
  fruit4.lifetime = 150;
  bFruitGroup.add(fruit4);
}

function draw(){
  background("red");
  
  if(gameState === PLAY){
    knife.x = mouseX;
    knife.y = mouseY;
    if(frameCount % 101 === 0){
      var random1 = Math.round(random(9,10));
      switch(random1){
        case 9: enemy();
                Enemy.x = 600;
                Enemy.velocityX = -6-+(score/10);
                Enemy.addImage(ENEMY2);
          break;
          
        case 10: enemy();
                Enemy.x  = 0;
                Enemy.velocityX = 6;
                Enemy.addImage(ENEMY);
          break;
        default: break;
      }
    }
    if(frameCount% 90 === 0){
      var rand = Math.round(random(1,4));
      switch(rand) {
        case 1: orange();
               fruit1.x = 600;
               fruit1.velocityX = -4-(score/10);
          break;
        case 2: apple();
               fruit2.x = 600;
               fruit2.velocityX = -4-(score/10);
          break;
        case 3: pear();
               fruit3.x = 600;
               fruit3.velocityX = -4-(score/10);
          break;
        case 4 : banana();
                fruit4.x = 600;
                fruit4.velocityX = -4-(score/10);
          break;
        default: break;
      }
    }
    
    if(frameCount % 300 === 0){
      var rando = Math.round(random(5,8));
      switch(rando){
        case 5: orange();
               fruit1.x = 0;
               fruit1.velocityX = 4+(score/10);
          break;
        case 6: apple();
               fruit2.x = 0;
               fruit2.velocityX = 4+(score/10);
          break;
        case 7: pear();
               fruit3.x = 0;
               fruit3.velocityX = 4+(score/10);
          break;
        case 8: banana();
               fruit4.x = 0;
               fruit4.velocityX =4+(score/10);
          break;
        default: break;
      }
    }
    if(bFruitGroup.isTouching(knife)){
      score = score + 1;
      bFruitGroup.destroyEach();
    }
    if(aFruitGroup.isTouching(knife)){
      score = score + 1;
      aFruitGroup.destroyEach();
    }
    if(oFruitGroup.isTouching(knife)){
      score = score + 1;
      oFruitGroup.destroyEach();
    }
    if(pFruitGroup.isTouching(knife)){
      score = score + 1;
      pFruitGroup.destroyEach();
    }
    if(enemyGroup.isTouching(knife)){
      bFruitGroup.destroyEach();
      pFruitGroup.destroyEach();
      aFruitGroup.destroyEach();
      oFruitGroup.destroyEach();
      enemyGroup.destroyEach();
      gameState = END;
    }
     }
  else if(gameState === END){
    knife.addImage(gameOver);
    knife.scale = 2;
    knife.x = 300;
    knife.y = 300;
  }
  drawSprites();
  
  fill("black");
  textSize(20);
  
  text('Score : ' + score,400,20);
}

var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var cashG,diamondsG,jwelleryG,swordGroup;
var gameStates="play";
var score= 0;
var gameOver;
function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadImage("gameOver.png");
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
// Moving background
path=createSprite(windowWidth/2,windowHeight/2);
path.addImage(pathImg);
path.velocityY = 4;
gameOver=createSprite(windowWidth/2,windowHeight/2);
  gameOver.addImage(endImg)

//creating boy running
boy = createSprite(70,windowHeight-50,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {

  background(0);
 
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  if (gameStates==="play"){
     boy.x = World.mouseX;
    gameOver.visible=false;
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
     if (cashG.isTouching(boy)) {
      cashG.destroyEach();
       score=score+10;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      score=score+20;
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      score=score+30;
    }else{
      if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
        gameStates="end"
    }
  }
  
  }
  if(gameStates==="end")  {
    jwelleryG.destroyEach();
    cashG.destroyEach();
    diamondsG.destroyEach();
    swordGroup.destroyEach();
    boy.destroy();
    path.velocityY=0;
     gameOver.visible=true;
    
      }

   

  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ score,150,30);

}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50,windowWidth-50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 300;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50,windowWidth-50),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 300;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50,windowWidth-50),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 300;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50,windowWidth-50),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 300;
  swordGroup.add(sword);
  }
}
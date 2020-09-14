//creating variables
var dog, dogImg, happyDog, database, foodS, foodStock;

function preload(){
  //adding images of the dog
  dogImg = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
}

function setup() {
  //creating the canvas
  createCanvas(500,500);

  //creating the dog
  dog = createSprite(250,300,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.3;
  
  //assigning firbase database to variable database
  database = firebase.database();

  //fetching the food stock from the database
  foodStock = database.ref('food');
  foodStock.on("value", readStock);
}


function draw() {  
  //adding background
  background(46,139,87);

  //feeding the dog
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }
  if(keyWentUp(UP_ARROW)){
    dog.addImage(dogImg);
  }
  if(foodS == 0){
    textSize(15);
    fill("white");
    stroke("black");
    text("PRESS DOWN ARROW KEY TO MAKE BOTTLE COUNT 20", 40, 480);
  }

  //drawing the sprites
  drawSprites();

  //text for instructions
  textSize(19);
  fill("white");
  stroke("black");
  text("Bottles Left: " + foodS, 170,170);
  text("PRESS UP ARROW KEY TO FEED THE DOG", 60, 30);
}

//function to read the values from the database
function readStock(data){
  foodS = data.val();
}

//function to write the values in the database
function writeStock(x){
  //if condition for not letting the bottle count go negative
  if(x <= 0){
    x = 0;
  }else{
    x = x - 1;
  }

  database.ref('/').update( {food : x} );  
}

function keyPressed(y){
  if(keyCode === 40){
    y = 20;
    database.ref('/').update( {food : y} );
  }
}
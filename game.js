

var userClickedPattern = [];
var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;

var started = false;



$(".btn").on("click", function(event){
  if(started){
  let userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
  console.log(level);
}else{
  console.log("wrong");
  var audio = new Audio("./sounds/wrong.mp3");
  audio.play();
  $('body').addClass("game-over");
  setTimeout(function(){
    $('body').removeClass('game-over');
  }, 150)
  $('h1').text("Game Over, Press Any Key to Restart")
  startOver();
}
})


  $(document).on("keypress", function(){
    if(!started){
      $('h1').text("Level " + level);
      nextSequence();
      started = true;
    }
  })



function nextSequence(){
  userClickedPattern = [];
  var randomNumber = Math.floor( Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  var tempholder = "#" + randomChosenColour;
  $(tempholder).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
  level = level + 1;
  $('h1').text("Level " + level);
}

function playSound(name){
  tempholder = "./sounds/"+ name + ".mp3";
  console.log(tempholder);
  var audio = new Audio(tempholder);
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
          nextSequence()
        }, 1000);
    }
  }else{
    console.log("wrong");
    var audio = new Audio("./sounds/wrong.mp3");
    audio.play();
    $('body').addClass("game-over");
    setTimeout(function(){
      $('body').removeClass('game-over');
    }, 150)
    $('h1').text("Game Over, Press Any Key to Restart")
    startOver();
  }
}


function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}

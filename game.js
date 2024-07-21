var userClickedPattern=[];
var buttonColours = ["red","blue","green","yellow"];
var gamePattern=[];
var level= 1;
var started= false;
var ans= "success";

document.addEventListener("keydown",function(event){

    if(started==false){
        $("h1").html("Level "+level);
        nextSequence(0);
        started=true;
    }

});

function nextSequence(){
    
    userClickedPattern=[];
    var randomNumber= Math.round(Math.random()*3);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    $('#'+randomChosenColour).fadeOut(100).fadeIn(100);

}

$(".btn").click(function(){

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

});

function playSound(name){

    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentcolour){

    $("#"+currentcolour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentcolour).removeClass("pressed");
    },100);

}

function checkAnswer(currentlevel){

    if(gamePattern[currentlevel]!=userClickedPattern[currentlevel]){
            $("body").addClass("game-over");
            setInterval(function(){
                $("body").removeClass("game-over");
            },200);
            $("h1").html("Game Over,Press a key to Restart");
            startOver();
    }
    else if(gamePattern[currentlevel]===userClickedPattern[currentlevel]   &&  currentlevel+1===gamePattern.length){
        level++;
        setTimeout(function(){$("h1").html("level "+level);nextSequence();} , 1000);
    }

}

function startOver(){
    level= 0;
    started = false;
    gamePattern=[];
}
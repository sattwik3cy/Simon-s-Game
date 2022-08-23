var gamePattern=[];
var userClickedPattern=[];
var level=0;
var start=true;

var buttonColours=["red","blue","green","yellow"];

function nextSequence () {
    var randomNumber = Math.floor(4*Math.random());
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    $("h1").text("Level "+level);
    level++;
    
}

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePressed(userChosenColour);
    checkAnswer();
    if(gamePattern.length==userClickedPattern.length && !start)
    {
        setTimeout(nextSequence,1000);
        userClickedPattern=[];
    }
})


function playSound(colour) {
    var audio = new Audio ("sounds/"+colour+".mp3");
    audio.play();
}

function animatePressed(currrentColour) {
    $("#"+currrentColour).addClass("pressed");
    setTimeout ( function() {
        $("#"+currrentColour).removeClass("pressed");
    },100);
}

if(start) {
    $(document).keypress(function () {
        $("h1").text("Level 0");
        start=false;
        setTimeout(nextSequence,1000);
    })
}



function checkAnswer()
{
    if(userClickedPattern[userClickedPattern.length-1]!==gamePattern[userClickedPattern.length-1])
    {
        $("h1").text("Game Over, Press any key to restart");
        start=true;
        $("body").addClass("game-over");
        var audio = new Audio ("sounds/wrong.mp3");
        audio.play();
        setTimeout ( function() {
            $("body").removeClass("game-over");
        },100);
        gamePattern=[];
        userClickedPattern=[];
        level=0;
}

}




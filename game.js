/* game vairables and arrays */
var randomNumber = 0;
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
started = false;


/* game funtions */
$(document).keypress(function() {

    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

function nextSequence() {

    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    randomNumber = Math.floor((Math.random() * 4));

    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    playSound(randomChosenColor);

    $("#" +  randomChosenColor).fadeOut(100).fadeIn(100);
}

$("div.btn").on( "click", function () {
    userChosenColor = this.id;

    userClickedPattern.push(userChosenColor);

    animatePress(userChosenColor);
    playSound(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3")

    audio.play();
}

function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}

function checkAnswer(currentLevel) {

    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){

        console.log("successful")

            if (userClickedPattern.length === gamePattern.length) {
                console.log("Pattern successful!")

                setTimeout(function() {
                    nextSequence();
                }, 1000)
            }
    }
    else{
        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");

        setInterval(function() {
            $("body").removeClass("game-over");
        }, 200)

        $("h1").text("Game Over, Press Any Key to Restart")

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
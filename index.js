const buttonColors = ['red', 'blue', 'green', 'yellow'];

let gamePattern = [];
let userPattern = [];

let isGameOn = false;
let level = 0;

$(document).keypress(function () {
    if (!isGameOn) {
        $('#level-title').text('Level ' + level);
        nextSequence();
        isGameOn = true;
    }
});

$('.btn').click(function (e) {
    const userColor = e.target.id;
    userPattern.push(userColor);
    playSound(userColor);
    animatePress(userColor);
    checkAnswer(userPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userPattern[currentLevel]) {
        if (gamePattern.length === userPattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound('wrong');
        $('body').addClass('game-over');
        $('#level-title').text(`Game Over.  Press Any Key to Restart`);
        setTimeout(() => {
            $('body').removeClass('game-over');
        }, 200);
        startOver();
    }
}

function nextSequence() {
    userPattern = [];
    level += 1;
    $('#level-title').text(`level ${level}`);
    const randomNum = Math.floor(Math.random() * 4);
    const randomColor = buttonColors[randomNum];
    gamePattern.push(randomColor);
    $('#' + randomColor)
        .fadeIn(100)
        .fadeOut(100)
        .fadeIn(100);
    playSound(randomColor);
}

function playSound(name) {
    const audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColor) {
    $('#' + currentColor).addClass('pressed');
    setTimeout(function () {
        $('#' + currentColor).removeClass('pressed');
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    isGameOn = false;
}

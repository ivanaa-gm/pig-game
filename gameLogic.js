'use strict';

let nowPlaying;
let nowCurrentScore;
let nowScore;
let gameStarted = false;

const playerOne = document.getElementById("player-one");
const playerTwo = document.getElementById("player-two");
const playerOneCurrentScore = document.getElementById("player-one-current-score");
const playerTwoCurrentScore = document.getElementById("player-two-current-score");
const playerOneScore = document.getElementById("player-one-score");
const playerTwoScore = document.getElementById("player-two-score");

const newGameBtn = document.querySelector(".new-game-btn");
const rollDiceBtn = document.querySelector(".roll-btn");
const dice = document.querySelector(".dice");
const holdBtn = document.querySelector(".hold-btn");
const confettiCanvas = document.getElementById('confetti-canvas');

newGameBtn.addEventListener("click", newGame);
rollDiceBtn.addEventListener("click", rollDice);
dice.addEventListener("click", rollDice);
holdBtn.addEventListener("click", handleHold);

function newGame() {
    gameStarted = true;
    dice.style.backgroundImage = "url('assets/play.png')";
    clearNowPlaying();
    decideRows();
}

function decideRows() {
    console.log("decideRows()")
    let randomNum = Math.floor(Math.random() * 2) + 1;
    if (randomNum === 1) {
        assignNowPlaying(playerOne, playerOneCurrentScore, playerOneScore);
    } else if (randomNum === 2) {
        assignNowPlaying(playerTwo, playerTwoCurrentScore, playerTwoScore)
    }
}

function assignNowPlaying(player, currentScore, score) {
    console.log("assignNowPlaying()")
    nowPlaying = player;
    nowCurrentScore = currentScore;
    nowScore = score;

    if (nowPlaying.id === "player-one") {
        playerOne.style.animation = "blink 1s linear infinite alternate";
    } else if (nowPlaying.id === "player-two") {
        playerTwo.style.animation = "blink 1s linear infinite alternate";
    }
}


function clearNowPlaying() {
    playerOne.style.animation = "none";
    playerTwo.style.animation = "none";
    nowPlaying = null;
    nowCurrentScore = null;
    nowScore = null;
    playerOneCurrentScore.textContent = 0;
    playerTwoCurrentScore.textContent = 0;
    playerOneScore.textContent = 0;
    playerTwoScore.textContent = 0;
}

function rollDice() {
    if (!gameStarted) {
        newGame();
    }
    let diceNum = getDiceNumber();
    if (diceNum === 1) {
        handleDiceReturnsOne();
    } else {
        handleUpdateCurrentScore(diceNum);
    }

}

function getDiceNumber() {
    let randomNum = Math.floor(Math.random() * 6) + 1;
    switch(randomNum) {
        case 1:
            dice.style.backgroundImage = "url('assets/one.png')";
            return 1;
        case 2:
            dice.style.backgroundImage = "url('assets/two.png')";
            return 2;
        case 3:
            dice.style.backgroundImage = "url('assets/three.png')";
            return 3;
        case 4:
            dice.style.backgroundImage = "url('assets/four.png')";
            return 4;
        case 5:
            dice.style.backgroundImage = "url('assets/five.png')";
            return 5;
        case 6:
            dice.style.backgroundImage = "url('assets/six.png')";
            return 6;
    }
}

function handleDiceReturnsOne() {
    console.log("handleDiceReturnsOne()")
    nowCurrentScore.textContent = 0;
    changePlayer();
}

function handleUpdateCurrentScore(score) {
    console.log("handleUpdateCurrentScore()")
    let displayedScore = Number(nowCurrentScore.textContent);
    displayedScore += score;
    nowCurrentScore.textContent = displayedScore;
}

function handleHold() {
    console.log("handleHold()")
    let newPoints
    if (nowScore.textContent == "0") {
        newPoints = Number(nowCurrentScore.textContent);
    } else {
        newPoints = Number(nowScore.textContent) + Number(nowCurrentScore.textContent);
    }
    nowScore.textContent = newPoints;
    nowCurrentScore.textContent = 0;
    if (Number(nowScore.textContent >= 100)) {
        handleVictory()
    }
    changePlayer();
}

function changePlayer() {
    console.log("changePlayer()")
    if (nowPlaying.id === "player-one") {
        assignNowPlaying(playerTwo, playerTwoCurrentScore, playerTwoScore)
        playerOne.style.animation = "none";
    } else if (nowPlaying.id === "player-two") {
        assignNowPlaying(playerOne, playerOneCurrentScore, playerOneScore);
        playerTwo.style.animation = "none";
    }
}

function handleVictory() {
    gameStarted = false;
    if (nowPlaying.id === "player-one") {
        dice.style.backgroundImage = "url('assets/one-won.png')";
    } else if (nowPlaying.id === "player-two") {
        dice.style.backgroundImage = "url('assets/two-won.png')";
    }
    triggerConfetti();
}

// Confetti effect
function triggerConfetti() {
    const context = confettiCanvas.getContext('2d');
    const colors = ['rgba(244, 171, 186, 0.7)', 'rgba(234, 89, 110, 0.7)', '#fff'];

    confettiCanvas.width = confettiCanvas.clientWidth;
    confettiCanvas.height = confettiCanvas.clientHeight;

    const confettiPieces = Array.from({ length: 100 }).map(() => ({
        x: Math.random() * confettiCanvas.width,
        y: Math.random() * confettiCanvas.height - confettiCanvas.height,
        r: (Math.random() * 30) + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 360,
        tiltAngleIncrement: (Math.random() * 0.07) + 0.05,
        tiltAngle: 0,
        velocity: Math.random() * 3 + 2
    }));

    function drawConfetti() {
        context.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

        confettiPieces.forEach(piece => {
            piece.tiltAngle += piece.tiltAngleIncrement;
            piece.y += piece.velocity;
            piece.tilt = Math.sin(piece.tiltAngle) * 15;

            const x = piece.x + piece.tilt;
            const y = piece.y;
            const r = piece.r;

            context.beginPath();
            context.lineWidth = r;
            context.strokeStyle = piece.color;
            context.moveTo(x + r, y);
            context.lineTo(x, y + r);
            context.stroke();
        });
        requestAnimationFrame(drawConfetti);
    }
    drawConfetti();
}
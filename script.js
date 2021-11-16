const draw = document.getElementById("draw");
const drawAll = document.getElementById("draw-all");
const drawDisplay = document.getElementById("numbers");
const winningNumbersDisplay = document.getElementById("winning-numbers");
const winningMsg = document.getElementById("win");
const balls = document.getElementById("balls");
const resultsDisplay = document.getElementById("results");
const winningNumbers = new Set();
let allNumbers = Array.from({length: 45}, (_, i) => i + 1);
let numbers = new Set();
let won = false;

for (let i = 0; i < 6; i++) {
    winningNumbers.add(Math.floor((Math.random() * 45) + 1))
}

winningNumbersDisplay.innerHTML = [...winningNumbers].join("-");

function showBalls() {
    for (let i = 0; i < allNumbers.length; i++) {
            let ball = document.createElement("div");
            ball.innerHTML = allNumbers[i].toString();
            ball.classList.add("balls");
            balls.appendChild(ball);
    }
}

function refreshBalls() {
    balls.innerHTML = "";
}

function drawNumbers(iterationLength) {
    for (let i = 0; i < iterationLength; i++) {
        numbers.add(Math.floor((Math.random() * 45) + 1));
        for (let j = 0; j < allNumbers.length; j++) {
            if (numbers.has(allNumbers[j])) {
                allNumbers.splice(j, 1)
            }
        }
    }
    drawDisplay.innerHTML = [...numbers].join("-");
    refreshBalls();
    showBalls();
}

function logResult() {
    let result = document.createElement("div");
    result.innerHTML = [...numbers].join("-");
    resultsDisplay.appendChild(result);
}

function checkIfWon () {
    if (numbers === winningNumbers) {
        won = true;
        winningMsg.innerHTML = "Congratulations";
    }
}



draw.addEventListener("click", function () {
    checkIfWon();
    drawAll.innerHTML = "Draw all remaining";
    if (numbers.size > 5) {
        draw.innerHTML = "Draw";
        logResult();
        numbers.clear();
        allNumbers = Array.from({length: 45}, (_, i) => i + 1);
        drawNumbers(1);
    } else if (numbers.size === 5) {
        draw.innerHTML = "Retry";
        drawNumbers(1);
    } else {
        drawNumbers(1);
    }
})

drawAll.addEventListener("click", function () {
    checkIfWon();
    if (numbers.size >= 5) {
        drawAll.innerHTML = "Draw all"
        logResult();
        numbers.clear();
        allNumbers = Array.from({length: 45}, (_, i) => i + 1);
        drawNumbers(6);
        drawAll.innerHTML = "Retry";
    } else if (numbers.size < 5) {
        drawNumbers(6 - numbers.size);
    } else {
        drawNumbers(6);
    }
})
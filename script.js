const draw = document.getElementById("draw");
const drawAll = document.getElementById("draw-all");
const drawDisplay = document.getElementById("numbers");
const winningNumbers = new Set();
const winningNumbersDisplay = document.getElementById("winning-numbers");
const winningMsg = document.getElementById("win");
const balls = document.getElementById("balls");
const allNumbers = Array.from({length: 45}, (_, i) => i + 1)
let resultsArray = [];
let numbers = new Set();
let won = false;

for (let i = 0; i < 6; i++) {
    winningNumbers.add(Math.floor((Math.random() * 45) + 1))
}

function showBalls() {
    for (let i = 0; i < allNumbers.length; i++) {
            let ball = document.createElement("div");
            ball.innerHTML = allNumbers[i].toString();
            balls.appendChild(ball);
    }
}

function refreshBalls() {
    balls.innerHTML = "";
}

winningNumbersDisplay.innerHTML = [...winningNumbers].join("-");

function checkIfWon () {
    if (numbers === winningNumbers) {
        won = true;
        winningMsg.innerHTML = "Congratulations";
    }
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

draw.addEventListener("click", function () {
    checkIfWon();
    drawAll.innerHTML = "Draw all remaining";
    if (numbers.size > 5) {
        draw.innerHTML = "Draw";
        numbers.clear();
        drawNumbers(1)
    } else if (numbers.size === 5) {
        resultsArray.push(Array.from(numbers));
        console.log(resultsArray);
        draw.innerHTML = "Retry";
        drawNumbers(1);
    } else {
        drawNumbers(1);
    }
})

drawAll.addEventListener("click", function () {
    checkIfWon();
    if (numbers.size === 5) {
        resultsArray.push(Array.from(numbers));
    }
    if (numbers.size > 5) {
        drawAll.innerHTML = "Draw all"
        numbers.clear()
        drawNumbers(6);
    } else if (numbers.size < 5) {
        drawNumbers(6 - numbers.size);
    } else {
        drawNumbers(6);
    }
})
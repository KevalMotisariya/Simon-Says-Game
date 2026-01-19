let gameSeq = [];
let userSeq = [];

let isGameStarted = false;
let level = 0;
let highestScore = 0;

let h1 = document.querySelector("h1");
let h2 = document.querySelector("h2");

let buttonList = ["red", "yellow", "green", "purple"];

// Start the game on keypress
document.addEventListener("keypress", function () {
    if (isGameStarted == false) {
        isGameStarted = true;
        levelUp();
    }
});

// Flash effect for game sequence
function gameFlash(button) {
    button.classList.add("flash");
    setTimeout(() => {
        button.classList.remove("flash");
    }, 200);
}

// Flash effect for user button press
function userFlash(button) {
    button.classList.add("user-flash");
    setTimeout(() => {
        button.classList.remove("user-flash");
    }, 200);
}

// Level up function to add new color to sequence
function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = "Level " + level;

    let randomIndex = Math.floor(Math.random() * 4);
    let randomColor = buttonList[randomIndex];
    let randomButton = document.querySelector("." + randomColor);
    gameSeq.push(randomColor);
    console.log(gameSeq);
    gameFlash(randomButton);
}

// Check user's answer
function checkAnswer(currentIndex) {
    if (userSeq[currentIndex] === gameSeq[currentIndex]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(() => {
                levelUp();
            }, 1000);

        }
    } else {
        if (highestScore < level) {
            highestScore = level;
        }

        h1.innerHTML = `Highest Score: <b>${highestScore}</b>`;
        h2.innerHTML = `Game Over, Your Score was <b>${level}</b> <br> Press Any Key to Restart`;
        resetGame();
    }
}

// Handle button press
function buttonPress() {
    let button = this;
    userFlash(button);

    let buttonColor = button.getAttribute("id");
    userSeq.push(buttonColor);
    checkAnswer(userSeq.length - 1);
}

let allButons = document.querySelectorAll(".btn");
for (button of allButons) {
    button.addEventListener("click", buttonPress);
}

// Reset game function
function resetGame() {
    isGameStarted = false;
    userSeq = [];
    gameSeq = [];
    level = 0;
}
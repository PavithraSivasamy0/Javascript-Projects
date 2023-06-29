"use strict";

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let currentScore = 20;
let highScore = 0;

function displayMessage(message) {
  document.querySelector(".message").textContent = message;
}

function getCurrentScore(currentScore) {
  currentScore--;
  document.querySelector(".score").textContent = currentScore;
  return currentScore;
}

document.querySelector(".check").addEventListener("click", function () {
  const guessedNumber = Number(document.querySelector(".guess").value);
  if (!guessedNumber) {
    displayMessage(" ❗ Please enter a number");
  } else if (currentScore === 0) {
    displayMessage("😑 you lost the game!");
  } else if (guessedNumber === secretNumber) {
    document.querySelector(".number").textContent = secretNumber;
    displayMessage("💥 Correct number");
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";

    if (currentScore > highScore) {
      highScore = currentScore;
      document.querySelector(".highscore").textContent = highScore;
    }
  } else if (guessedNumber > secretNumber) {
    currentScore = getCurrentScore(currentScore);
    displayMessage("🔼 Too high");
  } else if (guessedNumber < secretNumber) {
    currentScore = getCurrentScore(currentScore);
    displayMessage("🔼 Too low");
  }
});

document.querySelector(".again").addEventListener("click", function () {
  currentScore = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector(".score").textContent = currentScore;
  document.querySelector(".number").textContent = "?";
  displayMessage("Start guessing...");
  document.querySelector(".guess").value = "";
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
});

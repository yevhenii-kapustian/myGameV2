const words = ["chemistry", "history", "biology", "geography", "literature"];
let chosenWord = words[Math.floor(Math.random() * words.length)];
const maxAttempts = 5;

let attemptsLeft = maxAttempts;
let guessedLetters = [];
let displayWord = Array(chosenWord.length).fill("_");
let historyBack = [];

const backgrounImg = document.querySelector(".background");
const backgroundMainImg = document.querySelector(".main__background-img");
const backgroundMainPhoneImg = document.querySelector(".main__background-phone-img");
const buttonReadMore = document.querySelector(".button-info");
const buttonBack = document.querySelector(".button-back");
const textReadMore = document.querySelector(".game__start-text");
const buttonReset = document.querySelector(".button-reset");
const guessInput = document.querySelector("#guess-input");
const guessButton = document.querySelector("#guess-button");

const gameInfoStart = document.querySelector(".game-info");
const wordInfo = document.querySelector(".word-info");
const attemtsInfo = document.querySelector(".attemts-info");
const guessedInfo = document.querySelector(".guessed-info");
const guessSection = document.querySelector(".guess-section");


const updateGameInfo = () => {
    wordInfo.textContent = `Word: ${displayWord.join(" ")}`;
    attemtsInfo.textContent = `${attemptsLeft}`;
    guessedInfo.textContent = `${guessedLetters.join(", ") || "LETTERS"}`;
};


const handleGuess = () => {
    const guess = guessInput.value.trim().toLowerCase();
    guessInput.value = "";

    if (!guess || !/^[a-zA-Z]$/.test(guess)) {
        document.querySelector(".if-invalid").textContent = "Invalid letter. Please enter a single valid letter";
        $('.if-invalid').delay(0).fadeIn(300).delay(500).fadeOut(500);
        return;
    }

    if (guessedLetters.includes(guess)) {
        document.querySelector(".if-guessed").textContent = "This letter is already guessed. Try another one";
        $('.if-guessed').delay(0).fadeIn(300).delay(500).fadeOut(500);
        return;
    }

    guessedLetters.push(guess);

    if (chosenWord.includes(guess)) {
        for (let i = 0; i < chosenWord.length; i++) {
            if (chosenWord[i] === guess) {
                displayWord[i] = guess;
            }
        }
    } else {
        attemptsLeft--;
        document.querySelector(".if__not-in").textContent = `This letter "${guess}" is not in the word`;
        $('.if__not-in').delay(0).fadeIn(300).delay(500).fadeOut(500);
    }

    if (displayWord.join("") === chosenWord) {
        document.querySelector(".if-congratulations").textContent = `Congratulations, the word "${chosenWord}" was correct!`;
        $('.if-congratulations').delay(0).fadeIn(300).delay(500).fadeOut(500);
        resetGame();
        return;
    }

    if (attemptsLeft === 0) {
        document.querySelector(".if__didnt-guess").textContent = `Oops! You didn't guess the word. The word was: ${chosenWord}`;
        $('.if__didnt-guess').delay(0).fadeIn(300).delay(500).fadeOut(500);
        resetGame();
        return;
    }

    updateGameInfo();
};


const resetGame = () => {
    chosenWord = words[Math.floor(Math.random() * words.length)];
    attemptsLeft = maxAttempts;
    guessedLetters = [];
    displayWord = Array(chosenWord.length).fill("_");

    gameInfoStart.classList.remove("active");
    guessSection.classList.remove("active");
    buttonReset.style.display = "none";
    buttonReadMore.style.display = "block";
    backgroundMainImg.classList.remove("active");
    backgroundMainPhoneImg.classList.remove("active");
    backgrounImg.style.display = "none";
    updateGameInfo();
};


buttonReadMore.addEventListener("click", () => {
    buttonReadMore.style.display = "none";
    textReadMore.classList.add("active");

    historyBack.push(() => {
        buttonReadMore.style.display = "block";
        textReadMore.classList.remove("active");
    });
});

buttonBack.addEventListener("click", () => {
    if (historyBack.length > 0) {
        const lastState = historyBack.pop();
        lastState();
    }
});

document.querySelector(".button-start").addEventListener("click", () => {
    textReadMore.classList.remove("active");
    gameInfoStart.classList.add("active");
    guessSection.classList.add("active");
    buttonReset.style.display = "block";
    backgroundMainImg.classList.add("active");
    backgroundMainPhoneImg.classList.add("active");
    backgrounImg.style.display = "block";

    updateGameInfo();
});

buttonReset.addEventListener("click", resetGame);
guessButton.addEventListener("click", handleGuess);

  
  
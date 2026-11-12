// Student Mini Project: Number Guessing Challenge
var secretNumber = 0;
var maxAttempts = 10;
var remainingAttempts = 10;
var score = 100;
var guessList = [];
var rangeMax = 50;
var isGameOver = false;

// Initialize game on page load
window.onload = function() {
  restartGame();
  
  // Change range when user picks different difficulty
  var radios = document.getElementsByName('difficulty');
  for (var i = 0; i < radios.length; i++) {
    radios[i].onchange = function() {
      restartGame();
    };
  }
};

function restartGame() {
  isGameOver = false;
  guessList = [];
  var selectedDiff = "easy";
  var radios = document.getElementsByName('difficulty');
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      selectedDiff = radios[i].value;
      break;
    }
  }

  if (selectedDiff === "easy") {
    rangeMax = 50;
    maxAttempts = 10;
  } else if (selectedDiff === "medium") {
    rangeMax = 100;
    maxAttempts = 7;
  } else {
    rangeMax = 200;
    maxAttempts = 5;
  }

  secretNumber = Math.floor(Math.random() * rangeMax) + 1;
  remainingAttempts = maxAttempts;
  score = 100;

  document.getElementById('attempts-left').innerText = remainingAttempts;
  document.getElementById('user-score').innerText = score;
  document.getElementById('prev-guesses').innerText = "None";
  document.getElementById('guess-input').value = "";
  document.getElementById('guess-input').disabled = false;
  document.getElementById('guess-btn').disabled = false;
  document.getElementById('restart-btn').style.display = "none";

  var msg = document.getElementById('message');
  msg.innerText = "I have picked a number between 1 and " + rangeMax + ". Try to guess it!";
  msg.style.backgroundColor = "#edf2f7";
  msg.style.color = "#333";
}

function checkGuess() {
  if (isGameOver) return;

  var input = document.getElementById('guess-input');
  var userGuess = parseInt(input.value);
  var msg = document.getElementById('message');

  // Input validation
  if (isNaN(userGuess) || userGuess < 1 || userGuess > rangeMax) {
    alert("Please enter a valid number between 1 and " + rangeMax);
    return;
  }

  // Check duplicate
  if (guessList.indexOf(userGuess) !== -1) {
    alert("You already guessed " + userGuess + "! Try another number.");
    return;
  }

  guessList.push(userGuess);
  remainingAttempts--;
  score -= Math.floor(100 / maxAttempts);
  if (score < 10) score = 10;

  document.getElementById('attempts-left').innerText = remainingAttempts;
  document.getElementById('user-score').innerText = score;
  document.getElementById('prev-guesses').innerText = guessList.join(", ");

  if (userGuess === secretNumber) {
    msg.innerText = "🎉 Congratulations! You guessed the correct number: " + secretNumber + "!";
    msg.style.backgroundColor = "#c6f6d5";
    msg.style.color = "#22543d";
    endGame();
  } else if (remainingAttempts === 0) {
    msg.innerText = "💥 Game Over! You ran out of attempts. The secret number was: " + secretNumber;
    msg.style.backgroundColor = "#fed7d7";
    msg.style.color = "#742a2a";
    document.getElementById('user-score').innerText = "0";
    endGame();
  } else if (userGuess < secretNumber) {
    msg.innerText = "📉 Too Low! Try a higher number.";
    msg.style.backgroundColor = "#feebc8";
    msg.style.color = "#744210";
  } else {
    msg.innerText = "📈 Too High! Try a lower number.";
    msg.style.backgroundColor = "#feebc8";
    msg.style.color = "#744210";
  }

  input.value = "";
  input.focus();
}

function endGame() {
  isGameOver = true;
  document.getElementById('guess-input').disabled = true;
  document.getElementById('guess-btn').disabled = true;
  document.getElementById('restart-btn').style.display = "block";
}

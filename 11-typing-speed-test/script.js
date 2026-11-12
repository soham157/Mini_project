// Student Mini Project: Typing Speed Test
var quotes = [
  "The quick brown fox jumps over the lazy dog.",
  "Practice makes a person perfect in typing and programming.",
  "JavaScript is an easy language to build interactive web apps.",
  "Consistency and hard work always lead to great success."
];

var currentQuote = "";
var timer = 30;
var timerId = null;
var isRunning = false;

function startTest() {
  if (isRunning) return;
  isRunning = true;
  timer = 30;

  var randomIdx = Math.floor(Math.random() * quotes.length);
  currentQuote = quotes[randomIdx];

  document.getElementById('quote-display').innerText = currentQuote;
  var input = document.getElementById('typing-input');
  input.value = "";
  input.disabled = false;
  input.focus();

  document.getElementById('start-btn').disabled = true;

  clearInterval(timerId);
  timerId = setInterval(function() {
    timer--;
    document.getElementById('timer').innerText = timer + "s";
    calculateStats();

    if (timer <= 0) {
      endTest();
    }
  }, 1000);

  input.oninput = function() {
    calculateStats();
    if (input.value === currentQuote) {
      endTest();
    }
  };
}

function calculateStats() {
  var input = document.getElementById('typing-input').value;
  var errors = 0;

  for (var i = 0; i < input.length; i++) {
    if (i >= currentQuote.length || input[i] !== currentQuote[i]) {
      errors++;
    }
  }

  var elapsedMins = (30 - timer) / 60;
  if (elapsedMins <= 0) elapsedMins = 0.01;

  var correctChars = input.length - errors;
  if (correctChars < 0) correctChars = 0;

  // WPM = (correctChars / 5) / timeInMinutes
  var wpm = Math.round((correctChars / 5) / elapsedMins);
  var accuracy = input.length > 0 ? Math.round(((input.length - errors) / input.length) * 100) : 100;
  if (accuracy < 0) accuracy = 0;

  document.getElementById('wpm-display').innerText = wpm + " WPM";
  document.getElementById('accuracy-display').innerText = accuracy + "%";
  document.getElementById('error-count').innerText = errors;
}

function endTest() {
  clearInterval(timerId);
  isRunning = false;
  document.getElementById('typing-input').disabled = true;
  document.getElementById('start-btn').disabled = false;
  alert("Test completed! Check your final WPM and accuracy scores.");
}

function resetTest() {
  clearInterval(timerId);
  isRunning = false;
  document.getElementById('typing-input').value = "";
  document.getElementById('typing-input').disabled = true;
  document.getElementById('start-btn').disabled = false;
  document.getElementById('timer').innerText = "30s";
  document.getElementById('wpm-display').innerText = "0 WPM";
  document.getElementById('accuracy-display').innerText = "100%";
  document.getElementById('error-count').innerText = "0";
  document.getElementById('quote-display').innerText = "Click Start Test below to begin typing.";
}

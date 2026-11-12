// Student Mini Project: Guess the Movie
var questions = [
  { title: "Inception", emoji: "🌀", clue: "A spinning top that checks if you are in a dream or reality.", hint: "Directed by Christopher Nolan, starring Leonardo DiCaprio.", options: ["Inception", "Interstellar", "Tenet", "The Matrix"], ans: 0 },
  { title: "Titanic", emoji: "🚢", clue: "An unsinkable ocean liner, the Heart of the Ocean sapphire, and a wooden door.", hint: "Famous dialogue: 'I'll never let go, Jack.'", options: ["Poseidon", "Titanic", "Life of Pi", "Cast Away"], ans: 1 },
  { title: "3 Idiots", emoji: "🛵", clue: "Yellow scooter in Ladakh, engineering exams, and 'All Izz Well'.", hint: "Starring Aamir Khan, R. Madhavan, and Sharman Joshi.", options: ["Taare Zameen Par", "Chhichhore", "3 Idiots", "PK"], ans: 2 },
  { title: "The Lion King", emoji: "🦁", clue: "A young cub held high on Pride Rock with animals bowing.", hint: "Features the iconic song 'Hakuna Matata'.", options: ["Jungle Book", "The Lion King", "Madagascar", "Tarzan"], ans: 1 },
  { title: "Sholay", emoji: "🔫", clue: "A double-headed coin, a horse cart, and 'Kitne aadmi the?'", hint: "Iconic 1975 Bollywood classic with Jai and Veeru.", options: ["Deewaar", "Sholay", "Zanjeer", "Don"], ans: 1 }
];

var currentIdx = 0;
var score = 0;
var timer = 20;
var timerId = null;

window.onload = function() {
  loadQuestion();
};

function loadQuestion() {
  var q = questions[currentIdx];
  document.getElementById('q-no').innerText = (currentIdx + 1) + " / " + questions.length;
  document.getElementById('score').innerText = score;
  document.getElementById('movie-emoji').innerText = q.emoji;
  document.getElementById('clue-text').innerText = "Scene Clue: " + q.clue;
  document.getElementById('hint-text').style.display = "none";
  document.getElementById('result-msg').innerText = "";
  document.getElementById('next-btn').style.display = "none";

  var box = document.getElementById('options-box');
  box.innerHTML = "";
  for (var i = 0; i < q.options.length; i++) {
    var btn = document.createElement('button');
    btn.className = "opt-btn";
    btn.innerText = q.options[i];
    btn.onclick = (function(idx) {
      return function() { checkAnswer(idx); };
    })(i);
    box.appendChild(btn);
  }

  // Timer
  timer = 20;
  document.getElementById('timer').innerText = timer + "s";
  clearInterval(timerId);
  timerId = setInterval(function() {
    timer--;
    document.getElementById('timer').innerText = timer + "s";
    if (timer <= 0) {
      clearInterval(timerId);
      document.getElementById('result-msg').innerText = "⏰ Time's up! The answer was " + q.title;
      document.getElementById('result-msg').style.color = "red";
      disableOptions();
      showNextOrFinish();
    }
  }, 1000);
}

function showHint() {
  var q = questions[currentIdx];
  var ht = document.getElementById('hint-text');
  ht.innerText = "💡 Hint: " + q.hint;
  ht.style.display = "block";
}

function checkAnswer(chosenIdx) {
  clearInterval(timerId);
  var q = questions[currentIdx];
  disableOptions();

  if (chosenIdx === q.ans) {
    score += 10;
    document.getElementById('score').innerText = score;
    document.getElementById('result-msg').innerText = "✅ Correct Answer! (+10 pts)";
    document.getElementById('result-msg').style.color = "#48bb78";
  } else {
    document.getElementById('result-msg').innerText = "❌ Wrong! The correct movie is " + q.title;
    document.getElementById('result-msg').style.color = "#f56565";
  }

  showNextOrFinish();
}

function disableOptions() {
  var btns = document.querySelectorAll('.opt-btn');
  for (var i = 0; i < btns.length; i++) {
    btns[i].disabled = true;
  }
}

function showNextOrFinish() {
  if (currentIdx < questions.length - 1) {
    document.getElementById('next-btn').style.display = "block";
  } else {
    document.getElementById('result-msg').innerText += " 🎉 Final Score: " + score + " / " + (questions.length * 10);
    document.getElementById('restart-btn').style.display = "block";
  }
}

function nextQuestion() {
  currentIdx++;
  loadQuestion();
}

function restartGame() {
  currentIdx = 0;
  score = 0;
  document.getElementById('restart-btn').style.display = "none";
  loadQuestion();
}

// Student Mini Project: Quiz Application
var quizBank = {
  gk: [
    { q: "What is the capital of India?", options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"], ans: 1 },
    { q: "Which is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], ans: 2 },
    { q: "Who is known as the Father of the Nation in India?", options: ["Jawaharlal Nehru", "Mahatma Gandhi", "Subhas Chandra Bose", "Dr. B.R. Ambedkar"], ans: 1 },
    { q: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], ans: 1 },
    { q: "How many states are there in India?", options: ["26", "27", "28", "29"], ans: 2 }
  ],
  science: [
    { q: "What is the chemical formula for water?", options: ["CO2", "H2O", "O2", "NaCl"], ans: 1 },
    { q: "What part of the plant conducts photosynthesis?", options: ["Root", "Stem", "Leaf", "Flower"], ans: 2 },
    { q: "Which gas do human beings breathe in for respiration?", options: ["Nitrogen", "Oxygen", "Carbon Dioxide", "Helium"], ans: 1 },
    { q: "What is the boiling point of water at sea level?", options: ["90°C", "100°C", "120°C", "80°C"], ans: 1 },
    { q: "What is the center of an atom called?", options: ["Electron", "Proton", "Nucleus", "Neutron"], ans: 2 }
  ],
  cs: [
    { q: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyperlink Text Mode Language", "Home Tool Markup Language"], ans: 0 },
    { q: "Which tag is used to create a link in HTML?", options: ["<link>", "<a>", "<href>", "<url>"], ans: 1 },
    { q: "Which programming language adds interactivity to web pages?", options: ["HTML", "CSS", "JavaScript", "SQL"], ans: 2 },
    { q: "Which symbol is used for comments in JavaScript?", options: ["<!-- -->", "//", "/*", "##"], ans: 1 },
    { q: "Which data structure works on LIFO (Last In First Out)?", options: ["Queue", "Array", "Stack", "Tree"], ans: 2 }
  ]
};

var currentQuestions = [];
var currentIdx = 0;
var userAnswers = {};
var timer = 60;
var timerInterval = null;

function startQuiz(category) {
  currentQuestions = quizBank[category];
  currentIdx = 0;
  userAnswers = {};
  timer = 60;

  document.getElementById('category-screen').style.display = "none";
  document.getElementById('result-screen').style.display = "none";
  document.getElementById('question-screen').style.display = "block";

  // Start timer
  clearInterval(timerInterval);
  timerInterval = setInterval(function() {
    timer--;
    document.getElementById('timer').innerText = "Time: " + timer + "s";
    if (timer <= 0) {
      clearInterval(timerInterval);
      alert("Time is up!");
      submitQuiz();
    }
  }, 1000);

  loadQuestion();
}

function loadQuestion() {
  var q = currentQuestions[currentIdx];
  document.getElementById('question-count').innerText = "Question " + (currentIdx + 1) + " of " + currentQuestions.length;
  document.getElementById('question-text').innerText = q.q;

  var optionsBox = document.getElementById('options-box');
  optionsBox.innerHTML = "";

  for (var i = 0; i < q.options.length; i++) {
    var isChecked = userAnswers[currentIdx] === i ? "checked" : "";
    var label = document.createElement('label');
    label.className = "option-item";
    label.innerHTML = '<input type="radio" name="quiz-opt" value="' + i + '" ' + isChecked + ' onchange="selectOption(' + i + ')"> ' + q.options[i];
    optionsBox.appendChild(label);
  }

  document.getElementById('prev-btn').disabled = (currentIdx === 0);

  if (currentIdx === currentQuestions.length - 1) {
    document.getElementById('next-btn').style.display = "none";
    document.getElementById('submit-btn').style.display = "inline-block";
  } else {
    document.getElementById('next-btn').style.display = "inline-block";
    document.getElementById('submit-btn').style.display = "none";
  }
}

function selectOption(index) {
  userAnswers[currentIdx] = index;
}

function nextQuestion() {
  if (currentIdx < currentQuestions.length - 1) {
    currentIdx++;
    loadQuestion();
  }
}

function prevQuestion() {
  if (currentIdx > 0) {
    currentIdx--;
    loadQuestion();
  }
}

function submitQuiz() {
  clearInterval(timerInterval);
  var correct = 0;
  var wrong = 0;
  var unanswered = 0;

  for (var i = 0; i < currentQuestions.length; i++) {
    if (userAnswers[i] === undefined) {
      unanswered++;
    } else if (userAnswers[i] === currentQuestions[i].ans) {
      correct++;
    } else {
      wrong++;
    }
  }

  var total = currentQuestions.length;
  var pct = Math.round((correct / total) * 100);

  document.getElementById('score-text').innerText = correct + " / " + total;
  document.getElementById('percentage-text').innerText = pct + "%";
  document.getElementById('correct-count').innerText = correct;
  document.getElementById('wrong-count').innerText = wrong;
  document.getElementById('unanswered-count').innerText = unanswered;

  document.getElementById('question-screen').style.display = "none";
  document.getElementById('result-screen').style.display = "block";
}

function restartQuiz() {
  document.getElementById('result-screen').style.display = "none";
  document.getElementById('category-screen').style.display = "block";
}

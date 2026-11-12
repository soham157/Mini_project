// Student Mini Project: Spot the Difference
var differences = [
  { id: 1, x: 60, y: 50, r: 25, desc: "Sun color changed", found: false },
  { id: 2, x: 150, y: 150, r: 25, desc: "House door color changed", found: false },
  { id: 3, x: 240, y: 110, r: 25, desc: "Tree apple missing", found: false }
];

var score = 0;
var timer = 60;
var timerId = null;

window.onload = function() {
  initGame();
};

function initGame() {
  score = 0;
  timer = 60;
  for (var i = 0; i < differences.length; i++) differences[i].found = false;

  document.getElementById('found-count').innerText = "0 / 3";
  document.getElementById('score').innerText = "0";
  document.getElementById('msg-text').innerText = "Click on the differences in the right picture!";
  document.getElementById('msg-text').style.color = "white";

  drawScenes();

  clearInterval(timerId);
  timerId = setInterval(function() {
    timer--;
    document.getElementById('timer').innerText = timer + "s";
    if (timer <= 0) {
      clearInterval(timerId);
      document.getElementById('msg-text').innerText = "Time's up! Game Over.";
      document.getElementById('msg-text').style.color = "red";
    }
  }, 1000);
}

function drawScenes() {
  var c1 = document.getElementById('canvas-orig').getContext('2d');
  var c2 = document.getElementById('canvas-diff').getContext('2d');

  drawSingleScene(c1, false);
  drawSingleScene(c2, true);
}

function drawSingleScene(ctx, isDiff) {
  ctx.clearRect(0, 0, 300, 220);

  // Grass & Sky
  ctx.fillStyle = "#68d391";
  ctx.fillRect(0, 140, 300, 80);
  ctx.fillStyle = "#63b3ed";
  ctx.fillRect(0, 0, 300, 140);

  // Difference 1: Sun at (60, 50)
  ctx.beginPath();
  ctx.arc(60, 50, 20, 0, Math.PI * 2);
  ctx.fillStyle = isDiff ? "#f56565" : "#ecc94b"; // Red sun on right vs yellow on left
  ctx.fill();

  // House
  ctx.fillStyle = "#e2e8f0";
  ctx.fillRect(110, 110, 80, 60);
  ctx.fillStyle = "#e53e3e"; // Roof
  ctx.beginPath();
  ctx.moveTo(110, 110);
  ctx.lineTo(150, 70);
  ctx.lineTo(190, 110);
  ctx.fill();

  // Difference 2: Door at (150, 150)
  ctx.fillStyle = isDiff ? "#3182ce" : "#805ad5"; // Blue door vs purple door
  ctx.fillRect(140, 130, 20, 40);

  // Tree
  ctx.fillStyle = "#744210";
  ctx.fillRect(235, 120, 14, 50);
  ctx.fillStyle = "#38a169";
  ctx.beginPath();
  ctx.arc(242, 105, 30, 0, Math.PI * 2);
  ctx.fill();

  // Difference 3: Apple at (240, 100)
  if (!isDiff) {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(240, 100, 6, 0, Math.PI * 2);
    ctx.fill();
  }

  // Draw found circles
  if (isDiff) {
    for (var i = 0; i < differences.length; i++) {
      if (differences[i].found) {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(differences[i].x, differences[i].y, 20, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
  }
}

function handleClick(e) {
  var canvas = document.getElementById('canvas-diff');
  var rect = canvas.getBoundingClientRect();
  var clickX = e.clientX - rect.left;
  var clickY = e.clientY - rect.top;

  var hit = false;
  for (var i = 0; i < differences.length; i++) {
    var d = differences[i];
    var dist = Math.sqrt((clickX - d.x)*(clickX - d.x) + (clickY - d.y)*(clickY - d.y));
    if (dist <= d.r) {
      if (!d.found) {
        d.found = true;
        score += 10;
        hit = true;
        document.getElementById('msg-text').innerText = "✅ Found: " + d.desc + "!";
        document.getElementById('msg-text').style.color = "#48bb78";
      } else {
        alert("You already found this difference!");
        return;
      }
      break;
    }
  }

  if (!hit) {
    document.getElementById('msg-text').innerText = "❌ No difference there, try again!";
    document.getElementById('msg-text').style.color = "#f56565";
  }

  // Update counts
  var foundTotal = 0;
  for (var i = 0; i < differences.length; i++) {
    if (differences[i].found) foundTotal++;
  }

  document.getElementById('found-count').innerText = foundTotal + " / 3";
  document.getElementById('score').innerText = score;
  drawScenes();

  if (foundTotal === 3) {
    clearInterval(timerId);
    document.getElementById('msg-text').innerText = "🎉 Congratulations! You spotted all 3 differences!";
    document.getElementById('msg-text').style.color = "#68d391";
  }
}

function giveHint() {
  for (var i = 0; i < differences.length; i++) {
    if (!differences[i].found) {
      alert("💡 Hint: Check the " + differences[i].desc.toLowerCase());
      return;
    }
  }
  alert("You've already found all differences!");
}

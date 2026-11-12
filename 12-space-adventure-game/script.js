// Student Mini Project: Space Shooter Game
var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');

var player = { x: 180, y: 440, w: 30, h: 30, speed: 5 };
var bullets = [];
var enemies = [];
var score = 0;
var lives = 3;
var isRunning = false;
var keys = {};

window.addEventListener('keydown', function(e) {
  keys[e.code] = true;
  if (e.code === 'Space' && isRunning) {
    // Fire bullet
    bullets.push({ x: player.x + 12, y: player.y, w: 6, h: 12, speed: 7 });
  }
});

window.addEventListener('keyup', function(e) {
  keys[e.code] = false;
});

function startGame() {
  score = 0;
  lives = 3;
  bullets = [];
  enemies = [];
  player.x = 180;
  player.y = 440;
  isRunning = true;
  document.getElementById('start-btn').disabled = true;
  updateHUD();
  gameLoop();
}

function updateHUD() {
  document.getElementById('score-val').innerText = score;
  var hearts = "";
  for (var i = 0; i < lives; i++) hearts += "❤️";
  document.getElementById('lives-val').innerText = hearts || "💀";
}

function gameLoop() {
  if (!isRunning) return;

  // Clear Canvas
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Move Player
  if (keys['ArrowLeft'] && player.x > 0) player.x -= player.speed;
  if (keys['ArrowRight'] && player.x < canvas.width - player.w) player.x += player.speed;
  if (keys['ArrowUp'] && player.y > 0) player.y -= player.speed;
  if (keys['ArrowDown'] && player.y < canvas.height - player.h) player.y += player.speed;

  // Draw Player Spaceship (Blue Triangle)
  ctx.fillStyle = "#3182ce";
  ctx.beginPath();
  ctx.moveTo(player.x + 15, player.y);
  ctx.lineTo(player.x + 30, player.y + 30);
  ctx.lineTo(player.x, player.y + 30);
  ctx.fill();

  // Draw & Move Bullets
  ctx.fillStyle = "#f6e05e";
  for (var i = bullets.length - 1; i >= 0; i--) {
    bullets[i].y -= bullets[i].speed;
    ctx.fillRect(bullets[i].x, bullets[i].y, bullets[i].w, bullets[i].h);
    if (bullets[i].y < 0) bullets.splice(i, 1);
  }

  // Spawn Enemies randomly
  if (Math.random() < 0.03) {
    enemies.push({ x: Math.random() * (canvas.width - 25), y: -20, w: 25, h: 25, speed: 2 });
  }

  // Draw & Move Enemies
  ctx.fillStyle = "#e53e3e";
  for (var i = enemies.length - 1; i >= 0; i--) {
    var en = enemies[i];
    en.y += en.speed;
    ctx.fillRect(en.x, en.y, en.w, en.h);

    // Collision with Player
    if (
      player.x < en.x + en.w &&
      player.x + player.w > en.x &&
      player.y < en.y + en.h &&
      player.y + player.h > en.y
    ) {
      enemies.splice(i, 1);
      lives--;
      updateHUD();
      if (lives <= 0) {
        gameOver();
        return;
      }
      continue;
    }

    // Collision with Bullets
    for (var j = bullets.length - 1; j >= 0; j--) {
      var b = bullets[j];
      if (
        b.x < en.x + en.w &&
        b.x + b.w > en.x &&
        b.y < en.y + en.h &&
        b.y + b.h > en.y
      ) {
        enemies.splice(i, 1);
        bullets.splice(j, 1);
        score += 10;
        updateHUD();
        break;
      }
    }

    // Remove offscreen
    if (en.y > canvas.height) enemies.splice(i, 1);
  }

  requestAnimationFrame(gameLoop);
}

function gameOver() {
  isRunning = false;
  document.getElementById('start-btn').disabled = false;
  alert("💥 Game Over! You achieved a score of: " + score);
}

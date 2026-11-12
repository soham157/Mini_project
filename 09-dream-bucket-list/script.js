// Student Mini Project: Dream Bucket List
var dreams = [
  { id: 1, name: "Visit Paris and Eiffel Tower", category: "Travel", priority: "High", completed: false },
  { id: 2, name: "Learn Full Stack Web Development", category: "Education", priority: "High", completed: true },
  { id: 3, name: "Run a 10 km Marathon", category: "Fitness", priority: "Medium", completed: false }
];

var filter = "all";

window.onload = function() {
  renderList();
};

function renderList() {
  var list = document.getElementById('bucket-list');
  list.innerHTML = "";

  var completedCount = 0;
  for (var i = 0; i < dreams.length; i++) {
    if (dreams[i].completed) completedCount++;
  }

  var total = dreams.length;
  var pending = total - completedCount;
  var pct = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  document.getElementById('total-count').innerText = total;
  document.getElementById('comp-count').innerText = completedCount;
  document.getElementById('pend-count').innerText = pending;
  document.getElementById('pct-val').innerText = pct + "%";
  document.getElementById('bar-fill').style.width = pct + "%";

  var filtered = dreams.filter(function(d) {
    if (filter === "completed") return d.completed;
    if (filter === "pending") return !d.completed;
    return true;
  });

  if (filtered.length === 0) {
    list.innerHTML = "<li style='text-align:center; color:#999; padding:20px;'>No goals found.</li>";
    return;
  }

  for (var i = 0; i < filtered.length; i++) {
    var item = filtered[i];
    var li = document.createElement('li');
    li.className = "dream-item" + (item.completed ? " done" : "");
    li.innerHTML = '<div>' +
      '<input type="checkbox" ' + (item.completed ? "checked" : "") + ' onchange="toggleDream(' + item.id + ')"> ' +
      '<span class="title"><b>' + item.name + '</b></span>' +
      '<span class="badge">' + item.category + '</span>' +
      '</div>' +
      '<button onclick="deleteDream(' + item.id + ')" class="del-btn">✕</button>';
    list.appendChild(li);
  }
}

function addDream(e) {
  e.preventDefault();
  var name = document.getElementById('dream-name').value;
  var cat = document.getElementById('dream-category').value;
  var prio = document.getElementById('dream-priority').value;

  dreams.push({
    id: Date.now(),
    name: name,
    category: cat,
    priority: prio,
    completed: false
  });

  document.getElementById('dream-name').value = "";
  renderList();
}

function toggleDream(id) {
  for (var i = 0; i < dreams.length; i++) {
    if (dreams[i].id === id) {
      dreams[i].completed = !dreams[i].completed;
      break;
    }
  }
  renderList();
}

function deleteDream(id) {
  dreams = dreams.filter(function(d) { return d.id !== id; });
  renderList();
}

function setFilter(f) {
  filter = f;
  var btns = document.querySelectorAll('.f-btn');
  for (var i = 0; i < btns.length; i++) btns[i].classList.remove('active');
  event.target.classList.add('active');
  renderList();
}

// Student Mini Project: Timetable Generator
var subjectList = [
  { name: "Mathematics", teacher: "Dr. Arun Kumar", periods: 5 },
  { name: "Physics", teacher: "Prof. Priya", periods: 4 },
  { name: "Java Programming", teacher: "Mr. Rahul", periods: 5 },
  { name: "English", teacher: "Ms. Divya", periods: 3 },
  { name: "Environmental Science", teacher: "Dr. Sandeep", periods: 3 }
];

window.onload = function() {
  generateSchedule();
};

function addSubject(e) {
  e.preventDefault();
  var subName = document.getElementById('sub-name').value;
  var teachName = document.getElementById('teach-name').value;
  var periods = parseInt(document.getElementById('sub-periods').value);

  subjectList.push({ name: subName, teacher: teachName, periods: periods });
  alert("Added " + subName + " (" + periods + " periods/week)!");
  e.target.reset();
  generateSchedule();
}

function generateSchedule() {
  var dept = document.getElementById('dept-name').value;
  var cls = document.getElementById('class-name').value;
  document.getElementById('table-heading').innerText = "Weekly Timetable - " + dept + " (" + cls + ")";

  // Pool of subjects to allocate
  var pool = [];
  for (var i = 0; i < subjectList.length; i++) {
    for (var j = 0; j < subjectList[i].periods; j++) {
      pool.push(subjectList[i].name + "<br><small>(" + subjectList[i].teacher + ")</small>");
    }
  }

  // Shuffle pool
  pool.sort(function() { return Math.random() - 0.5; });

  var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  var tbody = document.getElementById('table-body');
  tbody.innerHTML = "";

  for (var d = 0; d < days.length; d++) {
    var tr = document.createElement('tr');
    var html = '<td class="day-col">' + days[d] + '</td>';

    // Morning Periods 1-4
    for (var p = 0; p < 4; p++) {
      var item = pool.pop() || "Library / Self-Study";
      html += '<td>' + item + '</td>';
    }

    // Lunch
    html += '<td class="lunch-col">LUNCH</td>';

    // Afternoon Periods 5-6
    for (var p = 0; p < 2; p++) {
      var item = pool.pop() || "Sports / Mentorship";
      html += '<td>' + item + '</td>';
    }

    tr.innerHTML = html;
    tbody.appendChild(tr);
  }
}

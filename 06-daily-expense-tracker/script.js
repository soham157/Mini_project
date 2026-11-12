// Student Mini Project: Daily Expense Tracker
var expenses = [];

window.onload = function() {
  // Set today's date default
  document.getElementById('exp-date').value = new Date().toISOString().split('T')[0];
  
  // Seed initial sample data for demonstration
  expenses = [
    { id: 1, name: "Lunch at Canteen", category: "Food", amount: 120, date: "2026-11-11" },
    { id: 2, name: "Bus Ticket", category: "Travel", amount: 50, date: "2026-11-11" },
    { id: 3, name: "Notebook & Pen", category: "Education", amount: 80, date: "2026-11-10" }
  ];
  updateDashboard();
  renderTable();
};

function addExpense(e) {
  e.preventDefault();

  var name = document.getElementById('exp-name').value;
  var category = document.getElementById('exp-category').value;
  var amount = parseFloat(document.getElementById('exp-amount').value);
  var date = document.getElementById('exp-date').value;

  var newRecord = {
    id: Date.now(),
    name: name,
    category: category,
    amount: amount,
    date: date
  };

  expenses.unshift(newRecord);
  document.getElementById('exp-name').value = "";
  document.getElementById('exp-amount').value = "";

  updateDashboard();
  renderTable();
}

function deleteExpense(id) {
  if (confirm("Are you sure you want to delete this expense?")) {
    expenses = expenses.filter(function(item) {
      return item.id !== id;
    });
    updateDashboard();
    renderTable();
  }
}

function updateDashboard() {
  var total = 0;
  var highest = 0;
  var catCounts = {};

  for (var i = 0; i < expenses.length; i++) {
    total += expenses[i].amount;
    if (expenses[i].amount > highest) {
      highest = expenses[i].amount;
    }
    var cat = expenses[i].category;
    catCounts[cat] = (catCounts[cat] || 0) + expenses[i].amount;
  }

  var topCat = "-";
  var topCatVal = 0;
  for (var c in catCounts) {
    if (catCounts[c] > topCatVal) {
      topCatVal = catCounts[c];
      topCat = c;
    }
  }

  document.getElementById('total-val').innerText = "₹" + total;
  document.getElementById('highest-val').innerText = "₹" + highest;
  document.getElementById('top-cat-val').innerText = topCat;
}

function renderTable() {
  var tbody = document.getElementById('expense-list');
  var filter = document.getElementById('filter-cat').value;
  tbody.innerHTML = "";

  var filtered = expenses.filter(function(item) {
    return filter === "all" || item.category === filter;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color:#999;">No expenses recorded.</td></tr>';
    return;
  }

  for (var i = 0; i < filtered.length; i++) {
    var item = filtered[i];
    var tr = document.createElement('tr');
    tr.innerHTML = '<td>' + item.date + '</td>' +
      '<td>' + item.name + '</td>' +
      '<td>' + item.category + '</td>' +
      '<td><b>₹' + item.amount + '</b></td>' +
      '<td><button onclick="deleteExpense(' + item.id + ')" class="del-btn">Delete</button></td>';
    tbody.appendChild(tr);
  }
}

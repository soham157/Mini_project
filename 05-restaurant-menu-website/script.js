// Student Mini Project: Restaurant Menu
var menuData = [
  { name: "Veg Spring Roll", category: "Starters", price: "₹120", veg: true, desc: "Crispy rolls filled with seasoned vegetables and herbs." },
  { name: "Paneer Tikka", category: "Starters", price: "₹200", veg: true, desc: "Spiced grilled cottage cheese cubes with bell peppers." },
  { name: "Chicken 65", category: "Starters", price: "₹240", veg: false, desc: "Crispy fried spicy boneless chicken bites with curry leaves." },
  { name: "Paneer Butter Masala", category: "Main Course", price: "₹220", veg: true, desc: "Cottage cheese cooked in rich creamy tomato and butter gravy." },
  { name: "Dal Makhani", category: "Main Course", price: "₹180", veg: true, desc: "Slow-cooked black lentils prepared with butter and cream." },
  { name: "Butter Chicken", category: "Main Course", price: "₹280", veg: false, desc: "Tender chicken pieces in rich tomato butter gravy." },
  { name: "Veg Fried Rice", category: "Chinese", price: "₹160", veg: true, desc: "Wok tossed rice mixed with vegetables and soy sauce." },
  { name: "Chilli Chicken", category: "Chinese", price: "₹230", veg: false, desc: "Boneless chicken tossed in spicy garlic soy chili sauce." },
  { name: "Chocolate Brownie", category: "Desserts", price: "₹100", veg: true, desc: "Warm chocolate fudge brownie served with chocolate sauce." },
  { name: "Gulab Jamun", category: "Desserts", price: "₹70", veg: true, desc: "Two soft milk dumplings dipped in fragrant saffron syrup." },
  { name: "Fresh Lime Soda", category: "Beverages", price: "₹60", veg: true, desc: "Chilled lemon juice mixed with soda and mint leaves." }
];

var selectedCat = "all";

window.onload = function() {
  renderMenu();
};

function renderMenu() {
  var grid = document.getElementById('menu-grid');
  var query = document.getElementById('search-input').value.toLowerCase();
  grid.innerHTML = "";

  var filtered = menuData.filter(function(item) {
    var matchCat = (selectedCat === "all" || item.category === selectedCat);
    var matchSearch = item.name.toLowerCase().indexOf(query) !== -1;
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = "<p>No matching food items found.</p>";
    return;
  }

  for (var i = 0; i < filtered.length; i++) {
    var food = filtered[i];
    var card = document.createElement('div');
    card.className = "menu-card";
    card.innerHTML = '<h3>' + food.name + '</h3>' +
      '<div class="price">' + food.price + '</div>' +
      '<p class="' + (food.veg ? 'tag-veg' : 'tag-nonveg') + '">' + (food.veg ? '● VEG' : '▲ NON-VEG') + '</p>' +
      '<p style="font-size:13px; color:#666;">' + food.desc + '</p>';
    grid.appendChild(card);
  }
}

function setCategory(cat) {
  selectedCat = cat;
  var btns = document.querySelectorAll('.cat-btn');
  for (var i = 0; i < btns.length; i++) {
    btns[i].classList.remove('active');
  }
  event.target.classList.add('active');
  renderMenu();
}

function filterMenu() {
  renderMenu();
}

function handleContact(e) {
  e.preventDefault();
  alert("Thank you! Your message/reservation request has been submitted.");
  e.target.reset();
}

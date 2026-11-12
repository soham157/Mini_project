// Student Mini Project: Food Picker
var foodItems = [
  // Breakfast
  { name: "Masala Dosa", category: "breakfast", type: "veg", emoji: "🥞", desc: "Crispy crepe filled with spiced potato masala, served with chutney.", ingredients: "Rice, potato, spices, ghee" },
  { name: "Idli Sambar", category: "breakfast", type: "veg", emoji: "⚪", desc: "Steamed fluffy rice cakes served with hot lentil sambar.", ingredients: "Rice, urad dal, toor dal, vegetables" },
  { name: "Egg Omelette & Bread", category: "breakfast", type: "non-veg", emoji: "🍳", desc: "Pan-fried spiced egg omelette paired with toasted bread.", ingredients: "Eggs, onion, green chili, bread" },
  { name: "Poori Masala", category: "breakfast", type: "veg", emoji: "🫓", desc: "Deep-fried puffed wheat flatbread served with potato gravy.", ingredients: "Wheat flour, potato, onions, turmeric" },
  
  // Lunch
  { name: "Chicken Biryani", category: "lunch", type: "non-veg", emoji: "🍗", desc: "Aromatic basmati rice cooked with seasoned chicken and Indian spices.", ingredients: "Basmati rice, chicken, curd, saffron, spices" },
  { name: "South Indian Veg Meals", category: "lunch", type: "veg", emoji: "🍱", desc: "Wholesome meal with rice, sambar, rasam, curd and vegetable curry.", ingredients: "Rice, lentils, seasonal vegetables, curd" },
  { name: "Paneer Butter Masala with Roti", category: "lunch", type: "veg", emoji: "🍛", desc: "Soft cottage cheese cubes in rich tomato gravy with warm rotis.", ingredients: "Paneer, tomato, butter, cream, wheat roti" },
  { name: "Fried Rice", category: "lunch", type: "veg", emoji: "🍚", desc: "Wok-tossed long-grain rice with diced carrots, beans and pepper.", ingredients: "Rice, carrots, capsicum, soy sauce" },

  // Snacks
  { name: "Samosa with Mint Chutney", category: "snacks", type: "veg", emoji: "🥟", desc: "Crispy fried triangular pastry stuffed with spicy potato and peas.", ingredients: "Maida, potato, peas, spices" },
  { name: "Chicken Egg Puff", category: "snacks", type: "non-veg", emoji: "🥐", desc: "Flaky baked puff pastry stuffed with boiled egg and chicken masala.", ingredients: "Puff sheet, egg, onion gravy, pepper" },
  { name: "French Fries", category: "snacks", type: "veg", emoji: "🍟", desc: "Crispy salted potato fries served with tomato ketchup.", ingredients: "Potato, salt, cooking oil" },

  // Dinner
  { name: "Malabar Parotta & Veg Kurma", category: "dinner", type: "veg", emoji: "🫓", desc: "Layered flaky parotta served with coconut vegetable kurma.", ingredients: "Flour, coconut, green peas, fennel" },
  { name: "Chicken Noodles", category: "dinner", type: "non-veg", emoji: "🍜", desc: "Stir-fried noodles loaded with chicken pieces and vegetables.", ingredients: "Noodles, chicken, cabbage, garlic" },
  { name: "Chapati & Dal Fry", category: "dinner", type: "veg", emoji: "🥘", desc: "Light homestyle wheat chapatis served with tempered yellow dal.", ingredients: "Wheat flour, moong dal, tomato, cumin" }
];

var currentFood = null;
var favorites = [];

function suggestFood() {
  var selectedCat = document.getElementById('meal-category').value;
  var selectedDiet = "all";
  var dietRadios = document.getElementsByName('diet');
  for (var i = 0; i < dietRadios.length; i++) {
    if (dietRadios[i].checked) {
      selectedDiet = dietRadios[i].value;
      break;
    }
  }

  // Filter items
  var filtered = foodItems.filter(function(item) {
    var matchCat = (selectedCat === "all" || item.category === selectedCat);
    var matchDiet = (selectedDiet === "all" || item.type === selectedDiet);
    return matchCat && matchDiet;
  });

  if (filtered.length === 0) {
    alert("No dishes found for this filter! Try selecting 'All'.");
    return;
  }

  var randomIndex = Math.floor(Math.random() * filtered.length);
  currentFood = filtered[randomIndex];

  // Update UI
  document.getElementById('food-emoji').innerText = currentFood.emoji;
  document.getElementById('food-name').innerText = currentFood.name;
  document.getElementById('food-desc').innerText = currentFood.desc;
  document.getElementById('food-ingredients').innerText = currentFood.ingredients;

  var badge = document.getElementById('food-type-badge');
  badge.innerText = currentFood.category.toUpperCase() + " • " + (currentFood.type === "veg" ? "VEG 🟢" : "NON-VEG 🔴");
  badge.style.backgroundColor = currentFood.type === "veg" ? "#c6f6d5" : "#fed7d7";
  badge.style.color = currentFood.type === "veg" ? "#22543d" : "#742a2a";
}

function addToFavorites() {
  if (!currentFood) {
    alert("First suggest a food before adding to favorites!");
    return;
  }

  if (favorites.indexOf(currentFood.name) === -1) {
    favorites.push(currentFood.name);
    updateFavoritesUI();
  } else {
    alert(currentFood.name + " is already in your favorites list!");
  }
}

function updateFavoritesUI() {
  var list = document.getElementById('favorites-list');
  if (favorites.length === 0) {
    list.innerHTML = "<li>No favorites added yet.</li>";
    return;
  }

  list.innerHTML = "";
  for (var i = 0; i < favorites.length; i++) {
    var li = document.createElement('li');
    li.innerText = favorites[i];
    list.appendChild(li);
  }
}

function clearFavorites() {
  favorites = [];
  updateFavoritesUI();
}

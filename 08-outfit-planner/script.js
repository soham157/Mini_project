// Student Mini Project: Outfit Planner
var wardrobe = {
  college: {
    tops: ["Navy Blue T-Shirt", "Checked Shirt", "Casual Hoodie"],
    bottoms: ["Blue Denim Jeans", "Black Chinos", "Cargo Pants"],
    shoes: ["White Sneakers", "Canvas Shoes"],
    accessories: ["Digital Watch", "College Backpack"]
  },
  office: {
    tops: ["White Formal Shirt", "Light Blue Button-down", "Dark Blazer with Shirt"],
    bottoms: ["Formal Navy Trousers", "Grey Dress Pants"],
    shoes: ["Leather Oxford Shoes", "Brown Loafers"],
    accessories: ["Leather Strap Watch", "Laptop Bag"]
  },
  party: {
    tops: ["Black Silk Shirt", "Printed Party Shirt", "Slim Fit Polo"],
    bottoms: ["Ripped Black Jeans", "Ankle Fit Trousers"],
    shoes: ["Chelsea Boots", "Party Loafers"],
    accessories: ["Silver Chain", "Smartwatch"]
  },
  sports: {
    tops: ["Quick-dry Gym Vest", "Breathable Sports T-shirt"],
    bottoms: ["Track Pants", "Running Shorts"],
    shoes: ["Running Shoes", "Trainers"],
    accessories: ["Fitness Band", "Sweatband & Water Bottle"]
  },
  casual: {
    tops: ["Linen Half-sleeve Shirt", "Graphic T-Shirt", "Polo Tee"],
    bottoms: ["Casual Denim Shorts", "Cotton Joggers"],
    shoes: ["Slip-on Espadrilles", "Casual Sneakers"],
    accessories: ["Sunglasses", "Baseball Cap"]
  }
};

var currentOutfit = null;
var savedOutfits = [];

function generateOutfit() {
  var occ = document.getElementById('occ-select').value;
  var weather = document.getElementById('weather-select').value;
  var data = wardrobe[occ];

  var topItem = data.tops[Math.floor(Math.random() * data.tops.length)];
  var bottomItem = data.bottoms[Math.floor(Math.random() * data.bottoms.length)];
  var shoeItem = data.shoes[Math.floor(Math.random() * data.shoes.length)];
  var accItem = data.accessories[Math.floor(Math.random() * data.accessories.length)];

  currentOutfit = {
    occasion: occ.toUpperCase(),
    weather: weather,
    top: topItem,
    bottom: bottomItem,
    shoes: shoeItem,
    acc: accItem
  };

  document.getElementById('outfit-title').innerText = occ.toUpperCase() + " OUTFIT (" + weather.toUpperCase() + ")";
  document.getElementById('top-val').innerText = topItem;
  document.getElementById('bottom-val').innerText = bottomItem;
  document.getElementById('shoes-val').innerText = shoeItem;
  document.getElementById('acc-val').innerText = accItem;

  var tip = document.getElementById('weather-tip');
  if (weather === "sunny") {
    tip.innerText = "☀️ Weather Tip: Light, breathable cotton fabric is recommended today.";
  } else if (weather === "rainy") {
    tip.innerText = "🌧️ Weather Tip: Avoid light colors and remember to carry an umbrella or raincoat.";
  } else {
    tip.innerText = "❄️ Weather Tip: Consider layering with a sweater or jacket to stay warm.";
  }
}

function saveFavorite() {
  if (!currentOutfit) {
    alert("First generate an outfit!");
    return;
  }
  var label = currentOutfit.occasion + ": " + currentOutfit.top + " + " + currentOutfit.bottom;
  savedOutfits.push(label);

  var list = document.getElementById('saved-list');
  list.innerHTML = "";
  for (var i = 0; i < savedOutfits.length; i++) {
    var li = document.createElement('li');
    li.innerText = savedOutfits[i];
    list.appendChild(li);
  }
  alert("Outfit added to your saved list!");
}

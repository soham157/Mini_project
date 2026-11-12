const F=[
['Breakfast','🥞','Pancakes','Fluffy stack with honey and fruit.','veg'],['Breakfast','🍳','Masala Omelette','Spiced eggs with onion and chilli.','nonveg'],['Breakfast','🥣','Oats Bowl','Warm oats with banana and nuts.','veg'],['Breakfast','🥪','Paneer Sandwich','Grilled sandwich with spiced paneer.','veg'],
['Lunch','🍛','Chicken Curry & Rice','Hearty curry with steamed rice.','nonveg'],['Lunch','🥗','Chickpea Salad','Fresh, filling and protein-rich.','veg'],['Lunch','🍝','Pasta Primavera','Veggie pasta in a light garlic sauce.','veg'],['Lunch','🌯','Chicken Wrap','Grilled chicken with crunchy veg.','nonveg'],
['Dinner','🍕','Margherita Pizza','Classic tomato, basil and cheese.','veg'],['Dinner','🍜','Veg Noodles','Stir-fried noodles with crisp vegetables.','veg'],['Dinner','🍗','Grilled Chicken','Smoky chicken with roasted veggies.','nonveg'],['Dinner','🍲','Dal Tadka & Roti','Comforting lentils with fresh roti.','veg'],
['Snacks','🍟','French Fries','Crispy, salty and shareable.','veg'],['Snacks','🍿','Popcorn','Light and buttery movie-night snack.','veg'],['Snacks','🍔','Chicken Burger','Juicy patty in a toasted bun.','nonveg'],['Snacks','🥟','Veg Momos','Steamed dumplings with spicy dip.','veg']];
const $=id=>document.getElementById(id);let cur=null;let favs=JSON.parse(localStorage.getItem('favs')||'[]');
function choose(meal,type){let p=F.filter(f=>(!meal||f[0]===meal)&&(type==='all'||f[4]===type));if(p.length>1&&cur)p=p.filter(f=>f[2]!==cur[2]);
 if(!p.length){alert('No food matches that filter.');return}cur=p[Math.floor(Math.random()*p.length)];render()}
function render(){$('out').classList.remove('hidden');$('emoji').textContent=cur[1];$('name').textContent=cur[2];$('desc').textContent=cur[3];$('tag').textContent=cur[4]==='veg'?'Vegetarian':'Non-Vegetarian'}
function drawFavs(){$('favs').innerHTML=favs.map((n,i)=>`<li>${n} <button class="alt" data-i="${i}" style="padding:2px 8px">✕</button></li>`).join('');$('noFav').classList.toggle('hidden',favs.length>0)}
$('pick').onclick=()=>{cur=null;choose($('meal').value,$('type').value)};
$('another').onclick=()=>choose($('meal').value,$('type').value);
$('challenge').onclick=()=>{cur=null;choose(null,'all')};
$('fav').onclick=()=>{if(cur&&!favs.includes(cur[2])){favs.push(cur[2]);localStorage.setItem('favs',JSON.stringify(favs));drawFavs()}};
$('favs').onclick=e=>{const i=e.target.dataset.i;if(i!==undefined){favs.splice(i,1);localStorage.setItem('favs',JSON.stringify(favs));drawFavs()}};
drawFavs();

const M=[['Starters','🥟','Veg Spring Rolls','Crispy rolls stuffed with cabbage and carrot.',149,'veg'],['Starters','🍗','Chicken 65','Spicy fried chicken with curry leaves.',229,'nonveg'],['Starters','🧀','Paneer Tikka','Char-grilled marinated paneer cubes.',219,'veg'],
['Main Course','🍛','Paneer Butter Masala','Creamy tomato gravy with soft paneer.',269,'veg'],['Main Course','🍲','Chicken Biryani','Fragrant basmati layered with spiced chicken.',299,'nonveg'],['Main Course','🍚','Veg Pulao','Mildly spiced rice with seasonal vegetables.',199,'veg'],['Main Course','🥘','Mutton Curry','Slow-cooked mutton in a rich masala.',349,'nonveg'],
['Desserts','🍨','Gulab Jamun','Warm milk dumplings in rose syrup.',99,'veg'],['Desserts','🍰','Chocolate Brownie','Fudgy brownie with ice cream.',149,'veg'],
['Drinks','🥭','Mango Lassi','Thick chilled yoghurt and mango drink.',89,'veg'],['Drinks','🍋','Fresh Lime Soda','Sweet or salted, your choice.',69,'veg']];
const $=id=>document.getElementById(id);let cat='All';
const cats=['All',...new Set(M.map(m=>m[0]))];
function draw(){$('cats').innerHTML=cats.map(c=>`<button class="cat ${c===cat?'on':''}" data-c="${c}">${c}</button>`).join('');
 const q=$('search').value.toLowerCase(),d=$('diet').value;
 const list=M.filter(m=>(cat==='All'||m[0]===cat)&&(!d||m[5]===d)&&m[2].toLowerCase().includes(q));
 $('items').innerHTML=list.map(m=>`<div class="card dish" data-n="${m[2]}"><div class="e">${m[1]}</div><h3>${m[2]}</h3><p><span class="${m[5]==='veg'?'tagv':'tagn'}"></span>${m[5]==='veg'?'Veg':'Non-Veg'} · <b>₹${m[4]}</b></p></div>`).join('');
 $('none').classList.toggle('hidden',list.length>0)}
$('cats').onclick=e=>{if(e.target.dataset.c){cat=e.target.dataset.c;draw()}};
$('search').oninput=draw;$('diet').onchange=draw;
$('items').onclick=e=>{const c=e.target.closest('.dish');if(!c)return;const m=M.find(x=>x[2]===c.dataset.n);
 $('mt').textContent=m[2];$('mi').textContent=m[1];$('md').textContent=m[3];$('mp').textContent=`₹${m[4]} · ${m[5]==='veg'?'Vegetarian':'Non-Vegetarian'}`;$('modal').classList.remove('hidden')};
$('close').onclick=()=>$('modal').classList.add('hidden');draw();

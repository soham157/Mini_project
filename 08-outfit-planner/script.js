const W={
'Casual':{top:[['👕','T-shirt'],['👚','Blouse'],['🧥','Hoodie']],bottom:[['👖','Jeans'],['🩳','Shorts']],shoes:[['👟','Sneakers'],['🩴','Sandals']]},
'Formal':{top:[['👔','Shirt & tie'],['🥼','Blazer']],bottom:[['👖','Trousers'],['👗','Formal skirt']],shoes:[['👞','Oxford shoes'],['👠','Heels']]},
'Party':{top:[['👗','Party dress'],['🕴️','Sharp jacket'],['👚','Sequin top']],bottom:[['👖','Dark jeans'],['👗','Midi skirt']],shoes:[['👠','Heels'],['👟','Statement sneakers']]},
'Sports':{top:[['🎽','Running vest'],['👕','Dry-fit tee']],bottom:[['🩳','Track shorts'],['👖','Joggers']],shoes:[['👟','Running shoes']]},
'Traditional':{top:[['🥻','Kurta / Saree blouse'],['👘','Sherwani']],bottom:[['👖','Churidar'],['🥻','Saree / Dhoti']],shoes:[['🥿','Mojari'],['👡','Kolhapuri']]}};
const $=id=>document.getElementById(id);const ex={hot:['🧢','Cap'],cold:['🧣','Scarf'],rain:['☂️','Umbrella']};
const tips={hot:'Hot day — pick breathable cotton.',cold:'Cold day — add a layer and a scarf.',rain:'Rain expected — carry an umbrella.',"":''};
let cur=null,rate=0,saved=JSON.parse(localStorage.getItem('outfits')||'[]');
$('occ').innerHTML=Object.keys(W).map(o=>`<option>${o}</option>`).join('');
const rnd=a=>a[Math.floor(Math.random()*a.length)];
function renderPick(){const o=W[$('occ').value];$('pick').innerHTML=['top','bottom','shoes'].map(k=>`<div><label>${k}</label><select data-k="${k}">${o[k].map((p,i)=>`<option value="${i}">${p[0]} ${p[1]}</option>`).join('')}</select></div>`).join('')}
function show(o){cur=o;rate=0;const w=$('wx').value;const items=[o.top,o.bottom,o.shoes];if(w)items.push(ex[w]);
 $('prev').innerHTML=items.map(p=>`<div class="piece"><div class="e">${p[0]}</div>${p[1]}</div>`).join('');$('wxTip').textContent=tips[w];stars()}
function stars(){$('stars').innerHTML=[1,2,3,4,5].map(n=>`<button class="star ${n<=rate?'on':''}" data-n="${n}">★</button>`).join('')}
$('gen').onclick=()=>{const o=W[$('occ').value];show({occ:$('occ').value,top:rnd(o.top),bottom:rnd(o.bottom),shoes:rnd(o.shoes)})};
$('pick').onchange=()=>{const o=W[$('occ').value],g=k=>o[k][$('pick').querySelector(`[data-k=${k}]`).value];show({occ:$('occ').value,top:g('top'),bottom:g('bottom'),shoes:g('shoes')})};
$('occ').onchange=renderPick;
$('stars').onclick=e=>{if(e.target.dataset.n){rate=+e.target.dataset.n;stars()}};
$('save').onclick=()=>{if(!cur)return alert('Generate or build an outfit first.');saved.push({...cur,rate});localStorage.setItem('outfits',JSON.stringify(saved));drawSaved()};
function drawSaved(){$('saved').innerHTML=saved.length?saved.map((s,i)=>`<div class="sv"><span>${s.occ}: ${s.top[0]}${s.bottom[0]}${s.shoes[0]} ${s.top[1]}, ${s.bottom[1]}, ${s.shoes[1]}</span><span>${'★'.repeat(s.rate)||'—'}</span><button class="alt" data-i="${i}">✕</button></div>`).join(''):'<p class="sub">No saved outfits yet.</p>'}
$('saved').onclick=e=>{if(e.target.dataset.i){saved.splice(e.target.dataset.i,1);localStorage.setItem('outfits',JSON.stringify(saved));drawSaved()}};
$('reset').onclick=()=>{cur=null;$('prev').innerHTML='';$('wxTip').textContent='';$('wx').value='';$('occ').selectedIndex=0;renderPick();stars()};
renderPick();drawSaved();stars();$('gen').click();

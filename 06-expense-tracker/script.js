const $=id=>document.getElementById(id);let E=JSON.parse(localStorage.getItem('exp')||'[]'),editId=null;
const C=['Food','Travel','Shopping','Bills','Entertainment','Other'];$('filter').innerHTML='<option value="">All categories</option>'+C.map(c=>`<option>${c}</option>`).join('');
$('date').valueAsDate=new Date();const inr=n=>'₹'+n.toLocaleString('en-IN',{maximumFractionDigits:2});
function save(){localStorage.setItem('exp',JSON.stringify(E))}
function draw(){const f=$('filter').value,L=E.filter(e=>!f||e.cat===f).sort((a,b)=>b.date.localeCompare(a.date));
 const tot=E.reduce((s,e)=>s+e.amt,0),td=new Date().toISOString().slice(0,10);
 $('total').textContent=inr(tot);$('today').textContent=inr(E.filter(e=>e.date===td).reduce((s,e)=>s+e.amt,0));
 const by=Object.fromEntries(C.map(c=>[c,E.filter(e=>e.cat===c).reduce((s,e)=>s+e.amt,0)]));const mx=Math.max(...Object.values(by));
 $('top').textContent=mx>0?Object.keys(by).find(k=>by[k]===mx):'—';
 $('bars').innerHTML=C.map(c=>`<div class="brow">${c} — <b>${inr(by[c])}</b><div class="bar" style="width:${mx?by[c]/mx*100:0}%"></div></div>`).join('');
 $('list').innerHTML=L.length?L.map(e=>`<div class="item"><div><b>${e.title.replace(/</g,'&lt;')}</b><br><span class="sub">${e.cat} · ${e.date}</span></div><b>${inr(e.amt)}</b><button class="alt" data-e="${e.id}">Edit</button><button data-d="${e.id}">Delete</button></div>`).join(''):'<p class="sub">No expenses yet. Add your first one above.</p>'}
$('f').onsubmit=ev=>{ev.preventDefault();const t=$('title').value.trim(),a=parseFloat($('amt').value);
 if(!t||!(a>0)||!$('date').value){$('err').textContent='Enter a title, an amount above 0 and a date.';return}$('err').textContent='';
 const o={id:editId||Date.now(),title:t,amt:a,cat:$('cat').value,date:$('date').value};
 if(editId)E=E.map(e=>e.id===editId?o:e);else E.push(o);editId=null;$('ft').textContent='Add expense';$('title').value=$('amt').value='';save();draw()};
$('list').onclick=ev=>{const d=ev.target.dataset.d,ed=ev.target.dataset.e;
 if(d){E=E.filter(e=>e.id!=d);save();draw()}
 if(ed){const e=E.find(x=>x.id==ed);editId=e.id;$('title').value=e.title;$('amt').value=e.amt;$('cat').value=e.cat;$('date').value=e.date;$('ft').textContent='Edit expense';scrollTo({top:0,behavior:'smooth'})}};
$('filter').onchange=draw;draw();

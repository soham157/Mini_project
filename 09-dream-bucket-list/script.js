const $=id=>document.getElementById(id);const CATS=['Travel','Career','Learning','Adventure','Health','Personal'];
const Qs=['Dream big, start small.','Every great journey begins with a single step.','Your future self is cheering for you.','Do something today your future self will thank you for.'];
let D=JSON.parse(localStorage.getItem('dreams')||'[]'),editId=null;const esc=s=>s.replace(/</g,'&lt;');
$('fc').innerHTML='<option value="">All categories</option>'+CATS.map(c=>`<option>${c}</option>`).join('');
$('quote').textContent=Qs[Math.floor(Math.random()*Qs.length)];
const save=()=>localStorage.setItem('dreams',JSON.stringify(D));
function draw(){const done=D.filter(x=>x.done).length,pc=D.length?Math.round(done/D.length*100):0;$('pct').textContent=pc+'%';$('cnt').textContent=`${done} of ${D.length}`;$('fill').style.width=pc+'%';
 if(D.length&&pc===100)$('quote').textContent='🎉 Every dream completed — time to dream bigger!';
 const q=$('s').value.toLowerCase(),c=$('fc').value,s=$('fs').value,order={High:0,Medium:1,Low:2};
 const L=D.filter(x=>x.t.toLowerCase().includes(q)&&(!c||x.c===c)&&(!s||(s==='done')===x.done)).sort((a,b)=>a.done-b.done||order[a.p]-order[b.p]);
 $('list').innerHTML=L.length?L.map(x=>`<div class="dream ${x.done?'done':''}"><input type="checkbox" style="width:22px" ${x.done?'checked':''} data-k="${x.id}" aria-label="Mark complete"><div><b>${esc(x.t)}</b><br><span class="pill">${x.c}</span> <span class="pill ${x.p}">${x.p}</span> <span class="sub">${x.d||''}</span></div><button class="alt" data-e="${x.id}">Edit</button><button data-x="${x.id}">Delete</button></div>`).join(''):'<p class="sub">No dreams here yet. Add your first one above.</p>'}
$('f').onsubmit=e=>{e.preventDefault();const t=$('t').value.trim();if(!t){$('err').textContent='Write your dream first.';return}$('err').textContent='';
 const o={id:editId||Date.now(),t,c:$('c').value,p:$('p').value,d:$('d').value,done:editId?D.find(x=>x.id===editId).done:false};
 D=editId?D.map(x=>x.id===editId?o:x):[...D,o];editId=null;$('ft').textContent='Add a dream';$('t').value='';$('d').value='';save();draw()};
$('list').onclick=e=>{const k=e.target.dataset.k,x=e.target.dataset.x,ed=e.target.dataset.e;
 if(k){const d=D.find(y=>y.id==k);d.done=!d.done;save();draw()}
 if(x){D=D.filter(y=>y.id!=x);save();draw()}
 if(ed){const d=D.find(y=>y.id==ed);editId=d.id;$('t').value=d.t;$('c').value=d.c;$('p').value=d.p;$('d').value=d.d;$('ft').textContent='Edit dream';scrollTo({top:0,behavior:'smooth'})}};
['s','fc','fs'].forEach(i=>$(i).addEventListener('input',draw));draw();

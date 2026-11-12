const $=id=>document.getElementById(id);const ALL=['Mon','Tue','Wed','Thu','Fri','Sat'];
let S=JSON.parse(localStorage.getItem('tt_subjects')||'[]'),grid=JSON.parse(localStorage.getItem('tt_grid')||'null');
$('days').innerHTML=ALL.map((d,i)=>`<label style="display:flex;gap:6px;margin:0"><input type="checkbox" style="width:auto" value="${d}" ${i<5?'checked':''}>${d}</label>`).join('');
const esc=s=>String(s).replace(/</g,'&lt;');
const days=()=>[...$('days').querySelectorAll('input:checked')].map(i=>i.value);
const ppd=()=>Math.max(1,Math.min(10,+$('ppd').value||6));
const saveS=()=>{localStorage.setItem('tt_subjects',JSON.stringify(S));drawS()};
function drawS(){$('slist').innerHTML=S.map((s,i)=>`<span class="tag"><b>${esc(s.name)}</b> ${esc(s.teacher)} · ${esc(s.room)} · ${s.per}/wk <button type="button" data-i="${i}">✕</button></span>`).join('')||'<p class="sub">No subjects yet.</p>';
 $('view').innerHTML='<option value="">Whole class</option>'+[...new Set(S.map(s=>s.teacher))].map(t=>`<option>${esc(t)}</option>`).join('')}
$('sf').onsubmit=e=>{e.preventDefault();const n=$('sn').value.trim(),t=$('st').value.trim(),r=$('sr').value.trim(),p=+$('sp').value;
 if(!n||!t||!r||!(p>0)){$('err').textContent='Fill subject, teacher, classroom and periods per week.';return}
 if(S.some(s=>s.name.toLowerCase()===n.toLowerCase())){$('err').textContent='That subject already exists.';return}
 $('err').textContent='';S.push({name:n,teacher:t,room:r,per:p});['sn','st','sr','sp'].forEach(i=>$(i).value='');saveS()};
$('slist').onclick=e=>{if(e.target.dataset.i){S.splice(e.target.dataset.i,1);saveS()}};
function generate(){const D=days(),P=ppd(),slots=D.length*P,need=S.reduce((a,s)=>a+s.per,0);const st=$('status');
 if(!D.length||!S.length){st.textContent='Choose working days and add at least one subject.';st.className='msg bad';return}
 if(need>slots){st.textContent=`Too many periods: ${need} required but only ${slots} slots available.`;st.className='msg bad';return}
 // spread each subject across days: shuffle days per subject, max ceil(per/days) per day
 let g=D.map(()=>Array(P).fill(null));const load=D.map(()=>0);
 const order=[...S].sort((a,b)=>b.per-a.per);
 for(const s of order){const cap=Math.ceil(s.per/D.length);const cnt=D.map(()=>0);
  for(let k=0;k<s.per;k++){let best=-1,bl=1e9;for(let d=0;d<D.length;d++){if(cnt[d]>=cap||load[d]>=P)continue;const sc=load[d]+Math.random()*.9+cnt[d]*2;if(sc<bl){bl=sc;best=d}}
   if(best<0)best=load.findIndex(l=>l<P);const free=g[best].map((v,i)=>v===null?i:-1).filter(i=>i>=0);
   // prefer slot where neighbouring period differs (avoid back-to-back same subject)
   const pick=free.filter(i=>g[best][i-1]!==s.name&&g[best][i+1]!==s.name);const slot=(pick.length?pick:free)[Math.floor(Math.random()*(pick.length?pick.length:free.length))];
   g[best][slot]=s.name;cnt[best]++;load[best]++}}
 grid={D,P,g};localStorage.setItem('tt_grid',JSON.stringify(grid));render();
 const free=slots-need;st.textContent=`Timetable generated — no clashes.${free?` ${free} free period(s) left.`:''}`;st.className='msg ok'}
function time(i){const [h,m]=$('start').value.split(':').map(Number);const t=h*60+m+i*(+$('dur').value||50);return String(Math.floor(t/60)%24).padStart(2,'0')+':'+String(t%60).padStart(2,'0')}
function conflicts(){const bad=new Set(),cnt={};if(!grid)return bad;grid.g.forEach((row,d)=>row.forEach((n,p)=>{if(!n)return;const s=S.find(x=>x.name===n);if(!s)return;
 // same subject more than 2x a day is flagged
 const k=d+'|'+n;cnt[k]=(cnt[k]||0)+1;if(cnt[k]>2)bad.add(d+'-'+p)}));return bad}
function render(){const t=$('tt');if(!grid){t.innerHTML='';return}const f=$('view').value,bad=conflicts();
 t.innerHTML='<tr><th>Day</th>'+Array.from({length:grid.P},(_,i)=>`<th>P${i+1}<br>${time(i)}</th>`).join('')+'</tr>'+
 grid.D.map((d,di)=>`<tr><th>${d}</th>`+grid.g[di].map((n,pi)=>{const s=S.find(x=>x.name===n);
  if(f){return `<td>${s&&s.teacher===f?`<b>${esc(n)}</b><br>${esc(s.room)}`:'—'}</td>`}
  return `<td class="${bad.has(di+'-'+pi)?'clash':''}"><select data-d="${di}" data-p="${pi}"><option value="">— Free —</option>${S.map(x=>`<option ${x.name===n?'selected':''}>${esc(x.name)}</option>`).join('')}</select>${s?`<small>${esc(s.teacher)} · ${esc(s.room)}</small>`:''}</td>`}).join('')+'</tr>').join('')}
$('tt').onchange=e=>{const d=e.target.dataset.d;if(d===undefined)return;grid.g[d][e.target.dataset.p]=e.target.value||null;localStorage.setItem('tt_grid',JSON.stringify(grid));render();
 const b=conflicts();$('status').textContent=b.size?`⚠️ ${b.size} clash(es): a subject appears more than twice in a day.`:'Edit saved — no clashes.';$('status').className='msg '+(b.size?'bad':'ok')};
$('gen').onclick=generate;$('regen').onclick=generate;$('view').onchange=render;$('print').onclick=()=>window.print();
$('clear').onclick=()=>{if(confirm('Clear all subjects and the timetable?')){S=[];grid=null;localStorage.removeItem('tt_grid');saveS();render();$('status').textContent=''}};
drawS();render();

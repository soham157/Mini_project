// Each "picture" is a grid of emoji; the right grid has swapped emoji to spot.
const SETS=[['🌳','🏠','☁️','🐦','🌸','🐄','☀️','🚗','🌼'],['🐠','🐙','🦀','🐚','🌊','⭐','🐡','🪸','🐬'],['🍎','🍌','🍇','🍓','🍊','🍍','🥝','🍒','🍉']];
const LV=[{n:5,d:3,t:60},{n:6,d:5,t:75},{n:7,d:7,t:90}];
const $=id=>document.getElementById(id);let lvl=0,total=0,sc=0,found,diff,t,iv,A,B;
function show(id){['welcome','game','result'].forEach(s=>$(s).classList.toggle('hidden',s!==id))}
function build(){const L=LV[lvl],S=SETS[lvl],N=L.n*L.n;A=Array.from({length:N},()=>S[Math.floor(Math.random()*S.length)]);B=[...A];
 diff=[];while(diff.length<L.d){const k=Math.floor(Math.random()*N);if(!diff.includes(k)){diff.push(k);let r;do r=S[Math.floor(Math.random()*S.length)];while(r===A[k]);B[k]=r}}
 found=[];[['A',A],['B',B]].forEach(([id,g])=>{const el=$(id);el.style.setProperty('--n',L.n);el.innerHTML=g.map((e,i)=>`<div class="cell" data-i="${i}">${e}</div>`).join('')});
 t=L.t;$('fb').textContent='';stat();clearInterval(iv);iv=setInterval(()=>{t--;stat();if(t<=0)end(false)},1000)}
function stat(){$('lv').textContent='Level '+(lvl+1);$('found').textContent=`Found ${found.length}/${diff.length}`;$('timer').textContent='⏱ '+t+'s';$('score').textContent='Score '+sc}
function end(win){clearInterval(iv);if(win)sc+=t*2+50;stat();
 $('rt').textContent=win?'🎉 Level complete!':"⏰ Time's up!";$('rs').textContent=win?`Score so far: ${sc}`:`You found ${found.length} of ${diff.length}. Final score: ${sc}`;
 const last=lvl===LV.length-1;$('next').classList.toggle('hidden',!win||last);if(win&&last){$('rt').textContent='🏆 All levels cleared!';$('rs').textContent='Final score: '+sc}show('result')}
$('B').onclick=e=>{const c=e.target.closest('.cell');if(!c)return;const i=+c.dataset.i;if(found.includes(i))return;
 if(diff.includes(i)){found.push(i);c.classList.add('hit');$('A').children[i].classList.add('hit');sc+=20;$('fb').textContent='Nice catch! ✅';$('fb').className='msg ok';stat();if(found.length===diff.length)end(true)}
 else{sc=Math.max(0,sc-5);t=Math.max(0,t-3);c.classList.add('miss');setTimeout(()=>c.classList.remove('miss'),300);$('fb').textContent='Not a difference (-5 points, -3s)';$('fb').className='msg bad';stat()}};
$('hint').onclick=()=>{const k=diff.find(d=>!found.includes(d));if(k===undefined)return;sc=Math.max(0,sc-10);$('B').children[k].classList.add('hint');stat()};
$('go').onclick=()=>{lvl=0;sc=0;show('game');build()};$('next').onclick=()=>{lvl++;show('game');build()};$('again').onclick=()=>show('welcome');

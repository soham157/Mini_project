const Q={
'General Knowledge':[['Which planet is known as the Red Planet?',['Venus','Mars','Jupiter','Mercury'],1],['How many continents are there?',['5','6','7','8'],2],['Which is the largest ocean?',['Atlantic','Indian','Arctic','Pacific'],3],['Who wrote "Romeo and Juliet"?',['Dickens','Shakespeare','Tolstoy','Austen'],1],['What is the capital of Japan?',['Seoul','Beijing','Tokyo','Bangkok'],2]],
'Web Development':[['What does HTML stand for?',['HyperText Markup Language','High Tech Modern Language','Hyper Transfer Markup Logic','None'],0],['Which language adds interactivity to web pages?',['CSS','HTML','JavaScript','XML'],2],['Which CSS property changes text colour?',['font-color','color','text-style','fg'],1],['Which tag creates a hyperlink?',['<link>','<a>','<href>','<url>'],1],['Which method selects an element by id?',['getElementById','queryId','selectId','findId'],0]],
'Science':[['What gas do plants absorb?',['Oxygen','Nitrogen','Carbon dioxide','Helium'],2],['H2O is the formula for?',['Salt','Water','Hydrogen','Acid'],1],['What is the speed of light approx.?',['3×10⁸ m/s','3×10⁶ m/s','3×10⁴ m/s','3×10¹⁰ m/s'],0],['Which organ pumps blood?',['Lung','Liver','Heart','Kidney'],2],['The force that pulls objects to Earth is?',['Friction','Gravity','Magnetism','Tension'],1]]};
const esc=s=>String(s).replace(/</g,'&lt;');const $=id=>document.getElementById(id);let qs,ans,i,t,iv;
$('cat').innerHTML=Object.keys(Q).map(c=>`<option>${c}</option>`).join('');
function show(id){['welcome','quiz','result'].forEach(s=>$(s).classList.toggle('hidden',s!==id))}
function start(){qs=Q[$('cat').value];ans=Array(qs.length).fill(null);i=0;t=qs.length*20;clearInterval(iv);iv=setInterval(()=>{t--;tick();if(t<=0)finish()},1000);show('quiz');draw()}
function tick(){$('timer').textContent='⏱ '+Math.floor(t/60)+':'+String(t%60).padStart(2,'0')}
function draw(){const q=qs[i];$('prog').textContent=`Question ${i+1} of ${qs.length}`;$('q').textContent=q[0];$('warn').textContent='';tick();
 $('opts').innerHTML=q[1].map((o,k)=>`<button class="opt ${ans[i]===k?'sel':''}" data-k="${k}">${String.fromCharCode(65+k)}. ${o.replace(/</g,'&lt;')}</button>`).join('');
 $('prev').disabled=i===0;$('next').classList.toggle('hidden',i===qs.length-1);$('submit').classList.toggle('hidden',i!==qs.length-1);
 $('dots').innerHTML=qs.map((_,k)=>`<span class="dot ${ans[k]!==null?'done':''} ${k===i?'cur':''}" data-n="${k}">${k+1}</span>`).join('')}
$('opts').onclick=e=>{const k=e.target.dataset.k;if(k===undefined)return;ans[i]=+k;draw()};
$('dots').onclick=e=>{const n=e.target.dataset.n;if(n!==undefined){i=+n;draw()}};
$('next').onclick=()=>{if(ans[i]===null){$('warn').textContent='Select an answer before moving on.';return}i++;draw()};
$('prev').onclick=()=>{i--;draw()};
$('submit').onclick=()=>{if(ans.includes(null)&&!confirm('Some questions are unanswered. Submit anyway?'))return;finish()};
function finish(){clearInterval(iv);const sc=qs.reduce((s,q,k)=>s+(ans[k]===q[2]?1:0),0);const p=Math.round(sc/qs.length*100);
 $('rt').textContent=`You scored ${sc} / ${qs.length} (${p}%)`;$('rs').textContent=p>=80?'Excellent work! 🏆':p>=50?'Good effort — keep practising.':'Keep learning, you will get there!';
 $('rev').innerHTML=qs.map((q,k)=>`<p style="margin:8px 0"><b>${k+1}. ${q[0]}</b><br><span class="${ans[k]===q[2]?'ok':'bad'}">Your answer: ${ans[k]===null?'—':esc(q[1][ans[k]])}</span>${ans[k]===q[2]?'':` · Correct: ${esc(q[1][q[2]])}`}</p>`).join('')+'<br>';show('result')}
$('go').onclick=start;$('again').onclick=()=>show('welcome');

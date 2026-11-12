const P={easy:['The sun is bright and the sky is blue. We walk to the park every morning with our dog.','A small cat sat on the warm mat and watched the birds fly over the green trees.'],
medium:['Learning to code takes patience and practice, but every small program you finish makes the next one a little easier to build.','Good habits are built one day at a time, and consistent effort will always beat occasional bursts of motivation.'],
hard:['Asynchronous JavaScript functions, such as promises and callbacks, require careful handling; otherwise, unexpected errors may occur at runtime!','Quick, brown foxes jumped over 12 lazy dogs while 7 wizards boxed: "Pack my box with five dozen liquor jugs."']};
const T={easy:60,medium:45,hard:30};const $=id=>document.getElementById(id);let txt,t,iv,started,lvl;
$('best').textContent=localStorage.getItem('wpmBest')||0;
function show(id){['welcome','test','result'].forEach(s=>$(s).classList.toggle('hidden',s!==id))}
function start(){lvl=$('lvl').value;const a=P[lvl];txt=a[Math.floor(Math.random()*a.length)];t=T[lvl];started=false;clearInterval(iv);
 $('in').value='';$('in').disabled=false;$('time').textContent=t;$('wpm').textContent=0;$('acc').textContent=100;$('err').textContent=0;paint('');show('test');$('in').focus()}
function stats(v){let e=0;for(let i=0;i<v.length;i++)if(v[i]!==txt[i])e++;const mins=(T[lvl]-t)/60||1/60;const w=Math.round(((v.length-e)/5)/mins);
 return{e,w:Math.max(0,w),a:v.length?Math.round((v.length-e)/v.length*100):100}}
function paint(v){$('text').innerHTML=[...txt].map((c,i)=>`<span class="${i<v.length?(v[i]===c?'ok':'bad'):''} ${i===v.length?'cur':''}">${c===' '?'&nbsp;':c.replace('<','&lt;')}</span>`).join('')}
$('in').addEventListener('input',()=>{const v=$('in').value;if(!started){started=true;iv=setInterval(()=>{t--;$('time').textContent=t;live();if(t<=0)end()},1000)}
 paint(v);live();if(v.length>=txt.length)end()});
function live(){const s=stats($('in').value);$('wpm').textContent=s.w;$('acc').textContent=s.a;$('err').textContent=s.e}
function end(){clearInterval(iv);$('in').disabled=true;const s=stats($('in').value);$('rw').textContent=s.w;$('ra').textContent=s.a+'%';$('re').textContent=s.e;
 const b=+localStorage.getItem('wpmBest')||0;if(s.w>b){localStorage.setItem('wpmBest',s.w);$('best').textContent=s.w;$('rm').textContent='🏆 New personal best!'}else $('rm').textContent=s.w>=40?'Great speed!':'Keep practising — speed comes with accuracy.';show('result')}
$('go').onclick=start;$('restart').onclick=start;$('again').onclick=()=>show('welcome');

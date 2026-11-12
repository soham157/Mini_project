const LEVELS={easy:{max:50,tries:10},medium:{max:100,tries:7},hard:{max:200,tries:5}};
const $=id=>document.getElementById(id);
let secret,max,tries,used,guesses;
$('best').textContent=localStorage.getItem('best')||0;
function show(id){['start','game','result'].forEach(s=>$(s).classList.toggle('hidden',s!==id))}
function startGame(){const L=LEVELS[$('level').value];max=L.max;tries=L.tries;used=0;guesses=[];
 secret=Math.floor(Math.random()*max)+1;$('range').textContent='1 and '+max;$('left').textContent=tries;$('used').textContent=0;
 $('hint').textContent='';$('hint').className='msg';$('history').textContent='none yet';$('guess').value='';show('game');$('guess').focus()}
function finish(won){const left=tries-used;const score=won?Math.max(10,left*10+(max>100?50:max>50?20:0)+10):0;
 $('resTitle').textContent=won?'🎉 You got it!':'😢 Out of attempts';
 $('resText').textContent=won?'Brilliant guessing!':'Better luck next time.';
 $('secret').textContent=secret;$('resAtt').textContent=used;$('score').textContent=score;
 if(score>(+localStorage.getItem('best')||0)){localStorage.setItem('best',score);$('best').textContent=score}
 show('result')}
function submit(){const v=Number($('guess').value);const h=$('hint');
 if(!Number.isInteger(v)||v<1||v>max){h.textContent=`Enter a whole number from 1 to ${max}.`;h.className='msg bad';return}
 used++;guesses.push(v);$('used').textContent=used;$('left').textContent=tries-used;$('history').textContent=guesses.join(', ');$('guess').value='';
 if(v===secret)return finish(true);
 if(used>=tries)return finish(false);
 h.textContent=v<secret?'Too Low! Try a Higher Number':'Too High! Try a Lower Number';h.className='msg bad'}
$('startBtn').onclick=startGame;$('submitBtn').onclick=submit;$('again').onclick=()=>show('start');
$('guess').addEventListener('keydown',e=>{if(e.key==='Enter')submit()});

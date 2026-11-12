// Picture clues are emoji sets so the game works offline with no image files.
const D={'Hollywood':[['🦁👑🌅','The Lion King',['The Lion King','Madagascar','Jumanji','Tarzan'],'Disney animated classic set in Africa'],['🚢🧊💔','Titanic',['Titanic','Poseidon','Avatar','Cast Away'],'A famous ship and a famous iceberg'],['🕷️🧑‍🎓🏙️','Spider-Man',['Batman','Spider-Man','Ant-Man','Daredevil'],'Your friendly neighbourhood hero'],['🦖🧬🏝️','Jurassic Park',['Godzilla','Kong','Jurassic Park','Avatar'],'Dinosaurs brought back to life'],['🧙‍♂️💍🌋','The Lord of the Rings',['Harry Potter','The Hobbit','The Lord of the Rings','Narnia'],'One ring to rule them all']],
'Bollywood':[['🏎️🎓😂','3 Idiots',['3 Idiots','Dhoom','Chhichhore','Student of the Year'],'All is well!'],['🐯🇮🇳🕵️','Tiger Zinda Hai',['War','Pathaan','Tiger Zinda Hai','Don'],'A spy action film'],['👑🔥⚔️','Bajirao Mastani',['Padmaavat','Bajirao Mastani','Jodhaa Akbar','Mohenjo Daro'],'A Maratha epic romance'],['🚂💃🇮🇳','Chennai Express',['Chennai Express','Dilwale','Om Shanti Om','Jab Tak Hai Jaan'],'A train journey to the south'],['🤼‍♀️🏆🇮🇳','Dangal',['Sultan','Dangal','Mary Kom','Chak De India'],'Wrestling champion daughters']],
'Animation':[['🐠🔍🌊','Finding Nemo',['Finding Nemo','Moana','Shark Tale','Luca'],'A clownfish dad searches the ocean'],['🤠🧸🚀','Toy Story',['Cars','Toy Story','Up','Coco'],'To infinity and beyond!'],['🐼🥋🍜','Kung Fu Panda',['Kung Fu Panda','Madagascar','Bolt','Rio'],'Skadoosh!'],['❄️👸⛄','Frozen',['Tangled','Frozen','Brave','Moana'],'Let it go'],['🐀👨‍🍳🇫🇷','Ratatouille',['Ratatouille','Flushed Away','Cars','Soul'],'Anyone can cook']]};
const $=id=>document.getElementById(id);let qs,i,sc,t,iv,locked,hint;
$('cat').innerHTML=Object.keys(D).map(c=>`<option>${c}</option>`).join('');
function show(id){['welcome','game','result'].forEach(s=>$(s).classList.toggle('hidden',s!==id))}
function shuffle(a){return a.map(x=>[Math.random(),x]).sort((a,b)=>a[0]-b[0]).map(x=>x[1])}
function start(){qs=shuffle(D[$('cat').value]);i=0;sc=0;show('game');load()}
function load(){const q=qs[i];locked=false;hint=false;t=20;clearInterval(iv);iv=setInterval(()=>{t--;$('timer').textContent='⏱ '+t;if(t<=0)answer(null)},1000);
 $('prog').textContent=`Movie ${i+1} of ${qs.length}`;$('score').textContent='Score: '+sc;$('timer').textContent='⏱ 20';$('clue').textContent=q[0];$('hint').textContent='';$('fb').textContent='';
 $('opts').innerHTML=shuffle(q[2]).map(o=>`<button class="opt">${o}</button>`).join('');$('next').classList.add('hidden');$('hbtn').disabled=false}
function answer(a){if(locked)return;locked=true;clearInterval(iv);const q=qs[i];
 document.querySelectorAll('.opt').forEach(b=>{if(b.textContent===q[1])b.classList.add('right');else if(b.textContent===a)b.classList.add('wrong')});
 if(a===q[1]){sc+=hint?5:10;$('fb').textContent='Correct! 🎉';$('fb').className='msg ok'}else{$('fb').textContent=(a===null?"Time's up! ":'Wrong. ')+'It was '+q[1];$('fb').className='msg bad'}
 $('score').textContent='Score: '+sc;$('next').textContent=i===qs.length-1?'See Result':'Next';$('next').classList.remove('hidden')}
$('opts').onclick=e=>{if(e.target.classList.contains('opt'))answer(e.target.textContent)};
$('hbtn').onclick=()=>{if(locked)return;hint=true;$('hint').textContent='💡 '+qs[i][3];$('hbtn').disabled=true};
$('next').onclick=()=>{if(++i<qs.length)load();else{$('rt').textContent=`Final score: ${sc} / ${qs.length*10}`;$('rs').textContent=sc>=40?'Movie buff! 🍿':sc>=20?'Not bad at all!':'Time for a movie marathon!';show('result')}};
$('go').onclick=start;$('again').onclick=()=>show('welcome');

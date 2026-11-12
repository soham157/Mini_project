const $=id=>document.getElementById(id),cv=$('c'),x=cv.getContext('2d');
let ship,bullets,enemies,stars,score,lives,diff,keys={},last=0,run=false,spawn=0,cool=0,power=0,pups=[],raf;
$('hi').textContent=localStorage.getItem('spaceHi')||0;
function show(id){['welcome','game','over'].forEach(s=>$(s).classList.toggle('hidden',s!==id))}
function start(){diff=+$('lvl').value;ship={x:240,y:510,w:36,h:30};bullets=[];enemies=[];pups=[];score=0;lives=3;power=0;spawn=0;
 stars=Array.from({length:60},()=>({x:Math.random()*480,y:Math.random()*560,s:Math.random()*1.5+.5}));hud();show('game');run=true;last=performance.now();cancelAnimationFrame(raf);raf=requestAnimationFrame(loop)}
function hud(){$('sc').textContent=score;$('lv').textContent='❤️'.repeat(lives);$('pw').textContent=power>0?'⚡ Rapid fire':''}
function loop(n){if(!run)return;const dt=Math.min(.05,(n-last)/1000);last=n;update(dt);draw();raf=requestAnimationFrame(loop)}
function update(dt){const sp=300;if(keys.ArrowLeft||keys.a)ship.x-=sp*dt;if(keys.ArrowRight||keys.d)ship.x+=sp*dt;ship.x=Math.max(20,Math.min(460,ship.x));
 cool-=dt;power=Math.max(0,power-dt);if(keys[' ']&&cool<=0){bullets.push({x:ship.x,y:ship.y-18});cool=power>0?.1:.3}
 bullets.forEach(b=>b.y-=520*dt);bullets=bullets.filter(b=>b.y>-10);
 spawn-=dt;if(spawn<=0){enemies.push({x:30+Math.random()*420,y:-30,v:(60+diff*40)*(1+score/800),w:32,h:28});spawn=Math.max(.35,1.3-diff*.25-score/1500)}
 enemies.forEach(e=>e.y+=e.v*dt);pups.forEach(p=>p.y+=90*dt);
 for(const e of enemies){for(const b of bullets){if(Math.abs(b.x-e.x)<e.w/2+3&&Math.abs(b.y-e.y)<e.h/2+6){e.dead=b.dead=true;score+=10*diff;if(Math.random()<.1)pups.push({x:e.x,y:e.y})}}
  if(!e.dead&&Math.abs(e.x-ship.x)<(e.w+ship.w)/2-4&&Math.abs(e.y-ship.y)<(e.h+ship.h)/2-4){e.dead=true;lives--}
  else if(!e.dead&&e.y>580){e.dead=true;lives--}}
 enemies=enemies.filter(e=>!e.dead);bullets=bullets.filter(b=>!b.dead);
 pups=pups.filter(p=>{if(Math.abs(p.x-ship.x)<24&&Math.abs(p.y-ship.y)<24){power=8;return false}return p.y<580});
 stars.forEach(s=>{s.y+=s.s*40*dt;if(s.y>560)s.y=0});hud();if(lives<=0)over()}
function draw(){x.clearRect(0,0,480,560);x.fillStyle='#fff';stars.forEach(s=>x.fillRect(s.x,s.y,s.s,s.s));
 x.font='30px serif';x.textAlign='center';x.textBaseline='middle';x.fillText('🚀',ship.x,ship.y);
 x.fillStyle='#ffd166';bullets.forEach(b=>x.fillRect(b.x-2,b.y-8,4,14));enemies.forEach(e=>x.fillText('👾',e.x,e.y));pups.forEach(p=>x.fillText('⚡',p.x,p.y))}
function over(){run=false;$('fs').textContent=score;const h=+localStorage.getItem('spaceHi')||0;
 if(score>h){localStorage.setItem('spaceHi',score);$('hi').textContent=score;$('nh').textContent='🏆 New high score!'}else $('nh').textContent='';show('over')}
addEventListener('keydown',e=>{const k=e.key.length===1?e.key.toLowerCase():e.key;keys[k]=true;if([' ','ArrowLeft','ArrowRight'].includes(e.key)&&run)e.preventDefault()});
addEventListener('keyup',e=>{keys[e.key.length===1?e.key.toLowerCase():e.key]=false});
[['L','ArrowLeft'],['R','ArrowRight'],['S',' ']].forEach(([id,k])=>{const b=$(id);['pointerdown'].forEach(ev=>b.addEventListener(ev,e=>{e.preventDefault();keys[k]=true}));['pointerup','pointerleave','pointercancel'].forEach(ev=>b.addEventListener(ev,()=>keys[k]=false))});
$('go').onclick=start;$('again').onclick=()=>show('welcome');

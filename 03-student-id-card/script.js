const $=id=>document.getElementById(id);
const map={vEnr:'enr',vSid:'sid',vNm:'nm',vGd:'gd',vDep:'dep',vCls:'cls',vEmg:'emg',vBld:'bld',vEm:'em',vPh2:'ph'};
function render(){$('vUni').textContent=$('uni').value.toUpperCase();$('vTag').textContent=$('tag').value;
 for(const [o,i] of Object.entries(map))$(o).textContent=$(i).value||'—';
 document.querySelectorAll('.id').forEach(c=>c.style.setProperty('--c',$('clr').value))}
$('form').addEventListener('submit',e=>{e.preventDefault();render()});
$('form').addEventListener('input',render);
$('photo').addEventListener('change',e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();
 r.onload=()=>{$('vPh').style.backgroundImage=`url(${r.result})`;$('vPh').textContent=''};r.readAsDataURL(f)});
$('print').onclick=()=>window.print();render();

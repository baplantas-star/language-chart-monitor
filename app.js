const tbody=document.getElementById('rows'),tip=document.getElementById('tooltip');
let active=null;
const escapeHtml=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const keys=Object.keys(glossary).sort((a,b)=>b.length-a.length);
const pattern=new RegExp(keys.map(s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|'),'gi');
rows.forEach(row=>{const tr=document.createElement('tr');tr.innerHTML=`<th scope="row">${row.level===6?'Level':'End of Level'} ${row.level}</th>`;row.cells.forEach((text,i)=>{const td=document.createElement('td');td.innerHTML=escapeHtml(text).replace(pattern,match=>`<button class="feature" data-key="${match.toLowerCase()}" data-cell="${row.level}-${i}" data-context="${['Discourse','Sentence','Word/Phrase'][i]} · ${row.level===6?'Level':'End of Level'} ${row.level}" aria-controls="tooltip" aria-expanded="false">${match}</button>`);tr.append(td)});tbody.append(tr)});
function hide(){tip.hidden=true;active?.classList.remove('active');active?.setAttribute('aria-expanded','false');active=null}
function position(){if(!active)return;const r=active.getBoundingClientRect(),w=tip.offsetWidth,h=tip.offsetHeight;let left=Math.min(Math.max(12,r.left),innerWidth-w-12),top=r.bottom+9;if(top+h>innerHeight-12)top=Math.max(12,r.top-h-9);tip.style.left=left+'px';tip.style.top=top+'px'}
function show(button){
 hide();active=button;button.classList.add('active');button.setAttribute('aria-expanded','true');
 const guide=cellGuides[button.dataset.cell],item=glossary[button.dataset.key];
 document.getElementById('context').textContent=button.dataset.context;
 document.getElementById('term').textContent=guide.title;
 document.getElementById('definition').textContent=guide.focus;
 document.getElementById('examples').replaceChildren(...guide.examples.map(([label,text])=>{
  const li=document.createElement('li'),strong=document.createElement('strong');strong.textContent=label+': ';li.append(strong,document.createTextNode(text));return li;
 }));
 document.getElementById('examples-heading').textContent='WHAT THIS CAN LOOK LIKE';
 document.getElementById('source-label').textContent='Original illustrations of this cell · Not scoring criteria';
 document.getElementById('glossary-title').textContent=(item.entry||button.textContent)+' — '+(item.definitionSource==='WIDA'?'WIDA definition':'supplemental definition');
 document.getElementById('glossary-definition').textContent=item.definition;
 document.getElementById('glossary-detail').open=false;
 configurePopup(button);tip.hidden=false;position();
}
document.querySelectorAll('.feature').forEach(button=>button.addEventListener('click',()=>{if(active===button)hide();else show(button)}));
document.getElementById('close').addEventListener('click',hide);document.addEventListener('keydown',e=>{if(e.key==='Escape')hide()});document.addEventListener('click',e=>{if(!tip.contains(e.target)&&!e.target.closest('.feature'))hide()});window.addEventListener('resize',position);document.addEventListener('scroll',position,true);

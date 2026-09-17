const dimensions=['Discourse','Sentence','Word/Phrase'];
const featureGroups={
 '6-0':['Organizational patterns','Cohesion','Audience engagement'],
 '6-1':['Compound sentences','Complex sentences','Compound-complex sentences','Embedded relative clauses','Conditional clauses'],
 '6-2':['Shades of meaning','Figurative language'],
 '5-0':['Given/new information','Whole/part relationships','Paragraph openers'],
 '5-1':['Compound sentences','Complex sentences','Clause variation'],
 '5-2':['Modal verbs','Hedging','Evaluative expressions'],
 '4-0':['Substitution','Ellipsis','Parallelism'],
 '4-1':['Compound sentences','Complex sentences','Sentence variation'],
 '4-2':['Abstract nouns','Adverbials'],
 '3-0':['Synonyms','Parallel expressions'],
 '3-1':['Simple sentences','Compound sentences','Sentence variation'],
 '3-2':['Collocations','Idiomatic expressions'],
 '2-0':['Organizational patterns','Demonstratives','Pronoun referencing','Conjunctions'],
 '2-1':['Simple sentences','Dependent clauses'],
 '2-2':['Technical vocabulary'],
 '1-0':['Sequencing','Repetition','Transitions'],
 '1-1':['Simple sentences','Sentence variation'],
 '1-2':['Multiple-meaning words']
};
const storageKey='language-chart-monitor-v1';
const $=id=>document.getElementById(id);
const localDate=()=>{const d=new Date();return new Date(d.getTime()-d.getTimezoneOffset()*60000).toISOString().slice(0,10)};
const blank=student=>({student:student||'',date:localDate(),mode:'Writing',task:'',supports:'',taught:'',sample:'',next:'',nextDimension:'',nextNote:'',observations:[]});
let records=[],draft=blank(),editing=null,monitoring=false,storeError=false,selectedCell=null;
const fields=['student','date','mode','task','supports','taught','sample','nextNote'];
const uid=()=>crypto.randomUUID();
function announce(message){$('monitor-status').textContent=message}
function persist(){
 try{localStorage.setItem(storageKey,JSON.stringify({records,draft,editing}));storeError=false;return true}
 catch(e){storeError=true;announce('Browser storage is unavailable or full. Your work remains on this page, but will not survive closing it. Print a copy before leaving.');return false}
}
function load(){
 try{
  const raw=localStorage.getItem(storageKey);
  if(raw){const data=JSON.parse(raw);if(!Array.isArray(data.records)||!data.draft||!Array.isArray(data.draft.observations))throw Error('Invalid stored data');records=data.records;draft={...blank(),...data.draft};editing=data.editing||null}
 }catch(e){storeError=true;announce('Saved browser data could not be read. Do not close this page if you have unsaved work.')}
}
function fill(){fields.forEach(k=>$(k).value=draft[k]||'');renderObservations();$('save-snapshot').textContent=editing?'Update snapshot':'Save snapshot'}
function observedKey(dimension,feature){return dimension+'|'+feature}
function rangeFor(observations){
 const highest=dimensions.map(dimension=>observations.filter(o=>o.dimension===dimension&&Number.isFinite(Number(o.level))).reduce((max,o)=>Math.max(max,Number(o.level)),0)).filter(Boolean);
 if(highest.length<2)return null;
 return {low:Math.min(...highest),high:Math.max(...highest),dimensions:highest.length};
}
function renderRange(){
 const range=rangeFor(draft.observations),target=$('range-summary');
 if(!range){target.textContent='Record features in at least two language dimensions to generate a suggested range.';return}
 target.replaceChildren();
 const strong=document.createElement('strong');strong.textContent=range.low===range.high?'Suggested Level '+range.low:'Suggested Levels '+range.low+'–'+range.high;
 target.append(strong,document.createTextNode(' · evidence recorded in '+range.dimensions+' of 3 dimensions.'));
}
function renderObservations(){
 $('observations').replaceChildren();
 dimensions.forEach(dimension=>{
  const list=draft.observations.filter(o=>o.dimension===dimension);
  const section=document.createElement('section'),h=document.createElement('h3');h.textContent=dimension;section.append(h);
  if(!list.length){const p=document.createElement('p');p.className='empty';p.textContent='No observations recorded yet.';section.append(p)}
  list.forEach(o=>{
   const card=document.createElement('div');card.className='observation';
   const name=document.createElement('strong');name.textContent=o.feature;
   const label=document.createElement('label');label.textContent='Evidence or teacher note';
   const input=document.createElement('textarea');input.rows=2;input.value=o.evidence;input.placeholder='Quote the sample or describe what you observed.';
   input.addEventListener('input',()=>{o.evidence=input.value;persist()});label.append(input);
   const remove=document.createElement('button');remove.type='button';remove.className='quiet';remove.textContent='Remove';remove.setAttribute('aria-label','Remove '+o.feature);
   remove.addEventListener('click',()=>{draft.observations=draft.observations.filter(x=>x!==o);persist();renderObservations();syncPopup()});
   card.append(name,label,remove);section.append(card);
  });$('observations').append(section);
 });
 renderRange();
 $('next-summary').textContent=draft.next?draft.nextDimension+' · '+draft.next:'Choose one feature from the chart.';
 $('clear-next').hidden=!draft.next;
 document.querySelectorAll('.feature').forEach(b=>{
  const dim=dimensions[Number(b.dataset.cell.split('-')[1])];
  const candidates=featuresForButton(b);
  const marked=draft.observations.some(o=>o.dimension===dim&&candidates.includes(o.feature));
  b.classList.toggle('observed',monitoring&&marked);
 });
}
function featuresForButton(button){
 const key=button.dataset.key,all=featureGroups[button.dataset.cell];
 const aliases={'technical language':['Technical vocabulary'],'pronouns':['Pronoun referencing'],'coherent, cohesive ideas':['Cohesion'],'logical flow':['Organizational patterns'],'different sentence structures':['Compound sentences','Complex sentences','Sentence variation'],'emerging variation in sentence structure':['Sentence variation'],'logical relationships':['Complex sentences','Conditional clauses'],'sentence types':all};
 if(aliases[key])return aliases[key].filter(v=>all.includes(v));
 const matches=all.filter(v=>key.includes(v.toLowerCase())||v.toLowerCase()===key);
 if(key==='compound and complex sentences')return ['Compound sentences','Complex sentences'];
 if(key==='simple and compound sentences')return ['Simple sentences','Compound sentences'];
 return matches.length?matches:all;
}
function configurePopup(button){
 $('record-feature').hidden=!monitoring;
 if(!monitoring)return;
 selectedCell=button.dataset.cell;
 const select=$('feature-choice');select.replaceChildren();
 const suggested=featuresForButton(button);
 featureGroups[selectedCell].forEach(name=>{const option=document.createElement('option');option.value=name;option.textContent=name;select.append(option)});
 select.value=suggested[0]||select.options[0].value;syncPopup();
}
function syncPopup(){
 if(!selectedCell)return;
 const feature=$('feature-choice').value,dimension=dimensions[Number(selectedCell.split('-')[1])];
 const o=draft.observations.find(x=>x.feature===feature&&x.dimension===dimension);
 $('feature-evidence').value=o?.evidence||'';
 $('observe-feature').textContent=o?'Update observation':'Observed in this sample';
 $('popup-next').textContent=draft.next===feature&&draft.nextDimension===dimension?'Selected as next focus':'Set as next focus';
}
function capture(feature,dimension,evidence){
 const found=draft.observations.find(o=>observedKey(o.dimension,o.feature)===observedKey(dimension,feature));
 if(found)found.evidence=evidence;else draft.observations.push({feature,dimension,evidence,level:Number(selectedCell.split('-')[0])});
 persist();renderObservations();syncPopup();announce('Observation recorded. Save a snapshot when your review is complete.');
}
function openMonitor(){
 monitoring=true;document.body.classList.add('monitoring');$('monitor-workspace').hidden=false;$('snapshot-area').hidden=false;$('reference-mode').setAttribute('aria-pressed','false');$('monitor-mode').setAttribute('aria-pressed','true');renderObservations();hide();
}
function referenceMode(){monitoring=false;document.body.classList.remove('monitoring');$('monitor-workspace').hidden=true;$('snapshot-area').hidden=true;$('reference-mode').setAttribute('aria-pressed','true');$('monitor-mode').setAttribute('aria-pressed','false');renderObservations();hide()}
function save(){
 if(!draft.student.trim()||!draft.date){announce('Add a student identifier and sample date before saving.');(!draft.student.trim()?$('student'):$('date')).focus();return}
 if(!draft.observations.length){announce('Record at least one observed feature before saving this snapshot.');return}
 const record=structuredClone({...draft,student:draft.student.trim(),id:editing||uid()});
 const index=records.findIndex(r=>r.id===record.id);if(index>=0)records[index]=record;else records.push(record);
 editing=record.id;const ok=persist();fill();renderHistory();if(ok)announce('Snapshot saved in this browser. Use Print for a separate copy.');
}
function snapshotCard(record){
 const article=document.createElement('article');article.className='snapshot-card';
 const h=document.createElement('h3');h.textContent=record.date+' · '+record.mode;
 const who=document.createElement('p');who.className='student-id';who.textContent=record.student;
 article.append(h,who);
 const range=rangeFor(record.observations);if(range){const estimate=document.createElement('p');estimate.className='student-id';estimate.textContent=range.low===range.high?'Suggested reference level: '+range.low:'Suggested reference range: '+range.low+'–'+range.high;article.append(estimate)}
 for(const [label,key] of [['Task','task'],['Supports','supports'],['Taught focus','taught']]){
  if(record[key]){const p=document.createElement('p'),b=document.createElement('strong');b.textContent=label+': ';p.append(b,document.createTextNode(record[key]));article.append(p)}
 }
 if(record.sample?.trim()){const sample=document.createElement('blockquote');sample.textContent=record.sample;article.append(sample);}
 dimensions.forEach(dim=>{const h=document.createElement('h4');h.textContent=dim;article.append(h);const obs=record.observations.filter(o=>o.dimension===dim);
  if(!obs.length){const p=document.createElement('p');p.textContent='No observations recorded.';p.className='empty';article.append(p)}
  obs.forEach(o=>{const p=document.createElement('p'),b=document.createElement('strong');b.textContent=o.feature;p.append(b,document.createTextNode(o.evidence?' — '+o.evidence:' — Evidence not attached.'));article.append(p)})
 });
 const next=document.createElement('p');next.className='snapshot-next';const strong=document.createElement('strong');strong.textContent='Next focus: ';next.append(strong,document.createTextNode(record.next?(record.nextDimension+' · '+record.next):'Not selected'));if(record.nextNote)next.append(document.createElement('br'),document.createTextNode(record.nextNote));article.append(next);
 return article;
}
function renderHistory(){
 const matching=records.filter(r=>r.student===draft.student.trim()).sort((a,b)=>a.date.localeCompare(b.date));
 $('history-list').replaceChildren();
 if(!matching.length){const p=document.createElement('p');p.className='empty';p.textContent='Saved snapshots for this student will appear here.';$('history-list').append(p)}
 matching.forEach(r=>{const row=document.createElement('div');row.className='history-row';
  const text=document.createElement('span');text.textContent=r.date+' · '+r.mode+(r.task?' · '+r.task:'');
  const edit=document.createElement('button');edit.type='button';edit.textContent='Review / edit';edit.addEventListener('click',()=>{draft=structuredClone(r);delete draft.id;editing=r.id;persist();fill();renderHistory();$('student').focus();announce('Saved snapshot opened for editing. Use Update snapshot to save changes.')});
  const print=document.createElement('button');print.type='button';print.textContent='Print';print.addEventListener('click',()=>printRecords([r]));
  const del=document.createElement('button');del.type='button';del.className='quiet';del.textContent='Delete';del.addEventListener('click',()=>{if(!confirm('Delete the saved snapshot dated '+r.date+'?'))return;records=records.filter(x=>x.id!==r.id);if(editing===r.id)editing=null;persist();fill();renderHistory();announce('Snapshot deleted.')});
  row.append(text,edit,print,del);$('history-list').append(row);
 });
 const previous=[$('compare-a').value,$('compare-b').value];
 ['compare-a','compare-b'].forEach((id,i)=>{const select=$(id);select.replaceChildren();matching.forEach(r=>{const o=document.createElement('option');o.value=r.id;o.textContent=r.date+' · '+r.mode+(r.task?' · '+r.task:'');select.append(o)});select.value=matching.some(r=>r.id===previous[i])?previous[i]:(matching[i===0?Math.max(0,matching.length-2):matching.length-1]?.id||'')});
 if(matching.length>=2&&$('compare-a').value===$('compare-b').value){$('compare-a').value=matching[matching.length-2].id;$('compare-b').value=matching[matching.length-1].id}
 $('comparison-controls').hidden=matching.length<2;renderComparison();
}
function renderComparison(){
 const a=records.find(r=>r.id===$('compare-a').value),b=records.find(r=>r.id===$('compare-b').value);
 $('comparison').replaceChildren();if($('comparison-controls').hidden)return;
 if(!a||!b||a.id===b.id){$('comparison').textContent='Choose two different snapshots.';return}
 $('comparison').append(snapshotCard(a),snapshotCard(b));
}
function printRecords(items){
 const area=$('print-area');area.replaceChildren();const h=document.createElement('h1');h.textContent='Expressive language · Progress snapshot';area.append(h,...items.map(snapshotCard));
 const note=document.createElement('p');note.className='print-note';note.textContent='Teacher-recorded observations from these samples. Unrecorded features are not evidence of inability. No proficiency score is calculated.';area.append(note);
 document.body.classList.add('printing-snapshot');window.print();setTimeout(()=>document.body.classList.remove('printing-snapshot'),1000);
}
load();fill();renderHistory();
fields.forEach(k=>$(k).addEventListener('input',()=>{draft[k]=$(k).value;if(k==='student'){editing=null;$('save-snapshot').textContent='Save snapshot';renderHistory()}persist();}));
$('monitor-mode').addEventListener('click',openMonitor);$('reference-mode').addEventListener('click',referenceMode);
$('feature-choice').addEventListener('change',syncPopup);
$('observe-feature').addEventListener('click',()=>capture($('feature-choice').value,dimensions[Number(selectedCell.split('-')[1])],$('feature-evidence').value));
$('use-selection').addEventListener('click',()=>{const sample=$('sample');const text=sample.value.slice(sample.selectionStart,sample.selectionEnd);if(text)$('feature-evidence').value=text;else announce('Select an excerpt in the sample first, then open a feature and choose Use selected excerpt.')});
$('popup-next').addEventListener('click',()=>{draft.next=$('feature-choice').value;draft.nextDimension=dimensions[Number(selectedCell.split('-')[1])];persist();renderObservations();syncPopup();announce('Next instructional focus selected.')});
$('clear-next').addEventListener('click',()=>{draft.next='';draft.nextDimension='';persist();renderObservations()});
$('save-snapshot').addEventListener('click',save);
$('new-sample').addEventListener('click',()=>{if((draft.sample||draft.observations.length)&&!confirm('Start a new sample? Save a snapshot first if you want to keep the current draft.'))return;draft=blank(draft.student);editing=null;persist();fill();renderHistory();hide();$('sample').focus();announce('New sample ready.')});
$('compare-a').addEventListener('change',renderComparison);$('compare-b').addEventListener('change',renderComparison);
$('print-comparison').addEventListener('click',()=>{const a=records.find(r=>r.id===$('compare-a').value),b=records.find(r=>r.id===$('compare-b').value);if(a&&b&&a.id!==b.id)printRecords([a,b])});
$('print-draft').addEventListener('click',()=>printRecords([draft]));
window.addEventListener('afterprint',()=>document.body.classList.remove('printing-snapshot'));

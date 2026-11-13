/* Shared UI helpers: custom dropdown (popover on desktop, bottom sheet on mobile) */
const isM=()=>matchMedia('(max-width:700px)').matches;
const DD={};let DDO=null;
function dd(id,opts,val,cb,ph){DD[id]={opts,cb,val};const o=opts.find(x=>String(x.v)===String(val));
 return `<button type="button" class="dd" onclick="ddOpen('${id}',this)"><span class="ddl">${o?o.l:(ph||'Select')}</span><i class="fi fi-rr-angle-small-down"></i></button>`}
function ddOpen(id,btn){ddClose();const d=DD[id],big=d.opts.length>14,m=document.createElement('div');m.className='ddm';
 m.innerHTML=`<div class="ddb" onclick="ddClose()"></div><div class="dds"><div class="ddh"></div>${big?'<input class="ddq" placeholder="Search…" oninput="ddFilter(this.value)">':''}<div>${d.opts.map((o,i)=>`<button type="button" class="ddo ${String(o.v)===String(d.val)?'on':''} ${o.dis?'dis':''}" ${o.dis?'disabled':''} onclick="ddPick('${id}',${i})"><span>${o.l}</span>${o.s?`<small>${o.s}</small>`:''}</button>`).join('')}</div></div>`;
 document.body.appendChild(m);const s=m.querySelector('.dds');
 if(!isM()){const r=btn.getBoundingClientRect();s.classList.add('pop');s.style.left=Math.max(8,Math.min(r.left,innerWidth-Math.max(r.width,280)-8))+'px';s.style.top=Math.max(8,Math.min(r.bottom+6,innerHeight-350))+'px';s.style.width=Math.max(r.width,280)+'px'}
 DDO=m;const q=m.querySelector('.ddq');if(q&&!isM())q.focus()}
function ddFilter(q){q=q.toLowerCase();document.querySelectorAll('.ddm .ddo').forEach(b=>b.style.display=b.textContent.toLowerCase().includes(q)?'':'none')}
function ddPick(id,i){const d=DD[id];ddClose();d.cb(d.opts[i].v)}
function ddClose(){if(DDO){DDO.remove();DDO=null}}
document.addEventListener('keydown',e=>{if(e.key=='Escape')ddClose()});
matchMedia('(max-width:700px)').addEventListener('change',()=>{ddClose();try{render()}catch(e){}});
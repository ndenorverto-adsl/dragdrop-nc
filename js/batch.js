/* ---------- v4.6 · LANDINGS EN LOTE DESDE CSV ----------
   Una fila = una landing. Columnas:
   · slug (o carpeta/url) → nombre de la carpeta (obligatoria).
   · Cualquier otra columna rellena el placeholder con su nombre: CIUDAD → {{CIUDAD}}, PRECIO_1 → {{PRECIO_1}}.
   · Especiales: tel, wa, titulo, descripcion, gtm, endpoint → ajustes de la landing.
   · tipo.campo (p. ej. da_hero.headline) → sobrescribe ese campo del primer bloque de ese tipo.
   Salida: ZIP con una carpeta por fila (index.html + assets/) o publicación directa fila a fila. */
function ncCsvParse(txt){txt=String(txt||"").replace(/^﻿/,"");const first=(txt.split(/\r?\n/)[0]||"");const sep=(first.match(/;/g)||[]).length>(first.match(/,/g)||[]).length?";":(first.indexOf("\t")>-1?"\t":",");
  const rows=[];let row=[],cur="",q=false;for(let i=0;i<txt.length;i++){const c=txt[i];
    if(q){if(c==='"'){if(txt[i+1]==='"'){cur+='"';i++;}else q=false;}else cur+=c;continue;}
    if(c==='"'){q=true;continue;}if(c===sep){row.push(cur);cur="";continue;}
    if(c==="\n"||c==="\r"){if(c==="\r"&&txt[i+1]==="\n")i++;row.push(cur);cur="";if(row.some(x=>x.trim()!==""))rows.push(row);row=[];continue;}cur+=c;}
  row.push(cur);if(row.some(x=>x.trim()!==""))rows.push(row);
  if(!rows.length)return {head:[],rows:[]};const head=rows[0].map(h=>h.trim());return {head,rows:rows.slice(1).map(r=>{const o={};head.forEach((h,i)=>o[h]=(r[i]||"").trim());return o;}),sep};}
const NC_BATCH_SPECIAL={tel:"tel",telefono:"tel",wa:"wa",whatsapp:"wa",titulo:"title",title:"title",descripcion:"desc",description:"desc",gtm:"gtm",endpoint:"endpoint"};
function ncBatchSlugKey(head){return head.find(h=>/^(slug|carpeta|url|ruta)$/i.test(h));}
function ncPlaceholdersInUse(){const s=JSON.stringify(state.sections)+JSON.stringify({t:state.settings.title,d:state.settings.desc});return [...new Set((s.match(/\{\{[A-Z0-9_ÁÉÍÓÚÑ]+\}\}/g)||[]).map(x=>x.slice(2,-2)))];}
function ncDeepReplace(o,map){if(typeof o==="string")return o.replace(/\{\{([A-Za-z0-9_ÁÉÍÓÚÑáéíóúñ]+)\}\}/g,(m,k)=>{const v=map[k.toUpperCase()];return v!=null&&v!==""?v:m;});
  if(Array.isArray(o))return o.map(x=>ncDeepReplace(x,map));if(o&&typeof o==="object"){const r={};for(const k in o)r[k]=ncDeepReplace(o[k],map);return r;}return o;}
/* genera el HTML de una fila sin tocar la landing original */
function ncBatchBuild(row,head){const bakS=state.sections,bakG=state.settings,bakSel=state.selected;
  try{const map={};head.forEach(h=>{if(!NC_BATCH_SPECIAL[h.toLowerCase()]&&!/\./.test(h))map[h.toUpperCase()]=row[h];});
    const secs=ncDeepReplace(JSON.parse(JSON.stringify(bakS)),map);const set=ncDeepReplace(JSON.parse(JSON.stringify(bakG)),map);
    head.forEach(h=>{const k=NC_BATCH_SPECIAL[h.toLowerCase()];if(k&&row[h])set[k]=row[h];
      const m=h.match(/^([a-z0-9_]+)\.([A-Za-z0-9_]+)$/);if(m&&row[h]!==""){const s=secs.find(x=>x.type===m[1]);if(s)s.props[m[2]]=row[h];}});
    const slugK=ncBatchSlugKey(head);set.slug=ncSlug(row[slugK]||set.slug);
    state.sections=secs;state.settings=set;state.selected=null;return {slug:set.slug,html:buildDoc(true),left:[...new Set((JSON.stringify(secs).match(/\{\{[A-Z0-9_]+\}\}/g)||[]))]};}
  finally{state.sections=bakS;state.settings=bakG;state.selected=bakSel;}}
let NC_BATCH=null;
function ncOpenBatch(){let o=document.getElementById("ncBatchOv");if(!o){o=document.createElement("div");o.id="ncBatchOv";o.className="nc-imprep";document.body.appendChild(o);o.onclick=e=>{if(e.target===o)o.style.display="none";};}
  const ph=ncPlaceholdersInUse();o.style.display="grid";
  o.innerHTML=`<div class="nc-imprep-box" style="width:680px"><div style="display:flex;justify-content:space-between;align-items:center;gap:10px"><b>🗂 Landings en lote desde CSV</b><button class="btn sm ghost" id="ncBatchX">Cerrar</button></div>
   <div class="help" style="margin:8px 0">Una fila por landing. Columna <code>slug</code> (carpeta) obligatoria; el resto rellena los <code>{{PLACEHOLDER}}</code> con su mismo nombre. Especiales: <code>tel</code>, <code>wa</code>, <code>titulo</code>, <code>descripcion</code>, <code>gtm</code>, <code>endpoint</code> y <code>tipo.campo</code> (p. ej. <code>da_hero.headline</code>).</div>
   <div class="help">Placeholders de esta landing: ${ph.length?ph.map(x=>`<code>${esc(x)}</code>`).join(" "):"ninguno"}</div>
   <div style="display:flex;gap:8px;flex-wrap:wrap;margin:10px 0"><input type="file" id="ncBatchFile" accept=".csv,text/csv,.tsv,.txt" style="display:none"><button class="btn" id="ncBatchUp">⤒ Subir CSV</button><button class="btn sm" id="ncBatchTpl">↓ CSV de ejemplo con estas columnas</button></div>
   <textarea id="ncBatchTxt" class="txt" style="width:100%;min-height:110px;font-family:monospace;font-size:11px" placeholder="slug;CIUDAD;PRECIO&#10;madrid;Madrid;29,90&#10;barcelona;Barcelona;31,90"></textarea>
   <div id="ncBatchInfo" class="nc-publog"></div>
   <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px"><button class="btn primary" id="ncBatchZip">↓ Descargar ZIP con carpetas</button><select id="ncBatchT" class="txt" style="min-width:180px"><option value="">Publicar en… (cargando)</option></select><button class="btn" id="ncBatchPub">🚀 Publicar lote</button></div>
   <div id="ncBatchLog" class="nc-publog"></div></div>`;
  const $=id=>o.querySelector("#"+id);$("ncBatchX").onclick=()=>{o.style.display="none";};
  const ta=$("ncBatchTxt");if(NC_BATCH&&NC_BATCH.raw)ta.value=NC_BATCH.raw;
  const parse=()=>{const p=ncCsvParse(ta.value);NC_BATCH={raw:ta.value,head:p.head,rows:p.rows};const sk=ncBatchSlugKey(p.head);const info=$("ncBatchInfo");
    if(!p.head.length){info.innerHTML="";return;}
    const cols=p.head.filter(h=>h!==sk);const cover=ph.filter(x=>p.head.some(h=>h.toUpperCase()===x));const miss=ph.filter(x=>!cover.includes(x));
    const slugs=p.rows.map(r=>ncSlug(r[sk]||""));const dup=slugs.filter((s,i)=>slugs.indexOf(s)!==i);
    info.innerHTML=`<b>${p.rows.length}</b> filas · columnas: ${cols.map(c=>`<code>${esc(c)}</code>`).join(" ")||"—"}${sk?"":` <span style="color:var(--danger)">· falta la columna slug</span>`}${dup.length?` <span style="color:var(--danger)">· slugs repetidos: ${esc([...new Set(dup)].join(", "))}</span>`:""}
      ${miss.length?`<div class="help">Sin columna (quedarán como placeholder): ${miss.map(x=>`<code>${esc(x)}</code>`).join(" ")}</div>`:`<div class="help">✓ Todos los placeholders tienen columna.</div>`}
      ${p.rows.length?`<div class="nc-btab"><table><tr>${p.head.slice(0,6).map(h=>`<th>${esc(h)}</th>`).join("")}</tr>${p.rows.slice(0,4).map(r=>`<tr>${p.head.slice(0,6).map(h=>`<td>${esc(r[h])}</td>`).join("")}</tr>`).join("")}</table></div>`:""}`;};
  ta.oninput=parse;parse();
  $("ncBatchUp").onclick=()=>$("ncBatchFile").click();$("ncBatchFile").onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{ta.value=r.result;parse();};r.readAsText(f,"utf-8");};
  $("ncBatchTpl").onclick=()=>{const head=["slug",...ph];const csv=head.join(";")+"\n"+head.map(h=>h==="slug"?"ejemplo":"").join(";")+"\n";dlBlob(new Blob(["﻿"+csv],{type:"text/csv;charset=utf-8"}),(state.settings.slug||"landing")+"-lote.csv");};
  const ok=()=>{if(!NC_BATCH||!NC_BATCH.rows.length){toast("Pega o sube el CSV primero");return false;}if(!ncBatchSlugKey(NC_BATCH.head)){toast("Falta la columna slug");return false;}return true;};
  $("ncBatchZip").onclick=async()=>{if(!ok())return;if(!window.JSZip){toast("JSZip no cargó");return;}const log=$("ncBatchLog");const zip=new JSZip();const root=zip.folder(ncSlug(state.settings.slug)+"-lote");let idx="slug;carpeta;placeholders_sin_rellenar\n";
    for(let i=0;i<NC_BATCH.rows.length;i++){const b=ncBatchBuild(NC_BATCH.rows[i],NC_BATCH.head);const f=root.folder(b.slug);ncBundle(b.html).forEach(x=>f.file(x.file,x.data,{base64:true}));idx+=`${b.slug};${b.slug}/;${b.left.join(" ")}\n`;log.textContent=`Generando ${i+1} / ${NC_BATCH.rows.length}…`;await new Promise(r=>setTimeout(r,0));}
    root.file("indice.csv","﻿"+idx);const blob=await zip.generateAsync({type:"blob"});dlBlob(blob,ncSlug(state.settings.slug)+"-lote.zip");log.textContent=`✓ ZIP con ${NC_BATCH.rows.length} carpetas`;};
  $("ncBatchPub").onclick=async()=>{if(!ok())return;const t=$("ncBatchT").value;if(!t){toast("Elige el destino");return;}const log=$("ncBatchLog");const res=[];
    for(let i=0;i<NC_BATCH.rows.length;i++){const b=ncBatchBuild(NC_BATCH.rows[i],NC_BATCH.head);log.innerHTML=`Publicando ${i+1} / ${NC_BATCH.rows.length} · <code>${esc(b.slug)}</code>…`;
      try{const r=await ncPublishFiles(t,b.slug,ncBundle(b.html),{});res.push(`✓ ${esc(b.slug)}${r.url?` · <a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.url)}</a>`:""}`);}catch(e){res.push(`<span style="color:var(--danger)">✗ ${esc(b.slug)}: ${esc(e.message)}</span>`);}
      log.innerHTML=res.join("<br>");}
    toast("Lote terminado");};
  ncPubLoad().then(()=>{const s=$("ncBatchT");if(!s)return;const T=(NC_PUB.targets||[]).filter(x=>!x.preview);s.innerHTML=T.length?`<option value="">Publicar en…</option>`+T.map(x=>`<option value="${esc(x.id)}">${esc(x.name)}</option>`).join(""):`<option value="">${esc(NC_PUB.err||"Sin destinos de publicación")}</option>`;});}
document.addEventListener("DOMContentLoaded",()=>{const ref=document.getElementById("btnPublish")||document.getElementById("btnExportHtml");if(!ref||document.getElementById("btnBatch"))return;
  const b=document.createElement("button");b.className="btn";b.id="btnBatch";b.title="Generar una landing por fila de un CSV";b.textContent="🗂 Lote";ref.parentNode.insertBefore(b,ref.nextSibling);b.addEventListener("click",ncOpenBatch);});

/* ---------- v4.6 · PUBLICAR SIN SALIR ----------
   Botón «🚀 Publicar»: sube la landing por FTP/FTPS o la despliega en Vercel a través de /api/publish.
   Las credenciales están solo en Vercel (variable NC_PUBLISH_TARGETS); el navegador manda la sesión de Supabase.
   · Las imágenes y fuentes en base64 se separan a assets/ (HTML ligero y archivos < 3 MB por petición).
   · «Vista previa para el cliente» publica una copia con noindex en el destino marcado como preview (o en _preview/ del FTP). */
const NC_PUB={targets:null,user:"",err:""};
function ncPubHash(s){let h=2166136261>>>0;for(let i=0;i<s.length;i+=7){h^=s.charCodeAt(i);h=Math.imul(h,16777619)>>>0;}return (h>>>0).toString(16).padStart(8,"0")+s.length.toString(36);}
const NC_PUB_EXT={"image/png":"png","image/jpeg":"jpg","image/jpg":"jpg","image/webp":"webp","image/gif":"gif","image/svg+xml":"svg","image/avif":"avif","image/x-icon":"ico","font/woff2":"woff2","font/woff":"woff","font/ttf":"ttf","font/otf":"otf","application/octet-stream":"bin","video/mp4":"mp4"};
/* HTML final → archivos (index.html + assets/) */
function ncBundle(html,opt){opt=opt||{};const assets={};
  const out=html.replace(/data:([a-z]+\/[a-z0-9.+-]+);base64,([A-Za-z0-9+/=]+)/gi,(m,mime,b64)=>{if(b64.length<2400)return m;const ext=NC_PUB_EXT[mime.toLowerCase()];if(!ext)return m;
    const name="assets/"+ncPubHash(b64)+"."+ext;assets[name]=b64;return name;});
  let h=out;if(opt.noindex)h=h.replace(/<meta name="robots"[^>]*>/i,"").replace("</head>",'<meta name="robots" content="noindex,nofollow"></head>');
  const files=[{file:"index.html",data:ncB64(h),kb:Math.round(h.length/1024)}];Object.keys(assets).forEach(k=>files.push({file:k,data:assets[k],kb:Math.round(assets[k].length*.75/1024)}));
  return files;}
function ncB64(str){const b=new TextEncoder().encode(str);let s="";for(let i=0;i<b.length;i+=0x8000)s+=String.fromCharCode.apply(null,b.subarray(i,i+0x8000));return btoa(s);}
async function ncPubToken(){try{if(!window.NC_SB)return "";const r=await window.NC_SB.auth.getSession();return (r&&r.data&&r.data.session&&r.data.session.access_token)||"";}catch(e){return "";}}
async function ncPubApi(method,body){const tok=await ncPubToken();if(!tok)throw new Error("Inicia sesión en el builder (con Supabase) para publicar.");
  const r=await fetch("/api/publish",{method,headers:Object.assign({Authorization:"Bearer "+tok},body?{"Content-Type":"application/json"}:{}),body:body?JSON.stringify(body):undefined});
  if(r.status===404)throw new Error("La publicación solo funciona en la versión desplegada en Vercel (falta /api/publish).");
  const j=await r.json().catch(()=>({}));if(!r.ok)throw new Error(j.error||("Error "+r.status));return j;}
async function ncPubLoad(){try{const j=await ncPubApi("GET");NC_PUB.targets=j.targets||[];NC_PUB.user=j.user||"";NC_PUB.err="";}catch(e){NC_PUB.targets=[];NC_PUB.err=e.message;}}
function ncSlug(s){return String(s||"landing").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,60)||"landing";}
/* sube un conjunto de archivos a un destino; onStep(i,total,file) para el progreso */
async function ncPublishFiles(target,dir,files,opts,onStep){opts=opts||{};const t=(NC_PUB.targets||[]).find(x=>x.id===target);if(!t)throw new Error("Elige un destino");
  for(const f of files){if(f.data.length*.75>3.2*1024*1024)throw new Error(`${f.file} pesa ${f.kb} KB (máx. 3.200 KB por archivo). Optimiza las imágenes antes de publicar.`);}
  const done=[];let i=0;const queue=files.slice().sort((a,b)=>a.file==="index.html"?1:b.file==="index.html"?-1:0);
  const worker=async()=>{while(queue.length){const f=queue.shift();const r=await ncPubApi("POST",{target,action:"put",dir,file:f.file,data:f.data});done.push({file:f.file,sha:r.sha,size:r.size});i++;if(onStep)onStep(i,files.length,f.file);}};
  await Promise.all([worker(),worker(),worker()].slice(0,t.type==="ftp"?2:3));
  return await ncPubApi("POST",{target,action:"finish",dir,files:done,prod:!opts.preview});}
async function ncPublish(kind){const st=state.settings;const box=document.getElementById("ncPubLog");const sel=document.getElementById("ncPubT");const dirI=document.getElementById("ncPubDir");
  const T=NC_PUB.targets||[];let target=sel?sel.value:"";let dir=ncSlug(dirI?dirI.value:st.slug);
  if(kind==="preview"){const pt=T.find(x=>x.preview)||T.find(x=>x.id===target);if(!pt){toast("Configura un destino de vista previa");return;}target=pt.id;
    st.previewKey=st.previewKey||Math.random().toString(36).slice(2,8);dir=pt.preview?ncSlug(st.slug)+"-"+st.previewKey:"_preview/"+ncSlug(st.slug)+"-"+st.previewKey;}
  const log=m=>{if(box)box.innerHTML=m;};
  try{log("Preparando la página…");const html=buildDoc(true);const files=ncBundle(html,{noindex:kind==="preview"});
    log(`Subiendo 0 / ${files.length}…`);
    const r=await ncPublishFiles(target,dir,files,{preview:kind==="preview"},(i,n,f)=>log(`Subiendo ${i} / ${n} · <code>${esc(f)}</code>`));
    const tn=(T.find(x=>x.id===target)||{}).name||target;const entry={kind,target:tn,dir,url:r.url||"",at:new Date().toISOString().slice(0,16).replace("T"," ")};
    st.pubLog=[entry].concat(Array.isArray(st.pubLog)?st.pubLog:[]).slice(0,10);if(typeof wsOnChange==="function")try{wsOnChange();}catch(_){}
    log(`✓ ${kind==="preview"?"Vista previa lista":"Publicada"} en <b>${esc(tn)}</b>${r.url?` · <a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.url)}</a> <button class="btn sm" id="ncPubCopy">Copiar enlace</button>`:""}${r.note?`<div class="help">${esc(r.note)}</div>`:""}`);
    const cp=document.getElementById("ncPubCopy");if(cp)cp.onclick=()=>{navigator.clipboard&&navigator.clipboard.writeText(r.url);toast("Enlace copiado");};
    if(window.dataLayer)try{dataLayer.push({event:"nc_publish",kind,target:tn});}catch(_){}
    ncPubRenderLog();}
  catch(e){log(`<span style="color:var(--danger)">✗ ${esc(e.message)}</span>`);}}
function ncPubRenderLog(){const el=document.getElementById("ncPubHist");if(!el)return;const L=Array.isArray(state.settings.pubLog)?state.settings.pubLog:[];
  el.innerHTML=L.length?`<div class="paneltitle" style="padding:10px 0 4px">Últimas publicaciones</div>`+L.map(x=>`<div class="nc-pubrow"><span>${x.kind==="preview"?"👁 Vista previa":"🚀 Publicada"} · ${esc(x.target)} · ${esc(x.at)}</span>${x.url?`<a href="${esc(x.url)}" target="_blank" rel="noopener">${esc(x.url)}</a>`:`<code>${esc(x.dir)}</code>`}</div>`).join(""):"";}
async function ncOpenPublish(){let o=document.getElementById("ncPubOv");if(!o){o=document.createElement("div");o.id="ncPubOv";o.className="nc-imprep";document.body.appendChild(o);o.onclick=e=>{if(e.target===o)o.style.display="none";};}
  o.style.display="grid";o.innerHTML=`<div class="nc-imprep-box"><b>Publicar</b><div class="help">Cargando destinos…</div></div>`;
  await ncPubLoad();const T=NC_PUB.targets||[];const st=state.settings;
  const opts=T.filter(t=>!t.preview).map(t=>`<option value="${esc(t.id)}">${esc(t.name)} · ${t.type==="ftp"?"FTP":"Vercel"}${t.publicUrl?" · "+esc(t.publicUrl):""}</option>`).join("");
  o.innerHTML=`<div class="nc-imprep-box"><div style="display:flex;justify-content:space-between;align-items:center;gap:10px"><b>🚀 Publicar la landing</b><button class="btn sm ghost" id="ncPubX">Cerrar</button></div>
   ${NC_PUB.err?`<div class="note" style="margin:10px 0">${esc(NC_PUB.err)}</div>`:""}
   ${T.length?`<div class="fld"><label>Destino</label><select id="ncPubT">${opts||T.map(t=>`<option value="${esc(t.id)}">${esc(t.name)}</option>`).join("")}</select></div>
   <div class="fld"><label>Carpeta / proyecto</label><input id="ncPubDir" value="${esc(ncSlug(st.slug))}"><div class="help">FTP: se sube a <code>&lt;carpeta base&gt;/<span id="ncPubDirE">${esc(ncSlug(st.slug))}</span>/index.html</code>. Vercel: proyecto <code>${esc((T.find(t=>t.type==="vercel")||{}).prefix||"")}<span>${esc(ncSlug(st.slug))}</span></code>.</div></div>
   <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px"><button class="btn primary" id="ncPubGo">Publicar</button><button class="btn" id="ncPubPrev" title="Copia con noindex para enseñar al cliente">👁 Vista previa para el cliente</button></div>`
   :`<div class="help" style="margin-top:10px">No hay destinos configurados. Añade la variable <code>NC_PUBLISH_TARGETS</code> en Vercel (ver README → Publicar).</div>`}
   <div id="ncPubLog" class="nc-publog"></div><div id="ncPubHist"></div>
   <div class="help" style="margin-top:10px">Antes de publicar se pasa la checklist (placeholders, privacidad, GTM…). Las imágenes en base64 se suben como archivos en <code>assets/</code>.</div></div>`;
  o.querySelector("#ncPubX").onclick=()=>{o.style.display="none";};
  const di=o.querySelector("#ncPubDir");if(di)di.oninput=()=>{const e=o.querySelector("#ncPubDirE");if(e)e.textContent=ncSlug(di.value);};
  const go=o.querySelector("#ncPubGo");if(go)go.onclick=()=>{o.style.display="none";ncOpenChecklist(()=>{o.style.display="grid";ncPublish("publish");});};
  const pv=o.querySelector("#ncPubPrev");if(pv)pv.onclick=()=>ncPublish("preview");
  ncPubRenderLog();}
document.addEventListener("DOMContentLoaded",()=>{const ref=document.getElementById("btnExportHtml");if(!ref||document.getElementById("btnPublish"))return;
  const b=document.createElement("button");b.className="btn";b.id="btnPublish";b.title="Subir por FTP o a Vercel";b.textContent="🚀 Publicar";ref.parentNode.insertBefore(b,ref.nextSibling);b.addEventListener("click",ncOpenPublish);});

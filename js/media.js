/* NC Landing Builder · v5.4 · BIBLIOTECA DE MEDIOS
   · Todas las imágenes y vídeos subidos en un sitio, por carpetas (una por cliente), para reutilizarlos entre landings y
     entre todo el equipo. Con Supabase: bucket del proyecto (por defecto 'landings-assets'), ruta media/<carpeta>/…
     Sin sesión en la nube: se guardan en este navegador (IndexedDB) y se usan como imagen embebida.
   · Se abre desde «🗂 Medios» (barra superior) o con «Biblioteca» junto a cualquier campo de imagen (también fondos de
     sección, ofertas y campos de imagen de los módulos). Lo que subes desde un campo entra en la carpeta activa.
   · Las imágenes se siguen optimizando al subir (WebP, máx. 2000 px) con el ajuste de ⚡ Velocidad.
   Carga antes de perf.js: sustituye la subida base de readImg para guardar en la carpeta (perf la envuelve después). */
(function(){
const MD={folder:null,items:[],folders:[],loading:false,q:"",type:"",pick:null,offset:0,more:false,err:""};window.NC_MEDIA=MD;
const BUCKET=()=>(window.NC_CONFIG&&window.NC_CONFIG.BUCKET)||"landings-assets";
const cloud=()=>!!window.NC_SB;
const authed=()=>!!(window.NC_SB&&typeof ws!=="undefined"&&ws.user);
const slug=s=>String(s||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,40);
function defFolder(){const st=state.settings;if(st.mediaFolder)return st.mediaFolder;const b=BRANDS[st.brand]||{};if(b.client||st.brand==="custom")return slug(String(b.name||"").replace(/\(.*?\)/g,""))||"general";return "general";}
const curFolder=()=>MD.folder||defFolder();
const isImg=n=>/\.(png|jpe?g|webp|gif|svg|avif)$/i.test(n),isVid=n=>/\.(mp4|webm|mov)$/i.test(n);
const kb=n=>n>1048576?(n/1048576).toFixed(1)+" MB":Math.max(1,Math.round(n/1024))+" KB";

/* ---------- almacenamiento local (sin nube) ---------- */
function idb(){return new Promise((res,rej)=>{if(!window.indexedDB){rej(new Error("Sin IndexedDB"));return;}const r=indexedDB.open("nc_media",1);r.onupgradeneeded=()=>r.result.createObjectStore("files",{keyPath:"id"});r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error);});}
async function lsAll(){try{const db=await idb();return await new Promise(res=>{const q=db.transaction("files").objectStore("files").getAll();q.onsuccess=()=>res(q.result||[]);q.onerror=()=>res([]);});}catch(e){return [];}}
async function lsPut(o){try{const db=await idb();await new Promise(res=>{const t=db.transaction("files","readwrite");t.objectStore("files").put(o);t.oncomplete=res;t.onerror=res;});}catch(e){}}
async function lsDel(id){try{const db=await idb();await new Promise(res=>{const t=db.transaction("files","readwrite");t.objectStore("files").delete(id);t.oncomplete=res;t.onerror=res;});}catch(e){}}

/* ---------- subida (sustituye la base de readImg) ---------- */
async function upload(file,folder){folder=folder||curFolder();const clean=file.name.replace(/[^a-zA-Z0-9._-]/g,"_").slice(-80);
  if(cloud()){const path=`media/${folder}/${Date.now()}_${Math.random().toString(36).slice(2,6)}_${clean}`;
    const r=await window.NC_SB.storage.from(BUCKET()).upload(path,file,{cacheControl:"31536000",upsert:false,contentType:file.type||undefined});
    if(r.error)throw new Error(/row-level|not authorized|unauthorized|jwt/i.test(r.error.message)?"Inicia sesión para subir a la biblioteca del equipo":r.error.message);
    const url=window.NC_SB.storage.from(BUCKET()).getPublicUrl(path).data.publicUrl;MD.dirty=true;return url;}
  const url=await new Promise((res,rej)=>{const fr=new FileReader();fr.onload=()=>res(fr.result);fr.onerror=()=>rej(fr.error);fr.readAsDataURL(file);});
  if(file.size>3*1024*1024)toast("⚠ Archivo >3 MB: engordará el HTML");
  await lsPut({id:Date.now().toString(36)+Math.random().toString(36).slice(2,5),name:file.name,folder,type:file.type,size:file.size,url,created:new Date().toISOString()});MD.dirty=true;return url;}
readImg=function(file,cb){if(!file)return;toast(cloud()?"Subiendo a la biblioteca…":"Guardando en la biblioteca local…");
  upload(file).then(url=>{cb(url);toast(cloud()?"Subida a «"+curFolder()+"» ✓":"Guardada en este navegador ✓");}).catch(e=>toast("Error al subir: "+e.message));};

/* ---------- listado ---------- */
async function load(reset){if(MD.loading)return;MD.loading=true;MD.err="";if(reset){MD.items=[];MD.offset=0;}
  try{if(cloud()){const S=window.NC_SB.storage.from(BUCKET());
      if(reset){const {data:fd}=await S.list("media",{limit:200,sortBy:{column:"name",order:"asc"}});MD.folders=(fd||[]).filter(x=>!x.id&&x.name).map(x=>x.name);}
      const path=MD.folder==="__root"?"":"media/"+curFolder();const lim=60;
      const {data,error}=await S.list(path,{limit:lim,offset:MD.offset,sortBy:{column:"created_at",order:"desc"},search:MD.q||undefined});
      if(error)throw error;const files=(data||[]).filter(x=>x.id&&x.name&&!/^\./.test(x.name));
      MD.items=MD.items.concat(files.map(x=>({id:(path?path+"/":"")+x.name,name:x.name.replace(/^\d+_[a-z0-9]{4,5}_/,""),size:(x.metadata&&x.metadata.size)||0,type:(x.metadata&&x.metadata.mimetype)||"",created:x.created_at,url:S.getPublicUrl((path?path+"/":"")+x.name).data.publicUrl})));
      MD.offset+=(data||[]).length;MD.more=(data||[]).length===lim;}
    else{const all=await lsAll();MD.folders=[...new Set(all.map(x=>x.folder))].sort();const q=MD.q.toLowerCase();
      MD.items=all.filter(x=>x.folder===curFolder()&&(!q||x.name.toLowerCase().includes(q))).sort((a,b)=>b.created.localeCompare(a.created));MD.more=false;}}
  catch(e){MD.err=e.message||String(e);}finally{MD.loading=false;MD.dirty=false;}}
async function del(it){if(!confirm(`¿Borrar «${it.name}» de la biblioteca?${cloud()?" Dejará de verse en las landings que la usan.":""}`))return;
  if(cloud()){const {error}=await window.NC_SB.storage.from(BUCKET()).remove([it.id]);if(error){toast("Error: "+error.message);return;}}else await lsDel(it.id);
  MD.items=MD.items.filter(x=>x!==it);draw();toast("Borrado");}

/* ---------- interfaz ---------- */
function ov(){let o=document.getElementById("mdlOv");if(!o){o=document.createElement("div");o.id="mdlOv";o.className="nc-ov";document.body.appendChild(o);}return o;}
async function open(pick){MD.pick=pick||null;MD.type=pick&&pick.accept||"";if(!MD.folder)MD.folder=defFolder();ov().style.display="grid";draw(true);await load(true);draw();}
function draw(loading){const o=ov();const F=[...new Set(MD.folders.concat([curFolder()]))].filter(Boolean).sort();
  const list=MD.items.filter(x=>!MD.type||(MD.type==="image"?isImg(x.name)||/^image\//.test(x.type):isVid(x.name)||/^video\//.test(x.type)));
  o.innerHTML=`<div class="nc-ov-box mdl-box"><div class="nc-ov-head"><b>🗂 Biblioteca de medios</b><span class="help" style="margin:0 auto 0 12px">${cloud()?(authed()?"Compartida con el equipo":"Compartida · inicia sesión para subir o borrar"):"Sin nube: solo en este navegador"}</span><button class="btn sm ghost" data-ml="x">Cerrar</button></div>
   <div class="mdl-grid"><aside class="mdl-f"><div class="paneltitle">Carpetas</div>${F.map(f=>`<button type="button" class="mdl-fb ${f===curFolder()&&MD.folder!=="__root"?"on":""}" data-mf="${esc(f)}">📁 ${esc(f)}</button>`).join("")}
     ${cloud()?`<button type="button" class="mdl-fb ${MD.folder==="__root"?"on":""}" data-mf="__root" title="Imágenes subidas antes de la biblioteca">🗃 Sin carpeta</button>`:""}<button type="button" class="btn sm" data-ml="newf" style="margin-top:8px;width:100%">＋ Nueva carpeta</button>
     <div class="help" style="margin-top:10px">Lo que subes desde un campo de imagen entra en la carpeta activa${state.settings.mediaFolder?"":" (por defecto, la de la marca)"}.</div></aside>
   <section class="mdl-main"><div class="mdl-bar"><input class="txt" id="mlQ" placeholder="Buscar por nombre…" value="${esc(MD.q)}"><select id="mlT" class="txt" style="width:auto"><option value="">Todo</option><option value="image" ${MD.type==="image"?"selected":""}>Imágenes</option><option value="video" ${MD.type==="video"?"selected":""}>Vídeos</option></select>
     <button type="button" class="btn sm primary" data-ml="up">⤒ Subir a «${esc(MD.folder==="__root"?defFolder():curFolder())}»</button><input type="file" id="mlFile" multiple accept="image/*,video/mp4,video/webm" style="display:none"></div>
     <div class="mdl-drop" id="mlDrop">${loading||MD.loading?`<div class="empty">Cargando…</div>`:MD.err?`<div class="empty">⚠ ${esc(MD.err)}</div>`:list.length?`<div class="mdl-items">${list.map((x,i)=>`<figure class="mdl-it" data-i="${MD.items.indexOf(x)}">${isVid(x.name)||/^video\//.test(x.type)?`<div class="mdl-v">▶ vídeo</div>`:`<img src="${esc(x.url)}" alt="" loading="lazy">`}
         <figcaption title="${esc(x.name)}">${esc(x.name)}<small>${x.size?kb(x.size):""}</small></figcaption><div class="mdl-a">${MD.pick?`<button type="button" class="btn sm primary" data-ma="use">Usar</button>`:""}<button type="button" class="btn sm" data-ma="copy" title="Copiar URL">⧉</button>${(!cloud()||authed())?`<button type="button" class="btn sm ghost" data-ma="del" title="Borrar">✕</button>`:""}</div></figure>`).join("")}</div>${MD.more?`<button type="button" class="btn sm" data-ml="more" style="margin:12px auto;display:block">Cargar más</button>`:""}`
       :`<div class="empty">Esta carpeta está vacía. Arrastra aquí imágenes o vídeos, o pulsa «Subir».</div>`}</div></section></div></div>`;
  const q=document.getElementById("mlQ");let t=null;q.addEventListener("input",()=>{clearTimeout(t);t=setTimeout(async()=>{MD.q=q.value.trim();await load(true);draw();const n=document.getElementById("mlQ");if(n){n.focus();n.setSelectionRange(n.value.length,n.value.length);}},350);});
  document.getElementById("mlT").addEventListener("change",e=>{MD.type=e.target.value;draw();});
  const fi=document.getElementById("mlFile");fi.addEventListener("change",()=>upMany([...fi.files]));
  const dz=document.getElementById("mlDrop");["dragenter","dragover"].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.add("drag");}));["dragleave","drop"].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.remove("drag");}));dz.addEventListener("drop",e=>upMany([...e.dataTransfer.files]));
  o.onclick=async e=>{const b=e.target.closest("[data-ml],[data-mf],[data-ma]");if(e.target===o||(b&&b.dataset.ml==="x")){o.style.display="none";MD.pick=null;return;}if(!b)return;
    if(b.dataset.mf){MD.folder=b.dataset.mf;MD.q="";draw(true);await load(true);draw();return;}
    if(b.dataset.ml==="up")fi.click();
    else if(b.dataset.ml==="newf"){const n=slug(prompt("Nombre de la carpeta (p. ej. el cliente):")||"");if(!n)return;MD.folder=n;if(!MD.folders.includes(n))MD.folders.push(n);MD.items=[];draw();}
    else if(b.dataset.ml==="more"){await load(false);draw();}
    else if(b.dataset.ma){const it=MD.items[+b.closest(".mdl-it").dataset.i];if(!it)return;
      if(b.dataset.ma==="use"){const p=MD.pick;o.style.display="none";MD.pick=null;if(MD.folder!=="__root"&&MD.folder!==defFolder())state.settings.mediaFolder=MD.folder;p.cb(it.url);}
      else if(b.dataset.ma==="copy"){try{await navigator.clipboard.writeText(it.url);toast("URL copiada");}catch(err){prompt("URL:",it.url);}}
      else if(b.dataset.ma==="del")del(it);}};}
async function upMany(files){if(!files.length)return;const ok=files.filter(f=>/^image\//.test(f.type)||/^video\/(mp4|webm)/.test(f.type)||isVid(f.name));if(ok.length<files.length)toast("Solo imágenes y vídeos .mp4/.webm");
  if(MD.folder==="__root")MD.folder=defFolder();let n=0;for(const f of ok){if(/^video\//.test(f.type)&&f.size>15*1024*1024){toast("⚠ «"+f.name+"» pesa más de 15 MB: comprímelo antes");continue;}
    try{let file=f;if(/^image\/(png|jpe?g|bmp)$/i.test(f.type)&&f.size>120*1024&&state.settings.imgOpt!==false&&typeof ncToWebp==="function"){const du=await new Promise(r=>{const fr=new FileReader();fr.onload=()=>r(fr.result);fr.readAsDataURL(f);});const o2=await ncToWebp(du,2000);if(o2.changed)file=ncDataUrlToFile(o2.url,f.name.replace(/\.[a-z0-9]+$/i,"")+".webp");}
      await upload(file,curFolder());n++;}catch(e){toast("⚠ "+f.name+": "+e.message);}}
  if(n){toast(n+" archivo(s) subidos a «"+curFolder()+"»");await load(true);draw();}}
MD.open=open;MD.upload=upload;MD.load=load;

/* «Biblioteca» junto a cada campo de imagen de los paneles */
const _bc=bindContentFields;bindContentFields=function(container,obj,after,fields){_bc.apply(this,arguments);
  const add=(inp,set,accept)=>{const row=inp.parentElement&&inp.parentElement.querySelector(".thumbrow");if(!row||row.querySelector("[data-mlib]"))return;const b=document.createElement("button");b.type="button";b.className="btn sm";b.dataset.mlib="1";b.textContent="🗂 Biblioteca";
    b.addEventListener("click",()=>open({accept:accept||"image",cb:url=>{commit();set(url);renderRight();renderPreview();}}));row.appendChild(b);};
  container.querySelectorAll("input[data-file]").forEach(inp=>add(inp,url=>{obj[inp.dataset.file]=url;}));
  container.querySelectorAll("input[data-rfile]").forEach(inp=>add(inp,url=>{const p=inp.dataset.rfile.split("|");const it=arr(obj[p[0]])[+p[1]];if(it)it[p[2]]=url;}));
  container.querySelectorAll("input[data-filem]").forEach(inp=>{const row=inp.parentElement;if(!row||row.querySelector("[data-mlib]"))return;const b=document.createElement("button");b.type="button";b.className="btn sm";b.dataset.mlib="1";b.textContent="🗂 Biblioteca";
    b.addEventListener("click",()=>open({accept:"image",cb:url=>{commit();obj[inp.dataset.filem]=arr(obj[inp.dataset.filem]);obj[inp.dataset.filem].push(url);renderRight();renderPreview();}}));(row.querySelector(".thumbrow")||row).appendChild(b);});
  /* campos de vídeo (texto): botón para elegir un vídeo de la biblioteca */
  container.querySelectorAll('input[data-fk="video"],input[data-fk="poster"]').forEach(inp=>{if(inp.nextElementSibling&&inp.nextElementSibling.dataset&&inp.nextElementSibling.dataset.mlib)return;const vid=inp.dataset.fk==="video";const b=document.createElement("button");b.type="button";b.className="btn sm";b.dataset.mlib="1";b.style.marginTop="6px";b.textContent=vid?"🗂 Elegir vídeo de la biblioteca":"🗂 Biblioteca";
    b.addEventListener("click",()=>open({accept:vid?"video":"image",cb:url=>{commit();obj[inp.dataset.fk]=url;renderRight();renderPreview();}}));inp.insertAdjacentElement("afterend",b);});};
/* botón en la barra superior */
(function(){const t=document.getElementById("btnTpl");if(!t||document.getElementById("btnMedia"))return;const b=document.createElement("button");b.className="btn";b.id="btnMedia";b.title="Biblioteca de medios";b.textContent="🗂 Medios";b.addEventListener("click",()=>open());t.insertAdjacentElement("afterend",b);})();
(function(){const css=document.createElement("style");css.textContent=`.mdl-box{width:1100px;max-width:96vw;height:86vh;max-height:86vh;display:flex;flex-direction:column}.mdl-grid{display:grid;grid-template-columns:200px minmax(0,1fr);gap:14px;flex:1;min-height:0}
 .mdl-f{overflow:auto;border-right:1px solid var(--line);padding-right:10px}.mdl-fb{display:block;width:100%;text-align:left;border:0;background:none;color:inherit;padding:7px 8px;border-radius:8px;font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mdl-fb:hover{background:rgba(127,127,127,.12)}.mdl-fb.on{background:var(--acc,#7c6cff);color:#fff}
 .mdl-main{display:flex;flex-direction:column;min-height:0}.mdl-bar{display:flex;gap:8px;align-items:center;margin-bottom:10px}.mdl-bar .txt{flex:1}.mdl-drop{flex:1;overflow:auto;border:1px dashed transparent;border-radius:10px;padding:2px}.mdl-drop.drag{border-color:var(--acc,#7c6cff);background:rgba(124,108,255,.08)}
 .mdl-items{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px}.mdl-it{margin:0;border:1px solid var(--line);border-radius:10px;overflow:hidden;position:relative;background:rgba(127,127,127,.06)}
 .mdl-it img,.mdl-v{width:100%;aspect-ratio:4/3;object-fit:cover;display:block;background:repeating-conic-gradient(rgba(127,127,127,.15) 0 25%,transparent 0 50%) 0 0/16px 16px}.mdl-v{display:grid;place-items:center;font-size:13px;color:var(--muted,#8a93a3)}
 .mdl-it figcaption{font-size:11.5px;padding:6px 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mdl-it figcaption small{display:block;color:var(--muted,#8a93a3)}
 .mdl-a{position:absolute;inset:auto 6px 46px 6px;display:flex;gap:4px;justify-content:flex-end;opacity:0;transition:opacity .15s}.mdl-it:hover .mdl-a,.mdl-it:focus-within .mdl-a{opacity:1}.mdl-a .btn{padding:4px 8px}
 @media (max-width:700px){.mdl-grid{grid-template-columns:1fr}.mdl-f{border:0;display:flex;flex-wrap:wrap;gap:4px}.mdl-fb{width:auto}}`;document.head.appendChild(css);})();
})();

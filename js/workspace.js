/* ---------- WORKSPACE (Fase 2) ----------
   · Autoguardado: borrador local continuo + nube (si la landing ya existe en Supabase)
   · Estado de guardado y aviso de cambios sin guardar al cerrar
   · Atajos de teclado (también con el foco dentro del preview)
   · Copiar / pegar secciones entre landings · ocultar sección
   · Historial de versiones · exportar / importar proyecto .json
*/
const NC_DRAFT_KEY="nc_draft_v1",NC_CLIP_KEY="nc_clip_v1",NC_VERSIONS_KEEP=30;
const ws={savedCloud:null,savedLocal:null,dirtyT:null,cloudT:null,status:"",lastCloud:null,user:null,draftOff:false,booted:false};

function wsNow(){return JSON.stringify(cloudState());}
function wsName(){return (document.getElementById("landingName").value||"").trim();}
function wsTime(ts){const d=new Date(ts);return d.toLocaleTimeString('es-ES',{hour:'2-digit',minute:'2-digit'});}
function wsAgo(ts){const s=Math.round((Date.now()-new Date(ts).getTime())/1000);if(s<60)return 'hace un momento';const m=Math.round(s/60);if(m<60)return 'hace '+m+' min';const h=Math.round(m/60);if(h<24)return 'hace '+h+' h';const d=Math.round(h/24);return d===1?'ayer':'hace '+d+' días';}
function wsCloudReady(){return !!(window.NC_SB&&ws.user);}

/* ---- Estado visible ---- */
function wsSetStatus(kind,txt){ws.status=kind;const c=document.getElementById("saveChip");if(!c)return;c.className="savechip "+kind;c.textContent=txt;c.title={dirty:"Hay cambios sin guardar en la nube (Ctrl+S)",saving:"Guardando…",saved:"Guardado en la nube",local:"Guardado solo en este navegador",error:"Error al guardar"}[kind]||"";}
function wsRefreshStatus(){
  const now=wsNow();
  if(wsCloudReady()&&cloud.id){if(now===ws.savedCloud)wsSetStatus("saved","✓ Guardado "+(ws.lastCloud?wsTime(ws.lastCloud):""));else wsSetStatus("dirty","● Sin guardar");}
  else if(wsCloudReady()){wsSetStatus(state.sections.length?"dirty":"saved",state.sections.length?"● Sin guardar en la nube":"");}
  else wsSetStatus("local",ws.draftOff?"⚠ Sin borrador local":"✓ Borrador local");
}

/* ---- Cambios ---- */
function ncDirty(){if(!ws.booted)return;clearTimeout(ws.dirtyT);ws.dirtyT=setTimeout(wsOnChange,800);}
function wsOnChange(){
  wsSaveDraft();wsRefreshStatus();
  if(wsCloudReady()&&cloud.id&&wsNow()!==ws.savedCloud){clearTimeout(ws.cloudT);ws.cloudT=setTimeout(()=>saveLanding({auto:true}),15000);}
}
function wsSaveDraft(){
  if(ws.pendingDraft)return; // hay un borrador anterior pendiente de decidir: no lo pisamos
  const data=wsNow();if(data===ws.savedLocal)return;
  try{localStorage.setItem(NC_DRAFT_KEY,JSON.stringify({ts:Date.now(),cloudId:cloud.id,nombre:wsName(),data:JSON.parse(data),uid}));ws.savedLocal=data;ws.draftOff=false;}
  catch(e){ws.draftOff=true;} // cuota llena (imágenes en Base64) o almacenamiento bloqueado
}
function wsClearDraft(){try{localStorage.removeItem(NC_DRAFT_KEY);}catch(e){}ws.savedLocal=null;}
function wsMarkCloudSaved(){ws.savedCloud=wsNow();ws.lastCloud=Date.now();clearTimeout(ws.cloudT);wsRefreshStatus();}

/* ---- Recuperar borrador al abrir ---- */
function wsCheckDraft(){
  let d=null;try{d=JSON.parse(localStorage.getItem(NC_DRAFT_KEY)||"null");}catch(e){}
  if(!d||!d.data||!Array.isArray(d.data.sections)||!d.data.sections.length)return;
  if(JSON.stringify(d.data)===wsNow())return;
  ws.pendingDraft=true;
  wsModal(`<div class="nc-ov-head"><b>Tienes un borrador sin terminar</b></div>
    <div class="note" style="margin:0 0 12px">“${esc(d.nombre||'Sin título')}” · ${d.data.sections.length} secciones · ${wsAgo(d.ts)}${d.cloudId?' · vinculado a una landing de la nube':''}</div>
    <div style="display:flex;gap:8px;justify-content:flex-end"><button class="btn" data-m="discard">Descartar</button><button class="btn primary" data-m="restore">Recuperar</button></div>`,
    act=>{ws.pendingDraft=false;if(act==="restore"){applyCloud(d.data);if(d.uid)uid=Math.max(uid,d.uid);cloud.id=d.cloudId||null;document.getElementById("landingName").value=d.nombre||'';past=[];future=[];updHist();ws.savedLocal=wsNow();ws.savedCloud=null;wsRefreshStatus();toast("Borrador recuperado");}
      else{wsClearDraft();wsSaveDraft();}},false,true);
}

/* ---- Modal genérico ---- */
function wsModal(html,onAct,wide,sticky){
  let ov=document.getElementById("wsOverlay");
  if(!ov){ov=document.createElement("div");ov.id="wsOverlay";ov.className="nc-ov";document.body.appendChild(ov);}
  ov.innerHTML=`<div class="nc-ov-box"${wide?' style="width:640px"':''}>${html}</div>`;ov.style.display="grid";
  ov.onclick=e=>{const b=e.target.closest("[data-m]");if(e.target===ov){if(!sticky)ov.style.display="none";return;}if(!b)return;const r=onAct&&onAct(b.dataset.m,b);if(r!==false)ov.style.display="none";};
  return ov;
}

/* ---- Atajos ---- */
function wsShortcutsHelp(){
  wsModal(`<div class="nc-ov-head"><b>Atajos de teclado</b><button class="btn sm ghost" data-m="x">Cerrar</button></div>
  <div class="kbd-list">${[["Ctrl + S","Guardar en la nube (crea versión)"],["Ctrl + Z / Ctrl + Y","Deshacer / rehacer"],["Ctrl + D","Duplicar sección seleccionada"],["Ctrl + C / Ctrl + V","Copiar / pegar sección (también entre landings)"],["Supr","Eliminar sección seleccionada"],["Alt + ↑ / Alt + ↓","Mover sección"],["H","Ocultar / mostrar sección (no se exporta)"],["Esc","Quitar selección"],["?","Esta ayuda"]].map(k=>`<div><kbd>${k[0]}</kbd><span>${k[1]}</span></div>`).join("")}</div>`);
}
function wsKey(k){ // k: {key,ctrl,shift,alt,inField}
  const key=(k.key||"").toLowerCase(),ctrl=k.ctrl,sel=state.selected;
  if(ctrl&&key==="s"){saveLanding();return true;}
  if(k.inField)return false;
  if(ctrl&&key==="z"&&!k.shift){undo();return true;}
  if(ctrl&&(key==="y"||(k.shift&&key==="z"))){redo();return true;}
  if(ctrl&&key==="d"&&sel){rowAction(sel,"dup");return true;}
  if(ctrl&&key==="c"&&sel){wsCopy(sel);return true;}
  if(ctrl&&key==="v"){return wsPaste();}
  if(ctrl)return false;
  if(state.freeMode)return false;
  if((key==="delete"||key==="backspace")&&sel){rowAction(sel,"del");toast("Sección eliminada · Ctrl+Z para deshacer");return true;}
  if(k.alt&&key==="arrowup"&&sel){rowAction(sel,"up");return true;}
  if(k.alt&&key==="arrowdown"&&sel){rowAction(sel,"down");return true;}
  if(key==="h"&&sel){rowAction(sel,"hide");return true;}
  if(key==="escape"&&sel){state.selected=null;renderPreview();renderRight();return true;}
  if(key==="?"){wsShortcutsHelp();return true;}
  return false;
}
document.addEventListener("keydown",e=>{
  const t=e.target,tag=(t.tagName||"");
  const inField=tag==="INPUT"||tag==="TEXTAREA"||tag==="SELECT"||t.isContentEditable;
  if(inField&&(e.ctrlKey||e.metaKey)&&["c","v","d","z","y"].includes(e.key.toLowerCase()))return; // copiar/pegar texto normal
  if(wsKey({key:e.key,ctrl:e.ctrlKey||e.metaKey,shift:e.shiftKey,alt:e.altKey,inField}))e.preventDefault();
});

/* ---- Copiar / pegar secciones ---- */
function wsCopy(id){const s=state.sections.find(x=>x.id===id);if(!s)return;
  try{localStorage.setItem(NC_CLIP_KEY,JSON.stringify({ts:Date.now(),brand:state.settings.brand,section:s}));toast("Sección copiada · Ctrl+V para pegar (aquí o en otra landing)");}catch(e){toast("No se pudo copiar (sección demasiado pesada)");}}
function wsPaste(){let c=null;try{c=JSON.parse(localStorage.getItem(NC_CLIP_KEY)||"null");}catch(e){}
  if(!c||!c.section||!LIB[c.section.type]){toast("No hay ninguna sección copiada");return true;}
  commit();const n=JSON.parse(JSON.stringify(c.section));n.id=nid();delete n.hidden;
  const i=state.sections.findIndex(x=>x.id===state.selected);state.sections.splice(i<0?state.sections.length:i+1,0,n);state.selected=n.id;
  renderPreview();renderRight();renderPalette();
  toast(LIB[n.type].brand&&LIB[n.type].brand!==state.settings.brand?"Pegada · es un bloque de otra marca":"Sección pegada");return true;}

/* ---- Proyecto .json ---- */
function wsExportJson(){const o={app:"nc-landing-builder",v:1,exportedAt:new Date().toISOString(),nombre:wsName()||"Sin título",data:cloudState()};
  dlBlob(JSON.stringify(o,null,1),(state.settings.slug||"landing")+".nc.json","application/json");toast("Proyecto descargado");}
function wsImportJson(file){if(!file)return;const r=new FileReader();r.onload=()=>{try{const o=JSON.parse(r.result);const d=o.data||o;
    if(!Array.isArray(d.sections))throw new Error("formato");const bad=d.sections.filter(s=>!LIB[s.type]).length;
    commit();applyCloud(d);cloud.id=null;document.getElementById("landingName").value=(o.nombre||"")+(o.nombre?" (importada)":"");
    let mx=0;state.sections.forEach(s=>{const m=/^s(\d+)$/.exec(s.id||"");if(m)mx=Math.max(mx,+m[1]);});uid=Math.max(uid,mx+1);
    document.getElementById("mineOverlay").style.display="none";ws.savedCloud=null;wsOnChange();
    toast("Proyecto cargado"+(bad?" · "+bad+" bloque(s) desconocido(s)":""));}catch(e){toast("Archivo no válido: debe ser un .nc.json del builder");}};r.readAsText(file);}

/* ---- Historial de versiones ---- */
async function wsSaveVersion(id,nombre,data){
  const {error}=await window.NC_SB.from("landing_versions").insert({landing_id:id,nombre,data,created_by:ws.user||null});
  if(error){if(/landing_versions|relation|schema cache/i.test(error.message))ws.noVersions=true;return;}
  const {data:old}=await window.NC_SB.from("landing_versions").select("id").eq("landing_id",id).order("created_at",{ascending:false}).range(NC_VERSIONS_KEEP,NC_VERSIONS_KEEP+50);
  if(old&&old.length)await window.NC_SB.from("landing_versions").delete().in("id",old.map(x=>x.id));
}
async function wsShowVersions(id,nombre){
  const box=wsModal(`<div class="nc-ov-head"><b>Versiones · ${esc(nombre||'Sin título')}</b><button class="btn sm ghost" data-m="x">Cerrar</button></div><div id="verList"><div class="empty">Cargando…</div></div>`,null,true);
  const {data,error}=await window.NC_SB.from("landing_versions").select("id,nombre,created_at,created_by").eq("landing_id",id).order("created_at",{ascending:false});
  const vl=box.querySelector("#verList");
  if(error){vl.innerHTML=`<div class="note">El historial no está activo. Ejecuta <b>supabase-migration-v3.1.sql</b> en Supabase → SQL Editor.</div>`;return;}
  if(!data.length){vl.innerHTML=`<div class="empty">Aún no hay versiones. Se crea una cada vez que guardas a mano (💾 o Ctrl+S).</div>`;return;}
  vl.innerHTML=data.map((v,i)=>`<div class="oitem" style="cursor:default"><span class="nm">${i===0?'<b>Última</b> · ':''}${new Date(v.created_at).toLocaleString('es-ES',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'})} <span style="color:var(--muted2)">· ${esc(v.created_by||'')} ${esc(wsAgo(v.created_at))}</span></span><button class="btn sm" data-m="restore" data-v="${v.id}">Restaurar</button></div>`).join("");
  box.onclick=async e=>{if(e.target===box){box.style.display="none";return;}const b=e.target.closest("[data-m]");if(!b)return;if(b.dataset.m==="x"){box.style.display="none";return;}
    if(b.dataset.m==="restore"){const {data:v,error:er}=await window.NC_SB.from("landing_versions").select("*").eq("id",b.dataset.v).single();if(er){toast(er.message);return;}
      commit();applyCloud(v.data||{});cloud.id=id;document.getElementById("landingName").value=v.nombre||nombre||'';ws.savedCloud=null;wsOnChange();
      box.style.display="none";document.getElementById("mineOverlay").style.display="none";toast("Versión restaurada · guarda (Ctrl+S) para conservarla");}};
}

/* ---- Arranque ---- */
function ncInitWorkspace(){
  ws.booted=true;ws.savedLocal=null;
  wsCheckDraft();
  wsSaveDraft();
  wsRefreshStatus();
  setInterval(()=>{if(wsNow()!==ws.savedLocal)wsOnChange();},10000); // red de seguridad por si algún cambio no pasó por commit()
  window.addEventListener("beforeunload",e=>{wsSaveDraft();if(wsCloudReady()&&state.sections.length&&wsNow()!==ws.savedCloud){e.preventDefault();e.returnValue="";}});
  document.getElementById("btnKeys").addEventListener("click",wsShortcutsHelp);
  document.getElementById("mineJsonOut").addEventListener("click",wsExportJson);
  document.getElementById("mineJsonIn").addEventListener("click",()=>document.getElementById("mineJsonFile").click());
  document.getElementById("mineJsonFile").addEventListener("change",e=>{wsImportJson(e.target.files[0]);e.target.value="";});
  document.getElementById("mineSearch").addEventListener("input",()=>renderMineList());
  document.getElementById("mineBrand").addEventListener("change",()=>renderMineList());
}

/* ---------- CLOUD (Supabase) ---------- */
window.NC_SB=null;
const cloud={id:null};
(function initSB(){
  try{
    if(window.NC_CONFIG&&window.NC_CONFIG.SUPABASE_URL&&window.supabase){
      window.NC_SB=window.supabase.createClient(window.NC_CONFIG.SUPABASE_URL,window.NC_CONFIG.SUPABASE_ANON_KEY);
    }
  }catch(e){}
})();
function cloudState(){return {sections:state.sections,settings:state.settings,custom:CUSTOM};}
function applyCloud(o){try{state.sections=o.sections||[];state.settings=Object.assign(JSON.parse(JSON.stringify(SETTINGS_DEFAULT)),o.settings||{});if(o.settings&&o.settings.consent===undefined)state.settings.consent='banner';if(o.custom)Object.assign(CUSTOM,o.custom);syncCustom();state.selected=null;document.getElementById("brandTop").value=state.settings.brand;renderPalette();renderPreview();renderRight();}catch(e){toast('Datos corruptos');}}
async function saveLanding(opts){
  const auto=!!(opts&&opts.auto);
  if(!window.NC_SB){if(!auto){wsSaveDraft();toast('Sin nube: guardado como borrador en este navegador');}return;}
  if(!ws.user){if(!auto)showLogin(true);return;}
  const nombre=(document.getElementById("landingName").value||'Sin título').trim();
  const snapStr=JSON.stringify(cloudState()),data=JSON.parse(snapStr); // copia congelada: lo que se guarda es lo que había al pulsar
  const row={nombre,marca:state.settings.brand,data,updated_at:new Date().toISOString()};
  if(cloud.id)row.id=cloud.id;
  wsSetStatus("saving","Guardando…");
  const {data:res,error}=await window.NC_SB.from('landings').upsert(row).select('id').single();
  if(error){wsSetStatus("error","⚠ Error al guardar");if(!auto)toast('Error: '+error.message);return;}
  cloud.id=res.id;ws.savedCloud=snapStr;ws.lastCloud=Date.now();clearTimeout(ws.cloudT);
  if(!auto){await wsSaveVersion(res.id,nombre,data);toast(ws.noVersions?'Guardado ✓ (historial inactivo: ejecuta la migración SQL)':'Guardado ✓ · versión creada');}
  wsSaveDraft();wsRefreshStatus();
}
let mineCache=[];
async function listLandings(){
  const box=document.getElementById("mineList");
  if(!window.NC_SB){box.innerHTML='<div class="empty">Sin nube configurada (config.js). Puedes descargar o cargar el proyecto como .json.</div>';return;}
  box.innerHTML='<div class="empty">Cargando…</div>';
  const {data,error}=await window.NC_SB.from('landings').select('id,nombre,marca,updated_at').order('updated_at',{ascending:false});
  if(error){box.innerHTML='<div class="empty">'+esc(error.message)+'</div>';return;}
  mineCache=data||[];
  const bs=document.getElementById("mineBrand"),cur=bs.value;
  const marcas=[...new Set(mineCache.map(l=>l.marca).filter(Boolean))];
  bs.innerHTML='<option value="">Todas las marcas</option>'+marcas.map(m=>`<option value="${esc(m)}">${esc(BRANDS[m]?BRANDS[m].name:m)}</option>`).join("");bs.value=marcas.includes(cur)?cur:"";
  renderMineList();
}
function renderMineList(){
  const box=document.getElementById("mineList");if(!window.NC_SB)return;
  const q=(document.getElementById("mineSearch").value||"").toLowerCase().trim(),mb=document.getElementById("mineBrand").value;
  const rows=mineCache.filter(l=>(!mb||l.marca===mb)&&(!q||(l.nombre||'').toLowerCase().includes(q)));
  if(!mineCache.length){box.innerHTML='<div class="empty">Aún no hay landings guardadas.</div>';return;}
  if(!rows.length){box.innerHTML='<div class="empty">Sin resultados.</div>';return;}
  box.innerHTML=rows.map(l=>`<div class="oitem mine ${l.id===cloud.id?'sel':''}" style="cursor:default"><span class="nm" style="cursor:pointer" data-load="${l.id}">${esc(l.nombre||'Sin título')}${l.id===cloud.id?' <span class="tag">abierta</span>':''}<span class="sub">${esc(BRANDS[l.marca]?BRANDS[l.marca].name:(l.marca||'—'))} · ${esc(wsAgo(l.updated_at))}</span></span>
    <button class="mini" data-ver="${l.id}" title="Versiones">🕘</button><button class="mini" data-dup="${l.id}" title="Duplicar">⧉</button><button class="mini" data-del="${l.id}" title="Borrar">🗑</button></div>`).join("");
  box.querySelectorAll('[data-load]').forEach(el=>el.addEventListener('click',()=>openLanding(el.dataset.load)));
  box.querySelectorAll('[data-del]').forEach(el=>el.addEventListener('click',()=>delLanding(el.dataset.del)));
  box.querySelectorAll('[data-dup]').forEach(el=>el.addEventListener('click',()=>dupLanding(el.dataset.dup)));
  box.querySelectorAll('[data-ver]').forEach(el=>el.addEventListener('click',()=>{const l=mineCache.find(x=>x.id===el.dataset.ver);wsShowVersions(el.dataset.ver,l&&l.nombre);}));
}
async function openLanding(id){
  if(wsCloudReady()&&cloud.id&&cloud.id!==id&&wsNow()!==ws.savedCloud&&!confirm('La landing abierta tiene cambios sin guardar. ¿Abrir otra igualmente? (el borrador local se sustituye)'))return;
  const {data,error}=await window.NC_SB.from('landings').select('*').eq('id',id).single();
  if(error){toast(error.message);return;}
  cloud.id=data.id;document.getElementById("landingName").value=data.nombre||'';
  applyCloud(data.data||{});past=[];future=[];updHist();
  let mx=0;state.sections.forEach(s=>{const m=/^s(\d+)$/.exec(s.id||"");if(m)mx=Math.max(mx,+m[1]);});uid=Math.max(uid,mx+1);
  ws.savedCloud=wsNow();ws.lastCloud=new Date(data.updated_at).getTime();wsSaveDraft();wsRefreshStatus();
  document.getElementById("mineOverlay").style.display='none';toast('Cargada: '+(data.nombre||''));
}
async function dupLanding(id){
  const {data}=await window.NC_SB.from('landings').select('*').eq('id',id).single();
  if(!data)return;await window.NC_SB.from('landings').insert({nombre:(data.nombre||'')+' (copia)',marca:data.marca,data:data.data,updated_at:new Date().toISOString()});
  listLandings();toast('Duplicada');
}
async function delLanding(id){
  const l=mineCache.find(x=>x.id===id);
  if(!confirm('¿Borrar “'+((l&&l.nombre)||'esta landing')+'”? También se borran sus versiones.'))return;
  const {error}=await window.NC_SB.from('landings').delete().eq('id',id);
  if(error){toast(error.message);return;}
  if(cloud.id===id){cloud.id=null;ws.savedCloud=null;wsRefreshStatus();}listLandings();toast('Borrada');
}
function newLanding(){
  if(state.sections.length&&!confirm('¿Empezar una landing nueva? La actual queda en la nube si la guardaste; el borrador local se sustituye.'))return;
  commit();const brand=state.settings.brand;cloud.id=null;document.getElementById("landingName").value='';
  state.settings=Object.assign(JSON.parse(JSON.stringify(SETTINGS_DEFAULT)),{brand}); // no arrastrar teléfono/endpoint/GTM de otro cliente
  state.sections=[];state.selected=null;past=[];future=[];updHist();ws.savedCloud=null;
  renderPalette();renderPreview();renderRight();wsOnChange();document.getElementById("mineOverlay").style.display='none';toast('Nueva landing (ajustes de contacto y medición reiniciados)');
}
/* Auth compartido */
function showLogin(v){document.getElementById("loginOverlay").style.display=v?'grid':'none';}
async function checkAuth(){
  if(!window.NC_SB){document.getElementById("userChip").textContent='local (sin nube)';return;}
  const {data}=await window.NC_SB.auth.getSession();
  if(data&&data.session){ws.user=data.session.user.email;document.getElementById("userChip").textContent=ws.user;showLogin(false);wsRefreshStatus();}
  else{showLogin(true);}
}
document.getElementById("loginBtn").addEventListener('click',async()=>{
  const email=document.getElementById("loginEmail").value.trim(),password=document.getElementById("loginPass").value;
  const {error}=await window.NC_SB.auth.signInWithPassword({email,password});
  if(error){document.getElementById("loginErr").textContent=error.message;return;}
  ws.user=email;document.getElementById("userChip").textContent=email;showLogin(false);wsRefreshStatus();toast('Bienvenido');
});
document.getElementById("btnSave").addEventListener('click',saveLanding);
document.getElementById("btnMine").addEventListener('click',()=>{document.getElementById("mineOverlay").style.display='grid';listLandings();});
document.getElementById("btnLorem").addEventListener('click',fillLorem);
document.getElementById("btnImport").addEventListener('click',()=>{document.getElementById("importOverlay").style.display="grid";});
document.getElementById("importClose").addEventListener('click',()=>{document.getElementById("importOverlay").style.display="none";});
document.getElementById("importDo").addEventListener('click',doImport);
document.getElementById("zipBtn").addEventListener('click',()=>document.getElementById("zipFile").click());
document.getElementById("zipFile").addEventListener('change',e=>{if(e.target.files[0])zipImport(e.target.files[0]);});
function figmaImport(){
  const url=(document.getElementById("figUrl").value||"").trim();
  const token=(document.getElementById("figToken").value||"").trim();
  const info=document.getElementById("figInfo");
  if(!url||!token){toast("Pon la URL del frame y tu token");return;}
  const key=(url.match(/\/(?:file|design|proto)\/([a-zA-Z0-9]+)/)||[])[1];
  let node=(url.match(/node-id=([0-9]+[-:][0-9]+)/)||[])[1];
  if(node)node=node.replace("-",":");
  if(!key||!node){toast("URL no válida (necesita /design/KEY y node-id)");return;}
  info.textContent="Conectando con Figma…";
  fetch("/api/figma?kind=svg&fileKey="+key+"&nodeId="+encodeURIComponent(node),{headers:{"x-figma-token":token}})
    .then(r=>r.json()).then(j=>{
      if(!j.svg){info.textContent="Figma: "+(j.error||"sin SVG");return;}
      commit();state.settings.importCSS="";
      const wrap='<section style="padding:0"><div style="max-width:1280px;margin:0 auto">'+j.svg.replace('<svg','<svg style="width:100%;height:auto;display:block"')+'</div></section>';
      state.sections=[{id:nid(),type:"imported",props:{html:annotateImported(wrap)},style:{}}];
      state.selected=null;document.getElementById("figOverlay").style.display="none";info.textContent="";
      renderPalette();renderPreview();renderRight();toast("Frame de Figma importado (SVG)");
    }).catch(e=>{info.textContent="Sin conexión al proxy /api/figma (despliega api/figma.js en Vercel)";});
}
document.getElementById("btnFigma").addEventListener('click',()=>{document.getElementById("figOverlay").style.display="grid";});
document.getElementById("btnFree").addEventListener('click',()=>{state.freeMode=!state.freeMode;const b=document.getElementById("btnFree");b.classList.toggle("primary",state.freeMode);b.textContent=state.freeMode?"✥ Modo libre ✓":"✥ Modo libre";state.selected=null;renderPreview();toast(state.freeMode?"Modo libre ON: arrastra cualquier elemento":"Modo libre OFF");});
document.getElementById("figClose").addEventListener('click',()=>{document.getElementById("figOverlay").style.display="none";});
document.getElementById("figDo").addEventListener('click',figmaImport);
document.getElementById("translateDo").addEventListener('click',doTranslate);
document.getElementById("mineClose").addEventListener('click',()=>document.getElementById("mineOverlay").style.display='none');
document.getElementById("mineNew").addEventListener('click',newLanding);
/* checkAuth() se llama desde boot.js, cuando workspace.js ya está cargado */

/* ---------- BLOQUES Y PLANTILLAS DEL EQUIPO (v4.3) ----------
   Guarda secciones y landings completas para que todo el equipo las reutilice.
   · Con Supabase + sesión iniciada: tabla public.team_blocks (ver supabase-migration-v4.3.sql).
   · Sin nube: se guardan solo en este navegador (se indica como "local").
   Nunca se guardan claves: solo el JSON de las secciones y los ajustes visuales (marca, estilo). */
const team={rows:[],loaded:false,loading:false,local:false,err:""};
const TEAM_LS="nc_team_blocks_v1";
function teamCloud(){return !!(window.NC_SB&&typeof ws!=="undefined"&&ws.user);}
function teamLocalGet(){try{return JSON.parse(localStorage.getItem(TEAM_LS)||"[]");}catch(e){return [];}}
function teamLocalSet(a){try{localStorage.setItem(TEAM_LS,JSON.stringify(a));return true;}catch(e){toast("No hay espacio en el navegador: guarda en la nube");return false;}}
async function teamLoad(force){if(team.loading||(team.loaded&&!force))return;team.loading=true;
  try{if(teamCloud()){const {data,error}=await window.NC_SB.from("team_blocks").select("id,kind,nombre,cliente,etiquetas,data,created_by,created_at").order("created_at",{ascending:false});
      if(error){team.err=/team_blocks/.test(error.message)?"Falta la tabla team_blocks: ejecuta supabase-migration-v4.3.sql":error.message;team.rows=teamLocalGet();team.local=true;}
      else{team.rows=data||[];team.local=false;team.err="";}}
    else{team.rows=teamLocalGet();team.local=true;}}
  catch(e){team.err=String(e&&e.message||e);team.rows=teamLocalGet();team.local=true;}
  finally{team.loading=false;team.loaded=true;teamRegisterTemplates();renderPalette();}}
function teamClean(sec){const c=JSON.parse(JSON.stringify(sec));delete c.id;delete c.hidden;return c;}
function teamSettingsSnap(){const s=state.settings;return {brand:s.brand,look:s.look,lookBrandFont:s.lookBrandFont,voice:s.voice,annot:s.annot,hand:s.hand,texture:s.texture,editorial:s.editorial,mTitle:s.mTitle,mSpace:s.mSpace,stickyShow:s.stickyShow,stickyStyle:s.stickyStyle,ctaStyle:s.ctaStyle,ctaAction:s.ctaAction};}
async function teamSave(row){row.created_by=(typeof ws!=="undefined"&&ws.user)||null;
  if(teamCloud()&&!team.err){const {data,error}=await window.NC_SB.from("team_blocks").insert(row).select("id,kind,nombre,cliente,etiquetas,data,created_by,created_at").single();
    if(error){toast("Error: "+error.message);return false;}team.rows.unshift(data);}
  else{row.id="l"+Date.now().toString(36);row.created_at=new Date().toISOString();const a=teamLocalGet();a.unshift(row);if(!teamLocalSet(a))return false;team.rows=a;}
  teamRegisterTemplates();renderPalette();toast((row.kind==="landing"?"Plantilla":"Bloque")+" guardado para el equipo"+(teamCloud()&&!team.err?"":" (solo en este navegador)"));return true;}
async function teamDelete(id){const r=team.rows.find(x=>x.id===id);if(!r||!confirm(`¿Borrar “${r.nombre}” para todo el equipo?`))return;
  if(!/^l/.test(id)&&teamCloud()){const {error}=await window.NC_SB.from("team_blocks").delete().eq("id",id);if(error){toast("Error: "+error.message);return;}}
  else teamLocalSet(teamLocalGet().filter(x=>x.id!==id));
  team.rows=team.rows.filter(x=>x.id!==id);teamRegisterTemplates();renderPalette();if(document.getElementById("tplOverlay")&&document.getElementById("tplOverlay").style.display!=="none")renderTplGallery();toast("Borrado");}
function teamDialog(kind,sec){let ov=document.getElementById("teamOverlay");if(!ov){ov=document.createElement("div");ov.id="teamOverlay";ov.className="nc-ov";document.body.appendChild(ov);}
  const clients=[...new Set(team.rows.map(r=>r.cliente).filter(Boolean))];const brandName=(BRANDS[state.settings.brand]||{}).name||"";
  const def=kind==="landing"?(document.getElementById("landingName")&&document.getElementById("landingName").value||""):(sec?LIB[sec.type].label.replace(/^[A-C✚] · |^✚ /,""):"");
  ov.innerHTML=`<div class="nc-ov-box" style="width:460px"><div class="nc-ov-head"><b>${kind==="landing"?"Guardar la landing como plantilla del equipo":"Guardar el bloque para el equipo"}</b><button class="btn sm ghost" data-tm="close">Cerrar</button></div>
    <div class="fld"><label>Nombre</label><input id="tmName" value="${esc(def)}" placeholder="p. ej. Hero Jazztel octubre"></div>
    <div class="fld"><label>Cliente</label><input id="tmClient" list="tmClients" value="${esc(/Next Conversion|Estilo ·/.test(brandName)?"":brandName)}" placeholder="p. ej. Jazztel"><datalist id="tmClients">${clients.map(c=>`<option value="${esc(c)}">`).join("")}</datalist></div>
    <div class="fld"><label>Etiquetas (separadas por comas)</label><input id="tmTags" placeholder="fibra, oferta, octubre"></div>
    <div class="help" style="margin:0 0 12px">${teamCloud()&&!team.err?"Lo verá todo el equipo al iniciar sesión.":"Sin sesión en la nube: se guarda solo en este navegador."+(team.err?" "+esc(team.err):"")}${kind==="landing"?" Se guardan las secciones, la marca y el estilo; no se guardan teléfono, endpoint ni GTM.":""}</div>
    <div style="display:flex;justify-content:flex-end;gap:8px"><button class="btn primary" data-tm="save">Guardar</button></div></div>`;
  ov.style.display="grid";setTimeout(()=>{const n=document.getElementById("tmName");if(n){n.focus();n.select();}},30);
  ov.onclick=async e=>{const b=e.target.closest("[data-tm]");if(e.target===ov||(b&&b.dataset.tm==="close")){ov.style.display="none";return;}
    if(b&&b.dataset.tm==="save"){const nombre=document.getElementById("tmName").value.trim();if(!nombre){document.getElementById("tmName").focus();return;}
      const row={kind,nombre:nombre.slice(0,120),cliente:document.getElementById("tmClient").value.trim().slice(0,80)||null,etiquetas:document.getElementById("tmTags").value.split(",").map(x=>x.trim()).filter(Boolean).slice(0,10).join(", ")||null,
        data:kind==="landing"?{sections:state.sections.filter(s=>!s.hidden).map(teamClean),settings:teamSettingsSnap()}:{section:teamClean(sec)}};
      b.disabled=true;const ok=await teamSave(row);b.disabled=false;if(ok)ov.style.display="none";}};}
function teamAddSection(id,index){const r=team.rows.find(x=>x.id===id);if(!r||!r.data||!r.data.section)return;const s=JSON.parse(JSON.stringify(r.data.section));if(!LIB[s.type]){toast("Este bloque usa un tipo que ya no existe");return;}
  commit();s.id=nid();s.props=Object.assign(LIB[s.type].def(),s.props||{});s.style=s.style||{};if(index==null||index<0||index>state.sections.length)state.sections.push(s);else state.sections.splice(index,0,s);
  state.selected=s.id;renderPreview();renderRight();toast("“"+r.nombre+"” añadido");}
/* Plantillas del equipo → galería (grupo "Equipo") */
function teamRegisterTemplates(){Object.keys(TEMPLATE_META).filter(n=>TEMPLATE_META[n].group==="Equipo").forEach(n=>{delete TEMPLATES[n];delete TEMPLATE_META[n];delete TEMPLATE_BRAND[n];});
  team.rows.filter(r=>r.kind==="landing"&&r.data&&Array.isArray(r.data.sections)).forEach(r=>{let n="Equipo · "+r.nombre;let k=2;while(TEMPLATES[n]&&TEMPLATE_META[n]&&TEMPLATE_META[n].team!==r.id)n="Equipo · "+r.nombre+" ("+(k++)+")";
    TEMPLATES[n]=r.data.sections.filter(s=>LIB[s.type]).map(s=>({type:s.type,props:s.props||{},style:s.style||{}}));
    const st=r.data.settings||{};TEMPLATE_META[n]={group:"Equipo",team:r.id,client:r.cliente||"",look:st.look&&LOOKS[st.look]?st.look:undefined,sector:"",dir:"—",canal:"",desc:[r.cliente,r.etiquetas,r.created_by?"por "+r.created_by.split("@")[0]:"",team.local?"local":""].filter(Boolean).join(" · ")};
    if(st.brand&&BRANDS[st.brand])TEMPLATE_BRAND[n]=st.brand;});}

/* ---- Enganches en el editor ---- */
(function(){
  const _rp=renderPalette;renderPalette=function(){_rp.apply(this,arguments);if(!team.loaded&&!team.loading){setTimeout(()=>teamLoad(),0);return;}
    const p=document.getElementById("palette");if(!p)return;const ps=document.getElementById("palSearch");const q=((ps&&ps.value)||"").toLowerCase();
    const rows=team.rows.filter(r=>r.kind==="section"&&r.data&&r.data.section&&LIB[r.data.section.type]&&(!q||[r.nombre,r.cliente,r.etiquetas].join(" ").toLowerCase().includes(q)));
    const head=`<div class="paneltitle team-pt">Del equipo${team.local?' <span class="tag">local</span>':''}<button class="mini" id="teamReload" title="Actualizar">↻</button></div>`;
    const body=rows.length?`<div class="cat">${rows.map(r=>`<div class="chip team-chip" draggable="true" data-team="${esc(r.id)}" title="${esc([r.cliente,r.etiquetas,r.created_by].filter(Boolean).join(" · "))}"><span class="ico">☁</span> ${esc(r.nombre)}${r.cliente?`<small>${esc(r.cliente)}</small>`:""}<button class="k" data-teamdel="${esc(r.id)}" title="Borrar para el equipo">×</button></div>`).join("")}</div>`
      :`<div class="help" style="margin:0 0 10px">${q?"Ningún bloque del equipo coincide.":"Guarda cualquier sección con ☁ en Estructura y aparecerá aquí para todo el equipo."}${team.err?" "+esc(team.err):""}</div>`;
    p.insertAdjacentHTML("afterbegin",head+body);
    const rl=document.getElementById("teamReload");if(rl)rl.addEventListener("click",()=>teamLoad(true));
    p.querySelectorAll("[data-team]").forEach(c=>{c.addEventListener("click",e=>{if(e.target.closest("[data-teamdel]"))return;teamAddSection(c.dataset.team);});
      c.addEventListener("dragstart",()=>{window.teamDrag=c.dataset.team;dragType=null;showDrop(true);});c.addEventListener("dragend",()=>showDrop(false));});
    p.querySelectorAll("[data-teamdel]").forEach(b=>b.addEventListener("click",e=>{e.stopPropagation();teamDelete(b.dataset.teamdel);}));};
  const _dr=dropOnIndex;dropOnIndex=function(t){if(window.teamDrag){const id=window.teamDrag;window.teamDrag=null;teamAddSection(id,t);return;}return _dr.apply(this,arguments);};
  const _ro=renderOutline;renderOutline=function(){_ro.apply(this,arguments);document.querySelectorAll("#outline .oitem").forEach(el=>{if(el.querySelector('[data-act="team"]'))return;const b=document.createElement("button");b.className="mini";b.dataset.act="team";b.title="Guardar para el equipo";b.textContent="☁";
    const del=el.querySelector('[data-act="del"]');el.insertBefore(b,del);b.addEventListener("click",e=>{e.stopPropagation();const s=state.sections.find(x=>x.id===el.dataset.id);if(s)teamDialog("section",s);});});};
  const _og=openTplGallery;openTplGallery=function(){_og.apply(this,arguments);teamLoad();const h=document.querySelector("#tplOverlay .nc-ov-head");if(h&&!h.querySelector("#tplTeamSave")){const b=document.createElement("button");b.className="btn sm";b.id="tplTeamSave";b.textContent="☁ Guardar la actual como plantilla";b.style.marginRight="8px";
    b.addEventListener("click",()=>{if(!state.sections.length){toast("La landing está vacía");return;}teamDialog("landing");});h.insertBefore(b,h.querySelector('[data-tg="close"]'));}};
  const _rtg=renderTplGallery;renderTplGallery=function(){_rtg.apply(this,arguments);const f=document.getElementById("tplF");if(f&&!f.querySelector('[data-v="Equipo"]')){const b=document.createElement("button");b.className="chipf"+(tplGal.f==="Equipo"?" on":"");b.dataset.tg="f";b.dataset.v="Equipo";b.textContent="Equipo";
      const ref=f.querySelector('[data-v="Sector"]');f.insertBefore(b,ref||f.firstChild);}
    document.querySelectorAll("#tplGrid .tpl-card").forEach(card=>{const u=card.querySelector("[data-use]");const m=u&&TEMPLATE_META[u.dataset.use];if(!m||m.group!=="Equipo"||card.querySelector("[data-teamdel]"))return;
      const d=document.createElement("button");d.className="btn sm ghost";d.dataset.teamdel=m.team;d.textContent="Borrar";d.style.marginLeft="6px";d.addEventListener("click",()=>teamDelete(m.team));u.insertAdjacentElement("afterend",d);});
    if(tplGal.f==="Equipo"&&!Object.values(TEMPLATE_META).some(m=>m.group==="Equipo")){const g=document.getElementById("tplGrid");if(g)g.innerHTML=`<div class="empty">Aún no hay plantillas del equipo. Pulsa “☁ Guardar la actual como plantilla”.${team.err?" "+esc(team.err):""}</div>`;}};
})();
setInterval(()=>{if(teamCloud()&&team.local&&!team.err&&!team.loading)teamLoad(true);},5000);

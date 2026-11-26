/* ---------- v6.0 · ESTUDIO ----------
   1 · Barra superior en menús (Archivo, Herramientas, Revisar, Exportar) con iconos de línea.
   2 · Nombres de bloque sin capas (fuera «A ·», «B ·», «C ·», «✚»).
   3 · Acabado: «Limpio» (por defecto en landings nuevas) quita las capas decorativas que se pintaban encima
       de la landing (anotaciones a mano, letra manuscrita, grano/papel, numeración editorial, fotos en B/N o
       duotono, mockups girados y sellos). «Con adornos» deja los toques personales como antes.
   4 · Estilos de diseño: 9 recomendados a la vista; el resto, en «experimentales».
   Las landings guardadas antes de la v6 se abren con «Con adornos» para que no cambie su aspecto. */

/* ===== Iconos (Lucide, ISC) ===== */
const NC6_ICO={
  save:'<path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/><path d="M7 3v4a1 1 0 0 0 1 1h7"/>',
  folder:'<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
  sparkles:'<path d="M9.94 14.06 8 20l-1.94-5.94L0 12l6.06-1.94L8 4l1.94 6.06L16 12z" transform="translate(4 -1) scale(.9)"/><path d="M20 3v4"/><path d="M22 5h-4"/>',
  code:'<path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/>',
  figma:'<path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"/><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"/><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/>',
  table:'<path d="M12 3v18"/><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/>',
  image:'<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.09-3.09a2 2 0 0 0-2.82 0L6 21"/>',
  text:'<path d="M17 6.1H3"/><path d="M21 12.1H3"/><path d="M15.1 18H3"/>',
  move:'<path d="M12 2v20"/><path d="m15 19-3 3-3-3"/><path d="m19 9 3 3-3 3"/><path d="M2 12h20"/><path d="m5 9-3 3 3 3"/><path d="m9 5 3-3 3 3"/>',
  keyboard:'<path d="M10 8h.01"/><path d="M12 12h.01"/><path d="M14 8h.01"/><path d="M16 12h.01"/><path d="M18 8h.01"/><path d="M6 8h.01"/><path d="M7 16h10"/><path d="M8 12h.01"/><rect width="20" height="16" x="2" y="4" rx="2"/>',
  "list-checks":'<path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/>',
  chart:'<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="m19 9-5 5-4-4-3 3"/>',
  zap:'<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
  rocket:'<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
  file:'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>',
  archive:'<rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/>',
  split:'<path d="M16 3h5v5"/><path d="M8 3H3v5"/><path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3"/><path d="m15 9 6-6"/>',
  grid:'<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
  wand:'<path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72"/><path d="m14 7 3 3"/><path d="M5 6v4"/><path d="M19 14v4"/><path d="M10 2v2"/><path d="M7 8H3"/><path d="M21 16h-4"/><path d="M11 3H9"/>',
  eye:'<path d="M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0"/><circle cx="12" cy="12" r="3"/>',
  download:'<path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/>',
  check:'<path d="M20 6 9 17l-5-5"/>',
  chevron:'<path d="m6 9 6 6 6-6"/>',
  undo:'<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>',
  redo:'<path d="m15 14 5-5-5-5"/><path d="M20 9H9.5a5.5 5.5 0 0 0 0 11H13"/>',
  phone:'<rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/>',
  tablet:'<rect width="16" height="20" x="4" y="2" rx="2"/><path d="M12 18h.01"/>',
  monitor:'<rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/>'
};
function nc6Ico(k,cls){const p=NC6_ICO[k];return p?`<svg class="i6${cls?" "+cls:""}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`:"";}

/* ===== 1 · Barra superior ===== */
function nc6Item(b,ico,label,kbd){b.classList.add("tbm-i");b.setAttribute("role","menuitem");
  b.innerHTML=`${nc6Ico(ico||"file")}<span>${esc(label||b.textContent.replace(/^[^\wÁÉÍÓÚáéíóúñÑ¿]+/,"").trim())}</span>${kbd?`<kbd>${esc(kbd)}</kbd>`:""}`;}
function nc6Menus(){
  /* botones creados por otros módulos → a su hueco */
  document.querySelectorAll(".topbar [data-slot]").forEach(s=>{const b=document.getElementById(s.dataset.slot);if(!b){s.remove();return;}
    s.replaceWith(b);nc6Item(b,s.dataset.ico,s.dataset.label);});
  document.querySelectorAll(".tbm-pop > button.btn:not(.tbm-i)").forEach(b=>nc6Item(b,b.dataset.ico,b.textContent.trim(),b.dataset.kbd));
  /* lo que algún módulo haya dejado suelto en la barra (p. ej. uno nuevo) va a Herramientas para no romper la fila */
  const tools=document.querySelector('.tbm[data-menu="tools"] .tbm-pop');
  document.querySelectorAll(".topbar > button.btn").forEach(b=>{if(/^(btnTpl|btnBrief|btnPreview|btnTheme)$/.test(b.id))return;if(tools){tools.insertBefore(b,tools.querySelector(".tbm-sep"));nc6Item(b,"grid",b.textContent.trim());}});
  /* iconos de la fila */
  const set=(id,ico,txt)=>{const b=document.getElementById(id);if(b)b.innerHTML=nc6Ico(ico)+(txt?`<span>${txt}</span>`:"");};
  set("btnTpl","grid","Plantillas");set("btnBrief","wand","Generar");set("btnPreview","eye","Vista previa");set("btnUndo","undo");set("btnRedo","redo");
  document.querySelectorAll("#devSeg [data-dev]").forEach(b=>{const k={mobile:"phone",tablet:"tablet",desktop:"monitor"}[b.dataset.dev];b.innerHTML=nc6Ico(k)+`<span>${b.title}</span>`;});
  document.querySelectorAll(".tbm-b").forEach(b=>{if(!b.querySelector(".i6"))b.insertAdjacentHTML("beforeend",nc6Ico("chevron","chev"));});
  const ex=document.querySelector('.tbm[data-menu="export"] .tbm-b');if(ex&&!ex.querySelector(".lead"))ex.insertAdjacentHTML("afterbegin",nc6Ico("download","lead"));
  /* abrir/cerrar */
  const close=except=>document.querySelectorAll(".tbm.open").forEach(m=>{if(m!==except){m.classList.remove("open");m.querySelector(".tbm-b").setAttribute("aria-expanded","false");}});
  document.querySelectorAll(".tbm").forEach(m=>{const b=m.querySelector(".tbm-b");
    b.addEventListener("click",e=>{e.stopPropagation();const hov=Date.now()-(m._hov||0)<600;const o=hov||!m.classList.contains("open");m._hov=0;close(m);m.classList.toggle("open",o);b.setAttribute("aria-expanded",String(o));if(o){const f=m.querySelector(".tbm-i");if(f&&e.detail===0)f.focus();}});
    /* con un menú abierto, pasar el ratón por otro lo abre (como en un menú de escritorio) */
    b.addEventListener("mouseenter",()=>{if(document.querySelector(".tbm.open")&&!m.classList.contains("open")){close(m);m.classList.add("open");m._hov=Date.now();b.setAttribute("aria-expanded","true");}});
    m.querySelector(".tbm-pop").addEventListener("click",e=>{if(e.target.closest(".tbm-i"))close();});
    m.addEventListener("keydown",e=>{const its=[...m.querySelectorAll(".tbm-i")];const i=its.indexOf(document.activeElement);
      if(e.key==="ArrowDown"){e.preventDefault();(its[i+1]||its[0]).focus();}else if(e.key==="ArrowUp"){e.preventDefault();(its[i-1]||its[its.length-1]).focus();}
      else if(e.key==="Escape"){close();b.focus();}});});
  document.addEventListener("click",()=>close());
  window.addEventListener("blur",()=>close());}

/* ===== 2 · Nombres sin capas ===== */
function nc6CleanLabels(){Object.keys(LIB).forEach(t=>{const b=LIB[t];if(b&&b.label&&!b._lab0){b._lab0=b.label;b.label=String(b.label).replace(/^[ABC] · |^[✚] /,"");}});}

/* ===== 3 · Acabado ===== */
SETTINGS_DEFAULT.finish="limpio";
const NC6_FIN=()=>state.settings.finish==="estilo"?"estilo":"limpio";
(function(){const _t=ncTouchOn;ncTouchOn=function(k){if(NC6_FIN()==="limpio")return k==="tex"?"none":false;return _t.apply(this,arguments);};})();
(function(){const _c=ncTouchClasses;ncTouchClasses=function(){return _c.apply(this,arguments)+(NC6_FIN()==="limpio"?" nc-clean":"");};})();
(function(){const _css=ncTouchCSS;ncTouchCSS=function(){return _css.apply(this,arguments)+(NC6_FIN()==="limpio"?NC6_CLEAN_CSS:"");};})();
/* Lo que quita «Limpio»: solo capas de adorno. Colores, tipografía y estructura del estilo se mantienen. */
const NC6_CLEAN_CSS=`
body.nc-clean .nc-ann,body.nc-clean .nc-circ,body.nc-clean .mk-stamp{display:none!important}
body.nc-clean .nc-vis>img,body.nc-clean .nc-vis.is-photo img{filter:none!important}
body.nc-clean .nc-vis.is-photo::before,body.nc-clean .nc-vis.is-photo::after,body.nc-clean .nc-fx-duo::after{content:none!important;display:none!important}
body.nc-clean .mk-tel .mk-sheet,body.nc-clean .mk-bill .mk-sheet,body.nc-clean .mk-doc .mk-sheet,body.nc-clean .mk-card,body.nc-clean .nc-phone{transform:none!important}
body.nc-clean .nc-float{box-shadow:0 12px 32px -14px color-mix(in srgb,var(--ink0,#111) 35%,transparent)}
body.nc-clean .da-plan.best .tag::after{content:none!important}`;
/* Landings guardadas antes de la v6: se respetan sus adornos */
(function(){if(typeof applyCloud!=="function")return;const _a=applyCloud;applyCloud=function(o){const r=_a.apply(this,arguments);try{if(o&&o.settings&&!("finish" in o.settings))state.settings.finish="estilo";}catch(e){}return r;};})();

/* ===== 4 · Estilos recomendados ===== */
const NC6_LOOK_PRO=["base","neobanco","vitrina","nocturno","editorial","lux","swiss","prensa","escaparate"];
function nc6LookPro(k){return NC6_LOOK_PRO.includes(k);}

/* Panel Global: acabado + estilos recomendados. Se reordena el HTML que genera renderGlobal (editor.js). */
(function(){const _g=renderGlobal;renderGlobal=function(){const r=_g.apply(this,arguments);try{nc6Global();}catch(e){console.warn(e);}return r;};})();
function nc6Global(){const gf=document.getElementById("globalFields");if(!gf)return;const st=state.settings;
  /* estilos: solo los recomendados salvo que se pidan todos */
  const grid=gf.querySelector(".lk-grid"),cats=gf.querySelector(".lk-cats");
  if(grid){const all=!!window.nc6LkAll;if(cats)cats.style.display=all?"":"none";
    grid.querySelectorAll(".lk-tile").forEach(t=>{const k=t.dataset.look;const pro=nc6LookPro(k);t.style.display=(all||pro||k===ncLook())?"":"none";if(!pro)t.classList.add("exp");});
    const n=Object.keys(LOOKS).length-NC6_LOOK_PRO.length;
    grid.insertAdjacentHTML("afterend",`<button type="button" class="btn sm ghost lk-more" id="nc6LkAll">${all?"Ver solo los recomendados":"Ver "+n+" estilos experimentales"}</button>`);
    document.getElementById("nc6LkAll").addEventListener("click",()=>{window.nc6LkAll=!window.nc6LkAll;if(!window.nc6LkAll)window.ncLkCat="Todos";renderGlobal();});}
  /* acabado: sustituye «Toques personales» */
  const ids=["gAnnot","gHand","gTex","gEd"].map(i=>document.getElementById(i)).filter(Boolean);if(!ids.length)return;
  const flds=ids.map(i=>i.closest(".fld"));const title=[...gf.querySelectorAll(".paneltitle")].find(p=>/Toques personales/.test(p.textContent));
  const box=document.createElement("div");box.className="nc6-fin";const fin=NC6_FIN();
  box.innerHTML=`<div class="paneltitle" style="padding:10px 0 4px">Acabado</div>
    <div class="seg nc6-seg" role="radiogroup" aria-label="Acabado"><button type="button" data-fin="limpio" class="${fin==="limpio"?"on":""}" role="radio" aria-checked="${fin==="limpio"}">Limpio</button><button type="button" data-fin="estilo" class="${fin==="estilo"?"on":""}" role="radio" aria-checked="${fin==="estilo"}">Con adornos</button></div>
    <div class="help" style="margin:6px 0 8px">${fin==="limpio"?"Sin capas encima del diseño: fotos con su color, sin notas a mano, sin texturas ni numeración. Recomendado para campañas.":"Activa los toques del estilo que quieras."}</div>
    <div class="nc6-fin-adv"${fin==="limpio"?" hidden":""}></div>`;
  (title||flds[0]).before(box);const adv=box.querySelector(".nc6-fin-adv");flds.forEach(f=>adv.appendChild(f));if(title)title.remove();
  box.querySelectorAll("[data-fin]").forEach(b=>b.addEventListener("click",()=>{if(st.finish===b.dataset.fin)return;commit();st.finish=b.dataset.fin;renderPreview();renderGlobal();}));}

/* Galería de plantillas: los estilos experimentales, tras «Más estilos» */
(function(){if(typeof renderTplGallery!=="function")return;const _r=renderTplGallery;renderTplGallery=function(){const r=_r.apply(this,arguments);try{nc6TplLooks();}catch(e){}return r;};})();
function nc6TplLooks(){const row=document.getElementById("tplL");if(!row)return;const all=!!window.nc6TplAll;
  row.querySelectorAll("[data-tg=lk]").forEach(b=>{const k=b.dataset.v;if(!k||k==="__tpl"||nc6LookPro(k)||b.classList.contains("on"))return;b.style.display=all?"":"none";});
  if(!row.querySelector(".nc6-more")){row.insertAdjacentHTML("beforeend",`<button type="button" class="chipf sm nc6-more">${all?"Menos estilos":"Más estilos…"}</button>`);
    row.querySelector(".nc6-more").addEventListener("click",e=>{e.stopPropagation();window.nc6TplAll=!window.nc6TplAll;nc6TplLooks();row.querySelector(".nc6-more").textContent=window.nc6TplAll?"Menos estilos":"Más estilos…";});}}

/* ===== Arranque ===== */
nc6CleanLabels();
document.addEventListener("DOMContentLoaded",()=>{nc6Menus();nc6CleanLabels();if(typeof renderPalette==="function")renderPalette();});

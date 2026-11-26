/* ---------- v6.0 · CAPAS (edición visual directa) ----------
   Panel derecho → «Capas»: el árbol de la sección seleccionada tal y como se ve en el lienzo (titulares, textos,
   botones, imágenes, formularios, listas y cajas), como en Figma.
   · Clic en una capa = seleccionarla en el lienzo (barra flotante y Estilo → «Elemento seleccionado»).
   · Pasar el ratón = resaltarla en el lienzo.
   · Ojo = ocultar: en móvil → en escritorio → siempre → visible (no sale en el export).
   · ⟲ = quitar el estilo propio de esa capa. Un punto indica que la capa tiene estilo propio.
   · Las cajas se pliegan y despliegan; la selección hecha en el lienzo se marca en el árbol.
   Usa las mismas rutas que el estilo por elemento (edit-pro.js), así que todo se guarda igual en s.els. */
(function(){
const LY={view:"sec",fold:{},sel:null};
try{LY.view=localStorage.getItem("nc_ly_view")==="layers"?"layers":"sec";}catch(e){}
const EXC=n=>n.classList&&(n.classList.contains("nc-phc")||n.classList.contains("nc-tb")||n.classList.contains("nc-tbx"));
const SKIP=/^(script|style|noscript|template|link|meta|br|svg|path|use|g|circle|rect|line|polyline|polygon|defs|symbol|source|track|wbr)$/i;
const TXT=/^(p|span|small|strong|b|em|i|blockquote|figcaption|label|cite|time|address|dt|dd|summary|sup|sub|mark)$/i;
function idx(n){let k=0;for(let c=n.parentElement.firstElementChild;c;c=c.nextElementSibling){if(EXC(c))continue;k++;if(c===n)return k;}return k;}
function pathOf(n,sec){const P=[];for(let x=n;x&&x!==sec;x=x.parentElement)P.unshift(x.tagName.toLowerCase()+":"+idx(x));return P.join(">");}
function vis(n,win){const cs=win.getComputedStyle(n);if(cs.display==="none"||cs.visibility==="hidden")return false;if(n.type==="hidden")return false;const r=n.getBoundingClientRect();return r.width>1||r.height>1||cs.display==="contents";}
function txt(n){return (n.textContent||"").replace(/\s+/g," ").trim();}
function kind(n,win){const t=n.tagName.toLowerCase();
  if(/^h[1-6]$/.test(t))return ["h",t==="h1"?"Titular":"Título "+t.slice(1).toUpperCase()];
  if(t==="img"||t==="picture")return ["img","Imagen"];if(t==="video"||t==="iframe")return ["img",t==="video"?"Vídeo":"Insertado"];
  if(t==="form")return ["form","Formulario"];if(/^(input|select|textarea)$/.test(t))return ["field","Campo"];
  if(t==="a"||t==="button"){const cs=win.getComputedStyle(n);const btn=/btn|button|cta|call|go|pill/i.test(n.className)||(cs.backgroundColor&&!/rgba\(0, 0, 0, 0\)|transparent/.test(cs.backgroundColor));return ["btn",btn?"Botón":"Enlace"];}
  if(t==="ul"||t==="ol"||t==="dl")return ["list","Lista"];if(t==="hr")return ["line","Línea"];
  if(TXT.test(t))return ["txt","Texto"];return null;}
/* árbol: las cajas con un solo hijo útil se aplanan; las vacías desaparecen salvo que tengan fondo */
function build(n,sec,win,depth,budget){const out=[];for(let c=n.firstElementChild;c;c=c.nextElementSibling){if(budget.n<=0)break;if(EXC(c)||SKIP.test(c.tagName)||!vis(c,win))continue;
    const k=kind(c,win);
    if(k&&k[0]!=="form"){const t=k[0]==="img"?(c.getAttribute("alt")||(c.getAttribute("src")||"").split("/").pop().split("?")[0]):k[0]==="list"?c.children.length+" elementos · "+txt(c):k[0]==="field"?(c.getAttribute("placeholder")||c.getAttribute("name")||c.type||""):txt(c);
      if(k[0]==="txt"&&!t)continue;budget.n--;out.push({path:pathOf(c,sec),k:k[0],name:k[1],t,kids:[]});continue;}
    const kids=depth<9?build(c,sec,win,depth+1,budget):[];
    if(k&&k[0]==="form"){budget.n--;out.push({path:pathOf(c,sec),k:"form",name:"Formulario",t:"",kids});continue;}
    const own=[...c.childNodes].some(x=>x.nodeType===3&&x.textContent.trim());
    if(own&&!kids.length){budget.n--;out.push({path:pathOf(c,sec),k:"txt",name:"Texto",t:txt(c),kids:[]});continue;}
    const bg=win.getComputedStyle(c).backgroundImage;
    if(kids.length>1||(kids.length&&bg&&bg!=="none"&&/url\(/.test(bg))){budget.n--;const cl=String(c.className||"").split(/\s+/).find(x=>x&&!/^(nc-|col|row|d-|g-|container|position|align|justify|text-|m[tbsexy]?-|p[tbsexy]?-)/.test(x))||"";
      out.push({path:pathOf(c,sec),k:"box",name:/url\(/.test(bg||"")?"Caja con imagen":/^(header|nav)$/i.test(c.tagName)?"Cabecera":/^footer$/i.test(c.tagName)?"Pie":"Grupo",t:cl.replace(/[-_]/g," "),kids});}
    else if(kids.length===1)out.push(kids[0]);
    else if(bg&&/url\(/.test(bg)){budget.n--;out.push({path:pathOf(c,sec),k:"img",name:"Fondo",t:"",kids:[]});}}
  return out;}
const ICO={h:"H",txt:"¶",btn:"▭",img:"▣",form:"⌗",field:"✎",list:"☰",box:"▢",line:"—"};
function rows(L,s,d){return L.map(x=>{const o=(s.els||{})[x.path]||{};const styled=Object.keys(o).some(k=>k!=="hide");const fold=!!LY.fold[s.id+"|"+x.path];
    const hideT={"":"Visible · clic: ocultar en móvil",mob:"Oculto en móvil · clic: ocultar en escritorio",desk:"Oculto en escritorio · clic: ocultar siempre",all:"Oculto siempre · clic: mostrar"}[o.hide||""];
    return `<div class="ly-row${o.hide?" hid":""}${LY.sel===x.path?" on":""}" data-p="${esc(x.path)}" style="--d:${d}" role="treeitem" aria-level="${d+1}"${x.kids.length?` aria-expanded="${!fold}"`:""} tabindex="-1">
      ${x.kids.length?`<button type="button" class="ly-fold" data-ly="fold" aria-label="${fold?"Desplegar":"Plegar"}">${fold?"▸":"▾"}</button>`:`<span class="ly-fold"></span>`}
      <span class="ly-ic k-${x.k}" aria-hidden="true">${ICO[x.k]||"·"}</span><span class="ly-n"><b>${esc(x.name)}</b>${x.t?` <small>${esc(String(x.t).slice(0,48))}</small>`:""}</span>
      ${styled?`<span class="ly-dot" title="Tiene estilo propio"></span><button type="button" class="ly-b" data-ly="clr" title="Quitar el estilo propio">⟲</button>`:""}
      <button type="button" class="ly-b ly-eye${o.hide?" off":""}" data-ly="hide" title="${hideT}" aria-label="${hideT}">${o.hide==="mob"?"📱":o.hide==="desk"?"🖥":o.hide==="all"?"◌":"👁"}</button></div>`
      +(x.kids.length&&!fold?rows(x.kids,s,d+1):"");}).join("");}
function doc(){const f=document.getElementById("pv");try{return f&&f.contentDocument;}catch(e){return null;}}
function render(){const box=document.getElementById("nc6Layers");if(!box||LY.view!=="layers")return;const s=state.sections.find(x=>x.id===state.selected);
  if(!s){box.innerHTML=`<div class="empty">Selecciona una sección (en el lienzo o en Secciones) para ver sus capas.</div>`;return;}
  const d=doc();const sec=d&&d.querySelector(`[data-sec="${s.id}"]`);if(!sec){box.innerHTML=`<div class="empty">Cargando capas…</div>`;return;}
  const budget={n:160};const T=build(sec,sec,d.defaultView,0,budget);
  if(NC_EP.sel&&NC_EP.sel.id===s.id)LY.sel=NC_EP.sel.path;else LY.sel=null;
  box.innerHTML=`<div class="ly-head"><b>${esc(LIB[s.type]?LIB[s.type].label:"Sección")}</b><small>${budget.n<=0?"Primeras 160 capas":""}</small></div>`+(T.length?`<div role="tree" aria-label="Capas de la sección">${rows(T,s,0)}</div>`:`<div class="empty">Esta sección no tiene capas editables.</div>`)
    +`<div class="help ly-help">Clic: seleccionar en el lienzo · ojo: ocultar en móvil, escritorio o siempre · el punto marca estilo propio.</div>`;
  const on=box.querySelector(".ly-row.on");if(on&&!box.dataset.keep)on.scrollIntoView({block:"nearest"});}
function post(m){const f=document.getElementById("pv");try{f.contentWindow.postMessage(m,"*");}catch(e){}}
function bind(){const box=document.getElementById("nc6Layers");
  box.addEventListener("click",e=>{const r=e.target.closest(".ly-row");if(!r)return;const s=state.sections.find(x=>x.id===state.selected);if(!s)return;const p=r.dataset.p;const a=e.target.closest("[data-ly]");
    if(a&&a.dataset.ly==="fold"){const k=s.id+"|"+p;LY.fold[k]=!LY.fold[k];box.dataset.keep=1;render();delete box.dataset.keep;return;}
    if(a&&a.dataset.ly==="hide"){commit();s.els=s.els||{};const o=s.els[p]=s.els[p]||{};const seq=["","mob","desk","all"];o.hide=seq[(seq.indexOf(o.hide||"")+1)%4];if(!o.hide)delete o.hide;if(!Object.keys(o).length)delete s.els[p];
      if(window.ncEpLive)ncEpLive();box.dataset.keep=1;render();delete box.dataset.keep;return;}
    if(a&&a.dataset.ly==="clr"){commit();const o=(s.els||{})[p];if(o){const h=o.hide;s.els[p]=h?{hide:h}:undefined;if(!h)delete s.els[p];}if(window.ncEpLive)ncEpLive();box.dataset.keep=1;render();delete box.dataset.keep;if(state.tab==="style")renderRight();return;}
    LY.sel=p;box.querySelectorAll(".ly-row.on").forEach(x=>x.classList.remove("on"));r.classList.add("on");post({nc:"elpick",id:s.id,path:p});});
  box.addEventListener("dblclick",e=>{const r=e.target.closest(".ly-row");if(r&&!e.target.closest("[data-ly]")){setTab("style");renderRight();const g=document.getElementById("epGroup");if(g)g.scrollIntoView({block:"start"});}});
  box.addEventListener("mouseover",e=>{const r=e.target.closest(".ly-row");if(r&&r!==LY.hv){LY.hv=r;post({nc:"elhv",id:state.selected,path:r.dataset.p});}});
  box.addEventListener("mouseleave",()=>{LY.hv=null;post({nc:"elhv",id:state.selected,path:""});});
  box.addEventListener("keydown",e=>{const R=[...box.querySelectorAll(".ly-row")];const i=R.indexOf(document.activeElement);if(i<0)return;
    if(e.key==="ArrowDown"||e.key==="ArrowUp"){e.preventDefault();const n=R[i+(e.key==="ArrowDown"?1:-1)];if(n)n.focus();}
    else if(e.key==="Enter"||e.key===" "){e.preventDefault();R[i].click();}});}
function setView(v){LY.view=v;try{localStorage.setItem("nc_ly_view",v);}catch(e){}
  const o=document.getElementById("outline"),l=document.getElementById("nc6Layers");if(o)o.style.display=v==="sec"?"":"none";if(l)l.style.display=v==="layers"?"":"none";
  document.querySelectorAll("#nc6LySeg [data-v]").forEach(b=>{b.classList.toggle("on",b.dataset.v===v);b.setAttribute("aria-selected",b.dataset.v===v);});render();}
function mount(){const o=document.getElementById("outline");if(!o||document.getElementById("nc6Layers"))return;
  const t=o.parentElement.querySelector(".paneltitle");
  if(t)t.insertAdjacentHTML("beforeend",`<span class="seg ly-seg" id="nc6LySeg" role="tablist"><button type="button" data-v="sec" role="tab">Secciones</button><button type="button" data-v="layers" role="tab">Capas</button></span>`);
  o.insertAdjacentHTML("afterend",`<div id="nc6Layers" class="ly-box" style="display:none"></div>`);
  document.querySelectorAll("#nc6LySeg [data-v]").forEach(b=>b.addEventListener("click",()=>setView(b.dataset.v)));
  bind();setView(LY.view);
  /* refresco: al pintar la vista previa, al cambiar de sección y al repintar una sección */
  const f=document.getElementById("pv");if(f)f.addEventListener("load",()=>setTimeout(render,60));
  const _rr=renderRight;renderRight=function(){const r=_rr.apply(this,arguments);if(LY.view==="layers")setTimeout(render,30);return r;};
  if(typeof patchSection==="function"){const _ps=patchSection;patchSection=function(){const r=_ps.apply(this,arguments);if(LY.view==="layers")setTimeout(render,60);return r;};}
  window.addEventListener("message",e=>{const d=e.data;if(!d||d.nc!=="elsel"||LY.view!=="layers")return;
    /* selección hecha en el lienzo → se despliegan sus padres y se marca */
    const s=state.sections.find(x=>x.id===d.id);if(s){const P=String(d.path).split(">");for(let i=1;i<P.length;i++)delete LY.fold[s.id+"|"+P.slice(0,i).join(">")];}
    LY.sel=d.path;setTimeout(render,0);});
  /* atajo: L alterna Secciones / Capas */
  document.addEventListener("keydown",e=>{if((e.key==="l"||e.key==="L")&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&!e.target.closest("input,textarea,select,[contenteditable]"))setView(LY.view==="layers"?"sec":"layers");});}
window.ncLayersRender=render;
document.addEventListener("DOMContentLoaded",mount);
})();

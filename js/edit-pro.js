/* NC Landing Builder · v5.5 · EDICIÓN AVANZADA (guiada, siempre responsive)
   · Estilo por elemento: con la sección seleccionada, un clic en cualquier texto, botón, imagen o caja la selecciona.
     Los controles interactivos (flechas, opciones, campos, carrusel) no se secuestran: Alt + clic para seleccionarlos.
     Barra flotante (tamaño, negrita, color, alineación, ocultar) y, en Estilo → «Elemento seleccionado», todos los
     ajustes: tamaño de letra en escritorio y en móvil, peso, color, fondo, alineación, márgenes, ancho y visibilidad.
     Se guarda por sección (s.els) con la ruta del elemento y sale como CSS `[data-sec="…"] …` (vista previa y export).
   · Añadir elementos a cualquier bloque: título, texto, botón (formulario, llamada, WhatsApp o enlace), imagen, lista,
     icono con texto, separador o HTML; al principio o al final del bloque, con alineación (s.extras).
   · Diseño y espaciado por sección: márgenes superior/inferior (escritorio y móvil), ancho máximo, columnas en
     escritorio y en móvil, separación entre columnas, invertir el orden en móvil, alineación y visibilidad (s.layout).
   Nada usa posiciones absolutas: todo fluye y se adapta a móvil. Doble clic sigue editando el texto en el lienzo. */
(function(){
const EP={sel:null};window.NC_EP=EP;
const XC=":not(.nc-phc):not(.nc-tb):not(.nc-tbx)";
/* ---------- CSS a partir de los datos ---------- */
function pathSel(id,path){return `[data-sec="${id}"]`+String(path).split(">").map(p=>{const m=p.match(/^([a-z0-9-]+):(\d+)$/i);return m?`>${m[1]}:nth-child(${m[2]} of ${XC})`:"";}).join("");}
const px=v=>{const n=parseFloat(v);return isNaN(n)?null:n;};
const col=v=>/^(#[0-9a-f]{3,8}|rgba?\([\d\s.,%]+\)|transparent)$/i.test(String(v||"").trim())?String(v).trim():null;
function elDecl(o,mob){const d=[];const fs=px(mob?o.fsM:o.fs);if(fs!=null)d.push(`font-size:${fs}px`);
  if(!mob){if(o.fw)d.push(`font-weight:${+o.fw||400}`);if(col(o.color))d.push(`color:${col(o.color)}`);if(col(o.bg))d.push(`background:${col(o.bg)}`);if(o.ta)d.push(`text-align:${o.ta}`);if(o.it)d.push("font-style:italic");if(o.up)d.push("text-transform:uppercase");
    if(px(o.lh)!=null)d.push(`line-height:${px(o.lh)}`);if(px(o.r)!=null)d.push(`border-radius:${px(o.r)}px`);if(px(o.pad)!=null)d.push(`padding:${px(o.pad)}px`);if(o.w){if(o.w==="full"){d.push("width:100%");d.push("display:block");}else{d.push(`max-width:${px(o.w)}px`);d.push("width:100%");}}if(o.ta==="center"&&o.w)d.push("margin-left:auto;margin-right:auto");}
  const mt=px(mob?o.mtM:o.mt),mb=px(mob?o.mbM:o.mb);if(mt!=null)d.push(`margin-top:${mt}px`);if(mb!=null)d.push(`margin-bottom:${mb}px`);if(mob&&o.taM)d.push(`text-align:${o.taM}`);
  return d.map(x=>x+"!important").join(";");}
function sectionCSS(s,exp){const id=s.id;let c="",m="",dsk="";const L=s.layout||{},R=`html body [data-sec="${id}"][data-sec]`;
  const root=`${R}>${XC}:not(.nc-s),${R}>.nc-s>*`;
  if(px(L.pt)!=null)c+=`${root}{padding-top:${px(L.pt)}px!important}`;if(px(L.pb)!=null)c+=`${root}{padding-bottom:${px(L.pb)}px!important}`;
  if(px(L.ptM)!=null)m+=`${root}{padding-top:${px(L.ptM)}px!important}`;if(px(L.pbM)!=null)m+=`${root}{padding-bottom:${px(L.pbM)}px!important}`;
  if(L.maxw)c+=`${R} .container{max-width:${L.maxw==="full"?"100%":px(L.maxw)+"px"}!important}`;
  const cw=n=>`{flex:0 0 ${100/n}%!important;max-width:${100/n}%!important;width:${100/n}%!important}`;
  if(+L.cols)dsk+=`${R} .row>[class*="col"]${cw(+L.cols)}`;if(+L.colsM)m+=`${R} .row>[class*="col"]${cw(+L.colsM)}`;
  if(px(L.gap)!=null)c+=`${R} .row{--bs-gutter-x:${px(L.gap)}px!important;--bs-gutter-y:${px(L.gap)}px!important}`;
  if(L.rev)m+=`${R} .row{flex-direction:column-reverse!important}${R} .row>[class*="col"]{display:block!important}`;
  if(L.ta)c+=`${R} :is(h1,h2,h3,h4,p,.da-sub,.da-muted,.da-eyebrow){text-align:${L.ta}!important}${L.ta==="center"?`${R} .da-btns{justify-content:center!important}`:""}`;
  if(L.vis==="mob")dsk+=`${R}{display:${exp?"none":"block;opacity:.35"}!important}`;if(L.vis==="desk")m+=`${R}{display:${exp?"none":"block;opacity:.35"}!important}`;
  Object.keys(s.els||{}).forEach(p=>{const o=s.els[p];if(!o)return;const sel="html body "+pathSel(id,p);const d=elDecl(o,false),dm=elDecl(o,true);if(d)c+=`${sel}{${d}}`;if(dm)m+=`${sel}{${dm}}`;
    const hid=exp?"display:none!important":"opacity:.3!important;outline:1px dashed #e11d48!important";if(o.hide==="all")c+=`${sel}{${hid}}`;if(o.hide==="mob")m+=`${sel}{${hid}}`;if(o.hide==="desk")dsk+=`${sel}{${hid}}`;});
  return c+(dsk?`@media (min-width:768px){${dsk}}`:"")+(m?`@media (max-width:767px){${m}}`:"");}
function allCSS(exp){return state.sections.filter(s=>!(exp&&s.hidden)).map(s=>sectionCSS(s,exp)).join("")+(state.sections.some(s=>s.extras&&s.extras.length)?EXCSS:"");}
/* ---------- elementos añadidos ---------- */
const EXK=[["title","Título"],["text","Texto"],["button","Botón"],["image","Imagen"],["list","Lista con checks"],["icon","Icono + texto"],["spacer","Separador"],["html","HTML"]];
const EXDEF={title:{text:"Nuevo título"},text:{text:"Escribe aquí tu texto."},button:{text:"Quiero información",act:"form",url:"",style:"pri"},image:{src:"",alt:"",w:"100",r:"12"},list:{items:"{{VENTAJA_1}}\n{{VENTAJA_2}}\n{{VENTAJA_3}}"},icon:{icon:"shield-check",text:"{{DATO_DE_CONFIANZA}}"},spacer:{h:"24",line:""},html:{html:"<p>HTML propio</p>"}};
const EXCSS=`.ncx{display:flex;flex-direction:column;gap:14px;margin:22px 0;position:relative;z-index:1}.ncx.al-center{align-items:center;text-align:center}.ncx.al-left{align-items:flex-start;text-align:left}.ncx.al-right{align-items:flex-end;text-align:right}
.ncx>*{margin:0;max-width:100%}.ncx .ncx-p{color:var(--bmuted);font-size:17px;line-height:1.6;max-width:68ch}.ncx .ncx-img{display:block;height:auto}.ncx .ncx-ic{display:flex;gap:10px;align-items:center;font-weight:600;color:var(--bink)}.ncx .ncx-ic .nci{color:var(--bpt,var(--bp));font-size:1.4em}
.ncx .ncx-sp{width:100%}.ncx .ncx-sp.ln{border-top:1px solid var(--dline,#e5e7eb)}.ncx .da-checks{margin:0}.ncx .ncx-h{margin:0}`;
function exHTML(x,prev){const p=x.p||{};switch(x.k){
  case "title":return `<h2 class="da-h2 ncx-h">${esc(p.text)}</h2>`;case "text":return `<p class="ncx-p">${esc(p.text).replace(/\n/g,"<br>")}</p>`;
  case "button":{const cls=`da-btn ${p.style==="sec"?"sec":"pri"}`;return p.act==="call"?`${v4Tel()} class="${cls}">${I_TEL()} ${esc(p.text)}</a>`:p.act==="wa"?`${v4Wa()} class="${cls} wa">${I_WA()} ${esc(p.text)}</a>`:p.act==="url"?`<a href="${esc(p.url||"#")}" class="${cls}">${esc(p.text)}</a>`:`<a href="#form" data-cta="form" class="${cls}">${esc(p.text)} ${I_GO()}</a>`;}
  case "image":return p.src?`<img src="${esc(p.src)}" alt="${esc(p.alt||"")}" class="ncx-img" loading="lazy" style="width:${Math.min(100,Math.max(10,+p.w||100))}%;border-radius:${px(p.r)||0}px">`:(prev?`<div class="ncx-p" style="border:1px dashed currentColor;padding:24px;opacity:.6">Imagen: súbela en el panel</div>`:"");
  case "list":return v4Checks(p.items,"da-checks");case "icon":return `<div class="ncx-ic">${ncIconOrText(p.icon||"check")}<span>${esc(p.text)}</span></div>`;
  case "spacer":return `<div class="ncx-sp${p.line?" ln":""}" style="height:${Math.max(0,px(p.h)||0)}px" role="presentation"></div>`;
  case "html":{let h=String(p.html||"");if(prev)h=h.replace(/<script[\s\S]*?<\/script>/gi,"").replace(/\son\w+=("[^"]*"|'[^']*'|[^\s>]+)/gi,"");return h;}}return "";}
function injectExtras(html,s,prev){const X=(s.extras||[]);if(!X.length)return html;const grp=pos=>{const L=X.filter(x=>(x.pos||"end")===pos);if(!L.length)return "";const al=L[0].al||"inherit";return `<div class="ncx al-${al}" data-ncx="${pos}">${L.map(x=>exHTML(x,prev)).join("")}</div>`;};
  const t=document.createElement("template");t.innerHTML=html;let root=[...t.content.children].find(e=>!e.matches(".nc-tb"));if(!root)return html+grp("start")+grp("end");
  let host=root.querySelector(".container")||root;const st=grp("start"),en=grp("end");if(st)host.insertAdjacentHTML("afterbegin",st);if(en)host.insertAdjacentHTML("beforeend",en);return t.innerHTML;}
let PREV=false;
const _rs=renderSection;renderSection=function(s){const h=_rs.apply(this,arguments);return s&&s.extras&&s.extras.length?injectExtras(h,s,PREV):h;};
/* CSS en el documento (vista previa y export) + script de selección en la vista previa */
const PICK_JS=`(function(){if(window.__free)return;var hv=null,cur=null;function ex(n){return n.classList&&(n.classList.contains('nc-phc')||n.classList.contains('nc-tb')||n.classList.contains('nc-tbx'));}
function path(el,sec){var P=[];for(var n=el;n&&n!==sec;n=n.parentElement){var k=0,c=n.parentElement?n.parentElement.firstElementChild:null;for(;c;c=c.nextElementSibling){if(ex(c))continue;k++;if(c===n)break;}P.unshift(n.tagName.toLowerCase()+':'+k);}return P.join('>');}
function lbl(el){var t=(el.textContent||'').replace(/\\s+/g,' ').trim();return el.tagName.toLowerCase()+(t?' «'+t.slice(0,40)+(t.length>40?'…':'')+'»':el.tagName==='IMG'?' (imagen)':'');}
function ok(el){return el&&el.nodeType===1&&!el.closest('.nc-tb,.nc-tbx,[data-act]')&&!/^(SVG|PATH|USE|G|CIRCLE|RECT|LINE|POLYLINE|POLYGON)$/i.test(el.tagName);}
var IA='input,select,textarea,label,summary,option,button[type=button],[role=tab],[data-copy],.dots,.ar,.vp,[data-dragged]';
function up(el){while(el&&/^(svg|path|use|g|circle|rect|line|polyline|polygon|i)$/i.test(el.tagName))el=el.parentElement;return el;}
document.addEventListener('mouseover',function(e){var sec=e.target.closest&&e.target.closest('[data-sec].sel');var el=up(e.target);if(hv&&hv!==el)hv.classList.remove('nc-elhv');hv=null;if(!sec||!ok(el)||el===sec||(!e.altKey&&e.target.closest(IA)))return;hv=el;el.classList.add('nc-elhv');},true);
document.addEventListener('click',function(e){if(e.target.closest('[contenteditable="true"],[data-act]'))return;if(!e.altKey&&e.target.closest(IA))return;var sec=e.target.closest('[data-sec]');if(!sec||!sec.classList.contains('sel'))return;var el=up(e.target);if(!ok(el)||el===sec)return;
  e.preventDefault();e.stopPropagation();pick(el,sec);},true);
function pick(el,sec){if(cur)cur.classList.remove('nc-elsel');cur=el;el.classList.add('nc-elsel');var r=el.getBoundingClientRect();
  parent.postMessage({nc:'elsel',id:sec.getAttribute('data-sec'),path:path(el,sec),label:lbl(el),tag:el.tagName,img:el.tagName==='IMG',r:{x:r.left,y:r.top,w:r.width,h:r.height},fs:parseFloat(getComputedStyle(el).fontSize)||16,col:getComputedStyle(el).color,up:!!(el.parentElement&&el.parentElement!==sec&&!el.parentElement.matches('[data-sec]'))},'*');}
window.addEventListener('message',function(e){var d=e.data;if(!d||d.nc!=='elup'||!cur)return;var sec=cur.closest('[data-sec]'),p=cur.parentElement;if(sec&&p&&p!==sec)pick(p,sec);});
window.addEventListener('message',function(e){var d=e.data;if(!d||d.nc!=='elre')return;var sec=document.querySelector('[data-sec="'+d.id+'"]');if(!sec)return;var n=sec;String(d.path).split('>').forEach(function(p){if(!n)return;var m=p.split(':'),k=+m[1],c=n.firstElementChild,i=0;for(;c;c=c.nextElementSibling){if(ex(c))continue;i++;if(i===k)break;}n=c;});
  if(cur)cur.classList.remove('nc-elsel');if(n){cur=n;n.classList.add('nc-elsel');var r=n.getBoundingClientRect();parent.postMessage({nc:'elpos',r:{x:r.left,y:r.top,w:r.width,h:r.height}},'*');}});
window.addEventListener('scroll',function(){if(cur){var r=cur.getBoundingClientRect();parent.postMessage({nc:'elpos',r:{x:r.left,y:r.top,w:r.width,h:r.height}},'*');}},{passive:true});
})();`;
const PICK_CSS=`[data-sec].sel .nc-elhv{outline:1px solid rgba(110,90,255,.55)!important;outline-offset:1px}[data-sec].sel .nc-elsel{outline:2px solid #6E5AFF!important;outline-offset:2px}`;
const _bd=buildDoc;buildDoc=function(forExport){PREV=!forExport;let h;try{h=_bd.apply(this,arguments);}finally{PREV=false;}const css=allCSS(!!forExport);
  if(css)h=h.replace("</head>",`<style id="nc-els">${css}</style></head>`);
  if(!forExport&&!state.freeMode)h=h.replace("</head>",`<style>${PICK_CSS}</style></head>`).replace(/<\/body>(?![\s\S]*<\/body>)/,`<script>${PICK_JS}<\/script></body>`);return h;};
function live(){const f=document.getElementById("pv");const d=f&&f.contentDocument;if(!d){renderPreview();return;}let st=d.getElementById("nc-els");if(!st){st=d.createElement("style");st.id="nc-els";d.head.appendChild(st);}st.textContent=allCSS(false);posBar();if(typeof ncDirty==="function")try{ncDirty();}catch(e){}}

/* ---------- barra flotante ---------- */
let bar=null;
function posBar(r){const s=EP.sel&&state.sections.find(x=>x.id===EP.sel.id);if(!bar||!s){if(bar)bar.style.display="none";return;}if(r)EP.sel.r=r;r=EP.sel.r;const f=document.getElementById("pv").getBoundingClientRect();
  let top=f.top+r.y-44;if(top<f.top+4)top=f.top+r.y+r.h+8;const left=Math.max(f.left+4,Math.min(f.left+r.x,f.right-bar.offsetWidth-4));bar.style.top=top+"px";bar.style.left=left+"px";bar.style.display=(r.y+r.h<0||r.y>f.height)?"none":"flex";}
function el(){const s=state.sections.find(x=>x.id===(EP.sel&&EP.sel.id));if(!s)return null;s.els=s.els||{};return s.els[EP.sel.path]=s.els[EP.sel.path]||{};}
function clean(){const s=state.sections.find(x=>x.id===(EP.sel&&EP.sel.id));if(!s||!s.els)return;Object.keys(s.els).forEach(k=>{const o=s.els[k];Object.keys(o).forEach(j=>{if(o[j]===""||o[j]==null||o[j]===false)delete o[j];});if(!Object.keys(o).length)delete s.els[k];});}
function drawBar(){if(!bar){bar=document.createElement("div");bar.className="ep-bar";document.body.appendChild(bar);}const o=el()||{};const fs=+o.fs||Math.round(EP.sel.fs||16);
  bar.innerHTML=`<span class="ep-lb" title="${esc(EP.sel.label)}">${esc(EP.sel.label.slice(0,28))}</span>${EP.sel.up?`<button data-ep="up" title="Seleccionar el elemento que lo contiene">⤒</button>`:""}${EP.sel.img?"":`<button data-ep="fs-" title="Más pequeño">A−</button><b class="ep-n">${fs}</b><button data-ep="fs+" title="Más grande">A+</button><button data-ep="fw" title="Negrita" class="${+o.fw>=700?"on":""}"><b>B</b></button><label class="ep-col" title="Color del texto"><input type="color" value="${col(o.color)&&/^#[0-9a-f]{6}$/i.test(o.color)?o.color:"#222222"}" data-ep="col"><span style="background:${col(o.color)||"transparent"}"></span></label>`}
   <button data-ep="ta-left" class="${o.ta==="left"?"on":""}" title="Alinear a la izquierda">⇤</button><button data-ep="ta-center" class="${o.ta==="center"?"on":""}" title="Centrar">↔</button><button data-ep="ta-right" class="${o.ta==="right"?"on":""}" title="Alinear a la derecha">⇥</button>
   <button data-ep="hide" title="Ocultar: no → en móvil → en escritorio → siempre" class="${o.hide?"on":""}">${o.hide==="mob"?"📱✕":o.hide==="desk"?"🖥✕":o.hide==="all"?"✕":"👁"}</button><button data-ep="clr" title="Quitar los estilos de este elemento">⟲</button><button data-ep="more" title="Todos los ajustes">⚙</button><button data-ep="x" title="Cerrar">✕</button>`;
  bar.onclick=e=>{const b=e.target.closest("[data-ep]");if(!b||b.dataset.ep==="col")return;const a=b.dataset.ep;const o2=el();if(!o2)return;
    if(a==="x"){desel();return;}if(a==="up"){try{document.getElementById("pv").contentWindow.postMessage({nc:"elup"},"*");}catch(_){}return;}if(a==="more"){setTab("style");renderRight();const g=document.getElementById("epGroup");if(g)g.scrollIntoView({block:"start"});return;}
    commit();if(a==="fs-"||a==="fs+"){const cur=+o2.fs||Math.round(EP.sel.fs||16);o2.fs=Math.max(8,Math.min(160,cur+(a==="fs+"?2:-2)));}
    else if(a==="fw")o2.fw=+o2.fw>=700?"400":"800";else if(/^ta-/.test(a)){const v=a.slice(3);o2.ta=o2.ta===v?"":v;}
    else if(a==="hide"){const seq=["","mob","desk","all"];o2.hide=seq[(seq.indexOf(o2.hide||"")+1)%4];if(o2.hide)toast({mob:"Oculto en móvil",desk:"Oculto en escritorio",all:"Oculto siempre (en la vista previa se ve tenue)"}[o2.hide]);}
    else if(a==="clr"){const s=state.sections.find(x=>x.id===EP.sel.id);if(s&&s.els)delete s.els[EP.sel.path];}
    clean();live();drawBar();if(state.tab==="style")renderRight();};
  const ci=bar.querySelector('[data-ep="col"]');if(ci){ci.addEventListener("input",()=>{commitDebounced();el().color=ci.value;live();});}
  posBar();}
function desel(){EP.sel=null;if(bar)bar.style.display="none";try{const d=document.getElementById("pv").contentDocument;d.querySelectorAll(".nc-elsel").forEach(x=>x.classList.remove("nc-elsel"));}catch(e){}if(state.tab==="style")renderRight();}
window.addEventListener("message",e=>{const d=e.data;if(!d)return;
  if(d.nc==="elsel"){if(state.selected!==d.id){state.selected=d.id;}EP.sel={id:d.id,path:d.path,label:d.label,tag:d.tag,img:d.img,r:d.r,fs:d.fs,up:d.up};drawBar();if(state.tab==="style")renderRight();}
  else if(d.nc==="elpos"&&EP.sel)posBar(d.r);
  else if(d.nc==="sel"&&EP.sel&&d.id!==EP.sel.id)desel();});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&EP.sel&&!e.target.closest("input,textarea,select"))desel();});
window.addEventListener("resize",()=>posBar());
const _rp=renderPreview;renderPreview=function(){const r=_rp.apply(this,arguments);if(EP.sel){const f=document.getElementById("pv");const re=()=>{try{f.contentWindow.postMessage({nc:"elre",id:EP.sel.id,path:EP.sel.path},"*");}catch(_){}};f.addEventListener("load",re,{once:true});}return r;};
const _ps=patchSection;patchSection=function(id){const r=_ps.apply(this,arguments);if(EP.sel&&EP.sel.id===id){try{document.getElementById("pv").contentWindow.postMessage({nc:"elre",id,path:EP.sel.path},"*");}catch(_){}}return r;};

/* ---------- panel derecho ---------- */
const N=(k,l,o,ph)=>`<div class="fld"><label>${l}</label><input type="number" data-ep2="${k}" value="${esc(o[k]==null?"":o[k])}" placeholder="${ph||"auto"}"></div>`;
const S=(k,l,o,opts)=>`<div class="fld"><label>${l}</label><select data-ep2="${k}">${opts.map(([v,t])=>`<option value="${v}" ${String(o[k]||"")===v?"selected":""}>${t}</option>`).join("")}</select></div>`;
const C=(k,l,o)=>`<div class="fld inline"><label>${l}</label><span class="ep-cc"><input type="color" data-ep2="${k}" value="${/^#[0-9a-f]{6}$/i.test(o[k]||"")?o[k]:"#000000"}">${o[k]?`<button type="button" class="mini" data-ep2x="${k}" title="Quitar">✕</button>`:'<small>sin cambiar</small>'}</span></div>`;
function bindObj(box,obj,after){box.querySelectorAll("[data-ep2]").forEach(i=>{const ev=i.tagName==="SELECT"?"change":"input";i.addEventListener(ev,()=>{commitDebounced();const k=i.dataset.ep2;obj[k]=i.type==="checkbox"?i.checked:i.value;after(i.tagName==="SELECT");});});
  box.querySelectorAll("[data-ep2x]").forEach(b=>b.addEventListener("click",()=>{commit();delete obj[b.dataset.ep2x];after(true);}));}
const _rr=renderRight;renderRight=function(){_rr.apply(this,arguments);const s=state.sections.find(x=>x.id===state.selected);if(!s)return;
  /* Estilo: elemento + diseño */
  const sf=document.getElementById("styleFields");if(sf&&!sf.querySelector("#epLayout")){let h="";
    if(EP.sel&&EP.sel.id===s.id){const o=(s.els||{})[EP.sel.path]||{};
      h+=`<div id="epGroup" class="ep-g"><div class="paneltitle" style="padding:0 0 4px">Elemento seleccionado</div><div class="help" style="margin:0 0 8px">${esc(EP.sel.label)}</div>
       <div class="row2">${N("fs","Tamaño de letra (px)",o)}${N("fsM","Tamaño en móvil (px)",o)}</div>
       <div class="row2">${S("fw","Grosor",o,[["","Del estilo"],["400","Normal"],["500","Medio"],["600","Seminegrita"],["700","Negrita"],["800","Extra"],["900","Black"]])}${S("ta","Alineación",o,[["","Del estilo"],["left","Izquierda"],["center","Centro"],["right","Derecha"]])}</div>
       ${C("color","Color del texto",o)}${C("bg","Color de fondo",o)}
       <div class="row2">${N("mt","Margen arriba (px)",o)}${N("mb","Margen abajo (px)",o)}</div><div class="row2">${N("mtM","Arriba en móvil",o)}${N("mbM","Abajo en móvil",o)}</div>
       <div class="row2">${N("pad","Relleno interior (px)",o)}${N("r","Esquinas (px)",o)}</div><div class="row2">${S("w","Ancho",o,[["","Del estilo"],["full","Todo el ancho"],["320","Máx. 320 px"],["480","Máx. 480 px"],["640","Máx. 640 px"],["800","Máx. 800 px"]])}${S("taM","Alineación en móvil",o,[["","Como escritorio"],["left","Izquierda"],["center","Centro"],["right","Derecha"]])}</div>
       <div class="row2">${S("hide","Mostrar",o,[["","Siempre"],["mob","Ocultar en móvil"],["desk","Ocultar en escritorio"],["all","Ocultar siempre"]])}<div class="fld"><label>Texto</label><span class="ep-chk"><label><input type="checkbox" data-ep2="it" ${o.it?"checked":""}> Cursiva</label><label><input type="checkbox" data-ep2="up" ${o.up?"checked":""}> MAYÚSCULAS</label></span></div></div>
       <div class="ep-act"><button type="button" class="btn sm ghost" id="epClr">⟲ Quitar estilos</button><button type="button" class="btn sm ghost" id="epDes">Deseleccionar</button></div></div>`;}
    else h+=`<div class="ep-g ep-hint"><b>Estilo por elemento:</b> con la sección seleccionada, haz clic en cualquier texto, botón o imagen del lienzo para ajustarlo solo a él. Los controles (flechas, opciones, campos) siguen funcionando: para seleccionarlos usa <b>Alt + clic</b>.</div>`;
    const L=s.layout||{};const nEl=Object.keys(s.els||{}).length;
    h+=`<div id="epLayout" class="ep-g"><div class="paneltitle" style="padding:0 0 6px">Diseño y espaciado de la sección</div>
      <div class="row2">${N("pt","Margen arriba (px)",L)}${N("pb","Margen abajo (px)",L)}</div><div class="row2">${N("ptM","Arriba en móvil",L)}${N("pbM","Abajo en móvil",L)}</div>
      <div class="row2">${S("maxw","Ancho del contenido",L,[["","Del estilo"],["720","Estrecho (720)"],["960","Medio (960)"],["1140","Normal (1140)"],["1320","Ancho (1320)"],["full","Todo el ancho"]])}${S("ta","Alineación",L,[["","Del estilo"],["left","Izquierda"],["center","Centro"]])}</div>
      <div class="row2">${S("cols","Columnas en escritorio",L,[["","Del bloque"],["1","1"],["2","2"],["3","3"],["4","4"]])}${S("colsM","Columnas en móvil",L,[["","Del bloque"],["1","1"],["2","2"]])}</div>
      <div class="row2">${S("gap","Separación entre columnas",L,[["","Del bloque"],["0","Sin separación"],["8","8 px"],["16","16 px"],["24","24 px"],["32","32 px"],["48","48 px"]])}${S("vis","Mostrar la sección",L,[["","En todos"],["desk","Solo escritorio"],["mob","Solo móvil"]])}</div>
      <div class="fld inline"><label>Invertir el orden de las columnas en móvil</label><input type="checkbox" data-ep2="rev" ${L.rev?"checked":""}></div>
      <div class="help">Las columnas se aplican a los bloques en rejilla (tarifas, ventajas, opiniones, heros a dos columnas…).${nEl?` Esta sección tiene ${nEl} elemento(s) con estilo propio. <button type="button" class="mini" id="epClrAll">Quitar todos</button>`:""}</div></div>`;
    sf.insertAdjacentHTML("afterbegin",h);
    const g=document.getElementById("epGroup");if(g){bindObj(g,el(),re=>{clean();live();if(re)renderRight();});document.getElementById("epClr").addEventListener("click",()=>{commit();if(s.els)delete s.els[EP.sel.path];live();renderRight();});document.getElementById("epDes").addEventListener("click",desel);}
    const lg=document.getElementById("epLayout");s.layout=s.layout||{};bindObj(lg,s.layout,re=>{Object.keys(s.layout).forEach(k=>{if(s.layout[k]===""||s.layout[k]===false)delete s.layout[k];});live();if(re)renderRight();});
    const ca=document.getElementById("epClrAll");if(ca)ca.addEventListener("click",()=>{commit();s.els={};desel();live();renderRight();});}
  /* Contenido: elementos añadidos */
  const cf=document.getElementById("contentFields");if(cf&&!cf.querySelector("#epExtras")&&!s.freeHtml){const X=s.extras||[];
    cf.insertAdjacentHTML("beforeend",`<div id="epExtras" class="ep-g"><div class="paneltitle" style="padding:0 0 6px">Elementos añadidos</div>
      ${X.map((x,i)=>exPanel(x,i,X.length)).join("")}
      <div class="ep-add"><select id="epAddK">${EXK.map(([k,l])=>`<option value="${k}">${l}</option>`).join("")}</select><select id="epAddP"><option value="end">al final del bloque</option><option value="start">al principio</option></select><button type="button" class="btn sm" id="epAdd">＋ Añadir</button></div></div>`);
    document.getElementById("epAdd").addEventListener("click",()=>{commit();s.extras=s.extras||[];const k=document.getElementById("epAddK").value,pos=document.getElementById("epAddP").value;const same=s.extras.find(x=>(x.pos||"end")===pos);
      s.extras.push({id:Math.random().toString(36).slice(2,8),k,pos,al:same?same.al:"inherit",p:JSON.parse(JSON.stringify(EXDEF[k]))});renderPreview();renderRight();});
    cf.querySelectorAll("[data-exi]").forEach(box=>{const i=+box.dataset.exi;const x=s.extras[i];
      box.querySelectorAll("[data-exf]").forEach(inp=>{const ev=inp.tagName==="SELECT"?"change":"input";inp.addEventListener(ev,()=>{commitDebounced();const k=inp.dataset.exf;if(k==="pos"||k==="al"){x[k]=inp.value;if(k==="al")s.extras.filter(y=>(y.pos||"end")===(x.pos||"end")).forEach(y=>y.al=inp.value);}else x.p[k]=inp.type==="checkbox"?(inp.checked?"1":""):inp.value;patchSection(s.id);if(inp.tagName==="SELECT")renderRight();});});
      box.querySelectorAll("[data-exa]").forEach(b=>b.addEventListener("click",()=>{const a=b.dataset.exa;
        if(a==="img"){const fi=document.createElement("input");fi.type="file";fi.accept="image/*";fi.onchange=ev=>readImg(ev.target.files[0],url=>{commit();x.p.src=url;renderPreview();renderRight();});fi.click();return;}
        if(a==="lib"&&window.NC_MEDIA){NC_MEDIA.open({accept:"image",cb:url=>{commit();x.p.src=url;renderPreview();renderRight();}});return;}
        commit();if(a==="del")s.extras.splice(i,1);if(a==="up"&&i>0)[s.extras[i-1],s.extras[i]]=[s.extras[i],s.extras[i-1]];if(a==="down"&&i<s.extras.length-1)[s.extras[i+1],s.extras[i]]=[s.extras[i],s.extras[i+1]];renderPreview();renderRight();}));});}};
function exPanel(x,i,n){const p=x.p||{};const T=(k,l,ta)=>ta?`<div class="fld"><label>${l}</label><textarea data-exf="${k}">${esc(p[k]||"")}</textarea></div>`:`<div class="fld"><label>${l}</label><input data-exf="${k}" value="${esc(p[k]||"")}"></div>`;
  const Sx=(k,l,opts,cur)=>`<div class="fld"><label>${l}</label><select data-exf="${k}">${opts.map(([v,t])=>`<option value="${v}" ${String(cur)===v?"selected":""}>${t}</option>`).join("")}</select></div>`;
  let body="";switch(x.k){case "title":body=T("text","Texto");break;case "text":body=T("text","Texto",1);break;
    case "button":body=T("text","Texto del botón")+`<div class="row2">${Sx("act","Al pulsar",[["form","Ir al formulario"],["call","Llamar"],["wa","WhatsApp"],["url","Enlace"]],p.act)}${Sx("style","Estilo",[["pri","Principal"],["sec","Secundario"]],p.style)}</div>`+(p.act==="url"?T("url","URL"):"");break;
    case "image":body=`<div class="thumbrow">${p.src?`<img class="thumb" src="${esc(p.src)}">`:""}<button type="button" class="btn sm" data-exa="img">${p.src?"Cambiar":"Subir"}</button>${window.NC_MEDIA?`<button type="button" class="btn sm" data-exa="lib">🗂 Biblioteca</button>`:""}</div>`+T("alt","Texto alternativo")+`<div class="row2"><div class="fld"><label>Ancho (%)</label><input type="number" data-exf="w" value="${esc(p.w||"100")}"></div><div class="fld"><label>Esquinas (px)</label><input type="number" data-exf="r" value="${esc(p.r||"0")}"></div></div>`;break;
    case "list":body=T("items","Puntos (uno por línea)",1);break;case "icon":body=`<div class="row2">${T("icon","Icono (nombre o emoji)")}${T("text","Texto")}</div>`;break;
    case "spacer":body=`<div class="row2"><div class="fld"><label>Alto (px)</label><input type="number" data-exf="h" value="${esc(p.h||"24")}"></div><div class="fld inline"><label>Con línea</label><input type="checkbox" data-exf="line" ${p.line?"checked":""}></div></div>`;break;
    case "html":body=T("html","HTML (los scripts solo se ejecutan en el export)",1);break;}
  return `<div class="ep-x" data-exi="${i}"><div class="ep-xh"><b>${esc((EXK.find(k=>k[0]===x.k)||["",""])[1])}</b><span><button type="button" class="mini" data-exa="up" ${i?"":"disabled"}>↑</button><button type="button" class="mini" data-exa="down" ${i<n-1?"":"disabled"}>↓</button><button type="button" class="mini" data-exa="del" title="Quitar">✕</button></span></div>${body}
    <div class="row2">${Sx("pos","Posición",[["end","Al final del bloque"],["start","Al principio"]],x.pos||"end")}${Sx("al","Alineación del grupo",[["inherit","Del bloque"],["left","Izquierda"],["center","Centro"],["right","Derecha"]],x.al||"inherit")}</div></div>`;}
(function(){const css=document.createElement("style");css.textContent=`.ep-bar{position:fixed;z-index:180;display:none;align-items:center;gap:2px;background:var(--panel,#1b1e27);border:1px solid var(--line);border-radius:10px;padding:4px;box-shadow:0 10px 30px rgba(0,0,0,.35);font-size:12px}
 .ep-bar button{border:0;background:none;color:inherit;min-width:28px;height:28px;border-radius:7px;padding:0 6px;font-size:12px}.ep-bar button:hover{background:rgba(127,127,127,.18)}.ep-bar button.on{background:var(--acc,#7c6cff);color:#fff}
 .ep-lb{max-width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--muted,#8a93a3);padding:0 6px;border-right:1px solid var(--line);margin-right:2px}.ep-n{min-width:22px;text-align:center;font-variant-numeric:tabular-nums}
 .ep-col{position:relative;width:28px;height:28px;display:grid;place-items:center;cursor:pointer}.ep-col input{position:absolute;inset:0;opacity:0;cursor:pointer}.ep-col span{width:16px;height:16px;border-radius:50%;border:2px solid currentColor}
 .ep-g{border:1px solid var(--line);border-radius:10px;padding:10px;margin:0 0 12px}.ep-hint{font-size:12px;color:var(--muted,#8a93a3)}.ep-act{display:flex;gap:6px;justify-content:flex-end}.ep-cc{display:flex;align-items:center;gap:6px}.ep-cc small{color:var(--muted,#8a93a3)}
 .ep-chk{display:flex;gap:10px;font-size:12px;flex-wrap:wrap}.ep-chk label{display:flex;gap:4px;align-items:center;margin:0}.ep-x{border:1px dashed var(--line);border-radius:8px;padding:8px;margin-bottom:8px}.ep-xh{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}
 .ep-add{display:flex;gap:6px;flex-wrap:wrap}.ep-add select{flex:1;min-width:120px}`;document.head.appendChild(css);})();
EP.css=allCSS;EP.desel=desel;
})();

/* ---------- v4.6 · EDICIÓN EN EL LIENZO ----------
   · Doble clic en cualquier texto de un bloque nativo → se edita ahí mismo (Intro guarda, Esc cancela).
   · Suelta una imagen del ordenador sobre una imagen del bloque (o doble clic sobre ella) → se sustituye.
   · Barra de la sección con «Estilo» y «Contenido» además de mover/duplicar/ocultar/copiar/borrar.
   Cómo sabe qué campo es cada texto: al pintar la vista previa se compara el texto de cada elemento con los valores
   de los campos del bloque (líneas y columnas "a|b|c" incluidas, tarifas y demás repetidores). Nada cambia en el export. */
const NCV_SKIP_T=["select","image","photo","images","color","elements","head"];
function ncvCands(s){const lib=LIB[s.type];if(!lib||!lib.fields)return {txt:new Map(),img:new Map()};
  const P=(typeof ncVoiceProps==="function")?ncVoiceProps(s.type,s.props||{}):(s.props||{});const txt=new Map(),img=new Map();
  const norm=v=>String(v||"").replace(/\s+/g," ").trim();
  const addT=(t,p)=>{t=norm(t);if(t.length<2||/^(https?:|data:)/.test(t))return;if(!txt.has(t))txt.set(t,[]);txt.get(t).push(p);};
  const addI=(u,p)=>{if(u&&!img.has(u))img.set(u,p);};
  const doStr=(v,k,isTa)=>{const raw=String(v==null?"":v);if(isTa||raw.indexOf("\n")>-1){raw.split("\n").forEach((ln,li)=>{if(!ln.trim())return;if(ln.indexOf("|")>-1)ln.split("|").forEach((c,ci)=>addT(c,k+"|"+li+"|"+ci));else addT(ln,k+"|"+li);});}else addT(raw,k);};
  lib.fields.forEach(f=>{if(!f||!f.k||f.k[0]==="_")return;const v=P[f.k];
    if(f.t==="repeater"){arr(v).forEach((it,i)=>(f.item||[]).forEach(sf=>{const p=f.k+"["+i+"]."+sf.k;if(sf.t==="image"||sf.t==="photo")addI(it[sf.k],p);else if(!NCV_SKIP_T.includes(sf.t))doStr(it[sf.k],p,sf.t==="ta");}));return;}
    if(f.t==="image"||f.t==="photo"){addI(v,f.k);return;}
    if(f.t==="images"){arr(v).forEach((u,i)=>addI(u,f.k+"#"+i));return;}
    if(NCV_SKIP_T.includes(f.t))return;if(typeof v==="string")doStr(v,f.k,f.t==="ta");});
  return {txt,img};}
function ncvMark(html,s){if(!s||s.type==="imported"||s.freeHtml||!LIB[s.type])return html;const C=ncvCands(s);if(!C.txt.size&&!C.img.size)return html;
  let r;try{r=ncParse(html);}catch(e){return html;}const norm=v=>String(v||"").replace(/\s+/g," ").trim();const used={};
  const take=t=>{const L=C.txt.get(t);if(!L)return null;const n=used[t]||0;used[t]=n+1;return L[Math.min(n,L.length-1)];};
  r.querySelectorAll("*").forEach(el=>{if(/^(SCRIPT|STYLE|svg|path|INPUT|TEXTAREA|SELECT|OPTION|IMG|BR)$/i.test(el.tagName))return;if(el.closest("[data-ncf]"))return;
    const t=norm(el.textContent);if(!t)return;
    if(C.txt.has(t)&&![...el.children].some(c=>norm(c.textContent)===t)){const p=take(t);if(p)el.setAttribute("data-ncf",p);return;}
    if(el.children.length){const own=norm([...el.childNodes].filter(n=>n.nodeType===3).map(n=>n.nodeValue).join(" "));if(own&&C.txt.has(own)){const p=take(own);if(p)el.setAttribute("data-ncfo",p);}}});
  r.querySelectorAll("img").forEach(im=>{const p=C.img.get(im.getAttribute("src")||"");if(p)im.setAttribute("data-nci",p);});
  return r.innerHTML;}
function ncvSet(props,path,val){let m=path.match(/^(\w+)\[(\d+)\]\.(\w+)(?:\|(\d+))?$/);
  if(m){const it=arr(props[m[1]])[+m[2]];if(!it)return;if(m[4]!=null){const L=String(it[m[3]]||"").split("\n");L[+m[4]]=val;it[m[3]]=L.join("\n");}else it[m[3]]=val;return;}
  m=path.match(/^(\w+)#(\d+)$/);if(m){const a=arr(props[m[1]]).slice();a[+m[2]]=val;props[m[1]]=a;return;}
  m=path.match(/^(\w+)\|(\d+)(?:\|(\d+))?$/);if(m){const L=String(props[m[1]]||"").split("\n");if(m[3]!=null){const Cc=(L[+m[2]]||"").split("|");Cc[+m[3]]=String(val).replace(/\|/g,"/");L[+m[2]]=Cc.join("|");}else L[+m[2]]=val;props[m[1]]=L.join("\n");return;}
  props[path]=val;}
/* marcar en la vista previa (no en el export) */
(function(){const _sh=sectionsHTML;sectionsHTML=function(forExport){if(forExport||state.freeMode)return _sh.apply(this,arguments);
    const bak=renderSection;const map={};state.sections.forEach(s=>map[s.id]=s);
    renderSection=function(s){return ncvMark(bak.apply(this,arguments),s);};try{return _sh.apply(this,arguments);}finally{renderSection=bak;}};})();
(function(){const _ps=patchSection;patchSection=function(id){const s=state.sections.find(x=>x.id===id);const doc=document.getElementById("pv").contentDocument;
    const wrap=doc&&doc.querySelector('[data-sec="'+id+'"]');if(!s||!wrap||state.freeMode||s.type==="imported")return _ps.apply(this,arguments);
    const tb=wrap.querySelector(".nc-tb");wrap.innerHTML=(tb?tb.outerHTML:"")+ncPhChips(ncvMark(renderSection(s),s));};})();
const NCV_JS=`(function(){if(window.__free)return;var ed=null,orig="";
function own(el){var t="";el.childNodes.forEach(function(n){if(n.nodeType===3)t+=n.nodeValue;});return t.replace(/\\s+/g," ").trim();}
function txt(el){var c=el.cloneNode(true);c.querySelectorAll('svg,.nci').forEach(function(x){x.remove();});return c.textContent.replace(/\\s+/g," ").trim();}
function start(el){if(ed)stop(true);ed=el;orig=el.innerHTML;el.querySelectorAll('.nc-phc[data-ph]').forEach(function(c){c.replaceWith(document.createTextNode(c.getAttribute('data-ph')));});
  el.setAttribute('contenteditable','true');el.classList.add('nc-editing');el.focus();try{var r=document.createRange();r.selectNodeContents(el);var s=getSelection();s.removeAllRanges();s.addRange(r);}catch(e){}}
function stop(save){if(!ed)return;var el=ed;ed=null;el.removeAttribute('contenteditable');el.classList.remove('nc-editing');var sec=el.closest('[data-sec]');
  if(!save){el.innerHTML=orig;return;}var items=[];
  [el].concat([].slice.call(el.querySelectorAll('[data-ncf],[data-ncfo]'))).forEach(function(x){if(x.hasAttribute('data-ncf'))items.push({p:x.getAttribute('data-ncf'),v:txt(x)});else if(x.hasAttribute('data-ncfo'))items.push({p:x.getAttribute('data-ncfo'),v:own(x)});});
  if(sec)parent.postMessage({nc:'fedit',id:sec.getAttribute('data-sec'),items:items},'*');}
document.addEventListener('dblclick',function(e){var im=e.target.closest('img[data-nci]');var sec=e.target.closest('[data-sec]');
  if(im&&sec){e.preventDefault();parent.postMessage({nc:'fimg',id:sec.getAttribute('data-sec'),p:im.getAttribute('data-nci')},'*');return;}
  var el=e.target.closest('[data-ncf],[data-ncfo]');if(!el||!sec)return;e.preventDefault();var up=el.parentElement&&el.parentElement.closest('[data-ncfo]');if(up&&up.contains(el)&&e.target===up)el=up;start(el);},true);
document.addEventListener('keydown',function(e){if(!ed)return;if(e.key===' '&&ed.closest('button')){e.preventDefault();e.stopPropagation();document.execCommand('insertText',false,' ');return;}if(e.key==='Escape'){e.preventDefault();e.stopPropagation();stop(false);}else if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();e.stopPropagation();stop(true);}},true);
document.addEventListener('focusout',function(e){if(ed&&e.target===ed)stop(true);},true);
document.addEventListener('paste',function(e){if(!ed)return;e.preventDefault();var t=(e.clipboardData||window.clipboardData).getData('text');document.execCommand('insertText',false,t.replace(/\\s*\\n\\s*/g,' '));},true);
document.addEventListener('click',function(e){if(ed&&ed.contains(e.target)){e.stopPropagation();}},true);
document.addEventListener('dragover',function(e){var im=e.target.closest&&e.target.closest('img[data-nci]');if(im&&e.dataTransfer&&[].indexOf.call(e.dataTransfer.types||[],'Files')>-1){e.preventDefault();im.classList.add('nc-dropimg');}},true);
document.addEventListener('dragleave',function(e){var im=e.target.closest&&e.target.closest('img[data-nci]');if(im)im.classList.remove('nc-dropimg');},true);
document.addEventListener('drop',function(e){var im=e.target.closest&&e.target.closest('img[data-nci]');if(!im||!e.dataTransfer||!e.dataTransfer.files.length)return;e.preventDefault();e.stopPropagation();im.classList.remove('nc-dropimg');var sec=im.closest('[data-sec]');
  parent.postMessage({nc:'fimg',id:sec.getAttribute('data-sec'),p:im.getAttribute('data-nci'),file:e.dataTransfer.files[0]},'*');},true);
})();`;
const NCV_CSS=`[data-sec].sel [data-ncf]:hover,[data-sec].sel [data-ncfo]:hover{outline:1.5px dashed rgba(110,90,255,.7);outline-offset:2px;cursor:text}
[data-sec].sel img[data-nci]:hover{outline:2px dashed rgba(110,90,255,.8);outline-offset:-2px;cursor:copy}
.nc-editing{outline:2px solid #6E5AFF!important;outline-offset:3px;border-radius:3px;cursor:text;-webkit-user-select:text;user-select:text}
img.nc-dropimg{outline:3px solid #6E5AFF!important;outline-offset:-3px;filter:brightness(.85)}
.nc-tb button[data-act="style"],.nc-tb button[data-act="content"]{font-size:12px}`;
(function(){const _bd=buildDoc;buildDoc=function(forExport){const h=_bd.apply(this,arguments);if(forExport||state.freeMode)return h;
  return h.replace("</head>",`<style>${NCV_CSS}</style></head>`).replace(/<\/body>(?![\s\S]*<\/body>)/,`<script>${NCV_JS}<\/script></body>`);};})();
/* barra de la sección: + Contenido y Estilo */
(function(){const _sh=sectionsHTML;sectionsHTML=function(forExport){let h=_sh.apply(this,arguments);if(forExport)return h;
  return h.replace(/(<div class="nc-tb">)(<button data-act="up" data-actid="([^"]+)")/g,(m,a,b,id)=>`${a}<button data-act="content" data-actid="${id}" title="Editar contenido">✎</button><button data-act="style" data-actid="${id}" title="Estilo de la sección">🎨</button>${b}`);};})();
(function(){const _ra=rowAction;rowAction=function(id,act){if(act==="style"||act==="content"){state.selected=id;setTab(act==="style"?"style":"content");renderRight();return;}return _ra.apply(this,arguments);};})();
window.addEventListener("message",e=>{const d=e.data;if(!d||(d.nc!=="fedit"&&d.nc!=="fimg"))return;const s=state.sections.find(x=>x.id===d.id);if(!s)return;
  if(d.nc==="fedit"){const before=JSON.stringify(s.props);commit();(d.items||[]).forEach(it=>{if(it.p)ncvSet(s.props,it.p,it.v);});
    if(JSON.stringify(s.props)===before){if(typeof past!=="undefined"&&past.length)past.pop();}state.selected=s.id;patchSection(s.id);renderRight();if(typeof wsOnChange==="function")try{wsOnChange();}catch(_){}}
  if(d.nc==="fimg"){const apply=url=>{commit();ncvSet(s.props,d.p,url);renderPreview();renderRight();toast("Imagen cambiada");};
    if(d.file)readImg(d.file,apply);else{const inp=document.createElement("input");inp.type="file";inp.accept="image/*";inp.onchange=ev=>readImg(ev.target.files[0],apply);inp.click();}}});
function ncvTB(s){return `<div class="nc-tb"><button data-act="content" data-actid="${s.id}" title="Editar contenido">✎</button><button data-act="style" data-actid="${s.id}" title="Estilo de la sección">🎨</button><button data-act="up" data-actid="${s.id}" title="Subir">↑</button><button data-act="down" data-actid="${s.id}" title="Bajar">↓</button><button data-act="dup" data-actid="${s.id}" title="Duplicar">⧉</button><button data-act="hide" data-actid="${s.id}" title="${s.hidden?'Mostrar':'Ocultar (no se exporta)'}">${s.hidden?'◌':'👁'}</button><button data-act="copy" data-actid="${s.id}" title="Copiar (Ctrl+C)">⎘</button><button data-act="del" data-actid="${s.id}" title="Eliminar sección">🗑</button></div>`;}
/* seleccionar sin recargar la vista previa (más rápido y permite el doble clic) */
function ncvSelectInPlace(id){const f=document.getElementById("pv");const doc=f&&f.contentDocument;if(!doc||state.freeMode)return false;const w=doc.querySelector('[data-sec="'+id+'"]');const s=state.sections.find(x=>x.id===id);if(!w||!s)return false;
  doc.querySelectorAll('[data-sec].sel').forEach(x=>{x.classList.remove("sel");const t=x.querySelector(":scope>.nc-tb");if(t)t.remove();});
  w.classList.add("sel");w.insertAdjacentHTML("afterbegin",ncvTB(s));return true;}
(function(){let shown=false;const _sel=select;select=function(id){let r;
    if(ncvSelectInPlace(id)){state.selected=id;setTab("content");try{const d=document.getElementById("pv").contentDocument;const el=d.querySelector('[data-sec="'+id+'"]');const rr=el.getBoundingClientRect();if(rr.bottom<0||rr.top>d.defaultView.innerHeight-40)el.scrollIntoView({behavior:"smooth",block:"center"});}catch(_){}renderRight();renderOutline();}
    else r=_sel.apply(this,arguments);if(!shown){shown=true;try{if(!localStorage.getItem("nc_tip_dbl")){localStorage.setItem("nc_tip_dbl","1");setTimeout(()=>toast("Consejo: doble clic en un texto o una imagen para editarlo ahí mismo"),400);}}catch(_){}}return r;};})();

/* NC Landing Builder · v5.9 · CÓDIGO SUBIDO: IDÉNTICO Y 100 % EDITABLE
   · Importar → «Mantener mi código (idéntico y editable)»: se conserva tu HTML, tu CSS y tu JS. El CSS se aísla dentro de
     cada sección importada (.nc-imp) y sobre una base «de navegador», para que los estilos del builder no cambien tu diseño.
     Subir un .html suelto o pegarlo; la «URL original» resuelve las rutas relativas (imágenes, CSS, fondos).
   · Todo se edita: textos (doble clic en el lienzo o en el panel), imágenes y fondos de imagen (doble clic, soltar o panel),
     enlaces y botones (texto, destino y acción del builder: llamar, WhatsApp, popup, formulario), formularios (enviar al
     endpoint del builder), campos, estilo por elemento (barra flotante / pestaña Estilo) y estructura (subir, bajar,
     duplicar, borrar, ir al contenedor).
   · Mis módulos: «✎ Editar todo aquí» convierte la instancia en código editable con su CSS y su JS.
   · El JS original sale en la landing exportada (y en «Abrir»); en el editor solo si lo activas. */
const CE={sel:null,run:false};
function ceRunEd(){const st=state.settings;return st.importRunEditor!=null?!!st.importRunEditor:CE.run;}
const CE_TRACK=/googletagmanager|gtag\(|google-analytics|fbq\(|connect\.facebook\.net|hotjar|clarity\.ms|tiktok.*pixel|snap\.licdn/i;
const ceEsc=s=>String(s==null?"":s);

/* ---------- utilidades de CSS ---------- */
function ceSplitTop(css){const out=[];let i=0,depth=0,start=0,q=null;css=String(css||"").replace(/\/\*[\s\S]*?\*\//g,"");
  for(;i<css.length;i++){const c=css[i];if(q){if(c===q&&css[i-1]!=="\\")q=null;continue;}if(c==='"'||c==="'"){q=c;continue;}
    if(c==="{")depth++;else if(c==="}"){depth--;if(depth===0){out.push(css.slice(start,i+1).trim());start=i+1;}}else if(c===";"&&depth===0){const s=css.slice(start,i+1).trim();if(s)out.push(s);start=i+1;}}
  const rest=css.slice(start).trim();if(rest)out.push(rest);return out;}
/* aísla el CSS de la web dentro de ROOT (anidamiento CSS): html/body/:root pasan a ser la propia sección; las clases del <body>
   original también aplican a la sección, y su fondo se copia al <body> de la landing (para que el fondo de página coincida) */
let CE_BODYBG="";
function ceScopeCSS(css,root,bodyCls){let glob="";CE_BODYBG="";const BC=new Set(String(bodyCls||"").split(/\s+/).filter(Boolean));
  const bgOnly=body=>{const m=body.slice(body.indexOf("{")+1,body.lastIndexOf("}"));const d=m.split(";").map(x=>x.trim()).filter(x=>/^background(-color|-image)?\s*:/i.test(x));return d.length?"{"+d.join(";")+"}":"";};
  let PG=[];const PSE=/^::?(before|after)\b/i;
  const mapSel=(sel,body,top)=>sel.split(",").map(x=>{x=x.trim();if(!x)return x;if(/^(html|:root)\s+body\b/.test(x))x=x.replace(/^(html|:root)\s+/,"");
    if(/^(html|body|:root)(?![\w-])/.test(x)){const r=x.replace(/^(html|body|:root)/,"");{const pm=r.match(/^((?:\.[\w-]+)*)(::?(?:before|after)\b.*)$/i);if(pm&&/^body/.test(x)){PG.push("body.nc-page"+r);return "";}}if(top&&/^(\.[\w-]+)*$/.test(r)){const b=bgOnly(body);if(b)CE_BODYBG+=`body.nc-page${r}${b}\n`;}return "&"+r;}
    const m=x.match(/^((?:\.[\w-]+)+)(.*)$/);if(m&&BC.size&&m[1].split(".").filter(Boolean).every(c=>BC.has(c))){if(PSE.test(m[2])){PG.push("body.nc-page"+m[1]+m[2]);return x;}if(top&&!m[2].trim()){const b=bgOnly(body);if(b)CE_BODYBG+=`body.nc-page${m[1]}${b}\n`;}return "&"+m[1]+m[2]+", "+x;}
    return x;}).filter(Boolean).join(",");
  const walk=(blocks,top,pgo)=>{let o="";blocks.forEach(b=>{if(/^@(font-face|keyframes|-webkit-keyframes|import|charset|property|namespace|counter-style|page)/i.test(b)){glob+=b+"\n";return;}
    if(/^@(media|supports|container|layer|document)/i.test(b)){const i=b.indexOf("{");if(i<0)return;const inner=b.slice(i+1,b.lastIndexOf("}"));const po={s:""};o+=b.slice(0,i)+"{"+walk(ceSplitTop(inner),false,po)+"}\n";if(po.s)pgo.s+=b.slice(0,i)+"{"+po.s+"}\n";return;}
    if(/^@/.test(b)){glob+=b+"\n";return;}const i=b.indexOf("{");if(i<0)return;PG=[];const ms=mapSel(b.slice(0,i),b,top);if(PG.length)pgo.s+=PG.join(",")+b.slice(i)+"\n";if(ms.trim())o+=ms+b.slice(i)+"\n";});return o;};
  const pgo={s:""};const nest=walk(ceSplitTop(css),true,pgo);CE_BODYBG+=pgo.s;return glob+(nest.trim()?root+"{"+nest+"}":"");}
function ceAbsUrl(u,base){try{return u&&base&&!/^(data:|#|mailto:|tel:|javascript:|\{\{|https?:|\/\/)/i.test(u.trim())?new URL(u.trim(),base).href:u;}catch(e){return u;}}
function ceAbsCss(css,base){if(!base)return css;return String(css).replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/g,(m,q,u)=>`url("${ceAbsUrl(u,base)}")`).replace(/@import\s+(['"])([^'"]+)\1/g,(m,q,u)=>`@import url("${ceAbsUrl(u,base)}")`);}
function ceAbsHtml(doc,base){if(!base)return;doc.querySelectorAll("[src],[href],[poster],[action],[data-src],[data-bg],[srcset],[style]").forEach(el=>{
    ["src","href","poster","action","data-src","data-bg"].forEach(a=>{const v=el.getAttribute(a);if(v)el.setAttribute(a,ceAbsUrl(v,base));});
    const ss=el.getAttribute("srcset");if(ss)el.setAttribute("srcset",ss.split(",").map(p=>{const seg=p.trim().split(/\s+/);seg[0]=ceAbsUrl(seg[0],base);return seg.join(" ");}).join(", "));
    const st=el.getAttribute("style");if(st&&/url\(/.test(st))el.setAttribute("style",ceAbsCss(st,base));});}
function ceIds(html,pfx){const r=ncParse(html);let n=0;r.querySelectorAll("*").forEach(el=>{if(!el.hasAttribute("data-ncid"))el.setAttribute("data-ncid",pfx+(n++).toString(36));});return r.innerHTML;}
/* base «de navegador» para lo importado: lo que tu CSS no define no lo hereda del builder */
const CE_REVERT=`.nc-imp.nc-imp :where(*:not(svg,svg *,[width],[height],.nc-tb,.nc-tb *,.nc-phc)){all:revert}.nc-imp.nc-imp{all:initial;display:block}`;

/* ---------- importar manteniendo el código ---------- */
async function ceFetchCss(href){try{const r=await fetch(href,{mode:"cors"});if(r.ok)return await r.text();}catch(e){}
  try{if(window.NC_SB){const {data}=await window.NC_SB.auth.getSession();const tk=data&&data.session&&data.session.access_token;if(tk){const r=await fetch("/api/fetch?url="+encodeURIComponent(href),{headers:{Authorization:"Bearer "+tk}});if(r.ok){const j=await r.json().catch(()=>null);return j&&j.body?j.body:(j&&typeof j==="string"?j:null);}}}}catch(e){}
  return null;}
async function ceImport(src,base){
  if(!src){toast("Sube o pega el HTML primero");return;}
  let doc;try{doc=new DOMParser().parseFromString(src,"text/html");}catch(e){toast("HTML no válido");return;}
  const bt=doc.querySelector("base[href]");if(!base&&bt)base=bt.getAttribute("href");if(base&&!/^https?:\/\//i.test(base))base="https://"+base.replace(/^\/+/,"");
  const info=document.getElementById("importInfo");if(info)info.textContent="Preparando tu código…";
  /* ¿es una landing exportada por este builder? (sus scripts de sistema se quitan: el builder pone los suyos) */
  const isNC=!!(doc.body&&doc.body.classList.contains("nc-page")&&doc.querySelector("[data-sec]"));
  if(isNC){doc.querySelectorAll("#ncCookies,.nc-cookie-link,#ncPop,#ncContact,.nc-wa-float,.nc-exit").forEach(el=>el.remove());
    [...doc.body.children,...doc.head.children].forEach(el=>{if(el.tagName==="SCRIPT"||el.tagName==="NOSCRIPT")el.remove();});}
  /* cookies/consentimiento y modales abiertos: el builder trae los suyos */
  try{doc.querySelectorAll('[class*="cookie" i],[id*="cookie" i]').forEach(el=>{const m=el.closest('.modal,[class*="modal" i],[role="dialog"]');(m||el).remove();});
    doc.querySelectorAll('.modal-backdrop,[class*="consent" i],[id*="consent" i],[id*="cmp" i],[class*="gdpr" i],[id*="gdpr" i]').forEach(el=>el.remove());}catch(e){}
  ceAbsHtml(doc,base);
  /* CSS: <style> y <link rel=stylesheet> en orden; Google Fonts se queda como enlace */
  let css="",links="",unscoped=false;
  for(const el of [...doc.querySelectorAll('link[rel~="stylesheet"],style')]){
    if(el.tagName==="STYLE"){css+=ceAbsCss(el.textContent,base)+"\n";continue;}
    const href=el.getAttribute("href");if(!href)continue;if(/fonts\.googleapis|use\.typekit|fonts\.bunny/i.test(href)){links+=`<link rel="stylesheet" href="${esc(href)}">\n`;continue;}
    if(info)info.textContent="Descargando estilos: "+href.slice(0,60)+"…";const t=await ceFetchCss(href);
    if(t!=null)css+=ceAbsCss(t,href)+"\n";else{links+=`<link rel="stylesheet" href="${esc(href)}">\n`;unscoped=true;}}
  /* JS en orden (sin etiquetas de medición: la landing mide con el GTM del builder) */
  let js="",dropped=0;doc.querySelectorAll("script").forEach(sc=>{const t=(sc.getAttribute("type")||"").toLowerCase();
    if(t&&!/javascript|module/.test(t)){if(t==="application/ld+json")js+=sc.outerHTML+"\n";sc.remove();return;}
    const code=sc.textContent||"",srcA=sc.getAttribute("src")||"";
    /* solo se quitan las etiquetas de medición «puras» (fragmentos cortos o scripts externos de medición), nunca un script de la página que además cargue GTM */
    if(CE_TRACK.test(srcA)||(CE_TRACK.test(code)&&code.length<1500)){dropped++;sc.remove();return;}
    if(/bootstrap(\.bundle)?(\.min)?\.js/i.test(srcA)){sc.remove();return;}
    js+=srcA?`<script src="${esc(srcA)}"${sc.type==="module"?' type="module"':""}${sc.defer?" defer":""}><\/script>\n`:`<script${sc.type==="module"?' type="module"':""}>${code.replace(/<\/script/gi,"<\\/script")}<\/script>\n`;sc.remove();});
  doc.querySelectorAll("noscript").forEach(n=>{if(/googletagmanager|facebook/i.test(n.innerHTML))n.remove();});
  /* secciones: se baja por envoltorios (sección del builder, módulo, <main>, envoltorio único) y cada sección conserva
     sus contenedores (sin hermanos) para que los selectores de tu CSS sigan funcionando */
  const secs=ceSections(doc);
  if(!secs.length){toast("No encontré secciones en el HTML");if(info)info.textContent="";return;}
  if(state.sections.length&&!confirm("¿Sustituir la landing actual por tu código importado?")){if(info)info.textContent="";return;}
  commit();const S=state.settings;const bodyCls=(doc.body.getAttribute("class")||"").trim();
  S.importCSS=links;S.importCSSScoped=ceScopeCSS(css,".nc-imp.nc-imp.nc-imp",(doc.body.getAttribute("class")||"").trim());S.importBodyBg=CE_BODYBG;S.importScoped=!unscoped;S.importRawCSS=unscoped?css:"";S.importBodyClass=bodyCls;S.importJS=js;S.importJSOn=true;S.importRunEditor=!!ceCfgFind(js);S.importBase=base||"";S.importMode="code";
  if(unscoped)S.importCSS=links+(css.trim()?`<style>${css.replace(/<\/style/gi,"<\\/style")}</style>`:"");
  state.sections=secs.map((h,i)=>({id:nid(),type:"imported",props:{html:ceIds(h,"c"+i+"_"),src:"page"},style:{}}));
  state.selected=state.sections[0].id;CE.sel=null;document.getElementById("importOverlay").style.display="none";if(info)info.textContent="";
  renderPalette();setTab("content");renderPreview();renderRight();
  const rel=(src.match(/\b(?:src|href)=["'](?!https?:|\/\/|data:|#|mailto:|tel:|javascript:)[^"']+\.(?:png|jpe?g|webp|svg|gif|avif|css)/gi)||[]).length;
  toast(`Importado tal cual: ${secs.length} secciones${dropped?` · ${dropped} etiqueta(s) de medición quitadas (mide con el GTM del builder)`:""}${rel&&!base?" · hay rutas relativas: indica la «URL original»":""}`);}

function ceSections(doc){const SKIP=/^(SCRIPT|STYLE|LINK|META|TITLE|NOSCRIPT|TEMPLATE|BASE)$/;
  const sprite=el=>el.tagName.toLowerCase()==="svg"&&!!el.querySelector("symbol")&&[...el.children].every(c=>/^(symbol|defs|title|desc|style)$/i.test(c.tagName));
  const sprites=[...doc.querySelectorAll("svg")].filter(sprite);sprites.forEach(x=>x.remove());
  doc.querySelectorAll("meta,title,base").forEach(x=>{if(x.closest("body"))x.remove();});
  const mean=el=>el.nodeType===1&&!SKIP.test(el.tagName)&&!(el.tagName==="DIV"&&!el.children.length&&!(el.textContent||"").trim()&&!el.getAttribute("style"));
  const shallow=el=>{const c=el.cloneNode(false);c.removeAttribute("data-sec");return c;};
  const out=[];
  const walk=(el,anc)=>{const kids=[...el.children].filter(mean);
    kids.forEach(k=>{const kk=[...k.children].filter(mean);
      const pass=k.hasAttribute("data-sec")||(k.classList.contains("ncm")&&kk.length>1)||(k.tagName==="MAIN"&&kk.length>1)||(el===doc.body&&kids.length===1&&kk.length>1&&!/^(HEADER|FOOTER|NAV|FORM)$/.test(k.tagName));
      if(pass)walk(k,k.hasAttribute("data-sec")&&!k.className?anc:anc.concat([shallow(k)]));else out.push({el:k,anc});});};
  walk(doc.body,[]);
  return out.map((o,i)=>{let inner=(i===0&&sprites.length?sprites.map(x=>x.outerHTML).join(""):"")+o.el.outerHTML;
    for(let j=o.anc.length-1;j>=0;j--){const c=o.anc[j].cloneNode(false);c.innerHTML=inner;inner=c.outerHTML;}return inner.trim();}).filter(h=>h.length>10);}
/* ---------- envoltorio de cada sección importada ---------- */
function ncImpWrap(s,html,forExport){
  /* formularios enviados al endpoint de la landing: casilla RGPD, antispam y atribución, como el resto de formularios */
  if(forExport&&/data-callback/.test(html)&&typeof ncEnhanceForms==="function"){try{const r=ncParse(html);ncEnhanceForms(r,"imp_"+(state.sections.indexOf(s)+1));html=r.innerHTML;}catch(e){}}
  if(!s||!s.props||s.props.src!=="page")return html;const st=state.settings;
  return `<div class="nc-imp${st.importBodyClass?" "+esc(st.importBodyClass):""}">${html}</div>`;}
/* vista previa: sin contenteditable permanente (doble clic para editar), marcas de imagen de fondo */
importedPreviewHtml=function(html){try{const r=ncParse(html);if(state.freeMode){r.querySelectorAll('[data-ncid]').forEach(el=>{el.setAttribute('data-ncmove','1');el.setAttribute('draggable','false');});}
  r.querySelectorAll("script").forEach(x=>x.remove());return r.innerHTML;}catch(e){return html;}};

/* ---------- CSS y JS en la página ---------- */
(function(){const _bd=buildDoc;buildDoc=function(forExport){const st=state.settings;const imp=state.sections.filter(s=>s.type==="imported"&&!(forExport&&s.hidden));
  let h=_bd.apply(this,arguments);if(!imp.length)return h;
  let head="";
  /* el CSS importado va al final del <head>: así gana a los estilos generales del builder */
  if(st.importCSS&&h.indexOf(st.importCSS)>-1){h=h.replace(st.importCSS,"");head+=st.importCSS;}
  const pg=imp.some(s=>s.props.src==="page");
  if(pg&&st.importScoped&&st.importCSSScoped)head+=`<style id="nc-imp-css">${CE_REVERT}\n${st.importCSSScoped.replace(/<\/style/gi,"<\\/style")}\n${(st.importBodyBg||"").replace(/<\/style/gi,"")}</style>`;
  if(pg&&st.importBodyClass)h=h.replace(/<body class="nc-page/,`<body class="nc-page ${esc(st.importBodyClass)}`);
  imp.forEach(s=>{if(s.props.css)head+=`<style data-imp="${s.id}">${String(s.props.css).replace(/<\/style/gi,"<\\/style")}</style>`;});
  if(!forExport)head+=`<style>.nc-imp [data-ncid].ce-sel{outline:2px solid #6E5AFF!important;outline-offset:2px}.nc-imp .ce-editing{outline:2px solid #6E5AFF!important;outline-offset:3px;cursor:text}[data-sec].sel .nc-imp [data-ncid]:hover{cursor:pointer}
    [data-aos],.aos-init,.wow,.reveal,[data-animate]{opacity:1!important;transform:none!important;visibility:visible!important}</style>`;
  h=h.replace("</head>",head+"</head>");
  /* JS: en el export (y «Abrir»); en el editor solo si se activa */
  let js=(forExport||ceRunEd())&&st.importJS&&st.importJSOn!==false?st.importJS:"";
  imp.forEach(s=>{if(s.props.js&&(forExport||ceRunEd()))js+=`<script>try{${String(s.props.js).replace(/<\/script/gi,"<\\/script")}\n}catch(e){console.error(e)}<\/script>`;});
  if(js)h=h.replace(/<\/body>(?![\s\S]*<\/body>)/,js+"</body>");
  if(forExport)h=h.replace(/\sdata-nc(?:id|text|img|e|e-img)="[^"]*"/g,"").replace(/\scontenteditable="true"/g,"");
  else if(!state.freeMode)h=h.replace(/<\/body>(?![\s\S]*<\/body>)/,`<script>${CE_PREV_JS}<\/script></body>`);
  return h;};})();

/* ---------- lienzo: seleccionar, editar texto (doble clic), cambiar imagen ---------- */
const CE_PREV_JS=`(function(){if(window.__free)return;var ed=null,orig='';
function sec(n){var s=n&&n.closest&&n.closest('[data-sec]');return s&&s.querySelector('[data-ncid]')?s:null;}
function hasText(el){for(var n=el.firstChild;n;n=n.nextSibling){if(n.nodeType===3&&n.nodeValue.trim())return true;}return false;}
function txtEl(t){for(var el=t;el&&el.hasAttribute;el=el.parentElement){if(el.hasAttribute('data-sec'))return null;if(el.hasAttribute('data-ncid')&&hasText(el))return el;}return null;}
function bgEl(t){for(var el=t;el&&el.hasAttribute;el=el.parentElement){if(el.hasAttribute('data-sec'))return null;if(el.hasAttribute('data-ncid')&&/url\\(/.test(getComputedStyle(el).backgroundImage))return el;}return null;}
function stop(save){if(!ed)return;var el=ed;ed=null;el.removeAttribute('contenteditable');el.classList.remove('ce-editing');if(!save){el.innerHTML=orig;return;}
  if(el.innerHTML!==orig)parent.postMessage({nc:'cetext',id:el.closest('[data-sec]').getAttribute('data-sec'),ncid:el.getAttribute('data-ncid'),html:el.innerHTML},'*');}
document.addEventListener('click',function(e){var s=sec(e.target);if(!s)return;if(ed&&ed.contains(e.target)){e.stopPropagation();return;}
  if(!s.classList.contains('sel'))return;var el=e.target.closest('[data-ncid]');if(!el||!s.contains(el))return;
  document.querySelectorAll('.ce-sel').forEach(function(x){x.classList.remove('ce-sel');});el.classList.add('ce-sel');
  var bg=bgEl(el),cs=getComputedStyle(bg||el);parent.postMessage({nc:'cesel',id:s.getAttribute('data-sec'),ncid:el.getAttribute('data-ncid'),bg:bg?bg.getAttribute('data-ncid'):null,bgUrl:bg?cs.backgroundImage:''},'*');},true);
document.addEventListener('dblclick',function(e){var s=sec(e.target);if(!s)return;var img=e.target.closest('img[data-ncid],video[data-ncid]');
  if(img){e.preventDefault();parent.postMessage({nc:'ceimg',id:s.getAttribute('data-sec'),ncid:img.getAttribute('data-ncid')},'*');return;}
  var el=txtEl(e.target);if(el){e.preventDefault();e.stopPropagation();if(ed)stop(true);ed=el;orig=el.innerHTML;el.setAttribute('contenteditable','true');el.classList.add('ce-editing');el.focus();return;}
  var bg=bgEl(e.target);if(bg){e.preventDefault();parent.postMessage({nc:'ceimg',id:s.getAttribute('data-sec'),ncid:bg.getAttribute('data-ncid'),bg:1,bgUrl:getComputedStyle(bg).backgroundImage},'*');}},true);
document.addEventListener('keydown',function(e){if(!ed)return;if(e.key==='Escape'){e.preventDefault();e.stopPropagation();stop(false);}else if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();e.stopPropagation();stop(true);}},true);
document.addEventListener('focusout',function(e){if(ed&&e.target===ed)stop(true);},true);
document.addEventListener('paste',function(e){if(!ed)return;e.preventDefault();var t=(e.clipboardData||window.clipboardData).getData('text');document.execCommand('insertText',false,t.replace(/\\s*\\n\\s*/g,' '));},true);
document.addEventListener('dragover',function(e){var s=sec(e.target);if(!s||!e.dataTransfer||[].indexOf.call(e.dataTransfer.types||[],'Files')<0)return;var t=e.target.closest('img[data-ncid]')||bgEl(e.target);if(t){e.preventDefault();t.classList.add('ce-sel');}},true);
document.addEventListener('drop',function(e){var s=sec(e.target);if(!s||!e.dataTransfer||!e.dataTransfer.files.length)return;var im=e.target.closest('img[data-ncid]'),t=im||bgEl(e.target);if(!t)return;e.preventDefault();e.stopPropagation();
  parent.postMessage({nc:'ceimg',id:s.getAttribute('data-sec'),ncid:t.getAttribute('data-ncid'),bg:im?0:1,bgUrl:im?'':getComputedStyle(t).backgroundImage,file:e.dataTransfer.files[0]},'*');},true);
})();`;

/* ---------- operaciones sobre el HTML guardado ---------- */
function ceDoc(s){return ncParse(s.props.html);}
function ceSave(s,r){s.props.html=r.innerHTML;}
function ceFind(r,ncid){return ncid?r.querySelector('[data-ncid="'+ncid+'"]'):null;}
const CE_INLINE=/^(B|STRONG|I|EM|U|SPAN|SMALL|SUP|SUB|MARK|BR|A|S|DEL|INS|ABBR|CODE|SVG|IMG|LABEL)$/;
function ceTextOnly(el){return [...el.children].every(c=>/^(BR)$/.test(c.tagName));}
function ceCleanInline(html){const t=document.createElement("template");t.innerHTML=html;t.content.querySelectorAll("script,style,iframe,object").forEach(n=>n.remove());
  t.content.querySelectorAll("*").forEach(el=>{[...el.attributes].forEach(a=>{if(/^on/i.test(a.name)||a.name==="contenteditable")el.removeAttribute(a.name);});});return t.innerHTML;}
function ceCta(a,act,val){["data-cta","data-act","target","rel"].forEach(k=>a.removeAttribute(k));
  if(act==="call"){a.setAttribute("href","tel:"+String(val||state.settings.tel||"{{TELEFONO}}").replace(/\s/g,""));a.setAttribute("data-cta","call");}
  else if(act==="wa"){a.setAttribute("href","https://wa.me/"+String(val||state.settings.wa||"{{WHATSAPP}}").replace(/[^0-9{}A-Z_]/g,""));a.setAttribute("data-cta","whatsapp");a.setAttribute("target","_blank");a.setAttribute("rel","noopener");}
  else if(act==="popup"||act==="scroll"){a.setAttribute("href","#form");a.setAttribute("data-cta","form");a.setAttribute("data-act",act);}
  else{a.setAttribute("href",val||"#");}}
function ceActOf(el){const h=el.getAttribute("href")||"";const c=el.getAttribute("data-cta")||"";if(c==="form")return el.getAttribute("data-act")==="scroll"?"scroll":"popup";
  if(/^tel:/i.test(h)||c==="call")return "call";if(/wa\.me|api\.whatsapp/i.test(h)||c==="whatsapp")return "wa";if(el.tagName==="BUTTON")return el.getAttribute("type")==="submit"||el.closest("form")?"submit":"button";return "url";}
function ceRetag(el,tag){const d=el.ownerDocument.createElement(tag);[...el.attributes].forEach(a=>{if(a.name!=="type")d.setAttribute(a.name,a.value);});d.innerHTML=el.innerHTML;el.replaceWith(d);return d;}

/* ---------- mensajes del lienzo ---------- */
window.addEventListener("message",ev=>{const d=ev.data;if(!d||!/^ce/.test(d.nc||""))return;const s=state.sections.find(x=>x.id===d.id);if(!s)return;
  if(d.nc==="cemod"){ceModToCode(s);return;}
  if(s.type!=="imported")return;
  if(d.nc==="cesel"){CE.sel={id:s.id,ncid:d.ncid,bg:d.bg,bgUrl:d.bgUrl};if(state.selected!==s.id)state.selected=s.id;if(state.tab==="content")renderRight();return;}
  if(d.nc==="cetext"){const r=ceDoc(s);const el=ceFind(r,d.ncid);if(!el)return;commit();el.innerHTML=ceCleanInline(d.html);ceSave(s,r);patchSection(s.id);if(state.tab==="content")renderRight();return;}
  if(d.nc==="ceimg"){const apply=url=>{const r=ceDoc(s);const el=ceFind(r,d.ncid);if(!el)return;commit();
      if(!d.bg&&el.tagName==="IMG"){el.setAttribute("src",url);el.removeAttribute("srcset");const pic=el.closest("picture");if(pic)pic.querySelectorAll("source").forEach(x=>x.remove());}
      else if(!d.bg&&el.tagName==="VIDEO"){el.setAttribute("src",url);}
      else{el.style.backgroundImage=ceBgVal(d.bgUrl,url);}ceSave(s,r);patchSection(s.id);CE.sel={id:s.id,ncid:d.ncid};renderRight();toast("Imagen cambiada");};
    if(d.file){readImg(d.file,apply);return;}ceChooseImg(apply);}});
/* cambia solo la imagen y conserva degradados u otras capas del fondo */
function ceBgVal(cur,url){return cur&&/url\(/.test(cur)?cur.replace(/url\((?:"[^"]*"|'[^']*'|[^)]*)\)/,`url("${url}")`):`url("${url}")`;}
function ceChooseImg(apply){if(window.NC_MEDIA){NC_MEDIA.open({accept:"image",cb:apply});return;}const fi=document.createElement("input");fi.type="file";fi.accept="image/*";fi.onchange=e=>readImg(e.target.files[0],apply);fi.click();}

/* ---------- «Datos de la página»: el objeto CONFIG del JS de tu código, editable sin tocar código ----------
   Lee window.CONFIG / const CONFIG = {…} (también CFG, SETTINGS, SITE) con un lector tolerante (comillas simples, claves sin
   comillas, comentarios, comas finales) y cambia solo el valor tocado: se conservan tus comentarios y tu formato. */
function ceCfgFind(js){const m=/\b(?:window\.)?(CONFIG|CFG|SETTINGS|SITE|DATOS)\s*=\s*\{/.exec(String(js||""));if(!m)return null;try{const p=ceJ5(js,m.index+m[0].length-1);return p&&p.t==="o"?{name:m[1],node:p}:null;}catch(e){return null;}}
function ceJ5(src,i0){let i=i0;const ws=()=>{for(;;){while(i<src.length&&/\s/.test(src[i]))i++;if(src.startsWith("//",i)){while(i<src.length&&src[i]!=="\n")i++;continue;}if(src.startsWith("/*",i)){const e=src.indexOf("*/",i+2);i=e<0?src.length:e+2;continue;}break;}};
  const lineCmt=()=>{let j=i;while(j<src.length&&/[ \t,]/.test(src[j]))j++;if(src.startsWith("//",j)){const e=src.indexOf("\n",j);return src.slice(j+2,e<0?src.length:e).trim();}return "";};
  const str=()=>{const q=src[i];let j=i+1,v="";while(j<src.length&&src[j]!==q){if(src[j]==="\\"){const n=src[j+1];v+=n==="n"?"\n":n==="t"?"\t":n;j+=2;continue;}v+=src[j++];}const r={t:"s",v,q,a:i,b:j+1};i=j+1;return r;};
  const val=()=>{ws();const c=src[i],a=i;
    if(c==="{"){i++;const E=[];for(;;){ws();if(src[i]==="}"){i++;break;}let k;if(src[i]==='"'||src[i]==="'")k=str().v;else{const m=/^[A-Za-z_$][\w$]*/.exec(src.slice(i));if(!m)throw 0;k=m[0];i+=k.length;}ws();if(src[i]!==":")throw 0;i++;const v=val();const cm=lineCmt();ws();if(src[i]===",")i++;E.push({k,v,cm});}return {t:"o",E,a,b:i};}
    if(c==="["){i++;const L=[];for(;;){ws();if(src[i]==="]"){i++;break;}L.push(val());ws();if(src[i]===",")i++;}return {t:"a",L,a,b:i};}
    if(c==='"'||c==="'")return str();
    const m=/^(true|false|null|-?\d+(?:\.\d+)?)/.exec(src.slice(i));if(!m)throw 0;i+=m[0].length;return {t:m[0]==="true"||m[0]==="false"?"b":m[0]==="null"?"n":"d",v:m[0]==="true"?true:m[0]==="false"?false:m[0]==="null"?null:+m[0],a,b:i};};
  return val();}
function ceLit(v,q){if(typeof v==="boolean"||v===null||typeof v==="number")return String(v);q=q||"'";return q+String(v).replace(/\\/g,"\\\\").replace(new RegExp(q,"g"),"\\"+q).replace(/\n/g,"\\n")+q;}
function ceHum(k){const H={faq:"FAQ",url:"URL",gtm:"GTM",iva:"IVA",wa:"WhatsApp"};return String(k).replace(/([a-z])([A-Z])/g,"$1 $2").replace(/([A-Z])([A-Z][a-z])/g,"$1 $2").replace(/[_-]+/g," ").split(" ").map(w=>H[w.toLowerCase()]||w).join(" ").replace(/[_-]+/g," ").replace(/^./,c=>c.toUpperCase());}
function ceCfgHTML(){const st=state.settings;const f=ceCfgFind(st.importJS);if(!f)return "";let n=0;
  const row=(e,path)=>{const v=e.v,id=path.join(".");const help=e.cm?`<div class="help">${esc(e.cm.replace(/^PENDIENTE\s*·?\s*/i,"Pendiente: "))}</div>`:"";const lab=`<label>${esc(ceHum(e.k))}${/PENDIENTE/i.test(e.cm||"")||(v.t==="s"&&!v.v)||v.t==="n"?' <span class="tag">pendiente</span>':""}</label>`;n++;
    if(v.t==="o")return `<div class="ce-cfg-g"><b>${esc(ceHum(e.k))}</b>${help}${v.E.map(x=>row(x,path.concat(x.k))).join("")}</div>`;
    if(v.t==="b")return `<div class="fld">${lab}<select data-cfg="${esc(id)}" data-cfgt="b"><option value="true"${v.v?" selected":""}>Sí</option><option value="false"${v.v?"":" selected"}>No</option></select>${help}</div>`;
    if(v.t==="a"&&v.L.every(x=>x.t==="s"))return `<div class="fld">${lab}<textarea data-cfg="${esc(id)}" data-cfgt="as" rows="${Math.max(2,v.L.length)}">${esc(v.L.map(x=>x.v).join("\n"))}</textarea><div class="help">Uno por línea.</div>${help}</div>`;
    if(v.t==="a")return `<div class="fld">${lab}<textarea data-cfg="${esc(id)}" data-cfgt="raw" rows="3">${esc(st.importJS.slice(v.a,v.b))}</textarea>${help}</div>`;
    return `<div class="fld">${lab}<input data-cfg="${esc(id)}" data-cfgt="${v.t}" value="${esc(v.v==null?"":v.v)}">${help}</div>`;};
  const body=f.node.E.map(e=>row(e,[e.k])).join("");
  return `<details class="ce-list ce-cfg" open><summary>⚙ Datos de la página <span class="tag">${n}</span></summary><div class="help" style="margin:4px 0 8px">Tu código toma estos datos de <code>${esc(f.name)}</code>: precio, teléfono, textos legales… Cámbialos aquí y la página se actualiza (se conservan tus comentarios).</div>${body}</details>`;}
function ceCfgSet(path,type,val){const st=state.settings;const f=ceCfgFind(st.importJS);if(!f)return false;let node=f.node,ent=null;
  for(const k of path){if(!node||node.t!=="o")return false;ent=node.E.find(x=>x.k===k);if(!ent)return false;node=ent.v;}
  let lit;if(type==="b")lit=val==="true"?"true":"false";else if(type==="as")lit="["+String(val).split("\n").map(x=>x.trim()).filter(Boolean).map(x=>ceLit(x,node.L&&node.L[0]&&node.L[0].q||"'")).join(", ")+"]";
  else if(type==="raw"||((type==="n"||node.t==="n"||node.t==="o"||node.t==="a")&&/^\s*[\[{]/.test(val))){try{new Function("return ("+val+")");}catch(e){return false;}lit=String(val).trim();}else if(type==="d"&&/^-?\d+(\.\d+)?$/.test(String(val).trim()))lit=String(val).trim();else lit=val===""&&(type==="n"||node.t==="n")?"null":ceLit(val,node.q||"'");
  st.importJS=st.importJS.slice(0,node.a)+lit+st.importJS.slice(node.b);return true;}
let CE_CFG_T=null;
/* ---------- panel de una sección de código ---------- */
function ceLbl(el){const t=(el.textContent||"").replace(/\s+/g," ").trim();return t.slice(0,48)+(t.length>48?"…":"");}
function ceTagName(el){const T={A:"Enlace / botón",BUTTON:"Botón",IMG:"Imagen",H1:"Titular H1",H2:"Titular H2",H3:"Titular H3",H4:"Titular H4",P:"Párrafo",LI:"Punto de lista",FORM:"Formulario",INPUT:"Campo",TEXTAREA:"Campo de texto",SELECT:"Desplegable",LABEL:"Etiqueta",VIDEO:"Vídeo",IFRAME:"Contenido incrustado",SECTION:"Sección",HEADER:"Cabecera",FOOTER:"Pie",NAV:"Menú",UL:"Lista",SPAN:"Texto",STRONG:"Texto en negrita"};return T[el.tagName]||el.tagName.toLowerCase();}
function ceSelPanel(s,r,el){const tag=el.tagName;const hasT=[...el.childNodes].some(n=>n.nodeType===3&&n.nodeValue.trim());const rich=!ceTextOnly(el);let h="";
  const crumbs=[];for(let x=el;x&&x.hasAttribute&&x.hasAttribute("data-ncid");x=x.parentElement)crumbs.unshift(x);
  h+=`<div class="ce-crumb">${crumbs.slice(-4).map(x=>`<button type="button" class="mini" data-cesel="${x.getAttribute("data-ncid")}" title="${esc(ceTagName(x))}">${esc(x.tagName.toLowerCase())}${x.className&&typeof x.className==="string"?"."+esc(x.className.split(" ")[0]).slice(0,14):""}</button>`).join("›")}</div>`;
  h+=`<div class="ce-kind">${esc(ceTagName(el))}</div>`;
  if(el.closest('[class*="js-"]')&&ceCfgFind(state.settings.importJS))h+=`<div class="note" style="margin:0 0 8px">Este contenido lo rellena el código de la página: cámbialo en <b>⚙ Datos de la página</b> (abajo) para que no se sobrescriba.</div>`;
  if(/^(A|BUTTON)$/.test(tag)||(hasT&&!/^(FORM|SELECT)$/.test(tag))){
    if(rich&&tag!=="A"&&tag!=="BUTTON")h+=`<div class="fld"><label>Texto (con formato: también puedes hacer doble clic en el lienzo)</label><textarea data-ce="html" rows="3">${esc(el.innerHTML)}</textarea></div>`;
    else if(!(el.querySelector("img,svg")&&!hasT))h+=`<div class="fld"><label>Texto</label>${(el.textContent||"").length>60?`<textarea data-ce="text" rows="3">${esc((el.textContent||"").trim())}</textarea>`:`<input data-ce="text" value="${esc((el.textContent||"").replace(/\s+/g," ").trim())}">`}</div>`;}
  if(tag==="A"||tag==="BUTTON"){const act=ceActOf(el);const opts=[["url","Enlace (URL o #ancla)"],["popup","Abrir el popup del builder"],["scroll","Ir al formulario"],["call","Llamar"],["wa","WhatsApp"]];if(tag==="BUTTON")opts.unshift(["submit","Enviar el formulario"],["button","Sin acción (botón de tu JS)"]);
    h+=`<div class="fld"><label>Al pulsar</label><select data-ce="act">${opts.map(([v,t])=>`<option value="${v}"${act===v?" selected":""}>${t}</option>`).join("")}</select></div>`;
    if(act==="url")h+=`<div class="fld"><label>URL</label><input data-ce="href" value="${esc(el.getAttribute("href")||"")}"></div><div class="fld inline"><label>Abrir en pestaña nueva</label><input type="checkbox" data-ce="blank" ${el.getAttribute("target")==="_blank"?"checked":""}></div>`;
    if(act==="call"||act==="wa")h+=`<div class="help">Usa el ${act==="call"?"teléfono":"WhatsApp"} de Global → Contacto (se mide como clic de ${act==="call"?"llamada":"WhatsApp"}).</div>`;}
  if(tag==="IMG"){h+=`<div class="thumbrow"><img class="thumb" src="${esc(el.getAttribute("src")||"")}" alt=""><button type="button" class="btn sm" data-cea="img">Cambiar imagen</button></div><div class="fld"><label>URL de la imagen</label><input data-ce="src" value="${esc((el.getAttribute("src")||"").startsWith("data:")?"(imagen subida)":el.getAttribute("src")||"")}"></div><div class="fld"><label>Texto alternativo</label><input data-ce="alt" value="${esc(el.getAttribute("alt")||"")}"></div>`;}
  if(tag==="VIDEO"||tag==="IFRAME"||tag==="SOURCE")h+=`<div class="fld"><label>${tag==="IFRAME"?"URL del contenido (YouTube embed, mapa…)":"URL del vídeo"}</label><input data-ce="src" value="${esc(el.getAttribute("src")||"")}"></div>${tag==="VIDEO"?`<div class="fld"><label>Portada (poster)</label><input data-ce="poster" value="${esc(el.getAttribute("poster")||"")}"></div>`:""}`;
  if(CE.sel&&CE.sel.bg){const u=(CE.sel.bgUrl||"").match(/url\("?([^")]+)"?\)/);h+=`<div class="fld"><label>Imagen de fondo${CE.sel.bg!==el.getAttribute("data-ncid")?" (del contenedor)":""}</label><div class="thumbrow">${u?`<img class="thumb" src="${esc(u[1])}" alt="">`:""}<button type="button" class="btn sm" data-cea="bg">Cambiar fondo</button></div></div>`;}
  else if(!/^(IMG|A|BUTTON|INPUT|SPAN|STRONG|B|I|EM|BR)$/.test(tag))h+=`<div class="fld"><button type="button" class="btn sm ghost" data-cea="bgset">🖼 Poner imagen de fondo</button></div>`;
  if(tag==="FORM"){const own=el.hasAttribute("data-callback");h+=`<div class="fld"><label>Los datos se envían a</label><select data-ce="fdest"><option value="builder"${own?" selected":""}>El endpoint de la landing (Global → Contacto, medido)</option><option value="orig"${own?"":" selected"}>Su destino original: ${esc((el.getAttribute("data-ce-action")||el.getAttribute("action")||"(ninguno)").slice(0,40))}</option></select></div>`;}
  if(/^(INPUT|TEXTAREA|SELECT)$/.test(tag)){h+=`<div class="fld"><label>Texto de ayuda (placeholder)</label><input data-ce="placeholder" value="${esc(el.getAttribute("placeholder")||"")}"></div><div class="row2"><div class="fld"><label>Nombre del campo</label><input data-ce="name" value="${esc(el.getAttribute("name")||"")}"></div><div class="fld inline"><label>Obligatorio</label><input type="checkbox" data-ce="required" ${el.hasAttribute("required")?"checked":""}></div></div>`;}
  h+=`<div class="ce-ops"><button type="button" class="btn sm ghost" data-cea="up" title="Subir">↑ Subir</button><button type="button" class="btn sm ghost" data-cea="down" title="Bajar">↓ Bajar</button><button type="button" class="btn sm ghost" data-cea="dup">⧉ Duplicar</button><button type="button" class="btn sm ghost" data-cea="del">🗑 Borrar</button></div>
    <div class="help">Tamaño, color, espacios y alineación: barra flotante sobre el elemento o pestaña <b>Estilo</b>.</div>`;
  return h;}
function ceListHTML(r){const T=[...r.querySelectorAll("[data-ncid]")].filter(el=>!/^(SCRIPT|STYLE|SVG|PATH|BR)$/.test(el.tagName)&&!el.closest("svg")&&[...el.childNodes].some(n=>n.nodeType===3&&n.nodeValue.trim()));
  const I=[...r.querySelectorAll("img[data-ncid]")],L=[...r.querySelectorAll("a[data-ncid],button[data-ncid]")],F=[...r.querySelectorAll("form[data-ncid]")];
  const row=(el,txt)=>`<button type="button" class="ce-row" data-cesel="${el.getAttribute("data-ncid")}"><b>${esc(el.tagName.toLowerCase())}</b><span>${esc(txt)}</span></button>`;
  return `<details class="ce-list" open><summary>Textos <span class="tag">${T.length}</span></summary>${T.slice(0,120).map(el=>row(el,ceLbl(el))).join("")}</details>
    <details class="ce-list"><summary>Imágenes <span class="tag">${I.length}</span></summary>${I.map(el=>`<button type="button" class="ce-row" data-cesel="${el.getAttribute("data-ncid")}"><img src="${esc(el.getAttribute("src")||"")}" alt=""><span>${esc(el.getAttribute("alt")||"(sin texto alternativo)")}</span></button>`).join("")||`<div class="help">Sin imágenes &lt;img&gt;. Las de fondo se cambian haciendo clic sobre el elemento.</div>`}</details>
    <details class="ce-list"><summary>Enlaces y botones <span class="tag">${L.length}</span></summary>${L.map(el=>row(el,ceLbl(el)+" → "+(el.getAttribute("href")||el.getAttribute("type")||""))).join("")}</details>
    ${F.length?`<details class="ce-list"><summary>Formularios <span class="tag">${F.length}</span></summary>${F.map(el=>row(el,(el.hasAttribute("data-callback")?"→ endpoint de la landing":"→ "+(el.getAttribute("action")||"sin destino")))).join("")}</details>`:""}`;}
function ceGlobalHTML(){const st=state.settings;if(!state.sections.some(s=>s.type==="imported"&&s.props.src==="page"))return "";
  return `<details class="ce-list"><summary>Código de la página</summary>
    <div class="fld inline"><label>Incluir el JavaScript original en la landing</label><input type="checkbox" data-ceg="importJSOn" ${st.importJSOn!==false?"checked":""}></div>
    <div class="fld inline"><label>Ejecutarlo también en el editor (para ver sliders, menús…)</label><input type="checkbox" data-ceg="run" ${ceRunEd()?"checked":""}></div>
    <div class="fld"><label>URL original (para rutas relativas)</label><div style="display:flex;gap:6px"><input data-ceg="base" value="${esc(st.importBase||"")}" placeholder="https://www.cliente.es/"><button type="button" class="btn sm" data-ceg-act="rebase">Aplicar</button></div></div>
    <div class="help">${st.importScoped?"Tu CSS está aislado: el builder no cambia tu diseño.":"Algún CSS externo no se pudo descargar: está enlazado tal cual."}</div></details>`;}
renderImportedFields=function(cf,s){const r=ceDoc(s);if(!r.querySelector("[data-ncid]")){s.props.html=ceIds(s.props.html,"m"+Math.random().toString(36).slice(2,5)+"_");}
  const r2=ceDoc(s);const sel=CE.sel&&CE.sel.id===s.id?ceFind(r2,CE.sel.ncid):null;
  cf.innerHTML=`<div class="paneltitle" style="padding:0 0 8px">${s.props.src==="page"?"Tu código (idéntico y editable)":s.props.src==="module"?"Módulo editable":"Sección importada (editable)"}</div>
    <div id="cePanel">${sel?`<div class="ep-g ce-selp"><div class="paneltitle" style="padding:0 0 6px">Elemento seleccionado</div>${ceSelPanel(s,r2,sel)}</div>`:`<div class="help" style="margin:0 0 10px">Haz <b>clic</b> en cualquier elemento del lienzo para editarlo aquí; <b>doble clic</b> en un texto para escribir encima y en una imagen (o fondo) para cambiarla. También puedes soltar una imagen del ordenador sobre otra.</div>`}
    ${s.props.src==="page"?ceCfgHTML():""}${ceListHTML(r2)}${ceGlobalHTML()}
    <details class="ce-list"><summary>HTML de la sección</summary><textarea data-ce-raw style="min-height:160px;font-family:monospace;font-size:10.5px;margin-top:6px">${esc(s.props.html.replace(/\sdata-ncid="[^"]*"/g,""))}</textarea><button type="button" class="btn sm" data-cea="raw" style="margin-top:6px">Aplicar HTML</button></details></div>`;
  ceBind(cf,s);};
function ceBind(cf,s){const P=cf.querySelector("#cePanel");if(!P)return;
  const withSel=fn=>{const r=ceDoc(s);const el=CE.sel&&ceFind(r,CE.sel.ncid);if(!el)return;fn(el,r);ceSave(s,r);};
  P.addEventListener("click",e=>{const b=e.target.closest("[data-cesel]");if(b){CE.sel={id:s.id,ncid:b.dataset.cesel};renderRight();ceFocus(s.id,b.dataset.cesel);return;}
    const g=e.target.closest("[data-ceg-act]");if(g&&g.dataset.cegAct==="rebase"){const base=P.querySelector('[data-ceg="base"]').value.trim();if(!base)return;commit();state.settings.importBase=base;
      state.sections.forEach(x=>{if(x.type!=="imported")return;const d=new DOMParser().parseFromString(x.props.html,"text/html");ceAbsHtml(d,base);x.props.html=d.body.innerHTML;});
      if(state.settings.importCSSScoped)state.settings.importCSSScoped=ceAbsCss(state.settings.importCSSScoped,base);renderPreview();renderRight();toast("Rutas relativas resueltas con "+base);return;}
    const a=e.target.closest("[data-cea]");if(!a)return;const act=a.dataset.cea;
    if(act==="raw"){commit();s.props.html=ceIds(P.querySelector("[data-ce-raw]").value,"r"+Math.random().toString(36).slice(2,5)+"_");CE.sel=null;renderPreview();renderRight();return;}
    if(act==="img"||act==="bg"||act==="bgset"){const id=act==="bg"?CE.sel.bg:CE.sel.ncid;ceChooseImg(url=>{const r=ceDoc(s);const el=ceFind(r,id);if(!el)return;commit();if(act==="img"){el.setAttribute("src",url);el.removeAttribute("srcset");}else{el.style.backgroundImage=act==="bg"?ceBgVal(CE.sel.bgUrl,url):`url("${url}")`;if(act==="bgset"){el.style.backgroundSize="cover";el.style.backgroundPosition="center";}}ceSave(s,r);patchSection(s.id);renderRight();});return;}
    commit();withSel((el,r)=>{
      if(act==="up"){const p=el.previousElementSibling;if(p)p.before(el);}
      if(act==="down"){const n=el.nextElementSibling;if(n)n.after(el);}
      if(act==="dup"){const c=el.cloneNode(true);const pf="d"+Math.random().toString(36).slice(2,5)+"_";let k=0;[c,...c.querySelectorAll("[data-ncid]")].forEach(x=>x.setAttribute("data-ncid",pf+(k++)));el.after(c);CE.sel.ncid=c.getAttribute("data-ncid");}
      if(act==="del"){const p=el.parentElement&&el.parentElement.closest("[data-ncid]");el.remove();CE.sel=p?{id:s.id,ncid:p.getAttribute("data-ncid")}:null;}});
    renderPreview();renderRight();});
  const cfgUp=t=>{if(!t.dataset.cfg)return false;commitDebounced();const ok=ceCfgSet(t.dataset.cfg.split("."),t.dataset.cfgt,t.value);t.classList.toggle("ce-bad",!ok);t.title=ok?"":"Formato no válido: revisa llaves, comillas y comas";if(ok){clearTimeout(CE_CFG_T);CE_CFG_T=setTimeout(()=>{renderPreview();},350);}return true;};
  P.addEventListener("input",e=>{if(cfgUp(e.target))return;});P.addEventListener("change",e=>{if(e.target.tagName==="SELECT"&&cfgUp(e.target))e.stopImmediatePropagation();});
  P.addEventListener("input",e=>{const t=e.target;const k=t.dataset.ce;if(!k||t.tagName==="SELECT"||t.type==="checkbox")return;commitDebounced();
    withSel(el=>{if(k==="text"){const kids=[...el.childNodes];const tn=kids.filter(n=>n.nodeType===3&&n.nodeValue.trim());if(tn.length===1&&el.children.length){tn[0].nodeValue=t.value;}else el.textContent=t.value;}
      else if(k==="html")el.innerHTML=ceCleanInline(t.value);else if(k==="href")el.setAttribute("href",t.value);else if(k==="src"){if(t.value!=="(imagen subida)"){el.setAttribute("src",t.value);el.removeAttribute("srcset");}}else el.setAttribute(k,t.value);});patchSection(s.id);});
  P.addEventListener("change",e=>{const t=e.target;const k=t.dataset.ce,g=t.dataset.ceg;
    if(g){if(g==="run"){commit();state.settings.importRunEditor=t.checked;renderPreview();return;}if(g==="importJSOn"){commit();state.settings.importJSOn=t.checked;return;}return;}
    if(!k)return;if(t.tagName!=="SELECT"&&t.type!=="checkbox")return;commit();
    withSel((el,r)=>{if(k==="act"){const v=t.value;if(el.tagName==="BUTTON"){if(v==="submit"){el.setAttribute("type","submit");["data-cta","data-act"].forEach(x=>el.removeAttribute(x));}else if(v==="button"){el.setAttribute("type","button");["data-cta","data-act"].forEach(x=>el.removeAttribute(x));}
          else{const a2=ceRetag(el,"a");ceCta(a2,v,"");}}else ceCta(el,v,v==="url"?(el.getAttribute("href")||"#"):"");}
      if(k==="blank"){if(t.checked){el.setAttribute("target","_blank");el.setAttribute("rel","noopener");}else{el.removeAttribute("target");el.removeAttribute("rel");}}
      if(k==="required"){if(t.checked)el.setAttribute("required","");else el.removeAttribute("required");}
      if(k==="fdest"){if(t.value==="builder"){if(!el.hasAttribute("data-ce-action"))el.setAttribute("data-ce-action",el.getAttribute("action")||"");el.setAttribute("data-callback","");el.setAttribute("action",v4Act());el.setAttribute("method","post");}
        else{el.removeAttribute("data-callback");el.setAttribute("action",el.getAttribute("data-ce-action")||"");}}});
    patchSection(s.id);renderRight();});}
function ceFocus(secId,ncid){try{const d=document.getElementById("pv").contentDocument;const el=d.querySelector('[data-sec="'+secId+'"] [data-ncid="'+ncid+'"]');if(!el)return;d.querySelectorAll(".ce-sel").forEach(x=>x.classList.remove("ce-sel"));el.classList.add("ce-sel");el.scrollIntoView({block:"center",behavior:"smooth"});}catch(e){}}

/* ---------- Mis módulos → código editable ---------- */
function ceModToCode(s){if(!/^mod_/.test(s.type)||!s.props._def||!window.NCM)return;const def=s.props._def;
  if(!confirm("Para editarlo todo (textos, imágenes, enlaces…) este módulo se convierte en código editable en esta landing y deja de actualizarse desde la biblioteca. ¿Continuar?"))return;
  commit();const prev=NCM.exp;NCM.exp=true;let html="";try{html=LIB[s.type].render(s.props);}finally{NCM.exp=prev;}
  const r=ncParse(html);let js="";r.querySelectorAll("script").forEach(sc=>{js+=sc.textContent+"\n";sc.remove();});
  const cls=".ncm-"+NCM.type(def).slice(4);if(String(def.js||"").trim())js=`(function(roots){${def.js}\n})([].slice.call(document.querySelectorAll("${cls}")));\n`+js;
  s.type="imported";s.props={html:ceIds(r.innerHTML,"m"+Math.random().toString(36).slice(2,5)+"_"),src:"module",css:NCM.css(def)||"",js,name:def.name||""};CE.sel=null;
  state.selected=s.id;setTab("content");renderPreview();renderRight();toast("Listo: haz clic o doble clic en cualquier texto o imagen del módulo para editarlo");}
(function(){const _rr=renderRight;renderRight=function(){_rr.apply(this,arguments);const s=state.sections.find(x=>x.id===state.selected);if(!s||!/^mod_/.test(s.type)||!s.props._def)return;
  const side=document.querySelector("#contentFields .mod-side");if(!side||side.querySelector("#ceModBtn"))return;
  side.insertAdjacentHTML("afterbegin",`<button class="btn sm primary" id="ceModBtn">✎ Editar todo aquí (textos, imágenes, enlaces…)</button>`);document.getElementById("ceModBtn").addEventListener("click",()=>ceModToCode(s));};})();
/* doble clic en un texto de un módulo que no es campo → ofrecer convertir */
(function(){const _bd=buildDoc;buildDoc=function(forExport){let h=_bd.apply(this,arguments);if(forExport||state.freeMode||!state.sections.some(s=>/^mod_/.test(s.type)))return h;
  return h.replace(/<\/body>(?![\s\S]*<\/body>)/,`<script>document.addEventListener('dblclick',function(e){var m=e.target.closest&&e.target.closest('.ncm');if(!m||e.target.closest('[data-ncf],[data-ncfo],img[data-nci]'))return;var s=m.closest('[data-sec]');if(s&&s.classList.contains('sel'))parent.postMessage({nc:'cemod',id:s.getAttribute('data-sec')},'*');},true);<\/script></body>`);};})();

/* ---------- diálogo de importación: subir .html, URL original y «Mantener mi código» ---------- */
(function(){const box=document.querySelector("#importOverlay > div");if(!box||document.getElementById("ceDo"))return;
  const note=box.querySelector(".note");if(note)note.innerHTML=`Sube tu <b>.html</b> o pégalo. <b>Mantener mi código</b> lo deja idéntico (HTML, CSS y JS) y todo editable: textos, imágenes, botones, formularios, estilos y estructura. <b>Traducir a bloques</b> lo convierte en bloques del builder.`;
  const zipRow=document.getElementById("zipBtn");if(zipRow){zipRow.insertAdjacentHTML("beforebegin",`<input type="file" id="ceHtmlFile" accept=".html,.htm,text/html" style="display:none"><button class="btn primary" id="ceHtmlBtn" type="button">📄 Subir .html</button>`);}
  const ta=document.getElementById("importText");if(ta)ta.insertAdjacentHTML("afterend",`<div class="fld" style="margin-top:8px"><label>URL original de la página (opcional · resuelve imágenes y CSS con rutas relativas)</label><input id="ceBase" class="txt" style="width:100%" placeholder="https://www.cliente.es/landing/"></div>`);
  const row=document.getElementById("importDo");if(row){row.insertAdjacentHTML("beforebegin",`<button class="btn primary" id="ceDo" type="button">Mantener mi código (idéntico y editable)</button>`);row.textContent="Importar fiel (antiguo)";row.classList.remove("primary");}
  const tr=document.getElementById("translateDo");if(tr){tr.classList.remove("primary");tr.textContent="Convertir a bloques del builder";}
  document.getElementById("ceHtmlBtn").addEventListener("click",()=>document.getElementById("ceHtmlFile").click());
  document.getElementById("ceHtmlFile").addEventListener("change",e=>{const f=e.target.files[0];if(!f)return;const rd=new FileReader();rd.onload=()=>{ta.value=String(rd.result||"");const i=document.getElementById("zipInfo");if(i)i.textContent=f.name+" cargado ✓ — pulsa «Mantener mi código»";};rd.readAsText(f);});
  document.getElementById("ceDo").addEventListener("click",()=>ceImport((ta.value||"").trim(),(document.getElementById("ceBase").value||"").trim()));})();
(function(){const css=document.createElement("style");css.textContent=`#cePanel .ce-crumb{display:flex;flex-wrap:wrap;gap:2px;align-items:center;font-size:11px;margin-bottom:6px;color:var(--muted,#8a93a3)}#cePanel .ce-crumb .mini{font-family:ui-monospace,monospace;font-size:10.5px}
#cePanel .ce-kind{font-weight:700;font-size:12px;margin-bottom:6px}#cePanel .ce-ops{display:flex;flex-wrap:wrap;gap:4px;margin:6px 0}
#cePanel .ce-list{border:1px solid var(--line);border-radius:8px;padding:6px 8px;margin:0 0 8px}#cePanel .ce-list summary{cursor:pointer;font-weight:600;font-size:12px}
#cePanel .ce-row{display:flex;gap:8px;align-items:center;width:100%;text-align:left;background:none;border:0;border-bottom:1px solid var(--line);color:inherit;padding:5px 2px;font-size:12px;cursor:pointer}#cePanel .ce-row:hover{background:rgba(124,108,255,.08)}
#cePanel .ce-row b{font-family:ui-monospace,monospace;font-size:10.5px;color:var(--acc,#7c6cff);min-width:44px}#cePanel .ce-row span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0}#cePanel .ce-row img{width:36px;height:26px;object-fit:cover;border-radius:4px}#cePanel .ce-cfg .fld{margin-bottom:8px}#cePanel .ce-cfg-g{border-left:2px solid var(--line);padding-left:8px;margin:6px 0}#cePanel .ce-cfg-g>b{font-size:12px}#cePanel .ce-cfg .ce-bad{outline:2px solid #e5484d;outline-offset:1px}`;document.head.appendChild(css);})();

/* NC Landing Builder · v5.2 · MÓDULOS PROPIOS
   Elementos desarrollados por el equipo (HTML + CSS + JS) que se usan como cualquier bloque.
   · Campos editables con marcas en el HTML:
       {{titulo}}  {{titulo=Texto por defecto}}       texto de una línea
       {{ta:texto=…}}                                texto largo (los saltos de línea se respetan)
       {{img:foto=https://…}}                        imagen (subida o URL)
       {{url:enlace=#form}}                          enlace
       {{color:fondo=#e60000}}                       color (úsalo en style="--c:{{color:fondo}}")
       {{html:bloque=…}}                             HTML libre
     Datos globales (no son campos): {{tel}} {{tel_href}} {{wa_href}} {{endpoint}} → teléfono, enlace tel:, WhatsApp y
     endpoint del formulario de Global. Los <a href="tel:…">, enlaces wa.me y <form> se marcan solos para la medición.
   · CSS: se aísla dentro del módulo (anidado bajo .ncm-<id>) salvo que se desactive; body/html/:root apuntan al módulo.
   · JS: se ejecuta SOLO en la landing exportada y en «Abrir» (en una pestaña aislada); en el editor no corre, porque la
     vista previa comparte origen con el editor y su sesión. Recibe `roots` = todas las instancias del módulo.
   · Se guardan en la biblioteca del equipo (tabla team_blocks: kind 'section' con data.module) — sin migración.
   · Cada sección lleva una copia del módulo (props._def): la landing se abre igual aunque el módulo cambie o se borre. */
(function(){
const NCM={exp:false,reg:{}};window.NCM=NCM;
const SPECIAL={tel:()=>telText(),tel_href:()=>telHref(),wa_href:()=>waHref(),endpoint:()=>v4Act()};
const FT={txt:{l:"",t:undefined},ta:{t:"ta"},img:{t:"photo"},url:{},color:{t:"color"},html:{t:"ta"},num:{}};
const TOK=/\{\{\s*(?:(txt|ta|img|url|color|html|num)\s*:\s*)?([A-Za-z_][\w-]{0,40})\s*(?:=([\s\S]*?))?\}\}/g;
const human=k=>{const s=String(k).replace(/[_-]+/g," ").trim();return s.charAt(0).toUpperCase()+s.slice(1);};
const _dx=document.createElement("textarea");const dec=v=>{if(!/&[#\w]+;/.test(v))return v;_dx.innerHTML=v;return _dx.value;};
function hash(s){let h=5381;s=String(s);for(let i=0;i<s.length;i++)h=((h<<5)+h+s.charCodeAt(i))>>>0;return h.toString(36);}

/* ---------- campos ---------- */
function modFields(def){const out=[],seen={};String(def.html||"").replace(TOK,(m,t,k,d)=>{if(SPECIAL[k]&&!t)return m;if(seen[k])return m;seen[k]=1;
    const ty=t||"txt";const f={k,l:human(k)+(ty==="img"?" (imagen)":ty==="url"?" (enlace)":ty==="color"?" (color)":ty==="html"?" (HTML)":""),_ty:ty,_d:d==null?"":(ty==="html"?d:dec(d))};if(FT[ty].t)f.t=FT[ty].t;out.push(f);return m;});return out;}
function modDefaults(def){const p={};modFields(def).forEach(f=>p[f.k]=f._d);return p;}
const modType=def=>"mod_"+hash(def.libId||def.id);

/* ---------- CSS ---------- */
function splitTop(css){const out=[];let i=0,depth=0,start=0,q=null;css=String(css||"").replace(/\/\*[\s\S]*?\*\//g,"");
  for(;i<css.length;i++){const c=css[i];if(q){if(c===q&&css[i-1]!=="\\")q=null;continue;}if(c==='"'||c==="'"){q=c;continue;}
    if(c==="{")depth++;else if(c==="}"){depth--;if(depth===0){out.push(css.slice(start,i+1).trim());start=i+1;}}else if(c===";"&&depth===0){const s=css.slice(start,i+1).trim();if(s)out.push(s);start=i+1;}}
  const rest=css.slice(start).trim();if(rest)out.push(rest);return out;}
function modCSS(def){const css=String(def.css||"");if(!css.trim())return "";const cls=".ncm-"+modType(def).slice(4);if(def.scope===false)return css;
  let glob="",nest="";splitTop(css).forEach(b=>{if(/^@(font-face|keyframes|-webkit-keyframes|import|charset|property|layer\s*[^{]*;)/i.test(b))glob+=b+"\n";
    else if(/^@/.test(b))nest+=b+"\n";else{const i=b.indexOf("{");const sel=b.slice(0,i).split(",").map(s=>{s=s.trim();return /^(html|body|:root)\b/.test(s)?s.replace(/^(html|body|:root)\s*/,"&"+(/^(html|body|:root)\s*$/.test(s)?"":" ")):s;}).join(",");nest+=sel+b.slice(i)+"\n";}});
  return glob+(nest.trim()?cls+"{"+nest+"}":"");}

/* ---------- render ---------- */
function sanitize(html){const t=document.createElement("template");t.innerHTML=html;t.content.querySelectorAll("script,iframe[srcdoc],object,embed").forEach(n=>n.remove());
  t.content.querySelectorAll("*").forEach(el=>{[...el.attributes].forEach(a=>{if(/^on/i.test(a.name)||(/^(href|src|action|formaction|xlink:href)$/i.test(a.name)&&/^\s*javascript:/i.test(a.value)))el.removeAttribute(a.name);});});return t.innerHTML;}
function wire(html){return html.replace(/<a\b(?![^>]*\bdata-cta=)([^>]*\bhref="tel:)/gi,'<a data-cta="call"$1').replace(/<a\b(?![^>]*\bdata-cta=)([^>]*\bhref="https:\/\/(?:wa\.me|api\.whatsapp\.com)\/)/gi,'<a data-cta="whatsapp"$1')
  .replace(/<form\b(?![^>]*\bdata-callback)([^>]*\baction="([^"]*)")/gi,(m,rest,act)=>act===v4Act()||/ENDPOINT_FORMULARIO/.test(act)?'<form data-callback'+rest:m);}
function modRender(p){const def=p._def;if(!def)return "";
  let html=String(def.html||"").replace(TOK,(m,t,k)=>{if(SPECIAL[k]&&!t)return esc(SPECIAL[k]());const v=p[k]==null?"":String(p[k]);
    switch(t||"txt"){case "ta":return esc(v).replace(/\n/g,"<br>");case "html":return v;case "color":return /^(#[0-9a-f]{3,8}|rgba?\([\d\s.,%]+\)|hsla?\([\d\s.,%deg]+\))$/i.test(v.trim())?v.trim():"";default:return esc(v);}});
  html=wire(NCM.exp?html:sanitize(html));
  return `<section class="ncm ncm-${modType(def).slice(4)}" data-mod="${esc(def.name||"")}">${html}</section>`;}
function register(def){const type=modType(def);const cur=NCM.reg[type];if(cur&&LIB[type]&&cur.v>=(def.v||0))return type;NCM.reg[type]={v:def.v||0};
  LIB[type]={label:"◆ "+(def.name||"Módulo"),ico:"◆",cat:"Mis módulos",raw:true,mod:true,def:()=>Object.assign(modDefaults(def),{_def:JSON.parse(JSON.stringify(def))}),fields:modFields(def).map(f=>{const o={k:f.k,l:f.l};if(f.t)o.t=f.t;return o;}),render:modRender};
  return type;}
NCM.register=register;NCM.fields=modFields;NCM.css=modCSS;NCM.type=modType;
/* las secciones traen su copia del módulo: se registran antes de pintar (y antes de la limpieza de bloques retirados) */
function ensureAll(){state.sections.forEach(s=>{if(/^mod_/.test(s.type)&&s.props&&s.props._def&&!LIB[s.type]){const d=s.props._def;register(d);if(modType(d)!==s.type)LIB[s.type]=LIB[modType(d)];}});}
const _mig=ncMigrateAll;ncMigrateAll=function(){ensureAll();return _mig.apply(this,arguments);};
/* CSS en <head>, JS solo al exportar */
const _bd=buildDoc;buildDoc=function(forExport){const prev=NCM.exp;NCM.exp=!!forExport;ensureAll();let h;try{h=_bd.apply(this,arguments);}finally{NCM.exp=prev;}
  const used={};state.sections.forEach(s=>{if(/^mod_/.test(s.type)&&s.props&&s.props._def&&!(forExport&&s.hidden))used[s.type]=s.props._def;});const D=Object.values(used);if(!D.length)return h;
  const css=D.map(modCSS).filter(Boolean).join("\n");if(css){const imp=(css.match(/@import[^;]+;/g)||[]).join("");h=h.replace("</head>",`<style id="nc-modules">${imp}${css.replace(/@import[^;]+;/g,"").replace(/<\/style/gi,"<\\/style")}</style></head>`);}
  if(forExport){const js=D.filter(d=>String(d.js||"").trim()).map(d=>`(function(roots){try{${String(d.js).replace(/<\/script/gi,"<\\/script")}\n}catch(e){console.error("Módulo ${String(d.name||"").replace(/["\\<]/g,"")}:",e);}})([].slice.call(document.querySelectorAll(".ncm-${modType(d).slice(4)}")));`).join("\n");
    if(js)h=h.replace(/<\/body>(?![\s\S]*<\/body>)/,`<script>${js}<\/script></body>`);}
  return h;};
/* «Abrir» con módulos: pestaña aislada (sin acceso a la sesión del editor) */
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("#btnPreview");if(!b)return;
  if(!state.sections.some(s=>/^mod_/.test(s.type)&&s.props&&s.props._def&&(String(s.props._def.js||"").trim()||/<script/i.test(s.props._def.html||""))))return;
  e.preventDefault();e.stopImmediatePropagation();const html=buildDoc(true);const w=window.open("","_blank");if(!w){toast("Permite las ventanas emergentes para abrir la vista previa");return;}
  w.document.write('<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Vista previa · módulos aislados</title><style>html,body{margin:0;height:100%}iframe{border:0;width:100%;height:100%;display:block}</style></head><body><iframe sandbox="allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-modals" title="Vista previa"></iframe></body></html>');w.document.close();
  w.document.querySelector("iframe").srcdoc=html;},true);

/* ---------- biblioteca (tabla team_blocks) ---------- */
const libRows=()=>(typeof team!=="undefined"?team.rows:[]).filter(r=>r&&r.data&&r.data.module);
async function libSave(def,meta){def.v=Date.now();const row={kind:"section",nombre:(def.name||"Módulo").slice(0,120),cliente:(meta.client||"").slice(0,80)||null,etiquetas:["módulo",def.cat].filter(Boolean).join(", "),data:{module:def}};
  const cur=def.libId&&team.rows.find(r=>r.id===def.libId);
  if(cur){if(!/^l/.test(cur.id)&&teamCloud()&&!team.err){const {data,error}=await window.NC_SB.from("team_blocks").update({nombre:row.nombre,cliente:row.cliente,etiquetas:row.etiquetas,data:row.data}).eq("id",cur.id).select("id,kind,nombre,cliente,etiquetas,data,created_by,created_at").single();if(error){toast("Error: "+error.message);return false;}Object.assign(cur,data);}
    else{const a=teamLocalGet();const i=a.findIndex(x=>x.id===cur.id);Object.assign(cur,row);if(i>=0)a[i]=cur;else a.unshift(cur);if(!teamLocalSet(a))return false;team.rows=team.rows.map(x=>x.id===cur.id?cur:x);}
    toast("Módulo actualizado en la biblioteca");}
  else{const ok=await teamSave(row);if(!ok)return false;const n=team.rows[0];if(n){n.data.module.libId=n.id;def.libId=n.id;
      if(!/^l/.test(n.id)&&teamCloud()&&!team.err)await window.NC_SB.from("team_blocks").update({data:n.data}).eq("id",n.id);else{const a=teamLocalGet();if(a[0]&&a[0].id===n.id){a[0].data.module.libId=n.id;teamLocalSet(a);}}}}
  libRows().forEach(r=>register(r.data.module));renderPalette();return true;}
function addModule(def,index){const type=register(def);commit();const s={id:nid(),type,props:LIB[type].def(),style:{}};
  if(index==null||index<0||index>state.sections.length)state.sections.push(s);else state.sections.splice(index,0,s);state.selected=s.id;renderPreview();renderRight();toast("«"+def.name+"» añadido");}

/* ---------- desde una web: elegir sección y extraer HTML + CSS ---------- */
async function proxyGet(url){const tok=typeof ncPubToken==="function"?await ncPubToken():"";if(!tok)throw new Error("Inicia sesión para traer páginas por URL (o pega el HTML).");
  const r=await fetch("/api/fetch?url="+encodeURIComponent(url),{headers:{Authorization:"Bearer "+tok}});if(r.status===404)throw new Error("Traer por URL solo funciona en la versión desplegada en Vercel. Pega el HTML de la página.");
  const j=await r.json().catch(()=>({}));if(!r.ok)throw new Error(j.error||("Error "+r.status));return j;}
const absUrl=(u,base)=>{try{return u&&!/^(data:|#|mailto:|tel:|javascript:|\{\{)/i.test(u)?new URL(u,base).href:u;}catch(e){return u;}};
function absCss(css,base){return String(css).replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/g,(m,q,u)=>`url("${absUrl(u.trim(),base)}")`).replace(/@import\s+(['"])([^'"]+)\1/g,(m,q,u)=>`@import url("${absUrl(u,base)}")`);}
async function prepareDoc(html,base,useProxy){const d=new DOMParser().parseFromString(html,"text/html");base=base||"";
  d.querySelectorAll("script,noscript,iframe,object,embed").forEach(n=>n.remove());d.querySelectorAll("*").forEach(el=>[...el.attributes].forEach(a=>{if(/^on/i.test(a.name))el.removeAttribute(a.name);}));
  const warn=[];const links=[...d.querySelectorAll('link[rel~="stylesheet"][href]')];
  for(const l of links){const href=absUrl(l.getAttribute("href"),base);if(/fonts\.googleapis\.com/.test(href)){l.setAttribute("href",href);l.setAttribute("data-gf","1");continue;}
    if(useProxy){try{const j=await proxyGet(href);const st=d.createElement("style");st.setAttribute("data-href",href);st.textContent=absCss(j.text,j.finalUrl||href);l.replaceWith(st);continue;}catch(e){warn.push("CSS no cargado: "+href);}}
    else warn.push("CSS externo no incluido: "+href);l.remove();}
  d.querySelectorAll("style:not([data-href])").forEach(st=>st.textContent=absCss(st.textContent,base));
  d.querySelectorAll("[src],[href],[poster],[srcset]").forEach(el=>{["src","href","poster"].forEach(a=>{if(el.hasAttribute(a)&&!(el.tagName==="LINK"&&el.dataset.gf))el.setAttribute(a,absUrl(el.getAttribute(a),base));});
    if(el.hasAttribute("srcset"))el.setAttribute("srcset",el.getAttribute("srcset").split(",").map(x=>{const p=x.trim().split(/\s+/);p[0]=absUrl(p[0],base);return p.join(" ");}).join(", "));
    if(el.hasAttribute("data-src")&&el.tagName==="IMG"&&!/^https?:/.test(el.getAttribute("src")||""))el.setAttribute("src",absUrl(el.getAttribute("data-src"),base));});
  d.querySelectorAll("[style]").forEach(el=>el.setAttribute("style",absCss(el.getAttribute("style"),base)));
  return {html:"<!doctype html>"+d.documentElement.outerHTML,warn};}
const PSEUDO=/::?(hover|focus|focus-visible|focus-within|active|visited|before|after|placeholder|first-line|first-letter|selection|marker|checked|disabled|target|-webkit-[\w-]+|-moz-[\w-]+)(\([^)]*\))?/g;
function cleanSel(s){return s.replace(PSEUDO,"").trim()||"*";}
function trySel(fn){try{return fn();}catch(e){return false;}}
function extract(root){const D=root.ownerDocument,W=D.defaultView;const anc=[];for(let a=root.parentElement;a;a=a.parentElement)anc.push(a);
  const inSec=sel=>trySel(()=>root.matches(sel)||!!root.querySelector(sel));
  const rew=sel=>{const parts=sel.trim().split(/\s*([>+~])\s*|\s+/).filter(x=>x!==undefined&&x!=="");let i=0;
    while(i<parts.length){const p=parts[i];if(/^[>+~]$/.test(p)){i++;continue;}const t=cleanSel(p);if(trySel(()=>anc.some(a=>a.matches(t)))&&!trySel(()=>root.matches(t)||!!root.querySelector(t)))i++;else break;}
    let rest=parts.slice(i);while(rest.length&&/^[>+~]$/.test(rest[0]))rest.shift();return rest.join(" ").replace(/\s+([>+~])\s+/g," $1 ");};
  const vars=new Set();const out=[];
  const walk=(rules,acc)=>{[...rules].forEach(r=>{if(r.type===1){const sels=r.selectorText.split(",").map(s=>s.trim()).filter(s=>inSec(cleanSel(s)));if(!sels.length)return;
      const ns=sels.map(rew).filter(Boolean);if(!ns.length)return;const body=r.style.cssText;(body.match(/var\(--[\w-]+/g)||[]).forEach(v=>vars.add(v.slice(4)));acc.push(ns.join(", ")+"{"+body+"}");}
    else if(r.type===4){const inner=[];walk(r.cssRules,inner);if(inner.length)acc.push("@media "+r.media.mediaText+"{"+inner.join("\n")+"}");}
    else if(r.type===12){const inner=[];walk(r.cssRules,inner);if(inner.length)acc.push("@supports "+r.conditionText+"{"+inner.join("\n")+"}");}
    else if(r.type===5||r.type===7)acc.push(r.cssText);});};
  [...D.styleSheets].forEach(sh=>{try{walk(sh.cssRules,out);}catch(e){}});
  let css=out.join("\n");const used=css.replace(/@keyframes[\s\S]*?\}\s*\}/g,"");css=css.replace(/@(-webkit-)?keyframes\s+([\w-]+)\s*\{[\s\S]*?\}\s*\}/g,(m,w,n)=>new RegExp("animation[^;]*\\b"+n+"\\b").test(used)?m:"");
  css=css.replace(/@font-face\s*\{[^}]*font-family:\s*["']?([^;"']+)["']?;[^}]*\}/g,(m,f)=>new RegExp(f.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"i").test(used.replace(/@font-face\s*\{[^}]*\}/g,""))?m:"");
  const cs=W.getComputedStyle(root),pcs=W.getComputedStyle(root.parentElement||root);let rootVars=[...vars].map(v=>{const val=cs.getPropertyValue(v).trim();return val?v+":"+val:"";}).filter(Boolean);
  const inh=["font-family","color","font-size","line-height"].map(k=>k+":"+pcs.getPropertyValue(k)).join(";");const hd=root.querySelector("h1,h2,h3");const ff=pcs.getPropertyValue("font-family");const inh2=";--fbody:"+ff+";--fhead:"+(hd?W.getComputedStyle(hd).getPropertyValue("font-family"):ff);
  const bg=pcs.getPropertyValue("background-color");
  css=(rootVars.length||inh?`&{${rootVars.join(";")}${rootVars.length?";":""}${inh}${inh2}${/rgba\(0, 0, 0, 0\)|transparent/.test(bg)?"":";background-color:"+bg}}\n`:"")+css;
  const gf=[...D.querySelectorAll('link[data-gf]')].map(l=>`@import url("${l.getAttribute("href")}");`).join("\n");
  return {html:root.outerHTML.replace(/\s(class|style)=""/g,"").replace(/\sdata-ncsel(="")?/g,""),css:(gf?gf+"\n":"")+css};}
/* marca automática de textos, imágenes y canales */
function autoMark(html){const t=document.createElement("template");t.innerHTML=html;const R=t.content;let n={};const key=b=>{n[b]=(n[b]||0)+1;return n[b]>1?b+"_"+n[b]:b;};
  const KN={H1:"titulo",H2:"subtitulo",H3:"titulo_bloque",H4:"titulo_bloque",P:"texto",A:"enlace_texto",BUTTON:"boton",LI:"punto",SPAN:"texto_corto",LABEL:"etiqueta",SMALL:"nota",STRONG:"destacado",B:"destacado",EM:"enfasis",FIGCAPTION:"pie",TD:"celda",TH:"cabecera",DT:"termino",DD:"definicion",BLOCKQUOTE:"cita",CITE:"autor"};
  const INL=/^(B|STRONG|EM|I|U|SPAN|BR|SMALL|SUP|SUB|MARK|A)$/;let count=0;
  R.querySelectorAll("a[href]").forEach(a=>{const h=a.getAttribute("href");if(/^tel:/i.test(h)){a.setAttribute("href","{{tel_href}}");if(/^[\s+\d().-]{6,}$/.test(a.textContent))a.textContent="{{tel}}";}else if(/wa\.me|api\.whatsapp\.com/i.test(h))a.setAttribute("href","{{wa_href}}");});
  R.querySelectorAll("form").forEach(f=>{f.setAttribute("action","{{endpoint}}");f.setAttribute("method","post");f.setAttribute("data-callback","");});
  R.querySelectorAll("img[src]").forEach(img=>{if(count>=60)return;const k=key("imagen");img.setAttribute("src",`{{img:${k}=${img.getAttribute("src")}}}`);img.removeAttribute("srcset");img.removeAttribute("data-src");if(img.hasAttribute("alt"))img.setAttribute("alt",`{{${k}_alt=${img.getAttribute("alt").replace(/\}\}/g,"")}}}`);count++;});
  const els=[...R.querySelectorAll("h1,h2,h3,h4,h5,h6,p,a,button,li,span,label,small,strong,b,em,figcaption,td,th,dt,dd,blockquote,cite,div")];
  els.forEach(el=>{if(count>=60)return;if(el.closest("[data-nc-done]"))return;const txt=el.textContent.replace(/\s+/g," ").trim();if(txt.length<2||/\{\{/.test(txt))return;
    if(!R.contains(el)||/\{\{/.test(el.innerHTML))return;const kids=[...el.children];if(el.tagName==="DIV"&&kids.length)return;if(kids.some(c=>!INL.test(c.tagName)))return;
    const base=KN[el.tagName]||"texto";const k=key(base);
    if(kids.length&&kids.some(c=>c.tagName!=="BR")){el.innerHTML=`{{html:${k}=${el.innerHTML.trim().replace(/\}\}/g,"} }")}}}`;}else el.textContent=kids.length?`{{ta:${k}=${(c=>{c.querySelectorAll("br").forEach(b=>b.replaceWith("\n"));return c.textContent;})(el.cloneNode(true)).replace(/[ \t]+/g," ").trim().replace(/\}\}/g,"} }")}}}`:`{{${k}=${txt.replace(/\}\}/g,"} }")}}}`;
    el.setAttribute("data-nc-done","");count++;});
  R.querySelectorAll("[data-nc-done]").forEach(el=>el.removeAttribute("data-nc-done"));return {html:t.innerHTML,count};}
NCM.autoMark=autoMark;NCM.extract=extract;NCM.prepare=prepareDoc;

/* ---------- interfaz: editor de módulo ---------- */
let ed=null;
function ov(id){let o=document.getElementById(id);if(!o){o=document.createElement("div");o.id=id;o.className="nc-ov";document.body.appendChild(o);}return o;}
function previewDoc(def){const tmp=JSON.parse(JSON.stringify(def));tmp.id="__prev";delete tmp.libId;const type=modType(tmp);delete NCM.reg[type];register(tmp);
  const bak={s:state.sections,sel:state.selected,f:state.freeMode};try{state.sections=[{id:"pv1",type,props:LIB[type].def(),style:{}}];state.selected=null;state.freeMode=false;
    return buildDoc(false).replace(/<script[\s\S]*?<\/script>/g,"").replace("<head>",'<head><base target="_blank"><style>#ncCookies,[data-nc-cookies],.nc-legal-foot{display:none!important}</style>');}
  finally{state.sections=bak.s;state.selected=bak.sel;state.freeMode=bak.f;delete LIB[type];delete NCM.reg[type];}}
function openEditor(def,opts){opts=opts||{};ed={def:Object.assign({id:"u"+Date.now().toString(36),name:"",cat:"",client:"",html:"",css:"",js:"",scope:true},JSON.parse(JSON.stringify(def||{}))),opts,tab:"html"};drawEditor();}
function drawEditor(){const o=ov("modOv"),d=ed.def;const F=modFields(d);const cats=[...new Set(libRows().map(r=>r.data.module.cat).filter(Boolean))],clients=[...new Set(team.rows.map(r=>r.cliente).filter(Boolean))];
  o.innerHTML=`<div class="nc-ov-box mod-box"><div class="nc-ov-head"><b>${d.libId?"Editar módulo":"Nuevo módulo"}</b><span class="help" style="margin:0 auto 0 12px">${teamCloud()&&!team.err?"Se guarda en la biblioteca del equipo":"Sin sesión: se guarda solo en este navegador"}</span><button class="btn sm ghost" data-md="x">Cerrar</button></div>
   <div class="mod-grid"><div class="mod-l">
    <div class="row2"><div class="fld"><label>Nombre</label><input id="mdName" value="${esc(d.name)}" placeholder="p. ej. Banda de ventajas Lowi"></div><div class="fld"><label>Categoría</label><input id="mdCat" list="mdCats" value="${esc(d.cat)}" placeholder="Hero, Ofertas, Confianza…"><datalist id="mdCats">${cats.map(c=>`<option value="${esc(c)}">`).join("")}</datalist></div></div>
    <div class="fld"><label>Cliente (opcional)</label><input id="mdClient" list="mdClients" value="${esc(d.client)}"><datalist id="mdClients">${clients.map(c=>`<option value="${esc(c)}">`).join("")}</datalist></div>
    <div class="mod-src"><button type="button" class="btn sm" data-md="web">🌐 Desde una web…</button><button type="button" class="btn sm" data-md="files">⤒ Subir .html / .css / .js</button><button type="button" class="btn sm" data-md="auto" title="Convierte los textos e imágenes del HTML en campos editables">✨ Detectar editables</button><input type="file" id="mdFiles" multiple accept=".html,.htm,.css,.js" style="display:none"></div>
    <div class="mod-tabs">${["html","css","js"].map(t=>`<button type="button" class="chipf sm ${ed.tab===t?"on":""}" data-mtab="${t}">${t.toUpperCase()}${t==="js"&&String(d.js||"").trim()?" ●":""}</button>`).join("")}<label class="mod-scope"><input type="checkbox" id="mdScope" ${d.scope!==false?"checked":""}> Aislar el CSS</label></div>
    <textarea id="mdCode" class="mod-code" spellcheck="false" placeholder="${ed.tab==="html"?"&lt;div class=&quot;mi-banda&quot;&gt;&lt;h2&gt;{{titulo=Tu titular}}&lt;/h2&gt;&lt;a href=&quot;{{tel_href}}&quot;&gt;{{tel}}&lt;/a&gt;&lt;/div&gt;":ed.tab==="css"?".mi-banda{padding:48px 0;background:var(--bp);color:var(--btntext)}":"// roots = todas las instancias de este módulo en la página\nroots.forEach(function(el){ … });"}">${esc(d[ed.tab]||"")}</textarea>
    <details class="mod-help"><summary>Cómo marcar lo editable</summary><div><code>{{titulo}}</code> o <code>{{titulo=Texto por defecto}}</code> · <code>{{ta:texto=…}}</code> texto largo · <code>{{img:foto=URL}}</code> imagen · <code>{{url:enlace=#form}}</code> enlace · <code>{{color:fondo=#e60000}}</code> color · <code>{{html:bloque=…}}</code> HTML.<br>
      Datos de Global: <code>{{tel}}</code> <code>{{tel_href}}</code> <code>{{wa_href}}</code> <code>{{endpoint}}</code>. Tokens de marca en CSS: <code>var(--bp)</code> primario, <code>var(--ba)</code> acento, <code>var(--bink)</code> texto, <code>var(--btntext)</code>, <code>var(--fhead)</code>…<br>
      El JS solo se ejecuta en la landing exportada y en «Abrir»; recibe <code>roots</code>.</div></details>
    <div class="mod-fields"><b>Campos detectados (${F.length})</b>${F.length?F.map(f=>`<span class="tag">${esc(f.l)}</span>`).join(""):'<span class="help" style="margin:0">Aún no hay campos: marca textos con {{…}} o pulsa ✨ Detectar editables.</span>'}</div>
   </div><div class="mod-r"><div class="mod-pv-h"><span>Vista previa (sin JS)</span><button type="button" class="chipf sm" data-md="pvm">Móvil</button></div><div class="mod-pv"><iframe id="mdPv" sandbox="allow-same-origin" title="Vista previa del módulo"></iframe></div></div></div>
   <div class="mod-act">${ed.opts.sectionId?`<button class="btn sm" data-md="apply">Aplicar solo a esta sección</button>`:""}<button class="btn sm" data-md="add">${ed.opts.sectionId?"Añadir otra copia":"Añadir a la landing"}</button><button class="btn sm primary" data-md="save">${d.libId?"Guardar cambios en la biblioteca":"Guardar en la biblioteca"}</button></div></div>`;
  o.style.display="grid";const pv=document.getElementById("mdPv");pv.srcdoc=previewDoc(d);
  const sync=()=>{d.name=document.getElementById("mdName").value.trim();d.cat=document.getElementById("mdCat").value.trim();d.client=document.getElementById("mdClient").value.trim();d.scope=document.getElementById("mdScope").checked;d[ed.tab]=document.getElementById("mdCode").value;};
  let tm=null;document.getElementById("mdCode").addEventListener("input",()=>{sync();clearTimeout(tm);tm=setTimeout(()=>{pv.srcdoc=previewDoc(d);const F2=modFields(d),box=o.querySelector(".mod-fields");if(box)box.innerHTML=`<b>Campos detectados (${F2.length})</b>`+F2.map(f=>`<span class="tag">${esc(f.l)}</span>`).join("");},350);});
  document.getElementById("mdScope").addEventListener("change",()=>{sync();pv.srcdoc=previewDoc(d);});
  const fi=document.getElementById("mdFiles");fi.addEventListener("change",async()=>{for(const f of fi.files){const tx=await f.text();
      if(/\.css$/i.test(f.name))d.css=(d.css?d.css+"\n":"")+tx;else if(/\.js$/i.test(f.name))d.js=(d.js?d.js+"\n":"")+tx;
      else{const doc=new DOMParser().parseFromString(tx,"text/html");const full=/<html|<body/i.test(tx);if(full){doc.querySelectorAll("style").forEach(s=>d.css=(d.css?d.css+"\n":"")+s.textContent);doc.querySelectorAll("script:not([src])").forEach(s=>d.js=(d.js?d.js+"\n":"")+s.textContent);
          doc.querySelectorAll("script,style,link,meta,title").forEach(n=>n.remove());d.html=doc.body.innerHTML.trim();}else d.html=tx;if(!d.name)d.name=f.name.replace(/\.(html?)$/i,"");}}
    fi.value="";drawEditor();toast("Archivos cargados");});
  o.onclick=async e=>{const b=e.target.closest("[data-md],[data-mtab]");if(e.target===o||(b&&b.dataset.md==="x")){o.style.display="none";return;}if(!b)return;sync();
    if(b.dataset.mtab){ed.tab=b.dataset.mtab;drawEditor();return;}const a=b.dataset.md;
    if(a==="files")fi.click();
    else if(a==="auto"){const r=autoMark(d.html);d.html=r.html;drawEditor();toast(r.count?r.count+" elemento(s) convertidos en campos":"No he encontrado textos ni imágenes nuevos");}
    else if(a==="web")openWeb();
    else if(a==="pvm"){o.querySelector(".mod-pv").classList.toggle("m");b.classList.toggle("on");}
    else if(a==="save"){if(!d.name){document.getElementById("mdName").focus();toast("Ponle un nombre al módulo");return;}if(!String(d.html).trim()){toast("Falta el HTML");return;}b.disabled=true;const ok=await libSave(d,{client:d.client});b.disabled=false;
      if(ok){if(ed.opts.sectionId)applyTo(ed.opts.sectionId,d);drawEditor();}}
    else if(a==="add"){if(!String(d.html).trim()){toast("Falta el HTML");return;}if(!d.name)d.name="Módulo";o.style.display="none";addModule(JSON.parse(JSON.stringify(d)));}
    else if(a==="apply"){applyTo(ed.opts.sectionId,d);o.style.display="none";}};}
function applyTo(id,def){const s=state.sections.find(x=>x.id===id);if(!s)return;commit();const nd=JSON.parse(JSON.stringify(def));const type=modType(nd);delete NCM.reg[type];register(nd);
  const vals=s.props;const np=LIB[type].def();Object.keys(np).forEach(k=>{if(k!=="_def"&&vals[k]!=null&&vals[k]!==(((s.props._def&&modDefaults(s.props._def))||{})[k]))np[k]=vals[k];});
  s.type=type;s.props=np;renderPreview();renderRight();toast("Sección actualizada");}

/* ---------- interfaz: desde una web ---------- */
function openWeb(){const o=ov("modWebOv");o.innerHTML=`<div class="nc-ov-box mod-box"><div class="nc-ov-head"><b>Convertir una sección de una web en módulo</b><button class="btn sm ghost" data-mw="x">Cerrar</button></div>
   <div class="mod-web-in"><div class="fld" style="flex:1"><label>URL de la página</label><input id="mwUrl" placeholder="https://www.tuweb.es/landing"></div><button class="btn sm primary" data-mw="load">Cargar</button></div>
   <details class="mod-help"><summary>…o pega el HTML de la página (si no hay sesión o la web bloquea el acceso)</summary><div><textarea id="mwHtml" class="mod-code" style="height:110px" placeholder="Código fuente completo (Ctrl+U en el navegador → copiar)"></textarea><div class="fld"><label>URL original (para resolver imágenes y CSS)</label><input id="mwBase" placeholder="https://www.tuweb.es/"></div><button class="btn sm" data-mw="paste">Usar este HTML</button></div></details>
   <div class="help" id="mwMsg">Carga la página y haz clic en la sección que quieres. «↑ Sección contenedora» amplía la selección.</div>
   <div class="mod-web-pv"><iframe id="mwPv" sandbox="allow-same-origin" title="Página"></iframe></div>
   <div class="mod-act"><span id="mwSel" class="help" style="margin:0 auto 0 0"></span><button class="btn sm" data-mw="up" disabled>↑ Sección contenedora</button><button class="btn sm primary" data-mw="use" disabled>Usar esta sección</button></div></div>`;
  o.style.display="grid";const pv=document.getElementById("mwPv"),msg=document.getElementById("mwMsg");let sel=null,warn=[];
  const mark=el=>{const D=pv.contentDocument;D.querySelectorAll("[data-ncsel]").forEach(x=>x.removeAttribute("data-ncsel"));sel=el;if(el){el.setAttribute("data-ncsel","");const r=el.getBoundingClientRect();document.getElementById("mwSel").textContent=`<${el.tagName.toLowerCase()}${el.id?"#"+el.id:""}${el.classList.length?"."+[...el.classList].slice(0,2).join("."):""}> · ${Math.round(r.width)}×${Math.round(r.height)} px`;}
    o.querySelectorAll('[data-mw="up"],[data-mw="use"]').forEach(b=>b.disabled=!el);};
  const show=async(html,base,proxy)=>{msg.textContent="Preparando la página…";try{const p=await prepareDoc(html,base,proxy);warn=p.warn;pv.srcdoc=p.html.replace("</head>",`<style>[data-ncsel]{outline:3px solid #7c6cff!important;outline-offset:-3px;box-shadow:0 0 0 9999px rgba(20,16,40,.35)!important}*{cursor:crosshair!important}.nc-hov{outline:2px dashed #7c6cff!important;outline-offset:-2px}</style></head>`);
      pv.onload=()=>{const D=pv.contentDocument;let last=null;D.addEventListener("mouseover",e=>{if(last)last.classList.remove("nc-hov");last=e.target;if(last&&last!==D.body)last.classList.add("nc-hov");});
        D.addEventListener("click",e=>{e.preventDefault();e.stopPropagation();let t=e.target;while(t&&t.parentElement&&t.parentElement!==D.body&&t.getBoundingClientRect().height<120)t=t.parentElement;if(last)last.classList.remove("nc-hov");mark(t);},true);
        msg.textContent="Haz clic en la sección que quieres convertir."+(warn.length?" ⚠ "+warn.length+" hoja(s) de estilo no se han podido traer: la sección puede verse distinta.":"");};}
    catch(e){msg.textContent="⚠ "+e.message;}};
  o.onclick=async e=>{const b=e.target.closest("[data-mw]");if(e.target===o||(b&&b.dataset.mw==="x")){o.style.display="none";return;}if(!b)return;
    if(b.dataset.mw==="load"){const u=document.getElementById("mwUrl").value.trim();if(!/^https?:\/\//i.test(u)){toast("Escribe la URL completa (https://…)");return;}msg.textContent="Trayendo la página…";
      try{const j=await proxyGet(u);await show(j.text,j.finalUrl||u,true);}catch(err){msg.textContent="⚠ "+err.message;}}
    else if(b.dataset.mw==="paste"){const h=document.getElementById("mwHtml").value;if(!h.trim())return;await show(h,document.getElementById("mwBase").value.trim(),false);}
    else if(b.dataset.mw==="up"&&sel&&sel.parentElement&&sel.parentElement!==pv.contentDocument.body)mark(sel.parentElement);
    else if(b.dataset.mw==="use"&&sel){sel.removeAttribute("data-ncsel");pv.contentDocument.querySelectorAll(".nc-hov").forEach(x=>x.classList.remove("nc-hov"));const x=extract(sel);const m=autoMark(x.html);o.style.display="none";
      const host=(()=>{try{return new URL(document.getElementById("mwUrl").value||document.getElementById("mwBase").value).hostname.replace(/^www\./,"");}catch(err){return "";}})();
      ed.def.html=m.html;ed.def.css=x.css;ed.def.scope=true;if(!ed.def.name)ed.def.name="Sección de "+(host||"web");ed.tab="html";drawEditor();toast(m.count+" texto(s) e imagen(es) convertidos en campos. Revisa el resultado.");}};}

/* ---------- panel de bloques: «Mis módulos» ---------- */
const _rp=renderPalette;renderPalette=function(){_rp.apply(this,arguments);const p=document.getElementById("palette");if(!p||p.querySelector("#modPal"))return;
  libRows().forEach(r=>register(Object.assign(r.data.module,{libId:r.data.module.libId||r.id})));
  const ps=document.getElementById("palSearch");const q=((ps&&ps.value)||"").toLowerCase();
  const rows=libRows().filter(r=>!q||[r.nombre,r.cliente,r.data.module.cat].join(" ").toLowerCase().includes(q));
  const html=`<div id="modPal"><div class="paneltitle team-pt">Mis módulos${team.local?' <span class="tag">local</span>':''}<button class="mini" id="modNew" title="Nuevo módulo">＋</button></div>
    ${rows.length?`<div class="cat">${rows.map(r=>`<div class="chip team-chip mod-chip" draggable="true" data-mod="${esc(r.id)}" title="${esc([r.data.module.cat,r.cliente,r.created_by].filter(Boolean).join(" · "))}"><span class="ico">◆</span> ${esc(r.nombre)}${r.data.module.cat||r.cliente?`<small>${esc([r.data.module.cat,r.cliente].filter(Boolean).join(" · "))}</small>`:""}<button class="k" data-modedit="${esc(r.id)}" title="Editar">✎</button><button class="k" data-moddel="${esc(r.id)}" title="Borrar para el equipo">×</button></div>`).join("")}</div>`
      :`<div class="help" style="margin:0 0 10px">${q?"Ningún módulo coincide.":"Sube tus desarrollos (HTML, CSS y JS) o convierte una sección de una web. Pulsa ＋."}</div>`}</div>`;
  p.insertAdjacentHTML("afterbegin",html);
  document.getElementById("modNew").addEventListener("click",()=>openEditor());
  p.querySelectorAll("[data-mod]").forEach(c=>{const r=libRows().find(x=>x.id===c.dataset.mod);c.addEventListener("click",e=>{if(e.target.closest(".k"))return;if(r)addModule(Object.assign({},r.data.module,{libId:r.id}));});
    c.addEventListener("dragstart",()=>{window.modDrag=c.dataset.mod;dragType=null;showDrop(true);});c.addEventListener("dragend",()=>showDrop(false));});
  p.querySelectorAll("[data-modedit]").forEach(b=>b.addEventListener("click",e=>{e.stopPropagation();const r=libRows().find(x=>x.id===b.dataset.modedit);if(r)openEditor(Object.assign({},r.data.module,{libId:r.id,client:r.cliente||r.data.module.client||""}));}));
  p.querySelectorAll("[data-moddel]").forEach(b=>b.addEventListener("click",e=>{e.stopPropagation();teamDelete(b.dataset.moddel);}));};
const _dr=dropOnIndex;dropOnIndex=function(t){if(window.modDrag){const id=window.modDrag;window.modDrag=null;const r=libRows().find(x=>x.id===id);if(r)addModule(Object.assign({},r.data.module,{libId:r.id}),t);return;}return _dr.apply(this,arguments);};
/* panel derecho: editar código / actualizar a la versión de la biblioteca */
const _rr=renderRight;renderRight=function(){_rr.apply(this,arguments);const s=state.sections.find(x=>x.id===state.selected);if(!s||!/^mod_/.test(s.type)||!s.props._def)return;const cf=document.getElementById("contentFields");if(!cf)return;
  const d=s.props._def,lib=d.libId&&libRows().find(r=>r.id===d.libId),newer=lib&&(lib.data.module.v||0)>(d.v||0);
  cf.insertAdjacentHTML("beforeend",`<div class="mod-side">${newer?`<div class="note">Hay una versión más nueva de este módulo en la biblioteca.</div><button class="btn sm primary" id="modUpd">↻ Actualizar a la última versión</button>`:""}
    <button class="btn sm" id="modEdit">✎ Editar el código del módulo</button><div class="help">${String(d.js||"").trim()?"Este módulo tiene JS: se ejecuta en la landing exportada y en «Abrir», no en el editor.":"Módulo propio"}${d.libId?"":" · Aún no está en la biblioteca."}</div></div>`);
  document.getElementById("modEdit").addEventListener("click",()=>openEditor(d,{sectionId:s.id}));
  const u=document.getElementById("modUpd");if(u)u.addEventListener("click",()=>applyTo(s.id,Object.assign({},lib.data.module,{libId:lib.id})));};
(function(){const css=document.createElement("style");css.textContent=`.mod-box{width:1180px;max-width:96vw;max-height:92vh}.mod-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:16px}@media (max-width:900px){.mod-grid{grid-template-columns:1fr}}
 .mod-src{display:flex;flex-wrap:wrap;gap:6px;margin:4px 0 10px}.mod-tabs{display:flex;align-items:center;gap:6px;margin-bottom:6px}.mod-scope{margin-left:auto;font-size:12px;display:flex;gap:6px;align-items:center;color:var(--muted,#8a93a3)}
 .mod-code{width:100%;height:300px;font:12.5px/1.5 ui-monospace,SFMono-Regular,Menlo,monospace;background:var(--bg2,#0f1117);color:var(--text,#e6e8ee);border:1px solid var(--line);border-radius:10px;padding:10px;resize:vertical;tab-size:2;white-space:pre-wrap;word-break:break-all}
 .mod-help{font-size:12px;margin:8px 0;color:var(--muted,#8a93a3)}.mod-help code{font-size:11.5px}.mod-help>div{margin-top:6px;line-height:1.7}.mod-fields{display:flex;flex-wrap:wrap;gap:6px;align-items:center;font-size:12px;margin-top:8px}
 .mod-r{display:flex;flex-direction:column}.mod-pv-h{display:flex;justify-content:space-between;align-items:center;font-size:12px;color:var(--muted,#8a93a3);margin-bottom:6px}.mod-pv{flex:1;min-height:420px;border:1px solid var(--line);border-radius:10px;overflow:hidden;background:#fff;display:flex;justify-content:center}
 .mod-pv iframe{border:0;width:100%;height:100%;min-height:420px}.mod-pv.m iframe{width:390px;border-left:1px solid #ddd;border-right:1px solid #ddd}
 .mod-act{display:flex;justify-content:flex-end;align-items:center;gap:8px;margin-top:12px}.mod-web-in{display:flex;gap:8px;align-items:flex-end}.mod-web-pv{height:58vh;border:1px solid var(--line);border-radius:10px;overflow:hidden;background:#fff;margin-top:8px}.mod-web-pv iframe{width:100%;height:100%;border:0}
 .mod-side{border-top:1px solid var(--line);margin-top:12px;padding-top:12px;display:flex;flex-direction:column;gap:8px}.mod-chip .k+.k{margin-left:2px}`;document.head.appendChild(css);})();
NCM.openEditor=openEditor;NCM.add=addModule;NCM.libSave=libSave;
})();

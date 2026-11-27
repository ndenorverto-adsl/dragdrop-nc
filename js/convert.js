/* ---------- v6.1 · POPUPS Y BARRAS · SCRIPTS Y PÍXELES ----------
   Funciones de las herramientas de landings de referencia (popups y sticky bars con disparadores, gestor de scripts).
   1 · Popups y barras: popup centrado, barra arriba, barra abajo o aviso en la esquina (slide-in).
       Disparadores: al entrar, tras X segundos, al hacer scroll X %, intención de salida (en móvil: subir rápido tras
       leer) o tras X segundos sin actividad. Frecuencia (siempre, una vez por sesión, una vez cada N días),
       dispositivo, filtro por UTM/ref y «no mostrar a quien ya ha enviado un formulario».
       Contenido: etiqueta, título, texto, imagen y acción (formulario de teléfono, llamar, WhatsApp, ir al formulario o URL).
       Accesible (diálogo con foco, Esc, devuelve el foco) y medido: overlay_view, overlay_click, overlay_close.
   2 · Scripts y píxeles: código propio en <head>, al abrir <body> o al final, activable, y condicionado al consentimiento
       (analítica o publicidad) del banner propio; con CMP externa sale como type="text/plain" con su categoría.
   En el editor nada se dispara solo: «Ver en el lienzo» enseña el popup y los scripts no se ejecutan. */
Object.assign(state.settings,{overlays:[],scripts:[]});
["overlays","scripts"].forEach(k=>{SETTINGS_DEFAULT[k]=[];});
const OV_KINDS=[["popup","Popup centrado"],["bar-top","Barra arriba"],["bar-bottom","Barra abajo"],["slide","Aviso en la esquina"]];
const OV_TRIG=[["load","Al entrar"],["delay","Tras unos segundos"],["scroll","Al hacer scroll"],["exit","Intención de salida"],["idle","Sin actividad"]];
const OV_FREQ=[["session","Una vez por sesión"],["days","Una vez cada N días"],["always","En cada visita"]];
const OV_ACT=[["form","Formulario de teléfono"],["call","Llamar"],["wa","WhatsApp"],["scroll","Ir al formulario de la página"],["url","Enlace"],["none","Solo informativo"]];
const OV_PRESETS={
  exit:{name:"Popup de salida",kind:"popup",trigger:"exit",eyebrow:"Antes de irte",title:"¿Te llamamos con tu precio?",text:"Déjanos tu teléfono y te lo damos en una llamada corta. Sin compromiso.",act:"form",btn:"Llamadme gratis",no:"No, gracias"},
  delay:{name:"Popup a los 20 s",kind:"popup",trigger:"delay",s:"20",eyebrow:"",title:"¿Necesitas ayuda para elegir?",text:"Un asesor te explica las opciones en 2 minutos.",act:"call",btn:"Llamar ahora",no:"Seguir mirando"},
  bar:{name:"Barra de oferta",kind:"bar-top",trigger:"load",title:"{{TEXTO_OFERTA}}",text:"",act:"scroll",btn:"Lo quiero",freq:"always"},
  slide:{name:"Aviso al 50 %",kind:"slide",trigger:"scroll",pct:"50",eyebrow:"¿Dudas?",title:"Te llamamos sin compromiso",text:"",act:"form",btn:"Llamadme"},
  wa:{name:"Barra de WhatsApp en móvil",kind:"bar-bottom",trigger:"scroll",pct:"25",device:"mob",title:"¿Prefieres escribirnos?",text:"",act:"wa",btn:"WhatsApp",freq:"always"}};
function ovNew(p){return Object.assign({id:"o"+Math.random().toString(36).slice(2,8),on:true,name:"Nuevo",kind:"popup",trigger:"delay",s:"10",pct:"50",freq:"session",days:"7",device:"all",utm:"",hideConv:true,eyebrow:"",title:"Título",text:"",img:"",act:"form",btn:"Quiero información",url:"",no:"",side:"right"},JSON.parse(JSON.stringify(p||{})));}
const ovOn=()=>(state.settings.overlays||[]).filter(o=>o&&o.on);

function ovCTA(o){const b=esc(o.btn||"Quiero información");
  switch(o.act){case "form":return v4PhoneForm({btn:o.btn||"Llamadme",btnCls:"da-go",arrow:true,cls:"ncov-form"});
    case "call":return `${v4Tel()} class="da-btn pri ncov-cta">${I_TEL()} ${b}</a>`;
    case "wa":return `${v4Wa()} class="da-btn pri wa ncov-cta">${I_WA()} ${b}</a>`;
    case "url":return `<a href="${esc(o.url||"#")}" class="da-btn pri ncov-cta">${b}</a>`;
    case "scroll":return `<a href="#form" data-cta="form" class="da-btn pri ncov-cta" data-ov-close>${b} ${I_GO()}</a>`;}return "";}
function ovHTML(o){const cfg={id:o.id,n:o.name,t:o.trigger,s:Math.max(0,+o.s||0),p:Math.min(100,Math.max(1,+o.pct||50)),f:o.freq,d:Math.max(1,+o.days||7),dev:o.device,u:String(o.utm||"").toLowerCase().trim(),hc:!!o.hideConv};
  const pop=o.kind==="popup",bar=/^bar/.test(o.kind);const tid="ncovT-"+o.id;
  return `<div class="ncov ncov-${o.kind}${o.kind==="slide"?" ncov-"+(o.side==="left"?"l":"r"):""}" id="ncov-${o.id}" data-ov="${esc(JSON.stringify(cfg))}" hidden ${pop?`role="dialog" aria-modal="true"`:`role="region"`} aria-labelledby="${tid}">
<div class="ncov-box">${bar?"":`<button type="button" class="ncov-x" data-ov-close aria-label="Cerrar">×</button>`}${o.img&&!bar?`<img class="ncov-img" src="${esc(o.img)}" alt="" loading="lazy">`:""}
<div class="ncov-c">${o.eyebrow&&!bar?`<p class="ncov-k">${esc(o.eyebrow)}</p>`:""}<${bar?"p":"h2"} class="ncov-t" id="${tid}">${esc(o.title)}</${bar?"p":"h2"}>${o.text?`<p class="ncov-p">${esc(o.text)}</p>`:""}
${o.act==="none"?"":`<div class="ncov-a">${ovCTA(o)}</div>`}${pop&&o.no?`<button type="button" class="ncov-no" data-ov-close>${esc(o.no)}</button>`:""}</div>${bar?`<button type="button" class="ncov-x" data-ov-close aria-label="Cerrar">×</button>`:""}</div></div>`;}
const OV_CSS=`
.ncov{position:fixed;z-index:1070;font-family:var(--fbody);color:var(--bink)}
.ncov[hidden]{display:none!important}
.ncov .ncov-box{position:relative;background:#fff;box-shadow:0 24px 70px -20px rgba(0,0,0,.45)}
.ncov-popup{inset:0;display:grid;place-items:center;padding:16px;background:rgba(10,12,18,.55);opacity:0;transition:opacity .2s}
.ncov-popup.on{opacity:1}.ncov-popup .ncov-box{width:min(520px,100%);max-height:calc(100vh - 32px);overflow:auto;border-radius:var(--cardr,18px);transform:translateY(12px) scale(.98);transition:transform .25s cubic-bezier(.2,.7,.2,1)}
.ncov-popup.on .ncov-box{transform:none}.ncov-popup .ncov-c{padding:28px 28px 24px}
.ncov-img{display:block;width:100%;aspect-ratio:16/8;object-fit:cover}
.ncov-k{margin:0 0 6px;font-size:12.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--bpt,var(--bp))}
.ncov-t{margin:0 0 8px;font:800 clamp(22px,3.2vw,28px)/1.15 var(--fhead);letter-spacing:-.02em;color:var(--bink)}
.ncov-p{margin:0 0 16px;color:var(--bmuted);font-size:15.5px;line-height:1.55}
.ncov-a .da-btn,.ncov-a .ncov-cta{display:inline-flex;justify-content:center;width:100%}.ncov-a form{margin:0}
.ncov-x{position:absolute;top:8px;right:8px;width:36px;height:36px;border:0;border-radius:50%;background:rgba(0,0,0,.06);color:inherit;font-size:22px;line-height:1;cursor:pointer;z-index:2}
.ncov-x:hover{background:rgba(0,0,0,.12)}.ncov-x:focus-visible,.ncov-no:focus-visible{outline:2px solid var(--bp);outline-offset:2px}
.ncov-no{display:block;margin:12px auto 0;background:none;border:0;color:var(--bmuted);font-size:13.5px;text-decoration:underline;cursor:pointer}
.ncov-bar-top,.ncov-bar-bottom{left:0;right:0;transition:transform .3s cubic-bezier(.2,.7,.2,1)}
.ncov-bar-top{top:0;transform:translateY(-100%)}.ncov-bar-bottom{bottom:0;transform:translateY(100%)}.ncov-bar-top.on,.ncov-bar-bottom.on{transform:none}
.ncov-bar-top .ncov-box,.ncov-bar-bottom .ncov-box{background:var(--bink);color:#fff;box-shadow:0 6px 24px rgba(0,0,0,.18);padding:10px 52px 10px 16px}
.ncov-bar-top .ncov-c,.ncov-bar-bottom .ncov-c{display:flex;align-items:center;justify-content:center;gap:8px 16px;flex-wrap:wrap;max-width:1140px;margin:0 auto;text-align:center}
.ncov-bar-top .ncov-t,.ncov-bar-bottom .ncov-t{margin:0;font:700 15px/1.35 var(--fbody);letter-spacing:0;color:#fff}.ncov-bar-top .ncov-p,.ncov-bar-bottom .ncov-p{margin:0;color:rgba(255,255,255,.8);font-size:14px}
.ncov-bar-top .ncov-a .da-btn,.ncov-bar-bottom .ncov-a .da-btn{width:auto;padding:8px 16px;font-size:14px}.ncov-bar-top form,.ncov-bar-bottom form{display:none}
.ncov-bar-top .ncov-x,.ncov-bar-bottom .ncov-x{top:50%;transform:translateY(-50%);background:rgba(255,255,255,.14);color:#fff;width:32px;height:32px;font-size:18px}
.ncov-slide{bottom:16px;width:min(360px,calc(100vw - 32px));opacity:0;transform:translateY(20px);transition:opacity .25s,transform .3s cubic-bezier(.2,.7,.2,1)}
.ncov-slide.ncov-r{right:16px}.ncov-slide.ncov-l{left:16px}.ncov-slide.on{opacity:1;transform:none}
.ncov-slide .ncov-box{border-radius:var(--cardr,16px);overflow:hidden;border:1px solid rgba(0,0,0,.06)}.ncov-slide .ncov-c{padding:18px 18px 16px}.ncov-slide .ncov-t{font-size:19px;padding-right:28px}
body.ncov-lock{overflow:hidden}
@media (max-width:767px){.ncov-slide{bottom:calc(76px + env(safe-area-inset-bottom))}.ncov-bar-bottom{bottom:env(safe-area-inset-bottom)}}
@media (prefers-reduced-motion:reduce){.ncov,.ncov .ncov-box{transition:none!important}}`;
const OV_JS=`(function(){var W=window,D=document,B=D.body,prev=B.hasAttribute('data-ncov-prev');W.dataLayer=W.dataLayer||[];function push(o){try{W.dataLayer.push(o);}catch(e){}}
var conv=false;try{conv=sessionStorage.getItem('ncov_conv')==='1';}catch(e){}
D.addEventListener('submit',function(e){if(e.target&&e.target.tagName==='FORM'){conv=true;try{sessionStorage.setItem('ncov_conv','1');}catch(x){}}},true);
var Q={};try{new URLSearchParams(location.search).forEach(function(v,k){Q[k.toLowerCase()]=String(v).toLowerCase();});}catch(e){}
var mob=W.matchMedia&&W.matchMedia('(max-width:767px)').matches,cur=null,last=null;
var FOC='a[href],button:not([disabled]),input:not([type=hidden]),select,textarea';
function cfg(el){try{return JSON.parse(el.getAttribute('data-ov'));}catch(e){return {};}}
function show(el,force){var c=cfg(el),pop=el.classList.contains('ncov-popup');if(!el.hidden)return;if(pop&&cur&&cur!==el)return;
 if(!force){if(c.hc&&conv)return;if(c.f==='session'){try{if(sessionStorage.getItem('ncov_'+c.id))return;sessionStorage.setItem('ncov_'+c.id,'1');}catch(e){}}
  if(c.f==='days'){try{var t=+localStorage.getItem('ncov_'+c.id)||0;if(Date.now()-t<c.d*864e5)return;localStorage.setItem('ncov_'+c.id,String(Date.now()));}catch(e){}}}
 el.hidden=false;void el.offsetWidth;el.classList.add('on');
 if(pop){cur=el;last=D.activeElement;B.classList.add('ncov-lock');var f=el.querySelector('input:not([type=hidden])')||el.querySelector(FOC);if(f)setTimeout(function(){try{f.focus({preventScroll:true});}catch(e){}},60);}
 if(el.classList.contains('ncov-bar-top')){B.style.paddingTop=el.offsetHeight+'px';}
 if(!force)push({event:'overlay_view',overlay_id:c.id,overlay_name:c.n});}
function hide(el,why){if(el.hidden)return;var c=cfg(el);if(el.classList.contains('ncov-bar-top'))B.style.paddingTop='';el.classList.remove('on');setTimeout(function(){el.hidden=true;},260);
 if(el===cur){cur=null;B.classList.remove('ncov-lock');if(last&&last.focus)try{last.focus({preventScroll:true});}catch(e){}}
 if(why&&!prev)push({event:'overlay_close',overlay_id:c.id,overlay_name:c.n,close_reason:why});}
var all=[].slice.call(D.querySelectorAll('[data-ov]'));
all.forEach(function(el){var c=cfg(el);
 el.addEventListener('click',function(e){if(e.target===el&&el.classList.contains('ncov-popup')){hide(el,'backdrop');return;}var x=e.target.closest('[data-ov-close]');if(x){hide(el,x.classList.contains('ncov-cta')?'cta':'close');}
  var a=e.target.closest('a,button[type=submit]');if(a&&!a.hasAttribute('data-ov-close')&&!prev)push({event:'overlay_click',overlay_id:c.id,overlay_name:c.n});});
 el.addEventListener('submit',function(){setTimeout(function(){hide(el,'submit');},2600);});
 el.addEventListener('keydown',function(e){if(e.key==='Escape'){hide(el,'esc');return;}if(e.key==='Tab'&&el===cur){var L=[].slice.call(el.querySelectorAll(FOC)).filter(function(n){return n.offsetParent!==null;});if(!L.length)return;var a=L[0],z=L[L.length-1];if(e.shiftKey&&D.activeElement===a){e.preventDefault();z.focus();}else if(!e.shiftKey&&D.activeElement===z){e.preventDefault();a.focus();}}});
 if(prev)return;
 if(c.dev==='mob'&&!mob||c.dev==='desk'&&mob)return;
 if(c.u){var ok=['utm_source','utm_medium','utm_campaign','utm_term','ref','gclid'].some(function(k){return Q[k]&&(c.u.split(',').some(function(w){w=w.trim();return w&&(k==='gclid'?w==='google':Q[k].indexOf(w)>-1);}));});if(!ok)return;}
 var go=function(){show(el);};
 if(c.t==='load')setTimeout(go,700);
 else if(c.t==='delay')setTimeout(go,Math.max(1,c.s)*1000);
 else if(c.t==='scroll'){var sc=function(){var h=D.documentElement.scrollHeight-innerHeight;if(h>0&&scrollY/h*100>=c.p){W.removeEventListener('scroll',sc);go();}};W.addEventListener('scroll',sc,{passive:true});}
 else if(c.t==='idle'){var tm=null,rs=function(){clearTimeout(tm);tm=setTimeout(go,Math.max(3,c.s||15)*1000);};['scroll','mousemove','keydown','touchstart'].forEach(function(ev){W.addEventListener(ev,rs,{passive:true});});rs();}
 else if(c.t==='exit'){var armed=false;setTimeout(function(){armed=true;},4000);
  if(!mob)D.addEventListener('mouseout',function(e){if(armed&&!e.relatedTarget&&e.clientY<=0)go();});
  else{var maxY=0,lastY=scrollY,lastT=Date.now();W.addEventListener('scroll',function(){var y=scrollY,t=Date.now();maxY=Math.max(maxY,y);var v=(lastY-y)/Math.max(1,t-lastT);if(armed&&maxY>innerHeight*1.2&&v>1.2&&y<maxY-innerHeight*.6)go();lastY=y;lastT=t;},{passive:true});}}});
W.addEventListener('message',function(e){var d=e.data;if(!d||!prev)return;if(d.nc==='ovshow'){all.forEach(function(x){if(x.id!=='ncov-'+d.id){x.classList.remove('on');x.hidden=true;}});cur=null;var el=D.getElementById('ncov-'+d.id);if(el){el.hidden=true;show(el,true);}}
 if(d.nc==='ovhide')all.forEach(function(x){x.classList.remove('on');x.hidden=true;cur=null;B.classList.remove('ncov-lock');});});})();`;

/* ===== Scripts ===== */
function scNew(p){return Object.assign({id:"c"+Math.random().toString(36).slice(2,8),on:true,name:"Nuevo script",place:"head",consent:"a",code:""},p||{});}
const SC_PLACE=[["head","En <head>"],["start","Al abrir <body>"],["end","Al final de <body>"]];
const SC_CONS=[["a","Tras aceptar analítica"],["m","Tras aceptar publicidad"],["none","Siempre (necesario)"]];
function scCode(s){const st=state.settings,code=String(s.code||"").trim();if(!code)return "";
  if(s.consent==="none")return `<!-- ${esc(s.name)} -->\n${code}`;
  if(st.consent==="banner")return `<template data-ncs="${s.consent==="m"?"m":"a"}" data-name="${esc(s.name)}">${code}</template>`;
  /* CMP externa: los scripts se marcan como texto con su categoría para que la CMP los active */
  const cat=s.consent==="m"?"marketing":"statistics";
  return `<!-- ${esc(s.name)} (lo activa la CMP: ${cat}) -->\n`+code.replace(/<script(?![^>]*\btype=)([^>]*)>/gi,`<script type="text/plain" data-cookieconsent="${cat}" data-category="${s.consent==="m"?"marketing":"analytics"}"$1>`);}
const SC_LOADER=`<script>(function(){var D=document,W=window;function ok(k){try{var c=JSON.parse(localStorage.getItem('nc_consent')||'null');return !!(c&&c.v===1&&(Date.now()-c.ts)<34e9&&(k==='m'?c.m:c.a));}catch(e){return false;}}
function run(){[].forEach.call(D.querySelectorAll('template[data-ncs]'),function(t){if(t.getAttribute('data-done')||!ok(t.getAttribute('data-ncs')))return;t.setAttribute('data-done','1');var f=t.content.cloneNode(true);
 [].forEach.call(f.querySelectorAll('script'),function(s){var n=D.createElement('script');for(var i=0;i<s.attributes.length;i++)n.setAttribute(s.attributes[i].name,s.attributes[i].value);n.text=s.textContent;s.parentNode.replaceChild(n,s);});
 var host=t.parentNode===D.head?D.head:D.body;host.appendChild(f);});}
run();var ck=D.getElementById('ncCookies');if(ck&&W.MutationObserver)new MutationObserver(run).observe(ck,{attributes:true,attributeFilter:['hidden']});})();<\/script>`;

/* ===== Inyección en el documento ===== */
(function(){const _bd=buildDoc;buildDoc=function(forExport){let h=_bd.apply(this,arguments);const st=state.settings;
  const O=ovOn();
  if(O.length){h=h.replace("</head>",`<style id="ncov-css">${OV_CSS}</style></head>`);
    if(!forExport)h=h.replace(/<body([^>]*)>/,"<body$1 data-ncov-prev>");
    const block=O.map(ovHTML).join("")+`<script>${OV_JS}<\/script>`;const i=h.lastIndexOf("</body>");h=h.slice(0,i)+block+h.slice(i);}
  if(forExport){const S=(st.scripts||[]).filter(s=>s&&s.on&&String(s.code||"").trim());
    if(S.length){const by=p=>S.filter(s=>s.place===p).map(scCode).filter(Boolean).join("\n");const hd=by("head"),bs=by("start"),be=by("end");
      if(hd)h=h.replace("</head>",hd+"\n</head>");if(bs)h=h.replace(/<body([^>]*)>/,m=>m+"\n"+bs);
      const gated=st.consent==="banner"&&S.some(s=>s.consent!=="none");const tail=(be?be+"\n":"")+(gated?SC_LOADER:"");
      if(tail){const i=h.lastIndexOf("</body>");h=h.slice(0,i)+tail+"\n"+h.slice(i);}}}
  return h;};})();

/* ===== Panel: Popups y barras ===== */
let OVSEL=null;
function ovModal(){let ov=document.getElementById("ncOvMgr");if(!ov){ov=document.createElement("div");ov.id="ncOvMgr";ov.className="nc-ov nc6-ov";document.body.appendChild(ov);
    ov.addEventListener("click",e=>{if(e.target===ov||e.target.closest("[data-om=close]")){ov.style.display="none";ovPv("ovhide");return;}const a=e.target.closest("[data-om]");if(!a)return;ovAct(a.dataset.om,a.dataset.v);});
    ov.addEventListener("input",e=>{const k=e.target.dataset.of;if(!k)return;const o=ovCur();if(!o)return;commitDebounced();o[k]=e.target.type==="checkbox"?e.target.checked:e.target.value;
      if(k==="name"){const r=ov.querySelector(`.om-it.on b`);if(r)r.textContent=o.name;}if(/^(kind|trigger|act|freq)$/.test(k))ovRender();ovRefresh();});
    document.addEventListener("keydown",e=>{if(e.key==="Escape"&&ov.style.display==="grid"){ov.style.display="none";ovPv("ovhide");}});}
  const L=state.settings.overlays;if(!OVSEL&&L[0])OVSEL=L[0].id;ovRender();ov.style.display="grid";const bk=document.getElementById("ncOvBack");if(bk)bk.hidden=true;}
const ovCur=()=>(state.settings.overlays||[]).find(o=>o.id===OVSEL);
function ovPv(nc,id){try{document.getElementById("pv").contentWindow.postMessage({nc,id},"*");}catch(e){}}
let ovT=null;function ovRefresh(){clearTimeout(ovT);ovT=setTimeout(()=>{renderPreview();const f=document.getElementById("pv");const o=ovCur();if(f&&o&&o.on)f.addEventListener("load",()=>setTimeout(()=>ovPv("ovshow",o.id),120),{once:true});},350);}
function ovSum(o){const t={load:"al entrar",delay:`a los ${o.s||0} s`,scroll:`al ${o.pct||50} % de scroll`,exit:"al ir a salir",idle:`tras ${o.s||15} s sin actividad`}[o.trigger];const d={all:"",mob:" · móvil",desk:" · escritorio"}[o.device||"all"];return (OV_KINDS.find(k=>k[0]===o.kind)||[])[1]+" · "+t+d;}
function ovRender(){const ov=document.getElementById("ncOvMgr");const L=state.settings.overlays;const o=ovCur();
  const S=(k,l,opts,h)=>`<div class="fld"><label>${l}</label><select data-of="${k}">${opts.map(([v,t])=>`<option value="${v}" ${String(o[k])===v?"selected":""}>${t}</option>`).join("")}</select>${h?`<div class="help">${h}</div>`:""}</div>`;
  const I=(k,l,ph,t)=>`<div class="fld"><label>${l}</label>${t==="ta"?`<textarea data-of="${k}" rows="2" placeholder="${esc(ph||"")}">${esc(o[k]||"")}</textarea>`:`<input data-of="${k}" value="${esc(o[k]||"")}" placeholder="${esc(ph||"")}"${t?` type="${t}"`:""}>`}</div>`;
  ov.innerHTML=`<div class="nc-ov-box om-box" role="dialog" aria-modal="true" aria-labelledby="omT"><div class="nc-ov-head"><div><b id="omT">Popups y barras</b><div class="help">Popups, barras y avisos con su disparador, frecuencia y público. En el editor no saltan solos: usa «Ver en el lienzo».</div></div><button class="btn sm ghost" data-om="close">Cerrar</button></div>
   <div class="om-grid"><aside><div class="om-list">${L.length?L.map(x=>`<button type="button" class="om-it${x.id===OVSEL?" on":""}${x.on?"":" off"}" data-om="sel" data-v="${x.id}"><b>${esc(x.name)}</b><small>${esc(ovSum(x))}${x.on?"":" · desactivado"}</small></button>`).join(""):`<div class="empty">Aún no hay ninguno.</div>`}</div>
     <div class="om-new"><div class="tbm-h">Añadir</div>${[["exit","Popup de salida"],["delay","Popup con retraso"],["slide","Aviso al hacer scroll"],["bar","Barra de oferta arriba"],["wa","Barra de WhatsApp (móvil)"],["blank","En blanco"]].map(([k,t])=>`<button type="button" class="btn sm ghost" data-om="add" data-v="${k}">+ ${t}</button>`).join("")}</div></aside>
   <section>${o?`<div class="om-top"><div class="fld inline"><label>Activo</label><input type="checkbox" data-of="on" ${o.on?"checked":""}></div><span class="om-acts"><button type="button" class="btn sm" data-om="show">Ver en el lienzo</button><button type="button" class="btn sm ghost" data-om="dup">Duplicar</button><button type="button" class="btn sm ghost" data-om="del">Eliminar</button></span></div>
     ${I("name","Nombre interno (sale en los eventos de medición)")}
     <div class="om-cols"><div><h4>Formato y contenido</h4>${S("kind","Formato",OV_KINDS)}${o.kind==="slide"?S("side","Esquina",[["right","Derecha"],["left","Izquierda"]]):""}
       ${/^bar/.test(o.kind)?"":I("eyebrow","Etiqueta (opcional)")}${I("title","Título","")}${I("text","Texto (opcional)","","ta")}${/^bar/.test(o.kind)?"":I("img","Imagen (URL, opcional)","https://…")}
       ${S("act","Acción",OV_ACT,/^bar/.test(o.kind)&&o.act==="form"?"En las barras el formulario no cabe: usa llamar, WhatsApp o ir al formulario.":"")}${o.act!=="none"?I("btn","Texto del botón"):""}${o.act==="url"?I("url","URL","https://…"):""}${o.kind==="popup"?I("no","Texto para cerrar (opcional)","No, gracias"):""}</div>
     <div><h4>Cuándo y a quién</h4>${S("trigger","Disparador",OV_TRIG,o.trigger==="exit"?"En escritorio, al llevar el ratón fuera de la página; en móvil, al subir rápido después de leer.":"")}
       ${o.trigger==="delay"||o.trigger==="idle"?I("s",o.trigger==="idle"?"Segundos sin actividad":"Segundos","10","number"):""}${o.trigger==="scroll"?I("pct","Porcentaje de la página","50","number"):""}
       ${S("freq","Frecuencia",OV_FREQ)}${o.freq==="days"?I("days","Días","7","number"):""}
       ${S("device","Dispositivo",[["all","Móvil y escritorio"],["mob","Solo móvil"],["desk","Solo escritorio"]])}
       ${I("utm","Solo si la URL contiene (opcional)","p. ej. facebook, remarketing")}<div class="help om-h">Se busca en utm_source, utm_medium, utm_campaign, utm_term y ref. Varias palabras separadas por comas; «google» también vale para gclid.</div>
       <div class="fld inline"><label>No mostrar a quien ya ha enviado un formulario</label><input type="checkbox" data-of="hideConv" ${o.hideConv?"checked":""}></div>
       <div class="help">Medición: <code>overlay_view</code>, <code>overlay_click</code> y <code>overlay_close</code> en el dataLayer, con <code>overlay_name</code>.</div></div></div>`:`<div class="empty">Añade un popup o una barra desde la izquierda.</div>`}</section></div></div>`;}
function ovAct(a,v){const L=state.settings.overlays;
  if(a==="sel"){OVSEL=v;ovRender();const o=ovCur();if(o&&o.on)ovPv("ovshow",o.id);return;}
  if(a==="add"){commit();const o=ovNew(OV_PRESETS[v]||{name:"Nuevo"});L.push(o);OVSEL=o.id;ovRender();ovRefresh();return;}
  const o=ovCur();if(!o)return;
  if(a==="show"){if(!o.on){commit();o.on=true;ovRender();}
    /* el gestor se aparta para ver el popup en el lienzo; un botón flotante lo vuelve a abrir */
    document.getElementById("ncOvMgr").style.display="none";ovPv("ovshow",o.id);
    let back=document.getElementById("ncOvBack");if(!back){back=document.createElement("button");back.id="ncOvBack";back.type="button";back.className="btn primary";back.addEventListener("click",()=>{back.hidden=true;ovModal();});document.body.appendChild(back);}
    back.textContent="← Volver a «"+o.name+"»";back.hidden=false;return;}
  if(a==="dup"){commit();const n=ovNew(Object.assign({},o,{id:undefined,name:o.name+" (copia)"}));n.id="o"+Math.random().toString(36).slice(2,8);L.splice(L.indexOf(o)+1,0,n);OVSEL=n.id;ovRender();ovRefresh();return;}
  if(a==="del"){if(!confirm("¿Eliminar «"+o.name+"»?"))return;commit();L.splice(L.indexOf(o),1);OVSEL=L[0]?L[0].id:null;ovRender();ovPv("ovhide");renderPreview();}}

/* ===== Panel: Scripts y píxeles ===== */
function scModal(){let ov=document.getElementById("ncScMgr");if(!ov){ov=document.createElement("div");ov.id="ncScMgr";ov.className="nc-ov nc6-ov";document.body.appendChild(ov);
    ov.addEventListener("click",e=>{if(e.target===ov||e.target.closest("[data-sm=close]")){ov.style.display="none";return;}const a=e.target.closest("[data-sm]");if(!a)return;const L=state.settings.scripts;const i=+a.dataset.i;
      if(a.dataset.sm==="add"){commit();L.push(scNew(SC_TPL[a.dataset.v]||{}));scRender();}
      else if(a.dataset.sm==="del"&&L[i]&&confirm("¿Eliminar «"+L[i].name+"»?")){commit();L.splice(i,1);scRender();}
      else if(a.dataset.sm==="up"&&i>0){commit();[L[i-1],L[i]]=[L[i],L[i-1]];scRender();}});
    ov.addEventListener("input",e=>{const k=e.target.dataset.sf;if(!k)return;const s=state.settings.scripts[+e.target.closest("[data-si]").dataset.si];if(!s)return;commitDebounced();s[k]=e.target.type==="checkbox"?e.target.checked:e.target.value;if(k==="code")scWarn(e.target.closest("[data-si]"),s);});
    document.addEventListener("keydown",e=>{if(e.key==="Escape"&&ov.style.display==="grid")ov.style.display="none";});}
  scRender();ov.style.display="grid";}
const SC_TPL={meta:{name:"Píxel de Meta",place:"head",consent:"m",code:"<!-- Pega aquí el código base del píxel de Meta -->"},
  tiktok:{name:"Píxel de TikTok",place:"head",consent:"m",code:"<!-- Pega aquí el código del píxel de TikTok -->"},
  hotjar:{name:"Hotjar / Clarity",place:"head",consent:"a",code:"<!-- Pega aquí el código de Hotjar o Microsoft Clarity -->"},
  chat:{name:"Chat en vivo",place:"end",consent:"none",code:"<!-- Pega aquí el widget del chat -->"},blank:{}};
function scWarn(box,s){const w=box.querySelector(".sm-w");if(!w)return;const c=String(s.code||"");const m=[];
  if(/googletagmanager\.com\/gtm\.js|GTM-[A-Z0-9]{4,}/.test(c))m.push("Parece GTM: la landing ya carga el GTM de Global; duplicarlo mide dos veces.");
  if(/<script[^>]*src=["']?http:\/\//i.test(c))m.push("Carga un script por http: el navegador lo bloqueará en una web https.");
  if(c&&!/[<]/.test(c))m.push("No parece HTML: los scripts van dentro de <script>…</script>.");
  if(/<\/?(html|head|body)\b/i.test(c))m.push("Quita <html>, <head> y <body>: pega solo el fragmento.");
  w.innerHTML=m.map(x=>`<li>${esc(x)}</li>`).join("");}
function scRender(){const ov=document.getElementById("ncScMgr");const L=state.settings.scripts;const st=state.settings;
  ov.innerHTML=`<div class="nc-ov-box sm-box" role="dialog" aria-modal="true" aria-labelledby="smT"><div class="nc-ov-head"><div><b id="smT">Scripts y píxeles</b><div class="help">Código propio en la landing exportada (nunca en el editor). ${st.consent==="banner"?"Los que dependen del consentimiento solo se cargan cuando el visitante acepta esa categoría en el banner.":"Con CMP externa, los scripts con consentimiento salen como <code>type=\"text/plain\"</code> con su categoría para que la CMP los active."}</div></div><button class="btn sm ghost" data-sm="close">Cerrar</button></div>
   ${L.length?L.map((s,i)=>`<div class="sm-it" data-si="${i}"><div class="sm-row"><input class="sm-n" data-sf="name" value="${esc(s.name)}" aria-label="Nombre"><select data-sf="place" aria-label="Dónde">${SC_PLACE.map(([v,t])=>`<option value="${v}" ${s.place===v?"selected":""}>${esc(t)}</option>`).join("")}</select><select data-sf="consent" aria-label="Consentimiento">${SC_CONS.map(([v,t])=>`<option value="${v}" ${s.consent===v?"selected":""}>${t}</option>`).join("")}</select>
     <label class="sm-on"><input type="checkbox" data-sf="on" ${s.on?"checked":""}> Activo</label>${i?`<button type="button" class="mini" data-sm="up" data-i="${i}" title="Subir (orden de carga)">↑</button>`:""}<button type="button" class="mini" data-sm="del" data-i="${i}" title="Eliminar">✕</button></div>
     <textarea data-sf="code" rows="4" spellcheck="false" placeholder="<script>…</script>">${esc(s.code)}</textarea><ul class="sm-w"></ul></div>`).join(""):`<div class="empty">Sin scripts. GTM se configura en Global; aquí van píxeles, mapas de calor, chats…</div>`}
   <div class="sm-add"><span class="lbl">Añadir:</span>${[["meta","Píxel de Meta"],["tiktok","Píxel de TikTok"],["hotjar","Hotjar / Clarity"],["chat","Chat"],["blank","Otro"]].map(([k,t])=>`<button type="button" class="btn sm ghost" data-sm="add" data-v="${k}">+ ${t}</button>`).join("")}</div></div>`;
  ov.querySelectorAll("[data-si]").forEach(b=>scWarn(b,L[+b.dataset.si]));}

/* checklist de export: avisos */
if(typeof ncAudit==="function"){const _c=ncAudit;ncAudit=function(){const r=_c.apply(this,arguments);try{const O=ovOn();if(O.filter(o=>o.kind==="popup"&&(o.trigger==="load"||(o.trigger==="delay"&&+o.s<5))).length&&Array.isArray(r))r.push({lvl:"warn",m:"Popup que salta nada más entrar: en móvil Google lo considera intrusivo y suele bajar la conversión.",fix:"Mejor tras 15-30 s, al hacer scroll o al ir a salir (Más → Popups y barras)."});}catch(e){}return r;};}

/* accesos: menú Más y Global */
window.ncOpenOverlays=ovModal;window.ncOpenScripts=scModal;
document.addEventListener("DOMContentLoaded",()=>{const pop=document.querySelector('.tbm[data-menu="tools"] .tbm-pop');if(!pop)return;const sep=pop.querySelector(".tbm-sep");
  [["btnOverlays","Popups y barras",ovModal,"split"],["btnScripts","Scripts y píxeles",scModal,"code"]].forEach(([id,t,fn,ic])=>{if(document.getElementById(id))return;const b=document.createElement("button");b.className="btn";b.id=id;b.addEventListener("click",fn);pop.insertBefore(b,sep);if(typeof nc6Item==="function")nc6Item(b,ic,t);else b.textContent=t;});});
(function(){const _g=renderGlobal;renderGlobal=function(){const r=_g.apply(this,arguments);try{const gf=document.getElementById("globalFields");const fin=gf&&gf.querySelector(".nc6-fin");if(gf&&!gf.querySelector(".cv-sum")){const O=ovOn().length,S=(state.settings.scripts||[]).filter(s=>s.on).length;
  const h=`<div class="cv-sum"><div class="paneltitle" style="padding:10px 0 4px">Popups, barras y scripts</div><div class="cv-row"><span>${O?O+" popup"+(O>1?"s o barras activos":" o barra activo"):"Sin popups ni barras"}</span><button type="button" class="btn sm" id="cvOv">Gestionar</button></div><div class="cv-row"><span>${S?S+" script"+(S>1?"s":""):"Sin scripts propios"}</span><button type="button" class="btn sm" id="cvSc">Gestionar</button></div></div>`;
  (fin||gf.firstElementChild).insertAdjacentHTML(fin?"afterend":"beforebegin",h);document.getElementById("cvOv").addEventListener("click",ovModal);document.getElementById("cvSc").addEventListener("click",scModal);}}catch(e){}return r;};})();

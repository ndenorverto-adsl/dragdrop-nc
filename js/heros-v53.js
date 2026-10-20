/* NC Landing Builder · v5.3 · Heros nuevos
   · dx_hslider  Carrusel de ofertas: cada oferta con etiqueta, título, precio, foto y CTA (abre el popup con esa oferta).
   · dx_hvideobg Vídeo de fondo en bucle (mp4 mudo) con tarjeta de captación; en móvil y con «movimiento reducido» se ve la
                 imagen de portada (no se descarga el vídeo).
   · dx_hsteps   Formulario multipaso en el hero: necesidad → código postal (opcional) → teléfono, con barra de progreso.
                 Sin JS se ven los tres pasos a la vez (sigue funcionando).
   · dx_hplans   Tarifas en el hero: 2-3 tarifas visibles sin scroll, la destacada marcada, CTA directo por tarifa.
   Ningún dato de negocio por defecto: precios, plazos y ofertas como {{PLACEHOLDER}}. CSS/JS solo si se usan. */
const HX53_ACT={k:"act",l:"Al pulsar el botón",t:"select",opts:V4_ACT};
Object.assign(LIB,{
dx_hslider:{label:"✚ Hero carrusel de ofertas",ico:"⇆",cat:"Heros v5",raw:true,
  def:()=>({canal:"form",act:"popup",auto:"6",slides:[
    {tag:"{{ETIQUETA_1}}",title:"{{OFERTA_1}}",sub:"{{DETALLE_OFERTA_1}}",price:"{{PRECIO_1}}",unit:"€/mes",note:"{{NOTA_PRECIO_1}}",img:"",imgAlt:"",cta:"La quiero"},
    {tag:"{{ETIQUETA_2}}",title:"{{OFERTA_2}}",sub:"{{DETALLE_OFERTA_2}}",price:"{{PRECIO_2}}",unit:"€/mes",note:"{{NOTA_PRECIO_2}}",img:"",imgAlt:"",cta:"La quiero"},
    {tag:"{{ETIQUETA_3}}",title:"{{OFERTA_3}}",sub:"{{DETALLE_OFERTA_3}}",price:"{{PRECIO_3}}",unit:"€/mes",note:"{{NOTA_PRECIO_3}}",img:"",imgAlt:"",cta:"La quiero"}]}),
  fields:[{k:"canal",l:"Botón secundario",t:"select",opts:[["form","Teléfono (llamar)"],["call","Te llamamos (formulario)"],["wa","WhatsApp"]]},HX53_ACT,{k:"auto",l:"Pasar solo cada (segundos · vacío = no)"},
    {k:"slides",l:"Ofertas",t:"repeater",addLabel:"Añadir oferta",item:[{k:"tag",l:"Etiqueta",def:""},{k:"title",l:"Título",def:"{{OFERTA}}"},{k:"sub",l:"Detalle",t:"ta",def:""},{k:"price",l:"Precio",def:"{{PRECIO}}"},{k:"unit",l:"Unidad",def:"€/mes"},{k:"note",l:"Nota del precio",def:""},{k:"img",l:"Foto",t:"image",def:""},{k:"imgAlt",l:"Texto alternativo",def:""},{k:"cta",l:"Botón",def:"La quiero"}]}],
  render:p=>{const S=arr(p.slides);const c=p.canal||"form";const n=S.length;
    const sec=c==="wa"?`${v4Wa()} class="da-btn sec">${I_WA()} WhatsApp</a>`:c==="call"?`<a href="#form" data-cta="form" class="da-btn sec">${esc(vt("weCall"))}</a>`:`${v4Tel()} class="da-btn sec">${I_TEL()} ${esc(telText())}</a>`;
    return `<header class="da da-hero hx hx-sld" data-hsld${/^\d+$/.test(String(p.auto||"").trim())&&+p.auto>0?` data-auto="${+p.auto}"`:""}><div class="container"><div class="trk" role="region" aria-roledescription="carrusel" aria-label="Ofertas" tabindex="0">
    ${S.map((s,i)=>`<article class="sl" role="group" aria-roledescription="oferta" aria-label="${i+1} de ${n}"><div class="tx">${s.tag?`<span class="da-eyebrow">${esc(s.tag)}</span>`:""}${i===0?`<h1 class="da-h1">${esc(s.title)}</h1>`:`<h2 class="da-h1">${esc(s.title)}</h2>`}${s.sub?`<p class="da-sub hx-sub">${esc(s.sub).replace(/\n/g,"<br>")}</p>`:""}
      ${s.price?`<div class="pr"><b>${esc(s.price)}</b><span>${esc(s.unit||"")}${s.note?`<small>${esc(s.note)}</small>`:""}</span></div>`:""}
      <div class="da-btns"><a href="#form" data-cta="form"${v4ActA(p,{name:s.title,price:s.price,unit:s.unit})} class="da-btn pri">${esc(s.cta||"La quiero")} ${I_GO()}</a>${sec}</div></div>
      <div class="ph">${s.img?`<img src="${esc(s.img)}" alt="${esc(s.imgAlt||"")}"${i?' loading="lazy"':' fetchpriority="high"'}>`:`<div class="hx-mock">${ncVisual({vis:"mock",illus:"spark",headline:s.title,price:s.price,priceUnit:s.unit})}</div>`}</div></article>`).join("")}</div>
    ${n>1?`<div class="ctl"><button type="button" class="ar prv" aria-label="Oferta anterior">‹</button><div class="dots">${S.map((s,i)=>`<button type="button" aria-label="Ver oferta ${i+1}"${i?"":' class="on"'}></button>`).join("")}</div><button type="button" class="ar nxt" aria-label="Oferta siguiente">›</button></div>`:""}</div></header>`;}},
dx_hvideobg:{label:"✚ Hero vídeo de fondo en bucle",ico:"▶",cat:"Heros v5",raw:true,
  def:()=>({canal:"form",eyebrow:"",headline:"Tu titular sobre el vídeo",highlight:"",sub:"Una frase que conecte con la situación del cliente.",checks:"",video:"",poster:"",posterAlt:"",mobile:"poster",scrim:"med",
    cardTitle:"Te llamamos gratis",cardSub:"Déjanos tu teléfono y te informamos sin compromiso.",btn:"Llamadme",opts:"",note:"",cta:"Quiero que me llaméis"}),
  fields:hxF("canal","eyebrow","headline","highlight","sub","checks",{k:"video",l:"Vídeo .mp4 / .webm (mudo, corto, < 4 MB)"},{k:"poster",l:"Imagen de portada (móvil y sin vídeo)",t:"photo"},{k:"posterAlt",l:"Texto alternativo de la portada"},
    {k:"mobile",l:"En móvil",t:"select",opts:[["poster","Imagen de portada (ahorra datos)"],["video","Vídeo también"]]},{k:"scrim",l:"Oscurecer",t:"select",opts:[["soft","Poco"],["med","Medio"],["strong","Mucho"],["brand","Con el color de marca"],["side","Degradado lateral"]]},
    {k:"cardTitle",l:"Título de la tarjeta"},{k:"cardSub",l:"Texto de la tarjeta"},"btn","opts","note","cta",V4_ACTF),
  render:p=>{const c=p.canal||"form",v=String(p.video||"").trim(),okV=/\.(mp4|webm)(\?|#|$)/i.test(v);
    const card=c==="call"?`<h2>${esc(vt("callNow"))}</h2><p>${esc(p.cardSub)}</p>${v4Tel()} class="da-bigcall">${I_TEL()} ${esc(telText())}</a><div class="da-or">${esc(vt("orWeCall"))}</div>${hxForm(p,{noOpts:1})}`
      :c==="wa"?`<h2>${esc(vt("waWrite"))}</h2><p>${esc(p.cardSub)}</p>${v4Wa()} class="da-bigwa">${I_WA()} ${esc(vt("waOpen"))}</a><div class="da-or">${esc(vt("orPhone"))}</div>${hxForm(p,{noOpts:1})}`
      :`<h2>${esc(p.cardTitle)}</h2><p>${esc(p.cardSub)}</p>${hxForm(p)}<p class="alt">${hxAlt(p)}</p>`;
    return `<header class="da da-hero hx hx-full hx-vbg sc-${p.scrim||"med"}${p.poster||okV?"":" no-img"}">${p.poster?`<img src="${esc(p.poster)}" alt="${esc(p.posterAlt||"")}" class="bgi" fetchpriority="high">`:""}
      ${okV?`<video class="bgv" muted loop playsinline autoplay preload="none" aria-hidden="true" data-vsrc="${esc(v)}" data-mobile="${p.mobile==="video"?"1":"0"}"${p.poster?` poster="${esc(p.poster)}"`:""}></video><button type="button" class="vp" aria-label="Pausar el vídeo de fondo">❚❚</button>`:v?`<span class="vwarn">El vídeo debe ser un archivo .mp4 o .webm</span>`:""}
      <div class="container"><div class="row g-4 align-items-center"><div class="col-lg-7 tx">${hxEye(p)}${hxH1(p)}${hxSub(p)}${hxChecks(p)}${c!=="form"?`<div class="da-btns">${hxPri(p)}</div>`:""}</div>
      <div class="col-lg-5"><div class="hx-glass" id="form">${card}${p.note?`<p class="nt">${esc(p.note)}</p>`:""}</div></div></div></div></header>`;}},
dx_hsteps:{label:"✚ Hero con formulario multipaso",ico:"①②③",cat:"Heros v5",raw:true,
  def:()=>({eyebrow:"",headline:"Te ayudamos a elegir",highlight:"en 3 pasos",sub:"Responde dos preguntas rápidas y te llamamos con una propuesta para ti.",checks:"Sin compromiso\nTe llamamos en {{TIEMPO_RESPUESTA}}",
    q1:"¿Qué necesitas?",o1:"{{OPCION_1}}|{{OPCION_2}}|{{OPCION_3}}|{{OPCION_4}}",cp:"si",q2:"¿Cuál es tu código postal?",q3:"¿A qué teléfono te llamamos?",btn:"Quiero que me llaméis",safe:"Tu número solo se usa para llamarte. Sin spam.",img:"",imgAlt:""}),
  fields:hxF("eyebrow","headline","highlight","sub","checks",{k:"q1",l:"Paso 1 · Pregunta"},{k:"o1",l:"Paso 1 · Opciones (separadas por |)"},{k:"cp",l:"Paso 2 · Código postal",t:"select",opts:[["si","Sí (para comprobar cobertura o zona)"],["no","No: pasar directo al teléfono"]]},
    {k:"q2",l:"Paso 2 · Pregunta"},{k:"q3",l:"Último paso · Pregunta"},"btn",{k:"safe",l:"Texto de privacidad bajo el botón"},"img","imgAlt"),
  render:p=>{const O=String(p.o1||"").split("|").map(x=>x.trim()).filter(Boolean);const cp=p.cp!=="no";const N=cp?3:2;const id="st"+Math.random().toString(36).slice(2,7);
    const prog=k=>`<div class="pg" aria-hidden="true"><i style="width:${Math.round(k/N*100)}%"></i></div><span class="sn">Paso ${k} de ${N}</span>`;
    return `<header class="da da-hero hx hx-stp"><div class="container"><div class="row g-4 g-lg-5 align-items-center"><div class="col-lg-6">${hxEye(p)}${hxH1(p)}${hxSub(p)}${hxChecks(p)}${p.img?`<img src="${esc(p.img)}" alt="${esc(p.imgAlt||"")}" class="ph">`:""}</div>
    <div class="col-lg-6"><div class="da-card" id="form"><form data-callback data-steps action="${v4Act()}" method="post" novalidate>
      <fieldset class="st on" data-st="1"><legend>${esc(p.q1)}</legend>${prog(1)}<div class="op">${O.map((o,i)=>`<label><input type="radio" name="necesidad" value="${esc(o)}" required><span>${esc(o)}</span></label>`).join("")}</div></fieldset>
      ${cp?`<fieldset class="st" data-st="2"><legend><label for="${id}cp">${esc(p.q2)}</label></legend>${prog(2)}<input id="${id}cp" name="codigo_postal" class="form-control" inputmode="numeric" maxlength="5" pattern="[0-9]{5}" placeholder="28001" autocomplete="postal-code" required><div class="nv"><button type="button" class="bk">${esc(vt("back"))}</button><button type="button" class="da-go nx">Continuar</button></div></fieldset>`:""}
      <fieldset class="st" data-st="${N}"><legend><label for="${id}tel">${esc(p.q3)}</label></legend>${prog(N)}<input id="${id}tel" required name="telefono" type="tel" class="form-control mb-2" placeholder="${esc(vt("phone"))}" autocomplete="tel">${state.settings.privacyCheck!==false?`<div class="nc-legal"><div class="form-check text-start mb-2"><input class="form-check-input" type="checkbox" required name="acepta_privacidad" value="si" id="${id}pv"><label class="form-check-label" for="${id}pv">He leído y acepto la política de privacidad</label></div></div>`:""}<button type="submit" class="da-go">${esc(p.btn)}</button><div class="nv"><button type="button" class="bk">${esc(vt("back"))}</button></div>${p.safe?`<p class="nt">${ncIco("lock")} ${esc(p.safe)}</p>`:""}</fieldset>
    </form><p class="alt">${hxAlt(p)}</p></div></div></div></div></header>`;}},
dx_hplans:{label:"✚ Hero con tarifas",ico:"▥",cat:"Heros v5",raw:true,
  def:()=>({eyebrow:"",headline:"Elige tu tarifa",highlight:"",sub:"Precio final con todo incluido. Sin letra pequeña.",act:"popup",note:"{{NOTA_PRECIOS}}",
    plans:[{name:"{{TARIFA_1}}",price:"{{PRECIO_1}}",unit:"€/mes",feats:"{{CARACTERISTICA_1}}\n{{CARACTERISTICA_2}}",tag:"",hl:"",cta:"La quiero"},
      {name:"{{TARIFA_2}}",price:"{{PRECIO_2}}",unit:"€/mes",feats:"{{CARACTERISTICA_1}}\n{{CARACTERISTICA_2}}\n{{CARACTERISTICA_3}}",tag:"{{ETIQUETA_DESTACADA}}",hl:"",cta:"La quiero"},
      {name:"{{TARIFA_3}}",price:"{{PRECIO_3}}",unit:"€/mes",feats:"{{CARACTERISTICA_1}}\n{{CARACTERISTICA_2}}\n{{CARACTERISTICA_3}}",tag:"",hl:"",cta:"La quiero"}]}),
  fields:hxF("eyebrow","headline","highlight","sub",HX53_ACT,{k:"plans",l:"Tarifas (2-3)",t:"repeater",addLabel:"Añadir tarifa",item:[{k:"name",l:"Nombre",def:"Tarifa"},{k:"price",l:"Precio",def:"{{PRECIO}}"},{k:"unit",l:"Unidad",def:"€/mes"},{k:"feats",l:"Incluye (una por línea)",t:"ta",def:""},{k:"tag",l:"Etiqueta (vacío = sin)",def:""},{k:"hl",l:"Destacar",t:"select",opts:[["","Automático (si tiene etiqueta)"],["si","Sí"],["no","No"]],def:""},{k:"cta",l:"Botón",def:"La quiero"}]},{k:"note",l:"Nota bajo las tarifas"}),
  render:p=>{const P=arr(p.plans).slice(0,4);const hl=x=>x.hl==="si"||(x.hl!=="no"&&!!x.tag);
    return `<header class="da da-hero hx hx-pl"><div class="container"><div class="hd">${hxEye(p)}${hxH1(p)}${hxSub(p)}</div>
    <div class="cards n${P.length}" id="tarifas">${P.map(x=>`<div class="da-card pc${hl(x)?" hl":""}">${x.tag?`<span class="tg">${esc(x.tag)}</span>`:""}<h2>${esc(x.name)}</h2><div class="pp"><b>${esc(x.price)}</b><span>${esc(x.unit||"")}</span></div>${v4Checks(x.feats,"da-checks")}
      <a href="#form" data-cta="form"${v4ActA(p,x)} class="da-btn ${hl(x)?"pri":"sec"}">${esc(x.cta||"La quiero")}</a></div>`).join("")}</div>
    <div class="ft">${p.note?`<span>${esc(p.note)}</span>`:""}<span class="alt">${hxAlt({canal:"form"})}</span></div></div></header>`;}}
});
(function(){const H=["dx_hslider","dx_hvideobg","dx_hsteps","dx_hplans"];let i=ORDER.indexOf("dx_hposter");i=i<0?ORDER.length:i+1;ORDER.splice(i,0,...H);})();
const NC_H53=/^dx_h(slider|videobg|steps|plans)$/;
function ncH53CSS(){return `
/* carrusel */
.hx-sld{position:relative;overflow:hidden}.hx-sld .trk{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;gap:0;outline:0}.hx-sld .trk::-webkit-scrollbar{display:none}
.hx-sld .sl{flex:0 0 100%;scroll-snap-align:start;display:grid;grid-template-columns:minmax(0,1fr);gap:20px;align-items:center;padding:4px 2px}
.hx-sld .ph{order:-1;border-radius:var(--cardr,18px);overflow:hidden;aspect-ratio:16/10;background:color-mix(in srgb,var(--bink) 5%,transparent)}.hx-sld .ph img{width:100%;height:100%;object-fit:cover;display:block}.hx-sld .ph .hx-mock{height:100%}
.hx-sld .pr{display:flex;align-items:flex-end;gap:10px;margin:14px 0 4px}.hx-sld .pr b{font:800 clamp(40px,5vw,64px)/1 var(--fdisp,var(--fhead));color:var(--bpt,var(--bp));letter-spacing:-.02em}.hx-sld .pr span{display:flex;flex-direction:column;font-weight:700;color:var(--bink);line-height:1.2}.hx-sld .pr small{font-weight:400;color:var(--bmuted);font-size:12.5px}
.hx-sld .ctl{display:flex;align-items:center;justify-content:center;gap:12px;margin-top:18px}.hx-sld .ar{width:40px;height:40px;border-radius:50%;border:1px solid var(--dline);background:transparent;color:var(--bink);font-size:22px;line-height:1}.hx-sld .ar:disabled{opacity:.35}
.hx-sld .dots{display:flex;gap:8px}.hx-sld .dots button{width:10px;height:10px;border-radius:999px;border:0;padding:0;background:color-mix(in srgb,var(--bink) 22%,transparent);transition:width .2s}.hx-sld .dots button.on{width:28px;background:var(--bp)}
@media (min-width:992px){.hx-sld .sl{grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:56px}.hx-sld .ph{order:0;aspect-ratio:4/3.4}}
@media (prefers-reduced-motion:no-preference){.hx-sld .trk{scroll-behavior:smooth}}
/* vídeo de fondo */
.hx-vbg .bgv{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.hx-vbg .vp{position:absolute;right:14px;bottom:14px;z-index:2;width:36px;height:36px;border-radius:50%;border:1px solid rgba(255,255,255,.5);background:rgba(0,0,0,.35);color:#fff;font-size:11px;display:none}
.hx-vbg.playing .vp{display:block}.hx-vbg .vwarn{position:absolute;left:12px;top:12px;z-index:2;background:#b91c1c;color:#fff;font-size:12px;padding:4px 8px;border-radius:6px}
/* multipaso */
.hx-stp .ph{width:100%;border-radius:var(--cardr,16px);margin-top:18px;aspect-ratio:16/9;object-fit:cover}
.hx-stp fieldset{border:0;margin:0;padding:0}.hx-stp form.js .st{display:none}.hx-stp form.js .st.on{display:block;animation:hxst .25s ease}.hx-stp form:not(.js) .st+.st{margin-top:22px;padding-top:18px;border-top:1px solid var(--dline)}.hx-stp form:not(.js) .nv{display:none}
@keyframes hxst{from{opacity:0;transform:translateX(12px)}to{opacity:1;transform:none}}@media (prefers-reduced-motion:reduce){.hx-stp form.js .st.on{animation:none}}
.hx-stp .pg{height:6px;border-radius:999px;background:color-mix(in srgb,var(--bink) 10%,transparent);overflow:hidden}.hx-stp .pg i{display:block;height:100%;background:var(--bp);border-radius:999px;transition:width .3s}
.hx-stp .sn{display:block;font-size:12px;color:var(--bmuted);margin:6px 0 10px}.hx-stp legend{font:700 20px/1.25 var(--fhead);color:var(--bink);margin-bottom:10px;float:none;width:100%}.hx-stp legend label{font:inherit;color:inherit}
.hx-stp .op{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.hx-stp .op label{display:block;cursor:pointer}.hx-stp .op input{position:absolute;opacity:0;pointer-events:none}
.hx-stp .op span{display:flex;align-items:center;justify-content:center;text-align:center;min-height:58px;padding:10px;border:2px solid var(--dline);border-radius:12px;font-weight:600;color:var(--bink);transition:border-color .15s,background .15s}
.hx-stp .op input:checked+span,.hx-stp .op label:hover span{border-color:var(--bp);background:color-mix(in srgb,var(--bp) 10%,transparent)}.hx-stp .op input:focus-visible+span{outline:3px solid color-mix(in srgb,var(--bp) 45%,transparent);outline-offset:2px}
.hx-stp .nv{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-top:10px}.hx-stp .bk{border:0;background:none;color:var(--bmuted);font-size:13px;padding:6px 0}.hx-stp .nv .da-go{width:auto;margin:0;padding:12px 22px}
.hx-stp .nt{display:flex;gap:6px;align-items:center;justify-content:center}
@media (max-width:420px){.hx-stp .op{grid-template-columns:1fr}}
/* tarifas */
.hx-pl .hd{text-align:center;max-width:760px;margin:0 auto 26px}.hx-pl .hd .hx-sub{margin:0 auto}.hx-pl .hd .da-eyebrow{margin:0 auto}
.hx-pl .cards{display:grid;gap:14px;grid-template-columns:repeat(var(--n,3),minmax(0,1fr));align-items:stretch;max-width:1080px;margin:0 auto}.hx-pl .cards.n2{--n:2;max-width:760px}.hx-pl .cards.n4{--n:4}.hx-pl .cards.n1{--n:1;max-width:420px}
.hx-pl .pc{position:relative;display:flex;flex-direction:column;gap:6px;padding:24px 20px}.hx-pl .pc.hl{border:2px solid var(--bp);box-shadow:0 22px 50px -26px color-mix(in srgb,var(--bp) 60%,transparent)}
.hx-pl .pc h2{font:700 19px var(--fhead);margin:0;color:var(--bink)}.hx-pl .tg{position:absolute;top:-12px;left:20px;background:var(--bp);color:var(--btntext,#fff);font-size:12px;font-weight:700;padding:4px 10px;border-radius:999px}
.hx-pl .pp{display:flex;align-items:flex-end;gap:6px;margin:4px 0 6px}.hx-pl .pp b{font:800 clamp(34px,3.6vw,46px)/1 var(--fdisp,var(--fhead));color:var(--bink);letter-spacing:-.02em}.hx-pl .pp span{font-weight:700;color:var(--bmuted)}
.hx-pl .pc .da-checks{margin:4px 0 12px}.hx-pl .pc .da-btn{margin-top:auto;justify-content:center;width:100%}.hx-pl .ft{display:flex;flex-wrap:wrap;justify-content:center;gap:6px 18px;margin-top:16px;font-size:13px;color:var(--bmuted)}.hx-pl .ft .alt{margin:0}
@media (max-width:767px){.hx-pl .cards{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;padding:14px 4px 6px;margin:0 -12px;padding-left:12px;scrollbar-width:none}.hx-pl .cards::-webkit-scrollbar{display:none}.hx-pl .pc{flex:0 0 82%;scroll-snap-align:center}.hx-pl .cards.n1 .pc{flex-basis:100%}}`;}
const NC_H53_JS=`(function(){var DL=function(o){try{(window.dataLayer=window.dataLayer||[]).push(o);}catch(e){}};var RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelectorAll('[data-hsld]').forEach(function(w){var t=w.querySelector('.trk'),S=[].slice.call(t.children),D=[].slice.call(w.querySelectorAll('.dots button')),pv=w.querySelector('.prv'),nx=w.querySelector('.nxt'),cur=0,tm=null;
  function go(i,user){i=(i+S.length)%S.length;t.scrollTo({left:S[i].offsetLeft-t.offsetLeft,behavior:RM?'auto':'smooth'});if(user)stop();}
  function upd(){var i=Math.round(t.scrollLeft/Math.max(1,t.clientWidth));if(i!==cur){cur=i;DL({event:'hero_slide',oferta:(S[i].querySelector('.da-h1')||{}).textContent});}D.forEach(function(d,k){d.classList.toggle('on',k===cur);d.setAttribute('aria-current',k===cur?'true':'false');});}
  t.addEventListener('scroll',function(){clearTimeout(t._u);t._u=setTimeout(upd,80);});D.forEach(function(d,k){d.addEventListener('click',function(){go(k,true);});});if(pv)pv.addEventListener('click',function(){go(cur-1,true);});if(nx)nx.addEventListener('click',function(){go(cur+1,true);});
  t.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){e.preventDefault();go(cur+1,true);}if(e.key==='ArrowLeft'){e.preventDefault();go(cur-1,true);}});
  function stop(){clearInterval(tm);tm=null;}var a=parseInt(w.getAttribute('data-auto'),10);if(a&&!RM&&S.length>1){tm=setInterval(function(){go(cur+1);},a*1000);['pointerdown','focusin','mouseenter','touchstart'].forEach(function(ev){w.addEventListener(ev,stop,{passive:true});});}});
document.querySelectorAll('.hx-vbg video[data-vsrc]').forEach(function(v){var h=v.closest('.hx-vbg'),mob=window.matchMedia&&matchMedia('(max-width:767px)').matches;if(RM||(mob&&v.getAttribute('data-mobile')!=='1')){v.remove();return;}
  v.src=v.getAttribute('data-vsrc');v.play&&v.play().then(function(){h.classList.add('playing');}).catch(function(){});var b=h.querySelector('.vp');if(b)b.addEventListener('click',function(){if(v.paused){v.play();b.textContent='❚❚';b.setAttribute('aria-label','Pausar el vídeo de fondo');}else{v.pause();b.textContent='▶';b.setAttribute('aria-label','Reproducir el vídeo de fondo');}});});
document.querySelectorAll('form[data-steps]').forEach(function(f){var F=[].slice.call(f.querySelectorAll('.st'));f.classList.add('js');var cur=0;
  function show(i){F.forEach(function(x,k){x.classList.toggle('on',k===i);});cur=i;var el=F[i].querySelector('input:not([type=radio]),input[type=radio]');if(el&&i>0)setTimeout(function(){el.focus();},60);DL({event:'form_step',paso:i+1});}
  f.addEventListener('change',function(e){if(e.target.name==='necesidad'&&cur===0)setTimeout(function(){show(1);},180);});
  f.querySelectorAll('.nx').forEach(function(b){b.addEventListener('click',function(){var i=F[cur].querySelector('input');if(i&&!i.checkValidity()){i.reportValidity();return;}show(cur+1);});});
  f.querySelectorAll('.st input[name=codigo_postal]').forEach(function(i){i.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();if(i.checkValidity())show(cur+1);else i.reportValidity();}});});
  f.querySelectorAll('.bk').forEach(function(b){b.addEventListener('click',function(){show(Math.max(0,cur-1));});});
  f.addEventListener('submit',function(e){if(!f.querySelector('input[name=necesidad]:checked')){e.preventDefault();e.stopImmediatePropagation();show(0);var r=f.querySelector('input[name=necesidad]');if(r)r.reportValidity();}},true);});
})();`;
(function(){const _bd=buildDoc;buildDoc=function(forExport){let h=_bd.apply(this,arguments);if(!state.sections.some(s=>!(forExport&&s.hidden)&&NC_H53.test(s.type)))return h;
  return h.replace("</head>",`<style>${ncH53CSS()}</style></head>`).replace(/<\/body>(?![\s\S]*<\/body>)/,`<script>${NC_H53_JS}<\/script></body>`);};})();

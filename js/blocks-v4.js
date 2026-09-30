/* ---------- BLOQUES v4 · 3 direcciones visuales ----------
   A · Oferta directa (da_)   → precio y llamada primero. Telco, energía.
   B · Confianza editorial (db_) → prueba social y multipaso. Alarmas, seguros, salud, legal.
   C · Premium producto (dc_)  → hero oscuro, formulario tipo buscador. Lanzamientos, marcas aspiracionales.
   Todos usan los tokens de la marca cargada (--bp, --ba, --bink, --bmuted, --bsoft, --line, --fhead, --fbody).
   Los datos de negocio van como {{PLACEHOLDER}}: nunca se inventan.
*/
const V4_CANAL=[["form","Formulario (te llamamos)"],["call","Llamada"],["wa","WhatsApp"]];
const v4L=s=>lines(s);
const v4C=l=>String(l||"").split("|").map(x=>x.trim());
const v4Act=()=>ph(state.settings.endpoint,'ENDPOINT_FORMULARIO');
const v4Wa=()=>`<a href="${waHref()}" target="_blank" rel="noopener" data-cta="whatsapp"`;
const v4Tel=()=>`<a href="${telHref()}" data-cta="call"`;
const v4Icon={get call(){return ncIco("phone")},get wa(){return ncIco("message-circle")},get form(){return ncIco("mail")}};
const v4ML=(p,d)=>"nc-m-"+(((p._st||{}).mLayout)&&p._st.mLayout!=="auto"?p._st.mLayout:d);
const v4MO=p=>{const t=p._st||{};return " nc-mo-"+(t.mOrder||"form")+(t.mVis==="hide"?" nc-mv-hide":"");};
const V4_ACT=[["global","Como el ajuste global"],["scroll","Ir al formulario"],["popup","Abrir el popup"],["call","Llamar"],["wa","WhatsApp"]];
const V4_ACTF={k:"act",l:"Al pulsar el botón",t:"select",opts:V4_ACT};
function v4ActA(p,pl){const a=p.act||"global";let s=a!=="global"?` data-act="${a}"`:"";if(pl)s+=` data-plan="${esc(pl.name||"")}" data-price="${esc(((pl.price||"")+" "+(pl.unit||"")).trim())}"`;return s;}
const I_TEL=()=>ncIco("phone"),I_WA=()=>ncIco("message-circle"),I_GO=()=>ncIco("arrow-right");
const V4_VISF=[{k:"layout",l:"Composición",t:"select",opts:[["auto","Automática (según el estilo)"],["std","Estándar"],["photo","Con imagen protagonista"]]},{k:"vis",l:"Imagen protagonista",t:"select",opts:NC_VIS},{k:"img",l:"Foto",t:"photo"},{k:"photoFx",l:"Tratamiento de la foto",t:"select",opts:NC_FX},{k:"imgAlt",l:"Texto alternativo de la foto"},{k:"illus",l:"Mockup",t:"select",opts:NC_ILLUS},{k:"badge",l:"Sello sobre la imagen (valor|texto, opcional)"},{k:"annot",l:"Nota a mano (vacío = automática)"}];
function v4Checks(s,cls){return `<ul class="${cls}">${v4L(s).map(l=>`<li>${esc(l)}</li>`).join("")}</ul>`;}
function v4PhoneForm(o){ // formulario de callback de un campo (+ nombre opcional)
  return `<form data-callback action="${v4Act()}" method="post" class="${o.cls||''}">
    ${o.name?`<input required name="nombre" class="form-control mb-2" placeholder="Nombre" autocomplete="name">`:""}
    <input required name="telefono" type="tel" class="form-control mb-2" placeholder="${esc(o.ph||vt("phone"))}">
    <button type="submit" class="${o.btnCls}">${esc(o.btn)}${o.arrow?' '+I_GO():''}</button></form>`;
}
function v4Faq(p,fam){const id="faq"+fam+Math.random().toString(36).slice(2,6);
  return `<div class="accordion ${fam}-faq" id="${id}">${v4L(p.items).map((l,i)=>{const c=v4C(l);return `<div class="accordion-item"><h3 class="accordion-header"><button class="accordion-button ${i?'collapsed':''}" type="button" data-bs-toggle="collapse" data-bs-target="#${id}_${i}">${esc(c[0])}</button></h3><div id="${id}_${i}" class="accordion-collapse collapse ${i?'':'show'}" data-bs-parent="#${id}"><div class="accordion-body">${esc(c[1]||'')}</div></div></div>`;}).join("")}</div>`;}
function v4Legal(){const st=state.settings;return `<a href="${esc(ph(st.urlPrivacy,'URL_PRIVACIDAD'))}">Privacidad</a> · <a href="${esc(ph(st.urlCookies,'URL_COOKIES'))}">Cookies</a> · <a href="{{URL_AVISO_LEGAL}}">Aviso legal</a>`;}
function v4Logo(p,cls){return p.logoImg?`<img src="${p.logoImg}" alt="${esc(p.logo||'Logo')}" class="logo ${cls||''}" style="height:32px;width:auto">`:`<span class="${cls||''}"><i></i>${esc(p.logo||'{{LOGO}}')}</span>`;}
const V4_NAVF=[{k:"logo",l:"Nombre / logo (texto)"},{k:"logoImg",l:"Logo (imagen)",t:"image"},{k:"telLabel",l:"Texto sobre el teléfono"}];
const V4_STICKYF=[{k:"canal",l:"Canal principal",t:"select",opts:V4_CANAL},{k:"act",l:"Botón de formulario: al pulsar",t:"select",opts:[["global","Como el ajuste global"],["scroll","Ir al formulario"],["popup","Abrir el popup"]]},{k:"call",l:"Botón llamar"},{k:"form",l:"Botón formulario"},{k:"wa",l:"Botón WhatsApp"}];
function v4StickyBtns(p,pri,sec){const b={call:`${v4Tel()} class="${sec}">${I_TEL()} ${esc(p.call)}</a>`,form:`<a href="#form" data-cta="form"${v4ActA(p)} class="${sec}">${esc(p.form)}</a>`,wa:`${v4Wa()} class="${sec}">${I_WA()} ${esc(p.wa)}</a>`};
  const order=p.canal==="call"?["form","call"]:p.canal==="wa"?["call","wa"]:["call","form"]; // el principal va a la derecha (zona del pulgar)
  return order.map((k,i)=>i===1?b[k].replace(`class="${sec}"`,`class="${pri}"`):b[k]).join("");}

Object.assign(LIB,{
/* ============ A · OFERTA DIRECTA ============ */
da_topbar:{label:"A · Barra de urgencia",ico:"⏱",cat:"A · Oferta directa",raw:true,
  def:()=>({text:"Oferta online hasta el {{FECHA_FIN}}",bold:"instalación gratis"}),
  fields:[{k:"text",l:"Texto"},{k:"bold",l:"Texto destacado"}],
  render:p=>`<div class="da da-top">${ncIco("timer")} ${esc(p.text)}${p.bold?` · <b>${esc(p.bold)}</b>`:""}</div>`},
da_nav:{label:"A · Nav + teléfono",ico:"▭",cat:"A · Oferta directa",raw:true,
  def:()=>({logo:"{{LOGO}}",logoImg:"",telLabel:"Llamada gratuita"}),fields:V4_NAVF,
  render:p=>`<nav class="da da-nav"><div class="container d-flex align-items-center justify-content-between">${v4Logo(p,'da-logo')}
    ${v4Tel()} class="da-call">${I_TEL()}<span><small>${esc(p.telLabel)}</small>${esc(telText())}</span></a></div></nav>`},
da_hero:{label:"A · Hero oferta + precio",ico:"◧",cat:"A · Oferta directa",raw:true,
  def:()=>({canal:"form",eyebrow:"Asesores disponibles ahora",headline:"Fibra y móvil",highlight:"sin permanencia",sub:"Todo lo que usas en casa y en el móvil, en una sola factura.",price:"{{PRECIO}}",priceUnit:"€/mes",priceNote:"IVA incluido · precio final",oldPrice:"",checks:"Instalación gratis\nRouter incluido\nMantienes tu número",cta:"Quiero esta oferta",cardTitle:"Te llamamos gratis",cardSub:"Déjanos tu teléfono y un asesor te confirma el precio.",cardBtn:"Llamadme gratis",live:"Te llamamos en menos de {{MINUTOS}} min · {{HORARIO}}",img:"",imgAlt:"",layout:"auto",illus:"auto",badge:""}),
  fields:[{k:"canal",l:"Canal principal",t:"select",opts:V4_CANAL},{k:"eyebrow",l:"Etiqueta"},{k:"headline",l:"Titular"},{k:"highlight",l:"Parte subrayada del titular"},{k:"sub",l:"Subtítulo",t:"ta"},{k:"price",l:"Precio"},{k:"priceUnit",l:"Unidad (€/mes)"},{k:"priceNote",l:"Nota del precio"},{k:"oldPrice",l:"Precio anterior (opcional)"},{k:"checks",l:"Ventajas (una por línea)",t:"ta"},{k:"cta",l:"Botón principal"},{k:"cardTitle",l:"Título tarjeta"},{k:"cardSub",l:"Texto tarjeta"},{k:"cardBtn",l:"Botón tarjeta"},{k:"live",l:"Línea de disponibilidad"},V4_ACTF,...V4_VISF],
  render:p=>{const c=p.canal||"form";if(ncHeroLayout(p)==="photo")return v4HeroAPhoto(p);
    const pri=c==="call"?`${v4Tel()} class="da-btn pri">${I_TEL()} ${vt("callFree")}</a>`:c==="wa"?`${v4Wa()} class="da-btn pri wa">${I_WA()} WhatsApp</a>`:`<a href="#form" data-cta="form"${v4ActA(p)} class="da-btn pri">${esc(p.cta)} ${I_GO()}</a>`;
    const sec=c==="call"?`<a href="#form" data-cta="form"${v4ActA(p)} class="da-btn sec">${vt("weCall")}</a>`:`${v4Tel()} class="da-btn sec">${I_TEL()} ${esc(telText())}</a>`;
    const card=c==="call"?`<h2>${vt("callNow")}</h2><p>${esc(p.cardSub)}</p>${v4Tel()} class="da-bigcall">${I_TEL()} ${esc(telText())}</a><div class="da-or">${vt("orWeCall")}</div>${v4PhoneForm({btn:p.cardBtn,btnCls:"da-go alt"})}`
      :c==="wa"?`<h2>${vt("waWrite")}</h2><p>${esc(p.cardSub)}</p>${v4Wa()} class="da-bigwa">${I_WA()} ${vt("waOpen")}</a><div class="da-or">${vt("orPhone")}</div>${v4PhoneForm({btn:p.cardBtn,btnCls:"da-go alt"})}`
      :`<h2>${esc(p.cardTitle)}</h2><p>${esc(p.cardSub)}</p>${v4PhoneForm({btn:p.cardBtn,btnCls:"da-go"})}`;
    return `<header class="da da-hero${v4MO(p)}"><div class="container"><div class="row g-4 g-lg-5 align-items-center">
    <div class="col-lg-7">${p.eyebrow?`<span class="da-eyebrow"><span class="dot"></span>${esc(p.eyebrow)}</span>`:""}
      <h1 class="da-h1">${esc(p.headline)} ${p.highlight?`<mark>${esc(p.highlight)}</mark>`:""}</h1>
      <p class="da-sub">${esc(p.sub)}</p>
      ${p.price?`<div class="da-price"><div class="p">${esc(p.price)}${NC_SVG.circle}</div><div class="u"><b>${esc(p.priceUnit)}</b>${esc(p.priceNote)}</div></div>`:""}
      ${p.oldPrice?`<div class="da-old"><s>${esc(p.oldPrice)}</s> ${vt("old")}</div>`:""}
      ${v4Checks(p.checks,"da-checks")}
      <div class="da-btns">${pri}${sec}</div>
      ${p.img?`<img src="${p.img}" alt="" class="da-img">`:""}</div>
    <div class="col-lg-5 position-relative">${ncAnn(v4AnnA(p),"nc-ann-card")}<div class="da-card" id="form">${card}${p.live?`<div class="da-live"><span class="dot"></span><span>${esc(p.live)}</span></div>`:""}</div></div>
    </div></div></header>`;}},
da_trust:{label:"A · Barra de confianza",ico:"★",cat:"A · Oferta directa",raw:true,
  def:()=>({items:"{{VALORACION}}★|en Google\n{{CLIENTES}}|clientes\n{{PLAZO}}|instalación\n0 €|permanencia"}),
  fields:[{k:"variant",l:"Variante",t:"select",opts:[["auto","Automática (según el estilo)"],["row","Fila de cifras"],["big","Cifras grandes"],["ticker","Cinta en movimiento"]]},{k:"items",l:"Cifras (valor|texto, una por línea)",t:"ta"}],
  render:p=>v4Var(p,"trust")==="ticker"?(()=>{const it=v4L(p.items).map(l=>{const c=v4C(l);return `<span><b>${esc(c[0])}</b> ${esc(c[1]||'')}</span><i aria-hidden="true">✦</i>`;}).join("");return `<section class="da da-trust da-tick" aria-label="Datos"><div class="trk">${it}${it.replace(/<span>/g,'<span aria-hidden="true">')}</div></section>`;})()
   :`<section class="da da-trust${v4Var(p,"trust")==="big"?" da-trust-big":""}"><div class="container"><div class="row g-3 ${v4ML(p,"grid")}">${v4L(p.items).map(l=>{const c=v4C(l);return `<div class="col-6 col-md-3"><div class="it"><b>${esc(c[0])}</b>${esc(c[1]||'')}</div></div>`;}).join("")}</div></div></section>`},
da_plans:{label:"A · Tarifas",ico:"$",cat:"A · Oferta directa",raw:true,
  def:()=>({act:"popup",title:"Elige tu tarifa",sub:"Precios finales con IVA. Sin letra pequeña.",plans:[{name:"Solo fibra",price:"{{PRECIO_1}}",unit:"€/mes",feats:"Fibra {{VELOCIDAD}}\nRouter incluido\nSin permanencia",tag:"",cta:"La quiero"},{name:"Fibra + móvil",price:"{{PRECIO_2}}",unit:"€/mes",feats:"Fibra {{VELOCIDAD}}\nMóvil {{GB}}\nInstalación gratis",tag:"La más elegida",cta:"La quiero"},{name:"Fibra + 2 móviles",price:"{{PRECIO_3}}",unit:"€/mes",feats:"Fibra {{VELOCIDAD}}\n2 líneas {{GB}}\nTV incluida",tag:"",cta:"La quiero"}]}),
  fields:[{k:"act",l:"Botones “La quiero”: al pulsar",t:"select",opts:V4_ACT},{k:"title",l:"Título"},{k:"sub",l:"Subtítulo"},{k:"plans",l:"Tarifas",t:"repeater",addLabel:"Añadir tarifa",item:[{k:"name",l:"Nombre",def:"Tarifa"},{k:"price",l:"Precio",def:"{{PRECIO}}"},{k:"unit",l:"Unidad",def:"€/mes"},{k:"feats",l:"Incluye (una por línea)",t:"ta",def:""},{k:"tag",l:"Etiqueta destacada (vacío = normal)",def:""},{k:"cta",l:"Botón",def:"La quiero"}]}],
  render:p=>`<section class="da da-sec" id="tarifas"><div class="container"><div class="text-center mb-5"><h2 class="da-h2">${esc(p.title)}</h2><p class="da-muted">${esc(p.sub)}</p></div>
    <div class="row g-4 justify-content-center ${v4ML(p,"rail")}">${arr(p.plans).map(pl=>`<div class="col-md-6 col-lg-4"><div class="da-plan ${pl.tag?'best':''}">${pl.tag?`<span class="tag">${esc(pl.tag)}</span>`:""}<h3>${esc(pl.name)}</h3><div class="pp">${esc(pl.price)}<small>${esc(pl.unit||'')}</small></div>${v4Checks(pl.feats,"")}<a href="#form" data-cta="form"${v4ActA(p,pl)} class="da-btn ${pl.tag?'pri':'sec'} w-100 justify-content-center">${esc(pl.cta||'La quiero')}</a></div></div>`).join("")}</div></div></section>`},
da_benefits:{label:"A · Ventajas",ico:"▦",cat:"A · Oferta directa",raw:true,
  def:()=>({title:"Por qué cambiarte hoy",items:"⚡|Rápido|Instalación en {{PLAZO}}.\n💶|Precio claro|Lo que ves es lo que pagas.\n🤝|Sin ataduras|Sin permanencia.\n🛠️|Todo incluido|Router, instalación y soporte."}),
  fields:[{k:"variant",l:"Variante",t:"select",opts:[["auto","Automática (según el estilo)"],["cards","Tarjetas con icono"],["num","Numeradas (editorial)"],["rows","Filas con icono"]]},{k:"title",l:"Título"},{k:"items",l:"Ventajas (icono|título|texto)",t:"ta"}],
  render:p=>v4Var(p,"ben")==="rows"?`<section class="da da-sec soft"><div class="container" style="max-width:960px"><h2 class="da-h2 mb-4">${esc(p.title)}</h2><div class="da-ben-rows">${v4L(p.items).map(l=>{const c=v4C(l);return `<div class="r"><span class="ic">${ncIconOrText(c[0])}</span><h3>${esc(c[1]||'')}</h3><p>${esc(c[2]||'')}</p></div>`;}).join("")}</div></div></section>`
   :v4Var(p,"ben")==="num"?`<section class="da da-sec soft"><div class="container"><h2 class="da-h2 mb-5" style="max-width:640px">${esc(p.title)}</h2><div class="row g-4 da-ben-num ${v4ML(p,"list")}">${v4L(p.items).map((l,i)=>{const c=v4C(l);return `<div class="col-6 col-lg-3"><div class="nb"><span class="nn">${String(i+1).padStart(2,"0")}</span><h3>${esc(c[1]||'')}</h3><p>${esc(c[2]||'')}</p></div></div>`;}).join("")}</div></div></section>`
   :`<section class="da da-sec soft"><div class="container"><h2 class="da-h2 text-center mb-5">${esc(p.title)}</h2><div class="row g-3 da-row-ben ${v4ML(p,"list")}">${v4L(p.items).map(l=>{const c=v4C(l);return `<div class="col-6 col-lg-3"><div class="da-ben"><span class="ic">${ncIconOrText(c[0])}</span><h3>${esc(c[1]||'')}</h3><p>${esc(c[2]||'')}</p></div></div>`;}).join("")}</div></div></section>`},
da_faq:{label:"A · Preguntas frecuentes",ico:"?",cat:"A · Oferta directa",raw:true,
  def:()=>({title:"Preguntas frecuentes",items:"¿Hay permanencia?|{{RESPUESTA}}\n¿Cuánto tarda la instalación?|{{RESPUESTA}}\n¿Puedo mantener mi número?|{{RESPUESTA}}"}),
  fields:[{k:"title",l:"Título"},{k:"items",l:"Preguntas (pregunta|respuesta)",t:"ta"}],
  render:p=>`<section class="da da-sec"><div class="container" style="max-width:780px"><h2 class="da-h2 text-center mb-4">${esc(p.title)}</h2>${v4Faq(p,'da')}</div></section>`},
da_cta:{label:"A · CTA final",ico:"▬",cat:"A · Oferta directa",raw:true,
  def:()=>({title:"¿Hablamos? Te llamamos gratis",sub:"Un asesor te confirma el precio final en minutos.",btn:"Llamadme"}),
  fields:[{k:"title",l:"Título"},{k:"sub",l:"Subtítulo"},{k:"btn",l:"Botón"}],
  render:p=>`<section class="da da-ctab"><div class="container"><div class="row align-items-center g-4"><div class="col-lg-6"><h2>${esc(p.title)}</h2><p>${esc(p.sub)}</p></div>
    <div class="col-lg-6"><div class="d-flex flex-column flex-sm-row gap-2">${v4PhoneForm({btn:p.btn,btnCls:"da-go",cls:"da-inline flex-grow-1"})}</div><div class="mt-2 small" style="opacity:.8">o llama gratis al ${v4Tel()} style="color:inherit;font-weight:700">${esc(telText())}</a></div></div></div></div></section>`},
da_footer:{label:"A · Footer",ico:"▁",cat:"A · Oferta directa",raw:true,
  def:()=>({company:"{{RAZON_SOCIAL}}",note:"Precios con IVA. Consulta condiciones."}),fields:[{k:"company",l:"Razón social"},{k:"note",l:"Nota legal"}],
  render:p=>`<footer class="da da-foot"><div class="container d-flex flex-wrap justify-content-between gap-2"><span>© ${esc(p.company)} · ${esc(p.note)}</span><span>${v4Legal()}</span></div></footer>`},
da_sticky:{label:"A · Barra fija móvil",ico:"⤓",cat:"A · Oferta directa",raw:true,
  def:()=>({canal:"form",call:"Llamar",form:"Te llamamos",wa:"WhatsApp"}),fields:V4_STICKYF,
  render:p=>`<div class="da da-sticky">${v4StickyBtns(p,"da-btn pri","da-btn sec")}</div>`},

/* ============ B · CONFIANZA EDITORIAL ============ */
db_nav:{label:"B · Nav editorial",ico:"▭",cat:"B · Confianza editorial",raw:true,
  def:()=>({logo:"{{LOGO}}",logoImg:"",telLabel:"¿Hablamos? {{HORARIO}}"}),fields:V4_NAVF,
  render:p=>`<nav class="db db-nav"><div class="container d-flex align-items-center justify-content-between">${v4Logo(p,'db-logo')}
    ${v4Tel()} class="db-navtel"><small>${esc(p.telLabel)}</small><span>${I_TEL()} ${esc(telText())}</span></a></div></nav>`},
db_hero:{label:"B · Hero confianza + multipaso",ico:"◫",cat:"B · Confianza editorial",raw:true,
  def:()=>({canal:"form",kicker:"Alarma para tu hogar",headline:"La tranquilidad de saber que tu casa",italic:"está protegida",sub:"Un experto estudia tu caso y te propone lo que de verdad necesitas. Sin compromiso.",proof:"{{VALORACION}} ★★★★★|{{N_OPINIONES}} opiniones verificadas\n24 h|Central Receptora\n{{AÑOS}}|de experiencia",quote:"{{TESTIMONIO_REAL}}",author:"{{NOMBRE}}, {{CIUDAD}}",formTitle:"Tu estudio gratuito",formSub:"Responde 1 pregunta y te llamamos con una propuesta a medida.",question:"¿Dónde lo necesitas?",options:"🏠 Casa|🏢 Piso|🏪 Negocio|🏡 2ª vivienda",step2:"¡Perfecto! ¿A qué teléfono te llamamos?",btn:"Quiero mi estudio gratis",safe:"Tus datos están protegidos · no hacemos spam",img:"",imgAlt:"",layout:"auto",illus:"auto",badge:""}),
  fields:[{k:"canal",l:"Canal principal",t:"select",opts:V4_CANAL},{k:"kicker",l:"Antetítulo"},{k:"headline",l:"Titular"},{k:"italic",l:"Final del titular (cursiva)"},{k:"sub",l:"Subtítulo",t:"ta"},{k:"proof",l:"Prueba (valor|texto, una por línea)",t:"ta"},{k:"quote",l:"Testimonio (real)"},{k:"author",l:"Autor del testimonio"},{k:"formTitle",l:"Título del formulario"},{k:"formSub",l:"Texto del formulario"},{k:"question",l:"Pregunta del paso 1"},{k:"options",l:"Opciones (separadas por |)"},{k:"step2",l:"Texto del paso 2"},{k:"btn",l:"Botón final"},{k:"safe",l:"Texto de seguridad"},...V4_VISF],
  render:p=>{const c=p.canal||"form";const opts=v4C(p.options).filter(Boolean);
    const top=c==="call"?`${v4Tel()} class="db-chan">${I_TEL()} ${vt("callNow")} · ${esc(telText())}</a><div class="db-or">o solicita tu estudio y te llamamos</div>`:c==="wa"?`${v4Wa()} class="db-chan wa">${I_WA()} ${vt("waWrite")}</a><div class="db-or">o solicita tu estudio y te llamamos</div>`:"";
    const L=ncHeroLayout(p),bg=L==="photo"&&ncLookBg(p);
    return `<header class="db db-hero${L==="photo"?' nc-hx':''}${bg?' nc-bg':''}${v4MO(p)}">${bg?`<div class="nc-bgvis">${ncVisual(p)}</div>`:''}<div class="container"><div class="row g-4 g-lg-5 align-items-${L==="photo"&&!bg?'center':'start'}">
    <div class="col-lg-6 nc-hx-txt"><div class="db-kicker">${esc(p.kicker)}</div><h1 class="db-h1">${esc(p.headline)} ${p.italic?`<em>${esc(p.italic)}</em>`:""}</h1><p class="db-sub">${esc(p.sub)}</p>
      <div class="db-proof">${v4L(p.proof).map(l=>{const x=v4C(l);return `<div><b>${esc(x[0])}</b>${esc(x[1]||'')}</div>`;}).join("")}</div>
      ${p.quote?`<blockquote class="db-quote">“${esc(p.quote)}”<span>— ${esc(p.author)}</span></blockquote>`:""}</div>
    <div class="col-lg-5 offset-lg-1">${L==="photo"&&!bg?ncVisual(p):''}<div class="db-form" id="form" data-live data-quiz>${ncAnn(p.annot||vt("oneQ"),"nc-ann-in")}
      ${top}<div class="db-bar"><i data-quiz-bar></i></div><h2>${esc(p.formTitle)}</h2>
      <div data-step><p>${esc(p.formSub)}</p><div class="db-q">${esc(p.question)}</div><div class="db-opts">${opts.map(o=>{const e=ncSplitEmoji(o);return `<button type="button" class="db-opt" data-opt="${esc(e.text||o)}" data-q="${esc(p.question)}">${e.ico?ncIco(e.ico):''}${esc(e.text||o)}</button>`;}).join("")}</div></div>
      <div data-step style="display:none"><p>${esc(p.step2)}</p>${v4PhoneForm({btn:p.btn,btnCls:"db-go",ph:"600 000 000"})}<button type="button" class="db-back" data-quiz-back>${vt("back")}</button></div>
      <div class="db-safe">${ncIco("lock")} ${esc(p.safe)}</div></div></div>
    </div></div></header>`;}},
db_seals:{label:"B · Sellos y certificados",ico:"🛡️",cat:"B · Confianza editorial",raw:true,
  def:()=>({label:"Certificados y reconocimientos",items:"{{SELLO_1}}\n{{SELLO_2}}\n{{SELLO_3}}\n{{SELLO_4}}",logos:[]}),
  fields:[{k:"label",l:"Etiqueta"},{k:"items",l:"Sellos en texto (uno por línea)",t:"ta"},{k:"logos",l:"Logos de sellos (imágenes)",t:"images"}],
  render:p=>`<section class="db db-seals"><div class="container d-flex flex-wrap align-items-center justify-content-between gap-3"><span class="t">${esc(p.label)}</span>${arr(p.logos).length?arr(p.logos).map(s=>`<img src="${s}" alt="" class="db-seal-img">`).join(""):v4L(p.items).map(s=>`<span class="db-seal">${esc(s)}</span>`).join("")}</div></section>`},
db_steps:{label:"B · Cómo funciona",ico:"⑃",cat:"B · Confianza editorial",raw:true,
  def:()=>({title:"Así de sencillo",sub:"Sin visitas comerciales sorpresa ni presupuestos cerrados.",items:"Nos cuentas tu caso|Una pregunta rápida y tu teléfono.\nTe llamamos|Un asesor te explica opciones y precio final.\nLo dejamos listo|Nos encargamos de todo."}),
  fields:[{k:"title",l:"Título"},{k:"sub",l:"Subtítulo"},{k:"items",l:"Pasos (título|texto)",t:"ta"}],
  render:p=>`<section class="db db-sec"><div class="container"><div class="mb-5" style="max-width:640px"><h2 class="db-h2">${esc(p.title)}</h2><p class="db-muted">${esc(p.sub)}</p></div><div class="row g-4 ${v4ML(p,"list")}">${v4L(p.items).map((l,i)=>{const c=v4C(l);return `<div class="col-md-4"><div class="db-step"><div class="n">${String(i+1).padStart(2,'0')}</div><h3>${esc(c[0])}</h3><p>${esc(c[1]||'')}</p></div></div>`;}).join("")}</div></div></section>`},
db_compare:{label:"B · Comparativa honesta",ico:"⚖️",cat:"B · Confianza editorial",raw:true,
  def:()=>({title:"Qué incluye",head:"Incluido|Con nosotros|Otras opciones",rows:"Aviso a emergencias|✓ Sí|✗ No\nCentral 24 h|✓ Sí|✗ No\nMantenimiento|✓ Incluido|Por tu cuenta"}),
  fields:[{k:"title",l:"Título"},{k:"head",l:"Cabecera (col1|col2|col3)"},{k:"rows",l:"Filas (col1|col2|col3)",t:"ta"}],
  render:p=>`<section class="db db-sec pt-0"><div class="container"><h2 class="db-h2 mb-4">${esc(p.title)}</h2><div class="db-compare"><table class="table mb-0"><thead><tr>${v4C(p.head).map(h=>`<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${v4L(p.rows).map(l=>`<tr>${v4C(l).map((c,i)=>`<td class="${i===1?'yes':''}" data-l="${esc(v4C(p.head)[i]||'')}"><span>${ncMark(c)}</span></td>`).join("")}</tr>`).join("")}</tbody></table></div></div></section>`},
db_reviews:{label:"B · Opiniones reales",ico:"❝",cat:"B · Confianza editorial",raw:true,
  def:()=>({title:"Lo que dicen nuestros clientes",source:"Opiniones verificadas en {{PLATAFORMA}}",items:"{{TESTIMONIO_1}}|{{NOMBRE_1}}|{{CIUDAD_1}}\n{{TESTIMONIO_2}}|{{NOMBRE_2}}|{{CIUDAD_2}}\n{{TESTIMONIO_3}}|{{NOMBRE_3}}|{{CIUDAD_3}}"}),
  fields:[{k:"title",l:"Título"},{k:"source",l:"Fuente de las opiniones"},{k:"items",l:"Opiniones (texto|nombre|ciudad) — solo reales",t:"ta"}],
  render:p=>`<section class="db db-sec soft"><div class="container"><h2 class="db-h2">${esc(p.title)}</h2><p class="db-muted mb-5">${esc(p.source)}</p><div class="row g-4 ${v4ML(p,"rail")}">${v4L(p.items).map(l=>{const c=v4C(l);return `<div class="col-md-4"><figure class="db-rev"><div class="st">★★★★★</div><blockquote>“${esc(c[0])}”</blockquote><figcaption>${esc(c[1]||'')}${c[2]?` · ${esc(c[2])}`:""}</figcaption></figure></div>`;}).join("")}</div></div></section>`},
db_faq:{label:"B · Preguntas frecuentes",ico:"?",cat:"B · Confianza editorial",raw:true,
  def:()=>({title:"Resolvemos tus dudas",items:"¿Tiene algún coste el estudio?|{{RESPUESTA}}\n¿Hay permanencia?|{{RESPUESTA}}\n¿Qué pasa con mis datos?|{{RESPUESTA}}"}),
  fields:[{k:"title",l:"Título"},{k:"items",l:"Preguntas (pregunta|respuesta)",t:"ta"}],
  render:p=>`<section class="db db-sec"><div class="container" style="max-width:780px"><h2 class="db-h2 mb-4">${esc(p.title)}</h2>${v4Faq(p,'db')}</div></section>`},
db_cta:{label:"B · CTA final",ico:"▬",cat:"B · Confianza editorial",raw:true,
  def:()=>({title:"Hablemos de tu caso, sin compromiso",sub:"Te llamamos cuando mejor te venga.",btn:"Que me llamen"}),
  fields:[{k:"title",l:"Título"},{k:"sub",l:"Subtítulo"},{k:"btn",l:"Botón"}],
  render:p=>`<section class="db db-ctab"><div class="container"><div class="db-ctabox"><div><h2>${esc(p.title)}</h2><p>${esc(p.sub)}</p></div>${v4PhoneForm({btn:p.btn,btnCls:"db-go",cls:"db-inline"})}</div></div></section>`},
db_footer:{label:"B · Footer",ico:"▁",cat:"B · Confianza editorial",raw:true,
  def:()=>({company:"{{RAZON_SOCIAL}}",note:""}),fields:[{k:"company",l:"Razón social"},{k:"note",l:"Nota"}],
  render:p=>`<footer class="db db-foot"><div class="container d-flex flex-wrap justify-content-between gap-2"><span>© ${esc(p.company)}${p.note?` · ${esc(p.note)}`:""}</span><span>${v4Legal()}</span></div></footer>`},
db_sticky:{label:"B · Barra fija móvil",ico:"⤓",cat:"B · Confianza editorial",raw:true,
  def:()=>({canal:"form",call:"Llamar",form:"Estudio gratis",wa:"WhatsApp"}),fields:V4_STICKYF,
  render:p=>`<div class="db db-sticky">${v4StickyBtns(p,"pri","sec")}</div>`},

/* ============ C · PREMIUM PRODUCTO ============ */
dc_nav:{label:"C · Nav glass",ico:"▭",cat:"C · Premium producto",raw:true,
  def:()=>({logo:"{{LOGO}}",logoImg:"",telLabel:""}),fields:V4_NAVF,
  render:p=>`<nav class="dc dc-nav"><div class="container d-flex align-items-center justify-content-between">${v4Logo(p,'dc-logo')}${v4Tel()} class="dc-pill w">${I_TEL()} ${esc(telText())}</a></div></nav>`},
dc_hero:{label:"C · Hero oscuro + buscador",ico:"◨",cat:"C · Premium producto",raw:true,
  def:()=>({canal:"form",chip:"Nuevo",chipText:"{{NOVEDAD}}",headline:"Paga solo",gradient:"lo que usas",sub:"Sin márgenes escondidos ni letra pequeña. Todo claro desde el primer día.",ph:"Tu teléfono",btn:"Calcular mi ahorro",note:"Te llamamos en minutos",kpis:"{{DATO_1}}|{{ETIQUETA_1}}\n0 €|permanencia\n100%|online",img:"",imgAlt:"",layout:"auto",illus:"auto",badge:""}),
  fields:[{k:"canal",l:"Canal principal",t:"select",opts:V4_CANAL},{k:"chip",l:"Chip (destacado)"},{k:"chipText",l:"Chip (texto)"},{k:"headline",l:"Titular"},{k:"gradient",l:"Parte en degradado"},{k:"sub",l:"Subtítulo",t:"ta"},{k:"ph",l:"Placeholder del campo"},{k:"btn",l:"Botón"},{k:"note",l:"Nota bajo el campo"},{k:"kpis",l:"Cifras (valor|texto)",t:"ta"},...V4_VISF.filter(f=>f.k!=="illus"&&f.k!=="badge")],
  render:p=>{const c=p.canal||"form";
    const big=c==="call"?`<div class="dc-big">${v4Tel()} class="dc-pill w lg">${I_TEL()} ${vt("callNow")} · ${esc(telText())}</a></div><div class="dc-or">${vt("orPhone")}</div>`:c==="wa"?`<div class="dc-big">${v4Wa()} class="dc-pill wa lg">${I_WA()} ${vt("waWrite")}</a></div><div class="dc-or">${vt("orPhone")}</div>`:"";
    const alts=[c!=="call"?`${v4Tel()} class="dc-pill g">${I_TEL()} ${vt("preferCall")}</a>`:"",c!=="wa"?`${v4Wa()} class="dc-pill wa">${I_WA()} WhatsApp</a>`:""].join("");
    if(ncHeroLayout(p)==="photo")return v4HeroCPhoto(p,big,alts);
    return `<header class="dc dc-hero"><div class="dc-glow a"></div><div class="dc-glow b"></div><div class="container position-relative text-center">
    ${p.chipText?`<span class="dc-chip">${p.chip?`<b>${esc(p.chip)}</b> `:""}${esc(p.chipText)}</span>`:""}
    <h1 class="dc-h1">${esc(p.headline)} ${p.gradient?`<span class="dc-grad">${esc(p.gradient)}</span>`:""}</h1><p class="dc-sub">${esc(p.sub)}</p>
    ${big}<div id="form">${v4PhoneForm({btn:p.btn+" →",btnCls:"dc-go",cls:"dc-formbar",ph:p.ph})}</div><div class="dc-note">${esc(p.note)}</div>
    <div class="dc-alt">${alts}</div>
    <div class="dc-kpis">${v4L(p.kpis).map(l=>{const x=v4C(l);return `<div class="dc-kpi"><b>${esc(x[0])}</b><span>${esc(x[1]||'')}</span></div>`;}).join("")}</div></div></header>`;}},
dc_bento:{label:"C · Bento de ventajas",ico:"▥",cat:"C · Premium producto",raw:true,
  def:()=>({title:"Una tarifa que",gradient:"se explica sola",sub:"Todo lo que necesitas saber, en un vistazo.",tiles:"Precio claro, sin sorpresas|Pagas lo que ves. Sin comisiones ocultas.|dark|{{PRECIO}}|al mes, IVA incl.\nControla desde la app|Consulta tu consumo cuando quieras.||\nCambio sin cortes|Nos encargamos del papeleo.||\nAtención 24/7|Personas de verdad, cuando lo necesites.|dark|"}),
  fields:[{k:"title",l:"Título"},{k:"gradient",l:"Parte en degradado"},{k:"sub",l:"Subtítulo"},{k:"tiles",l:"Tarjetas (título|texto|dark|cifra|nota cifra)",t:"ta"}],
  render:p=>`<section class="dc dc-sec"><div class="container text-center"><h2 class="dc-h2">${esc(p.title)}<br><span class="dc-grad">${esc(p.gradient)}</span></h2><p class="dc-lead">${esc(p.sub)}</p>
    <div class="dc-bento text-start">${v4L(p.tiles).map(l=>{const c=v4C(l);return `<div class="dc-tile ${c[2]==='dark'?'d':''}"><h3>${esc(c[0])}</h3><p>${esc(c[1]||'')}</p>${c[3]?`<div class="big">${esc(c[3])}<small>${esc(c[4]||'')}</small></div>`:""}${c[2]==='dark'&&c[3]?'<div class="dc-orb"></div>':''}</div>`;}).join("")}</div></div></section>`},
dc_logos:{label:"C · Logos / medios",ico:"❖",cat:"C · Premium producto",raw:true,
  def:()=>({label:"{{N}} clientes confían en nosotros",items:"{{LOGO_1}}\n{{LOGO_2}}\n{{LOGO_3}}\n{{LOGO_4}}\n{{LOGO_5}}\n{{LOGO_6}}",logos:[]}),
  fields:[{k:"label",l:"Texto"},{k:"items",l:"Nombres (si no hay imágenes)",t:"ta"},{k:"logos",l:"Logos (imágenes)",t:"images"}],
  render:p=>`<section class="dc dc-logos"><div class="container"><p>${esc(p.label)}</p><div class="dc-lgrid">${arr(p.logos).length?arr(p.logos).map(s=>`<div><img src="${s}" alt=""></div>`).join(""):v4L(p.items).map(s=>`<div>${esc(s)}</div>`).join("")}</div></div></section>`},
dc_faq:{label:"C · Preguntas frecuentes",ico:"?",cat:"C · Premium producto",raw:true,
  def:()=>({title:"Preguntas frecuentes",items:"¿Cómo funciona?|{{RESPUESTA}}\n¿Hay permanencia?|{{RESPUESTA}}\n¿Cuánto tardáis en llamar?|{{RESPUESTA}}"}),
  fields:[{k:"title",l:"Título"},{k:"items",l:"Preguntas (pregunta|respuesta)",t:"ta"}],
  render:p=>`<section class="dc dc-sec pt-0"><div class="container" style="max-width:780px"><h2 class="dc-h2 text-center mb-4" style="font-size:clamp(28px,3.4vw,44px)">${esc(p.title)}</h2>${v4Faq(p,'dc')}</div></section>`},
dc_cta:{label:"C · CTA final oscuro",ico:"▬",cat:"C · Premium producto",raw:true,
  def:()=>({title:"Empieza a pagar",gradient:"lo justo",btn:"Quiero que me llamen"}),
  fields:[{k:"title",l:"Título"},{k:"gradient",l:"Parte en degradado"},{k:"btn",l:"Botón"},V4_ACTF],
  render:p=>`<section class="dc pb-5"><div class="container"><div class="dc-cta"><div class="dc-glow a"></div><h2 class="dc-h2 position-relative">${esc(p.title)}<br><span class="dc-grad">${esc(p.gradient)}</span></h2><div class="position-relative mt-4"><a href="#form" data-cta="form"${v4ActA(p)} class="dc-pill w lg">${esc(p.btn)} →</a></div></div></div></section>`},
dc_footer:{label:"C · Footer",ico:"▁",cat:"C · Premium producto",raw:true,
  def:()=>({company:"{{RAZON_SOCIAL}}"}),fields:[{k:"company",l:"Razón social"}],
  render:p=>`<footer class="dc dc-foot"><div class="container d-flex flex-wrap justify-content-between gap-2"><span>© ${esc(p.company)}</span><span>${v4Legal()}</span></div></footer>`},
dc_sticky:{label:"C · Barra fija móvil",ico:"⤓",cat:"C · Premium producto",raw:true,
  def:()=>({canal:"form",call:"Llamar",form:"Te llamamos",wa:"WhatsApp"}),fields:V4_STICKYF,
  render:p=>`<div class="dc dc-sticky">${v4StickyBtns(p,"dc-pill w","dc-pill g")}</div>`},
});
ORDER.unshift(...Object.keys(LIB).filter(k=>/^d[abc]_/.test(k)));

/* Bloques "literales" de marcas ajenas: siguen funcionando en landings guardadas, pero salen de la paleta */
["apple","movistar","tmobile","o2","mytraffic","abtasty","verizon"].forEach(b=>Object.keys(LIB).forEach(k=>{if(LIB[k].brand===b)LIB[k].hidden=true;}));

/* ---------- CSS de las 3 direcciones (solo se incluye la familia que se usa) ---------- */
function ncDirCSS(){
  const used=new Set(state.sections.filter(s=>!s.hidden).map(s=>{const m=(s.type.match(/^(d[abcx])_/)||[])[1];return m==='dx'?'da':m;}).filter(Boolean));
  if(typeof ncPopNeeded==='function'&&ncPopNeeded())used.add('da');
  if(state.sections.some(s=>!s.hidden&&/^d[bc]_cta$/.test(s.type)))used.add('da'); /* variantes split/big del CTA usan piezas A */
  if(!used.size)return "";
  const common=ncHxCSS()+ncMobileCSS()+`.da,.db,.dc{--dline:var(--line,#e7e4f0)}.da h1,.da h2,.da h3,.db h1,.db h2,.db h3,.dc h1,.dc h2,.dc h3{font-family:var(--fhead)}
  .da .form-control,.db .form-control,.dc .form-control{font-size:16px}
  .da-faq .accordion-button,.db-faq .accordion-button,.dc-faq .accordion-button{font-weight:600}`;
  const A=`
  .da-top{background:var(--bink);color:#fff;font-size:13.5px;padding:9px 12px;text-align:center}.da-top b{color:color-mix(in srgb,var(--ba) 70%,#fff)}
  .da-nav{background:#fff;border-bottom:1px solid var(--dline);padding:12px 0;position:sticky;top:0;z-index:20}
  .da-logo{font:800 20px var(--fhead);color:var(--bink);display:flex;align-items:center;gap:8px}.da-logo i{width:26px;height:26px;border-radius:8px;background:var(--bp);display:inline-block}
  .da-call{display:inline-flex;align-items:center;gap:10px;background:var(--bp);color:var(--btntext,#fff);text-decoration:none;border-radius:12px;padding:9px 16px;font-weight:700;line-height:1.1}
  .da-call small{display:block;font-weight:500;font-size:11px;opacity:.85}
  .da-hero{background:linear-gradient(180deg,var(--bsoft) 0%,#fff 100%);padding:52px 0 60px}
  .da-eyebrow{display:inline-flex;gap:9px;align-items:center;font-size:12.5px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--bpt)}
  .da .dot{width:8px;height:8px;border-radius:50%;background:#22c55e;box-shadow:0 0 0 4px rgba(34,197,94,.18);display:inline-block;flex:0 0 auto}
  .da-h1{font-size:clamp(34px,4.6vw,58px);font-weight:800;line-height:1.03;letter-spacing:-.025em;margin:18px 0 14px;color:var(--bink)}
  .da-h1 mark{background:linear-gradient(transparent 60%,color-mix(in srgb,var(--bp) 22%,transparent) 60%);padding:0 .06em;color:inherit}
  .da-sub{font-size:18px;color:var(--bmuted);max-width:540px}
  .da-price{display:flex;flex-wrap:wrap;align-items:flex-end;gap:6px 14px;margin:24px 0 6px}.da-price .p{font:800 60px/.95 var(--fhead);letter-spacing:-.04em;color:var(--bink);min-width:0;overflow-wrap:anywhere}
  .da-price .u{font-size:13.5px;color:var(--bmuted);line-height:1.3}.da-price .u b{display:block;color:var(--bink);font-size:15px}
  .da-old{font-size:14px;color:var(--bmuted)}
  .da-checks{display:flex;flex-wrap:wrap;gap:8px 18px;margin:18px 0 0;padding:0;list-style:none;font-size:14.5px;font-weight:500;color:var(--bink)}
  .da-checks li:before,.da-plan li:before{content:"✓";color:#16a34a;font-weight:800;margin-right:6px}
  .da-btns{display:flex;gap:10px;flex-wrap:wrap;margin-top:26px}
  .da-btn{border-radius:12px;padding:14px 22px;font-weight:700;font-size:16px;text-decoration:none;display:inline-flex;align-items:center;gap:8px;border:2px solid transparent;transition:transform .15s,filter .15s}
  .da-btn:hover{transform:translateY(-1px);filter:brightness(1.04)}
  .da-btn.pri{background:var(--bp);color:var(--btntext,#fff);box-shadow:0 10px 24px -10px color-mix(in srgb,var(--bp) 70%,transparent)}
  .da-btn.pri.wa{background:#25D366;color:#063;box-shadow:none}
  .da-btn.sec{background:#fff;color:var(--bink);border-color:var(--bink)}
  .da-img{max-width:100%;margin-top:28px;border-radius:var(--cardr,16px)}
  .da-card{background:#fff;border:1px solid var(--dline);border-radius:20px;padding:26px;box-shadow:0 30px 60px -30px color-mix(in srgb,var(--bink) 45%,transparent);color:var(--bink)}
  .da-card h2{font-size:24px;font-weight:800;margin:0 0 4px}.da-card p{color:var(--bmuted);font-size:14.5px;margin:0 0 16px}
  .da-card .form-control{border-radius:12px;padding:14px 16px;border:1.5px solid var(--dline)}
  .da-go{width:100%;background:var(--bp);color:var(--btntext,#fff);font:800 17px var(--fhead);border:0;border-radius:12px;padding:15px;margin-top:4px}
  .da-go.alt{background:var(--bink);color:#fff}
  .da-bigcall,.da-bigwa{display:flex;justify-content:center;align-items:center;gap:8px;border-radius:14px;padding:18px;font:800 22px var(--fhead);text-decoration:none;background:var(--bp);color:var(--btntext,#fff)}
  .da-bigwa{background:#25D366;color:#063;font-size:19px}
  .da-or{text-align:center;font-size:13px;color:var(--bmuted);margin:14px 0 10px}
  .da-live{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--bmuted);margin-top:14px;padding-top:14px;border-top:1px dashed var(--dline)}
  .da-trust{border-top:1px solid var(--dline);border-bottom:1px solid var(--dline);padding:18px 0;background:#fff}
  .da-trust .it{display:flex;flex-wrap:wrap;align-items:baseline;gap:2px 8px;font-size:14px;color:var(--bmuted);min-width:0}.da-trust .it b{font:800 20px var(--fhead);color:var(--bink);overflow-wrap:anywhere}
  @media (max-width:575px){.da-trust .it b{font-size:17px}}
  .da-sec{padding:72px 0;background:#fff}.da-sec.soft{background:var(--bsoft)}
  .da-h2{font-size:clamp(28px,3.2vw,40px);font-weight:800;letter-spacing:-.02em;color:var(--bink)}
  .da-muted{color:var(--bmuted)}
  .da-plan{border:1.5px solid var(--dline);border-radius:18px;padding:24px;height:100%;background:#fff;position:relative;display:flex;flex-direction:column;color:var(--bink)}
  .da-plan.best{border-color:var(--bp);box-shadow:0 20px 40px -24px color-mix(in srgb,var(--bp) 70%,transparent)}
  .da-plan .tag{position:absolute;top:-12px;left:24px;background:var(--bp);color:var(--btntext,#fff);font-size:12px;font-weight:700;border-radius:99px;padding:4px 10px}
  .da-plan h3{font-size:18px;font-weight:800}.da-plan .pp{font:800 40px var(--fhead);letter-spacing:-.03em;overflow-wrap:anywhere;min-width:0}.da-plan .pp small{font-size:15px;font-weight:600;color:var(--bmuted);margin-left:4px}
  .da-plan ul{list-style:none;padding:0;margin:14px 0 20px;font-size:14.5px;color:var(--bmuted);flex:1}.da-plan li{padding:7px 0;border-bottom:1px solid var(--dline)}
  .da-ben{background:#fff;border-radius:16px;padding:20px;height:100%;border:1px solid var(--dline)}.da-ben .ic{font-size:26px;color:var(--bpt);display:inline-flex}.da-ben h3{font-size:17px;font-weight:800;margin:10px 0 6px;color:var(--bink)}.da-ben p{font-size:14px;color:var(--bmuted);margin:0}
  .da-ben-rows{border-top:1px solid var(--bink)}.da-ben-rows .r{display:grid;grid-template-columns:48px minmax(160px,.8fr) 1.4fr;gap:6px 24px;align-items:baseline;padding:22px 0;border-bottom:1px solid var(--dline)}
  .da-ben-rows .ic{font-size:24px;color:var(--bpt);align-self:center}.da-ben-rows h3{font-size:20px;font-weight:800;margin:0;color:var(--bink)}.da-ben-rows p{margin:0;color:var(--bmuted)}
  .da-ben-num .nb{border-top:2px solid var(--bink);padding-top:16px;height:100%}.da-ben-num .nn{font:700 13px var(--fhead);color:var(--bpt);letter-spacing:.04em}.da-ben-num h3{font-size:22px;font-weight:800;margin:28px 0 8px;color:var(--bink)}.da-ben-num p{color:var(--bmuted);margin:0;font-size:15px}
  .da-trust-big{padding:40px 0}.da-trust-big .it{flex-direction:column;gap:6px}.da-trust-big .it b{font-size:clamp(34px,4vw,52px);line-height:1;letter-spacing:-.03em}
  .da-tick{overflow:hidden;white-space:nowrap;padding:16px 0;background:var(--bink)!important;color:#fff;border:0}.da-tick .trk{display:inline-flex;gap:28px;align-items:center;font:600 17px var(--fhead);padding-left:28px}
  .da-tick b{color:color-mix(in srgb,var(--ba) 70%,#fff);font-weight:800}.da-tick i{font-style:normal;opacity:.5}
  @media (prefers-reduced-motion:no-preference){.da-tick .trk{animation:ncTk 28s linear infinite}@keyframes ncTk{to{transform:translateX(-50%)}}}
  @media (max-width:767px){.da-ben-rows .r{grid-template-columns:36px 1fr;padding:16px 0}.da-ben-rows .r p{grid-column:2}.da-ben-num h3{margin-top:14px;font-size:19px}.da-tick .trk{font-size:15px}}
  .da-ctab{background:var(--bink);color:#fff;padding:56px 0}.da-ctab h2{font-size:clamp(26px,3vw,36px);font-weight:800}.da-ctab p{opacity:.8;margin:0}
  .da-inline{display:flex;gap:8px;flex-wrap:wrap}.da-inline .form-control{flex:1 1 200px;margin:0!important;border-radius:12px;padding:14px}.da-inline .da-go{width:auto;flex:0 0 auto;margin:0;padding:14px 22px;background:var(--bp)}
  .da-inline .nc-legal,.da-inline .nc-legal-info{order:3;flex-basis:100%;color:#fff}
  .da-foot{background:var(--bink);color:rgba(255,255,255,.62);font-size:13px;padding:26px 0}.da-foot a{color:inherit}
  .da-sticky{display:none}
  @media (max-width:767px){.da-sticky{display:flex;position:fixed;left:0;right:0;bottom:0;z-index:1040;gap:8px;padding:10px;background:#fff;border-top:1px solid var(--dline);box-shadow:0 -8px 24px rgba(0,0,0,.08)}
    .da-sticky .da-btn{flex:1;justify-content:center;padding:13px 8px;font-size:15px}body:has(.da-sticky){padding-bottom:74px}
    .da-hero{padding:28px 0 36px}.da-price .p{font-size:clamp(34px,11vw,50px)}.da-call small{display:none}}`;
  const B=`
  .db-nav,.db-hero,.db-sec,.db-seals,.db-ctab,.db-foot{background:var(--bpaper,color-mix(in srgb,var(--bsoft) 35%,#FBF9F6))}
  .db-nav{padding:18px 0;border-bottom:1px solid var(--dline)}
  .db-logo{font:600 21px var(--fhead);display:flex;align-items:center;gap:9px;color:var(--bink)}.db-logo i{width:24px;height:24px;border-radius:50%;background:var(--bp);display:inline-block}
  .db-navtel{color:var(--bink);text-decoration:none;font-weight:600;display:flex;gap:12px;align-items:center}.db-navtel small{color:var(--bmuted);font-weight:500}
  .db-hero{padding:64px 0 60px;color:var(--bink)}
  .db-kicker{font-size:13px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--bpt)}
  .db-h1{font-size:clamp(34px,4.4vw,58px);line-height:1.07;letter-spacing:-.015em;margin:14px 0 18px;font-weight:600}.db-h1 em{color:var(--bpt)}
  .db-sub{font-size:18px;line-height:1.6;color:var(--bmuted);max-width:540px}
  .db-proof{display:flex;flex-wrap:wrap;gap:24px;margin-top:28px}.db-proof div{font-size:13.5px;color:var(--bmuted);line-height:1.3}.db-proof b{display:block;font:600 24px var(--fhead);color:var(--bink)}
  .db-quote{margin:28px 0 0;padding:16px 18px;border-left:3px solid var(--bp);background:#fff;border-radius:0 12px 12px 0;font-size:15px;max-width:540px}.db-quote span{display:block;color:var(--bmuted);font-size:13px;margin-top:6px}
  .db-form{background:#fff;border:1px solid var(--dline);border-radius:18px;padding:28px;box-shadow:0 24px 48px -32px color-mix(in srgb,var(--bink) 45%,transparent)}
  .db-bar{height:4px;border-radius:4px;background:var(--dline);margin-bottom:18px;overflow:hidden}.db-bar i{display:block;height:100%;width:0;min-width:34%;background:var(--bp);transition:width .3s}
  .db-form h2{font-size:25px;margin:0 0 6px;font-weight:600}.db-form p{color:var(--bmuted);font-size:14.5px}
  .db-q{font-size:13.5px;font-weight:700;margin:6px 0 8px}
  .db-opts{display:grid;grid-template-columns:1fr 1fr;gap:8px}
  .db-opt{border:1px solid var(--dline);border-radius:10px;padding:13px 10px;font-size:14.5px;font-weight:500;background:#fff;color:var(--bink);display:flex;align-items:center;justify-content:center;gap:8px}.db-opt .nci{color:var(--bpt)}
  .db-opt:hover,.db-opt.on{border-color:var(--bp);background:color-mix(in srgb,var(--bp) 8%,#fff);color:var(--bpt)}
  .db-form .form-control{border-radius:10px;padding:13px 14px}
  .db-go{width:100%;margin-top:6px;background:var(--bink);color:#fff;border:0;border-radius:10px;padding:15px;font-weight:600;font-size:16px}
  .db-back{background:none;border:0;color:var(--bmuted);font-size:13px;margin-top:10px;padding:0}
  .db-safe{text-align:center;font-size:12.5px;color:var(--bmuted);margin-top:14px}
  .db-chan{display:flex;justify-content:center;gap:8px;align-items:center;background:var(--bp);color:var(--btntext,#fff);border-radius:12px;padding:15px;font-weight:700;text-decoration:none;font-size:17px}.db-chan.wa{background:#25D366;color:#063}
  .db-or{text-align:center;font-size:12.5px;color:var(--bmuted);margin:12px 0 16px}
  .db-seals{border-top:1px solid var(--dline);border-bottom:1px solid var(--dline);padding:22px 0}.db-seals .t{font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--bmuted)}
  .db-seal{font-weight:600;font-size:15px;color:color-mix(in srgb,var(--bmuted) 70%,#fff)}.db-seal-img{max-height:40px;filter:grayscale(1);opacity:.75}
  .db-sec{padding:80px 0;color:var(--bink)}.db-sec.soft{background:#fff}
  .db-h2{font-size:clamp(28px,3.2vw,42px);font-weight:600;letter-spacing:-.01em}.db-muted{color:var(--bmuted);font-size:17px}
  .db-step{border-top:1px solid var(--bink);padding-top:18px}.db-step .n{font:600 15px var(--fhead);color:var(--bpt)}.db-step h3{font-size:22px;margin:6px 0 8px;font-weight:600}.db-step p{color:var(--bmuted);font-size:15px}
  .db-compare{background:#fff;border:1px solid var(--dline);border-radius:16px;overflow:hidden}
  .db-compare th{font-size:12.5px;color:var(--bmuted);text-transform:uppercase;letter-spacing:.05em;background:color-mix(in srgb,var(--bsoft) 60%,#fff)}
  .db-compare td,.db-compare th{padding:14px 18px;border-color:var(--dline)}.db-compare td.yes{color:#1F7A4D;font-weight:700}.db-compare .nci.ok{color:#1F7A4D;margin-right:6px}.db-compare .nci.no{color:#B42318;margin-right:6px}
  .db-rev{background:var(--bpaper,#FBF9F6);border:1px solid var(--dline);border-radius:16px;padding:22px;height:100%;margin:0}.db-rev .st{color:#E3A008;letter-spacing:2px}.db-rev blockquote{font-size:15.5px;margin:10px 0 14px}.db-rev figcaption{color:var(--bmuted);font-size:13px}
  .db-ctab{padding:0 0 80px}.db-ctabox{background:var(--bink);color:#fff;border-radius:22px;padding:40px;display:flex;flex-wrap:wrap;gap:24px;align-items:center;justify-content:space-between}
  .db-ctabox h2{font-size:clamp(24px,2.8vw,34px);font-weight:600;margin:0 0 6px}.db-ctabox p{opacity:.75;margin:0}
  .db-inline{display:flex;gap:8px;flex-wrap:wrap;flex:1 1 360px;max-width:520px}.db-inline .form-control{flex:1 1 200px;margin:0!important;border-radius:10px;padding:14px}.db-inline .db-go{width:auto;margin:0;background:#fff;color:var(--bink);padding:14px 20px}
  .db-inline .nc-legal,.db-inline .nc-legal-info{order:3;flex-basis:100%;color:#fff}
  .db-foot{border-top:1px solid var(--dline);color:var(--bmuted);font-size:13px;padding:26px 0}.db-foot a{color:inherit}
  .db-sticky{display:none}
  @media (max-width:767px){.db-hero{padding:32px 0}.db-navtel small{display:none}.db-compare td,.db-compare th{padding:11px 9px;font-size:13.5px}
    .db-sticky{display:flex;position:fixed;left:12px;right:12px;bottom:12px;z-index:1040;background:var(--bink);border-radius:14px;padding:6px;gap:6px;box-shadow:0 12px 30px rgba(0,0,0,.25)}
    .db-sticky a{flex:1;text-align:center;color:#fff;text-decoration:none;font-weight:600;padding:12px 6px;border-radius:10px;font-size:15px}.db-sticky a.pri{background:#fff;color:var(--bink)}
    body:has(.db-sticky){padding-bottom:84px}.db-ctabox{padding:28px 22px}}`;
  const C=`
  .dc{--dk:color-mix(in srgb,var(--bink) 30%,#07060B);--gl:rgba(255,255,255,.06);--gb:rgba(255,255,255,.11)}
  .dc-grad{color:color-mix(in srgb,var(--bp) 50%,#fff)}
  .dc-nav{position:sticky;top:0;z-index:20;background:color-mix(in srgb,var(--dk) 82%,transparent);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom:1px solid var(--gb);padding:14px 0}
  .dc-logo{font:700 17px var(--fhead);color:#fff;display:flex;align-items:center;gap:9px}.dc-logo i{width:22px;height:22px;border-radius:7px;background:linear-gradient(135deg,var(--bp),var(--ba));display:inline-block}
  .dc-pill{display:inline-flex;align-items:center;justify-content:center;gap:8px;border-radius:99px;padding:10px 20px;font-weight:600;font-size:14.5px;text-decoration:none;border:1px solid transparent}
  .dc-pill.w{background:#fff;color:#000}.dc-pill.g{background:var(--gl);border-color:var(--gb);color:#fff}.dc-pill.wa{background:#25D366;color:#053}.dc-pill.lg{padding:15px 28px;font-size:16.5px}
  .dc-hero{background:var(--dk);color:#fff;position:relative;overflow:hidden;padding:90px 0 110px}
  .dc-glow{position:absolute;border-radius:50%;filter:blur(110px);pointer-events:none}
  .dc-glow.a{width:620px;height:620px;background:radial-gradient(circle,color-mix(in srgb,var(--bp) 30%,transparent),transparent 65%);top:-260px;left:50%;transform:translateX(-60%)}
  .dc-glow.b{width:420px;height:420px;background:radial-gradient(circle,color-mix(in srgb,var(--ba) 12%,transparent),transparent 65%);bottom:-160px;right:6%}
  .dc-chip{display:inline-flex;gap:8px;align-items:center;background:var(--gl);border:1px solid var(--gb);border-radius:99px;padding:6px 14px;font-size:13px;color:rgba(255,255,255,.82)}.dc-chip b{color:color-mix(in srgb,var(--ba) 75%,#fff)}
  .dc-h1{font-size:clamp(40px,6.4vw,82px);font-weight:800;line-height:1.03;letter-spacing:-.035em;margin:22px auto 18px;max-width:980px}
  .dc-sub{font-size:clamp(16px,1.6vw,20px);color:rgba(255,255,255,.64);max-width:600px;margin:0 auto;line-height:1.6}
  .dc-big{margin-top:34px}.dc-or{font-size:13px;color:rgba(255,255,255,.55);margin:14px 0 -20px}
  .dc-formbar{max-width:620px;margin:38px auto 0;background:#fff;border-radius:18px;padding:8px;display:flex;flex-wrap:wrap;gap:8px;box-shadow:0 30px 80px rgba(0,0,0,.45)}
  .dc-formbar .form-control{flex:1 1 220px;border:0!important;box-shadow:none!important;margin:0!important;padding:12px 14px}
  .dc-go{background:var(--dk);color:#fff;border:0;border-radius:12px;padding:14px 20px;font-weight:600;white-space:nowrap}
  .dc-formbar .nc-legal,.dc-formbar .nc-legal-info{order:3;flex-basis:100%;color:var(--bmuted);text-align:left;padding:0 8px 4px}
  .dc-note{font-size:12.5px;color:rgba(255,255,255,.5);margin-top:14px}
  .dc-alt{display:flex;gap:10px;justify-content:center;margin-top:18px;flex-wrap:wrap}
  .dc-kpis{margin:64px auto 0;display:grid;grid-template-columns:repeat(3,1fr);gap:12px;max-width:820px}
  .dc-kpi{background:var(--gl);border:1px solid var(--gb);border-radius:16px;padding:18px;text-align:left}.dc-kpi b{display:block;font:800 28px var(--fhead);letter-spacing:-.03em;overflow-wrap:anywhere}.dc-kpi span{font-size:13px;color:rgba(255,255,255,.55)}
  .dc-sec{padding:110px 0;background:#fff;color:var(--bink)}
  .dc-sec .dc-grad{color:var(--bpt)}
  .dc-h2{font-size:clamp(32px,4.6vw,60px);font-weight:800;line-height:1.05;letter-spacing:-.035em}
  .dc-lead{font-size:18px;color:var(--bmuted);max-width:620px;margin:18px auto 0}
  .dc-bento{display:grid;grid-template-columns:1.4fr 1fr;gap:14px;margin-top:56px}
  .dc-tile{border-radius:24px;padding:32px;min-height:220px;background:var(--bsoft);position:relative;overflow:hidden}
  .dc-tile.d{background:var(--dk);color:#fff}.dc-tile h3{font-size:25px;font-weight:700;position:relative;max-width:80%}
  .dc-tile p{color:var(--bmuted);max-width:340px;position:relative}.dc-tile.d p{color:rgba(255,255,255,.62)}
  .dc-tile .big{font:800 64px/1 var(--fhead);letter-spacing:-.05em;margin-top:18px;position:relative;overflow-wrap:anywhere}.dc-tile .big small{display:block;font-size:15px;font-weight:600;letter-spacing:0;margin-top:8px;opacity:.6}
  .dc-orb{position:absolute;right:-90px;top:-90px;width:240px;height:240px;border-radius:50%;background:radial-gradient(circle at 30% 30%,var(--ba),var(--bp) 60%,transparent 70%);opacity:.7}
  .dc-logos{padding:56px 0;background:#fff;border-bottom:1px solid var(--dline)}.dc-logos p{text-align:center;font-size:13px;color:var(--bmuted);margin-bottom:24px}
  .dc-lgrid{display:grid;grid-template-columns:repeat(6,1fr);border:1px solid var(--dline);border-radius:14px;overflow:hidden}
  .dc-lgrid div{padding:20px 12px;display:grid;place-items:center;border-right:1px solid var(--dline);font-weight:700;font-size:13px;color:color-mix(in srgb,var(--bmuted) 60%,#fff)}.dc-lgrid div:last-child{border-right:0}.dc-lgrid img{max-height:30px;filter:grayscale(1);opacity:.6}
  .dc-cta{background:var(--dk);color:#fff;border-radius:32px;padding:72px 24px;text-align:center;position:relative;overflow:hidden}
  .dc-foot{background:var(--dk);color:rgba(255,255,255,.5);font-size:13px;padding:26px 0}.dc-foot a{color:inherit}
  .dc-sticky{display:none}
  @media (max-width:767px){.dc-hero{padding:56px 0 70px}.dc-formbar{padding:10px}.dc-go{width:100%}
    .dc-kpis{gap:8px}.dc-kpi{padding:12px}.dc-kpi b{font-size:19px}.dc-kpi span{font-size:11.5px}
    .dc-bento{grid-template-columns:1fr}.dc-sec{padding:72px 0}.dc-orb{width:160px;height:160px;right:-80px;top:-80px;opacity:.45}
    .dc-lgrid{grid-template-columns:repeat(3,1fr)}.dc-lgrid div:nth-child(3n){border-right:0}
    .dc-sticky{display:flex;position:fixed;left:12px;right:12px;bottom:12px;z-index:1040;gap:6px;padding:6px;background:color-mix(in srgb,var(--dk) 92%,transparent);backdrop-filter:blur(12px);border:1px solid var(--gb);border-radius:99px}
    .dc-sticky a{flex:1}body:has(.dc-sticky){padding-bottom:84px}}`;
  const L=ncLum(ncBrandColor());const vars=`:root{--bpt:${L>.55?'var(--bink)':'var(--bp)'}}`;
  return vars+common+(used.has('da')?A:'')+(used.has('db')?B:'')+(used.has('dc')?C:'');
}

function ncLum(hex){const m=String(hex||"").trim().match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i);if(!m)return 0;let h=m[1];if(h.length===3)h=h.split("").map(c=>c+c).join("");
  const c=[0,2,4].map(i=>{const v=parseInt(h.substr(i,2),16)/255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4);});return .2126*c[0]+.7152*c[1]+.0722*c[2];}

/* ---------- Heros con foto / ilustración protagonista ---------- */
function v4HeroAPhoto(p){const c=p.canal||"form",bg=ncLookBg(p);
  const form=v4PhoneForm({btn:p.cardBtn||p.cta,btnCls:"da-go",cls:"da-inline",arrow:true});
  const top=c==="call"?`<div class="nc-hx-big">${v4Tel()} class="da-btn pri">${I_TEL()} ${vt("callFree")} · ${esc(telText())}</a></div><div class="nc-hx-or">${vt("orWeCall")}</div>`
    :c==="wa"?`<div class="nc-hx-big">${v4Wa()} class="da-btn pri wa">${I_WA()} ${vt("waWrite")}</a></div><div class="nc-hx-or">${vt("orPhone")}</div>`:"";
  const alt=`<div class="nc-hx-alt">${c==="call"?"":`${v4Tel()}>${I_TEL()} ${c==="form"?vt("orCallAt")+" ":""}${esc(telText())}</a>`}${p.live?`<span class="da-muted d-inline-flex align-items-center gap-2" style="font-size:13.5px"><span class="dot"></span>${esc(p.live)}</span>`:""}</div>`;
  return `<header class="da da-hero nc-hx${bg?' nc-bg':''}${v4MO(p)}">${bg?`<div class="nc-bgvis">${ncVisual(p)}</div>`:''}<div class="container"><div class="row g-4 g-lg-5 align-items-center">
    <div class="${bg?'col-lg-8 col-xl-7':'col-lg-6'} nc-hx-txt">${p.eyebrow?`<span class="da-eyebrow"><span class="dot"></span>${esc(p.eyebrow)}</span>`:""}
      <h1 class="da-h1">${esc(p.headline)} ${p.highlight?`<mark>${esc(p.highlight)}</mark>`:""}</h1>
      <p class="da-sub">${esc(p.sub)}</p>
      ${p.price?`<div class="da-price"><div class="p">${esc(p.price)}${NC_SVG.circle}</div><div class="u"><b>${esc(p.priceUnit)}</b>${esc(p.priceNote)}</div></div>`:""}
      ${p.oldPrice?`<div class="da-old"><s>${esc(p.oldPrice)}</s> ${vt("old")}</div>`:""}
      ${v4Checks(p.checks,"da-checks")}
      <div class="nc-hx-form position-relative" id="form">${ncAnn(v4AnnA(p),"nc-ann-form")}${top}${form}</div>${alt}</div>
    ${bg?'':`<div class="col-lg-6">${ncVisual(p)}</div>`}
    </div></div></header>`;}
function v4HeroCPhoto(p,big,alts){const kp=v4L(p.kpis).map(l=>v4C(l));
  const scr=p.img?`<img src="${esc(p.img)}" alt="${esc(p.imgAlt||'')}">`:`<div class="lb">${esc((kp[0]||[])[1]||'')}</div><div class="big">${esc((kp[0]||[])[0]||'')}</div><div class="ln" style="width:70%"></div><div class="ln" style="width:45%"></div>
    <div class="bars"><i style="height:40%"></i><i style="height:62%"></i><i style="height:48%"></i><i style="height:78%"></i><i style="height:66%"></i><i style="height:92%"></i></div>${kp.slice(1,3).map(x=>`<div class="tile"><span>${esc(x[1]||'')}</span><b>${esc(x[0]||'')}</b></div>`).join("")}`;
  return `<header class="dc dc-hero nc-hx${v4MO(p)}"><div class="dc-glow a"></div><div class="dc-glow b"></div><div class="container position-relative"><div class="row g-4 g-lg-5 align-items-center">
    <div class="col-lg-7 nc-hx-txt">${p.chipText?`<span class="dc-chip">${p.chip?`<b>${esc(p.chip)}</b> `:""}${esc(p.chipText)}</span>`:""}
    <h1 class="dc-h1">${esc(p.headline)} ${p.gradient?`<span class="dc-grad">${esc(p.gradient)}</span>`:""}</h1><p class="dc-sub">${esc(p.sub)}</p>
    ${big}<div id="form">${v4PhoneForm({btn:p.btn,btnCls:"dc-go",cls:"dc-formbar",ph:p.ph,arrow:true})}</div><div class="dc-note">${esc(p.note)}</div>
    <div class="dc-alt">${alts}</div>
    <div class="dc-kpis">${kp.map(x=>`<div class="dc-kpi"><b>${esc(x[0]||'')}</b><span>${esc(x[1]||'')}</span></div>`).join("")}</div></div>
    <div class="col-lg-5 nc-phone-col"><div class="nc-phone"><div class="scr">${scr}</div></div></div></div></div></header>`;}

function ncLookBg(p){const v=p.vis||"auto";return ncLook()==="lux"&&!!p.img&&(v==="auto"||v==="photo");}

/* Variante "automática": cada estilo elige la composición que mejor le encaja */
const V4_AUTO_VAR={trust:{brutal:"ticker",retro:"ticker",swiss:"big",lux:"big",editorial:"big",prensa:"big",papel:"ticker"},ben:{editorial:"num",swiss:"num",lux:"rows",prensa:"num"}};
const v4VarDefault={trust:"row",ben:"cards"};
function v4Var(p,k){const v=p.variant||"auto";if(v!=="auto")return v;return (V4_AUTO_VAR[k]||{})[ncLook()]||v4VarDefault[k];}

/* Nota a mano del hero A: la primera ventaja del propio bloque (no se inventa nada) */
function v4AnnA(p){if(p.annot)return p.annot;const c=v4L(p.checks||"")[0];return c||"";}

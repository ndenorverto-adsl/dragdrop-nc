/* NC Landing Builder · v5.0 · Heros y secciones nuevas
   11 heros con composiciones distintas (partido a sangre, foto a pantalla completa, minimal, selector de oferta, editorial,
   vídeo, calculadora de ahorro, cupón, chat de WhatsApp, bento y cartel tipográfico) + 8 secciones (testimonio destacado,
   línea de tiempo, banda de teléfono, preguntas con contacto fijo, franja de oferta, cinta en movimiento, perfiles y
   qué incluye / qué no). Usan las clases comunes (.da-hero, .da-h1, .da-btn, .da-card, .da-sec…) para que cada estilo
   de diseño las vista, y los tokens de marca (--bp, --ba, --bink…). Ningún dato de negocio por defecto: {{PLACEHOLDER}}.
   El CSS y el JS solo se exportan si la landing usa alguno de estos bloques. */
const HX_F={canal:{k:"canal",l:"Canal principal",t:"select",opts:V4_CANAL},eyebrow:{k:"eyebrow",l:"Etiqueta"},headline:{k:"headline",l:"Titular"},
  highlight:{k:"highlight",l:"Parte destacada del titular"},sub:{k:"sub",l:"Subtítulo",t:"ta"},cta:{k:"cta",l:"Botón principal (canal formulario)"},
  btn:{k:"btn",l:"Botón del formulario"},opts:{k:"opts",l:"Opciones del formulario (A|B*|C · * = marcada)"},img:{k:"img",l:"Foto",t:"photo"},
  imgAlt:{k:"imgAlt",l:"Texto alternativo de la foto"},note:{k:"note",l:"Nota bajo el formulario"},checks:{k:"checks",l:"Ventajas (una por línea)",t:"ta"},
  price:{k:"price",l:"Precio"},priceUnit:{k:"priceUnit",l:"Unidad (€/mes)"},priceNote:{k:"priceNote",l:"Nota del precio"},
  kicker:{k:"kicker",l:"Etiqueta (opcional)"},title:{k:"title",l:"Título"},secSub:{k:"sub",l:"Subtítulo"}};
const hxF=(...k)=>k.map(x=>typeof x==="string"?HX_F[x]:x);
const hxEye=p=>p.eyebrow?`<span class="da-eyebrow">${esc(p.eyebrow)}</span>`:"";
const hxH1=(p,cls)=>`<h1 class="da-h1${cls?" "+cls:""}">${esc(p.headline)}${p.highlight?` <mark>${esc(p.highlight)}</mark>`:""}</h1>`;
const hxSub=p=>p.sub?`<p class="da-sub hx-sub">${esc(p.sub)}</p>`:"";
const hxChecks=p=>v4L(p.checks).length?v4Checks(p.checks,"da-checks hx-checks"):"";
function hxPri(p){const c=p.canal||"form";
  return c==="call"?`${v4Tel()} class="da-btn pri" aria-label="${esc(vt("callFree"))}: ${esc(telText())}">${I_TEL()} ${esc(telText())}</a>`
    :c==="wa"?`${v4Wa()} class="da-btn pri wa">${I_WA()} ${esc(vt("waWrite"))}</a>`
    :`<a href="#form" data-cta="form"${v4ActA(p)} class="da-btn pri">${esc(p.cta)} ${I_GO()}</a>`;}
function hxSec(p){return (p.canal||"form")==="call"?`<a href="#form" data-cta="form"${v4ActA(p)} class="da-btn sec">${esc(vt("weCall"))}</a>`:`${v4Tel()} class="da-btn sec">${I_TEL()} ${esc(telText())}</a>`;}
function hxAlt(p){return (p.canal||"form")==="call"?`<a href="#form" data-cta="form"${v4ActA(p)}>${esc(vt("orWeCall"))}</a>`:`${esc(vt("orCallAt"))} ${v4Tel()}>${esc(telText())}</a>`;}
const hxForm=(p,o)=>{o=o||{};return v4PhoneForm({btn:p.btn,btnCls:"da-go",opts:o.noOpts?"":p.opts,cls:o.cls||"",name:o.name});};
const hxStars=n=>{n=Math.max(0,Math.min(5,parseInt(n,10)||0));return n?`<span class="hx-stars" role="img" aria-label="${n} de 5">${"★".repeat(n)}${"☆".repeat(5-n)}</span>`:"";};
function hxImg(p,cls){return p.img?`<img src="${esc(p.img)}" alt="${esc(p.imgAlt||"")}" class="${cls||""}" fetchpriority="high">`:"";}
function hxWaText(t){const u=waHref();return u+(t?"?text="+encodeURIComponent(t):"");}
const HX_TONE=[["auto","Del estilo"],["brand","Color de marca"],["ink","Oscuro"],["paper","Claro"]];

Object.assign(LIB,{
/* ================= HEROS ================= */
dx_hsplit:{label:"✚ Hero partido a sangre (foto + precio)",ico:"◨",cat:"Heros v5",raw:true,
  def:()=>({canal:"form",eyebrow:"",headline:"Tu titular principal",highlight:"en pocas palabras",sub:"Explica en una frase qué consigue el cliente y por qué ahora.",checks:"{{VENTAJA_1}}\n{{VENTAJA_2}}\n{{VENTAJA_3}}",
    cta:"Quiero informarme",price:"{{PRECIO}}",priceUnit:"€/mes",priceNote:"",img:"",imgAlt:"",side:"right",illus:"auto"}),
  fields:hxF("canal","eyebrow","headline","highlight","sub","checks","cta",V4_ACTF,"price","priceUnit","priceNote","img","imgAlt",{k:"illus",l:"Mockup si no hay foto",t:"select",opts:NC_ILLUS},{k:"side",l:"Lado de la foto",t:"select",opts:[["right","Derecha"],["left","Izquierda"]]}),
  render:p=>{const vis=p.img?hxImg(p,"hx-cov"):`<div class="hx-mock">${ncVisual(Object.assign({},p,{vis:"mock",price:""}))}</div>`;
    return `<header class="da da-hero hx hx-split side-${p.side||"right"}"><div class="g"><div class="t"><div class="in">${hxEye(p)}${hxH1(p)}${hxSub(p)}${hxChecks(p)}
      <div class="da-btns">${hxPri(p)}${hxSec(p)}</div></div></div>
      <div class="m">${vis}${p.price?`<div class="hx-tag"><small>${esc(p.priceNote||"Desde")}</small><b>${esc(p.price)}</b><span>${esc(p.priceUnit)}</span></div>`:""}</div></div></header>`;}},
dx_hfull:{label:"✚ Hero foto a pantalla completa + formulario",ico:"▣",cat:"Heros v5",raw:true,
  def:()=>({canal:"form",eyebrow:"",headline:"Tu titular sobre la foto",highlight:"",sub:"Una frase que conecte con la situación del cliente.",checks:"",cta:"Quiero que me llaméis",img:"",imgAlt:"",scrim:"med",
    cardTitle:"Te llamamos gratis",cardSub:"Déjanos tu teléfono y te informamos sin compromiso.",btn:"Llamadme",opts:"",note:""}),
  fields:hxF("canal","eyebrow","headline","highlight","sub","checks","img","imgAlt",{k:"scrim",l:"Oscurecer la foto",t:"select",opts:[["soft","Poco"],["med","Medio"],["strong","Mucho"],["brand","Con el color de marca"],["side","Degradado lateral"]]},{k:"cardTitle",l:"Título de la tarjeta"},{k:"cardSub",l:"Texto de la tarjeta"},"btn","opts","note","cta",V4_ACTF),
  render:p=>{const c=p.canal||"form";
    const card=c==="call"?`<h2>${esc(vt("callNow"))}</h2><p>${esc(p.cardSub)}</p>${v4Tel()} class="da-bigcall">${I_TEL()} ${esc(telText())}</a><div class="da-or">${esc(vt("orWeCall"))}</div>${hxForm(p,{noOpts:1})}`
      :c==="wa"?`<h2>${esc(vt("waWrite"))}</h2><p>${esc(p.cardSub)}</p>${v4Wa()} class="da-bigwa">${I_WA()} ${esc(vt("waOpen"))}</a><div class="da-or">${esc(vt("orPhone"))}</div>${hxForm(p,{noOpts:1})}`
      :`<h2>${esc(p.cardTitle)}</h2><p>${esc(p.cardSub)}</p>${hxForm(p)}<p class="alt">${hxAlt(p)}</p>`;
    return `<header class="da da-hero hx hx-full sc-${p.scrim||"med"}${p.img?"":" no-img"}">${p.img?hxImg(p,"bgi"):""}<div class="container"><div class="row g-4 align-items-center">
      <div class="col-lg-7 tx">${hxEye(p)}${hxH1(p)}${hxSub(p)}${hxChecks(p)}${c!=="form"?`<div class="da-btns">${hxPri(p)}</div>`:""}</div>
      <div class="col-lg-5"><div class="hx-glass" id="form">${card}${p.note?`<p class="nt">${esc(p.note)}</p>`:""}</div></div></div></div></header>`;}},
dx_hmin:{label:"✚ Hero minimal centrado (formulario en línea)",ico:"▔",cat:"Heros v5",raw:true,
  def:()=>({canal:"form",eyebrow:"",headline:"Una promesa clara",highlight:"y nada más",sub:"Déjanos tu teléfono y te llamamos para explicártelo en 2 minutos.",btn:"Llamadme gratis",chips:"Sin compromiso\nTe llamamos en horario laboral\n{{DATO_DE_CONFIANZA}}",glow:"on"}),
  fields:hxF("canal","eyebrow","headline","highlight","sub","btn",{k:"chips",l:"Líneas de confianza (una por línea)",t:"ta"},{k:"glow",l:"Brillo de color de fondo",t:"select",opts:[["on","Sí"],["off","No"]]}),
  render:p=>{const c=p.canal||"form";
    const act=c==="call"?`<div class="da-btns justify-content-center">${hxPri(p)}</div><p class="alt">${hxAlt(p)}</p>`:c==="wa"?`<div class="da-btns justify-content-center">${hxPri(p)}${hxSec(p)}</div>`
      :`<div class="fm" id="form">${hxForm(p,{cls:"da-inline",noOpts:1})}</div><p class="alt">${hxAlt(p)}</p>`;
    return `<header class="da da-hero hx hx-min${p.glow==="off"?"":" glow"}"><div class="container"><div class="in">${hxEye(p)}${hxH1(p)}${hxSub(p)}${act}
      ${v4L(p.chips).length?`<ul class="chips">${v4L(p.chips).map(x=>`<li>${ncIco("check")}${esc(x)}</li>`).join("")}</ul>`:""}</div></div></header>`;}},
dx_hpicker:{label:"✚ Hero con selector de oferta",ico:"◉",cat:"Heros v5",raw:true,
  def:()=>({eyebrow:"",headline:"Elige lo que necesitas",highlight:"",sub:"Marca una opción y te llamamos con el precio final.",checks:"{{VENTAJA_1}}\n{{VENTAJA_2}}",
    pickTitle:"¿Qué te interesa?",plans:"{{OPCION_1}}|{{DETALLE_1}}|{{PRECIO_1}}|€/mes\n{{OPCION_2}}|{{DETALLE_2}}|{{PRECIO_2}}|€/mes*\n{{OPCION_3}}|{{DETALLE_3}}|{{PRECIO_3}}|€/mes",btn:"Quiero {opcion}",note:""}),
  fields:hxF("eyebrow","headline","highlight","sub","checks",{k:"pickTitle",l:"Título del selector"},{k:"plans",l:"Opciones (Nombre|detalle|precio|unidad · * al final = marcada)",t:"ta"},{k:"btn",l:"Botón ({opcion} = opción elegida)"},"note"),
  render:p=>{const L=v4L(p.plans).map(l=>{const c=v4C(l),on=/\*$/.test(l.trim());return {n:c[0],d:c[1]||"",pr:c[2]||"",u:(c[3]||"").replace(/\*$/,"")};});
    let sel=v4L(p.plans).findIndex(l=>/\*$/.test(l.trim()));if(sel<0)sel=0;const first=L[sel]?L[sel].n:"";
    return `<header class="da da-hero hx hx-pick"><div class="container"><div class="row g-4 g-lg-5 align-items-center"><div class="col-lg-6">${hxEye(p)}${hxH1(p)}${hxSub(p)}${hxChecks(p)}<p class="alt">${hxAlt(p)}</p></div>
      <div class="col-lg-6"><div class="da-card pk" id="form"><form data-callback data-pick action="${v4Act()}" method="post"><fieldset><legend>${esc(p.pickTitle)}</legend>
      ${L.map((o,i)=>`<label class="op"><input type="radio" name="oferta" value="${esc(o.n)}"${i===sel?" checked":""}><span class="bx"><span class="nm"><b>${esc(o.n)}</b>${o.d?`<small>${esc(o.d)}</small>`:""}</span>${o.pr?`<span class="pr"><b>${esc(o.pr)}</b><small>${esc(o.u)}</small></span>`:""}</span></label>`).join("")}</fieldset>
      <input required name="telefono" type="tel" class="form-control mb-2" placeholder="${esc(vt("phone"))}" autocomplete="tel"><button type="submit" class="da-go" data-tpl="${esc(p.btn)}">${esc(String(p.btn||"").replace("{opcion}",first))}</button></form>${p.note?`<p class="nt">${esc(p.note)}</p>`:""}</div></div></div></div></header>`;}},
dx_heditorial:{label:"✚ Hero editorial (revista)",ico:"❡",cat:"Heros v5",raw:true,
  def:()=>({canal:"form",kicker:"{{SECCION}}",headline:"Un titular con tono de artículo que despierte curiosidad",highlight:"",lead:"Un primer párrafo que explique el problema del lector y anticipe la solución, en lenguaje cercano y sin promesas exageradas.",
    byline:"",img:"",imgAlt:"",caption:"",cta:"Quiero más información",ctaNote:"Te llamamos sin compromiso"}),
  fields:hxF("canal",{k:"kicker",l:"Sección / antetítulo"},"headline","highlight",{k:"lead",l:"Entradilla",t:"ta"},{k:"byline",l:"Firma (opcional, p. ej. «Por {{AUTOR}} · {{FECHA}}»)"},"img","imgAlt",{k:"caption",l:"Pie de foto"},"cta",V4_ACTF,{k:"ctaNote",l:"Texto junto al botón"}),
  render:p=>`<header class="da da-hero hx hx-ed"><div class="container"><div class="kk">${p.kicker?`<span>${esc(p.kicker)}</span>`:""}<i></i></div><div class="row g-4 g-lg-5">
    <div class="col-lg-7">${hxH1(p)}${p.byline?`<p class="by">${esc(p.byline)}</p>`:""}<p class="ld">${esc(p.lead)}</p>
      <div class="cta">${hxPri(p)}${p.ctaNote?`<span>${esc(p.ctaNote)}</span>`:""}</div><p class="alt">${hxAlt(p)}</p></div>
    <div class="col-lg-5"><figure>${p.img?hxImg(p,""):`<div class="hx-mock">${ncVisual(Object.assign({},p,{vis:"mock"}))}</div>`}${p.caption?`<figcaption>${esc(p.caption)}</figcaption>`:""}</figure></div></div></div></header>`},
dx_hvideo:{label:"✚ Hero con vídeo",ico:"▶",cat:"Heros v5",raw:true,
  def:()=>({canal:"form",eyebrow:"",headline:"Míralo en 60 segundos",highlight:"",sub:"Un vídeo corto que explique cómo funciona el servicio.",video:"{{URL_VIDEO}}",poster:"",vlabel:"Ver vídeo",cta:"Quiero informarme",checks:""}),
  fields:hxF("canal","eyebrow","headline","highlight","sub",{k:"video",l:"Vídeo (YouTube, Vimeo o .mp4)"},{k:"poster",l:"Imagen de portada (opcional)",t:"photo"},{k:"vlabel",l:"Texto del botón de reproducir"},"checks","cta",V4_ACTF),
  render:p=>{const v=wVideo(p.video),thumb=p.poster||(v&&v.thumb)||"";
    return `<header class="da da-hero hx hx-vid"><div class="container"><div class="row g-4 g-lg-5 align-items-center"><div class="col-lg-5">${hxEye(p)}${hxH1(p)}${hxSub(p)}${hxChecks(p)}<div class="da-btns">${hxPri(p)}${hxSec(p)}</div></div>
    <div class="col-lg-7"><div class="vb"${v&&v.src?` data-vsrc="${esc(v.src)}"`:""}${v&&v.mp4?` data-vmp4="${esc(v.mp4)}"`:""}>${thumb?`<img src="${esc(thumb)}" alt="" loading="lazy">`:""}
      <button type="button" class="pl"${v?"":" disabled"}><span class="ic">${ncIco("play")}</span><span>${esc(p.vlabel)}</span></button>${v?"":`<span class="ph">${esc(p.video||"{{URL_VIDEO}}")}</span>`}</div></div></div></div></header>`;}},
dx_hsaver:{label:"✚ Hero calculadora de ahorro",ico:"⇄",cat:"Heros v5",raw:true,
  def:()=>({eyebrow:"",headline:"¿Cuánto pagas ahora?",highlight:"",sub:"Mueve la barra con tu factura actual y te llamamos con una propuesta.",checks:"",label:"Tu factura actual",min:"20",max:"300",val:"80",unit:"€/mes",pct:"",outLabel:"Ahorro estimado al año",
    neutral:"Te calculamos tu ahorro real en una llamada gratuita.",btn:"Quiero mi estudio gratis",note:"Estimación orientativa. Te confirmamos la cifra real en la llamada."}),
  fields:hxF("eyebrow","headline","highlight","sub","checks",{k:"label",l:"Texto de la barra"},{k:"min",l:"Mínimo"},{k:"max",l:"Máximo"},{k:"val",l:"Valor inicial"},{k:"unit",l:"Unidad"},{k:"pct",l:"% de ahorro medio real (vacío = no se muestra cifra)"},{k:"outLabel",l:"Texto de la cifra"},{k:"neutral",l:"Texto si no hay %"},"btn","note"),
  render:p=>{const mn=parseInt(p.min,10)||0,mx=Math.max(mn+1,parseInt(p.max,10)||100),vl=Math.min(mx,Math.max(mn,parseInt(p.val,10)||mn)),pct=parseFloat(String(p.pct||"").replace(",","."));const ok=!isNaN(pct)&&pct>0&&pct<100;
    return `<header class="da da-hero hx hx-sav"><div class="container"><div class="row g-4 g-lg-5 align-items-center"><div class="col-lg-6">${hxEye(p)}${hxH1(p)}${hxSub(p)}${hxChecks(p)}</div>
    <div class="col-lg-6"><div class="da-card sv" id="form" data-saver${ok?` data-pct="${pct}"`:""}><label class="lb"><span>${esc(p.label)}</span><b data-sv-val>${vl} €</b></label>
      <input type="range" min="${mn}" max="${mx}" step="5" value="${vl}" aria-label="${esc(p.label)}"><div class="sc"><span>${mn} ${esc(p.unit)}</span><span>${mx} ${esc(p.unit)}</span></div>
      <div class="out">${ok?`<small>${esc(p.outLabel)}</small><b data-sv-out>${Math.round(vl*pct/100*12).toLocaleString("es-ES")} €</b>`:`<p>${esc(p.neutral)}</p>`}</div>
      <form data-callback action="${v4Act()}" method="post"><input type="hidden" name="factura" value="${vl}"><input required name="telefono" type="tel" class="form-control mb-2" placeholder="${esc(vt("phone"))}" autocomplete="tel"><button type="submit" class="da-go">${esc(p.btn)}</button></form>
      ${ok&&p.note?`<p class="nt">${esc(p.note)}</p>`:""}<p class="alt">${hxAlt(p)}</p></div></div></div></div></header>`;}},
dx_hcoupon:{label:"✚ Hero cupón de oferta",ico:"✂",cat:"Heros v5",raw:true,
  def:()=>({canal:"form",eyebrow:"Oferta limitada",value:"{{DESCUENTO}}",valueSub:"de descuento",headline:"Tu oferta en un cupón",highlight:"",sub:"Explica qué incluye la oferta y para quién es.",terms:"{{CONDICIONES_DE_LA_OFERTA}}",code:"",cd:"",cdLabel:"La oferta termina en",cta:"Quiero la oferta"}),
  fields:hxF("canal","eyebrow",{k:"value",l:"Valor grande (descuento, precio…)"},{k:"valueSub",l:"Texto bajo el valor"},"headline","highlight","sub",{k:"terms",l:"Condiciones (letra pequeña)",t:"ta"},{k:"code",l:"Código promocional (opcional)"},{k:"cd",l:"Cuenta atrás: fin (AAAA-MM-DD HH:MM · vacío = sin)"},{k:"cdLabel",l:"Texto de la cuenta atrás"},"cta",V4_ACTF),
  render:p=>`<header class="da da-hero hx hx-cpn"><div class="container"><div class="cp"><div class="st"><span class="v">${esc(p.value)}</span><span class="vs">${esc(p.valueSub)}</span></div>
    <div class="bd">${hxEye(p)}${hxH1(p)}${hxSub(p)}${p.code?`<div class="cd"><span>Código</span><b>${esc(p.code)}</b><button type="button" data-copy="${esc(p.code)}">Copiar</button></div>`:""}${v4Cd(p)}
    <div class="da-btns">${hxPri(p)}${hxSec(p)}</div>${p.terms?`<p class="tm">${esc(p.terms)}</p>`:""}</div></div></div></header>`},
dx_hchat:{label:"✚ Hero chat de WhatsApp",ico:"💬",cat:"Heros v5",raw:true,
  def:()=>({eyebrow:"",headline:"Pregúntanos por WhatsApp",highlight:"",sub:"Te respondemos en horario de atención. Sin llamadas si no quieres.",checks:"",agent:"{{NOMBRE_EMPRESA}}",status:"en línea",
    msg:"Hola, ¿en qué te podemos ayudar?",chips:"Quiero información\nQuiero saber el precio\nPrefiero que me llaméis",btn:"Abrir WhatsApp"}),
  fields:hxF("eyebrow","headline","highlight","sub","checks",{k:"agent",l:"Nombre en la cabecera del chat"},{k:"status",l:"Estado bajo el nombre"},{k:"msg",l:"Mensaje de bienvenida",t:"ta"},{k:"chips",l:"Respuestas rápidas (una por línea · abren WhatsApp con ese texto)",t:"ta"},{k:"btn",l:"Botón de WhatsApp"}),
  render:p=>`<header class="da da-hero hx hx-chat"><div class="container"><div class="row g-4 g-lg-5 align-items-center"><div class="col-lg-6">${hxEye(p)}${hxH1(p)}${hxSub(p)}${hxChecks(p)}
    <div class="da-btns">${v4Wa()} class="da-btn pri wa">${I_WA()} ${esc(p.btn)}</a>${v4Tel()} class="da-btn sec">${I_TEL()} ${esc(telText())}</a></div></div>
    <div class="col-lg-6"><div class="ph" id="form"><div class="hd"><span class="av">${esc(String(p.agent||"").replace(/[{}]/g,"").slice(0,1)||"·")}</span><span><b>${esc(p.agent)}</b><small>${esc(p.status)}</small></span>${I_WA()}</div>
      <div class="bd"><div class="mi">${esc(p.msg)}</div><div class="qr">${v4L(p.chips).map(c=>`<a href="${esc(hxWaText(c))}" target="_blank" rel="noopener" data-cta="whatsapp">${esc(c)}</a>`).join("")}</div></div>
      <div class="ft">${v4Wa()} class="da-bigwa">${I_WA()} ${esc(p.btn)}</a></div></div></div></div></div></header>`},
dx_hbento:{label:"✚ Hero bento (mosaico)",ico:"▦",cat:"Heros v5",raw:true,
  def:()=>({canal:"form",eyebrow:"",headline:"Todo lo que necesitas",highlight:"en un vistazo",sub:"Resume la propuesta en una frase.",cta:"Quiero informarme",img:"",imgAlt:"",price:"{{PRECIO}}",priceUnit:"€/mes",priceNote:"",
    stats:"{{CIFRA}}|{{DATO_REAL}}",formTitle:"Te llamamos gratis",btn:"Llamadme"}),
  fields:hxF("canal","eyebrow","headline","highlight","sub","cta",V4_ACTF,"img","imgAlt","price","priceUnit","priceNote",{k:"stats",l:"Dato destacado (cifra|texto · solo datos reales · vacío = sin)"},{k:"formTitle",l:"Título del formulario"},"btn"),
  render:p=>{const S=v4L(p.stats).map(v4C).slice(0,1);
    return `<header class="da da-hero hx hx-bento${p.price?"":" np"}${S.length?"":" ns"}"><div class="container"><div class="bg">
    <div class="tl mn">${hxEye(p)}${hxH1(p)}${hxSub(p)}<div class="da-btns">${hxPri(p)}${(p.canal||"form")==="form"?"":hxSec(p)}</div></div>
    <div class="tl ph">${p.img?hxImg(p,""):ncVisual(Object.assign({},p,{vis:"mock",price:""}))}</div>
    ${p.price?`<div class="tl pr"><small>${esc(p.priceNote||"Desde")}</small><b>${esc(p.price)}</b><span>${esc(p.priceUnit)}</span></div>`:""}
    ${S.map(s=>`<div class="tl stt"><b>${esc(s[0])}</b><span>${esc(s[1]||"")}</span></div>`).join("")}
    <div class="tl fm" id="form"><div><h2>${esc(p.formTitle)}</h2><p class="alt">${hxAlt(p)}</p></div>${hxForm(p,{noOpts:1,cls:"da-inline"})}</div></div></div></header>`;}},
dx_hposter:{label:"✚ Hero cartel tipográfico",ico:"A",cat:"Heros v5",raw:true,
  def:()=>({canal:"form",eyebrow:"",headline:"Un titular",highlight:"enorme",sub:"Una línea que lo explique.",cta:"Quiero informarme",ticker:"{{VENTAJA_1}}\n{{VENTAJA_2}}\n{{VENTAJA_3}}\n{{VENTAJA_4}}",tone:"auto",upper:"si"}),
  fields:hxF("canal","eyebrow","headline","highlight","sub","cta",V4_ACTF,{k:"ticker",l:"Cinta inferior (una línea por elemento)",t:"ta"},{k:"tone",l:"Fondo",t:"select",opts:HX_TONE},{k:"upper",l:"Titular en mayúsculas",t:"select",opts:[["si","Sí"],["no","No"]]}),
  render:p=>{const T=v4L(p.ticker);const row=T.map(x=>`<span>${esc(x)}</span><i aria-hidden="true">✦</i>`).join("");
    const ln=String(p.headline||"").length+String(p.highlight||"").length;
    return `<header class="da da-hero hx hx-post tn-${p.tone||"brand"}${p.upper==="no"?"":" up"}${ln>34?" ln":""}"><div class="container">${hxEye(p)}${hxH1(p)}<div class="rw">${hxSub(p)}<div class="da-btns">${hxPri(p)}${hxSec(p)}</div></div></div>
    ${T.length?`<div class="tk"><div class="tr">${row}</div><div class="tr" aria-hidden="true">${row}</div></div>`:""}</header>`;}},

/* ================= SECCIONES ================= */
dx_spotlight:{label:"✚ Testimonio destacado",ico:"❝",cat:"Secciones v5",raw:true,
  def:()=>({kicker:"",quote:"{{TESTIMONIO_REAL_DEL_CLIENTE}}",name:"{{NOMBRE_CLIENTE}}",role:"{{CIUDAD_O_PERFIL}}",stars:"",img:"",imgAlt:"",source:"",btn:""}),
  fields:[HX_F.kicker,{k:"quote",l:"Testimonio (real, con permiso)",t:"ta"},{k:"name",l:"Nombre"},{k:"role",l:"Ciudad o perfil"},{k:"stars",l:"Estrellas (0-5 · vacío = sin)"},{k:"img",l:"Foto (opcional)",t:"photo"},{k:"imgAlt",l:"Texto alternativo"},{k:"source",l:"Fuente (p. ej. «Opinión verificada en {{PLATAFORMA}}»)"},{k:"btn",l:"Botón (opcional)"},V4_ACTF],
  render:p=>`<section class="da da-sec sx sx-spot"><div class="container"><div class="w${p.img?" has-img":""}">${p.img?`<img src="${esc(p.img)}" alt="${esc(p.imgAlt||"")}" loading="lazy">`:""}
    <div class="rt"><figure>${p.kicker?`<span class="da-eyebrow">${esc(p.kicker)}</span>`:""}<span class="qm" aria-hidden="true">“</span><blockquote>${esc(p.quote)}</blockquote>${hxStars(p.stars)}
    <figcaption><b>${esc(p.name)}</b>${p.role?`<span>${esc(p.role)}</span>`:""}${p.source?`<small>${esc(p.source)}</small>`:""}</figcaption></figure>
    ${p.btn?`<a href="#form" data-cta="form"${v4ActA(p)} class="da-btn pri">${esc(p.btn)} ${I_GO()}</a>`:""}</div></div></div></section>`},
dx_timeline:{label:"✚ Línea de tiempo (qué pasa después)",ico:"┊",cat:"Secciones v5",raw:true,
  def:()=>({kicker:"",title:"Qué pasa cuando nos dejas tu teléfono",sub:"",items:"Hoy|Nos dejas tu teléfono|Tardas menos de un minuto.\n{{PLAZO_LLAMADA}}|Te llamamos|Resolvemos tus dudas y te damos el precio final.\n{{PLAZO_ALTA}}|Alta o instalación|Nos encargamos de todo el proceso.\nDespués|Disfrutas del servicio|Y tienes un teléfono de contacto para lo que necesites.",btn:"Empezar ahora"}),
  fields:[...W_HEADF,{k:"items",l:"Hitos (Cuándo|Título|Texto, uno por línea)",t:"ta"},{k:"btn",l:"Botón (opcional)"},V4_ACTF],
  render:p=>`<section class="da da-sec sx sx-tl"><div class="container">${wHead(p)}<ol class="tl">${v4L(p.items).map(l=>{const c=v4C(l);return `<li><span class="wh">${esc(c[0])}</span><span class="dt" aria-hidden="true"></span><div class="bx"><h3>${esc(c[1]||"")}</h3>${c[2]?`<p>${esc(c[2])}</p>`:""}</div></li>`;}).join("")}</ol>
    ${wBtn(p)}</div></section>`},
dx_phoneband:{label:"✚ Banda de teléfono gigante",ico:"☏",cat:"Secciones v5",raw:true,
  def:()=>({title:"¿Prefieres hablar con una persona?",hours:"{{HORARIO_DE_ATENCION}}",formTitle:"O te llamamos nosotros",btn:"Llamadme",wa:"si",tone:"auto"}),
  fields:[{k:"title",l:"Título"},{k:"hours",l:"Horario"},{k:"formTitle",l:"Título del formulario"},{k:"btn",l:"Botón del formulario"},{k:"wa",l:"Botón de WhatsApp",t:"select",opts:[["si","Sí"],["no","No"]]},{k:"tone",l:"Fondo",t:"select",opts:HX_TONE}],
  render:p=>`<section class="da da-sec sx sx-pb tn-${p.tone||"auto"}"><div class="container"><div class="row g-4 align-items-center"><div class="col-lg-7"><h2 class="da-h2">${esc(p.title)}</h2>
    ${v4Tel()} class="big">${I_TEL()}<span>${esc(telText())}</span></a>${p.hours?`<p class="hr">${ncIco("clock")} ${esc(p.hours)}</p>`:""}</div>
    <div class="col-lg-5"><div class="da-card" id="form"><h3>${esc(p.formTitle)}</h3>${hxForm(p,{cls:"da-inline",noOpts:1})}${p.wa==="no"?"":`${v4Wa()} class="wa">${I_WA()} WhatsApp</a>`}</div></div></div></div></section>`},
dx_faqsplit:{label:"✚ Preguntas + contacto fijo al lado",ico:"?",cat:"Secciones v5",raw:true,
  def:()=>({kicker:"",title:"Preguntas frecuentes",sub:"",items:"{{PREGUNTA_1}}|{{RESPUESTA_1}}\n{{PREGUNTA_2}}|{{RESPUESTA_2}}\n{{PREGUNTA_3}}|{{RESPUESTA_3}}\n{{PREGUNTA_4}}|{{RESPUESTA_4}}",
    cardTitle:"¿Te queda alguna duda?",cardSub:"Un asesor te la resuelve por teléfono.",btn:"Llamadme"}),
  fields:[...W_HEADF,{k:"items",l:"Preguntas (Pregunta|Respuesta, una por línea)",t:"ta"},{k:"cardTitle",l:"Título de la tarjeta"},{k:"cardSub",l:"Texto de la tarjeta"},{k:"btn",l:"Botón del formulario"}],
  render:p=>`<section class="da da-sec sx sx-fq"><div class="container"><div class="row g-4 g-lg-5"><div class="col-lg-7">${wHead(p,false)}<div class="ls">${v4L(p.items).map((l,i)=>{const c=v4C(l);return `<details${i?"":" open"}><summary>${esc(c[0])}<span aria-hidden="true">${ncIco("chevron-down")}</span></summary><p>${esc(c[1]||"")}</p></details>`;}).join("")}</div></div>
    <div class="col-lg-5"><aside class="da-card ct" id="form"><h3>${esc(p.cardTitle)}</h3><p>${esc(p.cardSub)}</p>${v4Tel()} class="da-bigcall">${I_TEL()} ${esc(telText())}</a><div class="da-or">${esc(vt("orWeCall"))}</div>${hxForm(p,{noOpts:1})}</aside></div></div></div></section>`},
dx_offerstrip:{label:"✚ Franja de oferta",ico:"▬",cat:"Secciones v5",raw:true,
  def:()=>({badge:"Oferta",text:"Describe la oferta en una línea",price:"{{PRECIO}}",priceUnit:"€/mes",cd:"",cdLabel:"",btn:"La quiero",tone:"brand"}),
  fields:[{k:"badge",l:"Etiqueta"},{k:"text",l:"Texto"},HX_F.price,HX_F.priceUnit,{k:"cd",l:"Cuenta atrás: fin (AAAA-MM-DD HH:MM · vacío = sin)"},{k:"cdLabel",l:"Texto de la cuenta atrás"},{k:"btn",l:"Botón"},V4_ACTF,{k:"tone",l:"Fondo",t:"select",opts:HX_TONE}],
  render:p=>`<section class="da sx sx-os tn-${p.tone||"brand"}"><div class="container"><div class="w">${p.badge?`<span class="bd">${esc(p.badge)}</span>`:""}<p class="tx">${esc(p.text)}</p>
    ${p.price?`<span class="pr"><b>${esc(p.price)}</b><small>${esc(p.priceUnit)}</small></span>`:""}${v4Cd(p)}<a href="#form" data-cta="form"${v4ActA(p)} class="da-btn pri">${esc(p.btn)} ${I_GO()}</a></div></div></section>`},
dx_ticker:{label:"✚ Cinta en movimiento",ico:"⇢",cat:"Secciones v5",raw:true,
  def:()=>({items:"{{VENTAJA_1}}\n{{VENTAJA_2}}\n{{VENTAJA_3}}\n{{VENTAJA_4}}",tone:"ink",speed:"M",size:"M"}),
  fields:[{k:"items",l:"Elementos (uno por línea)",t:"ta"},{k:"tone",l:"Fondo",t:"select",opts:HX_TONE},{k:"speed",l:"Velocidad",t:"select",opts:[["S","Lenta"],["M","Media"],["F","Rápida"]]},{k:"size",l:"Tamaño del texto",t:"select",opts:W_SZ}],
  render:p=>{const row=v4L(p.items).map(x=>`<span>${esc(x)}</span><i aria-hidden="true">✦</i>`).join("");
    return `<div class="da sx sx-tk tn-${p.tone||"ink"} sp-${p.speed||"M"} sz-${p.size||"M"}"><div class="tk"><div class="tr">${row}</div><div class="tr" aria-hidden="true">${row}</div></div></div>`;}},
dx_profiles:{label:"✚ ¿Cuál es tu perfil? (recomendación)",ico:"☺",cat:"Secciones v5",raw:true,
  def:()=>({kicker:"",title:"¿Cuál se parece más a ti?",sub:"Te recomendamos la opción que mejor encaja.",items:"user|{{PERFIL_1}}|{{DESCRIPCION_PERFIL_1}}|{{OPCION_RECOMENDADA_1}}|{{PRECIO_1}}\nusers|{{PERFIL_2}}|{{DESCRIPCION_PERFIL_2}}|{{OPCION_RECOMENDADA_2}}|{{PRECIO_2}}\nhouse|{{PERFIL_3}}|{{DESCRIPCION_PERFIL_3}}|{{OPCION_RECOMENDADA_3}}|{{PRECIO_3}}",
    recLabel:"Te recomendamos",unit:"€/mes",btn:"Me interesa"}),
  fields:[...W_HEADF,{k:"items",l:"Perfiles (icono|Perfil|descripción|opción recomendada|precio, uno por línea)",t:"ta"},{k:"recLabel",l:"Texto de la recomendación"},{k:"unit",l:"Unidad del precio"},{k:"btn",l:"Botón"},V4_ACTF],
  render:p=>`<section class="da da-sec sx sx-pf"><div class="container">${wHead(p)}<div class="row g-3 g-lg-4">${v4L(p.items).map(l=>{const c=v4C(l);
    return `<div class="col-md-6 col-lg-4"><div class="da-card it"><span class="ic">${ncIconOrText(c[0]||"user")}</span><h3>${esc(c[1]||"")}</h3><p>${esc(c[2]||"")}</p><div class="rc"><small>${esc(p.recLabel)}</small><b>${esc(c[3]||"")}</b>${c[4]?`<span>${esc(c[4])} <small>${esc(p.unit)}</small></span>`:""}</div>
      <a href="#form" data-cta="form"${v4ActA(p,{name:c[3]||"",price:c[4]||"",unit:p.unit})} class="da-btn sec">${esc(p.btn)}</a></div></div>`;}).join("")}</div></div></section>`},
dx_checklist:{label:"✚ Qué incluye y qué no",ico:"✓✗",cat:"Secciones v5",raw:true,
  def:()=>({kicker:"",title:"Lo que incluye (y lo que no)",sub:"Para que sepas exactamente lo que contratas.",inTitle:"Incluido",yes:"{{INCLUIDO_1}}\n{{INCLUIDO_2}}\n{{INCLUIDO_3}}\n{{INCLUIDO_4}}",outTitle:"No incluido",no:"{{NO_INCLUIDO_1}}\n{{NO_INCLUIDO_2}}",note:""}),
  fields:[...W_HEADF,{k:"inTitle",l:"Título de la columna incluida"},{k:"yes",l:"Incluido (una por línea)",t:"ta"},{k:"outTitle",l:"Título de la columna no incluida"},{k:"no",l:"No incluido (una por línea · vacío = se oculta)",t:"ta"},{k:"note",l:"Nota (opcional)"}],
  render:p=>{const N=v4L(p.no);return `<section class="da da-sec sx sx-ck"><div class="container">${wHead(p)}<div class="row g-3 g-lg-4 justify-content-center">
    <div class="col-md-6${N.length?"":" col-lg-7"}"><div class="da-card cl y"><h3>${ncIco("check")} ${esc(p.inTitle)}</h3><ul>${v4L(p.yes).map(x=>`<li>${ncIco("check")}<span>${esc(x)}</span></li>`).join("")}</ul></div></div>
    ${N.length?`<div class="col-md-6"><div class="da-card cl n"><h3>${ncIco("x")} ${esc(p.outTitle)}</h3><ul>${N.map(x=>`<li>${ncIco("x")}<span>${esc(x)}</span></li>`).join("")}</ul></div></div>`:""}</div>
    ${p.note?`<p class="da-muted text-center mt-3 small">${esc(p.note)}</p>`:""}</div></section>`;}}
});
(function(){const H=["dx_hsplit","dx_hfull","dx_hmin","dx_hpicker","dx_heditorial","dx_hvideo","dx_hsaver","dx_hcoupon","dx_hchat","dx_hbento","dx_hposter"],
  S=["dx_offerstrip","dx_ticker","dx_spotlight","dx_timeline","dx_profiles","dx_checklist","dx_faqsplit","dx_phoneband"];
  let i=ORDER.indexOf("da_trust");if(i<0)i=ORDER.length;ORDER.splice(i,0,...H);let j=ORDER.indexOf("dx_coverage");if(j<0)j=ORDER.length;ORDER.splice(j,0,...S);})();
const NC_V5_TYPES=/^dx_(h(split|full|min|picker|editorial|video|saver|coupon|chat|bento|poster|slider|videobg|steps|plans|callback|price|intent|calc)|spotlight|timeline|phoneband|faqsplit|offerstrip|ticker|profiles|checklist|cmp3|objections|callhours)$/;

function ncV5CSS(){return `
.hx,.sx{overflow-wrap:break-word}.hx .da-h1{overflow-wrap:normal;word-break:normal;hyphens:manual}
html body .hx .col-lg-6 .da-h1,html body .hx .col-lg-5 .da-h1,html body .hx-split .da-h1,html body .hx-bento .mn .da-h1{font-size:clamp(30px,3.7vw,56px);line-height:1.05}
@media (max-width:575px){html body .hx .da-h1{font-size:clamp(28px,8.6vw,42px)}html body .hx.hx-post .da-h1{font-size:clamp(40px,12vw,64px)}}.hx .hx-sub{max-width:40ch}.hx .alt{font-size:14px;color:var(--bmuted);margin:12px 0 0}.hx .alt a{color:inherit;font-weight:700}.hx .nt{font-size:12.5px;color:var(--bmuted);margin:10px 0 0}
.hx .hx-checks{margin:16px 0 4px}.hx .da-inline .nc-legal,.hx .da-inline .nc-legal-info,.sx .da-inline .nc-legal,.sx .da-inline .nc-legal-info{color:var(--bmuted)}
.hx .hx-mock{height:100%;display:grid;place-items:center;padding:24px}.hx .hx-mock .nc-vis-wrap{width:100%;max-width:440px}
/* partido a sangre */
html body .hx-split{padding:0!important;overflow:hidden}.hx-split .g{display:grid;grid-template-columns:1fr}
.hx-split .t{display:flex;align-items:center;padding:36px 20px 40px}.hx-split .in{max-width:600px}
.hx-split .m{position:relative;min-height:260px;background:color-mix(in srgb,var(--bp) 10%,var(--bsoft,#f4f4f6))}.hx-split .hx-cov{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.hx-split .hx-tag{position:absolute;left:16px;bottom:16px;background:var(--bp);color:var(--btntext,#fff);border-radius:var(--cardr,18px);padding:12px 18px;display:flex;flex-direction:column;line-height:1;box-shadow:0 18px 40px -16px rgba(0,0,0,.45)}
.hx-split .hx-tag small{font-size:12px;opacity:.85;margin-bottom:6px}.hx-split .hx-tag b{font:800 clamp(30px,4vw,46px)/1 var(--fhead)}.hx-split .hx-tag span{font-size:13px;margin-top:4px;opacity:.9}
@media (max-width:991px){.hx-split .m{order:-1}}
@media (min-width:992px){.hx-split .g{grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);min-height:min(86vh,760px)}.hx-split .t{padding:72px 56px 72px max(48px,calc((100vw - 1320px)/2 + 12px))}
 .hx-split.side-left .m{order:-1}.hx-split.side-left .t{padding:72px max(48px,calc((100vw - 1320px)/2 + 12px)) 72px 56px}.hx-split .hx-tag{left:auto;right:32px;bottom:32px;padding:16px 24px}.hx-split.side-left .hx-tag{right:auto;left:32px}}
/* foto a pantalla completa */
html body .hx.hx-full{position:relative;overflow:hidden;padding:56px 0!important;color:#fff;--bink:#fff;--bmuted:rgba(255,255,255,.86);background:var(--ink0,#111)!important}
.hx-full .bgi{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.hx-full::before{content:"";position:absolute;inset:0;background:rgba(0,0,0,.48)}
.hx-full.sc-soft::before{background:rgba(0,0,0,.3)}.hx-full.sc-strong::before{background:rgba(0,0,0,.66)}.hx-full.sc-brand::before{background:color-mix(in srgb,var(--bp) 72%,transparent)}
.hx-full.sc-side::before{background:linear-gradient(90deg,rgba(0,0,0,.78),rgba(0,0,0,.25) 70%)}html body .hx.hx-full.no-img{background:linear-gradient(135deg,var(--bp),color-mix(in srgb,var(--bp) 55%,#000))!important}.hx-full.no-img::before{display:none}
.hx-full .container{position:relative}.hx-full .da-h1,.hx-full .da-sub{color:#fff}.hx-full .da-eyebrow{background:rgba(255,255,255,.16);color:#fff;border-color:rgba(255,255,255,.3)}.hx-full .da-checks li{color:#fff}
.hx-full .hx-glass{--bink:#1d1d1f;--bmuted:#5b6170;--dline:#e4e2ea;--bpt:var(--bp);color:#1d1d1f;background:rgba(255,255,255,.95);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);box-shadow:0 30px 70px -30px rgba(0,0,0,.6);border-radius:var(--cardr,20px);padding:26px}.hx-full .hx-glass h2{font:800 24px/1.15 var(--fhead);color:#1d1d1f;margin:0 0 6px}.hx-full .hx-glass>p{color:#5b6170;font-size:15px}.hx-full .hx-glass .form-control{background:#fff!important;color:#111!important;border:1px solid #d9d6e0!important}
.hx-full .hx-glass .alt,.hx-full .hx-glass .nt{color:#5b6170}html body .hx-full .hx-glass .nc-opts span{background:#f3f4f6!important;color:#111!important;border-color:#d9d6e0!important}html body .hx-full .hx-glass .nc-opts input:checked+span{background:var(--bp)!important;color:var(--btntext,#fff)!important;border-color:var(--bp)!important}
@media (min-width:992px){html body .hx.hx-full{min-height:min(88vh,780px);display:flex;align-items:center;padding:96px 0!important}.hx-full .container{width:100%}}
/* minimal centrado */
.hx-min{position:relative;overflow:hidden}.hx-min .in{max-width:820px;margin:0 auto;text-align:center;position:relative;padding:24px 0}.hx-min .hx-sub{max-width:56ch;margin:0 auto}
.hx-min.glow::before{content:"";position:absolute;left:50%;top:-30%;width:min(900px,140vw);aspect-ratio:1;transform:translateX(-50%);background:radial-gradient(closest-side,color-mix(in srgb,var(--bp) 22%,transparent),transparent);pointer-events:none}
.hx-min .fm{max-width:560px;margin:26px auto 0}.hx-min .da-inline{background:color-mix(in srgb,var(--bink) 6%,transparent);padding:6px;border-radius:999px;flex-wrap:nowrap;border:1px solid var(--dline)}html body .hx-min .da-inline .form-control{border:0!important;background:transparent!important;border-radius:999px;min-width:0;color:var(--bink)!important;box-shadow:none!important}html body .hx-min .da-inline .form-control::placeholder{color:var(--bmuted)!important}
.hx-min .da-inline .da-go{border-radius:999px}.hx-min .da-inline .nc-legal,.hx-min .da-inline .nc-legal-info{position:absolute;left:0;right:0;top:100%;margin-top:10px}.hx-min form{position:relative}.hx-min .fm{margin-bottom:46px}
.hx-min .chips{list-style:none;padding:0;margin:22px 0 0;display:flex;flex-wrap:wrap;justify-content:center;gap:8px 18px;font-size:14px;color:var(--bmuted)}.hx-min .chips li{display:flex;gap:6px;align-items:center}.hx-min .chips .nci{color:var(--bpt,var(--bp))}
.hx-min .da-eyebrow{margin:0 auto}
@media (max-width:575px){.hx-min .da-inline{flex-wrap:wrap;border-radius:18px}.hx-min .da-inline .da-go{width:100%}}
/* selector de oferta */
.hx-pick fieldset{border:0;margin:0 0 12px;padding:0;display:grid;gap:10px}.hx-pick legend{font:700 18px var(--fhead);margin-bottom:10px;color:var(--bink)}
.hx-pick .op{display:block;cursor:pointer;position:relative}.hx-pick .op input{position:absolute;opacity:0;pointer-events:none}.hx-pick .bx{display:flex;align-items:center;justify-content:space-between;gap:12px;border:2px solid var(--dline);border-radius:14px;padding:12px 14px 12px 44px;position:relative;transition:border-color .15s,background .15s}
.hx-pick .bx::before{content:"";position:absolute;left:14px;top:50%;width:20px;height:20px;margin-top:-10px;border-radius:50%;border:2px solid var(--dline);background:transparent}
.hx-pick .op input:checked+.bx{border-color:var(--bp);background:color-mix(in srgb,var(--bp) 12%,transparent)}.hx-pick .op input:checked+.bx::before{border:6px solid var(--bp)}.hx-pick .op input:focus-visible+.bx{outline:3px solid color-mix(in srgb,var(--bp) 45%,transparent);outline-offset:2px}
.hx-pick .nm{display:flex;flex-direction:column;min-width:0;flex:1 1 auto}.hx-pick .pr b{overflow-wrap:anywhere}.hx-pick .nm small{color:var(--bmuted);font-size:13px}.hx-pick .pr{text-align:right;line-height:1;min-width:0;flex:0 1 auto}.hx-pick .pr b{font:800 22px var(--fhead);color:var(--bink)}.hx-pick .pr small{display:block;font-size:12px;color:var(--bmuted)}
/* editorial */
.hx-ed .kk{display:flex;align-items:center;gap:14px;margin-bottom:22px;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--bpt,var(--bp))}.hx-ed .kk i{flex:1;height:1px;background:var(--bink);opacity:.25}
.hx-ed .da-h1{font-size:clamp(34px,4.4vw,62px);line-height:1.04;margin-top:0}.hx-ed .by{font-size:13px;color:var(--bmuted);text-transform:uppercase;letter-spacing:.06em}
.hx-ed .ld{font-size:clamp(17px,1.4vw,20px);line-height:1.6;color:var(--bink);max-width:62ch}.hx-ed .ld::first-letter{float:left;font:800 3.4em/.82 var(--fhead);margin:6px 10px 0 0;color:var(--bp)}
.hx-ed .cta{display:flex;flex-wrap:wrap;align-items:center;gap:12px 18px;margin-top:22px}.hx-ed .cta span{font-size:14px;color:var(--bmuted)}
.hx-ed figure{margin:0}.hx-ed figure img{width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:var(--cardr,4px)}.hx-ed figure .hx-mock{aspect-ratio:4/5;background:color-mix(in srgb,var(--bink) 5%,transparent);border-radius:var(--cardr,4px)}
.hx-ed figcaption{font-size:13px;color:var(--bmuted);border-top:1px solid var(--dline);padding-top:8px;margin-top:10px;font-style:italic}
@media (max-width:991px){.hx-ed figure img,.hx-ed figure .hx-mock{aspect-ratio:16/10}}
/* vídeo */
.hx-vid .vb{position:relative;aspect-ratio:16/9;border-radius:var(--cardr,18px);overflow:hidden;background:linear-gradient(135deg,var(--bp),color-mix(in srgb,var(--bp) 50%,#000));box-shadow:0 30px 70px -36px rgba(0,0,0,.55)}
.hx-vid .vb img,.hx-vid .vb iframe,.hx-vid .vb video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border:0}
.hx-vid .pl{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;background:rgba(0,0,0,.22);border:0;color:#fff;font-weight:700;cursor:pointer;width:100%}
.hx-vid .pl .ic{width:76px;height:76px;border-radius:50%;background:#fff;color:var(--bp);display:grid;place-items:center;font-size:30px;box-shadow:0 10px 30px rgba(0,0,0,.3)}.hx-vid .pl:disabled{cursor:default}
.hx-vid .ph{position:absolute;left:12px;bottom:10px;font-size:12px;color:#fff;opacity:.85}
/* calculadora */
.hx-sav .lb{display:flex;justify-content:space-between;align-items:baseline;gap:10px;font-weight:600;color:var(--bink);width:100%}.hx-sav .lb b{font:800 30px var(--fhead);color:var(--bpt,var(--bp));white-space:nowrap}
.hx-sav input[type=range]{width:100%;accent-color:var(--bp);margin:12px 0 2px;height:28px}.hx-sav .sc{display:flex;justify-content:space-between;font-size:12px;color:var(--bmuted)}
.hx-sav .out{margin:16px 0;padding:14px 16px;border-radius:14px;background:color-mix(in srgb,var(--bp) 9%,transparent);text-align:center}.hx-sav .out small{display:block;color:var(--bmuted);font-size:13px}.hx-sav .out b{font:800 clamp(30px,4vw,42px)/1.1 var(--fhead);color:var(--bink)}.hx-sav .out p{margin:0;font-weight:600;color:var(--bink)}
/* cupón */
.hx-cpn .cp{display:grid;grid-template-columns:minmax(0,1fr);background:color-mix(in srgb,var(--bink) 4%,transparent);border:2px dashed color-mix(in srgb,var(--bp) 55%,transparent);border-radius:22px;position:relative;max-width:1040px;margin:0 auto;overflow:hidden;color:var(--bink)}
.hx-cpn .st{background:var(--bp);color:var(--btntext,#fff);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:26px 18px;text-align:center;position:relative}
.hx-cpn .st .v{font:900 clamp(44px,6vw,84px)/.95 var(--fhead);letter-spacing:-.03em;overflow-wrap:anywhere;max-width:100%}.hx-cpn .st .vs{font-weight:700;text-transform:uppercase;letter-spacing:.08em;font-size:13px;margin-top:6px}
.hx-cpn .bd{padding:26px 22px 24px}html body .hx-cpn .dx-cdn span{background:color-mix(in srgb,var(--bink) 10%,transparent)!important;color:var(--bink)!important}html body .hx-cpn .dx-cdn small{color:var(--bmuted)!important}.hx-cpn .da-h1{font-size:clamp(30px,3.6vw,48px);margin-top:10px}.hx-cpn .tm{font-size:12px;color:var(--bmuted);margin:14px 0 0}
.hx-cpn .cd{display:inline-flex;align-items:center;gap:10px;border:1px solid var(--dline);border-radius:12px;padding:6px 6px 6px 12px;margin:6px 0 10px;background:#fff;color:#111}.hx-cpn .cd span{font-size:12px;color:#666}.hx-cpn .cd b{font-family:ui-monospace,monospace;font-size:17px;letter-spacing:.08em}
.hx-cpn .cd button{border:0;border-radius:8px;background:var(--bink);color:var(--bsoft,#fff);font-size:13px;font-weight:700;padding:6px 10px}
@media (min-width:768px){.hx-cpn .cp{grid-template-columns:minmax(220px,.42fr) 1fr}.hx-cpn .st{border-right:2px dashed rgba(255,255,255,.55)}.hx-cpn .bd{padding:36px 40px}
 .hx-cpn .cp::before,.hx-cpn .cp::after{content:"";position:absolute;left:calc(29.6% - 15px);width:30px;height:30px;border-radius:50%;background:var(--lkp,var(--bg,#fff));border:2px dashed color-mix(in srgb,var(--bp) 55%,transparent);z-index:2}.hx-cpn .cp::before{top:-17px}.hx-cpn .cp::after{bottom:-17px}}
/* chat */
.hx-chat .ph{max-width:400px;margin:0 auto;border-radius:30px;overflow:hidden;background:#ECE5DD;box-shadow:0 34px 80px -34px rgba(0,0,0,.55);border:8px solid #111;color:#111}
.hx-chat .hd{display:flex;align-items:center;gap:10px;background:#075E54;color:#fff;padding:12px 14px}.hx-chat .hd span:nth-child(2){display:flex;flex-direction:column;flex:1;line-height:1.2;min-width:0}.hx-chat .hd b{font-size:15px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.hx-chat .hd small{opacity:.8;font-size:12px}
.hx-chat .av{width:36px;height:36px;border-radius:50%;background:#fff;color:#075E54;display:grid;place-items:center;font-weight:800}
.hx-chat .bd{padding:18px 14px;min-height:240px;display:flex;flex-direction:column;gap:12px}.hx-chat .mi{background:#fff;border-radius:0 12px 12px 12px;padding:10px 12px;max-width:86%;font-size:15px;box-shadow:0 1px 1px rgba(0,0,0,.12)}
.hx-chat .qr{display:flex;flex-direction:column;align-items:flex-end;gap:8px;margin-top:auto}.hx-chat .qr a{background:#DCF8C6;color:#111;border-radius:12px 0 12px 12px;padding:9px 12px;font-size:14px;font-weight:600;text-decoration:none;box-shadow:0 1px 1px rgba(0,0,0,.12)}
.hx-chat .qr a:hover{background:#c9f1ad}.hx-chat .ft{padding:10px 12px 14px;background:#F0F0F0}.hx-chat .ft .da-bigwa{width:100%;justify-content:center}
/* bento */
.hx-bento .bg{display:grid;gap:12px;grid-template-columns:minmax(0,1fr) minmax(0,1fr)}.hx-bento .tl{border-radius:var(--cardr,20px);background:color-mix(in srgb,var(--bink) 5%,transparent);padding:20px;overflow:hidden;position:relative;color:var(--bink);border:1px solid var(--dline)}
.hx-bento .mn{grid-column:1/-1;background:color-mix(in srgb,var(--bp) 13%,transparent)}.hx-bento .mn .da-h1{margin-top:10px}
.hx-bento .ph{grid-column:1/-1;min-height:220px;padding:0}.hx-bento .ph img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.hx-bento .ph .nc-vis-wrap{padding:18px}
.hx-bento .pr{background:var(--bp);color:var(--btntext,#fff);display:flex;flex-direction:column;justify-content:flex-end;border:0}.hx-bento .pr b{font:800 clamp(34px,4vw,54px)/1 var(--fhead)}.hx-bento .pr small,.hx-bento .pr span{opacity:.88;font-size:13px}
.hx-bento .stt{display:flex;flex-direction:column;justify-content:flex-end}.hx-bento .stt b{font:800 clamp(26px,3vw,40px)/1 var(--fhead);color:var(--bpt,var(--bp))}.hx-bento .stt span{font-size:13px;color:var(--bmuted)}
.hx-bento .fm{grid-column:1/-1;background:var(--ink0,#111);color:#fff;--bink:#fff;--bmuted:rgba(255,255,255,.75);border:0;display:grid;gap:12px;align-items:center}.hx-bento .fm h2{font:800 22px var(--fhead);color:#fff;margin:0}.hx-bento .fm .alt{margin:4px 0 0}
.hx-bento .np .stt,.hx-bento.np .stt,.hx-bento.ns .pr{grid-column:1/-1}.hx-bento .fm .nc-legal,.hx-bento .fm .nc-legal-info{color:rgba(255,255,255,.75)}
@media (max-width:991px){.hx-bento .fm{order:2}.hx-bento .mn{order:1}.hx-bento .pr,.hx-bento .stt{order:3}.hx-bento .ph{order:4}}
@media (min-width:992px){.hx-bento .bg{grid-template-columns:repeat(4,minmax(0,1fr));grid-auto-rows:minmax(170px,auto)}.hx-bento .tl{padding:26px}.hx-bento .mn{grid-column:1/3;grid-row:1/3;display:flex;flex-direction:column;justify-content:center;padding:36px}
 .hx-bento .ph{grid-column:3/5;grid-row:1/2;min-height:0}.hx-bento .pr{grid-column:3/4;grid-row:2}.hx-bento .stt{grid-column:4/5;grid-row:2}.hx-bento.ns .pr,.hx-bento.np .stt{grid-column:3/5}.hx-bento.np.ns .ph{grid-row:1/3}
 .hx-bento .fm{grid-column:1/5;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);padding:24px 30px}}
/* cartel */
html body .hx.hx-post{padding:56px 0 0!important;overflow:hidden}html body .hx.hx-post.tn-brand{background:var(--bp)!important;--bink:var(--btntext,#fff);--bmuted:color-mix(in srgb,var(--btntext,#fff) 82%,transparent);color:var(--btntext,#fff)}
html body .hx.hx-post.tn-ink{background:var(--ink0,#111)!important;--bink:#fff;--bmuted:rgba(255,255,255,.75);color:#fff}html body .hx.hx-post.tn-paper{background:var(--bsoft,#f5f3ee)!important;--bink:var(--ink0,#1d1d1f);--bmuted:#5b6170;color:var(--ink0,#1d1d1f)}
html body .hx-post .da-h1{font-size:clamp(52px,11vw,168px);line-height:.88;letter-spacing:-.045em;margin:14px 0 26px;color:var(--bink);overflow-wrap:anywhere}.hx-post.up .da-h1{text-transform:uppercase}html body .hx.hx-post.ln .da-h1{font-size:clamp(44px,7vw,108px)}
html body .hx.hx-post .da-h1 mark{background:none!important;box-shadow:none!important;color:inherit;-webkit-text-fill-color:transparent;-webkit-text-stroke:2px currentColor;padding:0}
.hx-post.tn-brand .da-btn.pri{background:var(--btntext,#fff);color:var(--bp);border-color:var(--btntext,#fff)}.hx-post.tn-brand .da-btn.sec,.hx-post.tn-ink .da-btn.sec{color:inherit;border-color:currentColor;background:transparent}
.hx-post .rw{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:18px 40px;padding-bottom:40px}.hx-post .hx-sub{margin:0;font-size:clamp(17px,1.5vw,21px);color:var(--bmuted)}
.hx-post .da-eyebrow{background:transparent;border:1px solid currentColor;color:inherit}
/* cintas (cartel y bloque) */
.hx-post .tk,.sx-tk .tk{display:flex;overflow:hidden;white-space:nowrap;border-top:1px solid color-mix(in srgb,currentColor 25%,transparent);padding:14px 0}
.hx-post .tr,.sx-tk .tr{display:flex;flex:0 0 auto;align-items:center;gap:22px;padding-right:22px;animation:hxmq var(--tks,32s) linear infinite;font-weight:700;letter-spacing:.02em}.hx-post .tr i,.sx-tk .tr i{font-style:normal;opacity:.6}
@keyframes hxmq{to{transform:translateX(-100%)}}
@media (prefers-reduced-motion:reduce){.hx-post .tr,.sx-tk .tr{animation:none;flex-wrap:wrap;white-space:normal}.hx-post .tr[aria-hidden],.sx-tk .tr[aria-hidden]{display:none}.hx-post .tk,.sx-tk .tk{justify-content:center}}
/* secciones */
.sx-spot .w{max-width:980px;margin:0 auto;display:grid;gap:28px;align-items:center;grid-template-columns:minmax(0,1fr)}
.sx-spot img{width:100%;max-width:340px;aspect-ratio:1;object-fit:cover;border-radius:50%;margin:0 auto}.sx-spot figure{margin:0;position:relative}.sx-spot .rt{text-align:center}.sx-spot .has-img .rt{text-align:left}
.sx-spot .qm{display:block;font:900 120px/.6 Georgia,serif;color:var(--bp);opacity:.35;height:52px}.sx-spot blockquote{font:600 clamp(22px,2.8vw,36px)/1.3 var(--fhead);color:var(--bink);margin:0 0 18px;letter-spacing:-.01em}
.sx-spot figcaption{display:flex;flex-direction:column;gap:2px}.sx-spot figcaption b{color:var(--bink);font-size:17px}.sx-spot figcaption span{color:var(--bmuted)}.sx-spot figcaption small{color:var(--bmuted);font-size:12.5px;margin-top:4px}
.sx-spot .hx-stars,.hx-stars{color:#f5a623;letter-spacing:2px;font-size:20px;display:block;margin-bottom:10px}.sx-spot .da-btn{margin-top:22px}
@media (min-width:768px){.sx-spot .w.has-img{grid-template-columns:300px minmax(0,1fr);gap:56px}}
.sx-tl .tl{list-style:none;padding:0;margin:0 auto;max-width:900px;position:relative}.sx-tl .tl::before{content:"";position:absolute;left:11px;top:6px;bottom:6px;width:2px;background:color-mix(in srgb,var(--bp) 30%,transparent)}
.sx-tl li{position:relative;padding:0 0 30px 44px}.sx-tl .dt{position:absolute;left:3px;top:4px;width:18px;height:18px;border-radius:50%;background:var(--bp);box-shadow:0 0 0 5px color-mix(in srgb,var(--bp) 18%,transparent)}
.sx-tl .wh{display:inline-block;font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--bpt,var(--bp));margin-bottom:4px}.sx-tl h3{font:700 20px var(--fhead);color:var(--bink);margin:0 0 4px}.sx-tl p{color:var(--bmuted);margin:0}
@media (min-width:768px){.sx-tl .tl::before{left:50%;margin-left:-1px}.sx-tl li{width:50%;padding:0 44px 40px 0;text-align:right}.sx-tl .dt{left:auto;right:-9px}
 .sx-tl li:nth-child(even){margin-left:50%;padding:0 0 40px 44px;text-align:left}.sx-tl li:nth-child(even) .dt{right:auto;left:-9px}}
.sx-pb .big{display:inline-flex;align-items:center;gap:14px;font:900 clamp(40px,7vw,96px)/1 var(--fhead);letter-spacing:-.03em;color:var(--bpt,var(--bp));text-decoration:none;margin:10px 0 6px;overflow-wrap:anywhere}.sx-pb .big .nci{font-size:.55em}
.sx-pb .hr{color:var(--bmuted);display:flex;align-items:center;gap:8px;margin:0}.sx-pb .da-card h3{font:700 19px var(--fhead);margin:0 0 12px}.sx-pb .wa{display:inline-flex;align-items:center;gap:8px;margin-top:12px;font-weight:700;color:#128C4B;text-decoration:none}
html body .sx-pb.tn-brand{background:var(--bp)!important;--bink:var(--btntext,#fff);--bmuted:color-mix(in srgb,var(--btntext,#fff) 80%,transparent);--bpt:var(--btntext,#fff);color:var(--btntext,#fff)}html body .sx-pb.tn-ink{background:var(--ink0,#111)!important;--bink:#fff;--bmuted:rgba(255,255,255,.75);--bpt:color-mix(in srgb,var(--bp) 45%,#fff);color:#fff}
html body .sx-pb.tn-paper{background:var(--bsoft)!important}.sx-pb.tn-brand .da-card,.sx-pb.tn-ink .da-card{--bink:var(--ink0,#1d1d1f);--bmuted:#5b6170;--bpt:var(--bp);color:var(--ink0,#1d1d1f);background:#fff}
.sx-fq .ls{border-top:1px solid var(--dline)}.sx-fq details{border-bottom:1px solid var(--dline)}.sx-fq summary{list-style:none;cursor:pointer;display:flex;justify-content:space-between;gap:16px;align-items:center;padding:18px 0;font-weight:700;font-size:17px;color:var(--bink)}
.sx-fq summary::-webkit-details-marker{display:none}.sx-fq summary span{transition:transform .2s;flex:0 0 auto;color:var(--bpt,var(--bp))}.sx-fq details[open] summary span{transform:rotate(180deg)}.sx-fq details p{color:var(--bmuted);margin:0 0 18px;max-width:62ch}
.sx-fq .ct h3{font:700 21px var(--fhead);margin:0 0 6px}.sx-fq .ct>p{color:var(--bmuted)}@media (min-width:992px){.sx-fq .ct{position:sticky;top:90px}}
html body .sx-os{padding:16px 0!important}.sx-os .w{display:flex;flex-wrap:wrap;align-items:center;gap:10px 20px;justify-content:center}.sx-os .bd{font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;padding:5px 10px;border-radius:999px;background:var(--ba);color:var(--ink0,#111)}
.sx-os .tx{margin:0;font-weight:700;font-size:17px}.sx-os .pr{display:flex;align-items:baseline;gap:4px}.sx-os .pr b{font:800 28px/1 var(--fhead)}.sx-os .pr small{opacity:.8}.sx-os .nc-cd{margin:0;display:flex;align-items:center;gap:8px}.sx-os .nc-cd .l{font-size:13px;opacity:.85}html body .sx-os .dx-cdn span{background:color-mix(in srgb,currentColor 16%,transparent);color:inherit;min-width:44px;padding:4px 6px}html body .sx-os .dx-cdn small{color:inherit;opacity:.8}.sx-os .da-btn{padding:10px 18px}
html body .sx-os.tn-brand,html body .sx-os.tn-auto{background:var(--bp)!important;color:var(--btntext,#fff);--bink:var(--btntext,#fff)}html body .sx-os.tn-ink{background:var(--ink0,#111)!important;color:#fff;--bink:#fff}html body .sx-os.tn-paper{background:var(--bsoft)!important;color:var(--bink)}
.sx-os.tn-brand .da-btn.pri,.sx-os.tn-auto .da-btn.pri{background:var(--btntext,#fff);color:var(--bp);border-color:var(--btntext,#fff)}
@media (max-width:575px){.sx-os .w{justify-content:flex-start}.sx-os .da-btn{width:100%;justify-content:center}}
.sx-tk{overflow:hidden}.sx-tk .tk{border:0;padding:16px 0}.sx-tk.sz-S .tr{font-size:14px}.sx-tk.sz-M .tr{font-size:clamp(18px,2vw,24px)}.sx-tk.sz-L .tr{font:800 clamp(28px,4vw,52px)/1.1 var(--fhead);letter-spacing:-.02em}
.sx-tk.sp-S{--tks:48s}.sx-tk.sp-F{--tks:18s}html body .sx-tk.tn-ink{background:var(--ink0,#111);color:#fff}html body .sx-tk.tn-brand,html body .sx-tk.tn-auto{background:var(--bp);color:var(--btntext,#fff)}html body .sx-tk.tn-paper{background:var(--bsoft);color:var(--bink)}
.sx-pf .it{height:100%;display:flex;flex-direction:column;gap:6px}.sx-pf .ic{width:48px;height:48px;border-radius:14px;display:grid;place-items:center;background:color-mix(in srgb,var(--bp) 12%,transparent);color:var(--bpt,var(--bp));font-size:22px;margin-bottom:6px}
.sx-pf h3{font:700 20px var(--fhead);margin:0;color:var(--bink)}.sx-pf .it>p{color:var(--bmuted);margin:0 0 8px}.sx-pf .rc{margin-top:auto;border-top:1px dashed var(--dline);padding-top:12px;display:flex;flex-direction:column}
.sx-pf .rc small{font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:var(--bmuted)}.sx-pf .rc b{font-size:17px;color:var(--bink)}.sx-pf .rc span{font:800 24px var(--fhead);color:var(--bpt,var(--bp))}.sx-pf .rc span small{font:500 13px var(--fbody,inherit);text-transform:none;letter-spacing:0}
.sx-pf .da-btn{margin-top:14px;justify-content:center}
.sx-ck .cl{height:100%}.sx-ck h3{font:700 20px var(--fhead);display:flex;align-items:center;gap:8px;margin:0 0 14px}.sx-ck ul{list-style:none;padding:0;margin:0;display:grid;gap:10px}.sx-ck li{display:flex;gap:10px;align-items:flex-start;color:var(--bink)}
.sx-ck li .nci{flex:0 0 auto;margin-top:3px}.sx-ck .y h3,.sx-ck .y li .nci{color:#15803d}.sx-ck .n h3,.sx-ck .n li .nci{color:#b91c1c}.sx-ck .n li{color:var(--bmuted)}`;}

const NC_V5_JS=`(function(){var DL=function(o){try{(window.dataLayer=window.dataLayer||[]).push(o);}catch(e){}};
document.querySelectorAll('[data-pick]').forEach(function(f){var b=f.querySelector('button[type=submit]'),t=b&&b.getAttribute('data-tpl');function u(){var r=f.querySelector('input[name=oferta]:checked');if(r&&t)b.textContent=t.replace('{opcion}',r.value);}
  f.addEventListener('change',function(e){if(e.target.name==='oferta'){u();DL({event:'offer_pick',oferta:e.target.value});}});u();});
document.querySelectorAll('[data-saver]').forEach(function(w){var r=w.querySelector('input[type=range]'),v=w.querySelector('[data-sv-val]'),o=w.querySelector('[data-sv-out]'),h=w.querySelector('input[name=factura]'),pct=parseFloat(w.getAttribute('data-pct'));
  function u(){var x=+r.value;v.textContent=x+' €';if(h)h.value=x;if(o&&!isNaN(pct))o.textContent=Math.round(x*pct/100*12).toLocaleString('es-ES')+' €';}r.addEventListener('input',u);r.addEventListener('change',function(){DL({event:'saver_use',factura:r.value});});u();});
document.addEventListener('click',function(e){var c=e.target.closest&&e.target.closest('[data-copy]');if(c){var t=c.getAttribute('data-copy');try{navigator.clipboard.writeText(t);}catch(x){}c.textContent='¡Copiado!';DL({event:'coupon_copy'});setTimeout(function(){c.textContent='Copiar';},1800);return;}
  var v=e.target.closest&&e.target.closest('.hx-vid .pl');if(v&&!v.disabled){var b=v.parentNode,s=b.getAttribute('data-vsrc'),m=b.getAttribute('data-vmp4');if(!s&&!m)return;b.innerHTML=s?'<iframe src="'+s+'" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen title="Vídeo"></iframe>':'<video src="'+m+'" controls autoplay playsinline></video>';DL({event:'video_play',video:s||m});}});
document.querySelectorAll('.sx-fq summary').forEach(function(s){s.addEventListener('click',function(){if(!s.parentNode.open)DL({event:'faq_open',pregunta:s.textContent.trim()});});});
})();`;
(function(){const _bd=buildDoc;buildDoc=function(forExport){let h=_bd.apply(this,arguments);if(forExport&&!state.sections.some(s=>!s.hidden&&NC_V5_TYPES.test(s.type)))return h;
  return h.replace("</head>",`<style>${ncV5CSS()}</style></head>`).replace(/<\/body>(?![\s\S]*<\/body>)/,`<script>${NC_V5_JS}<\/script></body>`);};})();

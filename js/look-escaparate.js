/* ---------- v4.8 · ESTILO «ESCAPARATE» + MARCA JAZZTEL 2026 + PLANTILLA ----------
   Referencia: desarrollo.mijazztel.com (web de distribuidor, octubre 2026).
   · Marca «Jazztel 2026»: amarillo #FFCD00 (botones y hero), magenta #DA1884 (acento), negro; Gotham → Montserrat.
   · Estilo «Escaparate» (genérico, toma los colores de cualquier marca): bloques planos de color sobre gris claro,
     titulares muy negros, pestañas píldora, tarjetas con borde negro, mosaico de ventajas en colores, sección oscura
     de extras, pie gris con barra legal negra y barra de contacto fija abajo. Sin sombras.
   · 6 bloques nuevos (grupo «Escaparate»): hero promo con formulario lateral, tarifas con pestañas, dispositivos con
     cuota, extras con precio, ventajas en mosaico de colores y barra fija de contacto.
   Nada de datos de negocio: todo el copy, precios, logos y fotos de la plantilla son {{PLACEHOLDER}} o huecos para subir. */

/* ===== Marca ===== */
BRANDS.c_jazztel26={name:"Jazztel 2026",locked:true,client:true,
  vars:"--bp:#FFCD00;--bp2:#E6B800;--ba:#DA1884;--bink:#000000;--bmuted:#4d4d4d;--bsoft:#F3F3F3;--line:#E2E2E2;--btnr:8px;--cardr:12px;--btntext:#000000;--ink0:#000000;",
  fhead:"'Montserrat',sans-serif",fbody:"'Montserrat',sans-serif",fonts:fontsHref("Montserrat","Montserrat"),
  note:"desarrollo.mijazztel.com · amarillo #FFCD00 + magenta #DA1884 + negro · Gotham→Montserrat · botones 8 px."};
(function(){const g=BRAND_GROUPS.find(x=>x[0]==="Clientes NC");if(g&&!g[1].includes("c_jazztel26")){const i=g[1].indexOf("c_jazztel");g[1].splice(i<0?g[1].length:i+1,0,"c_jazztel26");}})();

/* ===== Bloques ===== */
const ESC_CAT="Escaparate";
function escPrice(v,unit){const s=String(v||"");const m=s.match(/^\s*(\d{1,4})[,.](\d{1,2})\s*$/);
  return `<span class="esc-pr"><b>${esc(m?m[1]:s)}</b>${m||unit?`<span class="d">${m?`<sup>’${m[2]}</sup>`:""}${unit?`<small>${esc(unit)}</small>`:""}</span>`:""}</span>`;}
function escHl(s){return esc(s||"").replace(/\*([^*]+)\*/g,"<em>$1</em>");}
function escAnc(p){const a=String(p.anchor||"").replace(/[^\w-]/g,"");return a?` id="${a}"`:"";}
const ESC_ANCF={k:"anchor",l:"Ancla para el menú (p. ej. tarifas → enlace #tarifas)"};
const ESC_TONES=[["brand","Color de marca"],["accent","Color de acento"],["ink","Negro"],["soft","Gris"],["white","Blanco"]];
function escTone(t){const v=String(t||"").trim();if(/^#[0-9a-f]{3,8}$/i.test(v))return {cls:"tn-c",st:`--tc:${v}`};return {cls:"tn-"+(ESC_TONES.some(o=>o[0]===v)?v:"soft"),st:""};}

Object.assign(LIB,{
dx_promohero:{label:"✚ Hero promo + formulario lateral",ico:"▣",cat:ESC_CAT,raw:true,
  def:()=>({tag:"{{ETIQUETA}}",headline:"{{TITULAR}}",highlight:"{{DESTACADO}}",box1:"{{PRODUCTO_1}}",box2:"{{PRODUCTO_2}}",sub1:"{{DETALLE_1}}",sub2:"{{DETALLE_2}}",
    price:"{{PRECIO}}",unit:"€/mes",priceTag:"{{NOTA_PRECIO}}",cta:"{{CTA_OFERTA}}",act:"popup",extra:"{{EXTRA}}",extraBtn:"{{CTA_EXTRA}}",img:"",imgAlt:"",
    formTitle:"{{TITULO_FORMULARIO}}",formSub:"{{SUBTITULO_FORMULARIO}}",opts:"{{OPCION_1}}|{{OPCION_2}}|{{OPCION_3}}",formBtn:"{{CTA_FORMULARIO}}",
    promoTag:"{{ETIQUETA_PROMO}}",promoText:"{{PROMO}}",promoImg:""}),
  fields:[{k:"tag",l:"Etiqueta (arriba a la izquierda)"},{k:"headline",l:"Titular"},{k:"highlight",l:"Parte destacada del titular (color de acento)"},
    {k:"box1",l:"Caja de producto · línea 1 (izquierda)"},{k:"box2",l:"Caja de producto · línea 1 (derecha, vacío = una sola)"},{k:"sub1",l:"Caja · detalle izquierda"},{k:"sub2",l:"Caja · detalle derecha"},
    {k:"price",l:"Precio (p. ej. 39,95)"},{k:"unit",l:"Unidad"},{k:"priceTag",l:"Etiqueta negra junto al precio"},{k:"cta",l:"Botón principal (vacío = sin botón)"},V4_ACTF,
    {k:"extra",l:"Banda blanca inferior · texto (opcional)"},{k:"extraBtn",l:"Banda blanca · botón"},{k:"img",l:"Foto recortada (PNG con fondo transparente)",t:"photo"},{k:"imgAlt",l:"Texto alternativo de la foto"},
    {k:"formTitle",l:"Formulario · título"},{k:"formSub",l:"Formulario · subtítulo"},{k:"opts",l:"Formulario · opciones (separadas por |, * = marcada)"},{k:"formBtn",l:"Formulario · botón"},
    {k:"promoTag",l:"Tarjeta promo · cabecera (vacío = sin tarjeta)"},{k:"promoText",l:"Tarjeta promo · texto grande"},{k:"promoImg",l:"Tarjeta promo · imagen",t:"photo"}],
  render:p=>{const main=`<div class="dx-ph-main"><div class="tx">${p.tag?`<span class="dx-ph-tag">${esc(p.tag)}</span>`:""}
      <h1 class="dx-ph-h">${esc(p.headline)}${p.highlight?` <mark>${esc(p.highlight)}</mark>`:""}</h1>
      ${p.box1?`<div class="dx-ph-box"><div class="t"><span>${esc(p.box1)}</span>${p.box2?`<i>+</i><span>${esc(p.box2)}</span>`:""}</div>${p.sub1||p.sub2?`<div class="s"><span>${esc(p.sub1||"")}</span>${p.box2?`<span>${esc(p.sub2||"")}</span>`:""}</div>`:""}</div>`:""}
      <div class="dx-ph-pr">${escPrice(p.price,p.unit)}${p.priceTag?`<span class="tg">${esc(p.priceTag)}</span>`:""}</div>
      ${p.cta?`<div class="da-btns"><a href="#form" data-cta="form"${v4ActA(p)} class="da-btn dx-btn-ink">${esc(p.cta)} ${I_GO()}</a></div>`:""}
      ${p.extra?`<div class="dx-ph-ex"><span>${esc(p.extra)}</span>${p.extraBtn?`<a href="#form" data-cta="form"${v4ActA(p)} class="b">${esc(p.extraBtn)}</a>`:""}</div>`:""}</div>
      ${p.img?`<img class="dx-ph-img" src="${esc(p.img)}" alt="${esc(p.imgAlt||"")}" fetchpriority="high">`:`<div class="dx-ph-img ph" aria-hidden="true">{{FOTO}}</div>`}</div>`;
    const side=`<aside class="dx-ph-side"><div class="dx-ph-form" id="form"><h2>${esc(p.formTitle)}</h2>${p.formSub?`<p>${esc(p.formSub)}</p>`:""}${v4PhoneForm({btn:p.formBtn||"",btnCls:"da-btn pri w-100",opts:p.opts})}</div>
      ${p.promoTag||p.promoText?`<div class="dx-ph-promo"><div class="hd">${esc(p.promoTag||"")}</div><div class="bd"><b>${esc(p.promoText||"")}</b>${p.promoImg?`<img src="${esc(p.promoImg)}" alt="" loading="lazy">`:`<span class="ph">{{IMAGEN_PROMO}}</span>`}</div></div>`:""}</aside>`;
    return `<section class="da dx-ph"><div class="container"><div class="dx-ph-g">${main}${side}</div></div></section>`;}},
dx_plantabs:{label:"✚ Tarifas con pestañas",ico:"▤",cat:ESC_CAT,raw:true,
  def:()=>({anchor:"tarifas",title:"{{TITULO_TARIFAS}}",sub:"",act:"popup",plans:[
    {cat:"{{PESTAÑA_1}}",tag:"{{ETIQUETA_1}}",name:"{{TARIFA_1}} *{{DESTACADO_1}}*",feats:"{{DETALLE_1}}",band:"{{BANDA_1}}",badge:"{{DESCUENTO_1}}",price:"{{PRECIO_1}}",unit:"€/mes",note:"{{NOTA_PRECIO_1}}",cta:"{{CTA_TARIFA}}"},
    {cat:"{{PESTAÑA_2}}",tag:"{{ETIQUETA_2}}",name:"{{TARIFA_2}} *{{DESTACADO_2}}*",feats:"{{DETALLE_2}}",band:"",badge:"",price:"{{PRECIO_2}}",unit:"€/mes",note:"{{NOTA_PRECIO_2}}",cta:"{{CTA_TARIFA}}"},
    {cat:"{{PESTAÑA_3}}",tag:"{{ETIQUETA_3}}",name:"{{TARIFA_3}} *{{DESTACADO_3}}*",feats:"{{DETALLE_3}}",band:"",badge:"",price:"{{PRECIO_3}}",unit:"€/mes",note:"{{NOTA_PRECIO_3}}",cta:"{{CTA_TARIFA}}"}]}),
  fields:[ESC_ANCF,{k:"title",l:"Título"},{k:"sub",l:"Subtítulo (opcional)"},V4_ACTF,{k:"plans",l:"Tarifas",t:"repeater",addLabel:"Añadir tarifa",item:[
    {k:"cat",l:"Pestaña (las tarifas con la misma pestaña van juntas; vacío = sin pestañas)",def:""},{k:"tag",l:"Etiqueta negra",def:""},{k:"name",l:"Nombre (*palabra* = color de acento)",def:"Tarifa"},
    {k:"feats",l:"Detalles (uno por línea)",t:"ta",def:""},{k:"band",l:"Banda gris (extra opcional)",def:""},{k:"badge",l:"Círculo de descuento (opcional)",def:""},
    {k:"price",l:"Precio",def:""},{k:"unit",l:"Unidad",def:"€/mes"},{k:"note",l:"Nota bajo el precio",def:""},{k:"cta",l:"Botón",def:"La quiero"}]}],
  render:p=>{const P=arr(p.plans);const cats=[];P.forEach(x=>{const c=String(x.cat||"").trim();if(!cats.includes(c))cats.push(c);});
    const card=x=>`<article class="dx-pt-c"><div class="top">${x.tag?`<span class="tg">${esc(x.tag)}</span>`:"<span></span>"}${x.badge?`<span class="bd">${esc(x.badge)}</span>`:""}</div>
      <h3>${escHl(x.name)}</h3>${x.feats?v4Checks(x.feats,"dx-pt-f"):""}${x.band?`<div class="band">${esc(x.band)}</div>`:""}
      <div class="pr">${escPrice(x.price,x.unit)}${x.note?`<small class="nt">${esc(x.note)}</small>`:""}</div>
      <a href="#form" data-cta="form"${v4ActA(p,x)} class="da-btn pri w-100">${esc(x.cta||"")}</a></article>`;
    const list=L=>`<div class="dx-pt-l n${Math.min(L.length,3)}">${L.map(card).join("")}</div>`;
    const tabs=cats.length>1;
    return `<section class="da da-sec dx-pt"${tabs?" data-tabs":""}${escAnc(p)}><div class="container">${wHead(p)}
      ${tabs?`<div class="dx-pt-n" role="tablist">${cats.map((c,i)=>`<button type="button" role="tab" id="pt__SID__t${i}" aria-controls="pt__SID__p${i}" aria-selected="${i===0}" tabindex="${i?-1:0}">${esc(c)}</button>`).join("")}</div>
        ${cats.map((c,i)=>`<div role="tabpanel" id="pt__SID__p${i}" aria-labelledby="pt__SID__t${i}"${i?" hidden":""}>${list(P.filter(x=>String(x.cat||"").trim()===c))}</div>`).join("")}`:list(P)}</div></section>`;}},
dx_devices:{label:"✚ Dispositivos con cuota",ico:"▯",cat:ESC_CAT,raw:true,
  def:()=>({anchor:"moviles",title:"{{TITULO_DISPOSITIVOS}}",sub:"{{SUBTITULO_DISPOSITIVOS}}",act:"popup",btn:"{{CTA_VER_TODOS}}",btnUrl:"",
    items:[1,2,3].map(i=>({name:`{{DISPOSITIVO_${i}}}`,img:"",price:`{{CUOTA_${i}}}`,unit:"€/mes",term:"{{PLAZO}}",cta:"{{CTA_DISPOSITIVO}}",url:""}))}),
  fields:[ESC_ANCF,{k:"title",l:"Título"},{k:"sub",l:"Subtítulo"},V4_ACTF,{k:"items",l:"Dispositivos",t:"repeater",addLabel:"Añadir dispositivo",item:[
    {k:"name",l:"Nombre",def:""},{k:"img",l:"Foto (fondo transparente)",t:"image",def:""},{k:"price",l:"Cuota",def:""},{k:"unit",l:"Unidad",def:"€/mes"},{k:"term",l:"Plazo (p. ej. 48 meses)",def:""},{k:"cta",l:"Botón",def:"Más info"},{k:"url",l:"Enlace del botón (vacío = formulario)",def:""}]},
    {k:"btn",l:"Botón inferior (opcional)"},{k:"btnUrl",l:"Enlace del botón inferior (vacío = formulario)"}],
  render:p=>{const I=arr(p.items);const lnk=(u,pl)=>u?`href="${esc(u)}"`:`href="#form" data-cta="form"${v4ActA(p,pl)}`;
    return `<section class="da da-sec dx-dv"${escAnc(p)}><div class="container">${wHead(p)}<div class="dx-dv-l">${I.map(x=>{const m=String(x.unit||"").match(/^\s*(€|\$|£)?\s*(\/.*)?$/);
      return `<article class="dx-dv-c"><h3>${esc(x.name)}</h3><div class="bd"><div class="pc"><span class="tile"><b>${esc(x.price)}</b>${m?`<span class="u"><sup>${esc(m[1]||"")}</sup><small>${esc(m[2]||"")}</small></span>`:`<small>${esc(x.unit)}</small>`}</span>${x.term?`<small class="tm">${esc(x.term)}</small>`:""}</div>
        ${x.img?`<img src="${esc(x.img)}" alt="${esc(x.name)}" loading="lazy">`:`<span class="ph">{{FOTO}}</span>`}</div><a ${lnk(x.url,{name:x.name,price:x.price,unit:x.unit})} class="da-btn dx-btn-ink w-100">${esc(x.cta||"")}</a></article>`;}).join("")}</div>
      ${p.btn?`<div class="da-btns justify-content-center"><a ${lnk(p.btnUrl)} class="da-btn acc">${esc(p.btn)}</a></div>`:""}</div></section>`;}},
dx_addons:{label:"✚ Extras con precio (TV, servicios)",ico:"▥",cat:ESC_CAT,raw:true,
  def:()=>({anchor:"tv",title:"{{TITULO_EXTRAS}}",sub:"",act:"popup",items:[
    {title:"{{EXTRA_1}}",img:"",pre:"{{TEXTO_PRECIO}}",price:"{{PRECIO_EXTRA_1}}",unit:"€/mes",cta:"{{CTA_EXTRA}}",wide:""},
    {title:"{{EXTRA_2}}",img:"",pre:"{{TEXTO_PRECIO}}",price:"{{PRECIO_EXTRA_2}}",unit:"€/mes",cta:"{{CTA_EXTRA}}",wide:""},
    {title:"{{EXTRA_3}}",img:"",pre:"{{TEXTO_PRECIO}}",price:"{{PRECIO_EXTRA_3}}",unit:"€/mes",cta:"{{CTA_EXTRA}}",wide:"si"}]}),
  fields:[ESC_ANCF,{k:"title",l:"Título"},{k:"sub",l:"Subtítulo (opcional)"},V4_ACTF,{k:"items",l:"Extras",t:"repeater",addLabel:"Añadir extra",item:[
    {k:"title",l:"Nombre",def:""},{k:"img",l:"Logo o imagen (opcional; usa solo logos con permiso)",t:"image",def:""},{k:"pre",l:"Texto antes del precio",def:""},{k:"price",l:"Precio",def:""},{k:"unit",l:"Unidad",def:"€/mes"},
    {k:"cta",l:"Botón",def:"Ver detalles"},{k:"wide",l:"Ancho completo (escribe «si»)",def:""}]}],
  render:p=>`<section class="da da-sec dx-ad"${escAnc(p)}><div class="container">${wHead(p)}<div class="dx-ad-l">${arr(p.items).map(x=>`<article class="dx-ad-c${/^s[ií]$/i.test(String(x.wide||"").trim())?" w":""}">
      <div class="nm">${x.img?`<img src="${esc(x.img)}" alt="${esc(x.title||"")}" loading="lazy">`:""}${x.title&&!x.img?`<h3>${esc(x.title)}</h3>`:""}</div>
      <div class="ft"><span class="pr">${x.pre?`<small>${esc(x.pre)}</small>`:""}<b>${esc(x.price||"")}</b>${esc(x.unit||"")}</span><a href="#form" data-cta="form"${v4ActA(p,{name:x.title,price:x.price,unit:x.unit})} class="da-btn acc">${esc(x.cta||"")}</a></div></article>`).join("")}</div></div></section>`},
dx_colortiles:{label:"✚ Ventajas en mosaico de colores",ico:"▦",cat:ESC_CAT,raw:true,
  def:()=>({title:"{{TITULO_VENTAJAS}}",img:"",imgAlt:"",items:"badge-check|{{VENTAJA_1}}|accent\nrocket|{{VENTAJA_2}}|soft\nheart|{{VENTAJA_3}}|ink\nmessage-circle|{{VENTAJA_4}}|#02DAC0\nwifi|{{VENTAJA_5}}|brand"}),
  fields:[{k:"title",l:"Título"},{k:"img",l:"Foto a la izquierda (opcional)",t:"photo"},{k:"imgAlt",l:"Texto alternativo"},
    {k:"items",l:"Ventajas (icono|texto|color: brand, accent, ink, soft, white o #hex; una por línea)",t:"ta"}],
  render:p=>{const L=v4L(p.items);const im=!!p.img;
    return `<section class="da da-sec dx-ct"><div class="container">${p.title?`<h2 class="da-h2 text-center mb-4 mb-lg-5">${esc(p.title)}</h2>`:""}<div class="dx-ct-g${im?" im":""}${im&&L.length===5?" t5":""}">
      ${im?`<img class="ph-img" src="${esc(p.img)}" alt="${esc(p.imgAlt||"")}" loading="lazy">`:""}
      ${L.map(l=>{const c=v4C(l);const t=escTone(c[2]);return `<div class="it ${t.cls}"${t.st?` style="${t.st}"`:""}>${c[0]?`<span class="ic">${ncIconOrText(c[0])}</span>`:""}<p>${esc(c[1]||"").replace(/\\n/g,"<br>")}</p></div>`;}).join("")}</div></div></section>`;}},
dx_infobar:{label:"✚ Barra fija de contacto (abajo)",ico:"▁",cat:ESC_CAT,raw:true,
  def:()=>({left:"{{TEXTO_COBERTURA}} *{{ENLACE_COBERTURA}}*",leftHref:"#cobertura",right:"{{TEXTO_DUDAS}} *{{DESTACADO_DUDAS}}*",btn:"{{CTA_CONTACTO}}",act:"popup",pill:"si",pillWa:"{{TEXTO_WHATSAPP}}",pillCall:"{{TEXTO_TE_LLAMAMOS}}"}),
  fields:[{k:"left",l:"Texto izquierda (*parte* = enlace subrayado)"},{k:"leftHref",l:"Enlace de la izquierda (p. ej. #cobertura o #tarifas)"},{k:"right",l:"Texto derecha (*parte* en negrita)"},{k:"btn",l:"Botón"},V4_ACTF,
    {k:"pill",l:"Botón flotante WhatsApp + Te llamamos",t:"select",opts:[["si","Mostrar"],["no","Ocultar"]]},{k:"pillWa",l:"Flotante · texto WhatsApp"},{k:"pillCall",l:"Flotante · texto Te llamamos"}],
  render:p=>{const L=esc(p.left||"").replace(/\*([^*]+)\*/g,"<u>$1</u>"),R=esc(p.right||"").replace(/\*([^*]+)\*/g,"<b>$1</b>");
    return `<div class="dx-ib" role="region" aria-label="Contacto rápido"><div class="container"><a class="l" href="${esc(p.leftHref||"#form")}" data-cta="coverage">${ncIco("wifi")}<span>${L}</span></a><span class="sep" aria-hidden="true"></span>
      <div class="r"><span class="t">${R}</span><a href="#form" data-cta="form"${v4ActA(p)} class="da-btn acc">${esc(p.btn||"")}</a></div></div></div>
      ${p.pill!=="no"?`<div class="dx-ib-pill"><a href="${waHref()}" target="_blank" rel="noopener" data-cta="wa" class="wa">${ncIco("message-circle")}<span>${esc(p.pillWa||"")}</span></a><a href="#form" data-cta="form" data-act="popup" class="cl">${ncIco("phone")}<span>${esc(p.pillCall||"")}</span></a></div>`:""}`;}}
});
(function(){const X=["dx_promohero","dx_plantabs","dx_devices","dx_addons","dx_colortiles","dx_infobar"];let i=ORDER.indexOf("dx_spacer");if(i<0)i=ORDER.length;ORDER.splice(i,0,...X);})();
const NC_ESC_TYPES=/^dx_(promohero|plantabs|devices|addons|colortiles|infobar)$/;
/* Ancla #cobertura en el bloque de cobertura (para la barra fija) */
(function(){const C=LIB.dx_coverage;if(!C)return;const r=C.render;C.render=function(p){return r.apply(this,arguments).replace('<section class="da da-sec dx-cov"','<section id="cobertura" class="da da-sec dx-cov"');};})();

function ncEscCSS(){return `
.esc-pr{display:inline-flex;align-items:flex-start;line-height:.85;color:var(--bink);font-family:var(--fdisp,var(--fhead))}.esc-pr b{font-size:clamp(60px,6.4vw,96px);font-weight:800;letter-spacing:-.04em}
.esc-pr .d{display:flex;flex-direction:column;justify-content:space-between;margin-left:3px;padding:.12em 0 .3em}.esc-pr sup{position:static;font-weight:800;font-size:clamp(22px,2.6vw,36px);line-height:1}.esc-pr small{font-size:15px;font-weight:500;line-height:1.1;white-space:nowrap}
/* hero promo */
.dx-ph{padding:28px 0 40px;background:var(--lkp,#f3f3f3)}.dx-ph-g{display:grid;grid-template-columns:minmax(0,2.2fr) minmax(0,1fr);gap:24px;align-items:stretch}
.dx-ph-main{position:relative;background:var(--bp);color:#000;border-radius:var(--cardr,12px);display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);overflow:hidden;min-height:480px}
.dx-ph-main .tx{padding:48px 0 40px 46px;position:relative;z-index:1;display:flex;flex-direction:column;align-items:flex-start;gap:14px}
.dx-ph-tag{background:#000;color:#fff;font-size:12px;font-weight:800;padding:6px 9px;border-radius:6px}
.dx-ph-h{font:800 clamp(30px,3.4vw,50px)/1.04 var(--fhead);letter-spacing:-.02em;color:#000;margin:18px 0 0}.dx-ph-h mark{background:none;padding:0;color:var(--ba)}
.dx-ph-box{background:var(--ba);color:#fff;padding:14px 26px;min-width:min(100%,370px);text-align:center;margin-top:-4px}.dx-ph-box .t{display:flex;justify-content:center;align-items:center;gap:10px;font:800 clamp(26px,2.8vw,42px)/1.05 var(--fhead)}.dx-ph-box i{font-style:normal;font-weight:400;font-size:.6em;align-self:flex-start}
.dx-ph-box .s{display:flex;justify-content:space-around;gap:16px;font-size:clamp(20px,2vw,30px);font-weight:500;margin-top:4px}
.dx-ph-pr{display:flex;align-items:stretch;gap:0;margin-top:-14px;min-width:min(100%,370px)}.dx-ph-pr .esc-pr{padding:12px 12px 6px 6px;color:#000}.dx-ph-pr .tg{background:#000;color:#fff;font:800 clamp(17px,1.6vw,22px)/1.15 var(--fhead);padding:16px 18px;display:flex;align-items:center;flex:1;max-width:190px;overflow-wrap:anywhere;min-width:0;clip-path:polygon(0 0,100% 0,100% 82%,88% 100%,0 100%)}
.dx-ph-ex{display:flex;align-items:center;gap:14px;background:#fff;border-radius:8px;padding:10px 12px 10px 14px;font-weight:600;font-size:15px;margin-top:auto}.dx-ph-ex .b{background:#000;color:#fff;border-radius:8px;padding:9px 13px;font-weight:700;text-decoration:none;white-space:nowrap}
.dx-ph-main .da-btns{margin:6px 0 0}
.dx-ph-img{position:absolute;right:0;bottom:0;height:100%;max-height:540px;width:auto;max-width:44%;object-fit:contain;object-position:bottom right}
.dx-ph-img.ph{position:relative;align-self:end;justify-self:center;width:72%;height:84%;max-width:none;display:grid;place-items:center;border:2px dashed rgba(0,0,0,.25);border-radius:12px 12px 0 0;border-bottom:0;font-size:13px;font-weight:700;color:rgba(0,0,0,.45)}
.dx-ph-side{display:flex;flex-direction:column;gap:16px}.dx-ph-form{background:#000;color:#fff;padding:22px 20px;border-radius:0 0 var(--cardr,12px) var(--cardr,12px);text-align:center}
.dx-ph-form h2{font:800 22px/1.2 var(--fhead);color:var(--bp);margin:0 0 4px}.dx-ph-form p{font-size:14.5px;margin:0 0 12px;color:rgba(255,255,255,.85)}
.dx-ph-form .nc-opts{display:grid;grid-template-columns:repeat(auto-fit,minmax(70px,1fr));gap:6px;margin-bottom:12px}.dx-ph-form .nc-opts label{margin:0}.dx-ph-form .nc-opts span{display:block;background:var(--ba);color:#fff;border:0;border-radius:0;padding:10px 6px;font-weight:700;font-size:14px;cursor:pointer;text-align:center}
.dx-ph-form .nc-opts input{position:absolute;opacity:0}.dx-ph-form .nc-opts input:checked+span{background:#7c7c7c;color:#fff}.dx-ph-form .nc-opts input:focus-visible+span{outline:2px solid var(--bp);outline-offset:2px}
.dx-ph-form .form-control{border-radius:6px;border:0;min-height:44px}.dx-ph-form .da-btn{min-height:50px;justify-content:center;font-size:17px}.dx-ph-form .nc-legal,.dx-ph-form .nc-legal a,.dx-ph-form .form-check-label{color:rgba(255,255,255,.75)}
.dx-ph-promo{flex:1;border-radius:var(--cardr,12px);overflow:hidden;background:var(--bp);display:flex;flex-direction:column;min-height:200px}.dx-ph-promo .hd{background:var(--ba);color:#fff;font-size:12px;font-weight:800;text-align:center;padding:6px 10px}
.dx-ph-promo .bd{flex:1;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 18px}.dx-ph-promo b{background:#fff;color:var(--ba);font:800 clamp(20px,2vw,28px)/1.05 var(--fhead);padding:12px 14px;border-radius:12px;max-width:60%}
.dx-ph-promo img{max-width:46%;max-height:190px;object-fit:contain}.dx-ph-promo .ph{width:40%;height:140px;display:grid;place-items:center;border:2px dashed rgba(0,0,0,.25);border-radius:10px;font-size:11px;font-weight:700;color:rgba(0,0,0,.45);text-align:center}
@media (max-width:991px){.dx-ph-g{grid-template-columns:minmax(0,1fr)}.dx-ph-form{border-radius:var(--cardr,12px)}}
@media (max-width:767px){.dx-ph{padding:14px 0 28px}.dx-ph-main{grid-template-columns:minmax(0,1fr);min-height:0}.dx-ph-main .tx{padding:26px 18px 22px}.dx-ph-img{position:relative;max-width:70%;max-height:280px;justify-self:end;margin:-120px -6px 0 auto;z-index:0}.dx-ph-img.ph{display:none}
 .dx-ph-box,.dx-ph-pr{min-width:0;width:100%}.dx-ph-ex{flex-wrap:wrap;width:100%}.dx-ph-main .tx{gap:12px}.dx-ph-h{margin-top:8px}}
/* tarifas con pestañas */
.dx-pt-n{display:flex;justify-content:center;gap:4px;margin:0 auto 26px;background:#fff;border-radius:999px;padding:4px;width:max-content;max-width:100%;overflow-x:auto;scrollbar-width:none}
.dx-pt-n button{border:0;background:none;color:#000;border-radius:999px;padding:12px 16px;font-weight:700;font-size:16px;white-space:nowrap;cursor:pointer}.dx-pt-n button[aria-selected="true"]{background:#000;color:#fff}
.dx-pt-l{display:grid;gap:18px;grid-template-columns:repeat(3,minmax(0,1fr))}.dx-pt-l.n1{grid-template-columns:minmax(0,520px);justify-content:center}.dx-pt-l.n2{grid-template-columns:repeat(2,minmax(0,460px));justify-content:center}
@media (max-width:991px){.dx-pt-l,.dx-pt-l.n2{grid-template-columns:minmax(0,520px);justify-content:center}}
.dx-pt-c{background:var(--lkc,#fff);border:2px solid var(--bink,#000);border-radius:var(--cardr,12px);overflow:hidden;display:flex;flex-direction:column;color:var(--bink)}
.dx-pt-c .top{display:flex;justify-content:space-between;align-items:flex-start;padding:16px 16px 0}.dx-pt-c .tg{background:#000;color:#fff;font-size:11.5px;font-weight:800;padding:5px 8px;border-radius:5px}
.dx-pt-c .bd{width:34px;height:34px;border-radius:50%;background:#e6e6e6;color:var(--ba);font-size:10px;font-weight:800;display:grid;place-items:center;text-align:center;line-height:1}
.dx-pt-c h3{font:800 clamp(20px,1.8vw,26px)/1.2 var(--fhead);margin:12px 16px 6px}.dx-pt-c h3 em{font-style:normal;color:var(--ba)}
.dx-pt-f{list-style:disc;padding:0 16px 0 34px;margin:0 0 14px;font-size:14px}.dx-pt-c .band{background:color-mix(in srgb,var(--bink) 8%,transparent);padding:10px 16px;font-size:14px;margin-top:auto}
.dx-pt-c .pr{padding:16px 16px 4px;display:flex;flex-direction:column}.dx-pt-c .pr .esc-pr b{font-size:56px}.dx-pt-c .pr .esc-pr sup{font-size:26px}.dx-pt-c .nt{font-size:13px;margin-top:4px}.dx-pt-c .da-btn{margin:10px 16px 16px;width:auto!important;justify-content:center}
.dx-pt-c .band+.pr{margin-top:0}.dx-pt-c .dx-pt-f+.pr{margin-top:auto}
/* dispositivos */
.dx-dv-l{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}
@media (max-width:991px){.dx-dv-l{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;padding-bottom:6px}.dx-dv-c{flex:0 0 min(82%,340px);scroll-snap-align:start}}
.dx-dv-c{background:var(--lkc,#fff);border-radius:var(--cardr,12px);overflow:hidden;display:flex;flex-direction:column;color:var(--bink)}
.dx-dv-c h3{background:var(--bp);color:var(--btntext,#000);font:800 18px/1.2 var(--fhead);text-align:center;padding:16px 12px;margin:0;min-height:68px;display:grid;place-items:center}
.dx-dv-c .bd{display:flex;align-items:center;justify-content:space-around;gap:10px;padding:18px 14px 6px;flex:1}.dx-dv-c .pc{display:flex;flex-direction:column;align-items:center;gap:6px}
.dx-dv-c .tile{background:var(--ba);color:#fff;border-radius:12px;padding:12px 14px;gap:4px;display:flex;align-items:center;gap:2px;line-height:1}.dx-dv-c .tile b{font:800 54px/1 var(--fhead)}.dx-dv-c .tile .u{display:flex;flex-direction:column;justify-content:space-between;align-self:stretch;padding:2px 0 4px}.dx-dv-c .tile sup{position:static;font-size:24px;font-weight:800;line-height:1}.dx-dv-c .tile small{font-size:14px;line-height:1}
.dx-dv-c .tm{font-size:12.5px}.dx-dv-c img{max-height:150px;max-width:45%;object-fit:contain}.dx-dv-c .ph{width:40%;height:140px;display:grid;place-items:center;border:2px dashed var(--dline);border-radius:10px;font-size:11px;font-weight:700;color:var(--bmuted)}
.dx-dv-c .da-btn{margin:14px;width:auto!important;justify-content:center}.dx-dv .da-btns{margin-top:30px}
.da-btn.acc{background:var(--ba)!important;color:#fff!important;border-color:var(--ba)!important}.da-btn.dx-btn-ink{background:#000!important;color:#fff!important;border-color:#000!important}
/* extras */
html body .dx-ad.dx-ad.dx-ad{background:#252525!important;background-image:none!important;color:#fff;--bink:#fff;--bmuted:rgba(255,255,255,.75);--dline:rgba(255,255,255,.18)}html body .dx-ad .da-h2,html body .dx-ad .da-muted{color:#fff!important;-webkit-text-fill-color:#fff}
.dx-ad-l{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.dx-ad-c{background:#000;border-radius:var(--cardr,12px);padding:34px 28px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:22px;text-align:center}
.dx-ad-c .nm img{max-height:90px;max-width:100%;object-fit:contain}.dx-ad-c h3{font:800 clamp(22px,2.2vw,30px)/1.15 var(--fhead);margin:0;color:#fff}
.dx-ad-c .ft{display:flex;align-items:center;justify-content:center;gap:22px;flex-wrap:wrap}.dx-ad-c .pr{text-align:left;font-size:18px;line-height:1.25}.dx-ad-c .pr small{display:block;font-size:18px}.dx-ad-c .pr b{font-weight:800}
.dx-ad-c.w{grid-column:1/-1;flex-direction:row;justify-content:space-between;padding:22px 28px;text-align:left}
@media (max-width:767px){.dx-ad-l{grid-template-columns:1fr}.dx-ad-c.w{flex-direction:column;text-align:center}}
/* mosaico */
.dx-ct-g{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}.dx-ct-g.im{grid-template-columns:repeat(4,minmax(0,1fr))}
.dx-ct-g .ph-img{grid-row:span 2;width:100%;height:100%;max-height:520px;object-fit:contain;object-position:bottom center;align-self:end}.dx-ct-g.t5 .it:nth-of-type(1){grid-column-start:3}
.dx-ct-g .it{border-radius:var(--cardr,8px);padding:20px 18px;font-weight:700;font-size:15.5px;line-height:1.35;display:flex;flex-direction:column;gap:14px;min-height:150px}.dx-ct-g .it p{margin:0}
.dx-ct-g .ic{font-size:24px;line-height:1}.dx-ct-g .tn-brand{background:var(--bp);color:var(--btntext,#000)}.dx-ct-g .tn-accent{background:var(--ba);color:#fff}.dx-ct-g .tn-ink{background:#000;color:#fff}.dx-ct-g .tn-soft{background:#d9d9d9;color:#000}.dx-ct-g .tn-white{background:#fff;color:#000}.dx-ct-g .tn-c{background:var(--tc);color:#000}
@media (max-width:991px){.dx-ct-g,.dx-ct-g.im{grid-template-columns:repeat(2,minmax(0,1fr))}.dx-ct-g .ph-img{grid-column:1/-1;grid-row:auto;max-height:260px}.dx-ct-g.t5 .it:nth-of-type(1){grid-column-start:auto}}
@media (max-width:575px){.dx-ct-g,.dx-ct-g.im{grid-template-columns:1fr}.dx-ct-g .it{min-height:0}}
/* barra fija */
body:has(.dx-ib){padding-bottom:64px}
.dx-ib{position:fixed;left:0;right:0;bottom:0;z-index:1030;background:#000;color:#fff;padding:10px 0}.dx-ib .container{display:flex;align-items:center;justify-content:center;gap:28px}
.dx-ib .l{display:flex;align-items:center;gap:12px;color:#fff;text-decoration:none;font-size:18px}.dx-ib .l .nci{color:var(--ba);font-size:24px}.dx-ib .l u{color:var(--ba);font-weight:800;text-underline-offset:3px}
.dx-ib .sep{width:1px;height:34px;background:rgba(255,255,255,.4)}.dx-ib .r{display:flex;align-items:center;gap:18px;font-size:18px}.dx-ib .r .t{color:var(--bp)}.dx-ib .r b{color:#fff}.dx-ib .da-btn{padding:8px 18px;font-size:15px}
.dx-ib-pill{position:fixed;right:14px;bottom:78px;z-index:1031;display:flex;align-items:center;gap:0;background:#000;border-radius:999px;padding:6px 8px;box-shadow:0 0 0 3px var(--bp),0 0 24px color-mix(in srgb,var(--bp) 70%,transparent)}
.dx-ib-pill a{display:flex;align-items:center;gap:7px;color:#fff;text-decoration:none;font-size:11.5px;font-weight:600;text-transform:uppercase;line-height:1.1;padding:4px 8px;max-width:150px;overflow-wrap:anywhere;min-width:0}.dx-ib-pill .nci{font-size:20px;flex:0 0 auto}.dx-ib-pill .wa .nci{color:#25D366}.dx-ib-pill .cl .nci{color:var(--ba)}
@media (max-width:767px){.dx-ib{padding:8px 0}.dx-ib .container{gap:8px}.dx-ib .l span,.dx-ib .r .t,.dx-ib .sep{display:none}.dx-ib .l{border:1px solid rgba(255,255,255,.4);border-radius:8px;padding:8px 12px}.dx-ib .r{flex:1}.dx-ib .r .da-btn{width:100%;justify-content:center}
 .dx-ib-pill{bottom:70px;right:10px}.dx-ib-pill a span{display:none}body:has(.dx-ib){padding-bottom:60px}}
@media print{.dx-ib,.dx-ib-pill{display:none}}`;}
(function(){const _bd=buildDoc;buildDoc=function(forExport){let h=_bd.apply(this,arguments);const used=state.sections.some(s=>!s.hidden&&NC_ESC_TYPES.test(s.type));if(forExport&&!used)return h;
  h=h.replace("</head>",`<style>${ncEscCSS()}</style></head>`);
  if(used&&state.sections.some(s=>!s.hidden&&s.type==="dx_plantabs")&&h.indexOf("document.querySelectorAll('[data-tabs]')")<0)h=h.replace(/<\/body>(?![\s\S]*<\/body>)/,`<script>${NC_WEB_JS}<\/script></body>`);
  return h;};})();

/* ===== Estilo «Escaparate» ===== */
LOOKS.escaparate={cat:"Retail y telco",name:"Escaparate",desc:"Bloques planos de color sobre gris claro, titulares muy negros, pestañas píldora, tarjetas con borde negro, mosaico de ventajas en colores y barra de contacto fija.",
  best:"Telco, distribuidores, retail, promos de precio",head:"Montserrat",body:"Montserrat",mono:"JetBrains Mono",hw:800,hwBrand:800,mh:1.04,sample:["#f3f3f3","var(--bp)","var(--ba)"]};
LOOK_ORDER.push("escaparate");if(!LOOK_CATS.includes("Retail y telco"))LOOK_CATS.push("Retail y telco");
if(typeof NC_VOICE_BY_LOOK!=="undefined")NC_VOICE_BY_LOOK.escaparate="cercano";
if(typeof NC_LOOK_CLEAN!=="undefined")NC_LOOK_CLEAN.push("escaparate");
if(typeof V4_AUTO_VAR!=="undefined"){if(V4_AUTO_VAR.trust)V4_AUTO_VAR.trust.escaparate="row";if(V4_AUTO_VAR.ben)V4_AUTO_VAR.ben.escaparate="cards";}
document.addEventListener("DOMContentLoaded",()=>{if(typeof FX_BY_LOOK!=="undefined")FX_BY_LOOK.escaparate="up";});
const ESC_CHEV=`url("data:image/svg+xml,${encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'><path d='m5 9 7 7 7-7'/></svg>")}")`;
LOOK_CSS.escaparate=o=>`
&{--lkp:#f3f3f3;--lkc:#fff;--visr:12px;--mkr:12px;background:var(--lkp)}
${lkS('sec')},& .dx-cov,& .dx-dv,& .dx-pt,& .dx-ct{background:var(--lkp)}& .da-sec.soft,& .db-sec.soft,& .dx-cov{background:#fff!important}
${lkS('h1')},${lkS('h2')}{font-weight:800!important;letter-spacing:-.015em}${lkS('h2')}{font-size:clamp(27px,2.9vw,40px)}
${lkS('mark')}{background:none!important;color:var(--ba)!important;-webkit-text-fill-color:currentColor;padding:0}
${lkS('kick')}{background:#000;color:#fff;border-radius:6px;padding:5px 9px;font-size:12px;font-weight:800;letter-spacing:0;text-transform:none;border:0}
${lkS('btn')}{border-radius:8px!important;font-weight:700!important;box-shadow:none!important}
& .da-btn.sec,& .db-btn.sec{background:#000!important;color:#fff!important;border-color:#000!important}
${lkS('card')},& .dx-tile,& .accordion-item{border-radius:var(--cardr,12px)!important;box-shadow:none!important}
& .da-plan{border:2px solid var(--bink)!important;background:#fff}& .da-plan.best{border-color:var(--ba)!important}& .da-plan .tag{background:#000;color:#fff;border-radius:5px}
& .da-ben,& .db-rev,& .dc-tile{background:#fff;border:0}
& .da-nav,& .db-nav,& .dc-nav{background:#fff!important;border-bottom:0;box-shadow:none}& .nc-navl a{color:#000;font-weight:700;font-size:15px}& .nc-navl a:first-child{color:var(--ba)}
& .da-call{background:#efefef;border-radius:0;padding:10px 26px;margin:-10px 0;align-self:stretch;display:flex;align-items:center;color:#000!important;text-decoration:none}
& .da-call small{display:block;color:var(--ba);font-weight:700;font-size:15px;text-align:right}& .da-call span{font:800 clamp(18px,2vw,30px)/1.05 var(--fhead);letter-spacing:-.01em}& .da-call .nci{display:none}
& .da-top{background:var(--ba)!important;color:#fff!important;font-size:15px}& .da-top b{color:#fff}
@media (prefers-reduced-motion:no-preference) and (min-width:768px){& .da-top{white-space:nowrap;overflow:hidden;text-align:left;animation:lkEscMq 22s linear infinite}@keyframes lkEscMq{from{text-indent:100%}to{text-indent:-100%}}}
& .da-hero{background:var(--lkp)!important}& .da-hero .da-card{background:#000;color:#fff;--bink:#fff;--bmuted:rgba(255,255,255,.8)}& .da-hero .da-card h2{color:var(--bp)}
& .accordion-item{border:0!important;margin-bottom:8px;overflow:hidden}& .accordion-button{font-weight:500!important;font-size:15.5px;background:#fff!important;color:#000!important;box-shadow:none!important}
& .accordion-button::after{background-image:none!important;background-color:var(--ba);-webkit-mask:${ESC_CHEV} center/contain no-repeat;mask:${ESC_CHEV} center/contain no-repeat}
& .dx-fc{background:#333}& .dx-fc .lgt{color:var(--bp)}& .dx-fc h3{color:#fff}& .dx-fc ul a{color:#fff;font-weight:700}& .dx-fc ul li:first-child a{color:var(--ba)}
& .dx-fc .ct a[href^="tel:"]{color:var(--ba);font:800 clamp(22px,2.4vw,32px)/1.1 var(--fhead)}& .dx-fc{padding-bottom:0}& .dx-fc .bt{background:#000;box-shadow:0 0 0 100vmax #000;clip-path:inset(0 -100vmax);border-top:0;padding:18px 0;margin-top:42px;justify-content:center;flex-direction:column;align-items:center;text-align:center}
& .dx-cov .da-card{border:0;background:#fff}& .dx-covf .form-control{border:1.5px solid #000;border-radius:6px}& .dx-covf .da-btn,& .dx-cov .da-go{background:var(--ba)!important;color:#fff!important;border-color:var(--ba)!important}
& .dx-tabs-n:not(.st-line){background:#fff;border-radius:999px;padding:4px;width:max-content;max-width:100%;margin-left:auto;margin-right:auto}& .dx-tabs-n:not(.st-line) button{border:0}& .dx-tabs-n button[aria-selected="true"]{background:#000;color:#fff}
& .da-sticky,& .db-sticky,& .dc-sticky{background:#000}`;

/* ===== Plantilla ===== */
(function(){const N="Cliente · Jazztel 2026 (distribuidor)";TEMPLATE_BRAND[N]="c_jazztel26";
  v4Tpl(N,{group:"Cliente",client:"Jazztel",look:"escaparate",sector:"Telco",dir:"A",canal:"form",desc:"Estructura de desarrollo.mijazztel.com con la marca Jazztel 2026 y el estilo Escaparate: hero promo con formulario lateral, tarifas por pestañas, dispositivos, extras de TV, cobertura, ventajas en mosaico, FAQ, pie y barra fija. Todo el copy, precios, logos y fotos son placeholders."},[
  {type:"da_nav",props:{logo:"{{LOGO}}",telLabel:"{{TEXTO_TELEFONO}}",links:"{{MENU_1}}>#tarifas|{{MENU_2}}>#tarifas|{{MENU_3}}>#tarifas|{{MENU_4}}>#tv|{{MENU_5}}>#moviles"}},
  {type:"da_topbar",props:{text:"{{PROMO_BARRA}}",bold:"{{PROMO_DESTACADO}}",ico:""}},
  {type:"dx_promohero"},{type:"dx_plantabs"},{type:"dx_devices"},{type:"dx_addons"},
  {type:"dx_coverage",props:{title:"{{TITULO_COBERTURA}}",sub:"{{TEXTO_COBERTURA}}",btn:"{{CTA_COBERTURA}}",note:""}},
  {type:"dx_colortiles"},
  {type:"da_faq",props:{title:"{{TITULO_FAQ}}",items:[1,2,3,4,5,6].map(i=>`{{PREGUNTA_${i}}}|{{RESPUESTA_${i}}}`).join("\n")}},
  {type:"dx_footcols",props:{logo:"{{LOGO}}",about:"{{TEXTO_BAJO_LOGO}}",cols:"{{TITULO_MENU}}|{{MENU_1}}>#tarifas,{{MENU_2}}>#tarifas,{{MENU_3}}>#tarifas,{{MENU_4}}>#tv,{{MENU_5}}>#moviles",contact:"si",company:"{{RAZON_SOCIAL}}",note:""}},
  {type:"dx_infobar"}]);})();

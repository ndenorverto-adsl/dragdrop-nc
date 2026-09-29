/* ---------- LIBRERÍA DE BLOQUES ---------- */
const LIB={
  /* Estructura */
  topbar:{label:"Barra de aviso",ico:"▔",cat:"Estructura",raw:true,
    def:()=>({text:"🎁 Oferta limitada: instalación gratis este mes",cta:"Aprovechar",href:"#form"}),
    fields:[{k:"text",l:"Texto"},{k:"cta",l:"CTA (vacío = sin botón)"},{k:"href",l:"Destino CTA"}],
    render:p=>`<div style="background:var(--bink);color:#fff" class="py-2"><div class="container d-flex flex-wrap justify-content-center align-items-center gap-2 small text-center">
      <span>${esc(p.text)}</span>${p.cta?`<a href="${esc(p.href||'#form')}" data-cta="topbar" class="fw-bold" style="color:var(--ba)">${esc(p.cta)} →</a>`:""}</div></div>`},
  navbar:{label:"Navbar",ico:"▭",cat:"Estructura",raw:true,
    def:()=>({logoimg:"",logo:"{{LOGO}}",cta:"Llamar ahora"}),
    fields:[{k:"logoimg",l:"Logo (imagen)",t:"image"},{k:"logo",l:"Logo (texto, si no hay imagen)"},{k:"cta",l:"CTA teléfono"}],
    render:p=>`<nav class="navbar sticky-top" style="background:#fff;border-bottom:1px solid var(--line)"><div class="container py-1">
      ${p.logoimg?`<a class="navbar-brand" href="#"><img src="${p.logoimg}" style="height:34px;object-fit:contain" alt="logo"></a>`:`<a class="navbar-brand fw-bold h-font" style="color:var(--bink)" href="#">${esc(p.logo)}</a>`}
      <a data-cta="call" href="${telHref()}" class="btn btn-brand ms-auto">📞 ${esc(p.cta)}</a></div></nav>`},
  footer:{label:"Footer",ico:"▁",cat:"Estructura",raw:true,
    def:()=>({company:"{{RAZON_SOCIAL}}",legal:"Aviso legal|Privacidad|Cookies"}),
    fields:[{k:"company",l:"Razón social"},{k:"legal",l:"Enlaces legales (|)"}],
    render:p=>`<footer class="py-4" style="background:#fff;border-top:1px solid var(--line)"><div class="container d-flex flex-wrap justify-content-between align-items-center gap-2 small" style="color:var(--bmuted)">
      <span>© ${new Date().getFullYear()} ${esc(p.company)}</span><span class="d-flex gap-3">${cells(p.legal).map(x=>`<a href="{{URL_LEGAL}}" style="color:var(--bmuted)">${esc(x)}</a>`).join("")}</span></div></footer>`},

  /* Hero */
  hero_split:{label:"Hero · imagen lateral",ico:"◧",cat:"Hero",styleDef:{pad:"L",bg:"soft"},
    def:()=>({eyebrow:"Filtración de agua",headline:"Agua filtrada, sin garrafas y sin obras",sub:"Instalación gratis y cuota sin permanencia. Te llamamos en 24 h.",cta:"Quiero que me llamen",cta2:"Llámanos ahora",image:"",focus:"center",t1:"Sin permanencia",t2:"Instalación gratis",t3:"+10.000 hogares",parts:[{k:"eyebrow",on:true},{k:"headline",on:true},{k:"sub",on:true},{k:"ctas",on:true},{k:"trust",on:true}]}),
    fields:[{k:"parts",l:"Elementos (orden y visibilidad)",t:"elements",parts:[["eyebrow","Eyebrow"],["headline","Titular"],["sub","Subtítulo"],["ctas","Botones"],["trust","Confianza"]]},{k:"eyebrow",l:"Eyebrow"},{k:"headline",l:"Titular"},{k:"sub",l:"Subtítulo",t:"ta"},{k:"cta",l:"CTA principal"},{k:"cta2",l:"CTA llamada"},{k:"image",l:"Imagen del hero",t:"image"},{k:"focus",l:"Foco de imagen (móvil)",t:"select",opts:[["center","Centro"],["top","Arriba"],["bottom","Abajo"],["left","Izquierda"],["right","Derecha"]]},{k:"t1",l:"Trust 1"},{k:"t2",l:"Trust 2"},{k:"t3",l:"Trust 3"}],
    render:p=>{const parts=arr(p.parts).length?arr(p.parts):[{k:"eyebrow",on:true},{k:"headline",on:true},{k:"sub",on:true},{k:"ctas",on:true},{k:"trust",on:true}];
      const P={eyebrow:()=>p.eyebrow?`<span class="badge-soft">${esc(p.eyebrow)}</span>`:"",headline:()=>`<h1 class="display-5 fw-bold h-font mt-3 mb-3" style="color:var(--headcol)">${esc(p.headline)}</h1>`,sub:()=>`<p class="lead mb-4" style="color:var(--txtmuted)">${esc(p.sub)}</p>`,ctas:()=>`<div class="d-flex flex-wrap gap-2 mb-2"><a href="#form" data-cta="form" class="btn btn-brand btn-lg">${esc(p.cta)}</a><a href="${telHref()}" data-cta="call" class="btn btn-ghost btn-lg">📞 ${esc(p.cta2)}</a></div>`,trust:()=>`<div class="d-flex flex-wrap gap-3 mt-3 small" style="color:var(--txtmuted)">${[p.t1,p.t2,p.t3].filter(Boolean).map(t=>`<span>✓ ${esc(t)}</span>`).join("")}</div>`};
      const left=parts.filter(x=>x.on!==false).map(x=>P[x.k]?P[x.k]():"").join("");
      return `<div class="row align-items-center g-4"><div class="col-lg-6">${left}</div><div class="col-lg-6"><div class="brandcard ratio ratio-4x3 overflow-hidden">${imgOrBox(p.image,"Imagen / mockup {{IMG_HERO}}","",p.focus)}</div></div></div>`}},
  hero_center:{label:"Hero · centrado",ico:"◨",cat:"Hero",styleDef:{align:"center",pad:"XL",bg:"ink"},
    def:()=>({eyebrow:"",headline:"La forma más simple de tener agua filtrada en casa",sub:"Sin obras, sin permanencia y con instalación gratuita.",cta:"Solicitar información",cta2:"Llamar",parts:[{k:"eyebrow",on:true},{k:"headline",on:true},{k:"sub",on:true},{k:"ctas",on:true}]}),
    fields:[{k:"parts",l:"Elementos (orden y visibilidad)",t:"elements",parts:[["eyebrow","Eyebrow"],["headline","Titular"],["sub","Subtítulo"],["ctas","Botones"]]},{k:"eyebrow",l:"Eyebrow"},{k:"headline",l:"Titular"},{k:"sub",l:"Subtítulo",t:"ta"},{k:"cta",l:"CTA principal"},{k:"cta2",l:"CTA llamada"}],
    render:p=>{const parts=arr(p.parts).length?arr(p.parts):[{k:"eyebrow",on:true},{k:"headline",on:true},{k:"sub",on:true},{k:"ctas",on:true}];
      const P={eyebrow:()=>p.eyebrow?`<span class="badge-soft">${esc(p.eyebrow)}</span>`:"",headline:()=>`<h1 class="display-4 fw-bold h-font mt-3 mb-3" style="color:var(--headcol)">${esc(p.headline)}</h1>`,sub:()=>`<p class="lead mb-4" style="color:var(--txtmuted)">${esc(p.sub)}</p>`,ctas:()=>`<div class="d-flex flex-wrap gap-2 justify-content-center"><a href="#form" data-cta="form" class="btn btn-brand btn-lg">${esc(p.cta)}</a><a href="${telHref()}" data-cta="call" class="btn btn-ghost btn-lg">📞 ${esc(p.cta2)}</a></div>`};
      return `<div style="max-width:760px;margin:0 auto">${parts.filter(x=>x.on!==false).map(x=>P[x.k]?P[x.k]():"").join("")}</div>`}},
  hero_form:{label:"Hero · con formulario",ico:"◫",cat:"Hero",styleDef:{pad:"L",bg:"soft"},
    def:()=>({eyebrow:"Te llamamos gratis",headline:"Deja tus datos y te llamamos en menos de 24 h",sub:"Sin compromiso. Un asesor resuelve tus dudas y te da precio.",cta:"Quiero que me llamen",consent:"Acepto la política de privacidad.",parts:[{k:"eyebrow",on:true},{k:"headline",on:true},{k:"sub",on:true}]}),
    fields:[{k:"parts",l:"Elementos texto (orden/visibilidad)",t:"elements",parts:[["eyebrow","Eyebrow"],["headline","Titular"],["sub","Subtítulo"]]},{k:"eyebrow",l:"Eyebrow"},{k:"headline",l:"Titular"},{k:"sub",l:"Subtítulo",t:"ta"},{k:"cta",l:"Botón del formulario"},{k:"consent",l:"Consentimiento"}],
    render:p=>{const parts=arr(p.parts).length?arr(p.parts):[{k:"eyebrow",on:true},{k:"headline",on:true},{k:"sub",on:true}];
      const P={eyebrow:()=>p.eyebrow?`<span class="badge-soft">${esc(p.eyebrow)}</span>`:"",headline:()=>`<h1 class="display-6 fw-bold h-font mt-3 mb-3" style="color:var(--headcol)">${esc(p.headline)}</h1>`,sub:()=>`<p class="lead" style="color:var(--txtmuted)">${esc(p.sub)}</p>`};
      const left=parts.filter(x=>x.on!==false).map(x=>P[x.k]?P[x.k]():"").join("");
      return `<div class="row align-items-center g-4"><div class="col-lg-6">${left}</div><div class="col-lg-6"><div class="brandcard p-4" style="background:#fff"><span id="form"></span><form data-callback action="${ph(state.settings.endpoint,'ENDPOINT_FORMULARIO')}" method="post" class="row g-2"><div class="col-12"><input required name="nombre" class="form-control form-control-lg" placeholder="Nombre"></div><div class="col-12"><input required name="telefono" type="tel" pattern="[0-9]{9}" title="9 dígitos" class="form-control form-control-lg" placeholder="Teléfono"></div><div class="col-12 form-check my-1"><input required class="form-check-input" type="checkbox" id="cn1"><label for="cn1" class="form-check-label small" style="color:var(--bmuted)">${esc(p.consent)}</label></div><div class="col-12"><button class="btn btn-brand btn-lg w-100" type="submit">${esc(p.cta)}</button></div></form></div></div></div>`}},

  /* Confianza */
  logos:{label:"Logos (subir)",ico:"❖",cat:"Confianza",styleDef:{bg:"white",pad:"S"},
    def:()=>({title:"Colaboramos con",logos:[]}),
    fields:[{k:"title",l:"Texto"},{k:"logos",l:"Logos (imágenes)",t:"images"}],
    render:p=>{const L=arr(p.logos);return `<div class="d-flex flex-wrap align-items-center justify-content-center gap-4">
      <span class="small" style="color:var(--txtmuted)">${esc(p.title)}</span>
      ${L.length?L.map(s=>`<img src="${s}" style="height:34px;max-width:130px;object-fit:contain" alt="">`).join(""):`<span style="color:var(--txtmuted)">Sube logos en el panel derecho →</span>`}</div>`}},
  stats:{label:"Métricas",ico:"№",cat:"Confianza",styleDef:{bg:"tint",align:"center"},
    def:()=>({items:"+10.000|hogares con agua filtrada\n24 h|tiempo medio de respuesta\n4,8/5|valoración de clientes"}),
    fields:[{k:"items",l:"Métricas: número|etiqueta",t:"ta"}],
    render:p=>`<div class="row g-4 text-center justify-content-center">${lines(p.items).map(l=>{const c=cells(l);return `<div class="col-6 col-md"><div class="display-4 stat-num h-font">${esc(c[0]||"")}</div><div class="small text-uppercase mt-1" style="color:var(--txtmuted);letter-spacing:.06em">${esc(c[1]||"")}</div></div>`}).join("")}</div>`},
  testimonials:{label:"Testimonios",ico:"❝",cat:"Confianza",styleDef:{bg:"soft"},
    def:()=>({title:"Lo que dicen nuestros clientes",items:"Instalación rapidísima y el agua sabe genial.|Marta, Valencia\nAdiós a cargar garrafas. Muy contentos.|Jorge, Sevilla"}),
    fields:[{k:"title",l:"Título"},{k:"items",l:"Testimonios: texto|autor",t:"ta"}],
    render:p=>`<div class="text-center mb-5"><h2 class="fw-bold h-font" style="color:var(--headcol)">${esc(p.title)}</h2><div class="sec-title-line"></div></div>
      <div class="row g-4">${lines(p.items).map(l=>{const c=cells(l);const au=(c[1]||"").trim();const ini=(au.split(/[ ,]+/).filter(Boolean).slice(0,2).map(w=>w[0]).join("")||"★").toUpperCase();return `<div class="col-md-6"><div class="brandcard h-100 p-4"><div class="quote-mark">“</div><div class="mb-3" style="color:var(--ba);font-size:15px;letter-spacing:2px">★★★★★</div><p class="mb-3" style="color:var(--bink);font-size:1.05rem;line-height:1.5">${esc(c[0]||"")}</p><div class="d-flex align-items-center gap-2"><span class="avatar-ini">${esc(ini)}</span><span class="small fw-semibold" style="color:var(--bmuted)">${esc(au)}</span></div></div></div>`}).join("")}</div>`},

  /* Contenido */
  features:{label:"Ventajas (cards)",ico:"▦",cat:"Contenido",
    def:()=>({title:"Por qué elegirnos",subtitle:"Todo lo que necesitas, sin complicaciones.",items:"💧|Agua siempre lista|Fría, del tiempo o con gas al instante.\n🔧|Mantenimiento incluido|Nos ocupamos de todo.\n💶|Sin sorpresas|Cuota fija, sin permanencia."}),
    fields:[{k:"title",l:"Título"},{k:"subtitle",l:"Subtítulo"},{k:"items",l:"Cards: icono|título|texto",t:"ta"}],
    render:p=>`<div class="text-center mb-5"><h2 class="fw-bold h-font mb-2" style="color:var(--headcol)">${esc(p.title)}</h2><p style="color:var(--txtmuted)">${esc(p.subtitle)}</p><div class="sec-title-line"></div></div>
      <div class="row g-4">${lines(p.items).map(l=>{const c=cells(l);return `<div class="col-md-4"><div class="brandcard h-100 p-4 p-md-5"><div class="ficon">${esc(c[0]||"")}</div><h3 class="h5 fw-bold h-font mb-2" style="color:var(--bink)">${esc(c[1]||"")}</h3><p class="mb-0" style="color:var(--bmuted)">${esc(c[2]||"")}</p></div></div>`}).join("")}</div>`},
  imagetext:{label:"Imagen + texto",ico:"◪",cat:"Contenido",
    def:()=>({image:"",focus:"center",pos:"left",title:"Instalación en menos de 72 h",text:"Un técnico va a tu casa, instala el equipo bajo el fregadero y te explica cómo usarlo. Sin obras.",bullets:"Sin coste de instalación\nSin permanencia\nMantenimiento incluido",cta:"Más información",parts:[{k:"title",on:true},{k:"text",on:true},{k:"bullets",on:true},{k:"cta",on:true}]}),
    fields:[{k:"parts",l:"Elementos texto (orden/visibilidad)",t:"elements",parts:[["title","Título"],["text","Texto"],["bullets","Bullets"],["cta","Botón"]]},{k:"image",l:"Imagen",t:"image"},{k:"focus",l:"Foco de imagen (móvil)",t:"select",opts:[["center","Centro"],["top","Arriba"],["bottom","Abajo"],["left","Izquierda"],["right","Derecha"]]},{k:"pos",l:"Posición imagen",t:"select",opts:[["left","Izquierda"],["right","Derecha"]]},{k:"title",l:"Título"},{k:"text",l:"Texto",t:"ta"},{k:"bullets",l:"Bullets (uno por línea)",t:"ta"},{k:"cta",l:"CTA (vacío = sin botón)"}],
    render:p=>{const img=`<div class="col-lg-6"><div class="brandcard ratio ratio-4x3 overflow-hidden">${imgOrBox(p.image,"Imagen {{IMG}}","",p.focus)}</div></div>`;
      const parts=arr(p.parts).length?arr(p.parts):[{k:"title",on:true},{k:"text",on:true},{k:"bullets",on:true},{k:"cta",on:true}];
      const P={title:()=>`<h2 class="fw-bold h-font mb-3" style="color:var(--headcol)">${esc(p.title)}</h2>`,text:()=>`<p style="color:var(--txtmuted)">${esc(p.text)}</p>`,bullets:()=>`<ul class="list-unstyled mt-3">${lines(p.bullets).map(b=>`<li class="mb-2 d-flex align-items-center gap-2" style="color:var(--txtmuted)"><span class="chk">✓</span> ${esc(b)}</li>`).join("")}</ul>`,cta:()=>p.cta?`<a href="#form" data-cta="form" class="btn btn-brand mt-2">${esc(p.cta)}</a>`:""};
      const txt=`<div class="col-lg-6">${parts.filter(x=>x.on!==false).map(x=>P[x.k]?P[x.k]():"").join("")}</div>`;
      return `<div class="row align-items-center g-4">${p.pos==="right"?txt+img:img+txt}</div>`}},
  steps:{label:"Cómo funciona",ico:"⑃",cat:"Contenido",styleDef:{bg:"soft"},
    def:()=>({title:"En 3 pasos",items:"Nos llamas o dejas tus datos|Te asesoramos sin compromiso.\nElegimos tu equipo|El que encaja con tu consumo.\nInstalamos gratis|En menos de 72 h."}),
    fields:[{k:"title",l:"Título"},{k:"items",l:"Pasos: título|texto",t:"ta"}],
    render:p=>`<div class="text-center mb-5"><h2 class="fw-bold h-font" style="color:var(--headcol)">${esc(p.title)}</h2><div class="sec-title-line"></div></div>
      <div class="row g-4">${lines(p.items).map((l,i)=>{const c=cells(l);return `<div class="col-md-4"><div class="brandcard h-100 p-4 d-flex gap-3 align-items-start"><div class="step-num">${i+1}</div><div><h3 class="h6 fw-bold h-font mb-1" style="color:var(--bink)">${esc(c[0]||"")}</h3><p class="mb-0 small" style="color:var(--bmuted)">${esc(c[1]||"")}</p></div></div></div>`}).join("")}</div>`},
  gallery:{label:"Galería de imágenes",ico:"▥",cat:"Contenido",
    def:()=>({title:"Galería",images:[]}),
    fields:[{k:"title",l:"Título"},{k:"images",l:"Imágenes",t:"images"}],
    render:p=>{const G=arr(p.images);return `<h2 class="fw-bold h-font text-center mb-4" style="color:var(--headcol)">${esc(p.title)}</h2>
      <div class="row g-3">${G.length?G.map(s=>`<div class="col-6 col-md-4"><div class="brandcard ratio ratio-1x1 overflow-hidden"><img src="${s}" style="width:100%;height:100%;object-fit:cover" alt=""></div></div>`).join(""):`<div class="col-12 text-center" style="color:var(--txtmuted)">Sube imágenes en el panel derecho →</div>`}</div>`}},
  pricing:{label:"Tarifas",ico:"$",cat:"Contenido",
    def:()=>({title:"Elige tu plan",plans:"Alquiler|19,90€/mes|Todo incluido · sin permanencia|Lo quiero\nLiberty|29,90€/mes|Equipo en propiedad a 12 meses|Lo quiero"}),
    fields:[{k:"title",l:"Título"},{k:"plans",l:"Planes: nombre|precio|detalle|CTA",t:"ta"}],
    render:p=>`<div class="text-center mb-5"><h2 class="fw-bold h-font" style="color:var(--headcol)">${esc(p.title)}</h2><div class="sec-title-line"></div></div>
      <div class="row g-4 justify-content-center pt-2">${lines(p.plans).map((l,i)=>{const c=cells(l);return `<div class="col-md-5"><div class="brandcard h-100 p-4 p-md-5 text-center ${i===1?'featured':''}"><h3 class="h5 fw-bold h-font" style="color:var(--bink)">${esc(c[0]||"")}</h3><div class="display-5 fw-bold h-font my-2" style="color:var(--bp)">${esc(c[1]||"")}</div><p class="d-inline-flex align-items-center gap-2" style="color:var(--bmuted)"><span class="chk">✓</span>${esc(c[2]||"")}</p><a href="#form" data-cta="form" class="btn btn-brand w-100 mt-2">${esc(c[3]||"Solicitar")}</a></div></div>`}).join("")}</div>`},
  faq:{label:"FAQ (acordeón)",ico:"?",cat:"Contenido",styleDef:{width:"narrow"},
    def:()=>({title:"Preguntas frecuentes",items:"¿Tiene permanencia?|No, puedes darte de baja cuando quieras.\n¿La instalación tiene coste?|No, es gratuita.\n¿Qué mantenimiento necesita?|Ninguno por tu parte."}),
    fields:[{k:"title",l:"Título"},{k:"items",l:"FAQ: pregunta|respuesta",t:"ta"}],
    render:p=>{const g="faq"+Math.random().toString(36).slice(2,7);return `<div class="text-center mb-5"><h2 class="fw-bold h-font" style="color:var(--headcol)">${esc(p.title)}</h2><div class="sec-title-line"></div></div>
      <div class="accordion" id="${g}">${lines(p.items).map((l,i)=>{const c=cells(l);const iid=g+i;return `<div class="accordion-item"><h3 class="accordion-header"><button class="accordion-button ${i?'collapsed':''} h-font fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#c${iid}">${esc(c[0]||"")}</button></h3><div id="c${iid}" class="accordion-collapse collapse ${i?'':'show'}" data-bs-parent="#${g}"><div class="accordion-body" style="color:var(--bmuted)">${esc(c[1]||"")}</div></div></div>`}).join("")}</div>`}},
  video:{label:"Vídeo (YouTube/Vimeo)",ico:"▶",cat:"Contenido",styleDef:{width:"wide",align:"center"},
    def:()=>({title:"Míralo en 60 segundos",url:"https://www.youtube.com/embed/VIDEO_ID"}),
    fields:[{k:"title",l:"Título"},{k:"url",l:"URL embed (…/embed/ID)"}],
    render:p=>`<h2 class="fw-bold h-font mb-4" style="color:var(--headcol)">${esc(p.title)}</h2>
      <div class="ratio ratio-16x9 brandcard overflow-hidden" style="max-width:820px;margin:0 auto"><iframe src="${esc(p.url)}" title="vídeo" allowfullscreen style="border:0"></iframe></div>`},
  richtext:{label:"Texto libre",ico:"¶",cat:"Contenido",styleDef:{width:"narrow"},
    def:()=>({title:"Sobre el servicio",body:"Escribe aquí un párrafo.\nCada línea crea un nuevo párrafo."}),
    fields:[{k:"title",l:"Título (vacío = sin título)"},{k:"body",l:"Texto (líneas = párrafos)",t:"ta"}],
    render:p=>`${p.title?`<h2 class="fw-bold h-font mb-3" style="color:var(--headcol)">${esc(p.title)}</h2>`:""}${lines(p.body).map(x=>`<p style="color:var(--txtmuted)">${esc(x)}</p>`).join("")}`},

  /* Conversión */
  form:{label:"Formulario callback",ico:"✉",cat:"Conversión",styleDef:{bg:"primary",width:"narrow"},
    def:()=>({title:"Te llamamos gratis",subtitle:"Déjanos tu número y te llamamos en menos de 24 h.",cta:"Quiero que me llamen",consent:"He leído y acepto la política de privacidad.",showPhone:"si",fields:[{label:"Nombre",name:"nombre",type:"text",required:"si",options:""},{label:"Teléfono",name:"telefono",type:"tel",required:"si",options:""}]}),
    fields:[{k:"title",l:"Título"},{k:"subtitle",l:"Subtítulo"},{k:"fields",l:"Campos del formulario",t:"repeater",addLabel:"Añadir campo",item:[{k:"label",l:"Etiqueta",def:"Campo"},{k:"name",l:"Name (sin espacios)",def:"campo"},{k:"type",l:"Tipo",t:"select",opts:[["text","Texto"],["tel","Teléfono"],["email","Email"],["textarea","Área de texto"],["select","Desplegable"],["checkbox","Casilla"]],def:"text"},{k:"options",l:"Opciones (coma, solo desplegable)",def:""},{k:"required",l:"Obligatorio",t:"select",opts:[["si","Sí"],["no","No"]],def:"si"}]},{k:"cta",l:"Texto del botón"},{k:"consent",l:"Consentimiento"},{k:"showPhone",l:"Mostrar “o llámanos”",t:"select",opts:[["si","Sí"],["no","No"]]}],
    render:p=>`<span id="form"></span><div class="brandcard p-4 p-md-5" style="background:#fff">
      <h2 class="fw-bold h-font text-center mb-1" style="color:var(--bink)">${esc(p.title)}</h2>
      <p class="text-center mb-4" style="color:var(--bmuted)">${esc(p.subtitle)}</p>
      <form data-callback action="${ph(state.settings.endpoint,'ENDPOINT_FORMULARIO')}" method="post" class="row g-2">
        ${arr(p.fields).map(formFieldHTML).join("")}
        <div class="col-12 form-check my-1"><input required class="form-check-input" type="checkbox" id="cn2"><label class="form-check-label small" for="cn2" style="color:var(--bmuted)">${esc(p.consent)}</label></div>
        <div class="col-12"><button class="btn btn-brand btn-lg w-100" type="submit">${esc(p.cta)}</button></div>
      </form>${(p.showPhone!=='no')?`<div class="text-center small mt-3" style="color:var(--bmuted)">o llámanos al <a href="${telHref()}" data-cta="call" style="color:var(--bp);font-weight:600">${telText()}</a></div>`:''}</div>`},
  ctaband:{label:"Banda CTA",ico:"▬",cat:"Conversión",styleDef:{bg:"white",align:"center",pad:"L"},
    def:()=>({headline:"¿Listo para dejar de cargar garrafas?",sub:"Te llamamos gratis y sin compromiso.",cta:"Que me llamen",parts:[{k:"headline",on:true},{k:"sub",on:true},{k:"ctas",on:true}]}),
    fields:[{k:"parts",l:"Elementos (orden/visibilidad)",t:"elements",parts:[["headline","Titular"],["sub","Subtítulo"],["ctas","Botones"]]},{k:"headline",l:"Titular"},{k:"sub",l:"Subtítulo"},{k:"cta",l:"Botón"}],
    render:p=>{const parts=arr(p.parts).length?arr(p.parts):[{k:"headline",on:true},{k:"sub",on:true},{k:"ctas",on:true}];
      const P={headline:()=>`<h2 class="fw-bold h-font mb-2" style="color:#fff;position:relative">${esc(p.headline)}</h2>`,sub:()=>p.sub?`<p class="mb-4" style="color:rgba(255,255,255,.9);position:relative">${esc(p.sub)}</p>`:"",ctas:()=>`<div class="position-relative"><a href="#form" data-cta="form" class="btn btn-lg me-2" style="background:#fff;color:var(--bp);border-radius:var(--btnr);font-weight:800;box-shadow:0 8px 20px rgba(0,0,0,.15)">${esc(p.cta)}</a><a href="${telHref()}" data-cta="call" class="btn btn-lg" style="color:#fff;border:2px solid rgba(255,255,255,.65);border-radius:var(--btnr);font-weight:700">📞 ${telText()}</a></div>`};
      const body=parts.filter(x=>x.on!==false).map(x=>P[x.k]?P[x.k]():"").join("");
      return `<div style="background:linear-gradient(135deg,var(--bp),var(--bp2));border-radius:calc(var(--cardr) + 6px);padding:56px 28px;box-shadow:0 24px 56px color-mix(in srgb,var(--bp) 32%,transparent);position:relative;overflow:hidden"><span style="position:absolute;top:-40px;right:-30px;width:160px;height:160px;border-radius:50%;background:rgba(255,255,255,.10)"></span>${body}</div>`}},
  stickycall:{label:"Barra fija móvil",ico:"⤓",cat:"Conversión",raw:true,
    def:()=>({call:"Llamar",wa:"WhatsApp"}),
    fields:[{k:"call",l:"Texto llamada"},{k:"wa",l:"Texto WhatsApp"}],
    render:p=>`<div class="d-md-none" style="position:fixed;left:0;right:0;bottom:0;z-index:1030;background:#fff;border-top:1px solid var(--line);padding:8px;display:flex;gap:8px">
      <a href="${telHref()}" data-cta="call" class="btn btn-brand flex-fill">📞 ${esc(p.call)}</a>
      <a href="${waHref()}" data-cta="whatsapp" target="_blank" rel="noopener" class="btn btn-ghost flex-fill">💬 ${esc(p.wa)}</a></div><div class="d-md-none" style="height:64px"></div>`},

  /* ==== Herramientas de conversión ==== */
  hero_video:{label:"Hero · vídeo de fondo",ico:"🎬",cat:"Hero",styleDef:{width:"full"},
    def:()=>({video:"https://cdn.coverr.co/videos/coverr-water-flowing-1080p.mp4",overlay:"55",headline:"Agua filtrada, directa de tu grifo",sub:"Sin garrafas, sin obras, sin permanencia.",cta:"Quiero que me llamen",cta2:"Llamar ahora"}),
    fields:[{k:"video",l:"URL del vídeo (MP4)"},{k:"overlay",l:"Oscurecido (0-90)"},{k:"headline",l:"Titular"},{k:"sub",l:"Subtítulo"},{k:"cta",l:"CTA principal"},{k:"cta2",l:"CTA llamada"}],
    render:p=>`<div style="position:relative;min-height:66vh;display:flex;align-items:center;overflow:hidden;border-radius:0">
      <video autoplay muted loop playsinline preload="metadata" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"><source src="${esc(p.video)}" type="video/mp4"></video>
      <div style="position:absolute;inset:0;background:rgba(0,0,0,${(parseInt(p.overlay)||55)/100})"></div>
      <div class="container text-center" style="position:relative;max-width:820px">
        <h1 class="display-4 fw-bold h-font mb-3" style="color:#fff">${esc(p.headline)}</h1>
        <p class="lead mb-4" style="color:#fff;opacity:.92">${esc(p.sub)}</p>
        <div class="d-flex gap-2 justify-content-center flex-wrap"><a href="#form" data-cta="form" class="btn btn-brand btn-lg">${esc(p.cta)}</a><a href="${telHref()}" data-cta="call" class="btn btn-lg" style="color:#fff;border:2px solid #fff;border-radius:var(--btnr)">📞 ${esc(p.cta2)}</a></div>
      </div></div>`},
  cal:{label:"Cita / agenda llamada",ico:"📅",cat:"Conversión",styleDef:{bg:"soft",width:"narrow"},
    def:()=>({title:"Reserva tu llamada",subtitle:"Elige día y hora y te llamamos gratis.",slots:"9:00, 10:00, 11:00, 12:00, 16:00, 17:00, 18:00",cta:"Confirmar cita",consent:"Acepto la política de privacidad."}),
    fields:[{k:"title",l:"Título"},{k:"subtitle",l:"Subtítulo"},{k:"slots",l:"Franjas horarias (coma)"},{k:"cta",l:"Botón"},{k:"consent",l:"Consentimiento"}],
    render:p=>`<div data-live data-cal class="brandcard p-4 p-md-5" style="background:#fff"><span id="form"></span>
      <h2 class="fw-bold h-font text-center mb-1" style="color:var(--bink)">${esc(p.title)}</h2>
      <p class="text-center mb-4" style="color:var(--bmuted)">${esc(p.subtitle)}</p>
      <div class="small fw-semibold mb-2" style="color:var(--bmuted)">Elige día</div>
      <div data-cal-days class="d-flex flex-wrap gap-2 mb-3"></div>
      <div class="small fw-semibold mb-2" style="color:var(--bmuted)">Elige hora</div>
      <select data-cal-slot class="form-select form-select-lg mb-3">${cells(p.slots).map(s=>`<option>${esc(s)}</option>`).join("")}</select>
      <form data-callback action="${ph(state.settings.endpoint,'ENDPOINT_FORMULARIO')}" method="post" class="row g-2">
        <input type="hidden" name="fecha" data-cal-hidday>
        <div class="col-12"><input required name="nombre" class="form-control form-control-lg" placeholder="Nombre"></div>
        <div class="col-12"><input required name="telefono" type="tel" pattern="[0-9]{9}" title="9 dígitos (teléfono español)" class="form-control form-control-lg" placeholder="Teléfono"></div>
        <div class="col-12 form-check my-1"><input required type="checkbox" class="form-check-input" id="cnc"><label class="form-check-label small" for="cnc" style="color:var(--bmuted)">${esc(p.consent)}</label></div>
        <div class="col-12"><button class="btn btn-brand btn-lg w-100" type="submit" data-cta="schedule">${esc(p.cta)}</button></div>
      </form></div>`},
  calc:{label:"Calculadora de ahorro",ico:"🧮",cat:"Conversión",styleDef:{bg:"tint",width:"narrow"},
    def:()=>({title:"Calcula cuánto ahorras",subtitle:"Introduce lo que pagas ahora al mes.",label:"¿Cuánto pagas al mes?",unit:"€/mes",pct:"30",cta:"Que me llamen para ahorrar",consent:"Acepto la política de privacidad."}),
    fields:[{k:"title",l:"Título"},{k:"subtitle",l:"Subtítulo"},{k:"label",l:"Etiqueta del input"},{k:"unit",l:"Unidad"},{k:"pct",l:"% de ahorro estimado"},{k:"cta",l:"Botón"},{k:"consent",l:"Consentimiento"}],
    render:p=>`<div data-live data-calc data-pct="${esc(p.pct||'30')}" class="brandcard p-4 p-md-5" style="background:#fff"><span id="form"></span>
      <h2 class="fw-bold h-font text-center mb-1" style="color:var(--bink)">${esc(p.title)}</h2>
      <p class="text-center mb-4" style="color:var(--bmuted)">${esc(p.subtitle)}</p>
      <label class="form-label small fw-semibold" style="color:var(--bmuted)">${esc(p.label)}</label>
      <div class="input-group input-group-lg mb-3"><input data-calc-input type="number" inputmode="decimal" class="form-control" placeholder="0"><span class="input-group-text">${esc(p.unit)}</span></div>
      <div class="d-flex justify-content-around text-center p-3 mb-3" style="background:var(--bsoft);border-radius:var(--cardr)">
        <div><div class="small" style="color:var(--bmuted)">Ahorro/mes</div><div class="h4 fw-bold mb-0" style="color:var(--bp)" data-calc-m>0 €</div></div>
        <div><div class="small" style="color:var(--bmuted)">Ahorro/año</div><div class="h4 fw-bold mb-0" style="color:var(--bp)" data-calc-y>0 €</div></div>
      </div>
      <form data-callback action="${ph(state.settings.endpoint,'ENDPOINT_FORMULARIO')}" method="post" class="row g-2">
        <div class="col-12"><input required name="nombre" class="form-control form-control-lg" placeholder="Nombre"></div>
        <div class="col-12"><input required name="telefono" type="tel" pattern="[0-9]{9}" title="9 dígitos (teléfono español)" class="form-control form-control-lg" placeholder="Teléfono"></div>
        <div class="col-12 form-check my-1"><input required type="checkbox" class="form-check-input" id="cnk"><label class="form-check-label small" for="cnk" style="color:var(--bmuted)">${esc(p.consent)}</label></div>
        <div class="col-12"><button class="btn btn-brand btn-lg w-100" type="submit" data-cta="calc">${esc(p.cta)}</button></div>
      </form></div>`},
  quiz:{label:"Multipaso + call-me-back",ico:"❓",cat:"Conversión",styleDef:{bg:"soft",width:"narrow"},
    def:()=>({title:"Encuentra tu tarifa en 3 pasos",questions:[{q:"¿Cuántas líneas necesitas?",options:"1, 2, 3 o más"},{q:"¿Cuántos datos usas?",options:"Pocos, Normales, Muchos"},{q:"¿Quieres fibra en casa?",options:"Sí, No"}],resultTitle:"¡Tenemos tu tarifa ideal!",resultText:"Déjanos tu número y te la contamos con el mejor precio.",cta:"Que me llamen",consent:"Acepto la política de privacidad."}),
    fields:[{k:"title",l:"Título"},{k:"questions",l:"Preguntas",t:"repeater",addLabel:"Añadir pregunta",item:[{k:"q",l:"Pregunta",def:"Pregunta"},{k:"options",l:"Opciones (coma)",def:"Sí, No"}]},{k:"resultTitle",l:"Título del resultado"},{k:"resultText",l:"Texto del resultado"},{k:"cta",l:"Botón final"},{k:"consent",l:"Consentimiento"}],
    render:p=>{const Q=arr(p.questions);return `<div data-live data-quiz class="brandcard p-4 p-md-5" style="background:#fff"><span id="form"></span>
      <h2 class="fw-bold h-font text-center mb-3" style="color:var(--bink)">${esc(p.title)}</h2>
      <div class="mb-4" style="height:6px;background:var(--bsoft);border-radius:50rem;overflow:hidden"><div data-quiz-bar style="height:100%;width:0;background:var(--bp);transition:width .3s"></div></div>
      ${Q.map((q,i)=>`<div data-step style="display:none">
        <div class="fw-semibold mb-3 text-center" style="color:var(--bink)">${esc(q.q||"")}</div>
        <div class="d-grid gap-2">${cells(q.options||"").map(o=>`<button type="button" class="btn btn-ghost" data-opt="${esc(o)}" data-q="q${i}">${esc(o)}</button>`).join("")}</div>
        ${i>0?`<button type="button" class="btn btn-sm w-100 mt-3" data-quiz-back style="color:var(--bmuted)">← Atrás</button>`:""}
      </div>`).join("")}
      <div data-step style="display:none">
        <div class="text-center mb-3"><div class="h5 fw-bold h-font" style="color:var(--bink)">${esc(p.resultTitle)}</div><p class="mb-0" style="color:var(--bmuted)">${esc(p.resultText)}</p></div>
        <form data-callback action="${ph(state.settings.endpoint,'ENDPOINT_FORMULARIO')}" method="post" class="row g-2">
          <div class="col-12"><input required name="nombre" class="form-control form-control-lg" placeholder="Nombre"></div>
          <div class="col-12"><input required name="telefono" type="tel" pattern="[0-9]{9}" title="9 dígitos (teléfono español)" class="form-control form-control-lg" placeholder="Teléfono"></div>
          <div class="col-12 form-check my-1"><input required type="checkbox" class="form-check-input" id="cnq"><label class="form-check-label small" for="cnq" style="color:var(--bmuted)">${esc(p.consent)}</label></div>
          <div class="col-12"><button class="btn btn-brand btn-lg w-100" type="submit" data-cta="quiz">${esc(p.cta)}</button></div>
        </form>
        <button type="button" class="btn btn-sm w-100 mt-2" data-quiz-back style="color:var(--bmuted)">← Atrás</button>
      </div></div>`}},

  countdown:{label:"Cuenta atrás (oferta)",ico:"⏳",cat:"Contenido",styleDef:{bg:"ink",align:"center"},
    def:()=>({title:"La oferta termina en",end:"2026-12-31 23:59",cta:"Aprovechar ahora"}),
    fields:[{k:"title",l:"Título"},{k:"end",l:"Fin (AAAA-MM-DD HH:MM)"},{k:"cta",l:"Botón"}],
    render:p=>`<div data-live data-countdown data-end="${esc(p.end||'')}">
      <h2 class="fw-bold h-font mb-4" style="color:var(--headcol)">${esc(p.title)}</h2>
      <div class="d-flex justify-content-center gap-3 mb-4">${["Días","Horas","Min","Seg"].map(l=>`<div style="min-width:68px"><div class="fw-bold h-font" style="font-size:2.4rem;line-height:1;color:var(--ba)" data-cd>00</div><div class="small text-uppercase mt-1" style="color:var(--txtmuted);letter-spacing:.08em">${l}</div></div>`).join("")}</div>
      <a href="#form" data-cta="form" class="btn btn-brand btn-lg">${esc(p.cta)}</a></div>`},
  comparison:{label:"Comparador (tabla)",ico:"⚖️",cat:"Contenido",styleDef:{width:"wide"},
    def:()=>({title:"Compara y decide",colUs:"Nosotros",colThem:"Otros",rows:[{feat:"Sin permanencia",us:"1",them:"0"},{feat:"Instalación gratis",us:"1",them:"0"},{feat:"Atención 24/7",us:"1",them:"1"},{feat:"Precio fijo garantizado",us:"1",them:"0"}]}),
    fields:[{k:"title",l:"Título"},{k:"colUs",l:"Columna A (tú)"},{k:"colThem",l:"Columna B"},{k:"rows",l:"Filas",t:"repeater",addLabel:"Añadir fila",item:[{k:"feat",l:"Característica",def:"Ventaja"},{k:"us",l:"A (1=sí, 0=no)",def:"1"},{k:"them",l:"B (1/0)",def:"0"}]}],
    render:p=>{const ck='<span style="color:#1eae52;font-size:20px">✓</span>';const x='<span style="color:#cbd0d8;font-size:20px">✕</span>';const R=arr(p.rows);return `<div class="text-center mb-4"><h2 class="fw-bold h-font" style="color:var(--headcol)">${esc(p.title)}</h2><div class="sec-title-line"></div></div>
      <div class="brandcard p-0 overflow-hidden" style="max-width:760px;margin:0 auto"><table class="table mb-0 align-middle"><thead><tr><th style="border-color:var(--line)"></th><th class="text-center fw-bold" style="border-color:var(--line);color:var(--bp)">${esc(p.colUs)}</th><th class="text-center" style="border-color:var(--line);color:var(--bmuted)">${esc(p.colThem)}</th></tr></thead><tbody>${R.map(r=>`<tr><td style="color:var(--bink)">${esc(r.feat||"")}</td><td class="text-center">${(r.us==="1")?ck:x}</td><td class="text-center">${(r.them==="1")?ck:x}</td></tr>`).join("")}</tbody></table></div>`}},
  trust:{label:"Sellos de confianza",ico:"🛡️",cat:"Confianza",styleDef:{bg:"white",pad:"S"},
    def:()=>({items:[{icon:"⭐",text:"4,8/5 en Google"},{icon:"🔒",text:"Datos 100% seguros"},{icon:"👥",text:"+10.000 clientes"},{icon:"✅",text:"Sin permanencia"}]}),
    fields:[{k:"items",l:"Sellos",t:"repeater",addLabel:"Añadir sello",item:[{k:"icon",l:"Icono (emoji)",def:"⭐"},{k:"text",l:"Texto",def:"Ventaja"}]}],
    render:p=>`<div class="d-flex flex-wrap justify-content-center gap-3">${arr(p.items).map(it=>`<div class="d-inline-flex align-items-center gap-2 px-3 py-2" style="background:#fff;border:1px solid var(--line);border-radius:50rem;box-shadow:0 4px 14px rgba(16,20,30,.05)"><span style="font-size:19px">${esc(it.icon||"")}</span><span class="fw-semibold" style="color:var(--bink)">${esc(it.text||"")}</span></div>`).join("")}</div>`},
  marquee:{label:"Logos en marquesina",ico:"🎞️",cat:"Confianza",styleDef:{bg:"white",pad:"S"},
    def:()=>({logos:[]}),
    fields:[{k:"logos",l:"Logos (imágenes)",t:"images"}],
    render:p=>{const L=arr(p.logos);const seq=L.concat(L);return `<div style="overflow:hidden">${L.length?`<div class="ncmarq">${seq.map(s=>`<img src="${s}" loading="lazy" alt="">`).join("")}</div>`:`<div class="text-center" style="color:var(--txtmuted)">Sube logos en el panel derecho →</div>`}</div>`}},

  security:{label:"Sellos de seguridad",ico:"🛡️",cat:"Confianza",
    def:()=>({title:"Tu seguridad, garantizada",items:[{icon:"🛡️",t:"Empresa homologada",d:"Autorizada por el Ministerio del Interior."},{icon:"🔒",t:"Datos cifrados",d:"Tu información viaja segura (SSL)."},{icon:"✅",t:"Garantía 30 días",d:"Sin permanencia ni letra pequeña."}]}),
    fields:[{k:"title",l:"Título"},{k:"items",l:"Sellos",t:"repeater",addLabel:"Añadir sello",item:[{k:"icon",l:"Icono",def:"🛡️"},{k:"t",l:"Título",def:"Sello"},{k:"d",l:"Texto",def:"Descripción"}]}],
    render:p=>`<div class="text-center mb-5"><h2 class="fw-bold h-font" style="color:var(--headcol)">${esc(p.title)}</h2><div class="sec-title-line"></div></div><div class="row g-4">${arr(p.items).map(c=>`<div class="col-md-4"><div class="brandcard h-100 p-4 text-center"><div class="ficon" style="margin-left:auto;margin-right:auto">${esc(c.icon||"")}</div><h3 class="h6 fw-bold h-font" style="color:var(--bink)">${esc(c.t||"")}</h3><p class="mb-0 small" style="color:var(--bmuted)">${esc(c.d||"")}</p></div></div>`).join("")}</div>`},
  logowall:{label:"Muro de logos",ico:"▤",cat:"Confianza",styleDef:{bg:"soft",pad:"M"},
    def:()=>({title:"Confían en nosotros",logos:[]}),
    fields:[{k:"title",l:"Título"},{k:"logos",l:"Logos (imágenes)",t:"images"}],
    render:p=>{const L=arr(p.logos);return `<div class="text-center mb-4"><span class="sec-kicker">${esc(p.title)}</span></div><div class="logowall row g-4 align-items-center justify-content-center">${L.length?L.map(s=>`<div class="col-4 col-md-2 text-center"><img src="${s}" loading="lazy" alt=""></div>`).join(""):`<div class="col-12 text-center" style="color:var(--txtmuted)">Sube logos en el panel derecho →</div>`}</div>`}},
  counters:{label:"Contadores (count-up)",ico:"№",cat:"Confianza",styleDef:{bg:"tint",align:"center"},
    def:()=>({items:[{num:"10000",suf:"+",label:"clientes"},{num:"24",suf:"h",label:"respuesta media"},{num:"98",suf:"%",label:"satisfacción"}]}),
    fields:[{k:"items",l:"Contadores",t:"repeater",addLabel:"Añadir",item:[{k:"num",l:"Número (sin puntos)",def:"100"},{k:"suf",l:"Sufijo",def:"+"},{k:"label",l:"Etiqueta",def:"Métrica"}]}],
    render:p=>`<div class="row g-4 text-center justify-content-center">${arr(p.items).map(c=>`<div class="col-6 col-md"><div class="display-4 stat-num h-font" data-countup="${esc(c.num||"0")}" data-suf="${esc(c.suf||"")}">0</div><div class="small text-uppercase mt-1" style="color:var(--txtmuted);letter-spacing:.06em">${esc(c.label||"")}</div></div>`).join("")}</div>`},

  /* ==== Módulos LITERALES de Apple (solo visibles con marca Apple) ==== */
  apple_nav:{label:"Apple · barra nav",ico:"",cat:"Apple",raw:true,brand:"apple",
    def:()=>({logo:"",links:"Store|Mac|iPhone|iPad|Watch|Soporte"}),
    fields:[{k:"logo",l:"Texto marca (vacío = manzana )"},{k:"links",l:"Enlaces (|)"}],
    render:p=>`<div style="position:sticky;top:0;z-index:1020;background:rgba(251,251,253,.82);-webkit-backdrop-filter:saturate(180%) blur(20px);backdrop-filter:saturate(180%) blur(20px);border-bottom:1px solid rgba(0,0,0,.06)">
      <div class="container d-flex align-items-center justify-content-between" style="height:44px;max-width:1024px">
        <span class="h-font" style="font-weight:600;color:#1d1d1f;font-size:18px">${p.logo?esc(p.logo):"&#63743;"}</span>
        <div class="d-none d-md-flex align-items-center" style="gap:30px">${cells(p.links).map(l=>`<a href="#" style="color:#1d1d1f;text-decoration:none;font-size:12px;opacity:.92">${esc(l)}</a>`).join("")}</div>
        <div class="d-flex align-items-center" style="gap:18px;font-size:15px;color:#1d1d1f"><a href="#" style="color:#1d1d1f;text-decoration:none">&#9906;</a><a href="${telHref()}" data-cta="call" style="color:#1d1d1f;text-decoration:none">&#128722;</a></div>
      </div></div>`},
  apple_hero:{label:"Apple · hero producto",ico:"",cat:"Apple",brand:"apple",styleDef:{align:"center",pad:"L",bg:"white",width:"wide"},
    def:()=>({eyebrow:"Nuevo",headline:"iPhone. Titán. Así de fuerte.",sub:"Diseñado para durar. Rediseñado para volar.",link1:"Más información",link2:"Comprar",image:""}),
    fields:[{k:"eyebrow",l:"Eyebrow"},{k:"headline",l:"Titular"},{k:"sub",l:"Subtítulo"},{k:"link1",l:"Enlace 1"},{k:"link2",l:"Enlace 2"},{k:"image",l:"Imagen de producto",t:"image"}],
    render:p=>`<div class="text-center" style="max-width:900px;margin:0 auto">
      ${p.eyebrow?`<div style="font-size:.95rem;font-weight:600;color:var(--txtmuted);margin-bottom:6px">${esc(p.eyebrow)}</div>`:""}
      <h1 class="display-4 fw-bold h-font mb-2" style="color:var(--headcol)">${esc(p.headline)}</h1>
      <p class="lead mb-3" style="color:var(--txtmuted)">${esc(p.sub)}</p>
      <div class="d-flex gap-4 justify-content-center mb-4">
        <a class="apple-link" href="#form" data-cta="form" style="color:#0071E3;text-decoration:none;font-size:17px">${esc(p.link1)} &rsaquo;</a>
        <a class="apple-link" href="${telHref()}" data-cta="call" style="color:#0071E3;text-decoration:none;font-size:17px">${esc(p.link2)} &rsaquo;</a>
      </div>
      <div class="ratio ratio-16x9" style="max-width:980px;margin:0 auto;border-radius:18px;overflow:hidden">${imgOrBox(p.image,"Imagen de producto {{IMG}}")}</div></div>`},
  apple_bento:{label:"Apple · bento grid",ico:"",cat:"Apple",brand:"apple",styleDef:{bg:"white",pad:"S",width:"wide"},
    def:()=>({tiles:[{name:"iPhone",sub:"Titán. Así de fuerte.",theme:"dark",link:"Comprar",img:""},{name:"Apple Watch",sub:"Un salto para tu salud.",theme:"light",link:"Más información",img:""},{name:"Mac",sub:"Potencia que vuela.",theme:"light",link:"Comprar",img:""},{name:"iPad",sub:"Tan versátil como tú.",theme:"dark",link:"Más información",img:""}]}),
    fields:[{k:"tiles",l:"Tiles",t:"repeater",addLabel:"Añadir tile",item:[{k:"name",l:"Nombre",def:"Producto"},{k:"sub",l:"Titular",def:"Titular corto"},{k:"theme",l:"Tema",t:"select",opts:[["light","Claro"],["dark","Oscuro"]],def:"light"},{k:"link",l:"Enlace",def:"Más información"},{k:"img",l:"Imagen",t:"image"}]}],
    render:p=>{const T=arr(p.tiles);return `<div class="row g-3">${T.map(c=>{const dark=(c.theme||"light")==="dark";return `<div class="col-md-6"><div style="border-radius:28px;overflow:hidden;text-align:center;padding:46px 20px 0;min-height:460px;display:flex;flex-direction:column;align-items:center;background:${dark?"#000":"#f5f5f7"};color:${dark?"#f5f5f7":"#1d1d1f"}">
      <div class="h-font" style="font-size:1.7rem;font-weight:600;letter-spacing:-.02em">${esc(c.name||"")}</div>
      <div style="font-size:1.05rem;margin-top:6px;max-width:440px">${esc(c.sub||"")}</div>
      <div class="mt-2"><a href="#form" data-cta="form" style="color:${dark?"#2997ff":"#0071E3"};text-decoration:none;font-size:15px">${esc(c.link||"Más información")} &rsaquo;</a></div>
      <div class="mt-auto pt-4" style="width:100%"><div class="ratio ratio-4x3" style="max-width:340px;margin:0 auto 0">${imgOrBox(c.img,"")}</div></div>
    </div></div>`}).join("")}</div>`}},
  apple_showcase:{label:"Apple · showcase oscuro",ico:"",cat:"Apple",brand:"apple",styleDef:{bg:"ink",align:"center",pad:"L",width:"wide"},
    def:()=>({eyebrow:"",headline:"Titán. Así de fuerte.",sub:"El iPhone más resistente que hemos creado.",link1:"Más información",link2:"Comprar",image:""}),
    fields:[{k:"eyebrow",l:"Eyebrow"},{k:"headline",l:"Titular"},{k:"sub",l:"Subtítulo"},{k:"link1",l:"Enlace 1"},{k:"link2",l:"Enlace 2"},{k:"image",l:"Imagen full-bleed",t:"image"}],
    render:p=>`<div class="text-center" style="max-width:900px;margin:0 auto">
      ${p.eyebrow?`<div style="font-size:.95rem;font-weight:600;color:#2997ff;margin-bottom:6px">${esc(p.eyebrow)}</div>`:""}
      <h2 class="display-4 fw-bold h-font mb-2" style="color:var(--headcol)">${esc(p.headline)}</h2>
      <p class="lead mb-3" style="color:var(--txtmuted)">${esc(p.sub)}</p>
      <div class="d-flex gap-4 justify-content-center mb-4">
        <a class="apple-link" href="#form" data-cta="form" style="color:#2997ff;text-decoration:none;font-size:17px">${esc(p.link1)} &rsaquo;</a>
        <a class="apple-link" href="${telHref()}" data-cta="call" style="color:#2997ff;text-decoration:none;font-size:17px">${esc(p.link2)} &rsaquo;</a>
      </div>
      <div class="ratio ratio-16x9" style="max-width:1000px;margin:0 auto;border-radius:18px;overflow:hidden">${imgOrBox(p.image,"Imagen full-bleed {{IMG}}")}</div></div>`},
  apple_footer:{label:"Apple · footer",ico:"",cat:"Apple",raw:true,brand:"apple",
    def:()=>({disclaimer:"La disponibilidad de funciones puede variar según el país o la región. Consulta las condiciones.",company:"{{RAZON_SOCIAL}}",cols:"Comprar y más:Store,Mac,iPhone,iPad|Cuenta:Gestiona tu ID,iCloud|Apple Store:Buscar una tienda,Genius Bar|Sobre Apple:Newsroom,Empleo,Contacto",legal:"Aviso legal|Privacidad|Cookies|Mapa del sitio"}),
    fields:[{k:"disclaimer",l:"Letra pequeña"},{k:"company",l:"Razón social"},{k:"cols",l:"Columnas: Título:enlace,enlace|…",t:"ta"},{k:"legal",l:"Enlaces legales (|)"}],
    render:p=>`<footer style="background:#f5f5f7;color:#6e6e73;font-size:12px"><div class="container py-4" style="max-width:1024px">
      <p style="border-bottom:1px solid #d2d2d7;padding-bottom:14px;margin-bottom:14px;line-height:1.6">${esc(p.disclaimer)}</p>
      <div class="row g-3">${lines(p.cols).map(col=>{const parts=col.split(":");const items=(parts[1]||"").split(",");return `<div class="col-6 col-md-3"><div style="color:#1d1d1f;font-weight:600;margin-bottom:8px">${esc(parts[0]||"")}</div>${items.map(i=>`<div style="margin-bottom:4px"><a href="#" style="color:#6e6e73;text-decoration:none">${esc(i.trim())}</a></div>`).join("")}</div>`}).join("")}</div>
      <div class="d-flex flex-wrap justify-content-between align-items-center pt-3 mt-3" style="border-top:1px solid #d2d2d7;gap:8px">
        <span>Copyright &copy; ${new Date().getFullYear()} ${esc(p.company)}. Todos los derechos reservados.</span>
        <span class="d-flex flex-wrap gap-3">${cells(p.legal).map(x=>`<a href="#" style="color:#6e6e73;text-decoration:none">${esc(x)}</a>`).join("")}</span>
      </div></div></footer>`},

  /* ===== MOVISTAR ===== */
  mov_nav:{label:"Movistar · nav",ico:"",cat:"Movistar",raw:true,brand:"movistar",
    def:()=>({logo:"Movistar",links:"Particulares|Empresas|Ayuda"}),
    fields:[{k:"logo",l:"Logo (texto)"},{k:"links",l:"Enlaces (|)"}],
    render:p=>`<nav style="background:#fff;border-bottom:1px solid #e0eef8"><div class="container d-flex align-items-center justify-content-between py-2">
      <span class="fw-bold h-font" style="color:#019DF4;font-size:22px">${esc(p.logo)}</span>
      <div class="d-none d-md-flex" style="gap:26px">${cells(p.links).map(l=>`<a href="#" style="color:#0B2739;text-decoration:none;font-size:14px">${esc(l)}</a>`).join("")}</div>
      <a href="${telHref()}" data-cta="call" class="btn btn-brand">Mi Movistar</a></div></nav>`},
  mov_hero:{label:"Movistar · hero oferta",ico:"",cat:"Movistar",brand:"movistar",styleDef:{bg:"soft",pad:"L"},
    def:()=>({eyebrow:"Fibra + Móvil",headline:"Todo Movistar, a un precio increíble",sub:"Fibra 1Gb y líneas móviles con los mejores contenidos.",price:"49,90",priceNote:"€/mes",cta:"Lo quiero",image:""}),
    fields:[{k:"eyebrow",l:"Eyebrow"},{k:"headline",l:"Titular"},{k:"sub",l:"Subtítulo"},{k:"price",l:"Precio"},{k:"priceNote",l:"Nota precio"},{k:"cta",l:"CTA"},{k:"image",l:"Imagen",t:"image"}],
    render:p=>`<div class="row align-items-center g-4"><div class="col-lg-6">
      <span class="badge-soft">${esc(p.eyebrow)}</span>
      <h1 class="display-5 fw-bold h-font mt-3 mb-3" style="color:var(--headcol)">${esc(p.headline)}</h1>
      <p class="lead mb-3" style="color:var(--txtmuted)">${esc(p.sub)}</p>
      <div class="d-flex align-items-end gap-2 mb-4"><span class="display-4 fw-bold h-font" style="color:#019DF4">${esc(p.price)}</span><span class="mb-2" style="color:var(--txtmuted)">${esc(p.priceNote)}</span></div>
      <a href="#form" data-cta="form" class="btn btn-brand btn-lg">${esc(p.cta)}</a></div>
      <div class="col-lg-6"><div class="brandcard overflow-hidden ratio ratio-4x3" style="background:#fff">${imgOrBox(p.image,"Producto {{IMG}}")}</div></div></div>`},
  mov_tarifas:{label:"Movistar · tarifas",ico:"",cat:"Movistar",brand:"movistar",styleDef:{bg:"white"},
    def:()=>({title:"Elige tu tarifa",plans:[{name:"Fibra 600Mb",price:"39,90",feat:"+ 1 línea 5G",cta:"Contratar"},{name:"Fibra 1Gb",price:"49,90",feat:"+ 2 líneas 5G · TV",cta:"Contratar"},{name:"Fibra 1Gb Total",price:"69,90",feat:"+ 4 líneas · TV Total",cta:"Contratar"}]}),
    fields:[{k:"title",l:"Título"},{k:"plans",l:"Tarifas",t:"repeater",addLabel:"Añadir tarifa",item:[{k:"name",l:"Nombre",def:"Tarifa"},{k:"price",l:"Precio",def:"00,00"},{k:"feat",l:"Detalle",def:"Detalle"},{k:"cta",l:"CTA",def:"Contratar"}]}],
    render:p=>`<h2 class="fw-bold h-font text-center mb-5" style="color:var(--headcol)">${esc(p.title)}</h2><div class="row g-4 justify-content-center">${arr(p.plans).map((c,i)=>`<div class="col-md-4"><div class="brandcard h-100 p-4 text-center ${i===1?'featured':''}"><div class="fw-bold h-font mb-2" style="color:#0B2739">${esc(c.name||"")}</div><div class="display-6 fw-bold h-font" style="color:#019DF4">${esc(c.price||"")}<span style="font-size:1rem;color:var(--bmuted)"> €/mes</span></div><p class="my-3" style="color:var(--bmuted)">${esc(c.feat||"")}</p><a href="#form" data-cta="form" class="btn btn-brand w-100">${esc(c.cta||"Contratar")}</a></div></div>`).join("")}</div>`},
  mov_footer:{label:"Movistar · footer",ico:"",cat:"Movistar",raw:true,brand:"movistar",
    def:()=>({company:"Telefónica de España",cols:"Particulares:Móvil,Fibra,TV|Ayuda:Contacto,Cobertura|Legal:Aviso legal,Privacidad"}),
    fields:[{k:"company",l:"Razón social"},{k:"cols",l:"Columnas: Título:enlace,enlace|…",t:"ta"}],
    render:p=>`<footer style="background:#0B2739;color:#b7c6d6"><div class="container py-5"><div class="row g-4">${lines(p.cols).map(col=>{const pr=col.split(":");const it=(pr[1]||"").split(",");return `<div class="col-6 col-md-4"><div class="fw-bold mb-2" style="color:#fff">${esc(pr[0]||"")}</div>${it.map(x=>`<div class="mb-1"><a href="#" style="color:#b7c6d6;text-decoration:none;font-size:14px">${esc(x.trim())}</a></div>`).join("")}</div>`}).join("")}</div><div class="pt-4 mt-4 small" style="border-top:1px solid rgba(255,255,255,.12)">© ${new Date().getFullYear()} ${esc(p.company)}</div></div></footer>`},

  /* ===== T-MOBILE ===== */
  tmo_nav:{label:"T-Mobile · nav",ico:"",cat:"T-Mobile",raw:true,brand:"tmobile",
    def:()=>({logo:"T&middot;Mobile",links:"Móvil|Internet|Ofertas"}),
    fields:[{k:"logo",l:"Logo (texto)"},{k:"links",l:"Enlaces (|)"}],
    render:p=>`<nav style="background:#1a1a1a"><div class="container d-flex align-items-center justify-content-between py-2">
      <span class="fw-bold h-font" style="color:#E20074;font-size:20px">${p.logo}</span>
      <div class="d-none d-md-flex" style="gap:26px">${cells(p.links).map(l=>`<a href="#" style="color:#fff;text-decoration:none;font-size:14px">${esc(l)}</a>`).join("")}</div>
      <a href="${telHref()}" data-cta="call" class="btn btn-brand">Llamar</a></div></nav>`},
  tmo_hero:{label:"T-Mobile · hero magenta",ico:"",cat:"T-Mobile",brand:"tmobile",styleDef:{bg:"primary",align:"center",pad:"XL"},
    def:()=>({eyebrow:"Un-carrier",headline:"Más datos. Más ventajas. Menos líos.",sub:"Cámbiate y llévate el móvil que quieras.",cta:"Ver ofertas",cta2:"Cómo funciona",image:""}),
    fields:[{k:"eyebrow",l:"Eyebrow"},{k:"headline",l:"Titular"},{k:"sub",l:"Subtítulo"},{k:"cta",l:"CTA"},{k:"cta2",l:"CTA 2"},{k:"image",l:"Imagen",t:"image"}],
    render:p=>`<div style="max-width:820px;margin:0 auto">
      ${p.eyebrow?`<div class="text-uppercase fw-bold mb-2" style="color:#fff;opacity:.85;letter-spacing:.12em;font-size:.85rem">${esc(p.eyebrow)}</div>`:""}
      <h1 class="display-3 fw-bold h-font mb-3" style="color:#fff;letter-spacing:-.02em">${esc(p.headline)}</h1>
      <p class="lead mb-4" style="color:#fff;opacity:.92">${esc(p.sub)}</p>
      <div class="d-flex gap-2 justify-content-center flex-wrap"><a href="#form" data-cta="form" class="btn btn-lg" style="background:#fff;color:#E20074;border-radius:999px;font-weight:800;padding:.62rem 1.8rem">${esc(p.cta)}</a><a href="${telHref()}" data-cta="call" class="btn btn-lg" style="background:transparent;color:#fff;border:2px solid #fff;border-radius:999px;font-weight:700">${esc(p.cta2)}</a></div></div>`},
  tmo_plans:{label:"T-Mobile · planes",ico:"",cat:"T-Mobile",brand:"tmobile",styleDef:{bg:"soft"},
    def:()=>({title:"Elige tu plan",plans:[{name:"Essentials",price:"20",feat:"Datos ilimitados",cta:"Elegir"},{name:"Magenta",price:"30",feat:"Ilimitado + 5G · HD",cta:"Elegir"},{name:"Magenta MAX",price:"40",feat:"Todo + hotspot 40GB",cta:"Elegir"}]}),
    fields:[{k:"title",l:"Título"},{k:"plans",l:"Planes",t:"repeater",addLabel:"Añadir plan",item:[{k:"name",l:"Nombre",def:"Plan"},{k:"price",l:"Precio",def:"00"},{k:"feat",l:"Detalle",def:"Detalle"},{k:"cta",l:"CTA",def:"Elegir"}]}],
    render:p=>`<h2 class="fw-bold h-font text-center mb-5" style="color:var(--headcol)">${esc(p.title)}</h2><div class="row g-4 justify-content-center">${arr(p.plans).map((c,i)=>`<div class="col-md-4"><div class="brandcard h-100 p-4 text-center ${i===1?'featured':''}"><div class="fw-bold h-font mb-2" style="color:#1a1a1a">${esc(c.name||"")}</div><div class="display-6 fw-bold h-font" style="color:#E20074">${esc(c.price||"")}<span style="font-size:1rem;color:var(--bmuted)"> €/mes</span></div><p class="my-3" style="color:var(--bmuted)">${esc(c.feat||"")}</p><a href="#form" data-cta="form" class="btn btn-brand w-100">${esc(c.cta||"Elegir")}</a></div></div>`).join("")}</div>`},
  tmo_footer:{label:"T-Mobile · footer",ico:"",cat:"T-Mobile",raw:true,brand:"tmobile",
    def:()=>({company:"T-Mobile",cols:"Móvil:Planes,Dispositivos|Ayuda:Cobertura,Contacto|Legal:Términos,Privacidad"}),
    fields:[{k:"company",l:"Razón social"},{k:"cols",l:"Columnas: Título:enlace,enlace|…",t:"ta"}],
    render:p=>`<footer style="background:#1a1a1a;color:#bdbdbd"><div class="container py-5"><div class="row g-4">${lines(p.cols).map(col=>{const pr=col.split(":");const it=(pr[1]||"").split(",");return `<div class="col-6 col-md-4"><div class="fw-bold mb-2" style="color:#E20074">${esc(pr[0]||"")}</div>${it.map(x=>`<div class="mb-1"><a href="#" style="color:#bdbdbd;text-decoration:none;font-size:14px">${esc(x.trim())}</a></div>`).join("")}</div>`}).join("")}</div><div class="pt-4 mt-4 small" style="border-top:1px solid rgba(255,255,255,.12)">© ${new Date().getFullYear()} ${esc(p.company)}</div></div></footer>`},

  /* ===== O2 ===== */
  o2_nav:{label:"O2 · nav",ico:"",cat:"O2",raw:true,brand:"o2",
    def:()=>({logo:"O2",links:"Móvil|Internet|Tienda"}),
    fields:[{k:"logo",l:"Logo (texto)"},{k:"links",l:"Enlaces (|)"}],
    render:p=>`<nav style="background:#fff;border-bottom:1px solid #d5ddf3"><div class="container d-flex align-items-center justify-content-between py-2">
      <span class="fw-bold h-font" style="color:#0019A5;font-size:22px">${esc(p.logo)}</span>
      <div class="d-none d-md-flex" style="gap:26px">${cells(p.links).map(l=>`<a href="#" style="color:#0A1F44;text-decoration:none;font-size:14px">${esc(l)}</a>`).join("")}</div>
      <a href="${telHref()}" data-cta="call" class="btn btn-brand">Mi O2</a></div></nav>`},
  o2_hero:{label:"O2 · hero burbujas",ico:"",cat:"O2",brand:"o2",styleDef:{bg:"primary",align:"center",pad:"XL"},
    def:()=>({headline:"Móvil e internet, sin sorpresas",sub:"Tarifas claras con la mejor cobertura.",cta:"Ver tarifas",cta2:"Llámanos"}),
    fields:[{k:"headline",l:"Titular"},{k:"sub",l:"Subtítulo"},{k:"cta",l:"CTA"},{k:"cta2",l:"CTA 2"}],
    render:p=>`<div style="position:relative;max-width:820px;margin:0 auto">
      <span style="position:absolute;top:-30px;left:-10px;width:70px;height:70px;border-radius:50%;background:rgba(38,217,195,.35)"></span>
      <span style="position:absolute;bottom:-20px;right:0;width:48px;height:48px;border-radius:50%;background:rgba(255,255,255,.18)"></span>
      <span style="position:absolute;top:20px;right:40px;width:26px;height:26px;border-radius:50%;background:rgba(38,217,195,.5)"></span>
      <h1 class="display-3 fw-bold h-font mb-3" style="color:#fff">${esc(p.headline)}</h1>
      <p class="lead mb-4" style="color:#fff;opacity:.92">${esc(p.sub)}</p>
      <div class="d-flex gap-2 justify-content-center flex-wrap"><a href="#form" data-cta="form" class="btn btn-lg" style="background:#26D9C3;color:#0A1F44;border-radius:999px;font-weight:800;padding:.62rem 1.8rem">${esc(p.cta)}</a><a href="${telHref()}" data-cta="call" class="btn btn-lg" style="background:transparent;color:#fff;border:2px solid #fff;border-radius:999px;font-weight:700">${esc(p.cta2)}</a></div></div>`},
  o2_tiles:{label:"O2 · tiles",ico:"",cat:"O2",brand:"o2",styleDef:{bg:"white"},
    def:()=>({title:"Todo lo que necesitas",tiles:[{name:"Fibra 1Gb",sub:"Internet ultrarrápido",cta:"Ver"},{name:"5G ilimitado",sub:"Datos sin límite",cta:"Ver"},{name:"O2 Recarga",sub:"Sin permanencia",cta:"Ver"}]}),
    fields:[{k:"title",l:"Título"},{k:"tiles",l:"Tiles",t:"repeater",addLabel:"Añadir tile",item:[{k:"name",l:"Nombre",def:"Producto"},{k:"sub",l:"Texto",def:"Texto"},{k:"cta",l:"CTA",def:"Ver"}]}],
    render:p=>`<h2 class="fw-bold h-font text-center mb-5" style="color:var(--headcol)">${esc(p.title)}</h2><div class="row g-4">${arr(p.tiles).map(c=>`<div class="col-md-4"><div class="brandcard h-100 p-4" style="background:#EAF0FF"><div class="mb-3" style="width:44px;height:44px;border-radius:50%;background:#26D9C3"></div><div class="fw-bold h-font h5" style="color:#0A1F44">${esc(c.name||"")}</div><p style="color:#566079">${esc(c.sub||"")}</p><a href="#form" data-cta="form" style="color:#0019A5;font-weight:700;text-decoration:none">${esc(c.cta||"Ver")} →</a></div></div>`).join("")}</div>`},
  o2_footer:{label:"O2 · footer",ico:"",cat:"O2",raw:true,brand:"o2",
    def:()=>({company:"Telefónica O2",cols:"Productos:Móvil,Fibra|Ayuda:Cobertura,Contacto|Legal:Aviso legal,Cookies"}),
    fields:[{k:"company",l:"Razón social"},{k:"cols",l:"Columnas: Título:enlace,enlace|…",t:"ta"}],
    render:p=>`<footer style="background:#0A1F44;color:#aeb9cf"><div class="container py-5"><div class="row g-4">${lines(p.cols).map(col=>{const pr=col.split(":");const it=(pr[1]||"").split(",");return `<div class="col-6 col-md-4"><div class="fw-bold mb-2" style="color:#26D9C3">${esc(pr[0]||"")}</div>${it.map(x=>`<div class="mb-1"><a href="#" style="color:#aeb9cf;text-decoration:none;font-size:14px">${esc(x.trim())}</a></div>`).join("")}</div>`}).join("")}</div><div class="pt-4 mt-4 small" style="border-top:1px solid rgba(255,255,255,.12)">© ${new Date().getFullYear()} ${esc(p.company)}</div></div></footer>`},

  /* ===== MYTRAFFIC (dark SaaS) ===== */
  mt_nav:{label:"MyTraffic · nav",ico:"",cat:"MyTraffic",raw:true,brand:"mytraffic",
    def:()=>({logo:"MyTraffic",links:"Producto|Soluciones|Clientes|Precios"}),
    fields:[{k:"logo",l:"Logo (texto)"},{k:"links",l:"Enlaces (|)"}],
    render:p=>`<nav style="background:rgba(11,11,18,.7);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);border-bottom:1px solid rgba(255,255,255,.08)"><div class="container d-flex align-items-center justify-content-between py-2">
      <span class="fw-bold h-font" style="color:#fff;font-size:19px">${esc(p.logo)}</span>
      <div class="d-none d-md-flex" style="gap:26px">${cells(p.links).map(l=>`<a href="#" style="color:#c9c9de;text-decoration:none;font-size:14px">${esc(l)}</a>`).join("")}</div>
      <a href="#form" data-cta="form" class="btn btn-brand">Pedir demo</a></div></nav>`},
  mt_hero:{label:"MyTraffic · hero gradiente",ico:"",cat:"MyTraffic",brand:"mytraffic",styleDef:{bg:"ink",align:"center",pad:"XL"},
    def:()=>({eyebrow:"Location intelligence",headline:"Decisiones de retail basadas en datos reales",sub:"Analiza el tráfico peatonal y el potencial de cualquier ubicación.",cta:"Pedir una demo",image:""}),
    fields:[{k:"eyebrow",l:"Eyebrow"},{k:"headline",l:"Titular"},{k:"sub",l:"Subtítulo"},{k:"cta",l:"CTA"},{k:"image",l:"Mockup dashboard",t:"image"}],
    render:p=>`<div style="max-width:860px;margin:0 auto">
      ${p.eyebrow?`<span class="badge-soft">${esc(p.eyebrow)}</span>`:""}
      <h1 class="display-4 fw-bold h-font mt-3 mb-3"><span class="mt-grad">${esc(p.headline)}</span></h1>
      <p class="lead mb-4" style="color:#b6b6c8">${esc(p.sub)}</p>
      <a href="#form" data-cta="form" class="btn btn-brand btn-lg">${esc(p.cta)}</a>
      <div class="mt-5 brandcard overflow-hidden ratio ratio-16x9" style="max-width:900px;margin-left:auto;margin-right:auto">${imgOrBox(p.image,"Mockup dashboard {{IMG}}")}</div></div>`},
  mt_kpi:{label:"MyTraffic · KPIs / casos",ico:"",cat:"MyTraffic",brand:"mytraffic",styleDef:{bg:"ink"},
    def:()=>({title:"Resultados que hablan",items:[{kpi:"+18%",label:"ventas en nuevas tiendas"},{kpi:"-30%",label:"tiempo de análisis"},{kpi:"3.000+",label:"ubicaciones evaluadas"}]}),
    fields:[{k:"title",l:"Título"},{k:"items",l:"KPIs",t:"repeater",addLabel:"Añadir KPI",item:[{k:"kpi",l:"Cifra",def:"+00%"},{k:"label",l:"Etiqueta",def:"Métrica"}]}],
    render:p=>`<h2 class="fw-bold h-font text-center mb-5" style="color:#fff">${esc(p.title)}</h2><div class="row g-4">${arr(p.items).map(c=>`<div class="col-md-4"><div class="brandcard h-100 p-4 text-center"><div class="display-5 fw-bold h-font"><span class="mt-grad">${esc(c.kpi||"")}</span></div><div style="color:#b6b6c8">${esc(c.label||"")}</div></div></div>`).join("")}</div>`},
  mt_footer:{label:"MyTraffic · footer",ico:"",cat:"MyTraffic",raw:true,brand:"mytraffic",
    def:()=>({company:"MyTraffic",cols:"Producto:Analytics,API|Empresa:Clientes,Empleo|Legal:Privacidad,Términos"}),
    fields:[{k:"company",l:"Razón social"},{k:"cols",l:"Columnas: Título:enlace,enlace|…",t:"ta"}],
    render:p=>`<footer style="background:#0B0B12;color:#8b8ba3;border-top:1px solid rgba(255,255,255,.08)"><div class="container py-5"><div class="row g-4">${lines(p.cols).map(col=>{const pr=col.split(":");const it=(pr[1]||"").split(",");return `<div class="col-6 col-md-4"><div class="fw-bold mb-2" style="color:#fff">${esc(pr[0]||"")}</div>${it.map(x=>`<div class="mb-1"><a href="#" style="color:#8b8ba3;text-decoration:none;font-size:14px">${esc(x.trim())}</a></div>`).join("")}</div>`}).join("")}</div><div class="pt-4 mt-4 small">© ${new Date().getFullYear()} ${esc(p.company)}</div></div></footer>`},

  /* ===== AB TASTY (SaaS violeta) ===== */
  at_nav:{label:"AB Tasty · nav",ico:"",cat:"AB Tasty",raw:true,brand:"abtasty",
    def:()=>({logo:"AB Tasty",links:"Plataforma|Soluciones|Recursos|Precios"}),
    fields:[{k:"logo",l:"Logo (texto)"},{k:"links",l:"Enlaces (|)"}],
    render:p=>`<nav style="background:#fff;border-bottom:1px solid #e6e3fb"><div class="container d-flex align-items-center justify-content-between py-2">
      <span class="fw-bold h-font" style="color:#4E3BFF;font-size:20px">${esc(p.logo)}</span>
      <div class="d-none d-md-flex" style="gap:26px">${cells(p.links).map(l=>`<a href="#" style="color:#141327;text-decoration:none;font-size:14px">${esc(l)}</a>`).join("")}</div>
      <a href="#form" data-cta="form" class="btn btn-brand">Pedir demo</a></div></nav>`},
  at_hero:{label:"AB Tasty · hero SaaS",ico:"",cat:"AB Tasty",brand:"abtasty",styleDef:{bg:"soft",pad:"L"},
    def:()=>({eyebrow:"Experimentación & Personalización",headline:"Convierte más con experiencias que sí funcionan",sub:"Testea, personaliza y optimiza cada punto de contacto.",cta:"Pedir una demo",cta2:"Ver plataforma",image:""}),
    fields:[{k:"eyebrow",l:"Eyebrow"},{k:"headline",l:"Titular"},{k:"sub",l:"Subtítulo"},{k:"cta",l:"CTA"},{k:"cta2",l:"CTA 2"},{k:"image",l:"Mockup",t:"image"}],
    render:p=>`<div class="row align-items-center g-4"><div class="col-lg-6">
      <span class="badge-soft">${esc(p.eyebrow)}</span>
      <h1 class="display-5 fw-bold h-font mt-3 mb-3"><span class="at-grad">${esc(p.headline)}</span></h1>
      <p class="lead mb-4" style="color:var(--txtmuted)">${esc(p.sub)}</p>
      <div class="d-flex gap-2 flex-wrap"><a href="#form" data-cta="form" class="btn btn-brand btn-lg">${esc(p.cta)}</a><a href="#form" data-cta="form" class="btn btn-ghost btn-lg">${esc(p.cta2)}</a></div></div>
      <div class="col-lg-6"><div class="brandcard overflow-hidden ratio ratio-4x3" style="background:#fff">${imgOrBox(p.image,"Mockup {{IMG}}")}</div></div></div>`},
  at_features:{label:"AB Tasty · features",ico:"",cat:"AB Tasty",brand:"abtasty",styleDef:{bg:"white"},
    def:()=>({title:"Todo en una plataforma",items:[{icon:"⚡",name:"A/B Testing",sub:"Testea cualquier cambio sin código."},{icon:"🎯",name:"Personalización",sub:"Segmenta y adapta la experiencia."},{icon:"📊",name:"Analítica",sub:"Decide con datos en tiempo real."}]}),
    fields:[{k:"title",l:"Título"},{k:"items",l:"Features",t:"repeater",addLabel:"Añadir feature",item:[{k:"icon",l:"Icono",def:"⚡"},{k:"name",l:"Nombre",def:"Feature"},{k:"sub",l:"Texto",def:"Texto"}]}],
    render:p=>`<h2 class="fw-bold h-font text-center mb-5" style="color:var(--headcol)">${esc(p.title)}</h2><div class="row g-4">${arr(p.items).map(c=>`<div class="col-md-4"><div class="brandcard h-100 p-4"><div class="d-inline-grid mb-3" style="width:46px;height:46px;place-items:center;border-radius:12px;background:#efeaff;font-size:20px">${esc(c.icon||"")}</div><div class="fw-bold h-font h5" style="color:#141327">${esc(c.name||"")}</div><p class="mb-0" style="color:var(--bmuted)">${esc(c.sub||"")}</p></div></div>`).join("")}</div>`},
  at_footer:{label:"AB Tasty · footer",ico:"",cat:"AB Tasty",raw:true,brand:"abtasty",
    def:()=>({company:"AB Tasty",cols:"Plataforma:Testing,Personalización|Empresa:Clientes,Empleo|Legal:Privacidad,Cookies"}),
    fields:[{k:"company",l:"Razón social"},{k:"cols",l:"Columnas: Título:enlace,enlace|…",t:"ta"}],
    render:p=>`<footer style="background:#141327;color:#a9a7c4"><div class="container py-5"><div class="row g-4">${lines(p.cols).map(col=>{const pr=col.split(":");const it=(pr[1]||"").split(",");return `<div class="col-6 col-md-4"><div class="fw-bold mb-2" style="color:#00D1B2">${esc(pr[0]||"")}</div>${it.map(x=>`<div class="mb-1"><a href="#" style="color:#a9a7c4;text-decoration:none;font-size:14px">${esc(x.trim())}</a></div>`).join("")}</div>`}).join("")}</div><div class="pt-4 mt-4 small" style="border-top:1px solid rgba(255,255,255,.12)">© ${new Date().getFullYear()} ${esc(p.company)}</div></div></footer>`},

  /* ===== JAZZTEL (bespoke — réplica de mijazztel.com) ===== */
  jz_nav:{label:"Jazztel · nav",ico:"",cat:"Jazztel",raw:true,brand:"c_jazztel",
    def:()=>({logo:"jazztel",links:"Fibra y móvil|Móvil|Fibra|Cobertura",cta:"Llamar al 91 924 80 83"}),
    fields:[{k:"logo",l:"Logo (texto)"},{k:"links",l:"Enlaces (|)"},{k:"cta",l:"CTA teléfono"}],
    render:p=>`<nav style="background:#fff;border-bottom:1px solid #dcecdc"><div class="container d-flex align-items-center justify-content-between py-2">
      <span class="fw-bold h-font" style="color:#08A800;font-size:24px;letter-spacing:-.5px">${esc(p.logo)}</span>
      <div class="d-none d-md-flex" style="gap:24px">${cells(p.links).map(l=>`<a href="#" style="color:#333;text-decoration:none;font-size:14px">${esc(l)}</a>`).join("")}</div>
      <a href="${telHref()}" data-cta="call" class="btn btn-brand" style="background:#DA1884;border-color:#DA1884">📞 ${esc(p.cta)}</a></div></nav>`},
  jz_hero:{label:"Jazztel · hero + callback",ico:"",cat:"Jazztel",brand:"c_jazztel",styleDef:{bg:"soft",pad:"L"},
    def:()=>({eyebrow:"Últimos días",headline:"Fibra 600Mb + 2 Líneas Móviles Ilimitadas 80GB",sub:"El mejor precio en fibra y móvil, sin permanencia.",price:"29,95",priceNote:"€/mes",cta:"Solicitar llamada",consent:"Acepto la política de privacidad."}),
    fields:[{k:"eyebrow",l:"Eyebrow"},{k:"headline",l:"Titular"},{k:"sub",l:"Subtítulo"},{k:"price",l:"Precio"},{k:"priceNote",l:"Nota precio"},{k:"cta",l:"Botón callback"},{k:"consent",l:"Consentimiento"}],
    render:p=>`<div class="row align-items-center g-4"><div class="col-lg-6">
      ${p.eyebrow?`<span class="badge-soft" style="background:#fde3f0;color:#DA1884;border:0">${esc(p.eyebrow)}</span>`:""}
      <h1 class="display-6 fw-bold h-font mt-3 mb-2" style="color:#1a1a1a">${esc(p.headline)}</h1>
      <p class="lead mb-3" style="color:#555">${esc(p.sub)}</p>
      <div class="d-flex align-items-end gap-2 mb-2"><span class="display-4 fw-bold h-font" style="color:#08A800">${esc(p.price)}</span><span class="mb-2" style="color:#777">${esc(p.priceNote)}</span></div>
      <div class="d-flex flex-wrap gap-3 small" style="color:#555"><span>✓ Sin permanencia</span><span>✓ Instalación gratis</span></div></div>
      <div class="col-lg-6"><div class="brandcard p-4" style="background:#fff;border-top:4px solid #08A800"><span id="form"></span>
        <div class="fw-bold h-font mb-3" style="color:#1a1a1a">Te llamamos gratis</div>
        <form data-callback action="${ph(state.settings.endpoint,'ENDPOINT_FORMULARIO')}" method="post" class="row g-2">
          <div class="col-12"><input required name="nombre" class="form-control form-control-lg" placeholder="Nombre"></div>
          <div class="col-12"><input required name="telefono" type="tel" pattern="[0-9]{9}" title="9 dígitos" class="form-control form-control-lg" placeholder="Teléfono"></div>
          <div class="col-12 form-check my-1"><input required class="form-check-input" type="checkbox" id="jzc"><label for="jzc" class="form-check-label small" style="color:#777">${esc(p.consent)}</label></div>
          <div class="col-12"><button class="btn btn-brand btn-lg w-100" type="submit">${esc(p.cta)}</button></div>
        </form></div></div></div>`},
  jz_ventajas:{label:"Jazztel · ventajas",ico:"",cat:"Jazztel",brand:"c_jazztel",styleDef:{bg:"white"},
    def:()=>({title:"Ventajas de tu tarifa",items:"🌐|INTERNET|Fibra simétrica de 600Mb para toda la casa.\n💶|AHORRO GARANTIZADO|El mejor precio, sin subidas sorpresa.\n📱|MÓVIL|2 líneas con datos ilimitados a máxima velocidad."}),
    fields:[{k:"title",l:"Título"},{k:"items",l:"Cards: icono|título|texto",t:"ta"}],
    render:p=>`<div class="text-center mb-5"><h2 class="fw-bold h-font" style="color:#1a1a1a">${esc(p.title)}</h2><div class="sec-title-line" style="background:linear-gradient(90deg,#08A800,#DA1884)"></div></div>
      <div class="row g-4">${lines(p.items).map(l=>{const c=cells(l);return `<div class="col-md-4"><div class="brandcard h-100 p-4 text-center"><div class="ficon" style="margin:0 auto 14px;background:#eafbe8;border-color:#cdeecb;color:#08A800">${esc(c[0]||"")}</div><h3 class="h6 fw-bold h-font" style="color:#08A800;letter-spacing:.02em">${esc(c[1]||"")}</h3><p class="mb-0 small" style="color:#666">${esc(c[2]||"")}</p></div></div>`}).join("")}</div>`},
  jz_tarifas:{label:"Jazztel · tarifas destacadas",ico:"",cat:"Jazztel",brand:"c_jazztel",styleDef:{bg:"soft"},
    def:()=>({title:"Otras tarifas destacadas",plans:[{name:"Fibra 300Mb + Móvil",price:"24,95",feat:"1 línea · 40GB",cta:"Solicitar información"},{name:"Fibra 600Mb + 2 Móviles",price:"29,95",feat:"2 líneas ilimitadas · 80GB",cta:"Solicitar información"},{name:"Fibra 1Gb + 3 Móviles",price:"39,95",feat:"3 líneas ilimitadas · TV",cta:"Solicitar información"}]}),
    fields:[{k:"title",l:"Título"},{k:"plans",l:"Tarifas",t:"repeater",addLabel:"Añadir tarifa",item:[{k:"name",l:"Nombre",def:"Tarifa"},{k:"price",l:"Precio",def:"00,00"},{k:"feat",l:"Detalle",def:"Detalle"},{k:"cta",l:"CTA",def:"Solicitar información"}]}],
    render:p=>`<div class="text-center mb-5"><h2 class="fw-bold h-font" style="color:#1a1a1a">${esc(p.title)}</h2><div class="sec-title-line" style="background:linear-gradient(90deg,#08A800,#DA1884)"></div></div>
      <div class="row g-4 justify-content-center pt-2">${arr(p.plans).map((c,i)=>`<div class="col-md-4"><div class="brandcard h-100 p-4 text-center ${i===1?'featured':''}"><h3 class="h6 fw-bold h-font" style="color:#1a1a1a">${esc(c.name||"")}</h3><div class="display-6 fw-bold h-font my-2" style="color:#08A800">${esc(c.price||"")}<span style="font-size:1rem;color:#888"> €/mes</span></div><p class="d-inline-flex align-items-center gap-2" style="color:#666"><span class="chk" style="background:#eafbe8;color:#08A800">✓</span>${esc(c.feat||"")}</p><a href="#form" data-cta="form" class="btn btn-brand w-100 mt-2">${esc(c.cta||"Solicitar")}</a></div></div>`).join("")}</div>`},
  jz_cobertura:{label:"Jazztel · comprobar cobertura",ico:"",cat:"Jazztel",brand:"c_jazztel",styleDef:{bg:"white",width:"narrow",align:"center"},
    def:()=>({title:"Comprueba tu cobertura de fibra",sub:"Introduce tu dirección y comprobamos si tienes fibra Jazztel.",cta:"Comprobar cobertura"}),
    fields:[{k:"title",l:"Título"},{k:"sub",l:"Subtítulo"},{k:"cta",l:"Botón"}],
    render:p=>`<h2 class="fw-bold h-font mb-2" style="color:#1a1a1a">${esc(p.title)}</h2><p class="mb-4" style="color:#666">${esc(p.sub)}</p>
      <div class="input-group input-group-lg" style="max-width:520px;margin:0 auto"><input class="form-control" placeholder="Calle, número, ciudad…"><a href="#form" data-cta="form" class="btn btn-brand" style="background:#DA1884;border-color:#DA1884">${esc(p.cta)}</a></div>`},
  jz_footer:{label:"Jazztel · footer",ico:"",cat:"Jazztel",raw:true,brand:"c_jazztel",
    def:()=>({company:"Jazztel",cols:"Fibra y móvil:Tarifas,Cobertura,Móvil|Ayuda:Área cliente,Contacto|Legal:Aviso legal,Privacidad,Cookies"}),
    fields:[{k:"company",l:"Razón social"},{k:"cols",l:"Columnas: Título:enlace,enlace|…",t:"ta"}],
    render:p=>`<footer style="background:#123312;color:#b7d6b7"><div class="container py-5"><div class="row g-4">${lines(p.cols).map(col=>{const pr=col.split(":");const it=(pr[1]||"").split(",");return `<div class="col-6 col-md-4"><div class="fw-bold mb-2" style="color:#fff">${esc(pr[0]||"")}</div>${it.map(x=>`<div class="mb-1"><a href="#" style="color:#b7d6b7;text-decoration:none;font-size:14px">${esc(x.trim())}</a></div>`).join("")}</div>`}).join("")}</div><div class="pt-4 mt-4 small" style="border-top:1px solid rgba(255,255,255,.14)">© ${new Date().getFullYear()} ${esc(p.company)}</div></div></footer>`},

  /* ===== KIT TELCO (tokenizado — microsites NC, se usa vía plantillas de cliente) ===== */
  tel_nav:{label:"Telco · nav",ico:"",cat:"Telco",raw:true,
    def:()=>({logo:"Marca",links:"Fibra y móvil|Móvil|Fibra|Cobertura",cta:"Llámanos"}),
    fields:[{k:"logo",l:"Logo"},{k:"links",l:"Enlaces (|)"},{k:"cta",l:"CTA teléfono"}],
    render:p=>`<nav style="background:#fff;border-bottom:1px solid var(--line)"><div class="container d-flex align-items-center justify-content-between py-2">
      <span class="fw-bold h-font" style="color:var(--bp);font-size:24px;letter-spacing:-.5px">${esc(p.logo)}</span>
      <div class="d-none d-md-flex" style="gap:22px">${cells(p.links).map(l=>`<a href="#" style="color:var(--bink);text-decoration:none;font-size:14px">${esc(l)}</a>`).join("")}</div>
      <a href="${telHref()}" data-cta="call" class="btn btn-brand" style="background:var(--ba);border-color:var(--ba)">📞 ${esc(p.cta)}</a></div></nav>`},
  tel_hero:{label:"Telco · hero + callback",ico:"",cat:"Telco",styleDef:{bg:"soft",pad:"L"},
    def:()=>({eyebrow:"Oferta",headline:"Fibra + Móvil al mejor precio",sub:"Sin permanencia e instalación gratis.",price:"29,90",priceNote:"€/mes",cta:"Solicitar información",consent:"Acepto la política de privacidad."}),
    fields:[{k:"eyebrow",l:"Eyebrow"},{k:"headline",l:"Titular"},{k:"sub",l:"Subtítulo"},{k:"price",l:"Precio"},{k:"priceNote",l:"Nota precio"},{k:"cta",l:"Botón callback"},{k:"consent",l:"Consentimiento"}],
    render:p=>`<div class="row align-items-center g-4"><div class="col-lg-6">
      ${p.eyebrow?`<span class="badge-soft">${esc(p.eyebrow)}</span>`:""}
      <h1 class="display-6 fw-bold h-font mt-3 mb-2" style="color:var(--headcol)">${esc(p.headline)}</h1>
      <p class="lead mb-3" style="color:var(--txtmuted)">${esc(p.sub)}</p>
      <div class="d-flex align-items-end gap-2 mb-2"><span class="display-4 fw-bold h-font" style="color:var(--bp)">${esc(p.price)}</span><span class="mb-2" style="color:var(--txtmuted)">${esc(p.priceNote)}</span></div>
      <div class="d-flex flex-wrap gap-3 small" style="color:var(--txtmuted)"><span>✓ Sin permanencia</span><span>✓ Instalación gratis</span></div></div>
      <div class="col-lg-6"><div class="brandcard p-4" style="background:#fff;border-top:4px solid var(--bp)"><span id="form"></span>
        <div class="fw-bold h-font mb-3" style="color:var(--bink)">Te llamamos gratis</div>
        <form data-callback action="${ph(state.settings.endpoint,'ENDPOINT_FORMULARIO')}" method="post" class="row g-2">
          <div class="col-12"><input required name="nombre" class="form-control form-control-lg" placeholder="Nombre"></div>
          <div class="col-12"><input required name="telefono" type="tel" pattern="[0-9]{9}" title="9 dígitos" class="form-control form-control-lg" placeholder="Teléfono"></div>
          <div class="col-12 form-check my-1"><input required class="form-check-input" type="checkbox" id="tlc"><label for="tlc" class="form-check-label small" style="color:var(--bmuted)">${esc(p.consent)}</label></div>
          <div class="col-12"><button class="btn btn-brand btn-lg w-100" type="submit">${esc(p.cta)}</button></div>
        </form></div></div></div>`},
  tel_ventajas:{label:"Telco · ventajas",ico:"",cat:"Telco",styleDef:{bg:"white"},
    def:()=>({title:"Sobran motivos para confiar",items:"🌐|Rapidez|Fibra simétrica para toda la casa.\n🎁|Instalación gratis|Sin coste de alta ni router.\n📶|Cobertura 5G|Datos ilimitados a máxima velocidad."}),
    fields:[{k:"title",l:"Título"},{k:"items",l:"Cards: icono|título|texto",t:"ta"}],
    render:p=>`<div class="text-center mb-5"><h2 class="fw-bold h-font" style="color:var(--headcol)">${esc(p.title)}</h2><div class="sec-title-line"></div></div>
      <div class="row g-4">${lines(p.items).map(l=>{const c=cells(l);return `<div class="col-md-4"><div class="brandcard h-100 p-4 text-center"><div class="ficon" style="margin:0 auto 14px">${esc(c[0]||"")}</div><h3 class="h6 fw-bold h-font" style="color:var(--bp);letter-spacing:.02em">${esc(c[1]||"")}</h3><p class="mb-0 small" style="color:var(--bmuted)">${esc(c[2]||"")}</p></div></div>`}).join("")}</div>`},
  tel_tarifas:{label:"Telco · tarifas destacadas",ico:"",cat:"Telco",styleDef:{bg:"soft"},
    def:()=>({title:"Otras tarifas destacadas",plans:[{name:"Fibra 300Mb + Móvil",price:"24,90",feat:"1 línea",cta:"Solicitar información"},{name:"Fibra 600Mb + 2 Móviles",price:"29,90",feat:"2 líneas ilimitadas",cta:"Solicitar información"},{name:"Fibra 1Gb + 3 Móviles",price:"39,90",feat:"3 líneas · TV",cta:"Solicitar información"}]}),
    fields:[{k:"title",l:"Título"},{k:"plans",l:"Tarifas",t:"repeater",addLabel:"Añadir tarifa",item:[{k:"name",l:"Nombre",def:"Tarifa"},{k:"price",l:"Precio",def:"00,00"},{k:"feat",l:"Detalle",def:"Detalle"},{k:"cta",l:"CTA",def:"Solicitar información"}]}],
    render:p=>`<div class="text-center mb-5"><h2 class="fw-bold h-font" style="color:var(--headcol)">${esc(p.title)}</h2><div class="sec-title-line"></div></div>
      <div class="row g-4 justify-content-center pt-2">${arr(p.plans).map((c,i)=>`<div class="col-md-4"><div class="brandcard h-100 p-4 text-center ${i===1?'featured':''}"><h3 class="h6 fw-bold h-font" style="color:var(--bink)">${esc(c.name||"")}</h3><div class="display-6 fw-bold h-font my-2" style="color:var(--bp)">${esc(c.price||"")}<span style="font-size:1rem;color:var(--bmuted)"> €/mes</span></div><p class="d-inline-flex align-items-center gap-2" style="color:var(--bmuted)"><span class="chk">✓</span>${esc(c.feat||"")}</p><a href="#form" data-cta="form" class="btn btn-brand w-100 mt-2">${esc(c.cta||"Solicitar")}</a></div></div>`).join("")}</div>`},
  tel_cobertura:{label:"Telco · comprobar cobertura",ico:"",cat:"Telco",styleDef:{bg:"white",width:"narrow",align:"center"},
    def:()=>({title:"Comprueba tu cobertura de fibra",sub:"Introduce tu dirección y comprobamos si tienes fibra.",cta:"Comprobar cobertura"}),
    fields:[{k:"title",l:"Título"},{k:"sub",l:"Subtítulo"},{k:"cta",l:"Botón"}],
    render:p=>`<h2 class="fw-bold h-font mb-2" style="color:var(--headcol)">${esc(p.title)}</h2><p class="mb-4" style="color:var(--txtmuted)">${esc(p.sub)}</p>
      <div class="input-group input-group-lg" style="max-width:520px;margin:0 auto"><input class="form-control" placeholder="Calle, número, ciudad…"><a href="#form" data-cta="form" class="btn btn-brand" style="background:var(--ba);border-color:var(--ba)">${esc(p.cta)}</a></div>`},
  tel_footer:{label:"Telco · footer",ico:"",cat:"Telco",raw:true,
    def:()=>({company:"Marca",cols:"Fibra y móvil:Tarifas,Cobertura,Móvil|Ayuda:Área cliente,Contacto|Legal:Aviso legal,Privacidad,Cookies"}),
    fields:[{k:"company",l:"Razón social"},{k:"cols",l:"Columnas: Título:enlace,enlace|…",t:"ta"}],
    render:p=>`<footer style="background:var(--bink);color:rgba(255,255,255,.72)"><div class="container py-5"><div class="row g-4">${lines(p.cols).map(col=>{const pr=col.split(":");const it=(pr[1]||"").split(",");return `<div class="col-6 col-md-4"><div class="fw-bold mb-2" style="color:#fff">${esc(pr[0]||"")}</div>${it.map(x=>`<div class="mb-1"><a href="#" style="color:rgba(255,255,255,.72);text-decoration:none;font-size:14px">${esc(x.trim())}</a></div>`).join("")}</div>`}).join("")}</div><div class="pt-4 mt-4 small" style="border-top:1px solid rgba(255,255,255,.14)">© ${new Date().getFullYear()} ${esc(p.company)}</div></div></footer>`},

  /* ===== KIT ALARMAS (tokenizado — clientes de seguridad) ===== */
  al_nav:{label:"Alarmas · nav",ico:"",cat:"Alarmas",raw:true,
    def:()=>({logo:"Marca",cta:"Llamar gratis",wa:"WhatsApp"}),
    fields:[{k:"logo",l:"Logo"},{k:"cta",l:"CTA teléfono"},{k:"wa",l:"CTA WhatsApp"}],
    render:p=>`<nav style="background:#fff;border-bottom:1px solid var(--line)"><div class="container d-flex align-items-center justify-content-between py-2">
      <span class="fw-bold h-font" style="color:var(--bp);font-size:22px">${esc(p.logo)}</span>
      <div class="d-flex gap-2"><a href="${telHref()}" data-cta="call" class="btn btn-brand">📞 ${esc(p.cta)}</a><a href="${waHref()}" data-cta="whatsapp" target="_blank" rel="noopener" class="btn btn-ghost">💬 ${esc(p.wa)}</a></div></div></nav>`},
  al_hero:{label:"Alarmas · hero oferta+regalo",ico:"",cat:"Alarmas",styleDef:{bg:"soft",pad:"L"},
    def:()=>({gift:"CÁMARA 360º GRATIS",headline:"Protege tu hogar con la alarma más avanzada",sub:"Instalación en 24 h y conexión con Central Receptora de Alarmas.",cta:"¡La quiero!",consent:"Acepto la política de privacidad."}),
    fields:[{k:"gift",l:"Etiqueta regalo"},{k:"headline",l:"Titular"},{k:"sub",l:"Subtítulo"},{k:"cta",l:"Botón callback"},{k:"consent",l:"Consentimiento"}],
    render:p=>`<div class="row align-items-center g-4"><div class="col-lg-6">
      ${p.gift?`<span class="badge-soft" style="background:var(--ba);color:#fff;border:0">🎁 ${esc(p.gift)}</span>`:""}
      <h1 class="display-5 fw-bold h-font mt-3 mb-3" style="color:var(--headcol)">${esc(p.headline)}</h1>
      <p class="lead mb-3" style="color:var(--txtmuted)">${esc(p.sub)}</p>
      <div class="d-flex flex-wrap gap-3 small" style="color:var(--txtmuted)"><span>✓ Aviso a policía</span><span>✓ App móvil</span><span>✓ Sin permanencia</span></div></div>
      <div class="col-lg-6"><div class="brandcard p-4" style="background:#fff;border-top:4px solid var(--bp)"><span id="form"></span>
        <div class="fw-bold h-font mb-3" style="color:var(--bink)">Te llamamos gratis</div>
        <form data-callback action="${ph(state.settings.endpoint,'ENDPOINT_FORMULARIO')}" method="post" class="row g-2">
          <div class="col-12"><input required name="nombre" class="form-control form-control-lg" placeholder="Nombre"></div>
          <div class="col-12"><input required name="telefono" type="tel" pattern="[0-9]{9}" title="9 dígitos" class="form-control form-control-lg" placeholder="Teléfono"></div>
          <div class="col-12 form-check my-1"><input required class="form-check-input" type="checkbox" id="alc"><label for="alc" class="form-check-label small" style="color:var(--bmuted)">${esc(p.consent)}</label></div>
          <div class="col-12"><button class="btn btn-brand btn-lg w-100" type="submit">${esc(p.cta)}</button></div>
        </form></div></div></div>`},
  al_porque:{label:"Alarmas · por qué elegirnos",ico:"",cat:"Alarmas",styleDef:{bg:"white"},
    def:()=>({title:"¿Por qué elegir nuestra seguridad?",items:"🛰️|Vigilancia 24/7|Central receptora conectada con las autoridades.\n📷|Equipamiento de última generación|Cámaras inteligentes y detección avanzada.\n📱|Control total|Gestiona tu alarma desde el móvil."}),
    fields:[{k:"title",l:"Título"},{k:"items",l:"Cards: icono|título|texto",t:"ta"}],
    render:p=>`<div class="text-center mb-5"><h2 class="fw-bold h-font" style="color:var(--headcol)">${esc(p.title)}</h2><div class="sec-title-line"></div></div>
      <div class="row g-4">${lines(p.items).map(l=>{const c=cells(l);return `<div class="col-md-4"><div class="brandcard h-100 p-4 text-center"><div class="ficon" style="margin:0 auto 14px">${esc(c[0]||"")}</div><h3 class="h6 fw-bold h-font" style="color:var(--bink)">${esc(c[1]||"")}</h3><p class="mb-0 small" style="color:var(--bmuted)">${esc(c[2]||"")}</p></div></div>`}).join("")}</div>`},
  al_garantias:{label:"Alarmas · garantías",ico:"",cat:"Alarmas",styleDef:{bg:"tint"},
    def:()=>({title:"Nuestras garantías",items:"🛡️|Garantía antirrobo|Cubrimos los daños en caso de intrusión.\n🏠|Garantía anti-ocupación|Protección frente a okupación.\n🤝|Compromiso cliente|Atención personal y sin letra pequeña."}),
    fields:[{k:"title",l:"Título"},{k:"items",l:"Cards: icono|título|texto",t:"ta"}],
    render:p=>`<div class="text-center mb-5"><h2 class="fw-bold h-font" style="color:var(--headcol)">${esc(p.title)}</h2><div class="sec-title-line"></div></div>
      <div class="row g-4">${lines(p.items).map(l=>{const c=cells(l);return `<div class="col-md-4"><div class="brandcard h-100 p-4 d-flex gap-3 align-items-start"><div class="ficon" style="width:48px;height:48px;font-size:22px;flex:0 0 auto">${esc(c[0]||"")}</div><div><h3 class="h6 fw-bold h-font mb-1" style="color:var(--bink)">${esc(c[1]||"")}</h3><p class="mb-0 small" style="color:var(--bmuted)">${esc(c[2]||"")}</p></div></div></div>`}).join("")}</div>`},
  al_footer:{label:"Alarmas · footer",ico:"",cat:"Alarmas",raw:true,
    def:()=>({company:"Marca",cols:"Seguridad:Alarma hogar,Alarma negocio|Ayuda:Contacto,Área cliente|Legal:Aviso legal,Privacidad,Cookies"}),
    fields:[{k:"company",l:"Razón social"},{k:"cols",l:"Columnas: Título:enlace,enlace|…",t:"ta"}],
    render:p=>`<footer style="background:var(--bink);color:rgba(255,255,255,.72)"><div class="container py-5"><div class="row g-4">${lines(p.cols).map(col=>{const pr=col.split(":");const it=(pr[1]||"").split(",");return `<div class="col-6 col-md-4"><div class="fw-bold mb-2" style="color:#fff">${esc(pr[0]||"")}</div>${it.map(x=>`<div class="mb-1"><a href="#" style="color:rgba(255,255,255,.72);text-decoration:none;font-size:14px">${esc(x.trim())}</a></div>`).join("")}</div>`}).join("")}</div><div class="pt-4 mt-4 small" style="border-top:1px solid rgba(255,255,255,.14)">© ${new Date().getFullYear()} ${esc(p.company)}</div></div></footer>`},
  imported:{label:"Sección importada",ico:"⇱",cat:"Importado",raw:true,
    def:()=>({html:"<section style='padding:48px;text-align:center'>Sección importada — pega HTML</section>"}),
    fields:[{k:"html",l:"HTML de la sección (editable)",t:"ta"}],
    render:p=>p.html||""}
};
const ORDER=["topbar","navbar","hero_split","hero_center","hero_form","hero_video","logos","marquee","stats","testimonials","trust","security","counters","logowall","features","imagetext","steps","gallery","pricing","comparison","countdown","faq","video","richtext","form","cal","calc","quiz","ctaband","stickycall","footer","apple_nav","apple_hero","apple_bento","apple_showcase","apple_footer","mov_nav","mov_hero","mov_tarifas","mov_footer","tmo_nav","tmo_hero","tmo_plans","tmo_footer","o2_nav","o2_hero","o2_tiles","o2_footer","mt_nav","mt_hero","mt_kpi","mt_footer","at_nav","at_hero","at_features","at_footer","jz_nav","jz_hero","jz_ventajas","jz_tarifas","jz_cobertura","jz_footer","imported"];

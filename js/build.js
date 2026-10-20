/* NC Landing Builder · v5.7 · DISEÑO DESDE 0
   · Bloque dx_build «Sección desde 0»: filas → columnas (1-4, con proporciones) → elementos (etiqueta, titular, texto,
     botón, imagen, lista, icono+texto, sellos, formulario de llamada, precio, vídeo, espacio y HTML).
   · Panel «Constructor» en Contenido: añadir/ordenar/duplicar/borrar filas, columnas y elementos; diseños de partida.
   · Fondo, espaciado y alineación de la sección: pestaña Estilo (los mismos controles que el resto de bloques).
   · En el lienzo: doble clic edita el texto, clic con la sección seleccionada abre ese elemento en el panel.
   · «✦ Desde 0» (barra superior y galería): landing nueva con esqueleto mínimo (cabecera con teléfono, sección desde 0,
     pie legal y barra fija móvil), eligiendo marca, estilo y diseño de partida.
   Responsive sin posiciones absolutas: en móvil las columnas se apilan (o 2 por fila, o en orden inverso).
   Ningún dato de negocio por defecto: {{PLACEHOLDER}}. */
const bxId=()=>"e"+Math.random().toString(36).slice(2,8);
const BX_KINDS=[["eyebrow","Etiqueta"],["heading","Titular"],["text","Texto"],["button","Botón"],["image","Imagen"],["list","Lista con checks"],["feature","Icono + título + texto"],["trust","Sellos de confianza"],["form","Formulario de llamada"],["price","Precio"],["video","Vídeo"],["spacer","Espacio / línea"],["html","HTML propio"]];
const BX_DEF={eyebrow:{text:"{{ETIQUETA}}"},heading:{text:"Escribe aquí tu titular",hl:"",lvl:"h2",size:""},text:{text:"Explica en una o dos frases qué consigue el cliente.",size:""},
  button:{text:"Quiero informarme",act:"popup",url:"",style:"pri"},image:{src:"",alt:"",ratio:"",r:""},list:{items:"{{VENTAJA_1}}\n{{VENTAJA_2}}\n{{VENTAJA_3}}"},
  feature:{icon:"check",title:"{{VENTAJA}}",text:"Explica la ventaja en una frase.",dir:"row"},trust:{items:"star|{{VALORACION}} en {{PLATAFORMA_OPINIONES}}\nshield-check|{{SELLO_O_CERTIFICACION}}"},
  form:{title:"",fields:"tel",inline:"",btn:"Llamadme gratis",opts:"",micro:"Gratis|Sin compromiso"},price:{price:"{{PRECIO}}",unit:"€/mes",old:"",note:"{{NOTA_PRECIO}}"},
  video:{url:"",poster:""},spacer:{h:"24",line:""},html:{html:"<p>HTML propio</p>"}};
const BX_F={
  eyebrow:[["text","Texto"]],
  heading:[["text","Texto","ta"],["hl","Parte destacada (opcional)"],["lvl","Nivel",[["h1","H1 · titular principal (uno por página)"],["h2","H2 · título de sección"],["h3","H3 · subtítulo"]]],["size","Tamaño",[["","Del estilo"],["S","Pequeño"],["M","Mediano"],["L","Grande"],["XL","Enorme"]]]],
  text:[["text","Texto","ta"],["size","Tamaño",[["","Normal"],["S","Pequeño"],["L","Grande (entradilla)"]]]],
  button:[["text","Texto (mejor en primera persona: «Llamadme gratis»)"],["act","Al pulsar",[["popup","Abrir el popup"],["scroll","Ir al formulario"],["global","Como el ajuste global"],["call","Llamar"],["wa","WhatsApp"],["url","Enlace"]]],["url","URL o #ancla (si es enlace)"],["style","Estilo",[["pri","Principal"],["sec","Secundario"],["link","Enlace de texto"]]]],
  image:[["alt","Texto alternativo"],["ratio","Proporción",[["","Original"],["169","16:9"],["43","4:3"],["11","Cuadrada"],["34","Vertical 3:4"]]],["r","Esquinas",[["","Del estilo"],["0","Rectas"],["12","Suaves"],["28","Muy redondeadas"],["999","Círculo"]]]],
  list:[["items","Puntos (uno por línea)","ta"]],
  feature:[["icon","Icono (phone, check, star, shield-check, euro, wifi, clock, users… o un emoji)"],["title","Título"],["text","Texto","ta"],["dir","Disposición",[["row","Icono a la izquierda"],["col","Icono arriba"]]]],
  trust:[["items","Sellos (icono|texto, uno por línea · solo datos reales)","ta"]],
  form:[["title","Título (opcional)"],["fields","Campos",[["tel","Solo teléfono (recomendado)"],["name","Nombre + teléfono"],["cp","Teléfono + código postal"],["full","Nombre + teléfono + código postal"]]],["inline","Teléfono y botón en la misma línea",[["","No"],["1","Sí (solo con «Solo teléfono»)"]]],["btn","Botón"],["opts","Opciones de interés (A|B*|C · * = marcada · opcional)"],["micro","Microcopia bajo el formulario (separada por |)"]],
  price:[["price","Precio (29,90 → céntimos pequeños)"],["unit","Unidad"],["old","Precio anterior tachado (⚠ debe ser el más bajo de los 30 días previos · Omnibus)"],["note","Nota bajo el precio"]],
  video:[["url","YouTube, Vimeo o .mp4"],["poster","Portada (solo .mp4, URL de imagen)"]],
  spacer:[["h","Alto (px)"],["line","Con línea",[["","No"],["1","Sí"]]]],
  html:[["html","HTML (los scripts solo se ejecutan en el export)","ta"]]};
const BX_LAYS=[["1","1 columna"],["1-1","2 iguales"],["2-1","2 · ancha + estrecha"],["1-2","2 · estrecha + ancha"],["1-1-1","3 iguales"],["1-1-1-1","4 iguales"]];
let BXP=true; /* true = vista previa (marcas de edición); el export lo pone a false */
const BX={open:null};
const bxE=(k,o)=>Object.assign({id:bxId(),k},JSON.parse(JSON.stringify(BX_DEF[k])),o||{});
const bxCol=(els,o)=>Object.assign({id:bxId(),st:"",al:"",els:els||[]},o||{});
const bxRow=(lay,cols,o)=>Object.assign({id:bxId(),lay,gap:"M",va:"center",m:"stack",cols},o||{});
function bxIsFirst(p){const S=state.sections.filter(s=>!s.hidden&&!/(_nav|_topbar|navbar|subnav)$/.test(s.type));return !!(S[0]&&S[0].props===p);}

/* ---------- render ---------- */
function bxEl(e,first){const a=BXP?` data-bx="${e.id}"`:"";
  switch(e.k){
  case "eyebrow":return `<span class="da-eyebrow"${a}>${esc(e.text)}</span>`;
  case "heading":{const l=/^h[1-3]$/.test(e.lvl)?e.lvl:"h2";const c=l==="h1"?"da-h1":l==="h2"?"da-h2":"bx-h3";
    return `<${l} class="${c} bx-h${e.size?" sz-"+e.size:""}"${a}>${esc(e.text).replace(/\n/g,"<br>")}${e.hl?` <mark>${esc(e.hl)}</mark>`:""}</${l}>`;}
  case "text":return `<p class="bx-p${e.size?" sz-"+e.size:""}"${a}>${esc(e.text).replace(/\n/g,"<br>")}</p>`;
  case "button":{const st=e.style==="sec"?"da-btn sec":e.style==="link"?"bx-lnk":"da-btn pri";const t=esc(e.text||"");
    if(e.act==="call")return `${v4Tel()} class="${st}"${a}>${e.style==="link"?"":I_TEL()+" "}${t||esc(telText())}</a>`;
    if(e.act==="wa")return `${v4Wa()} class="${st}${e.style==="pri"?" wa":""}"${a}>${e.style==="link"?"":I_WA()+" "}${t}</a>`;
    if(e.act==="url")return `<a href="${esc(e.url||"#")}" class="${st}"${a}>${t}</a>`;
    return `<a href="#form" data-cta="form"${e.act&&e.act!=="global"?` data-act="${e.act==="scroll"?"scroll":"popup"}"`:""} class="${st}"${a}>${t}${e.style==="pri"?" "+I_GO():""}</a>`;}
  case "image":{const c=`bx-img${e.ratio?" rt-"+e.ratio:""}${e.r?" r-"+e.r:""}`;
    if(!e.src)return BXP?`<div class="bx-imgph${e.ratio?" rt-"+e.ratio:""}"${a}>${ncIco("image")}<span>Imagen: súbela o elígela de la biblioteca en el panel</span></div>`:"";
    return `<img src="${esc(e.src)}" alt="${esc(e.alt||"")}" class="${c}"${first?' fetchpriority="high" loading="eager"':' loading="lazy"'}${a}>`;}
  case "list":return v4L(e.items).length?`<ul class="da-checks bx-list"${a}>${v4L(e.items).map(l=>`<li>${esc(l)}</li>`).join("")}</ul>`:"";
  case "feature":return `<div class="bx-ft d-${e.dir==="col"?"col":"row"}"${a}><span class="ic">${ncIconOrText(e.icon||"check")}</span><div><h3>${esc(e.title)}</h3>${e.text?`<p>${esc(e.text).replace(/\n/g,"<br>")}</p>`:""}</div></div>`;
  case "trust":{const L=v4L(e.items);return L.length?`<ul class="bx-tr"${a}>${L.map(l=>{const c=v4C(l);const ic=c.length>1?c[0]:"badge-check";return `<li>${ncIconOrText(ic)}<span>${esc(c.length>1?c.slice(1).join(" · "):c[0])}</span></li>`;}).join("")}</ul>`:"";}
  case "form":{const f=e.fields||"tel",inl=e.inline==="1"&&f==="tel";const nm=/name|full/.test(f),cp=/cp|full/.test(f);
    const M=String(e.micro||"").split("|").map(x=>x.trim()).filter(Boolean);
    return `<div class="bx-form" id="form"${a}>${e.title?`<h3>${esc(e.title)}</h3>`:""}<form data-callback action="${v4Act()}" method="post" class="${inl?"da-inline":""}">${e.opts?v4Opts(e.opts):""}
      ${nm?`<input required name="nombre" class="form-control" placeholder="Nombre" autocomplete="name">`:""}<input required name="telefono" type="tel" class="form-control" placeholder="${esc(vt("phone"))}" autocomplete="tel">
      ${cp?`<input required name="codigo_postal" class="form-control" placeholder="Código postal" inputmode="numeric" maxlength="5" pattern="[0-9]{5}" autocomplete="postal-code">`:""}<button type="submit" class="da-go">${esc(e.btn||"Llamadme")}</button></form>
      ${M.length?`<ul class="bx-micro">${M.map(x=>`<li>${ncIco("check")}<span>${esc(x)}</span></li>`).join("")}</ul>`:""}</div>`;}
  case "price":{const s=String(e.price||"").trim(),m=s.match(/^(\d{1,5})([.,]\d{1,2})$/);
    return `<div class="bx-price"${a}>${e.old?`<span class="od">Antes <s>${esc(e.old)} ${esc(e.unit||"")}</s></span>`:""}<div class="pp"><b class="pv${s.length>7?" lg":""}">${m?`<span class="eu">${esc(m[1])}</span><span class="ce">${esc(m[2].replace(".",","))}</span>`:`<span class="eu">${esc(s)}</span>`}</b><span class="un">${esc(e.unit||"")}</span></div>${e.note?`<p class="nt">${esc(e.note)}</p>`:""}</div>`;}
  case "video":{const v=typeof wVideo==="function"?wVideo(e.url):null;
    if(v&&v.mp4)return `<video class="bx-vid" controls playsinline preload="none"${e.poster?` poster="${esc(e.poster)}"`:""}${a}><source src="${esc(v.mp4)}" type="video/${/\.webm/i.test(v.mp4)?"webm":"mp4"}"></video>`;
    if(v&&v.src)return `<div class="bx-vid"${a}><iframe src="${esc(v.src.replace("autoplay=1","autoplay=0"))}" title="Vídeo" loading="lazy" allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>`;
    return BXP?`<div class="bx-imgph rt-169"${a}>${ncIco("circle-play")}<span>Vídeo: pega la URL de YouTube, Vimeo o .mp4 en el panel</span></div>`:"";}
  case "spacer":return `<div class="bx-sp${e.line==="1"?" ln":""}" style="height:${Math.max(0,parseInt(e.h,10)||0)}px" role="presentation"${a}></div>`;
  case "html":{let h=String(e.html||"");if(BXP)h=h.replace(/<script[\s\S]*?<\/script>/gi,"").replace(/\son\w+=("[^"]*"|'[^']*'|[^\s>]+)/gi,"");return BXP?`<div class="bx-html"${a}>${h}</div>`:h;}}
  return "";}
function bxColHTML(c,first){const E=arr(c.els);let h="",grp=[];const flush=()=>{if(grp.length){h+=`<div class="da-btns">${grp.join("")}</div>`;grp=[];}};
  E.forEach((e,i)=>{const x=bxEl(e,first&&i<4);if(e.k==="button")grp.push(x);else{flush();h+=x;}});flush();
  if(!E.length&&BXP)h=`<div class="bx-cph">Columna vacía · añade elementos en el panel</div>`;
  const st=c.st||"";return `<div class="bx-col${st?" st-"+st:""}${st==="card"?" da-card":""}${c.al?" al-"+c.al:""}">${h}</div>`;}
function bxRender(p){const R=arr(p.rows);const first=bxIsFirst(p);
  if(!R.length)return `<section class="da da-sec bx bx-empty">${BXP?`<div class="container"><div class="bx-ph"><b>✦ Sección desde 0</b><span>Elige un diseño de partida o añade una fila en el panel de la derecha (Contenido → Constructor).</span></div></div>`:""}</section>`;
  return `<section class="da da-sec bx w-${p.width||"normal"}${p.minh?" mh mh-"+p.minh:""}"><div class="container">${R.map((r,ri)=>`<div class="bx-row l-${r.lay||"1"} g-${r.gap||"M"} va-${r.va||"center"} m-${r.m||"stack"}">${arr(r.cols).map(c=>bxColHTML(c,first&&ri===0)).join("")}</div>`).join("")}</div></section>`;}

/* ---------- diseños de partida ---------- */
const BX_PRESETS=[
  ["empty","Vacía",()=>({rows:[]})],
  ["hero-form","Hero · texto + formulario",()=>({rows:[bxRow("1-1",[bxCol([bxE("eyebrow"),bxE("heading",{text:"Tu titular con la promesa principal",lvl:"h1"}),bxE("text",{text:"Explica en una frase qué consigue el cliente y por qué ahora."}),bxE("list"),bxE("trust")]),
    bxCol([bxE("heading",{text:"Te llamamos gratis",lvl:"h3"}),bxE("text",{text:"Déjanos tu teléfono y un asesor te informa sin compromiso.",size:"S"}),bxE("form")],{st:"card"})])]})],
  ["hero-center","Hero · centrado",()=>({rows:[bxRow("1",[bxCol([bxE("eyebrow"),bxE("heading",{text:"Tu titular con la promesa principal",lvl:"h1",size:"L"}),bxE("text",{text:"Una frase que explique el beneficio principal sin letra pequeña.",size:"L"}),bxE("button",{text:"Quiero informarme"}),bxE("button",{text:"",act:"call",style:"sec"}),bxE("trust")],{al:"center"})])],width:"narrow"})],
  ["hero-img","Hero · texto + imagen",()=>({rows:[bxRow("1-1",[bxCol([bxE("eyebrow"),bxE("heading",{text:"Tu titular con la promesa principal",lvl:"h1"}),bxE("text",{text:"Explica en una frase qué consigue el cliente."}),bxE("price"),bxE("button",{text:"La quiero"}),bxE("button",{text:"",act:"call",style:"sec"})]),
    bxCol([bxE("image",{ratio:"43"})])])]})],
  ["features","3 ventajas",()=>({rows:[bxRow("1",[bxCol([bxE("heading",{text:"Por qué elegirnos"}),bxE("text",{text:"Lo que te llevas desde el primer día."})],{al:"center"})]),
    bxRow("1-1-1",[1,2,3].map(n=>bxCol([bxE("feature",{icon:["check","shield-check","headphones"][n-1],title:`{{VENTAJA_${n}}}`,text:`{{DETALLE_VENTAJA_${n}}}`,dir:"col"})],{st:"card"})),{va:"stretch"})]})],
  ["img-text","Imagen + texto",()=>({rows:[bxRow("1-1",[bxCol([bxE("image",{ratio:"43"})]),bxCol([bxE("eyebrow"),bxE("heading",{text:"Cuenta aquí una idea clave"}),bxE("text"),bxE("list"),bxE("button",{text:"Quiero saber más"})])])]})],
  ["price-form","Precio + formulario",()=>({rows:[bxRow("1-1",[bxCol([bxE("heading",{text:"{{NOMBRE_TARIFA}}"}),bxE("price",{price:"{{PRECIO}}"}),bxE("list",{items:"{{CARACTERISTICA_1}}\n{{CARACTERISTICA_2}}\n{{CARACTERISTICA_3}}"})]),
    bxCol([bxE("heading",{text:"¿La quieres? Te llamamos",lvl:"h3"}),bxE("form",{fields:"tel"})],{st:"card"})])]})],
  ["steps","Cómo funciona (3 pasos)",()=>({rows:[bxRow("1",[bxCol([bxE("heading",{text:"Así de fácil"})],{al:"center"})]),
    bxRow("1-1-1",[["phone","Nos dejas tu teléfono","Tardas menos de un minuto."],["headphones","Te llamamos","Resolvemos tus dudas y te damos el precio final."],["check","Listo","Nos encargamos de todo el proceso."]].map(x=>bxCol([bxE("feature",{icon:x[0],title:x[1],text:x[2],dir:"col"})],{al:"center"})))]})],
  ["cta","Banda de cierre",()=>({rows:[bxRow("1",[bxCol([bxE("heading",{text:"¿Hablamos?"}),bxE("text",{text:"Te llamamos gratis y sin compromiso."}),bxE("button",{text:"Llamadme gratis"}),bxE("button",{text:"",act:"call",style:"sec"})],{al:"center"})])],width:"narrow",_style:{bg:"brand"}})]
];
function bxApplyPreset(s,key){const P=(BX_PRESETS.find(x=>x[0]===key)||BX_PRESETS[0])[2]();s.props.rows=P.rows;if(P.width)s.props.width=P.width;
  if(P._style){s.style=Object.assign({},s.style||{},P._style);}
  /* un solo H1: si la sección no es la primera, los H1 del diseño pasan a H2 */
  if(!bxIsFirst(s.props))arr(s.props.rows).forEach(r=>arr(r.cols).forEach(c=>arr(c.els).forEach(e=>{if(e.k==="heading"&&e.lvl==="h1")e.lvl="h2";})));}

Object.assign(LIB,{dx_build:{label:"✦ Sección desde 0 (constructor)",ico:"✦",cat:"Desde 0",raw:true,
  def:()=>({rows:[],width:"normal",minh:""}),
  fields:[{k:"width",l:"Ancho del contenido",t:"select",opts:[["narrow","Estrecho (760 px)"],["normal","Normal"],["wide","Ancho (1400 px)"],["full","Todo el ancho"]]},
    {k:"minh",l:"Alto mínimo de la sección",t:"select",opts:[["","Automático"],["50","Media pantalla"],["75","Tres cuartos de pantalla"],["100","Pantalla completa"]]}],
  render:p=>bxRender(p)}});
ORDER.unshift("dx_build");

/* ---------- CSS ---------- */
function ncBxCSS(){return `
.bx{overflow-wrap:break-word}.bx.w-narrow .container{max-width:800px}.bx.w-wide .container{max-width:1400px}.bx.w-full .container{max-width:none;padding-left:clamp(16px,4vw,56px);padding-right:clamp(16px,4vw,56px)}
.bx.mh{display:flex;align-items:center}.bx.mh>.container{width:100%}.bx.mh-50{min-height:50vh}.bx.mh-75{min-height:75vh}.bx.mh-100{min-height:100vh;min-height:100svh}
.bx-row{display:grid;grid-template-columns:minmax(0,1fr);gap:var(--bxg,32px);align-items:center}.bx-row+.bx-row{margin-top:clamp(28px,4vw,52px)}
.bx-row.g-0{--bxg:0px}.bx-row.g-S{--bxg:16px}.bx-row.g-M{--bxg:clamp(20px,3vw,40px)}.bx-row.g-L{--bxg:clamp(28px,5vw,72px)}
.bx-row.va-start{align-items:start}.bx-row.va-end{align-items:end}.bx-row.va-stretch{align-items:stretch}
@media (min-width:768px){.bx-row.l-1-1{grid-template-columns:repeat(2,minmax(0,1fr))}.bx-row.l-2-1{grid-template-columns:minmax(0,2fr) minmax(0,1fr)}.bx-row.l-1-2{grid-template-columns:minmax(0,1fr) minmax(0,2fr)}
 .bx-row.l-1-1-1{grid-template-columns:repeat(3,minmax(0,1fr))}.bx-row.l-1-1-1-1{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (min-width:992px){.bx-row.l-1-1-1-1{grid-template-columns:repeat(4,minmax(0,1fr))}}
@media (max-width:767px){.bx-row.m-two:not(.l-1){grid-template-columns:repeat(2,minmax(0,1fr))}.bx-row.m-rev{display:flex;flex-direction:column-reverse}.bx-row.m-rev>.bx-col{width:100%}}
.bx-col{display:flex;flex-direction:column;align-items:flex-start;gap:16px;min-width:0}.bx-col>*{margin:0!important;max-width:100%}.bx-col>.bx-img,.bx-col>.bx-imgph,.bx-col>.bx-vid,.bx-col>.bx-form,.bx-col>.bx-sp,.bx-col>.bx-html,.bx-col>.bx-ft,.bx-col>.bx-h,.bx-col>.bx-p{width:100%}
.bx-col.al-center{align-items:center;text-align:center}.bx-col.al-center .da-btns,.bx-col.al-center .bx-tr,.bx-col.al-center .bx-micro{justify-content:center}.bx-col.al-center .bx-p{margin-left:auto!important;margin-right:auto!important}.bx-col.al-center .bx-form{margin-left:auto!important;margin-right:auto!important}
.nc-al-center .bx-col:not(.al-left):not(.al-right){align-items:center;text-align:center}.nc-al-center .bx-col:not(.al-left):not(.al-right) .da-btns,.nc-al-center .bx-col:not(.al-left):not(.al-right) .bx-tr{justify-content:center}
.bx-col.al-right{align-items:flex-end;text-align:right}.bx-col.al-right .da-btns{justify-content:flex-end}
.bx-col.st-card{padding:clamp(20px,3vw,32px)}.bx-col.st-soft{padding:clamp(20px,3vw,32px);border-radius:var(--cardr,18px);background:color-mix(in srgb,var(--bink) 5%,transparent)}
.bx-col.st-brand{padding:clamp(20px,3vw,32px);border-radius:var(--cardr,18px);background:var(--bp);--bink:var(--btntext,#fff);--bmuted:color-mix(in srgb,var(--btntext,#fff) 82%,transparent);--bpt:var(--btntext,#fff);--dline:color-mix(in srgb,var(--btntext,#fff) 25%,transparent);color:var(--btntext,#fff)}
.bx-col.st-brand .da-btn.pri{background:var(--btntext,#fff);color:var(--bp);border-color:var(--btntext,#fff)}.bx-col.st-brand .da-btn.sec{color:inherit;border-color:currentColor;background:transparent}
.bx-col.st-ink{padding:clamp(20px,3vw,32px);border-radius:var(--cardr,18px);background:var(--ink0,#15151a);--bink:#fff;--bmuted:rgba(255,255,255,.75);--bpt:color-mix(in srgb,var(--bp) 50%,#fff);--dline:rgba(255,255,255,.16);color:#fff}
.bx .da-btns{display:flex;flex-wrap:wrap;gap:10px;margin:0}
html body .nc-bg-brand .bx .da-btn.pri{background:var(--btntext,#fff)!important;color:var(--bp)!important;border-color:var(--btntext,#fff)!important}html body .nc-bg-brand .bx .da-btn.sec{background:transparent!important;color:var(--btntext,#fff)!important;border-color:currentColor!important}
html body .nc-bg-ink .bx .bx-col:not(.st-card) .da-btn.sec,html body .nc-tone-d .bx .bx-col:not(.st-card) .da-btn.sec{background:transparent;color:#fff;border-color:rgba(255,255,255,.7)}
body.nc-ed .bx .bx-col.al-center .da-h2,body.nc-ed .nc-al-center .bx .bx-col:not(.al-left):not(.al-right) .da-h2{text-align:center!important;margin-left:auto!important;margin-right:auto!important}body.nc-ed .bx .bx-col.al-center .da-h2::before,body.nc-ed .nc-al-center .bx .bx-col:not(.al-left):not(.al-right) .da-h2::before{margin-left:auto;margin-right:auto}
.bx-row:not(.l-1) .da-h1{font-size:clamp(30px,3.7vw,56px);line-height:1.05}
.bx .bx-h.sz-S{font-size:clamp(22px,2.2vw,28px)!important}.bx .bx-h.sz-M{font-size:clamp(28px,3vw,40px)!important}.bx .bx-h.sz-L{font-size:clamp(36px,4.6vw,62px)!important;line-height:1.04}.bx .bx-h.sz-XL{font-size:clamp(44px,7vw,96px)!important;line-height:.98}
.bx .bx-h3{font:700 clamp(19px,1.8vw,23px)/1.3 var(--fhead);color:var(--bink)}
.bx-p{color:var(--bmuted);font-size:17px;line-height:1.6;max-width:68ch}.bx-p.sz-L{font-size:clamp(18px,1.6vw,21px);color:var(--bink)}.bx-p.sz-S{font-size:14.5px}
.bx-img{display:block;width:100%;height:auto;border-radius:var(--cardr,18px);object-fit:cover}.bx .rt-169{aspect-ratio:16/9}.bx .rt-43{aspect-ratio:4/3}.bx .rt-11{aspect-ratio:1/1}.bx .rt-34{aspect-ratio:3/4}
.bx-img.r-0{border-radius:0}.bx-img.r-12{border-radius:12px}.bx-img.r-28{border-radius:28px}.bx-img.r-999{border-radius:50%;aspect-ratio:1/1}
.bx-list{margin:0;text-align:left}
.bx-ft{display:flex;gap:14px;text-align:left}.bx-ft.d-col{flex-direction:column}.bx-col.al-center .bx-ft.d-col{align-items:center;text-align:center}
.bx-ft .ic{flex:0 0 48px;width:48px;height:48px;border-radius:12px;display:grid;place-items:center;background:color-mix(in srgb,var(--bp) 12%,transparent);color:var(--bpt,var(--bp));font-size:22px}.bx-ft .ic .nci{width:24px;height:24px}
.bx-ft h3{font:700 18px/1.3 var(--fhead);color:var(--bink);margin:2px 0 4px}.bx-ft p{margin:0;color:var(--bmuted);font-size:15.5px;line-height:1.55}
.bx-tr,.bx-micro{list-style:none;padding:0;display:flex;flex-wrap:wrap;gap:8px 20px}.bx-tr li,.bx-micro li{display:flex;align-items:center;gap:7px}.bx-tr li{font-size:14px;font-weight:600;color:var(--bink)}.bx-tr .nci{width:20px;height:20px;color:var(--bpt,var(--bp))}
.bx-micro{margin:10px 0 0;font-size:13.5px;color:var(--bmuted)}.bx-micro .nci{width:15px;height:15px;color:var(--bpt,var(--bp))}
.bx-form{max-width:560px}.bx-form h3{font:700 20px/1.25 var(--fhead);color:var(--bink);margin:0 0 12px}.bx-form form:not(.da-inline) .form-control{margin-bottom:8px}.bx-form form:not(.da-inline) .da-go{width:100%}
.bx-price .od{display:block;color:var(--bmuted);font-size:14px;margin-bottom:4px}.bx-price .pp{display:flex;align-items:flex-start;gap:4px;line-height:1}.bx-price .pv{display:flex;align-items:flex-start;color:var(--bpt,var(--bp));font-family:var(--fdisp,var(--fhead));font-weight:800;letter-spacing:-.03em;min-width:0}
.bx-price .eu{font-size:clamp(56px,7vw,92px);line-height:.9}.bx-price .ce{font-size:clamp(24px,2.6vw,36px);margin-top:.15em}.bx-price .pv.lg .eu{font-size:clamp(28px,3.6vw,44px);overflow-wrap:anywhere}.bx-price .un{align-self:flex-end;font-weight:700;color:var(--bink);margin:0 0 .45em 4px}.bx-price .nt{margin:8px 0 0;font-size:13.5px;color:var(--bmuted)}
.bx-vid{display:block;width:100%;aspect-ratio:16/9;border-radius:var(--cardr,18px);overflow:hidden;background:#000}.bx-vid iframe{width:100%;height:100%;border:0;display:block}
.bx-sp.ln{border-top:1px solid var(--dline,#e5e7eb);height:auto!important;margin:12px 0!important}
.bx-lnk{font-weight:700;color:var(--bpt,var(--bp));text-decoration:underline;text-underline-offset:3px}`;}
const BX_PREV_CSS=`.bx-ph{display:flex;flex-direction:column;gap:6px;align-items:center;text-align:center;padding:56px 20px;border:2px dashed rgba(110,90,255,.45);border-radius:18px;color:#6b6f80;background:rgba(110,90,255,.04);font-size:15px}.bx-ph b{font-size:18px;color:#6E5AFF}
.bx-cph,.bx-imgph{display:flex;flex-direction:column;gap:8px;align-items:center;justify-content:center;text-align:center;width:100%;min-height:120px;padding:18px;border:2px dashed rgba(127,127,127,.35);border-radius:14px;color:#8a8f9e;font-size:13.5px}.bx-imgph .nci{width:28px;height:28px}
[data-sec].sel [data-bx]{cursor:pointer}[data-sec].sel [data-bx]:hover{outline:1.5px dashed rgba(110,90,255,.6);outline-offset:3px}[data-bx].bx-on{outline:2px solid #6E5AFF!important;outline-offset:3px}`;
const BX_PREV_JS=`(function(){if(window.__free)return;document.addEventListener('click',function(e){var el=e.target.closest&&e.target.closest('[data-bx]');var sec=el&&el.closest('[data-sec]');if(!el||!sec||!sec.classList.contains('sel'))return;
  document.querySelectorAll('.bx-on').forEach(function(x){x.classList.remove('bx-on');});el.classList.add('bx-on');parent.postMessage({nc:'bxsel',id:sec.getAttribute('data-sec'),el:el.getAttribute('data-bx')},'*');},true);})();`;
(function(){const _bd=buildDoc;buildDoc=function(forExport){BXP=!forExport;let h;try{h=_bd.apply(this,arguments);}finally{BXP=true;}
  if(!state.sections.some(s=>s.type==="dx_build"&&!(forExport&&s.hidden)))return h;
  /* ids «form» repetidos (el formulario del constructor y el de otro bloque): el segundo pasa a form-2… */
  let n=0;h=h.replace(/\sid="form"/g,m=>(++n>1?` id="form-${n}"`:m));
  h=h.replace("</head>",`<style>${ncBxCSS()}${forExport?"":BX_PREV_CSS}</style></head>`);
  if(!forExport&&!state.freeMode)h=h.replace(/<\/body>(?![\s\S]*<\/body>)/,`<script>${BX_PREV_JS}<\/script></body>`);return h;};})();

/* ---------- edición en el lienzo (doble clic) ---------- */
function bxFind(s,eid){let f=null;arr(s.props.rows).forEach(r=>arr(r.cols).forEach(c=>arr(c.els).forEach(e=>{if(e.id===eid)f=e;})));return f;}
(function(){const _c=ncvCands;ncvCands=function(s){const C=_c.apply(this,arguments);if(!s||s.type!=="dx_build")return C;const norm=v=>String(v||"").replace(/\s+/g," ").trim();
  const addT=(t,p)=>{t=norm(t);if(t.length<2||/^(https?:|data:)/.test(t))return;if(!C.txt.has(t))C.txt.set(t,[]);C.txt.get(t).push(p);};
  arr(s.props.rows).forEach(r=>arr(r.cols).forEach(c=>arr(c.els).forEach(e=>{const b="bx:"+e.id+":";
    ["text","hl","title","btn","note","price","unit"].forEach(k=>{if(typeof e[k]==="string"&&e[k]&&!(e.k==="form"&&k==="text")){if(/\n/.test(e[k]))e[k].split("\n").forEach((ln,li)=>addT(ln,b+k+"|"+li));else addT(e[k],b+k);}});
    if(e.k==="list")v4L(e.items).forEach((ln,li)=>addT(ln,b+"items|"+li));
    if(e.k==="trust")v4L(e.items).forEach((ln,li)=>{const cc=v4C(ln);if(cc.length>1)addT(cc.slice(1).join(" · "),b+"items|"+li+"|1");else addT(cc[0],b+"items|"+li);});
    if(e.k==="image"&&e.src&&!C.img.has(e.src))C.img.set(e.src,b+"src");})));return C;};
  const _s=ncvSet;ncvSet=function(props,path,val){const m=String(path).match(/^bx:(\w+):(\w+)(?:\|(\d+))?(?:\|(\d+))?$/);if(!m)return _s.apply(this,arguments);
    let el=null;arr(props.rows).forEach(r=>arr(r.cols).forEach(c=>arr(c.els).forEach(e=>{if(e.id===m[1])el=e;})));if(!el)return;
    if(m[3]==null){el[m[2]]=val;return;}const L=String(el[m[2]]||"").split("\n");if(m[4]!=null){const cc=(L[+m[3]]||"").split("|");cc[+m[4]]=String(val).replace(/\|/g,"/");L[+m[3]]=cc.join("|");}else L[+m[3]]=val;el[m[2]]=L.join("\n");};})();
window.addEventListener("message",e=>{const d=e.data;if(!d||d.nc!=="bxsel")return;const s=state.sections.find(x=>x.id===d.id);if(!s||s.type!=="dx_build")return;BX.open=d.el;state.selected=s.id;
  if(state.tab==="content")renderRight();});

/* ---------- panel «Constructor» ---------- */
function bxScroller(el){for(let n=el;n;n=n.parentElement){const cs=getComputedStyle(n);if(/(auto|scroll)/.test(cs.overflowY)&&n.scrollHeight>n.clientHeight)return n;}return null;}
function bxSnippet(e){const t=e.text||e.title||e.price||(e.items?String(e.items).split("\n")[0].split("|").pop():"")||(e.src?"(imagen)":"")||e.url||e.btn||"";return String(t).replace(/\s+/g," ").slice(0,38);}
function bxSel(name,opts,cur,attr){return `<select ${attr}>${opts.map(([v,t])=>`<option value="${esc(v)}"${String(cur||"")===v?" selected":""}>${esc(t)}</option>`).join("")}</select>`;}
function bxLaySvg(l){const P=l.split("-").map(Number),T=P.reduce((a,b)=>a+b,0);let x=1;return `<svg viewBox="0 0 40 18" width="40" height="18" aria-hidden="true">${P.map(n=>{const w=(38-(P.length-1)*2)*n/T;const r=`<rect x="${x}" y="2" width="${w}" height="14" rx="2" fill="currentColor" opacity=".55"/>`;x+=w+2;return r;}).join("")}</svg>`;}
function bxElPanel(e){const F=BX_F[e.k]||[];let h="";
  if(e.k==="image")h+=`<div class="thumbrow">${e.src?`<img class="thumb" src="${esc(e.src)}" alt="">`:""}<button type="button" class="btn sm" data-ba="img">${e.src?"Cambiar":"Subir"}</button>${window.NC_MEDIA?`<button type="button" class="btn sm" data-ba="lib">🗂 Biblioteca</button>`:""}${e.src?`<button type="button" class="btn sm ghost" data-ba="noimg">Quitar</button>`:""}</div>`;
  F.forEach(([k,l,t])=>{if(e.k==="button"&&k==="url"&&e.act!=="url")return;if(e.k==="form"&&k==="inline"&&(e.fields||"tel")!=="tel")return;
    h+=`<div class="fld"><label>${esc(l)}</label>${Array.isArray(t)?bxSel(k,t,e[k],`data-bf="${k}"`):t==="ta"?`<textarea data-bf="${k}" rows="${k==="html"?6:3}">${esc(e[k]||"")}</textarea>`:`<input data-bf="${k}" value="${esc(e[k]||"")}">`}</div>`;});
  return h;}
function bxPanelHTML(s){const R=arr(s.props.rows);const lbl=k=>(BX_KINDS.find(x=>x[0]===k)||["",k])[1];
  const pres=`<div class="bx-pres">${BX_PRESETS.filter(p=>p[0]!=="empty").map(p=>`<button type="button" class="chipf sm" data-bpre="${p[0]}">${esc(p[1])}</button>`).join("")}</div>`;
  let h=`<div id="bxPanel" class="ep-g"><div class="paneltitle" style="padding:0 0 6px">✦ Constructor</div>`;
  if(!R.length)h+=`<div class="help" style="margin:0 0 8px">Empieza con un diseño de partida (se rellena con textos de ejemplo y {{PLACEHOLDERS}}) o añade una fila vacía abajo.</div>${pres}`;
  R.forEach((r,ri)=>{h+=`<div class="bx-r" data-r="${ri}"><div class="bx-rh"><b>Fila ${ri+1}</b><span class="bx-acts"><button type="button" class="mini" data-ba="rup" ${ri?"":"disabled"} title="Subir">↑</button><button type="button" class="mini" data-ba="rdown" ${ri<R.length-1?"":"disabled"} title="Bajar">↓</button><button type="button" class="mini" data-ba="rdup" title="Duplicar">⧉</button><button type="button" class="mini" data-ba="rdel" title="Quitar fila">✕</button></span></div>
    <div class="bx-lays">${BX_LAYS.map(([l,t])=>`<button type="button" class="bx-lay${(r.lay||"1")===l?" on":""}" data-ba="lay" data-v="${l}" title="${esc(t)}">${bxLaySvg(l)}</button>`).join("")}</div>
    <div class="row2"><div class="fld"><label>Separación</label>${bxSel("gap",[["0","Sin separación"],["S","Pequeña"],["M","Normal"],["L","Grande"]],r.gap||"M",'data-rf="gap"')}</div><div class="fld"><label>Alineación vertical</label>${bxSel("va",[["start","Arriba"],["center","Centro"],["end","Abajo"],["stretch","Misma altura"]],r.va||"center",'data-rf="va"')}</div></div>
    ${(r.lay||"1")!=="1"?`<div class="fld"><label>En móvil</label>${bxSel("m",[["stack","Una debajo de otra"],["rev","Una debajo de otra, orden inverso"],["two","Dos por fila"]],r.m||"stack",'data-rf="m"')}</div>`:""}`;
    arr(r.cols).forEach((c,ci)=>{const E=arr(c.els);h+=`<div class="bx-c" data-c="${ci}"><div class="bx-ch"><b>${arr(r.cols).length>1?"Columna "+(ci+1):"Contenido"}</b>${bxSel("st",[["","Sin fondo"],["card","Tarjeta"],["soft","Fondo suave"],["brand","Color de marca"],["ink","Oscuro"]],c.st,'data-cf="st" title="Fondo de la columna"')}${bxSel("al",[["","Alinear: del bloque"],["left","Izquierda"],["center","Centro"],["right","Derecha"]],c.al,'data-cf="al" title="Alineación"')}</div>`;
      E.forEach((e,ei)=>{const op=BX.open===e.id;h+=`<div class="bx-e${op?" open":""}" data-e="${ei}"><div class="bx-eh" data-ba="tog"><span class="k">${esc(lbl(e.k))}</span><small>${esc(bxSnippet(e))}</small><span class="bx-acts"><button type="button" class="mini" data-ba="eup" ${ei?"":"disabled"} title="Subir">↑</button><button type="button" class="mini" data-ba="edown" ${ei<E.length-1?"":"disabled"} title="Bajar">↓</button><button type="button" class="mini" data-ba="edup" title="Duplicar">⧉</button><button type="button" class="mini" data-ba="edel" title="Quitar">✕</button></span></div>${op?`<div class="bx-eb">${bxElPanel(e)}</div>`:""}</div>`;});
      h+=`<div class="bx-adde"><select data-addk>${BX_KINDS.map(([k,l])=>`<option value="${k}">${esc(l)}</option>`).join("")}</select><button type="button" class="btn sm" data-ba="eadd">＋ Elemento</button></div></div>`;});
    h+=`</div>`;});
  h+=`<div class="bx-addr"><span>Añadir fila:</span>${BX_LAYS.map(([l,t])=>`<button type="button" class="bx-lay" data-ba="radd" data-v="${l}" title="${esc(t)}">${bxLaySvg(l)}</button>`).join("")}</div>`;
  if(R.length)h+=`<details class="bx-more"><summary>Sustituir por un diseño de partida</summary>${pres}</details>`;
  return h+`<div class="help">Fondo, márgenes y alineación de toda la sección: pestaña <b>Estilo</b>. En el lienzo: doble clic para editar un texto; clic (con la sección seleccionada) para abrir el elemento aquí.</div></div>`;}
function bxClone(o){const c=JSON.parse(JSON.stringify(o));const re=x=>{if(x&&typeof x==="object"){if(x.id)x.id=bxId();Object.values(x).forEach(v=>{if(Array.isArray(v))v.forEach(re);});}};re(c);return c;}
function bxSetLay(r,lay){const n=lay.split("-").length;r.lay=lay;const C=arr(r.cols);while(C.length<n)C.push(bxCol([]));if(C.length>n){const extra=C.splice(n);extra.forEach(x=>C[n-1].els.push(...arr(x.els)));}r.cols=C;}
function bxBind(cf,s){const P=document.getElementById("bxPanel");if(!P)return;const p=s.props;p.rows=arr(p.rows);
  const at=el=>{const r=el.closest("[data-r]"),c=el.closest("[data-c]"),e=el.closest("[data-e]");const R=r?p.rows[+r.dataset.r]:null,C=R&&c?R.cols[+c.dataset.c]:null,E=C&&e?C.els[+e.dataset.e]:null;
    return {ri:r?+r.dataset.r:-1,ci:c?+c.dataset.c:-1,ei:e?+e.dataset.e:-1,R,C,E};};
  const sc=bxScroller(P),y=sc?sc.scrollTop:0;const re=()=>{renderPreview();renderRight();const s2=bxScroller(document.getElementById("bxPanel")||document.body);if(s2)s2.scrollTop=y;};
  P.addEventListener("click",ev=>{const pre=ev.target.closest("[data-bpre]");if(pre){if(p.rows.length&&!confirm("¿Sustituir el contenido de esta sección por el diseño «"+pre.textContent+"»?"))return;commit();bxApplyPreset(s,pre.dataset.bpre);BX.open=null;re();return;}
    const b=ev.target.closest("[data-ba]");if(!b||b.disabled)return;const a=b.dataset.ba,x=at(b);
    if(a==="tog"){if(ev.target.closest(".bx-acts"))return;BX.open=BX.open===x.E.id?null:x.E.id;re();return;}
    if(a==="img"){const fi=document.createElement("input");fi.type="file";fi.accept="image/*";fi.onchange=e2=>readImg(e2.target.files[0],url=>{commit();x.E.src=url;re();});fi.click();return;}
    if(a==="lib"&&window.NC_MEDIA){NC_MEDIA.open({accept:"image",cb:url=>{commit();x.E.src=url;re();}});return;}
    commit();
    if(a==="noimg")x.E.src="";
    if(a==="radd"){p.rows.push(bxRow(b.dataset.v,b.dataset.v.split("-").map(()=>bxCol([]))));}
    if(a==="lay")bxSetLay(x.R,b.dataset.v);
    if(a==="rup"&&x.ri>0)[p.rows[x.ri-1],p.rows[x.ri]]=[p.rows[x.ri],p.rows[x.ri-1]];
    if(a==="rdown"&&x.ri<p.rows.length-1)[p.rows[x.ri+1],p.rows[x.ri]]=[p.rows[x.ri],p.rows[x.ri+1]];
    if(a==="rdup")p.rows.splice(x.ri+1,0,bxClone(x.R));
    if(a==="rdel"){if(arr(x.R.cols).some(c=>arr(c.els).length)&&!confirm("¿Quitar la fila "+(x.ri+1)+" con su contenido?")){past.pop();return;}p.rows.splice(x.ri,1);}
    if(a==="eadd"){const k=b.parentElement.querySelector("[data-addk]").value;const e=bxE(k);if(k==="heading"&&bxIsFirst(p)&&!JSON.stringify(p.rows).includes('"lvl":"h1"'))e.lvl="h1";x.C.els.push(e);BX.open=e.id;}
    const E=x.C&&x.C.els;if(E){if(a==="eup"&&x.ei>0)[E[x.ei-1],E[x.ei]]=[E[x.ei],E[x.ei-1]];if(a==="edown"&&x.ei<E.length-1)[E[x.ei+1],E[x.ei]]=[E[x.ei],E[x.ei+1]];if(a==="edup")E.splice(x.ei+1,0,bxClone(x.E));if(a==="edel")E.splice(x.ei,1);}
    re();});
  P.addEventListener("change",ev=>{const t=ev.target;const x=at(t);
    if(t.dataset.rf){commit();x.R[t.dataset.rf]=t.value;re();return;}
    if(t.dataset.cf){commit();x.C[t.dataset.cf]=t.value;re();return;}
    if(t.dataset.bf&&t.tagName==="SELECT"){commit();x.E[t.dataset.bf]=t.value;re();}});
  P.addEventListener("input",ev=>{const t=ev.target;if(!t.dataset.bf||t.tagName==="SELECT")return;const x=at(t);commitDebounced();x.E[t.dataset.bf]=t.value;patchSection(s.id);
    const sm=t.closest(".bx-e");if(sm){const sn=sm.querySelector(".bx-eh small");if(sn)sn.textContent=bxSnippet(x.E);}});}
(function(){const _rr=renderRight;renderRight=function(){_rr.apply(this,arguments);const s=state.sections.find(x=>x.id===state.selected);if(!s||s.type!=="dx_build"||s.freeHtml)return;
  const cf=document.getElementById("contentFields");if(!cf||cf.querySelector("#bxPanel"))return;const ex=cf.querySelector("#epExtras");if(ex)ex.remove();
  const t=cf.querySelector(".paneltitle");(t||cf.firstChild)?(t||cf.firstChild).insertAdjacentHTML(t?"afterend":"beforebegin",bxPanelHTML(s)):cf.insertAdjacentHTML("afterbegin",bxPanelHTML(s));bxBind(cf,s);
  if(BX.open){const o=cf.querySelector(".bx-e.open");if(o&&o.scrollIntoView)try{o.scrollIntoView({block:"nearest"});}catch(_){}}};})();
(function(){const css=document.createElement("style");css.textContent=`
#bxPanel .bx-r{border:1px solid var(--line);border-radius:10px;padding:8px;margin:0 0 10px;background:rgba(127,127,127,.04)}#bxPanel .bx-rh,#bxPanel .bx-ch,#bxPanel .bx-eh{display:flex;align-items:center;gap:6px}#bxPanel .bx-rh{justify-content:space-between;margin-bottom:6px}
#bxPanel .bx-acts{display:flex;gap:2px;margin-left:auto}#bxPanel .bx-lays,#bxPanel .bx-addr{display:flex;flex-wrap:wrap;gap:4px;align-items:center;margin:0 0 8px}#bxPanel .bx-addr{margin:6px 0 10px;font-size:12px;color:var(--muted,#8a93a3)}
#bxPanel .bx-lay{border:1px solid var(--line);background:none;border-radius:7px;padding:3px 4px;color:inherit;line-height:0;cursor:pointer}#bxPanel .bx-lay.on,#bxPanel .bx-lay:hover{border-color:var(--acc,#7c6cff);color:var(--acc,#7c6cff)}
#bxPanel .bx-c{border:1px dashed var(--line);border-radius:8px;padding:6px;margin:6px 0}#bxPanel .bx-ch{margin-bottom:6px;flex-wrap:wrap}#bxPanel .bx-ch b{font-size:12px;margin-right:auto}#bxPanel .bx-ch select{width:auto;max-width:48%;font-size:11.5px;padding:2px 4px}
#bxPanel .bx-e{border:1px solid var(--line);border-radius:7px;margin:0 0 4px;background:var(--panel,#1b1e27)}#bxPanel .bx-eh{padding:5px 6px;cursor:pointer;font-size:12px}#bxPanel .bx-eh .k{font-weight:700;white-space:nowrap}#bxPanel .bx-eh small{color:var(--muted,#8a93a3);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0;flex:1}
#bxPanel .bx-e.open{border-color:var(--acc,#7c6cff)}#bxPanel .bx-eb{padding:6px 8px 2px;border-top:1px solid var(--line)}#bxPanel .bx-adde{display:flex;gap:4px;margin-top:4px}#bxPanel .bx-adde select{flex:1;min-width:0}
#bxPanel .bx-pres{display:flex;flex-wrap:wrap;gap:4px;margin:4px 0 10px}#bxPanel .bx-more summary{cursor:pointer;font-size:12px;color:var(--muted,#8a93a3);margin:4px 0}
.bx-ov .nc-ov-box{width:640px}.bx-ov .fld{margin-bottom:12px}.bx-ov .bx-st{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.bx-ov .bx-st label{display:flex;gap:8px;align-items:flex-start;border:1px solid var(--line);border-radius:10px;padding:10px;cursor:pointer;margin:0}
.bx-ov .bx-st input{margin-top:3px}.bx-ov .bx-st label:has(input:checked){border-color:var(--acc,#7c6cff);background:rgba(124,108,255,.08)}.bx-ov .bx-st small{display:block;color:var(--muted,#8a93a3);font-size:11.5px}.bx-ov .bx-go{display:flex;justify-content:flex-end;gap:8px;margin-top:6px}`;document.head.appendChild(css);})();

/* ---------- landing en blanco (predeterminada al abrir y en «Nueva landing») ---------- */
function ncBlankSections(){const mk=t=>({id:nid(),type:t,props:LIB[t].def(),style:{}});return [mk("da_nav"),mk("dx_build"),mk("da_footer"),mk("da_sticky")];}
/* ---------- nueva landing «Desde 0» ---------- */
const BX_START=[["empty","Sección vacía","Montas tú las filas y los elementos."],["hero-form","Hero · texto + formulario","Promesa, ventajas y formulario de llamada al lado."],["hero-center","Hero · centrado","Titular grande, botón y teléfono centrados."],["hero-img","Hero · texto + imagen","Texto, precio y botones con una foto al lado."]];
function bxNewOverlay(){let ov=document.getElementById("bxNewOv");
  if(!ov){ov=document.createElement("div");ov.id="bxNewOv";ov.className="nc-ov bx-ov";document.body.appendChild(ov);
    ov.addEventListener("click",e=>{if(e.target===ov||e.target.closest("[data-bxn=close]")){ov.style.display="none";return;}if(e.target.closest("[data-bxn=go]"))bxNewGo();});}
  const st=state.settings;const looks=Object.keys(LOOKS).sort((a,b)=>(a==="base"?-1:b==="base"?1:LOOKS[a].name.localeCompare(LOOKS[b].name)));
  ov.innerHTML=`<div class="nc-ov-box"><div class="nc-ov-head"><b>✦ Diseñar una landing desde 0</b><button class="btn sm ghost" data-bxn="close">Cerrar</button></div>
    <p class="help" style="margin:0 0 12px">Empiezas con lo mínimo para captar (cabecera con teléfono, tu sección, pie legal y barra fija en móvil) y construyes el resto con «✦ Sección desde 0» o con cualquier bloque.</p>
    <div class="row2"><div class="fld"><label>Marca</label><select id="bxnBrand">${Object.keys(BRANDS).map(k=>`<option value="${esc(k)}"${k===st.brand?" selected":""}>${esc(BRANDS[k].name||k)}</option>`).join("")}</select></div>
    <div class="fld"><label>Estilo de diseño</label><select id="bxnLook">${looks.map(k=>`<option value="${esc(k)}"${k===(st.look||"base")?" selected":""}>${esc(LOOKS[k].name)}</option>`).join("")}</select></div></div>
    <div class="fld"><label>Empezar con</label><div class="bx-st">${BX_START.map((x,i)=>`<label><input type="radio" name="bxnStart" value="${x[0]}"${i?"":" checked"}><span><b>${esc(x[1])}</b><small>${esc(x[2])}</small></span></label>`).join("")}</div></div>
    <div class="fld inline"><label>Incluir cabecera, pie legal y barra fija móvil</label><input type="checkbox" id="bxnSkel" checked></div>
    <div class="bx-go"><button class="btn ghost" data-bxn="close">Cancelar</button><button class="btn primary" data-bxn="go">Crear landing</button></div></div>`;
  ov.style.display="grid";}
function bxNewGo(){const ov=document.getElementById("bxNewOv");const brand=document.getElementById("bxnBrand").value,look=document.getElementById("bxnLook").value,start=(ov.querySelector("input[name=bxnStart]:checked")||{}).value||"empty",skel=document.getElementById("bxnSkel").checked;
  if(state.sections.length&&!confirm("¿Empezar una landing nueva desde 0? La actual queda en la nube si la guardaste; el borrador local se sustituye."))return;
  commit();if(typeof cloud!=="undefined")cloud.id=null;const ln=document.getElementById("landingName");if(ln)ln.value="";
  state.settings=Object.assign(JSON.parse(JSON.stringify(SETTINGS_DEFAULT)),{brand,look,lookBrandFont:state.settings.lookBrandFont});
  const mk=t=>({id:nid(),type:t,props:LIB[t].def(),style:{}});const b=mk("dx_build");
  state.sections=skel?[mk("da_nav"),b,mk("da_footer"),mk("da_sticky")]:[b];bxApplyPreset(b,start);
  state.selected=b.id;BX.open=null;past=[];future=[];if(typeof updHist==="function")updHist();if(typeof ws!=="undefined")ws.savedCloud=null;
  const bt=document.getElementById("brandTop");if(bt)bt.value=brand;ov.style.display="none";
  renderPalette();if(typeof setTab==="function")setTab("content");renderPreview();renderRight();if(typeof renderGlobal==="function")try{renderGlobal();}catch(_){}if(typeof wsOnChange==="function")try{wsOnChange();}catch(_){}
  toast("Landing desde 0 creada · constructor abierto a la derecha");}
(function(){const t=document.getElementById("btnTpl");if(t&&!document.getElementById("btnScratch")){const b=document.createElement("button");b.className="btn";b.id="btnScratch";b.title="Diseñar una landing desde 0";b.textContent="✦ Desde 0";b.addEventListener("click",bxNewOverlay);t.insertAdjacentElement("afterend",b);}
  /* listeners.js enlaza la versión original de openTplGallery: se llama a la actual (con los añadidos de equipo y «Desde 0») */
  if(t)t.addEventListener("click",e=>{e.stopImmediatePropagation();openTplGallery();},true);
  const _og=openTplGallery;openTplGallery=function(){_og.apply(this,arguments);const h=document.querySelector("#tplOverlay .nc-ov-head");if(h&&!h.querySelector("#tplScratch")){const b=document.createElement("button");b.className="btn sm primary";b.id="tplScratch";b.textContent="✦ Diseñar desde 0";b.style.marginRight="8px";
    b.addEventListener("click",()=>{document.getElementById("tplOverlay").style.display="none";bxNewOverlay();});h.insertBefore(b,h.querySelector("#tplTeamSave")||h.querySelector('[data-tg="close"]'));}};})();

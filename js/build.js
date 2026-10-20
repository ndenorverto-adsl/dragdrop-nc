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
const BX_KINDS=[["eyebrow","Etiqueta"],["heading","Titular"],["text","Texto"],["button","Botón"],["image","Imagen"],["list","Lista con checks"],["feature","Icono + título + texto"],["trust","Sellos de confianza"],["form","Formulario de llamada"],["price","Precio"],["video","Vídeo"],["spacer","Espacio / línea"],["html","HTML propio"],["block","Bloque del catálogo (calculadora, comparativa, FAQ…)"]];
const BX_DEF={eyebrow:{text:"{{ETIQUETA}}"},heading:{text:"Escribe aquí tu titular",hl:"",lvl:"h2",size:""},text:{text:"Explica en una o dos frases qué consigue el cliente.",size:""},
  button:{text:"Quiero informarme",act:"popup",url:"",style:"pri"},image:{src:"",alt:"",ratio:"",r:""},list:{items:"{{VENTAJA_1}}\n{{VENTAJA_2}}\n{{VENTAJA_3}}"},
  feature:{icon:"check",title:"{{VENTAJA}}",text:"Explica la ventaja en una frase.",dir:"row"},trust:{items:"star|{{VALORACION}} en {{PLATAFORMA_OPINIONES}}\nshield-check|{{SELLO_O_CERTIFICACION}}"},
  form:{title:"",fields:"tel",inline:"",btn:"Llamadme gratis",opts:"",micro:"Gratis|Sin compromiso"},price:{price:"{{PRECIO}}",unit:"€/mes",old:"",note:"{{NOTA_PRECIO}}"},
  video:{url:"",poster:""},spacer:{h:"24",line:""},html:{html:"<p>HTML propio</p>"},block:{type:"",props:{}}};
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
function bxEl(e,first){const a=(BXP?` data-bx="${e.id}" draggable="true"`:"")+(bxHasSt(e)?` data-bxe="${e.id}"`:"");
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
    if(!e.src)return BXP?`<div class="bx-imgph${e.ratio?" rt-"+e.ratio:""}${e.r==="999"?" r-999":""}" data-k="image"${a}>${ncIco("image")}<span><b>Haz clic o suelta aquí una imagen</b> (o elígela en el panel)</span></div>`:"";
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
  case "block":return bxEmbed(e,a);
  case "html":{let h=String(e.html||"");if(BXP)h=h.replace(/<script[\s\S]*?<\/script>/gi,"").replace(/\son\w+=("[^"]*"|'[^']*'|[^\s>]+)/gi,"");return BXP?`<div class="bx-html"${a}>${h}</div>`:h;}}
  return "";}
function bxColHTML(c,first){const E=arr(c.els);let h="",grp=[];const flush=()=>{if(grp.length){h+=`<div class="da-btns">${grp.join("")}</div>`;grp=[];}};
  E.forEach((e,i)=>{const x=bxEl(e,first&&i<4);if(e.k==="button")grp.push(x);else{flush();h+=x;}});flush();
  if(!E.length&&BXP)h=`<div class="bx-cph">Columna vacía · añade elementos en el panel</div>`;
  const st=c.st||"";const bgi=st==="img"&&c.bgImg?` style="--bxci:url('${String(c.bgImg).replace(/'/g,"%27")}')"`:"";
  return `<div class="bx-col${st?" st-"+st:""}${st==="card"?" da-card":""}${st==="img"&&c.dim?" dim-"+c.dim:""}${c.al?" al-"+c.al:""}"${BXP?` data-bxc="${c.id}"`:""}${bgi}>${h}</div>`;}
function bxRender(p){const R=arr(p.rows);const first=bxIsFirst(p);
  if(!R.length)return `<section class="da da-sec bx bx-empty">${BXP?`<div class="container"><div class="bx-ph"><b>✦ Sección desde 0</b><span>Elige un diseño de partida o añade una fila en el panel de la derecha (Contenido → Constructor).</span></div></div>`:""}</section>`;
  return `<section class="da da-sec bx w-${p.width||"normal"}${p.minh?" mh mh-"+p.minh:""}"><div class="container">${R.map((r,ri)=>`<div${(r.mt!==undefined&&r.mt!=="")||(r.mtM!==undefined&&r.mtM!=="")?` data-bxr="${r.id}"`:""} class="bx-row l-${r.lay||"1"} g-${r.gap||"M"} va-${r.va||"center"} m-${r.m||"stack"}">${arr(r.cols).map(c=>bxColHTML(c,first&&ri===0)).join("")}</div>`).join("")}</div></section>`;}

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
.bx-lnk{font-weight:700;color:var(--bpt,var(--bp));text-decoration:underline;text-underline-offset:3px}
.bx-col.st-img{position:relative;padding:clamp(22px,3.4vw,40px);border-radius:var(--cardr,18px);background:var(--ink0,#15151a) var(--bxci,none) center/cover no-repeat;min-height:260px;justify-content:flex-end;overflow:hidden;--bink:#fff;--bmuted:rgba(255,255,255,.86);--bpt:#fff;--dline:rgba(255,255,255,.25);color:#fff}
.bx-col.st-img::before{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 30%,rgba(0,0,0,.45));pointer-events:none}.bx-col.st-img.dim-s::before{background:rgba(0,0,0,.25)}.bx-col.st-img.dim-m::before{background:rgba(0,0,0,.45)}.bx-col.st-img.dim-l::before{background:rgba(0,0,0,.65)}.bx-col.st-img>*{position:relative}
.bx-col.st-img .da-btn.sec{color:#fff;border-color:rgba(255,255,255,.8);background:transparent}
.bx-embed{width:100%}html body .bx-embed>*,html body .bx-embed>.nc-s>*{padding-top:0!important;padding-bottom:0!important;margin-top:0!important;margin-bottom:0!important;background:transparent!important;background-image:none!important;min-height:0!important;box-shadow:none!important;border:0!important}
html body .bx-embed .container{max-width:none!important;padding-left:0!important;padding-right:0!important;width:100%!important}html body .bx-embed .row{--bs-gutter-x:1.25rem}
html body .bx-row:not(.l-1) .bx-embed .row>[class*="col-"]{flex:0 0 100%!important;max-width:100%!important;width:100%!important}html body .bx-row:not(.l-1) .bx-embed .da-h2{font-size:clamp(24px,2.4vw,32px)}`;}
const BX_PREV_CSS=`.bx-ph{display:flex;flex-direction:column;gap:6px;align-items:center;text-align:center;padding:56px 20px;border:2px dashed rgba(110,90,255,.45);border-radius:18px;color:#6b6f80;background:rgba(110,90,255,.04);font-size:15px}.bx-ph b{font-size:18px;color:#6E5AFF}
.bx-cph,.bx-imgph{display:flex;flex-direction:column;gap:8px;align-items:center;justify-content:center;text-align:center;width:100%;min-height:120px;padding:18px;border:2px dashed rgba(127,127,127,.35);border-radius:14px;color:#8a8f9e;font-size:13.5px}.bx-imgph .nci{width:28px;height:28px}
.bx-imgph.r-999{aspect-ratio:1/1;border-radius:50%;max-width:320px;min-height:0}.bx-imgph[data-k="image"]{cursor:pointer;transition:background .15s,border-color .15s}.bx-imgph[data-k="image"]:hover,.bx-imgph.bx-over{border-color:#6E5AFF;background:rgba(110,90,255,.08);color:#6E5AFF}
.bx-ind{position:absolute;z-index:99999;background:#6E5AFF;border-radius:3px;pointer-events:none;box-shadow:0 0 0 3px rgba(110,90,255,.25)}.bx-drg{opacity:.35}
[data-sec].sel [data-bx]{cursor:grab}[data-sec].sel [data-bx]:hover{outline:1.5px dashed rgba(110,90,255,.6);outline-offset:3px}[data-bx].bx-on{outline:2px solid #6E5AFF!important;outline-offset:3px}`;
const BX_PREV_JS=`(function(){if(window.__free)return;
function selSec(n){var sec=n&&n.closest&&n.closest('[data-sec]');return sec&&sec.classList.contains('sel')?sec:null;}
document.addEventListener('click',function(e){var ph=e.target.closest&&e.target.closest('.bx-imgph[data-bx]');var sec=selSec(ph);
  if(ph&&sec&&ph.getAttribute('data-k')==='image'){e.preventDefault();parent.postMessage({nc:'bximg',id:sec.getAttribute('data-sec'),el:ph.getAttribute('data-bx')},'*');}
  var el=e.target.closest&&e.target.closest('[data-bx]');sec=selSec(el);if(!el||!sec)return;
  document.querySelectorAll('.bx-on').forEach(function(x){x.classList.remove('bx-on');});el.classList.add('bx-on');parent.postMessage({nc:'bxsel',id:sec.getAttribute('data-sec'),el:el.getAttribute('data-bx')},'*');},true);
/* arrastrar elementos: a otra posición, a otra columna o a otra «Sección desde 0» */
var drag=null,ind=null,tgt=null;function clr(){if(ind&&ind.parentNode)ind.parentNode.removeChild(ind);ind=null;tgt=null;}
function hz(el){var p=el.parentElement;return p&&p.classList.contains('da-btns');}
document.addEventListener('dragstart',function(e){var el=e.target.closest&&e.target.closest('[data-bx]');if(!el)return;
  if(!selSec(el)||el.closest('[contenteditable="true"]')){e.preventDefault();e.stopPropagation();return;}
  e.stopPropagation();drag=el;el.classList.add('bx-drg');try{e.dataTransfer.effectAllowed='move';e.dataTransfer.setData('text/plain','bx');}catch(_){}},true);
document.addEventListener('dragend',function(){if(drag)drag.classList.remove('bx-drg');drag=null;clr();},true);
document.addEventListener('dragover',function(e){var files=e.dataTransfer&&[].indexOf.call(e.dataTransfer.types||[],'Files')>-1;
  if(files){var ph=e.target.closest&&e.target.closest('.bx-imgph[data-k="image"]');if(ph){e.preventDefault();ph.classList.add('bx-over');}return;}
  if(!drag)return;var t=e.target.closest&&e.target.closest('[data-bx],[data-bxc]');if(!t||t===drag||drag.contains(t))return;var sec=t.closest('[data-sec]');if(!sec||!t.closest('.bx'))return;
  e.preventDefault();e.stopPropagation();var r=t.getBoundingClientRect(),isCol=t.hasAttribute('data-bxc')&&!t.hasAttribute('data-bx'),after;
  if(isCol){after=true;}else if(hz(t)){after=e.clientX>r.left+r.width/2;}else{after=e.clientY>r.top+r.height/2;}
  if(!ind){ind=document.createElement('div');ind.className='bx-ind';document.body.appendChild(ind);}
  var y=isCol?(t.lastElementChild?t.lastElementChild.getBoundingClientRect().bottom+4:r.top+8):(after?r.bottom+3:r.top-3);
  if(hz(t)&&!isCol){ind.style.cssText='left:'+((after?r.right:r.left)+scrollX-2)+'px;top:'+(r.top+scrollY)+'px;width:4px;height:'+r.height+'px';}
  else{var cr=(isCol?t:t.closest('[data-bxc]')||t).getBoundingClientRect();ind.style.cssText='left:'+(cr.left+scrollX)+'px;top:'+(y+scrollY-2)+'px;width:'+cr.width+'px;height:4px';}
  tgt={sec:sec.getAttribute('data-sec'),col:(t.closest('[data-bxc]')||{getAttribute:function(){return null;}}).getAttribute('data-bxc'),ref:isCol?null:t.getAttribute('data-bx'),after:after};},true);
document.addEventListener('dragleave',function(e){var ph=e.target.closest&&e.target.closest('.bx-imgph');if(ph)ph.classList.remove('bx-over');},true);
document.addEventListener('drop',function(e){var files=e.dataTransfer&&e.dataTransfer.files&&e.dataTransfer.files.length;
  if(files){var ph=e.target.closest&&e.target.closest('.bx-imgph[data-k="image"]');var sec=ph&&ph.closest('[data-sec]');if(ph&&sec){e.preventDefault();e.stopPropagation();ph.classList.remove('bx-over');parent.postMessage({nc:'bximg',id:sec.getAttribute('data-sec'),el:ph.getAttribute('data-bx'),file:e.dataTransfer.files[0]},'*');}return;}
  if(!drag||!tgt)return;e.preventDefault();e.stopPropagation();var m={nc:'bxmove',el:drag.getAttribute('data-bx'),to:tgt.sec,col:tgt.col,ref:tgt.ref,after:tgt.after};drag.classList.remove('bx-drg');drag=null;clr();parent.postMessage(m,'*');},true);
})();`;
/* ---------- estilos por elemento (tamaño, espacio, ancho, posición, color) ---------- */
function bxHasSt(e){return !!(e&&e.st&&Object.keys(e.st).length);}
function bxStClean(e){if(!e.st)return;Object.keys(e.st).forEach(k=>{if(e.st[k]===""||e.st[k]==null)delete e.st[k];});if(!Object.keys(e.st).length)delete e.st;}
function bxEach(s,fn){arr(s.props&&s.props.rows).forEach(r=>arr(r.cols).forEach(c=>arr(c.els).forEach(e=>fn(e,c,r))));}
function bxFs(s,e){try{const d=document.getElementById("pv").contentDocument;const el=d.querySelector('[data-bx="'+e.id+'"]');if(el)return Math.round(parseFloat(getComputedStyle(el).fontSize)||16);}catch(_){}return 16;}
function bxStCSS(){const D=[],M=[];const n=v=>{const x=parseFloat(v);return isNaN(x)?null:x;};
  state.sections.forEach(s=>{if(s.type!=="dx_build")return;
    arr(s.props.rows).forEach(r=>{const a=n(r.mt),b=n(r.mtM);if(a!=null)D.push(`.bx [data-bxr="${r.id}"]{margin-top:${a}px!important}`);if(b!=null)M.push(`.bx [data-bxr="${r.id}"]{margin-top:${b}px!important}`);});
    bxEach(s,e=>{const o=e.st;if(!o)return;const sel=`.bx [data-bxe="${e.id}"]`,d=[],m=[];const pct=/^(image|video|form|block)$/.test(e.k);
      if(n(o.mt)!=null)d.push(`margin-top:${n(o.mt)}px`);if(n(o.mb)!=null)d.push(`margin-bottom:${n(o.mb)}px`);if(n(o.fs)!=null)d.push(`font-size:${n(o.fs)}px`);
      if(n(o.w)!=null)d.push(pct?`width:${Math.max(5,Math.min(100,n(o.w)))}%;max-width:${Math.max(5,Math.min(100,n(o.w)))}%`:`max-width:${n(o.w)}px;width:100%`);
      if(o.al){d.push(`align-self:${o.al==="left"?"flex-start":o.al==="right"?"flex-end":"center"};text-align:${o.al}`);if(o.al==="center")d.push("margin-left:auto;margin-right:auto");}
      if(/^#[0-9a-f]{3,8}$/i.test(o.color||""))d.push(`color:${o.color}`);
      if(n(o.mtM)!=null)m.push(`margin-top:${n(o.mtM)}px`);if(n(o.mbM)!=null)m.push(`margin-bottom:${n(o.mbM)}px`);if(n(o.fsM)!=null)m.push(`font-size:${n(o.fsM)}px`);
      if(d.length)D.push(`${sel}{${d.map(x=>x.split(";").map(y=>y+"!important").join(";")).join(";")}}`);if(n(o.fs)!=null)D.push(`${sel} *:not(.nci):not(svg):not(path){font-size:inherit}`);
      if(m.length)M.push(`${sel}{${m.map(x=>x+"!important").join(";")}}`);});});
  return D.join("\n")+(M.length?`\n@media (max-width:767px){${M.join("\n")}}`:"");}
function bxLive(rows){try{const d=document.getElementById("pv").contentDocument;let st=d.getElementById("bx-st");if(!st){st=d.createElement("style");st.id="bx-st";d.head.appendChild(st);}st.textContent=bxStCSS();
  /* las filas necesitan su marca data-bxr: si es la primera vez, se repinta la sección */
  if(rows){const s=state.sections.find(x=>x.id===state.selected);if(s&&s.type==="dx_build"&&arr(s.props.rows).some(r=>(r.mt||r.mtM)&&!d.querySelector('[data-bxr="'+r.id+'"]')))patchSection(s.id);}
  const s2=state.sections.find(x=>x.id===state.selected);if(s2&&s2.type==="dx_build"){let need=false;bxEach(s2,e=>{if(bxHasSt(e)&&!d.querySelector('[data-bxe="'+e.id+'"]'))need=true;});if(need)patchSection(s2.id);}}catch(_){}}
/* ---------- bloques del catálogo dentro de una columna ---------- */
function bxEmbed(e,a){const L=e.type&&LIB[e.type];if(!L)return BXP?`<div class="bx-cph"${a}>Elige el bloque en el panel (Contenido → este elemento)</div>`:"";
  const props=Object.assign({},L.def(),e.props||{});let inner="";
  try{if(L.raw&&/^d[abcx]_/.test(e.type))inner=v4Wrap({style:{}},L.render(Object.assign({},typeof ncVoiceProps==="function"?ncVoiceProps(e.type,props):props,{_st:v4Style({style:{}})})));
    else if(L.raw)inner=L.render(props);else inner=secOpen(styleOf({type:e.type,style:{}}))+L.render(props)+secClose();}catch(err){inner=BXP?`<div class="bx-cph">No se pudo mostrar este bloque</div>`:"";}
  return `<div class="bx-embed bxe-${e.type}"${a}>${inner}</div>`;}
(function(){const _rs=renderSection;renderSection=function(s){if(s&&s._virt)return "";return _rs.apply(this,arguments);};})();
(function(){const _bd=buildDoc;buildDoc=function(forExport){
  /* los bloques metidos dentro de columnas cuentan como «usados» para que su CSS y su JS salgan en la página */
  const V=[];state.sections.forEach(s=>{if(s.type==="dx_build"&&!(forExport&&s.hidden))bxEach(s,e=>{if(e.k==="block"&&LIB[e.type])V.push({id:"__v"+V.length,type:e.type,props:Object.assign({},LIB[e.type].def(),e.props||{}),style:{},_virt:1});});});
  const bak=state.sections;if(V.length)state.sections=bak.concat(V);
  BXP=!forExport;let h;try{h=_bd.apply(this,arguments);}finally{BXP=true;state.sections=bak;}
  if(V.length)h=h.replace(/<div data-sec="__v\d+"[^>]*><\/div>\n?/g,"");
  h=bxDedupeIds(h);
  if(!state.sections.some(s=>s.type==="dx_build"&&!(forExport&&s.hidden)))return h;
  h=h.replace("</head>",`<style>${ncBxCSS()}${forExport?"":BX_PREV_CSS}</style><style id="bx-st">${bxStCSS()}</style></head>`);
  if(!forExport&&!state.freeMode)h=h.replace(/<\/body>(?![\s\S]*<\/body>)/,`<script>${BX_PREV_JS}<\/script></body>`);return h;};})();
/* ids repetidos entre secciones (p. ej. dos calculadoras, o el formulario del constructor y el de otro bloque): en cada sección
   que repite un id, ese id y sus referencias (for, href="#…", aria-*, data-bs-target) pasan a «id-2», «id-3»… */
function bxDedupeIds(h){const parts=h.split(/(?=<div data-sec=")/);if(parts.length<3)return h;const seen={};
  return parts.map((c,i)=>{if(!i)return c;const ids=[...new Set((c.match(/\sid="([^"]+)"/g)||[]).map(x=>x.slice(5,-1)))];
    ids.forEach(id=>{if(!seen[id]){seen[id]=1;return;}seen[id]++;const nid2=id+"-"+seen[id];const e=id.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
      c=c.replace(new RegExp('(\\s(?:id|for|aria-labelledby|aria-describedby|aria-controls)=")'+e+'(")',"g"),"$1"+nid2+"$2").replace(new RegExp('((?:href|data-bs-target|data-target)="#)'+e+'(")',"g"),"$1"+nid2+"$2");});
    return c;}).join("");}
/* mover elementos arrastrados en el lienzo / soltar imágenes en un hueco */
function bxLocate(eid){let f=null;state.sections.forEach(s=>{if(s.type!=="dx_build")return;arr(s.props.rows).forEach(r=>arr(r.cols).forEach(c=>{const i=arr(c.els).findIndex(e=>e.id===eid);if(i>-1)f={s,c,i,e:c.els[i]};}));});return f;}
window.addEventListener("message",ev=>{const d=ev.data;if(!d)return;
  if(d.nc==="bxmove"){const src=bxLocate(d.el);const ts=state.sections.find(x=>x.id===d.to);if(!src||!ts||ts.type!=="dx_build")return;
    let col=null;arr(ts.props.rows).forEach(r=>arr(r.cols).forEach(c=>{if(c.id===d.col)col=c;}));if(!col&&d.ref){const rl=bxLocate(d.ref);if(rl)col=rl.c;}if(!col)return;
    commit();const el=src.c.els.splice(src.i,1)[0];let idx=col.els.length;if(d.ref){const j=col.els.findIndex(e=>e.id===d.ref);if(j>-1)idx=j+(d.after?1:0);}col.els.splice(idx,0,el);
    BX.open=el.id;state.selected=ts.id;renderPreview();renderRight();toast("Elemento movido");}
  if(d.nc==="bximg"){const L=bxLocate(d.el);if(!L||L.e.k!=="image")return;const apply=url=>{commit();L.e.src=url;BX.open=L.e.id;renderPreview();renderRight();toast("Imagen añadida");};
    if(d.file){readImg(d.file,apply);return;}if(window.NC_MEDIA){NC_MEDIA.open({accept:"image",cb:apply});return;}const fi=document.createElement("input");fi.type="file";fi.accept="image/*";fi.onchange=e2=>readImg(e2.target.files[0],apply);fi.click();}});

/* ---------- edición en el lienzo (doble clic) ---------- */
function bxFind(s,eid){let f=null;arr(s.props.rows).forEach(r=>arr(r.cols).forEach(c=>arr(c.els).forEach(e=>{if(e.id===eid)f=e;})));return f;}
(function(){const _c=ncvCands;ncvCands=function(s){const C=_c.apply(this,arguments);if(!s||s.type!=="dx_build")return C;const norm=v=>String(v||"").replace(/\s+/g," ").trim();
  const addT=(t,p)=>{t=norm(t);if(t.length<2||/^(https?:|data:)/.test(t))return;if(!C.txt.has(t))C.txt.set(t,[]);C.txt.get(t).push(p);};
  arr(s.props.rows).forEach(r=>arr(r.cols).forEach(c=>arr(c.els).forEach(e=>{const b="bx:"+e.id+":";
    ["text","hl","title","btn","note","price","unit"].forEach(k=>{if(typeof e[k]==="string"&&e[k]&&!(e.k==="form"&&k==="text")){if(/\n/.test(e[k]))e[k].split("\n").forEach((ln,li)=>addT(ln,b+k+"|"+li));else addT(e[k],b+k);}});
    if(e.k==="list")v4L(e.items).forEach((ln,li)=>addT(ln,b+"items|"+li));
    if(e.k==="trust")v4L(e.items).forEach((ln,li)=>{const cc=v4C(ln);if(cc.length>1)addT(cc.slice(1).join(" · "),b+"items|"+li+"|1");else addT(cc[0],b+"items|"+li);});
    if(e.k==="image"&&e.src&&!C.img.has(e.src))C.img.set(e.src,b+"src");
    if(e.k==="block"&&LIB[e.type]){const L=LIB[e.type],P=Object.assign({},L.def(),e.props||{}),pb="bxp:"+e.id+":";(L.fields||[]).forEach(f=>{if(!f||!f.k||f.t==="select"||f.t==="repeater"||f.t==="image"||f.t==="photo"||f.t==="images"||f.t==="color")return;const v=P[f.k];if(typeof v!=="string"||!v)return;
      if(v.indexOf("\n")>-1||f.t==="ta")v.split("\n").forEach((ln,li)=>{if(ln.indexOf("|")>-1)ln.split("|").forEach((cc,ci)=>addT(cc,pb+f.k+"|"+li+"|"+ci));else addT(ln,pb+f.k+"|"+li);});else addT(v,pb+f.k);});}})));return C;};
  const _s=ncvSet;ncvSet=function(props,path,val){const m=String(path).match(/^bx(p?):(\w+):(\w+)(?:\|(\d+))?(?:\|(\d+))?$/);if(!m)return _s.apply(this,arguments);
    let el0=null;arr(props.rows).forEach(r=>arr(r.cols).forEach(c=>arr(c.els).forEach(e=>{if(e.id===m[2])el0=e;})));if(!el0)return;let el=el0;
    if(m[1]==="p"){el0.props=Object.assign(LIB[el0.type]?LIB[el0.type].def():{},el0.props||{});el=el0.props;}m.splice(1,1);
    if(m[3]==null){el[m[2]]=val;return;}const L=String(el[m[2]]||"").split("\n");if(m[4]!=null){const cc=(L[+m[3]]||"").split("|");cc[+m[4]]=String(val).replace(/\|/g,"/");L[+m[3]]=cc.join("|");}else L[+m[3]]=val;el[m[2]]=L.join("\n");};})();
window.addEventListener("message",e=>{const d=e.data;if(!d||d.nc!=="bxsel")return;const s=state.sections.find(x=>x.id===d.id);if(!s||s.type!=="dx_build")return;BX.open=d.el;state.selected=s.id;
  if(state.tab==="content")renderRight();});

/* ---------- panel «Constructor» ---------- */
function bxScroller(el){for(let n=el;n;n=n.parentElement){const cs=getComputedStyle(n);if(/(auto|scroll)/.test(cs.overflowY)&&n.scrollHeight>n.clientHeight)return n;}return null;}
function bxSnippet(e){const t=e.text||e.title||e.price||(e.items?String(e.items).split("\n")[0].split("|").pop():"")||(e.src?"(imagen)":"")||e.url||e.btn||"";return String(t).replace(/\s+/g," ").slice(0,38);}
function bxSel(name,opts,cur,attr){return `<select ${attr}>${opts.map(([v,t])=>`<option value="${esc(v)}"${String(cur||"")===v?" selected":""}>${esc(t)}</option>`).join("")}</select>`;}
function bxLaySvg(l){const P=l.split("-").map(Number),T=P.reduce((a,b)=>a+b,0);let x=1;return `<svg viewBox="0 0 40 18" width="40" height="18" aria-hidden="true">${P.map(n=>{const w=(38-(P.length-1)*2)*n/T;const r=`<rect x="${x}" y="2" width="${w}" height="14" rx="2" fill="currentColor" opacity=".55"/>`;x+=w+2;return r;}).join("")}</svg>`;}
function bxNumF(k,l,v,step){return `<div class="fld"><label>${esc(l)}</label><div class="bx-num"><button type="button" class="mini" data-bsd="${k}|-${step||8}" title="Menos">−</button><input type="number" data-bs="${k}" value="${esc(v==null?"":v)}" placeholder="–" title="Vacío = automático"><button type="button" class="mini" data-bsd="${k}|${step||8}" title="Más">+</button></div></div>`;}
function bxBlockTypes(){return ORDER.filter(t=>LIB[t]&&t!=="dx_build"&&!LIB[t].hidden&&!/(_nav|_topbar|navbar|subnav|_footer|footcols|_sticky|infobar|_wa|_exit|thanks)$/.test(t)&&t!=="imported");}
function bxElPanel(e){const F=BX_F[e.k]||[];let h="";
  if(e.k==="block"){const T=bxBlockTypes();const G=typeof PAL_GOALS!=="undefined"?PAL_GOALS:[["all","Bloques",""]];
    h+=`<div class="fld"><label>Bloque</label><select data-btype><option value="">— Elige un bloque —</option>${G.map(g=>{const L=T.filter(t=>(typeof palGoal==="function"?palGoal(t):"all")===g[0]);return L.length?`<optgroup label="${esc(g[1])}">${L.map(t=>`<option value="${t}"${e.type===t?" selected":""}>${esc(LIB[t].label.replace(/^[ABC] · |^✚ /,""))}</option>`).join("")}</optgroup>`:"";}).join("")}</select></div>
      ${e.type&&LIB[e.type]?`<div class="bx-blk" data-blk></div><button type="button" class="btn sm ghost" data-ba="eout" title="Lo saca de esta sección y lo deja como sección propia, justo debajo">⤓ Sacar a su propia sección</button>`:`<div class="help">Mete aquí cualquier bloque del catálogo (calculadora, comparativa, cobertura, FAQ, opiniones…) dentro de esta columna.</div>`}`;
    return h+bxStPanel(e);}
  if(e.k==="image")h+=`<div class="thumbrow">${e.src?`<img class="thumb" src="${esc(e.src)}" alt="">`:""}<button type="button" class="btn sm" data-ba="img">${e.src?"Cambiar":"Subir"}</button>${window.NC_MEDIA?`<button type="button" class="btn sm" data-ba="lib">🗂 Biblioteca</button>`:""}${e.src?`<button type="button" class="btn sm ghost" data-ba="noimg">Quitar</button>`:""}</div>`;
  F.forEach(([k,l,t])=>{if(e.k==="button"&&k==="url"&&e.act!=="url")return;if(e.k==="form"&&k==="inline"&&(e.fields||"tel")!=="tel")return;
    h+=`<div class="fld"><label>${esc(l)}</label>${Array.isArray(t)?bxSel(k,t,e[k],`data-bf="${k}"`):t==="ta"?`<textarea data-bf="${k}" rows="${k==="html"?6:3}">${esc(e[k]||"")}</textarea>`:`<input data-bf="${k}" value="${esc(e[k]||"")}">`}</div>`;});
  return h+bxStPanel(e);}
/* tamaño, espacio, ancho, alineación y color de cada elemento (escritorio y móvil) */
function bxStPanel(e){const o=e.st||{};const txt=!/^(image|video|spacer|form|block|html)$/.test(e.k);const n=Object.keys(o).length;
  return `<details class="bx-stp" open><summary>📐 Tamaño, espacio y posición${n?` <span class="tag">${n}</span>`:""}</summary>
    <div class="row2">${bxNumF("mt","Espacio encima (px)",o.mt)}${bxNumF("mb","Espacio debajo (px)",o.mb)}</div>
    <div class="row2">${bxNumF("mtM","Encima en móvil",o.mtM)}${bxNumF("mbM","Debajo en móvil",o.mbM)}</div>
    ${txt?`<div class="row2">${bxNumF("fs","Tamaño de letra (px)",o.fs,2)}${bxNumF("fsM","Letra en móvil (px)",o.fsM,2)}</div>`:""}
    <div class="row2">${bxNumF("w",/^(image|video|form|block)$/.test(e.k)?"Ancho (%)":"Ancho máximo (px)",o.w,/^(image|video|form|block)$/.test(e.k)?5:20)}<div class="fld"><label>Posición</label>${bxSel("al",[["","Del bloque"],["left","Izquierda"],["center","Centro"],["right","Derecha"]],o.al,'data-bs="al"')}</div></div>
    ${txt?`<div class="fld bx-colf"><label>Color del texto</label><input type="color" data-bs="color" value="${/^#[0-9a-f]{6}$/i.test(o.color||"")?o.color:"#222222"}"><button type="button" class="mini" data-bsx="color" title="Quitar el color">⟲</button></div>`:""}
    <div class="bx-mv"><button type="button" class="btn sm ghost" data-ba="eprev" title="Mover a la columna anterior">◂ Columna anterior</button><button type="button" class="btn sm ghost" data-ba="enext" title="Mover a la columna siguiente">Columna siguiente ▸</button>${n?`<button type="button" class="btn sm ghost" data-ba="stclr">⟲ Quitar ajustes</button>`:""}</div>
    <div class="help">También puedes arrastrar el elemento en el lienzo a otra posición o columna.</div></details>`;}
function bxPanelHTML(s){const R=arr(s.props.rows);const lbl=k=>(BX_KINDS.find(x=>x[0]===k)||["",k])[1];
  const pres=`<div class="bx-pres">${BX_PRESETS.filter(p=>p[0]!=="empty").map(p=>`<button type="button" class="chipf sm" data-bpre="${p[0]}">${esc(p[1])}</button>`).join("")}</div>`;
  let h=`<div id="bxPanel" class="ep-g"><div class="paneltitle" style="padding:0 0 6px">✦ Constructor</div>`;
  if(!R.length)h+=`<div class="help" style="margin:0 0 8px">Empieza con un diseño de partida (se rellena con textos de ejemplo y {{PLACEHOLDERS}}) o añade una fila vacía abajo.</div>${pres}`;
  R.forEach((r,ri)=>{h+=`<div class="bx-r" data-r="${ri}"><div class="bx-rh"><b>Fila ${ri+1}</b><span class="bx-acts"><button type="button" class="mini" data-ba="rup" ${ri?"":"disabled"} title="Subir">↑</button><button type="button" class="mini" data-ba="rdown" ${ri<R.length-1?"":"disabled"} title="Bajar">↓</button><button type="button" class="mini" data-ba="rdup" title="Duplicar">⧉</button><button type="button" class="mini" data-ba="rdel" title="Quitar fila">✕</button></span></div>
    <div class="bx-lays">${BX_LAYS.map(([l,t])=>`<button type="button" class="bx-lay${(r.lay||"1")===l?" on":""}" data-ba="lay" data-v="${l}" title="${esc(t)}">${bxLaySvg(l)}</button>`).join("")}</div>
    <div class="row2"><div class="fld"><label>Separación</label>${bxSel("gap",[["0","Sin separación"],["S","Pequeña"],["M","Normal"],["L","Grande"]],r.gap||"M",'data-bxrf="gap"')}</div><div class="fld"><label>Alineación vertical</label>${bxSel("va",[["start","Arriba"],["center","Centro"],["end","Abajo"],["stretch","Misma altura"]],r.va||"center",'data-bxrf="va"')}</div></div>
    <div class="row2"><div class="fld"><label>Espacio encima de la fila (px)</label><input type="number" data-bxrn="mt" value="${esc(r.mt||"")}" placeholder="auto"></div><div class="fld"><label>En móvil (px)</label><input type="number" data-bxrn="mtM" value="${esc(r.mtM||"")}" placeholder="auto"></div></div>
    ${(r.lay||"1")!=="1"?`<div class="fld"><label>En móvil</label>${bxSel("m",[["stack","Una debajo de otra"],["rev","Una debajo de otra, orden inverso"],["two","Dos por fila"]],r.m||"stack",'data-bxrf="m"')}</div>`:""}`;
    arr(r.cols).forEach((c,ci)=>{const E=arr(c.els);h+=`<div class="bx-c" data-c="${ci}"><div class="bx-ch"><b>${arr(r.cols).length>1?"Columna "+(ci+1):"Contenido"}</b>${bxSel("st",[["","Sin fondo"],["card","Tarjeta"],["soft","Fondo suave"],["brand","Color de marca"],["ink","Oscuro"],["img","Imagen de fondo"]],c.st,'data-cf="st" title="Fondo de la columna"')}${bxSel("al",[["","Alinear: del bloque"],["left","Izquierda"],["center","Centro"],["right","Derecha"]],c.al,'data-cf="al" title="Alineación"')}</div>
      ${c.st==="img"?`<div class="thumbrow" style="margin:0 0 6px">${c.bgImg?`<img class="thumb" src="${esc(c.bgImg)}" alt="">`:""}<button type="button" class="btn sm" data-ba="cimg">${c.bgImg?"Cambiar imagen":"Subir imagen"}</button>${window.NC_MEDIA?`<button type="button" class="btn sm" data-ba="clib">🗂 Biblioteca</button>`:""}${bxSel("dim",[["","Sin oscurecer"],["s","Oscurecer poco"],["m","Oscurecer medio"],["l","Oscurecer mucho"]],c.dim,'data-cf="dim"')}</div>`:""}`;
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
    if(a==="cimg"){const fi=document.createElement("input");fi.type="file";fi.accept="image/*";fi.onchange=e2=>readImg(e2.target.files[0],url=>{commit();x.C.bgImg=url;re();});fi.click();return;}
    if(a==="clib"&&window.NC_MEDIA){NC_MEDIA.open({accept:"image",cb:url=>{commit();x.C.bgImg=url;re();}});return;}
    if(a==="eout"){commit();const E0=x.C.els.splice(x.ei,1)[0];const i=state.sections.findIndex(z=>z.id===s.id);const ns={id:nid(),type:E0.type,props:Object.assign(LIB[E0.type].def(),E0.props||{}),style:{}};state.sections.splice(i+1,0,ns);state.selected=ns.id;renderPreview();renderRight();toast("Bloque sacado a su propia sección");return;}
    if(a==="eprev"||a==="enext"){const flat=[];p.rows.forEach(r=>arr(r.cols).forEach(c=>flat.push(c)));const k=flat.indexOf(x.C)+(a==="enext"?1:-1);if(k<0||k>=flat.length){toast(a==="enext"?"Ya está en la última columna":"Ya está en la primera columna");return;}commit();const E0=x.C.els.splice(x.ei,1)[0];flat[k].els.push(E0);BX.open=E0.id;re();return;}
    if(a==="stclr"){commit();delete x.E.st;re();return;}
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
  P.addEventListener("click",ev=>{const b=ev.target.closest("[data-bsd],[data-bsx]");if(!b)return;const x=at(b);if(!x.E)return;commit();x.E.st=x.E.st||{};
    if(b.dataset.bsx){delete x.E.st[b.dataset.bsx];}else{const [k,d]=b.dataset.bsd.split("|");const cur=parseFloat(x.E.st[k]);const base=isNaN(cur)?(/^fs/.test(k)?bxFs(s,x.E):(k==="w"?100:0)):cur;x.E.st[k]=String(Math.round(base+(+d)));const inp=b.parentElement.querySelector("input");if(inp)inp.value=x.E.st[k];}
    bxStClean(x.E);bxLive();});
  P.addEventListener("change",ev=>{const t=ev.target;const x=at(t);
    if(t.dataset.btype!==undefined&&t.hasAttribute("data-btype")){commit();x.E.type=t.value;x.E.props={};if(t.value&&LIB[t.value]){x.E.props=LIB[t.value].def();try{const fake={type:t.value,props:x.E.props};if(typeof palPreset==="function")palPreset(fake);}catch(_){}}re();return;}
    if(t.dataset.bs==="al"){commit();x.E.st=x.E.st||{};x.E.st.al=t.value;bxStClean(x.E);bxLive();return;}
    if(t.dataset.bxrf){commit();x.R[t.dataset.bxrf]=t.value;re();return;}
    if(t.dataset.cf){commit();x.C[t.dataset.cf]=t.value;re();return;}
    if(t.dataset.bf&&t.tagName==="SELECT"){commit();x.E[t.dataset.bf]=t.value;re();}});
  P.addEventListener("input",ev=>{const t=ev.target;
    if(t.dataset.bs&&t.tagName!=="SELECT"){const x=at(t);if(!x.E)return;commitDebounced();x.E.st=x.E.st||{};x.E.st[t.dataset.bs]=t.value;bxStClean(x.E);bxLive();return;}
    if(t.dataset.bxrn){const x=at(t);commitDebounced();x.R[t.dataset.bxrn]=t.value;bxLive(true);return;}
    if(!t.dataset.bf||t.tagName==="SELECT")return;const x=at(t);commitDebounced();x.E[t.dataset.bf]=t.value;patchSection(s.id);
    const sm=t.closest(".bx-e");if(sm){const sn=sm.querySelector(".bx-eh small");if(sn)sn.textContent=bxSnippet(x.E);}});}
(function(){const _rr=renderRight;renderRight=function(){_rr.apply(this,arguments);const s=state.sections.find(x=>x.id===state.selected);if(!s||s.type!=="dx_build"||s.freeHtml)return;
  const cf=document.getElementById("contentFields");if(!cf||cf.querySelector("#bxPanel"))return;const ex=cf.querySelector("#epExtras");if(ex)ex.remove();
  const t=cf.querySelector(".paneltitle");(t||cf.firstChild)?(t||cf.firstChild).insertAdjacentHTML(t?"afterend":"beforebegin",bxPanelHTML(s)):cf.insertAdjacentHTML("afterbegin",bxPanelHTML(s));bxBind(cf,s);
  const bk=cf.querySelector("[data-blk]");if(bk&&BX.open){const e=bxFind(s,BX.open);if(e&&e.k==="block"&&LIB[e.type]){const L=LIB[e.type];e.props=Object.assign(L.def(),e.props||{});
    bk.innerHTML=`<div class="bx-blkh">${esc(L.label)}</div>`+(L.fields||[]).map(f=>`<div class="fld"><label>${f.l}</label>${fieldHTML(f,e.props)}</div>`).join("");bindContentFields(bk,e.props,()=>patchSection(s.id),L.fields||[]);}}
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

/* ---------- v5.8 · barra de la sección: 🖌 fondo rápido y ⤒ unir con la sección de arriba ---------- */
const BX_TB=id=>`<button data-act="bg" data-actid="${id}" title="Color de fondo de la sección">🖌</button><button data-act="merge" data-actid="${id}" title="Unir con la sección de arriba (una sola sección: puedes mezclar sus elementos)">⤒</button>`;
(function(){const _sh=sectionsHTML;sectionsHTML=function(forExport){let h=_sh.apply(this,arguments);if(forExport)return h;
  return h.replace(/(<div class="nc-tb">[\s\S]*?)(<button data-act="up" data-actid="([^"]+)")/g,(m,a,b,id)=>a.indexOf('data-act="bg"')>-1?m:`${a}${BX_TB(id)}${b}`);};
  if(typeof ncvTB==="function"){const _tb=ncvTB;ncvTB=function(s){return _tb.apply(this,arguments).replace(/(<button data-act="up" data-actid="([^"]+)")/,(m,b,id)=>BX_TB(id)+b);};}})();
const BX_BGS=[["auto","Del estilo","linear-gradient(135deg,#ddd 50%,#fff 50%)"],["white","Blanco","#fff"],["soft","Suave","var(--bsoft,#f4f4f6)"],["tint","Tinte de marca","color-mix(in srgb,var(--bp) 12%,#fff)"],["brand","Color de marca","var(--bp)"],["ink","Oscuro","#16161b"]];
function bxBgPop(id){const s=state.sections.find(x=>x.id===id);if(!s)return;let pop=document.getElementById("bxBgPop");
  if(!pop){pop=document.createElement("div");pop.id="bxBgPop";document.body.appendChild(pop);document.addEventListener("mousedown",e=>{if(pop.style.display!=="none"&&!pop.contains(e.target))pop.style.display="none";});}
  const st=Object.assign({bg:"auto"},s.style||{});const b=BRANDS[state.settings.brand]||{};const bp=((b.vars||"").match(/--bp:\s*([^;]+)/)||[])[1]||"#6E5AFF";
  pop.innerHTML=`<div class="bxbg-h"><b>Fondo de la sección</b><button type="button" class="mini" data-bgx="close">✕</button></div><div class="bxbg-sw">${BX_BGS.map(([k,l,c])=>`<button type="button" data-bgk="${k}" class="${st.bg===k?"on":""}" title="${l}"><i style="background:${c.replace("var(--bp)",bp).replace(/var\(--bp\)/g,bp)}"></i><span>${l}</span></button>`).join("")}</div>
    <div class="bxbg-row"><label>Color propio <input type="color" data-bgc value="${/^#[0-9a-f]{6}$/i.test(st.bgColor||"")?st.bgColor:"#ffe9a8"}"></label><button type="button" class="btn sm" data-bgk="color">Aplicar</button></div>
    <div class="bxbg-row"><button type="button" class="btn sm" data-bgx="img">🖼 Imagen de fondo…</button>${window.NC_MEDIA?`<button type="button" class="btn sm" data-bgx="lib">🗂 Biblioteca</button>`:""}${st.bg==="image"?`<select data-bgt><option value="auto">Texto: automático</option><option value="dark"${st.bgTone==="dark"?" selected":""}>Texto claro</option><option value="light"${st.bgTone==="light"?" selected":""}>Texto oscuro</option></select>`:""}</div>
    <div class="help">Más opciones (degradado, encaje de la imagen, espaciado): pestaña <b>Estilo</b>.</div>`;
  const f=document.getElementById("pv").getBoundingClientRect();pop.style.top=(f.top+12)+"px";pop.style.left=Math.max(8,f.right-300)+"px";pop.style.display="block";
  const set=o=>{commit();s.style=Object.assign({},s.style||{},o);renderPreview();if(state.selected===s.id)renderRight();bxBgPop(id);};
  pop.onclick=e=>{const k=e.target.closest("[data-bgk]");if(k){if(k.dataset.bgk==="color")set({bg:"color",bgColor:pop.querySelector("[data-bgc]").value});else set({bg:k.dataset.bgk});return;}
    const x=e.target.closest("[data-bgx]");if(!x)return;if(x.dataset.bgx==="close"){pop.style.display="none";return;}
    const img=url=>set({bg:"image",bgImg:url,bgTone:(s.style&&s.style.bgTone)||"dark"});
    if(x.dataset.bgx==="lib"&&window.NC_MEDIA){NC_MEDIA.open({accept:"image",cb:img});return;}
    if(x.dataset.bgx==="img"){const fi=document.createElement("input");fi.type="file";fi.accept="image/*";fi.onchange=ev=>readImg(ev.target.files[0],img);fi.click();}};
  const ci=pop.querySelector("[data-bgc]");ci.oninput=()=>{commitDebounced();s.style=Object.assign({},s.style||{},{bg:"color",bgColor:ci.value});renderPreview();};
  const tt=pop.querySelector("[data-bgt]");if(tt)tt.onchange=()=>set({bgTone:tt.value});}
/* unir con la sección de arriba: las dos pasan a ser una «Sección desde 0» con sus contenidos como elementos */
function bxAsEl(s){return {id:bxId(),k:"block",type:s.type,props:JSON.parse(JSON.stringify(s.props||{}))};}
function bxMerge(id){const i=state.sections.findIndex(x=>x.id===id);const s=state.sections[i],p=state.sections[i-1];
  if(!s||!p){toast("No hay ninguna sección encima con la que unirla");return;}
  const bad=x=>x.type==="imported"||x.freeHtml||/(_nav|_topbar|navbar|subnav|_footer|footcols|_sticky|infobar)$/.test(x.type);
  if(bad(p)||bad(s)){toast("La cabecera, el pie, la barra fija y las secciones importadas no se pueden unir");return;}
  commit();const rowOf=x=>x.type==="dx_build"?arr(x.props.rows):[bxRow("1",[bxCol([bxAsEl(x)])])];let target;
  if(p.type==="dx_build"){p.props.rows=arr(p.props.rows).concat(rowOf(s));state.sections.splice(i,1);target=p;}
  else if(s.type==="dx_build"){s.props.rows=rowOf(p).concat(arr(s.props.rows));s.style=Object.assign({},p.style||{},s.style||{});state.sections.splice(i-1,1);target=s;}
  else{target={id:nid(),type:"dx_build",props:Object.assign(LIB.dx_build.def(),{rows:rowOf(p).concat(rowOf(s))}),style:JSON.parse(JSON.stringify(p.style||{}))};state.sections.splice(i-1,2,target);}
  state.selected=target.id;BX.open=null;if(typeof setTab==="function")setTab("content");renderPreview();renderRight();
  toast("Secciones unidas: ahora puedes mover sus elementos entre filas y columnas");}
(function(){const _ra=rowAction;rowAction=function(id,act){if(act==="bg"){bxBgPop(id);return;}if(act==="merge"){bxMerge(id);return;}return _ra.apply(this,arguments);};})();
(function(){const css=document.createElement("style");css.textContent=`#bxBgPop{display:none;position:fixed;z-index:220;width:288px;background:var(--panel,#1b1e27);border:1px solid var(--line);border-radius:12px;padding:10px;box-shadow:0 18px 40px rgba(0,0,0,.4);font-size:12.5px}
#bxBgPop .bxbg-h{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}#bxBgPop .bxbg-sw{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:8px}
#bxBgPop .bxbg-sw button{display:flex;flex-direction:column;align-items:center;gap:4px;border:1px solid var(--line);background:none;color:inherit;border-radius:8px;padding:6px 4px;font-size:11px;cursor:pointer}#bxBgPop .bxbg-sw button.on{border-color:var(--acc,#7c6cff);background:rgba(124,108,255,.12)}
#bxBgPop .bxbg-sw i{width:34px;height:20px;border-radius:5px;border:1px solid rgba(127,127,127,.4)}#bxBgPop .bxbg-row{display:flex;gap:6px;align-items:center;flex-wrap:wrap;margin-bottom:8px}#bxBgPop .bxbg-row label{display:flex;gap:6px;align-items:center;margin:0}#bxBgPop input[type=color]{width:34px;height:26px;padding:0;border:0;background:none}
#bxPanel .bx-num{display:flex;gap:2px;align-items:center}#bxPanel .bx-num input{min-width:0;text-align:center}#bxPanel .bx-stp{border-top:1px dashed var(--line);margin-top:6px;padding-top:4px}#bxPanel .bx-stp summary{cursor:pointer;font-size:12px;font-weight:600;margin:4px 0 6px}
#bxPanel .bx-mv{display:flex;flex-wrap:wrap;gap:4px;margin:4px 0}#bxPanel .bx-colf{display:flex;align-items:center;gap:6px}#bxPanel .bx-colf label{margin:0;flex:1}#bxPanel .bx-colf input{width:40px;height:26px;padding:0}
#bxPanel .bx-blk{border:1px solid var(--line);border-radius:8px;padding:8px;margin:0 0 8px;background:rgba(127,127,127,.05)}#bxPanel .bx-blkh{font-weight:700;font-size:12px;margin-bottom:6px}`;document.head.appendChild(css);})();

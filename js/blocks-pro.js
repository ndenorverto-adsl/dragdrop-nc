/* ---------- v4.5 · BLOQUES "PRODUCTO Y TECNOLOGÍA" ----------
   Patrones de las mejores páginas de producto, fintech y SaaS (solo estructura y conversión; ni marcas, ni textos, ni imágenes de terceros):
   · dx_subnav  — barra de producto fija con el botón de compra siempre visible (páginas de producto premium).
   · dx_product — hero centrado: nombre, titular enorme, precio "desde", CTA en píldora y producto protagonista.
   · dx_tiles   — "lo esencial" en rejilla bento asimétrica: 6-9 ventajas escaneables en segundos.
   · dx_stats   — cifras grandes con notas al pie (prueba numérica concreta).
   Todos llevan a nuestros canales medibles (formulario/popup, tel:, wa.me). Datos de negocio = {{PLACEHOLDER}}. */
const PRO_SIZES=[["L","Grande (2/3)"],["S","Pequeña (1/3)"],["M","Media (1/2)"],["W","Ancho completo"]];
Object.assign(LIB,{
dx_subnav:{label:"✚ Barra de producto fija (compra siempre visible)",ico:"▔",cat:"Producto y tech",raw:true,
  def:()=>({name:"{{PRODUCTO}}",links:"Lo esencial>#esencial|Tarifas>#tarifas|Preguntas>#faq",price:"",btn:"Contratar",act:"popup"}),
  fields:[{k:"name",l:"Nombre del producto"},{k:"links",l:"Enlaces (Texto>#ancla, separados por |)"},{k:"price",l:"Precio junto al botón (opcional)"},{k:"btn",l:"Botón"},V4_ACTF],
  render:p=>`<div class="da dx-subnav"><div class="container"><b class="nm">${esc(p.name)}</b><nav class="lk">${String(p.links||"").split("|").map(x=>x.trim()).filter(Boolean).map(x=>{const m=x.split(">");return `<a href="${esc((m[1]||"#").trim())}">${esc(m[0].trim())}</a>`;}).join("")}</nav>
    ${p.price?`<span class="pr">${esc(p.price)}</span>`:""}<a href="#form" data-cta="form"${v4ActA(p)} class="dx-pill">${esc(p.btn)}</a></div></div>`},
dx_product:{label:"✚ Hero de producto (centrado, premium)",ico:"◉",cat:"Producto y tech",raw:true,
  def:()=>({canal:"form",kicker:"{{PRODUCTO}}",headline:"Rápida de verdad.",highlight:"Sin letra pequeña.",sub:"{{BENEFICIO_PRINCIPAL}}",price:"{{PRECIO}}",priceUnit:"€/mes",priceNote:"IVA incluido",inline:"si",cta:"Quiero que me llamen",link:"Ver tarifas",img:"",imgAlt:"",illus:"auto",vis:"auto",photoFx:"natural"}),
  fields:[{k:"canal",l:"Canal principal",t:"select",opts:V4_CANAL},{k:"kicker",l:"Nombre / etiqueta"},{k:"headline",l:"Titular"},{k:"highlight",l:"Segunda línea (degradado)"},{k:"sub",l:"Subtítulo",t:"ta"},{k:"price",l:"Precio (vacío = sin precio)"},{k:"priceUnit",l:"Unidad"},{k:"priceNote",l:"Nota del precio"},
    {k:"inline",l:"Formulario de teléfono en el hero",t:"select",opts:[["si","Sí (recomendado para captar)"],["no","No, solo botones"]]},{k:"cta",l:"Botón principal"},{k:"link",l:"Enlace secundario (va a tarifas)"},V4_ACTF,
    {k:"vis",l:"Imagen protagonista",t:"select",opts:NC_VIS},{k:"img",l:"Foto del producto",t:"photo"},{k:"photoFx",l:"Tratamiento de la foto",t:"select",opts:NC_FX},{k:"imgAlt",l:"Texto alternativo"},{k:"illus",l:"Mockup",t:"select",opts:NC_ILLUS}],
  render:p=>{const c=p.canal||"form";
    const main=c==="call"?`${v4Tel()} class="dx-pill lg">${I_TEL()} ${vt("callFree")} · ${esc(telText())}</a>`:c==="wa"?`${v4Wa()} class="dx-pill lg wa">${I_WA()} ${vt("waWrite")}</a>`
      :p.inline==="no"?`<a href="#form" data-cta="form"${v4ActA(p)} class="dx-pill lg">${esc(p.cta)}</a>`:v4PhoneForm({btn:p.cta,btnCls:"dx-pill lg",cls:"dx-prod-form"});
    const alt=c==="call"?`<a href="#form" data-cta="form"${v4ActA(p)}>${vt("weCall")} ›</a>`:`${v4Tel()}>${vt("orCallAt")} ${esc(telText())} ›</a>`;
    return `<header class="da dx-prod${v4MO(p)}"><div class="container"><div class="dx-prod-txt">${p.kicker?`<span class="dx-prod-k">${esc(p.kicker)}</span>`:""}
    <h1 class="da-h1 dx-prod-h">${esc(p.headline)}${p.highlight?` <mark>${esc(p.highlight)}</mark>`:""}</h1>${p.sub?`<p class="dx-prod-sub">${esc(p.sub)}</p>`:""}
    ${p.price?`<p class="dx-prod-pr">${vt("from")||"Desde"} <b>${esc(p.price)} ${esc(p.priceUnit||"")}</b>${p.priceNote?` <small>${esc(p.priceNote)}</small>`:""}</p>`:""}
    <div class="dx-prod-cta" id="form">${main}</div><div class="dx-prod-alt">${p.link?`<a href="#tarifas">${esc(p.link)} ›</a>`:""}${alt}</div></div>
    ${p.vis==="none"?"":`<div class="dx-prod-vis">${ncVisual(Object.assign({},p,{sector:typeof abSector==="function"?abSector(p):""}))}</div>`}</div></header>`;}},
dx_tiles:{label:"✚ Lo esencial (rejilla bento)",ico:"▦",cat:"Producto y tech",raw:true,
  def:()=>({kicker:"Lo esencial",title:"Todo lo que necesitas saber, de un vistazo.",items:"L|{{VENTAJA_1}}|{{DETALLE_1}}|dark\nS|{{CIFRA_1}}|{{ETIQUETA_1}}|brand\nS|{{VENTAJA_2}}|{{DETALLE_2}}|light\nL|{{VENTAJA_3}}|{{DETALLE_3}}|light\nM|{{VENTAJA_4}}|{{DETALLE_4}}|light\nM|{{VENTAJA_5}}|{{DETALLE_5}}|accent",imgs:[],btn:"",act:"popup"}),
  fields:[{k:"kicker",l:"Etiqueta"},{k:"title",l:"Título"},{k:"items",l:"Fichas (tamaño L/S/M/W | título | texto | tono light/dark/brand/accent)",t:"ta"},{k:"imgs",l:"Imágenes de las fichas (opcional, en el mismo orden)",t:"images"},{k:"btn",l:"Botón bajo la rejilla (opcional)"},V4_ACTF],
  render:p=>`<section class="da da-sec dx-tiles-s" id="esencial"><div class="container">${p.kicker?`<span class="da-eyebrow">${esc(p.kicker)}</span>`:""}<h2 class="da-h2 mt-2 mb-4 mb-lg-5">${esc(p.title)}</h2>
    <div class="dx-tiles">${v4L(p.items).map((l,i)=>{const c=v4C(l);const sz=/^[LSMW]$/i.test(c[0])?c[0].toUpperCase():"S";const tone=(c[3]||"light").toLowerCase();const im=arr(p.imgs)[i];const t1=(c[1]||"").trim();const big=t1.length<=16&&(/^\{\{[A-Z_0-9]+\}\}$/.test(t1)||/^[\d+−-]/.test(t1));
      return `<div class="dx-tile sz-${sz} tn-${tone}${im?" has-img":""}">${big?`<b class="big${/\{\{/.test(t1)?" ph":""}">${esc(c[1])}</b>`:`<h3>${esc(c[1]||"")}</h3>`}${c[2]?`<p>${esc(c[2])}</p>`:""}${im?`<img src="${im}" alt="" loading="lazy">`:""}</div>`;}).join("")}</div>
    ${p.btn?`<div class="da-btns justify-content-center"><a href="#form" data-cta="form"${v4ActA(p)} class="da-btn pri">${esc(p.btn)} ${I_GO()}</a></div>`:""}</div></section>`},
dx_stats:{label:"✚ Cifras grandes con nota",ico:"#",cat:"Producto y tech",raw:true,
  def:()=>({title:"",items:"{{CIFRA_1}}|{{ETIQUETA_1}}\n{{CIFRA_2}}|{{ETIQUETA_2}}\n{{CIFRA_3}}|{{ETIQUETA_3}}",foot:"{{FUENTE_DE_LAS_CIFRAS}}"}),
  fields:[{k:"title",l:"Título (opcional)"},{k:"items",l:"Cifras (valor|etiqueta, una por línea)",t:"ta"},{k:"foot",l:"Nota al pie (fuente o condiciones)"}],
  render:p=>`<section class="da da-sec dx-stats"><div class="container">${p.title?`<h2 class="da-h2 text-center mb-5">${esc(p.title)}</h2>`:""}<div class="dx-stat-row">${v4L(p.items).map(l=>{const c=v4C(l);return `<div class="st"><b${/\{\{/.test(c[0])?' class="ph"':""}>${esc(c[0])}</b><span>${esc(c[1]||"")}</span></div>`;}).join("")}</div>${p.foot?`<p class="dx-stat-ft">${esc(p.foot)}</p>`:""}</div></section>`}
});
(function(){const X=["dx_subnav","dx_product","dx_tiles","dx_stats"];let i=ORDER.indexOf("dx_coverage");if(i<0)i=ORDER.length;ORDER.splice(i,0,...X);})();
function ncProCSSx(){if(!state.sections.some(s=>!s.hidden&&/^dx_(subnav|product|tiles|stats)$/.test(s.type)))return "";return `
.dx-subnav{position:sticky;top:0;z-index:21;background:color-mix(in srgb,var(--lkp,#fff) 84%,transparent);-webkit-backdrop-filter:saturate(1.8) blur(18px);backdrop-filter:saturate(1.8) blur(18px);border-bottom:1px solid var(--dline);color:var(--bink)}
.dx-subnav .container{display:flex;align-items:center;gap:14px;min-height:52px}.dx-subnav .nm{font:700 19px/1.1 var(--fhead);letter-spacing:-.01em;margin-right:auto;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dx-subnav .lk{display:flex;gap:20px}.dx-subnav .lk a{color:var(--bmuted);text-decoration:none;font-size:13px}.dx-subnav .lk a:hover{color:var(--bink)}.dx-subnav .pr{font-size:13px;color:var(--bmuted);white-space:nowrap}
@media (max-width:767px){.dx-subnav .lk,.dx-subnav .pr{display:none}}
.dx-pill{display:inline-flex;align-items:center;justify-content:center;gap:8px;background:var(--bp);color:var(--btntext,#fff);border:0;border-radius:999px;padding:7px 16px;font-size:13.5px;font-weight:600;text-decoration:none;white-space:nowrap;transition:filter .15s,transform .15s}.dx-pill:hover{filter:brightness(1.08);color:var(--btntext,#fff)}
.dx-pill.lg{padding:14px 26px;font-size:17px}.dx-pill.wa{background:#25D366;color:#063}
.dx-prod{padding:72px 0 0;background:var(--lkp,#fff);text-align:center;overflow:hidden;color:var(--bink)}.dx-prod-txt{max-width:860px;margin:0 auto}
.dx-prod-k{display:inline-block;font:600 clamp(17px,1.6vw,21px)/1.2 var(--fhead);color:var(--bpt,var(--bp));margin-bottom:6px}
.dx-prod-h{font-size:clamp(42px,6.6vw,88px)!important;line-height:1.02!important;letter-spacing:-.035em;margin:6px 0 16px!important}.dx-prod-h mark{display:block;width:fit-content;margin:0 auto;color:var(--bpt,var(--bp))}
body:not([class*="lk-"]) .dx-prod-h mark{background:linear-gradient(90deg,var(--bp),color-mix(in srgb,var(--ba) 70%,var(--bp)));-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent;padding:0 0 .06em}
.dx-prod-sub{font-size:clamp(18px,1.7vw,22px);color:var(--bmuted);max-width:640px;margin:0 auto 14px;line-height:1.4}.dx-prod-pr{font-size:17px;color:var(--bink);margin:0 0 22px}.dx-prod-pr small{color:var(--bmuted);font-size:13px}
.dx-prod-cta{display:flex;justify-content:center}.dx-prod-form{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;max-width:560px;width:100%;margin:0 auto}.dx-prod-form .nc-opts{flex:1 1 100%}.dx-prod-form .form-control{flex:1 1 220px;margin:0!important;border-radius:999px;padding:14px 20px;border:1.5px solid var(--dline)}.dx-prod-form .dx-pill{flex:0 0 auto}
.dx-prod-form .nc-legal{flex:1 1 100%;order:3;display:flex;justify-content:center;font-size:12.5px;color:var(--bmuted)}
.dx-prod-alt{display:flex;gap:6px 22px;justify-content:center;flex-wrap:wrap;margin:16px 0 0;font-size:15px}.dx-prod-alt a{color:var(--bpt,var(--bp));text-decoration:none}.dx-prod-alt a:hover{text-decoration:underline}
.dx-prod-vis{max-width:980px;margin:48px auto 0}.dx-prod-vis .nc-vis{margin:0 auto;max-width:880px}.dx-prod-vis .nc-vis.is-photo{border-radius:var(--cardr,28px) var(--cardr,28px) 0 0}
@media (max-width:767px){.dx-prod{padding-top:44px}.dx-prod-form .dx-pill{flex:1 1 100%}.dx-prod-vis{margin-top:32px}}
.dx-tiles{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:16px}
.dx-tile{position:relative;overflow:hidden;border-radius:var(--cardr,24px);padding:30px 28px;min-height:220px;display:flex;flex-direction:column;justify-content:flex-end;background:var(--bsoft);color:var(--bink)}
.dx-tile.sz-L{grid-column:span 4}.dx-tile.sz-S{grid-column:span 2}.dx-tile.sz-M{grid-column:span 3}.dx-tile.sz-W{grid-column:span 6;min-height:180px}
.dx-tile h3{font:700 clamp(22px,2.2vw,30px)/1.1 var(--fhead);letter-spacing:-.02em;margin:0 0 8px;color:inherit}.dx-tile p{margin:0;font-size:15.5px;line-height:1.45;color:inherit;opacity:.78;max-width:440px}
.dx-tile .big{font:800 clamp(44px,5vw,72px)/1 var(--fdisp,var(--fhead));letter-spacing:-.04em;margin-bottom:8px;overflow-wrap:anywhere}
.dx-tile.tn-dark{background:var(--ink0,#111);color:#fff}.dx-tile.tn-brand{background:var(--bp);color:var(--btntext,#fff)}.dx-tile.tn-accent{background:var(--ba);color:var(--batext,var(--ink0,#111))}.dx-tile.tn-light{background:var(--bsoft)}
.dx-tile.has-img{justify-content:flex-start}.dx-tile.has-img img{margin-top:auto;padding-top:18px;max-width:100%;max-height:220px;object-fit:contain;align-self:center}
.dx-tiles-s .da-btns{margin-top:28px}
@media (max-width:991px){.dx-tile.sz-L,.dx-tile.sz-M,.dx-tile.sz-W{grid-column:span 6}.dx-tile.sz-S{grid-column:span 3}}
@media (max-width:575px){.dx-tiles{gap:10px}.dx-tile{min-height:0;padding:22px 20px}.dx-tile.sz-S{grid-column:span 3;padding:20px 16px}.dx-tile.sz-S h3{font-size:19px}.dx-tile.sz-S p{font-size:13.5px}.dx-tile .big{font-size:40px}}
.dx-stat-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:0;border-top:1px solid var(--dline)}
.dx-stats .st{padding:34px 24px 10px;border-left:1px solid var(--dline);text-align:center}.dx-stats .st:first-child{border-left:0}
.dx-stats .st b{display:block;font:800 clamp(44px,5.4vw,76px)/1 var(--fdisp,var(--fhead));letter-spacing:-.045em;color:var(--bink);overflow-wrap:anywhere}.dx-stats .st span{display:block;margin-top:10px;color:var(--bmuted);font-size:15px}
.dx-tile .big.ph,.dx-stats .st b.ph{font-size:clamp(20px,2vw,28px);letter-spacing:0;overflow-wrap:anywhere}.dx-stat-ft{text-align:center;color:var(--bmuted);font-size:12.5px;margin:26px 0 0}
@media (max-width:575px){.dx-stats .st{border-left:0;border-top:1px solid var(--dline)}.dx-stats .st:first-child{border-top:0}}
html body .nc-s.nc-tone-d .dx-tile.tn-light{background:rgba(255,255,255,.08);color:#fff}`;}
(function(){const _bd=buildDoc;buildDoc=function(){let h=_bd.apply(this,arguments);const c=ncProCSSx();return c?h.replace("</head>",`<style>${c}</style></head>`):h;};})();

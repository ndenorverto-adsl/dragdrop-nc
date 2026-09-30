/* ---------- VARIANTES + BLOQUES CRO EXTRA (v3.7) ----------
   · Variantes de composición para tarifas, opiniones, FAQ, CTA, pasos y footer.
     "Automática" = cada estilo elige la que mejor le encaja (V4_AUTO_VAR).
   · Bloques nuevos dx_* construidos con las piezas de la familia A, así heredan el estilo de diseño.
   · Nada inventado: los datos de negocio siguen como {{PLACEHOLDER}}. */
Object.assign(V4_AUTO_VAR,{
  plans:{prensa:"table",swiss:"table",editorial:"rows",lux:"rows"},
  rev:{prensa:"quote",editorial:"quote",lux:"quote",cuaderno:"wall",papel:"wall",retro:"wall"},
  faq:{prensa:"open",swiss:"open",editorial:"open"},
  cta:{swiss:"big",brutal:"big",retro:"big",prensa:"split",cuaderno:"split",papel:"split",corporate:"split"},
  steps:{cuaderno:"timeline",papel:"timeline",lux:"timeline",prensa:"timeline"},
  foot:{prensa:"full",editorial:"full",lux:"full",swiss:"full"}
});
Object.assign(v4VarDefault,{plans:"cards",rev:"cards",faq:"accordion",cta:"band",steps:"cols",foot:"simple"});
const X_VAR={
  plans:[["auto","Automática (según el estilo)"],["cards","Tarjetas"],["table","Comparador en tabla"],["rows","Filas"]],
  rev:[["auto","Automática (según el estilo)"],["cards","Tarjetas"],["quote","Cita destacada + lista"],["wall","Muro de opiniones"]],
  faq:[["auto","Automática (según el estilo)"],["accordion","Acordeón"],["open","Abiertas en 2 columnas"]],
  cta:[["auto","Automática (según el estilo)"],["band","Banda"],["split","Dos columnas con tarjeta"],["big","Titular grande"]],
  steps:[["auto","Automática (según el estilo)"],["cols","Columnas"],["timeline","Línea de tiempo"]],
  foot:[["auto","Automática (según el estilo)"],["simple","Una línea"],["full","Columnas (marca, contacto, legal)"]]
};
function xAddVar(type,key){const b=LIB[type];if(!b||b.fields.some(f=>f.k==="variant"))return;b.fields.unshift({k:"variant",l:"Variante",t:"select",opts:X_VAR[key]});}
[["da_plans","plans"],["db_reviews","rev"],["da_faq","faq"],["db_faq","faq"],["dc_faq","faq"],["da_cta","cta"],["db_cta","cta"],["db_steps","steps"],["da_footer","foot"],["db_footer","foot"],["dc_footer","foot"]].forEach(([t,k])=>xAddVar(t,k));
function xWrap(type,fn){const o=LIB[type].render;LIB[type].render=p=>fn(p,o);}

/* FAQ abiertas */
const _v4FaqAcc=v4Faq;
v4Faq=function(p,fam){if(v4Var(p,"faq")!=="open")return _v4FaqAcc(p,fam);
  return `<dl class="dx-faq-open ${fam}-faq">${v4L(p.items).map(l=>{const c=v4C(l);return `<div><dt>${esc(c[0])}</dt><dd>${esc(c[1]||'')}</dd></div>`;}).join("")}</dl>`;};

/* Tarifas */
xWrap("da_plans",(p,o)=>{const v=v4Var(p,"plans");if(v==="cards")return o(p);const P=arr(p.plans);
  const head=`<div class="text-center mb-5"><h2 class="da-h2">${esc(p.title)}</h2><p class="da-muted">${esc(p.sub)}</p></div>`;
  if(v==="table")return `<section class="da da-sec" id="tarifas"><div class="container">${head}<div class="dx-ptab" style="--n:${P.length}">${P.map(pl=>`<div class="col ${pl.tag?'best':''}">
      <div class="h">${pl.tag?`<span class="tag">${esc(pl.tag)}</span>`:""}<h3>${esc(pl.name)}</h3></div><div class="pp">${esc(pl.price)}<small>${esc(pl.unit||'')}</small></div>
      ${v4Checks(pl.feats,"f")}<a href="#form" data-cta="form" class="da-btn ${pl.tag?'pri':'sec'} w-100 justify-content-center">${esc(pl.cta||'La quiero')}</a></div>`).join("")}</div></div></section>`;
  return `<section class="da da-sec" id="tarifas"><div class="container" style="max-width:1040px">${head}<div class="dx-prows">${P.map((pl,i)=>`<div class="r ${pl.tag?'best':''}">
      <span class="n">${String(i+1).padStart(2,"0")}</span><div class="m"><h3>${esc(pl.name)}${pl.tag?` <span class="tag">${esc(pl.tag)}</span>`:""}</h3>${v4Checks(pl.feats,"f")}</div>
      <div class="pp">${esc(pl.price)}<small>${esc(pl.unit||'')}</small></div><a href="#form" data-cta="form" class="da-btn ${pl.tag?'pri':'sec'} justify-content-center">${esc(pl.cta||'La quiero')}</a></div>`).join("")}</div></div></section>`;});

/* Opiniones */
xWrap("db_reviews",(p,o)=>{const v=v4Var(p,"rev");if(v==="cards")return o(p);const R=v4L(p.items).map(v4C);
  const head=`<h2 class="db-h2">${esc(p.title)}</h2><p class="db-muted mb-5">${esc(p.source)}</p>`;
  if(v==="quote"){const f=R[0]||[],rest=R.slice(1);return `<section class="db db-sec soft"><div class="container">${head}<div class="row g-4 g-lg-5 align-items-start"><div class="col-lg-7"><figure class="dx-bigq"><div class="st">★★★★★</div><blockquote>“${esc(f[0]||'')}”</blockquote><figcaption>${esc(f[1]||'')}${f[2]?` · ${esc(f[2])}`:""}</figcaption></figure></div>
      <div class="col-lg-5"><ul class="dx-qlist">${rest.map(c=>`<li><span class="st">★★★★★</span><p>“${esc(c[0])}”</p><small>${esc(c[1]||'')}${c[2]?` · ${esc(c[2])}`:""}</small></li>`).join("")}</ul></div></div></div></section>`;}
  return `<section class="db db-sec soft"><div class="container">${head}<div class="dx-wall">${R.map(c=>`<figure class="db-rev"><div class="st">★★★★★</div><blockquote>“${esc(c[0])}”</blockquote><figcaption>${esc(c[1]||'')}${c[2]?` · ${esc(c[2])}`:""}</figcaption></figure>`).join("")}</div></div></section>`;});

/* Cómo funciona */
xWrap("db_steps",(p,o)=>{if(v4Var(p,"steps")!=="timeline")return o(p);
  return `<section class="db db-sec"><div class="container"><div class="row g-4 g-lg-5"><div class="col-lg-5"><h2 class="db-h2">${esc(p.title)}</h2><p class="db-muted">${esc(p.sub)}</p></div>
    <div class="col-lg-7"><ol class="dx-tl">${v4L(p.items).map((l,i)=>{const c=v4C(l);return `<li><span class="n">${i+1}</span><div><h3>${esc(c[0])}</h3><p>${esc(c[1]||'')}</p></div></li>`;}).join("")}</ol></div></div></div></section>`;});

/* CTA final */
function xCta(p,fam,o){const v=v4Var(p,"cta");if(v==="band")return o(p);const go=fam==="db"?"db-go":"da-go";
  if(v==="big")return `<section class="${fam} ${fam}-sec dx-ctabig"><div class="container text-center"><h2 class="dx-bigt">${esc(p.title)}</h2><p class="${fam}-muted mx-auto" style="max-width:560px">${esc(p.sub)}</p>
    <div class="dx-bigform mx-auto">${v4PhoneForm({btn:p.btn,btnCls:"da-go",cls:"da-inline",arrow:true})}</div><div class="mt-3 small ${fam}-muted">${vt("orCallAt")} ${v4Tel()} class="dx-tel">${esc(telText())}</a></div></div></section>`;
  return `<section class="${fam} ${fam}-sec"><div class="container"><div class="row g-4 g-lg-5 align-items-center"><div class="col-lg-6"><h2 class="${fam}-h2">${esc(p.title)}</h2><p class="${fam}-muted">${esc(p.sub)}</p>
    <div class="dx-ctatel"><small>${vt("orCallAt")}</small>${v4Tel()} class="dx-tel">${ncIco("phone")} ${esc(telText())}</a></div></div>
    <div class="col-lg-5 offset-lg-1"><div class="da-card">${v4PhoneForm({btn:p.btn,btnCls:"da-go",arrow:true})}</div></div></div></div></section>`;}
xWrap("da_cta",(p,o)=>xCta(p,"da",o));xWrap("db_cta",(p,o)=>xCta(p,"db",o));

/* Footer en columnas */
function xFoot(p,fam,o){if(v4Var(p,"foot")!=="full")return o(p);
  return `<footer class="${fam} ${fam}-foot dx-foot"><div class="container"><div class="row g-4">
    <div class="col-md-5"><b class="dx-fb">${esc(p.company)}</b>${p.note?`<p>${esc(p.note)}</p>`:""}</div>
    <div class="col-6 col-md-3"><span class="dx-fl">Contacto</span>${v4Tel()}>${esc(telText())}</a><br><span>{{HORARIO}}</span></div>
    <div class="col-6 col-md-4"><span class="dx-fl">Legal</span>${v4Legal().replace(/ · /g,"<br>")}</div></div>
    <div class="dx-fcopy">© ${esc(p.company)}</div></div></footer>`;}
xWrap("da_footer",(p,o)=>xFoot(p,"da",o));xWrap("db_footer",(p,o)=>xFoot(p,"db",o));xWrap("dc_footer",(p,o)=>xFoot(p,"dc",o));

/* ============ BLOQUES CRO NUEVOS ============ */
Object.assign(LIB,{
dx_coverage:{label:"✚ Cobertura por código postal",ico:"⌖",cat:"Extras CRO",raw:true,
  def:()=>({title:"¿Llega a tu casa?",sub:"Escribe tu código postal y tu teléfono. Te confirmamos la cobertura en tu dirección y el precio final.",btn:"Comprobar cobertura",note:"Te lo confirmamos por teléfono, sin compromiso."}),
  fields:[{k:"title",l:"Título"},{k:"sub",l:"Texto",t:"ta"},{k:"btn",l:"Botón"},{k:"note",l:"Nota"}],
  render:p=>`<section class="da da-sec dx-cov"><div class="container"><div class="row g-4 g-lg-5 align-items-center"><div class="col-lg-6"><span class="da-eyebrow">${ncIco("map-pin")} Cobertura</span><h2 class="da-h2 mt-3">${esc(p.title)}</h2><p class="da-muted">${esc(p.sub)}</p></div>
    <div class="col-lg-6"><div class="da-card"><form data-callback action="${v4Act()}" method="post" class="dx-covf"><input required name="codigo_postal" class="form-control" placeholder="Código postal" inputmode="numeric" maxlength="5"><input required name="telefono" type="tel" class="form-control" placeholder="${esc(vt("phone"))}"><button type="submit" class="da-go">${esc(p.btn)} ${I_GO()}</button></form><p class="dx-note">${esc(p.note)}</p></div></div></div></div></section>`},
dx_calc:{label:"✚ Calculadora de ahorro",ico:"∑",cat:"Extras CRO",raw:true,
  def:()=>({title:"¿Cuánto podrías ahorrar?",sub:"Pon lo que pagas ahora al mes y te enseñamos una estimación.",unit:"€/mes",pct:"{{PORCENTAJE_AHORRO}}",note:"Estimación orientativa con un ahorro medio del {{PORCENTAJE_AHORRO}} %. Te damos el precio exacto por teléfono.",btn:"Quiero ese ahorro"}),
  fields:[{k:"title",l:"Título"},{k:"sub",l:"Texto"},{k:"pct",l:"% de ahorro medio (número real del cliente)"},{k:"unit",l:"Unidad"},{k:"note",l:"Nota legal",t:"ta"},{k:"btn",l:"Botón"}],
  render:p=>{const pct=parseFloat(String(p.pct).replace(',','.'));const ok=!isNaN(pct)&&pct>0;const note=String(p.note||"").replace(/\{\{PORCENTAJE_AHORRO\}\}/g,ok?String(p.pct):"{{PORCENTAJE_AHORRO}}");
    return `<section class="da da-sec soft"><div class="container" style="max-width:980px"><div class="dx-calc da-card" data-calc data-pct="${ok?pct:0}">
    <div class="row g-4 align-items-center"><div class="col-md-6"><h2 class="da-h2">${esc(p.title)}</h2><p class="da-muted">${esc(p.sub)}</p>
      <label class="dx-lbl" for="calc_in">Lo que pagas ahora</label><div class="dx-calcin"><input id="calc_in" data-calc-input type="number" inputmode="decimal" min="0" class="form-control" placeholder="0"><span>${esc(p.unit)}</span></div></div>
    <div class="col-md-6"><div class="dx-calcout"><div><span>Ahorro al mes</span><b data-calc-m>0 €</b></div><div><span>Ahorro al año</span><b data-calc-y>0 €</b></div></div>
      <a href="#form" data-cta="form" class="da-btn pri w-100 justify-content-center mt-3">${esc(p.btn)} ${I_GO()}</a></div></div>
    <p class="dx-note mt-3 mb-0">${esc(note)}</p></div></div></section>`;}},
dx_guarantee:{label:"✚ Garantía",ico:"✓",cat:"Extras CRO",raw:true,
  def:()=>({title:"{{GARANTIA}}",text:"{{CONDICIONES_GARANTIA}}",label:"Nuestra garantía"}),
  fields:[{k:"label",l:"Etiqueta"},{k:"title",l:"Garantía (real)"},{k:"text",l:"Condiciones",t:"ta"}],
  render:p=>`<section class="da da-sec"><div class="container" style="max-width:900px"><div class="dx-guar"><span class="dx-seal">${ncIco("badge-check")}</span><div><span class="da-eyebrow">${esc(p.label)}</span><h2 class="da-h2 mt-2">${esc(p.title)}</h2><p class="da-muted mb-0">${esc(p.text)}</p></div></div></div></section>`},
dx_countdown:{label:"✚ Cuenta atrás de la oferta",ico:"⏱",cat:"Extras CRO",raw:true,
  def:()=>({title:"La oferta termina en",end:"",note:"Precio garantizado si lo solicitas antes del fin de la oferta."}),
  fields:[{k:"title",l:"Título"},{k:"end",l:"Fecha y hora de fin (AAAA-MM-DD HH:MM, real)"},{k:"note",l:"Nota"}],
  render:p=>`<section class="da dx-cd"><div class="container d-flex flex-wrap align-items-center justify-content-center gap-3 gap-md-4">${ncIco("timer")}<b>${esc(p.title)}</b>
    ${p.end?`<div class="dx-cdn" data-countdown data-end="${esc(p.end)}">${["días","h","min","s"].map(l=>`<span><b data-cd>00</b><small>${l}</small></span>`).join("")}</div>`:`<span class="dx-cdn">{{FECHA_FIN_OFERTA}}</span>`}
    <span class="dx-note">${esc(p.note)}</span></div></section>`},
dx_letter:{label:"✚ Nota del equipo (toque personal)",ico:"✎",cat:"Extras CRO",raw:true,
  def:()=>({title:"Una nota antes de que decidas",text:"{{MENSAJE_REAL_DEL_EQUIPO}}",sign:"{{NOMBRE}}",role:"{{CARGO}}",img:""}),
  fields:[{k:"title",l:"Título"},{k:"text",l:"Mensaje (real, de una persona del equipo)",t:"ta"},{k:"sign",l:"Firma"},{k:"role",l:"Cargo"},{k:"img",l:"Foto de la persona (opcional)",t:"photo"}],
  render:p=>`<section class="da da-sec soft"><div class="container" style="max-width:860px"><div class="dx-letter"><h2 class="da-h2">${esc(p.title)}</h2><p class="dx-ltxt">${esc(p.text)}</p>
    <div class="dx-sign">${p.img?`<img src="${esc(p.img)}" alt="${esc(p.sign)}" loading="lazy">`:""}<div><b class="dx-hand">${esc(p.sign)}</b><small>${esc(p.role)}</small></div></div></div></div></section>`},
dx_wa:{label:"✚ WhatsApp flotante",ico:"◉",cat:"Extras CRO",raw:true,
  def:()=>({text:"¿Hablamos por WhatsApp?"}),fields:[{k:"text",l:"Texto (escritorio)"}],
  render:p=>`<a href="${waHref()}" target="_blank" rel="noopener" data-cta="whatsapp" class="dx-wa" aria-label="WhatsApp">${ncIco("message-circle")}<span>${esc(p.text)}</span></a>`}
});
(function(){const X=["dx_coverage","dx_calc","dx_guarantee","dx_countdown","dx_letter","dx_wa"];let i=ORDER.findIndex(t=>!/^d[abc]_/.test(t));if(i<0)i=ORDER.length;ORDER.splice(i,0,...X);})();

function ncXCSS(){if(!state.sections.some(s=>!s.hidden&&/^d[abcx]_/.test(s.type)))return "";return `
.dx-faq-open{display:grid;grid-template-columns:1fr 1fr;gap:28px 48px;margin:0}.dx-faq-open dt{font:700 17px/1.3 var(--fhead);color:var(--bink);margin-bottom:6px}.dx-faq-open dd{margin:0;color:var(--bmuted)}.dx-faq-open>div{border-top:1px solid var(--dline);padding-top:16px}
.dx-ptab{display:grid;grid-template-columns:repeat(var(--n),minmax(0,1fr));border:1px solid var(--dline);border-radius:var(--rc,16px);overflow:hidden;background:#fff;color:var(--ink0)}
.dx-ptab .col{display:flex;flex-direction:column;padding:26px 22px;border-left:1px solid var(--dline)}.dx-ptab .col:first-child{border-left:0}.dx-ptab .col.best{background:color-mix(in srgb,var(--bp) 6%,#fff);box-shadow:inset 0 3px 0 var(--bp)}
.dx-ptab .h{min-height:58px}.dx-ptab .tag{display:inline-block;font-size:11.5px;font-weight:700;color:var(--bpt);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px}.dx-ptab h3{font-size:18px;font-weight:800;margin:0}
.dx-ptab .pp,.dx-prows .pp{font:800 38px/1 var(--fhead);letter-spacing:-.03em;margin:14px 0 16px;overflow-wrap:anywhere}.dx-ptab .pp small,.dx-prows .pp small{font-size:14px;font-weight:600;color:var(--bmuted);margin-left:4px}
.dx-ptab ul.f,.dx-prows ul.f{list-style:none;padding:0;margin:0 0 20px;flex:1;font-size:14.5px;color:var(--bmuted)}.dx-ptab ul.f li{padding:8px 0;border-top:1px dashed var(--dline)}
.dx-ptab ul.f li:before,.dx-prows ul.f li:before{content:"✓";color:#16a34a;font-weight:800;margin-right:6px}
.dx-prows{border-top:1px solid var(--bink)}.dx-prows .r{display:grid;grid-template-columns:44px 1fr auto 180px;gap:10px 28px;align-items:center;padding:24px 0;border-bottom:1px solid var(--dline);color:var(--bink)}
.dx-prows .n{font:700 13px var(--fhead);color:var(--bpt)}.dx-prows h3{font-size:20px;font-weight:800;margin:0 0 6px}.dx-prows .tag{font-size:12px;font-weight:700;color:var(--bpt);vertical-align:middle}.dx-prows ul.f{display:flex;flex-wrap:wrap;gap:4px 16px;margin:0}.dx-prows .pp{margin:0}.dx-prows .r.best{background:linear-gradient(90deg,color-mix(in srgb,var(--bp) 7%,transparent),transparent)}
.dx-bigq{margin:0}.dx-bigq .st{color:#E3A008;letter-spacing:3px}.dx-bigq blockquote{font:500 clamp(24px,2.6vw,34px)/1.3 var(--fhead);margin:14px 0 18px;color:var(--bink)}.dx-bigq figcaption{color:var(--bmuted)}
.dx-qlist{list-style:none;padding:0;margin:0;display:grid;gap:18px}.dx-qlist li{border-top:1px solid var(--dline);padding-top:14px}.dx-qlist .st{color:#E3A008;font-size:12px;letter-spacing:2px}.dx-qlist p{margin:6px 0 4px;color:var(--bink)}.dx-qlist small{color:var(--bmuted)}
.dx-wall{columns:3 260px;column-gap:18px}.dx-wall .db-rev{break-inside:avoid;margin:0 0 18px;display:block}
.dx-tl{list-style:none;padding:0;margin:0;position:relative}.dx-tl:before{content:"";position:absolute;left:19px;top:8px;bottom:8px;width:2px;background:var(--dline)}
.dx-tl li{display:flex;gap:20px;padding:0 0 30px;position:relative}.dx-tl .n{flex:0 0 40px;height:40px;border-radius:50%;display:grid;place-items:center;background:var(--bp);color:var(--btntext,#fff);font:800 16px var(--fhead);position:relative}.dx-tl h3{font-size:20px;margin:6px 0 4px;color:var(--bink)}.dx-tl p{color:var(--bmuted);margin:0}
.dx-ctabig{text-align:center}.dx-bigt{font:var(--lk-hw,800) clamp(38px,6vw,86px)/1 var(--fhead);letter-spacing:-.04em;color:var(--bink);max-width:1000px;margin:0 auto 16px}.dx-bigform{max-width:560px;margin-top:26px}.dx-bigform .da-inline .nc-legal,.dx-bigform .da-inline .nc-legal-info{color:var(--bmuted)}
.dx-tel{color:var(--bink);font-weight:700;text-decoration:none;border-bottom:2px solid color-mix(in srgb,var(--bp) 50%,transparent)}.dx-ctatel{margin-top:22px;display:flex;flex-direction:column;gap:4px}.dx-ctatel .dx-tel{font:800 26px var(--fhead);display:inline-flex;gap:10px;align-items:center;width:fit-content}.dx-ctatel small{color:var(--bmuted)}
.dx-foot{padding:44px 0 26px}.dx-foot a{color:inherit}.dx-fb{font:800 18px var(--fhead);display:block;margin-bottom:8px;color:inherit}.dx-fl{display:block;font-size:11.5px;letter-spacing:.1em;text-transform:uppercase;opacity:.6;margin-bottom:8px}.dx-fcopy{border-top:1px solid color-mix(in srgb,currentColor 18%,transparent);margin-top:28px;padding-top:16px;font-size:12.5px;opacity:.7}
.dx-covf{display:grid;grid-template-columns:140px 1fr;gap:10px}.dx-covf .form-control{margin:0!important}.dx-covf .da-go,.dx-covf .nc-legal,.dx-covf .nc-legal-info{grid-column:1/-1}.dx-note{font-size:13px;color:var(--bmuted);margin:12px 0 0}
.dx-lbl{display:block;font-size:13px;font-weight:600;color:var(--bink);margin:18px 0 6px}.dx-calcin{display:flex;align-items:center;gap:10px}.dx-calcin .form-control{font:800 26px var(--fhead);max-width:200px}.dx-calcin span{color:var(--bmuted);font-weight:600}
.dx-calcout{display:grid;grid-template-columns:1fr 1fr;gap:12px}.dx-calcout div{background:color-mix(in srgb,var(--bp) 7%,#fff);border-radius:12px;padding:16px}.dx-calcout span{display:block;font-size:12.5px;color:var(--bmuted)}.dx-calcout b{font:800 30px/1.1 var(--fhead);color:var(--bpt);overflow-wrap:anywhere}
.dx-guar{display:flex;gap:28px;align-items:center;border:2px solid var(--bink);border-radius:var(--rc,18px);padding:30px 34px;background:#fff;color:var(--ink0)}.dx-seal{flex:0 0 96px;height:96px;border-radius:50%;display:grid;place-items:center;border:3px double var(--bp);color:var(--bp);font-size:44px;transform:rotate(-8deg)}
.dx-cd{background:var(--bink);color:#fff;padding:16px 0;font-size:15px}.dx-cd .nci{color:color-mix(in srgb,var(--ba) 70%,#fff);font-size:20px}.dx-cdn{display:flex;gap:8px;font-family:var(--fmono,var(--fhead))}.dx-cdn span{background:rgba(255,255,255,.1);border-radius:8px;padding:6px 10px;text-align:center;min-width:52px}.dx-cdn b{display:block;font-size:22px;line-height:1}.dx-cdn small{font-size:10.5px;opacity:.7}.dx-cd .dx-note{color:rgba(255,255,255,.65);margin:0}
.dx-letter{background:#fff;color:var(--ink0);padding:44px 48px;border-radius:6px;box-shadow:0 1px 0 rgba(0,0,0,.04),0 24px 50px -30px rgba(0,0,0,.35);background-image:repeating-linear-gradient(180deg,transparent 0 33px,color-mix(in srgb,var(--ink0) 6%,transparent) 33px 34px)}
.dx-ltxt{font-size:18px;line-height:34px;color:var(--ink0);white-space:pre-line;margin:18px 0 26px}.dx-sign{display:flex;gap:14px;align-items:center}.dx-sign img{width:56px;height:56px;border-radius:50%;object-fit:cover}.dx-hand{font:700 30px/1 var(--fhand,var(--fhead));color:var(--bpt);display:block}.dx-sign small{color:#6b6472}
.dx-wa{position:fixed;right:18px;bottom:18px;z-index:1045;display:inline-flex;align-items:center;gap:10px;background:#25D366;color:#063;border-radius:99px;padding:12px 18px 12px 14px;font-weight:700;text-decoration:none;box-shadow:0 12px 30px -8px rgba(0,0,0,.35)}.dx-wa .nci{width:26px;height:26px}
@media (max-width:767px){.dx-faq-open{grid-template-columns:1fr;gap:18px}
 .dx-ptab{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;margin:0 -20px;border-radius:0;border-left:0;border-right:0;scrollbar-width:none}.dx-ptab .col{flex:0 0 78%;scroll-snap-align:start}
 .dx-prows .r{grid-template-columns:30px 1fr;gap:8px 12px}.dx-prows .pp,.dx-prows .da-btn{grid-column:2}.dx-prows .pp{font-size:30px}
 .dx-wall{columns:1}.dx-bigt{font-size:calc(var(--mh,1)*clamp(32px,9vw,44px))}.dx-covf{grid-template-columns:1fr}
 .dx-calcout b{font-size:24px}.dx-guar{flex-direction:column;align-items:flex-start;padding:24px}.dx-seal{flex-basis:auto;width:76px;height:76px;font-size:34px}
 .dx-cd{font-size:14px}.dx-letter{padding:28px 22px}.dx-ltxt{font-size:16.5px;line-height:30px}
 .dx-wa{bottom:16px;padding:14px}.dx-wa span{display:none}body:has(.da-sticky,.db-sticky,.dc-sticky) .dx-wa{bottom:92px}}`;}

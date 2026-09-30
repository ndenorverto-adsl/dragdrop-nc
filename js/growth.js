/* ---------- CRECIMIENTO (v4.3) ----------
   · Texto dinámico por keyword: reglas “palabras | titular | destacado | botón” según ?kw= / utm_term.
     La keyword SOLO se usa para elegir regla; nunca se escribe en la página (sin riesgo de inyección ni de textos raros).
   · Horario del call center (hora de Madrid): fuera de horario oculta la llamada y avisa de cuándo llamamos.
   · Validación del teléfono en vivo en todos los formularios.
   · Bloques: popup de salida, formulario en 2 pasos, nosotros vs. otros y banda de garantías. */
const NC_HOL_ES="01/01, 06/01, 01/05, 15/08, 12/10, 01/11, 06/12, 08/12, 25/12";
Object.assign(state.settings,{dtrOn:false,dtrParams:"kw, utm_term",dtrRules:"",dtrTest:"",hoursOn:false,hoursDays:"1,2,3,4,5",hoursFrom:"09:00",hoursTo:"21:00",hoursSat:false,hoursSatFrom:"10:00",hoursSatTo:"14:00",hoursHol:NC_HOL_ES,hoursMode:"hide",hoursSim:"real",telLive:true});
Object.keys(state.settings).forEach(k=>{if(!(k in SETTINGS_DEFAULT))SETTINGS_DEFAULT[k]=JSON.parse(JSON.stringify(state.settings[k]));});

function ncDtrRules(txt){return String(txt||"").split("\n").map(l=>l.split("|").map(x=>x.trim())).filter(r=>r[0]&&(r[1]||r[2]||r[3])).slice(0,40)
  .map(r=>({k:r[0].split(",").map(w=>ncNorm(w)).filter(Boolean),h:r[1]||"",hl:r[2]||"",b:r[3]||""}));}
function ncNorm(s){return String(s||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[+_]/g," ").replace(/\s+/g," ").trim();}
function ncGrowthCfg(forExport){const st=state.settings,c={};
  if(st.dtrOn){const rules=ncDtrRules(st.dtrRules);if(rules.length){c.dtr={p:String(st.dtrParams||"kw").split(",").map(x=>x.trim()).filter(Boolean).slice(0,6),r:rules};if(!forExport&&st.dtrTest)c.dtr.t=ncNorm(st.dtrTest);}}
  if(st.hoursOn){const days=String(st.hoursDays||"").split(",").map(Number).filter(n=>n>=1&&n<=7);
    c.hrs={d:days,f:st.hoursFrom||"09:00",t:st.hoursTo||"21:00",s:st.hoursSat?[st.hoursSatFrom||"10:00",st.hoursSatTo||"14:00"]:null,
      h:String(st.hoursHol||"").split(/[,\s]+/).map(x=>x.trim()).filter(x=>/^\d{1,2}\/\d{1,2}$/.test(x)).map(x=>x.split("/").map(n=>n.padStart(2,"0")).join("/")),m:st.hoursMode||"hide"};
    if(!forExport&&st.hoursSim!=="real")c.hrs.sim=st.hoursSim;}
  if(st.telLive!==false)c.tel=1;
  return c;}
const NC_GROWTH_JS=`(function(){var D=document,B=D.body,W=window,C={};try{C=JSON.parse(B.getAttribute('data-ncg')||'{}');}catch(e){}
W.dataLayer=W.dataLayer||[];function push(o){try{W.dataLayer.push(o);}catch(e){}}
function norm(s){s=String(s||'').toLowerCase();try{s=s.normalize('NFD').replace(/[\\u0300-\\u036f]/g,'');}catch(e){}return s.replace(/[+_]/g,' ').replace(/\\s+/g,' ').trim().slice(0,160);}
function setTxt(el,t){if(!el||!t)return;for(var i=0;i<el.childNodes.length;i++){var n=el.childNodes[i];if(n.nodeType===3&&n.nodeValue.trim()){n.nodeValue=t+' ';return;}}el.insertBefore(D.createTextNode(t+' '),el.firstChild);}
function hidden(f,k,v){if(f.querySelector('input[name="'+k+'"]'))return;var i=D.createElement('input');i.type='hidden';i.name=k;i.value=v;f.appendChild(i);}
/* Texto dinámico por keyword */
if(C.dtr){var q;try{q=new URLSearchParams(location.search);}catch(e){q=null;}var kw='';
 if(q)for(var i=0;i<C.dtr.p.length&&!kw;i++){kw=q.get(C.dtr.p[i])||'';}kw=norm(kw)||C.dtr.t||'';
 if(kw){for(var r=0;r<C.dtr.r.length;r++){var R=C.dtr.r[r],hit=false;for(var j=0;j<R.k.length;j++){var ws=R.k[j].split(' '),all=true;for(var w=0;w<ws.length;w++)if(kw.indexOf(ws[w])<0){all=false;break;}if(all){hit=true;break;}}
  if(!hit)continue;var h1=D.querySelector('.da-h1,.db-h1,.dc-h1,h1');
  if(h1){var mk=h1.querySelector('mark,em,.dc-grad');if(R.h){for(var n=h1.childNodes.length-1;n>=0;n--){if(h1.childNodes[n]!==mk)h1.removeChild(h1.childNodes[n]);}h1.insertBefore(D.createTextNode(R.h+' '),mk||null);}if(mk&&R.hl)mk.textContent=R.hl;else if(!mk&&R.hl)h1.appendChild(D.createTextNode(R.hl));}
  if(R.b){var hero=h1&&h1.closest('section,header');if(hero){var bs=hero.querySelectorAll('button[type=submit],.da-btn.pri,.db-go,.dc-go');for(var b=0;b<bs.length;b++)setTxt(bs[b],R.b);}}
  B.setAttribute('data-dtr',String(r+1));push({event:'dtr_match',dtr_rule:r+1});D.querySelectorAll('form[data-callback]').forEach(function(f){hidden(f,'dtr_regla',String(r+1));});break;}}}
/* Horario del call center (Europe/Madrid) */
if(C.hrs){var H=C.hrs,DN={lun:1,mar:2,'mié':3,mie:3,jue:4,vie:5,'sáb':6,sab:6,dom:7};
 function parts(t){try{var p=new Intl.DateTimeFormat('es-ES',{timeZone:'Europe/Madrid',weekday:'short',day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(t),o={};p.forEach(function(x){o[x.type]=x.value;});return {wd:DN[norm(o.weekday).replace('.','')]||DN[String(o.weekday).toLowerCase().replace('.','')]||0,dm:o.day+'/'+o.month,min:(+o.hour)*60+(+o.minute)};}catch(e){var d=new Date(t);return {wd:(d.getDay()||7),dm:('0'+d.getDate()).slice(-2)+'/'+('0'+(d.getMonth()+1)).slice(-2),min:d.getHours()*60+d.getMinutes()};}}
 function mm(s){var a=String(s).split(':');return (+a[0])*60+(+a[1]||0);}
 function win(p){if(H.h.indexOf(p.dm)>-1)return null;if(p.wd===6&&H.s)return [mm(H.s[0]),mm(H.s[1])];if(H.d.indexOf(p.wd)>-1)return [mm(H.f),mm(H.t)];return null;}
 var now=Date.now(),P=parts(now),w0=win(P),open=!!(w0&&P.min>=w0[0]&&P.min<w0[1]);if(H.sim)open=H.sim==='open';
 var next='';if(!open){for(var k=0;k<8;k++){var pk=parts(now+k*864e5),wk=win(pk);if(!wk)continue;if(k===0&&P.min>=wk[0])continue;var hh=Math.floor(wk[0]/60)+':'+('0'+wk[0]%60).slice(-2);var dias=['','el lunes','el martes','el miércoles','el jueves','el viernes','el sábado','el domingo'];next=(k===0?'hoy':k===1?'mañana':dias[pk.wd])+' a partir de las '+hh;break;}}
 B.classList.add(open?'nc-open':'nc-closed');if(!open&&H.m==='hide')B.classList.add('nc-closed-hide');
 push({event:'hours_state',hours_open:open});
 if(!open){D.querySelectorAll('form[data-callback]').forEach(function(f){hidden(f,'fuera_horario','si');if(f.querySelector('.nc-hours-note'))return;var p=D.createElement('p');p.className='nc-hours-note';p.setAttribute('role','status');p.textContent='Ahora mismo estamos fuera de horario. Déjanos tu teléfono y te llamamos '+(next||'en cuanto abramos')+'.';f.insertBefore(p,f.firstChild);});}}
/* Teléfono: validación en vivo */
if(C.tel){D.querySelectorAll('form input[type=tel]').forEach(function(i){var hint=D.createElement('small');hint.className='nc-telhint';hint.setAttribute('aria-live','polite');i.insertAdjacentElement('afterend',hint);
 function dg(){var d=String(i.value||'').replace(/\\D/g,'');if(d.indexOf('0034')===0)d=d.slice(4);else if(d.length===11&&d.indexOf('34')===0)d=d.slice(2);return d;}
 function chk(strict){var d=dg(),ok=/^[6789]\\d{8}$/.test(d);i.classList.toggle('is-valid',ok);var bad=!ok&&(strict?d.length>0:d.length>=9||/^[0-5]/.test(d));i.classList.toggle('is-invalid',bad);i.setAttribute('aria-invalid',bad?'true':'false');hint.textContent=bad?'Revisa el número: 9 cifras que empiezan por 6, 7, 8 o 9.':'';i.setCustomValidity(bad&&strict?'Revisa el número de teléfono':'');}
 i.addEventListener('input',function(){chk(false);});i.addEventListener('blur',function(){chk(true);});});}
/* Popup de salida */
var X=D.getElementById('ncExit');if(X){var shown=false;try{shown=sessionStorage.getItem('nc_exit')==='1';}catch(e){}
 function show(src){if(shown||B.classList.contains('nc-sent'))return;shown=true;try{sessionStorage.setItem('nc_exit','1');}catch(e){}X.hidden=false;X.classList.add('on');push({event:'exit_intent_show',exit_trigger:src});var f=X.querySelector('input');if(f)setTimeout(function(){f.focus();},60);}
 function hide(){X.classList.remove('on');X.hidden=true;}
 var arm=Date.now()+(+(X.getAttribute('data-delay')||8))*1000;
 D.addEventListener('mouseout',function(e){if(Date.now()<arm)return;if(!e.relatedTarget&&e.clientY<=0)show('mouse');});
 var lastY=W.scrollY,lastT=Date.now();W.addEventListener('scroll',function(){var y=W.scrollY,t=Date.now();if(Date.now()>arm&&y<lastY-260&&t-lastT<400&&y>600)show('scroll_up');lastY=y;lastT=t;},{passive:true});
 X.addEventListener('click',function(e){if(e.target===X||e.target.closest('[data-exit-close]'))hide();});D.addEventListener('keydown',function(e){if(e.key==='Escape'&&!X.hidden)hide();});
 D.addEventListener('submit',function(e){if(e.target.closest&&e.target.closest('form'))B.classList.add('nc-sent');},true);}
/* Formulario en 2 pasos */
D.querySelectorAll('[data-steps2]').forEach(function(f){var lg0=f.querySelector('.nc-legal'),s1=f.querySelector('[data-s1]'),s2=f.querySelector('[data-s2]'),bar=f.parentNode.querySelector('.dx-f2bar i'),lab=f.parentNode.querySelector('[data-f2lab]');
 if(lg0&&s2)s2.insertBefore(lg0,s2.querySelector('button[type=submit]'));var go=f.querySelector('[data-next]');if(!go)return;go.addEventListener('click',function(){var t=s1.querySelector('input[type=tel]');if(t){t.dispatchEvent(new Event('blur'));if(!t.checkValidity()||t.classList.contains('is-invalid')){t.reportValidity();return;}}
  s1.hidden=true;s2.hidden=false;if(bar)bar.style.width='100%';if(lab)lab.textContent=lab.getAttribute('data-f2lab');push({event:'form_step',form_step:2});var n=s2.querySelector('input,select');if(n)n.focus();});
 var back=f.querySelector('[data-back]');if(back)back.addEventListener('click',function(){s2.hidden=true;s1.hidden=false;if(bar)bar.style.width='50%';});});
})();`;
function ncGrowthCSS(){return `
.nc-telhint{display:block;min-height:0;font-size:12.5px;line-height:1.3;color:#b42318;margin:-4px 0 8px}.nc-telhint:empty{display:none}
.form-control.is-valid{border-color:#16a34a!important;background-image:none!important;padding-right:.75rem!important}.form-control.is-invalid{border-color:#dc2626!important;background-image:none!important;padding-right:.75rem!important}
.nc-hours-note{margin:0 0 10px;padding:10px 12px;border-radius:10px;background:color-mix(in srgb,var(--ba) 22%,#fff);color:var(--ink0);font-size:13.5px;line-height:1.4;font-weight:600}
body.nc-closed-hide a[href^="tel:"]:not(footer a):not(.nc-keep){display:none!important}
body.nc-closed-hide .da-live,body.nc-closed-hide .nc-when-open{display:none!important}
body.nc-open .nc-when-closed{display:none!important}
.dx-exit{position:fixed;inset:0;z-index:2000;display:none;place-items:center;padding:16px;background:rgba(10,10,14,.55)}.dx-exit.on{display:grid}
.dx-exit .box{position:relative;width:min(460px,100%);background:#fff;color:var(--ink0);border-radius:var(--cardr,18px);padding:30px 26px 24px;box-shadow:0 30px 80px rgba(0,0,0,.35)}
.dx-exit .x{position:absolute;right:10px;top:10px;width:40px;height:40px;border:0;background:none;font-size:26px;line-height:1;color:#6b6472;cursor:pointer}
.dx-exit h2{font:var(--lk-hw,800) 26px/1.12 var(--fhead);letter-spacing:-.02em;margin:0 30px 8px 0;color:var(--ink0)}.dx-exit p{color:#6b6472;margin:0 0 16px;font-size:15px}
.dx-exit .form-control{min-height:52px;font-size:16px}.dx-exit .da-go{width:100%}.dx-exit .no{display:block;margin:12px auto 0;background:none;border:0;color:#6b6472;font-size:13px;text-decoration:underline;cursor:pointer}
@media (max-width:575px){.dx-exit{place-items:end center;padding:0}.dx-exit .box{border-radius:20px 20px 0 0;width:100%}}
.dx-f2{max-width:560px;margin:0 auto}.dx-f2bar{height:6px;border-radius:9px;background:color-mix(in srgb,var(--bp) 14%,#fff);overflow:hidden;margin:0 0 8px}.dx-f2bar i{display:block;height:100%;width:50%;background:var(--bp);border-radius:9px;transition:width .35s}
.dx-f2lab{font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--bpt);margin:0 0 14px}
.dx-f2 .row2{display:grid;grid-template-columns:1fr 1fr;gap:10px}.dx-f2 .back{background:none;border:0;color:var(--bmuted);font-size:14px;text-decoration:underline;margin-top:10px;cursor:pointer}
@media (max-width:575px){.dx-f2 .row2{grid-template-columns:1fr}}
.dx-vs{border:1px solid var(--dline);border-radius:var(--cardr,16px);overflow:hidden;background:#fff;color:var(--ink0)}
.dx-vs .r{display:grid;grid-template-columns:1.3fr 1fr 1fr;align-items:center;border-top:1px solid var(--dline)}.dx-vs .r:first-child{border-top:0}
.dx-vs .r>div{padding:14px 18px;font-size:15px}.dx-vs .hd>div{font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#6b6472}
.dx-vs .us{background:color-mix(in srgb,var(--bp) 8%,#fff);font-weight:700}.dx-vs .hd .us{color:var(--bpt);box-shadow:inset 0 3px 0 var(--bp)}
.dx-vs .nci{width:18px;height:18px;vertical-align:-3px;margin-right:6px}.dx-vs .ok .nci{color:#16a34a}.dx-vs .no .nci{color:#dc2626}
@media (max-width:767px){.dx-vs .r{grid-template-columns:1fr 1fr}.dx-vs .r>div:first-child{grid-column:1/-1;padding-bottom:0;font-weight:700}.dx-vs .hd>div:first-child{display:none}.dx-vs .r>div{padding:10px 14px}}
.dx-seals{padding:22px 0;border-top:1px solid var(--dline);border-bottom:1px solid var(--dline)}
.dx-seals .it{display:flex;gap:12px;align-items:flex-start;min-width:0}.dx-seals .nci{flex:0 0 auto;width:38px;height:38px;padding:9px;border-radius:12px;background:color-mix(in srgb,var(--bp) 10%,#fff);color:var(--bp)}
.dx-seals b{display:block;font-size:15px;line-height:1.25;color:var(--bink)}.dx-seals small{display:block;font-size:13px;color:var(--bmuted);line-height:1.35}
body.lk-terminal .dx-vs{background:#161B22;color:#E6EDF3;border-color:#30363D}body.lk-terminal .dx-vs .r{border-color:#30363D}body.lk-terminal .dx-vs .us{background:#1c232c}body.lk-terminal .dx-vs .hd>div{color:#9AA4AF}body.lk-terminal .dx-seals .nci{background:#1c232c}body.lk-terminal .nc-hours-note{background:#1c232c;color:#E6EDF3}`;}

/* ---- Bloques nuevos ---- */
const G_I=n=>ncIco(n);
Object.assign(LIB,{
dx_exit:{label:"✚ Popup de salida (exit-intent)",ico:"⇱",cat:"Extras CRO",raw:true,
  def:()=>({title:"¿Te vas sin tu precio?",sub:"Déjanos tu teléfono y te lo damos en una llamada corta. Sin compromiso.",btn:"Llamadme",no:"No, gracias",delay:"8"}),
  fields:[{k:"title",l:"Título"},{k:"sub",l:"Texto",t:"ta"},{k:"btn",l:"Botón"},{k:"no",l:"Texto para cerrar"},{k:"delay",l:"Segundos antes de poder salir (mín. 3)"}],
  render:p=>`<div class="da dx-exit" id="ncExit" hidden role="dialog" aria-modal="true" aria-labelledby="ncExitT" data-delay="${Math.max(3,parseInt(p.delay,10)||8)}"><div class="box"><button type="button" class="x" data-exit-close aria-label="Cerrar">×</button>
    <h2 id="ncExitT">${esc(p.title)}</h2><p>${esc(p.sub)}</p>${v4PhoneForm({btn:p.btn,btnCls:"da-go",arrow:true})}<button type="button" class="no" data-exit-close>${esc(p.no)}</button></div></div>`},
dx_form2:{label:"✚ Formulario en 2 pasos",ico:"⇉",cat:"Extras CRO",raw:true,
  def:()=>({kicker:"Paso 1 de 2",kicker2:"Paso 2 de 2 · casi está",title:"Te llamamos gratis",sub:"Empieza por tu teléfono. Solo te pediremos un dato más.",btn1:"Continuar",btn2:"Quiero que me llaméis",f2a:"Nombre",f2b:"Código postal",safe:"Tu número solo se usa para llamarte."}),
  fields:[{k:"title",l:"Título"},{k:"sub",l:"Texto"},{k:"kicker",l:"Etiqueta paso 1"},{k:"kicker2",l:"Etiqueta paso 2"},{k:"btn1",l:"Botón paso 1"},{k:"btn2",l:"Botón final"},{k:"f2a",l:"Campo 2 (vacío = no se pide)"},{k:"f2b",l:"Campo 3 (vacío = no se pide)"},{k:"safe",l:"Texto de confianza"}],
  render:p=>`<section class="da da-sec soft" id="form"><div class="container"><div class="dx-f2 da-card"><div class="dx-f2bar" aria-hidden="true"><i></i></div><div class="dx-f2lab" data-f2lab="${esc(p.kicker2)}">${esc(p.kicker)}</div>
    <h2 class="da-h2" style="font-size:clamp(26px,3vw,36px)">${esc(p.title)}</h2><p class="da-muted">${esc(p.sub)}</p>
    <form data-callback data-steps2 action="${v4Act()}" method="post"><div data-s1><input required name="telefono" type="tel" inputmode="tel" autocomplete="tel" class="form-control mb-2" placeholder="${esc(vt("phone"))}"><button type="button" data-next class="da-go">${esc(p.btn1)} ${I_GO()}</button></div>
    <div data-s2 hidden><div class="row2">${p.f2a?`<input name="nombre" class="form-control mb-2" placeholder="${esc(p.f2a)}" autocomplete="name">`:""}${p.f2b?`<input name="codigo_postal" class="form-control mb-2" placeholder="${esc(p.f2b)}" inputmode="numeric" autocomplete="postal-code" pattern="[0-9]{5}" maxlength="5">`:""}</div>
    <button type="submit" class="da-go">${esc(p.btn2)} ${I_GO()}</button><button type="button" class="back" data-back>← Cambiar el teléfono</button></div></form>
    <p class="small da-muted mt-3 mb-0">${ncIco("lock")} ${esc(p.safe)}</p></div></div></section>`},
dx_vs:{label:"✚ Nosotros vs. otros",ico:"⇔",cat:"Extras CRO",raw:true,
  def:()=>({title:"Por qué elegirnos",sub:"Compáralo tú mismo.",us:"{{MARCA}}",them:"Otras opciones",rows:"{{VENTAJA_1}}|✓|✗\n{{VENTAJA_2}}|✓|✗\n{{VENTAJA_3}}|✓|A veces\n{{VENTAJA_4}}|✓|✗"}),
  fields:[{k:"title",l:"Título"},{k:"sub",l:"Subtítulo"},{k:"us",l:"Columna nuestra"},{k:"them",l:"Columna de los otros (sin nombrar competidores)"},{k:"rows",l:"Filas: concepto|nosotros|otros (✓ / ✗ / texto)",t:"ta"}],
  render:p=>{const cell=v=>{v=String(v||"").trim();return /^✓/.test(v)?`<span class="ok">${ncIco("check")}${esc(v.slice(1).trim()||"Sí")}</span>`:/^✗/.test(v)?`<span class="no">${ncIco("x")}${esc(v.slice(1).trim()||"No")}</span>`:esc(v);};
    return `<section class="da da-sec"><div class="container" style="max-width:920px"><div class="text-center mb-5"><h2 class="da-h2">${esc(p.title)}</h2><p class="da-muted">${esc(p.sub)}</p></div>
    <div class="dx-vs"><div class="r hd"><div></div><div class="us">${esc(p.us)}</div><div>${esc(p.them)}</div></div>${v4L(p.rows).map(l=>{const c=l.split("|");return `<div class="r"><div>${esc(c[0])}</div><div class="us">${cell(c[1])}</div><div>${cell(c[2])}</div></div>`;}).join("")}</div></div></section>`;}},
dx_seals:{label:"✚ Banda de garantías",ico:"▭",cat:"Extras CRO",raw:true,
  def:()=>({items:"lock|Tus datos, protegidos|Solo los usamos para llamarte\nphone|Llamada sin compromiso|Tú decides después\nbadge-check|{{GARANTIA}}|{{CONDICION}}\nclock|{{HORARIO}}|Atención de personas reales"}),
  fields:[{k:"items",l:"Garantías: icono|título|texto (iconos: lock, phone, badge-check, clock, shield-check, euro, handshake, calendar)",t:"ta"}],
  render:p=>`<section class="da dx-seals"><div class="container"><div class="row g-3 g-lg-4">${v4L(p.items).map(l=>{const c=l.split("|");return `<div class="col-6 col-lg-3"><div class="it">${ncIco(NC_ICONS[c[0]]?c[0]:"badge-check")}<div><b>${esc(c[1]||"")}</b><small>${esc(c[2]||"")}</small></div></div></div>`;}).join("")}</div></div></section>`}
});
(function(){const X=["dx_form2","dx_vs","dx_seals","dx_exit"];let i=ORDER.indexOf("dx_thanks");if(i<0)i=ORDER.length;else i++;ORDER.splice(i,0,...X);})();

const NC_GROWTH_PREVIEW_CSS=`.dx-exit[hidden]{display:block!important;position:relative;inset:auto;background:repeating-linear-gradient(135deg,rgba(0,0,0,.04) 0 10px,transparent 10px 20px);padding:28px 16px}.dx-exit[hidden]::before{content:"Popup de salida · solo aparece al intentar salir de la página (una vez por visita)";display:block;text-align:center;font:600 12px/1.3 ui-monospace,monospace;color:#6b6472;margin:0 0 12px}.dx-exit[hidden] .box{margin:0 auto}`;
/* ---- Inyección en el documento (preview y export) ---- */
(function(){const _bd=buildDoc;buildDoc=function(forExport){let h=_bd.apply(this,arguments);const c=ncGrowthCfg(!!forExport);
  const need=Object.keys(c).length||/id="ncExit"|data-steps2/.test(h);
  h=h.replace("</head>",`<style>${ncGrowthCSS()}${forExport?"":NC_GROWTH_PREVIEW_CSS}</style></head>`);
  if(!need)return h;
  h=h.replace(/<body /,`<body data-ncg="${esc(JSON.stringify(c))}" `);
  return h.replace(/<\/body>(?![\s\S]*<\/body>)/,`<script>${NC_GROWTH_JS}<\/script></body>`);};})();

/* ---- Panel Global: texto dinámico, horario y teléfono ---- */
(function(){const _rg=renderGlobal;renderGlobal=function(){_rg.apply(this,arguments);const gf=document.getElementById("globalFields");if(!gf||gf.querySelector("#gGrowth"))return;const st=state.settings;
  const days=String(st.hoursDays||"").split(",");
  const html=`<div id="gGrowth">
  <div class="paneltitle" style="padding:10px 0 4px">Texto dinámico por keyword</div>
  <div class="fld inline"><label>Activar</label><input type="checkbox" id="gDtrOn" ${st.dtrOn?'checked':''}></div>
  ${st.dtrOn?`<div class="fld"><label>Parámetros de la URL que se leen</label><input id="gDtrParams" value="${esc(st.dtrParams)}"><div class="help">En Google Ads añade a la URL final <code>?kw={keyword}</code> (o usa utm_term). Se lee el primero que venga.</div></div>
  <div class="fld"><label>Reglas (una por línea)</label><textarea id="gDtrRules" rows="5" placeholder="1 gb, 1000 mb | Fibra de 1 Gb | al mejor precio | Quiero mi 1 Gb&#10;madrid | Fibra en Madrid | con instalación gratis">${esc(st.dtrRules)}</textarea>
    <div class="help"><b>palabras | titular | parte destacada | botón</b>. Las palabras se separan por comas (vale cualquiera; si son varias, tienen que aparecer todas). Gana la primera regla que encaje. La keyword nunca se escribe en la página: solo elige el texto.</div></div>
  <div class="fld"><label>Probar en la vista previa con…</label><input id="gDtrTest" value="${esc(st.dtrTest)}" placeholder="p. ej. fibra 1 gb barata"></div>
  <div class="help" id="gDtrOut" style="margin:-4px 0 8px;font-size:12px"></div>`:''}
  <div class="paneltitle" style="padding:10px 0 4px">Horario de llamada</div>
  <div class="fld inline"><label>Activar (hora de Madrid)</label><input type="checkbox" id="gHrsOn" ${st.hoursOn?'checked':''}></div>
  ${st.hoursOn?`<div class="fld"><label>Días</label><div class="nc-days">${["L","M","X","J","V","S","D"].map((d,i)=>`<label><input type="checkbox" data-day="${i+1}" ${days.includes(String(i+1))?'checked':''}>${d}</label>`).join("")}</div></div>
  <div class="fld"><label>Horario</label><div class="nc-hrow"><input type="time" id="gHrsFrom" value="${esc(st.hoursFrom)}"><span>a</span><input type="time" id="gHrsTo" value="${esc(st.hoursTo)}"></div></div>
  <div class="fld inline"><label>Sábado con otro horario</label><input type="checkbox" id="gHrsSat" ${st.hoursSat?'checked':''}></div>
  ${st.hoursSat?`<div class="fld"><div class="nc-hrow"><input type="time" id="gHrsSatFrom" value="${esc(st.hoursSatFrom)}"><span>a</span><input type="time" id="gHrsSatTo" value="${esc(st.hoursSatTo)}"></div></div>`:''}
  <div class="fld"><label>Festivos (dd/mm, separados por comas)</label><input id="gHrsHol" value="${esc(st.hoursHol)}"><div class="help">Vienen los nacionales de fecha fija. Añade Semana Santa y los festivos autonómicos o locales del call center.</div></div>
  <div class="fld"><label>Fuera de horario</label><select id="gHrsMode"><option value="hide" ${st.hoursMode==='hide'?'selected':''}>Ocultar la llamada y avisar en el formulario</option><option value="note" ${st.hoursMode==='note'?'selected':''}>Solo avisar en el formulario</option></select></div>
  <div class="fld"><label>Vista previa</label><select id="gHrsSim"><option value="real" ${st.hoursSim==='real'?'selected':''}>Hora real</option><option value="open" ${st.hoursSim==='open'?'selected':''}>Simular abierto</option><option value="closed" ${st.hoursSim==='closed'?'selected':''}>Simular cerrado</option></select><div class="help">Los leads fuera de horario llegan con <code>fuera_horario=si</code> y se lanza el evento <code>hours_state</code>.</div></div>`:''}
  <div class="paneltitle" style="padding:10px 0 4px">Teléfono</div>
  <div class="fld inline"><label>Validar el teléfono mientras se escribe</label><input type="checkbox" id="gTelLive" ${st.telLive!==false?'checked':''}></div></div>`;
  gf.insertAdjacentHTML("beforeend",html);
  const on=(id,k,rr)=>{const el=document.getElementById(id);if(el)el.addEventListener('change',()=>{commit();state.settings[k]=el.type==="checkbox"?el.checked:el.value;renderPreview();if(rr)renderGlobal();});};
  const tx=(id,k)=>{const el=document.getElementById(id);if(el)el.addEventListener('input',()=>{commitDebounced();state.settings[k]=el.value;renderPreview();dtrOut();});};
  on("gDtrOn","dtrOn",1);on("gHrsOn","hoursOn",1);on("gHrsSat","hoursSat",1);on("gHrsMode","hoursMode");on("gHrsSim","hoursSim");on("gTelLive","telLive");on("gHrsFrom","hoursFrom");on("gHrsTo","hoursTo");on("gHrsSatFrom","hoursSatFrom");on("gHrsSatTo","hoursSatTo");
  tx("gDtrParams","dtrParams");tx("gDtrRules","dtrRules");tx("gDtrTest","dtrTest");tx("gHrsHol","hoursHol");
  gf.querySelectorAll('[data-day]').forEach(c=>c.addEventListener('change',()=>{commit();state.settings.hoursDays=[...gf.querySelectorAll('[data-day]:checked')].map(x=>x.dataset.day).join(",");renderPreview();}));
  function dtrOut(){const o=document.getElementById("gDtrOut");if(!o)return;const rs=ncDtrRules(state.settings.dtrRules),kw=ncNorm(state.settings.dtrTest);
    if(!rs.length){o.textContent="Sin reglas válidas todavía.";return;}if(!kw){o.textContent=rs.length+" regla(s) lista(s).";return;}
    const i=rs.findIndex(r=>r.k.some(a=>a.split(" ").every(w=>kw.indexOf(w)>-1)));o.innerHTML=i<0?"Ninguna regla encaja: se ve el titular normal.":`Encaja la <b>regla ${i+1}</b>.`;}
  dtrOut();};})();

/* ---- Puntuación CRO: avisos de las funciones nuevas ---- */
(function(){if(typeof croChecks!=="function")return;const _cc=croChecks;croChecks=function(m,d,html){const out=_cc.apply(this,arguments),st=state.settings;
  if(st.dtrOn){const n=ncDtrRules(st.dtrRules).length;out.push({cat:"fold",w:1,v:n?1:.5,msg:n?`Texto dinámico: ${n} regla(s) activas.`:"Texto dinámico activado sin reglas.",det:n?"Comprueba que la URL final lleva ?kw={keyword}.":"",fix:""});}
  const tel=/href="tel:/.test(html);if(tel)out.push({cat:"fric",w:1,v:st.hoursOn?1:.5,msg:st.hoursOn?"La llamada respeta el horario del call center.":"Sin horario de llamada: fuera de horas la gente llamará y nadie contestará.",det:"",fix:""});
  return out;};})();

/* ---- Plantillas que usan los bloques nuevos ---- */
ucTpl("Conversión máxima · Telco","Conversión rápida","Telco","form","Telco: garantías bajo el hero, tarifas, nosotros vs. otros, formulario en 2 pasos y popup de salida. Activa el horario de llamada en Global.",
  [NAV("da"),ucHero("Telco"),{type:"dx_seals"},{type:"da_plans"},{type:"dx_vs"},{type:"dx_form2"},{type:"da_faq",props:{items:V4_SECTORS.Telco.faq}},{type:"dx_exit"},FOOT("da"),STK("da")]);
ucTpl("Conversión máxima · Alarmas","Conversión rápida","Alarmas","form","Alarmas: multipaso en el hero, garantías, comparativa, nosotros vs. otros y popup de salida.",
  [NAV("db"),ucHero("Alarmas"),{type:"dx_seals"},{type:"db_compare",props:V4_SECTORS.Alarmas.compare},{type:"dx_vs"},{type:"db_steps"},{type:"db_faq",props:{items:V4_SECTORS.Alarmas.faq}},{type:"dx_exit"},{type:"db_cta"},FOOT("db"),STK("db")]);

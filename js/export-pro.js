/* ---------- EXPORT PRO (Fase 1) ----------
   Mejora el HTML de cada sección y del documento exportado:
   · Formularios: atribución (UTM + click IDs), RGPD, honeypot, teléfono ES, autocomplete, a11y
   · Consent Mode v2 + banner de cookies con Rechazar / Configurar / Aceptar
   · Eventos dataLayer: click_to_call, whatsapp_click, cta_click, form_start, generate_lead, form_error
   · SEO / rendimiento: robots, canonical, OG, favicon, theme-color, FAQPage, LCP del hero
   · Checklist pre-export
   Se ejecuta tanto en el preview como en el export, así lo que ves es lo que se publica.
*/
const NC_ATTR_KEYS=["utm_source","utm_medium","utm_campaign","utm_term","utm_content","utm_id","gclid","gbraid","wbraid","fbclid","msclkid","ttclid","li_fat_id"];
const NC_CTX_KEYS=["landing_url","referrer"];
// Teléfono español: 9 cifras que empiezan por 6/7/8/9, con o sin +34/0034 y con espacios, puntos o guiones.
const NC_TEL_PATTERN="(?:\\+34|0034)?[ .\\-]*[6789](?:[ .\\-]*[0-9]){8}";

function ncBrandColor(){const b=BRANDS[state.settings.brand]||{};const m=(b.vars||"").match(/--bp:\s*([^;]+)/);return m?m[1].trim():"#6E5AFF";}
function ncTelDigits(){return String(state.settings.tel||"").replace(/\D/g,"");}

/* ---- 1. Mejora de secciones (formularios + imágenes) ---- */
function ncEnhanceHTML(html,s){
  if(!html||!/data-callback|<img/i.test(html))return html;
  let r;try{r=ncParse(html);}catch(e){return html;}
  ncEnhanceForms(r,(s&&s.type)||"form");
  ncEnhanceImages(r,s||{});
  return r.innerHTML;
}

function ncEnhanceForms(root,formId){
  const st=state.settings;
  root.querySelectorAll('form[data-callback]').forEach((f,i)=>{
    if(f.hasAttribute('data-nc-pro'))return;
    const fid=formId+(i?"_"+(i+1):"");
    f.setAttribute('data-nc-pro','1');f.setAttribute('data-form-id',fid);f.setAttribute('accept-charset','UTF-8');
    // Campos visibles: patrón, autocomplete y etiqueta accesible
    f.querySelectorAll('input,textarea,select').forEach(el=>{
      const t=(el.getAttribute('type')||el.tagName).toLowerCase(),n=(el.getAttribute('name')||'').toLowerCase();
      if(['hidden','checkbox','radio','submit','button'].includes(t))return;
      if(!el.getAttribute('aria-label')&&!(el.id&&f.querySelector('label[for="'+el.id+'"]'))){const ph=el.getAttribute('placeholder');if(ph)el.setAttribute('aria-label',ph);}
      if(t==='tel'){el.setAttribute('pattern',NC_TEL_PATTERN);el.setAttribute('title','Teléfono de 9 cifras (móvil o fijo español)');el.setAttribute('inputmode','tel');el.setAttribute('autocomplete','tel');el.setAttribute('maxlength','17');}
      else if(t==='email'){el.setAttribute('autocomplete','email');el.setAttribute('inputmode','email');}
      else if(/(^|_)(nombre|name)/.test(n)){el.setAttribute('autocomplete','name');}
      else if(/postal|(^|_)cp($|_)/.test(n)){el.setAttribute('autocomplete','postal-code');el.setAttribute('inputmode','numeric');if(!el.getAttribute('pattern'))el.setAttribute('pattern','[0-9]{5}');}
    });
    // Punto de inserción: justo antes del botón de envío
    const btn=f.querySelector('button[type="submit"],button:not([type]),input[type="submit"]');
    let anchor=btn;while(anchor&&anchor.parentElement!==f)anchor=anchor.parentElement;
    const ins=node=>{if(anchor)f.insertBefore(node,anchor);else f.appendChild(node);};
    const doc=f.ownerDocument;
    // Casilla de privacidad (RGPD) si el formulario no trae ya una
    const privBox=[...f.querySelectorAll('input[type="checkbox"]')].find(c=>/priv|acept|legal|rgpd|lopd/i.test((c.name||'')+' '+((c.parentElement&&c.parentElement.textContent)||'')));
    if(privBox){ // casilla ya existente en el bloque: que se envíe y enlace a la política
      if(!privBox.name){privBox.name='acepta_privacidad';privBox.value='si';}
      if(st.privacyCheck!==false)privBox.required=true;
      const lb=(privBox.id&&f.querySelector('label[for="'+privBox.id+'"]'))||privBox.parentElement;
      if(lb&&!lb.querySelector('a')){lb.innerHTML=lb.innerHTML.replace(/pol[ií]tica de privacidad/i,m=>`<a href="${esc(ph(st.urlPrivacy,'URL_PRIVACIDAD'))}" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline">${m}</a>`);}
    }
    if(st.privacyCheck!==false&&!privBox){
      const id='priv_'+fid;const d=doc.createElement('div');d.className='col-12 nc-legal';
      d.innerHTML=`<div class="form-check text-start mb-0"><input class="form-check-input" type="checkbox" required name="acepta_privacidad" value="si" id="${esc(id)}"><label class="form-check-label" for="${esc(id)}">${esc(st.privacyText||'He leído y acepto la')} <a href="${esc(ph(st.urlPrivacy,'URL_PRIVACIDAD'))}" target="_blank" rel="noopener">política de privacidad</a></label></div>`;
      ins(d);
    }
    // Honeypot anti-spam (invisible para personas, los bots lo rellenan)
    if(!f.querySelector('[name="nc_website"]')){const hp=doc.createElement('div');hp.className='nc-hp';hp.setAttribute('aria-hidden','true');hp.innerHTML='<label>No rellenar <input type="text" name="nc_website" tabindex="-1" autocomplete="off"></label>';f.appendChild(hp);}
    // Campos ocultos de atribución y contexto
    const hid=(k,v)=>{if(f.querySelector('input[name="'+k+'"]'))return;const h=doc.createElement('input');h.type='hidden';h.name=k;h.value=v||'';f.appendChild(h);};
    hid('form_id',fid);
    if(st.attribution!==false){NC_ATTR_KEYS.concat(NC_CTX_KEYS).forEach(k=>hid(k,''));}
    // Primera capa informativa RGPD (art. 13) si hay responsable definido
    if(st.legalOwner&&!f.querySelector('.nc-legal-info')){const p=doc.createElement('p');p.className='col-12 nc-legal-info';
      p.innerHTML=`<b>Responsable:</b> ${esc(st.legalOwner)}. <b>Finalidad:</b> atender tu solicitud y contactarte. <b>Derechos:</b> acceso, rectificación, supresión y otros, según la <a href="${esc(ph(st.urlPrivacy,'URL_PRIVACIDAD'))}" target="_blank" rel="noopener">política de privacidad</a>.`;
      f.appendChild(p);}
  });
}

function ncEnhanceImages(root,s){
  const imgs=[...root.querySelectorAll('img')];if(!imgs.length)return;
  const type=s.type||'';const lib=LIB[type]||{};
  const aboveFold=/hero/.test(type)||(lib.raw&&/nav|topbar/.test(type));
  imgs.forEach((im,i)=>{
    im.setAttribute('decoding','async');
    if(aboveFold){im.removeAttribute('loading');if(i===0&&/hero/.test(type))im.setAttribute('fetchpriority','high');}
    else if(!im.getAttribute('loading'))im.setAttribute('loading','lazy');
  });
  // alt descriptivo para la imagen principal si está vacío
  const h=root.querySelector('h1,h2');const first=imgs[0];
  if(h&&first&&!first.getAttribute('alt')&&!/logo/i.test(first.className)){first.setAttribute('alt',(h.textContent||'').replace(/\s+/g,' ').trim().slice(0,110));}
}

/* ---- 2. <head>: consentimiento, SEO y metadatos ---- */
function ncConsentHead(){
  if(state.settings.consent!=='banner')return '';
  return `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});
gtag('set','ads_data_redaction',true);gtag('set','url_passthrough',true);
try{var c=JSON.parse(localStorage.getItem('nc_consent')||'null');if(c&&c.v===1&&(Date.now()-c.ts)<34e9){gtag('consent','update',{ad_storage:c.m?'granted':'denied',ad_user_data:c.m?'granted':'denied',ad_personalization:c.m?'granted':'denied',analytics_storage:c.a?'granted':'denied'});}}catch(e){}
`;}

function ncHeadMeta(sectionsStr){
  const st=state.settings,b=BRANDS[st.brand]||{};const out=[];
  const title=esc(ph(st.title,"TITULO_SEO")),desc=esc(ph(st.desc,"META_DESCRIPTION"));
  out.push(`<meta name="robots" content="${st.noindex?'noindex, follow':'index, follow'}">`);
  const url=(st.pageUrl||'').trim();
  if(url){out.push(`<link rel="canonical" href="${esc(url)}">`,`<meta property="og:url" content="${esc(url)}">`);}
  out.push(`<meta property="og:locale" content="es_ES">`,`<meta property="og:site_name" content="${esc(b.name||'')}">`,`<meta property="og:description" content="${desc}">`);
  let og=(st.ogImage||'').trim();
  if(!og){const m=sectionsStr.match(/<img[^>]+fetchpriority="high"[^>]*>/)||[];const src=(m[0]||'').match(/src="(https?:[^"]+)"/);if(src)og=src[1].replace(/&amp;/g,'&');}
  if(og&&!/^data:/.test(og))out.push(`<meta property="og:image" content="${esc(og)}">`,`<meta name="twitter:card" content="summary_large_image">`);
  else out.push(`<meta name="twitter:card" content="summary">`);
  out.push(`<meta name="twitter:title" content="${title}">`,`<meta name="twitter:description" content="${desc}">`);
  const col=ncBrandColor();out.push(`<meta name="theme-color" content="${esc(col)}">`);
  if(st.favicon)out.push(`<link rel="icon" href="${esc(st.favicon)}">`);
  else{const svg=`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='16' fill='${col}'/></svg>`;out.push(`<link rel="icon" href="data:image/svg+xml,${encodeURIComponent(svg)}">`);}
  // Preload de la imagen del hero (LCP)
  const hero=(sectionsStr.match(/<img[^>]+fetchpriority="high"[^>]*>/)||[])[0];const hs=hero&&((hero.match(/src="(https?:[^"]+)"/)||[])[1]||'').replace(/&amp;/g,'&');
  if(hs)out.push(`<link rel="preload" as="image" href="${esc(hs)}" fetchpriority="high">`);
  // FAQPage (datos estructurados a partir de los acordeones)
  try{const r=ncParse(sectionsStr);const qa=[...r.querySelectorAll('.accordion-item')].map(it=>{const q=it.querySelector('.accordion-button,.accordion-header');const a=it.querySelector('.accordion-body');return(q&&a)?{"@type":"Question",name:q.textContent.trim(),acceptedAnswer:{"@type":"Answer",text:a.textContent.trim()}}:null;}).filter(x=>x&&x.name&&x.acceptedAnswer.text&&!/\{\{/.test(x.name+x.acceptedAnswer.text));
    if(qa.length)out.push(`<script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@type":"FAQPage",mainEntity:qa}).replace(/</g,'\\u003c')}<\/script>`);}catch(e){}
  return out.join("\n");
}

/* ---- 3. Banner de cookies (primera capa AEPD: aceptar y rechazar al mismo nivel) ---- */
function ncCookieBanner(){
  if(state.settings.consent!=='banner')return '';
  const st=state.settings;
  return `<div id="ncCookies" role="dialog" aria-live="polite" aria-label="Preferencias de cookies" hidden>
  <div class="nc-ck-in">
    <p class="nc-ck-txt">Usamos cookies propias y de terceros para analizar el uso de la web y mostrarte publicidad relacionada con tus preferencias. Puedes aceptarlas, rechazarlas o configurarlas. <a href="${esc(ph(st.urlCookies,'URL_COOKIES'))}" target="_blank" rel="noopener">Política de cookies</a></p>
    <div class="nc-ck-cfg" hidden>
      <label><input type="checkbox" checked disabled> Técnicas (necesarias)</label>
      <label><input type="checkbox" data-ck="a"> Analítica</label>
      <label><input type="checkbox" data-ck="m"> Publicidad</label>
    </div>
    <div class="nc-ck-btns">
      <button type="button" class="nc-ck-b" data-ck-act="config">Configurar</button>
      <button type="button" class="nc-ck-b nc-ck-save" data-ck-act="save" hidden>Guardar</button>
      <button type="button" class="nc-ck-b nc-ck-main" data-ck-act="reject">Rechazar</button>
      <button type="button" class="nc-ck-b nc-ck-main" data-ck-act="accept">Aceptar</button>
    </div>
  </div>
</div>
<div class="nc-cookie-link"><a href="#" data-nc-cookies>Configurar cookies</a></div>`;
}

function ncProCSS(){return `
.nc-hp{position:absolute!important;left:-9999px!important;top:auto;width:1px;height:1px;overflow:hidden}
.nc-legal .form-check-label,.nc-legal-info{font-size:.8rem;line-height:1.4;color:inherit;opacity:.85}
.nc-legal a,.nc-legal-info a{color:inherit;text-decoration:underline}
.nc-legal-info{margin:.6rem 0 0}
.nc-alert{margin-top:.6rem;padding:.7rem .9rem;border-radius:10px;background:#fdecec;color:#8a1c1c;font-size:.9rem;text-align:left}
.nc-alert a{color:inherit;font-weight:700}
.nc-sending{opacity:.75;pointer-events:none}
#ncCookies{position:fixed;left:12px;right:12px;bottom:12px;z-index:1060;background:var(--bink,#111);color:#fff;border-radius:16px;box-shadow:0 12px 40px rgba(0,0,0,.35);max-width:760px;margin:0 auto}
#ncCookies[hidden]{display:none}
.nc-ck-in{padding:16px 18px}
.nc-ck-txt{font-size:13px;line-height:1.45;margin:0 0 12px;opacity:.95}
.nc-ck-txt a{color:inherit;text-decoration:underline}
.nc-ck-cfg{display:flex;flex-wrap:wrap;gap:14px;font-size:13px;margin:0 0 12px}
.nc-ck-cfg[hidden]{display:none}
.nc-ck-cfg label{display:flex;gap:6px;align-items:center}
.nc-ck-btns{display:flex;flex-wrap:wrap;gap:8px;justify-content:flex-end}
.nc-ck-b{border:1px solid rgba(255,255,255,.45);background:transparent;color:#fff;border-radius:10px;padding:9px 14px;font-size:14px;font-weight:600;min-height:44px}
.nc-ck-b[hidden]{display:none}
.nc-ck-main{background:#fff;color:var(--bink,#111);border-color:#fff;min-width:120px}
@media (max-width:575px){.nc-ck-btns{justify-content:stretch}.nc-ck-main{flex:1}.nc-ck-b[data-ck-act=config]{order:3;flex-basis:100%;border:0;text-decoration:underline;min-height:36px;padding:4px}}
.nc-cookie-link{text-align:center;font-size:12px;padding:12px 0 18px;opacity:.7}
.nc-cookie-link a{color:inherit}
`;}

/* ---- 4. JS de la landing exportada (tracking, atribución, formularios, cookies) ---- */
function ncRuntimeConfig(){const st=state.settings;return {thanks:!!st.thanks,thanksText:st.thanksText||'¡Gracias! Te llamamos enseguida.',thanksUrl:st.thanksUrl||'',ec:st.ecData!==false,tel:ncTelDigits(),consent:st.consent||'none'};}
function ncRuntimeJS(){return `(function(){
var W=window,D=document,B=D.body;W.dataLayer=W.dataLayer||[];
function push(o){try{W.dataLayer.push(o);}catch(e){}}
var CFG={};try{CFG=JSON.parse(B.getAttribute('data-nc')||'{}');}catch(e){}
var KEYS=${JSON.stringify(NC_ATTR_KEYS)};
/* Atribución: último clic con parámetros; se conserva durante la sesión */
var attr={};try{attr=JSON.parse(sessionStorage.getItem('nc_attr')||'{}');}catch(e){}
var q;try{q=new URLSearchParams(location.search);}catch(e){q={get:function(){return null;}};}
var fresh=KEYS.some(function(k){return !!q.get(k);});
if(fresh){attr={};KEYS.forEach(function(k){var v=q.get(k);if(v)attr[k]=String(v).slice(0,250);});}
if(fresh||!attr.landing_url){attr.landing_url=location.href.split('#')[0].slice(0,600);attr.referrer=(D.referrer||'').slice(0,600);}
try{sessionStorage.setItem('nc_attr',JSON.stringify(attr));}catch(e){}
function fill(f){KEYS.concat(['landing_url','referrer']).forEach(function(k){var i=f.querySelector('input[type=hidden][name="'+k+'"]');if(i&&attr[k])i.value=attr[k];});}
function secIdx(el){var s=el.closest&&el.closest('[data-sec]');if(!s)return -1;return [].indexOf.call(D.querySelectorAll('[data-sec]'),s);}
/* Clics: llamada, WhatsApp y CTAs */
D.addEventListener('click',function(e){var el=e.target.closest&&e.target.closest('a[href],[data-cta]');if(!el)return;var h=el.getAttribute('href')||'';var base={cta:el.getAttribute('data-cta')||'',cta_text:(el.textContent||'').replace(/\\s+/g,' ').trim().slice(0,80),section_index:secIdx(el)};
 if(/^tel:/i.test(h)){base.event='click_to_call';base.phone=h.slice(4);push(base);}
 else if(/wa\\.me|api\\.whatsapp|whatsapp:/i.test(h)){base.event='whatsapp_click';push(base);}
 else if(el.hasAttribute('data-cta')){base.event='cta_click';push(base);}
},true);
/* Formularios */
function normTel(v){var d=String(v||'').replace(/\\D/g,'');if(d.indexOf('0034')===0)d=d.slice(4);else if(d.length===11&&d.indexOf('34')===0)d=d.slice(2);return d;}
function btnOf(f){return f.querySelector('button[type=submit],button:not([type]),input[type=submit]');}
function busy(f,on){var b=btnOf(f);f.classList.toggle('nc-sending',on);if(!b)return;if(on){b.__t=b.innerHTML;b.disabled=true;b.innerHTML='<span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>Enviando…';}else{b.disabled=false;if(b.__t!=null)b.innerHTML=b.__t;}}
function alertBox(f,html){var a=f.querySelector('.nc-alert');if(!a){a=D.createElement('div');a.className='nc-alert';a.setAttribute('role','alert');f.appendChild(a);}a.innerHTML=html;}
function thanks(f){if(CFG.thanksUrl){location.href=CFG.thanksUrl;return;}var d=D.createElement('div');d.className='text-center py-4';d.setAttribute('role','status');d.innerHTML='<div style="font-size:38px" aria-hidden="true">\\u2705</div><div class="h5 fw-bold mt-2" style="color:inherit"></div>';d.querySelector('.h5').textContent=CFG.thanksText||'\\u00a1Gracias!';f.parentNode.replaceChild(d,f);}
D.querySelectorAll('form[data-callback]').forEach(function(f){
 var fid=f.getAttribute('data-form-id')||'form';fill(f);
 var started=false;f.addEventListener('focusin',function(){if(!started){started=true;push({event:'form_start',form_id:fid});}});
 f.addEventListener('submit',function(e){
  e.preventDefault();if(f.__busy)return;
  var hp=f.querySelector('[name=nc_website]');if(hp&&hp.value){thanks(f);return;}
  var tel=f.querySelector('input[type=tel]'),phone='';
  if(tel){phone=normTel(tel.value);if(!/^[6789][0-9]{8}$/.test(phone)){tel.setCustomValidity('Introduce un teléfono de 9 cifras');tel.reportValidity();tel.addEventListener('input',function c(){tel.setCustomValidity('');tel.removeEventListener('input',c);});return;}tel.value=phone;}
  var qz=f.closest('[data-quiz]');if(qz){var ans=[].map.call(qz.querySelectorAll('[data-opt].on'),function(o){return (o.getAttribute('data-q')||'')+': '+o.getAttribute('data-opt');}).join(' | ');var qi=f.querySelector('input[name=respuestas_quiz]');if(!qi){qi=D.createElement('input');qi.type='hidden';qi.name='respuestas_quiz';f.appendChild(qi);}qi.value=ans;}
  fill(f);
  var em=f.querySelector('input[type=email]');
  var lead={event:'generate_lead',form_id:fid,lead_type:'callback'};
  if(CFG.ec){var ud={};if(phone)ud.phone_number='+34'+phone;if(em&&em.value)ud.email=em.value.trim().toLowerCase();lead.user_data=ud;}
  var url=f.getAttribute('action')||'';var pending=!url||url.indexOf('{{')>-1;
  if(pending){if(W.console)console.warn('[NC] Endpoint del formulario sin configurar: no se envía nada.');push(lead);thanks(f);return;}
  f.__busy=true;busy(f,true);
  if(!CFG.thanks){var gone=false;var go=function(){if(gone)return;gone=true;HTMLFormElement.prototype.submit.call(f);};lead.eventCallback=go;lead.eventTimeout=1500;push(lead);setTimeout(go,1700);return;}
  var ctrl=W.AbortController?new AbortController():null;var to=setTimeout(function(){if(ctrl)ctrl.abort();},15000);
  function ok(delivery){lead.delivery=delivery;if(CFG.thanksUrl){var n=false;var g=function(){if(!n){n=true;thanks(f);}};lead.eventCallback=g;lead.eventTimeout=1500;push(lead);setTimeout(g,1700);}else{push(lead);thanks(f);}}
  function fail(reason){f.__busy=false;busy(f,false);push({event:'form_error',form_id:fid,reason:reason});var t=CFG.tel?' o llámanos al <a href="tel:'+CFG.tel+'">'+CFG.tel.replace(/(\\d{3})(\\d{3})(\\d{3})/,'$1 $2 $3')+'</a>':'';alertBox(f,'No hemos podido enviar tu solicitud. Inténtalo de nuevo'+t+'.');}
  fetch(url,{method:'POST',body:new FormData(f),headers:{'Accept':'application/json'},signal:ctrl?ctrl.signal:undefined})
   .then(function(r){clearTimeout(to);if(r.ok||r.type==='opaque'||r.type==='opaqueredirect')ok('confirmed');else fail('http_'+r.status);})
   .catch(function(err){clearTimeout(to);if(err&&err.name==='AbortError')fail('timeout');else if(navigator.onLine===false)fail('offline');else ok('unconfirmed');});
 });
});
/* Cookies (Consent Mode v2) */
var ck=D.getElementById('ncCookies');
if(ck){
 var cfg=ck.querySelector('.nc-ck-cfg'),save=ck.querySelector('[data-ck-act=save]'),conf=ck.querySelector('[data-ck-act=config]');
 var stored=null;try{stored=JSON.parse(localStorage.getItem('nc_consent')||'null');}catch(e){}
 var valid=stored&&stored.v===1&&(Date.now()-stored.ts)<34e9;
 function apply(a,m){var c={v:1,a:a?1:0,m:m?1:0,ts:Date.now()};try{localStorage.setItem('nc_consent',JSON.stringify(c));}catch(e){}
  if(typeof W.gtag==='function')W.gtag('consent','update',{ad_storage:m?'granted':'denied',ad_user_data:m?'granted':'denied',ad_personalization:m?'granted':'denied',analytics_storage:a?'granted':'denied'});
  push({event:'consent_update',consent_analytics:a?'granted':'denied',consent_ads:m?'granted':'denied'});ck.hidden=true;}
 function open(){ck.hidden=false;if(stored){ck.querySelector('[data-ck=a]').checked=!!stored.a;ck.querySelector('[data-ck=m]').checked=!!stored.m;}}
 if(!valid)ck.hidden=false;
 ck.addEventListener('click',function(e){var b=e.target.closest('[data-ck-act]');if(!b)return;var act=b.getAttribute('data-ck-act');
  if(act==='accept')apply(1,1);else if(act==='reject')apply(0,0);
  else if(act==='config'){cfg.hidden=!cfg.hidden;save.hidden=cfg.hidden;}
  else if(act==='save')apply(ck.querySelector('[data-ck=a]').checked,ck.querySelector('[data-ck=m]').checked);});
 W.ncCookies=open;D.addEventListener('click',function(e){var l=e.target.closest&&e.target.closest('[data-nc-cookies]');if(l){e.preventDefault();open();}});
}
})();`;}

/* ---- 5. Checklist pre-export ---- */
function ncAudit(){
  const st=state.settings,html=buildDoc(true),out=[];
  const E=(m,fix)=>out.push({lvl:'error',m,fix}),A=(m,fix)=>out.push({lvl:'warn',m,fix});
  const has=re=>re.test(html);
  const forms=(html.match(/<form[^>]+data-callback/g)||[]).length;
  if(!state.sections.length)E('La landing no tiene secciones.');
  if(!ncTelDigits()&&has(/href="tel:/))E('Falta el teléfono: hay botones de llamada sin número.','gTel');
  else if(st.tel&&!/^(\+34|0034)?[6789]\d{8}$/.test(String(st.tel).replace(/[\s.-]/g,''))&&!/^\+/.test(st.tel))A('El teléfono no parece español de 9 cifras: revísalo.','gTel');
  if(!String(st.wa||'').replace(/\D/g,'')&&has(/wa\.me\//))E('Falta el número de WhatsApp: hay botones de WhatsApp sin número.','gWa');
  else if(st.wa&&String(st.wa).replace(/\D/g,'').length<11)A('WhatsApp sin prefijo de país (ej. 34600111222).','gWa');
  if(forms&&!st.endpoint)E(`Hay ${forms} formulario(s) y no hay endpoint: los leads no se enviarán a ningún sitio.`,'gEp');
  if(forms&&st.endpoint&&!/^https:\/\//.test(st.endpoint))A('El endpoint no es https: el navegador puede bloquear el envío.','gEp');
  if(!st.gtm||/X{4,}/.test(st.gtm))E('Falta el ID de GTM: no se medirán conversiones.','gGtm');
  else if(!/^GTM-[A-Z0-9]{4,10}$/.test(st.gtm.trim()))A('El ID de GTM no tiene el formato GTM-XXXXXXX.','gGtm');
  if(forms&&st.privacyCheck!==false&&!st.urlPrivacy)E('Falta la URL de la política de privacidad (enlace de la casilla RGPD).','gUrlPriv');
  if(st.consent==='banner'&&!st.urlCookies)E('Falta la URL de la política de cookies (banner).','gUrlCk');
  if(st.consent==='none'&&st.gtm)A('GTM sin gestión de consentimiento: riesgo con la AEPD. Usa el banner NC o una CMP externa.','gConsent');
  if(forms&&!st.legalOwner)A('Sin responsable del tratamiento: añádelo para mostrar la primera capa informativa RGPD.','gLegalOwner');
  if(!st.title)E('Falta el título SEO (<title>).','gTitle');
  if(!st.desc)A('Falta la meta description.','gDesc');
  if(!st.pageUrl)A('Sin URL final: no se genera canonical ni og:url.','gPageUrl');
  if(!st.ogImage&&!has(/property="og:image"/))A('Sin imagen para compartir (og:image).','gOg');
  const phs=[...new Set((html.match(/\{\{[A-Z0-9_]+\}\}/g)||[]))].filter(p=>!/TELEFONO|WHATSAPP|ENDPOINT|URL_PRIVACIDAD|URL_COOKIES|TITULO_SEO|META_DESCRIPTION/.test(p));
  if(phs.length)A('Placeholders sin rellenar: '+phs.join(', '));
  const kb=Math.round(html.length/1024);
  if(kb>1500)A(`El HTML pesa ${kb} KB (imágenes en Base64). Sube las imágenes a la nube para que cargue rápido.`);
  else if(has(/src="data:image/))A('Hay imágenes en Base64 embebidas: pesan más y no se cachean.');
  if(forms&&!st.thanks&&!st.thanksUrl)A('Tras enviar, el usuario sale a la respuesta del endpoint. Activa “Gracias sin recargar” o una URL de gracias.','gThanks');
  return out;
}
function ncOpenChecklist(onGo){
  const items=ncAudit(),errs=items.filter(i=>i.lvl==='error').length,warns=items.length-errs;
  if(!items.length){toast('Checklist OK ✓');if(onGo)onGo();return;}
  let ov=document.getElementById('ckOverlay');
  if(!ov){ov=document.createElement('div');ov.id='ckOverlay';ov.className='nc-ov';document.body.appendChild(ov);}
  ov.innerHTML=`<div class="nc-ov-box"><div class="nc-ov-head"><b>Checklist antes de publicar</b><button class="btn sm ghost" data-ck="close">Cerrar</button></div>
    <div class="note" style="margin:0 0 10px">${errs?`<b style="color:var(--danger)">${errs} bloqueante(s)</b> · `:''}${warns} aviso(s)</div>
    <div class="ck-list">${items.map(i=>`<div class="ck-it ${i.lvl}"><span class="ck-dot"></span><span class="ck-m">${esc(i.m)}</span>${i.fix?`<button class="btn sm" data-fix="${i.fix}">Corregir</button>`:''}</div>`).join('')}</div>
    <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px">${onGo?`<button class="btn ${errs?'':'primary'}" data-ck="go">${errs?'Exportar igualmente':'Exportar'}</button>`:''}</div></div>`;
  ov.style.display='grid';
  ov.onclick=e=>{const c=e.target.closest('[data-ck]'),f=e.target.closest('[data-fix]');
    if(e.target===ov||(c&&c.dataset.ck==='close')){ov.style.display='none';return;}
    if(c&&c.dataset.ck==='go'){ov.style.display='none';if(onGo)onGo();return;}
    if(f){ov.style.display='none';setTab('global');const el=document.getElementById(f.dataset.fix);if(el){el.scrollIntoView({block:'center'});el.focus();el.classList.add('nc-flash');setTimeout(()=>el.classList.remove('nc-flash'),1600);}}};
}

/* ---------- RENDER DOC ---------- */
function baseCSS(){return `
  *{box-sizing:border-box} .row>*{min-width:0}
  body{font-family:var(--fbody);color:var(--bink);margin:0}
  h1,h2,h3,.h-font,.display-4,.display-5,.display-6{font-family:var(--fhead)}
  .btn-brand{background:var(--bp);border:1px solid var(--bp);color:var(--btntext,#fff);border-radius:var(--btnr);font-weight:600;padding:.6rem 1.15rem}
  .btn-brand:hover{background:var(--bp2);border-color:var(--bp2);color:var(--btntext,#fff)}
  .accordion-item{border-radius:14px!important;overflow:hidden;margin-bottom:10px;border:1px solid var(--line)!important;box-shadow:0 4px 14px rgba(16,20,30,.04)}
  .accordion-button{border-radius:14px!important}
  .accordion-button:not(.collapsed){background:color-mix(in srgb,var(--bp) 7%,#fff);color:var(--bp)}
  .accordion-button:focus{box-shadow:none;border-color:var(--line)}
  .accordion-button::after{background-size:1rem}
  .form-control,.form-select{border-radius:calc(var(--cardr) - 6px)}
  .form-control:focus,.form-select:focus{border-color:var(--bp);box-shadow:0 0 0 .2rem color-mix(in srgb,var(--bp) 22%,transparent)}
  [data-opt]{transition:.15s} [data-opt].on{background:var(--bp);border-color:var(--bp);color:#fff}
  img,svg{max-width:100%}`;}

function styleOf(s){return Object.assign({},STYLE_DEF,LIB[s.type].styleDef||{},s.style||{});}
function renderSection(s){
  const lib=LIB[s.type];
  if(lib.raw&&/^d[abcx]_/.test(s.type)){const st=v4Style(s);return ncEnhanceHTML(v4Wrap(s,lib.render(Object.assign({},ncVoiceProps(s.type,s.props||{}),{_st:st}))),s);}
  const inner=lib.render(s.props||{});
  if(lib.raw) return ncEnhanceHTML(inner,s);
  return ncEnhanceHTML(secOpen(styleOf(s))+inner+secClose(),s);
}
function importedPreviewHtml(html){try{const r=ncParse(html);if(state.freeMode){r.querySelectorAll('[data-ncid]').forEach(el=>{el.setAttribute('data-ncmove','1');el.setAttribute('draggable','false');});}else{r.querySelectorAll('[data-nctext]').forEach(el=>{el.setAttribute('contenteditable','true');el.setAttribute('data-nce','1');});r.querySelectorAll('[data-ncimg]').forEach(el=>el.setAttribute('data-nce-img','1'));}return r.innerHTML;}catch(e){return html;}}
function ensureNcIds(){let n=0;state.sections.forEach(s=>{if(s.type!=="imported")return;const r=ncParse(s.props.html);let need=false;r.querySelectorAll('*').forEach(el=>{if(!el.hasAttribute('data-ncid')){el.setAttribute('data-ncid','x'+(n++)+Math.random().toString(36).slice(2,5));need=true;}});if(need)s.props.html=r.innerHTML;});}
function updImportedStyle(s,ncid,st){const r=ncParse(s.props.html);const el=r.querySelector('[data-ncid="'+ncid+'"]');if(el){for(const k in st){el.style[k]=st[k];}s.props.html=r.innerHTML;}}
function bakeIds(html){try{const r=ncParse(html);let i=0;r.querySelectorAll('*').forEach(el=>el.setAttribute('data-ncid','f'+(i++)));return r.innerHTML;}catch(e){return html;}}
function freePreview(html){try{const r=ncParse(html);r.querySelectorAll('*').forEach(el=>{el.setAttribute('data-ncmove','1');el.setAttribute('draggable','false');});return r.innerHTML;}catch(e){return html;}}
function sectionsHTML(forExport){return state.sections.filter(s=>!(forExport&&s.hidden)).map(s=>{
  const sel=(!forExport&&s.id===state.selected);
  const tb=sel?`<div class="nc-tb"><button data-act="up" data-actid="${s.id}" title="Subir">↑</button><button data-act="down" data-actid="${s.id}" title="Bajar">↓</button><button data-act="dup" data-actid="${s.id}" title="Duplicar">⧉</button><button data-act="hide" data-actid="${s.id}" title="${s.hidden?'Mostrar':'Ocultar (no se exporta)'}">${s.hidden?'◌':'👁'}</button><button data-act="copy" data-actid="${s.id}" title="Copiar (Ctrl+C)">⎘</button><button data-act="del" data-actid="${s.id}" title="Eliminar sección">🗑</button></div>`:"";
  let inner;
  if(s.freeHtml){inner=(!forExport&&state.freeMode)?freePreview(s.freeHtml):s.freeHtml;}
  else if(!forExport&&state.freeMode){s.freeHtml=bakeIds((s.type==="imported")?s.props.html:renderSection(s));inner=freePreview(s.freeHtml);}
  else if(!forExport&&s.type==="imported"){inner=importedPreviewHtml(s.props.html);if(typeof ncImpWrap==="function")inner=ncImpWrap(s,inner,false);}
  else{inner=(s.type==="imported")?(typeof ncImpWrap==="function"?ncImpWrap(s,s.props.html,true):s.props.html):renderSection(s);}
  const drag=(forExport||(!forExport&&state.freeMode))?'':'draggable="true"';
  return `<div data-sec="${s.id}" ${drag} class="${sel?'sel':''}${(!forExport&&s.hidden)?' nc-hid':''}">${tb}${inner}</div>`;
}).join("\n");}
function _freeSetT(html,ncid,t){try{const r=ncParse(html);const el=r.querySelector('[data-ncid="'+ncid+'"]');if(el){el.style.transform=t;return r.innerHTML;}}catch(e){}return html;}
function _freeDel(html,ncid){try{const r=ncParse(html);const el=r.querySelector('[data-ncid="'+ncid+'"]');if(el)el.remove();return r.innerHTML;}catch(e){}return html;}

function collectFonts(b){
  const nm=s=>{const m=(s||"").match(/'([^']+)'/);return m?m[1]:null;};
  const set=(typeof ncLookUsesFont==="function"&&ncLookUsesFont()&&!state.sections.some(s=>!/^d[abc]_/.test(s.type)))?[]:[nm(b.fhead),nm(b.fbody)];
  state.sections.forEach(s=>{const hf=(s.style&&s.style.headFont)||"";if(hf)set.push(hf);});
  if(typeof ncLookFonts==="function")set.push(...ncLookFonts());
  return fontsHrefMany(set);
}
function buildDoc(forExport){
  const b=BRANDS[state.settings.brand]; const gtm=ph(state.settings.gtm,"GTM-XXXXXXX");
  const gtmHead=forExport?`<script data-nc-keep>${ncConsentHead()}(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');<\/script>`:"";
  const gtmBody=forExport?`<noscript><iframe title="Google Tag Manager" src="https://www.googletagmanager.com/ns.html?id=${gtm}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`:"";
  const st=state.settings;
  const modal=(st.ctaAction==='popupimg'||(st.ctaAction==='popup'&&typeof ncPopHTML!=='function'))?`<div class="modal fade" id="ncContact" tabindex="-1" aria-hidden="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content" style="background:var(--bp);border:0;border-radius:20px;box-shadow:0 20px 60px rgba(0,0,0,.35)">
    <div class="modal-header border-0 pb-1 position-relative"><h5 class="modal-title w-100 text-center text-uppercase fw-bold" style="color:#fff;letter-spacing:.03em">${esc(st.popupTitle||'¿Necesitas ayuda?')}</h5><button type="button" class="btn-close btn-close-white position-absolute" style="top:16px;right:16px" data-bs-dismiss="modal" aria-label="Cerrar"></button></div>
    <div class="modal-body pt-2">
      ${(st.ctaAction==='popupimg')?`<div class="mb-3" style="border-radius:14px;overflow:hidden;aspect-ratio:16/7">${imgOrBox(st.popupImg,'Imagen {{IMG_POPUP}}')}</div>`:''}
      <a href="${telHref()}" data-cta="call" class="d-flex align-items-center gap-3 p-3 mb-3 text-decoration-none" style="background:#fff;border-radius:14px">
        <span style="font-size:22px">&#128222;</span><span class="me-auto"><span class="d-block fw-bold" style="color:var(--bink)">Llámanos</span><span class="d-block fw-bold" style="color:var(--bp)">${telText()}</span></span><span style="color:var(--bp);font-size:20px">&rsaquo;</span></a>
      <div class="p-3" style="background:#fff;border-radius:14px">
        <div class="d-flex align-items-center gap-3 mb-3"><span style="font-size:22px">&#128222;</span><span><span class="d-block fw-bold" style="color:var(--bink)">Te llamamos nosotros</span><span class="d-block small" style="color:var(--bmuted)">Solicita ahora tu llamada</span></span></div>
        <form data-callback action="${ph(st.endpoint,'ENDPOINT_FORMULARIO')}" method="post">
          <input required name="telefono" type="tel" pattern="[0-9]{9}" title="9 dígitos (teléfono español)" class="form-control form-control-lg mb-2" placeholder="Tu número de teléfono">
          <button class="btn btn-brand btn-lg w-100" type="submit" data-cta="popup_submit">Solicitar información</button>
        </form></div>
    </div></div></div></div>`:'';
  const cookie=ncCookieBanner();
  const modalPro=ncEnhanceHTML(modal,{type:'popup'})+(typeof ncPopHTML==='function'?ncEnhanceHTML(ncPopHTML(),{type:'popup_cta'}):'');
  let _nForm=0;const secs=sectionsHTML(forExport).replace(/ id="form"/g,m=>(_nForm++?' id="form-'+_nForm+'"':m));
  const bsCSS=forExport?"https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css":"https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/css/bootstrap.min.css";
  const bsJS=forExport?"https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js":"https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/js/bootstrap.bundle.min.js";
  const editor=forExport?"":`<style>
    [data-sec]{position:relative}
    [data-sec]:hover{outline:1px dashed color-mix(in srgb,var(--bp) 55%,transparent);outline-offset:-1px;cursor:pointer}
    [data-sec].sel{outline:2px solid var(--bp);outline-offset:-2px}
    [data-sec][draggable=true]:hover{cursor:grab}
    [data-sec].nc-dragging{opacity:.4}
    [data-sec].nc-hid>*:not(.nc-tb){opacity:.28;filter:grayscale(1)}
    [data-sec].nc-hid::after{content:'Oculta · no se exporta';position:absolute;top:8px;left:8px;z-index:29;background:#111826;color:#dfe6f0;font:600 11px system-ui;padding:4px 8px;border-radius:6px}
    .nc-drop-ind{height:5px;border-radius:5px;background:var(--bp);box-shadow:0 0 10px color-mix(in srgb,var(--bp) 60%,transparent);margin:0}
    .nc-tb{position:absolute;top:8px;right:8px;z-index:30;display:flex;gap:4px;background:#111826;border:1px solid #2a3345;border-radius:8px;padding:3px}
    .nc-tb button{background:transparent;border:0;color:#dfe6f0;cursor:pointer;font-size:13px;padding:3px 6px;border-radius:5px}
    .nc-tb button:hover{background:#232d40}
    [data-nce="1"]{outline:1px dashed transparent;transition:outline .12s;border-radius:3px}
    [data-nce="1"]:hover{outline:1px dashed color-mix(in srgb,var(--bp) 60%,#8888ff);cursor:text}
    [data-nce="1"]:focus{outline:2px solid var(--bp);background:color-mix(in srgb,var(--bp) 6%,transparent)}
    [data-nce-img="1"]:hover{outline:2px solid var(--bp);outline-offset:2px;cursor:pointer}
    [data-ncmove="1"]{cursor:grab}
    [data-ncmove="1"]:hover{outline:1px dashed rgba(110,90,255,.55);outline-offset:1px}
  </style><script>
    window.__free=${!!state.freeMode};
    document.body.addEventListener('click',function(e){
      var a=e.target.closest('[data-act]');
      if(a){e.preventDefault();e.stopPropagation();parent.postMessage({nc:'act',act:a.getAttribute('data-act'),id:a.getAttribute('data-actid')},'*');return;}
      if(window.__free){var lkf=e.target.closest('a,button');if(lkf)e.preventDefault();return;}
      var im=e.target.closest('[data-nce-img="1"]');
      if(im){e.preventDefault();e.stopPropagation();var si=im.closest('[data-sec]');parent.postMessage({nc:'editimg',id:si.getAttribute('data-sec'),k:im.getAttribute('data-ncimg')},'*');return;}
      if(e.target.closest('[contenteditable="true"]'))return;
      if(e.target.closest('[data-live]'))return;
      var lk=e.target.closest('a,button');if(lk)e.preventDefault();
      var s=e.target.closest('[data-sec]');if(s)parent.postMessage({nc:'sel',id:s.getAttribute('data-sec')},'*');
    },true);
    document.body.addEventListener('input',function(e){var t=e.target.closest&&e.target.closest('[data-nce="1"]');if(t){var s=t.closest('[data-sec]');if(s)parent.postMessage({nc:'edit',id:s.getAttribute('data-sec'),k:t.getAttribute('data-nctext'),val:t.textContent},'*');}});
    document.body.addEventListener('submit',function(e){e.preventDefault();},true);
    document.addEventListener('keydown',function(e){var t=e.target;var inF=t&&(t.isContentEditable||/INPUT|TEXTAREA|SELECT/.test(t.tagName||''));var k=(e.key||'').toLowerCase();var c=e.ctrlKey||e.metaKey;
      if(inF&&!(c&&k==='s'))return;if(window.__free&&!c)return;
      if((c&&['s','z','y','d','c','v'].indexOf(k)>-1)||(!c&&['delete','backspace','h','escape','?'].indexOf(k)>-1)||(e.altKey&&/arrow(up|down)/.test(k))){e.preventDefault();parent.postMessage({nc:'key',key:e.key,ctrl:c,shift:e.shiftKey,alt:e.altKey},'*');}});
    if(window.__free){var _mv=null,_moved=false,_sx,_sy,_bx,_by,_sel=null;
      var xbtn=document.createElement('div');xbtn.textContent='🗑';xbtn.style.cssText='position:fixed;z-index:100000;display:none;width:26px;height:26px;line-height:26px;text-align:center;background:#e5484d;color:#fff;border-radius:6px;cursor:pointer;font-size:13px;box-shadow:0 2px 8px rgba(0,0,0,.35)';document.body.appendChild(xbtn);
      function _curT(el){var m=(el.style.transform||'').match(/translate\(\s*(-?[0-9.]+)px\s*,\s*(-?[0-9.]+)px\s*\)/);return m?[parseFloat(m[1]),parseFloat(m[2])]:[0,0];}
      function _place(){if(!_sel){xbtn.style.display='none';return;}var r=_sel.getBoundingClientRect();xbtn.style.left=(r.right-13)+'px';xbtn.style.top=(r.top-13)+'px';xbtn.style.display='block';}
      function _select(el){if(_sel)_sel.style.boxShadow='';_sel=el;if(el){el.style.boxShadow='0 0 0 2px #6E5AFF';_place();}else xbtn.style.display='none';}
      xbtn.addEventListener('click',function(ev){ev.stopPropagation();if(!_sel)return;var sec=_sel.closest('[data-sec]');parent.postMessage({nc:'delel',id:sec.getAttribute('data-sec'),ncid:_sel.getAttribute('data-ncid')},'*');_sel.remove();_select(null);});
      document.body.addEventListener('mousedown',function(e){if(e.target===xbtn)return;var el=e.target.closest('[data-ncmove="1"]');if(!el||e.target.closest('.nc-tb'))return;e.preventDefault();e.stopPropagation();_mv=el;_moved=false;var c=_curT(el);_bx=c[0];_by=c[1];_sx=e.clientX;_sy=e.clientY;document.body.style.userSelect='none';},true);
      document.addEventListener('mousemove',function(e){if(!_mv)return;var dx=e.clientX-_sx,dy=e.clientY-_sy;if(!_moved&&(Math.abs(dx)+Math.abs(dy))<4)return;_moved=true;e.preventDefault();_mv.style.transform='translate('+(_bx+dx)+'px,'+(_by+dy)+'px)';if(_sel===_mv)_place();},true);
      document.addEventListener('mouseup',function(e){if(!_mv)return;var el=_mv;_mv=null;document.body.style.userSelect='';var sec=el.closest('[data-sec]');if(_moved){parent.postMessage({nc:'move',id:sec.getAttribute('data-sec'),ncid:el.getAttribute('data-ncid'),transform:el.style.transform},'*');_select(el);}else{_select(_sel===el?null:el);}},true);
      document.addEventListener('keydown',function(e){if((e.key==='Delete'||e.key==='Backspace')&&_sel){e.preventDefault();xbtn.click();}});
      document.addEventListener('dragstart',function(e){e.preventDefault();},true);
      window.addEventListener('scroll',_place,true);
    }
    (function(){var dragId=null,ind=null,org=null;
      function clearInd(){if(ind&&ind.parentNode)ind.parentNode.removeChild(ind);ind=null;}
      /* No arrastrar la sección si el gesto empieza en un control o en algo que se desliza en horizontal (carruseles, tarifas en móvil, barras) */
      function noDrag(n){if(!n||!n.closest)return false;if(n.closest('input,select,textarea,[contenteditable="true"],[data-nodrag],[data-hsld] .trk'))return true;for(var x=n;x&&!(x.hasAttribute&&x.hasAttribute('data-sec'));x=x.parentElement){if(x.scrollWidth>x.clientWidth+2){var o=getComputedStyle(x).overflowX;if(o==='auto'||o==='scroll')return true;}}return false;}
      document.addEventListener('mousedown',function(e){org=e.target;},true);
      document.querySelectorAll('[data-sec]').forEach(function(s){
        s.addEventListener('dragstart',function(e){if(noDrag(org)){e.preventDefault();return;}dragId=s.getAttribute('data-sec');s.classList.add('nc-dragging');try{e.dataTransfer.effectAllowed='move';e.dataTransfer.setData('text/plain',dragId);}catch(_){}});
        s.addEventListener('dragend',function(){dragId=null;s.classList.remove('nc-dragging');clearInd();});
        s.addEventListener('dragover',function(e){if(!dragId)return;e.preventDefault();if(s.getAttribute('data-sec')===dragId){clearInd();return;}var r=s.getBoundingClientRect();var before=e.clientY<r.top+r.height/2;clearInd();ind=document.createElement('div');ind.className='nc-drop-ind';if(before)s.parentNode.insertBefore(ind,s);else s.parentNode.insertBefore(ind,s.nextSibling);});
        s.addEventListener('drop',function(e){if(!dragId)return;e.preventDefault();var refId=s.getAttribute('data-sec');if(refId===dragId){clearInd();return;}var r=s.getBoundingClientRect();var before=e.clientY<r.top+r.height/2;parent.postMessage({nc:'reorder',dragId:dragId,refId:refId,before:before},'*');dragId=null;clearInd();});
      });
    })();
  <\/script>`;
  const widgets=`<script>(function(){
    document.querySelectorAll('[data-calc]').forEach(function(w){var inp=w.querySelector('[data-calc-input]');var pct=parseFloat(w.getAttribute('data-pct'))||30;var oM=w.querySelector('[data-calc-m]'),oY=w.querySelector('[data-calc-y]');function f(n){return n.toLocaleString('es-ES',{maximumFractionDigits:0})+' \\u20AC';}function u(){var v=parseFloat(((inp&&inp.value)||'').replace(',','.'))||0;var m=v*pct/100;if(oM)oM.textContent=f(m);if(oY)oY.textContent=f(m*12);}if(inp)inp.addEventListener('input',u);u();});
    document.querySelectorAll('[data-quiz]').forEach(function(w){var steps=[].slice.call(w.querySelectorAll('[data-step]'));var idx=0;var ans={};var bar=w.querySelector('[data-quiz-bar]');function show(){steps.forEach(function(s,i){s.style.display=i===idx?'':'none'});if(bar)bar.style.width=Math.round(idx/Math.max(1,steps.length-1)*100)+'%';}w.querySelectorAll('[data-opt]').forEach(function(o){o.addEventListener('click',function(){ans[o.getAttribute('data-q')]=o.getAttribute('data-opt');var st=o.closest('[data-step]');st.querySelectorAll('[data-opt]').forEach(function(x){x.classList.remove('on')});o.classList.add('on');if(idx<steps.length-1){idx++;show();}});});w.querySelectorAll('[data-quiz-back]').forEach(function(b){b.addEventListener('click',function(){if(idx>0){idx--;show();}});});var fm=w.querySelector('form');if(fm)fm.addEventListener('submit',function(){try{window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:'quiz_complete',answers:ans});}catch(e){}});show();});
    document.querySelectorAll('[data-countdown]').forEach(function(w){var end=new Date((w.getAttribute('data-end')||'').replace(' ','T')).getTime();var els=w.querySelectorAll('[data-cd]');function t(){if(isNaN(end))return;var d=end-Date.now();if(d<0)d=0;var s=Math.floor(d/1000),dd=Math.floor(s/86400),hh=Math.floor(s%86400/3600),mm=Math.floor(s%3600/60),ss=s%60,v=[dd,hh,mm,ss];els.forEach(function(e,i){e.textContent=('0'+v[i]).slice(-2)});}t();setInterval(t,1000);});
    (function(){var body=document.body;var gact=body.getAttribute('data-ctaaction')||'scroll';var tel=body.getAttribute('data-tel')||'';var wa=body.getAttribute('data-wa')||'';function modal(id){var m=document.getElementById(id);if(m&&window.bootstrap){bootstrap.Modal.getOrCreateInstance(m).show();return true;}return false;}document.querySelectorAll('[data-cta="form"]').forEach(function(el){var act=el.getAttribute('data-act')||gact;if(act==='call'){el.setAttribute('href','tel:'+tel);}else if(act==='whatsapp'||act==='wa'){el.setAttribute('href','https://wa.me/'+wa);el.setAttribute('target','_blank');el.setAttribute('rel','noopener');}else if(act==='popupimg'){el.addEventListener('click',function(e){if(modal('ncContact'))e.preventDefault();});}else if(act==='popup'){el.addEventListener('click',function(e){var m=document.getElementById('ncPop');if(!m){if(modal('ncContact'))e.preventDefault();return;}if(!window.bootstrap)return;e.preventDefault();var n=el.getAttribute('data-plan')||'',pr=el.getAttribute('data-price')||'';var box=m.querySelector('[data-pop-plan]');if(box){box.hidden=!n;var a=m.querySelector('[data-pop-name]'),b=m.querySelector('[data-pop-price]');if(a)a.textContent=n;if(b)b.textContent=pr;}var f=m.querySelector('[data-pop-field]');if(f)f.value=n?(n+(pr?' · '+pr:'')):'';var w=m.querySelector('[data-pop-wa]');if(w){var base=w.getAttribute('data-base')||w.getAttribute('href');w.setAttribute('data-base',base);w.setAttribute('href',base+(n?'?text='+encodeURIComponent('Hola, me interesa la tarifa '+n+(pr?' ('+pr+')':'')):''));}try{(window.dataLayer=window.dataLayer||[]).push({event:'popup_open',plan:n||undefined});}catch(x){}bootstrap.Modal.getOrCreateInstance(m).show();});}});})();
  })();<\/script>`;
  return `<!doctype html><html lang="es"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(ph(state.settings.title,"TITULO_SEO"))}</title>
<meta name="description" content="${esc(ph(state.settings.desc,"META_DESCRIPTION"))}">
${forExport?ncHeadMeta(secs):''}
<meta property="og:title" content="${esc(ph(state.settings.title,"TITULO_SEO"))}"><meta property="og:type" content="website">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${collectFonts(b)}" rel="stylesheet"><link href="${bsCSS}" rel="stylesheet">${st.importCSS||""}
<style>:root{${b.vars}--fhead:${b.fhead};--fbody:${b.fbody}}${ncLookFontVars()}${ncMobileVars()}${baseCSS()}${ncProCSS()}${ncDirCSS()}${ncXCSS()}${ncUCCSS()}${ncLookCSS()}${ncSecCSS()}${ncTouchCSS()}${ncPopCSS()}${b.profileCSS||''}${forExport?'':NC_PH_PREVIEW_CSS}</style>
${gtmHead}</head><body class="nc-page${ncLook()!=='base'?' lk-'+ncLook():''}${ncBodyMobileClasses()}${ncTouchClasses()}" data-ctaaction="${st.ctaAction||'scroll'}" data-nc="${esc(JSON.stringify(ncRuntimeConfig()))}" data-tel="${esc(ph(st.tel,'TELEFONO').replace(/\s/g,''))}" data-wa="${esc(ph(st.wa,'WHATSAPP').replace(/[^0-9]/g,''))}">
${gtmBody}
${forExport?secs:ncPhChips(secs)}
${modalPro}${cookie}
<script src="${bsJS}"><\/script>
${forExport?'<script>'+ncRuntimeJS()+'<\/script>':''}<script>${NC_STICKY_JS}<\/script>${widgets}${editor}
</body></html>`;
}

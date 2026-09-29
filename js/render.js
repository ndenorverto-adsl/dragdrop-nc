/* ---------- RENDER DOC ---------- */
function baseCSS(){return `
  *{box-sizing:border-box} .row>*{min-width:0}
  :root{--secpad-S:30px;--secpad-M:58px;--secpad-L:86px;--secpad-XL:120px}
  body{font-family:var(--fbody);color:var(--bink);margin:0}
  h1,h2,h3,.h-font,.display-4,.display-5,.display-6{font-family:var(--fhead)}
  section[style*="--titlew"] h1,section[style*="--titlew"] h2,section[style*="--titlew"] h3,section[style*="--titlew"] .h-font{font-weight:var(--titlew)!important}
  .btn-brand{background:var(--bp);border:1px solid var(--bp);color:var(--btntext,#fff);border-radius:var(--btnr);font-weight:600;padding:.6rem 1.15rem}
  .btn-brand:hover{background:var(--bp2);border-color:var(--bp2);color:var(--btntext,#fff)}
  .btn-ghost{background:transparent;border:2px solid var(--bp);color:var(--bp);border-radius:var(--btnr);font-weight:600;padding:calc(.6rem - 1px) 1.15rem}
  .btn-ghost:hover{background:var(--bp);color:#fff}
  .brandcard{background:#fff;border:1px solid var(--line);border-radius:var(--cardr);color:var(--bink);position:relative;box-shadow:0 1px 2px rgba(16,20,30,.04),0 10px 26px rgba(16,20,30,.05);transition:transform .22s ease,box-shadow .22s ease}
  .brandcard:hover{transform:translateY(-3px);box-shadow:0 8px 18px rgba(16,20,30,.06),0 22px 48px rgba(16,20,30,.10)}
  .brandcard:has(form),.brandcard:has(table),.brandcard:has([data-live]){transform:none!important;box-shadow:0 1px 2px rgba(16,20,30,.04),0 12px 30px rgba(16,20,30,.06)!important}
  .brandcard.featured{border-color:var(--bp);box-shadow:0 18px 46px color-mix(in srgb,var(--bp) 22%,transparent);transform:translateY(-4px)}
  .brandcard.featured::before{content:"★ Recomendado";position:absolute;top:-13px;left:50%;transform:translateX(-50%);background:var(--bp);color:#fff;padding:4px 14px;border-radius:50rem;font-size:11px;font-weight:700;letter-spacing:.02em;white-space:nowrap;box-shadow:0 6px 16px color-mix(in srgb,var(--bp) 40%,transparent)}
  .badge-soft{display:inline-block;background:color-mix(in srgb,var(--bp) 9%,#fff);color:var(--bp);border:1px solid color-mix(in srgb,var(--bp) 18%,transparent);padding:.4rem .9rem;border-radius:50rem;font-size:.8rem;font-weight:700;letter-spacing:.01em}
  .ficon{display:inline-grid;place-items:center;width:56px;height:56px;border-radius:16px;font-size:26px;margin-bottom:14px;background:color-mix(in srgb,var(--bp) 11%,#fff);border:1px solid color-mix(in srgb,var(--bp) 16%,transparent);box-shadow:0 6px 16px color-mix(in srgb,var(--bp) 12%,transparent)}
  .sec-kicker{display:inline-block;font-size:.78rem;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--bp);margin-bottom:.5rem}
  .sec-title-line{width:52px;height:4px;border-radius:4px;background:linear-gradient(90deg,var(--bp),var(--ba));margin:14px auto 0}
  .quote-mark{font-family:Georgia,serif;font-size:56px;line-height:.6;color:color-mix(in srgb,var(--bp) 35%,#fff)}
  .avatar-ini{width:44px;height:44px;border-radius:50%;display:grid;place-items:center;font-weight:700;color:#fff;background:linear-gradient(135deg,var(--bp),var(--bp2));flex:0 0 auto}
  .step-num{width:52px;height:52px;border-radius:16px;display:grid;place-items:center;font-weight:800;font-size:20px;color:#fff;background:linear-gradient(135deg,var(--bp),var(--bp2));box-shadow:0 8px 20px color-mix(in srgb,var(--bp) 28%,transparent);flex:0 0 auto}
  .stat-num{font-weight:800;background:linear-gradient(135deg,var(--bp),var(--ba));-webkit-background-clip:text;background-clip:text;color:transparent}
  .chk{display:inline-grid;place-items:center;width:22px;height:22px;border-radius:50%;background:color-mix(in srgb,var(--bp) 14%,#fff);color:var(--bp);font-size:13px;flex:0 0 auto}
  .accordion-item{border-radius:14px!important;overflow:hidden;margin-bottom:10px;border:1px solid var(--line)!important;box-shadow:0 4px 14px rgba(16,20,30,.04)}
  .accordion-button{border-radius:14px!important}
  .accordion-button:not(.collapsed){background:color-mix(in srgb,var(--bp) 7%,#fff);color:var(--bp)}
  .accordion-button:focus{box-shadow:none;border-color:var(--line)}
  .accordion-button::after{background-size:1rem}
  .form-control,.form-select{border-radius:calc(var(--cardr) - 6px)}
  .form-control:focus,.form-select:focus{border-color:var(--bp);box-shadow:0 0 0 .2rem color-mix(in srgb,var(--bp) 22%,transparent)}
  .cal-day{border:1px solid var(--line);background:#fff;border-radius:12px;padding:7px 12px;min-width:56px;text-align:center;cursor:pointer;line-height:1.15;transition:.15s}
  .cal-day:hover{border-color:var(--bp)}
  .cal-day span{display:block;font-size:11px;color:var(--bmuted)} .cal-day strong{font-size:17px;color:var(--bink)}
  .cal-day.on{background:var(--bp);border-color:var(--bp)} .cal-day.on span,.cal-day.on strong{color:#fff}
  [data-opt]{transition:.15s} [data-opt].on{background:var(--bp);border-color:var(--bp);color:#fff}
  .logowall img{filter:grayscale(1);opacity:.62;transition:filter .2s,opacity .2s;max-height:40px;max-width:100%;object-fit:contain}
  .logowall img:hover{filter:none;opacity:1}
  .nc-reveal{opacity:0;transform:translateY(22px);transition:opacity .6s ease,transform .6s ease}
  .nc-reveal.in{opacity:1;transform:none}
  body.nc-motion .btn-brand,body.nc-motion .btn-ghost,body.nc-motion [data-cta]{transition:transform .14s ease,filter .14s ease,box-shadow .14s ease}
  body.nc-motion .btn-brand:hover,body.nc-motion .btn-ghost:hover{transform:translateY(-1px)}
  body.nc-motion .btn-brand:active,body.nc-motion .btn-ghost:active{transform:scale(.97)}
  @media(prefers-reduced-motion:reduce){.nc-reveal{opacity:1!important;transform:none!important}}
  /* Estilos de botonazo (se activan por clase en <body>) */
  .cta-apple .btn-brand{border-radius:999px;font-weight:500;min-height:46px;padding:.55rem 1.5rem;box-shadow:none}
  .cta-instagram .btn-brand{background:linear-gradient(45deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);border:0;color:#fff;border-radius:12px;font-weight:700;box-shadow:0 8px 22px rgba(220,39,67,.32)}
  .cta-instagram .btn-brand:hover{filter:brightness(1.05);color:#fff}
  .cta-ncgreen .btn-brand{background:#2ca01c;border-color:#2ca01c;color:#fff;border-radius:10px;font-weight:800;text-transform:uppercase;letter-spacing:.03em;box-shadow:0 10px 24px rgba(44,160,28,.30)}
  .cta-ncgreen .btn-brand:hover{background:#238016;border-color:#238016}
  .cta-neon .btn-brand{background:var(--ba);border-color:var(--ba);color:#08130a;font-weight:700;box-shadow:0 0 22px color-mix(in srgb,var(--ba) 65%,transparent)}
  .cta-neon .btn-brand:hover{filter:brightness(1.05);color:#08130a}
  .cta-outline .btn-brand{background:transparent;border:2px solid var(--bp);color:var(--bp);font-weight:700}
  .cta-outline .btn-brand:hover{background:var(--bp);color:#fff}
  .cta-dark .btn-brand{background:#111;border-color:#111;color:#fff;border-radius:10px;font-weight:700}
  .cta-dark .btn-brand:hover{background:#000;border-color:#000}
  .cta-pill .btn-brand{border-radius:999px;font-weight:700}
  /* Marquesina de logos */
  @keyframes ncmarq{from{transform:translateX(0)}to{transform:translateX(-50%)}}
  .ncmarq{display:flex;gap:48px;width:max-content;animation:ncmarq 22s linear infinite}
  .ncmarq img{height:36px;object-fit:contain;opacity:.75}
  img,svg{max-width:100%}`;}

function styleOf(s){return Object.assign({},STYLE_DEF,LIB[s.type].styleDef||{},s.style||{});}
function renderSection(s){
  const lib=LIB[s.type]; const inner=lib.render(s.props||{});
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
  else if(!forExport&&s.type==="imported"){inner=importedPreviewHtml(s.props.html);}
  else{inner=(s.type==="imported")?s.props.html:renderSection(s);}
  const drag=(forExport||(!forExport&&state.freeMode))?'':'draggable="true"';
  return `<div data-sec="${s.id}" ${drag} class="${sel?'sel':''}${(!forExport&&s.hidden)?' nc-hid':''}">${tb}${inner}</div>`;
}).join("\n");}
function _freeSetT(html,ncid,t){try{const r=ncParse(html);const el=r.querySelector('[data-ncid="'+ncid+'"]');if(el){el.style.transform=t;return r.innerHTML;}}catch(e){}return html;}
function _freeDel(html,ncid){try{const r=ncParse(html);const el=r.querySelector('[data-ncid="'+ncid+'"]');if(el)el.remove();return r.innerHTML;}catch(e){}return html;}

function collectFonts(b){
  const nm=s=>{const m=(s||"").match(/'([^']+)'/);return m?m[1]:null;};
  const set=[nm(b.fhead),nm(b.fbody)];
  state.sections.forEach(s=>{const hf=(s.style&&s.style.headFont)||"";if(hf)set.push(hf);});
  return fontsHrefMany(set);
}
function buildDoc(forExport){
  const b=BRANDS[state.settings.brand]; const gtm=ph(state.settings.gtm,"GTM-XXXXXXX");
  const gtmHead=forExport?`<script data-nc-keep>${ncConsentHead()}(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');<\/script>`:"";
  const gtmBody=forExport?`<noscript><iframe title="Google Tag Manager" src="https://www.googletagmanager.com/ns.html?id=${gtm}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`:"";
  const st=state.settings;
  const modal=(st.ctaAction==='popup'||st.ctaAction==='popupimg')?`<div class="modal fade" id="ncContact" tabindex="-1" aria-hidden="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content" style="background:var(--bp);border:0;border-radius:20px;box-shadow:0 20px 60px rgba(0,0,0,.35)">
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
  const modalPro=ncEnhanceHTML(modal,{type:'popup'});
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
    (function(){var dragId=null,ind=null;
      function clearInd(){if(ind&&ind.parentNode)ind.parentNode.removeChild(ind);ind=null;}
      document.querySelectorAll('[data-sec]').forEach(function(s){
        s.addEventListener('dragstart',function(e){dragId=s.getAttribute('data-sec');s.classList.add('nc-dragging');try{e.dataTransfer.effectAllowed='move';e.dataTransfer.setData('text/plain',dragId);}catch(_){}});
        s.addEventListener('dragend',function(){dragId=null;s.classList.remove('nc-dragging');clearInd();});
        s.addEventListener('dragover',function(e){if(!dragId)return;e.preventDefault();if(s.getAttribute('data-sec')===dragId){clearInd();return;}var r=s.getBoundingClientRect();var before=e.clientY<r.top+r.height/2;clearInd();ind=document.createElement('div');ind.className='nc-drop-ind';if(before)s.parentNode.insertBefore(ind,s);else s.parentNode.insertBefore(ind,s.nextSibling);});
        s.addEventListener('drop',function(e){if(!dragId)return;e.preventDefault();var refId=s.getAttribute('data-sec');if(refId===dragId){clearInd();return;}var r=s.getBoundingClientRect();var before=e.clientY<r.top+r.height/2;parent.postMessage({nc:'reorder',dragId:dragId,refId:refId,before:before},'*');dragId=null;clearInd();});
      });
    })();
  <\/script>`;
  const widgets=`<script>(function(){
    document.querySelectorAll('[data-calc]').forEach(function(w){var inp=w.querySelector('[data-calc-input]');var pct=parseFloat(w.getAttribute('data-pct'))||30;var oM=w.querySelector('[data-calc-m]'),oY=w.querySelector('[data-calc-y]');function f(n){return n.toLocaleString('es-ES',{maximumFractionDigits:0})+' \\u20AC';}function u(){var v=parseFloat(((inp&&inp.value)||'').replace(',','.'))||0;var m=v*pct/100;if(oM)oM.textContent=f(m);if(oY)oY.textContent=f(m*12);}if(inp)inp.addEventListener('input',u);u();});
    document.querySelectorAll('[data-cal]').forEach(function(w){var dw=w.querySelector('[data-cal-days]');var hid=w.querySelector('[data-cal-hidday]');if(!dw)return;var nm=['dom','lun','mar','mi\\u00e9','jue','vie','s\\u00e1b'];var t=new Date();for(var i=0;i<7;i++){(function(i){var d=new Date(t.getTime());d.setDate(d.getDate()+i);var b=document.createElement('button');b.type='button';b.className='cal-day';b.innerHTML='<span>'+nm[d.getDay()]+'</span><strong>'+d.getDate()+'</strong>';b.addEventListener('click',function(){dw.querySelectorAll('.cal-day').forEach(function(x){x.classList.remove('on')});b.classList.add('on');if(hid)hid.value=d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2);});dw.appendChild(b);})(i);}});
    document.querySelectorAll('[data-quiz]').forEach(function(w){var steps=[].slice.call(w.querySelectorAll('[data-step]'));var idx=0;var ans={};var bar=w.querySelector('[data-quiz-bar]');function show(){steps.forEach(function(s,i){s.style.display=i===idx?'':'none'});if(bar)bar.style.width=Math.round(idx/Math.max(1,steps.length-1)*100)+'%';}w.querySelectorAll('[data-opt]').forEach(function(o){o.addEventListener('click',function(){ans[o.getAttribute('data-q')]=o.getAttribute('data-opt');var st=o.closest('[data-step]');st.querySelectorAll('[data-opt]').forEach(function(x){x.classList.remove('on')});o.classList.add('on');if(idx<steps.length-1){idx++;show();}});});w.querySelectorAll('[data-quiz-back]').forEach(function(b){b.addEventListener('click',function(){if(idx>0){idx--;show();}});});var fm=w.querySelector('form');if(fm)fm.addEventListener('submit',function(){try{window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:'quiz_complete',answers:ans});}catch(e){}});show();});
    document.querySelectorAll('[data-countdown]').forEach(function(w){var end=new Date((w.getAttribute('data-end')||'').replace(' ','T')).getTime();var els=w.querySelectorAll('[data-cd]');function t(){if(isNaN(end))return;var d=end-Date.now();if(d<0)d=0;var s=Math.floor(d/1000),dd=Math.floor(s/86400),hh=Math.floor(s%86400/3600),mm=Math.floor(s%3600/60),ss=s%60,v=[dd,hh,mm,ss];els.forEach(function(e,i){e.textContent=('0'+v[i]).slice(-2)});}t();setInterval(t,1000);});
    (function(){var body=document.body;var act=body.getAttribute('data-ctaaction')||'scroll';var tel=body.getAttribute('data-tel')||'';var wa=body.getAttribute('data-wa')||'';document.querySelectorAll('[data-cta="form"]').forEach(function(el){if(act==='call'){el.setAttribute('href','tel:'+tel);}else if(act==='whatsapp'){el.setAttribute('href','https://wa.me/'+wa);el.setAttribute('target','_blank');}else if(act==='popup'||act==='popupimg'){el.addEventListener('click',function(e){e.preventDefault();var m=document.getElementById('ncContact');if(m&&window.bootstrap){bootstrap.Modal.getOrCreateInstance(m).show();}});}});})();
    (function(){var body=document.body;if(body.classList.contains('nc-motion')&&('IntersectionObserver' in window)&&!(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)){var els=[].slice.call(document.querySelectorAll('[data-sec]'));els.forEach(function(el){el.classList.add('nc-reveal');});var io=new IntersectionObserver(function(ents){ents.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12});els.forEach(function(el){io.observe(el);});}})();
    document.querySelectorAll('[data-countup]').forEach(function(el){var to=parseFloat(el.getAttribute('data-countup'))||0;var suf=el.getAttribute('data-suf')||'';var dur=1300;function run(){var t0=null;function step(ts){if(!t0)t0=ts;var p=Math.min((ts-t0)/dur,1);el.textContent=Math.floor(p*to).toLocaleString('es-ES')+suf;if(p<1)requestAnimationFrame(step);}requestAnimationFrame(step);}if('IntersectionObserver' in window){var io=new IntersectionObserver(function(e){if(e[0].isIntersecting){run();io.disconnect();}});io.observe(el);}else run();});
  })();<\/script>`;
  return `<!doctype html><html lang="es"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(ph(state.settings.title,"TITULO_SEO"))}</title>
<meta name="description" content="${esc(ph(state.settings.desc,"META_DESCRIPTION"))}">
${forExport?ncHeadMeta(secs):''}
<meta property="og:title" content="${esc(ph(state.settings.title,"TITULO_SEO"))}"><meta property="og:type" content="website">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${collectFonts(b)}" rel="stylesheet"><link href="${bsCSS}" rel="stylesheet">${st.importCSS||""}
<style>:root{${b.vars}--fhead:${b.fhead};--fbody:${b.fbody}}${baseCSS()}${ncProCSS()}${ncDirCSS()}${b.profileCSS||''}${STYLEKITS[st.styleKit]||''}</style>
${gtmHead}</head><body class="cta-${st.ctaStyle||'brand'}${st.motion?' nc-motion':''}" data-ctaaction="${st.ctaAction||'scroll'}" data-nc="${esc(JSON.stringify(ncRuntimeConfig()))}" data-tel="${esc(ph(st.tel,'TELEFONO').replace(/\s/g,''))}" data-wa="${esc(ph(st.wa,'WHATSAPP').replace(/[^0-9]/g,''))}">
${gtmBody}
${secs}
${modalPro}${cookie}
<script src="${bsJS}"><\/script>
${forExport?'<script>'+ncRuntimeJS()+'<\/script>':''}${widgets}${editor}
</body></html>`;
}

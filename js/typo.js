/* ---------- v4.5 · TIPOGRAFÍA GLOBAL (encima de marca y estilo) ----------
   Tres papeles: titulares, texto y "display" (titular del hero, precios y cifras grandes).
   Cada papel puede venir de la marca/estilo o forzarse con cualquier Google Font o con una fuente subida (.woff2/.woff/.ttf/.otf).
   Las fuentes comerciales detectadas al importar (Druk, SF Pro, Gotham…) se cambian por su equivalente libre. */
["Nunito Sans","Barlow Condensed","Archivo Black","Jost","Familjen Grotesk","Schibsted Grotesk","Geist","Hanken Grotesk","Instrument Sans"].forEach(f=>{if(!FONTS.includes(f))FONTS.push(f);});
Object.assign(FONT_AXES,{"Nunito Sans":"wght@400;600;700;800;900","Barlow Condensed":"wght@500;600;700;800","Jost":"wght@400;500;600;700;800","Familjen Grotesk":"wght@400;500;600;700","Schibsted Grotesk":"wght@400;500;600;700;800;900","Geist":"wght@400;500;600;700;800","Hanken Grotesk":"wght@400;500;600;700;800","Instrument Sans":"wght@400;500;600;700"});
if(!FONT_ONE.includes("Archivo Black"))FONT_ONE.push("Archivo Black");
Object.assign(SETTINGS_DEFAULT,{fontHead:"",fontBody:"",fontDisp:"",fontFiles:[]});
["fontHead","fontBody","fontDisp"].forEach(k=>{if(state.settings[k]===undefined)state.settings[k]="";});if(!Array.isArray(state.settings.fontFiles))state.settings.fontFiles=[];
const NC_PAIRS=[["Producto premium","Inter Tight","Inter",""],["Fintech","Geist","Geist",""],["SaaS técnico","Space Grotesk","Inter",""],["Editorial","Fraunces","Inter",""],["Condensada oferta","Anton","Nunito Sans","Anton"],["Cercana","Poppins","Nunito Sans",""],["Lujo","Cormorant Garamond","Inter",""],["Ancha y rotunda","Archivo Black","Archivo","Archivo Black"]];
function ncFontFiles(){return Array.isArray(state.settings.fontFiles)?state.settings.fontFiles:[];}
function ncIsFileFont(n){return ncFontFiles().some(f=>f.name===n);}
function ncFontQ(n){return `'${n}',${NC_SERIF_LOOK.includes(n)||FONT_SERIF.includes(n)?"Georgia,serif":"system-ui,sans-serif"}`;}
function ncTypoCSS(){const st=state.settings,files=ncFontFiles();let css="";
  files.forEach(f=>{css+=`@font-face{font-family:'${f.name}';src:url(${f.url});font-weight:100 900;font-display:swap}`;});
  let v="";if(st.fontHead)v+=`--fhead:${ncFontQ(st.fontHead)};`;if(st.fontBody)v+=`--fbody:${ncFontQ(st.fontBody)};`;if(st.fontDisp)v+=`--fdisp:${ncFontQ(st.fontDisp)};`;
  if(v)css+=`:root{${v}}`;
  if(st.fontDisp){const one=FONT_ONE.includes(st.fontDisp);
    css+=`.da-h1,.db-h1,.dc-h1,.da-price .p,.da-plan .pp,.dx-ptab .pp,.dc-price b,.nc-cd .dx-cdn b{font-family:var(--fdisp)!important;${one?"font-weight:400!important;letter-spacing:0!important;":""}}`;css+=`.da-plan .pp small,.dx-ptab .pp small,.da-price .p small{font-family:var(--fbody)!important;font-weight:600!important;letter-spacing:0!important}`;}
  const b=BRANDS[st.brand];if(st.brand==="custom"&&CUSTOM.shape&&ncLook()==="base")css+=`.da-btn,.da-go,.da-call,.da-bigcall,.da-bigwa,.db-btn,.dc-btn{border-radius:var(--btnr)!important}.da-card .form-control,.da-inline .form-control,.nc-opts span{border-radius:min(var(--btnr),30px)!important}.da-card,.da-plan,.da-ben,.dx-media-img.fr-round,.dx-media-img.fr-card{border-radius:var(--cardr)!important}`;
  return css;}
function ncTypoFontsHref(){const st=state.settings;return fontsHrefMany([st.fontHead,st.fontBody,st.fontDisp].filter(n=>n&&!ncIsFileFont(n)));}
(function(){const _bd=buildDoc;buildDoc=function(){let h=_bd.apply(this,arguments);const css=ncTypoCSS(),href=ncTypoFontsHref();if(!css&&!href)return h;
  return h.replace("</head>",`${href?`<link rel="stylesheet" href="${href}">`:""}${css?`<style>${css}</style>`:""}</head>`);};})();
/* marca propia: color de texto del botón, nombre y forma */
(function(){const _s=syncCustom;syncCustom=function(){_s.apply(this,arguments);if(CUSTOM.btntext)BRANDS.custom.vars+=`--btntext:${CUSTOM.btntext};`;if(CUSTOM.name)BRANDS.custom.name=CUSTOM.name;};})();

/* ---- Panel Global ---- */
(function(){const _rg=renderGlobal;renderGlobal=function(){_rg.apply(this,arguments);const gf=document.getElementById("globalFields");if(!gf||gf.querySelector("#gTypo"))return;const st=state.settings;
  const opts=sel=>`<option value="">De la marca / el estilo</option>`+(ncFontFiles().length?`<optgroup label="Subidas">${ncFontFiles().map(f=>`<option ${f.name===sel?"selected":""}>${esc(f.name)}</option>`).join("")}</optgroup>`:"")+`<optgroup label="Google Fonts">${[...FONTS].sort().map(f=>`<option ${f===sel?"selected":""}>${esc(f)}</option>`).join("")}</optgroup>`;
  const html=`<div id="gTypo"><div class="paneltitle" style="padding:10px 0 4px">Tipografía</div>
   <div class="nc-pairs">${NC_PAIRS.map((p,i)=>`<button type="button" class="chipf sm" data-pair="${i}" title="${esc(p[1]+" / "+p[2])}">${esc(p[0])}</button>`).join("")}<button type="button" class="chipf sm" data-pair="-1">↺ Marca</button></div>
   <div class="fld"><label>Titulares</label><select id="gFH">${opts(st.fontHead)}</select></div>
   <div class="fld"><label>Texto</label><select id="gFB">${opts(st.fontBody)}</select></div>
   <div class="fld"><label>Titular del hero, precios y cifras</label><select id="gFD">${opts(st.fontDisp)}</select></div>
   <div class="fld"><input type="file" id="gFFile" accept=".woff2,.woff,.ttf,.otf" style="display:none"><button type="button" class="btn sm" id="gFUp">⤒ Subir fuente propia</button>
     ${ncFontFiles().map((f,i)=>`<span class="nc-ffile">${esc(f.name)} <button type="button" class="mini" data-ffdel="${i}">✕</button></span>`).join("")}
     <div class="help">Mandan sobre la marca y sobre el estilo elegido. Sube solo fuentes con licencia web para este cliente; si no, usa el equivalente libre.</div></div></div>`;
  gf.insertAdjacentHTML("beforeend",html);
  const on=(id,k)=>{const el=document.getElementById(id);if(el)el.addEventListener("change",()=>{commit();state.settings[k]=el.value;renderPreview();});};on("gFH","fontHead");on("gFB","fontBody");on("gFD","fontDisp");
  gf.querySelectorAll("[data-pair]").forEach(b=>b.addEventListener("click",()=>{commit();const p=NC_PAIRS[+b.dataset.pair];
    if(p){state.settings.fontHead=p[1];state.settings.fontBody=p[2];state.settings.fontDisp=p[3];}else{state.settings.fontHead=state.settings.fontBody=state.settings.fontDisp="";}renderGlobal();renderPreview();}));
  const fi=document.getElementById("gFFile");document.getElementById("gFUp").addEventListener("click",()=>fi.click());
  fi.addEventListener("change",()=>{const f=fi.files[0];if(!f)return;if(f.size>1.5*1024*1024)toast("⚠ Fuente pesada: engordará el HTML");const r=new FileReader();r.onload=()=>{commit();const name=f.name.replace(/\.(woff2?|ttf|otf)$/i,"").replace(/[-_]+/g," ").replace(/[^\w ]/g,"").trim()||"Fuente propia";
      state.settings.fontFiles=ncFontFiles().filter(x=>x.name!==name).concat([{name,url:r.result}]);if(!state.settings.fontHead)state.settings.fontHead=name;renderGlobal();renderPreview();toast("Fuente «"+name+"» lista");};r.readAsDataURL(f);});
  gf.querySelectorAll("[data-ffdel]").forEach(b=>b.addEventListener("click",()=>{commit();const f=ncFontFiles()[+b.dataset.ffdel];state.settings.fontFiles=ncFontFiles().filter(x=>x!==f);["fontHead","fontBody","fontDisp"].forEach(k=>{if(f&&state.settings[k]===f.name)state.settings[k]="";});renderGlobal();renderPreview();}));};})();

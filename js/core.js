/* ---------- ESTADO ---------- */
const state={ settings:{brand:"nc",title:"",desc:"",tel:"",wa:"",endpoint:"",gtm:"",slug:"landing",ctaStyle:"brand",ctaAction:"scroll",popupTitle:"¿Necesitas ayuda?",popupImg:"",cookies:false,thanks:true,thanksText:"¡Gracias! Te llamamos enseguida.",styleKit:"none",look:"base",lookBrandFont:false,motion:false,importCSS:"",consent:"banner",urlPrivacy:"",urlCookies:"",legalOwner:"",privacyCheck:true,privacyText:"He leído y acepto la",attribution:true,ecData:true,thanksUrl:"",noindex:true,pageUrl:"",ogImage:"",favicon:""},
  sections:[], selected:null, tab:"content", device:"desktop" };
const SETTINGS_DEFAULT=JSON.parse(JSON.stringify(state.settings));
let uid=1; const nid=()=>"s"+(uid++);

/* ---------- HELPERS ---------- */
const esc=s=>String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const lines=s=>String(s||"").split("\n").map(l=>l.trim()).filter(Boolean);
const cells=l=>l.split("|").map(x=>x.trim());
const arr=v=>Array.isArray(v)?v:[];
function ph(v,t){return (v&&String(v).trim())?String(v).trim():"{{"+t+"}}";}
function telHref(){return "tel:"+ph(state.settings.tel,"TELEFONO").replace(/\s/g,"");}
function telText(){return ph(state.settings.tel,"TELEFONO");}
function waHref(){return "https://wa.me/"+ph(state.settings.wa,"WHATSAPP").replace(/[^0-9]/g,"");}
function imgOrBox(src,label,cls,focus){return src?`<img src="${src}" class="${cls||''}" loading="lazy" style="width:100%;height:100%;object-fit:cover;object-position:${focus||'center'}" alt="">`:`<div class="d-grid" style="place-items:center;width:100%;height:100%;background:var(--bsoft);color:var(--bmuted);font-size:13px">${label||"Imagen {{IMG}}"}</div>`;}
function formFieldHTML(f){const req=(f.required==='no')?'':'required';const name=esc(f.name||'campo');const ph=esc(f.label||'');
  if(f.type==='textarea')return `<div class="col-12"><textarea ${req} name="${name}" class="form-control form-control-lg" placeholder="${ph}" rows="3"></textarea></div>`;
  if(f.type==='select'){const opts=(f.options||'').split(',').filter(x=>x.trim()).map(o=>`<option>${esc(o.trim())}</option>`).join('');return `<div class="col-12"><select ${req} name="${name}" class="form-select form-select-lg"><option value="" disabled selected>${ph||'Elige'}</option>${opts}</select></div>`;}
  if(f.type==='checkbox')return `<div class="col-12 form-check my-1"><input ${req} type="checkbox" class="form-check-input" name="${name}" id="fc_${name}"><label class="form-check-label small" for="fc_${name}" style="color:var(--bmuted)">${ph}</label></div>`;
  const t=f.type||'text';const pat=(t==='tel')?' pattern="[0-9]{9}" title="9 dígitos"':'';
  return `<div class="col-12"><input ${req} name="${name}" type="${t}"${pat} class="form-control form-control-lg" placeholder="${ph}"></div>`;}

/* ---------- ESTILO DE SECCIÓN ---------- */
const PAD={S:"padding:30px 0",M:"padding:58px 0",L:"padding:86px 0",XL:"padding:120px 0"};
const WIDTH={narrow:"max-width:700px",normal:"",wide:"max-width:1240px",full:"max-width:100%"};
const OVL={soft:.25,med:.45,strong:.62};
const BG={white:{c:"#ffffff",d:false},soft:{c:"var(--bsoft)",d:false},tint:{c:"color-mix(in srgb,var(--bp) 8%,#fff)",d:false},primary:{c:"var(--bp)",d:true},ink:{c:"var(--bink)",d:true},image:{c:null,d:true}};
const STYLE_FIELDS=[
  {k:"bg",l:"Fondo",t:"select",opts:[["white","Blanco"],["soft","Suave"],["tint","Tinte de marca"],["primary","Primario"],["ink","Oscuro"],["image","Imagen"]]},
  {k:"bgimg",l:"Imagen de fondo",t:"image",when:s=>s.bg==="image"},
  {k:"overlay",l:"Oscurecer imagen",t:"select",opts:[["soft","Suave"],["med","Media"],["strong","Fuerte"]],when:s=>s.bg==="image"},
  {k:"pad",l:"Espaciado vertical",t:"select",opts:[["S","Compacto"],["M","Normal"],["L","Amplio"],["XL","Extra"]]},
  {k:"align",l:"Alineación",t:"select",opts:[["left","Izquierda"],["center","Centro"]]},
  {k:"width",l:"Ancho del contenido",t:"select",opts:[["narrow","Estrecho"],["normal","Normal"],["wide","Ancho"],["full","Completo"]]},
  {k:"divider",l:"Forma superior",t:"select",opts:[["none","Recta"],["wave","Onda"],["curve","Curva"],["diagup","Diagonal ↗"],["diagdown","Diagonal ↘"]]},
  {k:"headFont",l:"Fuente de titulares",t:"select",opts:[["","De la marca"],...FONTS.map(f=>[f,f])]},
  {k:"titleWeight",l:"Grosor de titulares",t:"select",opts:[["","Auto"],["400","Fino"],["500","Medio"],["600","Semibold"],["700","Negrita"],["800","Extra-negrita"]]},
  {k:"titleColor",l:"Color de titulares (hex, vacío=auto)",ph:"auto"},
  {k:"textColor",l:"Color de texto (hex, vacío=auto)",ph:"auto"},
  {k:"accentColor",l:"Color de acento/botón (hex, vacío=marca)",ph:"auto"}
];
const STYLE_DEF={bg:"white",bgimg:"",overlay:"med",pad:"M",align:"left",width:"normal",divider:"none",headFont:"",titleWeight:"",titleColor:"",textColor:"",accentColor:""};
function secOpen(st){
  const b=BG[st.bg]||BG.white; let bgcss; const isImg=st.bg==="image"&&st.bgimg;
  if(isImg){const o=OVL[st.overlay]||.45;bgcss=`background:linear-gradient(rgba(0,0,0,${o}),rgba(0,0,0,${o})),url('${st.bgimg}') center/cover no-repeat;`;}
  else bgcss=`background:${b.c};`;
  const dark=b.d||isImg;
  let head=dark?"#ffffff":"var(--bink)"; let mut=dark?"rgba(255,255,255,.80)":"var(--bmuted)";
  if(st.titleColor)head=st.titleColor; if(st.textColor)mut=st.textColor;
  const align=st.align==="center"?"text-center":"";
  let extra="";
  if(st.headFont)extra+=`--fhead:'${st.headFont}',sans-serif;`;
  if(st.titleWeight)extra+=`--titlew:${st.titleWeight};`;
  if(st.accentColor)extra+=`--bp:${st.accentColor};--bp2:${st.accentColor};`;
  // separador con forma (SVG en color de la propia sección)
  const DIVCOL={white:"#ffffff",soft:"var(--bsoft)",tint:"var(--bsoft)",primary:"var(--bp)",ink:"var(--bink)"};
  const dc=DIVCOL[st.bg]||"#ffffff"; let svg="";
  if(!isImg && st.divider && st.divider!=="none"){
    let path="";
    if(st.divider==="wave")path="M0,50 L0,26 C300,4 900,48 1200,26 L1200,50 Z";
    else if(st.divider==="curve")path="M0,50 L0,50 Q600,-6 1200,50 Z";
    else if(st.divider==="diagup")path="M0,50 L1200,8 L1200,50 Z";
    else if(st.divider==="diagdown")path="M0,8 L1200,50 L0,50 Z";
    if(path)svg=`<svg aria-hidden="true" viewBox="0 0 1200 50" preserveAspectRatio="none" style="position:absolute;left:0;top:-49px;width:100%;height:50px;display:block"><path d="${path}" fill="${dc}"/></svg>`;
  }
  const pos=(svg?"position:relative;":"");
  return `<section style="${pos}${bgcss}padding:var(--secpad-${st.pad||'M'}) 0;--headcol:${head};--txtmuted:${mut};color:${dark?'#fff':'inherit'};${extra}">${svg}<div class="container ${align}" style="${WIDTH[st.width]||''}">`;
}
const secClose=()=>`</div></section>`;

/* ============================================================
   NC LANDING BUILDER
   Motor de secciones · salida Bootstrap 5.3.3 + tokens de marca
   Imágenes Base64 · controles de estilo · editor de tema · undo/redo
   ============================================================ */

/* ---------- MARCAS ---------- */
const FONTS=["Inter","Poppins","Montserrat","Outfit","Manrope","Sora","DM Sans","Work Sans","Space Grotesk","Nunito","Mulish","Lato","Roboto","Open Sans","Raleway","Rubik","Karla","Figtree","Plus Jakarta Sans","Onest","Archivo","Libre Franklin","Source Sans 3","IBM Plex Sans","Barlow","Josefin Sans","Quicksand","Urbanist","Epilogue","Red Hat Display","Bricolage Grotesque","Oswald","Bebas Neue","Anton","Playfair Display","Merriweather","Fraunces","DM Serif Display","Lora","Cormorant Garamond","Space Mono","JetBrains Mono","IBM Plex Mono","Instrument Serif","Inter Tight","Syne","Newsreader","Caveat"];
const FONT_SERIF=["Playfair Display","Merriweather","Fraunces","Lora","Cormorant Garamond"];
const FONT_ONE=["Bebas Neue","Anton","DM Serif Display"];
const FONT_AXES={"Caveat":"wght@500;600;700","Newsreader":"ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500","Archivo":"wght@400;500;600;700;800;900","Instrument Serif":"ital@0;1","Cormorant Garamond":"ital,wght@0,300;0,400;0,500;0,600;1,300;1,400","Syne":"wght@500;600;700;800","IBM Plex Mono":"wght@400;500","JetBrains Mono":"wght@400;500","Inter Tight":"wght@400;500;600;700;800;900"};
function fontWeights(n){return FONT_AXES[n]||(FONT_ONE.includes(n)?"wght@400":FONT_SERIF.includes(n)?"wght@400;500;600;700":"wght@400;500;600;700;800");}
function fontsHref(head,body){
  const fam=n=>encodeURIComponent(n).replace(/%20/g,"+");
  const set=[...new Set([head,body].filter(Boolean))];
  return "https://fonts.googleapis.com/css2?"+set.map(n=>"family="+fam(n)+":"+fontWeights(n)).join("&")+"&display=swap";
}
function fontsHrefMany(names){
  const fam=n=>encodeURIComponent(n).replace(/%20/g,"+");
  const set=[...new Set(names.filter(Boolean))];
  if(!set.length)return "";
  return "https://fonts.googleapis.com/css2?"+set.map(n=>"family="+fam(n)+":"+fontWeights(n)).join("&")+"&display=swap";
}
const BRANDS = {
  nc:{name:"Next Conversion", locked:true,
    vars:"--bp:#6E5AFF;--bp2:#5646d6;--ba:#C1FF33;--bink:#312937;--bmuted:#6b6472;--bsoft:#F3F1FF;--line:#E7E4F5;--btnr:8px;--cardr:16px;",
    fhead:"'Space Grotesk',sans-serif",fbody:"'Inter',sans-serif",fonts:fontsHref("Space Grotesk","Inter"),
    note:"Extraído en vivo de nextconversion.es · morado #6E5AFF + lima #C1FF33 + tinta #312937 · Space Grotesk."},
  assista:{name:"Assista Digital", locked:true,
    vars:"--bp:#d02320;--bp2:#b1040e;--ba:#00112b;--bink:#00112b;--bmuted:#54606f;--bsoft:#f6f7f9;--line:#e4e7ec;--btnr:50rem;--cardr:0 18px 0 18px;",
    fhead:"'Outfit',sans-serif",fbody:"'Montserrat',sans-serif",fonts:fontsHref("Outfit","Montserrat"),
    note:"Botones pill y esquinas de card asimétricas (brandbook Grupo Assista)."},
  tuawa:{name:"Tuawa (Global Omnium)", locked:true,
    vars:"--bp:#134D8F;--bp2:#0e3c72;--ba:#3BB5B0;--bink:#0c2338;--bmuted:#5a6b7c;--bsoft:#eef4fb;--line:#dbe6f0;--btnr:10px;--cardr:14px;",
    fhead:"'Manrope',sans-serif",fbody:"'Manrope',sans-serif",fonts:fontsHref("Manrope","Manrope"),
    note:"Satoshi no está en Google Fonts: sustituida por Manrope."},
  custom:{name:"Editable", locked:false,
    vars:"--bp:#2563EB;--bp2:#1d4ed8;--ba:#10B981;--bink:#0f172a;--bmuted:#475569;--bsoft:#f1f5f9;--line:#e2e8f0;--btnr:10px;--cardr:14px;",
    fhead:"'Inter',sans-serif",fbody:"'Inter',sans-serif",fonts:fontsHref("Inter","Inter"),
    note:"Marca editable: ajusta colores, tipografías y radios en la pestaña Global."},

  /* ---- Clientes NC (extraídos en vivo con Claude-in-Chrome) ---- */
  c_orange:{name:"Orange", locked:true, client:true,
    vars:"--bp:#FF7900;--bp2:#e06a00;--ba:#000000;--bink:#000000;--bmuted:#5b6573;--bsoft:#FFF3E9;--line:#f0e4d9;--btnr:0px;--cardr:0px;",
    fhead:"'Inter',sans-serif",fbody:"'Inter',sans-serif",fonts:fontsHref("Inter","Inter"),
    note:"orange.es · naranja #FF7900 + negro · botones rectos (0px) · Orange Sans→Inter."},
  c_masmovil:{name:"MásMóvil", locked:true, client:true,
    vars:"--bp:#43AA15;--bp2:#379010;--ba:#FFE200;--bink:#373A3C;--bmuted:#5b6573;--bsoft:#EEF9E9;--line:#dbeede;--btnr:0px;--cardr:8px;",
    fhead:"'Mulish',sans-serif",fbody:"'Mulish',sans-serif",fonts:fontsHref("Mulish","Mulish"),
    note:"tarifasmasmovil.es · verde #43AA15 + amarillo #FFE200 · Mulish."},
  c_yoigo:{name:"Yoigo", locked:true, client:true,
    vars:"--bp:#3EA200;--bp2:#338700;--ba:#E42E84;--bink:#363546;--bmuted:#5b6573;--bsoft:#EAF7E6;--line:#d9ecd9;--btnr:8px;--cardr:12px;",
    fhead:"'Roboto',sans-serif",fbody:"'Roboto',sans-serif",fonts:fontsHref("Roboto","Roboto"),
    note:"contrataryoigo.es · verde CTA #3EA200 + magenta Yoigo #E42E84 · Roboto."},
  c_masahorro:{name:"MásAhorro", locked:true, client:true,
    vars:"--bp:#012BFF;--bp2:#0121cc;--ba:#FFE000;--bink:#0b1020;--bmuted:#5b6573;--bsoft:#EAF0FF;--line:#d7e3ff;--btnr:999px;--cardr:16px;",
    fhead:"'Inter',sans-serif",fbody:"'Inter',sans-serif",fonts:fontsHref("Inter","Inter"),
    note:"masahorrofibraymovil.com · azul #012BFF + amarillo #FFE000 · botón pill · Arial→Inter."},
  c_jazztel:{name:"Jazztel", locked:true, client:true,
    vars:"--bp:#08A800;--bp2:#078a00;--ba:#DA1884;--bink:#333333;--bmuted:#5b6573;--bsoft:#EAF7E6;--line:#dcecdc;--btnr:4px;--cardr:10px;",
    fhead:"'Montserrat',sans-serif",fbody:"'Montserrat',sans-serif",fonts:fontsHref("Montserrat","Montserrat"),
    note:"mijazztel.com · verde #08A800 + magenta #DA1884 · Montserrat."},
  c_simyo:{name:"Simyo", locked:true, client:true,
    vars:"--bp:#FF6600;--bp2:#e25a00;--ba:#08A6DB;--bink:#111111;--bmuted:#5b6573;--bsoft:#FFF1E6;--line:#ffe3cc;--btnr:0px;--cardr:8px;",
    fhead:"'Inter',sans-serif",fbody:"'Inter',sans-serif",fonts:fontsHref("Inter","Inter"),
    note:"simyotarifas.es · naranja #FF6600 + azul #08A6DB · botón recto · Interstate→Inter."},
  c_vodafone:{name:"Vodafone", locked:true, client:true,
    vars:"--bp:#E60000;--bp2:#c20000;--ba:#007C92;--bink:#0D0D0D;--bmuted:#5b6573;--bsoft:#FDEAEA;--line:#f6d6d6;--btnr:16px;--cardr:16px;",
    fhead:"'Inter',sans-serif",fbody:"'Inter',sans-serif",fonts:fontsHref("Inter","Inter"),
    note:"tufibraymovil.com · rojo Vodafone #E60000 · Vodafone Rg→Inter."},
  c_lowi:{name:"Lowi", locked:true, client:true,
    vars:"--bp:#E60000;--bp2:#c20000;--ba:#111111;--bink:#0D0D0D;--bmuted:#5b6573;--bsoft:#FDEAEA;--line:#f6d6d6;--btnr:16px;--cardr:16px;",
    fhead:"'Poppins',sans-serif",fbody:"'Poppins',sans-serif",fonts:fontsHref("Poppins","Poppins"),
    note:"ofertasfibra-online.com · la landing usa plantilla roja tipo Vodafone; la marca Lowi real es lima/coral (revisar)."},
  c_finetwork:{name:"Finetwork", locked:true, client:true,
    vars:"--bp:#5F0AFF;--bp2:#4e08d6;--ba:#00DC74;--bink:#0F0733;--bmuted:#5b6573;--bsoft:#F1EAFF;--line:#e5d9ff;--btnr:8px;--cardr:14px;",
    fhead:"'Poppins',sans-serif",fbody:"'Nunito',sans-serif",fonts:fontsHref("Poppins","Nunito"),
    note:"finetwork-online.es · morado #5F0AFF + verde #00DC74 · Poppins/Nunito Sans."},
  c_totalenergies:{name:"TotalEnergies", locked:true, client:true,
    vars:"--bp:#ED0000;--bp2:#c40000;--ba:#0090D6;--bink:#374649;--bmuted:#5b6573;--bsoft:#FDEAEA;--line:#f6d6d6;--btnr:999px;--cardr:16px;",
    fhead:"'Nunito',sans-serif",fbody:"'Roboto',sans-serif",fonts:fontsHref("Nunito","Roboto"),
    note:"totalenergies-ofertas.es · rojo #ED0000 + azul · botón pill · Nunito/Roboto."},
  c_adt:{name:"ADT", locked:true, client:true,
    vars:"--bp:#005FA9;--bp2:#024d88;--ba:#44A0E3;--bink:#303538;--bmuted:#5b6573;--bsoft:#E9F2FB;--line:#d6e6f5;--btnr:28px;--cardr:16px;",
    fhead:"'Inter',sans-serif",fbody:"'Inter',sans-serif",fonts:fontsHref("Inter","Inter"),
    note:"adt.configuratualarma.es · azul ADT #005FA9 · Avenir/Benton→Inter."},
  c_sicor:{name:"Sicor", locked:true, client:true,
    vars:"--bp:#008D3F;--bp2:#037433;--ba:#03485A;--bink:#03485A;--bmuted:#5b6573;--bsoft:#E8F6EE;--line:#d5ece0;--btnr:4px;--cardr:10px;",
    fhead:"'Inter',sans-serif",fbody:"'Inter',sans-serif",fonts:fontsHref("Inter","Inter"),
    note:"alarmasicor.com · verde #008D3F + petróleo #03485A · Allumi→Inter."},
  c_prosegur:{name:"Prosegur", locked:true, client:true,
    vars:"--bp:#FFD102;--bp2:#e6bb00;--ba:#019BF2;--bink:#1A1A1A;--bmuted:#5b6573;--bsoft:#FFF9E0;--line:#f3ecc9;--btnr:6px;--cardr:12px;--btntext:#1A1A1A;",
    fhead:"'Poppins',sans-serif",fbody:"'Poppins',sans-serif",fonts:fontsHref("Poppins","Poppins"),
    note:"alarmasprosegur.es · amarillo #FFD102 (texto oscuro en botón) + azul #019BF2 · Poppins."},
  c_segurma:{name:"Segurma", locked:true, client:true,
    vars:"--bp:#FF6800;--bp2:#e25c00;--ba:#111111;--bink:#0F0F0F;--bmuted:#5b6573;--bsoft:#FFF0E6;--line:#ffe0cc;--btnr:999px;--cardr:16px;",
    fhead:"'Poppins',sans-serif",fbody:"'Inter',sans-serif",fonts:fontsHref("Poppins","Inter"),
    note:"assista.segurmadistribucion.es · naranja #FF6800 · Century Gothic→Poppins/Inter."},
  c_teleasistencia:{name:"SICOR Teleasistencia", locked:true, client:true,
    vars:"--bp:#00CFD9;--bp2:#00b3bc;--ba:#003B3F;--bink:#003B3F;--bmuted:#5b6573;--bsoft:#E6FBFC;--line:#cdeff1;--btnr:2px;--cardr:8px;--btntext:#003B3F;",
    fhead:"'Inter',sans-serif",fbody:"'Inter',sans-serif",fonts:fontsHref("Inter","Inter"),
    note:"sicorteleasistencia.com · turquesa #00CFD9 (texto oscuro en botón) + verde #003B3F · Allumi→Inter."},
  c_alarmafacil:{name:"AlarmaFácil", locked:true, client:true,
    vars:"--bp:#FF0033;--bp2:#d4002a;--ba:#00A89D;--bink:#212529;--bmuted:#5b6573;--bsoft:#FFEAEE;--line:#ffd6de;--btnr:999px;--cardr:16px;",
    fhead:"'Inter',sans-serif",fbody:"'Inter',sans-serif",fonts:fontsHref("Inter","Inter"),
    note:"alarmafacil.es · rojo #FF0033 + teal #00A89D · botón pill."}
};
const CUSTOM={bp:"#2563EB",ba:"#10B981",ink:"#0f172a",soft:"#f1f5f9",muted:"#5b6573",line:"#e2e8f0",btntext:"#ffffff",ink0:"",btnr:10,cardr:14,fhead:"Inter",fbody:"Inter"};
function syncCustom(){
  const shade=(h,f)=>{h=h.replace('#','');const n=parseInt(h,16);let r=(n>>16)&255,g=(n>>8)&255,b=n&255;r=Math.round(r*f);g=Math.round(g*f);b=Math.round(b*f);return"#"+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1);};
  BRANDS.custom.vars=`--bp:${CUSTOM.bp};--bp2:${shade(CUSTOM.bp,.82)};--ba:${CUSTOM.ba};--bink:${CUSTOM.ink};--bmuted:${CUSTOM.muted||"#5b6573"};--bsoft:${CUSTOM.soft};--line:${CUSTOM.line||"#e2e8f0"};--btnr:${CUSTOM.btnr}px;--cardr:${CUSTOM.cardr}px;${/^#[0-9a-f]{6}$/i.test(CUSTOM.ink0||"")?`--ink0:${CUSTOM.ink0};`:""}`;
  BRANDS.custom.fhead=`'${CUSTOM.fhead}',sans-serif`;BRANDS.custom.fbody=`'${CUSTOM.fbody}',sans-serif`;
  BRANDS.custom.fonts=fontsHref(CUSTOM.fhead,CUSTOM.fbody);
}
/* Grupos del selector de marca */
const BRAND_GROUPS=[
  ["Next Conversion & marcas",["nc","assista","tuawa","custom"]],
  ["Clientes NC",["c_orange","c_masmovil","c_yoigo","c_masahorro","c_jazztel","c_simyo","c_vodafone","c_lowi","c_finetwork","c_totalenergies","c_adt","c_sicor","c_prosegur","c_segurma","c_teleasistencia","c_alarmafacil"]]
];
function brandOptions(sel){return BRAND_GROUPS.filter(g=>g[1].some(k=>BRANDS[k])).map(g=>`<optgroup label="${g[0]}">`+g[1].filter(k=>BRANDS[k]).map(k=>`<option value="${k}" ${k===sel?'selected':''}>${BRANDS[k].name}</option>`).join("")+`</optgroup>`).join("");}


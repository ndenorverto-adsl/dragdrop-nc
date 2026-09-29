/* ============================================================
   NC LANDING BUILDER v2
   Motor de secciones · salida Bootstrap 5.3.3 + tokens de marca
   Imágenes Base64 · controles de estilo · editor de tema · undo/redo
   ============================================================ */

/* ---------- MARCAS ---------- */
const FONTS=["Inter","Poppins","Montserrat","Outfit","Manrope","Sora","DM Sans","Work Sans","Space Grotesk","Nunito","Mulish","Lato","Roboto","Open Sans","Raleway","Rubik","Karla","Figtree","Plus Jakarta Sans","Onest","Archivo","Libre Franklin","Source Sans 3","IBM Plex Sans","Barlow","Josefin Sans","Quicksand","Urbanist","Epilogue","Red Hat Display","Bricolage Grotesque","Oswald","Bebas Neue","Anton","Playfair Display","Merriweather","Fraunces","DM Serif Display","Lora","Cormorant Garamond","Space Mono","JetBrains Mono","IBM Plex Mono"];
const FONT_SERIF=["Playfair Display","Merriweather","Fraunces","Lora","Cormorant Garamond"];
const FONT_ONE=["Bebas Neue","Anton","DM Serif Display"];
function fontWeights(n){return FONT_ONE.includes(n)?"wght@400":FONT_SERIF.includes(n)?"wght@400;500;600;700":"wght@400;500;600;700;800";}
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

  /* ---- Referencia externa (aproximado, ajustable) ---- */
  apple:{name:"Apple", locked:true, ref:true,
    vars:"--bp:#0071E3;--bp2:#0066CC;--ba:#1D1D1F;--bink:#1D1D1F;--bmuted:#86868B;--bsoft:#F5F5F7;--line:#D2D2D7;--btnr:999px;--cardr:28px;",
    fhead:"'Inter',sans-serif",fbody:"'Inter',sans-serif",fonts:fontsHref("Inter","Inter"),
    note:"Perfil de estilo completo (sistema de diseño Apple documentado): SF Pro→Inter, tinta #1D1D1F, azul #0071E3, gris #F5F5F7, botones pill 44px, cards 28px sin borde, sombras sutiles, tipografía a gran escala con tracking negativo y mucho aire.",
    profileCSS:`/* Apple style profile */
h1,h2,h3,.h-font,.display-4,.display-5,.display-6{font-weight:600;letter-spacing:-0.03em;line-height:1.07}
.display-4{font-size:clamp(2.7rem,6vw,4.6rem);letter-spacing:-0.04em;line-height:1.03}
.display-5{font-size:clamp(2.2rem,5vw,3.5rem);letter-spacing:-0.035em;line-height:1.05}
.display-6{font-size:clamp(1.8rem,4vw,2.6rem);letter-spacing:-0.03em}
.lead{font-size:1.32rem;line-height:1.45;letter-spacing:-0.01em}
:root{--secpad-S:44px;--secpad-M:80px;--secpad-L:112px;--secpad-XL:150px}
.btn-brand,.btn-ghost{border-radius:999px;min-height:44px;font-weight:500;padding:.5rem 1.35rem;box-shadow:none;display:inline-flex;align-items:center;justify-content:center;gap:.4rem}
.btn-ghost{border-width:1px}
.btn-lg{font-size:17px;min-height:50px;padding:.65rem 1.7rem}
.brandcard{background:#F5F5F7;border:none;border-radius:28px;box-shadow:none;color:#1D1D1F}
.brandcard.featured{box-shadow:0 12px 32px rgba(0,0,0,.10);border:none}
.badge-soft{background:rgba(0,113,227,.10);border:none;color:#0071E3}
.accordion-item{border:none!important;border-bottom:1px solid #D2D2D7!important;border-radius:0!important;background:transparent}
.accordion-button{font-weight:500;padding-left:0;padding-right:0}
.accordion-body{padding-left:0;padding-right:0}
.apple-link:hover{text-decoration:underline!important}`},
  movistar:{name:"Movistar", locked:true, ref:true,
    vars:"--bp:#019DF4;--bp2:#0284c7;--ba:#0B2739;--bink:#0B2739;--bmuted:#5a6b7c;--bsoft:#EAF6FE;--line:#d7e8f4;--btnr:999px;--cardr:16px;",
    fhead:"'Poppins',sans-serif",fbody:"'Inter',sans-serif",fonts:fontsHref("Poppins","Inter"),
    note:"Azul Movistar #019DF4 + navy Telefónica. On Air→Poppins/Inter.",
    profileCSS:`.btn-brand{border-radius:999px;font-weight:700;padding:.6rem 1.4rem}
.brandcard{border-radius:20px;border-color:#e0eef8;box-shadow:0 6px 22px rgba(1,157,244,.08)}
.badge-soft{background:#e6f5fe;color:#0284c7;border:0}
h1,h2,h3{letter-spacing:-.01em}`},
  verizon:{name:"Verizon", locked:true, ref:true,
    vars:"--bp:#EE0000;--bp2:#c20000;--ba:#000000;--bink:#000000;--bmuted:#6f6f6f;--bsoft:#F6F6F6;--line:#e2e2e2;--btnr:0px;--cardr:0px;",
    fhead:"'Inter',sans-serif",fbody:"'Inter',sans-serif",fonts:fontsHref("Inter","Inter"),
    note:"Aproximado. Rojo #EE0000 + negro, estética muy plana y esquinas rectas. Verizon NHG sustituida por Inter."},
  tmobile:{name:"T-Mobile", locked:true, ref:true,
    vars:"--bp:#E20074;--bp2:#b8005f;--ba:#000000;--bink:#1A1A1A;--bmuted:#6b6b6b;--bsoft:#FBEAF3;--line:#f0d6e5;--btnr:999px;--cardr:16px;",
    fhead:"'Poppins',sans-serif",fbody:"'Inter',sans-serif",fonts:fontsHref("Poppins","Inter"),
    note:"Magenta corporativo #E20074 + negro. TeleGrotesk→Poppins/Inter.",
    profileCSS:`.btn-brand{border-radius:999px;font-weight:800;padding:.62rem 1.5rem;box-shadow:0 8px 22px rgba(226,0,116,.28)}
.brandcard{border-radius:20px;border-color:#f3d3e4}
.badge-soft{background:#fde7f2;color:#E20074;border:0}
h1,.display-4,.display-5{font-weight:800;letter-spacing:-.02em}`},
  o2:{name:"O2", locked:true, ref:true,
    vars:"--bp:#0019A5;--bp2:#001480;--ba:#26D9C3;--bink:#0A1F44;--bmuted:#566079;--bsoft:#EAF0FF;--line:#d5ddf3;--btnr:999px;--cardr:16px;",
    fhead:"'Poppins',sans-serif",fbody:"'Inter',sans-serif",fonts:fontsHref("Poppins","Inter"),
    note:"Azul O2 ~#0019A5 + acento aqua, motivo de burbujas. On Air→Poppins/Inter.",
    profileCSS:`.btn-brand{border-radius:999px;font-weight:700}
.brandcard{border-radius:22px;border-color:#dbe3fb}
.badge-soft{background:#e7ebff;color:#0019A5;border:0}`},
  mytraffic:{name:"MyTraffic (dark)", locked:true, ref:true,
    vars:"--bp:#FF2D78;--bp2:#e01e63;--ba:#35E1E1;--bink:#0B0B12;--bmuted:#8b8ba3;--bsoft:#14141C;--line:#242433;--btnr:12px;--cardr:18px;",
    fhead:"'Space Grotesk',sans-serif",fbody:"'Inter',sans-serif",fonts:fontsHref("Space Grotesk","Inter"),
    note:"Dark + glassmorphism, gradiente rosa→cian. Space Grotesk.",
    profileCSS:`body{background:#0B0B12}
.btn-brand{border-radius:12px;font-weight:700;box-shadow:0 8px 26px rgba(255,45,120,.30)}
.brandcard{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.10);border-radius:18px;color:#e8e8f2;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}
.badge-soft{background:rgba(255,45,120,.14);color:#FF2D78;border:1px solid rgba(255,45,120,.3)}
.mt-grad{background:linear-gradient(90deg,#FF2D78,#35E1E1);-webkit-background-clip:text;background-clip:text;color:transparent}`},
  abtasty:{name:"AB Tasty", locked:true, ref:true,
    vars:"--bp:#4E3BFF;--bp2:#3a2bd6;--ba:#00D1B2;--bink:#141327;--bmuted:#5b5b73;--bsoft:#F1F0FF;--line:#e2e0f7;--btnr:12px;--cardr:16px;",
    fhead:"'Sora',sans-serif",fbody:"'Inter',sans-serif",fonts:fontsHref("Sora","Inter"),
    note:"Base violeta/indigo + acento teal, SaaS. Sora.",
    profileCSS:`.btn-brand{border-radius:12px;font-weight:700;box-shadow:0 8px 24px rgba(78,59,255,.25)}
.brandcard{border-radius:18px;border-color:#e6e3fb}
.badge-soft{background:#efeaff;color:#4E3BFF;border:0}
.at-grad{background:linear-gradient(90deg,#4E3BFF,#00D1B2);-webkit-background-clip:text;background-clip:text;color:transparent}`},

  /* ---- Estilos premiados (tendencias, no marcas) ---- */
  ed_serif:{name:"Editorial serif", locked:true, ref:true,
    vars:"--bp:#B4552D;--bp2:#8f4123;--ba:#14110E;--bink:#14110E;--bmuted:#5c554c;--bsoft:#F4EEE6;--line:#e6ded1;--btnr:4px;--cardr:6px;",
    fhead:"'Playfair Display',serif",fbody:"'Inter',sans-serif",fonts:fontsHref("Playfair Display","Inter"),
    note:"Tendencia editorial: serif de display, terracota, mucho aire. Ideal salud/legal premium."},
  swiss:{name:"Swiss minimal", locked:true, ref:true,
    vars:"--bp:#111111;--bp2:#000000;--ba:#FF3B00;--bink:#111111;--bmuted:#666666;--bsoft:#F2F2F2;--line:#e4e4e4;--btnr:2px;--cardr:2px;",
    fhead:"'Inter',sans-serif",fbody:"'Inter',sans-serif",fonts:fontsHref("Inter","Inter"),
    note:"Tipografía grande, rejilla estricta, un solo acento. Look agencia/premio limpio."},
  brutalist:{name:"Brutalist mono", locked:true, ref:true,
    vars:"--bp:#000000;--bp2:#000000;--ba:#E6FF00;--bink:#000000;--bmuted:#444444;--bsoft:#ffffff;--line:#000000;--btnr:0px;--cardr:0px;",
    fhead:"'Space Grotesk',sans-serif",fbody:"'DM Sans',sans-serif",fonts:fontsHref("Space Grotesk","DM Sans"),
    note:"Bordes duros, negro puro, amarillo ácido. Alto impacto, poco convencional."},
  glass:{name:"Glass dark", locked:true, ref:true,
    vars:"--bp:#6C5CE7;--bp2:#5646d6;--ba:#00E5FF;--bink:#0B0E14;--bmuted:#9aa3b8;--bsoft:#12151E;--line:#232838;--btnr:999px;--cardr:20px;",
    fhead:"'Sora',sans-serif",fbody:"'Inter',sans-serif",fonts:fontsHref("Sora","Inter"),
    note:"SaaS oscuro con glassmorphism. Úsala con fondos ‘Oscuro’. Estilo MyTraffic/Apple keynote."},
  mesh:{name:"Gradient mesh", locked:true, ref:true,
    vars:"--bp:#7C3AED;--bp2:#6d28d9;--ba:#EC4899;--bink:#1E1B2E;--bmuted:#5b5670;--bsoft:#F5F3FF;--line:#e7e1fb;--btnr:16px;--cardr:20px;",
    fhead:"'Poppins',sans-serif",fbody:"'Inter',sans-serif",fonts:fontsHref("Poppins","Inter"),
    note:"Degradados morado→rosa, formas suaves. Muy usado en lanzamientos y fintech."},
  bigtype:{name:"Big type bold", locked:true, ref:true,
    vars:"--bp:#FF5A1F;--bp2:#e0490f;--ba:#111111;--bink:#111111;--bmuted:#5f5f5f;--bsoft:#FFF7F0;--line:#f0e4d9;--btnr:8px;--cardr:14px;",
    fhead:"'Outfit',sans-serif",fbody:"'Work Sans',sans-serif",fonts:fontsHref("Outfit","Work Sans"),
    note:"Titulares enormes, naranja enérgico. Conversión agresiva tipo oferta."},

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
const CUSTOM={bp:"#2563EB",ba:"#10B981",ink:"#0f172a",soft:"#f1f5f9",btnr:10,cardr:14,fhead:"Inter",fbody:"Inter"};
function syncCustom(){
  const shade=(h,f)=>{h=h.replace('#','');const n=parseInt(h,16);let r=(n>>16)&255,g=(n>>8)&255,b=n&255;r=Math.round(r*f);g=Math.round(g*f);b=Math.round(b*f);return"#"+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1);};
  BRANDS.custom.vars=`--bp:${CUSTOM.bp};--bp2:${shade(CUSTOM.bp,.82)};--ba:${CUSTOM.ba};--bink:${CUSTOM.ink};--bmuted:#5b6573;--bsoft:${CUSTOM.soft};--line:#e2e8f0;--btnr:${CUSTOM.btnr}px;--cardr:${CUSTOM.cardr}px;`;
  BRANDS.custom.fhead=`'${CUSTOM.fhead}',sans-serif`;BRANDS.custom.fbody=`'${CUSTOM.fbody}',sans-serif`;
  BRANDS.custom.fonts=fontsHref(CUSTOM.fhead,CUSTOM.fbody);
}
/* Grupos del selector de marca */
const BRAND_GROUPS=[
  ["Next Conversion & marcas",["nc","assista","tuawa","custom"]],
  ["Clientes NC",["c_orange","c_masmovil","c_yoigo","c_masahorro","c_jazztel","c_simyo","c_vodafone","c_lowi","c_finetwork","c_totalenergies","c_adt","c_sicor","c_prosegur","c_segurma","c_teleasistencia","c_alarmafacil"]],
  ["Referencia externa (aprox.)",["apple","movistar","verizon","tmobile","o2","mytraffic","abtasty"]],
  ["Estilos premiados",["ed_serif","swiss","brutalist","glass","mesh","bigtype"]]
];
function brandOptions(sel){return BRAND_GROUPS.filter(g=>g[1].some(k=>BRANDS[k])).map(g=>`<optgroup label="${g[0]}">`+g[1].filter(k=>BRANDS[k]).map(k=>`<option value="${k}" ${k===sel?'selected':''}>${BRANDS[k].name}</option>`).join("")+`</optgroup>`).join("");}

/* ===== Estilos visuales (ui-ux-pro-max) — capa que se combina con la marca ===== */
const STYLEKITS={
  none:"",
  swiss:`.brandcard{box-shadow:none!important;border-radius:0!important;border:1px solid #e5e5e5;transform:none!important}.btn-brand,.btn-ghost{border-radius:0!important;box-shadow:none!important}.sec-title-line{display:none}.badge-soft{border-radius:0}`,
  flat:`.brandcard{box-shadow:none!important;border-radius:4px;border:1px solid var(--line);transform:none!important}.brandcard:hover{transform:none!important}.btn-brand{border-radius:4px;box-shadow:none!important}`,
  soft:`.brandcard{border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,.06),0 14px 34px rgba(0,0,0,.08)!important;border:1px solid rgba(0,0,0,.04)}`,
  neumorphism:`section{background:#e8ebf0!important}.brandcard{background:#e8ebf0!important;border:none!important;border-radius:16px!important;box-shadow:-6px -6px 14px rgba(255,255,255,.9),6px 6px 14px rgba(0,0,0,.12)!important;transform:none!important}.btn-brand{border-radius:14px;box-shadow:-4px -4px 10px rgba(255,255,255,.85),4px 4px 10px rgba(0,0,0,.18);border:none}.form-control,.form-select{background:#e8ebf0;box-shadow:inset 3px 3px 7px rgba(0,0,0,.10),inset -3px -3px 7px rgba(255,255,255,.85);border:none}`,
  glass:`section{--headcol:#0e1116}.brandcard{background:rgba(255,255,255,.16)!important;-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.30)!important;box-shadow:0 8px 32px rgba(0,0,0,.14)!important}.badge-soft{background:rgba(255,255,255,.25);border:1px solid rgba(255,255,255,.4)}`,
  liquidglass:`section{--headcol:#0e1116}.brandcard{background:rgba(255,255,255,.14)!important;-webkit-backdrop-filter:blur(22px) saturate(1.5);backdrop-filter:blur(22px) saturate(1.5);border:1px solid rgba(255,255,255,.4)!important;border-radius:26px!important;box-shadow:0 12px 44px rgba(0,0,0,.16),inset 0 1px 0 rgba(255,255,255,.55)!important}.btn-brand{-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);box-shadow:0 8px 24px color-mix(in srgb,var(--bp) 35%,transparent)}.badge-soft{background:rgba(255,255,255,.3);border:1px solid rgba(255,255,255,.5)}`,
  claymorphism:`.brandcard{border-radius:24px!important;box-shadow:inset -3px -3px 8px rgba(0,0,0,.06),10px 10px 22px rgba(0,0,0,.10)!important;border:none}.btn-brand,.btn-ghost{border-radius:18px;box-shadow:inset -2px -2px 6px rgba(0,0,0,.18),5px 5px 14px rgba(0,0,0,.22)}.ficon{border-radius:22px;box-shadow:inset -2px -2px 6px rgba(0,0,0,.08),5px 5px 12px rgba(0,0,0,.10)}`,
  brutalism:`*{transition:none!important}.brandcard{border-radius:0!important;border:3px solid #000!important;box-shadow:7px 7px 0 #000!important;transform:none!important}.brandcard.featured::before{border-radius:0}.btn-brand{border-radius:0!important;border:3px solid #000!important;box-shadow:5px 5px 0 #000;background:var(--ba);color:#000}.badge-soft{border-radius:0;border:2px solid #000;background:#fff;color:#000}.sec-title-line{display:none}`,
  neubrutalism:`.brandcard{border-radius:14px!important;border:3px solid #000!important;box-shadow:6px 6px 0 #000!important;transform:none!important}.btn-brand{border-radius:12px;border:3px solid #000;box-shadow:4px 4px 0 #000}.btn-brand:hover{transform:translate(-2px,-2px);box-shadow:7px 7px 0 #000}.badge-soft{border:2px solid #000;box-shadow:3px 3px 0 #000}`,
  bento:`.brandcard{border-radius:24px!important;box-shadow:0 4px 6px rgba(0,0,0,.05),0 20px 40px rgba(0,0,0,.06)!important}.brandcard:hover{transform:scale(1.02)}`,
  materialyou:`.btn-brand,.btn-ghost{border-radius:999px!important;font-weight:600}.brandcard{border-radius:24px!important;box-shadow:0 1px 3px rgba(0,0,0,.10),0 6px 16px rgba(0,0,0,.06)!important;border:none}.badge-soft{border-radius:999px}.form-control,.form-select{border-radius:16px}`,
  monochrome:`section{--headcol:#000}.brandcard{border-radius:0!important;box-shadow:none!important;border:1.5px solid #000!important;transform:none!important}.btn-brand{border-radius:0!important;background:#000!important;border-color:#000!important;color:#fff!important;box-shadow:none}.btn-ghost{border-radius:0;border:1.5px solid #000;color:#000}.badge-soft{border-radius:0;border:1px solid #000;background:#fff;color:#000}.sec-title-line{background:#000}`,
  bauhaus:`.brandcard{border-radius:0!important;box-shadow:4px 4px 0 #121212!important;border:2px solid #121212!important;transform:none!important}.btn-brand{border-radius:999px;box-shadow:4px 4px 0 #121212}.btn-brand:active{transform:translate(2px,2px);box-shadow:none}.ficon{border-radius:0;border:2px solid #121212}`,
  editorial:`body{font-family:Georgia,'Merriweather',serif}p,.lead{font-family:Georgia,'Merriweather',serif}.brandcard{border-radius:2px;box-shadow:none!important;border:1px solid #e2e2e2}.sec-title-line{display:none}h1,h2,h3{letter-spacing:-.01em}`,
  organic:`.brandcard{border-radius:28px 28px 28px 8px!important;box-shadow:0 8px 32px rgba(0,0,0,.08)!important;border:none}.btn-brand,.btn-ghost{border-radius:999px}.ficon{border-radius:60% 40% 55% 45%}`,
  dark:`section{background:#0d0d0d!important;--headcol:#ffffff;--txtmuted:rgba(255,255,255,.72)}.brandcard{background:#161616!important;border-color:#2a2a2a!important;color:#eaeaea!important;box-shadow:0 10px 30px rgba(0,0,0,.5)!important}.form-control,.form-select{background:#1e1e1e;border-color:#333;color:#eee}.accordion-item{background:#161616;border-color:#2a2a2a!important}.accordion-button{background:#161616!important;color:#eee}nav,footer{background:#0d0d0d!important}`,
  aurora:`@keyframes ncaurora{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}section{background:linear-gradient(120deg,color-mix(in srgb,var(--bp) 55%,#fff),color-mix(in srgb,var(--ba) 45%,#fff),color-mix(in srgb,var(--bp) 40%,#fff))!important;background-size:220% 220%!important;animation:ncaurora 12s ease infinite;--headcol:#111;--txtmuted:#333}.brandcard{background:rgba(255,255,255,.72)!important;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.5)!important}`,
  gradientmesh:`section{background:radial-gradient(at 20% 20%,color-mix(in srgb,var(--bp) 45%,#fff),transparent 45%),radial-gradient(at 80% 30%,color-mix(in srgb,var(--ba) 45%,#fff),transparent 45%),radial-gradient(at 50% 80%,color-mix(in srgb,var(--bp) 30%,#fff),transparent 45%),#fff!important;--headcol:#111}.brandcard{background:rgba(255,255,255,.8)!important;-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)}`,
  cyberpunk:`section{background:#0d0d0d!important;--headcol:#00ff9c;--txtmuted:#8affd6}h1,h2,h3{text-shadow:0 0 10px rgba(0,255,156,.5)}.brandcard{background:#0f1512!important;border:1px solid #1f3b30!important;color:#c8ffe6!important;box-shadow:0 0 22px rgba(0,255,156,.12)!important}.btn-brand{background:#00ff9c;border-color:#00ff9c;color:#04120b;box-shadow:0 0 16px rgba(0,255,156,.5)}nav,footer{background:#0d0d0d!important}`,
  vaporwave:`section{background:linear-gradient(180deg,#2a1152,#0b1e5b)!important;--headcol:#ffffff;--txtmuted:#e6d6ff}h1,h2,h3{text-shadow:0 0 12px rgba(255,113,206,.6)}.brandcard{background:rgba(255,255,255,.08)!important;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);border:1px solid rgba(255,113,206,.4)!important;color:#fbe9ff!important}.btn-brand{background:linear-gradient(135deg,#ff71ce,#01cdfe);border:none;color:#160a2e}nav,footer{background:#160a2e!important}`,
  retrofuturism:`section{background:#12122a!important;--headcol:#00e5ff;--txtmuted:#b7c4ff}.brandcard{background:#181835!important;border:1px solid #2a2a5a!important;color:#dfe6ff!important;box-shadow:0 0 22px rgba(0,229,255,.12)!important}.btn-brand{background:#ff2e88;border-color:#ff2e88;color:#fff;box-shadow:0 0 16px rgba(255,46,136,.5)}nav,footer{background:#12122a!important}`,
  y2k:`.brandcard{border-radius:22px!important;background:linear-gradient(180deg,#ffffff,#eef4ff)!important;border:1px solid #cfe0ff!important}.btn-brand{background:linear-gradient(180deg,#ffffff 0%,var(--bp) 45%);border:none;color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.25);box-shadow:0 6px 16px rgba(0,0,0,.2)}.ficon{border-radius:50%}`
};
const STYLEKIT_LIST=[["none","Marca (sin capa)"],["soft","Soft UI"],["flat","Flat"],["swiss","Swiss / Minimal"],["monochrome","Monocromo B/N"],["editorial","Editorial / Revista"],["bento","Bento"],["materialyou","Material You"],["neumorphism","Neumorphism"],["glass","Glassmorphism"],["liquidglass","Liquid Glass"],["claymorphism","Claymorphism"],["organic","Orgánico / Biofílico"],["brutalism","Brutalism"],["neubrutalism","Neubrutalism"],["bauhaus","Bauhaus"],["y2k","Y2K"],["aurora","Aurora (animado)"],["gradientmesh","Gradient Mesh"],["dark","Dark OLED"],["cyberpunk","Cyberpunk"],["vaporwave","Vaporwave"],["retrofuturism","Retro-Futurism"]];

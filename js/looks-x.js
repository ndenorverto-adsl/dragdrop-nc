/* ---------- ESTILOS DE DISEÑO EXTRA (v4.0) ----------
   11 estilos nuevos con oficio de imprenta, señalética y edición. Mismo contrato que looks.js:
   "&" = body.lk-<estilo>; los colores salen SIEMPRE de la marca (--bp, --ba, --bink); solo el papel/fondo es propio del estilo.
   Se carga después de blocks-x/blocks-uc para poder registrar sus variantes automáticas. */
Object.assign(FONT_AXES,{"Jost":"wght@400;500;600;700;800","Chivo":"wght@400;500;700;900","Barlow Condensed":"wght@500;600;700;800","Barlow":"wght@400;500;600;700","Space Mono":"wght@400;700","Playfair Display":"ital,wght@0,400;0,600;0,700;0,800;0,900;1,400;1,700;1,900","IBM Plex Sans":"wght@400;500;600;700","IBM Plex Sans Condensed":"wght@400;500;600;700","Anton":"wght@400","Rubik":"ital,wght@0,400;0,500;0,700;0,800;0,900;1,800;1,900","Public Sans":"wght@400;500;600;700;800","Fraunces":"ital,wght@0,400;0,600;0,800;0,900;1,400;1,700;1,900"});
NC_SERIF_LOOK.push("Playfair Display","Fraunces");

Object.assign(LOOKS,{
  revista:{cat:"Editorial",name:"Revista",desc:"Portada de revista: Didone muy contrastada, cursivas, filetes y pie de foto.",best:"Salud, seguros premium, lanzamientos",head:"Playfair Display",body:"Inter",mono:"Inter Tight",hw:900,hwBrand:800,mh:1.04,sample:["#ffffff","#111111","var(--bp)"]},
  expediente:{cat:"Editorial",name:"Expediente",desc:"Documento de trámite: casillas, referencias, sello de tinta y cláusulas numeradas.",best:"Legal, reclamaciones, seguros",head:"Public Sans",body:"Public Sans",mono:"IBM Plex Mono",hw:800,sample:["#FAFAF7","#1d1d1b","var(--bp)"]},
  bauhaus:{cat:"Gráfico",name:"Bauhaus",desc:"Círculo, cuadrado y triángulo con los colores de la marca. Geometría pura.",best:"Telco, energía, marcas jóvenes",head:"Jost",body:"Jost",hw:700,sample:["#F2EEE3","var(--bp)","#111111"]},
  cartel:{cat:"Gráfico",name:"Cartel tipográfico",desc:"Titulares de cartel en condensada enorme sobre bloque de color.",best:"Ofertas, campañas, telco",head:"Anton",body:"Inter",hw:400,hwBrand:800,mh:1.08,sample:["var(--bp)","#ffffff","#111111"]},
  senal:{cat:"Gráfico",name:"Señalética",desc:"Rótulos de carretera: condensada, franjas de aviso y pictogramas en placa.",best:"Alarmas, energía, instalaciones",head:"Barlow Condensed",body:"Barlow",hw:800,mh:1.06,sample:["#F4F4F1","#111111","var(--bp)"]},
  plano:{cat:"Gráfico",name:"Plano técnico",desc:"Papel milimetrado, cotas, marcas de corte y rotulación técnica.",best:"Solar, instalaciones, fibra",head:"IBM Plex Sans Condensed",body:"IBM Plex Sans",mono:"IBM Plex Mono",hw:700,sample:["#F4F6F8","var(--bp)","#1b2330"]},
  riso:{cat:"Hecho a mano",name:"Risografía",desc:"Impresión a dos tintas: sobreimpresión, registro desplazado y grano.",best:"Promos, marcas cercanas, eventos",head:"Chivo",body:"Chivo",mono:"Space Mono",hw:900,sample:["#F5F1E8","var(--bp)","#1d1d1b"]},
  ticket:{cat:"Hecho a mano",name:"Ticket de caja",desc:"Papel térmico: monoespaciada, bordes dentados, líneas de puntos y código de barras.",best:"Ofertas con precio, ahorro, comparadores",head:"Space Mono",body:"Inter",mono:"Space Mono",hw:700,mh:.9,sample:["#E9E8E3","#ffffff","#111111"]},
  setentas:{cat:"Carácter",name:"Años 70",desc:"Serif redonda, arcos de arcoíris y franjas cálidas.",best:"Energía, solar, hogar",head:"Fraunces",body:"DM Sans",hw:900,hwBrand:800,sample:["#F6EBDD","var(--bp)","#e8833a"]},
  comic:{cat:"Carácter",name:"Cómic pop",desc:"Trama de puntos, bocadillos, explosión de precio y contorno grueso.",best:"Telco joven, promos, móvil",head:"Rubik",body:"Rubik",hw:900,mh:.94,sample:["#FFF8E7","#111111","var(--bp)"]},
  terminal:{cat:"Carácter",name:"Terminal",desc:"Consola en modo oscuro: monoespaciada, prompts, cursor y ventanas.",best:"Fibra, tecnología, B2B",head:"JetBrains Mono",body:"IBM Plex Sans",mono:"JetBrains Mono",hw:500,hwBrand:700,mh:.86,sample:["#0E1116","#E6EDF3","var(--bp)"]}
});
Object.assign(LOOKS.base,{cat:"Todos"});
["editorial","prensa","lux"].forEach(k=>LOOKS[k].cat="Editorial");["swiss"].forEach(k=>LOOKS[k].cat="Gráfico");
["cuaderno","papel"].forEach(k=>LOOKS[k].cat="Hecho a mano");["brutal","retro"].forEach(k=>LOOKS[k].cat="Carácter");
LOOK_ORDER.splice(0,LOOK_ORDER.length,"base","editorial","prensa","revista","expediente","lux","swiss","bauhaus","cartel","senal","plano","cuaderno","papel","riso","ticket","brutal","retro","setentas","comic","terminal");
const LOOK_CATS=["Editorial","Gráfico","Hecho a mano","Carácter"];
Object.assign(NC_VOICE_BY_LOOK,{riso:"cercano",comic:"cercano",setentas:"cercano",cartel:"cercano",ticket:"cercano"});
Object.assign(V4_AUTO_VAR.trust,{cartel:"ticker",comic:"ticker",senal:"ticker",riso:"ticker",revista:"big",expediente:"big",plano:"big",bauhaus:"big",terminal:"big"});
Object.assign(V4_AUTO_VAR.ben,{revista:"num",expediente:"rows",plano:"num",ticket:"rows"});
Object.assign(V4_AUTO_VAR.plans,{ticket:"rows",expediente:"table",plano:"table",revista:"rows"});
Object.assign(V4_AUTO_VAR.rev,{revista:"quote",riso:"wall",comic:"wall",setentas:"wall"});
Object.assign(V4_AUTO_VAR.faq,{expediente:"open",terminal:"open",plano:"open"});
Object.assign(V4_AUTO_VAR.cta,{cartel:"big",comic:"big",senal:"big",setentas:"big",bauhaus:"split",ticket:"split",expediente:"split",revista:"split"});
Object.assign(V4_AUTO_VAR.steps,{senal:"timeline",plano:"timeline",expediente:"timeline",ticket:"timeline"});
Object.assign(V4_AUTO_VAR.foot,{revista:"full",expediente:"full",plano:"full",terminal:"full",ticket:"full"});

/* Piezas compartidas */
const LKX={
  zig:(s)=>`-webkit-mask:conic-gradient(from -45deg at bottom,#0000,#000 1deg 89deg,#0000 90deg) bottom/${s}px 51% repeat-x,conic-gradient(from 135deg at top,#0000,#000 1deg 89deg,#0000 90deg) top/${s}px 51% repeat-x;mask:conic-gradient(from -45deg at bottom,#0000,#000 1deg 89deg,#0000 90deg) bottom/${s}px 51% repeat-x,conic-gradient(from 135deg at top,#0000,#000 1deg 89deg,#0000 90deg) top/${s}px 51% repeat-x`,
  corners:c=>`background-image:linear-gradient(${c},${c}),linear-gradient(${c},${c}),linear-gradient(${c},${c}),linear-gradient(${c},${c}),linear-gradient(${c},${c}),linear-gradient(${c},${c}),linear-gradient(${c},${c}),linear-gradient(${c},${c});background-size:14px 2px,2px 14px,14px 2px,2px 14px,14px 2px,2px 14px,14px 2px,2px 14px;background-position:0 0,0 0,100% 0,100% 0,0 100%,0 100%,100% 100%,100% 100%;background-repeat:no-repeat`,
  burst:"polygon(50% 0,59% 13%,74% 5%,76% 21%,93% 20%,86% 35%,100% 44%,87% 54%,96% 69%,79% 71%,78% 88%,63% 82%,54% 98%,45% 84%,30% 95%,26% 79%,9% 81%,15% 65%,0 55%,13% 45%,4% 30%,20% 27%,19% 10%,35% 15%)",
  flat:"border-radius:0!important;box-shadow:none!important",
  allR:"& .db-ctabox,& .dc-cta,& .dc-formbar,& .dc-lgrid,& .db-quote,& .db-opt,& .dc-chip,& .da-plan .tag,& .da-sticky .da-btn,& .db-sticky,& .db-sticky a,& .dc-sticky"
};

Object.assign(LOOK_CSS,{
/* ===== REVISTA ===== */
revista:o=>`
&{--lkp:#fff;--dline:color-mix(in srgb,var(--bink) 14%,#fff);--visr:0;--mkr:0;--mkb:1px solid var(--ink0);--mksh:none;--visbg:color-mix(in srgb,var(--bp) 8%,#f4f2ee);--visdeco:transparent;background:#fff}
${lkS('hero')},${lkS('sec')},${lkS('nav')},& .db-ctab{background:#fff!important}& .da-sec.soft,& .db-sec.soft{background:#F4F2EE!important}
${lkS('nav')}{border-bottom:1px solid var(--bink)}& .da-logo,& .db-logo,& .dc-logo{font-family:var(--fhead);font-weight:900;letter-spacing:-.02em;font-size:26px}
${lkS('h1')}{font-weight:var(--lk-hw);letter-spacing:-.035em;line-height:.92}& .da-h1,& .db-h1{font-size:clamp(46px,6.4vw,104px)}
${lkS('mark')}{background:none;color:var(--bpt);-webkit-text-fill-color:currentColor;font-style:italic;font-weight:400;padding:0;letter-spacing:-.02em}
${lkS('h2')}{font-weight:var(--lk-hw);letter-spacing:-.03em;line-height:.98}& .da-h2,& .db-h2,& .dc-h2{font-size:clamp(34px,4.4vw,64px)}
${lkS('h3')}{font-weight:700;letter-spacing:-.01em}& .da-ben h3,& .db-step h3,& .dc-tile h3{font-size:25px;font-style:italic;font-weight:700}
${lkS('kick')}{display:inline-flex;align-items:center;gap:12px;font:600 11px/1 var(--fmono,var(--fbody));letter-spacing:.24em;text-transform:uppercase;color:var(--bink);background:none;border:0;border-radius:0;padding:0}
${lkS('kick','::before')},${lkS('kick','::after')}{content:"";width:28px;height:1px;background:currentColor}& .da-eyebrow .dot{display:none}
${lkS('btn')}{border-radius:99px!important;box-shadow:none!important;font-family:var(--fmono,var(--fbody));font-weight:600;letter-spacing:.06em;text-transform:uppercase;font-size:13.5px}
& .da-btn.sec{background:transparent;border-width:1px}
${lkS('card')}{border-radius:0!important;box-shadow:none!important;border:0!important;border-top:1px solid var(--bink)!important;background:transparent!important}
& .da-card,& .db-form{border:1px solid var(--bink)!important;background:#fff!important;box-shadow:12px 12px 0 color-mix(in srgb,var(--bp) 14%,transparent)!important}
${lkS('input')}{border-radius:0!important;border:0!important;border-bottom:1px solid var(--bink)!important;background:transparent;padding-left:2px!important}
${lkS('num')}{font-family:var(--fhead);font-weight:900!important;letter-spacing:-.03em}
& .da-price{border-top:1px solid var(--bink);border-bottom:1px solid var(--bink);padding:12px 0;max-width:560px}& .da-price .p{font-style:italic}
& .da-checks li:before{color:var(--bpt)}& .da-ben{padding:22px 0 0}& .da-ben .ic{color:var(--bpt)}
& .da-trust .it b{font-family:var(--fhead);font-style:italic;font-size:clamp(30px,3vw,44px)}& .da-trust .row>div+div .it{border-left:1px solid var(--dline);padding-left:16px}
& .db-quote,& .db-rev blockquote{font:italic 400 21px/1.4 var(--fhead)}& .db-quote{background:none;border:0;border-left:3px solid var(--bp);border-radius:0}
& .db-rev{position:relative;padding-top:34px!important}& .db-rev::before{content:"“";position:absolute;top:-18px;left:0;font:900 84px/1 var(--fhead);color:var(--bp)}
${LKX.allR}{border-radius:0!important}& .db-sticky a,& .da-sticky .da-btn{border-radius:99px!important}
& .nc-vis{box-shadow:none;aspect-ratio:4/5}& .nc-vis.is-photo>img{filter:contrast(1.06) saturate(.9)}& .nc-vis.is-mock::before{display:none}
& .nc-vis-wrap::after{content:"";position:absolute;left:0;right:0;bottom:-14px;height:1px;background:var(--bink)}
& .nc-float{left:auto;right:-10px;bottom:-40px;border-radius:0;box-shadow:none;background:#fff;border:0;border-top:3px solid var(--bink);padding:12px 4px 4px;max-width:66%}& .nc-float .nci{display:none}& .nc-float b{font:italic 700 20px/1.1 var(--fhead)}
@media (max-width:575px){& .da-h1,& .db-h1{font-size:clamp(40px,11.5vw,56px)}& .nc-float{right:10px;bottom:-26px}}`,

/* ===== EXPEDIENTE ===== */
expediente:o=>`
&{--lkp:#FAFAF7;--dline:color-mix(in srgb,var(--bink) 22%,#FAFAF7);--visr:2px;--mkr:2px;--mkb:1px solid var(--ink0);--mksh:none;--visbg:#EEEDE7;--visdeco:transparent;background:var(--lkp)}
${lkS('hero')},${lkS('sec')},${lkS('nav')},& .db-ctab,& .da-sec.soft,& .db-sec.soft{background:var(--lkp)!important}
& .da-sec.soft,& .db-sec.soft{background-image:repeating-linear-gradient(0deg,transparent 0 27px,color-mix(in srgb,var(--bink) 5%,transparent) 27px 28px)!important}
${lkS('nav')}{border-bottom:0!important;box-shadow:inset 0 -1px 0 var(--bink),inset 0 -3px 0 var(--lkp),inset 0 -4px 0 var(--bink)}
& .da-sec,& .db-sec,& .dc-sec{border-top:1px solid var(--dline)}
${lkS('h1')}{font-weight:var(--lk-hw);letter-spacing:-.03em;line-height:1.02}& .da-h1,& .db-h1{font-size:clamp(38px,4.8vw,70px)}
${lkS('mark')}{background:none;color:var(--bpt);-webkit-text-fill-color:currentColor;font-style:normal;padding:0 0 .02em;box-shadow:inset 0 -.1em 0 color-mix(in srgb,var(--bp) 35%,transparent)}
${lkS('h2')}{font-weight:var(--lk-hw);letter-spacing:-.025em}${lkS('h3')}{font-weight:700;letter-spacing:-.01em}
${lkS('kick')}{display:inline-flex;align-items:center;gap:0;font:500 11.5px/1 var(--fmono,var(--fbody));letter-spacing:.06em;text-transform:uppercase;color:var(--bink);background:#fff;border:1px solid var(--bink);border-radius:0;padding:0}
${lkS('kick','::before')}{content:"Asunto";padding:7px 9px;background:var(--bink);color:var(--lkp);margin-right:9px}& .da-eyebrow,& .db-kicker{padding-right:10px!important}& .da-eyebrow .dot{display:none}
${lkS('btn')}{border-radius:2px!important;box-shadow:none!important;font-weight:700}
& .da-btn.sec{background:#fff;border-width:1px}
${lkS('card')}{border-radius:2px!important;box-shadow:none!important;border:1px solid var(--bink)!important;background:#fff!important}
& .da-card,& .db-form{position:relative;padding-top:48px!important}
& .da-card::before,& .db-form::before{content:"Solicitud · Ref. ____";position:absolute;left:0;right:0;top:0;padding:9px 16px;border-bottom:1px solid var(--bink);font:500 11px/1 var(--fmono);letter-spacing:.08em;text-transform:uppercase;color:var(--bmuted);background:repeating-linear-gradient(90deg,transparent 0 8px,color-mix(in srgb,var(--bink) 4%,transparent) 8px 9px)}
${lkS('input')}{border-radius:0!important;border:1px solid var(--bink)!important;background:#fff;font-family:var(--fmono)}
${lkS('num')}{font-weight:800!important;letter-spacing:-.03em}
& .da-price{border:1px solid var(--bink);background:#fff;padding:12px 16px;max-width:540px}
& .da-checks li:before{content:"☑";color:var(--bpt);font-weight:400}& .da-checks li{font-family:var(--fbody)}
& .da-ben{background:#fff;border:1px solid var(--dline);border-radius:2px}& .da-ben .ic{color:var(--bpt)}
& .da-trust .row>div+div .it{border-left:1px solid var(--dline);padding-left:16px}
& .db-step .n{font:500 13px/1 var(--fmono);letter-spacing:.06em}& .db-step{border-top:1px solid var(--bink)}
& .db-quote{background:#fff;border:1px solid var(--dline);border-left:4px solid var(--bp);border-radius:0}
${LKX.allR}{border-radius:2px!important}
& .nc-vis{border:1px solid var(--bink);box-shadow:none}& .nc-vis.is-photo>img{filter:grayscale(.35) contrast(1.05)}& .nc-vis.is-mock::before{display:none}& .mk-sheet{transform:none!important}
& .nc-stk{display:grid;place-content:center;text-align:center;position:absolute;z-index:4;top:-24px;right:-8px;width:124px;height:124px;border-radius:50%;border:3px solid var(--bp);box-shadow:inset 0 0 0 5px #fff,inset 0 0 0 7px var(--bp);color:var(--bp);background:rgba(255,255,255,.7);transform:rotate(-12deg);padding:12px;mix-blend-mode:multiply}& .nc-stk b{font:800 18px/1 var(--fhead);text-transform:uppercase;letter-spacing:-.01em;overflow-wrap:anywhere}& .nc-stk small{font:600 9.5px/1.2 var(--fmono);text-transform:uppercase;letter-spacing:.06em}
& .nc-float{border-radius:0;box-shadow:none;border:1px solid var(--bink)}& .nc-float .nci{border-radius:0;background:none}
@media (max-width:991px){& .nc-stk{width:96px;height:96px;right:4px;top:-16px}& .nc-stk b{font-size:14px}}`,

/* ===== BAUHAUS ===== */
bauhaus:o=>`
&{--lkp:#F2EEE3;--dline:var(--bink);--visr:0 0 0 999px;--mkr:0;--mkb:2px solid var(--ink0);--mksh:none;--visbg:color-mix(in srgb,var(--ba) 40%,#fff);--visdeco:transparent;background:var(--lkp)}
${lkS('hero')},${lkS('sec')},${lkS('nav')},& .db-ctab{background:var(--lkp)!important}& .da-sec.soft,& .db-sec.soft{background:#fff!important}
${lkS('nav')}{border-bottom:3px solid var(--bink)}
${lkS('hero')}{position:relative;overflow:hidden}${lkS('hero','>.container')}{position:relative;z-index:1}
${lkS('h1')}{font-weight:var(--lk-hw);letter-spacing:-.045em;line-height:1.02}& .da-h1,& .db-h1{font-size:clamp(42px,5.8vw,90px)}
${lkS('mark')}{background:linear-gradient(transparent 12%,var(--bp) 12% 94%,transparent 94%);color:var(--btntext,#fff);-webkit-text-fill-color:currentColor;font-style:normal;padding:0 .12em;-webkit-box-decoration-break:clone;box-decoration-break:clone}
${lkS('h2')},${lkS('h3')}{font-weight:var(--lk-hw);letter-spacing:-.035em}
& .da-sec .da-h2::after,& .db-sec .db-h2::after,& .dc-sec .dc-h2::after{content:"";display:inline-block;width:.62em;height:.54em;margin-left:.22em;vertical-align:.04em;background:var(--bp);clip-path:polygon(50% 0,100% 100%,0 100%)}
${lkS('kick')}{display:inline-flex;align-items:center;gap:10px;font:700 12.5px/1 var(--fbody);letter-spacing:.14em;text-transform:uppercase;color:var(--bink);background:none;border:0;padding:0;border-radius:0}
${lkS('kick','::before')}{content:"";width:14px;height:14px;border-radius:50%;background:var(--bp);box-shadow:20px 0 0 -2px var(--ba),38px 0 0 -3px var(--bink);margin-right:40px}& .da-eyebrow .dot{display:none}
${lkS('btn')}{border-radius:0!important;box-shadow:none!important;font-weight:700;letter-spacing:.02em}
& .da-btn.pri,& .db-go,& .da-go,& .dc-go{position:relative;padding-right:52px!important}
& .da-btn.pri::after,& .db-go::after,& .da-go::after,& .dc-go::after{content:"";position:absolute;right:16px;top:50%;width:18px;height:18px;border-radius:50%;background:var(--ba);transform:translateY(-50%)}
& .da-btn.sec{background:#fff;border-width:2px}
${lkS('card')}{border-radius:0!important;box-shadow:none!important;border:2px solid var(--bink)!important;background:#fff!important}
& .da-card,& .db-form{border-width:3px!important;box-shadow:14px 14px 0 var(--bp)!important}
${lkS('input')}{border-radius:0!important;border:2px solid var(--bink)!important}
${lkS('num')}{font-weight:800!important;letter-spacing:-.05em}
& .da-row-ben .da-ben{position:relative;padding-top:64px}& .da-row-ben .da-ben::before{content:"";position:absolute;top:22px;left:22px;width:28px;height:28px;background:var(--bp)}
& .da-row-ben>div:nth-child(3n+1) .da-ben::before{border-radius:50%}& .da-row-ben>div:nth-child(3n+2) .da-ben::before{background:var(--ba)}& .da-row-ben>div:nth-child(3n) .da-ben::before{background:var(--bink);clip-path:polygon(50% 0,100% 100%,0 100%)}
& .da-row-ben .da-ben .ic{position:absolute;top:22px;right:22px}& .da-ben .ic{color:var(--bpt)}
& .da-trust{background:var(--bink)!important;border:0}& .da-trust .it{color:rgba(255,255,255,.72)}& .da-trust .it b{color:#fff}
& .db-step .n{display:grid;place-items:center;width:44px;height:44px;border-radius:50%;background:var(--bp);color:var(--btntext,#fff);font-weight:800}
& .da-plan.best{box-shadow:10px 10px 0 var(--ba)!important}
${LKX.allR}{border-radius:0!important}
& .nc-vis{border:3px solid var(--bink);box-shadow:none}& .nc-vis.is-photo>img{filter:grayscale(1) contrast(1.1)}& .nc-vis.is-mock::before{display:none}& .mk-sheet{transform:none!important}
& .nc-vis.is-photo::after{content:"";position:absolute;inset:0;background:var(--bp);mix-blend-mode:multiply;opacity:.55}
& .nc-vis-wrap::before{content:"";position:absolute;z-index:3;right:-18px;top:-18px;width:34%;aspect-ratio:1;border-radius:50%;background:var(--ba)}
& .nc-vis-wrap::after{content:"";position:absolute;z-index:3;left:14%;bottom:-16px;width:26%;height:32px;background:var(--bink)}
& .nc-float{border-radius:0;box-shadow:none;border:2px solid var(--bink)}& .nc-float .nci{border-radius:50%;background:var(--ba);color:${o.onBa}}
@media (max-width:991px){& .nc-vis-wrap::before{right:-6px;top:-10px;width:24%}}`,

/* ===== CARTEL TIPOGRÁFICO ===== */
cartel:o=>`
&{--lkp:#fff;--dline:color-mix(in srgb,var(--bink) 14%,#fff);--visr:0;--mkr:0;--mkb:0;--mksh:0 30px 50px -24px rgba(0,0,0,.5);--visbg:color-mix(in srgb,var(--bp) 70%,#000);--visdeco:transparent;background:#fff}
${lkS('sec')},${lkS('nav')},& .db-ctab{background:#fff!important}& .da-sec.soft,& .db-sec.soft{background:color-mix(in srgb,var(--ba) 22%,#fff)!important}
& .da-hero,& .db-hero{background:var(--bp)!important;--bink:var(--btntext,#fff);--bmuted:color-mix(in srgb,var(--btntext,#fff) 78%,var(--bp));--bpt:var(--btntext,#fff);--dline:color-mix(in srgb,var(--btntext,#fff) 30%,transparent);color:var(--btntext,#fff)}
& .da-hero .da-card,& .db-hero .db-form,& .da-hero .nc-float,& .db-hero .nc-float{--bink:var(--ink0);--bmuted:#6b6472;--bpt:var(--bp);--dline:#e4e1da;color:var(--ink0)}
& .da-hero .da-btn.pri,& .da-hero .da-go{background:var(--ink0)!important;border-color:var(--ink0)!important;color:#fff!important}& .da-hero .da-btn.sec{background:transparent;border-color:currentColor;color:inherit}
& .da-hero .da-card .da-go,& .db-hero .db-form .db-go{background:var(--bp)!important;border-color:var(--bp)!important;color:var(--btntext,#fff)!important}
${lkS('h1')}{font-weight:var(--lk-hw);text-transform:uppercase;letter-spacing:-.005em;line-height:.9}& .da-h1,& .db-h1{font-size:clamp(52px,7.4vw,124px)}& .dc-h1{font-size:clamp(48px,7vw,116px)}
${lkS('mark')}{background:none;color:var(--ba);-webkit-text-fill-color:currentColor;font-style:normal;padding:0}
& .da-hero .da-h1 mark,& .db-hero .db-h1 em{color:transparent;-webkit-text-fill-color:transparent;-webkit-text-stroke:2px currentColor;color:var(--btntext,#fff)}
${lkS('h2')}{font-weight:var(--lk-hw);text-transform:uppercase;letter-spacing:0;line-height:.95}& .da-h2,& .db-h2,& .dc-h2{font-size:clamp(40px,5.2vw,78px)}
${lkS('h3')}{font-family:var(--fbody);font-weight:800;letter-spacing:-.02em}& .da-card h2,& .db-form h2{font-family:var(--fhead);font-weight:var(--lk-hw);text-transform:uppercase;letter-spacing:0;font-size:30px}
${lkS('kick')}{display:inline-flex;font:800 12px/1 var(--fbody);letter-spacing:.14em;text-transform:uppercase;background:var(--ba);color:${o.onBa};border:0;border-radius:0;padding:8px 12px}& .da-eyebrow .dot{display:none}
${lkS('btn')}{border-radius:0!important;box-shadow:none!important;font-family:var(--fhead);font-weight:var(--lk-hw);text-transform:uppercase;letter-spacing:.03em;font-size:19px}
${lkS('card')}{border-radius:0!important;box-shadow:none!important;border:0!important;background:#fff!important}
& .da-plan,& .da-ben,& .db-rev,& .dc-tile{border-top:6px solid var(--bink)!important;background:color-mix(in srgb,var(--bink) 3%,#fff)!important}& .da-plan.best{border-top-color:var(--bp)!important;background:color-mix(in srgb,var(--bp) 8%,#fff)!important}
& .da-card,& .db-form{box-shadow:0 30px 60px -30px rgba(0,0,0,.55)!important}
${lkS('input')}{border-radius:0!important;border:2px solid var(--ink0)!important}
${lkS('num')}{font-family:var(--fhead);font-weight:var(--lk-hw)!important;letter-spacing:0}
& .da-price .p{font-size:clamp(64px,7vw,110px)}& .da-plan .pp{font-size:56px}
& .da-checks li:before{color:var(--ba)}& .da-ben .ic{color:var(--bpt)}
& .da-trust{background:var(--bink)!important;border:0}& .da-trust .it{color:rgba(255,255,255,.7)}& .da-trust .it b{color:var(--ba);font-family:var(--fhead);font-weight:400;font-size:28px;letter-spacing:.02em;text-transform:uppercase}
& .dx-bigt{text-transform:uppercase;letter-spacing:0;line-height:.95}& .db-hero .db-h1{font-size:clamp(44px,5vw,84px)}
& .da-hero .db-quote,& .db-hero .db-quote,& .db-hero .db-rev{background:color-mix(in srgb,#000 14%,transparent)!important;border-color:currentColor!important;color:inherit}
& .db-step .n{font:400 64px/1 var(--fhead);color:var(--bp)}
${LKX.allR}{border-radius:0!important}
& .nc-vis{transform:rotate(2deg);box-shadow:var(--mksh)}& .nc-vis.is-photo>img{filter:contrast(1.1) saturate(1.05)}& .nc-vis.is-mock::before{display:none}
& .nc-stk{display:grid;place-content:center;text-align:center;position:absolute;z-index:3;top:-26px;left:-20px;width:128px;height:128px;border-radius:50%;background:var(--ba);color:${o.onBa};transform:rotate(-10deg);padding:12px}& .nc-stk b{font:400 30px/1 var(--fhead);text-transform:uppercase;overflow-wrap:anywhere}& .nc-stk small{font:700 10px/1.2 var(--fbody);text-transform:uppercase}
& .nc-float{border-radius:0;box-shadow:none}& .nc-float .nci{border-radius:0}
@media (max-width:575px){& .da-h1,& .db-h1,& .dc-h1{font-size:clamp(44px,13vw,64px)}& .da-h2,& .db-h2,& .dc-h2{font-size:clamp(34px,10vw,48px)}& .nc-stk{width:92px;height:92px;left:4px;top:-14px}& .nc-stk b{font-size:20px}}`,

/* ===== SEÑALÉTICA ===== */
senal:o=>`
&{--lkp:#F4F4F1;--dline:color-mix(in srgb,var(--bink) 20%,#F4F4F1);--lkstripe:repeating-linear-gradient(-45deg,var(--ba) 0 16px,var(--ink0) 16px 32px);--visr:18px;--mkr:14px;--mkb:4px solid var(--ink0);--mksh:none;--visbg:#fff;--visdeco:transparent;background:var(--lkp)}
${lkS('hero')},${lkS('sec')},${lkS('nav')},& .db-ctab{background:var(--lkp)!important}& .da-sec.soft,& .db-sec.soft{background:#fff!important}
${lkS('nav')}{border-bottom:0;position:relative}${lkS('nav','::after')}{content:"";position:absolute;left:0;right:0;bottom:0;height:8px;background:var(--lkstripe)}
${lkS('h1')}{font-weight:var(--lk-hw);text-transform:uppercase;letter-spacing:-.01em;line-height:.98}& .da-h1,& .db-h1{font-size:clamp(46px,6.2vw,100px)}
${lkS('mark')}{background:linear-gradient(transparent 8%,var(--ba) 8% 96%,transparent 96%);color:${o.onBa};-webkit-text-fill-color:currentColor;font-style:normal;padding:0 .12em;border-radius:6px;-webkit-box-decoration-break:clone;box-decoration-break:clone}
${lkS('h2')}{font-weight:var(--lk-hw);text-transform:uppercase;letter-spacing:-.005em;line-height:.95}& .da-h2,& .db-h2,& .dc-h2{font-size:clamp(38px,4.6vw,66px)}
${lkS('h3')}{font-family:var(--fhead);font-weight:700;text-transform:uppercase;letter-spacing:.01em}
${lkS('kick')}{display:inline-flex;align-items:center;gap:8px;font:700 14px/1 var(--fhead);letter-spacing:.08em;text-transform:uppercase;background:var(--bp);color:var(--btntext,#fff);border:0;border-radius:7px;padding:8px 14px;box-shadow:inset 0 0 0 2px var(--bp),inset 0 0 0 4px var(--btntext,#fff)}
${lkS('kick','::after')}{content:"→";font-size:17px}& .da-eyebrow .dot{display:none}
${lkS('btn')}{border-radius:10px!important;box-shadow:none!important;font-family:var(--fhead);font-weight:800;text-transform:uppercase;letter-spacing:.04em;font-size:18px}
& .da-btn.sec{background:#fff;border-width:3px}
${lkS('card')}{border-radius:14px!important;box-shadow:none!important;border:3px solid var(--bink)!important;background:#fff!important}
& .da-card,& .db-form{border-width:4px!important;position:relative;overflow:hidden;padding-top:40px!important}
& .da-card::before,& .db-form::before{content:"";position:absolute;left:0;right:0;top:0;height:12px;background:var(--lkstripe)}
${lkS('input')}{border-radius:8px!important;border:2px solid var(--bink)!important;font-weight:600}
${lkS('num')}{font-family:var(--fhead);font-weight:800!important;letter-spacing:-.01em}
& .da-price .p{font-size:clamp(56px,6vw,92px)}
& .da-checks li:before{color:var(--bpt)}
& .da-ben .ic,& .dx-ic{display:inline-grid;place-items:center;width:52px;height:52px;border-radius:50%;border:5px solid var(--bp);background:#fff;color:var(--ink0);padding:9px}
& .da-trust{background:var(--bink)!important;border:0;position:relative}& .da-trust::after{content:"";position:absolute;left:0;right:0;bottom:0;height:6px;background:var(--lkstripe)}& .da-trust .it{color:rgba(255,255,255,.72)}& .da-trust .it b{color:var(--ba);font-family:var(--fhead);font-size:26px;text-transform:uppercase}
& .db-step .n{display:grid;place-items:center;width:50px;height:50px;border-radius:8px;background:var(--ba);color:${o.onBa};transform:rotate(45deg);font:800 22px/1 var(--fhead)}& .db-step .n>*{transform:rotate(-45deg)}
${LKX.allR}{border-radius:10px!important}
& .nc-vis{border:4px solid var(--bink);box-shadow:none}& .nc-vis.is-photo>img{filter:contrast(1.08)}& .nc-vis.is-mock::before{display:none}
& .nc-stk{display:grid;place-content:center;text-align:center;position:absolute;z-index:3;top:-22px;right:-12px;width:120px;height:120px;border-radius:50%;background:#fff;color:var(--ink0);border:10px solid #d62828;padding:8px}& .nc-stk b{font:800 26px/1 var(--fhead);overflow-wrap:anywhere}& .nc-stk small{font:700 10px/1.1 var(--fhead);text-transform:uppercase}
& .nc-float{border-radius:10px;box-shadow:none;border:3px solid var(--bink)}& .nc-float .nci{border-radius:50%;background:var(--ba);color:${o.onBa}}
@media (max-width:575px){& .da-h1,& .db-h1{font-size:clamp(42px,12.5vw,60px)}& .nc-stk{width:92px;height:92px;border-width:8px;right:2px;top:-14px}& .nc-stk b{font-size:19px}}`,

/* ===== PLANO TÉCNICO ===== */
plano:o=>`
&{--lkp:#F4F6F8;--lkl:color-mix(in srgb,var(--bp) 9%,transparent);--lkL:color-mix(in srgb,var(--bp) 16%,transparent);--dline:color-mix(in srgb,var(--bp) 30%,#fff);--visr:0;--mkr:0;--mkb:1px solid var(--bp);--mksh:none;--visbg:#fff;--visdeco:transparent;background:var(--lkp)}
${lkS('hero')},${lkS('sec')},${lkS('nav')},& .db-ctab{background-color:var(--lkp)!important}
${lkS('hero')},& .da-sec.soft,& .db-sec.soft{background-image:linear-gradient(var(--lkL) 1px,transparent 1px),linear-gradient(90deg,var(--lkL) 1px,transparent 1px),linear-gradient(var(--lkl) 1px,transparent 1px),linear-gradient(90deg,var(--lkl) 1px,transparent 1px)!important;background-size:80px 80px,80px 80px,16px 16px,16px 16px!important}
${lkS('nav')}{border-bottom:1px solid var(--bp)}& .da-sec,& .db-sec,& .dc-sec{border-top:1px dashed var(--dline)}
${lkS('h1')}{font-weight:var(--lk-hw);letter-spacing:-.025em;line-height:1}& .da-h1,& .db-h1{font-size:clamp(40px,5.4vw,82px)}
${lkS('mark')}{background:none;color:var(--bpt);-webkit-text-fill-color:currentColor;font-style:normal;padding:0;text-decoration:underline 2px;text-underline-offset:.14em}
${lkS('h2')},${lkS('h3')}{font-weight:var(--lk-hw);letter-spacing:-.02em}
${lkS('kick')}{display:inline-flex;align-items:center;gap:10px;font:500 12px/1 var(--fmono);letter-spacing:.06em;text-transform:uppercase;color:var(--bpt);background:#fff;border:1px solid var(--bp);border-radius:0;padding:6px 10px}
${lkS('kick','::before')}{content:"";width:9px;height:9px;border:1px solid currentColor;transform:rotate(45deg)}& .da-eyebrow .dot{display:none}
& .da-sec .da-h2::after,& .db-sec .db-h2::after,& .dc-sec .dc-h2::after{content:"";display:block;margin-top:14px;width:min(220px,60%);height:9px;border-left:1px solid var(--bp);border-right:1px solid var(--bp);background:linear-gradient(var(--bp),var(--bp)) center/100% 1px no-repeat}
& .text-center .da-h2::after,& .text-center .db-h2::after{margin-left:auto;margin-right:auto}
${lkS('btn')}{border-radius:2px!important;box-shadow:none!important;font-family:var(--fmono);font-weight:500;text-transform:uppercase;letter-spacing:.04em;font-size:14px}
& .da-btn.sec{background:#fff;border:1px dashed var(--bp)!important;color:var(--bpt)}
${lkS('card')}{border-radius:0!important;box-shadow:none!important;border:1px solid var(--dline)!important;background-color:#fff!important;${LKX.corners('var(--bp)')}}
${lkS('input')}{border-radius:0!important;border:1px solid var(--dline)!important;border-bottom:2px solid var(--bp)!important;background:#fff;font-family:var(--fmono)}
${lkS('num')}{font-weight:700!important;letter-spacing:-.03em}
& .da-price{position:relative;padding:10px 0 10px 18px;border-left:1px solid var(--bp)}& .da-price::before{content:"";position:absolute;left:-5px;top:0;width:9px;height:1px;background:var(--bp);box-shadow:0 calc(100% + 0px) 0 var(--bp)}
& .da-checks li:before{color:var(--bpt)}& .da-ben .ic{color:var(--bpt)}& .da-ben{position:relative}
& .da-trust{background:#fff!important;border-color:var(--dline)}& .da-trust .it b{font-family:var(--fmono);font-weight:500;font-size:clamp(22px,2.3vw,32px);letter-spacing:-.04em}
& .db-step .n{font:500 13px/1 var(--fmono);letter-spacing:.06em;color:var(--bpt)}
& .db-quote{background:#fff;border:1px solid var(--dline);border-left:3px solid var(--bp);border-radius:0}
${LKX.allR}{border-radius:0!important}
& .nc-vis{border:1px solid var(--bp);box-shadow:none;overflow:visible}& .nc-vis>img{display:block}& .nc-vis.is-photo>img{filter:grayscale(1) contrast(1.05)}
& .nc-vis.is-photo::after{content:"";position:absolute;inset:0;background:var(--bp);mix-blend-mode:screen;opacity:.35}& .nc-vis.is-mock::before{display:none}& .mk-sheet{transform:none!important}
& .nc-vis-wrap{padding:26px 0 0 26px}
& .nc-vis-wrap::before{content:"";position:absolute;top:6px;left:26px;right:0;height:9px;border-left:1px solid var(--bp);border-right:1px solid var(--bp);background:linear-gradient(var(--bp),var(--bp)) center/100% 1px no-repeat}
& .nc-vis-wrap::after{content:"";position:absolute;left:6px;top:26px;bottom:0;width:9px;border-top:1px solid var(--bp);border-bottom:1px solid var(--bp);background:linear-gradient(var(--bp),var(--bp)) center/1px 100% no-repeat}
& .nc-float{border-radius:0;box-shadow:none;border:1px solid var(--bp)}& .nc-float .nci{border-radius:0;background:none}& .nc-float b{font-family:var(--fmono);font-weight:500}
@media (max-width:575px){& .nc-vis-wrap{padding:18px 0 0 18px}& .nc-vis-wrap::before{left:18px;top:2px}& .nc-vis-wrap::after{top:18px;left:2px}}`,

/* ===== RISOGRAFÍA ===== */
riso:o=>`
&{--lkp:#F5F1E8;--lk2:var(--ba);--dline:color-mix(in srgb,var(--bp) 25%,#F5F1E8);--visr:6px;--mkr:6px;--mkb:0;--mksh:6px 6px 0 color-mix(in srgb,var(--lk2) 70%,transparent);--visbg:color-mix(in srgb,var(--bp) 16%,#F5F1E8);--visdeco:transparent;background:var(--lkp)}
${lkS('hero')},${lkS('sec')},${lkS('nav')},& .db-ctab{background-color:var(--lkp)!important}& .da-sec.soft,& .db-sec.soft{background-color:color-mix(in srgb,var(--bp) 7%,var(--lkp))!important}
${lkS('h1')}{font-weight:var(--lk-hw);letter-spacing:-.04em;line-height:.96;color:var(--bpt);text-shadow:4px 3px 0 color-mix(in srgb,var(--lk2) 75%,transparent)}& .da-h1,& .db-h1{font-size:clamp(42px,5.8vw,90px)}
${lkS('mark')}{background:linear-gradient(transparent 16%,color-mix(in srgb,var(--lk2) 85%,transparent) 16% 90%,transparent 90%);color:var(--bpt);-webkit-text-fill-color:currentColor;font-style:normal;padding:0 .1em;text-shadow:none;-webkit-box-decoration-break:clone;box-decoration-break:clone;mix-blend-mode:multiply}
& .da-ctab h2,& .db-ctabox h2,& .da-trust h2{color:#fff!important;text-shadow:3px 2px 0 color-mix(in srgb,var(--bp) 80%,transparent)}
${lkS('h2')}{font-weight:var(--lk-hw);letter-spacing:-.035em;color:var(--bpt);text-shadow:3px 2px 0 color-mix(in srgb,var(--lk2) 60%,transparent)}${lkS('h3')}{font-weight:800;letter-spacing:-.02em}
${lkS('kick')}{display:inline-flex;font:700 12px/1 var(--fmono,var(--fbody));letter-spacing:.04em;text-transform:uppercase;color:var(--bpt);background:none;border:2px solid currentColor;border-radius:99px;padding:6px 13px;transform:rotate(-2deg);box-shadow:3px 2px 0 color-mix(in srgb,var(--lk2) 70%,transparent)}& .da-eyebrow .dot{display:none}
${lkS('btn')}{border-radius:8px!important;box-shadow:4px 4px 0 var(--lk2)!important;font-weight:800}
${lkS('btn',':hover')}{box-shadow:1px 1px 0 var(--lk2)!important;transform:translate(3px,3px)}
& .da-btn.sec{background:transparent;border-width:2px}
${lkS('card')}{border-radius:8px!important;border:0!important;box-shadow:none!important;background:color-mix(in srgb,var(--bp) 9%,#fff)!important}
& .da-card,& .db-form{background:#fff!important;box-shadow:8px 8px 0 color-mix(in srgb,var(--lk2) 65%,transparent)!important;outline:2px solid var(--bp);outline-offset:-2px}
& .row>div:nth-child(even) .da-ben,& .row>div:nth-child(even) .db-rev{background:color-mix(in srgb,var(--lk2) 18%,#fff)!important}
${lkS('input')}{border-radius:6px!important;border:2px solid color-mix(in srgb,var(--bp) 45%,transparent)!important;background:#fff}
${lkS('num')}{font-weight:900!important;letter-spacing:-.04em;color:var(--bpt)}
& .da-checks li:before{color:var(--bpt)}& .da-ben .ic{color:var(--bpt)}
& .da-trust{background:var(--bp)!important;border:0}& .da-trust .it{color:color-mix(in srgb,var(--btntext,#fff) 80%,transparent)}& .da-trust .it b{color:var(--btntext,#fff);text-shadow:2px 2px 0 color-mix(in srgb,var(--lk2) 80%,transparent)}
& .db-step .n{font:900 34px/1 var(--fhead);color:var(--lk2);text-shadow:2px 2px 0 var(--bp)}
${LKX.allR}{border-radius:8px!important}
& .nc-vis{box-shadow:var(--mksh)}& .nc-vis.is-photo>img{filter:grayscale(1) contrast(1.25)}& .nc-vis.is-mock::before{display:none}
& .nc-vis.is-photo::after{content:"";position:absolute;inset:0;background:var(--bp);mix-blend-mode:screen;opacity:.85}
& .nc-vis.is-photo::before{content:"";position:absolute;inset:0;z-index:1;background-image:radial-gradient(color-mix(in srgb,var(--lk2) 80%,transparent) 1.2px,transparent 1.6px);background-size:6px 6px;transform:translate(5px,4px);mix-blend-mode:multiply;pointer-events:none}
& .nc-stk{display:grid;place-content:center;text-align:center;position:absolute;z-index:3;top:-20px;right:-10px;width:118px;height:118px;border-radius:50%;background:var(--lk2);color:var(--ink0);transform:rotate(9deg);padding:12px;box-shadow:-4px -3px 0 color-mix(in srgb,var(--bp) 60%,transparent)}& .nc-stk b{font:900 24px/1 var(--fhead);letter-spacing:-.03em;overflow-wrap:anywhere}& .nc-stk small{font:700 10px/1.2 var(--fmono,var(--fbody));text-transform:uppercase}
& .nc-float{border-radius:8px;box-shadow:4px 4px 0 var(--lk2)}& .nc-float .nci{border-radius:50%}
@media (max-width:991px){& .nc-stk{width:92px;height:92px;right:4px;top:-14px}& .nc-stk b{font-size:18px}}`,

/* ===== TICKET DE CAJA ===== */
ticket:o=>`
&{--lkp:#E9E8E3;--dline:color-mix(in srgb,var(--bink) 30%,#fff);--lkdash:repeating-linear-gradient(90deg,var(--bink) 0 6px,transparent 6px 11px);--visr:0;--mkr:0;--mkb:0;--mksh:0 18px 30px -18px rgba(0,0,0,.45);--visbg:#fff;--visdeco:transparent;background:var(--lkp)}
${lkS('hero')},${lkS('nav')},& .db-ctab,& .da-sec.soft,& .db-sec.soft{background:var(--lkp)!important}& .da-sec:not(.soft),& .db-sec:not(.soft),& .dc-sec{background:#F6F5F1!important}
${lkS('nav')}{border-bottom:0!important;box-shadow:none}${lkS('nav','::after')}{content:"";position:absolute;left:0;right:0;bottom:0;height:1px;background:var(--lkdash)}& .da-nav,& .db-nav{position:relative}
${lkS('h1')}{font-weight:var(--lk-hw);text-transform:uppercase;letter-spacing:-.035em;line-height:1.16}& .da-h1,& .db-h1{font-size:clamp(34px,4.2vw,62px)}
${lkS('mark')}{background:linear-gradient(transparent 7%,var(--bink) 7% 97%,transparent 97%);color:var(--lkp);-webkit-text-fill-color:currentColor;font-style:normal;padding:0 .14em;-webkit-box-decoration-break:clone;box-decoration-break:clone}
${lkS('h2')}{font-weight:var(--lk-hw);text-transform:uppercase;letter-spacing:-.04em}${lkS('h3')}{font-family:var(--fmono);font-weight:700;text-transform:uppercase;letter-spacing:-.02em}
${lkS('kick')}{display:inline-flex;font:700 12.5px/1 var(--fmono);letter-spacing:.02em;text-transform:uppercase;color:var(--bink);background:none;border:0;border-radius:0;padding:0}
${lkS('kick','::before')}{content:"*** ";white-space:pre}${lkS('kick','::after')}{content:" ***";white-space:pre}& .da-eyebrow .dot{display:none}
${lkS('btn')}{border-radius:0!important;box-shadow:none!important;font-family:var(--fmono);font-weight:700;text-transform:uppercase;letter-spacing:.02em}
& .da-btn.sec{background:#fff;border:1px dashed var(--bink)!important}
${lkS('card')}{border-radius:0!important;box-shadow:var(--mksh)!important;border:0!important;background:#fff!important}
& .da-card,& .db-form,& .da-plan{${LKX.zig(14)};padding-top:36px!important;padding-bottom:36px!important;filter:drop-shadow(0 14px 18px rgba(0,0,0,.18));box-shadow:none!important}
& .da-card h2,& .db-form h2,& .da-plan h3{font-family:var(--fmono);text-transform:uppercase;letter-spacing:-.02em;padding-bottom:12px;background:var(--lkdash) bottom/100% 1px no-repeat}
& .da-plan li,& .da-checks li{font-family:var(--fmono);font-size:14px}& .da-plan li{background:repeating-linear-gradient(90deg,var(--dline) 0 2px,transparent 2px 6px) bottom/100% 1px no-repeat;border:0!important}
${lkS('input')}{border-radius:0!important;border:0!important;border-bottom:1px dashed var(--bink)!important;background:#fff;font-family:var(--fmono)}
${lkS('num')}{font-family:var(--fmono);font-weight:700!important;letter-spacing:-.06em}
& .da-hero .da-price{background:#fff;padding:14px 18px;${LKX.zig(12)};filter:drop-shadow(0 8px 10px rgba(0,0,0,.16));width:fit-content}
& .da-hero .da-price::before{content:"TOTAL";display:block;width:100%;font:700 11px/1 var(--fmono);letter-spacing:.14em;color:var(--bmuted)}
& .da-checks li:before{content:"+";color:var(--bink);font-family:var(--fmono)}
& .da-ben .ic{color:var(--bink)}
& .da-trust{background:#fff!important;border:0;position:relative}& .da-trust::after{content:"";position:absolute;left:0;right:0;bottom:0;height:1px;background:var(--lkdash)}& .da-trust .it b{font-family:var(--fmono)}
& .da-foot::before,& .db-foot::before,& .dc-foot::before{content:"";display:block;height:34px;max-width:280px;margin:0 auto 18px;background:repeating-linear-gradient(90deg,currentColor 0 2px,transparent 2px 4px,currentColor 4px 7px,transparent 7px 8px,currentColor 8px 9px,transparent 9px 12px);opacity:.6}
& .db-step .n{font:700 14px/1 var(--fmono)}& .db-quote{background:#fff;border:1px dashed var(--bink);border-radius:0;font-family:var(--fmono);font-size:15px}
${LKX.allR}{border-radius:0!important}
& .nc-vis{box-shadow:var(--mksh);border:10px solid #fff}& .nc-vis.is-photo>img{filter:grayscale(1) contrast(1.15) brightness(1.05)}& .nc-vis.is-mock::before{display:none}& .mk-sheet{transform:none!important}
& .nc-float{border-radius:0;box-shadow:none;border:1px dashed var(--bink)}& .nc-float .nci{border-radius:0;background:none;color:var(--bink)}& .nc-float b{font-family:var(--fmono)}
@media (max-width:575px){& .da-h1,& .db-h1{font-size:clamp(30px,9.4vw,42px)}}`,

/* ===== AÑOS 70 ===== */
setentas:o=>`
&{--lkp:#F6EBDD;--lkm:#e8833a;--lky:#f2b33d;--lkstr:linear-gradient(var(--bp) 0 25%,var(--lkm) 25% 50%,var(--lky) 50% 75%,#f6d7a0 75%);--dline:color-mix(in srgb,var(--bink) 16%,#F6EBDD);--visr:999px 999px 24px 24px;--mkr:28px;--mkb:3px solid var(--ink0);--mksh:none;--visbg:color-mix(in srgb,var(--ba) 30%,#F6EBDD);--visdeco:transparent;background:var(--lkp)}
${lkS('hero')},${lkS('sec')},${lkS('nav')},& .db-ctab{background:var(--lkp)!important}& .da-sec.soft,& .db-sec.soft{background:color-mix(in srgb,var(--ba) 14%,#FBF3E8)!important}
${lkS('hero')}{position:relative;overflow:hidden;padding-bottom:max(80px,var(--nc-hpb,0px))!important}${lkS('hero','>.container')}{position:relative;z-index:1}
${lkS('hero','::after')}{content:"";position:absolute;left:0;right:0;bottom:0;height:40px;background:var(--lkstr)}
${lkS('h1')}{font-weight:var(--lk-hw);letter-spacing:-.035em;line-height:.95}& .da-h1,& .db-h1{font-size:clamp(44px,5.8vw,90px)}
${lkS('mark')}{background:none;color:var(--bpt);-webkit-text-fill-color:currentColor;font-style:italic;padding:0}
${lkS('h2')},${lkS('h3')}{font-weight:var(--lk-hw);letter-spacing:-.025em}& .da-h2 em,& .db-h2 em{color:var(--bpt)}
${lkS('kick')}{display:inline-flex;font:700 13px/1 var(--fbody);letter-spacing:.06em;text-transform:uppercase;background:var(--ba);color:${o.onBa};border:0;border-radius:99px;padding:8px 15px}& .da-eyebrow .dot{display:none}
${lkS('btn')}{border-radius:99px!important;font-weight:700;box-shadow:0 4px 0 var(--lky),0 8px 0 var(--lkm)!important;margin-bottom:8px}
${lkS('btn',':active')}{transform:translateY(3px);box-shadow:0 1px 0 var(--lky),0 3px 0 var(--lkm)!important}
& .da-btn.sec{border-width:3px;background:transparent}
${lkS('card')}{border-radius:28px!important;border:3px solid var(--bink)!important;box-shadow:none!important;background:#FFFBF4!important}
& .da-card,& .db-form{box-shadow:10px 10px 0 var(--bp)!important}
${lkS('input')}{border-radius:99px!important;border:2px solid var(--bink)!important;padding-left:20px!important;background:#fff}
${lkS('num')}{font-family:var(--fhead);font-weight:900!important;letter-spacing:-.03em}
& .da-checks li:before{color:var(--bpt)}& .da-ben .ic{color:var(--bpt)}
& .da-trust{background:var(--bink)!important;border:0}& .da-trust .it{color:rgba(255,255,255,.7)}& .da-trust .it b{color:var(--lky);font-family:var(--fhead);font-style:italic}
& .db-step .n{display:grid;place-items:center;width:48px;height:48px;border-radius:50%;background:var(--bp);color:var(--btntext,#fff);font:900 22px/1 var(--fhead)}
& .da-plan.best{box-shadow:8px 8px 0 var(--lkm)!important}
${LKX.allR}{border-radius:28px!important}& .da-sticky .da-btn,& .db-sticky a{border-radius:99px!important}
& .nc-vis{border:3px solid var(--bink);box-shadow:none;aspect-ratio:4/5}& .nc-vis.is-photo>img{filter:sepia(.25) saturate(1.1) contrast(1.02)}& .nc-vis.is-mock::before{display:none}
& .nc-vis-wrap::before{content:"";position:absolute;z-index:-1;left:-12%;right:-12%;top:-10%;aspect-ratio:1;background:radial-gradient(circle closest-side,transparent 0 70%,var(--lky) 70% 77%,transparent 77% 79%,var(--lkm) 79% 86%,transparent 86% 88%,var(--bp) 88% 95%,transparent 95%)}
& .nc-stk{display:grid;place-content:center;text-align:center;position:absolute;z-index:3;top:-16px;right:-6px;width:124px;height:124px;border-radius:50%;background:var(--ba);color:${o.onBa};border:3px solid var(--bink);transform:rotate(10deg);padding:14px}& .nc-stk b{font:900 24px/1 var(--fhead);font-style:italic;overflow-wrap:anywhere}& .nc-stk small{font:700 10px/1.2 var(--fbody);text-transform:uppercase}
& .nc-float{border-radius:99px;border:3px solid var(--bink);box-shadow:none}& .nc-float .nci{border-radius:50%}
@media (max-width:991px){${lkS('hero','::after')}{height:24px}& .nc-vis-wrap::before{display:none}& .nc-stk{width:94px;height:94px;right:2px}& .nc-stk b{font-size:18px}}`,

/* ===== CÓMIC POP ===== */
comic:o=>`
&{--lkp:#FFF8E7;--dline:var(--bink);--lkdot:radial-gradient(color-mix(in srgb,var(--bp) 30%,transparent) 2.2px,transparent 2.6px);--visr:22px;--mkr:18px;--mkb:3px solid var(--ink0);--mksh:6px 6px 0 var(--ink0);--visbg:color-mix(in srgb,var(--ba) 40%,#fff);--visdeco:transparent;background:var(--lkp)}
${lkS('hero')},${lkS('nav')},& .db-ctab{background-color:var(--lkp)!important;background-image:var(--lkdot)!important;background-size:14px 14px!important}
${lkS('sec')}{background-color:var(--lkp)!important}& .da-sec.soft,& .db-sec.soft{background-color:color-mix(in srgb,var(--ba) 28%,#fff)!important;background-image:var(--lkdot)!important;background-size:12px 12px!important}
${lkS('nav')}{border-bottom:3px solid var(--bink)}
${lkS('h1')}{font-weight:var(--lk-hw);font-style:italic;letter-spacing:-.03em;line-height:.95;text-shadow:4px 4px 0 var(--ba)}& .da-h1,& .db-h1{font-size:clamp(40px,5.6vw,86px)}
${lkS('mark')}{background:var(--bp);color:var(--btntext,#fff);-webkit-text-fill-color:currentColor;font-style:italic;padding:0 .14em;border:3px solid var(--bink);display:inline-block;transform:skew(-6deg) rotate(-1deg);text-shadow:none;box-shadow:5px 5px 0 var(--bink);line-height:1.02}
${lkS('h2')}{font-weight:var(--lk-hw);font-style:italic;letter-spacing:-.03em;text-shadow:3px 3px 0 var(--ba)}${lkS('h3')}{font-weight:800;letter-spacing:-.02em}
${lkS('kick')}{position:relative;display:inline-flex;font:800 14px/1.1 var(--fbody);letter-spacing:0;text-transform:none;background:#fff;color:var(--bink);border:3px solid var(--bink);border-radius:18px;padding:9px 16px;margin-bottom:14px}
${lkS('kick','::after')}{content:"";position:absolute;left:22px;bottom:-14px;width:18px;height:14px;background:#fff;border-left:3px solid var(--bink);border-bottom:3px solid var(--bink);clip-path:polygon(0 0,100% 0,0 100%);transform:skewX(-12deg)}& .da-eyebrow .dot{display:none}
${lkS('btn')}{border-radius:14px!important;border:3px solid var(--bink)!important;box-shadow:5px 5px 0 var(--bink)!important;font-weight:900;font-style:italic;text-transform:uppercase;letter-spacing:.01em}
${lkS('btn',':hover')}{transform:translate(2px,2px) rotate(-1deg);box-shadow:3px 3px 0 var(--bink)!important}
& .da-btn.sec{background:#fff}
${lkS('card')}{border-radius:18px!important;border:3px solid var(--bink)!important;box-shadow:6px 6px 0 var(--bink)!important;background:#fff!important}
& .row>div:nth-child(odd) .da-ben,& .row>div:nth-child(odd) .db-rev{transform:rotate(-1deg)}& .row>div:nth-child(even) .da-ben,& .row>div:nth-child(even) .db-rev{transform:rotate(1deg)}
& .db-rev{position:relative}& .db-rev::after{content:"";position:absolute;left:34px;bottom:-17px;width:22px;height:16px;background:#fff;border-left:3px solid var(--bink);border-bottom:3px solid var(--bink);clip-path:polygon(0 0,100% 0,0 100%)}
${lkS('input')}{border-radius:12px!important;border:3px solid var(--bink)!important;font-weight:600}
${lkS('num')}{font-weight:900!important;font-style:italic;letter-spacing:-.04em}
& .da-checks li:before{color:var(--bpt)}& .da-ben .ic{color:var(--bink);background:var(--ba);border:3px solid var(--bink);border-radius:50%;padding:7px}
& .da-trust{background:var(--bink)!important;background-image:none!important;border:0}& .da-trust .it{color:rgba(255,255,255,.72)}& .da-trust .it b{color:var(--ba);font-style:italic}
& .db-step .n{display:grid;place-items:center;width:52px;height:52px;background:var(--ba);color:${o.onBa};border:3px solid var(--bink);clip-path:${LKX.burst};font:900 20px/1 var(--fhead)}
& .da-plan.best{box-shadow:8px 8px 0 var(--bp)!important;transform:rotate(-1deg)}
${LKX.allR}{border-radius:14px!important}
& .nc-vis{border:3px solid var(--bink);box-shadow:8px 8px 0 var(--bink);transform:rotate(-1.5deg)}& .nc-vis.is-photo>img{filter:contrast(1.15) saturate(1.3)}& .nc-vis.is-mock::before{display:none}
& .nc-vis.is-photo::after{content:"";position:absolute;inset:0;background-image:radial-gradient(rgba(0,0,0,.28) 1.1px,transparent 1.5px);background-size:5px 5px;mix-blend-mode:multiply;pointer-events:none}
& .nc-stk{display:grid;place-content:center;text-align:center;position:absolute;z-index:3;top:-34px;right:-24px;width:150px;height:150px;background:var(--ba);color:${o.onBa};clip-path:${LKX.burst};transform:rotate(-8deg);padding:30px;filter:drop-shadow(4px 4px 0 var(--ink0))}& .nc-stk b{font:900 24px/1 var(--fhead);font-style:italic;overflow-wrap:anywhere}& .nc-stk small{font:800 10px/1.1 var(--fbody);text-transform:uppercase}
& .nc-float{border-radius:16px;border:3px solid var(--bink);box-shadow:4px 4px 0 var(--bink)}& .nc-float .nci{border-radius:50%;background:var(--ba);color:${o.onBa}}
@media (max-width:991px){& .nc-stk{width:112px;height:112px;right:-4px;top:-20px;padding:24px}& .nc-stk b{font-size:17px}}
@media (max-width:575px){& .da-h1,& .db-h1{font-size:clamp(36px,10.5vw,50px)}}`,

/* ===== TERMINAL ===== */
terminal:o=>`
&{--lkp:#0E1116;--lkc:#161B22;--lkb:#30363D;--bink:#E6EDF3;--bmuted:#9AA4AF;--bsoft:#161B22;--line:#30363D;--dline:#30363D;--bpt:color-mix(in srgb,var(--bp) 60%,#fff);--lkok:color-mix(in srgb,var(--ba) 70%,#7ee787);
  --bs-body-bg:#0E1116;--bs-body-color:#E6EDF3;--bs-border-color:#30363D;--bs-accordion-bg:#161B22;--bs-accordion-color:#E6EDF3;--bs-accordion-btn-color:#E6EDF3;--bs-accordion-active-bg:#1c232c;--bs-accordion-active-color:#E6EDF3;--bs-accordion-border-color:#30363D;--bs-accordion-btn-icon:none;--bs-accordion-btn-active-icon:none;
  --visr:8px;--mkr:8px;--mkb:1px solid #30363D;--mksh:none;--visbg:#161B22;--visdeco:transparent;background:var(--lkp);color:var(--bink)}
& #ncPop,& #ncContact,& #ncCookies,& .modal{--bink:var(--ink0);--bmuted:#6b6472;--bsoft:#f6f6f8;--line:#e5e3ea;--dline:#e5e3ea;--bpt:var(--bp);--bs-body-bg:#fff;--bs-body-color:var(--ink0);--bs-border-color:#dee2e6;color:var(--ink0)}
${lkS('hero')},${lkS('sec')},${lkS('nav')},& .db-ctab,& .da-top,& footer,& .da-footer,& .db-footer,& .dc-footer{background:var(--lkp)!important;color:var(--bink)}& .da-sec.soft,& .db-sec.soft{background:#0B0E12!important}
${lkS('hero')}{background-image:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px)!important;background-size:100% 4px!important}
${lkS('nav')}{border-bottom:1px solid var(--lkb)}& .da-sec,& .db-sec,& .dc-sec{border-top:1px solid var(--lkb)}
& .da-logo,& .db-logo,& .dc-logo{font-family:var(--fmono);color:var(--bink)}& .da-logo::before,& .db-logo::before{content:"~/";color:var(--lkok);margin-right:2px}
${lkS('h1')}{font-weight:var(--lk-hw);letter-spacing:-.045em;line-height:1.06;color:var(--bink)}& .da-h1,& .db-h1{font-size:clamp(34px,4.4vw,66px)}
& .da-h1::after,& .db-h1::after{content:"";display:inline-block;width:.5em;height:.9em;margin-left:.12em;vertical-align:-.08em;background:var(--bp)}
@media (prefers-reduced-motion:no-preference){& .da-h1::after,& .db-h1::after{animation:lkBlink 1.1s steps(1) infinite}@keyframes lkBlink{50%{opacity:0}}}
${lkS('mark')}{background:color-mix(in srgb,var(--bp) 26%,transparent);color:var(--bpt);-webkit-text-fill-color:currentColor;font-style:normal;padding:0 .1em;-webkit-box-decoration-break:clone;box-decoration-break:clone}
${lkS('h2')},${lkS('h3')}{font-weight:var(--lk-hw);letter-spacing:-.04em;color:var(--bink)}
& p,& li,& label,& small{color:inherit}& .da-sub,& .db-sub,& .text-muted,& .da-checks li{color:var(--bmuted)!important}
${lkS('kick')}{display:inline-flex;font:500 13px/1.2 var(--fmono);letter-spacing:0;text-transform:none;color:var(--lkok);background:none;border:0;border-radius:0;padding:0}${lkS('kick','::before')}{content:"$ ";white-space:pre;color:var(--bmuted)}& .da-eyebrow .dot{display:none}
${lkS('btn')}{border-radius:6px!important;box-shadow:none!important;font-family:var(--fmono);font-weight:600;font-size:15px}
& .da-btn.sec,& .da-call{background:transparent!important;border:1px solid var(--lkb)!important;color:var(--bink)!important}
${lkS('card')}{border-radius:8px!important;box-shadow:none!important;border:1px solid var(--lkb)!important;background:var(--lkc)!important;color:var(--bink)}
& .da-card,& .db-form{position:relative;padding-top:52px!important;box-shadow:0 30px 60px -30px rgba(0,0,0,.8)!important}
& .da-card::before,& .db-form::before{content:"● ● ●   solicitud.sh";position:absolute;left:0;right:0;top:0;padding:10px 14px;font:500 12px/1 var(--fmono);letter-spacing:.02em;color:var(--bmuted);border-bottom:1px solid var(--lkb);background:#1c232c;border-radius:8px 8px 0 0;white-space:pre}
${lkS('input')},& .form-select{border-radius:6px!important;border:1px solid var(--lkb)!important;background:var(--lkp)!important;color:var(--bink)!important;font-family:var(--fmono)}& .form-control::placeholder{color:#6e7681}
& .form-check-input{background-color:var(--lkp);border-color:var(--lkb)}& a{color:var(--bpt)}
${lkS('num')}{font-family:var(--fmono);font-weight:600!important;letter-spacing:-.05em;color:var(--bink)}
& .da-price .u,& .da-price .u b{color:var(--bmuted)}
& .da-checks li:before{content:"✓";color:var(--lkok)}& .da-ben .ic{color:var(--lkok)}
& .da-trust{background:var(--lkc)!important;border-color:var(--lkb)!important}& .da-trust .it{color:var(--bmuted)}& .da-trust .it b{color:var(--bink);font-family:var(--fmono)}
& .accordion-button::after{content:"+";background:none;font:500 18px/1 var(--fmono);color:var(--bmuted);width:auto;height:auto;transform:none}& .accordion-button:not(.collapsed)::after{content:"−"}& .accordion-button{color:var(--bink);background:var(--lkc)}& .accordion-body{color:var(--bmuted)}
& .db-step .n{font:500 13px/1 var(--fmono);color:var(--lkok)}& .db-step{border-color:var(--lkb)!important}
& .db-quote,& .db-rev blockquote{font-family:var(--fmono);font-size:14.5px}& .db-quote{background:var(--lkc);border:1px solid var(--lkb);border-left:3px solid var(--bp);color:var(--bink)}
& .db-opt{background:var(--lkp)!important;border:1px solid var(--lkb)!important;color:var(--bink)!important}& .db-opt.on,& .db-opt:hover{border-color:var(--bp)!important}
& table,& .table{--bs-table-bg:transparent;--bs-table-color:var(--bink);color:var(--bink)}& th,& td{border-color:var(--lkb)!important}
& .dx-ph,& [class*="dx-"] .card,& .dx-letter,& .dx-art{background:var(--lkc)}
${LKX.allR}{border-radius:8px!important}
& .nc-vis{border:1px solid var(--lkb);box-shadow:none;padding-top:30px;background:var(--lkc)}& .nc-vis::after{content:"● ● ●";position:absolute;left:0;right:0;top:0;height:30px;padding:8px 12px;font:12px/1 var(--fmono);color:var(--bmuted);border-bottom:1px solid var(--lkb);background:#1c232c}
& .nc-vis.is-photo>img{filter:grayscale(.6) contrast(1.1) brightness(.85)}& .nc-vis.is-mock::before{display:none}
& .mk-sheet{background:#fff;color:var(--ink0)}& .mk-sheet *{--bink:var(--ink0);--bmuted:#6b6472}
& .nc-float{border-radius:8px;box-shadow:none;border:1px solid var(--lkb);background:var(--lkc);color:var(--bink)}& .nc-float small{color:var(--bmuted)}& .nc-float .nci{border-radius:6px;background:#1c232c;color:var(--lkok)}& .nc-float b{font-family:var(--fmono);font-weight:600}
& .da-sticky,& .db-sticky,& .dc-sticky{background:var(--lkc)!important;border-top:1px solid var(--lkb)}
& .da-tick,& .da-ctab,& .da-foot,& .db-foot,& .dc-foot,& .db-ctabox,& .dc-cta,& .dx-cd{background:var(--lkc)!important;color:var(--bink)!important;border:1px solid var(--lkb)}& .da-ctab p,& .db-ctabox p{color:var(--bmuted)!important}
& .da-go.alt,& .db-go{background:var(--bp)!important;color:var(--btntext,#fff)!important}
& thead,& thead th,& .db-compare .hd,& .da-tbl th{background:#1c232c!important;color:var(--bmuted)!important}& tbody tr,& tbody td{background:transparent!important}
& .nc-ann .t{color:var(--lkok)}
& .dx-ptab,& .dx-guar,& .dx-cities li{background:var(--lkc)!important;color:var(--bink)!important;border-color:var(--lkb)!important}& .dx-ptab .col.best{background:#1c232c!important}& .dx-ptab .col{border-color:var(--lkb)!important}& .dx-ptab ul.f li{border-color:var(--lkb)}
@media (max-width:575px){& .da-h1,& .db-h1{font-size:clamp(30px,8.8vw,40px)}}`
});

/* Familia C: las piezas oscuras (tile .d y KPIs del hero) conservan su fondo propio en todos los estilos nuevos */
["revista","expediente","bauhaus","cartel","senal","plano","riso","ticket","setentas","comic"].forEach(k=>{const f=LOOK_CSS[k];LOOK_CSS[k]=o=>f(o)+`
& .dc-tile.d{background:var(--dk)!important;color:#fff;-webkit-mask:none;mask:none}& .dc-tile.d h3,& .dc-tile.d p,& .dc-tile.d .big{color:inherit}
& .dc-kpi{background:var(--gl)!important;border:1px solid var(--gb)!important;box-shadow:none!important;transform:none!important;-webkit-mask:none;mask:none;filter:none}`;});

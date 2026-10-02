/* ---------- ESTILOS · TENDENCIAS 2026 (v4.6) ----------
   Basados en lo que de verdad ha aguantado en 2026 (studiomeyer.io «reality check», fireart.studio):
   · Ácido       — «chromatic extremes»: carbón casi negro + un único color ácido (el acento de la marca), filetes de 1 px,
                   esquinas a 0 con botones píldora y grano de película CSS. Oscuro y legible.
   · Tipográfico — «la tipografía es la arquitectura»: neo-serif enorme a sangre, etiquetas en monoespaciada, filetes finos.
   · Crudo       — «anti-grid brutalism»: titulares en monoespaciada, texto en serif, enlaces subrayados, márgenes asimétricos.
   Mismo contrato que looks.js ("&" = body.lk-<estilo>, colores de la marca). */
Object.assign(LOOKS,{
  acido:{cat:"Tendencias 2026",name:"Ácido",desc:"Carbón casi negro y un único color ácido (el acento de tu marca), filetes de 1 px, esquinas rectas y grano.",best:"Telco joven, gaming, promos, B2B tech",head:"Space Grotesk",body:"Inter",mono:"JetBrains Mono",hw:700,mh:1.0,sample:["#0b0b0c","var(--ba)","#f2f2f2"]},
  tipografico:{cat:"Tendencias 2026",name:"Tipográfico",desc:"La letra es la imagen: neo-serif enorme, etiquetas en monoespaciada y filetes finos sobre papel cálido.",best:"Seguros, energía, legal, marcas con historia",head:"Instrument Serif",body:"Inter",mono:"JetBrains Mono",hw:400,hwBrand:700,mh:1.12,sample:["#f6f4ef","#111111","var(--bp)"]},
  crudo:{cat:"Tendencias 2026",name:"Crudo",desc:"Anti-plantilla: titulares en monoespaciada, texto en serif, enlaces subrayados y composición asimétrica.",best:"Legal, B2B, marcas honestas, lanzamientos",head:"IBM Plex Mono",body:"Tinos",mono:"IBM Plex Mono",hw:600,hwBrand:700,mh:.9,sample:["#ffffff","#000000","var(--bp)"]}
});
Object.assign(FONT_AXES,{"Tinos":"ital,wght@0,400;0,700;1,400","IBM Plex Mono":"wght@400;500;600;700"});if(!FONTS.includes("Tinos"))FONTS.push("Tinos");NC_SERIF_LOOK.push("Tinos");
LOOK_ORDER.push("acido","tipografico","crudo");if(!LOOK_CATS.includes("Tendencias 2026"))LOOK_CATS.push("Tendencias 2026");
Object.assign(NC_VOICE_BY_LOOK,{acido:"cercano",tipografico:"neutral",crudo:"neutral"});
Object.assign(V4_AUTO_VAR.trust,{acido:"ticker",tipografico:"big",crudo:"row"});Object.assign(V4_AUTO_VAR.ben,{tipografico:"num",crudo:"rows",acido:"cards"});
document.addEventListener("DOMContentLoaded",()=>{if(typeof FX_BY_LOOK!=="undefined")Object.assign(FX_BY_LOOK,{acido:"left",tipografico:"curtain",crudo:"fade"});});
if(typeof NC_LOOK_CLEAN!=="undefined")NC_LOOK_CLEAN.push("acido","crudo");
const LKW_GRAIN=`url("data:image/svg+xml,${encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .55 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>")}")`;
Object.assign(LOOK_CSS,{
/* ===== ÁCIDO (base oscura de Nocturno + filetes, esquinas rectas, acento ácido y grano) ===== */
acido:o=>LOOK_CSS.nocturno(o)+`
&{--lkp:#0b0b0c;--lkc:#121214;--lkb:rgba(255,255,255,.14);--acid:color-mix(in srgb,var(--ba) 88%,#fff);--bpt:var(--acid);--visr:0px;--mkr:0px}
&::before{content:"";position:fixed;inset:0;pointer-events:none;z-index:9998;background-image:${LKW_GRAIN};opacity:.07;mix-blend-mode:overlay}
${lkS('hero')},& .dx-prod{background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px)!important;background-size:100% 56px!important}
${lkS('h1')}{background:none!important;-webkit-text-fill-color:currentColor!important;color:var(--bink)!important;letter-spacing:-.05em;text-transform:none}
${lkS('mark')},& .dx-prod-h mark{background:none!important;-webkit-text-fill-color:currentColor!important;color:var(--acid)!important}
${lkS('kick')},& .dx-prod-k{border-radius:0;border:1px solid var(--acid);color:var(--acid);background:transparent;font-family:var(--fmono);text-transform:uppercase;letter-spacing:.08em;font-size:12px}
${lkS('btn')},& .dx-pill{border-radius:999px!important}
& .da-btn.pri,& .da-go,& .dx-pill{background:var(--acid)!important;color:#0b0b0c!important;box-shadow:0 0 0 1px var(--acid),0 0 40px -8px color-mix(in srgb,var(--acid) 70%,transparent)!important}
${lkS('card')},& .dx-tile,& .dx-vt-c,& .dx-bnd-it{border-radius:0!important;border:1px solid var(--lkb)!important;background:var(--lkc)!important}
& .da-card,& .db-form{box-shadow:8px 8px 0 color-mix(in srgb,var(--acid) 85%,transparent)!important}
& .da-plan.best{border-color:var(--acid)!important;box-shadow:inset 0 3px 0 var(--acid)!important}& .da-plan .tag{background:var(--acid);color:#0b0b0c;border-radius:0}
${lkS('num')}{font-family:var(--fhead);color:var(--bink)}& .dx-tile.tn-brand{background:var(--bp)!important}& .dx-tile.tn-accent{background:var(--acid)!important;color:#0b0b0c}
& .da-checks li:before,& .da-plan li:before{color:var(--acid)}& .da-sec,& .db-sec,& .dc-sec{border-top:1px solid var(--lkb)}
& .accordion-item{border-radius:0!important}& .dx-fnd-f .op.on,& .nc-opts input:checked+span{background:var(--acid)!important;border-color:var(--acid)!important;color:#0b0b0c!important}
& .dx-fnd-f .op,& .dx-bk-d,& .dx-bk-s{background:var(--lkc);color:var(--bink);border-color:var(--lkb);border-radius:0}& .dx-bk-d[aria-pressed="true"],& .dx-bk-s[aria-pressed="true"]{box-shadow:0 0 0 2px var(--acid) inset;background:var(--lkc)}
& .dx-bnd-it input:checked~.bx{background:var(--acid);border-color:var(--acid)}& .dx-bnd-it input:checked~.bx::after{border-color:#0b0b0c}`,
/* ===== TIPOGRÁFICO ===== */
tipografico:o=>`
&{--lkp:#f6f4ef;--dline:color-mix(in srgb,var(--bink) 22%,#f6f4ef);--visr:2px;--mkr:2px;--mkb:1px solid var(--bink);--mksh:none;--visbg:#ece8df;--visdeco:transparent;background:var(--lkp)}
${lkS('hero')},${lkS('sec')},${lkS('nav')},& .dx-prod,& .dx-stats,& .dx-tiles-s{background:var(--lkp)!important;background-image:none!important}& .da-sec.soft,& .db-sec.soft{background:#efece4!important}
${lkS('nav')}{border-bottom:1px solid var(--bink)!important}& .da-sec,& .db-sec{border-top:1px solid var(--bink)}
${lkS('h1')},& .dx-prod-h{font-weight:var(--lk-hw)!important;font-size:clamp(52px,8.6vw,132px)!important;line-height:.92!important;letter-spacing:-.025em!important}
${lkS('h2')}{font-weight:var(--lk-hw);font-size:clamp(38px,5.4vw,76px)!important;line-height:.98;letter-spacing:-.02em}${lkS('h3')}{font-family:var(--fbody)!important;font-weight:700;letter-spacing:-.01em}
${lkS('mark')},& .dx-prod-h mark{background:none!important;-webkit-text-fill-color:currentColor!important;color:var(--bpt)!important;font-style:italic;padding:0}
${lkS('kick')},& .dx-prod-k,& .da-plan .tag,& .dx-tiles-s .da-eyebrow{font:500 11.5px/1.2 var(--fmono)!important;letter-spacing:.12em!important;text-transform:uppercase;background:none!important;border:0!important;padding:0!important;color:var(--bink)!important}& .da-eyebrow .dot{display:none}
& .da-muted,& .da-sub,& .db-sub,& small{font-family:var(--fbody)}
${lkS('btn')},& .dx-pill{border-radius:0!important;box-shadow:none!important;font-family:var(--fmono);font-weight:500;letter-spacing:.04em;text-transform:uppercase;font-size:13.5px}
& .da-btn.sec{background:transparent!important;border:1px solid var(--bink)!important;color:var(--bink)!important}
${lkS('card')},& .dx-tile,& .dx-vt-c,& .dx-bnd-it{border-radius:0!important;box-shadow:none!important;border:0!important;border-top:1px solid var(--bink)!important;background:transparent!important}
& .da-card,& .db-form{background:#fff!important;border:1px solid var(--bink)!important}& .da-plan.best{border-top:4px solid var(--bp)!important}& .da-plan .tag{position:static;display:block;margin-bottom:10px}
${lkS('num')}{font-family:var(--fhead);font-weight:400!important;letter-spacing:-.02em}${lkS('input')}{border-radius:0!important;border:1px solid var(--bink)!important;background:#fff}
& .dx-tile.tn-dark{background:var(--bink)!important;color:var(--lkp)}& .dx-tile.tn-brand{background:var(--bp)!important}& .dx-tile.tn-accent{background:var(--ba)!important}
& .da-ctab,& .db-ctabox{background:var(--bink)!important;color:var(--lkp)!important}& .da-ctab h2{font-family:var(--fhead)}& .da-foot,& .db-foot{background:var(--lkp)!important;color:var(--bink)!important;border-top:1px solid var(--bink)}& .da-foot a{color:var(--bink)}& .nc-foottel{color:var(--bink)!important}
& .accordion-item{border:0!important;border-bottom:1px solid var(--bink)!important;background:transparent;border-radius:0!important}& .accordion-button{background:transparent!important;box-shadow:none!important;font-family:var(--fhead);font-size:24px;font-weight:400;color:var(--bink)}
& .dx-fnd-f .op,& .dx-bk-d,& .dx-bk-s{border-radius:0;border-color:var(--bink);background:transparent}& .dx-fnd-f .op.on{background:var(--bink);color:var(--lkp)}`,
/* ===== CRUDO ===== */
crudo:o=>`
&{--lkp:#ffffff;--dline:#000;--visr:0px;--mkr:0px;--mkb:2px solid #000;--mksh:none;--visbg:#f2f2f2;--visdeco:transparent;background:#fff;color:#000}
${lkS('hero')},${lkS('sec')},${lkS('nav')},& .dx-prod,& .dx-stats,& .dx-tiles-s{background:#fff!important;background-image:none!important}& .da-sec.soft,& .db-sec.soft{background:#f2f2f2!important}
& .da-sec,& .db-sec{border-top:2px solid #000}${lkS('nav')}{border-bottom:2px solid #000!important}
@media (min-width:992px){& .da-sec>.container,& .db-sec>.container{padding-left:7vw}& .da-hero>.container,& .db-hero>.container{padding-right:6vw}}
${lkS('h1')},& .dx-prod-h{font-weight:var(--lk-hw)!important;letter-spacing:-.04em;line-height:1.02;text-transform:none}& .da-h1,& .db-h1{font-size:clamp(34px,5vw,68px)}
${lkS('h2')}{font-weight:var(--lk-hw);letter-spacing:-.03em;text-align:left!important}${lkS('h3')}{font-family:var(--fhead);font-weight:600}
& .text-center>.da-h2,& .text-center>.da-muted,& .dx-text .text-center{text-align:left!important}& .da-sec .text-center{text-align:left!important}
& p,& li,& .da-muted,& .da-sub,& .db-sub{font-family:var(--fbody);font-size:1.08em;color:#111!important}
${lkS('mark')},& .dx-prod-h mark{background:none!important;-webkit-text-fill-color:currentColor!important;color:#000!important;text-decoration:underline;text-decoration-color:var(--bp);text-decoration-thickness:.12em;text-underline-offset:.12em;padding:0}
${lkS('kick')},& .dx-prod-k{font:500 13px/1.2 var(--fmono)!important;text-transform:none;letter-spacing:0;background:#ff0!important;color:#000!important;border:0;border-radius:0;padding:2px 6px!important}& .da-eyebrow .dot{display:none}
${lkS('btn')},& .dx-pill{border-radius:0!important;box-shadow:none!important;font-family:var(--fmono);font-weight:600;text-decoration:underline;text-underline-offset:3px}
& .da-btn.pri,& .da-go,& .dx-pill{background:var(--bp)!important;color:var(--btntext,#fff)!important;border:2px solid #000!important}& .da-btn.sec{background:#fff!important;border:2px solid #000!important;color:#000!important}
& a:not(.da-btn):not(.da-call):not(.dx-pill):not(.da-go){color:var(--bp);text-decoration:underline}
${lkS('card')},& .dx-tile,& .dx-vt-c,& .dx-bnd-it{border-radius:0!important;box-shadow:none!important;border:2px solid #000!important;background:#fff!important;color:#000}
& .da-plan.best{background:#ff0!important}& .da-plan .tag{border-radius:0;background:#000;color:#fff}${lkS('num')}{font-family:var(--fhead);letter-spacing:-.04em}
${lkS('input')}{border-radius:0!important;border:2px solid #000!important}& .dx-tile.tn-dark{background:#000!important;color:#fff}& .dx-tile.tn-brand{background:var(--bp)!important;color:var(--btntext,#fff)}& .dx-tile.tn-accent{background:#ff0!important;color:#000}
& .da-ctab,& .db-ctabox{background:#000!important;color:#fff!important}& .da-foot,& .db-foot{background:#fff!important;color:#000!important;border-top:2px solid #000}& .da-foot a{color:#000}& .nc-foottel{color:#000!important}
& .accordion-item{border:0!important;border-bottom:2px solid #000!important;border-radius:0!important}& .accordion-button{font-family:var(--fhead);background:#fff!important;box-shadow:none!important}
& .dx-fnd-f .op,& .dx-bk-d,& .dx-bk-s{border-radius:0;border:2px solid #000}& .dx-fnd-f .op.on{background:#000;color:#fff}& .nc-vis{border:2px solid #000;box-shadow:none}`
});

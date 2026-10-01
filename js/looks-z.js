/* ---------- ESTILOS · PRODUCTO Y TECNOLOGÍA (v4.5) ----------
   Inspirados en patrones públicos de las páginas de producto premium, neobancos y SaaS (solo estructura visual):
   · Vitrina   — blanco y gris perla en bandas, titulares enormes con tracking negativo, píldoras, cards sin sombra de 28 px,
                 enlaces secundarios "›", barra translúcida con desenfoque. (Sistema de referencia: styles.refero.design · plerdy.com)
   · Neobanco  — fintech: grotesca neutra, cifras tabulares, tarjetas con filete y sombra suave, halo de marca muy sutil,
                 chip de confianza sobre el titular. (utsubo.com · fintech trust patterns)
   · Nocturno  — SaaS en oscuro: rejilla tenue, halo de color de marca, titular con degradado, tarjetas de cristal 1 px.
                 (pravinkumar.co · bento B2B; patrones tipo Linear/Vercel)
   Mismo contrato que looks.js: "&" = body.lk-<estilo>; los colores salen de la marca (--bp, --ba, --bink). */
Object.assign(LOOKS,{
  vitrina:{cat:"Producto y tech",name:"Vitrina",desc:"Página de producto premium: bandas blancas y gris perla, titulares enormes, píldoras y el producto como protagonista.",best:"Lanzamientos, fibra premium, alarmas inteligentes, placas",head:"Inter Tight",body:"Inter",hw:700,hwBrand:700,mh:1.0,sample:["#f5f5f7","#1d1d1f","var(--bp)"]},
  neobanco:{cat:"Producto y tech",name:"Neobanco",desc:"Fintech: limpio, cifras tabulares, tarjetas suaves con filete y un halo de marca muy sutil.",best:"Seguros, energía, financiación, telco digital",head:"Geist",body:"Geist",hw:600,hwBrand:700,mh:1.0,sample:["#fbfbfd","var(--bp)","#0f172a"]},
  nocturno:{cat:"Producto y tech",name:"Nocturno",desc:"SaaS en modo oscuro: rejilla tenue, halo con el color de la marca y titulares con degradado.",best:"B2B, fibra empresas, ciberseguridad, software",head:"Inter Tight",body:"Inter",hw:600,hwBrand:700,mh:1.0,sample:["#08090a","var(--bp)","#f7f8f8"]}
});
LOOK_ORDER.push("vitrina","neobanco","nocturno");
if(!LOOK_CATS.includes("Producto y tech"))LOOK_CATS.push("Producto y tech");
Object.assign(NC_VOICE_BY_LOOK,{vitrina:"neutral",neobanco:"neutral",nocturno:"neutral"});
Object.assign(V4_AUTO_VAR.trust,{vitrina:"big",neobanco:"big",nocturno:"row"});
Object.assign(V4_AUTO_VAR.ben,{vitrina:"cards",neobanco:"cards",nocturno:"cards"});
document.addEventListener("DOMContentLoaded",()=>{if(typeof FX_BY_LOOK!=="undefined")Object.assign(FX_BY_LOOK,{vitrina:"up",neobanco:"up",nocturno:"blur"});});
const LKZ_DARK_RESET=`--bink:var(--ink0);--bmuted:#6b6472;--bsoft:#f6f6f8;--line:#e5e3ea;--dline:#e5e3ea;--bpt:var(--bp);--bs-body-bg:#fff;--bs-body-color:var(--ink0);--bs-border-color:#dee2e6;color:var(--ink0)`;
Object.assign(LOOK_CSS,{
/* ===== VITRINA ===== */
vitrina:o=>`
&{--lks:#f5f5f7;--dline:#d2d2d7;--visr:28px;--mkr:28px;--mkb:0;--mksh:none;--visbg:#f5f5f7;--visdeco:transparent;background:#fff;-webkit-font-smoothing:antialiased}
${lkS('hero')},${lkS('sec')},& .dx-prod,& .dx-stats{background:#fff!important;background-image:none!important}& .da-sec.soft,& .db-sec.soft,& .dx-tiles-s{background:var(--lks)!important}
${lkS('nav')}{background:rgba(255,255,255,.8)!important;-webkit-backdrop-filter:saturate(1.8) blur(20px);backdrop-filter:saturate(1.8) blur(20px);border-bottom:1px solid rgba(0,0,0,.08)!important;padding:8px 0}
& .da-top{background:var(--lks);color:var(--bink);font-size:13px}& .da-top b,& .da-top .nci{color:var(--bpt)}
${lkS('h1')}{font-weight:var(--lk-hw);letter-spacing:-.035em;line-height:1.04}& .da-h1,& .db-h1{font-size:clamp(40px,5.6vw,76px)}
${lkS('h2')}{font-weight:var(--lk-hw);letter-spacing:-.03em;line-height:1.06}& .da-h2,& .db-h2,& .dc-h2{font-size:clamp(32px,4.4vw,56px)}
${lkS('h3')}{font-weight:var(--lk-hw);letter-spacing:-.015em}
${lkS('mark')}{background:linear-gradient(90deg,var(--bp),color-mix(in srgb,var(--ba) 65%,var(--bp)));-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent;padding:0;font-style:normal}
${lkS('kick')}{font:600 17px/1.2 var(--fhead);letter-spacing:0;text-transform:none;color:var(--bpt);background:none;border:0;padding:0}& .da-eyebrow .dot{display:none}
${lkS('btn')}{border-radius:999px!important;box-shadow:none!important;font-weight:500}& .da-btn{padding:12px 24px;font-size:17px}
& .da-btn.sec{background:transparent!important;border-color:transparent!important;color:var(--bpt)!important;padding-left:6px;padding-right:6px}& .da-btn.sec:hover{text-decoration:underline;transform:none}
& .da-call{padding:7px 16px}& .da-call small{display:none}
${lkS('card')}{border-radius:28px!important;box-shadow:none!important;border:0!important;background:var(--lks)!important}
& .da-sec.soft .da-plan,& .da-sec.soft .da-ben,& .db-sec.soft .db-rev,& .da-card,& .db-form{background:#fff!important}& .da-card,& .db-form{border:1px solid var(--dline)!important}
& .da-plan{text-align:center;padding:38px 28px!important}& .da-plan ul{text-align:left}& .da-plan .tag{left:50%;transform:translateX(-50%);background:transparent;color:#b64400;font-weight:600;top:14px;font-size:13px}& .da-plan.best{box-shadow:inset 0 0 0 2px var(--bp)!important}
${lkS('input')}{border-radius:12px!important;border:1px solid #d2d2d7!important}
${lkS('num')}{font-weight:var(--lk-hw)!important;letter-spacing:-.04em}
& .da-sec,& .db-sec{padding:104px 0}@media (max-width:767px){& .da-sec,& .db-sec{padding:64px 0}}
& .accordion-item{border:0!important;border-bottom:1px solid var(--dline)!important;background:transparent;border-radius:0!important}& .accordion-button{background:transparent!important;box-shadow:none!important;font-size:19px;font-weight:600;padding:22px 0;color:var(--bink)}& .accordion-body{padding:0 0 22px;color:var(--bmuted)}
& .da-ctab,& .db-ctabox,& .dc-cta{background:#000!important;color:#fff!important;border-radius:0}
& .da-foot,& .db-foot,& .dc-foot{background:var(--lks)!important;color:#6e6e73!important;border-top:1px solid var(--dline);font-size:12px}& .da-foot a,& .db-foot a{color:#424245}& .nc-foottop{border-color:var(--dline)!important}& .nc-foottel{color:var(--bink)!important}
& .da-trust{background:#fff!important;border:0!important}& .da-checks li:before{color:var(--bpt)}& .da-ben .ic{color:var(--bpt)}
& .nc-vis{box-shadow:none!important;border-radius:28px}& .da-sticky,& .db-sticky{background:rgba(255,255,255,.86)!important;-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px)}
@media (min-width:576px){& .dx-tile{min-height:260px}}& .dx-tile.tn-light{background:#fff}& .dx-tiles-s .dx-tile.tn-light{background:#fff}`,
/* ===== NEOBANCO ===== */
neobanco:o=>`
&{--lkp:#fbfbfd;--lks:#f3f5f9;--dline:#e4e7ee;--visr:24px;--mkr:24px;--mkb:1px solid #e4e7ee;--mksh:0 24px 48px -28px rgba(16,24,40,.35);--visbg:#eef1f7;--visdeco:transparent;background:var(--lkp);font-variant-numeric:tabular-nums}
${lkS('hero')},& .dx-prod{background:radial-gradient(70% 60% at 88% 0%,color-mix(in srgb,var(--bp) 15%,transparent),transparent 70%),radial-gradient(50% 55% at 0% 100%,color-mix(in srgb,var(--ba) 13%,transparent),transparent 70%),var(--lkp)!important}
${lkS('sec')},& .dx-stats{background:var(--lkp)!important}& .da-sec.soft,& .db-sec.soft,& .dx-tiles-s{background:var(--lks)!important}
${lkS('nav')}{background:color-mix(in srgb,var(--lkp) 86%,transparent)!important;-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);border-bottom:1px solid var(--dline)!important}
${lkS('h1')}{font-weight:var(--lk-hw);letter-spacing:-.045em;line-height:1.02}${lkS('h2')}{font-weight:var(--lk-hw);letter-spacing:-.035em}${lkS('h3')}{font-weight:var(--lk-hw);letter-spacing:-.01em}
${lkS('mark')}{background:none;color:var(--bpt);padding:0;font-style:normal}
${lkS('kick')}{display:inline-flex;align-items:center;gap:8px;background:color-mix(in srgb,var(--bp) 8%,#fff);color:var(--bpt);border:1px solid color-mix(in srgb,var(--bp) 18%,#fff);border-radius:999px;padding:6px 12px;font-size:13px;font-weight:600;letter-spacing:0;text-transform:none}
${lkS('btn')}{border-radius:14px!important;font-weight:600}
& .da-btn.pri,& .da-go,& .dx-pill{box-shadow:inset 0 1px 0 rgba(255,255,255,.22),0 10px 24px -12px color-mix(in srgb,var(--bp) 80%,transparent)!important}& .dx-pill{border-radius:14px}
& .da-btn.sec{background:#fff!important;border:1px solid var(--dline)!important;color:var(--bink)!important}
${lkS('card')}{border-radius:24px!important;border:1px solid var(--dline)!important;background:#fff!important;box-shadow:0 1px 2px rgba(16,24,40,.04),0 16px 32px -20px rgba(16,24,40,.18)!important}
${lkS('input')}{border-radius:12px!important;border:1px solid var(--dline)!important;background:#fff}& .dx-prod-form .form-control{border-radius:14px}
${lkS('num')}{font-weight:var(--lk-hw)!important;letter-spacing:-.05em;font-variant-numeric:tabular-nums}
& .da-trust{background:#fff!important}& .da-plan.best{border-color:var(--bp)!important;box-shadow:0 0 0 3px color-mix(in srgb,var(--bp) 15%,transparent),0 24px 48px -28px color-mix(in srgb,var(--bp) 60%,transparent)!important}
& .accordion-item{border:1px solid var(--dline)!important;border-radius:16px!important;margin-bottom:10px;overflow:hidden;background:#fff}& .accordion-button{box-shadow:none!important;background:#fff!important;color:var(--bink)}
& .da-ctab,& .db-ctabox,& .dc-cta{background:linear-gradient(135deg,var(--ink0),color-mix(in srgb,var(--bp) 42%,var(--ink0)))!important;color:#fff!important}
& .da-foot,& .db-foot,& .dc-foot{background:var(--lks)!important;color:var(--bmuted)!important}& .nc-foottop{border-color:var(--dline)!important}& .nc-foottel{color:var(--bink)!important}
& .da-checks li:before{content:"✓";display:inline-grid;place-items:center;width:18px;height:18px;border-radius:50%;background:color-mix(in srgb,var(--ba) 32%,#fff);color:var(--ink0);font-size:11px;margin-right:8px}
& .dx-tile{border:1px solid var(--dline)}& .dx-tile.tn-light{background:#fff}& .nc-vis{border-radius:24px}`,
/* ===== NOCTURNO ===== */
nocturno:o=>`
&{--lkp:#08090a;--lkc:#101113;--lkb:rgba(255,255,255,.09);--bink:#f7f8f8;--bmuted:#8a8f98;--bsoft:#101113;--line:rgba(255,255,255,.09);--dline:rgba(255,255,255,.09);--bpt:color-mix(in srgb,var(--bp) 55%,#fff);
  --bs-body-bg:#08090a;--bs-body-color:#f7f8f8;--bs-border-color:rgba(255,255,255,.09);--bs-accordion-bg:#101113;--bs-accordion-color:#f7f8f8;--bs-accordion-btn-color:#f7f8f8;--bs-accordion-active-bg:#141518;--bs-accordion-active-color:#f7f8f8;--bs-accordion-border-color:rgba(255,255,255,.09);
  --visr:16px;--mkr:16px;--mkb:1px solid rgba(255,255,255,.09);--mksh:none;--visbg:#101113;--visdeco:transparent;background:var(--lkp);color:var(--bink);-webkit-font-smoothing:antialiased}
& #ncPop,& #ncContact,& #ncCookies,& .modal{${LKZ_DARK_RESET}}
${lkS('hero')},${lkS('sec')},${lkS('nav')},& .db-ctab,& .da-top,& footer,& .dx-prod,& .dx-tiles-s,& .dx-stats{background:var(--lkp)!important;color:var(--bink)}& .da-sec.soft,& .db-sec.soft{background:#0c0d0f!important}
${lkS('hero')},& .dx-prod{background-image:radial-gradient(60% 55% at 50% -12%,color-mix(in srgb,var(--bp) 40%,transparent),transparent 72%),linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px)!important;background-size:100% 100%,64px 64px,64px 64px!important}
${lkS('nav')},& .dx-subnav{background:rgba(8,9,10,.72)!important;border-bottom:1px solid var(--lkb)!important;-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);color:var(--bink)}& .da-logo,& .db-logo{color:var(--bink)}
& .da-sec,& .db-sec,& .dc-sec{border-top:1px solid var(--lkb)}& .da-top{border-bottom:1px solid var(--lkb);color:var(--bmuted)}& .da-top b{color:var(--bink)}
${lkS('h1')}{font-weight:var(--lk-hw);letter-spacing:-.045em;line-height:1.04;background:linear-gradient(180deg,#fff 35%,rgba(255,255,255,.58));-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent}
${lkS('mark')}{background:linear-gradient(90deg,var(--bpt),color-mix(in srgb,var(--ba) 55%,#fff));-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent;padding:0;font-style:normal}
${lkS('h2')},${lkS('h3')}{font-weight:var(--lk-hw);letter-spacing:-.035em;color:var(--bink)}
& p,& li,& label,& small{color:inherit}& .da-sub,& .db-sub,& .text-muted,& .da-checks li,& .da-muted,& .db-muted,& .dx-prod-sub{color:var(--bmuted)!important}
${lkS('kick')},& .dx-prod-k{display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:500;letter-spacing:0;text-transform:none;color:var(--bink);background:rgba(255,255,255,.05);border:1px solid var(--lkb);border-radius:999px;padding:5px 12px}& .da-eyebrow .dot{box-shadow:0 0 0 4px rgba(34,197,94,.14)}
${lkS('btn')}{border-radius:10px!important;font-weight:600}& .dx-pill{border-radius:10px}
& .da-btn.pri,& .da-go,& .dx-pill{box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--bp) 55%,#fff),0 8px 30px -8px color-mix(in srgb,var(--bp) 70%,transparent)!important}
& .da-btn.sec,& .da-call{background:rgba(255,255,255,.06)!important;border:1px solid var(--lkb)!important;color:var(--bink)!important;box-shadow:none!important}
${lkS('card')}{border-radius:16px!important;box-shadow:none!important;border:1px solid var(--lkb)!important;background:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.015))!important;color:var(--bink)}
& .da-card,& .db-form{background:#101113!important;box-shadow:0 30px 80px -30px rgba(0,0,0,.9),0 0 0 1px var(--lkb)!important}
${lkS('input')},& .form-select,& .dx-prod-form .form-control{border-radius:10px!important;border:1px solid rgba(255,255,255,.14)!important;background:#0c0d0f!important;color:var(--bink)!important}& .form-control::placeholder{color:#6b7079}
& .form-check-input{background-color:#0c0d0f;border-color:rgba(255,255,255,.22)}& a{color:var(--bpt)}
${lkS('num')}{font-weight:var(--lk-hw)!important;letter-spacing:-.05em;color:var(--bink)}& .da-price .u,& .da-price .u b{color:var(--bmuted)}
& .da-checks li:before{color:var(--bpt)}& .da-ben .ic{color:var(--bpt)}
& .da-trust{background:var(--lkc)!important;border-color:var(--lkb)!important}& .da-trust .it{color:var(--bmuted)}& .da-trust .it b{color:var(--bink)}
& .accordion-button{color:var(--bink);background:var(--lkc)!important;box-shadow:none!important}& .accordion-body{color:var(--bmuted)}& .accordion-button::after{filter:invert(1) brightness(1.4)}& .accordion-item{border-color:var(--lkb)!important}
& .db-opt{background:#0c0d0f!important;border:1px solid var(--lkb)!important;color:var(--bink)!important}& .db-opt.on,& .db-opt:hover{border-color:var(--bp)!important}
& table,& .table{--bs-table-bg:transparent;--bs-table-color:var(--bink);color:var(--bink)}& th,& td{border-color:var(--lkb)!important}& thead,& thead th{background:var(--lkc)!important;color:var(--bink)!important}
& .dx-ph,& .dx-letter,& .dx-art,& .dx-vs,& .dx-ptab,& .dx-guar,& .dx-media-ph{background:var(--lkc)!important;color:var(--bink)!important;border-color:var(--lkb)!important}& .dx-vs .us{background:#141518!important}& .dx-ptab .col.best{background:#141518!important}
& .nc-vis{border:1px solid var(--lkb);box-shadow:0 40px 100px -40px color-mix(in srgb,var(--bp) 55%,transparent);background:var(--lkc)}& .nc-vis.is-photo>img{filter:saturate(.92) brightness(.9)}
& .mk-sheet{background:#fff;color:var(--ink0)}& .mk-sheet *{--bink:var(--ink0);--bmuted:#6b6472}
& .nc-float{border:1px solid var(--lkb);background:var(--lkc);color:var(--bink);box-shadow:none}& .nc-float small{color:var(--bmuted)}
& .da-sticky,& .db-sticky,& .dc-sticky{background:rgba(16,17,19,.92)!important;border-top:1px solid var(--lkb)}
& .da-tick,& .da-ctab,& .da-foot,& .db-foot,& .dc-foot,& .db-ctabox,& .dc-cta,& .dx-cd{background:var(--lkc)!important;color:var(--bink)!important;border-top:1px solid var(--lkb)}& .da-ctab p,& .db-ctabox p{color:var(--bmuted)!important}& .nc-foottel{color:var(--bink)!important}
& .da-go.alt,& .db-go{background:var(--bp)!important;color:var(--btntext,#fff)!important}
& .dx-tile{border:1px solid var(--lkb)}& .dx-tile.tn-light{background:var(--lkc);color:var(--bink)}& .dx-tile.tn-dark{background:#000;color:#fff}
& .nc-opts span{background:#0c0d0f;color:var(--bink);border-color:var(--lkb)}& .dx-subnav .lk a{color:var(--bmuted)}
html & .nc-s.nc-tone-d .da-card,html & .nc-s.nc-tone-d .db-form,html & .nc-s.nc-tone-d .da-plan,html & .nc-s.nc-tone-d .da-ben,html & .nc-s.nc-tone-d .db-rev,html & .nc-s.nc-tone-d .db-compare,html & .nc-s.nc-tone-d .accordion,html & .nc-s.nc-tone-d .nc-opts span,html & .nc-s.nc-tone-d .dx-media-card{--bink:#f7f8f8;--bmuted:#8a8f98;--dline:rgba(255,255,255,.09);--bpt:color-mix(in srgb,var(--bp) 55%,#fff);color:#f7f8f8}`
});

/* Sobriedad: en estos estilos no se aplican los toques "a mano" (notas, rotulador, textura, numeración editorial) */
const NC_LOOK_CLEAN=["vitrina","neobanco","nocturno"];
(function(){const _t=ncTouchOn;ncTouchOn=function(k){if(NC_LOOK_CLEAN.includes(ncLook()))return k==="tex"?"none":false;return _t.apply(this,arguments);};})();

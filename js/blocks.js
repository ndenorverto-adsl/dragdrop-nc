/* ---------- BIBLIOTECA DE BLOQUES (base) ----------
   v5.0: los bloques genéricos de la v3 y los de marcas ajenas se han retirado (los sustituyen las familias A/B/C, ✚ y los
   bloques v5). Aquí solo quedan el registro LIB/ORDER, la sección importada y la conversión de landings antiguas:
   al abrir una landing guardada con bloques retirados, cada uno se cambia por su equivalente actual conservando
   título, textos e imagen cuando el bloque nuevo tiene ese campo. */
const LIB={
  imported:{label:"Sección importada",ico:"⇱",cat:"Importado",raw:true,
    def:()=>({html:"<section style='padding:48px;text-align:center'>Sección importada — pega HTML</section>"}),
    fields:[{k:"html",l:"HTML de la sección (editable)",t:"ta"}],
    render:p=>p.html||""}
};
const ORDER=[];

/* Bloques retirados → equivalente actual */
const NC_LEGACY={
  topbar:"da_topbar",navbar:"da_nav",footer:"da_footer",stickycall:"da_sticky",
  hero_split:"da_hero",hero_center:"da_hero",hero_form:"da_hero",hero_video:"da_hero",
  logos:"dx_logos",logowall:"dx_logos",marquee:"dx_logos",stats:"dx_counters",counters:"dx_counters",
  testimonials:"db_reviews",trust:"da_trust",security:"dx_seals",features:"da_benefits",imagetext:"dx_media",
  steps:"db_steps",gallery:"dx_gallery",pricing:"da_plans",faq:"da_faq",video:"dx_video",richtext:"dx_text",
  form:"da_cta",ctaband:"da_cta",cal:"dx_booking",calc:"dx_calc",quiz:"dx_quiz",countdown:"dx_countdown",comparison:"dx_vs"
};
["apple","mov","tmo","o2","mt","at","jz","tel","al"].forEach(p=>{Object.assign(NC_LEGACY,{[p+"_nav"]:"da_nav",[p+"_hero"]:"da_hero",[p+"_footer"]:"da_footer",
  [p+"_tarifas"]:"da_plans",[p+"_plans"]:"da_plans",[p+"_ventajas"]:"da_benefits",[p+"_features"]:"da_benefits",[p+"_tiles"]:"da_benefits",[p+"_bento"]:"da_benefits",
  [p+"_kpi"]:"dx_counters",[p+"_showcase"]:"dx_media",[p+"_cobertura"]:"dx_coverage",[p+"_porque"]:"da_benefits",[p+"_garantias"]:"dx_seals"});});
const NC_LEGACY_KEYS={headline:"headline",sub:"sub",subtitle:"sub",title:"title",eyebrow:"eyebrow",gift:"eyebrow",cta:"cta",image:"img",url:"video",logoimg:"logoImg",logo:"logo",company:"company",text:"text",body:"text",price:"price",priceNote:"priceNote"};
function ncMigrateSection(s){const to=NC_LEGACY[s.type];if(!to||!LIB[to])return false;const L=LIB[to],p=s.props||{},np=L.def?L.def():{};
  Object.keys(NC_LEGACY_KEYS).forEach(k=>{const nk=NC_LEGACY_KEYS[k];const v=p[k];if(typeof v==="string"&&v.trim()&&nk in np&&typeof np[nk]==="string")np[nk]=v;});
  if(to==="da_cta"&&p.headline&&"title" in np)np.title=p.headline;
  s.type=to;s.props=np;s.style={};delete s.freeHtml;return true;}
let ncLegacyWarned=false;
function ncMigrateAll(){let n=0;
  state.sections=state.sections.filter(s=>{if(LIB[s.type])return true;if(ncMigrateSection(s)){n++;return true;}return false;});
  if(typeof BRANDS!=="undefined"&&!BRANDS[state.settings.brand]){state.settings.brand="nc";n++;}
  if(n&&!ncLegacyWarned&&typeof toast==="function"){ncLegacyWarned=true;setTimeout(()=>toast("Landing antigua: "+n+" elemento(s) convertidos a los bloques actuales"),50);}
  return n;}

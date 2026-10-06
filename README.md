# NC Landing Builder

Herramienta drag & drop para crear landings de conversión (Bootstrap 5.3.3) y exportarlas como HTML listo para FTP/Vercel. Frontend estático **sin build** + **Supabase** (login, guardado de landings, imágenes) + funciones de **Vercel** en `api/`. Despliegue automático en Vercel con cada push a `main`.

## Estructura

```
index.html            # estructura del editor (sin lógica)
css/app.css           # estilos del editor
js/                   # lógica, cargada en este orden (scripts clásicos, sin bundler)
  brands.js           #   marcas, fuentes y style kits
  core.js             #   estado, ajustes por defecto y helpers
  blocks.js           #   librería de bloques (LIB)
  looks.js            #   iconos SVG, fotos libres, ilustración y estilos de diseño
  blocks-v4.js        #   familias A/B/C (da_ / db_ / dc_) + su CSS
  blocks-x.js · blocks-uc.js  # variantes, extras CRO (dx_), popup y bloques por caso de uso
  looks-x.js · looks-y.js  # estilos de diseño extra (v4.0 y v4.2) + categorías
  templates.js        #   plantillas
  render.js           #   genera el documento HTML (preview y export)
  export-pro.js       #   formularios, consentimiento, tracking, SEO y checklist
  editor.js           #   preview, paneles, historial, export ZIP/HTML
  templates-v4.js     #   catálogo de plantillas + galería
  templates-uc.js · templates-looks.js  # plantillas por caso de uso y colección de estilos
  cloud.js            #   Supabase: guardar, Mis landings, login
  workspace.js        #   autoguardado, atajos, copiar/pegar, versiones, .json
  cro.js              #   puntuación CRO, ideas A/B del hero y exportación A/B
  growth.js           #   texto dinámico por keyword, horario de llamada, teléfono en vivo y bloques CRO nuevos
  team.js             #   biblioteca del equipo (bloques y plantillas en Supabase o local)
  motion.js           #   animaciones y efectos (entrada, destacados, CTA, fondo)
  typo.js             #   tipografía global (titulares / texto / display), fuentes subidas y marca propia
  lorem.js · import.js · listeners.js · boot.js
  import-smart.js     #   conversión fiel a bloques nativos (lee el DOM pintado: textos, imágenes, colores y fuentes) + dx_media / dx_text
  blocks-pro.js · looks-z.js · templates-pro.js  # bloques, estilos (Vitrina, Neobanco, Nocturno) y plantillas "Producto y tech"
  palette.js          #   panel izquierdo por objetivo: miniaturas, vista previa, favoritos, recientes y filtros
  canvas.js           #   edición en el lienzo: doble clic en textos e imágenes, barra de la sección
  publish.js · batch.js  # publicar (FTP/Vercel, vista previa) y landings en lote desde CSV
  perf.js             #   ⚡ Velocidad: optimización de imágenes (WebP), medición y schema
  blocks-plus.js · looks-w.js · templates-plus.js  # comparador, pack, cita, vídeo · Ácido/Tipográfico/Crudo · sectores nuevos
  blocks-web.js                                   # v4.7: elementos de diseño web (17 bloques) + Estilo → Efectos
  look-escaparate.js                              # v4.8: estilo Escaparate + marca Jazztel 2026 + 7 bloques + plantillas Jazztel (literal y placeholders)
api/figma.js          # proxy a la API de Figma (función de Vercel)
api/publish.js        # publicar por FTP/FTPS o en Vercel (credenciales solo en variables de entorno)
package.json          # dependencias de las funciones de /api (basic-ftp); el sitio sigue sin build
config.js             # claves públicas de Supabase (a partir de config.example.js)
supabase-schema.sql   # esquema completo (instalación nueva)
supabase-migration-v3.1.sql  # añade el historial de versiones a una instalación existente
supabase-migration-v4.3.sql  # añade la tabla team_blocks (biblioteca del equipo)
tests/                # tests locales (no se despliegan)
vercel.json · .vercelignore · .gitignore
```

> Para añadir un archivo JS nuevo: créalo en `js/` y añade su `<script>` en `index.html` en el orden correcto.

## Trabajo en el editor

- **Autoguardado**: cada cambio se guarda como borrador en el navegador; al volver a abrir la herramienta ofrece recuperarlo. Si la landing ya está en la nube, se sincroniza sola a los 15 s de dejar de editar.
- **Estado** junto al nombre: *✓ Guardado*, *● Sin guardar*, *Guardando…*. Al cerrar la pestaña con cambios sin subir, el navegador avisa.
- **Versiones**: cada guardado manual (💾 o Ctrl+S) crea una versión (máx. 30 por landing). En *Mis landings* → 🕘 → Restaurar.
- **Atajos** (pulsa `?`): Ctrl+S, Ctrl+Z/Y, Ctrl+D duplicar, Ctrl+C/V copiar y pegar secciones (también entre landings), Supr, Alt+↑/↓, `H` ocultar sección (no se exporta), Esc.
- **Proyecto .json**: en *Mis landings* puedes descargar la landing abierta o cargar un `.nc.json`, también sin nube.
- **Nueva landing** reinicia teléfono, WhatsApp, endpoint, GTM y URLs legales para no arrastrar datos de otro cliente (conserva la marca).

## Plantillas

Galería (▦ Plantillas) con tres formas de encontrar punto de partida: **Arquetipo**, **Sector** y **Cliente**, filtrables por dirección visual:
- **A · Oferta directa**: precio y llamada primero (telco, energía).
- **B · Confianza editorial**: prueba social y multipaso (alarmas, seguros, salud, legal).
- **C · Premium producto**: hero oscuro y formulario tipo buscador (lanzamientos).

**Estilos de diseño** (Global → Estilo de diseño): Base, Editorial, Swiss grid, Brutalista táctil, Suave orgánico, Tech aurora, Corporativo premium, Retro cálido y Minimal lujo. Cambian tipografía, formas, profundidad y fondos de todos los bloques A/B/C sin tocar los colores de la marca; con "Usar tipografía de la marca" se mantienen las fuentes del cliente. Los heros admiten foto (subida, URL o fotos libres de Unsplash) o, si no hay, una ilustración con los colores de la marca.

Los bloques toman colores y tipografías de la marca activa. Los datos de negocio van como `{{PLACEHOLDER}}` y el checklist los señala antes de exportar.

## Qué genera el export

- **Un único HTML** (botón `HTML ↓`, ideal para FTP) o **ZIP** con `index.html + css/ + js/ + README` (botón `ZIP ↓`).
- Antes de exportar se abre el **checklist**: bloqueantes (teléfono, WhatsApp, endpoint, GTM, URLs legales, título) y avisos (SEO, peso, placeholders). `✓ Revisar` lo abre sin exportar.
- **Formularios**: campos ocultos de atribución (`utm_*`, `gclid`, `gbraid`, `wbraid`, `fbclid`, `msclkid`, `ttclid`, `li_fat_id`, `landing_url`, `referrer`, `form_id`), casilla RGPD `acepta_privacidad`, primera capa informativa, honeypot `nc_website`, teléfono español normalizado a 9 cifras, estado “Enviando…” y aviso de error real.
- **Consentimiento**: banner propio con Consent Mode v2 (todo denegado por defecto, Aceptar/Rechazar al mismo nivel, Configurar) o CMP externa en GTM.
- **dataLayer**: `click_to_call`, `whatsapp_click`, `cta_click`, `form_start`, `generate_lead` (con `user_data` para Enhanced Conversions), `form_error`, `consent_update`, `quiz_complete`, `schedule`.
- **SEO/rendimiento**: robots (noindex por defecto), canonical y og:url desde la URL final, Open Graph/Twitter, favicon, theme-color, FAQPage, imagen del hero con prioridad (LCP).

### Envío del formulario
POST `multipart/form-data` al endpoint. Si el endpoint responde con CORS (`Access-Control-Allow-Origin`), los errores HTTP se detectan y se avisa al usuario; si no, el lead se marca `delivery: unconfirmed` en el dataLayer (nunca se reenvía para evitar duplicados).

## Puesta en marcha

### 1. Supabase
1. Proyecto en https://supabase.com → **Project Settings → API**: copia la URL y la clave **publishable/anon** (nunca la secreta).
2. **SQL Editor**: ejecuta `supabase-schema.sql`.
3. **Authentication → Users → Add user**: usuario del equipo.
4. Si ya tenías la base creada antes de la v3.1, ejecuta además `supabase-migration-v3.1.sql` (historial de versiones).

### 2. Configuración
Copia `config.example.js` a `config.js` y rellénalo. La clave publishable es pública por diseño (RLS protege los datos).

### 3. GitHub + Vercel
Cada push a `main` despliega en el proyecto `dragdrop-nc` (Framework Preset: **Other**, sin build).
- Opcional: variable de entorno `FIGMA_TOKEN` en Vercel para no tener que pegar el token en el importador de Figma.
- **Acceso del equipo**: el proyecto tiene *Vercel Authentication* activa, así que solo entran miembros del equipo de Vercel. Si los gestores no son miembros, desactívala en **Settings → Deployment Protection** (el login de Supabase ya protege los datos) o usa un dominio propio.

### 4. Publicar desde el builder (opcional)
En Vercel → proyecto `dragdrop-nc` → Settings → Environment Variables (Production):

| Variable | Valor |
|---|---|
| `NC_PUBLISH_TARGETS` | JSON con los destinos (ver ejemplo) |
| `NC_PUBLISH_EMAILS` | opcional: quién puede publicar, p. ej. `@nextconversion.es` |
| `NC_SUPABASE_URL` / `NC_SUPABASE_ANON` | opcional: si no están se leen de `config.js` |

```json
[
  {"id":"nc","name":"Servidor NC","type":"ftp","host":"ftp.tudominio.com","port":21,"user":"USUARIO","password":"CONTRASEÑA","secure":true,
   "base":"/public_html/landings","publicUrl":"https://landings.tudominio.com"},
  {"id":"prev","name":"Vista previa","type":"ftp","preview":true,"host":"ftp.tudominio.com","user":"USUARIO","password":"CONTRASEÑA","secure":true,
   "base":"/public_html/previews","publicUrl":"https://previews.tudominio.com"},
  {"id":"vercel","name":"Vercel landings","type":"vercel","token":"TOKEN_DE_VERCEL","team":"team_xxx","prefix":"nc-"}
]
```
- **FTP/FTPS** (`secure:true` = FTPS explícito). Cada landing va a `<base>/<carpeta>/index.html` + `assets/`. SFTP no está soportado todavía.
- **Vercel**: crea (o actualiza) el proyecto `<prefix><carpeta>` y lo publica en producción (`https://<prefix><carpeta>.vercel.app`, luego puedes añadirle dominio). El token se crea en vercel.com/account/tokens con acceso solo a ese equipo.
- **Vista previa para el cliente**: usa el destino con `"preview":true` (copia con `noindex`). Si usas Vercel para las vistas previas, desactiva *Vercel Authentication* en ese equipo o los clientes no podrán abrirlas.
- Tras guardar las variables, haz **Redeploy**. Solo publica quien ha iniciado sesión en el builder (y, si la pones, con el email permitido).

## Tests (local)

```bash
cd tests
npm install
npx playwright install chromium   # solo la primera vez
npm test                          # smoke del editor + E2E de la landing exportada + validación HTML
```

`node shots-looks.js .. out/looks "Oferta con precio|Confianza + multipaso" "editorial,revista" nc` captura plantillas × estilos. Con `SHOTS_VP="390x844:m,768x1024:t" NOSHOT=1` solo informa de desbordes en móvil y tablet.

`snapshot.js` + `compare.js` sirven para comprobar que un refactor no cambia el HTML exportado.

## Seguridad
- Login compartido con RLS `authenticated`. Para usuarios individuales: policy `user_id = auth.uid()` + columna (roadmap Fase 4).
- Bucket público en lectura (necesario para las imágenes de las landings); escritura solo autenticado.
- Cabeceras de seguridad en `vercel.json`. `.vercelignore` evita publicar tests, SQL y documentación.

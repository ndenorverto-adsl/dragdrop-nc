# Changelog

## v3.6 — 2026-09-29 · Toque personal
- **Fuera los estilos que sonaban a IA**: Tech aurora, Suave orgánico y Corporativo premium. Las landings que los usaban pasan a Minimal lujo, Cuaderno anotado y Prensa.
- **3 estilos nuevos hechos "a mano"**:
  - **Cuaderno anotado**: renglones de libreta con margen, subrayado de rotulador, cinta adhesiva, botones con relieve, cifras manuscritas y foto tipo polaroid.
  - **Prensa**: papel de periódico, filetes dobles, serif de titular (Newsreader), capitular, formulario como cupón recortable (✂) y fotos con trama de imprenta.
  - **Papel y sello**: collage de papel kraft, bordes rasgados, etiquetas con agujero, precio en ticket troquelado, sello de tinta con el precio y fotos sujetas con cinta.
- **Toques personales en todos los estilos** (Global → Toques personales, con interruptores):
  - **Anotaciones a mano**: el precio va rodeado con un círculo dibujado, y hay una flecha con nota junto al formulario (usa la primera ventaja del bloque o "Solo 1 pregunta"), un check dibujado en las ventajas y "La más elegida" como nota a mano.
  - **Letra manuscrita** (Caveat) para las notas.
  - **Textura** de grano o papel.
  - **Composición editorial**: secciones numeradas y cabeceras asimétricas.
- **Voz de los textos**: según el estilo, cercano o profesional. Solo cambia los textos que no has editado y el microcopy fijo; nunca inventa precios, plazos ni datos.
- Campo "Nota a mano" en los heros para escribir la tuya.

## v3.5 — 2026-09-29 · Menos "IA" y móvil rehecho
- **Fuera los tics de web generada**: sin ilustración abstracta de degradado, sin sello de estrella por defecto, sin iconos de purpurina, sin titulares con degradado; etiquetas sin "píldora" y brillos de la dirección C más sobrios. En Suave orgánico, subrayado dibujado en lugar de texto con degradado.
- **Mockups de producto** dibujados con los datos de la landing: router y tarjeta de tarifa (telco), factura con curva de precios por horas (energía), app de alarma (seguridad), póliza (seguros), tarjeta sanitaria y cita (salud), expediente con sello y fases (legal), agua filtrada. Cada estilo los viste a su manera.
- **Imagen protagonista**: automática, mockup, foto, solo tipografía o sin imagen. Tratamiento de foto: natural, duotono con el color de la marca, blanco y negro o cálido. En Brutalista y Retro el sello muestra el precio real del bloque.
- **Variantes automáticas por estilo**: Ventajas (tarjetas, numeradas, filas) y Barra de confianza (fila, cifras grandes, cinta en movimiento). También se eligen a mano.
- **Móvil rehecho**: formulario por encima del pliegue en todos los heros (orden configurable), botones a ancho completo de 52 px, campos de 52 px, tarifas y opiniones en carrusel deslizable, ventajas y pasos en lista, comparativa convertida en tarjetas con etiquetas, márgenes de 20 px y espaciado coherente.
- **Controles de móvil por bloque** (pestaña Estilo de los bloques A/B/C): orden del hero, mostrar u ocultar la imagen, composición (carrusel/lista/cuadrícula), tamaño de titulares, espaciado y alineación. Más fondo, espaciado y alineación para escritorio.
- **Ajustes globales de móvil**: tamaño de titulares, espaciado entre secciones y barra fija (aparece al dejar atrás el formulario o siempre; barra, flotante o un solo botón).

## v3.4 — 2026-09-29 · Estilos de diseño
- **8 estilos de diseño** (panel Global → "Estilo de diseño"): Editorial, Swiss grid, Brutalista táctil, Suave orgánico, Tech aurora, Corporativo premium, Retro cálido y Minimal lujo, además de Base. Cambian tipografía, formas, sombras, fondos, texturas y adornos de todos los bloques A/B/C a la vez. **Los colores siguen siendo los de la marca.**
- Interruptor **"Usar tipografía de la marca"**: mantiene las fuentes del cliente con la forma y la profundidad del estilo.
- **Heros con foto o ilustración protagonista** (campo "Composición"; en automático se activa con cualquier estilo que no sea Base): foto con la forma del estilo (arco, blob, píldora, foto a sangre…), sello flotante opcional y mockup de móvil en la dirección C. Sin foto se dibuja una **ilustración propia** con los colores de la marca y el icono del sector.
- Campo de foto nuevo: subir, pegar URL o elegir entre **fotos libres (licencia Unsplash)**.
- **Iconos SVG (Lucide)** en lugar de emojis en botones, formularios, ventajas, opciones del multipaso y comparativas. Los emojis que ya estaban en los textos se convierten solos.
- Galería de plantillas: fila **"Ver con estilo"** para previsualizar las 42 plantillas con cualquier estilo y aplicarlo al elegir.
- Vista previa: los `{{PLACEHOLDER}}` se ven como etiquetas (en el export siguen siendo texto y el checklist los avisa).
- Correcciones: el preload y el og:image de la imagen del hero salían con `&amp;` doble; las plantillas de arquetipo salían al final de la galería; precios largos en tarifas y cifras ya no desbordan en móvil; con un estilo con tipografía propia ya no se descargan las fuentes de la marca que no se usan.
- Tests: `tests/shots-looks.js` (plantillas × estilos en escritorio y móvil, con aviso de scroll horizontal).

## v3.3 — 2026-09-29 · Plantillas nuevas (entrega 2)
- **19 plantillas por sector × canal**: Telco y Energía (A), Alarmas, Seguros, Salud y Legal (B), cada una en Formulario / Llamada / WhatsApp, más "Energía · Premium" (C). Copy de sector real; ofertas, precios, cifras y respuestas como `{{PLACEHOLDER}}`.
- **17 plantillas por cliente** con su marca: Jazztel, MásMóvil, Simyo, Yoigo, Vodafone, Lowi, Orange, Finetwork, MásAhorro, TotalEnergies, Prosegur, ADT, Segurma, Sicor, AlarmaFácil, SICOR Teleasistencia (llamada como canal principal) y Tuawa (C). Sustituyen a las plantillas de cliente anteriores.
- Galería: filtros por sector y por canal, contador de resultados y orden Arquetipo → Sector → Cliente.
- Corrección: precios largos ya no desbordan el hero en móvil.
- Pendiente: Repsol y O2 (extraer su marca de la web y validarla).

## v3.2 — 2026-09-29 · Plantillas nuevas (entrega 1)
- 3 direcciones visuales como familias de bloques, adaptadas a la marca cargada:
  - **A · Oferta directa** (`da_*`): topbar de urgencia, nav con teléfono, hero con precio, confianza, tarifas, ventajas, FAQ, CTA final, footer y barra fija móvil.
  - **B · Confianza editorial** (`db_*`): nav, hero con multipaso de 2 pasos, sellos, pasos, comparativa, opiniones, FAQ, CTA final, footer y barra fija móvil.
  - **C · Premium producto** (`dc_*`): nav glass, hero oscuro con buscador, logos, bento, FAQ, CTA final, footer y barra fija móvil.
- Cada hero y cada barra fija tienen **canal principal** (formulario / llamada / WhatsApp). El formulario de callback se mantiene siempre.
- 6 plantillas por arquetipo: Oferta con precio · Click-to-call · Tarifas y comparador · Confianza + multipaso · Autoridad y prueba social · Premium producto.
- **Galería de plantillas** con miniaturas reales y filtros (arquetipo / sector / cliente / dirección) en lugar del desplegable.
- Fuera las plantillas literales (Apple, Movistar, T-Mobile, O2, MyTraffic, AB Tasty) y las 6 genéricas antiguas. Sus bloques ya no salen en la paleta, pero las landings guardadas siguen funcionando.
- Las marcas de referencia pasan a llamarse **estilos visuales** sin marca de terceros ("Minimal producto", "Telco bold", "SaaS").
- Accesibilidad: con marcas de primario claro (p. ej. amarillo) los textos de acento usan la tinta de la marca para mantener el contraste.
- Corrección: el bloque "Multipaso" mostraba todas las opciones en un único botón (separaba por "|" en vez de por comas).
- Tests: galería en el smoke test y `tests/shots-v4.js` para capturar todas las plantillas en escritorio y móvil.

## v3.1 — 2026-09-29 · Fase 2 (UX del editor)
- Autoguardado: borrador local continuo con recuperación al abrir + sincronización en la nube a los 15 s si la landing ya existe. Indicador de estado y aviso al cerrar con cambios sin subir.
- Historial de versiones en Supabase (`landing_versions`, máx. 30 por landing) con restaurar. Requiere `supabase-migration-v3.1.sql`; sin ella todo sigue funcionando y avisa.
- Atajos: Ctrl+S, Ctrl+D, Ctrl+C/V de secciones entre landings, Supr, Alt+↑/↓, H, Esc, ? (también con el foco dentro del preview).
- Ocultar sección sin borrarla (se ve atenuada en el preview y no se exporta).
- Exportar / importar el proyecto como `.nc.json`.
- Mis landings: buscador, filtro por marca, fecha relativa, marca la abierta y acceso a versiones.
- Seguridad: los nombres de landing se escapan (antes permitían inyectar HTML).
- “Nueva landing” ya no arrastra teléfono, endpoint ni GTM del cliente anterior.
- Corrección: lo que se guarda es una copia congelada del estado en el momento de pulsar Guardar.
- Tests: `tests/e2e-workspace.js` con un Supabase simulado.

## v3.0 — 2026-09-29 · Fase 0 + Fase 1

### Fase 0 · Cimientos
- `index.html` (235 KB) separado en `css/app.css` + 12 archivos en `js/`. Sin build. Verificado: el HTML exportado es idéntico en 127 casos (20 plantillas, 73 bloques, 33 marcas).
- Nuevo `api/figma.js`: el importador de Figma llamaba a un proxy que no existía.
- `vercel.json` con cabeceras de seguridad; `.gitignore`; `.vercelignore`.
- La plantilla “Cliente · Prosegur (real)” se oculta si falta `plantillas/prosegur.html`.
- Tests en `tests/` (smoke del editor, E2E de la landing exportada, validación HTML).

### Fase 1 · Calidad del export
- Formularios: atribución UTM + click IDs, casilla RGPD enlazada (también en las casillas que ya traían los bloques, que antes no se enviaban por no tener `name`), primera capa informativa, honeypot, teléfono español con espacios/+34, autocomplete, `aria-label`, “Enviando…”, error real y URL de gracias opcional.
- El multipaso ahora envía las respuestas en `respuestas_quiz` (antes solo iban al dataLayer).
- Consent Mode v2 con banner Aceptar / Rechazar / Configurar y enlace “Configurar cookies”. Antes GTM cargaba sin consentimiento y “Rechazar” solo ocultaba el banner.
- Eventos: `click_to_call`, `whatsapp_click`, `form_start`, `generate_lead` (con `user_data` y `delivery`), `form_error`, `consent_update`.
- SEO: robots, canonical real (se elimina el placeholder `{{URL_CANONICA}}`), Open Graph/Twitter, favicon, theme-color, FAQPage, contador de caracteres en título y description.
- Rendimiento: imágenes del hero y del navbar sin lazy-load, `fetchpriority="high"` + preload del hero, `decoding="async"`.
- Checklist pre-export y nuevo botón `HTML ↓` (archivo único para FTP).
- Correcciones: `id="form"` duplicado cuando hay dos formularios, `title` en el iframe de GTM, los ajustes de una landing ya no se mezclan con los de la anterior al abrirla desde “Mis landings”.

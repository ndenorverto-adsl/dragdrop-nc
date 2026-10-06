# Changelog

## v4.9 — 2026-10-06 · Tema claro y oscuro de la herramienta
- Botón **☾ / ☀ / ◐** en la barra superior (junto a ⌨): **Oscuro** (el de siempre), **Claro** y **Automático** (sigue el modo del sistema). Se recuerda en el navegador y se aplica antes de pintar la página, sin parpadeo.
- Solo cambia la interfaz del builder (barra, paneles, modales, galería, CRO, publicar, velocidad, lote…); la landing se ve siempre con su marca y su estilo.
- Todos los colores de la interfaz pasan a variables (avisos, guardado, CRO, toasts, barras de scroll, miniaturas); los controles nativos (selects, scroll) siguen el tema con `color-scheme`. Arreglado de paso el texto de ayuda de «Del equipo», que salía sin estilo.

## v4.8.1 — 2026-10-06 · Personalizar todo: marca, colores del estilo y colores por bloque
- **Marca editable completa**: «Duplicar en marca editable» copia ahora todo (principal, acento, texto, texto secundario, **texto de los botones**, líneas, fondo suave, color oscuro de base, fuentes y radios de botón y tarjeta). Antes, al duplicar Jazztel 2026 los botones amarillos salían con texto blanco. El tema editable gana 4 colores: texto secundario, texto de los botones, líneas y bordes, y color oscuro de base.
- **Global → «Colores del estilo Escaparate»** (aparece con ese estilo o si la landing usa sus bloques): fondo de página, tarjetas y filas, menú, bloque del teléfono, negro principal y su texto, borde de tarjetas y campos, banda gris de tarifas, sección oscura y sus tarjetas, pie, barra legal, barra fija y grosor de los titulares. Vacío = valor del estilo; botón para restablecer.
- **Estilo → «Colores del bloque»** en los 6 bloques de Escaparate (hero promo, tarifas con pestañas, dispositivos, extras, cobertura con pestañas y barra fija): cada parte con su color (tarjeta, caja de producto, etiquetas, formulario, opciones, botón, cabeceras, cuota, fondo de la sección oscura, barra, pestaña lateral…). Vacío = los de la marca y el estilo.
- El estilo Escaparate usa ahora **las fuentes de la marca** (o la tipografía global), así que cambiar la fuente se ve al momento. El texto de la tarjeta del hero sigue al «texto de los botones» de la marca para que siempre se lea sobre el color principal.
- Comprobado: duplicado de marca, tokens y colores por bloque aplicados en el export, las 2 plantillas Jazztel × 33 estilos sin desbordes, 50 plantillas con Escaparate, HTML válido y `npm test` OK.

## v4.8 — 2026-10-06 · Estilo «Escaparate», marca Jazztel 2026 y plantillas Jazztel (literal y con placeholders)
- **Marca «Jazztel 2026»** (Clientes NC), sacada de desarrollo.mijazztel.com: amarillo #FFCD00 (botones con texto negro), magenta #DA1884 de acento, negro y gris #F3F3F3; Gotham → **Montserrat**; botones de 8 px. La marca «Jazztel» anterior (verde) se mantiene para las landings que ya la usan.
- **Estilo «Escaparate»** (categoría nueva «Retail y telco», 33 estilos): bloques planos de color sobre gris claro, titulares en negro muy grueso, pestañas píldora, tarjetas con borde negro, barra superior de acento que se desplaza en escritorio, menú en negrita con el teléfono en bloque gris, FAQ en filas blancas con flecha de acento y pie gris con barra legal negra. Toma los colores de cualquier marca y funciona con todas las plantillas.
- **7 bloques nuevos**:
  - **Hero promo + formulario lateral**: tarjeta de color con etiqueta, titular con parte destacada, caja de producto, precio grande con decimales volados y etiqueta negra, banda blanca con botón y hueco para foto recortada; a la derecha, formulario negro con opciones y tarjeta promo.
  - **Tarifas con pestañas**: pestañas píldora agrupadas por el campo «Pestaña», tarjetas con borde, etiqueta, círculo de descuento, banda gris y precio grande.
  - **Dispositivos con cuota**: cabecera de color, cuota en bloque de acento, plazo y foto; carrusel deslizable en móvil.
  - **Extras con precio** (TV y servicios): sección oscura, tarjetas negras con precio y botón; las que ocupan todo el ancho van en horizontal.
  - **Ventajas en mosaico de colores**: color por ventaja (marca, acento, negro, gris, blanco o #hex) y foto opcional a la izquierda.
  - **Barra fija de contacto** abajo (cobertura + «¿Tienes dudas?» + botón) con botón flotante WhatsApp / Te llamamos; en móvil queda compacta.
  - Anclas para el menú (#tarifas, #moviles, #tv) y el bloque de cobertura gana `#cobertura`.
- **Plantilla «Cliente · Jazztel 2026 (distribuidor)»**: la estructura de la web nueva con la marca y el estilo cargados. **Todo el copy, precios, logos y fotos son `{{PLACEHOLDER}}` o huecos para subir**; los logos de plataformas de TV no se incluyen (súbelos solo si tenéis permiso).
- **Plantilla «Cliente · Jazztel 2026 · web literal»** (151): réplica de desarrollo.mijazztel.com con sus **textos, precios, teléfono (91 924 80 83) y WhatsApp (34 645 601 420)**, las 10 FAQ con sus respuestas y las **imágenes enlazadas desde la propia web** (logo, presentador, banner de terminales, móviles, tarjetas de TV, iconos). Al cargarla aplica la marca Jazztel 2026 y el estilo Escaparate, y rellena teléfono y WhatsApp solo si estaban vacíos. Todo editable: textos en cada bloque, colores en la marca (o «Marca propia») y en Estilo de cada sección.
- **Cobertura con pestañas** (bloque nuevo): «Por número de teléfono», «Por mi dirección» (teléfono, calle, número y código postal) y «Llamando gratis» (botón con el teléfono global); cada formulario llega con su `origen`.
- **Barra fija**: pestaña lateral opcional («Volver a ofertas»). **Hero promo**: imagen en la banda blanca y banner completo en la tarjeta promo. **Extras**: nombre + logo en las tarjetas anchas, `*parte*` en color propio y `_parte_` en fino. **Mosaico**: iconos como imagen (URL). **Pie con columnas**: título de la columna de contacto editable. **FAQ**: « ¶ » dentro de una respuesta = salto de línea.
- Comprobado: las 2 plantillas Jazztel × 33 estilos × móvil/escritorio sin desbordes ni errores, las 150 plantillas con el estilo Escaparate sin desbordes, pestañas (tarifas y cobertura), anclas, teléfono y WhatsApp funcionando, HTML válido y `npm test` OK.

## v4.7 — 2026-10-05 · Elementos de diseño web y efectos por sección
- **Nuevo grupo «Elementos de diseño web»** en el panel izquierdo (17 bloques, con miniatura y vista previa al pasar el ratón):
  - **Básicos**: separador o espacio (línea, puntos, ola, zigzag, desvanecido o solo aire, con texto opcional), lista con iconos (1-3 columnas, 4 formas de icono), insignias, aviso destacado (marca, info, ok, atención u oscuro), **tabla** (columna destacada, ✓/✗ automáticos; en móvil desliza o se convierte en tarjetas), **vídeo** (YouTube sin cookies, Vimeo o MP4; solo carga al pulsar) y **mapa** (dirección, horario, teléfono y «Cómo llegar»; Google Maps solo se carga al pulsar, así no frena la página ni pone cookies antes de tiempo).
  - **Interactivos**: **pestañas** accesibles (teclado y lectores de pantalla), **carrusel** (tarjetas, solo imagen o texto sobre la foto; 1-4 por vista, flechas, puntos y autoplay opcional que se para al pasar el ratón), **antes / después** con tirador, **condiciones en ventana** (letra pequeña en un `<dialog>` sin salir de la página) y **cifras que cuentan** al aparecer (solo las cifras numéricas reales; los `{{PLACEHOLDER}}` no se animan).
  - **Secciones**: logos de clientes (solo los que subas; fila o carrusel continuo, en gris o color), **equipo**, **galería** (cuadrícula, mosaico o destacada, con ampliación y flechas), **CTA con imagen de fondo** y formulario, y **pie con columnas** (logo, texto, columnas de enlaces, contacto, redes como texto y legales).
  - Eventos en el dataLayer: `tab_select`, `video_play`, `map_load`, `conditions_open`, `beforeafter_use`. El CSS y el JS de estos bloques solo se exportan si la landing los usa.
- **Estilo → Efectos** en todos los bloques v4: **sombra** de tarjetas (suave, media, marcada o resplandor de marca), **esquinas** (rectas a muy redondeadas), **borde** (fino o de marca), **tarjetas de cristal** con desenfoque (claras sobre fondo claro, translúcidas con texto blanco sobre fondo oscuro), **hover** (elevar, resplandor o ampliar), **forma del borde superior/inferior** (ola, curva, diagonal o zigzag, que se monta sobre la sección vecina sin tapar su contenido) y **forma de las imágenes** (redondeadas, círculo, arco, orgánica o corte diagonal). Fondos nuevos: **Degradado de marca**, **Malla de color** y **Trama de puntos**. Las animaciones de entrada siguen en Estilo → Animación.
- **2 plantillas de muestra** (149 en total): *Elementos web · Fibra con pestañas* (Neobanco) y *Elementos web · Reforma con galería* (Editorial).
- Comprobado: interacción de pestañas, carrusel, antes/después, ventana, vídeo, mapa, galería y contadores; las 2 plantillas × 32 estilos × móvil/escritorio sin desbordes ni errores; edición en el lienzo de los textos nuevos; HTML válido; `npm test` OK.

## v4.6.1 — 2026-10-02 · Favicon
- Favicon del builder: tres bloques de landing apilándose (el último, en lima, entrando) sobre el morado de Next Conversion. `favicon.svg` (escala a cualquier tamaño y aclara el fondo en modo oscuro), `favicon.ico` (16/32/48), `icons/apple-touch-icon.png` (180), iconos 192/512 + versión *maskable* y `site.webmanifest` para instalarlo como app.

## v4.6 — 2026-10-02 · Edición en el lienzo, publicar, lote CSV, velocidad y diseño nuevo
- **Edición en el lienzo**: doble clic en cualquier texto de la vista previa para escribir ahí mismo (Intro guarda, Esc cancela; funciona en titulares, partes destacadas, tarifas, ventajas, FAQ, botones… y en los placeholders). Doble clic en una imagen o **soltar una foto del ordenador encima** para cambiarla. La barra de la sección gana ✎ Contenido y 🎨 Estilo. Seleccionar una sección ya no recarga la vista previa (va más rápido).
- **🚀 Publicar**: sube la landing por **FTP/FTPS** a la carpeta que elijas o la despliega como proyecto en **Vercel**, con **vista previa para el cliente** (copia con noindex) y el enlace listo para copiar. Las credenciales viven solo en variables de entorno de Vercel (`NC_PUBLISH_TARGETS`), se exige sesión del builder y, opcionalmente, email permitido. Las imágenes y fuentes en base64 se separan a `assets/`. Historial de las últimas publicaciones en la landing.
- **🗂 Lote desde CSV**: una fila = una landing. `slug` da la carpeta; el resto de columnas rellena el `{{PLACEHOLDER}}` del mismo nombre; columnas especiales `tel`, `wa`, `titulo`, `descripcion`, `gtm`, `endpoint` y `tipo.campo` (p. ej. `da_hero.headline`). Avisa de placeholders sin columna y slugs repetidos, descarga un **ZIP con una carpeta por fila** (+ `indice.csv`) o **publica el lote** directamente. CSV de ejemplo con las columnas de la landing.
- **⚡ Velocidad**: nota 0-100 y tiempo estimado en 4G con peso total, imágenes, imagen principal (LCP), fuentes, CSS/JS y DOM; arreglos con un clic (**optimizar imágenes a WebP**, volver a las fuentes de la marca, bajar animaciones). Las fotos se **optimizan al subirlas** (WebP, máx. 2000 px). Schema **Organization + WebPage** automático (solo con datos reales) y aviso de peso en la checklist.
- **4 bloques interactivos**: **Comparador de tarifas con filtros** (y orden por precio), **Configura tu pack** con total en vivo (llega como `pack`/`pack_total` o al popup/WhatsApp con el pack), **Pide cita** con días laborables y franjas (`cita_dia`, `cita_hora`) y **Testimonios en vídeo** con portada y play (YouTube sin cookies, Vimeo o MP4; solo carga al pulsar, con subtítulos). Eventos en el dataLayer.
- **3 estilos nuevos «Tendencias 2026»** (32 en total): **Ácido**, **Tipográfico** y **Crudo**.
- **5 sectores nuevos**: Agua, Reformas, Seguro de coche, Teleasistencia y Empresas, con sus 15 plantillas Sector × canal y **12 plantillas nuevas** con los bloques interactivos (147 en total). El filtro de sector del panel izquierdo los incluye.
- Comprobado: 147 plantillas × 3 estilos nuevos × móvil/tablet/escritorio y las 27 nuevas × 10 estilos anteriores sin desbordes ni errores; publicación probada contra un FTP real local y una API de Vercel simulada; HTML válido.

## v4.5 — 2026-10-01 · Conversión fiel a bloques, tipografía global, estilos "Producto y tech" y panel por objetivo
- **Importar → «Convertir a bloques editables»** (sustituye a «Traducir»): la página se pinta en un iframe oculto a 1280 px sin scripts y se lee el DOM ya renderizado (visibilidad real, tamaños, colores y fuentes calculadas). Detecta navegación (logo aunque sea fondo CSS, texto junto al logo, enlaces y teléfono), barra superior, **hero** (titular con su parte destacada, etiqueta, precio con unidad y nota, ventajas, cuenta atrás, CTA y formulario con sus **opciones**), **tarifas** (etiquetas, precios partidos tipo «23’ 99 €/mes», características y botón), **ventajas con sus iconos**, **imagen + texto**, **FAQ con las respuestas reales** (también acordeones a medida), opiniones, pasos, tablas comparativas, barra de cifras, CTA con formulario y **footer** (logo, razón social y teléfono). Descarta modales, cookies, textos legales y widgets flotantes (WhatsApp y barra fija pasan a ser los nativos, medibles).
- Los **fondos de cada sección** se conservan (color, degradado o imagen) con texto claro u oscuro automático, y la **marca** se extrae a «Marca propia»: color principal y de acento de los botones, tinta, fondo suave, radios de botón y tarjeta y color del texto del botón. El teléfono detectado se aplica en Global (se avisa por si usáis número de tracking). Al terminar sale un informe con todo lo que se ha reconocido.
- **Tipografía global** (Global → Tipografía): titulares, texto y **display** (titular del hero, precios y cifras) con cualquier Google Font o una **fuente subida** (.woff2/.woff/.ttf/.otf); mandan sobre la marca y sobre cualquier estilo. 8 parejas rápidas. Las fuentes comerciales detectadas al importar se cambian por su **equivalente libre** (Druk → Anton / Archivo Black, SF Pro/Helvetica → Inter, Gotham → Montserrat, Avenir → Nunito Sans…).
- **Estilo de sección**: fondos «Color propio» e «Imagen o degradado» (encaje, color de respaldo y texto claro/oscuro); en móvil se añade un velo para que el texto se lea sobre la foto.
- Bloques A ampliados: opciones en el formulario del hero (chips «Fibra | Móvil* | TV» que llegan como `interes`), cuenta atrás dentro del hero, menú y texto junto al logo en la nav, acción al pulsar la barra superior, tarifas con «Destacar» independiente de la etiqueta e imagen por tarifa, ventajas con iconos en imagen y footer con logo y teléfono.
- **3 estilos nuevos «Producto y tech»** (29 en total): **Vitrina** (página de producto premium), **Neobanco** (fintech) y **Nocturno** (SaaS oscuro). Sin toques «a mano» por diseño.
- **4 bloques nuevos**: barra de producto fija con compra siempre visible, hero de producto centrado (con teléfono en el propio hero), «Lo esencial» en rejilla **bento** y cifras grandes con nota de fuente. Más **Imagen + texto** y **Texto** (también usados por el importador).
- **9 plantillas nuevas** (120 en total): Vitrina · Fibra premium / Alarma inteligente / Placas solares, Neobanco · Seguro en minutos / Tarifa de luz clara / Móvil digital, Nocturno · Fibra para empresas / Seguridad para negocios / Centralita en la nube.
- **Panel izquierdo por objetivo**: Cabecera y hero · Captar el lead · Precio y oferta · Confianza y prueba · Explicar y resolver dudas · Cierre (desplegables con contador que se recuerdan), **miniatura** en cada bloque y **vista previa real al pasar el ratón** con la marca y el estilo actuales, **favoritos ★** y **recientes**, y filtros de **sector** (el bloque entra con su copy), **canal** (entra con ese canal principal) y familia.
- Comprobado: 120 plantillas × 3 estilos nuevos × móvil/tablet/escritorio sin desbordes ni errores; plantillas nuevas × 10 estilos anteriores; HTML válido; conversión de finetwork-online.es revisada contra la original.

## v4.4 — 2026-09-30 · Animaciones y efectos
- **Global → Animaciones y efectos**: intensidad **Desactivadas / Sutil / Media / Llamativa** y 4 grupos que se activan por separado:
  - **Entrada al hacer scroll**: subir, fundido, zoom, desde la izquierda/derecha, cortina o enfoque (en "Automática" cada estilo elige la suya), con **tarjetas escalonadas**. Cada bloque puede cambiarla en **Estilo → Animación**. El hero solo se mueve, sin opacidad, para no retrasar la carga (LCP); barra fija, nav, WhatsApp y popups nunca se ocultan.
  - **Destacar textos, precios y cifras**: subrayado que se dibuja bajo la parte destacada, **cifras que cuentan** hasta su valor (solo números escritos; los {{PLACEHOLDER}} no se animan) y **palabras que rotan** en el titular (campo nuevo en los heros A, B y C).
  - **Llamar la atención al CTA**: reflejo al pasar el ratón, efecto al pulsar, **latido** del botón principal visible cada pocos segundos si nadie interactúa (Media/Llamativa), flecha que empuja y **sacudida** del formulario si falta un dato.
  - **Fondo y movimiento**: tarjetas flotantes y sellos que se mecen; parallax en la foto del hero e **inclinación 3D** de tarjetas (solo escritorio con ratón).
- Se respeta siempre **"reducir movimiento"** del sistema; si el JavaScript falla, el contenido se ve igual (nada queda oculto).
- En el editor la vista previa no se anima al editar; botón **▶ Reproducir animaciones** para verlas.
- Comprobado: 111 plantillas × 6 estilos × 4 tipos de entrada en móvil, sin desbordes y con todo visible tras el scroll.

## v4.3 — 2026-09-30 · Texto dinámico, horario de llamada, bloques CRO y biblioteca del equipo
- **Texto dinámico por keyword** (Global): reglas `palabras | titular | parte destacada | botón` que se aplican según `?kw=` o `utm_term` (configurable). Gana la primera regla que encaja; la keyword nunca se escribe en la página (solo elige el texto), así que no hay textos raros ni inyección. Lanza `dtr_match` y el lead llega con `dtr_regla`. Campo "Probar en la vista previa con…" para verlo en el editor.
- **Horario de llamada** (hora de Madrid): días, horario, sábado aparte y festivos (vienen los nacionales de fecha fija; añade Semana Santa y los autonómicos/locales). Fuera de horario se ocultan los botones de llamar (salvo en el footer), el formulario avisa de cuándo llamaremos ("mañana a partir de las 9:00"), el lead llega con `fuera_horario=si` y se lanza `hours_state`. Simulación abierto/cerrado en la vista previa.
- **Teléfono validado mientras se escribe** en todos los formularios (9 cifras, empieza por 6, 7, 8 o 9; admite +34/0034), con aviso accesible.
- **Bloques nuevos** en Extras CRO: **Popup de salida** (ratón hacia fuera en escritorio o subida rápida en móvil, una vez por visita, evento `exit_intent_show`), **Formulario en 2 pasos** (teléfono primero, luego nombre/CP opcionales, barra de progreso, evento `form_step`, casilla RGPD en el paso 2), **Nosotros vs. otros** (sin nombrar competidores) y **Banda de garantías**.
- 2 plantillas nuevas que los usan: **Conversión máxima · Telco** y **Conversión máxima · Alarmas** (111 en total).
- **Biblioteca del equipo**: botón ☁ en cada sección de Estructura para guardarla (nombre, cliente, etiquetas) y "☁ Guardar la actual como plantilla" en la galería. Los bloques aparecen arriba en la paleta ("Del equipo", con búsqueda por nombre, cliente o etiqueta) y las landings en el grupo **Equipo** de la galería. Se guarda en Supabase (tabla `team_blocks`, ejecuta `supabase-migration-v4.3.sql`) o, sin sesión, solo en el navegador. No se guardan teléfono, endpoint ni GTM.
- La puntuación CRO avisa si el texto dinámico está activo sin reglas y si hay botones de llamada sin horario.

## v4.2 — 2026-09-30 · Tablet, fotos por sector, test A/B y 6 estilos más
- **Tablet (768-991 px)**: 3 tarifas en una sola fila (antes quedaba una huérfana), márgenes laterales de 28 px, visuales del hero contenidos (16:10, máx. 380 px), formularios de una línea y ritmo vertical intermedio. Las secciones con composición editorial (título a un lado, contenido al otro) ya no pierden el margen lateral en tablet.
- **Móvil**: los carruseles (tarifas, opiniones, ventajas) llevan **indicador de puntos** que sigue al desplazamiento.
- **Fotos libres por sector** en el campo Foto de los heros: Telco, Energía, Alarmas, Seguros, Salud y Legal (4-5 por sector). Todas con licencia Unsplash gratuita y comprobadas en su ficha (descripción, autor y licencia). Al elegir una se rellena el texto alternativo. Sustituyen a las 5 fotos genéricas anteriores.
- **Exportar A/B (botón “A/B ↓”)**: descarga un ZIP con `a/index.html` (original) y `b/index.html` (con la idea A/B aplicada), cada uno con `ab_test`/`ab_variant` en el dataLayer (evento `ab_view`) y como campos ocultos del lead, más un README con cómo repartir el tráfico en Google Ads/Meta y medir en GA4.
- **6 estilos nuevos** (26 en total): **Postal** (sellos, matasellos, correo aéreo), **Azulejo** (mosaico mediterráneo), **Ficha técnica** (etiqueta de producto), **Memphis** (años 80), **Industrial** (chapa, remaches, stencil, cinta de peligro) y **Píxel** (8 bits).
- **12 plantillas nuevas** en la colección Estilos (109 en total): Carta · Seguro de hogar, Carta · Teleasistencia, Mosaico · Placas solares, Mosaico · Luz de tu zona, Ficha · Compara tarifas, Ficha · Tarifa de luz, Memphis · Tarifa móvil, Memphis · Oferta flash, Taller · Alarma para negocios, Taller · Autoconsumo empresas, Píxel · Fibra para jugar y Píxel · Quiz gamer.
- Corregido: las opciones del multipaso en “Solo llamada · Teleasistencia” y “Profesional · Clínica” salían en un solo botón (separador “,” en lugar de “|”).

## v4.1 — 2026-09-30 · Puntuación CRO e ideas A/B
- **Botón “📈 CRO”** en la barra superior: mide la landing exportada en **móvil (390×844)** y **escritorio (1440×900)** y le da una nota de 0 a 100, repartida en 4 bloques:
  - **Above the fold**: titular visible, titular de 12 palabras o menos, botón de acción en el primer pantallazo (móvil y escritorio), formulario o teléfono a la vista y barra fija en móvil.
  - **Datos pendientes**: teléfono, WhatsApp, endpoint del formulario y placeholders sin rellenar (con la lista).
  - **Fricción y CTAs**: campos del formulario, botones por pantalla, textos genéricos (“Enviar”, “Más info”…), coherencia del mensaje, zonas táctiles de menos de 40 px y canales disponibles.
  - **Confianza y técnica**: prueba social, RGPD, contraste WCAG del titular, subtítulo y botón, peso del HTML, texto alternativo, SEO y GTM con consentimiento.
  - Cada aviso tiene su botón: **Corregir** (lleva al campo), **Añadir** (inserta la barra fija u opiniones) o **Ideas A/B**. La nota queda en el botón de la barra.
- **Ideas A/B de titular y botón** en el panel de cada hero (A, B y C): 5 ángulos (**beneficio, precio, urgencia, confianza y sencillez**) por sector (Telco, Energía, Alarmas, Seguros, Salud, Legal o genérico), con botones según el canal. Se aplica el titular, el botón o los dos, y **“Volver al original”** recupera la versión A. Las cifras, fechas y precios salen como {{PLACEHOLDER}}.

## v4.0 — 2026-09-30 · 11 estilos nuevos y colección de plantillas por estilo
- **20 estilos de diseño** (antes 9), agrupados en el panel Global por categoría: **Editorial**, **Gráfico**, **Hecho a mano** y **Carácter**. Los nombres largos ya no se cortan.
  - Editorial: **Revista** (Didone Playfair, cursivas y pie de foto) y **Expediente** (casillas, referencia, sello de tinta; para legal y seguros).
  - Gráfico: **Bauhaus** (círculo, cuadrado y triángulo), **Cartel tipográfico** (Anton gigante sobre el color de la marca), **Señalética** (rótulos, franjas de aviso, pictogramas en placa) y **Plano técnico** (milimetrado, cotas y marcas de corte).
  - Hecho a mano: **Risografía** (dos tintas, registro desplazado) y **Ticket de caja** (monoespaciada, bordes dentados, código de barras).
  - Carácter: **Años 70** (serif redonda, arcos y franjas), **Cómic pop** (bocadillos, trama de puntos, explosión de precio) y **Terminal** (modo oscuro, prompts, cursor y ventanas; el popup y los avisos siguen en claro).
  - Como siempre, los colores salen de la marca; cada estilo solo aporta papel, tipografía y oficio. Cada uno elige sus variantes automáticas (tarifas, opiniones, FAQ, CTA, pasos, footer) y su voz.
- **Colección "Estilos"** en la galería: 22 plantillas nuevas que nacen con su estilo (dos por estilo nuevo), p. ej. Portada · Salud, Estudio de caso · Legal, Cartel flash · Telco, Rótulo · Alarmas, Plano · Placas solares, Ticket · Tu factura, Viñeta · Quiz de fibra o Consola · Fibra empresas. En total, **97 plantillas**.
- Galería: chip **"Su estilo"** (por defecto) para ver cada plantilla con su estilo sugerido; el resto de chips siguen forzando un estilo concreto.
- Corregido: el CTA final en variante "dos columnas" o "titular grande" en páginas de la dirección B/C salía sin estilos de tarjeta y botón.
- Tests: `shots-looks.js` acepta `SHOTS_VP` y `NOSHOT=1` para barridos de desbordes en móvil y tablet.

## v3.9 — 2026-09-30 · 33 plantillas por caso de uso
- **Grupo nuevo "Casos de uso"** en la galería, con 4 familias filtrables:
  - **Conversión rápida** (10): una pantalla (Telco, Energía, Alarmas), solo llamada (Telco, Seguros, Teleasistencia), oferta flash (Telco, Energía) y páginas de gracias (llamada y WhatsApp).
  - **Cualificación** (10): quiz de 3 preguntas (Alarmas, Seguros, Salud, Placas solares), comparador (Telco, Energía), calculadora (Energía, Telco) y cobertura (Telco, Alarmas).
  - **Contenido que vende** (7): advertorial etiquetado como publicidad (Energía, Legal, Alarmas), historia larga (Seguros, Legal) y guía descargable (Energía, Seguros).
  - **Confianza local** (6): instalador local (Alarmas, Placas solares), profesional (Abogado, Clínica) y reseñas primero (Telco, Alarmas).
- **Bloques nuevos**: quiz de varios pasos, advertorial (párrafos, subtítulos, citas y caja de CTA), historia en filas, guía descargable (email + teléfono opcional), zona de servicio, profesional, resumen de valoraciones y página de gracias (lanza `thank_you_view`).
- En total, 75 plantillas; cada una se puede ver con los 9 estilos.
- Los titulares con palabras muy largas ya no desbordan en los estilos de tipografía ancha.

## v3.8 — 2026-09-30 · Popup en los botones
- **Acción por botón**: el hero, las tarifas, el CTA oscuro de la dirección C, la calculadora y la barra fija tienen **"Al pulsar el botón"**, con estas opciones: como el ajuste global, ir al formulario, abrir el popup, llamar o WhatsApp. Los botones **"La quiero" de las tarifas abren el popup por defecto**.
- **Popup nuevo** que se viste con el estilo de diseño activo (cupón en Prensa, cinta en Cuaderno…). En móvil sube desde abajo como una hoja.
  - Muestra la **tarifa elegida** (nombre y precio) y la envía con el lead en el campo oculto `tarifa`.
  - Incluye el formulario de callback con RGPD, atribución y eventos, más los botones de **llamar** y **WhatsApp**. El de WhatsApp lleva un mensaje con la tarifa.
  - Evento `popup_open` en el dataLayer (con la tarifa).
- Global → **Popup de los botones**: título, texto y botón (con la voz del estilo si los dejas vacíos), e interruptores para la tarifa, llamar y WhatsApp.
- El popup antiguo con imagen sigue disponible como "Popup antiguo con imagen".

## v3.7 — 2026-09-30 · Variantes de bloques y extras CRO
- **Variantes nuevas** (campo "Variante"; en "Automática" cada estilo elige la suya):
  - **Tarifas**: tarjetas, comparador en tabla (carrusel en móvil) y filas.
  - **Opiniones**: tarjetas, cita destacada con lista y muro de opiniones.
  - **Preguntas frecuentes**: acordeón o abiertas en 2 columnas.
  - **CTA final**: banda, dos columnas con tarjeta y teléfono grande, o titular grande con formulario.
  - **Cómo funciona**: columnas o línea de tiempo.
  - **Footer**: una línea o en columnas (marca, contacto y legal).
- **Bloques "Extras CRO"** que heredan el estilo de diseño:
  - **Cobertura por código postal**: pide CP y teléfono y se envía como lead, sin prometer una comprobación automática.
  - **Calculadora de ahorro**: solo calcula si pones el % real del cliente.
  - **Garantía**.
  - **Cuenta atrás de la oferta**: con fecha real, o placeholder si no la hay.
  - **Nota del equipo**: mensaje firmado por una persona real, en papel rayado.
  - **WhatsApp flotante**: se aparta en móvil cuando hay barra fija.
- Corrección: en composición editorial, los titulares con clase `text-center mb-5` se partían en dos columnas.

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

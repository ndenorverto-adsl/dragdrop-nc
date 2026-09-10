# NC Landing Builder

Herramienta drag & drop para crear landings de conversión (Bootstrap 5.3.3) y exportarlas como HTML listo para FTP/Vercel. Frontend estático (`index.html`) + **Supabase** como backend (login de equipo, guardado de landings, imágenes en Storage). Despliegue en **Vercel** desde **GitHub**.

## Estructura

- `index.html` — la aplicación completa (builder).
- `config.js` — tus claves de Supabase (créalo a partir de `config.example.js`).
- `config.example.js` — plantilla de configuración.
- `supabase-schema.sql` — tablas, RLS y bucket de imágenes.
- `vercel.json`, `.gitignore`.

---

## Puesta en marcha (≈10 min)

### 1. Supabase
1. Entra en https://supabase.com → **New project**. Anota la contraseña de la base de datos.
2. Cuando esté listo, ve a **Project Settings → API** y copia:
   - **Project URL** (`https://xxxx.supabase.co`)
   - **anon public** key (la `anon`, no la `service_role`).
3. Ve a **SQL Editor → New query**, pega **todo** el contenido de `supabase-schema.sql` y pulsa **Run**. Esto crea la tabla `landings`, su RLS y el bucket público `landings-assets`.
4. Crea el **usuario de equipo** (login compartido): **Authentication → Users → Add user** → email + contraseña. Ese email/contraseña es el que usaréis todos para entrar.
   - Si aparece pidiendo confirmación de email, desactiva la confirmación en **Authentication → Providers → Email → Confirm email = off**, o confirma el usuario manualmente.

### 2. Configuración
1. Copia `config.example.js` a **`config.js`**.
2. Pega tu **Project URL** y tu **anon key**. Deja `BUCKET: "landings-assets"`.
   - La anon key es **pública por diseño** (RLS protege los datos): es correcto commitearla. **Nunca** pongas aquí la `service_role`.

### 3. GitHub
1. Crea un repositorio nuevo en GitHub (privado recomendado).
2. Sube estos archivos (incluido tu `config.js` ya relleno):
   ```bash
   git init
   git add .
   git commit -m "NC Landing Builder"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
   git push -u origin main
   ```

### 4. Vercel
1. Entra en https://vercel.com → **Add New → Project** → importa el repo de GitHub.
2. **Framework Preset: Other** (es estático, sin build). Deploy.
3. Abre la URL que te da Vercel, entra con el **usuario de equipo** y listo.

---

## Uso

- **Guardar / Mis landings:** guarda el proyecto actual en Supabase y recupera cualquiera desde “☁ Mis landings”.
- **Imágenes:** se suben al bucket `landings-assets` y se referencian por URL (HTML exportado ligero).
- **Exportar HTML:** genera el `.html` autocontenido (Bootstrap por CDN) listo para FTP.
- **Sin `config.js`** (p. ej. abriendo el archivo en local sin claves): funciona en **modo local** — sin nube y con imágenes en Base64.

## Notas de seguridad

- Login **compartido de equipo**: todos usan la misma cuenta; con RLS `authenticated`. Si en el futuro quieres separar por usuario, se cambia la policy a `user_id = auth.uid()` y se añade la columna.
- El bucket es **público en lectura** (necesario para que las imágenes se vean en las landings publicadas). La escritura requiere estar autenticado.

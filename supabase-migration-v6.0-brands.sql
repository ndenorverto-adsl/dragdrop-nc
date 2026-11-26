-- ============================================================
-- v6.0 · Registro único de marcas (nc_brands)
-- Copia de OneDrive/Documents/023_Brandbooks_Clientes/registro-marcas/schema.sql
-- Después, cargar los datos con seed.sql de esa misma carpeta.
-- ============================================================
-- =====================================================================
-- Registro único de marcas · nc_brands
-- Una fila por marca. La leen el Landing Builder (y, más adelante,
-- Creative Studio, popups y Figma → Bootstrap) en lugar de tener cada
-- uno su copia de colores, tipografías y logos.
--
-- Ejecutar en el proyecto Supabase del Landing Builder:
--   Supabase > SQL Editor > New query > pegar > Run
-- Se puede ejecutar varias veces sin romper nada. Después, ejecutar seed.sql.
-- =====================================================================

create table if not exists public.nc_brands (
  id            text primary key,              -- slug: 'jazztel', 'nc', 'assista'
  builder_key   text unique,                   -- clave en el Landing Builder: 'c_jazztel', 'nc'
  name          text not null,
  grupo         text not null default 'Clientes NC',
  domain        text,
  subtype       text,                          -- afiliacion, operador, web propia…
  -- Tokens que usa el Builder: bp, bp2, ba, bink, bmuted, bsoft, line, btnr, cardr, btntext
  tokens        jsonb not null default '{}'::jsonb,
  font_head     text,
  font_body     text,
  colors        jsonb not null default '[]'::jsonb,  -- paleta del brand kit: [{hex, rol, confianza, origen}]
  texts         jsonb not null default '[]'::jsonb,  -- [{etiqueta, valor}] (CTA, teléfono, claim…)
  logos         jsonb not null default '[]'::jsonb,  -- [{name, variante, data_url}]
  note          text,
  verified_pct  int,
  active        boolean not null default true,
  updated_at    timestamptz not null default now(),
  updated_by    text
);

create or replace function public.nc_brands_touch()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  new.updated_by := coalesce(auth.jwt() ->> 'email', new.updated_by);
  return new;
end; $$;
drop trigger if exists nc_brands_touch on public.nc_brands;
create trigger nc_brands_touch before insert or update on public.nc_brands
  for each row execute function public.nc_brands_touch();

-- RLS
-- Lectura abierta (también sin login): son colores, tipografías, logos y
-- textos que ya están publicados en las webs de cada marca. Así el Builder
-- pinta las marcas antes de iniciar sesión y otras herramientas pueden leerlas.
-- Escritura: solo usuarios autenticados del equipo (mismo modelo que landings).
alter table public.nc_brands enable row level security;
drop policy if exists "brands_read"  on public.nc_brands;
drop policy if exists "brands_write" on public.nc_brands;
create policy "brands_read"  on public.nc_brands for select to anon, authenticated using (true);
create policy "brands_write" on public.nc_brands for all    to authenticated using (true) with check (true);

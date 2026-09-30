-- ============================================================
-- NC Landing Builder — esquema Supabase
-- Ejecuta todo esto en: Supabase > SQL Editor > New query > Run
-- ============================================================

-- 1) Tabla de landings (cada landing = el JSON del builder)
create table if not exists public.landings (
  id          uuid primary key default gen_random_uuid(),
  nombre      text default 'Sin título',
  marca       text,
  data        jsonb not null default '{}'::jsonb,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- 2) RLS: al ser login compartido de equipo, cualquier usuario autenticado accede
alter table public.landings enable row level security;
drop policy if exists "team_all" on public.landings;
create policy "team_all" on public.landings
  for all to authenticated using (true) with check (true);

-- 3) Bucket de imágenes (público para lectura)
insert into storage.buckets (id, name, public)
values ('landings-assets','landings-assets', true)
on conflict (id) do nothing;

-- 4) Políticas del bucket
drop policy if exists "assets_public_read"   on storage.objects;
drop policy if exists "assets_auth_insert"   on storage.objects;
drop policy if exists "assets_auth_update"   on storage.objects;
drop policy if exists "assets_auth_delete"   on storage.objects;

create policy "assets_public_read" on storage.objects
  for select using ( bucket_id = 'landings-assets' );
create policy "assets_auth_insert" on storage.objects
  for insert to authenticated with check ( bucket_id = 'landings-assets' );
create policy "assets_auth_update" on storage.objects
  for update to authenticated using ( bucket_id = 'landings-assets' );
create policy "assets_auth_delete" on storage.objects
  for delete to authenticated using ( bucket_id = 'landings-assets' );

-- 5) Historial de versiones (v3.1)
create table if not exists public.landing_versions (
  id          uuid primary key default gen_random_uuid(),
  landing_id  uuid not null references public.landings(id) on delete cascade,
  nombre      text,
  data        jsonb not null,
  created_by  text,
  created_at  timestamptz default now()
);
create index if not exists landing_versions_landing_idx
  on public.landing_versions (landing_id, created_at desc);

alter table public.landing_versions enable row level security;
drop policy if exists "team_all_versions" on public.landing_versions;
create policy "team_all_versions" on public.landing_versions
  for all to authenticated using (true) with check (true);

-- 6) Bloques y plantillas del equipo (v4.3)
create table if not exists public.team_blocks (
  id          uuid primary key default gen_random_uuid(),
  kind        text not null check (kind in ('section','landing')),
  nombre      text not null,
  cliente     text,
  etiquetas   text,
  data        jsonb not null,
  created_by  text,
  created_at  timestamptz default now()
);
create index if not exists team_blocks_created_idx on public.team_blocks (created_at desc);

-- Mismo modelo que landings: cualquier usuario autenticado del equipo lee y escribe
alter table public.team_blocks enable row level security;
drop policy if exists "team_all_blocks" on public.team_blocks;
create policy "team_all_blocks" on public.team_blocks
  for all to authenticated using (true) with check (true);

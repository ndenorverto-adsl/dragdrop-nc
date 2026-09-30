-- ============================================================
-- NC Landing Builder v4.3 — bloques y plantillas del equipo
-- Ejecuta en: Supabase > SQL Editor > New query > Run
-- ============================================================
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

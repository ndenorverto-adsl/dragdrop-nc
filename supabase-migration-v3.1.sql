-- ============================================================
-- NC Landing Builder v3.1 — historial de versiones
-- Ejecuta esto UNA vez en: Supabase > SQL Editor > New query > Run
-- (no borra ni modifica tus landings)
-- ============================================================
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

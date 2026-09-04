-- Recovery Together — core schema + RLS
-- Run this in Supabase SQL editor after project creation.

-- PUBLIC profile data (safe to show in community rooms)
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nickname text not null default 'Anonymous',
  avatar_seed text not null default 'RT',
  stage text not null default 'Preparing',
  support_need text,
  created_at timestamptz not null default now()
);

-- PRIVATE identity data — never joined into public queries
create table public.profile_private (
  id uuid primary key references auth.users(id) on delete cascade,
  real_name text,
  real_photo_url text,
  location text,
  reveal_identity boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.rooms (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  stage_label text not null,
  sort_order int not null default 0
);

insert into public.rooms (slug, name, stage_label, sort_order) values
  ('preparing', 'Preparing to Stop', 'Preparing', 1),
  ('day-1', 'Day 1', 'Day 1', 2),
  ('day-2-3', 'Day 2–3', 'Day 2–3', 3),
  ('day-4-7', 'Day 4–7', 'Day 4–7', 4),
  ('week-2-plus', 'Week 2+', 'Week 2+', 5),
  ('maintaining', 'Maintaining Recovery', 'Maintaining recovery', 6);

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.rooms(id) on delete cascade,
  author_id uuid not null references auth.users(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create table public.replies (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  author_id uuid not null references auth.users(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references auth.users(id) on delete cascade,
  target_type text not null check (target_type in ('post', 'reply')),
  target_id uuid not null,
  reason text,
  status text not null default 'open' check (status in ('open', 'reviewed', 'dismissed')),
  created_at timestamptz not null default now()
);

-- RLS
alter table public.profiles enable row level security;
alter table public.profile_private enable row level security;
alter table public.rooms enable row level security;
alter table public.posts enable row level security;
alter table public.replies enable row level security;
alter table public.reports enable row level security;

-- profiles: any authenticated user can read public profile fields; only owner can write
create policy "profiles readable by authenticated" on public.profiles
  for select using (auth.role() = 'authenticated');
create policy "profiles insert own" on public.profiles
  for insert with check (auth.uid() = id);
create policy "profiles update own" on public.profiles
  for update using (auth.uid() = id);

-- profile_private: ONLY the owner can read or write. No one else, ever.
create policy "profile_private owner only select" on public.profile_private
  for select using (auth.uid() = id);
create policy "profile_private owner only insert" on public.profile_private
  for insert with check (auth.uid() = id);
create policy "profile_private owner only update" on public.profile_private
  for update using (auth.uid() = id);

-- rooms: readable by anyone authenticated, no writes from clients
create policy "rooms readable by authenticated" on public.rooms
  for select using (auth.role() = 'authenticated');

-- posts: authenticated users can read all, insert their own, delete their own
create policy "posts readable by authenticated" on public.posts
  for select using (auth.role() = 'authenticated');
create policy "posts insert own" on public.posts
  for insert with check (auth.uid() = author_id);
create policy "posts delete own" on public.posts
  for delete using (auth.uid() = author_id);

-- replies: same pattern as posts
create policy "replies readable by authenticated" on public.replies
  for select using (auth.role() = 'authenticated');
create policy "replies insert own" on public.replies
  for insert with check (auth.uid() = author_id);
create policy "replies delete own" on public.replies
  for delete using (auth.uid() = author_id);

-- reports: users can insert their own reports, cannot read any reports (moderation reads via service role only)
create policy "reports insert own" on public.reports
  for insert with check (auth.uid() = reporter_id);

-- Enable Realtime on posts/replies
alter publication supabase_realtime add table public.posts;
alter publication supabase_realtime add table public.replies;

-- ── Cost-control tables (bootstrapped-first / AI-is-an-enhancement policy) ──

-- Single-row kill switch. Flip ai_onboarding_enabled in the Supabase Table
-- Editor (no redeploy, no code) to instantly turn the AI-assisted onboarding
-- on or off. Defaults OFF — V1 launches on the free keyword-based path.
create table public.app_config (
  id int primary key default 1,
  ai_onboarding_enabled boolean not null default false,
  updated_at timestamptz not null default now(),
  constraint singleton check (id = 1)
);
insert into public.app_config (id, ai_onboarding_enabled) values (1, false);

alter table public.app_config enable row level security;
create policy "app_config readable by anyone" on public.app_config
  for select using (true);
-- Intentionally no insert/update policy for anon/authenticated roles.
-- Aaron edits this row directly in the Supabase dashboard.

-- Per-IP, per-day counters for the AI onboarding call. Onboarding happens
-- before anonymous sign-in, so there is no user_id to key off yet — IP is
-- the only identifier available at that point. ip_hash stores a SHA-256
-- hash, never the raw IP, consistent with minimum-data-collection policy.
create table public.ai_rate_limit (
  ip_hash text not null,
  day date not null default current_date,
  count int not null default 0,
  primary key (ip_hash, day)
);
alter table public.ai_rate_limit enable row level security;
-- No policies for anon/authenticated at all: default-deny. The earlier
-- version of this table used "for all using (true) with check (true)",
-- which let any client read AND overwrite any row -- including resetting
-- its own counter to defeat the limit entirely. Fixed 2026-08-03 (see
-- DECISION_LOG.md). Reads/writes now only happen through the SECURITY
-- DEFINER function below, which the anon/authenticated roles may EXECUTE
-- but cannot use to touch the table directly.

create or replace function public.check_and_increment_ai_rate_limit(
  p_ip_hash text,
  p_per_ip_limit int,
  p_global_limit int
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_today date := current_date;
  v_ip_count int;
  v_global_count int;
begin
  select count into v_ip_count from public.ai_rate_limit
    where ip_hash = p_ip_hash and day = v_today;
  v_ip_count := coalesce(v_ip_count, 0);

  select count(*) into v_global_count from public.ai_rate_limit where day = v_today;

  if v_ip_count >= p_per_ip_limit or v_global_count >= p_global_limit then
    return false;
  end if;

  insert into public.ai_rate_limit (ip_hash, day, count)
  values (p_ip_hash, v_today, 1)
  on conflict (ip_hash, day) do update set count = ai_rate_limit.count + 1;

  return true;
end;
$$;

grant execute on function public.check_and_increment_ai_rate_limit(text, int, int)
  to anon, authenticated;

-- ── Per-author rate limiting on posts/replies/reports (prevents flooding
-- a room or spamming reports; DB-level, so it holds regardless of client) ──
create or replace function public.enforce_author_rate_limit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_limit int;
  v_window interval;
  v_count int;
begin
  if TG_TABLE_NAME = 'posts' then
    v_limit := 15; v_window := interval '10 minutes';
    select count(*) into v_count from public.posts
      where author_id = new.author_id and created_at > now() - v_window;
  elsif TG_TABLE_NAME = 'replies' then
    v_limit := 20; v_window := interval '10 minutes';
    select count(*) into v_count from public.replies
      where author_id = new.author_id and created_at > now() - v_window;
  elsif TG_TABLE_NAME = 'reports' then
    v_limit := 20; v_window := interval '1 hour';
    select count(*) into v_count from public.reports
      where reporter_id = new.reporter_id and created_at > now() - v_window;
  else
    return new;
  end if;

  if v_count >= v_limit then
    raise exception 'Rate limit exceeded for %, please slow down.', TG_TABLE_NAME;
  end if;

  return new;
end;
$$;

drop trigger if exists posts_rate_limit on public.posts;
create trigger posts_rate_limit before insert on public.posts
  for each row execute function public.enforce_author_rate_limit();

drop trigger if exists replies_rate_limit on public.replies;
create trigger replies_rate_limit before insert on public.replies
  for each row execute function public.enforce_author_rate_limit();

drop trigger if exists reports_rate_limit on public.reports;
create trigger reports_rate_limit before insert on public.reports
  for each row execute function public.enforce_author_rate_limit();

-- ---------------------------------------------------------------------------
-- Base table grants for anon / authenticated / service_role
-- ---------------------------------------------------------------------------
-- RLS policies only filter ROWS. Postgres still requires a base-level GRANT
-- on the table itself before RLS is even evaluated. This project had
-- `alter default privileges ... revoke ...` run against anon/authenticated/
-- service_role before this schema was first applied, which silently removed
-- the standard grants Supabase normally provisions for new tables. Without
-- this block, every anon/authenticated request fails with a hard
-- "permission denied for table X" instead of an RLS-filtered empty result.
-- Applied directly in production on 2026-08-04 (migration:
-- restore_base_table_grants); recorded here so schema.sql stays the source
-- of truth for a fresh environment.
grant usage on schema public to anon, authenticated, service_role;

grant select on public.app_config to anon, authenticated;
grant select on public.rooms to authenticated;
grant select, insert, update on public.profiles to authenticated;
grant select, insert, update on public.profile_private to authenticated;
grant select, insert, delete on public.posts to authenticated;
grant select, insert, delete on public.replies to authenticated;
grant insert on public.reports to authenticated;

grant all privileges on all tables in schema public to service_role;
grant all privileges on all sequences in schema public to service_role;
grant execute on all functions in schema public to service_role;

-- ---------------------------------------------------------------------------
-- Recovery journey & continuity model (2026-08-04)
-- ---------------------------------------------------------------------------
-- See PROJECT_BRIEF.md "Recovery journey & continuity model" for the design.
-- Applied to production via migration: recovery_journey_continuity.
alter table public.profiles
  add column if not exists stage_updated_at timestamptz not null default now(),
  add column if not exists last_active_at timestamptz not null default now();

alter table public.profile_private
  add column if not exists notify_email text;

-- Tracks per-room "last seen" so we can compute unread-reply counts on
-- return visits without any read-receipt/seen-indicator on individual
-- messages (explicitly ruled out in the design doc).
create table if not exists public.room_visits (
  user_id uuid not null references auth.users(id) on delete cascade,
  room_id uuid not null references public.rooms(id) on delete cascade,
  last_seen_at timestamptz not null default now(),
  primary key (user_id, room_id)
);

alter table public.room_visits enable row level security;

create policy "room_visits owner only select" on public.room_visits
  for select using (auth.uid() = user_id);
create policy "room_visits owner only insert" on public.room_visits
  for insert with check (auth.uid() = user_id);
create policy "room_visits owner only update" on public.room_visits
  for update using (auth.uid() = user_id);

grant select, insert, update on public.room_visits to authenticated;
grant all privileges on public.room_visits to service_role;

-- Guarantees the single non-judgmental re-engagement email is sent at most
-- once ever per person, regardless of cron timing drift.
alter table public.profile_private
  add column if not exists reengagement_sent_at timestamptz;

-- ---------------------------------------------------------------------------
-- Legality/news updates (2026-09-04)
-- ---------------------------------------------------------------------------
-- Real headlines only, fetched from public news RSS by the daily cron
-- (app/api/cron/daily-digest/route.ts) -- never AI-generated or hand-written,
-- consistent with never presenting fabricated activity/content as real. This
-- is uncurated external content: it's linked out, not vetted or endorsed
-- (see the disclaimer on the /updates page).
create table if not exists public.news_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  url text not null unique,
  source text,
  published_at timestamptz,
  fetched_at timestamptz not null default now(),
  query_tag text
);

alter table public.news_items enable row level security;

create policy "news_items readable by anyone" on public.news_items
  for select using (true);

grant select on public.news_items to anon, authenticated;
grant all privileges on public.news_items to service_role;

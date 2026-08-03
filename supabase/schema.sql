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

-- posts: authenticated users can read all, insert their own
create policy "posts readable by authenticated" on public.posts
  for select using (auth.role() = 'authenticated');
create policy "posts insert own" on public.posts
  for insert with check (auth.uid() = author_id);

-- replies: same pattern as posts
create policy "replies readable by authenticated" on public.replies
  for select using (auth.role() = 'authenticated');
create policy "replies insert own" on public.replies
  for insert with check (auth.uid() = author_id);

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
create policy "ai_rate_limit anon read/write" on public.ai_rate_limit
  for all using (true) with check (true);
-- Known tradeoff: an anon client could reset or spam its own counter row.
-- Worst case, that only pushes that caller onto the free keyword fallback
-- (fails toward the cheaper path, never toward risk). The real backstop is
-- the Hard Limit set in console.anthropic.com, which no client can touch.

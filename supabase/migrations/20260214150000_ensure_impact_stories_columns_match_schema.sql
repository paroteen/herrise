-- Ensure public.impact_stories has all columns from the canonical schema
-- (see 20260214000000_create_impact_stories.sql lines 5–18).
-- Adds only missing columns; does not change existing ones.
-- id is the primary key and already exists when the table exists.

alter table public.impact_stories
  add column if not exists title text not null default '',
  add column if not exists excerpt text not null default '',
  add column if not exists image text not null default '',
  add column if not exists date text not null default '',
  add column if not exists read_time text not null default '',
  add column if not exists location text not null default '',
  add column if not exists category text not null default '',
  add column if not exists author text not null default '',
  add column if not exists author_role text not null default '',
  add column if not exists content text not null default '',
  add column if not exists created_at timestamptz default now(),
  add column if not exists updated_at timestamptz default now();

-- Backfill any nulls in case columns were added nullable earlier
update public.impact_stories set title = '' where title is null;
update public.impact_stories set excerpt = '' where excerpt is null;
update public.impact_stories set image = '' where image is null;
update public.impact_stories set date = '' where date is null;
update public.impact_stories set read_time = '' where read_time is null;
update public.impact_stories set location = '' where location is null;
update public.impact_stories set category = '' where category is null;
update public.impact_stories set author = '' where author is null;
update public.impact_stories set author_role = 'Staff' where author_role is null;
update public.impact_stories set content = '' where content is null;

-- Enforce not null on text columns (no-op if already not null)
alter table public.impact_stories alter column title set not null;
alter table public.impact_stories alter column excerpt set not null;
alter table public.impact_stories alter column image set not null;
alter table public.impact_stories alter column date set not null;
alter table public.impact_stories alter column read_time set not null;
alter table public.impact_stories alter column location set not null;
alter table public.impact_stories alter column category set not null;
alter table public.impact_stories alter column author set not null;
alter table public.impact_stories alter column author_role set not null;
alter table public.impact_stories alter column content set not null;

notify pgrst, 'reload schema';

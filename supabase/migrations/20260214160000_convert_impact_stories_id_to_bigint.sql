-- If impact_stories.id is UUID (e.g. created via Table Editor), convert to bigint
-- so the app's numeric ids (1, 2, 3) work. No-op if id is already bigint.

do $$
declare
  col_type text;
begin
  select data_type into col_type
  from information_schema.columns
  where table_schema = 'public' and table_name = 'impact_stories' and column_name = 'id';

  if col_type = 'uuid' then
    -- Add new bigint column (no identity yet so we can backfill)
    alter table public.impact_stories add column if not exists id_new bigint;
    -- Assign deterministic row numbers
    with ordered as (
      select ctid, row_number() over (order by id) as rn
      from public.impact_stories
    )
    update public.impact_stories t
    set id_new = o.rn
    from ordered o
    where t.ctid = o.ctid;
    -- Swap columns
    alter table public.impact_stories drop constraint if exists impact_stories_pkey;
    alter table public.impact_stories drop column id;
    alter table public.impact_stories rename column id_new to id;
    alter table public.impact_stories add primary key (id);
    -- Sequence for new rows (use literal name so DEFAULT expression parses correctly)
    create sequence if not exists impact_stories_id_seq;
    perform setval('impact_stories_id_seq'::regclass, coalesce((select max(id) from public.impact_stories), 1));
    alter table public.impact_stories alter column id set default nextval('impact_stories_id_seq');
  end if;
end $$;

notify pgrst, 'reload schema';

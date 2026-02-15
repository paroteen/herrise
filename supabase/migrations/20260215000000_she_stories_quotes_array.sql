-- Add quotes as text[] to she_stories; backfill from existing quote column
alter table public.she_stories
  add column if not exists quotes text[] default array[]::text[];

update public.she_stories
set quotes = case
  when quote is not null and trim(quote) <> '' then array[trim(quote)]
  else array[]::text[]
end
where quotes is null or array_length(quotes, 1) is null;

comment on column public.she_stories.quotes is 'Testimonial quotes (array); legacy single quote was backfilled into quotes[1].';

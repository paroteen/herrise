-- She Stories: create storage bucket and RLS policies so photo upload works.
-- Fixes "new row violates row-level security policy" when uploading to she-stories.

insert into storage.buckets (id, name, public)
values ('she-stories', 'she-stories', true)
on conflict (id) do update set public = true;

create policy "she_stories_upload"
on storage.objects for insert
to authenticated
with check (bucket_id = 'she-stories');

create policy "she_stories_public_read"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'she-stories');

create policy "she_stories_update"
on storage.objects for update
to authenticated
using (bucket_id = 'she-stories')
with check (bucket_id = 'she-stories');

create policy "she_stories_delete"
on storage.objects for delete
to authenticated
using (bucket_id = 'she-stories');

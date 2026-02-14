# Supabase troubleshooting (HerRise)

## "Invalid input syntax for type uuid: \"1\""

The app uses **numeric** story ids (1, 2, 3). If `impact_stories.id` was created as UUID (e.g. by the Table Editor), run the migration that converts it to bigint:

**Supabase Dashboard → SQL Editor** (or apply migrations):

- Run the migration file: `supabase/migrations/20260214160000_convert_impact_stories_id_to_bigint.sql`

That script only runs when `id` is currently UUID; it leaves the table unchanged if `id` is already bigint.

---

## "Could not find author_role of impact_stories in the schema cache"

This means PostgREST's schema cache is out of date. Run the following in **Supabase Dashboard → SQL Editor** (on the project your app uses):

```sql
-- 1. Ensure the column exists
ALTER TABLE public.impact_stories
  ADD COLUMN IF NOT EXISTS author_role text;

UPDATE public.impact_stories SET author_role = 'Staff' WHERE author_role IS NULL;

-- 2. Reload PostgREST schema cache so the API sees the column
NOTIFY pgrst, 'reload schema';
```

Then try updating a story again in the admin. If it still fails, try **Project Settings → General → Restart project** to force a full schema reload.

---

## She Stories: photo upload fails ("Bucket not found")

The She Stories admin uses Supabase Storage for photo uploads. Create the bucket once:

1. **Supabase Dashboard → Storage**
2. **New bucket** → Name: `she-stories`
3. Set the bucket to **Public** (so the public URL works for displaying images)
4. Under **Policies**, allow:
   - **SELECT** for `anon` and `authenticated` (public read)
   - **INSERT** and **UPDATE** for `authenticated` only

After the bucket exists, "Upload file" in Admin → She Stories will work.

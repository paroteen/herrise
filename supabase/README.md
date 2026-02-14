# Supabase migrations

Run the SQL in `migrations/` in your Supabase project if the `impact_stories` table doesn't exist:

1. Open [Supabase Dashboard](https://supabase.com/dashboard) → your project → **SQL Editor**.
2. Paste the contents of `migrations/20260214000000_create_impact_stories.sql`.
3. Run the query.

Then ensure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set in your `.env`.

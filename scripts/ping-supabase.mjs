/**
 * Ping Supabase REST endpoints for both impact stories and she stories
 * to keep the free-tier project from going to sleep due to inactivity.
 *
 * Intended to be run from CI (e.g. GitHub Actions) on a weekly schedule.
 *
 * Required environment variables:
 * - SUPABASE_URL         e.g. https://xyzcompany.supabase.co
 * - SUPABASE_ANON_KEY    your public anon key
 */

const url = process.env.SUPABASE_URL;
const anonKey = process.env.SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  console.error('[ping-supabase] Missing SUPABASE_URL or SUPABASE_ANON_KEY');
  process.exit(1);
}

const base = url.replace(/\/$/, '');

/** Minimal GET request helper that treats any HTTP status as "activity". */
async function pingPath(path, label) {
  const endpoint = `${base}${path}`;
  const headers = {
    apikey: anonKey,
    Authorization: `Bearer ${anonKey}`,
    Accept: 'application/json',
  };

  try {
    const res = await fetch(endpoint, { method: 'GET', headers });
    console.log(
      `[ping-supabase] ${label} → status ${res.status} ${res.statusText || ''}`.trim()
    );
  } catch (err) {
    console.error(`[ping-supabase] Error pinging ${label}:`, err instanceof Error ? err.message : String(err));
  }
}

async function main() {
  console.log('[ping-supabase] Starting weekly ping…');

  // Touch both story tables; even if one table is empty this still counts as activity.
  await pingPath('/rest/v1/impact_stories?select=id&limit=1', 'impact_stories');
  await pingPath('/rest/v1/she_stories?select=id&limit=1', 'she_stories');

  // Also ping the auth endpoint so the auth service is considered active.
  await pingPath('/auth/v1/user', 'auth user (will likely be 401, still counts)');

  console.log('[ping-supabase] Ping run complete.');
}

main().catch((err) => {
  console.error('[ping-supabase] Unexpected error:', err);
  process.exit(1);
});


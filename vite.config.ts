import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Do NOT inject API keys (e.g. GEMINI_API_KEY) via define — they would be in the client bundle.
// Any AI/backend API calls must be made from a server or Edge function only.

export default defineConfig({
  root: '.',
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [
    react(),
    // Warn (don't fail) if Supabase env vars are missing so the app can still deploy and use static fallback data
    {
      name: 'validate-env',
      configResolved() {
        if (process.env.NODE_ENV === 'production') {
          const url = process.env.VITE_SUPABASE_URL;
          const key = process.env.VITE_SUPABASE_ANON_KEY;
          if (!url || !key) {
            console.warn(
              '[vite] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. App will use static data. Set them in Vercel → Project → Settings → Environment Variables for Production to use Supabase.'
            );
          }
        }
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // Avoid manualChunks: splitting React/lucide-react into separate chunks can cause
    // "Cannot set properties of undefined (setting 'Activity')" at runtime (lucide-react + React 19).
  },
});

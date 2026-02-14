import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Do NOT inject API keys (e.g. GEMINI_API_KEY) via define — they would be in the client bundle.
// Any AI/backend API calls must be made from a server or Edge function only.

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom') || id.includes('react/')) return 'vendor-react';
            if (id.includes('react-router')) return 'vendor-router';
            if (id.includes('recharts')) return 'vendor-recharts';
            if (id.includes('lucide-react')) return 'vendor-lucide';
            if (id.includes('@supabase')) return 'vendor-supabase';
            return 'vendor';
          }
        },
      },
    },
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/tmall-keyword-bi/',
  plugins: [react()],
  build: {
    outDir: 'pages-dist',
    emptyOutDir: true,
  },
});

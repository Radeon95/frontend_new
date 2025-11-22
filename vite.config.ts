import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import compression from 'vite-plugin-compression';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // ⬅️ Add this
    },
  },
  plugins: [
    vue(),
    compression({
      algorithm: 'gzip', // Use 'gzip' if your server prefers it
      ext: '.gz', // File extension to output (default: .br for Brotli)
      deleteOriginFile: false, // Keep original .js files too
    }),
  ],
  server: {
    host: '127.0.0.1',
    allowedHosts: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor packages into their own chunk
          vue: ['vue'],
          element: ['element-plus'],
          vendor: ['@vueuse/core', 'vue-router'],
        },
      },
    },
  },
});

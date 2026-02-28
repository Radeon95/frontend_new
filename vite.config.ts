/// <reference types="vite-ssg" />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import compression from 'vite-plugin-compression';
import path from 'path';

export default defineConfig(({ isSsrBuild }) => ({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    vue(),
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      deleteOriginFile: false,
    }),
  ],
  server: {
    host: '127.0.0.1',
    allowedHosts: true,
  },
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
  },
  build: {
    rollupOptions: isSsrBuild
      ? {}
      : {
          output: {
            manualChunks: {
              vue: ['vue'],
              element: ['element-plus'],
              vendor: ['vue-router'],
            },
          },
        },
  },
}));

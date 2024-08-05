import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';
/* https://zythis-xorandor.github.io */
export default defineConfig({
  base: './',
  base_live: '/replika-chess/',
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        { src: 'manifest.json', dest: '' },
        { src: 'src/ReplikaChess.svg', dest: '' },
        { src: 'src/fa', dest: '' },
        { src: 'src/assets', dest: '' }
      ]
    })
  ],
  build: {
    sourcemap: true,
    rollupOptions: {
      input: {
        main: 'index.html'
      },
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  }
});

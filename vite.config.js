import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  base: './',
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        { src: 'manifest.json', dest: '' },
        { src: './src/ReplikaChess.svg', dest: '' },
        { src: 'src/whiteTile.png', dest: '' },
        { src: 'src/blackTile.png', dest: '' },
        { src: 'src/boardBorder.png', dest: '' },
        { src: 'src/fa', dest: '' }
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

import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { ViteSSGOptions } from 'vite-ssg';
import fs from 'fs/promises'
import path from 'path'

const ssgOptions: ViteSSGOptions = {
  script: 'async',
  dirStyle: 'flat',
  includeAllRoutes: true,
  onFinished: async () => {
    const dir = path.resolve(process.cwd(), 'dist/.vite')
    await fs.rm(dir, { recursive: true, force: true })
    console.log('Removed dist/.vite')
  }
};


export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  ssgOptions,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: './',
  build: {
    rollupOptions: {
      input: {
        app: './index.html', // default
      },
      output: {
        //dir: 'assets/cdcp-searchResults',
        entryFileNames: 'assets/cdcp-searchResults/search.js',
        assetFileNames: 'assets/cdcp-searchResults/search.css',
      }
    }
  }
})

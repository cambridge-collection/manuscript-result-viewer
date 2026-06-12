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
    {
      // No index.html exists (the entry was renamed to search.html), so the dev
      // server can't serve the home route on direct load; hand it search.html
      // as the SSG build does. Other routes (/about etc.) 404 deliberately.
      name: 'serve-home-route-in-dev',
      apply: 'serve',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if ((req.url ?? '').split('?')[0] === '/') req.url = '/search.html'
          next()
        })
      },
    },
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
        app: './search.html',
      },
      output: {
        //dir: 'assets/cdcp-searchResults',
        entryFileNames: 'assets/cdcp-searchResults/search.js',
        assetFileNames: 'assets/cdcp-searchResults/search.css',
      }
    }
  }
})

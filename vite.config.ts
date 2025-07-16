import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { ViteSSGOptions } from 'vite-ssg';

const ssgOptions: ViteSSGOptions = {
  script: 'async',
  dirStyle: 'flat',
  includeAllRoutes: true,
  /*includedRoutes(paths, routes) {
    return paths.filter((path) => !path.includes('/search2'));
  },*/

  // Other options can be added here as needed.
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

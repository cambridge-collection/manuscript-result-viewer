import { ViteSSG } from 'vite-ssg';
import App from './App.vue'
import { routes } from './router'
import { disabled_types } from './featureFlags'

import VueAwesomePaginate from 'vue-awesome-paginate'
import 'vue-awesome-paginate/dist/style.css'


export const createApp = ViteSSG(
  App,
  { routes },
  ({ app, router }) => {
    app.use(VueAwesomePaginate);

    router.beforeEach((to) => {
      const type = Array.isArray(to.query.type) ? to.query.type[0] : to.query.type
      if (typeof type === 'string' && disabled_types.includes(type)) {
        return { name: 'search', query: { ...to.query, type: 'manuscript' } }
      }
    });
  }
);

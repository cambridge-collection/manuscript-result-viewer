import { ViteSSG } from 'vite-ssg';
import App from './App.vue'
import { router, routes} from './router'

import 'core-js/proposals/regexp-escaping'
import VueAwesomePaginate from 'vue-awesome-paginate'
import 'vue-awesome-paginate/dist/style.css'


export const createApp = ViteSSG(
  App,
  { routes },
  ({ app, router, isClient, initialState }) => {
    app.use(VueAwesomePaginate);
  }
);

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import 'core-js/proposals/regexp-escaping'
import VueAwesomePaginate from 'vue-awesome-paginate'
import 'vue-awesome-paginate/dist/style.css'


const app = createApp(App)
app.use(VueAwesomePaginate)
app.use(router)
app.mount('#app')




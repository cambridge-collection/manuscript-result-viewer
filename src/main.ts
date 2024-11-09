import { createApp } from 'vue'
//import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VueAwesomePaginate from 'vue-awesome-paginate'
import 'vue-awesome-paginate/dist/style.css'

//const config = await fetch("./searchResults.config.json")
//  .then(response => {
//    if (response.ok) {
//      return response.json()
//    }
//    throw new Error('Something went wrong')
//  })

//console.log(config)


const app = createApp(App)
app.use(VueAwesomePaginate)
//app.use(createPinia())
app.use(router)
fetch('/searchResults.config.json')
  .then(response => response.json())
  .then(obj => {
    //console.log(obj)
    app.provide('api_url', obj.apiUrl)
    app.mount('#app')
  }).catch(error => {
  console.log(error)
})




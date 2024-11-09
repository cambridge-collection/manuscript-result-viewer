import { createRouter, createMemoryHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/search',
    name: 'search',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/SearchResults.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../pages/AboutPage.vue'),
  },
  /*{
    path: '/help',
    name: 'help',
    component: () => import('../pages/HelpPage.vue'),
  },*/
  {
    path: '/advanced-search',
    name: 'advanced-search',
    component: () => import('../pages/AdvancedSearchPage.vue'),
  },
]
const router = createRouter({
  history: createMemoryHistory(import.meta.env.BASE_URL),
  routes
})

export {router, routes}

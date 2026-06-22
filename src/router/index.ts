import { createRouter, createMemoryHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router';
import { show_homepage } from '@/featureFlags'

const home_route: RouteRecordRaw = show_homepage
  ? { path: '/', name: 'home', component: () => import('../pages/HomePage.vue') }
  : { path: '/', redirect: { name: 'search', query: { sort: 'title' } } }

const routes: Array<RouteRecordRaw> = [
  home_route,
  {
    path: '/search',
    name: 'search',
    component: () => import('../components/ResultList.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../pages/AboutPage.vue'),
  },
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

import { createRouter, createWebHistory } from 'vue-router'
import { user } from './auth'
import HomeView from './views/HomeView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/movies', component: () => import('./views/BrowseView.vue'), meta: { type: 'movie', heading: 'فیلم‌ها' } },
  { path: '/series', component: () => import('./views/BrowseView.vue'), meta: { type: 'series', heading: 'سریال‌ها' } },
  { path: '/search', component: () => import('./views/BrowseView.vue'), meta: { search: true } },
  { path: '/titles/:slug', component: () => import('./views/TitleView.vue') },
  { path: '/login', component: () => import('./views/LoginView.vue') },
  { path: '/register', component: () => import('./views/RegisterView.vue') },
  { path: '/watchlist', component: () => import('./views/WatchlistView.vue'), meta: { auth: true } },
  { path: '/admin', component: () => import('./views/AdminView.vue'), meta: { auth: true, admin: true } },
  { path: '/:pathMatch(.*)*', component: () => import('./views/NotFoundView.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach(to => {
  if (to.meta.auth && !user.value) {
    return '/login'
  }
})

export default router

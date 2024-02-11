import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin',
      name: 'admin',
      // @ts-ignore
      component: () => import('../views/AdminView.vue')
    },
    {
      path: '/login',
      name: 'login',
      // @ts-ignore
      component: () => import('../views/AuthorisationView.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'home',
      component: HomeView
    },

  ]
})

export default router

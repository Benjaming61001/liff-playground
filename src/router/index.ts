import { createRouter, createWebHistory } from 'vue-router'
import SubView from '@/views/SubView.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/sub',
      name: 'sub',
      component: SubView,
    },
  ],
})

export default router

// router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/home/index.vue'),
  },
]

const router = createRouter({
  history: createWebHistory("/attendance-kanban/"),
  routes
})

export default router
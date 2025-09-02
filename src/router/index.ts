import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/index.vue'),
    },
    {
      path: '/movies',
      name: 'movies',
      component: () => import('@/pages/movies.vue'),
    },
    {
      path: '/movies/:id',
      name: 'movie',
      component: () => import('@/pages/movie.vue'),
    },
  ],
})

export default router

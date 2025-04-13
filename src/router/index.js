import { createRouter, createWebHistory } from 'vue-router';
import Index from '../views/Index.vue';
import HighLight from '@/views/HighLight.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index,
    },
    {
      path: '/high-light',
      name: 'high-light',
      component: HighLight,
    },
  ],
});

export default router;

import { createRouter, createWebHistory } from 'vue-router'
import TicketListView from '@/views/TicketListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'ticket-list',
      component: TicketListView,
    },
    {
      path: '/ticket/:id',
      name: 'ticket-details',
      component: () => import('@/views/TicketDetailsView.vue'),
    },
  ],
})

export default router

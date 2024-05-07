import { createRouter, createWebHistory } from 'vue-router'
import Wizard from '../components/Wizard.vue'
import Description from '../components/Description.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Wizard',
      component: Wizard
    },
    {
      path: '/Description',
      name: 'Description',
      component: Description
    }
  ]
})

export default router

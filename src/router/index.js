import { createRouter, createWebHistory } from 'vue-router'
import PageMain from '../views/PageMain.vue'
import LoginPage from '../views/LoginPage.vue'
import SignupPage from '../views/SignupPage.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PageMain
    },
    {
      path: '/login',
      name: "login",
      component: LoginPage
    },
    {
      path: '/signup',
      name: "signup",
      component: SignupPage
    }
  ]
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import PageMain from '../views/PageMain.vue'
import LoginPage from '../views/LoginPage.vue'
import SignupPage from '../views/SignupPage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import BuildsPage from '../views/BuildsPage.vue'
import AboutPage from '../views/AboutPage.vue'
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
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfilePage
    },
    {
      path: '/builds',
      name: 'builds_page',
      component: BuildsPage
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage
    }
  ]
})

export default router

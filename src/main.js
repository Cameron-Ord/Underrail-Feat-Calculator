import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useCookies } from 'vue3-cookies';

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(useCookies, {
    expireTimes: '1d',
    path: '/',
    domain: import.meta.env.VITE_APP_BASE_DOMAIN,
    secure: true,
    httpOnly: true,
});
app.mount('#app')

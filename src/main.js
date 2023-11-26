import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue3-cookies';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueCookies, {
    expireTimes: '1d',
    path: '/',
    domain: import.meta.env.VITE_APP_BASE_DOMAIN,
    secure: true,
    httpOnly: true,
});
app.mount('#app')

import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
import { useCookies } from 'vue3-cookies'

app.use(pinia)
app.use(router)
app.use(useCookies)

app.mount('#app')


import { createApp } from 'vue'
import { createPinia } from 'pinia'

import "@/axios.config.js"
import './assets/scss/main.scss'

import App from './App.vue'
import router from './router/index.js'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

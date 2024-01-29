import { createApp } from 'vue'
//pinia
import { createPinia } from 'pinia'
//router
import router from './router'
//style
import './style.css'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(autoAnimatePlugin)
app.mount('#app')

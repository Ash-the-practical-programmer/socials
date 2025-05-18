import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App)
app.provide('config', {
    appName: 'DeepSocial',
    category: 'AI'
})
app.mount('#app')
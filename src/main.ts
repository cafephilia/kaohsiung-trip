import { createApp } from 'vue'
import App from './App.vue'
import { setupOffline } from './offline'
import './style.css'

createApp(App).mount('#app')
setupOffline()

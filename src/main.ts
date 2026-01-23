import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import 'vue-advanced-cropper/dist/style.css'
import 'vue-advanced-cropper/dist/theme.compact.css'

const app = createApp(App)

app.use(router)

app.mount('#app')

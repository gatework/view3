import '../src/styles/index.scss'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import View3 from '../src/index.js'
import App from './app.vue'
import router from './router/index.js'

createApp(App)
  .use(createPinia())
  .use(router)
  .use(View3)
  .mount('#app')

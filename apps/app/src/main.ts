import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

main()

function main() {
  const app = createApp(App)
  const pinia = createPinia()

  app
    .use(pinia)
    .mount('#app')
}

// import { createPinia } from 'pinia'
import { createApp } from 'vue'
import type { PluginOptions } from '@workspace/next'
import { FirebaseVue } from '@workspace/next'
import { type FirebaseOptions, initializeApp } from 'firebase/app'

import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

const {
  VITE_APP_ID,
  VITE_API_KEY,
  VITE_MESSAGING_SENDER_ID,
  VITE_PROJECT_ID,
} = import.meta.env

const firebaseConfig: FirebaseOptions = {
  apiKey: VITE_API_KEY,
  authDomain: `${VITE_PROJECT_ID}.firebaseapp.com`,
  projectId: VITE_PROJECT_ID,
  storageBucket: `${VITE_PROJECT_ID}.appspot.com`,
  messagingSenderId: VITE_MESSAGING_SENDER_ID,
  appId: VITE_APP_ID,
}

const pluginOptions: PluginOptions = {
  firebaseApp: initializeApp(firebaseConfig),
}

main()

function main() {
  const app = createApp(App)
  // const pinia = createPinia()

  app
    // .use(pinia)
    .use(FirebaseVue, pluginOptions)
    .mount('#app')
}

import { type FirebaseOptions, initializeApp } from 'firebase/app'
import { createApp } from 'vue'

import App from './App.vue'
import { FirebaseVue, type PluginOptions } from './plugin'

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

function main(): void {
  const app = createApp(App)

  app.use(FirebaseVue, pluginOptions)
  app.mount('#app')
}

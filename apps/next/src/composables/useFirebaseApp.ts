import { type FirebaseApp, getApp } from 'firebase/app'
import { getCurrentInstance, inject } from 'vue'

import { PluginInjectionKey } from '../plugin'

export function useFirebaseApp(): FirebaseApp {
  const app = getCurrentInstance() && inject(PluginInjectionKey, null)

  return app ?? getApp()
}

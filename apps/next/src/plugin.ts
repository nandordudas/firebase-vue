import type { App, InjectionKey } from 'vue'
import type { FirebaseApp } from 'firebase/app'

export interface PluginOptions {
  firebaseApp: FirebaseApp
}

export const PluginInjectionKey: InjectionKey<FirebaseApp> = Symbol('firebaseApp')

export function FirebaseVue(app: App, { firebaseApp }: PluginOptions): void {
  app.provide(PluginInjectionKey, firebaseApp)
}

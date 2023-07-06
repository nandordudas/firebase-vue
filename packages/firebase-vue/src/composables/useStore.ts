import type { FirebaseApp } from 'firebase/app'
import type { Auth } from 'firebase/auth'
import type { Firestore } from 'firebase/firestore'
import { reactive } from 'vue'

export interface State {
  app: FirebaseApp | null
  auth: Auth | null
  firestore: Firestore | null
}

const state = reactive<State>({
  app: null,
  auth: null,
  firestore: null,
})

export function useStore() {
  return {
    state,
  }
}

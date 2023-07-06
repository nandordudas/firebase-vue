import { type Auth, getAuth } from 'firebase/auth'
import { type Firestore, getFirestore } from 'firebase/firestore'
import type { FirebaseApp } from 'firebase/app'
import { useStore } from '@workspace/firebase-vue'

import { app } from '~/firebase'

import { connectEmulators } from './utils'

interface State {
  app: FirebaseApp
  auth: Auth
  firestore: Firestore
}

const auth = getAuth(app)
const firestore = getFirestore(app)

await connectEmulators({ auth, firestore })

const { state } = useStore()

state.app = app
state.auth = auth
state.firestore = firestore

export function useFirebase(): State {
  return { app, auth, firestore }
}

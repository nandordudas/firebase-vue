import { type Auth, getAuth } from 'firebase/auth'
import { type Firestore, getFirestore } from 'firebase/firestore'

import { app } from '~/firebase'

interface State {
  auth: Auth
  firestore: Firestore
}

const auth = getAuth(app)
const firestore = getFirestore(app)

export function useFirebase(): State {
  return { auth, firestore }
}

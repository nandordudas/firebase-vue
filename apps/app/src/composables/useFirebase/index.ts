import { type Auth } from 'firebase/auth'
import { type Firestore } from 'firebase/firestore'

import { createApp } from '~/firebase'

import { connectEmulators } from './utils'

interface State {
  auth: Auth
  firestore: Firestore
}

let auth: Auth
let firestore: Firestore

// TODO: handle error
export async function useFirebase(): Promise<State> {
  try {
    const { getAuth } = await import('firebase/auth')
    const { getFirestore } = await import('firebase/firestore')
    const app = await createApp()

    auth ??= getAuth(app)
    firestore ??= getFirestore(app)

    await connectEmulators({ auth, firestore })
  }
  catch (error) {
    console.error(error)
  }

  return { auth, firestore }
}

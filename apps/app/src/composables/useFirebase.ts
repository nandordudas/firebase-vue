import { type Auth, getAuth } from 'firebase/auth'
import { type Firestore, getFirestore } from 'firebase/firestore'

import { app } from '~/firebase'

interface State {
  auth: Auth
  firestore: Firestore
}

const {
  VITE_FIREBASE_AUTH_EMULATOR_HOST,
  VITE_FIRESTORE_EMULATOR_HOST,
} = import.meta.env

const auth = getAuth(app)
const firestore = getFirestore(app)

async function connectEmulators() {
  if (location.hostname !== 'localhost')
    return

  await Promise.all([
    async function connectAuthEmulator() {
      if (!VITE_FIREBASE_AUTH_EMULATOR_HOST)
        return

      const { connectAuthEmulator } = await import('firebase/auth')

      connectAuthEmulator(auth, `http://${VITE_FIREBASE_AUTH_EMULATOR_HOST}`, { disableWarnings: true })
    },
    async function connectFirestoreEmulator() {
      if (!VITE_FIRESTORE_EMULATOR_HOST)
        return

      const { connectFirestoreEmulator } = await import('firebase/firestore')
      const [host, port] = VITE_FIRESTORE_EMULATOR_HOST.split(':')

      if (!host || !port)
        throw new Error(`Invalid host ${host} with no separate hostname and port ${port}!`)

      connectFirestoreEmulator(firestore, host, Number.parseInt(port, 10))
    },
  ].map(fn => fn()))
}

await connectEmulators()

export function useFirebase(): State {
  return { auth, firestore }
}

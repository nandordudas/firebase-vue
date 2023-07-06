import { type FirebaseApp, type FirebaseOptions } from 'firebase/app'

let app: FirebaseApp

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

export async function createApp(): Promise<FirebaseApp> {
  if (app)
    return app

  try {
    const { initializeApp } = await import('firebase/app')

    app = initializeApp(firebaseConfig)
  }
  catch (error) {
    console.error(error)
  }

  return app
}

interface ImportMetaEnv {
  readonly VITE_APP_ID: string
  readonly VITE_API_KEY: string
  readonly VITE_APP_TITLE: string
  readonly VITE_MESSAGING_SENDER_ID: string
  readonly VITE_PROJECT_ID: string

  readonly VITE_FIRESTORE_EMULATOR_HOST?: string
  readonly VITE_FIREBASE_AUTH_EMULATOR_HOST?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

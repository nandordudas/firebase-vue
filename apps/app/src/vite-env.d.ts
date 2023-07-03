interface ImportMetaEnv {
  readonly VITE_APP_ID: string
  readonly VITE_API_KEY: string
  readonly VITE_APP_TITLE: string
  readonly VITE_MESSAGING_SENDER_ID: string
  readonly VITE_PROJECT_ID: string

  /**
   *
   * @see https://firebase.google.com/docs/emulator-suite/connect_firestore#instrument_your_app_to_talk_to_the_emulators
   */
  readonly VITE_FIRESTORE_EMULATOR_HOST?: string

  /**
   *
   * @see https://firebase.google.com/docs/emulator-suite/connect_auth#instrumentauth
   */
  readonly VITE_FIREBASE_AUTH_EMULATOR_HOST?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

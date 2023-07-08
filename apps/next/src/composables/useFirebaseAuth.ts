import { type Auth, getAuth } from 'firebase/auth'

import { useFirebaseApp } from './useFirebaseApp'

const isClient = typeof window !== 'undefined'

export function useFirebaseAuth(): Nullable<Auth> {
  return isClient ? getAuth(useFirebaseApp()) : null
}

import { type Firestore, getFirestore } from 'firebase/firestore'

import { useFirebaseApp } from './useFirebaseApp'

export function useFirebaseFirestore(): Firestore {
  return getFirestore(useFirebaseApp())
}

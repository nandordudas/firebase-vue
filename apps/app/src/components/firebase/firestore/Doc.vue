<script setup lang="ts" generic="T extends DocumentData">
import { useFirestore } from '@vueuse/firebase/useFirestore'
import { type DocumentData, type DocumentReference, doc } from 'firebase/firestore'

import type { Nullable } from '~/types'

interface Props {
  initialValue: Nullable<T>
  path: string | DocumentReference<T>
}

interface State {
  error: Error | undefined
  isLoading: boolean
}

defineOptions({ name: 'FirestoreDocument', inheritAttrs: false })

const { initialValue, path } = defineProps<Props>()
const { firestore: db } = useFirebase()

const docRef = typeof path === 'string' ? doc(db, path) : path

const state = shallowReactive<State>({
  error: undefined,
  isLoading: true,
})

const data = useFirestore(docRef, initialValue, { errorHandler }) as unknown as T

const stopWatching = watch(data, () => {
  state.isLoading = false
})

onScopeDispose(stopWatching)

function errorHandler(value: Error) {
  state.error = value
  state.isLoading = false
}
</script>

<template>
  <slot v-if="state.isLoading" name="fallback">
    <span>loading...</span>
  </slot>

  <slot v-else v-bind="{ data, ...toRefs(state) }" />
</template>

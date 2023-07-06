<script setup lang="ts" generic="T extends DocumentData & Entity">
import { type UseFirestoreOptions, useFirestore } from '@vueuse/firebase/useFirestore'
import { type DocumentData, type DocumentReference, type Firestore, doc } from 'firebase/firestore'

import type { Entity } from '~/types'

interface Props extends Pick<UseFirestoreOptions, 'autoDispose'> {
  firestore: Firestore
  initialValue?: T[]
  path: string | DocumentReference<T>
}

defineOptions({ name: 'FirestoreDocument', inheritAttrs: false })

const { autoDispose = true, firestore, initialValue, path } = defineProps<Props>()
const error = shallowRef<Error | undefined>()
const isLoading = shallowRef<boolean>(true)

const docRef = typeof path === 'string' ? doc(firestore, path) : path
const data = useFirestore(
  docRef,
  initialValue,
  { autoDispose, errorHandler },
) as unknown as T

onScopeDispose(watch(data, () => isLoading.value = false))

function errorHandler(value: Error) {
  error.value = value
  isLoading.value = false
}
</script>

<template>
  <slot v-if="isLoading" name="fallback">
    <p>loading firebase collection document...</p>
  </slot>

  <slot v-else v-bind="{ data, error }" />
</template>

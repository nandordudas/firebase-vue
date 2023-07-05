<script setup lang="ts" generic="T extends DocumentData & Entity">
import { useFirestore } from '@vueuse/firebase/useFirestore'
import { type DocumentData, type DocumentReference, doc } from 'firebase/firestore'

import type { Entity, Nullable } from '~/types'

interface Props {
  initialValue: Nullable<T>
  path: string | DocumentReference<T>
}

defineOptions({ name: 'FirestoreDocument', inheritAttrs: false })

const { initialValue, path } = defineProps<Props>()

// TODO: check why defineSlots broke generic T

const error = shallowRef<Error | undefined>()
const isLoading = shallowRef<boolean>(true)
const { firestore } = useFirebase()
const docRef = typeof path === 'string' ? doc(firestore, path) : path
const data = useFirestore(docRef, initialValue, { errorHandler }) as unknown as T

onScopeDispose(watch(data, () => isLoading.value = false))

function errorHandler(value: Error) {
  error.value = value
  isLoading.value = false
}
</script>

<template>
  <slot v-if="isLoading" name="fallback">
    <span>loading...</span>
  </slot>

  <slot v-else v-bind="{ data, error, isLoading }" />
</template>

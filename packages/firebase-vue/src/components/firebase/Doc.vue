<script setup lang="ts" generic="T extends DocumentData & Entity">
import { type UseFirestoreOptions, useFirestore } from '@vueuse/firebase'
import { type DocumentData, type DocumentReference, doc } from 'firebase/firestore'
import { onScopeDispose, shallowRef, watch } from 'vue'

import { useStore } from '~/composables/useStore'
import type { Entity } from '~/types'

type Props = Pick<UseFirestoreOptions, 'autoDispose'> & {
  initialValue?: T[]
  path: string | DocumentReference<T>
}

defineOptions({ name: 'FirestoreDocument', inheritAttrs: false })

const { autoDispose = true, initialValue, path } = defineProps<Props>()
const error = shallowRef<Error | undefined>()
const isLoading = shallowRef<boolean>(true)

const { state } = useStore()

const docRef = typeof path === 'string' ? doc(state.firestore!, path) : path
const data = useFirestore(
  docRef,
  initialValue,
  { autoDispose, errorHandler },
) as unknown as T

onScopeDispose(watch(data, () => (isLoading.value = false)))

function errorHandler(value: Error) {
  error.value = value
  isLoading.value = false
}
</script>

<template>
  <slot v-if="isLoading" name="fallback">
    <span>loading...</span>
  </slot>

  <slot v-else v-bind="{ data, error }" />
</template>

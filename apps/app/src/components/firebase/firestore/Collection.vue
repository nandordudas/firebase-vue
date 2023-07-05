<script setup lang="ts" generic="T extends DocumentData & Entity">
import { useFirestore } from '@vueuse/firebase/useFirestore'
import {
  type CollectionReference,
  type DocumentData,
  type Query,
  type QueryConstraint,
  collection,
  query,
} from 'firebase/firestore'

import type { Entity } from '~/types'

interface Props {
  filters?: QueryConstraint[]
  initialValue?: T[]
  path: string | CollectionReference | Query
}

defineOptions({ name: 'FirestoreCollection', inheritAttrs: false })

const { filters, initialValue, path } = defineProps<Props>()
const slots = defineSlots<{
  default: (props: {
    data: T[]
    error: Error | undefined
  }) => void
  fallback: (...props: any[]) => void
  item: (props: T) => void
}>()
const error = shallowRef<Error | undefined>()
const isLoading = shallowRef<boolean>(true)
const { firestore } = useFirebase()
const docRef = typeof path === 'string' ? collection(firestore, path) : path
const data = useFirestore(
  filters ? query(docRef, ...filters) : docRef, initialValue, { errorHandler },
) as unknown as T[]

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

  <template v-else>
    <slot v-bind="{ data, error }" />

    <template v-if="'item' in slots">
      <!-- TODO: check memoization -->
      <slot v-for="item in data" :key="item.id" v-memo="data" name="item" v-bind="item" />
    </template>
  </template>
</template>

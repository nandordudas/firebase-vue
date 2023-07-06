<script setup lang="ts" generic="T extends DocumentData & Entity">
import { type UseFirestoreOptions, useFirestore } from '@vueuse/firebase'
import {
  type CollectionReference,
  type DocumentData,
  type Query,
  type QueryConstraint,
  collection,
  query,
} from 'firebase/firestore'
import { onScopeDispose, shallowRef, watch } from 'vue'

import { useStore } from '~/composables/useStore'
import type { Entity } from '~/types'

type Props = Pick<UseFirestoreOptions, 'autoDispose'> & {
  filters?: QueryConstraint[]
  initialValue?: T[]
  path: string | CollectionReference | Query
}

defineOptions({ name: 'FirestoreCollection', inheritAttrs: false })

const { autoDispose = true, filters, initialValue, path } = defineProps<Props>()
const error = shallowRef<Error | undefined>()
const isLoading = shallowRef<boolean>(true)

const { state } = useStore()

const docRef = typeof path === 'string' ? collection(state.firestore!, path) : path
const data = useFirestore(
  filters ? query(docRef, ...filters) : docRef,
  initialValue,
  { autoDispose, errorHandler },
) as unknown as T[]

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

  <template v-else>
    <slot v-bind="{ data, error }" />

    <slot v-for="item in data" :key="item.id" v-memo="data" name="item" v-bind="item" />
  </template>
</template>

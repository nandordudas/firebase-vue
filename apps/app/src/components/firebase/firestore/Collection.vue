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

interface State {
  error: Error | undefined
  isLoading: boolean
}

defineOptions({ name: 'FirestoreCollection', inheritAttrs: false })

const { filters, initialValue, path } = defineProps<Props>()
const { firestore: db } = useFirebase()

const docRef = typeof path === 'string' ? collection(db, path) : path

const state = shallowReactive<State>({
  isLoading: true,
  error: undefined,
})

const data = useFirestore(
  filters ? query(docRef, ...filters) : docRef, initialValue, { errorHandler },
) as unknown as T[]

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

  <template v-else>
    <slot v-bind="{ data, ...toRefs(state) }" />
    <slot v-for="item in data" :key="item.id" name="item" v-bind="item" />
  </template>
</template>

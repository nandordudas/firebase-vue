<script setup lang="ts" generic="T extends DocumentData">
import { useFirestore } from '@vueuse/firebase/useFirestore'
import {
  type CollectionReference,
  type DocumentData,
  type Query,
  type QueryConstraint,
  collection,
  query,
} from 'firebase/firestore'

interface Props {
  filters?: QueryConstraint[]
  initialValue?: T[]
  path: string | CollectionReference | Query
}

interface State {
  isLoading: boolean
  error: Error | undefined
}

defineOptions({ name: 'FirestoreDatabaseCollection', inheritAttrs: false })

const { filters, initialValue, path } = defineProps<Props>()
const { firestore } = useFirebase()

const docRef = typeof path === 'string' ? collection(firestore, path) : path

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
  <slot v-if="state.isLoading" name="loading">
    <span>loading...</span>
  </slot>

  <template v-else>
    <slot v-bind="{ data, ...toRefs(state) }" />
    <slot v-for="(item, i) in data" :key="i" name="item" v-bind="item" />
  </template>
</template>

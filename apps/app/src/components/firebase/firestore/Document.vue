<script setup lang="ts" generic="T extends DocumentData">
import { useFirestore } from '@vueuse/firebase/useFirestore'
import { type DocumentData, type DocumentReference, doc } from 'firebase/firestore'

interface Props {
  initialValue?: T | null
  path: string | DocumentReference<T>
}

interface State {
  isLoading: boolean
  error: Error | undefined
}

defineOptions({ name: 'FirestoreDatabaseDocument', inheritAttrs: false })

const { initialValue, path } = defineProps<Props>()
const { firestore } = useFirebase()

const docRef = typeof path === 'string' ? doc(firestore, path) : path

const state = shallowReactive<State>({
  error: undefined,
  isLoading: true,
})

const data = useFirestore(docRef, initialValue, { errorHandler }) as unknown as T[]

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

  <slot v-else v-bind="{ data, ...toRefs(state) }" />
</template>

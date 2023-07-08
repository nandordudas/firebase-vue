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
import { shallowRef } from 'vue'

import { useFirebaseFirestore } from '~/composables/useFirebaseFirestore'

type Props = Pick<UseFirestoreOptions, 'autoDispose'> & {
  filters?: QueryConstraint[]
  initialValue?: T[]
  path: string | CollectionReference | Query
}

defineOptions({ name: 'FirebaseFirestoreCollection', inheritAttrs: false })

const { autoDispose = true, filters, initialValue, path } = defineProps<Props>()
const error = shallowRef<Error | undefined>()

const firestore = useFirebaseFirestore()

const docRef = typeof path === 'string' ? collection(firestore, path) : path
const data = useFirestore(
  filters ? query(docRef, ...filters) : docRef,
  initialValue,
  { autoDispose, errorHandler },
) as unknown as T[]

function errorHandler(value: Error) {
  error.value = value
}
</script>

<template>
  <slot v-bind="{ data, error }" />

  <slot v-for="item in data" :key="item.id" v-memo="data" name="item" v-bind="item" />
</template>

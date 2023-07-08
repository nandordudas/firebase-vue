<script setup lang="ts" generic="T extends DocumentData & Entity">
import { type UseFirestoreOptions, useFirestore } from '@vueuse/firebase/useFirestore'
import { type DocumentData, type DocumentReference, doc } from 'firebase/firestore'
import { shallowRef } from 'vue'

import { useFirebaseFirestore } from '~/composables/useFirebaseFirestore'

type Props = Pick<UseFirestoreOptions, 'autoDispose'> & {
  initialValue?: T[]
  path: string | DocumentReference<T>
}

defineOptions({ name: 'FirebaseFirestoreDocument', inheritAttrs: false })

const { autoDispose = true, initialValue, path } = defineProps<Props>()
const error = shallowRef<Error | undefined>()

const firestore = useFirebaseFirestore()

const docRef = typeof path === 'string' ? doc(firestore, path) : path

const data = useFirestore(
  docRef,
  initialValue,
  { autoDispose, errorHandler },
) as unknown as T

function errorHandler(value: Error) {
  error.value = value
}
</script>

<template>
  <slot v-bind="{ data, error }" />
</template>

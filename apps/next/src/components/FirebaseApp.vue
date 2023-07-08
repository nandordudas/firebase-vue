<script setup lang="ts">
import { useFirebaseApp } from '~/composables/useFirebaseApp'

defineOptions({ name: 'FirebaseApp', inheritAttrs: false })

const firebaseApp = useFirebaseApp()
</script>

<template>
  <slot v-bind="firebaseApp" />
</template>

<script setup lang="ts">
import { useStore } from '~/composables/useStore'

defineOptions({ name: 'FirebaseApp', inheritAttrs: false })

const { state } = useStore()
</script>

<template>
  <slot v-bind="state" />
</template>

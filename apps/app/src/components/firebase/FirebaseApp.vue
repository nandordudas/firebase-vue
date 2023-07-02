<script setup lang="ts">
defineOptions({ name: 'FirebaseApp', inheritAttrs: false })

const firebase = useFirebase()
</script>

<template>
  <slot v-bind="firebase" />
</template>

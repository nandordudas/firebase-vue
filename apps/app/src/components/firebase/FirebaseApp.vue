<script setup lang="ts">
defineOptions({ name: 'FirebaseApp', inheritAttrs: false })

const firebase = await useFirebase()
</script>

<template>
  <slot v-bind="firebase" />
</template>

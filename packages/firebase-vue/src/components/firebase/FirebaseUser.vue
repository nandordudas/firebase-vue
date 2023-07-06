<script setup lang="ts">
import { useAuth } from '@vueuse/firebase'
import { signOut } from 'firebase/auth'
import { onMounted, onScopeDispose, shallowRef, watch } from 'vue'

import { useStore } from '~/composables/useStore'

defineOptions({ name: 'FirebaseUser', inheritAttrs: false })

const { state } = useStore()
const isLoading = shallowRef<boolean>(true)
const { isAuthenticated, user } = useAuth(state.auth!)

onMounted(() => (isLoading.value = false))
onScopeDispose(watch(user, () => (isLoading.value = false)))

async function onSignOut() {
  isLoading.value = true

  await signOut(state.auth!)
}
</script>

<template>
  <slot v-if="isLoading" name="fallback">
    <span>loading...</span>
  </slot>

  <template v-else>
    <slot
      v-if="isAuthenticated"
      name="authenticated"
      v-bind="{ auth: state.auth, isAuthenticated, signOut: onSignOut, user }"
    />

    <slot v-else name="signedOut" v-bind="{ auth: state.auth }" />
  </template>
</template>

<script setup lang="ts">
import { useAuth } from '@vueuse/firebase'
import { signOut } from 'firebase/auth'

import { useFirebaseAuth } from '~/composables/useFirebaseAuth'

defineOptions({ name: 'FirebaseUser', inheritAttrs: false })

const firebaseAuth = useFirebaseAuth()
const { isAuthenticated, user } = useAuth(firebaseAuth!)
</script>

<template>
  <slot
    v-if="isAuthenticated"
    name="authenticated"
    v-bind="{ isAuthenticated, signOut: () => signOut(firebaseAuth!), user }"
  />

  <slot v-else name="signedOut" v-bind="{ firebaseAuth }" />
</template>

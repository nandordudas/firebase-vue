<script setup lang="ts">
import { useAuth } from '@vueuse/firebase/useAuth'
import { type Auth, type User, signOut as _signOut } from 'firebase/auth'

defineOptions({ name: 'AuthUser', inheritAttrs: false })

const slots = defineSlots<{
  authenticated: (props: {
    auth: Auth
    signOut: () => void
    isAuthenticated: boolean
    user: User
  }) => void
  fallback: (...props: any[]) => void
  signedOut: (props: { auth: Auth }) => void
}>()

const { auth } = useFirebase()
const isLoading = shallowRef<boolean>(true)
const { isAuthenticated, user } = useAuth(auth)

// TODO: check for proper loading state change and user type aliasing below
onMounted(() => isLoading.value = false)
onScopeDispose(watch(user, () => isLoading.value = false))

function signOut() {
  isLoading.value = true

  _signOut(auth)
}
</script>

<template>
  <slot v-if="isLoading" name="fallback">
    <span>loading...</span>
  </slot>

  <slot
    v-if="'authenticated' in slots && isAuthenticated"
    name="authenticated"
    v-bind="{ auth, isAuthenticated, signOut, user: user as User }"
  />

  <slot v-else-if="'signedOut' in slots" name="signedOut" v-bind="{ auth }">
    signedOut
  </slot>
</template>

<script setup lang="ts">
import { useAuth } from '@vueuse/firebase/useAuth'
import { type Auth, type User, signOut as _signOut } from 'firebase/auth'

defineOptions({ name: 'AuthUser', inheritAttrs: false })

const { auth } = defineProps<Props>()

defineSlots<{
  authenticated: (props: {
    auth: Auth
    signOut: () => Promise<void>
    isAuthenticated: boolean
    user: User
  }) => void
  fallback: (...props: any[]) => void
  signedOut: (props: { auth: Auth }) => void
}>()

export interface Props {
  auth: Auth
}

const isLoading = shallowRef<boolean>(true)
const { isAuthenticated, user } = useAuth(auth)

// TODO: check for proper loading state change and user type aliasing below
onMounted(() => isLoading.value = false)
onScopeDispose(watch(user, () => isLoading.value = false))

async function signOut() {
  isLoading.value = true

  await _signOut(auth)
}
</script>

<template>
  <slot v-if="isLoading" name="fallback">
    <p>loading firebase authentication...</p>
  </slot>

  <template v-else>
    <slot
      v-if="isAuthenticated"
      name="authenticated"
      v-bind="{ auth, isAuthenticated, signOut, user: user as User }"
    />

    <slot v-else name="signedOut" v-bind="{ auth }" />
  </template>
</template>

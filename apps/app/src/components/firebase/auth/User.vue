<script setup lang="ts">
import { useAuth } from '@vueuse/firebase/useAuth'
import { signOut as _signOut } from 'firebase/auth'

interface State {
  error: Error | undefined
  isLoading: boolean
}

defineOptions({ name: 'AuthUser', inheritAttrs: false })

const { auth } = useFirebase()

const state = shallowReactive<State>({
  error: undefined,
  isLoading: true,
})

onMounted(() => state.isLoading = false)

const { isAuthenticated, user } = useAuth(auth)

const stopWatching = watch(user, () => {
  state.isLoading = false
})

onScopeDispose(stopWatching)

function signOut() {
  state.isLoading = true

  _signOut(auth)
}
</script>

<template>
  <slot v-bind="{ auth }" />

  <slot v-if="state.isLoading" name="fallback">
    <span>loading...</span>
  </slot>

  <slot
    v-if="isAuthenticated"
    name="authenticated"
    v-bind="{ auth, isAuthenticated, signOut, user }"
  />

  <slot v-else name="signedOut" v-bind="{ auth }" />
</template>

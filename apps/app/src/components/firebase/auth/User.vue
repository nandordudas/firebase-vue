<script setup lang="ts">
import { useAuth } from '@vueuse/firebase/useAuth'
import { signInAnonymously as _signInAnonymously, signOut as _signOut } from 'firebase/auth'

interface State {
  isLoading: boolean
  error: Error | undefined
}

defineOptions({ name: 'AuthenticationUser', inheritAttrs: false })

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

function signInAnonymously() {
  state.isLoading = true

  _signInAnonymously(auth)
}
</script>

<template>
  <slot v-if="state.isLoading" name="loading">
    <span>loading...</span>
  </slot>

  <slot
    v-if="isAuthenticated"
    name="authenticated"
    v-bind="{ auth, isAuthenticated, signOut, user }"
  />

  <slot v-else name="signedOut" v-bind="{ auth, signInAnonymously }" />
</template>

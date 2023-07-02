<script setup lang="ts">
import { limit, orderBy } from 'firebase/firestore'

interface Record {
  gid: string
  name: string
  steps?: string
}

const initialGameValue: Record[] = []
const gameFilter = [orderBy('name', 'asc'), limit(10)]
</script>

<template>
  <FirebaseApp>
    <User>
      <template #authenticated="{ user, signOut }">
        <div>user: {{ user?.uid }}</div>
        <button class="btn" type="button" @click="signOut">
          Sign out
        </button>
      </template>

      <template #signedOut="{ signInAnonymously }">
        <button class="btn" type="button" @click="signInAnonymously">
          Sign in
        </button>
      </template>
    </User>

    <Collection path="games" :initial-value="initialGameValue" :filters="gameFilter">
      <template #item="{ gid, key, name }">
        <div :key="key">
          <div>{{ gid }} - {{ name }}</div>

          <Collection :path="`games/${gid}/steps`">
            <template #item="item">
              <Document :path="`/games/${gid}/steps/${(item as any).sid}`">
                <template #default="{ data }">
                  <div>> {{ data }}</div>
                </template>
              </Document>
            </template>
          </Collection>
        </div>
      </template>
    </Collection>
  </FirebaseApp>
</template>

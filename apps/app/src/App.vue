<script setup lang="ts">
import { signInAnonymously } from 'firebase/auth'
import { type CollectionReference, collection, limit, orderBy } from 'firebase/firestore'

import type { Entity } from '~/types'

interface CollectionRecord extends Entity {
  gid: string
  name: string
  steps?: CollectionReference
}

interface DocRecord extends Entity {
  name: string
  sid: string
}

const initialCollectionValue: CollectionRecord[] = []
const initialDocValue = {} as DocRecord
</script>

<template>
  <FirebaseApp v-slot="{ firestore }">
    <User>
      <template #authenticated="{ signOut, user }">
        <div>user: {{ user.uid }}</div>

        <button class="btn" type="button" @click="signOut">
          Sign out
        </button>
      </template>

      <template #signedOut="{ auth }">
        <button class="btn" type="button" @click="signInAnonymously(auth)">
          Sign in (anonymously)
        </button>
      </template>
    </User>

    <Collection
      :path="collection(firestore, 'games')"
      :filters="[orderBy('name', 'asc'), limit(10)]"
      :initial-value="initialCollectionValue"
    >
      <template #item="{ key }">
        <Collection :path="`games/${key}/steps`">
          <template #item="item">
            <Doc :initial-value="initialDocValue" :path="`/games/${key}/steps/${(item as any).sid}`">
              <template #default="{ data }">
                <div>> {{ data }}</div>
              </template>
            </Doc>
          </template>
        </Collection>
      </template>
    </Collection>
  </FirebaseApp>
</template>

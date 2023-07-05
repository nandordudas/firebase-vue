<script setup lang="ts">
import { signInAnonymously } from 'firebase/auth'
import { type CollectionReference, collection, limit, orderBy } from 'firebase/firestore'

// TODO: how it works with component auto imports
import FirebaseApp from '~/components/firebase/FirebaseApp.vue'
import User from '~/components/firebase/auth/User.vue'
import Collection from '~/components/firebase/firestore/Collection.vue'
import Doc from '~/components/firebase/firestore/Doc.vue'

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

const GameCollection = Collection<CollectionRecord>
const GameStepCollection = Collection<DocRecord>
const GameDoc = Doc<DocRecord>
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

    <GameCollection :path="collection(firestore, 'games')" :filters="[orderBy('name', 'asc'), limit(10)]">
      <template #item="{ key }">
        <GameStepCollection :path="`games/${key}/steps`">
          <template #item="item">
            <GameDoc :path="`/games/${key}/steps/${item.sid}`">
              <template #default="{ data }">
                <div>> {{ data }}</div>
              </template>
            </GameDoc>
          </template>
        </GameStepCollection>
      </template>
    </GameCollection>
  </FirebaseApp>
</template>

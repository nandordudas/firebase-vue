<script setup lang="ts">
import { signInAnonymously } from 'firebase/auth'
import { type CollectionReference } from 'firebase/firestore'
import { FirebaseFirestoreCollection, FirebaseFirestoreDocument, FirebaseUser } from '@workspace/next'

import type { Entity } from './types'

interface DocumentRecord extends Entity {
  isLoading?: boolean
  name: string
  sid: string
}

interface CollectionRecord extends Entity {
  gid: string
  name: string
  steps?: CollectionReference<DocumentRecord>
}

const GameCollection = FirebaseFirestoreCollection<CollectionRecord>
const GameStepCollection = FirebaseFirestoreCollection<DocumentRecord>
const GameDocument = FirebaseFirestoreDocument<DocumentRecord>
</script>

<template>
  <FirebaseUser>
    <template #authenticated="{ signOut, user }">
      <p>{{ user?.isAnonymous ? 'anonymous' : user?.email }}</p>

      <GameCollection path="games">
        <template #item="{ key }">
          <GameStepCollection :path="`games/${key}/steps`">
            <template #item="{ sid }">
              <GameDocument :path="`games/${key}/steps/${sid}`">
                <template #default="{ data }">
                  <pre>{{ data }}</pre>
                </template>
              </GameDocument>
            </template>
          </GameStepCollection>
        </template>
      </GameCollection>

      <button type="button" class="btn" @click="signOut">
        Sign out
      </button>
    </template>

    <template #signedOut="{ firebaseAuth }">
      <button type="button" class="btn" @click="signInAnonymously(firebaseAuth!)">
        Sign in (anonymously)
      </button>
    </template>
  </FirebaseUser>
</template>

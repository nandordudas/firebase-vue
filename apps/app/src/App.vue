<script setup lang="ts">
import { Collection, Doc, type Entity, FirebaseApp, FirebaseUser } from '@workspace/firebase-vue'
import { signInAnonymously } from 'firebase/auth'
import { type CollectionReference, collection, doc, limit, orderBy } from 'firebase/firestore'

const { auth, firestore } = useFirebase()

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
  <FirebaseApp>
    <FirebaseUser>
      <template #authenticated="{ signOut, user }">
        <div>user: {{ user?.uid }}</div>

        <button class="btn" type="button" @click="signOut">
          Sign out
        </button>

        <GameCollection :path="collection(firestore!, 'games')" :filters="[orderBy('name', 'asc'), limit(10)]">
          <template #item="{ key }">
            <GameStepCollection :path="collection(firestore!, `games/${key}/steps`)">
              <template #item="item">
                <!-- TODO: path has type error :( -->
                <GameDoc :path="doc(firestore!, `/games/${key}/steps/${item.sid}`)">
                  <template #default="{ data }">
                    <div>> {{ data }}</div>
                  </template>
                </GameDoc>
              </template>
            </GameStepCollection>
          </template>
        </GameCollection>
      </template>

      <template #signedOut>
        <button type="button" class="btn" @click="signInAnonymously(auth!)">
          Sign in (anonymously)
        </button>
      </template>
    </FirebaseUser>
  </FirebaseApp>
</template>

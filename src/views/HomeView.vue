<template>
  <main>
    <div>
      setAuthHeader
    </div>
    <div>
      <button @click="setAuthHeader()">
        setAuthHeader
      </button>
    </div>
    <pre>
      setAuthHeaderResult: {{ setAuthHeaderResult || '-' }}
    </pre>
    <pre>
      is Same id Token: {{ setAuthHeaderResult?.authHeaderNameCard === setAuthHeaderResult?.authHeaderSeatReservation }}
    </pre>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  getAccessTokenNameCard,
  getAccessTokenSeatReservation,
  type ISetHeader,
} from '@/utils/Auth'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setAuthHeaderResult = ref<any>()
async function setAuthHeader (): Promise<void> {
  const authHeaderNameCard: ISetHeader | null = await getAccessTokenNameCard()
  const authHeaderSeatReservation: ISetHeader | null = await getAccessTokenSeatReservation()
  if (authHeaderNameCard) console.log(authHeaderNameCard)
  if (authHeaderSeatReservation) console.log(authHeaderSeatReservation)
  setAuthHeaderResult.value =  {
    authHeaderNameCard,
    authHeaderSeatReservation
  }
}
</script>

<style scoped>

</style>
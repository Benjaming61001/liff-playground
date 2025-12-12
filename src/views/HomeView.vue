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
    <pre style="width: 100%; white-space: break-space; word-break: break-all;">
      isLoading: {{ isLoading }}
      nameCardToken: {{ nameCardToken || '-' }}
      seatReservationToken: {{ seatReservationToken || '-' }}
    </pre>
    <pre>
      is Same id Token: {{ nameCardToken?.value === seatReservationToken?.value }}
    </pre>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  getAccessTokenNameCard,
  getAccessTokenSeatReservation,
  type ISetHeader,
} from '@/utils/Auth'
import liff from '@line/liff'

const isLoading = ref<boolean>(false)
const nameCardToken = ref<ISetHeader | null>(null)
const seatReservationToken = ref<ISetHeader | null>(null)
async function setAuthHeader (): Promise<void> {
  isLoading.value = true
  const authHeaderNameCard: ISetHeader | null = await getAccessTokenNameCard()
  const authHeaderSeatReservation: ISetHeader | null = await getAccessTokenSeatReservation()
  if (authHeaderNameCard) nameCardToken.value = authHeaderNameCard
  if (authHeaderSeatReservation) seatReservationToken.value = authHeaderSeatReservation
  isLoading.value = false
}

onMounted(async (): Promise<void> => {
  const liffId = import.meta.env.VITE_APP_LIFF_ID || ''
  await liff.init({
    liffId,
    withLoginOnExternalBrowser: true,
  })
  console.log('getIDToken', liff.getIDToken())
  liff.openWindow({url: `https://liff.line.me/${import.meta.env.VITE_APP_LIFF_ID_2}` })
})
</script>

<style scoped>

</style>
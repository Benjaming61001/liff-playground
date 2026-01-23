<template>
  <main>
    <pre>
      nameCardToken: {{ nameCardToken }}
      seatReservationToken: {{ seatReservationToken }}
    </pre>

    <div>
      <ImageCropper src="/png/img.png" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  getAccessTokenNameCard,
  getAccessTokenSeatReservation,
  getLocalToken,
  initAndGetIdToken,
  type ISetHeader,
  makeHeader,
  saveToken,
} from '@/utils/Auth'
import ImageCropper from '@/components/ImageCropper.vue'
import liff from '@line/liff'

const LIFF_ID_NAME_CARD = import.meta.env.VITE_APP_LIFF_ID || ''
const LIFF_ID_SEAT = import.meta.env.VITE_APP_LIFF_ID_2 || ''

const nameCardToken = ref<ISetHeader | null>(null)
const seatReservationToken = ref<ISetHeader | null>(null)

async function setAuthHeader (): Promise<void> {
  if (import.meta.env.DEV) return
  const localVc = await getLocalToken('x-id-token-vc')
  const localLt = await getLocalToken('x-id-token-lt')

  if (localVc && localLt) {
    nameCardToken.value = makeHeader('x-id-token-vc', localVc)
    seatReservationToken.value = makeHeader('x-id-token-lt', localLt)
    return
  }

  if (!localVc) {
    if (
      !window.location.href.includes('redirect-to%3Dvc') &&
      !window.location.href.includes('redirect-to=vc')
    ) {
      const url = `https://liff.line.me/${LIFF_ID_NAME_CARD}?redirect-to=vc`
      if (liff.isInClient()) {
        liff.openWindow({url})
      } else {
        window.location.replace(url)
      }
      return
    }
    const token = await initAndGetIdToken(LIFF_ID_NAME_CARD)
    if (!token) return
    saveToken('x-id-token-vc', token)
  }

  if (!localLt) {
    if (
      !window.location.href.includes('redirect-to%3Dlt') &&
      !window.location.href.includes('redirect-to=lt')
    ) {
      const url = `https://liff.line.me/${LIFF_ID_SEAT}?redirect-to=lt`
      if (liff.isInClient()) {
        liff.openWindow({url})
      } else {
        window.location.replace(url)
      }
      return
    }
    const token = await initAndGetIdToken(LIFF_ID_SEAT)
    if (!token) return
    saveToken('x-id-token-lt', token)
  }

  const authHeaderNameCard: ISetHeader | null = await getAccessTokenNameCard()
  const authHeaderSeatReservation: ISetHeader | null = await getAccessTokenSeatReservation()
  if (authHeaderNameCard) nameCardToken.value = authHeaderNameCard
  if (authHeaderSeatReservation) seatReservationToken.value = authHeaderSeatReservation
}

onMounted(setAuthHeader)
</script>

<style scoped>

</style>
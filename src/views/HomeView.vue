<template>
  <main>
    <div>
      PROFILE
    </div>
    <div>
      <button @click="getProfile()">
        getProfile
      </button>
    </div>
    <pre>
      profile: {{ profile || '-' }}
    </pre>

    <div>
      Scan QR-Code
    </div>
    <div>
      <button @click="scan()">
        Scan
      </button>
    </div>
    <pre>
      scanResult: {{ scanResult || '-' }}
    </pre>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
// import { liff } from '@line/liff'
import type { Liff } from '@line/liff'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const liff: Liff = (window as any).liff

const profile = ref<Awaited<ReturnType<typeof liff.getProfile>>>()
const scanResult = ref<Awaited<ReturnType<typeof liff.scanCodeV2>>>()

async function getProfile(): Promise<void> {
  profile.value = await liff.getProfile()
}

async function scan(): Promise<void> {
  scanResult.value = await liff.scanCodeV2()
}

async function init(): Promise<void>{
  if (import.meta.env.DEV) return
  const liffId = import.meta.env.VITE_APP_LIFF_ID
  await liff.init({
    liffId,
    withLoginOnExternalBrowser: true
  })
}

onMounted(init)
</script>

<style scoped>

</style>
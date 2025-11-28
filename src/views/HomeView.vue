<template>
  <main>
    <div>
      PROFILE
    </div>
    <p>
      <pre>
        profile: {{ profile || '-' }}
      </pre>
    </p>
    <div>
      Scan QR-Code
    </div>
    <div>
      <button @click="scan()">
        Scan
      </button>
    </div>
    <p>
      <pre>
        scanResult: {{ scanResult || '-' }}
      </pre>
    </p>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { liff } from '@line/liff'

const profile = ref<Awaited<ReturnType<typeof liff.getProfile>>>()
const scanResult = ref<Awaited<ReturnType<typeof liff.scanCodeV2>>>()

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
  profile.value = await liff.getProfile()
}

onMounted(init)
</script>

<style scoped>

</style>
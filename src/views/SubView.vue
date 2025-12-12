<template>
  <main>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import liff from '@line/liff'

onMounted(async (): Promise<void> => {
  const liffId = import.meta.env.VITE_APP_LIFF_ID_2 || ''
  await liff.init({
    liffId,
    withLoginOnExternalBrowser: true,
  })
  console.log('getIDToken', liff.getIDToken())
  liff.openWindow({url: `https://liff.line.me/${import.meta.env.VITE_APP_LIFF_ID}` })
})
</script>

<style scoped>

</style>
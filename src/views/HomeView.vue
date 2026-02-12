<template>
  <main>
    <button @click="open()">OPEN</button>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import liff from '@line/liff'

async function open(): Promise<void> {
  await liff.ready
  const url = 'https://www.google.com/'
  liff?.openWindow({ url })
}

async function liffInit(): Promise<void> {
  const liffId = import.meta.env.VITE_APP_LIFF_ID || ''
  await liff.init({ liffId })
}

onMounted(liffInit)
</script>

<style scoped>

</style>
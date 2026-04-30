<template>
  <main>
    {{ profile }}
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import liff from '@line/liff'

const profile = ref({})

async function init(): Promise<void> {
  await liff.ready
  if (!liff.isLoggedIn()) {
    liff.login()
  } else {
    profile.value = await liff.getProfile()
  }
}

onMounted(init)
</script>

<style scoped>

</style>

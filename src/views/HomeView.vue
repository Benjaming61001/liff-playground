<template>
  <main>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import liff from '@line/liff'
import { useRouter } from 'vue-router'

const router = useRouter()

async function init(): Promise<void> {
  await liff.ready
  if (liff.isLoggedIn()) {
    router.push({ name: 'home2' })
    return
  }
  const targetRoute = router.resolve({
    name: 'home2',
  })
  const base = window.location.origin
  const redirectUri = `${base}${targetRoute.href}`
  console.log({redirectUri})
  liff.login({ redirectUri })
}

onMounted(init)
</script>

<style scoped>

</style>

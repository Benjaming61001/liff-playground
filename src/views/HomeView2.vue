<template>
  <main>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import liff from '@line/liff'
import { useRoute } from 'vue-router'

const route = useRoute()

async function init(): Promise<void> {
  await liff.ready
  console.log('route', route.name)
  console.log('liff.isLoggedIn()', liff.isLoggedIn())
}

onMounted(init)
</script>

<style scoped>

</style>

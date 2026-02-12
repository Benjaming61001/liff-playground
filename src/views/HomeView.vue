<template>
  <main>
    <button @click="open()">OPEN</button>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
// import { useRoute } from 'vue-router'
import liff from '@line/liff'

// const route = useRoute()

async function open(): Promise<void> {
  await liff.ready
  // if (!route.query.login) {
  //   if (liff?.isLoggedIn()) {
  //     liff?.logout()
  //   }
  //   const baseUrl = window.location.origin
  //   liff?.login({ redirectUri: `${baseUrl}?login=true` })
  //   return
  // }
  const profile = await liff?.getProfile()
  const userId = profile?.userId || ''
  const idToken = liff?.getIDToken() || ''

  console.log({
    userId,
    idToken
  })

  // if (liff.isInClient()) {
  //   const url = 'https://liff.line.me/2008573781-8qRbpYwz'
  //   liff?.openWindow({ url })
  // } else {
  //   const baseUrl = window.location.origin
  //   window.location.replace(`${baseUrl}/virtual-card`)
  // }
}

async function liffInit(): Promise<void> {
  const liffId = import.meta.env.VITE_APP_LIFF_ID || ''
  await liff.init({ liffId })
  if (!liff.isLoggedIn()) { 
    liff.login()
  }
}

onMounted(liffInit)
</script>

<style scoped>

</style>
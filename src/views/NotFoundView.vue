<template>
  <Teleport to="body">
    <div class="container-not-found">
      <button class="not-f-btn" @click="goHome">Go home</button>
    </div>
  </Teleport>
</template>
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const goHome = () => {
    router.push({ name: 'Home' })
}

</script>
<style>
@import '../style/NotFound.css';
</style>

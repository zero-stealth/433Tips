<template>
  <Teleport to="body">
    <div class="container-not-found">
      <h1>It's empty 😇 , care to add</h1>
      <img src="../assets/404.gif" alt="gif_ing" class="imag-gif" />
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

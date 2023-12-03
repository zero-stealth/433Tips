<script setup>
import axios from 'axios'

import { onMounted, ref } from 'vue'
import { useGameStore } from '../../stores/game.js'

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST
const gameStore = useGameStore()

const tip = ref('')


async function getTip() {
  const response = await axios.get(`${SERVER_HOST}/sports/prediction/${gameStore.gameId}`)
  tip.value = response.data.tip
}

onMounted(() => {
  getTip()
})

</script>

<template>
  <div class="description-container">
    <h1>Game tip</h1>
    <div class="description-nop">
        <p >{{  tip  }}</p>
    </div>

  </div>
</template>

<style>
@import '../../style/tips.css';
@import '../../style/card.css';
@import '../../style/predictions.css';
</style>

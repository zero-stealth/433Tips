<script setup>
import axios from 'axios'

import { onMounted, ref } from 'vue'
import { useGameStore } from '../../stores/game.js'

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST
const gameStore = useGameStore()

const formationsA = ref([])
const formationsB = ref([])
const teamAIcon = ref('')
const teamBIcon = ref('')

async function getTip() {
  const response = await axios.get(`${SERVER_HOST}/sports/prediction/${gameStore.gameId}`)
  teamAIcon.value = response.data.teamAIcon
  teamBIcon.value = response.data.teamBIcon
  formationsA.value = formatFormation(response.data.formationA)
    ? response.data.formationA[0].split('-')
    : []
  formationsB.value = formatFormation(response.data.formationB)
    ? response.data.formationB[0].split('-')
    : []
}

onMounted(() => {
  getTip()
})

const formatFormation = (formation) => {
  if (Array.isArray(formation)) {
    return formation[0].split('-')
  }
  return []
}
</script>

<template>
    <div class="team-form-u">
      <div class="team-header">
        <h1>team Formation</h1>
      </div>
      <div class="Cf-p">
        <div class="cp-sp">
          <img :src="teamAIcon" alt="" class="details-d-img" />
          <div class="card-f" v-for="formationA in formationsA" :key="formationA">
            <span :class="[formationA === 'l' ? 'loose' : formationA === 'w' ? 'win' : 'draw']">{{
              formationA
            }}</span>
          </div>
        </div>
        <div class="cp-sp">
          <img :src="teamBIcon" alt="" class="details-d-img" />
          <div class="card-f" v-for="formationB in formationsB" :key="formationB">
            <span :class="[formationB === 'l' ? 'loose' : formationB === 'w' ? 'win' : 'draw']">{{
              formationB
            }}</span>
          </div>
      </div>
    </div>
  </div>
</template>

<style>
@import '../../style/tips.css';
@import '../../style/card.css';
@import '../../style/predictions.css';
</style>

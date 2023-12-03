<script setup>
import axios from 'axios'
import { onMounted, ref, computed } from 'vue'
import { useGameStore } from '../../stores/game.js'

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST
const gameStore = useGameStore()

const teamA = ref('')
const teamB = ref('')
const teamAIcon = ref(null)
const teamBIcon = ref(null)
const teamAscore = ref('')
const teamBscore = ref('')
const league = ref('')
const leagueIcon = ref('')
const teamAPosition = ref('')
const teamBPosition = ref('')
const time = ref('')
const formationsA = ref([])
const formationsB = ref([])

async function getTip() {
  try {
    const response = await axios.get(`${SERVER_HOST}/sports/prediction/${gameStore.gameId}`)
    teamA.value = response.data.teamA
    teamAIcon.value = response.data.teamAIcon
    teamBIcon.value = response.data.teamBIcon
    teamAscore.value = response.data.teamAscore
    teamBscore.value = response.data.teamBscore
    teamAPosition.value = response.data.teamAPosition
    teamBPosition.value = response.data.teamBPosition
    formationsA.value = formatFormation(response.data.formationA)
      ? response.data.formationA[0].split('-')
      : []
    formationsB.value = formatFormation(response.data.formationB)
      ? response.data.formationB[0].split('-')
      : []
    league.value = response.data.league
    leagueIcon.value = response.data.leagueIcon
    time.value = response.data.time
  } catch (error) {
    console.error('Error fetching tip:', error)
    // Handle the error, e.g., show a message to the user
  }
}

onMounted(() => {
  getTip()

})



const formatFormation = (formation) => {
  return Array.isArray(formation) ? formation[0].split('-') : []
}

const sortedTeams = computed(() => {
  const positionA = parseInt(teamAPosition.value) || 0
  const positionB = parseInt(teamBPosition.value) || 0

  const teams = [
    { position: positionA, name: teamA.value, score: parseInt(teamAscore.value) },
    { position: positionB, name: teamB.value, score: parseInt(teamBscore.value) }
  ]

  return teams.sort((a, b) => a.position - b.position)
})
</script>

<template>
  <div class="details-container">
    <div class="team-header">
      <h1>table</h1>
    </div>
    <div class="team-form-a">
      <div class="tbl-slider">
            <table>
              <tr>
                <th>position</th>
                <th>team</th>
              </tr>
              <tr v-for="team in sortedTeams" :key="team.name">
                <td>{{ team.position }}</td>
                <td>
                  <div class="table-formation">
                    <img :src="team.name === teamA ? teamAIcon : teamBIcon" alt="" class="tbl-f-image" />
                  </div>
                </td>
              </tr>
            </table>
          </div>
    </div>
  </div>
</template>

<style>
@import '../../style/tips.css';
@import '../../style/card.css';
@import '../../style/predictions.css';
</style>
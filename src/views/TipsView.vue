<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import banner from '@/assets/banner.jpeg'
import ArrowIcon from '@/icons/ArrowIcon.vue'
import axios from 'axios'

const router = useRouter()
const props = defineProps({
  id: String
})
const teamA = ref('')
const teamB = ref('')
const teamAscore = ref('')
const teamBscore = ref('')
const teamAIcon = ref('')
const teamBIcon = ref('')
const league = ref('')
const leagueIcon = ref('')
const teamAPosition = ref('')
const teamBPosition = ref('')
const time = ref('')
const showScore = ref('')
const formationsA = ref([])
const formationsB = ref([])

async function getTip() {
  const response = await axios.get(
    `https://predictions-reg9.onrender.com/predictions/single/${props.id}`
  )
  teamA.value = response.data.teamA
  teamB.value = response.data.teamB
  showScore.value = response.data.showScore
  teamAIcon.value = response.data.teamAIcon
  teamBIcon.value = response.data.teamBIcon
  teamAscore.value = response.data.teamAscore
  teamAPosition.value = response.data.teamAPosition
  teamBPosition.value = response.data.teamBPosition
  teamBscore.value = response.data.teamBscore
  formationsA.value = formatFormation(response.data.formationA)
    ? response.data.formationA[0].split('-')
    : []
  formationsB.value = formatFormation(response.data.formationB)
    ? response.data.formationB[0].split('-')
    : []
  league.value = response.data.league
  leagueIcon.value = response.data.leagueIcon
  time.value = response.data.time
}

onMounted(() => {
  getTip()
})

const goBack = () => {
  router.go(-1)
}

const formatFormation = (formation) => {
  if (Array.isArray(formation)) {
    return formation[0].split('-')
  }
  return []
}


// Arrange table rows based on numeric order
const sortedTeams = computed(() => {
  // Parse the position values or provide a default value (e.g., 0) if parsing fails
  const positionA = parseInt(teamAPosition.value) || 0;
  const positionB = parseInt(teamBPosition.value) || 0;

  const teams = [
    { position: positionA, name: teamA.value, score: parseInt(teamAscore.value) },
    { position: positionB, name: teamB.value, score: parseInt(teamBscore.value) }
  ];

  return teams.sort((a, b) => a.position - b.position);
});

</script>

<template>
  <div class="details-container">
    <div class="details-wrapper">
      <div
        class="details-image"
        :style="{
          backgroundImage: `linear-gradient(to bottom, transparent, #031e3c), url(${banner})`
        }"
      >
        <div class="details-h">
          <ArrowIcon class="details-arrow" @click="goBack()" />
          <h2>{{ league }}</h2>
          <span></span>
        </div>
        <div class="details-image-d">
          <div class="details-d">
            <img :src="teamAIcon" alt="" class="details-d-img" />
            <span>{{ teamA }}</span>
          </div>
          <div v-if="!showScore" class="details-score">
            <h1>vs</h1>
          </div>
          <div v-else class="details-score">
            <div class="score-p">
              <span>{{ teamAscore }}</span>
              <span>-</span>
              <span>{{ teamBscore }}</span>
            </div>
            <span>{{ time }}</span>
          </div>
          <div class="details-d">
            <img :src="teamBIcon" alt="" class="details-d-img" />
            <span>{{ teamB }}</span>
          </div>
        </div>
      </div>
      <div class="upcoming-in">
        <div class="team-form-u">
          <div class="form-as">
            <div class="team-header">
              <h1>team form</h1>
            </div>
            <div class="Cf-p">
              <div class="cp-sp">
                <img :src="teamAIcon" alt="" class="details-d-img" />
                <div class="card-f" v-for="formationA in formationsA" :key="formationA">
                  <span
                    :class="[formationA === 'l' ? 'loose' : formationA === 'w' ? 'win' : 'draw']"
                    >{{ formationA }}</span
                  >
                </div>
              </div>
              <div class="cp-sp">
                <img :src="teamBIcon" alt="" class="details-d-img" />
                <div class="card-f" v-for="formationB in formationsB" :key="formationB">
                  <span
                    :class="[formationB === 'l' ? 'loose' : formationB === 'w' ? 'win' : 'draw']"
                    >{{ formationB }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="team-form-a">
          <div class="team-header">
            <img :src="leagueIcon" alt="" class="tbl-f-image tbl-l-i" />
            <h4>{{ league }}</h4>
          </div>
          <div class="tbl-slider">
            <table>
              <tr>
                <th>position</th>
                <th>team</th>
                <th>score</th>
              </tr>
              <tr v-for="team in sortedTeams" :key="team.name">
                <td>{{ team.position }}</td>
                <td>
                  <div class="table-formation">
                    <img :src="team.name === teamA ? teamAIcon : teamBIcon" alt="" class="tbl-f-image" />
                    <span>{{ team.name === teamA? teamA : teamB }}</span>
                  </div>
                </td>
                <td>{{ team.score }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import '../style/tips.css';
@import '../style/card.css';
@import '../style/predictions.css';
</style>

<template>
  <div class="main-bet">
    <div class="main-header">
      <div class="header-info">
        <h1>Free tips {{ currentDate }}</h1>
      </div>
      <div class="header-btn">
        <input type="date" v-model="selectedDate" @change="onDateChange" class="date-filter" />
      </div>
    </div>
    <template v-if="cardData.length > 0">
      <div v-for="item in cardData" class="main-h-card booom-h">
        <Card
          v-for="(card) in item"
          :key="card._id"
          :tip="card.tip"
          :status="card.status"
          :leagueIcon="card.leagueIcon"
          :teamAIcon="card.teamAIcon"
          :teamBIcon="card.teamBIcon"
          :teamA="card.teamA"
          :teamB="card.teamB"
          :league="card.league"
          :showScore="card.showScore"
          :teamAscore="card.teamAscore"
          :teamBscore="card.teamBscore"
          :formationA="formatFormation(card.formationA) ? card.formationA[0].split('-') : []"
          :formationB="formatFormation(card.formationB) ? card.formationB[0].split('-') : []"
          :time="card.time"
          @click="showCard(card.teamA, card.teamB, card._id)"

        />
      </div>
    </template>
    <template v-else>
      <div class="home-freetip">
        <h1>No predictions yet! Check back later.</h1>
      </div>
    </template>
    <div class="main-header header-info c-info">
      <h1>Available Predictions</h1>
    </div>
    <OtherComponent />
  </div>
<sportComponent/>
</template>
<script setup>
import OtherComponent from '../components/OtherComponent.vue'
import sportComponent from '../components/sportComponent.vue'
import Card from '../components/cardcomponent.vue'
import { ref, watchEffect, onMounted } from 'vue'
import { useToast } from 'vue-toastification';
import { useGameStore } from '../stores/game'
import { useRouter } from 'vue-router'
import axios from 'axios'

const toast = useToast();
const cardData = ref([])
const router = useRouter()
const currentDate = ref('')
const gameStore = useGameStore()
const selectedDate = ref(formatDate(new Date()))
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;


const showCard = (gameA, gameB, cardID) => {
  router.push({ name: 'Tips', params: { tipName: `${gameA} vs ${gameB} prediction` } })
  gameStore.updateGameId(cardID)
}


const predictions = async () => {
  try {
    // const token = localStorage.getItem('token')
    const response = await axios.get(
      `${SERVER_HOST}/predictions/tips/freeTip/${selectedDate.value}`
    )
    cardData.value = response.data.length > 0 ? [response.data] : []
  } catch (err) {
    toast.error(err.response.data.message);

  }
}

const onDateChange = () => {
  updateCurrentDate()
  predictions()
}

const updateCurrentDate = () => {
  currentDate.value = formatDate(new Date(selectedDate.value)) // Format selectedDate to "dd-mm-yyyy"
}

onMounted(() => {
  updateCurrentDate() // Format currentDate on mount
  predictions()
})

watchEffect(() => {
  predictions()
})

const formatFormation = (formation) => {
  if (formation && formation.length > 0) {
    return formation[0].split('-')
  }
  return []
}
</script>

<script>
const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}-${month}-${year}`
}
</script>

<style>
@import '../style/Home.css';
@import '../style/Bet.css';
</style>

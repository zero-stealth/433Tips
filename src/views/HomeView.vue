<template>
  <HeroComponent />
  <div class="home-main">
    <div class="main-h">
      <div class="main-header">
      <div class="header-info">
        <h1>Free tips {{ currentDate }}</h1>
      </div>
      <div class="header-btn">
        <input type="date" v-model="selectedDate" @change="onDateChange" class="date-filter" />
      </div>
    </div>
      <template v-if="cardData.length > 0">
        <div class="main-h-card">
          <Card
            v-for="(card) in cardData"
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
            :formationA="formatFormation(card.formationA)"
            :formationB="formatFormation(card.formationB)"
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
    </div>
    <div class="main-header header-info c-info">
      <h1>Available Predictions</h1>
    </div>
    <OtherComponent />
    <AboutComponent />
  </div>
</template>
<script setup>
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useGameStore } from '../stores/game'
import { useToast } from 'vue-toastification';
import Card from '../components/CardComponent.vue'
import HeroComponent from '../components/HeroComponent.vue'
import AboutComponent from '../components/aboutComponent.vue'
import OtherComponent from '../components/OtherComponent.vue'

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST
const selectedDate = ref(formatDate(new Date()))
const gameStore = useGameStore()
const currentDate = ref('')
const router = useRouter()
const toast = useToast();
const cardData = ref([])

const showCard = (gameA, gameB, cardID) => {
  router.push({ name: 'Tips', params: { tipName: `${gameA} vs ${gameB} prediction` } })
  gameStore.updateGameId(cardID)
}



const predictions = async () => {
  try {
    const response = await axios.get(
      `${SERVER_HOST}/sports/sport/Tennis/${currentDate.value}`
    )
    cardData.value = response.data
  } catch (err) {
    toast.error(err.response.data.message);

  }
}

const onDateChange = () => {
  updateCurrentDate()
  predictions()
}

const updateCurrentDate = () => {
  currentDate.value = formatDate(new Date(selectedDate.value))
}

const formatFormation = (formation) => {
  if (formation && formation.length > 0) {
    return formation[0].split('-')
  }
  return []
}
</script>

<script>
import { ref } from 'vue'

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}-${month}-${year}`
}
</script>

<style scoped>
@import '../style/Home.css';
</style>

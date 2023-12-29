<template>
  <div class="main-bet">
    <div class="main-header m-sgam">
      <div class="header-info">
        <h1>{{  jackpotName }} {{ currentDate }}</h1>
      </div>
      <div class="header-btn">
        <input type="date" @change="onDateChange" v-model="currentDate" class="date-filter" />
      </div>
    </div>
    <template v-if="cardData.length > 0">
      <div class="m-cardGame">
        <div v-for="item in cardData" class="main-cardGame" :key="item._id">
        <CardGame
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
          :time="card.time"
          class="card-game-a"
          @click="showCard(card.teamA, card.teamB, card._id)"

        />
      </div>
      </div>
    </template>
    <template v-else>
      <div class="home-freetip">
        <h1>No predictions yet! Check back later.</h1>
      </div>
    </template>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import CardGame from '../components/CardGame.vue'
import { useGameStore } from '../stores/game'
import { useRouter } from 'vue-router'
import axios from 'axios'

const cardData = ref([])
const router = useRouter()
const currentDate = ref('')
const jackpotName = ref('')
const gameStore = useGameStore()
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST



const showCard = (gameA, gameB, cardID) => {
  router.push({ name: 'JackpotTip', params: { jackpotName: `${gameA} vs ${gameB} prediction` } })
  gameStore.updateGameId(cardID)
}

const predictions = async () => {
  try {
    // const token = localStorage.getItem('token')
    const response = await axios.get(
      `${SERVER_HOST}/predictions/jackpot-predictions/jackpot/${currentDate.value}`
    )
    console.log(response.data)
    cardData.value = response.data.length > 0 ? [response.data] : []
    jackpotName.value = response.data[0].jackpot
  } catch (err) {
    console.log(err)
  }
}

const onDateChange = () => {
  currentDate.value = formatDate(new Date(currentDate.value))
  predictions()
}


const updateCurrentDate = () => {
  currentDate.value = formatDate(new Date())

}

onMounted(() => {
  updateCurrentDate();
  predictions();
});
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

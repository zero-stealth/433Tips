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
</template>
<script setup>
import OtherComponent from '../components/OtherComponent.vue'
import Card from '../components/CardComponent.vue'
import { ref, watchEffect, onMounted } from 'vue'
import axios from 'axios'

const cardData = ref([])
const currentDate = ref('')
const selectedDate = ref(formatDate(new Date()))
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;


const showDate = () => {
  if (selectedDate != '') {
    watch(selectedDate, () => {
      return selectedDate.value
    })
  } else {
    return selectedDate.value
  }
}

const predictions = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get(
      `${SERVER_HOST}/predictions/tips/freeTip/${selectedDate.value}`
    )
    console.log(response.data)
    cardData.value = response.data.length > 0 ? [response.data] : []
  } catch (err) {
    console.log(err)
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

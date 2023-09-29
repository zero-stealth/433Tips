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
            @click="showCard(card._id)"
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
    <Upcoming />
    <AboutComponent />
  </div>
</template>
<script setup>
import axios from 'axios'
import { useRouter } from 'vue-router'
import Card from '../components/CardComponent.vue'
import Upcoming from '../components/UpcomingPicks.vue'
import { ref, onMounted, watch, watchEffect } from 'vue'
import HeroComponent from '../components/HeroComponent.vue'
import AboutComponent from '../components/aboutComponent.vue'
import OtherComponent from '../components/OtherComponent.vue'

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST
const selectedDate = ref(formatDate(new Date()))
const currentDate = ref('')
const router = useRouter()
const cardData = ref([])

const showCard = (cardID) => {
  router.push({ name: 'Tips', params: { id: cardID } })
}



const showDate = () => {
  if (selectedDate.value != '') {
    watch(selectedDate, () => {
      return selectedDate.value
    })
  } else {
    return selectedDate.value
  }
}

const predictions = async () => {
  try {
    // const token = localStorage.getItem('token')
    const response = await axios.get(
      `${SERVER_HOST}/predictions/tips/freeTip/${selectedDate.value}`
    )
    console.log(response.data)
    cardData.value = response.data
  } catch (err) {
    console.log(err)
  }
}

const onDateChange = () => {
  updateCurrentDate()
  predictions()
}

const updateCurrentDate = () => {
  currentDate.value = formatDate(new Date(selectedDate.value)) 
}


onMounted(() => {
  updateCurrentDate() // Format currentDate on mount
  predictions()
  showDate()
})

watchEffect(() => {
  predictions()
  showDate()
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
<style scoped>
@import '../style/Home.css';
</style>

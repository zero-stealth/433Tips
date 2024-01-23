<template>
  <div class="main-bet">
    <div class="main-header">
      <div class="header-info">
        <h1>Other sport {{ currentDate }}</h1>
      </div>
      <div class="header-btn">
        <input type="date" @change="onDateChange" v-model="currentDate" class="date-filter" />
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
            @click="showCard(card.date, card.teamA, card.teamB)"


          />
        </div>
      </template>
      <template v-else>
        <div class="home-freetip">
          <h1>No predictions yet! Check back later.</h1>
        </div>
      </template>
    <div class="main-header header-info c-info">
      <h1>Available predictions</h1>
    </div>
    <OtherComponent />
  </div>
<sportComponent/>
</template>
<script setup>
import OtherComponent from '../components/OtherComponent.vue'
import sportComponent from '../components/sportComponent.vue'
import Card from '../components/CardComponent.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const cardData = ref([])
const router = useRouter()
const currentDate = ref('')
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;



const showCard = (date, teamA, teamB) => {
  router.push({
    name: 'Tips',
    params: {
      date: date,
      teamA: teamA,
      teamB: teamB,
    },
  });
};

const getSports = async () => {
  try {
    // const token = JSON.parse(localStorage.getItem('token'));
    const response = await axios.get(`${SERVER_HOST}/sports/${currentDate.value}`)
    cardData.value = response.data.length > 0 ? [response.data] : []
  } catch (err) {
    // console.log(err)
  }
}
const onDateChange = () => {
  currentDate.value = formatDate(new Date(currentDate.value))
  getSports()
}


const updateCurrentDate = () => {
  currentDate.value = formatDate(new Date())

}

const formatFormation = (formation) => {
  if (formation && formation.length > 0) {
    return formation[0].split('-')
  }
  return []
}

onMounted(() => {
  updateCurrentDate();
  getSports();
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

<template>
  <HeroComponent />
  <div class="home-main">
    <div class="main-h">
      <div class="main-header">
      <div class="header-info">
        <h1>Free tips {{ currentDate }}</h1>
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
    </div>
    <OtherComponent />
    <AboutComponent />
  </div>
</template>
<script setup>
import axios from 'axios'
import { ref , onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification';
import Card from '../components/CardComponent.vue'
import HeroComponent from '../components/HeroComponent.vue'
import AboutComponent from '../components/aboutComponent.vue'
import OtherComponent from '../components/OtherComponent.vue'

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST
const currentDate = ref('')
const router = useRouter()
const toast = useToast();
const cardData = ref([])


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



const predictions = async () => {
  try {
    const response = await axios.get(
      `${SERVER_HOST}/predictions/tips/freeTip/${currentDate.value}`
    )
    cardData.value = response.data
  } catch (err) {
    toast.error(err.response.data.message);

  }
}

const onDateChange = () => {
  currentDate.value = formatDate(new Date(currentDate.value))
  predictions()
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

<style scoped>
@import '../style/Home.css';
</style>

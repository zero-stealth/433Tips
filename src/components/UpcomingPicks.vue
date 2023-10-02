Sure, here's the updated code with the suggested changes applied:

```vue
<template>
  <div class="home-main">
    <div class="main-h">
      <div class="main-header home-up">
        <h1>Free tips</h1>
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
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import Card from '../components/CardComponent.vue'; // Check the path

const router = useRouter();
const currentDate = ref('');
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;

const showCard = (cardID) => {
  router.push({ name: 'Tips', params: { id: cardID } });
};

const cardData = ref([]);

const getPrediction = async () => {
  try {
    const response = await axios.get(
      `${SERVER_HOST}/sports/sport/Tennis/${currentDate.value}`
    );
    cardData.value = response.data;
  } catch (err) {
    console.error(err);
  }
};

onMounted(() => {
  updateCurrentDate();
  getPrediction();
});

const offset = computed(() => {
  // Calculate offset logic here if needed
  return 0; // Example value, change as needed
});

const updateCurrentDate = () => {
  const today = new Date();
  today.setDate(today.getDate() + offset.value);
  const month = today.getMonth() + 1;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const day = today.getDate();
  const formattedDay = day < 10 ? `0${day}` : day;
  currentDate.value = `${formattedDay}-${formattedMonth}-${today.getFullYear()}`;
};

const formatFormation = (formation) => {
  return Array.isArray(formation) ? formation[0].split('-') : [];
};
</script>

<style scoped>
@import '../style/Home.css';
</style>
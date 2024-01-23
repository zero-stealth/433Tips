<template>
  <div class="home-container">
    <div class="layout">
      <div class="league-layout">
        <league />
      </div>
      <div class="main-layout">
        <div class="desk-show">
          <adpanel />
        </div>
        <gamePanel />
      </div>
      <div class="news-layout">
        <news />
      </div>
    </div>
  </div>
  <jackpotComponent/>
</template>
<script setup>
import axios from 'axios';
import news from '../components/newsComponent.vue'
import league from '../components/leagueComponent.vue'
import adpanel from '../components/adPanel.vue'
import gamePanel from '../components/gamePanel.vue'
import jackpotComponent from '../components/jackpotComponent.vue';
import { ref, onMounted, watch } from 'vue';

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;
const upcomingDates = ref('');
const currentDate = ref('');
const cardData = ref([]);

async function getPrediction() {
  const token = JSON.parse(localStorage.getItem('token'));

  try {
    const response = await axios.get(
      `${SERVER_HOST}/predictions/bet/jackpot/${currentDate.value}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    cardData.value = response.data.length > 0 ? [response.data] : [];
  } catch (err) {
    // toast.error(err.response.data.message);

  }
}

onMounted(() => {
  getPrediction();
});

const offset = ref(0);



const updateCurrentDate = () => {
  const today = new Date();
  today.setDate(today.getDate() + offset.value);
  const month = today.getMonth() + 1;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const day = today.getDate();
  const formattedDay = day < 10 ? `0${day}` : day;
  upcomingDates.value = `${formattedDay}-${formattedMonth}-${today.getFullYear()}`;
  currentDate.value = `${formattedDay}-${formattedMonth}-${today.getFullYear()}`;
};

updateCurrentDate();



watch(currentDate, () => {
  getPrediction();
});
</script>

<style>
@import '../style/Home.css';
</style>

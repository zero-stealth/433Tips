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
</template>
<script setup>
import axios from 'axios';
import news from '../components/news.vue'
import league from '../components/league.vue'
import adpanel from '../components/adPanel.vue'
import gamePanel from '../components/gamePanel.vue'
import { ref, onMounted, watch } from 'vue';

const upcomingDates = ref('');
const currentDate = ref('');
const cardData = ref([]);

async function getPrediction() {
  const token = JSON.parse(localStorage.getItem('token'));

  try {
    const response = await axios.get(
      `https://predictions-reg9.onrender.com/sports/sport/Basketball/${currentDate.value}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    cardData.value = response.data.length > 0 ? [response.data] : []; // Set the data or an empty array
    console.log(cardData.value);
  } catch (err) {
    console.log(err);
  }
}

onMounted(() => {
  getPrediction();
});

const offset = ref(0);

const previousDay = () => {
  offset.value--;
  updateCurrentDate();
};

const nextDay = () => {
  if (offset.value < 1) {
    offset.value++;
    updateCurrentDate();
  }
};

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

const formatFormation = (formation) => {
  if (Array.isArray(formation)) {
    return formation[0].split('-');
  }
  return [];
};

watch(currentDate, () => {
  getPrediction();
});
</script>

<style>
@import '../style/Home.css';
</style>

<script setup>
import ArrowIcon from '../icons/ArrowIcon.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';

const LeagueData = ref([]);
const isLeague = ref(true);
const currentDate = ref(formatFixtureDate(new Date()));
const SPORT_API = import.meta.env.VITE_SPORT_API;
const SPORT_KEY = import.meta.env.VITE_SPORT_KEY;
const toast = useToast();

const showLeague = () => {
  isLeague.value = !isLeague.value;
};

const updateCurrentDate = () => {
  currentDate.value = formatFixtureDate(new Date());
};

const getFixture = async () => {
  try {
    const response = await axios.get(`${SPORT_API}/fixtures`, {
      params: {
        date: currentDate.value,
      },
      headers: {
        'x-apisports-key': SPORT_KEY,
      },
    });

    LeagueData.value = response.data.response;
    toast.success('Fixture data fetched');
  } catch (error) {
    console.error('Error fetching fixture data', error);
    toast.error('Error fetching fixture data');
  }
};

onMounted(() => {
  getFixture();
  updateCurrentDate();
});
</script>
<script>
const formatFixtureDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${year}-${month}-${day}`
}
</script>
<template>
  <template v-if="LeagueData.length > 0">
    <div class="league-container">
      <div class="l-c-wrapper">
        <div class="league-header" @click="showLeague">
          <h1>league</h1>
          <ArrowIcon class="league-icon" :class="[isLeague ? 'icon-active' : '']" />
          <span v-if="isLeague">Hide all</span>
          <span v-else>View all</span>
        </div>
        <div class="l-items-list" v-show="isLeague">
          <div class="l-items-container" v-for="(l, index) in LeagueData" :key="index">
            <div :style="{ backgroundImage: `url(${l.league.logo})` }" class="l-items-image">
              <!-- img -->
            </div>
            <span>Country: {{ l.league.country }}</span>
            <span>{{ l.league.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  <template v-else>
    <div class="no-news">
      <span>No league yet!</span>
    </div>
  </template>
</template>

<style>
@import '../style/league.css';
</style>

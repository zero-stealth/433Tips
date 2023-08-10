<script setup>
import ArrowIcon from '../icons/ArrowIcon.vue'
import axios from 'axios'
import { ref, onMounted } from 'vue'

const LeagueData = ref([]);
const isLeague = ref(true)


const showLeague = () => {
  isLeague.value = !isLeague.value
}


const getPrediction = async () => {
  try {
    const response = await axios.get(
      `https://four33tips.onrender.com/predictions/tips/freeTip/07-08-2023`
    )
    LeagueData.value = response.data
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  getPrediction()
})

</script>
<template>
   <template v-if="LeagueData.length > 0">
    <div class="league-container">
    <div class="l-c-wrapper">
      <div class="league-header" @click="showLeague()">
        <h1>league</h1>
        <ArrowIcon class="league-icon" :class="[isLeague == true ? 'icon-active' : '']" />
        <span v-if="isLeague"> Hide all</span>
        <span v-else>View all</span>
      </div>
      <div class="l-items-list" v-show="isLeague == true" >
        <div class="l-items-container"  v-for="({ league,  leagueIcon, }, index) in LeagueData"
        :key="index">
          <div :style="{ backgroundImage: `url(${leagueIcon})`}" class="l-items-image">
            <!-- img -->
          </div>
          <span>{{ league }}</span>
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

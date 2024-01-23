<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import ArrowIcon from '../icons/ArrowIcon.vue'

const Data = ref([])
const isTeam = ref(false)
const isLeague = ref(false)
const isCountry = ref(false)
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST
const currentDate = ref(formatFixtureDate(new Date()))

const showLeague = () => {
  isLeague.value = !isLeague.value
}
const showCountry = () => {
  isCountry.value = !isCountry.value

}
const showTeam = () => {
  isTeam.value = !isTeam.value
}

const updateCurrentDate = () => {
  currentDate.value = formatFixtureDate(new Date())
}


const getJackpot = async () => {
  try {
    // const token = JSON.parse(localStorage.getItem('token'));
    const response = await axios.get( `${SERVER_HOST}/predictions/jackpot-predictions/jackpot/${currentDate.value}`)
    Data.value = response.data.length > 0 ? [response.data] : []
    console.log(Data.value)
  } catch (err) {
    // console.log(err)
  }
}

const leagueName = (name) => {
  localStorage.setItem('leagueName', name)
  showLeague()
}

const CountryName = (name) => {
  localStorage.setItem('CountryName', name)
  showCountry()
}

const TeamName = (name) => {
  localStorage.setItem('TeamName', name)
  showTeam()
}

onMounted(() => {
  getJackpot()
  updateCurrentDate()
})
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
  <template v-if="Data.length > 0">
    <div class="league-container">
      <div class="l-c-wrapper">
        <div class="league-header" @click="showLeague">
          <h1>league</h1>
          <ArrowIcon class="league-icon" :class="[isLeague ? 'icon-active' : '']" />
          <span v-if="isLeague">Hide all</span>
          <span v-else>View all</span>
        </div>
        <div class="l-items-list" v-show="isLeague">
          <div class="l-items-container" v-for="(l, index) in Data" :key="index" @click="leagueName(l.league.name)">
            <div :style="{ backgroundImage: `url(${l.league.leagueIcon})` }" class="l-items-image">
              <!-- img -->
            </div>
            <span>{{ l.league.name }}</span>
          </div>
        </div>
      </div>
      <div class="l-c-wrapper">
        <div class="league-header" @click="showCountry">
          <h1>Country</h1>
          <ArrowIcon class="league-icon" :class="[isCountry ? 'icon-active' : '']" />
          <span v-if="isCountry">Hide all</span>
          <span v-else>View all</span>
        </div>
        <div class="l-items-list" v-show="isCountry">
          <div class="l-items-container" v-for="(l, index) in Data" :key="index" @click="CountryName(l.league.country)">
        
            <span>{{ l.league.country }}</span>
          </div>
        </div>
      </div>
      <div class="l-c-wrapper">
        <div class="league-header" @click="showTeam">
          <h1>Team</h1>
          <ArrowIcon class="league-icon" :class="[isTeam ? 'icon-active' : '']" />
          <span v-if="isTeam">Hide all</span>
          <span v-else>View all</span>
        </div>
        <div class="l-items-list" v-show="isTeam">
          <div class="l-items-container" v-for="(l, index) in Data" :key="index" @click="TeamName(l.teams.away.name)">
            <div :style="{ backgroundImage: `url(${l.teamAIcon})` }" class="l-items-image">
              <!-- img -->
            </div>
            <span>{{ l.teamA}}</span>
            <div :style="{ backgroundImage: `url(${l.teamBIcon})` }" class="l-items-image">
              <!-- img -->
            </div>
            <span>{{ l.teamB}}</span>
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

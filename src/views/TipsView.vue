<script setup>
import axios from 'axios'
import banner from '../assets/dark.png'
import ArrowIcon from '@/icons/ArrowIcon.vue'
import { onMounted, ref, shallowRef } from 'vue'
import { useRoute ,useRouter} from 'vue-router'

// pages
import formationSection from '../components/tips/formationSection.vue'
import standingsSection from '../components/tips/standingsSection.vue'
import tipsSection from '../components/tips/tipsSection.vue'

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST
const router = useRouter()
const route = useRoute()

const teamA = ref('')
const teamB = ref('')
const teamAscore = ref('')
const teamBscore = ref('')
const teamAIcon = ref('')
const teamBIcon = ref('')
const league = ref('')
const leagueIcon = ref('')
const teamAPosition = ref('')
const teamBPosition = ref('')
const time = ref('')
const date = ref('')
const showScore = ref('')

const activePage = shallowRef(formationSection)

const setActivePage = (page) => {
  activePage.value = page
}

const getButtonClass = (page) => {
  return ['nav-tip', activePage.value === page ? 'active-tip' : 'inactive-tip']
}

async function getTip() {
  const response = await axios.get(`${SERVER_HOST}/predictions/single/${route.params.date}/${route.params.teamA}/${route.params.teamB}`)
  teamA.value = response.data.teamA
  teamB.value = response.data.teamB
  showScore.value = response.data.showScore
  teamAIcon.value = response.data.teamAIcon
  teamBIcon.value = response.data.teamBIcon
  teamAscore.value = response.data.teamAscore
  teamAPosition.value = response.data.teamAPosition
  teamBPosition.value = response.data.teamBPosition
  teamBscore.value = response.data.teamBscore
  league.value = response.data.league
  leagueIcon.value = response.data.leagueIcon
  time.value = response.data.time
  date.value = response.data.date

}

onMounted(() => {
  getTip()
})

const goBack = () => {
  router.go(-1)
}

function formatDate(inputDate) {
  const parts = inputDate.split('-')
  const day = parts[0]
  const month = parts[1]
  const year = parts[2]

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  const formattedDate = `${day} | ${months[parseInt(month, 10) - 1]} | ${year}`
  return formattedDate
}

</script>

<template>
  <div class="details-container">
    <div class="details-h-conx">
       <div class="details-header-title">
        <h1>{{ teamA }} vs {{ teamB }} prediction {{ formatDate(date) }}</h1>
      </div>
      <div class="details-h">
        <ArrowIcon class="details-arrow" @click="goBack()" />
        <div class="details-h-inn">
          <img :src="leagueIcon" alt="" class="tbl-f-image tbl-l-i" />
          <h2>{{ league }}</h2>
        </div>
        <span class="pulse"></span>
      </div>
    </div>
    <div
      class="details-image"
      :style="{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.9), #042f59), url(${banner})`
      }"
    >
      <div class="details-image-d">
        <div class="details-d">
          <img :src="teamAIcon" alt="" class="details-d-img" />
          <span>{{ teamA }}</span>
        </div>
        <div class="details-midd">
          {{ [time] }}
        </div>
        <div class="details-d">
          <img :src="teamBIcon" alt="" class="details-d-img" />
          <span>{{ teamB }}</span>
        </div>
      </div>
    </div>
    <div class="nav-tips">
      <button @click="setActivePage(formationSection)" :class="getButtonClass(formationSection)">
        <span>Formation</span>
      </button>
      <button @click="setActivePage(standingsSection)" :class="getButtonClass(standingsSection)">
        <span>Standing</span>
      </button>

      <button @click="setActivePage(tipsSection)" :class="getButtonClass(tipsSection)">
        <span>Tips</span>
      </button>
    </div>
    <div class="tips-main">
      <component :is="activePage" />
    </div>
  </div>
</template>

<style>
@import '../style/tips.css';
@import '../style/card.css';
@import '../style/predictions.css';
</style>

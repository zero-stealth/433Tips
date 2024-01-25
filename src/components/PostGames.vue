<template>
  <div class="form-con">
    <div class="sd-container">
      <div class="drop-container">
        <div class="drop-down" @click="showDrop" :class="[isDropOpen ? 'active' : '']">
          <span>{{ postType }}</span>
          <ArrowIcon class="drop-icon" />
        </div>
        <div
          class="drop-down-panel game-drop-down"
          :class="[isDropOpen ? 'show' : 'hide']"
          v-show="isDropOpen"
        >
          <div class="drop-item" @click="updatePostType('Manual')">
            <span>Manual</span>
          </div>
          <div class="drop-item" @click="updatePostType('Automatic')">
            <span>Automatic</span>
          </div>
        </div>
      </div>
      <div class="drop-container">
        <div class="drop-down" @click="showDrp" :class="[isDrpOpen ? 'active' : '']">
          <span>{{ category ? category : 'Game category' }}</span>
          <ArrowIcon class="drop-icon" />
        </div>
        <div
          class="drop-down-panel game-drop-down"
          :class="[isDrpOpen ? 'show' : 'hide']"
          v-show="isDrpOpen"
        >
          <div v-for="c in categories" :key="c.id" class="drop-item" @click="updateUrl(c.name)">
            <span>{{ c.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="postType === 'Automatic'">
      <form @submit.prevent="handleSubmit" enctype="multipart/form-data" class="form-container">
        <div class="form-wrapper">
          <h1>Team A</h1>
          <TeamSelector v-if="teamA.length === 0" @teamSelected="handleTeamASelected" />
          <div class="form-g-input" v-else>
            <span>{{ teamA }}</span>
          </div>
          <div class="form-group">
            <label for="teamAIcon">Logo:</label>
            <img
              :src="teamAIcon"
              :alt="teamA"
              class="form-i-image"
            />
          </div>
          <div class="form-group">
            <label for="Status">Status:</label>
            <input v-model="status" type="text" class="form-g-input" placeholder="true" id="status" />
          </div>
          <div class="form-group">
            <label for="formationA">Formation:</label>
            <input
              v-model="formationA"
              type="text"
              class="form-g-input"
              placeholder="l-w-d-w"
              id="formationA"
            />
          </div>
          <div class="form-group">
            <label for="teamAPosition">Position:</label>
            <input
              v-model="teamAPosition"
              type="text"
              class="form-g-input"
              placeholder="1"
              id="teamAPosition"
            />
          </div>
        </div>
        <div class="form-wrapper">
          <div class="form-group">
            <label for="tip">Match Tip:</label>
            <input v-model="tip" type="text" class="form-g-input" placeholder="1" id="tip" />
          </div>
          <div class="form-group">
            <label for="leagueIcon">League logo</label>
            <input
              @change="handleLeagueLogo"
              type="file"
              class="form-g-input"
              id="leagueIcon"
              accept="image/*"
            />
          </div>
   
          <div class="form-group">
            <label for="league">Match league:</label>
            <span class="form-g-input" v-if="fixtureData && fixtureData.length">{{ league }}</span>
            <input
              v-else
              type="text"
              class="form-g-input"
              placeholder="Premier League"
              id="league"
              v-model="league"
            />
          </div>
          <div class="form-group">
            <label for="time">Match Time:</label>
            <input
              v-model="time"
              type="time"
              class="form-g-input"
              placeholder="12:00pm"
              id="time"
            />
          </div>
          <div class="form-group">
            <label for="date">Match Date:</label>
            <span class="form-g-input"> {{ currentDate }}</span>
            <input type="date" @change="onDateChange" v-model="currentDate" class="form-g-input" />
          </div>
          <button type="submit" class="btn-f-f f-desktop">Submit</button>
        </div>
        <div class="form-wrapper">
          <h1>Team B</h1>
          <TeamSelector v-if="teamB.length === 0" @teamSelected="handleTeamBSelected" />
          <div class="form-g-input" v-else>
            <span>{{ teamB }}</span>
          </div>
          <div class="form-group">
            <label for="teamBIcon">Logo:</label>
            <img
              :src="teamBIcon"
              :alt="teamB"
              class="form-i-image"
            />
           
          </div>
          <div class="form-group">
            <label for="jackpot">Jackpot name:</label>
            <input
              v-model="jackpot"
              type="text"
              class="form-g-input"
              placeholder="jackpot name"
              id="jackpot"
            />
          </div>
          <div class="form-group" v-if="category === 'Jackpot'">
            <label for="country">Country:</label>
            <input
              v-if="countryName.length === 0"
              v-model="countryName"
              type="text"
              class="form-g-input"
              placeholder="England"
              id="country"
            />
            <div class="form-g-input" v-else>
              <span>{{ countryName }}</span>
            </div>
          </div>
          <div class="form-group">
            <label for="formationB">Formation:</label>
            <input
              v-model="formationB"
              type="text"
              class="form-g-input"
              placeholder="l-w-d-w"
              id="formationB"
            />
          </div>
          <div class="form-group">
            <label for="teamBPosition">Position:</label>
            <input
              v-model="teamBPosition"
              type="text"
              class="form-g-input"
              placeholder="2"
              id="teamBPosition"
            />
          </div>

          <button type="submit" class="btn-f-f f-mobile">Submit</button>
        </div>
      </form>
    </div>
    <div v-if="postType === 'Manual'">
      <form @submit.prevent="handleSubmit" enctype="multipart/form-data" class="form-container">
        <div class="form-wrapper">
          <h1>Team A</h1>
          <div class="form-group">
            <label for="teamA">Name:</label>
            <input
              v-model="teamA"
              type="text"
              class="form-g-input"
              placeholder="Manchester"
              id="teamA"
            />
          </div>
          <div class="form-group">
            <label for="teamAIcon">Logo:</label>
            <input
              @change="handleTeamALogo"
              type="file"
              class="form-g-input"
              id="teamAIcon"
              accept="image/*"
            />
          </div>
          <div class="form-group">
            <label for="jackpot">Jackpot name:</label>
            <input
              v-model="jackpot"
              type="text"
              class="form-g-input"
              placeholder="jackpot name"
              id="jackpot"
            />
          </div>
          <div class="form-group">
            <label for="formationA">Formation:</label>
            <input
              v-model="formationA"
              type="text"
              class="form-g-input"
              placeholder="l-w-d-w"
              id="formationA"
            />
          </div>
          <div class="form-group">
            <label for="Status">Status:</label>
            <input v-model="status" type="text" class="form-g-input" placeholder="1" id="status" />
          </div>
          <div class="form-group">
            <label for="teamAPosition">Position:</label>
            <input
              v-model="teamAPosition"
              type="text"
              class="form-g-input"
              placeholder="1"
              id="teamAPosition"
            />
          </div>
        </div>
        <div class="form-wrapper">
          <div class="form-group">
            <label for="tip">Match Tip:</label>
            <input v-model="tip" type="text" class="form-g-input" placeholder="1" id="tip" />
          </div>
          <div class="form-group">
            <label for="leagueIcon">League logo</label>
            <input
              @change="handleLeagueLogo"
              type="file"
              class="form-g-input"
              id="leagueIcon"
              accept="image/*"
            />
          </div>
          <div class="form-group">
            <label for="league">Match league:</label>
            <input
              v-model="league"
              type="text"
              class="form-g-input"
              placeholder="team league"
              id="league"
            />
          </div>
          <div class="form-group">
            <label for="time">Match Time:</label>
            <input
              v-model="time"
              type="time"
              class="form-g-input"
              placeholder="12:00pm"
              id="time"
            />
          </div>
          <div class="form-group">
            <label for="date">Match Date:</label>
            <span class="form-g-input"> {{ currentDate }}</span>
            <input type="date" @change="onDateChange" v-model="currentDate" class="form-g-input" />
          </div>
          <button type="submit" class="btn-f-f f-desktop">Submit</button>
        </div>
        <div class="form-wrapper">
          <h1>Team B</h1>
          <div class="form-group">
            <label for="teamB">Name:</label>
            <input
              v-model="teamB"
              type="text"
              class="form-g-input"
              placeholder="Arsenal"
              id="teamB"
            />
          </div>
          <div class="form-group">
            <label for="teamBIcon">Logo:</label>
            <input
              @change="handleTeamBLogo"
              type="file"
              class="form-g-input"
              id="teamBIcon"
              accept="image/*"
            />
          </div>
          <div class="form-group">
            <label for="country">Country:</label>
            <input
              v-model="countryName"
              type="text"
              class="form-g-input"
              placeholder="England"
              id="country"
            />
          </div>
          <div class="form-group">
            <label for="formationB">Formation:</label>
            <input
              v-model="formationB"
              type="text"
              class="form-g-input"
              placeholder="l-w-d-w"
              id="formationB"
            />
          </div>
          <div class="form-group">
            <label for="teamBPosition">Position:</label>
            <input
              v-model="teamBPosition"
              type="text"
              class="form-g-input"
              placeholder="2"
              id="teamBPosition"
            />
          </div>
          <button type="submit" class="btn-f-f f-mobile">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST
const SPORT_API = import.meta.env.VITE_SPORT_API
const SPORT_KEY = import.meta.env.VITE_SPORT_KEY
import { ref, watch, onMounted } from 'vue'
import TeamSelector from './TeamSelector.vue'
import ArrowIcon from '../icons/ArrowIcon.vue'
import { useToast } from 'vue-toastification'
import axios from 'axios'

const teamA = ref('')
const teamB = ref('')
const isDrpOpen = ref(false)
const isDropOpen = ref(false)
const category = ref(null)
const teamAIcon = ref(null)
const teamBIcon = ref(null)
const leagueIcon = ref(null)
const postType = ref('Manual')
const formationA = ref('')
const formationB = ref('')
const teamAPosition = ref('')
const teamBPosition = ref('')
const time = ref('')
const countryName = ref('')
const league = ref('')
const jackpot = ref('')
const toast = useToast()
const status = ref('')
const currentDate = ref('')
const fixtureData = ref([])
const tip = ref('')
const url = ref(null)

const handleTeamASelected = (name, country, logo) => {
  teamA.value = name
  teamAIcon.value = logo
  countryName.value = country
}

const handleTeamBSelected = (name, country, logo) => {
  teamB.value = name
  teamBIcon.value = logo
  countryName.value = country
}

const showDrop = () => {
  isDropOpen.value = !isDropOpen.value
}

const updatePostType = (type) => {
  postType.value = type
  showDrop()
}

const showDrp = () => {
  isDrpOpen.value = !isDrpOpen.value
}

const updateUrl = (name) => {
  category.value = name
  showDrp()
}

const categories = [
  { name: 'Sports', endpoint: 'sports/create' },
  { name: 'Jackpot', endpoint: 'predictions/create/jackpot-prediction/jackpot' },
  { name: 'Freetips', endpoint: 'predictions/create/tip/freeTip' },
  { name: 'Vip', endpoint: 'predictions/create/vip' }
]

watch(category, () => {
  const selectedCategory = categories.find((c) => c.name === category.value)

  if (selectedCategory) {
    url.value = `${SERVER_HOST}/${selectedCategory.endpoint}`
  } else if (!category.value) {
    toast.error('Please select game category')
  }
})

function handleFileUpload(event, targetRef) {
  const file = event.target.files[0]
  if (file) {
    targetRef.value = file
  }
}

function handleTeamALogo(event) {
  handleFileUpload(event, teamAIcon)
}

function handleTeamBLogo(event) {
  handleFileUpload(event, teamBIcon)
}

function handleLeagueLogo(event) {
  handleFileUpload(event, leagueIcon)
}

const onDateChange = () => {
  currentDate.value = formatDate(new Date(currentDate.value))
}

const updateCurrentDate = () => {
  currentDate.value = formatDate(new Date())
}
async function handleSubmit() {
  if (
    teamA.value.trim() !== '' &&
    teamAIcon.value !== null &&
    leagueIcon.value !== null &&
    formationA.value.trim() !== '' &&
    teamAPosition.value.trim() !== '' &&
    teamB.value.trim() !== '' &&
    teamBIcon.value !== null &&
    category.value !== null &&
    formationB.value.trim() !== '' &&
    teamBPosition.value.trim() !== '' &&
    time.value.trim() !== '' &&
    tip.value.trim() !== '' &&
    league.value.trim() !== '' &&
    currentDate.value.trim() !== ''
  ) {
    const user = JSON.parse(localStorage.getItem('token'))
    try {
      const formData = new FormData()
      formData.append('teamA', teamA.value)
      formData.append('teamAIcon', teamAIcon.value)
      formData.append('leagueIcon', leagueIcon.value)
      formData.append('formationA', formationA.value)
      formData.append('teamAPosition', teamAPosition.value)
      formData.append('teamAscore', '0')
      formData.append('teamB', teamB.value)
      formData.append('teamBIcon', teamBIcon.value)
      formData.append('formationB', formationB.value)
      formData.append('teamBPosition', teamBPosition.value)
      formData.append('teamBscore', '0')
      formData.append('time', time.value)
      formData.append('status', status.value)
      formData.append('league', league.value)
      formData.append('date', currentDate.value)
      formData.append('tip', tip.value)
      if (category.value == 'Jackpot') {
        formData.append('jackpotName', jackpot.value)
      }

      if (countryName.value !== '') {
        formData.append('country', countryName.value)
      }

      const response = await axios.post(`${url.value}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user}`
        }
      })
      toast.success('game updated')
    } catch (err) {
      toast.error(err)
      console.log(err)
    }
  } else {
    toast.error('No empty fields allowed')
  }
}

onMounted(() => {
  updateCurrentDate()
})
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
@import '../style/games.css';
</style>

<template>
  <div class="vip-container">
    <div class="vip-wrapper">
      <div class="vip-notpaid" v-if="!paid">
        <div v-if="!username" class="vip-p">
          <h1>Sign in or log in to your account  ✈ </h1>
          <div class="vip-sp">
            <button class="vip-btn" @click="goSignin()">
              Sign in
            </button>
            <button class="vip-btn" @click="goLogin()">
              Log in
            </button>
          </div>
        </div>
        <div class="vip-p" v-else>
          <h1>Your VIP account is in not activated 🚡  </h1>
          <button class="vip-btn" @click="payPage()">
            <MoneyIcon class="vip-pay-icon" />
            Pay to activate
          </button>
        </div>
      </div>
      <div v-else>
        <div class="main-header vip-m">
          <div class="header-info">
            <h1>Other Sports {{ currentDate }}</h1>
          </div>
          <div class="header-btn">
            <input type="date" v-model="selectedDate" @change="onDateChange" class="date-filter" />
          </div>
        </div>
        <template v-if="paid && username && cardData.length > 0">
          <div class="main-h-card booom-h">
            <Card
              v-for="(card, index) in cardData"
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
        <template v-else-if="paid && username && cardData.length === 0">
          <div class="home-freetip">
            <h1>No predictions yet! Check back later.</h1>
          </div>
        </template>
      </div>
    </div>
    <div class="main-header header-info c-info">
      <h1>Available Predictions</h1>
    </div>
    <OtherComponent />
  </div>
</template>

<script setup>
import axios from 'axios'
import { useRouter } from 'vue-router'
import MoneyIcon from '../icons/payIcon.vue'
import Card from '../components/CardComponent.vue'
import { ref, onMounted, watchEffect, watch } from 'vue'
import OtherComponent from '../components/OtherComponent.vue'

const selectedDate = ref(formatDate(new Date()))
const router = useRouter()
const username = ref(null)
const cardData = ref([])
const currentDate = ref('')
const paid = ref(false)
const offset = ref(0)

console.log(paid.value)
const updateAuthStatus = () => {
  const token = JSON.parse(localStorage.getItem('token'))

  username.value = localStorage.getItem('username')

  // Clear cardData if token does not exist
  if (!token) {
    cardData.value = []
  }
}

const showDate = () => {
  if (selectedDate != '') {
    watch(selectedDate, () => {
      return selectedDate.value
    })
  } else {
    return selectedDate.value
  }
}

const onDateChange = () => {
  updateCurrentDate()
  predictions()
}

const updateCurrentDate = () => {
  currentDate.value = formatDate(new Date(selectedDate.value)) // Format selectedDate to "dd-mm-yyyy"
}


const payPage = () => {
  router.push({ name: 'Pay' })
}

const goSignin = () => {
  router.push({ name: 'Signin' })
}

const goLogin = () => {
  router.push({ name: 'Login' })
}

const showCard = (cardID) => {
  router.push({ name: 'Tips', params: { id: cardID } })
}

const getPrediction = async () => {
  const token = JSON.parse(localStorage.getItem('token'))

  try {
    const response = await axios.get(
      `https://four33tips.onrender.com/predictions/vipPredictions/vip/${selectedDate.value}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    console.log(response.data)
    cardData.value = response.data
  } catch (err) {
    console.log(err)
  }
}

const getAccountDetails = async () => {
  const token = JSON.parse(localStorage.getItem('token'))
  const id = localStorage.getItem('id')

  try {
    const response = await axios.get(`https://four33tips.onrender.com/auth/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    // console.log(response.data)
    username.value = response.data.username
    paid.value = response.data.paid
    // console.log(response.data.paid)
    localStorage.setItem('paid', paid.value)
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  getPrediction()
  updateAuthStatus()
  getAccountDetails()
  updateCurrentDate() // Format currentDate on mount

})

watchEffect(() => {
  getPrediction()
})






const formatFormation = (formation) => {
  if (Array.isArray(formation)) {
    return formation[0].split('-')
  }
  return []
}

watch([offset, username, paid], () => {
  updateAuthStatus()
  getPrediction()
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

<style scoped>
@import '../style/vip.css';
@import '../style/Home.css';
</style>

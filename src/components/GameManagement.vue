<template>
  <div class="game-container">
    <div class="game-game-p">
      <div class="game-cf">
        <div class="main-header">
          <div class="header-info">
            <h1>Free tips ({{ currentDate }})</h1>
          </div>
          <div class="header-btn">
            <input type="date" @change="onDateChange" v-model="currentDate" class="date-filter" />
          </div>
        </div>
        <div class="game-table">
          <table>
            <thead>
              <tr>
                <th>League</th>
                <th>TeamA</th>
                <th>TeamB</th>
                <th>scoreA</th>
                <th>scoreB</th>
                <th>tip</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody v-for="item in freeTipData" :key="item._id">
              <tr v-for="data in item" :key="data._id">
                <td>
                  <div class="game-tbl-img">
                    <img :src="data.leagueIcon" alt="game-p" class="game-pi" />
                    <span>{{ data.league }}</span>
                  </div>
                </td>
                <td>
                  <div class="game-tbl-img">
                    <img :src="data.teamAIcon" alt="game-p" class="game-pi" />
                    <span>{{ data.teamA }}</span>
                  </div>
                </td>
                <td>
                  <div class="game-tbl-img">
                    <img :src="data.teamBIcon" alt="game-p" class="game-pi" />
                    <span>{{ data.teamB }}</span>
                  </div>
                </td>
                <td>
                  <span>{{ data.teamAscore }}</span>
                </td>
                <td>
                  <span>{{ data.teamBscore }}</span>
                </td>
                <td>
                  <span>{{ data.tip }}</span>
                </td>
                <td>
                  <div class="game-delete" @click="editGame(Freetips, data._id)">
                    <FileIcon class="icon-file" />
                  </div>
                </td>
                <td>
                  <div class="game-delete" @click="deletePrediction(data._id)">
                    <DeleteIcon class="icon-delete" />
                  </div>
                </td>
              </tr>
              <tr v-if="freeTipData.length === 0">
                <td colspan="8">No games yet!</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="game-cf">
        <div class="main-header">
          <div class="header-info">
            <h1>Jackpot tips ({{ currentDate }})</h1>
          </div>
          <div class="header-btn">
            <input type="date" @change="onDateChange" v-model="currentDate" class="date-filter" />
          </div>
        </div>
        <div class="game-table">
          <table>
            <thead>
              <tr>
                <th>Jackpot name</th>
                <th>League</th>
                <th>TeamA</th>
                <th>TeamB</th>
                <th>scoreA</th>
                <th>scoreB</th>
                <th>tip</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody v-for="item in JackpotData" :key="item._id">
              <tr v-for="data in item" :key="data._id">
                <td>
                  <span>{{ data.jackpotName }}</span>
                </td>
                <td>
                  <div class="game-tbl-img">
                    <img :src="data.leagueIcon" alt="game-p" class="game-pi" />
                    <span>{{ data.league }}</span>
                  </div>
                </td>
                <td>
                  <div class="game-tbl-img">
                    <img :src="data.teamAIcon" alt="game-p" class="game-pi" />
                    <span>{{ data.teamA }}</span>
                  </div>
                </td>
                <td>
                  <div class="game-tbl-img">
                    <img :src="data.teamBIcon" alt="game-p" class="game-pi" />
                    <span>{{ data.teamB }}</span>
                  </div>
                </td>
                <td>
                  <span>{{ data.teamAscore }}</span>
                </td>
                <td>
                  <span>{{ data.teamBscore }}</span>
                </td>
                <td>
                  <span>{{ data.tip }}</span>
                </td>
                <td>
                  <div class="game-delete" @click="editGame(Jackpot, data._id)">
                    <FileIcon class="icon-file" />
                  </div>
                </td>
                <td>
                  <div class="game-delete" @click="deletePrediction(data._id)">
                    <DeleteIcon class="icon-delete" />
                  </div>
                </td>
              </tr>
              <tr v-if="JackpotData.length === 0">
                <td colspan="8">No games yet!</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="game-cf">
        <div class="main-header">
          <div class="header-info">
            <h1>Vip games ({{ currentDate }})</h1>
          </div>
          <div class="header-btn">
            <input type="date" @change="onDateChange" v-model="currentDate" class="date-filter" />
          </div>
        </div>
        <div class="game-table">
          <table>
            <thead>
              <tr>
                <th>League</th>
                <th>TeamA</th>
                <th>TeamB</th>
                <th>scoreA</th>
                <th>scoreB</th>
                <th>tip</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody v-for="item in vipData" :key="item._id">
              <tr v-for="data in item" :key="data._id">
                <td>
                  <div class="game-tbl-img">
                    <img :src="data.leagueIcon" alt="game-p" class="game-pi" />
                    <span>{{ data.league }}</span>
                  </div>
                </td>
                <td>
                  <div class="game-tbl-img">
                    <img :src="data.teamAIcon" alt="game-p" class="game-pi" />
                    <span>{{ data.teamA }}</span>
                  </div>
                </td>
                <td>
                  <div class="game-tbl-img">
                    <img :src="data.teamBIcon" alt="game-p" class="game-pi" />
                    <span>{{ data.teamB }}</span>
                  </div>
                </td>
                <td>
                  <span>{{ data.teamAscore }}</span>
                </td>
                <td>
                  <span>{{ data.teamBscore }}</span>
                </td>
                <td>
                  <span>{{ data.tip }}</span>
                </td>
                <td>
                  <div class="game-delete" @click="editGame(VipGames, data._id)">
                    <FileIcon class="icon-file" />
                  </div>
                </td>
                <td>
                  <div class="game-delete" @click="deletePrediction(data._id)">
                    <DeleteIcon class="icon-delete" />
                  </div>
                </td>
              </tr>
              <tr v-if="vipData.length === 0">
                <td colspan="8">No games yet!</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="game-cf">
        <div class="main-header">
          <div class="header-info">
            <h1>Other sport ({{ currentDate }})</h1>
          </div>
          <div class="header-btn">
            <input type="date" @change="onDateChange" v-model="currentDate" class="date-filter" />
          </div>
        </div>
        <div class="game-table">
          <table>
            <thead>
              <tr>
                <th>League</th>
                <th>TeamA</th>
                <th>TeamB</th>
                <th>scoreA</th>
                <th>scoreB</th>
                <th>tip</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody v-for="item in SportsData" :key="item._id">
              <tr v-for="data in item" :key="data._id">
                <td>
                  <div class="game-tbl-img">
                    <img :src="data.leagueIcon" alt="game-p" class="game-pi" />
                    <span>{{ data.league }}</span>
                  </div>
                </td>
                <td>
                  <div class="game-tbl-img">
                    <img :src="data.teamAIcon" alt="game-p" class="game-pi" />
                    <span>{{ data.teamA }}</span>
                  </div>
                </td>
                <td>
                  <div class="game-tbl-img">
                    <img :src="data.teamBIcon" alt="game-p" class="game-pi" />
                    <span>{{ data.teamB }}</span>
                  </div>
                </td>
                <td>
                  <span>{{ data.teamAscore }}</span>
                </td>
                <td>
                  <span>{{ data.teamBscore }}</span>
                </td>
                <td>
                  <span>{{ data.tip }}</span>
                </td>
                <td>
                  <div class="game-delete" @click="editSport(Sport, data._id)">
                    <FileIcon class="icon-file" />
                  </div>
                </td>
                <td>
                  <div class="game-delete" @click="deleteSport(data._id)">
                    <DeleteIcon class="icon-delete" />
                  </div>
                </td>
              </tr>
              <tr v-if="SportsData.length === 0">
                <td colspan="8">No games yet!</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="game-cf">
        <div class="main-header">
          <div class="header-info">
            <h1>Ads ({{ currentDate }})</h1>
          </div>
          <div class="header-btn">
            <input type="date" @change="onDateChange" v-model="currentDate" class="date-filter" />
          </div>
        </div>
        <div class="game-table">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Category</th>
                <th>Description</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody v-for="item in adData" :key="item._id">
              <tr v-for="data in item" :key="data._id">
                <td>
                  <div class="game-tbl-img">
                    <img :src="data.Image" alt="game-p" class="game-pi" />
                  </div>
                </td>
                <td>
                  <span>{{ data.Category }}</span>
                </td>
                <td>
                  <span>{{ data.Description }}</span>
                </td>
                <td>
                  <div class="game-delete" @click="editAds(AdsEdit, data._id)">
                    <FileIcon class="icon-file" />
                  </div>
                </td>
                <td>
                  <div class="game-delete" @click="deleteAds(data._id)">
                    <DeleteIcon class="icon-delete" />
                  </div>
                </td>
              </tr>
              <tr v-if="adData.length === 0">
                <td colspan="8">No ads yet!</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <Teleport to="body">
    <div class="game-edit" :class="[isGameOpen ? 'showEdit' : 'closeEdit']">
      <div class="mobile-exit">
        <ExitIcon class="icon-exit" @click="showEdit" />
      </div>
      <div class="game-main-p">
        <component
          @formSubmitSport="updateSport"
          @formSubmitAds="updateAds"
          @formSubmit="updateGame"
          :is="activePage"
        />
      </div>
    </div>
  </Teleport>
</template>
<script setup>
import axios from 'axios'
import ExitIcon from '@/icons/ExitIcon.vue'
import FileIcon from '@/icons/FileIcon.vue'
import { useToast } from 'vue-toastification'
import DeleteIcon from '@/icons/DeleteIcon.vue'
import AdsEdit from '@/components/AdsEdit.vue'
import Jackpot from '@/components/JackpotEdit.vue'
import Freetips from '@/components/FreetipsEdit.vue'
import Sport from '@/components/SportGamesEdits.vue'
import VipGames from '@/components/VipGamesEdits.vue'

import { ref, watchEffect, onMounted, watch, shallowRef } from 'vue'

const username = ref(null)
const currentDate = ref('')
const toast = useToast()
const isGameOpen = ref(false)
const vipData = ref([])
const adData = ref([])
const freeTipData = ref([])
const SportsData = ref([])
const JackpotData = ref([])
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST

const getJackpot = async () => {
  try {
    // const token = JSON.parse(localStorage.getItem('token'));
    const response = await axios.get(`${SERVER_HOST}/predictions/jackpot-predictions/jackpot/${currentDate.value}`)
    JackpotData.value = response.data.length > 0 ? [response.data] : []
  } catch (err) {
    // console.log(err)
  }
}

const getVipGames = async () => {
  try {
    const response = await axios.get(
      `${SERVER_HOST}/predictions/vipPredictions/vip/${currentDate.value}`
    )
    vipData.value = response.data.length > 0 ? [response.data] : []
    
  } catch (err) {
    // console.log(err)
  }
}

const getSports = async () => {
  try {
    // const token = JSON.parse(localStorage.getItem('token'));
    const response = await axios.get(`${SERVER_HOST}/sports/${currentDate.value}`)
    SportsData.value = response.data.length > 0 ? [response.data] : []
  } catch (err) {
    // console.log(err)
  }
}

const getFreeTips = async () => {
  try {
    // const token = JSON.parse(localStorage.getItem('token'));
    const response = await axios.get(`${SERVER_HOST}/predictions/tips/freeTip/${currentDate.value}`)
    freeTipData.value = response.data.length > 0 ? [response.data] : []
  } catch (err) {
    // console.log(err)
  }
}

const showEdit = () => {
  isGameOpen.value = !isGameOpen.value
}

const activePage = shallowRef(Freetips)
const gameId = ref('')
const sportId = ref('')
const AdsId = ref('')

const editGame = (game, id) => {
  activePage.value = game
  gameId.value = id
  showEdit()
}

const editAds = (ads, id) => {
  activePage.value = ads
  AdsId.value = id
  showEdit()
}

const editSport = (sport, id) => {
  activePage.value = sport
  sportId.value = id
  showEdit()
}

async function updateGame(formData) {
  try {
    const token = JSON.parse(localStorage.getItem('token'))
    const formDataa = new FormData()
    if (formData.teamA !== '') {
      formDataa.append('teamA', formData.teamA)
    }
    if (formData.teamAIcon !== null) {
      formDataa.append('teamAIcon', formData.teamAIcon)
    }
    if (formData.leagueIcon !== null) {
      formDataa.append('leagueIcon', formData.leagueIcon)
    }
    if (formData.status !== '') {
      formDataa.append('status', formData.status)
    }
    if (formData.formationA !== '') {
      formDataa.append('formationA', formData.formationA)
    }
    if (formData.teamAPosition !== '') {
      formDataa.append('teamAPosition', formData.teamAPosition)
    }
    if (formData.teamAscore !== '') {
      formDataa.append('teamAscore', formData.teamAscore)
    }
    if (formData.teamB !== '') {
      formDataa.append('teamB', formData.teamB)
    }
    if (formData.teamBIcon !== null) {
      formDataa.append('teamBIcon', formData.teamBIcon)
    }
    if (formData.formationB !== '') {
      formDataa.append('formationB', formData.formationB)
    }
    if (formData.teamBPosition !== '') {
      formDataa.append('teamBPosition', formData.teamBPosition)
    }
    if (formData.teamBscore !== '') {
      formDataa.append('teamBscore', formData.teamBscore)
    }
    if (formData.time !== '') {
      formDataa.append('time', formData.time)
    }
    if (formData.league !== '') {
      formDataa.append('league', formData.league)
    }
    if (formData.date !== '') {
      formDataa.append('date', formData.date)
    }
    if (formData.tip !== '') {
      formDataa.append('tip', formData.tip)
    }
    if (formData.showScore !== '') {
      formDataa.append('showScore', formData.showScore)
    }
    if (formData.description !== '') {
      formDataa.append('description', formData.description)
    }
    const response = await axios.put(
      `${SERVER_HOST}/predictions/update/${gameId.value}`,
      formDataa,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    toast.success('game updated')
  } catch (error) {
    toast.error(error.response.data.error)
  }
}

async function updateSport(formData) {
  try {
    const token = JSON.parse(localStorage.getItem('token'))
    const formDataa = new FormData()
    if (formData.teamA !== '') {
      formDataa.append('teamA', formData.teamA)
    }
    if (formData.teamAIcon !== null) {
      formDataa.append('teamAIcon', formData.teamAIcon)
    }
    if (formData.status !== '') {
      formDataa.append('status', formData.status)
    }
    if (formData.leagueIcon !== null) {
      formDataa.append('leagueIcon', formData.leagueIcon)
    }
    if (formData.formationA !== '') {
      formDataa.append('formationA', formData.formationA)
    }
    if (formData.teamAPosition !== '') {
      formDataa.append('teamAPosition', formData.teamAPosition)
    }
    if (formData.teamAscore !== '') {
      formDataa.append('teamAscore', formData.teamAscore)
    }
    if (formData.teamB !== '') {
      formDataa.append('teamB', formData.teamB)
    }
    if (formData.teamBIcon !== null) {
      formDataa.append('teamBIcon', formData.teamBIcon)
    }
    if (formData.formationB !== '') {
      formDataa.append('formationB', formData.formationB)
    }
    if (formData.teamBPosition !== '') {
      formDataa.append('teamBPosition', formData.teamBPosition)
    }
    if (formData.teamBscore !== '') {
      formDataa.append('teamBscore', formData.teamBscore)
    }
    if (formData.time !== '') {
      formDataa.append('time', formData.time)
    }
    if (formData.league !== '') {
      formDataa.append('league', formData.league)
    }
    if (formData.date !== '') {
      formDataa.append('date', formData.date)
    }
    if (formData.tip !== '') {
      formDataa.append('tip', formData.tip)
    }
    if (formData.showScore !== '') {
      formDataa.append('showScore', formData.showScore)
    }

    if (formData.description !== '') {
      formDataa.append('description', formData.description)
    }

    const response = await axios.put(`${SERVER_HOST}/sports/update/${sportId.value}`, formDataa, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    toast.success('game updated')
  } catch (error) {
    toast.error(error.response.data.error)
  }
}

const getAds = async () => {
  try {
    // const token = JSON.parse(localStorage.getItem('token'));
    const response = await axios.get(`${SERVER_HOST}/ads`)
    adData.value = response.data.length > 0 ? [response.data] : []
  } catch (err) {
    toast.error(err.response.data.error)
  }
}


const onDateChange = () => {
  currentDate.value = formatDate(new Date(currentDate.value))
  getJackpot()
  getVipGames()
  getSports()
  getFreeTips()
}


const updateCurrentDate = () => {
  currentDate.value = formatDate(new Date())

}

watchEffect(() => {
  username.value = localStorage.getItem('username')
  updateCurrentDate()
})

onMounted(() => {
  getJackpot()
  getVipGames()
  getSports()
  getFreeTips()
  updateCurrentDate();
})

const deleteAds = async (id) => {
  try {
    const token = JSON.parse(localStorage.getItem('token'))

    const response = await axios.delete(`${SERVER_HOST}/ads/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    await getAds()
    toast.success(response.data.message)
  } catch (err) {
    toast.error(err.response.data.message)
  }
}

const deletePrediction = async (id) => {
  try {
    const token = JSON.parse(localStorage.getItem('token'))

    const response = await axios.delete(`${SERVER_HOST}/predictions/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    toast.success(response.data.message)
    await getJackpot()
    await getVipGames()
    await getSports()
    await getFreeTips()
  } catch (err) {
    toast.error(err.response.data.message)
  }
}


const deleteSport = async (id) => {
  try {
    const token = JSON.parse(localStorage.getItem('token'))

    const response = await axios.delete(`${SERVER_HOST}/sports/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    toast.success(response.data.message)
    await getJackpot()
    await getVipGames()
    await getSports()
    await getFreeTips()
  } catch (err) {
    toast.error(err.response.data.message)
  }
  toast.error('deleted')
}

const showscore = ref(localStorage.getItem('showscore') === 'true')

watch(showscore, (value) => {
  localStorage.setItem('showscore', value.toString())
})

watch(currentDate, () => {
  getJackpot()
  getVipGames()
  getSports()
  getFreeTips()
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
@import '@/style/gameManagement.css';
</style>

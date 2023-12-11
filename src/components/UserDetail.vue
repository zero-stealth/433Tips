<template>
  <div class="user-container" :class="[drawerStore.showUserSpecific === false ? 'hide-user' : '']">
    <div class="user-arrow-container" @click="goBack()">
      <ArrowIcon class="user-arrow" />
      <span>Go back</span>
    </div>
    <div class="user-card" v-for="account in filteredAccountData" :key="account.id">
      <div class="user-img">
        <profileIcon class="user-icon" />
      </div>
      <div class="user-info">
        <div class="user-info-dn">
          <div class="user-in">
            <span>name</span>
            <h1>{{ account.username }}</h1>
          </div>
          <p>{{ account.country }}</p>
        </div>
        <div class="user-in">
          <span>Email</span>
          <h1>{{ account.email }}</h1>
        </div>
        <div class="user-span">
          <div>
            <span>Paid</span>
            <h1>{{ account.paid ? 'Yes' : 'No' }}</h1>
          </div>
          <div>
            <span>Payment period</span>
            <h1>{{ account.paid ? '31 days' : '0 days' }}</h1>
          </div>
          <div>
            <span>Date activation</span>
            <h1>{{ formatDateTime(account.updatedAt) || 'not paid' }}</h1>
          </div>
          <div>
            <span>Date of deactivation</span>
            <h1>
              {{ formatDateTime(new Date(new Date().getTime() - 31 * 24 * 60 * 60 * 1000)) }}
            </h1>
          </div>
        </div>
      </div>
    </div>
    <div class="acc-m">
      <table>
        <thead>
          <tr>
            <th>Vip status</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="account in filteredAccountData" :key="account.id">
            <td>
              <div class="Account-t-con">
                <div
                  class="Account-toggle"
                  @click="toggleStatus(account)"
                  :class="{ on: account.status, off: !account.status }"
                >
                  <div class="Account-mode"></div>
                  <span>{{ account.status ? 'Active' : 'Not Active' }}</span>
                </div>
              </div>
            </td>
            <td>
              <div class="Account-delete" @click="deleteAccount(account._id)">
                <DeleteIcon class="icon-delete" />
              </div>
            </td>
          </tr>
          <tr v-if="filteredAccountData.length === 0">
            <td colspan="6">No accounts yet!</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import axios from 'axios'
import { ref, watchEffect, onMounted, computed, watch } from 'vue'
import DeleteIcon from '../icons/DeleteIcon.vue'
import { useDrawerStore } from '../stores/drawer'
import ProfileIcon from '../icons/profileIcon.vue'
import ArrowIcon from '../icons/ArrowIcon.vue'
import { useToast } from 'vue-toastification'

const accountInfo = ref([])
const userData = ref([])
const statusC = ref(null)
const paidDate = ref(null)
const futuresDate = ref(null)
const endSub = ref(false)
const toast = useToast()
const drawerStore = useDrawerStore()
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const goBack = () => {
  drawerStore.toggleUserSpecific()
}

const accountsData = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('token'))
    const response = await axios.get(`${SERVER_HOST}/auth`, {
      headers: {
        Authorization: `Bearer ${user}`
      }
    })
    statusC.value = response.data.paid
    if (response.data.updatedAt) {
      getFutureDate(response.data.updatedAt)
    }
    console.log(response.data)
    userData.value = response.data
    accountInfo.value = response.data.map((account) => ({
      ...account,
      status: account.paid
    }))
  } catch (err) {
    console.error(err)
  }
}

const filteredAccountData = computed(() => {
  return accountInfo.value.filter((account) => account._id === props.id)
})

function formatDateTime(date) {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false, // Use 24-hour format
  };

  return date.toLocaleDateString(undefined, options);
}


function formatDate(date) {
  if (!(date instanceof Date)) {
    date = new Date(date)
  }

  const options = { day: '2-digit', month: '2-digit', year: 'numeric' }
  return date.toLocaleDateString(undefined, options)
}

function getFutureDate(date) {
  const parsedDate = new Date(date)
  paidDate.value = formatDate(parsedDate)
  const futureDate = new Date(parsedDate)
  futureDate.setDate(parsedDate.getDate() + 30)
  futuresDate.value = futureDate.toISOString()

  const currentDate = new Date()
  const currentDateInISOFormat = currentDate.toISOString()

  const match = futureDate.toISOString() === currentDateInISOFormat

  endSub.value = match
}

watch([statusC], () => {
  getFutureDate(accountInfo.value[0]?.updatedAt)
})

onMounted(() => {
  accountsData()
})

const deleteAccount = async (id) => {
  try {
    const token = JSON.parse(localStorage.getItem('token'))
    const response = await axios.delete(`${SERVER_HOST}/auth/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    toast.success(response.data.message)
    await accountsData()
  } catch (err) {
    toast.error(err.response.data.error)
  }
}

async function toggleStatus(account) {
  account.status = !account.status

  try {
    const response = await axios.put(`${SERVER_HOST}/auth/update/${account._id}`, {
      paid: account.status
    })

    await accountsData()
    localStorage.setItem('paid', account.status.toString())
  } catch (err) {
    console.log(err)
  }
}

watchEffect(() => {
  if (accountInfo.value.length > 0) {
    getFutureDate(accountInfo.value[0]?.updatedAt)
    paidDate.value = formatDate(accountInfo.value[0]?.updatedAt) || 'no change'

    if (endSub.value) {
      const currentDate = new Date()
      const futureDate = new Date(futuresDate.value)

      if (currentDate >= futureDate) {
        toggleStatus(accountInfo.value[0])
        endSub.value = false
      }
    }
  }
})
</script>
<style scoped>
@import '../style/user.css';
@import '../style/account.css'
</style>

<template>
  <div class="Account-container">
    <div class="Account-header">
      <h1><span>Welcome</span><br />SportyPredict,</h1>
    </div>
    <div class="Account-info">
      <div class="Account-card" v-for="card in accountCards" :key="card.id">
        <h5>{{ card.title }}</h5>
        <div class="Account-card-icon">
          <h1>{{ getCount(card.id) }}</h1>
          <component :is="card.icon" class="icon-acc" />
        </div>
      </div>
    </div>
    <div class="search-section">
      <div class="form-group">
        <label for="Accountname">Search Accounts</label>
        <input
          v-model="SearchAccount"
          type="text"
          class="form-g-input"
          placeholder="Account name"
          id="Accountname"
        />
      </div>
    </div>
    <div class="acc-m">
      <table>
        <thead>
          <tr>
            <th>Account</th>
            <th>Payment</th>
            <th>Period</th>
            <th>Vip status</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="account in filterAccount" :key="account.id">
            <td>
              <div class="Account-tbl-img">
                <img :src="Profile" alt="Account-p" class="Account-pi" />
                <span>{{ account.email }}</span>
              </div>
            </td>
            <td>{{ account.paid }}</td>
            <td>{{ account.paid ? '1 Month' : '0 Month' }}</td>
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
          <tr v-if="accountData.length === 0">
            <td colspan="6">No accounts yet!</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, watchEffect, onMounted, computed, watch } from 'vue';
import NotPaid from '../icons/NotPaid.vue';
import VipIcon from '../icons/VipIcon.vue';
import Profile from '../assets/profile.jpg';
import PaidIcon from '../icons/PaidIcon.vue';
import AdminIcon from '../icons/AdminIcon.vue';
import DeleteIcon from '../icons/DeleteIcon.vue';
import ProfileIcon from '../icons/profileIcon.vue';

const username = ref(null);
const accountCards = ref([]);
const accountInfo = ref([]);
const SearchAccount = ref('');
const message = ref();

const accountsData = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('token'));
    const response = await axios.get(`https://predictions-reg9.onrender.com/auth`, {
      headers: {
        Authorization: `Bearer ${user}`,
      },
    });
    console.log(response.data);
    accountInfo.value = response.data.map((account) => ({
      ...account,
      status: account.paid,
    }));
    console.log(accountInfo.value);
  } catch (err) {
    console.log(err);
  }
};

watchEffect(() => {
  username.value = localStorage.getItem('username');
});

onMounted(() => {
  accountsData();
});

const accountData = computed(() => {
  return accountInfo.value;
});

const deleteAccount = async (id) => {
  try {
    const token = JSON.parse(localStorage.getItem('token'));
    const response = await axios.delete(`https://predictions-reg9.onrender.com/auth/delete/${id}`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    message.value = response.data.message;
    await accountsData();
  } catch (err) {
    message.value = err.message;
  }
  alert(message.value);
};

accountCards.value = [
  { id: 1, title: 'Account active', icon: ProfileIcon },
  { id: 2, title: 'Vip accounts', icon: VipIcon },
  { id: 3, title: 'Paid accounts', icon: PaidIcon },
  { id: 4, title: 'Not paid accounts', icon: NotPaid },
  { id: 5, title: 'Administrator accounts', icon: AdminIcon },
];

const getCount = (cardId) => {
  let count = 0;

  switch (cardId) {
    case 1:
      count = accountData.value.filter((account) => account._id).length;
      break;
    case 2:
      count = accountData.value.filter((account) => account.paid).length;
      break;
    case 3:
      count = accountData.value.filter((account) => account.paid).length;
      break;
    case 4:
      count = accountData.value.filter((account) => !account.paid).length;
      break;
    case 5:
      count = accountData.value.filter((account) => account.isAdmin).length;
      break;
    default:
      count = 0;
  }

  return count;
};


const filterAccount = computed(() => {
  if (SearchAccount.value !== '') {
    return accountData.value.filter((account) =>
      account.email.includes(SearchAccount.value) ||
      account.email.toUpperCase().includes(SearchAccount.value)
    );
  } else {
    return accountData.value;
  }
}, [SearchAccount, accountData]);



async function toggleStatus(account) {
  account.status = !account.status;

  try {
    const response = await axios.put(`https://predictions-reg9.onrender.com/auth/update/${account._id}`, {
      paid: account.status,
    });

    await accountsData();
    localStorage.setItem('paid', account.status.toString());
  } catch (err) {
    console.log(err);
  }
}
</script>

<style>
@import '../style/account.css';
@import '../style/Bet.css';
</style>

<template>
  <div class="panel-container">
    <div class="panel-bar" :class="[isOpen != false ? 'open-p' : 'close-p']">
      <div class="panel-exit">
        <ExitIcon class="panel-icon-exit" @click="showMenu()" />
      </div>
      <div class="panel-profile">
        <div class="panel-img" :style="{ backgroundImage: `url(${logo})` }"></div>
        <h1>433Tips</h1>
        <span>Admin</span>
      </div>
      <div class="panel-nav">
        <div class="panel-btn-container">
          <button
            @click="setActivePage(AccountManagement)"
            :class="getButtonClass(AccountManagement)"
          >
            <GroupIcon class="icon-panel" />
            <span>account management</span>
            <ArrowIcon class="icon-panel ap" />
          </button>
          <button
            @click="setActivePage(GameManagement)"
            :class="getButtonClass(GameManagement)"
          >
            <FileIcon class="icon-panel" />
            <span>Game management</span>
            <ArrowIcon class="icon-panel ap" />
          </button>
          <button @click="setActivePage(Jackpot)" :class="getButtonClass(Jackpot)">
            <FileIcon class="icon-panel" />
            <span> Jackpot </span>
            <ArrowIcon class="icon-panel ap" />
          </button>
          <button @click="setActivePage(VipGames)" :class="getButtonClass(VipGames)">
            <VipIcon class="icon-panel" />
            <span> vip prediction </span>
            <ArrowIcon class="icon-panel ap" />
          </button>
          <button @click="setActivePage(Freetips)" :class="getButtonClass(Freetips)">
            <FileIcon class="icon-panel" />
            <span> Free tips </span>
            <ArrowIcon class="icon-panel ap" />
          </button>
          <button @click="setActivePage(SportGames)" :class="getButtonClass(SportGames)">
            <SportIcon class="icon-panel" />
            <span>Other sport </span>
            <ArrowIcon class="icon-panel ap" />
          </button>
          <button @click="logout" :class="getButtonClass(logout)">
            <LogoutIcon class="icon-panel" />
            <span>Logout </span>
            <ArrowIcon class="icon-panel ap" />
          </button>
        </div>
      </div>
    </div>
    <div class="panel-main">
      <div class="panel-menu" @click="showMenu()">
        <DrawIcon class="panel-icon-nav" />
      </div>
      <component :is="activePage" />
    </div>
  </div>
</template>
<script setup>
import { ref , watchEffect , shallowRef} from 'vue'
import SportIcon from '../icons/SportIcon.vue'
import LogoutIcon from '../icons/logoutIcon.vue'
import GroupIcon from '../icons/GroupIcon.vue'
import ArrowIcon from '../icons/ArrowIcon.vue'
import ExitIcon from '../icons/ExitIcon.vue'
import DrawIcon from '../icons/DrawIcon.vue'
import FileIcon from '../icons/FileIcon.vue'
import VipIcon from '../icons/VipIcon.vue'
import logo from '../assets/profile.jpg'
import { useRouter } from 'vue-router'

const username = ref('admin')
const router = useRouter()
const isOpen = ref(false)

watchEffect(() => {
  username.value = localStorage.getItem('username')
})

const showMenu = () => {
  isOpen.value = !isOpen.value
}
// pages
import AccountManagement from '../components/AccountManagement.vue'
import GameManagement from '../components/GameManagement.vue'
import Jackpot from '../components/Jackpot.vue'
import SportGames from '../components/SportGames.vue'
import VipGames from '../components/VipGames.vue'
import Freetips from '../components/Freetips.vue'

const activePage = shallowRef(AccountManagement)

const setActivePage = (page) => {
  activePage.value = page
}

const getButtonClass = (page) => {
  return ['panel-btn', activePage.value === page ? 'active-cp' : 'inactive-cp']
}

const logout = () => {
  localStorage.removeItem('token');
  router.push({ name: 'Home' });
};
</script>
<style>
@import '../style/panel.css';
</style>

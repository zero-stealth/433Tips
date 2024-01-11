<template>
  <div class="nav-main">
    <div class="nav-container">
      <img src="../assets/logo.png" alt="logo" class="logo-spp" @click="goHome" 
      draggable="false"
      />
      <div class="nav-link-container">
        <RouterLink :to="{ name: 'Home' }" class="nav-link">Home</RouterLink>
        <RouterLink :to="{ name: 'Vip' }" class="nav-link">Vip</RouterLink>
        <RouterLink :to="{ name: 'FreeTip' }" class="nav-link">Free Tip</RouterLink>
        <RouterLink :to="{ name: 'Jackpot' }" class="nav-link">Jackpot</RouterLink>
        <RouterLink :to="{ name: 'Sport' }" class="nav-link">Other sport</RouterLink>
        <div class="nav-link" @click="openTelegram">Telegram</div>
        <RouterLink :to="{ name: 'Pay' }" class="nav-link">How to pay</RouterLink>
      </div>
      <GoogleTranslateSelect
        default-language-code="en"
        default-page-language-code="en"
        :fetch-browser-language="false"
        trigger="hover"
        @select="handleGoogleTranslateSelect"
      />
      <div class="nav-btn-container" v-if="authStore.token !== null">
        <button @click="logOut" class="nav-btn btn-l btn-logout">
          <LogoutIcon class="icon-nav l-icon" />
           Log out
        </button>
      </div>
      <div class="nav-btn-container" v-else>
        <button @click="goSignin" class="nav-btn btn-r">
          <GroupIcon class="icon-nav r-icon" />
        </button>
      </div>
      <div class="nav-menu" @click="showMenu()">
        <MobileMenuIcon class="menu-icon-nav" />
      </div>
    </div>
  </div>

  <!-- mobile responsive -->
  <div class="mobile-bar" :class="[isOpen ? 'open' : 'close']">
    <div class="mobile-exit">
      <ExitIcon class="icon-exit" @click="showMenu()" />
    </div>
    <div class="mobile-container">
      <div class="mobile-link-container">
        <RouterLink :to="{ name: 'Vip' }" @click="showMenu()" class="mobile-link">Vip</RouterLink>
        <RouterLink :to="{ name: 'Home' }" @click="showMenu()" class="mobile-link">
          Home
        </RouterLink>
        <RouterLink :to="{ name: 'Jackpot' }" @click="showMenu()" class="mobile-link"
          >Jackpot</RouterLink
        >
        <div @click="openFreeTip" class="mobile-link">Free Tip</div>
        <div class="drop-container">
          <span @click="goSport()" class="nav-link">Other sport</span>
        </div>
        <RouterLink :to="{ name: 'Pay' }" class="nav-link">How to pay</RouterLink>
        <div @click="openTelegramX" class="mobile-link">Telegram tips</div>
      </div>
      <div class="mobile-btn-container" v-if="authStore.token !== null">
        <button @click="logOut" class="mobile-btn btn-l btn-logout">
          <LogoutIcon class="icon-nav l-icon" />
          Log out
        </button>
      </div>
      <div class="mobile-btn-container" v-else>
        <button @click="goSignin" class="mobile-btn btn-r">
          <GroupIcon class="icon-nav r-icon" />
          Sign up
        </button>
        <button @click="goLogin" class="mobile-btn btn-l">
          <ProfileIcon class="icon-nav l-icon" />
          Log in
        </button>
      </div>
    </div>
  </div>
  <!-- mobile responsive -->
</template>

<script setup>
import GoogleTranslateSelect from '@google-translate-select/vue3';
import MobileMenuIcon from '../icons/mobileMenuIcon.vue'
import ProfileIcon from '../icons/profileIcon.vue'
import { RouterLink, useRouter } from 'vue-router'
import LogoutIcon from '../icons/logoutIcon.vue'
import GroupIcon from '../icons/GroupIcon.vue'
import { useAuthStore } from '../stores/auth'
import ExitIcon from '../icons/ExitIcon.vue'
import { ref, watchEffect } from 'vue'

const authStore = useAuthStore()
const isDrpOpen = ref(false)
const router = useRouter()
const isOpen = ref(false)
const token = ref(null)

watchEffect(() => {
  token.value = localStorage.getItem('token')
})

const handleGoogleTranslateSelect = () => {
  // console.log(language)
}

const showMenu = () => {
  isOpen.value = !isOpen.value
  isDrpOpen.value = false
}

const openTelegram = () => {
  window.open('https://t.me/four_three_three_tips', '_blank')

}

const logOut = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  token.value = null
  window.location.reload()
}

const openFreeTip = () => {
  router.push({ name: 'FreeTip' })
  showMenu()
}

const goSport = () => {
  router.push({ name: 'Sport' })
  showMenu()
}

const goLogin = () => {
  router.push({ name: 'Login' })
}

const goSignin = () => {
  router.push({ name: 'Signin' })
}

const openTelegramX = () => {
  window.open('https://t.me/four_three_three_tips', '_blank')

}
</script>

<style>
@import '../style/nav.css';
</style>

<template>
  <Teleport to="body">
    <div class="pop-container" :class="[openPop ? 'show-p' : '']" v-if="adsBannerImage">
      <div class="pop-align">
        <div class="pop-circle-container" @click="drawerStore.togglePop">
          <ExitIcon class="pop-exit-icon" />
        </div>
        <div
          class="pop-inner"
          @click="openAdlink()"
          :style="{
            backgroundImage: `url(${adsBannerImage})`
          }"
        ></div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watchEffect, onMounted, computed } from 'vue'
import { useDrawerStore } from '../stores/drawer'
import ExitIcon from '../icons/ExitIcon.vue'
import axios from 'axios'

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST
const drawerStore = useDrawerStore()
const adsBannerImage = ref(null)
const adsBannerLink = ref(null)
const openPop = ref(false)
const adsData = ref([])

watchEffect(() => {
  openPop.value = drawerStore.popDrawer
})

const getAds = async () => {
  try {
    const response = await axios.get(`${SERVER_HOST}/ads`)
    adsData.value = response.data
    showAds()
  } catch (err) {
    console.log(err)
  }
}

const filteredAds = computed(() => {
  const AdTitle = 'Popup'
  return adsData.value ? adsData.value.filter((Ads) => Ads.title === AdTitle) : []
})

const showAds = () => {
  adsBannerImage.value = filteredAds.value[0]?.image || null
  adsBannerLink.value = filteredAds.value[0]?.link || null
  AutoClose()
}

const AutoClose = () => {
  if (!adsBannerImage.value) {
    drawerStore.togglePop()
  }
}

const openAdlink = () => {
  window.open(`${adsBannerLink.value}`, '_blank')
}

onMounted(() => {
  getAds()
})
</script>

<style scoped>
@import '../style/popup.css';
</style>

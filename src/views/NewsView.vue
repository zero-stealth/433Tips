<script setup>
import axios from 'axios'
import { useRouter } from 'vue-router'
import news from '../assets/news.png'
import ArrowIcon from '@/icons/ArrowIcon.vue'
import { ref, onMounted, computed } from 'vue'

const showMoreButton = ref(true)
const maxNewsToShow = ref(8)
const newsData = ref([])
const router = useRouter()

const showCard = (cardID) => {
  router.push({ name: 'Tips', params: { id: cardID } })
}

const newsInfo = (newsID) => {
  router.push({ name: 'News', params: { id: newsID } })
}

const goAds = () => {
  window.open(
    'https://wa.me/+254703147237?text=Hi sporty predict, I want to buy VIP subcription'
  )
}


const goBack = () => {
  router.go(-1)
}

const visibleNews = computed(() => {
  return newsData.value.slice(0, maxNewsToShow.value)
})

const showMoreNews = () => {
  maxNewsToShow.value += 8
  showMoreButton.value = false
}

const showLessNews = () => {
  maxNewsToShow.value -= 8
  if (maxNewsToShow.value <= 8) {
    showMoreButton.value = true
  }
}
const getNews = async () => {
  try {
    const response = await axios.get('https://livescore-football.p.rapidapi.com/soccer/news-list', {
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
        'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST
      }
    })
    console.log(response.data.data)
    newsData.value = response.data.data
    console.log(newsData.value)
  } catch (err) {
    console.log(err)
  }
}


onMounted(() => {
  getNews()
})


</script>

<template>
  <div class="details-container news-pin">
    <div v-for="newsItem in visibleNews" :key="newsItem.id" class="details-wrapper">
      <div
        class="details-image"
        :style="{
          backgroundImage: `url(${newsItem.image})`
        }"
      >
        <div class="details-h">
          <ArrowIcon class="details-arrow" @click="goBack()" />
          <h2>Sport news</h2>
          <span></span>
        </div>
      </div>
      <div class="news-details-i">
        <h1>{{ newsItem.title }}</h1>
        <span>{{ newsItem.caption }}</span>
        <a :href="newsItem.url">more info</a>
      </div>
    </div>
  </div>
  <div class="mobilenav-layout">
    <mobileNav />
  </div>
</template>

<style> 
@import '../style/specific.css';
@import '../style/predictions.css';
</style>

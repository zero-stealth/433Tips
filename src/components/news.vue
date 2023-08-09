<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const newsData = ref([])
const maxNewsToShow = ref(8)
const showMoreButton = ref(true)

const visibleNews = computed(() => {
  return newsData.value.slice(0, maxNewsToShow.value)
})

const specific = () => {
  router.push({ name: 'News' })
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
  <template v-if="visibleNews.length > 0">
    <div class="mobil-news-component">
      <div
        class="news-component"
        v-for="(newsItem, index) in visibleNews"
        :key="index"
        :style="{ backgroundImage: `url(${newsItem.image})` }"
      >
        <div class="news-banner" :style="{ backgroundImage: `url(${newsItem.image})` }"></div>
        <div class="news-list">
          <div class="news-con">
            <div class="news-header">
              <h1>{{ newsItem.title }}</h1>
            </div>
            <div class="news-image" :style="{ backgroundImage: `url(${newsItem.image})` }"></div>
            <div class="news-i-info">
              <p>{{ newsItem.caption }}</p>
              <a :href="newsItem.url">more info</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <template v-else>
    <div class="no-news">
      <span>no news available</span>
    </div>
  </template>
</template>
<style>
@import '../style/news.css';
</style>

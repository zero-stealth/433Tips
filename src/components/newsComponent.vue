<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const newsData = ref([])

const getNews = async () => {
  try {
    const response = await axios.get('https://football-news-aggregator-live.p.rapidapi.com/news/espn', {
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
        'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST
      }
    })
    newsData.value = response.data
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  getNews()
})
</script>
<template>
  <template v-if="newsData.length > 0">
    <div class="mobil-news-component">
      <div
        class="news-component"
        v-for="(newsItem, index) in newsData"
        :key="index"
        :style="{ backgroundImage: `linear-gradient(to bottom, transparent, #060c1b), url(${newsItem.img})` }"
      >
        <div class="news-banner" :style="{ backgroundImage: `linear-gradient(to bottom, transparent, #060c1b), url(${newsItem.img})` }"></div>
        <div class="news-list">
          <div class="news-con">
            <div class="news-header">
              <h1>{{ newsItem.title }}</h1>
            </div>
            <div class="news-image" :style="{ backgroundImage: `url(${newsItem.img})` }"></div>
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

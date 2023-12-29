<script setup>
import banner from '../assets/banner.jpg'
import player from '../assets/player.png'

const getApp = () => {}
</script>
<template>
  <div class="ad-container" :style="{ backgroundImage: `url(${banner})` }">
    <div class="ad-info">
      <h1>Amazing jackpot predictions</h1>
      <p>For better predictions join our vip subscriptions🌟</p>
      <button @click="getApp()" class="ads-btn">Pay For Vip</button>
    </div>
    <div class="ad-img" :style="{ backgroundImage: `url(${player})` }">
    </div>
  </div>
</template>
<style>
@import '../style/adPanel.css';
</style>
  
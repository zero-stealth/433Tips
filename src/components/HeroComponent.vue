<template>
  <div class="hero-section">
    <div class="hero-s-contain">
      <div class="hero-info">
        <h1>
         GET AMAIZING FREE TIPS AN JACKPOT PREDICTIONS WITH US ON A DAILY 
        </h1>
        <p>
          We provide the best betting tips and predictions for football, and Sport. Sit
          back, relax, and enjoy the benefits. We've taken care of all the hard work for you
        </p>
      </div>
      <div @click="goPay" class="hero-img" :style="heroSectionStyle"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import background from '../assets/background1.png'
import { useRouter } from 'vue-router'

const router = useRouter()

const goPay = () => {
  router.push({ name: 'Pay' })
}

const heroSectionStyle = {
  backgroundImage: `url(${background})`
}
</script>

<style>
@import '../style/nav.css';
</style>

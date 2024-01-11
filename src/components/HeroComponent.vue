<template>
  <div class="hero-section">
    <div class="hero-s-contain">
      <div class="hero-info">
        <h1>
          GET AMAZING FREE TIPS AND JACKPOT PREDICTIONS WITH US DAILY 
        </h1>
        <p>
          We provide the best betting tips and predictions for football and sports. Sit
          back, relax, and enjoy the benefits. We've taken care of all the hard work for you.
        </p>
      </div>
      <div
        @mousemove="handleMouseMove"
        class="hero-img"
        :style="`background-image: url(${background}); transform: rotate(${rotation}deg);`"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import background from '../assets/background1.png'



const rotation = ref(0)

const handleMouseMove = (event) => {
  const { offsetX, offsetY } = event
  const { width, height } = event.target.getBoundingClientRect()

  const rotationX = ((offsetY - height / 2) / height) * 10
  const rotationY = -((offsetX - width / 2) / width) * 10

  rotation.value = rotationX + rotationY
}
</script>

<style>
@import '../style/nav.css';
.hero-img {
  transition: transform 0.2s ease-in-out;
}
</style>
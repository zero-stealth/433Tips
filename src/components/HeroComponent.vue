<template>
  <div class="hero-section">
    <div class="hero-s-contain">
      <div class="hero-info">
        <h1>GET AMAZING FREE TIPS AND JACKPOT PREDICTIONS WITH US ON A DAILY</h1>
        <p>
          We provide the best betting tips and predictions for football and sports. Sit back, relax,
          and enjoy the benefits. We've taken care of all the hard work for you.
        </p>
      </div>
      <div class="hero-img">
        <canvas id="canvas3d" class="canvas-s"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Application } from '@splinetool/runtime'

const urls = [
  'https://prod.spline.design/lZh1e9ZavteNS3gy/scene.splinecode',
  'https://prod.spline.design/CuHrlb7QPJeXBE2S/scene.splinecode',
  'https://prod.spline.design/jxH1-fr45MZbqHr7/scene.splinecode',
  'https://prod.spline.design/i7kqqLx8Xewv7Whv/scene.splinecode'
]

const currentIndex = ref(0)

onMounted(() => {
  const canvas = document.getElementById('canvas3d')
  if (canvas) {
    const spline = new Application(canvas)
    setInterval(() => {
      const newIndex = (currentIndex.value + 1) % urls.length
      currentIndex.value = newIndex
      spline.load(urls[newIndex])
    }, 10000) // 10 seconds interval
  } else {
    console.error('Canvas element not found.')
  }
})


</script>

<style>
@import '../style/nav.css';

/* Add rotation transition */
.hero-img {
  transition: transform 0.2s ease-in-out;
}
</style>

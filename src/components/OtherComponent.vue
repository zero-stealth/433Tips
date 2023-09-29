<template>
      <div class="prediction-con">
      <div class="prediction-p">
        <button class="other-p-btn" @click="goToV()">Vip</button>
        <button class="other-p-btn" @click="goToB()">Free Tip</button>
        <button class="other-p-btn" @click="goToJ()">Jackpot</button>
        <button class="other-p-btn" @click="goToO()">Other sports</button>
      </div>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router'; 

const router = useRouter();

const goToB = () => {
  router.push({ name: 'FreeTip' })
}

const goToJ = () => {
  router.push({ name: 'Jackpot' })
}

const goToO = () => {
  router.push({ name: 'Sport' }) 
}

const goToV = () => {
  router.push({ name: 'Vip' }) 

}


</script>
<style>
@import '../style/other.css';
</style>

<template>
  <div class="CardGame-container">
    <div class="CardGame-center">
      <div class="CardGame-a">
        <div class="CardGame-fade">
          <div class="CardGame-inner">
            <img
              :src="teamAIcon"
              :alt="teamA"
              :class="[sport === 'Sport' ? 'CardGame-img circle-tennis' : 'CardGame-img square-img']"
            />
          </div>
        </div>
        <h2>{{ teamA }}</h2>
      </div>
      <div class="CardGame-in">
        <div class="CardGame-in-s">
          <span>{{ time }}</span>
        </div>
        <div v-if="!showScore">
          <span>vs</span>
        </div>
        <div v-if="shouldShowScore" class="CardGame-score">
          <span class="CardGame-s">{{ teamAscore }}</span>
          <span class="CardGame-p">:</span>
          <span class="CardGame-s">{{ teamBscore }}</span>
        </div>
        <div class="CardTip">
        <span>{{ tip }}</span>
      </div>
      </div>
      <div class="CardGame-a">
        <div class="CardGame-fade">
          <div class="CardGame-inner">
            <img
              :src="teamBIcon"
              :alt="teamB"
              :class="[sport === 'Sport' ? 'CardGame-img circle-tennis' : 'CardGame-img square-img']"
            />
          </div>
        </div>
        <h2>{{ teamB }}</h2>
      </div>
    </div>
   
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  leagueIcon: {
    type: String,
    required: true
  },
  teamAIcon: {
    type: String,
    required: true
  },
  teamBIcon: {
    type: String,
    required: true
  },
  tip: {
    type: String,
    default: '0'
  },
  league: {
    type: String,
    required: true
  },
  teamA: {
    type: String,
    required: true
  },
  teamB: {
    type: String,
    required: true
  },
  teamAscore: {
    type: Number,
    required: true
  },
  teamBscore: {
    type: Number,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  sport: {
    type: String,
    required: false
  },
  showScore: {
    type: Boolean,
    default: false
  }
})

const shouldShowScore = computed(() => {
  return props.showScore && props.teamAscore !== undefined && props.teamBscore !== undefined
})

</script>

<style scoped>
@import '../style/CardGame.css';
</style>

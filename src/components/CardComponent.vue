<template>
  <div class="card-comp" :style="backgroundImg">
    <div class="card-container">
    <div class="card-title">
      <div class="card-s-leag">
        <img :src="leagueIcon" alt="league-img" class="league-c-img" />
        <span>{{ league }}</span>
      </div>
      <div class="card-in-s">
        <span>{{ time }}</span>
      </div>
    </div>
    <div class="card-center">
      <div class="card-a">
        <div class="card-fade">
          <div class="card-inner">
            <img
              :src="teamAIcon"  
              :alt="teamA"
              :class="[sport === 'Sport' ? 'card-img circle-tennis' : 'card-img square-img']"
            />
          </div>
        </div>
        <h2>{{ teamA }}</h2>
      </div>
      <div class="card-in">
        <div v-if="!showScore">
          <span>vs</span>
        </div>
        <div v-if="shouldShowScore" class="card-score">
          <span class="card-s">{{ teamAscore }}</span>
          <span class="card-p">:</span>
          <span class="card-s">{{ teamBscore }}</span>
        </div>
      </div>
      <div class="card-a">
        <div class="card-fade">
          <div class="card-inner">
            <img
              :src="teamBIcon"
              :alt="teamB"
              :class="[sport === 'Sport' ? 'card-img circle-tennis' : 'card-img square-img']"
            />
          </div>
        </div>
        <h2>{{ teamB }}</h2>
      </div>
    </div>
    <div class="title-m">
      <div class="Tip">
        <span>{{ tip }}</span>
      </div>
    </div>
    <div class="card-footer">
      <div class="card-f" v-for="formationA in formationsA" :key="formationA">
        <span :class="[formationA === 'l' ? 'loose' : formationA === 'w' ? 'win' : 'draw']">{{
          formationA
        }}</span>
      </div>
      <div class="card-fi">form</div>
      <div class="card-f" v-for="formationB in formationsB" :key="formationB">
        <span :class="[formationB === 'l' ? 'loose' : formationB === 'w' ? 'win' : 'draw']">{{
          formationB
        }}</span>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CardAnimation from '../assets/dark.png'

const props = defineProps({
  formationA: {
    type: Array,
    required: true,
    default: () => ['l', 'w', 'd', 'l', 'w']
  },
  formationB: {
    type: Array,
    required: true,
    default: () => ['l', 'w', 'd', 'l', 'w']
  },
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

const backgroundImg = {
  backgroundImage: `url(${CardAnimation})`
}

const formationsA = ref(props.formationA)
const formationsB = ref(props.formationB)

const shouldShowScore = computed(() => {
  return props.showScore && props.teamAscore !== undefined && props.teamBscore !== undefined
})
</script>

<style scoped>
@import '../style/card.css';
</style>

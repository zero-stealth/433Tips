<template>
  <div>
    <div class="form-container-h">
      <h1>Jackpot update</h1>
    </div>
    <form @submit.prevent="handleSubmit" enctype="multipart/form-data" class="form-container">
      <div class="form-wrapper">
        <h1>Team A</h1>
        <div class="form-group">
          <label for="teamAscore">Score:</label>
          <input
            v-model="teamAscore"
            type="text"
            class="form-g-input"
            placeholder="0"
            id="teamAscore"
          />
        </div>
      </div>
      <div class="form-wrapper">
        <div class="form-group">
          <label for="score">Show score:</label>
          <input
            v-model="ShowScore"
            type="text"
            class="form-g-input"
            placeholder="true"
            id="score"
          />
        </div>
        <button type="submit" class="btn-f-f f-desktop">Submit</button>
      </div>
      <div class="form-wrapper">
        <h1>Team B</h1>
        <div class="form-group">
          <label for="teamBscore">Score:</label>
          <input
            v-model="teamBscore"
            type="text"
            class="form-g-input"
            placeholder="0"
            id="teamBscore"
          />
        </div>
        <button type="submit" class="btn-f-f f-mobile">Submit</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits('formSubmit')
import { useToast } from 'vue-toastification'

const teamAscore = ref()
const teamBscore = ref()
const ShowScore = ref()
const toast = useToast()

async function handleSubmit() {
  if (teamAscore.value !== null && ShowScore.value !== null && teamBscore.value !== null) {
    try {
      emit('formSubmit', teamAscore.value, teamBscore.value, ShowScore.value)
      toast.success('game updated')
    } catch (err) {
      toast.error(err.response.data.error)
    }
  } else {
    toast.error('No empty fields allowed')
  }
}
</script>

<style>
@import '../style/games.css';
</style>

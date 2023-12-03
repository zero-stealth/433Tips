<template>
<div class="form-con">
    <form @submit.prevent="handleSubmit" enctype="multipart/form-data" class="form-container">
      <div class="form-wrapper">
        <h1>Team A</h1>
        <div class="form-group">
          <label for="teamA">Name:</label>
          <input
            v-model="teamA"
            type="text"
            class="form-g-input"
            placeholder="Manchester"
            id="teamA"
          />
        </div>
        <div class="form-group">
          <label for="teamAIcon">Logo:</label>
          <input
            @change="handleTeamALogo"
            type="file"
            class="form-g-input"
            id="teamAIcon"
            accept="image/*"
          />
        </div>
        <div class="form-group">
          <label for="formationA">Formation:</label>
          <input
            v-model="formationA"
            type="text"
            class="form-g-input"
            placeholder="l-w-d-w"
            id="formationA"
          />
        </div>
        <div class="form-group">
          <label for="Status">Status:</label>
          <input v-model="status" type="text" class="form-g-input" placeholder="1" id="status" />
        </div>
        <div class="form-group">
          <label for="teamAPosition">Position:</label>
          <input
            v-model="teamAPosition"
            type="text"
            class="form-g-input"
            placeholder="1"
            id="teamAPosition"
          />
        </div>
        <div class="form-group">
          <label for="teamAscore">Score:</label>
          <input
            v-model="teamAscore"
            type="text"
            class="form-g-input"
            placeholder="2"
            id="teamAscore"
          />
        </div>
      </div>
      <div class="form-wrapper">
        <div class="form-group">
          <label for="tip">Match Tip:</label>
          <input v-model="tip" type="text" class="form-g-input" placeholder="1" id="tip" />
        </div>
        <div class="form-group">
          <label for="leagueIcon">League logo</label>
          <input
            @change="handleLeagueLogo"
            type="file"
            class="form-g-input"
            id="leagueIcon"
            accept="image/*"
          />
        </div>
        <div class="form-group">
          <label for="league">Match league:</label>
          <input
            v-model="league"
            type="text"
            class="form-g-input"
            placeholder="team league"
            id="league"
          />
        </div>
        <div class="form-group">
          <label for="time">Match Time:</label>
          <input v-model="time" type="time" class="form-g-input" placeholder="12:00pm" id="time" />
        </div>
        <div class="form-group">
          <label for="date">Match Date:</label>
          <input
            v-model="date"
            type="text"
            class="form-g-input"
            placeholder="03-06-2023"
            id="date"
          />
        </div>
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
          <label for="teamB">Name:</label>
          <input
            v-model="teamB"
            type="text"
            class="form-g-input"
            placeholder="Arsenal"
            id="teamB"
          />
        </div>
        <div class="form-group">
          <label for="teamBIcon">Logo:</label>
          <input
            @change="handleTeamBLogo"
            type="file"
            class="form-g-input"
            id="teamBIcon"
            accept="image/*"
          />
        </div>
        <div class="form-group">
          <label for="formationB">Form:</label>
          <input
            v-model="formationB"
            type="text"
            class="form-g-input"
            placeholder="l-w-d-w"
            id="formationB"
          />
        </div>
        <div class="form-group">
          <label for="teamBPosition">Position:</label>
          <input
            v-model="teamBPosition"
            type="text"
            class="form-g-input"
            placeholder="2"
            id="teamBPosition"
          />
        </div>
        <div class="form-group">
          <label for="teamBscore">Score:</label>
          <input
            v-model="teamBscore"
            type="text"
            class="form-g-input"
            placeholder="5"
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
const emit = defineEmits(['formSubmit'])

const teamA = ref('')
const teamB = ref('')
const teamAIcon = ref(null);
const teamBIcon = ref(null);
const leagueIcon = ref(null);
const formationA = ref('')
const formationB = ref('')
const teamAPosition = ref('')
const teamBPosition = ref('')
const time = ref('')
const status = ref('')
const league = ref('')
const teamAscore = ref('');
const teamBscore = ref('');
const date = ref('')
const tip = ref('')
const ShowScore = ref(false)

function handleFileUpload(event, targetRef) {
  const file = event.target.files[0]
  if (file) {
    targetRef.value = file
  }
}

function handleTeamALogo(event) {
  handleFileUpload(event, teamAIcon)
}

function handleTeamBLogo(event) {
  handleFileUpload(event, teamBIcon)
}

function handleLeagueLogo(event) {
  handleFileUpload(event, leagueIcon)
}


function handleSubmit() {
  // ... (your existing code)
  try {
    const formData = {
      teamAscore: teamAscore.value,
      teamBscore: teamBscore.value,
      showScore: ShowScore.value,
      teamA: teamA.value,
      teamB: teamB.value,
      leagueIcon: leagueIcon.value,
      formationA: formationA.value,
      formationB: formationB.value,
      time: time.value,
      date: date.value,
      tip: tip.value,
      status: status.value,
      league: league.value,
      teamAPosition: teamAPosition.value,
      teamBPosition: teamBPosition.value,
      teamAIcon: teamAIcon.value,
      teamBIcon: teamBIcon.value
    }

    emit('formSubmit', formData)
  } catch (err) {
    console.log(err)
  }
}
</script>

<style>
@import '../style/games.css';
</style>

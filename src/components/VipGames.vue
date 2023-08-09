<template>
  <div>
    <div class="form-container-h">
      <h1>Vip games</h1>
    </div>
    <form @submit.prevent="handleSubmit" enctype="multipart/form-data" class="form-container">
      <div class="form-wrapper">
        <h1>Team A</h1>
        <div class="form-group">
          <label for="teamA">Name:</label>
          <input v-model="teamA" type="text" class="form-g-input" placeholder="Manchester" id="teamA" />
        </div>
        <div class="form-group">
          <label for="teamAIcon">Logo:</label>
          <input @change="handleTeamALogo" type="file" class="form-g-input" id="teamAIcon" accept="image/*" />
        </div>
        <div class="form-group">
          <label for="formationA">Form:</label>
          <input v-model="formationA" type="text" class="form-g-input" placeholder="l-w-d-w" id="formationA" />
        </div>
        <div class="form-group">
          <label for="teamAPosition">Position:</label>
          <input v-model="teamAPosition" type="text" class="form-g-input" placeholder="1" id="teamAPosition" />
        </div>
        <div class="form-group">
          <label for="teamAscore">Score:</label>
          <input v-model="teamAscore" type="text" class="form-g-input" placeholder="2" id="teamAscore" />
        </div>
      </div>
      <div class="form-wrapper">
        <div class="form-group">
          <label for="tip">Match Tip:</label>
          <input v-model="tip" type="text" class="form-g-input" placeholder="1" id="tip" />
        </div>
        <div class="form-group">
          <label for="leagueIcon">League logo</label>
          <input @change="handleLeagueLogo" type="file" class="form-g-input" id="leagueIcon" accept="image/*" />
        </div>
        <div class="form-group">
          <label for="league">Match league:</label>
          <input v-model="league" type="text" class="form-g-input" placeholder="team league" id="league" />
        </div>
        <div class="form-group">
          <label for="time">Match Time:</label>
          <input v-model="time" type="time" class="form-g-input" placeholder="12:00pm" id="time" />
        </div>
        <div class="form-group">
          <label for="date">Match Date:</label>
          <input v-model="date" type="text" class="form-g-input" placeholder="03-06-2023" id="date" />
        </div>
        <button type="submit" class="btn-f-f f-desktop">Submit</button>
      </div>
      <div class="form-wrapper">
        <h1>Team B</h1>
        <div class="form-group">
          <label for="teamB">Name:</label>
          <input v-model="teamB" type="text" class="form-g-input" placeholder="Arsenal" id="teamB" />
        </div>
        <div class="form-group">
          <label for="teamBIcon">Logo:</label>
          <input @change="handleTeamBLogo" type="file" class="form-g-input" id="teamBIcon" accept="image/*" />
        </div>
        <div class="form-group">
          <label for="formationB">Form:</label>
          <input v-model="formationB" type="text" class="form-g-input" placeholder="l-w-d-w" id="formationB" />
        </div>
        <div class="form-group">
          <label for="teamBPosition">Position:</label>
          <input v-model="teamBPosition" type="text" class="form-g-input" placeholder="2" id="teamBPosition" />
        </div>
        <div class="form-group">
          <label for="teamBscore">Score:</label>
          <input v-model="teamBscore" type="text" class="form-g-input" placeholder="5" id="teamBscore" />
        </div>
        <button type="submit" class="btn-f-f f-mobile">Submit</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const teamA = ref('');
const teamB = ref('');
const teamAIcon = ref(null);
const teamBIcon = ref(null);
const leagueIcon = ref(null);
const formationA = ref('l-d-w-d');
const formationB = ref('l-d-w-d');
const teamAPosition = ref('');
const teamBPosition = ref('');
const time = ref('');
const league = ref('');
const teamAscore = ref(0);
const teamBscore = ref(0);
const date = ref('');
const tip = ref('');

function handleFileUpload(event, targetRef) {
  const file = event.target.files[0];
  if (file) {
    targetRef.value = file;
  }
}

function handleTeamALogo(event) {
  handleFileUpload(event, teamAIcon);
}

function handleTeamBLogo(event) {
  handleFileUpload(event, teamBIcon);
}

function handleLeagueLogo(event) {
  handleFileUpload(event, leagueIcon);
}

async function handleSubmit() {
  if (
    teamA.value.trim() !== '' &&
    teamAIcon.value !== null &&
    leagueIcon.value !== null &&
    formationA.value.trim() !== '' &&
    teamAPosition.value.trim() !== '' &&
    teamAscore.value !== null &&
    teamB.value.trim() !== '' &&
    teamBIcon.value !== null &&
    formationB.value.trim() !== '' &&
    teamBPosition.value.trim() !== '' &&
    teamBscore.value !== null &&
    time.value.trim() !== '' &&
    tip.value !== null &&
    date.value !== null &&
    league.value !== null 
  ) {
    const user = JSON.parse(localStorage.getItem('token'));
    try {
      const formData = new FormData();
      formData.append('teamA', teamA.value);
      formData.append('teamAIcon', teamAIcon.value);
      formData.append('leagueIcon', leagueIcon.value);
      formData.append('formationA', formationA.value);
      formData.append('teamAPosition', teamAPosition.value);
      formData.append('teamAscore', teamAscore.value);
      formData.append('teamB', teamB.value);
      formData.append('teamBIcon', teamBIcon.value);
      formData.append('formationB', formationB.value);
      formData.append('teamBPosition', teamBPosition.value);
      formData.append('teamBscore', teamBscore.value);
      formData.append('time', time.value);
      formData.append('league', league.value);
      formData.append('date', date.value)
      formData.append('tip', tip.value);

      const response = await axios.post(
        'https://predictions-reg9.onrender.com/predictions/create/vip',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${user}`,
          },
        }
      );
      alert('tip posted')
      // console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  } else {
    alert('No empty fields allowed');
  }
}
</script>

<style>
@import '../style/games.css';
</style>

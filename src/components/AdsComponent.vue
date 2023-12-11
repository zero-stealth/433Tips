<template>
  <div class="form-con con-f">
    <form @submit.prevent="handleSubmit" enctype="multipart/form-data" class="form-container">
      <div class="form-wrapper">
        <h1>Ads</h1>
        <div class="form-group">
          <label for="adsImage">Image:</label>
          <input
            @change="handleAdsimage"
            type="file"
            class="form-g-input"
            id="adsImage"
            accept="image/*"
          />
        </div>
        <div class="form-group">
          <label for="link">Link:</label>
          <input v-model="link" type="text" class="form-g-input" placeholder="https://" id="link" />
        </div>
        <div class="form-group">
          <label for="category">Ads category:</label>
          <select v-model="category" class="form-g-input" id="category">
            <option value="" disabled>Choose category</option>
            <option value="Popup">Popup</option>
          </select>
        </div>
        <button type="submit" class="btn-f-f">Submit</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST

const description = ref('')
const adsImage = ref(null)
const toast = useToast()
const category = ref('')
const link = ref('')

function handleFileUpload(event, targetRef) {
  const file = event.target.files[0]
  if (file) {
    targetRef.value = file
  }
}

function handleAdsimage(event) {
  handleFileUpload(event, adsImage)
}

async function handleSubmit() {
  if (category.value !== '') {
    const user = JSON.parse(localStorage.getItem('token'))
    try {
      const formData = new FormData()
      formData.append('link', link.value)
      formData.append('image', adsImage.value)
      formData.append('title', category.value)
      formData.append('description', description.value)
      await axios.post(`${SERVER_HOST}/ads/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user}`
        }
      })
      toast.success('Time posted')

    } catch (err) {
      toast.error(err.response.data.error)
    }
  } else {
    toast.error('Please enter all the required fields')

  }
}

</script>

<style>
@import '../style/games.css';
</style>

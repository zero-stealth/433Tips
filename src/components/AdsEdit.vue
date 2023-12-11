<template>
<div class="form-con">
    <form @submit.prevent="handleSubmit" enctype="multipart/form-data" class="form-container">
      <div class="form-wrapper">
        <div class="form-group">
          <label for="adsImage">Image:</label>
          <input @change="handleAdsimage" type="file" class="form-g-input" id="adsImage" accept="image/*" />
        </div>
        <div class="form-group">
          <label for="link">Link:</label>
          <input v-model="link" type="text" class="form-g-input" placeholder="https://" id="link" />
        </div>
        <div class="form-group">
          <label for="link">Description:</label>
          <input v-model="description" type="text" class="form-g-input" placeholder="description" id="description" />
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
import { useToast } from 'vue-toastification'
const emit = defineEmits(['formSubmitAds'])

const description = ref('');
const adsImage = ref(null);
const category = ref('');
const toast = useToast()
const link = ref('');


function handleFileUpload(event, targetRef) {
  const file = event.target.files[0]
  if (file) {
    targetRef.value = file
  }
}

function handleAdsimage(event) {
  handleFileUpload(event, adsImage)
}

function handleSubmit() {
  try {
    const formData = {
      link: link.value,
      category: category.value,
      adsImage: adsImage.value,
      description: description.value,
    }

    emit('formSubmitAds', formData);
  } catch (err) {
    toast.error(err.response.data.error)

  }
}
</script>

<style>
@import '../style/games.css';
</style>

<template>
  <div
    class="auth-container"
    :style="{
      backgroundImage: `linear-gradient(
        110deg,
        rgba(3, 30, 60, 0.8),
        rgba(3, 30, 60, 0.7)
      ), url(${SportBg})`
    }"
  >
    <div class="form-l-wrapper">
      <h1>Create an account</h1>
      <form @submit.prevent="create" class="l-form">
        <input type="text" class="input-l" placeholder="Full Name" v-model="username" />
        <input type="email" class="input-l" placeholder="Email Address" v-model="email" />
        <select class="input-l" v-model="selectedCountry">
          <option disabled value="">Select a country</option>
          <option v-for="country in countriesData" :key="country.code" :value="country.code">
            {{ country.name }}
          </option>
        </select>
        <input type="password" class="input-l" placeholder="Password" v-model="password" />
        <input type="password" class="input-l" placeholder="Confirm password" v-model="confirmPassword" />
        <p>{{ errMsg }}</p>
        <button class="btn-f" type="submit">Sign up</button>
        <span @click="login">Login</span>
      </form>
      <!-- <span>or</span> -->
      <!-- <div class="l-alternatives">
        <button class="alt-btn" @click="useGoogle">
          <google-icon class="alt-icon" />
          Sign up with Google
        </button>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import SportBg from '../assets/sport-bg.png'
import GoogleIcon from '../icons/googleIcon.vue'
import countriesData from '../components/countries.json'

const selectedCountry = ref('')
const router = useRouter()
const username = ref('')
const password = ref('')
const errMsg = ref('')
const email = ref('')
const confirmPassword = ref('')

const reset = () => {
  email.value = ''
  password.value = ''
  username.value = ''
  selectedCountry.value = ''
  confirmPassword.value = ''
}

const create = async () => {
  if (username.value !== '' && password.value !== '') {
    try {
      const response = await axios.post('https://predictions-reg9.onrender.com/auth/register', {
        username: username.value,
        email: email.value,
        password: password.value,
        country: selectedCountry.value,
        confirmPassword: confirmPassword.value,
        selectedCountry: selectedCountry.value
      })
      const token = response.data.token
      const isPaid = response.data.paid
      const id = response.data._id
      localStorage.setItem('token', token)
      localStorage.setItem('paid', isPaid)
      localStorage.setItem('id', id)
      router.push({ name: 'Vip' })
    } catch (error) {
      errMsg.value = 'Invalid email or password';
      alert(errMsg.value)
    }
  } else {
    errMsg.value = 'Write something'
    alert(errMsg.value)
    reset()
  }
}

const useGoogle = async () => {
  try {
    const response = await axios.get('https://predictions-reg9.onrender.com/auth/auth/google')

    // Handle the response from the server
    // You may redirect the user to the returned URL or perform other operations based on the response
    router.push({ name: 'Home' })
  } catch (error) {
    // Handle the error
    errMsg.value = error;
    alert(errMsg.value)
  }
}

const login = () => {
  router.push({ name: 'Login' })
}
</script>

<style>
@import '../style/auth.css';
</style>

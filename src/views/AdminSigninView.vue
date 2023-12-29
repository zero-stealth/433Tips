<template>
  <div class="auth-container">
    <div class="form-l-wrapper">
      <h1>Create an account</h1>
      <form @submit.prevent="create" class="l-form">
        <input type="text" class="input-l" placeholder="Full Name" v-model="username" />
        <input type="email" class="input-l" placeholder="Email Address" v-model="email" />
        <select class="input-l" v-model="selectedCountry">
          <option disabled value="">Select your country</option>
          <option v-for="country in countriesData" :key="country.code" :value="country.code">
            {{ country.name }}
          </option>
        </select>
        <input type="password" class="input-l" placeholder="Password" v-model="password" />
        <input
          type="password"
          class="input-l"
          placeholder="Confirm password"
          v-model="confirmPassword"
        />
        <p>{{ errMsg }}</p>
        <button class="btn-f" type="submit">Create</button>
      </form>
      <span>or</span>
      <div class="l-alternatives">
        <button class="alt-btn" @click="login">
         Login
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useToast } from 'vue-toastification';
import countriesData from '../components/countries.json'


const SERVER_HOST = import.meta.env.VITE_SERVER_HOST
const selectedCountry = ref('')
const router = useRouter()
const username = ref('')
const password = ref('')
const toast = useToast();
const errMsg = ref('')
const email = ref('')
const confirmPassword = ref('')
const authStore = useAuthStore()

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
      const response = await axios.post(`${SERVER_HOST}/auth/register-admin`, {
        username: username.value,
        email: email.value,
        password: password.value,
        country: selectedCountry.value,
        confirmPassword: confirmPassword.value,
        selectedCountry: selectedCountry.value
      })
      const token = response.data.token
      const id = response.data._id

      authStore.toggleToken(JSON.stringify(token))
      localStorage.setItem('username', username)
      localStorage.setItem('admin', true)
      localStorage.setItem('token', JSON.stringify(token))
      localStorage.setItem('id', id)
      router.push({ name: 'Panel' })
      toast.success('Welcome Admin!');

    } catch (error) {
      toast.error(error.response.data.message);

    }
  } else {
    toast.error('Please enter all the required fields');

    reset()
  }
}

const login = () => {
  router.push({ name: 'AdminLogin' })
}
</script>

<style>
@import '../style/auth.css';
</style>

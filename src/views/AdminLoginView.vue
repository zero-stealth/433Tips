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
      <h1>{{ title }}</h1>
      <form @submit.prevent="login" class="l-form" v-if="!resetPage">
        <input type="email" class="input-l" placeholder="Email Address" v-model="email" />
        <input type="password" class="input-l" placeholder="Password" v-model="password" />
        <p>{{ errMsg }}</p>
        <button class="btn-f" type="submit">Login</button>
        <span @click="forgot">Forgot password</span>
      </form>
      <form @submit.prevent="resetAuth" class="l-form" v-else>
        <input type="email" class="input-l" placeholder="Email Address" v-model="email" />
        <input type="password" class="input-l" placeholder="Password" v-model="password" />
        <p>{{ errMsg }}</p>
        <button class="btn-f" type="submit">Reset</button>
        <span @click="create">Create an account</span>
      </form>
      <span>or</span>
      <div class="l-alternatives">
        <button class="alt-btn" @click="useGoogle">
          <googleIcon class="alt-icon" />
          Login with Google
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import SportBg from '../assets/sport-bg.png'
import googleIcon from '../icons/googleIcon.vue'

const resetPage = ref(false)
const router = useRouter()
const password = ref('')
const title = ref('Login')
const errMsg = ref('')
const email = ref('')

const login = async () => {
  if (email.value !== '' && password.value !== '') {
    try {
      const response = await axios.post('https://predictions-reg9.onrender.com/auth/login', {
        email: email.value,
        password: password.value
      });

      console.log(response.data); 
      
      const token = response.data.token;
      if (token) {
        const isAdmin = response.data.isAdmin;
        const adminusername = response.data.username;

        localStorage.setItem('admin', isAdmin);
        localStorage.setItem('username', adminusername);
        localStorage.setItem('token', JSON.stringify(token));

        router.push({ name: 'Panel' });
      } else {
        errMsg.value = 'Invalid email or password';
      }
    } catch (error) {
      console.error(error);
      errMsg.value = 'Login failed. Please check your email and password.';
    }
  } else {
    errMsg.value = 'Please enter your email and password.';
    alert(errMsg.value);
  }
};
const forgot = () => {
  title.value = 'Reset Your Account'
  resetPage.value = !resetPage.value
}

const create = () => {
  router.push({ name: 'AdminSignin' })
}

const resetAuth = async () => {
  if (email.value !== '' && password.value !== '') {
    try {
      const response = await axios.post('https://predictions-reg9.onrender.com/auth/reset', {
        email: email.value,
        password: password.value
      })
      console.log(response.data) // Handle the response data as needed
      resetPage.value = !resetPage.value
    } catch (error) {
      errMsg.value = error
    }
  } else {
    errMsg.value = 'Write something'
    reset()
  }
}

const useGoogle = async () => {
  try {
    const response = await axios.get('https://predictions-reg9.onrender.com/auth/auth/google')

    // Handle the response from the server
    if (response.data.redirectTo) {
      router.push({ path: response.data.redirectTo })
    } else {
      console.error('Invalid response from server')
    }
  } catch (error) {
    // Handle the error
    console.error(error)
  }
}
</script>

<style>
@import '../style/auth.css';
</style>

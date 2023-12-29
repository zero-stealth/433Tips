<template>
  <div class="auth-container">
    <div class="form-l-wrapper">
      <h1>{{ title }}</h1>
      <form @submit.prevent="login" class="l-form" v-if="!resetPage">
        <input type="email" class="input-l" placeholder="Email Address" v-model="email" />
        <input type="password" class="input-l" placeholder="Password" v-model="password" />
        <button class="btn-f" type="submit">Login</button>
        <span @click="forgot">Forgot password</span>
      </form>
      <form @submit.prevent="resetAuth" class="l-form" v-else>
        <input type="email" class="input-l" placeholder="Email Address" v-model="email" />
        <button class="btn-f" type="submit">Request reset</button>
      </form>
      <span>or</span>
      <div class="l-alternatives">
        <button class="alt-btn" @click="create">
         Create an account
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

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST
const authStore = useAuthStore()
const resetPage = ref(false)
const router = useRouter()
const title = ref('Login')
const toast = useToast();
const password = ref('')
const email = ref('')

const reset = () => {
  password.value = ''
  email.value = ''
}

const login = async () => {
  if (email.value !== '' && password.value !== '') {
    try {
      const response = await axios.post(`${SERVER_HOST}/auth/login`, {
        email: email.value,
        password: password.value
      })


      const token = response.data.token
      if (token) {
        const isAdmin = response.data.isAdmin
        const adminusername = response.data.username
        authStore.toggleToken(JSON.stringify(token))
        localStorage.setItem('admin', isAdmin)
        localStorage.setItem('username', adminusername)
        localStorage.setItem('token', JSON.stringify(token))
        console.log(isAdmin)
        router.push({ name: 'Panel' })
        toast.success('Welcome Admin')
      } else {
        toast.error('Login failed')
      }
    } catch (error) {
      toast.error(error.response.data.error)
    }
  } else {
    toast.error('Please enter your email and password.')

  }
}
const forgot = () => {
  title.value = 'Reset Your Account'
  resetPage.value = !resetPage.value
}

const create = () => {
  router.push({ name: 'AdminSignin' })
}

const resetAuth = async () => {
  if (email.value !== '') {
    try {
      const response = await axios.post(`${SERVER_HOST}/auth/request-reset`, {
        email: email.value
      })
      toast.success(response.data.message)
    } catch (error) {
      toast.error(error.response.data.error)
    }
  } else {
    toast.error('Write your email something')
    reset()
  }
}

</script>
=
<style>
@import '../style/auth.css';
</style>

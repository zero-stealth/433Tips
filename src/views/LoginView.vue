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
          create an account
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
const title = ref('login')
const toast = useToast();
const email = ref('')
const password = ref('')


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

      const responseData = response.data
      const token = responseData.token

      if (token) {
        const isPaid = responseData.paid
        const username = responseData.username
        const id = responseData._id
        authStore.toggleToken(JSON.stringify(token))
        localStorage.setItem('username', username)
        localStorage.setItem('token', JSON.stringify(token))
        localStorage.setItem('paid', isPaid)
        localStorage.setItem('id', id)
        router.push({ name: 'Vip' })
        toast.success('welcome back!');
      } else {
        toast.error('Login failed');
      }
    } catch (error) {
      toast.error(error.response.data.error)

    }
  } else {
    toast.error('Please enter your email and password.')
    reset()
  }
}

const forgot = () => {
  title.value = 'write your email account'
  resetPage.value = !resetPage.value
}

const create = () => {
  router.push({ name: 'Signin' })
}

const resetAuth = async () => {
  if (email.value !== '') {
    try {
      const response = await axios.post(`${SERVER_HOST}/auth/request-reset`, {
        email: email.value,
      })

      router.push({ name: 'Reset' })
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

<style>
@import '../style/auth.css';
</style>
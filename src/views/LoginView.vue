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
        <!-- <span>or</span> -->
     
        <!-- <span @click="create">Create an account</span> -->
      </form>
      <form @submit.prevent="resetAuth" class="l-form" v-else>
        <input type="email" class="input-l" placeholder="Email Address" v-model="email" />
        <input type="password" class="input-l" placeholder="Password" v-model="password" />
        <p>{{ errMsg }}</p>
        <button class="btn-f" type="submit">Reset</button>
        <!-- <span @click="create">Create an account</span> -->
      </form>
      <span>or</span>
      <span class="click-a" @click="create">Create an account</span>

      <!-- <div class="l-alternatives">
        <button class="alt-btn" @click="useGoogle">
          <googleIcon class="alt-icon" />
          Login with Google
        </button>
      </div> -->

    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import axios from 'axios'
import SportBg from '../assets/sport-bg.png'
import googleIcon from '../icons/googleIcon.vue'
import { useRouter } from 'vue-router'

const resetPage = ref(false)
const router = useRouter()
const username = ref('')
const password = ref('')
const title = ref('login')
const errMsg = ref('')
const email = ref('')

const reset = () => {
  password.value = ''
  username.value = ''
  email.value = ''
}

const login = async () => {
  if (email.value !== '' && password.value !== '') {
    try {
      const response = await axios.post('https://predictions-reg9.onrender.com/auth/login', {
        email: email.value,
        password: password.value
      });

      const responseData = response.data;

      const token = responseData.token;
      if (token) {
        const isPaid = responseData.paid;
        const token = responseData.token;
        const username = responseData.username;
        const id = responseData._id;

        localStorage.setItem('username', username);
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('paid', isPaid);
        localStorage.setItem('id', id);

        router.push({ name: 'Vip' });
      } else {
        errMsg.value = 'Invalid email or password';
      }
    } catch (error) {
      errMsg.value = 'Login failed. Please check your email and password.';
    }
  } else {
    errMsg.value = 'Please enter your email and password.';
    alert(errMsg.value);
    reset();
  }
};

const forgot = () => {
  title.value = 'Reset your account'
  resetPage.value = !resetPage.value
}

const create = () => {
  router.push({ name: 'Signin' })
}

const resetAuth = async () => {
  if (email.value !== '' && password.value !== '') {
    try {
      const response = await axios.put('https://predictions-reg9.onrender.com/auth/reset', {
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
    const response = await axios.get('https://predictions-reg9.onrender.com/auth/auth/google');

    // Handle the response from the server
    if (response.data.redirectTo) {
      router.push({ path: response.data.redirectTo });
    } else {
      console.error('Invalid response from server');
    }
  } catch (error) {
    // Handle the error
    console.error(error);
  }
};

</script>

<style>
@import '../style/auth.css';
</style>

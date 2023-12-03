<template>
  <div class="verify-container">
    <div class="verify-inn">
      <VerifyIcon class="verify-icon" v-if="isVerified" />
      <NotVerifyIcon class="verify-icon" v-else />
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import VerifyIcon from '../icons/VerifyIcon.vue'
import NotVerifyIcon from '../icons/NotVerifyIcon.vue'
import { useRouter, useRoute } from 'vue-router'
import { useToast } from 'vue-toastification';

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST
const token = ref(route.params.token)
const router = useRouter()
const route = useRoute()
const toast = useToast();
const message = ref('')
const isVerified = ref(false)

const verifyAccount = async () => {
  try {
    const response = await axios.post(`${SERVER_HOST}/verify/${token.value}`, {})
    message.value = 'Account Verified'
    isVerified.value = true
    toast.success(message.value);
    setTimeout(() => router.push({ name: 'Login' }), 2000)
  } catch (error) {
    handleVerificationError(error)
  }
}

const handleVerificationError = (error) => {
  message.value = 'Account not verified'
  toast.error(message.value);
  setTimeout(() => router.push({ name: 'Login' }), 2000)
}

onMounted(verifyAccount)
</script>

<style>
@import '../style/auth.css';
</style>

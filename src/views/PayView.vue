<template>
  <div class="payment-layout">
    <h1>Available Payment Methods</h1>
    <div class="Available-payments">
      <div class="payment-img-card" :class="{ selected: selectedMethod === i.name }" v-for="i in imageData" :key="i.id" @click="payWith(i.name)">
        <img :src="i.img" :alt="i.name" class="payment-image" />
      </div>
    </div>
    <div v-if="selectedMethod === 'wise'">
      <button type="submit"  @click="wisePay" class="btn-pay">Subscribe Now</button>
    </div>
    <div v-if="selectedMethod === 'paypal'" class="paypal">
      <form @submit.prevent="loadPaypalScript" class="pay-controller">
        <div class="pay-input-container">
          <input
            type="email"
            id="paypalEmail"
            placeholder="paypal email"
            class="pay-input"
            v-model="email"
            required
          />
        </div>
        <div class='btn-wp' id="paypal-button-container-P-7SG973201B4196641MVAZWBA">
          <button type="submit" class="btn-pay">Subscribe Now</button>
        </div>
      </form>
    </div>
    <div v-if="selectedMethod === 'paxful'">
      <button @click="initiatePaxfulPayment" class="btn-pay">Subscribe with Paxful</button>
    </div>
    <div v-if="selectedMethod === 'square'">
      <div id="payment-form">
        <div id="payment-status-container"></div>
        <div id="card-container"></div>
        <button id="card-button" type="button" class="btn-pay" @click="initiateSquarePayment">Subscribe Now</button>
      </div>
    </div>
    <div class="mpesa-container" v-if="selectedMethod === 'mpesa'">
      <form @submit.prevent="pay" class="pay-controller">
        <div class="pay-input-container">
          <input
            type="text"
            id="phoneNumber"
            placeholder="07xxxxxxx"
            class="pay-input"
            v-model="phoneNumber"
            required
          />
        </div>
        <div class="btn-wp">
          <button type="submit" class="btn-pay">Subscribe Now</button>
        </div>
      </form>
    </div>
    <div v-if="selectedMethod === 'payoneer'">
      <div ref="paymentNetworks" class="payment-networks-container"></div>
      <div ref="submitBtnContainer" class="submit-buttons-container">
        <button ref="submitBtn" type="button" class="btn-pay">Subscribe Now</button>
      </div>
    </div>
    <div v-if="selectedMethod === 'binance'">
      <button  type="button" class="btn-pay">Subscribe Now</button>
    </div>
    <div v-if="selectedMethod === 'coinbase'">
      <button  type="button"  @click="coinbasePay" class="btn-pay">Subscribe Now</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import wise from '../assets/wise.png'
import mpesa from '../assets/mpesa.png'
import paxful from '../assets/paxful.png'
import paypal from '../assets/paypal.png'
import coinbase from '../assets/coinbase.png'
import square from '../assets/square.png'
import binance from '../assets/binance.png'
import payoneer from '../assets/payoneer.png'
import { useToast } from 'vue-toastification';

const toast = useToast();
const imageData = ref([
  { id: 1, name: 'mpesa', img: mpesa },
  { id: 2, name: 'wise', img: wise },
  { id: 3, name: 'paxful', img: paxful },
  { id: 4, name: 'paypal', img: paypal },
  { id: 5, name: 'coinbase', img: coinbase },
  { id: 6, name: 'square', img: square },
  { id: 7, name: 'binance', img: binance },
  { id: 8, name: 'payoneer', img: payoneer }
])

const selectedMethod = ref(null)
const paymentData = {
  wise: ref(null),
  paxful: ref(null),
  square: ref(null),
  paypal: ref(null),
  binance: ref(null),
  coinbase: ref(null),
  payoneer: ref(null),
  mpesa: ref(null)
}

const email = ref('')
const phoneNumber = ref('')

const payWith = (name) => {
  selectedMethod.value = name
  fetchData(name)
}

const fetchData = async (method) => {
  if (paymentData[method]) {
    paymentData[method].value = `${method} data will be fetched here`
  }
}

const wisePay = () => {
  toast.error('payment failed');
}
const loadScript = (src) => {
  const script = document.createElement('script')
  script.src = src
  script.async = true
  document.head.appendChild(script)
}

const loadSquareScript = () => loadScript('https://sandbox.web.squarecdn.com/v1/square.js')
const loadPaypalScript = () => loadScript('https://www.paypal.com/sdk/js?client-id=sb&vault=true&intent=subscription')

const initiatePaxfulPayment = () => {
  // toast.error('payment failed');

}

const coinbasePay = () => {
  toast.success('redirected successfully');
  window.open('https://commerce.coinbase.com/checkout/e3707e6f-689f-4309-b5db-5bf9b5f6f5de', '_blank')
}

const initiateSquarePayment = async () => {
  // toast.error('payment failed');

}

onMounted(() => {
  if (selectedMethod.value) {
    fetchData(selectedMethod.value)
  }

  loadSquareScript()
  loadPaypalScript()
})

</script>

<style>
@import '../style/Pay.css';
</style>

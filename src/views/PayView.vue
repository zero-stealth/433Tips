<template>
  <div class="payment-layout">
    <h1>Choose your country to get payment method</h1>
    <p><span>VIP subscription </span> is valid for 30 days with no extra charges</p>
    <select class="pay-input" v-model="selectedCountry">
      <option disabled value="">Select your country</option>
      <option v-for="country in countriesData" :key="country.code" :value="country.code">
        {{ country.name }}
      </option>
    </select>
    <div
      class="pay-controller"
      v-if="selectedCountry === 'TZ' || selectedCountry === 'UG' || selectedCountry === 'KE'"
    >
      <img :src="mpesa" alt="mpesa logo" class="payment-image" />
      <div class="btn-wp">
        <button type="submit" @click="payMpesa" class="btn-pay">Subscribe Now</button>
      </div>
    </div>
    <div
      class="pay-controller"
      v-if="
        !['KE', 'NG', 'CM', 'GH', 'ZA', 'TZ', 'UG', 'ZM', 'RW', 'MW'].includes(selectedCountry) &&
        selectedCountry !== ''
      "
    >
      <img :src="coinbase" alt="coinbase logo" class="payment-image" />
      <button type="button" @click="coinbasePay" class="btn-pay">Subscribe Now</button>
    </div>
    <div
      class="pay-controller"
      v-if="
        !['KE', 'NG', 'CM', 'GH', 'ZA', 'TZ', 'UG', 'ZM', 'RW', 'MW'].includes(selectedCountry) &&
        selectedCountry !== ''
      "
    >
      <img :src="paystack" alt="paystack logo" class="payment-image" />
      <button type="button" @click="paystackPay" class="btn-pay">Subscribe Now</button>
    </div>
    <div
      class="pay-controller"
      v-if="
        ['NG', 'CM', 'GH', 'ZA', 'ZM', 'RW', 'MW'].includes(selectedCountry) &&
        selectedCountry !== ''
      "
    >
      <img :src="paystack" alt="paystack logo" class="payment-image" />
      <button type="button" @click="paystackPay" class="btn-pay">Subscribe Now</button>
    </div>
    <div
      class="pay-controller"
      v-if="selectedCountry === 'TZ' || selectedCountry === 'UG' || selectedCountry === 'KE'"
    >
      <img :src="airtel" alt="paystack logo" class="payment-image" />
      <div class="pay-input-container">
        <input
          type="text"
          placeholder="7XXXXXXXX"
          class="pay-input"
          v-model="phoneNumber"
          required
        />
      </div>
      <button type="button" @click="payAirtel" class="btn-pay">Subscribe Now</button>
    </div>
    <div
      class="pay-controller"
      id="paypal-button-container"
      v-if="
        !['KE', 'NG', 'CM', 'GH', 'ZA', 'TZ', 'UG', 'ZM', 'RW', 'MW'].includes(selectedCountry) &&
        selectedCountry !== ''
      "
    >
      <img :src="paypalImg" alt="paypal logo" class="payment-image" />
      <button type="button" @click="payPaypal" class="btn-pay">Subscribe Now</button>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, watchEffect } from 'vue'
// import wise from '../assets/wise.png'
import mpesa from '../assets/mpesa.png'
// import paxful from '../assets/paxful.png'
import paypalImg from '../assets/paypal.png'
import airtel from '../assets/airtel.png'
// import square from '../assets/square.png'
// import binance from '../assets/binance.png'
import paystack from '../assets/paystack.png'
// import payoneer from '../assets/payoneer.png'
import { useToast } from 'vue-toastification'
import coinbase from '../assets/coinbase.png'
import countriesData from '../components/countries.json'

const reveal = ref('')
const toast = useToast()
const phoneNumber = ref('')
const selectedCountry = ref('')
const paymentResult = ref(null)
const AIRTEL_URL = import.meta.env.VITE_AIRTEL_URL
const AIRTEL_PIN = import.meta.env.VITE_AIRTEL_PIN
const AIRTEL_AUTH = import.meta.env.VITE_AIRTEL_AUTH

watchEffect(() => {
  const countryMappings = new Map([
    ['KE', 'Kenya'],
    ['NG', 'Nigeria'],
    ['CM', 'Cameroon'],
    ['GH', 'Ghana'],
    ['ZA', 'South Africa'],
    ['TZ', 'Tanzania'],
    ['UG', 'Uganda'],
    ['ZM', 'Zambia'],
    ['RW', 'Rwanda'],
    ['MW', 'Malawi'],
    ['OT', 'Others']
  ])

  const selectedCountryCode = selectedCountry.value
  const countryName = countryMappings.get(selectedCountryCode)
  reveal.value = countryName
})

const payMpesa = () => {
  toast.success('redirected successfully')
  window.open('https://paystack.com/pay/82o4airsxo', '_blank')
}

const payAirtel = async () => {
  const inputBody = {
    subscriber: {
      msisdn: phoneNumber.value
    },
    transaction: {
      amount: '2000',
      id: '12968801260'
    },
    additional_info: [
      {
        key: 'transactionId',
        value: '12968801260'
      }
    ],
    reference: 'vip subscription',
    pin: AIRTEL_PIN
  }

  const headers = {
    'Content-Type': 'application/json',
    Accept: '*/*',
    'X-Country': 'UG',
    'X-Currency': 'UGX',
    Authorization: `Bearer ${AIRTEL_AUTH}`
  }

  try {
    const response = await axios.post(`${AIRTEL_URL}`, inputBody, { headers })
    console.log(response.data)
  } catch (error) {
    console.error('Error:', error)
  }
}

const coinbasePay = () => {
  toast.success('redirected successfully')
  window.open(
    'https://commerce.coinbase.com/checkout/e3707e6f-689f-4309-b5db-5bf9b5f6f5de',
    '_blank'
  )
}

const paystackPay = () => {
  toast.success('redirected successfully')
  window.open('https://paystack.com/pay/82o4airsxo', '_blank')
}

const payPaypal = async () => {
  paypal
    .Buttons({
      createOrder: (data, actions) => {
        // Create an order with your purchase details
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: '43.00'
              }
            }
          ]
        })
      },
      onApprove: (data, actions) => {
        // Capture the payment when the user approves
        return actions.order.capture().then((details) => {
          paymentResult.value = details
          console.log('Transaction completed:', details)
          toast.success('Payment Successful')
        })
      }
    })
    .render('#paypal-button-container')
}
</script>

<style>
@import '../style/Pay.css';
</style>

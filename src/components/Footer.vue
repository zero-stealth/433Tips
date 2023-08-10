
<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import emailIcon from '../icons/email.vue'
import tiktokIcon from '../icons/tiktokIcon.vue'
import youtubeIcon from '../icons/youtubeIcon.vue'
import twitterIcon from '../icons/twitterIcon.vue'
import whatsappIcon from '../icons/whatsapp.vue'
import instagramIcon from '../icons/instagram.vue'
import facebookIcon from '../icons/facebook.vue'
import telegramIcon from '../icons/telegram.vue'
import background from '../assets/background.png'
import background1 from '../assets/background.gif'

const booknow = ref('')
const errMessage = ref('')
const router = useRouter()
const phoneNumber = ref('+254703147237')


const Login = () => {
  router.push({ name: 'AdminLogin' });
};

const heroSectionStyle1 = {
  backgroundImage: `url(${background1})`
}

const openWhatsapp = () => {
  window.open(
    'https://wa.me/+254703147237?text=Hi sporty predict, I want to buy VIP subcription',
    '_blank'
  )
}


const openIos = () => {
  window.open('https://itunes.apple.com/app/idYOUR_APP_ID', '_blank')
}

const openTelegram = () => {
  window.open('https://t.me/sportypredict_tips', '_blank')
}

const openAndroid = () => {
  window.open('https://play.google.com/store/apps/details?id=YOUR_PACKAGE_NAME', '_blank')
}

const openFacebook = () => {
  window.open('https://www.facebook.com/profile.php?id=100093225097104&mibextid=LQQJ4d', '_blank')
}

const openTwitter = () => {
  window.open('https://twitter.com/sportypredict?s=21&t=ordgrMn8HjrBLUy3PdpsBA', '_blank')
}

const openInstagram = () => {
  window.open('https://instagram.com/sportypredict_?igshid=MTIzZWMxMTBkOA==', '_blank')
}

const openTiktok = () => {
  window.open('https://www.tiktok.com/@sportypredict?_t=8dxjShAnRI5&_r=1', '_blank')
}

const openYoutube = () => {
  window.open('https://www.youtube.com/@Sportypredict', '_blank')
}

const book = () => {
  if (booknow.value !== '') {
    window.open(`https://wa.me/${phoneNumber.value}?text=${booknow.value}`, '_blank')
  } else {
    errMessage.value = 'Write something'
  }

  reset()
}

const reset = () => {
  booknow.value = ''
}
</script>


<template>
  <div class="contact-so-main">
    <div class="foot-main-c">
      <div class="footer-x">
       <span>Our social media links</span> 
        <div class="book-social">
            <facebookIcon class="bk-icon" @click="openFacebook" />
            <twitterIcon class="bk-icon" @click="openTwitter" />
            <telegramIcon class="bk-icon" @click="openTelegram" />
            <instagramIcon class="bk-icon" @click="openInstagram" />
            <tiktokIcon class="bk-icon" @click="openTiktok" />
            <youtubeIcon class="bk-icon" @click="openYoutube" />
          </div>
      </div>
    <div class="contact-so" >
    <img :src="background" alt="football" class="contact-dm">
    </div>
    </div>
    <div class="contact-contain" :style="heroSectionStyle1">
      <div class="contact-wrapper">
        <div class="contact-d1">
          <h1>Contact information</h1>
          <p>For queries or help, <span @click="Login()">please</span> feel<br> free to contact us on:</p>
          <div class="d1-contact">
            <div class="d1-icon" @click="openWhatsapp">
              <whatsappIcon class="icon-d1" />
              <span>+254703147237</span>
            </div>
            <div class="d1-icon">
              <emailIcon class="icon-d1" />
              <span>contact@433tip.com</span>
            </div>
          </div>
        </div>
          <div class="contact-d2">
            <div>
              <h1>Quick links</h1>
            </div>
            <div class="d2-con">
              <RouterLink :to="{ name: 'Home' }" class="nav-link">Home</RouterLink>
              <RouterLink :to="{ name: 'Jackpot' }" class="nav-link">Jackpot</RouterLink>
              <RouterLink :to="{ name: 'FreeTip' }" class="nav-link">Free Tip</RouterLink>
              <RouterLink :to="{ name: 'Sport' }" class="nav-link">Other sport</RouterLink>
            </div>
          </div>
          <div class="contact-d2">
            <div>
              <h1>Information</h1>
            </div>
            <div class="d2-con">
              <RouterLink :to="{ name: 'Disclaimer' }" class="nav-link">Disclaimer</RouterLink>
              <RouterLink :to="{ name: 'Policy' }" class="nav-link">Policy</RouterLink>
              <RouterLink :to="{ name: 'Refund' }" class="nav-link">Refund policy</RouterLink>
              <RouterLink :to="{ name: 'Terms' }" class="nav-link">Terms & Condition</RouterLink>
            </div>
        </div>
      </div>
      <span>© 2023 433Tips. All rights reserved</span>
    </div>
  </div>
</template>
<style>
@import '../style/footer.css';
</style>

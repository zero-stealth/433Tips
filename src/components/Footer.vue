
<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import tiktokIcon from '../icons/tiktokIcon.vue'
import youtubeIcon from '../icons/youtubeIcon.vue'
import twitterIcon from '../icons/twitterIcon.vue'
import whatsappIcon from '../icons/whatsapp.vue'
import instagramIcon from '../icons/instagram.vue'
import facebookIcon from '../icons/facebook.vue'
import telegramIcon from '../icons/telegram.vue'
import ThreadIcon from '../icons/ThreadIcon.vue'
import background from '../assets/background.png'
import background1 from '../assets/background.gif'
import emailIcon from '../icons/email.vue'

const router = useRouter()
const phoneNumber = ref('+254115734732')


const Login = () => {
  router.push({ name: 'AdminLogin' });
};

const heroSectionStyle1 = {
  backgroundImage: `url(${background1})`
}

const openWhatsapp = () => {
  window.open(
    `https://wa.me/${phoneNumber.value}?text=Hi sporty predict, I want to buy VIP subcription`,
    '_blank'
  )
}


const openIos = () => {
  window.open('https://itunes.apple.com/app/idYOUR_APP_ID', '_blank')
}

const openTelegram = () => {
  window.open('https://t.me/@four_three_three_tips', '_blank')
}

const openAndroid = () => {
  window.open('https://play.google.com/store/apps/details?id=YOUR_PACKAGE_NAME', '_blank')
}

const openFacebook = () => {
  window.open('https://www.facebook.com/profile.php?id=61550333845293&mibextid=9R9pXO', '_blank')
}

const openThread = () => {
  window.open('https://www.threads.net/@433__tips', '_blank')
}


const openTwitter = () => {
  window.open('https://twitter.com/433__tips?t=0gSFRZkJ3AM0DAfj4rglDw&s=09', '_blank')
}

const openInstagram = () => {
  window.open('https://instagram.com/433__tips?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D', '_blank')
}

const openTiktok = () => {
  window.open('https://tiktok.com/@433__tips', '_blank')
}

const openYoutube = () => {
  window.open(' https://www.youtube.com/@433__Tips', '_blank')
}

const WhatsappChannel = () => {
  window.open(' https://whatsapp.com/channel/0029VaIfGfUCRs1k81P0VR1J', '_blank')
}

</script>


<template>
  <div class="contact-so-main">
    <div class="foot-main-c">
      <div class="footer-x">
       <span>Our social media links</span> 
        <div class="book-social">
            <ThreadIcon class="bk-icon" @click="openThread" />
            <facebookIcon class="bk-icon" @click="openFacebook" />
            <twitterIcon class="bk-icon" @click="openTwitter" />
            <telegramIcon class="bk-icon" @click="openTelegram" />
            <instagramIcon class="bk-icon" @click="openInstagram" />
            <tiktokIcon class="bk-icon" @click="openTiktok" />
            <youtubeIcon class="bk-icon" @click="openYoutube" />
            <whatsappIcon class="bk-icon" @click="WhatsappChannel" />
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
              <span>{{ phoneNumber }}</span>
            </div>
            <div class="d1-icon">
              <emailIcon class="icon-d1" />
              <span>support@433tips.com</span>
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
              <a rel="me" style="display: none;"    href="https://mastodon.social/@433tips">Mastodon</a>
              <RouterLink :to="{ name: 'Disclaimer' }" class="nav-link">Disclaimer</RouterLink>
              <RouterLink :to="{ name: 'FAQ' }" class="nav-link">FAQ</RouterLink>
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

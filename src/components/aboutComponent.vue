<template>
  <div class="abt-info-p">
    <div class="abt-p-in">
      <h1>Welcome to 433Tips - Where Sports and Fortune Collide</h1>
      <h2>Discover 433Tips: Elevate Your Sports Betting Experience</h2>
      <p>
        Are you tired of guesswork when it comes to sports betting? At 433Tips, we're here to
        revolutionize your betting journey. Our team of expert enthusiasts is dedicated to providing
        you with accurate predictions for thrilling matches. Join us in the winner's circle and
        celebrate your triumphs. With 433Tips, you can shape the future of your betting experience.
        It's time to tip the scales in your favor—join now and let the winning begin. Cheers to
        sports, prosperity, and adrenaline-fueled journeys!
      </p>
    </div>
    <div class="abt-p-in">
      <h1>433Tips - Your Game-Changing Destination for Winning!</h1>
      <p>
        Say goodbye to unreliable predictions and losing streaks. Welcome to 433Tips, your ultimate
        source for sports predictions. Our tipsters combine data analytics, expert insights, and
        intuition to make you a betting champion. We cover leagues worldwide, offering precise tips
        that even fortune tellers envy. Imagine turning every game into a win, backed by 433Tips'
        reality. Let's kick off your winning spree together! Our mission is to inject fun into
        betting while helping you invest in your sports dreams. With 433Tips, you lead rather than
        watch, and you captain your betting destiny. Ready to level up? Join the 433Tips family
        today! Unleash data-driven fortune, claim victory, and start your journey to betting glory.
        Get pumped, score big, and let's make history at 433Tips. Game on!
      </p>
    </div>
    <div class="abt-p-in">
      <h1>ELEVATE YOUR GAME WITH 433TIPS: YOUR SOURCE FOR WINNING SPORTS PREDICTIONS</h1>
      <p>
        Unlock the power of precise predictions. With 433Tips, you'll access free tips, jackpot predictions, and VIP insights that can elevate your game and lead you to daily wins. We're your gateway to excellence in football and sports predictions. Join us to experience the thrill of victory, one game at a time.
      </p>
    </div>
    <div class="abt-p-in">
      <h1>Step into the Winning Wonderland of Football Betting with 433Tips!</h1>
      <p>
        Dive into the ultimate betting extravaganza with 433Tips! Tired of unreliable predictions?
        Our tipsters are masters of stats, game dynamics, and team strategies. 433Tips' unbeatable
        prowess lies in data-driven insights and wizardry. Imagine your bets hitting the mark while
        others falter. We replace guesswork with calculated genius, making football betting a sure
        shot. Our predictions outsmart even AI goalkeepers, like having X-ray vision for betting.
        Ready to elevate your betting IQ? 433Tips turns you into a pro with terms like "expected
        goals" and "in-play analysis." We guarantee a unique sports adventure, armed with insights
        rivaling Pep Guardiola's tactics. Enjoy witty banter and laugh-out-loud moments in the realm
        of football betting. Welcome to the future of betting! Transform from a spectator to a
        sports sage with 433Tips. Ready to be a betting superhero? Join our league of winners,
        redefine football betting, and seize your ticket to glory with a click!
      </p>
    </div>
    <div class="abt-p-in">
      <h1>Join our Winning League of VIP Tips</h1>
      <p>
        Tired of mediocre predictions? Fear not! Our tipsters turn stats into pure betting gold.
        Wondering about 433Tips’ VIP Tips? Brace for sorcery with advanced algorithms and futuristic
        models! Visit our VIP section for amazing package deals. Ready to elevate your betting IQ?
        433Tips’ VIP Tips have you flaunting terms like “Expected Goals (xG)” effortlessly.
      </p>
      <p>
        But there's more! We make betting thrilling, not boring. Get ready for witty banter and
        laughs! Gear up to unlock VIP betting mastery. Our VIP Tips aren't just predictions; they're
        crown jewels of sports analysis! Let's rewrite the playbook together, where each tip is
        treasure and every wager a triumph. Ready for the spree? Embrace unmatched victory with
        433Tips' VIP Tips! Get your VIP ticket now and join the winners' circle.
      </p>
    </div>
    <div class="abt-p-in">
      <h1>Why Choose 433Tips as Your No.1 Tipsters</h1>
      <p>
        Looking for the ultimate betting ride? Buckle up because 433Tips is about to take you on a
        winning extravaganza! Tired of clueless tipsters? Our experts are like Haaland, Messi,
        Mbappe, and Ronaldo of predictions, blending data analytics and pure intuition. But what
        makes 433Tips top-notch? Get ready for our cutting-edge, wizardry predictions. Buckle up for
        the profit ride!
      </p>
    </div>
    <div class="abt-p-in p-in">
      <h1>Our Betting Links.</h1>
      <p>Explore our range of links for free football predictions for major bets</p>
      <ul>
        <li @click="goToB()">Free Tip</li>
        <li @click="goToV()">VIP Tips</li>
        <li @click="goToJ()">Jackpot Tip</li>
        <li @click="goToO()">Other sports</li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToB = () => {
  router.push({ name: 'FreeTip' })
}

const goToV = () => {
  router.push({ name: 'Vip' })
  
}

const goToJ = () => {
  router.push({ name: 'Jackpot' })
}

const goToO = () => {
  router.push({ name: 'Sport' })
}
</script>
<style>
@import '../style/info.css';
</style>

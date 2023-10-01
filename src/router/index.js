import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      meta: {
        title: '433tip - Free daily jackpot predictions and betting tips',
        description: '433tip provides accurate, free Jackpot betting predictions and other sports on a daily basis',
      },
    },
    {
      path: '/naruto',
      name: 'naruto',
      component: () => import('../views/PanelView.vue'),
      meta: {
        isAdmin: true
      }
    },
    {
      path: '/ax-login',
      name: 'AdminLogin',
      component: () => import('../views/AdminLoginView.vue'),
      meta: {
        title: "Login - Login to 433tips",
        description: "Login to enjoy our services ",
      },
    },
    {
      path: '/ax-signin',
      name: 'AdminSignin',
      component: () => import('../views/AdminSigninView.vue'),
      meta: {
        title: "Signin - Signin to 433tips",
        description: "Signin to get better services",
      },

    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        title: "Login - Login to 433tips",
        description: "Login to enjoy our services ",
      },
    },
    {
      path: '/signin',
      name: 'Signin',
      component: () => import('../views/SignInView.vue'),
      meta: {
        title: "Signin - Signin to 433tips",
        description: "Signin to get better services",
      },
    },
    {
      path: '/vip',
      name: 'Vip',
      component: () => import('../views/VipView.vue'),
      meta: {
        title: "Vip - Get 99% accurate jackpot and other sport predictions",
        description: "Get vip tips with 99% accuracy at affordable subcription ",
      },
      // meta: { auth: true }
    },
    {
      path: '/free-tip',
      name: 'FreeTip',
      component: () => import('../views/FreeView.vue'),
      meta: {
        title: "FreeTip - Enjoy our free football and other sport betting tips",
        description: "We offer freetips on football, tennis. basketball among other sports for you to enjoy freely",
      },
    },
    {
      path: '/game/:gameName',
      name: 'Game',
      component: () => import('../views/GameView.vue'),
      meta: {
        title: "game - Game results and more info",
        description: "Providing indepth game information for better analysis and informed betting descions",
      },
      props: true,
    },
    {
      path: '/jackpot',
      name: 'Jackpot',
      component: () => import('../views/JackpotView.vue'),
      meta: {
        title: "Jackpot - Jackpot prediction made easier",
        description: "Through indepth analysis we ensure you walk away with bonuses and also jackpot winning every week",
      },
    },
    {
      path: '/other-sports',
      name: 'Sport',
      component: () => import('../views/OtherSport.vue'),
      meta: {
        title: "Other Sports - Free betting tips for basketball, tennis, rugby, hockey among others",
        description: "Get all sports prediction from basketball, tennis. rugby, hockey etc all in one place with high odds of winning ",
      },
    },
    {
      path: '/terms&condition',
      name: 'Terms',
      component: () => import('../components/Terms&Condition.vue'),
      meta: {
        title: "Terms - Our Terms and conditions",
        description: "Read our guidelines to know how to better work with us",
      },
    },
    {
      path: '/refund-policy',
      name: 'Refund',
      component: () => import('../components/Refundpolicy.vue'),
      meta: {
        title: "Refund - Our refund policy",
        description: "Know how our refund policy works to better know how to deal with payment issues",
      },
    },
    {
      path: '/policy',
      name: 'Policy',
      component: () => import('../components/Policyinfo.vue'),
      meta: {
        title: "Policy - Our policy",
        description: "Know our policy to get better services and avoid being banned for misconduct",
      },
    },
    {
      path: '/disclaimer',
      name: 'Disclaimer',
      component: () => import('../components/Disclaimerinfo.vue'),
      meta: {
        title: "Disclaimer",
        description: "Disclaimer information to know about us",
      },
    },
    {
      path: '/how-to-pay',
      name: 'Pay',
      component: () => import('../views/PayView.vue'),
      meta: {
        title: "Pay - Vip subscriptions",
        description: "Know how to pay for vip based on your country",
      },
    },
    {
      path: '/sitemap.xml',
      name: 'Sitemap',
      component: () => import('../views/SitemapView.vue'),
      meta: {
        title: 'Sitemap',
        description: 'sitemap for search engines optimization'
      }
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue'),
      meta: {
        title: "404 - Page not found",
        description: "Sorry page doesn't exist on 433tip",
      },
    }
  ],
})



const currentUser = () => {
  const token = localStorage.getItem('token');
  return !!token; // Return true if token exists, false otherwise
}

const isAdmin = () => {
  const admin = localStorage.getItem('admin');
  return admin === 'true'; // Return true if admin is 'true', false otherwise
}


const titleGuard = (to, from, next) => {
  document.title = to.meta.title || '433tip - Free Jackpot betting tips and other sports Predictions';
  next();
};

const adminGuard = (to, from, next) => {
  if (to.matched.some((record) => record.meta.isAdmin)) {
    if (isAdmin()) {
      next();
    } else {
      next('/');
    }
  } else if (to.matched.some((record) => record.meta.auth)) {
    if (currentUser()) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
};

router.beforeEach(titleGuard);
router.beforeEach(adminGuard);

export default router;
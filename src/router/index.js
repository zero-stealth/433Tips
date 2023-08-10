import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
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
      path: '/login',
      name: 'AdminLogin',
      component: () => import('../views/AdminLoginView.vue')
    },
    {
      path: '/signin',
      name: 'AdminSignin',
      component: () => import('../views/AdminSigninView.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/signin',
      name: 'Signin',
      component: () => import('../views/SignInView.vue')
    },
    {
      path: '/vip',
      name: 'Vip',
      component: () => import('../views/VipView.vue'),
      // meta: { auth: true }
    },
    {
      path: '/free-tip',
      name: 'FreeTip',
      component: () => import('../views/FreeView.vue')
    },
    {
      path: '/jackpot',
      name: 'Jackpot',
      component: () => import('../views/JackpotView.vue')
    },
    {
      path: '/other-sports',
      name: 'Sport',
      component: () => import('../views/OtherSport.vue')
    },
    {
      path: '/terms&condition',
      name: 'Terms',
      component: () => import('../components/Terms&Condition.vue')
    },
    {
      path: '/refund-policy',
      name: 'Refund',
      component: () => import('../components/Refundpolicy.vue')
    },
    {
      path: '/policy',
      name: 'Policy',
      component: () => import('../components/Policyinfo.vue')
    },
    {
      path: '/disclaimer',
      name: 'Disclaimer',
      component: () => import('../components/Disclaimerinfo.vue')
    },  
    {
      path: '/how-to-pay',
      name: 'Pay',
      component: () => import('../views/PayView.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue')
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

router.beforeEach(async (to, from, next) => {
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
})


export default router
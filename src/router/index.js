// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Services from '../components/Services.vue';
import Staff from '../components/Staff.vue';
import Login from '../components/Login.vue';
import Admin from '../components/Admin.vue';
import { createPinia } from 'pinia';
import { store } from "../store/index";
import CryptoJS from 'crypto-js';

const pinia = createPinia();
const user = store(pinia);

user.userRole();
const secretKey = 'authenticated';

const routes = [
  { path: '/', component: Home },
  { path: '/services', component: Services },
  { path: '/staff', component: Staff },
  { path: '/login', component: Login },
  {
    path: '/admin',
    component: Admin,
    beforeEnter: (to, from, next) => {
      const auth = localStorage.getItem('authenticated') ?? false;

      if (auth) {
        // next();
        const encryptedValue = localStorage.getItem('authenticated');
        
        next('/login');
      } else {
        // User is not authenticated, redirect to the Login page
        next('/login');
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

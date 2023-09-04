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

const routes = [
  { path: '/', component: Home },
  { path: '/services', component: Services },
  { path: '/staff', component: Staff },
  { path: '/login', component: Login },
  {
    path: '/admin',
    component: Admin,
    beforeEnter: (to, from, next) => {
      const auth = localStorage.getItem('session');
      const role = localStorage.getItem('role');

      if (!auth || !role) {
        next('/login');
        return false;
      }

      const bytes = CryptoJS.AES.decrypt(auth, 'session');
      const decryptedSessionValue = bytes.toString(CryptoJS.enc.Utf8);
      const roleBytes = CryptoJS.AES.decrypt(role, 'role');
      const decryptedRoleValue = roleBytes.toString(CryptoJS.enc.Utf8);
    
      if (decryptedSessionValue == 'true') {
        if(decryptedRoleValue == 'admin' || decryptedRoleValue == 'staff'){
          next();
        }else{
          next('/');
        }
      } else {
        // User is not authenticated, redirect to the Login page
        next('/login');
      }
    },
  },
  {
    // Catch-all route for non-existent routes
    path: '/:catchAll(.*)',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

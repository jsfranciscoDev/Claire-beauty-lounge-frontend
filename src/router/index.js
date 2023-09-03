// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Services from '../components/Services.vue';
import Staff from '../components/Staff.vue';
import Login from '../components/Login.vue';
import Admin from '../components/Admin.vue';

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
      // Check if the user is authenticated
      if (auth) {
        // User is authenticated, allow access to the Admin route
        next();
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

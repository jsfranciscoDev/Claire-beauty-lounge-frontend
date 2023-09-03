// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Services from '../components/Services.vue';
import Staff from '../components/Staff.vue';
// import About from '../components/About.vue';
// import Contact from '../components/Contact.vue';
// import Admin from '../components/Admin.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/services', component: Services },
  { path: '/staff', component: Staff },
//   { path: '/contact', component: Contact },
//   { path: '/admin', component: Admin },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});



export default router;

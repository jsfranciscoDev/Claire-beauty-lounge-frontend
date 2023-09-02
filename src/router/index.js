// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Services from '../components/Services.vue';
// import About from '../components/About.vue';
// import Contact from '../components/Contact.vue';
// import Admin from '../components/Admin.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/services', component: Services },
//   { path: '/about', component: About },
//   { path: '/contact', component: Contact },
//   { path: '/admin', component: Admin },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});



export default router;

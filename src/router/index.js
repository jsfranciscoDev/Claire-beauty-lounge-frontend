// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import ManageProfile from '../components/UsersManageProfile.vue'
import Services from '../components/Services.vue';
import Staff from '../components/Staff.vue';
import Login from '../components/Login.vue';
import Admin from '../components/admin/Admin.vue';
import AdminStaff from '../components/admin/staff.vue';
import ManageAccount from '../components/admin/ManageAccount.vue';
import Dashboard from '../components/admin/Dashboard.vue';
import DailyTimeRecord from '../components/admin/DailyTimeRecord.vue';
// import AdminServices from '../components/admin/Services.vue';
import AdminServices from '../components/admin/Servicestabs.vue';
import AdminInventory from '../components/admin/Inventory.vue';
import Booking from '../components/Book.vue';
import Appointments from '../components/admin/Appointment.vue';
import Notifications from '../components/admin/Notifications.vue';
import ForgotPassword from '../components/ForgotPassword.vue';
import Reviews from '../components/Reviews.vue';
import SendReviews from '../components/SendReviews.vue';
import SupportCustomer from '../components/admin/SupportCustomer.vue';
import TermsandConditions from '../components/TermsandConditions.vue';
import PrivacyPolicy from '../components/PrivacyPolicy.vue';
import Scheduler from '../components/scheduler.vue';
import { createPinia } from 'pinia';
import { store } from "../store/index";
import CryptoJS from 'crypto-js';

const pinia = createPinia();
const user = store(pinia);



const routes = [
  { path: '/', component: Home },
  { path: '/services', component: Services },
  { path: '/staff', component: Staff },
  { path: '/login', component: Login },
  { path: '/forgot-password', component: ForgotPassword },
  { path: '/manage-profile', component: ManageProfile },
  { path: '/send-reviews', component: SendReviews },
  { path: '/reviews', component: Reviews },
  { path: '/terms-and-conditions', component: TermsandConditions },
  { path: '/privacy-policy', component: PrivacyPolicy },
  { path: '/schedule', component: Scheduler },
  { path: '/book', component: Booking,
    beforeEnter: (to, from, next) => {
      const auth = sessionStorage.getItem('session');
      const role = sessionStorage.getItem('role');
      
      if (!auth || !role) {
        next('/login');
        return false;
      }

      try {
        const bytes = CryptoJS.AES.decrypt(auth, 'session');
        const decryptedSessionValue = bytes.toString(CryptoJS.enc.Utf8);
        const roleBytes = CryptoJS.AES.decrypt(role, 'role');
        const decryptedRoleValue = roleBytes.toString(CryptoJS.enc.Utf8);

        if (decryptedSessionValue === 'true' && (decryptedRoleValue === 'user')) {
          next();
        } else {
          window.location = '/'
        }
      } catch (error) {
        console.error('Error decrypting data:', error);
        next('/login'); // Redirect to login page in case of decryption error
      }
    }, 
  },
  {
    path: '/admin',
    component: Admin,
    beforeEnter: (to, from, next) => {
      const auth = sessionStorage.getItem('session');
      const role = sessionStorage.getItem('role');
      
      if (!auth || !role) {
        next('/login');
        return false;
      }

      try {
        const bytes = CryptoJS.AES.decrypt(auth, 'session');
        const decryptedSessionValue = bytes.toString(CryptoJS.enc.Utf8);
        const roleBytes = CryptoJS.AES.decrypt(role, 'role');
        const decryptedRoleValue = roleBytes.toString(CryptoJS.enc.Utf8);

        if (decryptedSessionValue === 'true' && (decryptedRoleValue === 'admin' || decryptedRoleValue === 'staff')) {
          next();
        } else {
          window.location = '/'
        }
      } catch (error) {
        console.error('Error decrypting data:', error);
        next('/login'); // Redirect to login page in case of decryption error
      }
    },
    children: [
      {
        path: '/admin/staff',
        beforeEnter: (to, from, next) => {
          const role = sessionStorage.getItem('role');
          const roleBytes = CryptoJS.AES.decrypt(role, 'role');
          const decryptedRoleValue = roleBytes.toString(CryptoJS.enc.Utf8);
    
          if (decryptedRoleValue === 'admin') {
            next(); // Allow access for 'admin' role
          } else {
            window.location = '/admin'; // Redirect to home page for unauthorized users
          }
        },
        component: AdminStaff,
      },
      {
        path: '/admin/manage-account',
        component: ManageAccount,
      },
      {
        path: '/admin/dashboard',
        component: Dashboard,
      },
      {
        path: '/admin/daily-time-record',
        component: DailyTimeRecord,
      },
      {
        path: '/admin/services',
        component: AdminServices,
      },
      // {
      //   path: '/admin/inventory',
      //   component: AdminInventory,
      // },
      {
        path: '/admin/appointments',
        component: Appointments,
      },
      {
        path: '/admin/notifications',
        component: Notifications,
      },
      {
        path: '/admin/support',
        component: SupportCustomer,
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: Home,
  }
  
  
 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

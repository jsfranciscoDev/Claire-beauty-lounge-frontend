
<script setup>
import { store } from "../../store/index";
import CryptoJS from 'crypto-js';
import { reactive, ref, onMounted, onBeforeMount  } from "vue";
import axios from 'axios';
const baseURL = import.meta.env.VITE_APP_BASE_URL;

const user = store();
const mobile = ref();

const logoutUser = () => {
  user.logout();
}

const StaffAcessRole = ref(null);

const role = sessionStorage.getItem('role');
const roleBytes = CryptoJS.AES.decrypt(role, 'role');
const userRole = roleBytes.toString(CryptoJS.enc.Utf8);


const staff_role = sessionStorage.getItem('staff_role');
if(staff_role){
  const staffRoleBytes = CryptoJS.AES.decrypt(staff_role, 'staff_role');
  const StaffRole = staffRoleBytes.toString(CryptoJS.enc.Utf8);
  StaffAcessRole.value = StaffRole
}



</script>
<template>
      <div class=" sidebar" role="navigation">
        <div class="navbar-collapse">
        <nav class="cbp-spmenu cbp-spmenu-vertical cbp-spmenu-left" id="cbp-spmenu-s1">
          <div class="admin-logo">
            <router-link to="/" class="sidebar-link"><span  class="navbar-brand nav-link admin-logo">Claire Beauty Lounge</span></router-link>
          </div>
            
          <ul id="side-menu" v-if="userRole == 'admin'">
            <li>
                <img src="../../assets/images/sgvicons/calendar-black.svg"  class="admin-icon"/>
                <span><router-link to="/admin/dashboard" class="sidebar-link">Dashboard</router-link></span>
            </li>
            <li>
                <img src="../../assets/images/sgvicons/service-black.svg" class="admin-icon" />
                <span><router-link to="/admin/services" class="sidebar-link">Services</router-link></span>
            </li>
            <li>
                <img src="../../assets/images/sgvicons/appointment.svg" class="admin-icon" />
                <span><router-link to="/admin/appointments" class="sidebar-link">Appointments</router-link></span>
            </li>
            <li>
                <img src="../../assets/images/sgvicons/product.svg" class="admin-icon" />
                <span><router-link to="/admin/inventory" class="sidebar-link">Inventory</router-link></span>
            </li>
            <li>
                <img src="../../assets/images/sgvicons/notification.svg" class="admin-icon" />
                <span><router-link to="/admin/notifications" class="sidebar-link">Notifications</router-link></span>
            </li>
            <li>
                <img src="../../assets/images/sgvicons/clock.svg" class="admin-icon" />
                <span><router-link to="/admin/daily-time-record" class="sidebar-link">Daily Time Record</router-link></span>
            </li>
            <li>
                <img src="../../assets/images/sgvicons/employee.svg" class="admin-icon" />
                <span><router-link to="/admin/staff" class="sidebar-link">Staff</router-link></span>
            </li>
            <li>
                <img src="../../assets/images/sgvicons/support.svg" class="admin-icon" />
                <span><router-link to="/admin/support" class="sidebar-link">Customer Support</router-link></span>
            </li>
            <li>
                <img src="../../assets/images/sgvicons/manage.svg" class="admin-icon" />
               <span ><router-link to="/admin/manage-account" class="sidebar-link">Manage Account</router-link></span>
            </li>
         
            <li>
                <div @click="logoutUser"><img src="../../assets/images/sgvicons/logout.svg" class="admin-icon mr-1 ml-0"><router-link to="/" class="sidebar-link"> Logout</router-link></div>
            </li>
        
          </ul>

          <ul id="side-menu" v-if="userRole == 'staff'">
            <li>
                <img src="../../assets/images/sgvicons/calendar-black.svg"  class="admin-icon"/>
                <span><router-link to="/admin/dashboard" class="sidebar-link">Dashboard</router-link></span>
            </li>
            <li v-if="StaffAcessRole == 'System Administrator'">
                <img src="../../assets/images/sgvicons/service-black.svg" class="admin-icon" />
                <span><router-link to="/admin/services" class="sidebar-link">Services</router-link></span>
            </li>
            <li v-if="StaffAcessRole == 'System Administrator'">
                <img src="../../assets/images/sgvicons/appointment.svg" class="admin-icon" />
                <span><router-link to="/admin/appointments" class="sidebar-link">Appointments</router-link></span>
            </li>
            <li v-if="StaffAcessRole == 'System Administrator'">
                <img src="../../assets/images/sgvicons/product.svg" class="admin-icon" />
                <span><router-link to="/admin/inventory" class="sidebar-link">Inventory</router-link></span>
            </li>
            <li v-if="StaffAcessRole == 'System Administrator'">
                <img src="../../assets/images/sgvicons/notification.svg" class="admin-icon" />
                <span><router-link to="/admin/notifications" class="sidebar-link">Notifications</router-link></span>
            </li>
            <li>
                <img src="../../assets/images/sgvicons/clock.svg" class="admin-icon" />
                <span><router-link to="/admin/daily-time-record" class="sidebar-link">Daily Time Record</router-link></span>
            </li>
            <li v-if="StaffAcessRole == 'System Administrator'">
                <img src="../../assets/images/sgvicons/support.svg" class="admin-icon" />
                <span><router-link to="/admin/support" class="sidebar-link">Customer Support</router-link></span>
            </li>
            <li>
                <img src="../../assets/images/sgvicons/manage.svg" class="admin-icon" />
               <span ><router-link to="/admin/manage-account" class="sidebar-link">Manage Account</router-link></span>
            </li>
        
            <li>
                <div @click="logoutUser"><img src="../../assets/images/sgvicons/logout.svg" class="admin-icon mr-2 ml-0"><router-link to="/" class="sidebar-link">Logout</router-link></div>
            </li>
        
          </ul>
          <div class="clearfix"> </div>
          <!-- //sidebar-collapse -->
        </nav>
      </div>
    </div>


    <div class="mobile-header">
      <router-link to="/" class="navbar-brand nav-link">Claire Beauty Lounge</router-link>
      <img src="../../assets/images/sgvicons/hamburger.svg" @click="mobile = true">
    </div>

    <div class="navbar-mobile" v-if="mobile">
     
      <img src="../../assets/images/sgvicons/close-white.svg" @click="mobile = false">

      <ul id="side-menu" class="navbar-nav-mobile-dashboard" v-if="userRole == 'admin'">
            <li @click="mobile = false">
                <img src="../../assets/images/sgvicons/calendar-black.svg"  class="admin-icon"/>
                <span><router-link to="/admin/dashboard" class="sidebar-link">Dashboard</router-link></span>
            </li>
            <li @click="mobile = false">
                <img src="../../assets/images/sgvicons/service-black.svg" class="admin-icon" />
                <span><router-link to="/admin/services" class="sidebar-link">Services</router-link></span>
            </li>
            <li @click="mobile = false">
                <img src="../../assets/images/sgvicons/appointment.svg" class="admin-icon" />
                <span><router-link to="/admin/appointments" class="sidebar-link">Appointments</router-link></span>
            </li>
            <li @click="mobile = false">
                <img src="../../assets/images/sgvicons/product.svg" class="admin-icon" />
                <span><router-link to="/admin/inventory" class="sidebar-link">Inventory</router-link></span>
            </li>
            <li @click="mobile = false">
                <img src="../../assets/images/sgvicons/notification.svg" class="admin-icon" />
                <span><router-link to="/admin/notifications" class="sidebar-link">Notifications</router-link></span>
            </li>
            <li @click="mobile = false">
                <img src="../../assets/images/sgvicons/clock.svg" class="admin-icon" />
                <span><router-link to="/admin/daily-time-record" class="sidebar-link">Daily Time Record</router-link></span>
            </li>
            <li @click="mobile = false">
                <img src="../../assets/images/sgvicons/employee.svg" class="admin-icon" />
                <span><router-link to="/admin/staff" class="sidebar-link">Staff</router-link></span>
            </li>
            <li @click="mobile = false">
                <img src="../../assets/images/sgvicons/support.svg" class="admin-icon" />
                <span><router-link to="/admin/support" class="sidebar-link">Customer Support</router-link></span>
            </li>
            <li @click="mobile = false">
                <img src="../../assets/images/sgvicons/manage.svg" class="admin-icon" />
               <span ><router-link to="/admin/manage-account" class="sidebar-link">Manage Account</router-link></span>
            </li>
         
            <li @click="mobile = false">
                <div @click="logoutUser"><img src="../../assets/images/sgvicons/logout.svg" class="admin-icon mr-2 ml-0"><router-link to="/" class="sidebar-link">Logout</router-link></div>
            </li>
        
          </ul>

          <ul id="side-menu" class="navbar-nav-mobile-dashboard" v-if="userRole == 'staff'">
            <li @click="mobile = false">
                <img src="../../assets/images/sgvicons/calendar-black.svg"  class="admin-icon"/>
                <span><router-link to="/admin/dashboard" class="sidebar-link">Dashboard</router-link></span>
            </li>
            <li v-if="StaffAcessRole == 'System Administrator'" @click="mobile = false">
                <img src="../../assets/images/sgvicons/service-black.svg" class="admin-icon" />
                <span><router-link to="/admin/services" class="sidebar-link">Services</router-link></span>
            </li>
            <li v-if="StaffAcessRole == 'System Administrator'" @click="mobile = false">
                <img src="../../assets/images/sgvicons/appointment.svg" class="admin-icon" />
                <span><router-link to="/admin/appointments" class="sidebar-link">Appointments</router-link></span>
            </li>
            <li v-if="StaffAcessRole == 'System Administrator'" @click="mobile = false">
                <img src="../../assets/images/sgvicons/product.svg" class="admin-icon" />
                <span><router-link to="/admin/inventory" class="sidebar-link">Inventory</router-link></span>
            </li>
            <li v-if="StaffAcessRole == 'System Administrator'" @click="mobile = false">
                <img src="../../assets/images/sgvicons/notification.svg" class="admin-icon" />
                <span><router-link to="/admin/notifications" class="sidebar-link">Notifications</router-link></span>
            </li>
            <li @click="mobile = false">
                <img src="../../assets/images/sgvicons/clock.svg" class="admin-icon" />
                <span><router-link to="/admin/daily-time-record" class="sidebar-link">Daily Time Record</router-link></span>
            </li>
            <li v-if="StaffAcessRole == 'System Administrator'" @click="mobile = false">
                <img src="../../assets/images/sgvicons/support.svg" class="admin-icon" />
                <span><router-link to="/admin/support" class="sidebar-link">Customer Support</router-link></span>
            </li>
            <li @click="mobile = false">
                <img src="../../assets/images/sgvicons/manage.svg" class="admin-icon" />
               <span ><router-link to="/admin/manage-account" class="sidebar-link">Manage Account</router-link></span>
            </li>
        
            <li @click="mobile = false">
                <div @click="logoutUser"><img src="../../assets/images/sgvicons/logout.svg" class="admin-icon mr-2 ml-0"><router-link to="/" class="sidebar-link">Logout</router-link></div>
            </li>
        
          </ul>
        </div>
</template>

<style>
.admin-logo{
    color: rgb(0, 0, 0) !important;
    text-align: center;
    padding: 0px 0px 20px 0px;
    font-size: 1em;
}

.sidebar ul li i{
    font-size: 14px;
    color: black;
    
}
.sidebar ul li span{
    margin: 0px 10px;
    font-size: 12px !important;
    
}
.sidebar-link{
    font-family: 'poppins' !important;
    text-transform: uppercase;
}
.sidebar ul li span .sidebar-link{
    font-size: 16px !important;
}

.admin-icon {
    margin-bottom: 5px;
    margin-left: 2px;
    max-width: 22px;
}

</style>

<script setup>
import { store } from "../../store/index";
import CryptoJS from 'crypto-js';
import { reactive, ref, onMounted, onBeforeMount  } from "vue";

const user = store();

const logoutUser = () => {
  sessionStorage.clear();
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
                <i class="fa fa-window-maximize"><span><router-link to="/admin/dashboard" class="sidebar-link">Dashboard</router-link></span></i>
            </li>
            <li>
                <i class="fa fa-bed"><span><router-link to="/admin/services" class="sidebar-link">Services</router-link></span></i>
            </li>
            <li>
                <i class="fa fa-bed"><span><router-link to="/admin/appointments" class="sidebar-link">Appointments</router-link></span></i>
            </li>
            <li>
                <i class="fa fa-linode"><span><router-link to="/admin/inventory" class="sidebar-link">Inventory</router-link></span></i>
            </li>
            <li>
              <i class="fa fa-bell"><span><router-link to="/admin/notifications" class="sidebar-link">Notications</router-link></span></i>
            </li>
            <li>
                <i class="fa fa-clock"><span><router-link to="/admin/daily-time-record" class="sidebar-link">Daily Time Record</router-link></span></i>
            </li>
            <li>
               <i class="fa fa-users nav_icon" ><span><router-link to="/admin/staff" class="sidebar-link">Staff</router-link></span></i>
            </li>
            <li>
               <i class="fa fa-cog"><span ><router-link to="/admin/manage-account" class="sidebar-link">Manage Account</router-link></span></i>
            </li>
         
            <li>
               <i class="fa fa-sign-out"  @click="logoutUser"><span ><router-link to="/" class="sidebar-link">Logout</router-link></span></i>
            </li>
        
          </ul>

          <ul id="side-menu" v-if="userRole == 'staff'">
            <li>
                <i class="fa fa-window-maximize"><span><router-link to="/admin/dashboard" class="sidebar-link">Dashboard</router-link></span></i>
            </li>
            <li v-if="StaffAcessRole == 'System Administrator'">
                <i class="fa fa-bed"><span><router-link to="/admin/services" class="sidebar-link">Services</router-link></span></i>
            </li>
            <li v-if="StaffAcessRole == 'System Administrator'">
                <i class="fa fa-bed"><span><router-link to="/admin/appointments" class="sidebar-link">Appointments</router-link></span></i>
            </li>
            <li v-if="StaffAcessRole == 'System Administrator'">
                <i class="fa fa-linode"><span><router-link to="/admin/inventory" class="sidebar-link">Inventory</router-link></span></i>
            </li>
            <li v-if="StaffAcessRole == 'System Administrator'">
                <i class="fa fa-bell"><span><router-link to="/admin/notifications" class="sidebar-link">Notications</router-link></span></i>
            </li>
            <li>
                <i class="fa fa-clock"><span><router-link to="/admin/daily-time-record" class="sidebar-link">Daily Time Record</router-link></span></i>
            </li>
         
            <li>
               <i class="fa fa-cog"><span ><router-link to="/admin/manage-account" class="sidebar-link">Manage Account</router-link></span></i>
            </li>
        
            <li>
               <i class="fa fa-sign-out"  @click="logoutUser"><span ><router-link to="/" class="sidebar-link">Logout</router-link></span></i>
            </li>
        
          </ul>
          <div class="clearfix"> </div>
          <!-- //sidebar-collapse -->
        </nav>
      </div>
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

.sidebar ul li span .sidebar-link{
    font-size: 16px !important;
}

</style>
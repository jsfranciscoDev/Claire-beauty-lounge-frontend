
<script setup>
import { store } from "../../store/index";
import CryptoJS from 'crypto-js';
const user = store();

const logoutUser = () => {
  user.logout();
}

const role = localStorage.getItem('role');
const roleBytes = CryptoJS.AES.decrypt(role, 'role');
const userRole = roleBytes.toString(CryptoJS.enc.Utf8);
</script>
<template>
      <div class=" sidebar" role="navigation">
        <div class="navbar-collapse">
        <nav class="cbp-spmenu cbp-spmenu-vertical cbp-spmenu-left" id="cbp-spmenu-s1">
          <div class="admin-logo">
            <span  class="navbar-brand nav-link admin-logo">Claire Beauty Lounge</span>
          </div>
            
          <ul id="side-menu">
            <li>
                <i class="fa-solid fa-house"><span><router-link to="/admin/dashboard" class="sidebar-link">Dashboard</router-link></span></i>
            </li>
            <li>
               <i class="fa fa-users nav_icon" v-if="userRole == 'admin'"><span><router-link to="/admin/staff" class="sidebar-link">Staff</router-link></span></i>
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
<script setup>
import { store } from "../store/index";
import { onMounted, ref } from 'vue'; // Import the onMounted hook
import axios from 'axios';
const baseURL = import.meta.env.VITE_APP_BASE_URL;
import Swal from 'sweetalert2';

const user = store();
const role = ref();
const mobile = ref();

const logoutUser = () => {
 
  Swal.fire({
    title: 'Logout?',
    text: "Are you sure do you want to logout?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: `Yes!`
  }).then((result) => {
    if (result.isConfirmed) {
      user.logout();
    }
  })
}

onMounted(() => {
 user.userRole().then(response => {

 })
});
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
      <div class="container">
        <!-- <router-link to="/" class="navbar-brand nav-link">Claire Beauty Lounge</router-link> -->
        <router-link to="/" class="navbar-brand nav-link">Claire Beauty Lounge</router-link>
  
        <div class="collapse navbar-collapse" id="ftco-nav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item" :class="{ 'active': $route.path === '/' }">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item" :class="{ 'active': $route.path === '/staff' }">
              <router-link to="/staff" class="nav-link">Staff</router-link>
            </li>
            <li class="nav-item" :class="{ 'active': $route.path === '/book' }" v-if="user.role === 'user'">
              <router-link to="/book" class="nav-link">Book</router-link>
            </li>
            <li class="nav-item" :class="{ 'active': $route.path === '/services' }">
              <router-link to="/services" class="nav-link">Services</router-link>
            </li>
            <li class="nav-item" :class="{ 'active': $route.path === '/manage-profile' }" v-if="user.role === 'user'">
              <router-link to="/manage-profile" class="nav-link">Profile</router-link>
            </li>
            <li class="nav-item" :class="{ 'active': $route.path === '/reviews' }">
              <router-link to="/reviews" class="nav-link">Reviews</router-link>
            </li>
            <li class="nav-item" v-if="user.role === 'user'">
              <a class="nav-link" @click="logoutUser">Logout</a>
            </li>
            <li class="nav-item" :class="{ 'active': $route.path === '/admin' }" v-else-if="user.role == 'admin' || user.role == 'staff'">
              <router-link to="/admin/dashboard" class="nav-link">admin</router-link>
            </li>
            <li class="nav-item" :class="{ 'active': $route.path === '/admin' }" v-else>
              <router-link to="/admin" class="nav-link">Login</router-link>
            </li>
          
          
          </ul>
        </div>
      </div>
    </nav>

    <div class="mobile-header">
      <router-link to="/" class="navbar-brand nav-link">Claire Beauty Lounge</router-link>
      <img src="../assets/images/sgvicons/hamburger.svg" @click="mobile = true">
    </div>

    <div class="navbar-mobile" v-if="mobile">
     
      <img src="../assets/images/sgvicons/close-white.svg" @click="mobile = false">

          <ul class="navbar-nav-mobile ml-auto">
            <li class="nav-item" :class="{ 'active': $route.path === '/' }">
              <router-link to="/" class="nav-link"><span>Home</span></router-link>
            </li>
            <li class="nav-item" :class="{ 'active': $route.path === '/staff' }">
              <router-link to="/staff" class="nav-link"><span>Staff</span></router-link>
            </li>
            <li class="nav-item" :class="{ 'active': $route.path === '/book' }" v-if="user.role === 'user'">
              <router-link to="/book" class="nav-link"><span>Book</span></router-link>
            </li>
            <li class="nav-item" :class="{ 'active': $route.path === '/services' }">
              <router-link to="/services" class="nav-link"><span>Services</span></router-link>
            </li>
            <li class="nav-item" :class="{ 'active': $route.path === '/manage-profile' }" v-if="user.role === 'user'">
              <router-link to="/manage-profile" class="nav-link"><span>Profile</span></router-link>
            </li>
            <li class="nav-item" :class="{ 'active': $route.path === '/reviews' }">
              <router-link to="/reviews" class="nav-link"><span>Reviews</span></router-link>
            </li>
            <li class="nav-item" v-if="user.role === 'user'">
              <a class="nav-link" @click="logoutUser">Logout</a>
            </li>
            <li class="nav-item" :class="{ 'active': $route.path === '/admin' }" v-else-if="user.role == 'admin' || user.role == 'staff'">
              <router-link to="/admin/dashboard" class="nav-link"><span>admin</span></router-link>
            </li>
            <li class="nav-item" :class="{ 'active': $route.path === '/admin' }" v-else>
              <router-link to="/admin" class="nav-link"><span>Login</span></router-link>
            </li>
          </ul>
        </div>
  </template>
  
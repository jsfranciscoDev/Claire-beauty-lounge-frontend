<script setup>
import { store } from "../store/index";
import { onMounted } from 'vue'; // Import the onMounted hook

const user = store();

const logoutUser = () => {
  user.logout();
}

onMounted(() => {
 user.userRole()
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
  </template>
  
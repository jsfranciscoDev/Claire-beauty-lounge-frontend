<template>
    <nav class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
      <div class="container">
        <router-link to="/" class="navbar-brand nav-link">Claire Beauty Lounge</router-link>
  
        <div class="collapse navbar-collapse" id="ftco-nav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item" :class="{ 'active': $route.path === '/' }">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item" :class="{ 'active': $route.path === '/staff' }">
              <router-link to="/staff" class="nav-link">Staff</router-link>
            </li>
            <li class="nav-item" :class="{ 'active': $route.path === '/services' }">
              <router-link to="/services" class="nav-link">Services</router-link>
            </li>
            <li class="nav-item" :class="{ 'active': $route.path === '/admin' }">
              <router-link to="/admin" class="nav-link">Admin</router-link>
            </li>
            <!-- Add other navigation links here with similar logic -->
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
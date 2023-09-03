<script setup>
import navBar from '../src/components/nav.vue';
const baseURL = import.meta.env.VITE_APP_BASE_URL;
console.log(baseURL);
</script>

<template>
  <navBar></navBar>
  <router-view></router-view>
</template>

<style lang="scss">

@import './assets/style.scss';

</style>

<script setup>
  import { store } from "../../store/index";
  import headerNav from './header.vue';
  import sidebar from './sidebar.vue';

  const userData = store();

  const fetchData = () => {
      userData.userRole();
  }
</script>

<template>
  <div class="cbp-spmenu-push">
    <div class="main-content">
      <sidebar></sidebar>
      <headerNav/>

      <div class="main-content">
        <div id="page-wrapper">
          <div class="main-page">
           
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

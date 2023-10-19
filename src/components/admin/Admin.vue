<script setup>
  import { store } from "../../store/index";
  import sidebar from './sidebar.vue';
  import staff from './staff.vue';
  import { useRouter } from 'vue-router';
  import {  onBeforeMount } from "vue";

  const userData = store();
  const fetchData = () => {
      userData.userRole();
  }
  
  // router.push('/admin/dashboard');
onBeforeMount(() => {
  userData.userRole();
});
</script>

<template>
  <div class="cbp-spmenu-push">
    <div class="main-content">
      <sidebar></sidebar>

      <div class="main-content">
        <div id="page-wrapper">
          <div class="main-page">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

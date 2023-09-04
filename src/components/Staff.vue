<template>
    <navBar/>
    <h1>
        {{ staff.role }}
    </h1>
    <footerSection></footerSection>
  
</template>

<script setup>
import { store } from "../store/index";
const staff = store();

import { onMounted } from 'vue'; // Import the onMounted hook
import footerSection from '../components/footer.vue';
import navBar from '../components/nav.vue';

// Use onMounted to perform actions when the component is mounted
onMounted(() => {
  // Your code here
    staff.userRole()
});
</script>

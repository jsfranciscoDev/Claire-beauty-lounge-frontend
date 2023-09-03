<template>
   
    <navBar/>
    <footerSection></footerSection>
</template>

<script setup>
import { store } from "../store/index";
const staff = store();

import footerSection from '../components/footer.vue';
import navBar from '../components/nav.vue'
</script>
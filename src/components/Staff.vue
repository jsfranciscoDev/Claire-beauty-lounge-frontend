<template>
    <h1> staff</h1>

    <footerSection></footerSection>
</template>

<script setup>
import { useCounterStore } from "../store/index";
const counter = useCounterStore();

import footerSection from '../components/footer.vue';
</script>
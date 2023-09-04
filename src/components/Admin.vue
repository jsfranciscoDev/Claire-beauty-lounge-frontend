<script setup>
import { store } from "../store/index";
const userData = store();

const fetchData = () => {
    userData.userRole();
}
</script>

<template>
    <h1>admin panel</h1>
    <button @click="fetchData">asd</button>
</template>
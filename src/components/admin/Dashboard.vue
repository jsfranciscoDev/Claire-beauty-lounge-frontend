<script setup>
import moment from 'moment-timezone';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import CryptoJS from 'crypto-js';


import { store } from "../../store/index";
const userData = store();

const role = localStorage.getItem('role');
const roleBytes = CryptoJS.AES.decrypt(role, 'role');
const userRole = roleBytes.toString(CryptoJS.enc.Utf8);

const backendbaseURL = import.meta.env.VITE_APP_BASE_URL;

onMounted(() => {
  userData.fetchUser();
  userData.getDTR();
})

const currentTime = ref();
const currentDate = ref();


// Update the time every second
const intervalId = setInterval(() => {
  currentTime.value = moment().format('LTS');
  currentDate.value = moment().format('L');
}, 1000);

// Clean up when the component is unmounted
onBeforeUnmount(() => {
  clearInterval(intervalId);
});

const staffUserTimein = (action) => {
    userData.timeIn( userData.user_details.id, currentTime.value, currentDate.value, action)
}

</script>

<template>
    <div class="admin-component-header">
        <h2><i class="fa fa-window-maximize"></i> Daily Time Record</h2>
     
    </div>
    <div class="row">

        <div class="col-12 col-md-4 col-lg-4 time-clock">
            <div class="d-flex justify-content-center align-items-start">
                <div>
                    <div class="clock">
                        {{ currentTime }}
                    </div>
                  
                   <span class="clock-date">{{ currentDate }}</span>
                    <h5>{{ userData.user_details.name }}</h5>
                    <button class="time-button" @click="staffUserTimein('time_in')" v-if="userData.timeInButtonAction == 'time_in'">Time in</button>
                    <button class="time-button" style="background-color: red;" @click="staffUserTimein('time_out')"  v-if="userData.timeInButtonAction == 'time_out'">Time out</button>
                </div>
                <div align="center">
                    <center>
                        <img :src="backendbaseURL+userData.user_profile" class="img-fluid preview-image" />
                    </center>
                </div>
            </div>
        </div>
    </div>
</template>


<style>
.upload-icon{
    background-color: rgb(0, 0, 0);
    padding: 5px;
    border-radius: 5px;
}

.upload-icon i {
    font-size: 15px;
    color: azure;
}

.upload-icon i span{
    font-size: 14px;
    margin: 5px;
}

.preview-image{
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
}
.upload-image{
    display: flex;
    justify-items: center;
    align-items: center;
    flex-direction: column;
}
</style>
<script setup>
import moment from 'moment-timezone';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import Swal from 'sweetalert2';

import { store } from "../../store/index";
const userData = store();

const role = sessionStorage.getItem('role');
const roleBytes = CryptoJS.AES.decrypt(role, 'role');
const userRole = roleBytes.toString(CryptoJS.enc.Utf8);

const public_ip = import.meta.env.VITE_APP_IP_LOCATION;

const apiKey = import.meta.env.VITE_APP_LOCATION_API_KEY;
const backendbaseURL = import.meta.env.VITE_APP_BASE_URL;

// const currentTime = ref();
const currentDate = ref();


// // Update the time every second
// const intervalId = setInterval(() => {
//     const now = moment.tz('Asia/Manila'); // Set the timezone to Asia/Manila
//     currentTime.value = now.format('LTS');
//     currentDate.value = now.format('L');
// }, 1000);

const currentTime = ref(null);
let intervalId;

const fetchCurrentTime = async () => {
    const now = moment.tz('Asia/Manila');
    currentDate.value = now.format('L');
  try {
    const response = await axios.get('http://worldtimeapi.org/api/ip');
    const utcTime = response.data.utc_datetime;
    const localTime = moment.tz(utcTime, 'UTC').tz('Asia/Manila');
    currentTime.value = localTime.format('h:mm:ss A');
  } catch (error) {
    console.error('Error fetching current time:', error);
  }
};

// Clean up when the component is unmounted
// onBeforeUnmount(() => {
//   clearInterval(intervalId);
// });

const staffUserTimein = (action) => {
  
    let ip_address = axios.get(`https://ipgeolocation.abstractapi.com/v1/?api_key=${apiKey}`)
          .then(response => {
              console.log(response);
              if(response.data.ip_address == public_ip){
                userData.timeIn( userData.user_details.id, currentTime.value, currentDate.value, action)
              }else{
                Swal.fire({
                    title: `Invalid ${action}`,
                    text: "Your current location is unable to synchronize with the server's time according to the system administrator.",
                    icon: 'warning',
                });
              }
          })
          .catch(error => {
              console.log(error);
          });
}

onBeforeUnmount(() => {
    clearInterval(intervalId);
    userData.fetchUser();
});

onMounted(() => {
  userData.fetchUser();
  userData.getDTR();
  fetchCurrentTime();
  intervalId = setInterval(fetchCurrentTime, 1000);
})


</script>

<template>
    <div class="admin-component-header">
        <h2><i class="fa fa-calendar"></i> Daily Time Record</h2>
     
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
                    <button class="time-button" @click="staffUserTimein('time_in')" v-if="userData.timeInButtonAction == 'time_in' && userRole =='staff'">Time in</button>
                    <button class="time-button" style="background-color: red;" @click="staffUserTimein('time_out')"  v-if="userData.timeInButtonAction == 'time_out' && userRole =='staff'">Time out</button>
                </div>
                <div>
                    <img :src="backendbaseURL+userData.user_profile" class="img-fluid preview-image" />
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
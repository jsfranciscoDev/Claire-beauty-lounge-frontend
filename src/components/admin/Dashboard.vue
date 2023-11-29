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

const newappointment = ref([]);
const newappointmentmessage = ref([]);

const public_ip = import.meta.env.VITE_APP_IP_LOCATION;

const apiKey = import.meta.env.VITE_APP_LOCATION_API_KEY;
const backendbaseURL = import.meta.env.VITE_APP_BASE_URL;


const StaffAcessRole = ref(null);

const staff_role = sessionStorage.getItem('staff_role');
if(staff_role){
  const staffRoleBytes = CryptoJS.AES.decrypt(staff_role, 'staff_role');
  const StaffRole = staffRoleBytes.toString(CryptoJS.enc.Utf8);
  StaffAcessRole.value = StaffRole
}


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
              if(response.data.ip_address == public_ip){
                userData.timeIn( userData.user_details.id, currentTime.value, currentDate.value, action).then(response => {
                    if(response.data.status == 'success'){
                        userData.timeInButtonAction = response.data.action
                    }
                })
              }else{
                Swal.fire({
                    title: `Invalid ${action}`,
                    text: "Your current location is unable to synchronize with the server's time according to the system administrator.",
                    icon: 'warning',
                });
              }
          })
          .catch(error => {
          });
}

onBeforeUnmount(() => {
    clearInterval(intervalId);
    userData.fetchUser();
});

onMounted(() => {
  userData.fetchUser();
  
  userData.fetchNewAppointment().then(response => {
    newappointment.value = response.data.appointments;
    newappointmentmessage.value = response.data.message;
  })
//   userData.fetchExpireStocksProduct().then(response =>{
//     if(response.data.message == 'Products Will expire soon'){
//         productExp.value = response.data.products
//     }else{
//         productExpMssg.value = response.data.message;
//     }
//   });
  userData.getDTR();
  fetchCurrentTime();
  intervalId = setInterval(fetchCurrentTime, 1000);
})


</script>

<template>
    {{ StaffAcessRole }}
    <div class="dashboard-container-box">
        <div class="dashboard-box">
            <div class="admin-component-header">
        <h2><i class="fa fa-window-maximize"></i> Daily Time Record</h2>
    </div>
    <div class="row">

        <div class="time-clock">
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
        </div>
        <div class="dashboard-box" v-if="StaffAcessRole !='Services'">
            <div class="admin-component-header">
        <h2><i class="fa fa-clock"></i> New Appointment</h2>
    </div>
        <div class="time-clock">
            <div class="d-flex justify-content-between align-items-center" >
               <!-- {{ newappointment }} -->
             
                <div v-if="newappointmentmessage == 'No New Appointment'" class="appointment-msg">
                    <p>{{ newappointmentmessage }}</p>
                </div>
                
                <div v-else class="d-flex flex-wrap"> 
                    <div v-for="data in newappointment" class="appointment-box">
                        <p >{{ data.name }}</p>
                        <p >{{ data.services_name }}</p>
                        <p>{{  moment(data?.date).format('MMMM Do YYYY, h:mm:ss a') }}</p>
                        <p>Price: ₱ {{ data.price }}</p>
                    </div>
                </div>
               
            </div>
        </div>
   
        </div>
    </div>
</template>


<style>
.appointment-msg{
    padding: 48px;
    text-align: center;
    width: 100%;
}
.appointment-msg p{
    font-size: 24px;
    font-weight: bold;
}

.appointment-box{
    border-radius: 5px;
    padding: 10px;
    background-color: #eed9c4;
    margin: 15px;
    text-align: center;

}

.appointment-box p{
    font-size: 12px;
    font-weight: bold;
    color: black;
}
.dashboard-container-box{
    display: flex;
    width: 100%;
}
.dashboard-box{
   width: 100%;
   margin: 5px;
}
.time-clock{
    width: 100%;
}
.time-clock img{
    margin-right: 1rem;
}
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
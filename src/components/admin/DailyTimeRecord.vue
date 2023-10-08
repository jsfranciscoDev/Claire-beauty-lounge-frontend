<script setup>
import { store } from "../../store/staff";
import { onMounted , ref } from 'vue'; 
import moment from 'moment';
import CryptoJS from 'crypto-js';


const userData = store();
const monthsFilter = ref('');
const userFilter = ref('');
const formatTime = (timeString) => {
  return moment(timeString, 'HH:mm:ss').format('h:mm A');
};

const calculateDuration = (timeIn, timeOut) => {
  const format = 'HH:mm:ss';
  const duration = moment.duration(moment(timeOut, format).diff(moment(timeIn, format)));
  const hours = Math.floor(duration.asHours());
  const minutes = Math.floor(duration.asMinutes()) % 60;
  return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
};

onMounted(() => {
    userData.getUserDTR();
    userData.getUserDropdown();
});

const months = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December"
];

let selectedMonth = "";
let selectedUser = "";


const handleMonthChange = (event) => {
  monthsFilter.value = event.target.value;
  userData.getUserDTR( monthsFilter.value, userFilter.value);
};

const handleUserChange = (event) => {
  userFilter.value = event.target.value;
  userData.getUserDTR(monthsFilter.value, userFilter.value);
};


const role = sessionStorage.getItem('role');
const roleBytes = CryptoJS.AES.decrypt(role, 'role');
const userRole = roleBytes.toString(CryptoJS.enc.Utf8);

</script>

<template>
     <div class="admin-component-header">
        <h2><i class="fa fa-clock"></i> Daily Time Record</h2>
        <div>
            <select v-model="selectedMonth" class="select-dropdown"  @change="handleMonthChange">
                <option disabled value="">Months</option>
                <option v-for="(month, index) in months" :key="index" :value="month">
                    {{ month }}
                </option>
            </select>
            <select  v-model="selectedUser" class="select-dropdown"  @change="handleUserChange" v-if="userRole == 'admin'">
                    <option disabled value="">Select User</option>
                    <option v-for="(data, index) in userData.user_dropdown" :key="index" :value="data.id">
                    {{ data.name }}
                </option>
            </select>
        </div>
       
    </div>
    <div class="row">
        <div class="table-container" style="width: 100%;">
        <div class="table-responsive bg-white">   
              <table class="table mb-0">
                <thead>
                  <tr>
                    <th scope="col" >Date</th>
                    <th scope="col" >Time In</th>
                    <th scope="col" >Time Out</th>
                    <th scope="col" >Total Duration Hours</th>
                  </tr>
                </thead>
                <tbody v-for="(data,index) in userData.user_records" :key="index">
                    <tr>
                        <td width="25">
                            {{ data.date }}
                        </td>
                        <td width="25">
                            {{ formatTime(data.time_in) }}
                        </td>
                        <td width="25">
                            {{ data.time_out ? formatTime(data.time_out) : '-' }}
                        </td>
                        <td width="25">
                            {{ data.time_in && data.time_out ? calculateDuration(data.time_in, data.time_out) : '-' }}
                        </td>
                    </tr>

                </tbody>
            
              </table>
              
        </div>
    </div>
    </div>
</template>
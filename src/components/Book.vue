<script setup>
import { reactive, ref, onMounted, onBeforeMount   } from "vue";
import { store } from "../store/index";
import Swal from 'sweetalert2';

import moment from 'moment';
import navBar from '../components/nav.vue';

const userData = store();
const accountCreated = ref(false);
const selectedServices = ref('');
const selectedStaff = ref('');


const handlerServiceChange = (event) => {
   selectedServices.value = event.target.value;
};

const handlerStaffChange = (event) => {
   selectedStaff.value = event.target.value;
};

const Appointment = reactive({
    user_id: '',
    service_id: '',
    date: '',
    time: '',
    user_staff: ''
})

const userSendAppointment = () => {
    Appointment.user_id = userData.user_details.id,
    Appointment.service_id = selectedServices,
    Appointment.user_staff = selectedStaff,
    userData.sendAppointment(Appointment)
}

onMounted(() => {
    userData.fetchUser();
    userData.getServicesDropdown();
    userData.fetchAppointment();
    userData.getStaffDropdown();
});

onBeforeMount(() => {
    userData.fetchUser();
    userData.getServicesDropdown();
    userData.fetchAppointment();
    userData.getStaffDropdown();
});


const getStatusClass = (status) => {
 
 switch (status) {
   case 'Cancelled':
     return 'text-danger'
   case 'Pending':
     return 'text-warning'; // Bootstrap class for warning color
   case 'Reschedule':
     return 'text-info'; // Bootstrap class for info color
   case 'Approved':
     return 'text-success'; // Bootstrap class for success color
   case 'Completed':
     return 'text-primary'; // Bootstrap class for primary color
   default:
     return ''; // Default class, if none of the statuses match
 }
}

const updateAppointment = (appointment_id, status , message) => {
  let data = {
    id: appointment_id,
    status: status
  }

  Swal.fire({
    title: `${message} Appointment?`,
    text: "Please make sure the details correct",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: `Yes, ${message} it!`
  }).then((result) => {
    if (result.isConfirmed) {
      userData.updateAppointment(data);
    }
  })

 
}

</script>

<template>
    <navBar/>
    <div class="row vh-100">
      <div class="col-md-6 pl-0" >
        <div class="appointment-container" :style="{ opacity: userData.user_appointment?.detail === 'Cancelled' ? 0.5 : 1 }">
          <div class="card" v-if="userData.user_appointment">
            <div class="header">
              <div class="content">
                <span :class="getStatusClass( userData.user_appointment.detail)">{{ userData.user_appointment?.detail }}</span>
                <p class="message">
                 {{ userData.user_appointment?.service }}
                </p>

                <p class="message">
                 {{ userData.user_appointment?.staff_name }}
                </p>
                
                <p class="message">
                 {{ moment(userData.user_appointment?.date).format('MMMM Do YYYY, h:mm:ss a') }}
                </p>
              </div>
              <div class="actions">
                <button class="track" type="button" @click="updateAppointment(userData.user_appointment.appointment_id ,2 ,'Cancel')" :disabled="userData.user_appointment.detail == 'Cancelled'">
                  Cancel
                </button>
              </div>
            </div>
        </div>
        <div v-else>
          <span>No Appointment Records.</span>
        </div>
        </div>
      
      </div>
      <div class="col-md-6 login-form d-flex align-items-center justify-content-center">
        <div class="row align-items-center justify-content-center">
            <div class="form-input">
              
              <div class="alert alert-danger" role="alert" v-if="userData.user.errorWarning">
                {{ userData.user.errorWarning }}
              </div>
              <div class="alert alert-info" role="info" v-if="accountCreated">
                Account has been successfully created.
              </div>
              <center><p>RESERVATION</p><h2>Make an Appointment</h2></center>
                <form @submit.prevent="userSendAppointment">
                <div class="form-group">
                  <label for="password">Services:</label>
                  <select  v-model="selectedServices" class="select-dropdown"  @change="handlerServiceChange" style="width: 100%;">
                          <option disabled value="">Select Services</option>
                          <option v-for="data in userData.service_dropdown" :value="data.id">{{ data.name }}</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="password">Select Staff:</label>
                  <select  v-model="selectedStaff" class="select-dropdown"  @change="handlerStaffChange" style="width: 100%;">
                          <option disabled value="">Select Staff</option>
                          <option v-for="data in userData.staff_dropdown" :value="data.id">{{ data.name }}</option>
                  </select>
                </div>
                
                <div class="form-group">
                    <label for="password">Date:</label>
                    <input type="date" class="form-control" v-model="Appointment.date" placeholder="Enter password">
                </div>
                <div class="form-group">
                    <label for="password">Time:</label>
                    <input type="time" class="form-control"  v-model="Appointment.time"  placeholder="Enter password">
                </div>
                <button type="submit" class="btn login-btn mb-2" @click="login">Submit</button>
               
              </form>
        </div>
        </div>
      </div>
    </div>
</template>

<style>

.appointment-container{
  display: grid;
  place-items: center;
  height: 100%;
}

.card {
  overflow: hidden;
  position: relative;
  text-align: left;
  border-radius: 0.5rem;
  max-width: 290px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  background-color: #fff;
}

.dismiss {
  position: absolute;
  right: 10px;
  top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  background-color: #fff;
  color: black;
  border: 2px solid #D1D5DB;
  font-size: 1rem;
  font-weight: 300;
  width: 30px;
  height: 30px;
  border-radius: 7px;
  transition: .3s ease;
}

.dismiss:hover {
  background-color: #ee0d0d;
  border: 2px solid #ee0d0d;
  color: #fff;
}

.header {
  padding: 1.25rem 1rem 1rem 1rem;
}

.image {
  display: flex;
  margin-left: auto;
  margin-right: auto;
  background-color: #e2feee;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  animation: animate .6s linear alternate-reverse infinite;
  transition: .6s ease;
}

.image svg {
  color: #0afa2a;
  width: 2rem;
  height: 2rem;
}

.content {
  margin-top: 0.75rem;
  text-align: center;
}

.title {
  color: #066e29;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5rem;
}

.message {
  margin-top: 0.5rem;
  color: #595b5f;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.actions {
  margin: 0.75rem 1rem;
}

.history {
  display: inline-flex;
  padding: 0.5rem 1rem;
  background-color: #1aa06d;
  color: #ffffff;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 500;
  justify-content: center;
  width: 100%;
  border-radius: 0.375rem;
  border: none;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.track {
  display: inline-flex;
  margin-top: 0.75rem;
  padding: 0.5rem 1rem;
  color: #242525;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 500;
  justify-content: center;
  width: 100%;
  border-radius: 0.375rem;
  border: 1px solid #D1D5DB;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
.is-pending{
  color: rgb(233, 212, 23);
}

.is-approved{
  color: rgb(21, 184, 34);
}
</style>


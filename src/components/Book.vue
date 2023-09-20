<script setup>
import { reactive, ref, onMounted  } from "vue";
import { store } from "../store/index";


const userData = store();
const accountCreated = ref(false);
const selectedServices = ref('');



const handlerServiceChange = (event) => {
   selectedServices.value = event.target.value;
};

const Appointment = reactive({
    user_id: '',
    service_id: '',
    date: '',
    time: '',
})

onMounted(() => {
    userData.fetchUser();
    userData.getServicesDropdown();
});

const sendAppointment = () => {
    Appointment.user_id = userData.user_details.id,
    Appointment.service_id = selectedServices
}

</script>

<template>
    
    <div class="row vh-100">
      <div class="col-md-6 pl-0" >
        {{ userData.user_details }}

        {{ Appointment }}
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
                <form @submit.prevent="sendAppointment">
                <label for="password">Services:</label>
                <select  v-model="selectedServices" class="select-dropdown"  @change="handlerServiceChange" style="width: 100%;">
                        <option disabled value="">Select Services</option>
                        <option v-for="data in userData.service_dropdown" :value="data.id">{{ data.name }}</option>
                </select>
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

</style>


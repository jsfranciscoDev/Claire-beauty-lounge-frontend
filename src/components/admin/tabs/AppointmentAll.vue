<script setup>
import { appointment } from "../../../store/appointment";
import { onBeforeMount  } from "vue";
import moment from 'moment';
import Swal from 'sweetalert2';

const appointmentData = appointment();

const paginate = (page) => {
    appointmentData.getAllappointments(page);
}

onBeforeMount(() => {
 appointmentData.getAllappointments();
});

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
      appointmentData.updateAppointment(data);
    }
  })

 
}

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
          return 'text-success'; // Bootstrap class for primary color
        default:
          return ''; // Default class, if none of the statuses match
      }
}
</script>

<template>
     <div class="row">
        <div class="table-container" style="width: 100%;">
         
        <div class="table-responsive bg-white">   
              <table class="table mb-0">
                <thead>
                  <tr>
                    <th scope="col" width="15%">Date</th>
                    <th scope="col" >Name</th>
                    <th scope="col" >Email</th>
                    <th scope="col" >Contact#</th>
                    <th scope="col" >Service</th>
                    <th scope="col" >Staff</th>
                    <th scope="col" >Status</th>
                    <th scope="col" >Action</th>
                  </tr>
                </thead>
                <tbody v-for="(data,index) in appointmentData.data.data" :key="index">
                  <tr>
                 
                    <td>{{  moment(data?.date).format('MMMM Do YYYY, h:mm:ss a') }}</td>
                    <td>{{ data?.name }}</td>
                    <td>{{ data?.email }}</td>
                    <td>{{ data?.contact }}</td>
                    <td>{{ data?.service }}</td>
                    <td>{{ data?.staff_name }}</td>
                    <td :class="getStatusClass(data.detail)"><b>{{ data?.detail }}</b></td>
                  
                    <td class="table-actions d-flex flex-column"> 
                      <span v-if="!['Approved', 'Cancelled', 'Reschedule','Completed'].includes(data.detail)" @click="updateAppointment(data.appointment_id, 4, 'Reschedule')">Reschedule</span>
                      <span v-if="!['Approved', 'Cancelled', 'Reschedule','Completed'].includes(data.detail)" @click="updateAppointment(data.appointment_id, 2, 'Declined')">Declined</span>
                      <span v-if="!['Approved', 'Cancelled', 'Reschedule','Completed'].includes(data.detail)" @click="updateAppointment(data.appointment_id, 3, 'Approved')">Approved</span>
                      <span v-if="data.detail === 'Approved' && !['Cancelled', 'Reschedule'].includes(data.detail)" @click="updateAppointment(data.appointment_id, 5, 'Complete')">Complete</span>
                    </td>

                  </tr>
                </tbody>
              </table>
              <div v-if="appointmentData.data.total > 5" class="table-pagination">  
                <div>
                    <button @click="paginate(appointmentData.data.current_page - 1)" v-if="appointmentData.data.prev_page_url"><i class="fa fa-angle-left"></i></button>
                    <button @click="paginate(appointmentData.data.current_page + 1)" v-if="appointmentData.data.next_page_url" ><i class="fa fa-angle-right"></i></button>
                </div>
                <div >
                    <span> Page {{ appointmentData.data.current_page  }} - {{ appointmentData.data.last_page }} </span>
                </div>
                
              </div>
        </div>
    </div>
    </div>
</template>
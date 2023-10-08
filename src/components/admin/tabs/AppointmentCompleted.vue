<script setup>
import { appointment } from "../../../store/appointment";
import { onBeforeMount  } from "vue";
import moment from 'moment';
const appointmentData = appointment();

const paginate = (page) => {
    appointmentData.getStatusgappointments(page,5);
}

onBeforeMount(() => {
 appointmentData.getStatusgappointments(1,5);
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
                        <span @click="updateServices(data)">Reschedule</span>
                        <span @click="deleteServices(data.id)">Declined</span>
                        <span @click="addServicesProduct(data.id)">Approved</span>
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
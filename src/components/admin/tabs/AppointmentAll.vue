<script setup>
import { appointment } from "../../../store/appointment";
import  daterange  from "../../daterange.vue";
import { onBeforeMount , ref , reactive , watch} from "vue";
import moment from 'moment';
import Swal from 'sweetalert2';
import { endOfMonth, endOfYear, startOfMonth, startOfYear, subMonths, subDays, startOfDay } from 'date-fns';
import SearchBar from "../../SearchBar.vue";

const appointmentData = appointment();
const remarks = ref('');
const remarksModal = ref(false);
const data = reactive({
    id: null,
    status: null,
    remarks: null
})

const dateRange = ref(null);
const searchData = ref('');
const loaded = ref(false);

const paginate = (page) => {
    appointmentData.getAllappointments(page, dateRange.value, searchData.value);
}

onBeforeMount(() => {
 appointmentData.getAllappointments();
});

const closeDialog = () =>{
  remarks.value = '',
  remarksModal.value = false;
}

const updateAppointment = (appointment_id, status , message) => {
 
  data.id = appointment_id;
  data.status = status;
  data.remarks = remarks;

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
      if(status == 4 || status == 2){
        remarksModal.value = true;
      }else{
        appointmentData.updateAppointment(data).then(e =>{
          
        });
      }
    }
  })

 
}

const sendAppointmentRemarks = () => {
  loaded.value = true;
  remarksModal.value = false;
  Swal.fire({
    title: ` Send remarks`,
    text: "Please make sure the details correct",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: `Yes, Send it!`
  }).then((result) => {
    if (result.isConfirmed) {
       appointmentData.updateAppointment(data).then(e => {
        loaded.value = false;
       });
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


const options = ref([
    { label: 'Today', value: [new Date(), new Date()] },
    { label: 'Last Week', value: [subDays(startOfDay(new Date()), 6), new Date()] },
    // { label: 'This Month', value: [startOfMonth(new Date()), endOfMonth(new Date())] },
    { label: 'Last Month', value: [startOfMonth(subMonths(new Date(), 1)), endOfMonth(subMonths(new Date(), 1))],},
    { label: 'Last 90 Days', value: [subDays(new Date(), 90), new Date()] },
    { label: 'Year to Date', value: [startOfYear(new Date()), new Date()] },
    // { label: 'This Year', value: [startOfYear(new Date()), endOfYear(new Date())] },
  ]);

const selectedOption = ref(null);


watch(selectedOption, (newValue, oldValue) => {
  dateRange.value = newValue
  appointmentData.getAllappointments(1, dateRange.value , searchData.value)
});

const SearchFilter = (searchQuery) => {
  appointmentData.getAllappointments(1,dateRange.value,searchQuery);
};

</script>

<template>
    <div class="loader" v-if="loaded">Loading
        <span></span>
    </div>

    <div class="d-flex">
      <daterange :options="options" v-model="selectedOption"></daterange> 
      <SearchBar placeholder="Search Client Name" v-model="searchData" @enterPressed="SearchFilter" @searchIconClicked="SearchFilter" @clearIconClicked="SearchFilter" class="mr-2" />
    </div>
  
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
                    <th scope="col" >Proccess By</th>
                    <th scope="col" >Position</th>
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
                    <td>{{ data?.process_by_role }}</td>
                    <td>{{ data?.process_by_role }}</td>
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

     <!-- MODAL -->
     <div class="add-staff" v-if="remarksModal">
        <div class="form-container">
            <div class="staff-form">
                <div class="form-input">
                    <h2 v-if="!updateStaff"><i class="fa-solid fa-bell"></i> Send Remarks</h2>
                
                <form @submit.prevent="sendAppointmentRemarks">
               
                <div class="form-group">
                    <label for="name">(Reason for re-scheduling send to client)</label>
                    <textarea class="form-control" v-model="remarks" autocomplete="off" required></textarea>
                    <span  class="text-danger"></span>
                </div>
                
                <button type="submit" class="btn btn-primary">Submit</button>
                <button type="button" class="btn btn-danger" @click="closeDialog">Cancel</button>
              </form>
            </div>
            </div>
        </div>
     
    </div>
    <!-- MODAL -->
</template>
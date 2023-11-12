<script setup>

import { reactive, ref, onMounted, onBeforeMount  } from "vue";
import { store } from "../../store/service";
import Swal from 'sweetalert2';
import SearchBar from "../SearchBar.vue";

const service = store();
const searchData = ref('');

const formDialog = ref(false)
const Update = ref(false);
const addServicesProductsDialog = ref(false);
const selectedService = ref(null);

const addServices = () => {
    service.createServiceCategory().then(response => {
        if(response.data.status == 'success'){
            closeDialog();
        }
    });
}

const closeDialog = () => {
    formDialog.value = false;
    Update.value = false;
    addServicesProductsDialog.value = false;
    resetFields();
}

const resetFields = () => {
    service.service_category = {};
    selectedService.value = null;
}

const paginate = (page) => {
    service.getServicesCategory(page,searchData.value);
}

const removdeServiceCategory = (id) => {
    Swal.fire({
    title: 'Delete Service?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deleted!',
        'Services Successfully Deleted',
        'success'
      )
      service.deleteServiceCategory(id)
    }
  })
   
}

const updateServicesCategory = (data) => {
    service.service_category.name = data.name
    service.service_category.id = data.id
    formDialog.value = true
    Update.value = true
}

const submitUpdate = () => {
    service.updateServicesCategory();
    closeDialog();
}


const SearchFilter = (searchQuery) => {
    service.getServicesCategory(1,searchQuery);
};


onMounted(() => {
    service.getServices();
});

onBeforeMount(() => {
 service.getServicesCategory();
});

</script>

<template>
    <div class="admin-component-header">
        <div class="search-bar-fields">
            <SearchBar placeholder="Search Service Category Name" v-model="searchData" @enterPressed="SearchFilter" @searchIconClicked="SearchFilter" @clearIconClicked="SearchFilter" class="mr-2" />
        </div>
        <button type="button" @click="formDialog = true"><i class="fa-solid fa-plus"></i>Add</button>
    </div>

    <div class="table-container">
        <div class="table-responsive bg-white">   
              <table class="table mb-0">
                <thead>
                  <tr>
                    <th scope="col">Service Category Name</th>
                    <th scope="col">Added By</th>
                    <th scope="col">Position</th>
                    <th scope="col">Action</th>

                  </tr>
                </thead>
                <tbody v-for="(data,index) in service.service_category_details.data" :key="index" class="table-actions">
                  <tr>
                 
                    <td>{{ data.name }}</td>
                    <td>{{ data.username }}</td>
                    <td>{{ data.role }}</td>
                    <td> 
                        <span @click="updateServicesCategory(data)"><i class="fa-solid fa-edit"></i></span>
                        <span @click="removdeServiceCategory(data.id)"><i class="fa-solid fa-trash"></i></span>
                    </td>

                  </tr>
                </tbody>

              </table>
        
              <div v-if="service.service_category_details.total > 5" class="table-pagination">  
                <div>
                    <button @click="paginate(service.service_category_details.current_page - 1)" v-if="service.service_category_details.prev_page_url"><i class="fa fa-angle-left"></i></button>
                    <button @click="paginate(service.service_category_details.current_page + 1)" v-if="service.service_category_details.next_page_url" ><i class="fa fa-angle-right"></i></button>
                </div>
                <div >
                    <span> Page {{ service.service_category_details.current_page  }} - {{ service.service_category_details.last_page }} </span>
                </div>
                
              </div>
        </div>
    </div>

    <!-- MODAL -->
    <div class="add-staff" v-if="formDialog">
        <div class="form-container">
            <div class="staff-form">
                <div class="form-input">
                    <h2 v-if="!Update"><i class="fa-solid fa-plus"></i> Add Services Category</h2>
                    <h2 v-else> <i class="fa-solid fa-edit"></i> Update Services Category</h2>
                <!-- <div class="alert alert-danger d-flex flex-column" role="alert"  >
                    <span v-html="asd"></span>
                  
                </div> -->
                <form @submit.prevent="addServices">
                   
                <div class="form-group">
                    <label>Service Category Name</label>
                    <input type="text" class="form-control" v-model="service.service_category.name" autocomplete="off" required>
                    <span  class="text-danger fs-12"></span>
                </div>
             
                <div v-if="!Update">
                    <button type="submit" class="btn btn-primary">Create</button>
                    <button type="button" class="btn btn-danger" @click="closeDialog">Cancel</button>
                </div>
               
              </form>

              <div v-if="Update">
                <button class="btn btn-primary" @click="submitUpdate()">Update</button>
                <button type="button" class="btn btn-danger" @click="closeDialog">Cancel</button>
              </div>
           
            </div>
            </div>
        </div>
     
    </div>
    <!-- MODAL -->
    
</template>

<style>
.table-header{
    padding: 10px;
}

.add-staff{
    position: absolute;
    width: 100%;
    height: 100vh;
    z-index: 9999;
    top: 0;
    left: 0 ;
    background: rgba(10, 10, 10, 0.651);
}

.form-container{
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.form-container h2{
    font-weight: bold;
    font-size: 20px;
    text-transform: uppercase;
    color: #6F6F6F;
    margin: 10px 0px;
}

.staff-form{
    width: 500px;
    background-color: white;
    height: auto;
    padding: 50px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
}

.staff-form button {
    margin: 0px 10px 0px 0px ;
}

.admin-component-header{
    display: flex;
    justify-content: space-between;
    padding: 10px 0px;
    align-items: center;
}

.admin-component-header h2{
    font-weight: bold;
    font-size: 20px;
    text-transform: uppercase;
    color: #6F6F6F;
}

.admin-component-header button{
    padding: 0px 30px;
    border-radius: 5px;
    height: 35px;
    font-size: 14px;
    text-transform: uppercase;
    background-color: #e4d5b7;
    color: #343434;
    font-weight: bold;
}

.admin-component-header button i{
   margin: 0px 5px 0px 0px;
}

.table-container i {
    margin: 0px 5px;
    color: #B2BEB5;
    cursor: pointer;
}
.table-container .table th, .table td{
    padding: 1rem !important;
}
.table-container td, .table-container th{
    font-size: 14px;
}
.table-container .fa-edit:hover {
    color: #00D100;
}

.table-container .fa-trash:hover {
    color: #FF0000;
}

.table-pagination{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.table-pagination button {
    border-radius: 50%;
    padding: 2px 6px;
    margin: 10px 5px;
}

.table-pagination span{
    font-size: 14px;
    margin: 0px 20px;
}

.table-responsive{
    border-radius: 5px !important;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
    /* padding: 2rem; */
    /* padding: 15px;
    border-radius: 10px; */
    /* box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; */
}

.table-responsive th{
    font-size: 9px !important;
    text-wrap: nowrap;
    text-transform: uppercase;
   
}

.table-container .table th, .table td{
    border: 1px solid #dee2e6;
}

.table-responsive td{
    padding: 5px;
    font-size: 12px !important;
}
.add-items-service{
    color: black;
    cursor: pointer;
}
.add-services-products{
    display: flex;

    .form-group{
        margin: 0px 5px;
    }

    .form-group:nth-child(1){
        width: 80%;
    }
    .form-group:nth-child(2){
        width: 20%;
    }

    .remove-services-product i {
        background-color: red;
        padding: 3px;
        color: white;
        border-radius: 50%;
        margin-top: 25px;
        margin-left: 5px;
        font-size: 14px;
        cursor: pointer;
    }
}
</style>
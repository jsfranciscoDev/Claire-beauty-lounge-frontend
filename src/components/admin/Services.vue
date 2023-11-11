<script setup>

import { reactive, ref, onMounted, onBeforeMount, watch  } from "vue";
import { store } from "../../store/service";
import Swal from 'sweetalert2';

const service = store();


const inputText = ref('');

const formDialog = ref(false)
const Update = ref(false);
const addServicesProductsDialog = ref(false);
const selectedService = ref(null);

const ServicesItems = reactive([{
    product_id: null,
    quantity: 0,
}]);


const addServices = () => {
    service.createServices().then(response => {
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
    service.services = {};
    selectedService.value = null;
}

const paginate = (page) => {
    service.getServices(page);
}

const deleteServices = (id) => {
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
      service.deleteService(id)
    }
  })
   
}

const updateServices = (data) => {
    service.services.name = data.name
    service.services.Type = data.type
    service.services.price = data.price
    service.services.details = data.details
    service.services.id = data.id
    formDialog.value = true
    Update.value = true
}

const submitUpdate = () => {
    service.updateServices();
    closeDialog();
}


onMounted(() => {
    service.getServices();
});

onBeforeMount(() => {
 service.getServices();
 service.getServiceCategoryDropdown();
 service.getServicesProductDropdown();
});
 
const formatPrice =(price) =>{
    return `₱${parseFloat(price).toLocaleString('en-US', {minimumFractionDigits: 2})}`;
}

const isNumber = function(evt) {
  evt = (evt) ? evt : window.event;
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
    evt.preventDefault();
    return false;
  } else {
    return true;
  }
}

const addMoreItems = () => {
    ServicesItems.push({
        product_id: null,
        quantity: 0,
    });
}

const addServicesProduct = (service_id) => { 
   selectedService.value = service_id 
   addServicesProductsDialog.value = true;
}

const removeItem = (index) => {
    ServicesItems.splice(index, 1);
}

const addServicesProducts = () =>{

    ServicesItems.forEach(response => {
        console.log(response);
        if(response.quantity === 0){
            addServicesProductsDialog.value = false
            Swal.fire(
                'Error',
                'Please update the quantity',
                'warning'
            )
        }else{
            service.attachProductsOnService(selectedService.value, ServicesItems).then(response => {
                if(response.data.status == 'success'){
                    closeDialog();
                }else{
                    closeDialog();
                }  
            });
        }
    });
}

const removeServicesProduct = (services_id) => {    
    Swal.fire({
        title: 'Remove Services Items?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
        service.removeAttachedProducts(services_id);
        }
    })
}



const formatTime = function(event) {
  let input = event.target.value;
  let sanitizedInput = input.replace(/\D/g, '');

  if (sanitizedInput.length >= 4) {
    // Format as HH:MM
    sanitizedInput = sanitizedInput.replace(/^(.{2})(.{2})$/, "$1:$2");
  }

  service.services.estimated_hours = sanitizedInput.substring(0, 5);
}

</script>

<template>
    <div class="admin-component-header">
        <h2  style="visibility: hidden;"><i class="fa fa-bed"></i> Manage Services</h2>
        <button type="button" @click="formDialog = true"><i class="fa-solid fa-plus"></i>Add</button>
    </div>

    <div class="table-container">
        <div class="table-responsive bg-white">   
              <table class="table mb-0">
                <thead>
                  <tr>
                    <th scope="col">Service Name</th>
                    <th scope="col">Service Category</th>
                    <th scope="col">Service Price</th>
                    <th scope="col">Details</th>
                    <th scope="col">Package Included</th>
                    <th scope="col">Estimated Hours</th>
                    <th scope="col">Total Price</th>
                    <th scope="col" class="actions">Action</th>
                  </tr>
                </thead>
                <tbody v-for="(data,index) in service.services_details.data" :key="index" class="table-actions">
                  <tr>
                 
                    <td>{{ data.name }}</td>
                    <td>{{ data.category}}</td>
                    <td>{{ formatPrice(data.price) }}</td>
                    <td >{{ data.details }} 
                    </td>
                    <td>
                        <div v-for="(product,i) in data.products">
                            {{ product.name }} {{ formatPrice(product.price) }} x {{ product.quantity }} pcs. = {{ formatPrice(product.price * product.quantity ) }}
                        </div>
                    </td>
                    <td>{{ data.estimated_hours }}</td>
                    <td> 
                        {{ formatPrice(data.price + data.total_product_price ) }}
                    </td>
                    <td class="actions d-flex flex-column" style="border: none;"> 
                        <span @click="updateServices(data)">Edit Services</span>
                        <span @click="deleteServices(data.id)">Delete Services</span>
                        <span @click="addServicesProduct(data.id)">Add Items</span>
                        <span @click="removeServicesProduct(data.id)">Remove Items</span>
                    </td>

                  </tr>
                </tbody>

              </table>
        
              <div v-if="service.services_details.total > 3" class="table-pagination">  
                <div>
                    <button @click="paginate(service.services_details.current_page - 1)" v-if="service.services_details.prev_page_url"><i class="fa fa-angle-left"></i></button>
                    <button @click="paginate(service.services_details.current_page + 1)" v-if="service.services_details.next_page_url" ><i class="fa fa-angle-right"></i></button>
                </div>
                <div >
                    <span> Page {{ service.services_details.current_page  }} - {{ service.services_details.last_page }} </span>
                </div>
                
              </div>
        </div>
    </div>

    <!-- MODAL -->
    <div class="add-staff" v-if="formDialog">
        <div class="form-container">
            <div class="staff-form">
                <div class="form-input">
                    <h2 v-if="!Update"><i class="fa-solid fa-plus"></i> Add Services</h2>
                    <h2 v-else> <i class="fa-solid fa-edit"></i> Update Services</h2>
                <!-- <div class="alert alert-danger d-flex flex-column" role="alert"  >
                    <span v-html="asd"></span>
                  
                </div> -->
                <form @submit.prevent="addServices">
                   
                <div class="form-group">
                    <label>Service Name</label>
                    <input type="text" class="form-control" v-model="service.services.name" autocomplete="off" required>
                    <span  class="text-danger fs-12"></span>
                </div>
        
                <!-- <div class="form-group">
                    <label>Service Type</label>
                    <input type="text" class="form-control" v-model="service.services.Type" autocomplete="off" required>
                    <span  class="text-danger"></span>
                </div> -->

                <div class="form-group">
                    <label>Service Category</label>
                    <select  v-model="service.services.service_category" class="select-service-dropdown"  @change="handleServiceCategory" required>
                            <option v-for="(data, index) in service.service_category_dropdown" :key="index" :value="data.id">
                            {{ data.name }}
                        </option>
                    </select>
                 </div>
               
                <div class="form-group">
                    <label>Price</label>
                    <input type="text" class="form-control" v-model="service.services.price" autocomplete="off" @keypress="isNumber($event)"  required>
                    <span  class="text-danger"></span>
                </div>

                <div class="form-group">
                    <label>Details</label>
                    <input type="text" class="form-control" v-model="service.services.details" autocomplete="off" required>
                    <span  class="text-danger"></span>
                </div>

                <div class="form-group">
                    <label>Estimated Process Time (HH:MM)</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        v-model="service.services.estimated_hours" 
                        autocomplete="off" 
                        required 
                        @input="formatTime"
                        @keypress="isNumber"
                        maxlength="4"
                    >
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

    <!-- MODAL -->
    <div class="add-staff" v-if="addServicesProductsDialog">
        <div class="form-container">
            <div class="staff-form">
                <div class="form-input">
                <div class="d-flex justify-content-between align-items-center">
                    <h2 v-if="!Update"><i class="fa-solid fa-plus"></i> Add Services Items</h2>
                    <h2 v-else> <i class="fa-solid fa-edit"></i> Update Services</h2>
                <!-- <div class="alert alert-danger d-flex flex-column" role="alert"  >
                    <span v-html="asd"></span>
                  
                </div> -->
                <i class="fa-solid fa-plus add-items-service" @click="addMoreItems()"></i>
                
                </div>
                <form @submit.prevent="addServicesProducts" >
                <div v-for="(data,i) in ServicesItems" :key="i" class="add-services-products">
                    <div class="form-group">
                        <label>Item Name:</label>
                        <select class="select-dropdown m-0" v-model="ServicesItems[i].product_id">
                            <option disabled value="">Select Items</option>
                            <option v-for="data in service.service_product_dropdown" :value="data.id">{{ data.name }}</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Quantity</label>
                        <input type="text" class="form-control" v-model="ServicesItems[i].quantity" autocomplete="off" @keypress="isNumber($event)" required>
                        <span  class="text-danger"></span>
                    </div>

                    <div class="remove-services-product d-flex align-items-center">
                        <i class="fa-solid fa-minus" @click="removeItem(i)"></i>
                    </div>
                 
                </div>
               
               
                <div v-if="!Update" class="mt-5">
                    <button type="submit" class="btn btn-primary">Submit</button>
                    <button type="button" class="btn btn-danger" @click="closeDialog">Cancel</button>
                </div>
               
              </form>

              <div v-if="Update" class="mt-5">
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
    /* padding: 2rem; */
    /* padding: 15px;
    border-radius: 10px; */
    /* box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; */
}

.table-container .table th, .table td{
    border: 1px solid #dee2e6;
}

.table-responsive td{
    padding: 5px;
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
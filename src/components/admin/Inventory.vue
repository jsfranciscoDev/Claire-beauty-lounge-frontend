<script setup>
import { ref, onMounted } from "vue";
import { store } from "../../store/product";
import Swal from 'sweetalert2';

const product = store();

const storedToken = sessionStorage.getItem('token');


const formDialog = ref(false)
const Update = ref(false);


const addProductItem = () => {
    product.createProduct().then(response => {
        if(response.data.status == 'success'){
            closeDialog();
        }
    });
}



const closeDialog = () => {
    formDialog.value = false;
    Update.value = false;
    resetFields();
}

const resetFields = () => {
    product.product = {}
}

const paginate = (page) => {
    product.getProducts(page);
}

const removeProduct = (id) => {
    Swal.fire({
    title: 'Delete Product',
    text: "Are you sure do you want to delete this Product?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: `Yes, Delete it!`
  }).then((result) => {
    if (result.isConfirmed) {
        product.deleteProduct(id);
    }
  })
  
}

const updateProduct = (data) => {
    product.product = data
    formDialog.value = true
    Update.value = true
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

const submitUpdate = () => {
    product.updateProducts();
    closeDialog();
}

const formatPrice =(price) =>{
    return `₱${parseFloat(price).toLocaleString('en-US', {minimumFractionDigits: 2})}`;
}

onMounted(() => {
    product.getProducts();
});

</script>

<template>
     <div class="admin-component-header">
        <h2><i class="fa fa-list-alt"></i> Manage Product</h2>
        <button type="button" @click="formDialog = true"><i class="fa-solid fa-plus"></i>Add</button>
    </div>

    <div class="table-container">
        <div class="table-responsive bg-white">   
              <table class="table mb-0">
                <thead>
                  <tr>
                    <th scope="col">Product Name</th>
                    <th scope="col">Batch Number</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total Price</th>
                    <th scope="col">Purchase Date</th>
                    <th scope="col">Expiration Date</th>
                    <th scope="col">Supplier Information</th>
                    <th scope="col">Name</th>
                    <th scope="col">Role</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody v-for="(data,index) in product.product_details.data" :key="index">
                  <tr>
                 
                    <td>{{ data.name }}</td>
                    <td>{{ data.batch_number }}</td>
                    <td>{{ formatPrice(data.price) }}</td>
                    <td>{{ data.quantity }}</td>
                    <td>{{ formatPrice(data.price * data.quantity) }}</td>
                    <td>{{ data.purchase_dates }}</td>
                    <td>{{ data.expiration_date }}</td>
                    <td>{{ data.supplier_information }}</td>
                    <td>{{ data.username }}</td>
                    <td>{{ data.role }}</td>
                    <td> 
                        <span @click="updateProduct(data)"><i class="fa-solid fa-edit"></i></span>
                        <span @click="removeProduct(data.id)"><i class="fa-solid fa-trash"></i></span>
                    </td>

                  </tr>
                </tbody>

              </table>
        
              <div v-if="product.product_details.total > 10" class="table-pagination">  
                <div>
                    <button @click="paginate(product.product_details.current_page - 1)" v-if="product.product_details.prev_page_url"><i class="fa fa-angle-left"></i></button>
                    <button @click="paginate(product.product_details.current_page + 1)" v-if="product.product_details.next_page_url" ><i class="fa fa-angle-right"></i></button>
                </div>
                <div >
                    <span> Page {{ product.product_details.current_page  }} - {{ product.product_details.last_page }} </span>
                </div>
                
              </div>
        </div>
    </div>

      <!-- MODAL -->
      <div class="add-staff" v-if="formDialog">
        <div class="form-container">
            <div class="staff-form">
                <div class="form-input">
                    <h2 v-if="!Update"><i class="fa-solid fa-plus"></i> Add Item</h2>
                    <h2 v-else> <i class="fa-solid fa-edit"></i> Update Item</h2>
                <form @submit.prevent="addProductItem">
                   
                <div class="form-group">
                    <label for="username">Product Name</label>
                    <input type="text" class="form-control" v-model="product.product.name" autocomplete="off" required>
                    <span  class="text-danger fs-12"></span>
                </div>
                <div class="form-group" >
                    <label for="password">Batch Number</label>
                    <input type="text" class="form-control" v-model="product.product.batch_number" autocomplete="off" @keypress="isNumber($event)" required>
                    <span  class="text-danger"></span>
                </div>

                <div class="d-flex">
                    <div class="form-group w-100 pr-2" >
                        <label for="confirm_password">Price</label>
                        <input type="text" class="form-control" v-model="product.product.price" autocomplete="off" @keypress="isNumber($event)" required>
                        <span  class="text-danger"></span>
                    </div>

                    <div class="form-group w-100 p2-2">
                        <label for="name">Quantity</label>
                        <input type="text" class="form-control" v-model="product.product.quantity" autocomplete="off" @keypress="isNumber($event)" required>
                        <span  class="text-danger"></span>
                    </div>
                </div>

            
                <div class="form-group">
                    <label for="name">Supplier Information</label>
                    <input type="text" class="form-control" v-model="product.product.supplier_information" autocomplete="off" required>
                    <span  class="text-danger"></span>
                </div>
                
                <div class="d-flex">
                    <div class="form-group w-100 pr-2">
                        <label for="name">Purchase Date</label>
                        <input type="date" class="form-control" v-model="product.product.purchase_dates" autocomplete="off" required>
                        <span  class="text-danger"></span>
                    </div>

                    <div class="form-group w-100 pl-2">
                        <label for="name">Expiration Date</label>
                        <input type="date" class="form-control" v-model="product.product.expiration_date" autocomplete="off" required>
                        <span  class="text-danger"></span>
                    </div>
                </div>
              
                
                <div v-if="!Update">
                    <button type="submit" class="btn btn-primary" >Create</button>
                    <button type="button" class="btn btn-danger" @click="closeDialog">Cancel</button>
                </div>
                
                
              </form>

              <div v-if="Update">
                <button class="btn btn-primary"  @click="submitUpdate()">Update</button>
                <button type="button" class="btn btn-danger" @click="closeDialog">Cancel</button>
              </div>
             

            </div>
            </div>
        </div>
     
    </div>
    <!-- MODAL -->

</template>
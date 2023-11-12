<script setup>
import { ref, onMounted } from "vue";
import { userStore } from "../../store/user";
import Swal from 'sweetalert2';

const support = userStore();


const closeDialog = () => {
    formDialog.value = false;
    Update.value = false;
    resetFields();
}

const resetFields = () => {
    product.product = {}
}

const paginate = (page) => {
    support.getAllsupport(page);
}


const submitUpdate = () => {
    product.updateProducts();
    closeDialog();
}

onMounted(() => {
    support.getAllsupport();
});

</script>

<template>
     <div class="admin-component-header">
        <h2><i class="fa fa-linode"></i> Customer Support </h2>
    </div>

    <div class="table-container">
        <div class="table-responsive bg-white">   
              <table class="table mb-0">
                <thead>
                  <tr>
                    <th scope="col">Client Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Message</th>
                    <th scope="col">Date</th>
                    
                  </tr>
                </thead>
                <tbody  v-for="(data,index) in support.support_concern.data" :key="index">
                  <tr>
                    
                    <td>{{ data.name }}</td>
                    <td>{{ data.email }}</td>
                    <td>{{ data.message }}</td>
                    <td>{{ data.created_at }}</td>

                  </tr>
                </tbody>

              </table>
        
              <div v-if="support.support_concern.total > 5" class="table-pagination">  
                <div>
                    <button @click="paginate(support.support_concern.current_page - 1)" v-if="support.support_concern.prev_page_url"><i class="fa fa-angle-left"></i></button>
                    <button @click="paginate(support.support_concern.current_page + 1)" v-if="support.support_concern.next_page_url" ><i class="fa fa-angle-right"></i></button>
                </div>
                <div >
                    <span> Page {{ support.support_concern.current_page  }} - {{ support.support_concern.last_page }} </span>
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
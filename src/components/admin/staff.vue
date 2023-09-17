<script setup>
import { reactive, ref, onMounted } from "vue";
import { store } from "../../store/index";
const staffStoreData = store();

const staffData = reactive({
    email: null,
    password: null,
    password_confirmation: null,
    name: null,
    contact: null,
})

const staffDialog = ref(false)
const updateStaff = ref(false);

const addStaffUser = () => {
    staffStoreData.createStaff(staffData).then(e => {
        if(e.data.message == 'success'){
            closeDialog();
            staffStoreData.getUserStaff();
        }
    });
}

const editStaff = (data) => {
    updateStaff.value = true
    staffData.email = data.email;
    staffData.name = data.name;
    staffData.contact = data.contact;
    staffDialog.value = true;
}

const deleteStaff = (id) => {
    staffStoreData.deleteUserStaff(id).then(response => {
        if(response.data.message == 'success'){
            staffStoreData.getUserStaff();
            closeDialog();
        }
    });
}
const closeDialog = () => {
    staffDialog.value = false
    resetFields();
}

const resetFields = () => {
    updateStaff.value = false;
    staffStoreData.staffValidation.message = '';
    staffStoreData.staffValidation.error = '';
    Object.keys(staffData).forEach(key => staffData[key] = null);
}
const paginate = (page) => {
    staffStoreData.getUserStaff(page);
}

onMounted(() => {
    staffStoreData.getUserStaff();
});


</script>

<template>
    <div class="admin-component-header">
        <h2><i class="fa fa-tasks"></i> Manage Staff</h2>
        <button type="button" @click="staffDialog = true"><i class="fa-solid fa-plus"></i>Add</button>
    </div>
   
    <div class="table-container">
        <div class="table-responsive bg-white">   
              <table class="table mb-0">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Contact</th>
                    <th scope="col">Position</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody v-for="(data,index) in  staffStoreData.staff.data" :key="index">
                  <tr>
                    <!-- {{ data }} -->
                    <td>{{ data.name }}</td>
                    <td>{{ data.email }}</td>
                    <td>{{ data.contact }}</td>
                    <td>{{ data.role }}</td>
                    <td>
                        <!-- <span @click="editStaff(data,index)"><i class="fa-solid fa-edit"></i></span> -->
                        <span @click="deleteStaff(data.id)"><i class="fa-solid fa-trash"></i></span></td>
                  </tr>
                </tbody>

              </table>
        
              <div v-if="staffStoreData.staff.total > 10" class="table-pagination">  
                <div>
                    <button @click="paginate(staffStoreData.staff.current_page + 1)" v-if="staffStoreData.staff.next_page_url" ><i class="fa fa-angle-right"></i></button>
                    <button @click="paginate(staffStoreData.staff.current_page - 1)" v-if="staffStoreData.staff.prev_page_url"><i class="fa fa-angle-left"></i></button>
                </div>
                <div >
                    <span> Page {{ staffStoreData.staff.current_page  }} - {{ staffStoreData.staff.last_page }} </span>
                </div>
                
              </div>
        </div>
    </div>

    <!-- MODAL -->
    <div class="add-staff" v-if="staffDialog">
        <div class="form-container">
            <div class="staff-form">
                <div class="form-input">
                    <h2 v-if="!updateStaff"><i class="fa-solid fa-plus"></i> Add Staff</h2>
                    <h2 v-else> <i class="fa-solid fa-edit"></i> Update Staff</h2>
                <div class="alert alert-danger d-flex flex-column" role="alert"  v-if="staffStoreData.staffValidation.error">
                    <span v-html="staffStoreData.staffValidation.error.name"></span>
                    <span v-html="staffStoreData.staffValidation.error.email"></span>
                    <span v-html="staffStoreData.staffValidation.error.password"></span>
                    <span v-html="staffStoreData.staffValidation.error.contact"></span>
                </div>
                <form @submit.prevent="addStaffUser">
                   
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" class="form-control" v-model="staffData.email" autocomplete="off">
                    <span  class="text-danger fs-12"></span>
                </div>
                <div class="form-group" v-if="!updateStaff">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" v-model="staffData.password" autocomplete="off">
                    <span  class="text-danger"></span>
                </div>
                <div class="form-group" v-if="!updateStaff">
                    <label for="confirm_password">Confirmed Password</label>
                    <input type="password" class="form-control" v-model="staffData.password_confirmation" autocomplete="off">
                    <span  class="text-danger"></span>
                </div>
                <div class="form-group">
                    <label for="name">Full Name</label>
                    <input type="text" class="form-control" v-model="staffData.name" autocomplete="off">
                    <span  class="text-danger"></span>
                </div>
               
                <div class="form-group">
                    <label for="name">Contact Number</label>
                    <input type="text" class="form-control" v-model="staffData.contact" autocomplete="off" >
                    <span  class="text-danger"></span>
                </div>
               
                <button type="submit" class="btn btn-primary">Create</button>
                <button type="button" class="btn btn-danger" @click="closeDialog">Cancel</button>
              </form>
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
    padding: 0.55rem !important;
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
    padding: 15px;
    border-radius: 10px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
</style>
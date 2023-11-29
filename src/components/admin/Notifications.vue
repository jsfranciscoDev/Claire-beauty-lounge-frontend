<script setup>
import { reactive, ref, onMounted } from "vue";
import { store } from "../../store/product";
import Swal from 'sweetalert2';

const product = store();

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

const sendNotificationData = () => {
    Swal.fire({
    title: '',
    text: "Are you sure do you want to update the notification?",
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Update it!'
  }).then((result) => {
    if (result.isConfirmed) {
        product.sendNotification();
    }
  })
}

onMounted(() => {
    product.getNotification();
})

</script>

<template>
    <div class="admin-component-header">
        <h2><i class="fa fa-cog"></i> Manage Notifications</h2>
    </div>
    <div class="table-container">
        <div class="table-responsive bg-white pb-3 pt-3">   
            <div class="row">
                <div class="col-12 col-md-6 col-lg-6">
                    <span><b>Set the email you want to receieved a notification of appointments updates.</b></span>
                 
                    <div class="alert alert-danger d-flex flex-column" role="alert" v-if="product.error" >
                        <span v-html="product.error"></span>
                    </div>

                    <div class="mt-1">
                        <div class="form-group">
                            <label >Email:</label>
                            <input type="email" class="form-control"  v-model="product.notification_details.email" placeholder="Email" autocomplete="off" required>
                            <span class="text-danger fs-12"></span>
                        </div>

                    </div>
                    <button @click="sendNotificationData()" type="button">Update Notifcations</button>
                    
                </div>
              
            </div>
        </div>
    </div>
</template>


<style>
.upload-icon{
    background-color: rgb(0, 0, 0);
    padding: 5px;
    border-radius: 5px;
}

.upload-icon i {
    font-size: 15px;
    color: azure;
}

.upload-icon i span{
    font-size: 14px;
    margin: 5px;
}

.preview-image{
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
}
.upload-image{
    display: flex;
    justify-items: center;
    align-items: center;
    flex-direction: column;
}
</style>
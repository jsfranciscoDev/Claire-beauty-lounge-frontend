<script setup>
import { reactive, ref, onMounted } from "vue";
import { store } from "../../store/product";

const notificaton = store();

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
   
}

onMounted(() => {
    notificaton.notificatonData();
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
                    <span>Set the minimum quantity and mobile number to receive a notification if the product is low in stock.</span>
                 
                    <div class="alert alert-danger d-flex flex-column" role="alert" v-if="notificaton.error" >
                        <span v-html="notificaton.error"></span>
                    </div>

                    <div class="mt-1">
                        <div class="form-group">
                           
                            <label >Set Item Quantity:</label>
                            <input type="text" class="form-control" v-model="notificaton.notification_details.quantity" placeholder="Quantity" autocomplete="off"  @keypress="isNumber($event)" required>
                            <span class="text-danger fs-12"></span>
                        </div>

                        <div class="form-group">
                            <label >Contact Number:</label>
                            <input type="text" class="form-control"  v-model="notificaton.notification_details.mobile_number" placeholder="Phone Number" autocomplete="off" @keypress="isNumber($event)" maxlength="11" required>
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
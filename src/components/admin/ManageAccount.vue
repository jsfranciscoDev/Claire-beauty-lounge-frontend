<script setup>
import { reactive, ref, onMounted } from "vue";
import CryptoJS from 'crypto-js';

import { store } from "../../store/index";
const userData = store();

const role = localStorage.getItem('role');
const roleBytes = CryptoJS.AES.decrypt(role, 'role');
const userRole = roleBytes.toString(CryptoJS.enc.Utf8);


const changePassword = ref(false);
const preview = ref(null);

const backendbaseURL = import.meta.env.VITE_APP_BASE_URL;
console.log(backendbaseURL);
const toggleAction = () => {
    changePassword.value = !changePassword.value;
}

const previewImage = (event) => {
    const file = event.target.files[0];
    if (file && (file.type.startsWith('image/png') || file.type.startsWith('image/jpeg'))) {
        preview.value = URL.createObjectURL(file);

        const reader = new FileReader();
        reader.onload = () => {
            const base64String = reader.result.split(',')[1];
            const mimeType = file.type; // Use the actual MIME type of the file
            const dataURL = `data:${mimeType};base64,${base64String}`;
            userData.uploadPhoto(dataURL);
        };
        reader.readAsDataURL(file);
    } else {
        file.value = null;
        preview.value = null;
    }
}

const handleClick = () => {
  document.getElementById('my-file').click();
};

onMounted(() => {
  userData.fetchUser();
})

</script>

<template>
    <div class="admin-component-header">
        <h2><i class="fa fa-cog"></i> Manage Account</h2>
     
    </div>
    <div class="table-container">
        <div class="table-responsive bg-white">   
            <div class="row">
                <div class="col-12 col-md-6 col-lg-6">
                    <h4>Change Password</h4>
                    <div class="mt-2">
                        <div class="form-group">
                            <label for="username">Old Password:</label>
                            <input type="text" class="form-control" placeholder="Enter Old Password">
                            <span class="text-danger fs-12"></span>
                        </div>

                        <div class="form-group">
                            <label for="username">New Password:</label>
                            <input type="text" class="form-control" placeholder="Enter New Password">
                            <span class="text-danger fs-12"></span>
                        </div>

                        <div class="form-group">
                            <label for="username">Confirm Password:</label>
                            <input type="text" class="form-control" placeholder="Enter Confirm Password">
                            <span class="text-danger fs-12"></span>
                        </div>
                    </div>
                    <button @click="toggleAction">Change Password</button>
                    
                </div>
                <div class="col-12 col-md-6 col-lg-6">
                   
                    <div class="upload-image h-100">
                        <div class="form-group">
                            <div class="p-2">
                              
                                <div v-if="backendbaseURL+userData.user_profile">
                                    <img :src="backendbaseURL+userData.user_profile" class="img-fluid preview-image" />
                                </div>
                                <div v-else>
                                    <img src="/images/profile.png" class="img-fluid preview-image" />
                                </div>
                             </div>
                            <center class="mt-3">
                                <label for="my-file" class="upload-icon">
                                    <i class="fa fa-upload" aria-hidden="true"><span class="button">Upload Photo</span></i>
                                </label>
                            </center>
                         
                            <input type="file"  accept="image/jpeg, image/png" @change="previewImage" class="form-control-file" id="my-file" hidden>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="table-container  mt-5">
        <div class="table-responsive bg-white">   
            <div class="row">
                <div class="col-12 col-md-6 col-lg-6">
                    <h4>User Details</h4>
                    <div class="mt-2">
                        <div class="form-group">
                        <label for="username">Username:</label>
                        <input type="text" class="form-control" placeholder="Enter username">
                        <span class="text-danger fs-12"></span>
                    </div>
                    <div class="form-group">
                        <label for="username">Full Name:</label>
                        <input type="text" class="form-control" placeholder="Enter Full Name">
                        <span class="text-danger fs-12"></span>
                    </div>

                    <div class="form-group">
                        <label for="username">Contact Number:</label>
                        <input type="text" class="form-control" placeholder="Enter Number">
                        <span class="text-danger fs-12"></span>
                    </div>
                    </div>
                   
                    <button type="button" @click="staffDialog = true">Update</button>
                </div>
                <div class="col-12 col-md-6 col-lg-6" v-if="userRole == 'staff'">
                    <h4>Staff Expertise</h4>
                    <div class="form-group">
                        <label for="username">Skills:</label>
                        <textarea class="form-control" style="resize: none;" rows="3"></textarea>
                        <span class="text-danger fs-12"></span>
                    </div>
                    <div class="form-group">
                        <label for="username">Short Bio:</label>
                        <textarea class="form-control"  style="resize: none;" rows="2"></textarea>
                        <span class="text-danger fs-12"></span>
                    </div>
                  
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
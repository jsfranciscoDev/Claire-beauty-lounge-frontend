<script setup>
import { reactive, ref } from "vue";


const changePassword = ref(false);
const preview = ref(null);
const image = ref(null);

const toggleAction = () => {
    changePassword.value = !changePassword.value;
}

const previewImage = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        preview.value = URL.createObjectURL(file);
        const reader = new FileReader();
        reader.onload = () => {
            const base64String = reader.result.split(',')[1];
            const mimeType = 'image/jpeg'; // Change this to the actual image MIME type
            const dataURL = `data:${mimeType};base64,${base64String}`;

            console.log(dataURL);
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

</script>

<template>
    <div class="admin-component-header">
        <h2><i class="fa fa-cog"></i> Manage Account</h2>
        <button type="button" @click="staffDialog = true">Save</button>
    </div>

    <div class="table-container">
        <div class="table-responsive bg-white">   
            <div class="row">
                <div class="col-12 col-md-6 col-lg-6">
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

                 
                    <div v-if="changePassword">
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
                    <form class="upload-image">
                        <div class="form-group">
                            <center>
                                <label for="my-file" class="upload-icon">
                                    <i class="fa fa-upload" aria-hidden="true"><span>Upload Photo</span></i>
                                </label>
                            </center>
                         
                            <input type="file" accept="image/*" @change="previewImage" class="form-control-file" id="my-file" hidden>

                    
                        <div class="p-2 mt-3">
                            <div v-if="preview">
                                <img :src="preview" class="img-fluid preview-image" />
                            </div>
                            <div v-else>
                                <img src="/images/profile.png" class="img-fluid preview-image" />
                            </div>
                        </div>
                        </div>
                    </form>
   
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
    max-width: 200px;
    height:  200px;
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
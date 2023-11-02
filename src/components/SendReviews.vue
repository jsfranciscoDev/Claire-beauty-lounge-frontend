<script setup>
import { reactive, ref, onMounted } from "vue";
import CryptoJS from 'crypto-js';
import footerSection from "../components/footer.vue";
import navBar from "../components/nav.vue";
import banner from "../components/banner.vue";
import Swal from 'sweetalert2';
import { store } from "../store/index";
const userData = store();

const selected = ref(0);

const rate = (rating) => {
  selected.value = rating;
  // You can emit this value to the parent component or handle it as per your application logic.
};


const role = sessionStorage.getItem('role');
const roleBytes = CryptoJS.AES.decrypt(role, 'role');
const userRole = roleBytes.toString(CryptoJS.enc.Utf8);

const preview = ref(null);

const backendbaseURL = import.meta.env.VITE_APP_BASE_URL;


const previewImage = (event) => {
    const file = event.target.files[0];
    if (file && (file.type.startsWith('image/png') || file.type.startsWith('image/jpeg'))) {
        preview.value = URL.createObjectURL(file);
    } else {
        preview.value = null;
    }

    if (file && (file.type.startsWith('image/png') || file.type.startsWith('image/jpeg'))) {
        preview.value = URL.createObjectURL(file);

        const reader = new FileReader();
        reader.onload = () => {
            const base64String = reader.result.split(',')[1];
            const mimeType = file.type; // Use the actual MIME type of the file
            const dataURL = `data:${mimeType};base64,${base64String}`;
            userData.reviews.image = dataURL;
        };
        console.log(userData.reviews.image);
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

const sendReviews = () => {
    userData.reviews.start_rating = selected.value;
    if(userRole == 'user'){
        Swal.fire({
            title: 'Send this feedback?',
            text: "",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Yes!`
        }).then((result) => {
            if (result.isConfirmed) {
                userData.sendUserReviews().then(e=>{
                    console.log(e);
                    if(e.data.status =="success"){
                        Swal.fire({
                            title: e.data.status,
                            text: e.data.message,
                            icon: 'success',
                        })
                    }
                });
            }
        })
    }else{
        Swal.fire({
            title: 'Ooh no?',
            text: "Only users with privileges can send feedback.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Yes!`
        }).then((result) => {
            if (result.isConfirmed) {
            
            }
        })
    }
}



</script>

<template>

<navBar />
<banner page_header="Leave us Review" />

    <div class="container pb-5 pt-5">
        <div class="admin-component-header">
    </div>
    <div class="table-container">
        <div class="table-responsive bg-white pb-3 pt-3">   
            <div class="row">
                <div class="col-12 col-md-6 col-lg-6">
                    
                    <h6>Give us feedback</h6>
                    <p>What do you think about our services.</p>
                    <div class="star-rating">
                        <span v-for="index in 5" :key="index" @click="rate(index)" :class="{'filled': index <= selected}">
                        ★
                        </span>
                    </div>
                    
                    <div class="mt-1">
                        <div class="form-group">
                            <label for="username">Do you have any thoughts you'd like to share?</label>
                            <textarea class="form-control" v-model="userData.reviews.comment" rows="5" cols="50" required></textarea>
                            <span class="text-danger fs-12"></span>
                        </div>
                    </div>
                    <button @click="sendReviews()" type="button">Send Reviews</button>
                    
                </div>
                <div class="col-12 col-md-6 col-lg-6">
                   
                    <div class="upload-image h-100">
                        <div class="form-group">
                            <div class="p-2">
                                  <!-- Image preview -->
                                <div v-if="preview">
                                    <img :src="preview" class="img-fluid preview-image-review" />
                                </div>

                                <div v-else>
                                    <img src="/images/profile.png" class="img-fluid preview-image-review" />
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
    </div>
    <footerSection></footerSection>
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

.preview-image-review{
    width: 300px;
    height:300px;
    object-fit: cover;
    margin: 10px;
}
.upload-image{
    display: flex;
    justify-items: center;
    align-items: center;
    flex-direction: column;
}

.star-rating {
  font-size: 34px;
}

.star-rating span {
  cursor: pointer;
}

.star-rating .filled {
  color: gold;
}

</style>
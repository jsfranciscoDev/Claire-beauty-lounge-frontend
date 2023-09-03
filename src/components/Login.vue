<script setup>
import { reactive } from "vue";
import { store } from "../store/index";
import { useRouter } from 'vue-router';

const userLogin = store();

const user = reactive({
  email: null,
  password: null,
});

const router = useRouter(); // Move this line here

const handleSubmit = async (event) => {
  event.preventDefault();
  await userLogin.login(user); 
  const auth = localStorage.getItem('authenticated');
  if (auth) {
    router.push('/admin');
  }

};
</script>

<template>

    <div class="row vh-100">
      <div class="col-md-6" :style="{ backgroundImage: 'url(/images/image_1.png)' }">

      </div>
      <div class="col-md-6 login-form d-flex align-items-center justify-content-center">
        <div class="row align-items-center justify-content-center">
            <div class="form-input">
            <form @submit.prevent="handleSubmit" >
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" class="form-control" v-model="user.email" placeholder="Enter username">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" v-model="user.password" placeholder="Enter password">
            </div>
            <button type="submit" class="btn login-btn">Login</button>
        </form>
        </div>
        </div>
    
       
      </div>
     
    </div>

</template>

<style>

</style>


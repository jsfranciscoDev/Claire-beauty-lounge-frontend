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
  await userLogin.login(user); // Wait for login to complete

  console.log('auth' + userLogin.isAuthenticated);
  if (userLogin.isAuthenticated) {
    router.push('/admin');
  }
};
</script>

<template>
 <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <form @submit.prevent="handleSubmit" >
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" class="form-control" v-model="user.email" placeholder="Enter username">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" v-model="user.password" placeholder="Enter password">
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style>

</style>


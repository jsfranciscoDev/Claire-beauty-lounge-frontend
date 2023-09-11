<script setup>
import { reactive, ref } from "vue";
import { store } from "../store/index";
import { useRouter } from 'vue-router';


const userData = store();

const user = reactive({
  email: null,
  password: null,
  name: null,
  password_confirmation: null,
  role_id: 3,
});

const resgisterAction = ref(true);
const accountCreated = ref(false);

const toggleAction = () => {
  resgisterAction.value = !resgisterAction.value;
  clearErrorMessage();
}

const router = useRouter(); 

const LoginAccount = async (event) => {
  event.preventDefault();
 
 clearErrorMessage();
  await userData.login(user); 
  const auth = localStorage.getItem('session');
  if (auth) {
    router.push('/admin');
  }

};

const registerAccount = async (event) => {
  event.preventDefault();
  clearErrorMessage();
  await userData.register(user);  
  if(userData.registerMessage == 'success'){
    toggleAction();
    accountCreated.value = true 
  }
};

const login = () => {
  setTimeout(() => {
    window.location.reload();
  }, 1000); 
}

const clearErrorMessage = () => {
  userData.user.error = ''
  userData.user.errorWarning = ''
  accountCreated.value = false;
}

</script>

<template>
    
    <div class="row vh-100">
      <div class="col-md-6 pl-0" >
        <img src="../assets//images/about.jpg" alt="Salon" class="h-100" />
      </div>
      <div class="col-md-6 login-form d-flex align-items-center justify-content-center">
        <div class="row align-items-center justify-content-center" v-if="resgisterAction">
            <div class="form-input">
           
              <div class="alert alert-danger" role="alert" v-if="userData.user.errorWarning">
                {{ userData.user.errorWarning }}
              </div>
              <div class="alert alert-info" role="info" v-if="accountCreated">
                Account has been successfully created.
              </div>
              <h2>Claire Beauty Lounge</h2>
                <form @submit.prevent="LoginAccount">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" class="form-control" v-model="user.email" placeholder="Enter username">
                    <span v-if="userData.user.error" v-html="userData.user.error.email" class="text-danger fs-12"></span>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" v-model="user.password" placeholder="Enter password">
                    <span v-if="userData.user.error" v-html="userData.user.error.password" class="text-danger fs-12"></span>
                </div>
                <button type="submit" class="btn login-btn mb-2" @click="login">Login</button>
                <span class="">Doesn't have an account yet?</span> <span class="register-btn" @click="toggleAction">Register here!</span>
              </form>
        </div>
        </div>
        <div class="row align-items-center justify-content-center" v-else>
            <div class="form-input">
              <h2>Create Account</h2>
                <form @submit.prevent="registerAccount">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" class="form-control" v-model="user.email" placeholder="Enter your username">
                    <span v-if="userData.user.error" v-html="userData.user.error.email" class="text-danger fs-12"></span>
                </div>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" v-model="user.name" placeholder="Enter your name">
                    <span v-if="userData.user.error" v-html="userData.user.error.name" class="text-danger"></span>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" v-model="user.password" placeholder="Enter your password">
                    <span v-if="userData.user.error" v-html="userData.user.error.password" class="text-danger"></span>
                </div>
                <div class="form-group">
                    <label for="confirm_password">Confirmed Password</label>
                    <input type="password" class="form-control" v-model="user.password_confirmation" placeholder="Confirmed Password">
                    <span v-if="userData.user.error" v-html="userData.user.error.password_confirmation" class="text-danger"></span>
                </div>
               
                <button type="submit" class="btn login-btn mb-2">Login</button>
                <span class="">Do you already have an account?</span> <span class="register-btn" @click="toggleAction">Sign in here!</span>
              </form>
            </div>
        </div>

      </div>
    </div>
</template>

<style>

</style>


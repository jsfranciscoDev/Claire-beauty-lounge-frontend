<script setup>
import { reactive, ref, onMounted, onBeforeMount  } from "vue";
import { store } from "../store/index";
import { useRouter } from 'vue-router';
import navBar from '../components/nav.vue'

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
const verification = ref(false);
const selectedServices = ref('');
const selectedStaff = ref('');

const countdownMinutes = 3;
const countdownTime = ref(countdownMinutes * 60);
let countdownInterval;

const oneTimePassword = ref(['', '', '', '', '', '']);

const toggleAction = () => {
  resgisterAction.value = !resgisterAction.value;
  clearErrorMessage();
}

const router = useRouter(); 

const LoginAccount = async (event) => {
  event.preventDefault();
 
 clearErrorMessage();
  await userData.login(user); 
  const auth = sessionStorage.getItem('session');
  if (auth) {
    router.push('/admin/dashboard');
  }

};

const sendOtp = () => {
  verification.value = true
  userData.sendOtp(user.contact)
  countdownInterval = setInterval(() => {
    countdownTime.value -= 1;
    if (countdownTime.value <= 0) {
      clearInterval(countdownInterval);

      // Perform any action you want after the countdown ends
    }
  }, 1000);
  setTimeout(() => {
    verification.value = false;
    clearInterval(countdownInterval);
    countdownTime.value = countdownMinutes * 60;
  }, 180000);
}

const registerAccount = async (event) => {
  event.preventDefault();
  sendOtp();
  clearErrorMessage();
};

const login = () => {
  setTimeout(() => {
    // window.location.reload();
  }, 1000); 
}

const sendVerification = () => {
  const userOtp = oneTimePassword.value.join('');
  userData.submitUserOtp(userOtp).then(e => {
    if(e == 'verified'){
      verification.value = false
      userData.register(user);  
      if(userData.registerMessage == 'success'){
        toggleAction();
        accountCreated.value = true 
      }
      clearInterval(countdownInterval);
      countdownTime.value = countdownMinutes * 60;
    }
  });;
}

const clearErrorMessage = () => {
  userData.user.error = ''
  userData.user.errorWarning = ''
  accountCreated.value = false;
}

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

</script>

<template>
    <navBar/>
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
            <div class="form-input" v-if="!verification">
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
               
                <div class="form-group">
                    <label for="name">Contact Number</label>
                    <input type="text" class="form-control" v-model="user.contact" autocomplete="off" @keypress="isNumber($event)" maxlength="11" required>
                    <span  class="text-danger"></span>
                </div>

                <button type="submit" class="btn login-btn mb-2">Sign up</button>
                <span class="">Do you already have an account?</span> <span class="register-btn" @click="toggleAction">Sign in here!</span>
              </form>
            </div>

            <div v-else>
                <form class="form otp-form" @submit.prevent="sendVerification" > 
                <div class="title">OTP</div> 
                <div class="title">Verification Code</div> 
                <p class="message">We have sent a verification code to your mobile number</p> 
                <div class="inputs"> 
                  <input id="input1" type="text" v-model="oneTimePassword[0]" maxlength="1"> 
                  <input id="input2" type="text" v-model="oneTimePassword[1]" maxlength="1"> 
                  <input id="input3" type="text" v-model="oneTimePassword[2]" maxlength="1"> 
                  <input id="input4" type="text" v-model="oneTimePassword[3]" maxlength="1"> 
                  <input id="input5" type="text" v-model="oneTimePassword[4]" maxlength="1"> 
                  <input id="input6" type="text" v-model="oneTimePassword[5]" maxlength="1"> 
                </div> 
                <div>
                  <div class="count-down-timer">
                    <span>{{ Math.floor(countdownTime / 60) }}:</span>
                    <span>{{ countdownTime % 60 < 10 ? '0' : '' }}{{ countdownTime % 60 }}</span>
                  </div>
                

                  <div> <button class="action" type="submit">Submit OTP</button></div>
                </div>
                
              </form>
            </div>
        </div>

      </div>
    </div>
</template>

<style>

</style>


<script setup>
import { reactive, ref, onMounted, onBeforeMount, computed  } from "vue";
import { store } from "../store/index";
import { useRouter } from 'vue-router';
import navBar from '../components/nav.vue'
import Swal from 'sweetalert2';

const userData = store();

const showPassword = ref(false);
const showconfirmPassword = ref(false);

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

//OTP time
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
  userData.sendOtp(user)
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
  if(user.password_confirmation == user.password){
    userData.validateAccount(user.contact).then(response => {
      if(response.data.status == 'success'){
        sendOtp();
      }else{
        Swal.fire({
          title: 'Invalid Phone Number',
          text: response.data.message,
          icon: 'warning',
        })
      }
    });
  }else{
    Swal.fire({
      title: 'Password missmatch!',
      icon: 'warning',
    })
  }
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

const passwordType = computed(() => showPassword.value ? 'text' : 'password');
const confirmPasword = computed(() => showconfirmPassword.value ? 'text' : 'password');

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
                    <label for="username">Email</label>
                    <input type="text" class="form-control" v-model="user.email" placeholder="Enter your email">
                    <span v-if="userData.user.error" v-html="userData.user.error.email" class="text-danger fs-12"></span>
                </div>
                <div class="form-group password">
                    <label for="password">Password</label>
                    <input :type="passwordType" class="form-control" v-model="user.password" placeholder="Enter password">
                    <label class="showpassword-container">
                    <input type="checkbox" checked="checked" v-model="showPassword">
                      <svg class="eye" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path></svg>
                      <svg class="eye-slash" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"></path></svg>
                    </label>
                    <span v-if="userData.user.error" v-html="userData.user.error.password" class="text-danger fs-12"></span>
                </div>
                <button type="submit" class="btn login-btn mb-2" @click="login">Login</button>
                <span class="">Doesn't have an account yet?</span> <span class="register-btn" @click="toggleAction">Register here</span>
              </form>
              <span class="register-btn"><router-link to="/forgot-password"  style="color: black;">Forgot Password?</router-link></span>
        </div>
        </div>
        <div class="row align-items-center justify-content-center" v-else>
            <div class="form-input" v-if="!verification">
              <h2>Create Account</h2>
                <form @submit.prevent="registerAccount">
                <div class="form-group">
                    <label for="username">Email</label>
                    <input type="email" class="form-control" v-model="user.email" placeholder="Enter your email">
                    <span v-if="userData.user.error" v-html="userData.user.error.email" class="text-danger fs-12"></span>
                </div>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" v-model="user.name" placeholder="Enter your name">
                    <span v-if="userData.user.error" v-html="userData.user.error.name" class="text-danger"></span>
                </div>

                <div class="form-group password">
                    <label for="password">Password</label>
                    <input :type="passwordType" class="form-control" v-model="user.password" placeholder="Enter password">
                    <label class="showpassword-container">
                    <input type="checkbox" checked="checked" v-model="showPassword">
                      <svg class="eye" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path></svg>
                      <svg class="eye-slash" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"></path></svg>
                    </label>
                    <span v-if="userData.user.error" v-html="userData.user.error.password" class="text-danger fs-12"></span>
                </div>

                <div class="form-group password">
                    <label for="confirm-password">Confirm Password</label>
                    <input :type="confirmPasword" class="form-control" v-model="user.password_confirmation" placeholder="Confirm password">
                    <label class="confirm-showpassword-container">
                    <input type="checkbox" checked="checked" v-model="showconfirmPassword">
                      <svg class="eye" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path></svg>
                      <svg class="eye-slash" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"></path></svg>
                    </label>
                    <span v-if="userData.user.error" v-html="userData.user.error.password_confirmation" class="text-danger fs-12"></span>
                </div>
               
                <div class="form-group">
                    <label for="name">Contact Number</label>
                    <input type="text" class="form-control" v-model="user.contact" autocomplete="off" @keypress="isNumber($event)" maxlength="11" placeholder="Enter Phone Number" required>
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
                <p class="message">We have sent a verification code to your mobile number and email address.</p> 
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
/*------ Settings ------*/
.password{
  position: relative;
}

.showpassword-container {
  --color: #a5a5b0;
  --size: 30px;
  display: flex;
  justify-content: start;
  align-items: center;
  position: absolute;
  cursor: pointer;
  font-size: var(--size);
  user-select: none;
  fill: var(--color);
  top: 50px;
  right: 30px;
}

.showpassword-container .eye {
  position: absolute;
  animation: keyframes-fill .5s;
}

.showpassword-container .eye-slash {
  position: absolute;
  animation: keyframes-fill .5s;
  display: none;
}

/* ------ On check event ------ */
.showpassword-container input:checked ~ .eye {
  display: none;
}

.showpassword-container input:checked ~ .eye-slash {
  display: block;
}

/* ------ Hide the default checkbox ------ */
.showpassword-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}


.confirm-password{
  position: relative;
}

.confirm-showpassword-container {
  --color: #a5a5b0;
  --size: 30px;
  display: flex;
  justify-content: start;
  align-items: center;
  position: absolute;
  cursor: pointer;
  font-size: var(--size);
  user-select: none;
  fill: var(--color);
  top: 50px;
  right: 30px;
}

.confirm-showpassword-container .eye {
  position: absolute;
  animation: keyframes-fill .5s;
}

.confirm-showpassword-container .eye-slash {
  position: absolute;
  animation: keyframes-fill .5s;
  display: none;
}

/* ------ On check event ------ */
.confirm-showpassword-container input:checked ~ .eye {
  display: none;
}

.confirm-showpassword-container input:checked ~ .eye-slash {
  display: block;
}

/* ------ Hide the default checkbox ------ */
.confirm-showpassword-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* ------ Animation ------ */
@keyframes keyframes-fill {
  0% {
    transform: scale(0);
    opacity: 0;
  }

  50% {
    transform: scale(1.2);
  }
}
</style>


import user from "../api/component/user.js";
import staff from "../api/component/staff.js"
import { defineStore } from 'pinia';
import CryptoJS from 'crypto-js';
import Swal from 'sweetalert2';

export const store = defineStore({
  id: 'store',
  state: () => ({
    user: [{
      error: [],
      errorWarning:[],
      registerMessage: '',
    }],
    user_password: {
      new_password: '',
      current_password: '',
      password_confirmation: '',
      error: '',
    },
    user_details:{},
    user_profile: '',
    services: [],
    products: [],
    staff: [],
    staffValidation: [],
    role: null,
    session: true,
    timeInButtonAction: '',
  }),
  actions: {
    async login(payload) {
      try {
        const response = await user.login(payload);
      
        if (response.data.message == 'success') {
            localStorage.setItem("token", response.data.token);
            this.session = true;
            const authValue =  'true';
            const roleValue =   response.data.role;

            const encryptedRoleValue = CryptoJS.AES.encrypt(roleValue, 'role').toString();
            localStorage.setItem('role', encryptedRoleValue);

            const encryptedValue = CryptoJS.AES.encrypt(authValue, 'session').toString();
        
            localStorage.setItem('session', encryptedValue);

            const test = localStorage.getItem('session');
            const bytes = CryptoJS.AES.decrypt(test, 'session');
            const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
           
        }
       
      } catch (error) {
        if(error.response.data.message == 'Invalid Creds!'){
          this.user.errorWarning = 'The username or password you entered is incorrect.';
        }
        else{
          this.user.error = error.response.data.errors;
        }
      }
    },
    async register(payload) {
      try {
        const response = await user.register(payload);
        if (response.data.message == 'success') {
            this.registerMessage = response.data.message
            localStorage.setItem("token", response.data.token);
            localStorage.setItem('authenticated', true)
        }
      } catch (error) {
        this.user.error = error.response.data.errors;
      }
    },
    async logout() {
      try {
        const response = await user.logout();
          localStorage.setItem('role', '');
          localStorage.setItem('authenticated', '');
          localStorage.setItem('token', '');
          localStorage.setItem('session', '');
          this.role = null;       
          window.location.reload();
      } catch (error) {
        this.user.error = error.response.data.errors;
      }
    },
    async userRole(payload) {
      try {
        await user.userRole(payload).then(response => {
          this.role = response.data
        });
    
      } catch (error) {
        this.user.error = error.response.data.errors;
      }
    },
    async createStaff(payload) {
      try {
        const response = await staff.createStaff(payload);
          if(response.data.message == 'success'){
            return response;
          }
      } catch (error) {
        this.staffValidation.error = error.response.data.errors;
      }
    },
    async getUserStaff(page) {
      try {
        const response = await staff.getUserStaff(page);
          console.log(response.data.user);
          if(response.data.message == 'success'){
            this.staff = response.data.user;
            // this.staffValidation.message = response.data.message;
          }
       
      } catch (error) {
        this.staffValidation.error = error.response.data.errors;
      }
    },
    async uploadPhoto(payload) {
      try {
        const response = await user.uploadPhoto(payload);
          this.user_profile = response.data.path;
          this.fetchUser();
      } catch (error) {
        this.staffValidation.error = error.response.data.errors;
      }
    },
    async deleteUserStaff(payload) {
      const response = await staff.deleteUserStaff(payload);
      return response;
    },
    async fetchUser() {
      try {
        const response = await user.fetchUser();
          this.user_profile = response.data.profile;
          this.user_details = response.data.user;
      } catch (error) {
        this.staffValidation.error = error.response.data.errors;
      }
    },
    async changePassword(){
      try {
        const response = await user.changePassword(this.user_password);
            if(response.data.status == 'failed'){
              this.user_password.error = response.data.message;
            }else if(response.data.status == 'success'){
              this.user_password = {}
              Swal.fire({
                  title: 'Password Successfully Changed!',
                  icon: 'success',
                  confirmButtonText: 'OK'
              });
            }
      } catch (error) {
        
      }
    },
    async updateUserDetails(){
      try {
        const response = await user.updateUserDetails(this.user_details);
            if(response.data.status == 'failed'){
              this.user_password.error = response.data.message;
            }else if(response.data.status == 'success'){

              Swal.fire({
                  title: response.data.message,
                  icon: 'success',
                  confirmButtonText: 'OK'
              });
            }
      } catch (error) {
        
      }
    },
    async timeIn(user_id, time , date, action){
      try {
        const response = await user.timeIn(user_id,time,date ,action);
            if(response.data.status == 'failed'){
                Swal.fire({
                  title: response.data.message,
                  icon: 'warning',
                  confirmButtonText: 'OK'
              });
            }else if(response.data.status == 'success'){

              Swal.fire({
                  title: response.data.message,
                  icon: 'success',
                  confirmButtonText: 'OK'
              });
            }
      } catch (error) {
        
      }
    },
    async getDTR(months){
      try {
        const response = await user.getDTR(months);
           console.log(response.data.action);
           this.timeInButtonAction = response.data.action
      } catch (error) {
        
      }
    }
  },
});

import user from "../api/component/user.js";
import staff from "../api/component/staff.js"
import api from "../api/component/appointments.js"
import service from "../api/component/service.js"
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
    service_dropdown: null,
    user_appointment: null,
    staff_dropdown: null,
    otp_id: null,
    service_category_dropdown: {},
    staff_services:{},
    selected_date_appointment:{}
  }),
  actions: {
    async login(payload) {
      try {
        const response = await user.login(payload);
        if (response.data.message == 'success') {
            sessionStorage.setItem("token", response.data.token);
            this.session = true;
            const authValue =  'true';
            const roleValue =   response.data.role;
            const staffRole =   response.data.staff_role;

            const encryptedRoleValue = CryptoJS.AES.encrypt(roleValue, 'role').toString();
            sessionStorage.setItem('role', encryptedRoleValue);

            const encryptedValue = CryptoJS.AES.encrypt(authValue, 'session').toString();
        
            sessionStorage.setItem('session', encryptedValue);

            const test = sessionStorage.getItem('session');
            const bytes = CryptoJS.AES.decrypt(test, 'session');
            const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);

            if(staffRole != null){
              const encryptedRoleValue = CryptoJS.AES.encrypt(staffRole, 'staff_role').toString();
              sessionStorage.setItem('staff_role', encryptedRoleValue);
            }
           
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
            sessionStorage.setItem("token", response.data.token);
            sessionStorage.setItem('authenticated', true)
        }
      } catch (error) {
        this.user.error = error.response.data.errors;
      }
    },
    async logout() {
      try {
        const response = await user.logout();
          sessionStorage.clear();
          this.role = '';       
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
              Swal.fire({
                title: 'Staff Created Successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            return response;
          }
      } catch (error) {
        this.staffValidation.error = error.response.data.errors;
      }
    },
    async getUserStaff(page) {
      try {
        const response = await staff.getUserStaff(page);
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
    async getDTR(){
      try {
        const response = await user.getDTR();
           this.timeInButtonAction = response.data.action
      } catch (error) {
        
      }
    },
    async getServicesDropdown() {
        try {
          const response = await service.getServicesDropdown();
          this.service_dropdown = response.data
        } catch (error) {
        
        }
    },
    async sendAppointment(payload) {  
        try {
          const response = await service.sendAppointment(payload);
            if(response.data.status == 'success'){
              this.fetchAppointment();
              return response;
            }
        } catch (error) {
        
        }
    },
    async fetchAppointment() {  
        try {
          const response = await service.fetchAppointment();
            this.user_appointment = response.data.appointment;
        } catch (error) {
        
        }
    },
    async updateAppointment(data){
      try {
          const response = await api.updateAppointment(data);
          if(response.data.status){
            Swal.fire({
                title: response.data.message,
                icon: 'success',
                confirmButtonText: 'OK'
            });
           this.fetchAppointment();
          }
        } catch (error) {
          
        }
    },
    async getStaffDropdown(payload) {
        try {
          const response = await staff.getStaffDropdown(payload);
            this.staff_dropdown = response.data.staff_dropdown
        } catch (error) {
        
        }
    },
    async sendOtp(payload) {
        try {
          const response = await user.sendOtp(payload);
            this.otp_id = response.data.otp_id
        
        } catch (error) {
        
        }
    },
    async submitUserOtp(userOtp) {
      let payload = {
        otp_id: this.otp_id,
        user_otp: userOtp
      }
      try {
        const response = await user.submitUserOtp(payload);

        if(response.data.status == 'failed'){
            Swal.fire({
                title: response.data.title,
                text: response.data.message,
                icon: 'warning',
                confirmButtonText: 'OK'
            });
        }

        if(response.data.status == 'verified'){
            Swal.fire({
              title: response.data.title,
              text: response.data.message,
              icon: 'success',
              confirmButtonText: 'OK'
          });

          return response.data.status;
        }
      } catch (error) {
      
      }
  },
  async sendAppointmentOtp() {
      try {
        const response = await user.sendAppointmentOtp();
          this.otp_id = response.data.otp_id
      } catch (error) {
      
        }
    },
    async submitAppointmentOtp(userOtp) {
      let payload = {
        otp_id: this.otp_id,
        user_otp: userOtp
      }
      try {
        const response = await user.submitAppointmentOtp(payload);

        if(response.data.status == 'failed'){
            Swal.fire({
                title: response.data.title,
                text: response.data.message,
                icon: 'warning',
                confirmButtonText: 'OK'
            });
        }

        if(response.data.status == 'verified'){
            Swal.fire({
              title: response.data.title,
              text: response.data.message,
              icon: 'success',
              confirmButtonText: 'OK'
          });

          return response.data.status;
        }
      } catch (error) {
      
      }
    },
    async getServiceCategoryDropdown() {
        try {
          const response = await service.getServiceCategoryDropdown();
          this.service_category_dropdown = response.data
        } catch (error) {
        
        }
    },
    async assignedStaffServices() {
        try {
          const response = await staff.assignedStaffServices(this.staff_services);
            if(response.data.status == "success"){
              Swal.fire({
                  title: response.data.title,
                  text: response.data.message,
                  icon: 'success',
                  confirmButtonText: 'OK'
              });
              this.getUserStaff();
            }
            return response;
        } catch (error) {
        
        }
    },
    async removeStaffServices(payload) {
      const response = await staff.removeStaffServices(payload);
      if(response.data.status == 'success'){
        this.getUserStaff();
        Swal.fire({
          title: response.data.title,
          text: response.data.message,
          icon: 'success',
          confirmButtonText: 'OK'
      });
      }
      return response;
    },
    async fetchallAppointments(date,page) {  
        try {
          const response = await service.fetchallAppointments(date,page);
            this.selected_date_appointment = response.data.appointment;
        } catch (error) {
        
        }
    },
  },
});

import user from "../api/component/user.js";
import { defineStore } from 'pinia';
import CryptoJS from 'crypto-js';

export const store = defineStore({
  id: 'store',
  state: () => ({
    user: [{
      error: [],
      errorWarning:[],
      registerMessage: '',
    }],
    services: [],
    products: [],
    staff: [],
    role: null,
    session: true,
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
            this.userRole();
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
          if(response.data = 'Logged Out!'){
            localStorage.removeItem('role');
            localStorage.removeItem('authenticated');
            localStorage.removeItem('token');
            localStorage.removeItem('session');
            this.role = null;
          }
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

  },
});

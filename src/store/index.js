import user from "../api/component/user.js";
import { defineStore } from 'pinia';
import CryptoJS from 'crypto-js';

export const store = defineStore({
  id: 'store',
  state: () => ({
    user: [{
      error: [],
      errorWarning:[],
    }],
    services: [],
    products: [],
    staff: [],
    role: null,
  }),
  actions: {
    async login(payload) {
      try {
        const response = await user.login(payload);
      
        if (response.data.message == 'success') {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem('authenticated', true)
            const secretKey = 'authenticated';
            const authValue =  response.data.token;

            const encryptedValue = CryptoJS.AES.encrypt(authValue, secretKey).toString();
            console.log(encryptedValue);
            localStorage.setItem(secretKey, encryptedValue);

            
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
            localStorage.setItem("token", response.data.token);
            localStorage.setItem('authenticated', true)
        }
      } catch (error) {
        this.user.error = error.response.data.errors;
      }
    },
    async userRole(payload) {
      try {
        await user.userRole(payload).then(response => {
          this.role = response.data;
        });
    
      } catch (error) {
        this.user.error = error.response.data.errors;
      }
    },

  },
});

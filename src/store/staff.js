import staff from "../api/component/staff.js"
import { defineStore } from 'pinia';
import CryptoJS from 'crypto-js';
import Swal from 'sweetalert2';

export const store = defineStore({
  id: 'staff',
  state: () => ({
    staff: {}
  }),
  actions: {
    async getStaff() {
        try {
          const response = await staff.getStaff();
            if(response.data.message == 'success'){
                this.staff = response.data.user;
            }
        } catch (error) {
         
        }
    },
  },
});

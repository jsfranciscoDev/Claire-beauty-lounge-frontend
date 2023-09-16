import staff from "../api/component/staff.js"
import { defineStore } from 'pinia';
import CryptoJS from 'crypto-js';
import Swal from 'sweetalert2';

export const store = defineStore({
  id: 'staff',
  state: () => ({
    staff: {},
    user_records: {},
    dates: {},
    user_dropdown: {}
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
    async getUserDTR(months,user_id) {
        try {
          const response = await staff.getUserDTR(months,user_id);
          this.user_records = response.data.user_records;
        } catch (error) {
         
        }
    },
    async getUserDropdown() {
        try {
          const response = await staff.getUserDropdown();
            this.user_dropdown = response.data.user_dropdown
        } catch (error) {
         
        }
    },
  },
});

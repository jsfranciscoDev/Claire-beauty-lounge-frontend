import api from "../api/component/appointments.js"
import { defineStore } from 'pinia';
import CryptoJS from 'crypto-js';
import Swal from 'sweetalert2';

export const appointment = defineStore({
  id: 'appointment',
  state: () => ({
    data: {},
  }),
  actions: {
    async getAllappointments(page){
        try {
            const response = await api.getAllappointments(page);
            this.data = response.data.appointment
          } catch (error) {
            
          }
    }
  }
});

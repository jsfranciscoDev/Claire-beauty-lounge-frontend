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
    async getAllappointments(page,date, search){
        try {
            const response = await api.getAllappointments(page,date,search);
            this.data = response.data.appointment
          } catch (error) {
            
          }
    },
    async getStatusgappointments(page, status){
      try {
          const response = await api.getStatusgappointments(page, status);
          this.data = response.data.appointment
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
            this.getAllappointments();
          }
        } catch (error) {
          
        }
    }
  }
});

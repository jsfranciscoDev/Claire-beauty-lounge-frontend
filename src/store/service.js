import service from "../api/component/service.js"
import { defineStore } from 'pinia';
import Swal from 'sweetalert2';

export const store = defineStore({
  id: 'service',
  state: () => ({
    services:{},
  }),
  actions: {
    async createServices() {
        try {
          const response = await service.createServices(this.services);
            if(response.data.message == 'success'){
                this.services = response.data.service;
            }
        } catch (error) {
         
        }
    },
  },
});

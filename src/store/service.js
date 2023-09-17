import service from "../api/component/service.js"
import { defineStore } from 'pinia';
import Swal from 'sweetalert2';

export const store = defineStore({
  id: 'service',
  state: () => ({
    services:{},
    services_details:{}
  }),
  actions: {
    async createServices() {
        try {
          const response = await service.createServices(this.services);
            if(response.data.status == 'success'){
                this.getServices();
                Swal.fire({
                  title: response.data.message,
                  icon: 'success',
                  confirmButtonText: 'OK'
              });
              return response;

             
            }else{
              Swal.fire({
                  title: response.data.message,
                  icon: 'warning',
                  confirmButtonText: 'OK'
              });
            }
        } catch (error) {
         
        }
    },
    async getServices(page) {
      try {
        const response = await service.getServices(page);
          if(response.data.message == 'success'){
              this.services_details = response.data.services;
          }
      } catch (error) {
       
      }
    },
      async deleteService(id) {
        try {
          const response = await service.deleteService(id);
            if(response.data.message == 'success'){
                this.getServices()
            }
        } catch (error) {
        
        }
    },
  },
});

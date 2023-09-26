import service from "../api/component/service.js"
import { defineStore } from 'pinia';
import Swal from 'sweetalert2';

export const store = defineStore({
  id: 'service',
  state: () => ({
    services:{},
    services_details:{},
    services_dropdown: '',
    service_product_dropdown: '',
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
                this.getServices();
                Swal.fire({
                  title: 'Deleted Successfully!',
                  icon: 'success',
                  confirmButtonText: 'OK'
              });
            }
        } catch (error) {
        
        }
    },
    async updateServices() {
        try {
          const response = await service.updateServices(this.services);
            if(response.data.status == 'success'){
                this.getServices()
                Swal.fire({
                    title: response.data.message,
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
        
        }
    },
    async getServicesProductDropdown() {
        try {
          const response = await service.getServicesProductDropdown();
          this.service_product_dropdown = response.data
        } catch (error) {
        
        }
    },
    async attachProductsOnService(service_id, services_items){
      try {
        const response = await service.attachProductsOnService(service_id, services_items);
        if(response.data.status == 'success'){
          Swal.fire({
              title: response.data.message,
              icon: 'success',
              confirmButtonText: 'OK'
          });
          this.getServices();
        }else{
          Swal.fire({
              title: 'Add Products Failed!',
              text: response.data.message,
              icon: 'warning',
              confirmButtonText: 'OK'
          });
        }
        return response;
      } catch (error) {
      
      }
    },
    async removeAttachedProducts(id) {
        try {
          const response = await service.removeAttachedProducts(id);
            if(response.data.message == 'success'){
                this.getServices();
                Swal.fire({
                  title: 'Deleted Successfully!',
                  icon: 'success',
                  confirmButtonText: 'OK'
              });
            }
        } catch (error) {
        
        }
    },
  },
});

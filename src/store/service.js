import service from "../api/component/service.js"
import user from "../api/component/user.js"
import { defineStore } from 'pinia';
import Swal from 'sweetalert2';

export const store = defineStore({
  id: 'service',
  state: () => ({
    services:{},
    services_details:{},
    services_dropdown: '',
    service_product_dropdown: '',
    service_category: {},
    service_category_details:{},
    service_category_dropdown:{},
    service_reviews:{}
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
    async getServices(page,searchfilter) {
      try {
        const response = await service.getServices(page,searchfilter);
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
    async createServiceCategory() {
      try {
        const response = await service.createServiceCategory(this.service_category);
          if(response.data.status == 'success'){
            this.getServicesCategory();
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
  async getServicesCategory(page, searchFilter) {
    try {
      const response = await service.getServicesCategory(page, searchFilter);
        if(response.data.message == 'success'){
            this.service_category_details = response.data.services;
        }
    } catch (error) {
     
    }
  },
  async deleteServiceCategory(id) {
        try {
          const response = await service.deleteServiceCategory(id);
            if(response.data.message == 'success'){
                this.getServicesCategory();
                Swal.fire({
                  title: 'Deleted Successfully!',
                  icon: 'success',
                  confirmButtonText: 'OK'
              });
            }
        } catch (error) {
        
        }
  },
  async updateServicesCategory() {
        try {
          const response = await service.updateServicesCategory(this.service_category);
            if(response.data.status == 'success'){
              this.getServicesCategory();
                Swal.fire({
                    title: response.data.message,
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
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
    async userRole(payload) {
      try {
        const response = await user.userRole(payload);
        return response.data;
      } catch (error) {
        this.user.error = error.response.data.errors;
      }
    },
    async getReviews(page) {
        try {
          const response = await service.getReviews(page);
          this.service_reviews = response.data.reviews
        } catch (error) {
        
        }
    },
    
  },
});

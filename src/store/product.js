import product from "../api/component/product.js"
import { defineStore } from 'pinia';
import CryptoJS from 'crypto-js';
import Swal from 'sweetalert2';

export const store = defineStore({
  id: 'product',
  state: () => ({
    product: {},
    product_details: {},
    notification_details:{
        quantity: null,
        mobile_number: null,
    },
  }),
  actions: {
    async createProduct() {
        try {
          const response = await product.createProduct(this.product);
        
            if(response.data.status == 'success'){
              this.getProducts();
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
    async getProducts(page) {
      try {
        const response = await product.getProducts(page);
    
          if(response.data.message == 'success'){
              this.product_details = response.data.products;
          }
      } catch (error) {
       
      }
    },
    async deleteProduct(id) {
      try {
        const response = await product.deleteProduct(id);
          if(response.data.message == 'success'){
            this.getProducts();
            Swal.fire({
                title: 'Deleted Successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
          }
      } catch (error) {
      
      }
  }, 
    async updateProducts() {
      try {
        const response = await product.updateProducts(this.product);
          if(response.data.status == 'success'){
              Swal.fire({
                  title: response.data.message,
                  icon: 'success',
                  confirmButtonText: 'OK'
              });
              this.getProducts();
          }
      } catch (error) {
      
      }
  },
},
});

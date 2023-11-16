import axios from 'axios';
const storedToken = sessionStorage.getItem('token');
const baseURL = import.meta.env.VITE_APP_BASE_URL;

export default {
    createProduct(payload){
        return axios.post(`${baseURL}api/create-product`, payload, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    },
    getProducts(page, searchFilter){
        return axios.post(`${baseURL}api/get-products?page=${page}`, {search: searchFilter}, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    },
    deleteProduct(id){
        return axios.delete(`${baseURL}api/remove-product/${id}`, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    },
    updateProducts(data){
        return axios.put(`${baseURL}api/update-product`, data, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    },
    sendNotification(payload){
        return axios.post(`${baseURL}api/update-notifications`, payload , {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    },
    getNotification(){
        return axios.get(`${baseURL}api/get-notifications`,{
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    },
    fetchLowStocksProduct(){
        return axios.get(`${baseURL}api/get-product-lowstocks`,{
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    },
    fetchExpireStocksProduct(){
        return axios.get(`${baseURL}api/get-product-expire`,{
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    },
}
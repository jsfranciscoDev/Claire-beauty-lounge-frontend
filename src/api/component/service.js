import axios from 'axios';
const storedToken = sessionStorage.getItem('token');
const baseURL = import.meta.env.VITE_APP_BASE_URL;

export default {
    createServices(payload){
        return axios.post(`${baseURL}api/create-services`, payload, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    },
    getServices(page){
        return axios.get(`${baseURL}api/get-services?page=${page}`, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    },
    deleteService(id){
        return axios.delete(`${baseURL}api/remove-service/${id}`, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    },
    updateServices(data){
        return axios.put(`${baseURL}api/update-service`, data, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    },
    getServicesDropdown(){
        return axios.get(`${baseURL}api/get-services-dropdown`, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    },
    sendAppointment(payload){
        return axios.post(`${baseURL}api/create-appointment`, payload,{
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    },
    fetchAppointment(){
        return axios.get(`${baseURL}api/get-appointment` ,{
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    },
    getServicesProductDropdown(){
        return axios.get(`${baseURL}api/get-products-dropdown`, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    },
    attachProductsOnService(service_id,service_items){
        let payload = {
            service_id: service_id,
            service_items: service_items
        }   
        return axios.post(`${baseURL}api/attach-service-items`, payload,{
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    },
    removeAttachedProducts(id){
        return axios.post(`${baseURL}api/remove-service-items`,{id},{
            headers: {
                'Authorization': `Bearer ${storedToken}`
                }
            });
    },
    createServiceCategory(payload){
        return axios.post(`${baseURL}api/create-services-category`, payload, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    },
    getServicesCategory(page){
        return axios.get(`${baseURL}api/get-service-category?page=${page}`, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    },
    deleteServiceCategory(id){
        return axios.delete(`${baseURL}api/remove-service-category/${id}`, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    },
    updateServicesCategory(data){
        return axios.put(`${baseURL}api/update-service-category`, data, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    },
    getServiceCategoryDropdown(){
        return axios.get(`${baseURL}api/get-service-category-dropdown`, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    },
    fetchallAppointments(date,page){
        return axios.post(`${baseURL}api/get-schedule-appointment?page=${page}` , {date: date} , {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    },
    getReviews(page){
        return axios.post(`${baseURL}api/get-all-reviews?page=${page}` , {} , {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
        });
    },
    
}
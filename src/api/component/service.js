import axios from 'axios';
const storedToken = sessionStorage.getItem('token');
const baseURL = import.meta.env.VITE_APP_BASE_URL;

export default {
    createServices(payload){
        return axios.post(`${baseURL}/api/create-services`, payload, {
            headers: {
                'Authorization': `Bearer ${storedToken}`
                }
            });
    },
    getServices(page){
        return axios.get(`${baseURL}/api/get-services?page=${page}`, {
            headers: {
                'Authorization': `Bearer ${storedToken}`
                }
            });
    },
    deleteService(id){
        return axios.delete(`${baseURL}/api/remove-service/${id}`, {
            headers: {
                'Authorization': `Bearer ${storedToken}`
                }
            });
    },
    updateServices(data){
        return axios.put(`${baseURL}/api/update-service`, data, {
            headers: {
                'Authorization': `Bearer ${storedToken}`
                }
            });
    },
    getServicesDropdown(){
        return axios.get(`${baseURL}/api/get-services-dropdown`, {
            headers: {
                'Authorization': `Bearer ${storedToken}`
                }
            });
    },
    sendAppointment(payload){
        return axios.post(`${baseURL}/api/create-appointment`, payload, {
            headers: {
                'Authorization': `Bearer ${storedToken}`
                }
            });
    },
    fetchAppointment(){
        return axios.get(`${baseURL}/api/get-appointment` ,{
            headers: {
                'Authorization': `Bearer ${storedToken}`
                }
            });
    },
    getServicesProductDropdown(){
        return axios.get(`${baseURL}/api/get-products-dropdown`, {
            headers: {
                'Authorization': `Bearer ${storedToken}`
                }
            });
    },
    attachProductsOnService(service_id,service_items){
        let payload = {
            service_id: service_id,
            service_items: service_items
        }   
        return axios.post(`${baseURL}/api/attach-service-items`, payload,{
            headers: {
                'Authorization': `Bearer ${storedToken}`
                }
            });
    },
    removeAttachedProducts(id){
        return axios.delete(`${baseURL}/api/remove-service-items/${id}`,{
            headers: {
                'Authorization': `Bearer ${storedToken}`
                }
            });
    }
}
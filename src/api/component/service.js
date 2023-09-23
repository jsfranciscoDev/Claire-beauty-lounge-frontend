import api from '../api'

export default {
    createServices(payload){
        return api.post('/api/create-services', payload);
    },
    getServices(page){
        return api.get(`/api/get-services?page=${page}`);
    },
    deleteService(id){
        return api.delete(`/api/remove-service/${id}`);
    },
    updateServices(data){
        return api.put('/api/update-service', data);
    },
    getServicesDropdown(){
        return api.get('/api/get-services-dropdown');
    },
    sendAppointment(payload){
        return api.post('/api/create-appointment', payload);
    },
    fetchAppointment(){
        return api.get('/api/get-appointment');
    }
}
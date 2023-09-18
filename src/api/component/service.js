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
    }
}
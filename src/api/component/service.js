import api from '../api'

export default {
    createServices(payload){
        return api.post('/api/create-services', payload);
    },
}
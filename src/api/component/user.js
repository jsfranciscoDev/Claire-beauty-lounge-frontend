import api from '../api'

export default {
    login(payload){
        return api.post('/api/login', payload);
    },
}
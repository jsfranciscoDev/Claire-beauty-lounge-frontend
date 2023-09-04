import api from '../api'

export default {
    login(payload){
        return api.post('/api/login', payload);
    },
    register(payload){
        return api.post('/api/register', payload);
    },
    userRole(){
        return api.get('/api/user-role');
    },
}
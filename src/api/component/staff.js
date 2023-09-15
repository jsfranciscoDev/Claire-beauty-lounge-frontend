import api from '../api'

export default {
    createStaff(payload){
        return api.post('/api/create-staff', payload);
    },
    getUserStaff(page){
        return api.get(`/api/get-staff?page=${page}`);
    },
    deleteUserStaff(payload){
        return api.delete(`/api/remove-staff/${payload}`);
    },
    getStaff(){
        return api.get('/api/get-staff');
    }
}
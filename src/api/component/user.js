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
    logout(){
        return api.post('/api/logout');
    },
    uploadPhoto(payload){
        return api.post('/api/upload-photo', {file: payload});
    },
    fetchUser(){
        return api.get('/api/get-user');
    },
    changePassword(payload){
        return api.post('/api/change-password', {payload});
    },
    updateUserDetails(payload){
        return api.post('/api/update-user', payload);
    }
}
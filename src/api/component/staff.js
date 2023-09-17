import api from '../api'

export default {
    createStaff(payload){
        return api.post('/api/create-staff', payload);
    },
    getUserStaff(page){
        return api.get(`/api/get-staffs?page=${page}`);
    },
    deleteUserStaff(payload){
        return api.delete(`/api/remove-staff/${payload}`);
    },
    getStaff(){
        return api.get('/api/get-staff');
    },
    getUserDTR(months,user_id){
        return api.post('/api/get-user-dtr', {months: months, user_id: user_id});
    },
    getUserDropdown(){
        return api.get('/api/user-dropdown');
    }
}
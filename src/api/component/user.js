import axios from 'axios';
const storedToken = sessionStorage.getItem('token');
const baseURL = import.meta.env.VITE_APP_BASE_URL;

export default {
    login(payload){
        return axios.post(`${baseURL}/api/login`, payload);
    },
    register(payload){
        return axios.post(`${baseURL}/api/register`, payload);
    },
    userRole(){
        // return api.get('/api/user-role');
        return axios.get(`${baseURL}/api/user-role`, {
            headers: {
                'Authorization': `Bearer ${storedToken}`
                }
            });
    },
    logout(){
        // return api.post('/api/logout');
        return axios.post(`${baseURL}/api/logout`, {
            headers: {
                'Authorization': `Bearer ${storedToken}`
                }
            });
    },
    uploadPhoto(payload){
        // return api.post('/api/upload-photo', {file: payload});
        return axios.post(`${baseURL}/api/upload-photo`, {file: payload}, {
            headers: {
                'Authorization': `Bearer ${storedToken}`
            }
        });        
    },
    fetchUser(){
        // return api.get('/api/get-user');
        return axios.get(`${baseURL}/api/get-user`, {
            headers: {
                'Authorization': `Bearer ${storedToken}`
                }
            });
    },
    changePassword(payload){
        return axios.post(`${baseURL}/api/change-password`, {payload}, {
            headers: {
                'Authorization': `Bearer ${storedToken}`
                }
            });
    },
    updateUserDetails(payload){
        return axios.post(`${baseURL}/api/update-user`, payload, {
            headers: {
                'Authorization': `Bearer ${storedToken}`
                }
            });
    },
    timeIn(user_id,time,date,action){
        return axios.post(`${baseURL}/api/user-time-in`, {user_id,time,date,action}, {
            headers: {
                'Authorization': `Bearer ${storedToken}`
                }
            });
    },
    getDTR(){
        return axios.get(`${baseURL}/api/get-user-records`,{
            headers: {
                'Authorization': `Bearer ${storedToken}`
                }
            });
    },
    sendOtp(mobile_num){
        return axios.post(`${baseURL}/api/get-otp`, {mobile_num},{
            headers: {
                'Authorization': `Bearer ${storedToken}`
                }
            });
    },
    submitUserOtp(payload){
        return axios.post(`${baseURL}/api/submit-user-otp`, payload,{
            headers: {
                'Authorization': `Bearer ${storedToken}`
                }
            });
    },
    sendAppointmentOtp(){
        return axios.post(`${baseURL}/api/appointment-otp`,{
            headers: {
                'Authorization': `Bearer ${storedToken}`
                }
            });
    },
    submitAppointmentOtp(payload){
        return axios.post(`${baseURL}/api/submit-appointment-otp`, payload,{
            headers: {
                'Authorization': `Bearer ${storedToken}`
                }
            });
    },
}
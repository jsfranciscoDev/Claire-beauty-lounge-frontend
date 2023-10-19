import axios from 'axios';
const storedToken = sessionStorage.getItem('token');
const baseURL = import.meta.env.VITE_APP_BASE_URL;

export default {
    createStaff(payload){
        return axios.post(`${baseURL}/api/create-staff`, payload,{
            headers: {
                'Authorization': `Bearer ${storedToken}`
                }
            });
    },
    getUserStaff(page){
        return axios.get(`${baseURL}/api/get-staffs?page=${page}`,{
            headers: {
                'Authorization': `Bearer ${storedToken}`
                }
            });
    },
    deleteUserStaff(payload){
        return axios.delete(`${baseURL}/api/remove-staff/${payload}`,{
            headers: {
                'Authorization': `Bearer ${storedToken}`
                }
            });
    },
    getStaff(){
        return axios.get(`${baseURL}/api/get-staff`,{
            headers: {
                'Authorization': `Bearer ${storedToken}`
                }
            });
    },
    getUserDTR(months,user_id){
        return axios.post(`${baseURL}/api/get-user-dtr`, {months: months, user_id: user_id},{
            headers: {
                'Authorization': `Bearer ${storedToken}`
                }
            });
    },
    getUserDropdown(){
        return axios.get(`${baseURL}/api/user-dropdown`,{
            headers: {
                'Authorization': `Bearer ${storedToken}`
                }
            });
    },
    getStaffDropdown(){
        return axios.get(`${baseURL}/api/book-staff-dropdown`,{
            headers: {
                'Authorization': `Bearer ${storedToken}`
                }
            });
    }
}
import axios from 'axios';
const storedToken = sessionStorage.getItem('token');
const baseURL = import.meta.env.VITE_APP_BASE_URL;

export default {
    createStaff(payload){
        return axios.post(`${baseURL}api/create-staff`, payload,{
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    },
    getUserStaff(page){
        return axios.get(`${baseURL}api/get-staffs?page=${page}`,{
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    },
    deleteUserStaff(payload){
        return axios.delete(`${baseURL}api/remove-staff/${payload}`,{
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    },
    getStaff(){
        return axios.get(`${baseURL}api/get-staff`,{
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    },
    getUserDTR(months,user_id){
        return axios.post(`${baseURL}api/get-user-dtr`, {months: months, user_id: user_id},{
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    },
    getUserDropdown(){
        return axios.get(`${baseURL}api/user-dropdown`,{
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    },
    getStaffDropdown(){
        return axios.get(`${baseURL}api/book-staff-dropdown`,{
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    }
}
import axios from 'axios';
const storedToken = sessionStorage.getItem('token');
const baseURL = import.meta.env.VITE_APP_BASE_URL;

export default {
    getAllappointments(page){
        return axios.get(`${baseURL}/api/get-all-appointments?page=${page}`, {
            headers: {
                'Authorization': `Bearer ${storedToken}`
                }
            });
    },
    getStatusgappointments(page,status){

        return axios.post(`${baseURL}/api/get-status-appointments?page=${page}`, {status},{
            headers: {
                'Authorization': `Bearer ${storedToken}`
                }
            });
    },
    updateAppointment(data){;
        return axios.post(`${baseURL}/api/update-status-appointment`, data,{
            headers: {
                'Authorization': `Bearer ${storedToken}`
                }
            });
    },
}
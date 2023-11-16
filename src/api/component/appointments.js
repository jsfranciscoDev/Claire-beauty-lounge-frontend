import axios from 'axios';
const storedToken = sessionStorage.getItem('token');
const baseURL = import.meta.env.VITE_APP_BASE_URL;

export default {
    getAllappointments(page, date, search){
        return axios.post(`${baseURL}api/get-all-appointments?page=${page}`, {datefilter: date, search: search} ,{
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    },
    getStatusgappointments(page,status,date,search){

        return axios.post(`${baseURL}api/get-status-appointments?page=${page}`, {status,date,search},{
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    },
    updateAppointment(data){;
        return axios.post(`${baseURL}api/update-status-appointment`, data,{
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    },
}
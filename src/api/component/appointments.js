import api from '../api'

export default {
    getAllappointments(page){
        return api.get(`/api/get-all-appointments?page=${page}`);
    },
    getStatusgappointments(page,status){

        return api.post(`/api/get-status-appointments?page=${page}`, {status});
    },
    updateAppointment(data){;
        return api.post('/api/update-status-appointment', data);
    },
}
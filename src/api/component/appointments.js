import api from '../api'

export default {
    getAllappointments(page){
        return api.get(`/api/get-all-appointments?page=${page}`);
    },
}
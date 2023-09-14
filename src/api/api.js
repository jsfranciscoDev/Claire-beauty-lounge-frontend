import axios from "axios";

const baseURL = import.meta.env.VITE_APP_BASE_URL;

const instance = axios.create({
    baseURL: baseURL,
    withCredentials: false,
});

const storedToken = localStorage.getItem('token');
instance.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;


instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;

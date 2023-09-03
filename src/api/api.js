import axios from "axios";

// const baseURL = window.location.origin;
const baseURL = import.meta.env.VITE_APP_BASE_URL;
console.log(baseURL);
const instance = axios.create({
    baseURL: baseURL,
    withCredentials: false
});

const storedToken = localStorage.getItem('access_token');
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

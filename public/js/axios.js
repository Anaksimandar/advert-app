import axios from 'axios';
import auth from './auth.js';

const axiosApi = axios.create({
    baseURL: "http://localhost:3000"
})

const token = auth.getToken();

if (token){
    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default axiosApi;
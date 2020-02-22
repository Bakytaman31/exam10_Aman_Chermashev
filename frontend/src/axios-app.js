import axios from 'axios';

const axiosApp = axios.create({
    baseURL:'http://localhost:8001/'
});

export default axiosApp;
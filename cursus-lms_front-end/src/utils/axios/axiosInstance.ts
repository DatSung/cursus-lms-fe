
import axios from 'axios';

import { HOST_API_KEY } from '../apiUrl/globalConfig.ts';


// Creating an instance of Axios with a base URL
const axiosInstance = axios.create({
    baseURL: HOST_API_KEY
})

// Adding a response interceptor to the Axios instance
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) =>
        Promise.reject(
            (error.response && error.response) || 'General Axios Error happened'
        )
)

export default axiosInstance;

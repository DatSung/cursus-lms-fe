import axiosInstance from "../utils/axios/axiosInstance.ts";

// Function to set session information (e.g., access token) in local storage and Axios headers
export const setJwtTokenSession = (accessToken: string | null, refreshToken: string | null) => {
    if (accessToken && refreshToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        delete axiosInstance.defaults.headers.common.Authorization;
    }
}

// Function to retrieve the access token from local storage
export const getJwtTokenSession = () => {
    const result = {
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken')
    }
    return result;
}
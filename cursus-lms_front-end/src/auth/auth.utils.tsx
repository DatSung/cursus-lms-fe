import { IJwtTokenDTO, IUserInfo, RolesEnum } from "../types/auth.types";

import axiosInstance from "../utils/axiosInstance";

// Function to set session information (e.g., access token) in local storage and Axios headers
export const setJwtTokenSession = (setField: IJwtTokenDTO | null) => {
    if (setField?.accessToken) {
        localStorage.setItem('accessToken', setField.accessToken);
        localStorage.setItem('refreshToken', setField.refreshToken);

        axiosInstance.defaults.headers.common.Authorization = `Bearer ${setField.accessToken}`;
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
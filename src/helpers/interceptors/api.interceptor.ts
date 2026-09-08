import axios from 'axios';
import { environment } from '../../environment';

export const api = axios.create({
  baseURL: environment.IS_PRODUCTION ? environment.API_URL : environment.DEV_URL
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});
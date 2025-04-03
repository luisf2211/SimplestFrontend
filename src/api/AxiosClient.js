import axios from 'axios';
import { toaster } from '../components/ui/toaster';
import { isTokenValid } from '../utils/auth';

const AxiosClient = axios.create({
    baseURL: 'http://localhost:9001',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

const accessToken = localStorage.getItem('accessToken');

AxiosClient.interceptors.request.use(
    (config) => {
        console.log(accessToken)
        const url = new URL(config.url, window.location.origin);
        const path = url.pathname;

        const excludedPaths = ['/api/auth/login', '/api/auth/register'];

        if (!excludedPaths.includes(path) && accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);

AxiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {

        if (accessToken !== undefined && !isTokenValid(token)) {
            toaster.create({
                title: 'Token expirado',
                type: 'error',
            })
        }

        return Promise.reject(error);
    }
);

const http = {
    get: (url, config = {}) => AxiosClient.get(url, config),
    post: (url, data, config = {}) => AxiosClient.post(url, data, config),
    put: (url, data, config = {}) => AxiosClient.put(url, data, config),
    remove: (url, config = {}) => AxiosClient.delete(url, config),
};

export const result = {
    ok: (value) => ({ ok: true, value, error: null }),
    err: (error) => ({ ok: false, value: null, error })
};

export { http };



export default AxiosClient;
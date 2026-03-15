import axios from 'axios';

// Create a custom axios instance
const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Point this to your backend
});

// Add a request interceptor to attach the auth token
api.interceptors.request.use(
    (config) => {
        // Get the token from local storage
        const user = JSON.parse(localStorage.getItem('user'));
        
        if (user && user.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
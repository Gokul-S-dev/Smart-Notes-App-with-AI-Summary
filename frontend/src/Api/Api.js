import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout:8000,
    headers:{
        "Content-Type":"application/json"
    }
})

// Attach token from localStorage (if present) to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

export default api; 
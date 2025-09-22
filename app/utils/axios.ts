import axios from 'axios';
import {toast} from 'react-toastify';

const axiosInstance = axios.create({
  baseURL: process.env.API_ROOT_URL, // Replace with your API
  timeout: 30000, // Request timeout (10 seconds)
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['Accept-Language'] = 'en';

    return config;
  },
  (error) => {
    console.log(error);
    toast.error('Request failed! Please try again.');
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      toast.error('Network error! Please check your internet.');
    } else if (error.response.status === 401) {
      toast.error('Unauthorized! Please log in again.');
      localStorage.removeItem('token');
    } else if (error.response.status === 500) {
      toast.error(error.response.data.error?.errorResponse?.errmsg);
    } else {
      toast.error(`${error.response.data.message || 'Something went wrong!'}`);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

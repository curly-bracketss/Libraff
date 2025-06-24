import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default AxiosInstance;

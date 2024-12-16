import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8002', // Replace with your backend base URL
  timeout: 10000, // Optional: Set timeout (in milliseconds)
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

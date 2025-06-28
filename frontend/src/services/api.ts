import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', //http://192.168.1.42:5000
  headers: {
    Authorization: 'Bearer corelab-secret',
  },
});

export default api;

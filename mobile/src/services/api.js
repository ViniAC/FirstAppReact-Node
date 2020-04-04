import axios from 'axios';

api = axios.create({
    baseURL: 'http://192.168.0.6:3333'
})

export default api;
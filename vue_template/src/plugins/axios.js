import axios from 'axios';


const token = localStorage.getItem('token') || '';
const authorization = `Token ${token}`;

const instance = axios.create({
    timeout: 10000,
    headers: {'Authorization': authorization}
});

instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token') || '';
    console.log(token);
    config.headers['Authorization'] = `Token ${token}`;
    return config;

}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export default instance;
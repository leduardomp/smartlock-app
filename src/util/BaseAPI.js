import axios from "axios";
import * as Storage from './Storage'

//baseURL: 'http://192.168.100.100/api'

const API = axios.create({
    baseURL: 'http://147.182.237.110/chapa/api'
})

API.interceptors.request.use(
    async config => {
        // Do something before request is sent
        const token = await Storage.recuperarToken()
        config.headers["Authorization"] = "Bearer " + token;
        return config;
    },
    error => {
        Promise.reject(error);
    }
);

export default API
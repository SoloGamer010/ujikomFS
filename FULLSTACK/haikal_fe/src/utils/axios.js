import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3100',
    withCredentials: true
})

export const removeAuthToken = () => {
    delete api.defaults.headers.common["Authorization"];
};

export default api;
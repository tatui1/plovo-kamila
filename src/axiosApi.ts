import axios from "axios";

export const axiosApi = axios.create({
    baseURL: 'https://plovo-kama-default-rtdb.europe-west1.firebasedatabase.app/'
})
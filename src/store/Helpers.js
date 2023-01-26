import axios from "axios";

export const axiosInstance = axios.create({
    withCredentials: true,
    baseURL : "http://149.102.136.93:3001"
 })
 
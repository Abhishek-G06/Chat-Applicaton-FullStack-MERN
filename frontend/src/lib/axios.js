import axios from "axios";

export const axiosInstance = axios.create ({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:8080/api" : "/api",
    headers: { 'Content-Type': 'application/json' },
    maxBodyLength: 50 * 1024 * 1024,
    maxContentLength: 50 * 1024 * 1024,
    withCredentials: true,
})
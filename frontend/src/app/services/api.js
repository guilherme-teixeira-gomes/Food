import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
  headers: {
    "credentials": 'include',
    "Content-Type": "application/json;charset=utf-8",
    "Access-Control-Allow-Origin": process.env.REACT_APP_BACKEND_URL,
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  },
});

export default api;

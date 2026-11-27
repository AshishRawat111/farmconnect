import axios from "axios";

const API = axios.create({
  // Base URL mein '/api' fix hai
  baseURL: "https://farmconnect-3.onrender.com/api", 
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers['Authorization'] = `Bearer ${token}`;
  return req;
});

export default API;
// client/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // adjust the backend URL if needed
  withCredentials: true, // for cookie-based auth (optional)
});

export default instance;

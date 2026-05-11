

import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: BASE_URL,
});
console.log("BACKEND URL:", BASE_URL);

export default api;
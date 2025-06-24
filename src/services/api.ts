import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL});

api.interceptors.request.use(async (config) => {
  const storedUser = localStorage.getItem("usuario");

  if (storedUser) {
    const token = JSON.parse(storedUser).token;
    if (token) {
      config.headers.Authorization = token;
    }
  }


  return config;
});
export default api;

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  console.log("INTERCEPTOR | Requisição interceptada:", config.url);

  const token = localStorage.getItem("token");

  console.log("INTERCEPTOR | Token lido do localStorage:", token);

  if (token) {
    config.headers.Authorization = token;
    console.log(
      "INTERCEPTOR | Cabeçalho Authorization adicionado com sucesso."
    );
  } else {
    console.log(
      "INTERCEPTOR | ALERTA: Nenhum token encontrado no localStorage."
    );
  }

  return config;
});

export default api;

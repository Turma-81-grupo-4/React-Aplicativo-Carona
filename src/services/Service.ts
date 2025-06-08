import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

export const cadastrarUsuario = async (
  url: string,
  dados: Object,
  setDados: Function // Esta função ainda recebe setDados
) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};

// ⭐⭐⭐ CORREÇÃO AQUI NA FUNÇÃO LOGIN ⭐⭐⭐
export const login = async (url: string, dados: Object) => { // Removido 'setDados: Function'
  const resposta = await api.post(url, dados);
  if (resposta.data.token) {
    resposta.data.token = resposta.data.token.trim(); 
  }
  return resposta.data; // ⭐ Retorna os dados do usuário logado
};
// ⭐⭐⭐ FIM DA CORREÇÃO NA FUNÇÃO LOGIN ⭐⭐⭐

export const buscar = async (
  url: string,
  setDados: Function,
  header: Object
) => {
  const resposta = await api.get(url, header);
  setDados(resposta.data);
};

export const buscarComRetorno = async (url: string, header: Object) => {
  const response = await api.get(url, header);
  return response;
};

export const cadastrar = async (
  url: string,
  dados: Object,
  setDados: Function,
  header: Object
) => {
  const resposta = await api.post(url, dados, header);
  setDados(resposta.data);
};
export const atualizar = async (
  url: string,
  dados: Object,
  setDados: Function, // Mantenha setDados para outras funções se necessário
  header: Object
) => {
  const resposta = await api.put(url, dados, header);
  setDados(resposta.data);
};
export const deletar = async (url: string, header: Object) => {
  await api.delete(url, header);
};
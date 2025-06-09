
import api from "./api";


export const cadastrarUsuario = async (
  url: string,
  dados: Object,
  setDados: Function
) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};


export const login = async (url: string, dados: Object) => {
  const resposta = await api.post(url, dados);
  if (resposta.data.token) {
    resposta.data.token = resposta.data.token.trim();
  }
  return resposta.data;
};


export const buscar = async (url: string) => {
  const resposta = await api.get(url);
  return resposta.data;
};

export const buscarComRetorno = async (url: string, header: Object) => {
  const response = await api.get(url, header);
  return response;
};

export const cadastrar = async (url: string, dados: Object) => {
  const resposta = await api.post(url, dados);
  return resposta.data;
};
export const atualizar = async (url: string, dados: Object) => {
  const resposta = await api.put(url, dados);
  return resposta.data;
};
export const deletar = async (url: string) => {
  await api.delete(url);
};


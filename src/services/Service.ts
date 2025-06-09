import api from "./api";
import type UsuarioLogin from "../models/UsuarioLogin";

export const cadastrarUsuario = async (
  url: string,
  dados: Object,
  setDados: Function
) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};

export const login = async (
  url: string,
  dados: Object
): Promise<UsuarioLogin> => {
  const resposta = await api.post(url, dados);
  return resposta.data;
};

export const buscar = async (url: string) => {
  const resposta = await api.get(url);
  return resposta.data;
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

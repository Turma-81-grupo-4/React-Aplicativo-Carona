import { createContext, type ReactNode, useEffect, useState } from "react";

import type UsuarioLogin from "../models/UsuarioLogin";
import { login } from "../services/Service";

interface AuthContextProps {
  usuario: UsuarioLogin;
  handleLogout(): void;
  handleLogin(usuario: UsuarioLogin): Promise<void>;
  handleUpdateUser(usuario: Partial<UsuarioLogin>): void;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(false);

  const [usuario, setUsuario] = useState<UsuarioLogin>(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      return JSON.parse(storedUser);
    }
    return {
      id: 0,
      nome: "",
      email: "",
      foto: "",
      senha: "",
      token: "",
      tipo: "",
    };
  });

  async function handleLogin(usuarioLogin: UsuarioLogin) {
    setIsLoading(true);
    try {
      const resposta = await login(`/usuarios/logar`, usuarioLogin);

      const dadosUsuario = {
        id: resposta.id,
        nome: resposta.nome,
        email: resposta.email ?? "",
        senha: resposta.senha ?? "",
        foto: resposta.foto ?? "",
        token: resposta.token,
        tipo: resposta.tipo ?? "",
      };
      localStorage.setItem("usuario", JSON.stringify(dadosUsuario));
      setUsuario(dadosUsuario);
      setIsLoading(false);
    } catch (error) {
      console.error("Erro no login:", error);
      setIsLoading(false);
      throw error;
    }
  }
  function handleUpdateUser(dadosAtualizados: Partial<UsuarioLogin>) {
    setUsuario((usuarioAnterior) => {
      const usuarioMesclado = {
        ...usuarioAnterior,
        ...dadosAtualizados,
      };

      localStorage.setItem("usuario", JSON.stringify(usuarioMesclado));
      return usuarioMesclado;
    });
  }

  function handleLogout() {
    localStorage.removeItem("usuario");
    setUsuario({
      id: 0,
      nome: "",
      email: "",
      senha: "",
      foto: "",
      token: "",
      tipo: "",
    });
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        handleLogin,
        handleLogout,
        isLoading,
        handleUpdateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

import { createContext, type ReactNode, useState } from "react";

import type UsuarioLogin from "../models/UsuarioLogin";
import { login } from "../services/Service";
import { ToastAlerta } from "../utils/ToastAlerta";

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
      senha: "",
      token: "",
      tipo: "",
    };
  });

  async function handleLogin(usuarioLogin: UsuarioLogin) {
    setIsLoading(true);
    try {
      const loggedUser = (await login(
        `/usuarios/logar`,
        usuarioLogin
      )) as UsuarioLogin;
      setUsuario(loggedUser);
      localStorage.setItem("usuario", JSON.stringify(loggedUser)); // Salva o usuário com token no localStorage
      ToastAlerta("O Usuário foi autenticado com sucesso!" , "sucesso");
    } catch (error) {
      ToastAlerta("Os Dados do usuário estão inconsistentes!", "erro");
      console.error(error);
    }
    setIsLoading(false);
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

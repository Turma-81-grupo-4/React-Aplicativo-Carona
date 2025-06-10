import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save, Delete } from 'lucide-react';
import { AuthContext } from "../../contexts/AuthContext";
import type UsuarioLogin from "../../models/UsuarioLogin";
import { atualizar } from "../../services/Service";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import "./Perfil.css";
import {
  PencilSimpleLineIcon
} from "@phosphor-icons/react";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Perfil() {
  const navigate = useNavigate();
  const { usuario, handleUpdateUser } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UsuarioLogin>({ ...usuario });

  const MySwal = withReactContent(Swal);

  useEffect(() => {
          window.scrollTo(0, 0);
      }, []);

  useEffect(() => {
    setFormData({ ...usuario });
  }, [usuario]);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSaveChanges() {
    if (formData.nome.trim().length < 3) {
      ToastAlerta("O nome deve ter pelo menos 3 caracteres.", "erro");
      return;
    }

    try {
      const dadosParaAtualizarDTO = {
        nome: formData.nome,
        foto: formData.foto,
        tipo: formData.tipo,
      };

      const usuarioAtualizado = await atualizar(
        `/usuarios/atualizar`,
        dadosParaAtualizarDTO
      );

      handleUpdateUser(usuarioAtualizado);

      ToastAlerta("Perfil atualizado com sucesso!", "sucesso");
      setIsEditing(false);
    } catch (error) {
      ToastAlerta("Erro ao atualizar o perfil. Verifique o console.", "erro");
      console.error("Erro na atualização:", error);
    }
  }

  async function handleTipoChange() {
    const novoTipo = usuario.tipo === "motorista" ? "passageiro" : "motorista";
    const result = await MySwal.fire({
      title: `Tem certeza?`,
      text: `Deseja mudar seu perfil para ${novoTipo}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: "#f59e42",
      cancelButtonColor: '#6b7280',
    });

    if (!result.isConfirmed) return;


    try {
      const dadosParaAtualizarDTO = {
        nome: formData.nome,
        foto: formData.foto,
        tipo: novoTipo,
      };

      const usuarioAtualizado = await atualizar(
        `/usuarios/atualizar`,
        dadosParaAtualizarDTO
      );

      handleUpdateUser(usuarioAtualizado);
      ToastAlerta(`Perfil alterado para ${novoTipo} com sucesso!`, "sucesso");
    } catch (error) {
      ToastAlerta("Erro ao tentar alterar o tipo do perfil.", "erro");
      console.error("Erro na alteração de tipo:", error);
    }
  }

  useEffect(() => {
    if (usuario.token === "") {
      ToastAlerta("Você precisa estar logado", "info");
      navigate("/");
    }
  }, [usuario.token, navigate]);

  return (
    <div className="min-h-screen pt-16 bg-cover bg-center bg-no-repeat perfil-bg">
      <div className="w-full lg:w-4/12 px-4 mx-auto">
        <div className="relative flex flex-col min-w-0 break-words bg-gray-300/50 w-full mb-6 shadow-xl rounded-lg mt-24">
          <div className="absolute left-1/2 w-full flex justify-center -translate-x-1/2 -translate-y-1/2 z-10">
            <img
              alt="Foto de perfil"
              src={formData.foto || "https://i.imgur.com/KO6k1gA.png"}
              className="z-10 shadow-xl rounded-full h-[150px] w-[150px] object-cover border-4 border-slate-50"
            />
          </div>
          <div className="z-5 px-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl
                               before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br 
                               before:from-white/10 before:to-transparent before:pointer-events-none
                               hover:shadow-orange-500/10 hover:shadow-3xl transition-all duration-500">
            <div className="text-center pt-20">
              {isEditing ? (
                <div className="px-4">
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    placeholder="Nome completo"
                    className="text-xl font-semibold p-2 border rounded w-full mb-2"
                  />
                  <input
                    type="text"
                    name="foto"
                    value={formData.foto}
                    onChange={handleInputChange}
                    placeholder="URL da sua foto"
                    className="text-sm p-2 border rounded w-full mb-4"
                  />
                  <div className=" flex justify-center gap-4">
                    <button
                      onClick={handleSaveChanges}
                      className="mb-4 cursor-pointer text-green-600 hover:text-green-800"
                      title="Salvar"
                    >
                      <Save size={25} />
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="mb-4 cursor-pointer text-red-600 hover:text-red-800"
                      title="Cancelar"
                    >
                      <Delete size={25} />
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-center items-center gap-2">
                    <h3 className="text-2xl font-semibold leading-normal text-slate-700 mb-1">
                      {usuario.nome}
                    </h3>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-slate-600 hover:text-slate-800 cursor-pointer"
                      title="Editar Nome e Foto"
                    >
                      <PencilSimpleLineIcon size={20} />
                    </button>
                  </div>
                  <div className="text-sm font-bold uppercase text-slate-500">
                    {usuario.email}
                  </div>
                  <div className="mt-4 mb-4 text-xs font-bold uppercase text-blue-900 bg-yellow-500 inline-block px-2 py-1 rounded">
                    {usuario.tipo}
                  </div>
                </div>
              )}
            </div>
            <div className="py-10 border-t border-slate-300 text-center">
              <div className="flex flex-col items-center gap-4">
                <h2 className="text-xl font-semibold leading-normal text-slate-700">
                  Mudar perfil
                </h2>
                <div className="flex flex-col w-full items-center gap-2 px-4">
                  <button
                    onClick={handleTipoChange}
                    className="cursor-pointer text-md w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    {usuario.tipo === "motorista"
                      ? "Mudar para perfil Passageiro"
                      : "Quero ser Motorista!"}
                  </button>
                  <button className="cursor-pointer text-md w-full bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-950 transition-colors">
                    Alterar senha
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Perfil;

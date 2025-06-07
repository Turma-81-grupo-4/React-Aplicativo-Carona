import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import type UsuarioLogin from "../../models/UsuarioLogin";
import { atualizar } from "../../services/Service";

import "./Perfil.css";
import {
  FloppyDiskIcon,
  PencilSimpleLineIcon,
  XCircleIcon,
} from "@phosphor-icons/react";

function Perfil() {
  const navigate = useNavigate();

  const { usuario, handleUpdateUser } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState<UsuarioLogin>({ ...usuario });

  useEffect(() => {
    setFormData({ ...usuario });
  }, [usuario]);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSaveChanges() {
    if (formData.nome.trim().length < 3) {
      alert("O nome deve ter pelo menos 3 caracteres.");
      return;
    }

    try {
      const usuarioAtualizado = await atualizar(
        `/usuarios/atualizar`,
        formData,
        { headers: { Authorization: usuario.token } }
      );

      handleUpdateUser(usuarioAtualizado);

      alert("Perfil atualizado com sucesso!");
      setIsEditing(false);
    } catch (error) {
      alert(
        "Erro ao atualizar o perfil. Verifique o console para mais detalhes."
      );
      console.error("Erro na atualização:", error);
    }
  }

  async function handleTipoChange() {
    const novoTipo = usuario.tipo === "motorista" ? "passageiro" : "motorista";

    if (!confirm(`Tem certeza que deseja mudar seu perfil para ${novoTipo}?`)) {
      return;
    }

    const dadosParaAtualizar = { ...formData, tipo: novoTipo };

    try {
      const usuarioAtualizado = await atualizar(
        `/usuarios/atualizar`,
        dadosParaAtualizar,
        { headers: { Authorization: usuario.token } }
      );

      handleUpdateUser(usuarioAtualizado);
      alert(`Perfil alterado para ${novoTipo} com sucesso!`);
    } catch (error) {
      alert("Erro ao tentar alterar o tipo do perfil.");
      console.error("Erro na alteração de tipo:", error);
    }
  }

  useEffect(() => {
    if (usuario.token === "") {
      alert("Você precisa estar logado");
      navigate("/");
    }
  }, [usuario.token, navigate]);

  return (
    <div className="min-h-screen pt-16 bg-cover bg-center bg-no-repeat perfil-bg">
      <div className="w-full lg:w-4/12 px-4 mx-auto">
        <div className="relative flex flex-col min-w-0 break-words bg-gray-300/50 w-full mb-6 shadow-xl rounded-lg mt-24">
          <div className="absolute left-1/2 w-full flex justify-center -translate-x-1/2 -translate-y-1/2">
            <img
              alt="Foto de perfil"
              src={formData.foto}
              className="shadow-xl rounded-full h-[150px] w-[150px] object-cover border-4 border-slate-50"
            />
          </div>

          <div className="px-6">
            <div className="text-center pt-20 pb-10">
              {/* --- ÁREA DE EDIÇÃO DE NOME E FOTO --- */}
              {isEditing ? (
                // MODO DE EDIÇÃO
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
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={handleSaveChanges}
                      className="text-green-600 hover:text-green-800"
                      title="Salvar"
                    >
                      <FloppyDiskIcon size={32} />
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="text-red-600 hover:text-red-800"
                      title="Cancelar"
                    >
                      <XCircleIcon size={32} />
                    </button>
                  </div>
                </div>
              ) : (
                // MODO DE VISUALIZAÇÃO
                <div>
                  <div className="flex justify-center items-center gap-2">
                    <h3 className="text-2xl font-semibold leading-normal text-slate-700 mb-1">
                      {usuario.nome}
                    </h3>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-slate-600 hover:text-slate-800"
                      title="Editar Nome e Foto"
                    >
                      <PencilSimpleLineIcon size={20} />
                    </button>
                  </div>
                  <div className="text-sm font-bold uppercase text-slate-500">
                    {usuario.email}
                  </div>
                  <div className="mt-4 text-xs font-bold uppercase text-white bg-orange-600 inline-block px-2 py-1 rounded">
                    {usuario.tipo}
                  </div>
                </div>
              )}
            </div>

            {/* --- ÁREA DE BOTÕES DE AÇÃO --- */}
            <div className="py-10 border-t border-slate-300 text-center">
              <div className="flex flex-col items-center gap-4">
                <h2 className="text-xl font-semibold leading-normal text-slate-700">
                  Mudar perfil
                </h2>
                <div className="flex flex-col w-full items-center gap-2 px-4">
                  <button
                    onClick={handleTipoChange}
                    className="w-full bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    {usuario.tipo === "motorista"
                      ? "Mudar para perfil Passageiro"
                      : "Quero ser Motorista!"}
                  </button>
                  <button className="w-full bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-950 transition-colors">
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

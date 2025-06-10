import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import type Passagem from "../../../models/Passagem";
import { deletar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import CardPassagem from "../cardpassagem/CardPassagem";
import {
  ArrowUUpLeftIcon,
  TrashSimpleIcon,
  XIcon,
} from "@phosphor-icons/react";

interface ModalDeletarPassagemProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
  passagem: Passagem | null;
}

function ModalDeletarPassagem({
  isOpen,
  onClose,
  onConfirmDelete,
  passagem,
}: ModalDeletarPassagemProps) {
  const [deleteIsLoading, setDeleteIsLoading] = useState<boolean>(false);

  const { usuario, handleLogout } = useContext(AuthContext);

  async function deletarPassagem() {
    if (!passagem) return; // Guarda de segurança

    setDeleteIsLoading(true);

    try {
      await deletar(`/passagens/${passagem.id}`);
      ToastAlerta("Passagem cancelada com sucesso!", "sucesso");
      onConfirmDelete();
    } catch (error: any) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        ToastAlerta(
          "O token expirou, por favor, faça login novamente.",
          "info"
        );
        handleLogout();
      } else {
        ToastAlerta("Erro ao cancelar a passagem.", "erro");
      }
    } finally {
      setDeleteIsLoading(false);
      onClose();
    }
  }

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center 
        transition-opacity duration-300 ease-in-out
        ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"} 
        bg-black/30 backdrop-blur-sm
      `}
    >
      {/* Conteúdo do Modal */}
      <div
        className={`
          relative w-full max-w-2xl mx-auto bg-gray-100 rounded-lg shadow-lg p-8 m-4
          transition-transform duration-300 ease-in-out
          ${isOpen ? "scale-100" : "scale-95"}
        `}
      >
        {/* Botão de Fechar no canto */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          .
          <XIcon size={24} />
        </button>

        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold text-red-700 mb-4 text-center">
            Cancelar Passagem
          </h1>
          <p className="text-center text-xl text-gray-700 font-semibold mb-8">
            Você tem certeza de que deseja desistir da carona a seguir?
            <br />
            <span className="font-normal text-base">
              Esta ação não poderá ser desfeita.
            </span>
          </p>

          <div className="w-full mb-8">
            {passagem && (
              <CardPassagem passagem={passagem} hideActions={true} />
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-6 w-full max-w-md">
            <button
              className="cursor-pointer flex-1 text-slate-800 bg-gray-300 hover:bg-gray-400 font-bold w-full py-3 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300"
              onClick={onClose}
            >
              <ArrowUUpLeftIcon size={20} />
              Não, voltar
            </button>
            <button
              className="cursor-pointer flex-1 text-white bg-red-600 hover:bg-red-800 font-bold w-full py-3 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300"
              onClick={deletarPassagem}
              disabled={deleteIsLoading}
            >
              {deleteIsLoading ? (
                <RotatingLines
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="24"
                  visible={true}
                />
              ) : (
                <>
                  <TrashSimpleIcon size={20} />
                  Sim, quero desistir
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalDeletarPassagem;

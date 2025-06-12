import { XIcon } from "lucide-react";

interface ModalConfirmacaoProps {
  titulo: string;
  mensagem: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

function ModalConfirmacao({
  titulo,
  mensagem,
  isOpen,
  isLoading,
  onConfirm,
  onClose,
}: ModalConfirmacaoProps) {
  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center 
        transition-opacity duration-300 ease-in-out
        ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"} 
        bg-black/30 backdrop-blur-sm
      `}
    >
      <div
        className={`
          relative w-full max-w-2xl mx-auto bg-gray-100 rounded-lg shadow-lg p-8 m-4
          transition-transform duration-300 ease-in-out
          ${isOpen ? "scale-100" : "scale-95"}
        `}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          .
          <XIcon size={24} />
        </button>
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl text-center">{titulo}</h2>
          <p className="text-lg text-center">{mensagem}</p>
        </div>
        <div className="flex justify-center gap-4 mt-6">
          <button
            className="bg-yellow-500 hover:bg-yellow-600 cursor-pointer rounded-xl px-3 py-2 text-white font-semibold"
            onClick={onConfirm}
          >
            Confirmar
          </button>
          <button
            className="bg-gray-400 hover:bg-gray-500 cursor-pointer rounded-xl px-3 py-2 text-white font-semibold"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
export default ModalConfirmacao;

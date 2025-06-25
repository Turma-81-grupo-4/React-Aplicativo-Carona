import type React from "react";
import { useState } from "react";

interface ModalAlterarSenhaProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
  isLoading: boolean;
}
function ModalAlterarSenha({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: ModalAlterarSenhaProps) {
  const [formData, setFormData] = useState({
    senhaAtual: "",
    novaSenha: "",
    confirmarSenha: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onConfirm(formData);
  };
  if (!isOpen) {
    return null;
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
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 shadow-2xl w-full max-w-md border border-white/20 text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Alterar Senha</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="senhaAtual"
              className="block text-sm font-medium mb-1"
            >
              Senha Atual
            </label>
            <input
              type="password"
              id="senhaAtual"
              name="senhaAtual"
              value={formData.senhaAtual}
              onChange={handleInputChange}
              required
              className="w-full p-2 bg-white/20 rounded-md border border-white/30 focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="novaSenha"
              className="block text-sm font-medium mb-1"
            >
              Nova Senha
            </label>
            <input
              type="password"
              id="novaSenha"
              name="novaSenha"
              value={formData.novaSenha}
              onChange={handleInputChange}
              required
              minLength={8}
              className="w-full p-2 bg-white/20 rounded-md border border-white/30 focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="confirmarSenha"
              className="block text-sm font-medium mb-1"
            >
              Confirmar Nova Senha
            </label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              value={formData.confirmarSenha}
              onChange={handleInputChange}
              required
              className="w-full p-2 bg-white/20 rounded-md border border-white/30 focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="py-2 px-4 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold rounded-lg transition-colors"
            >
              {isLoading ? "Salvando..." : "Salvar Alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default ModalAlterarSenha;

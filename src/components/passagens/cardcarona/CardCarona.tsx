import { useContext } from "react";
import type Carona from "../../../models/Carona";
import { AuthContext } from "../../../contexts/AuthContext";
import { cadastrar } from "../../../services/Service";
import { useNavigate } from "react-router-dom";
import { ToastAlerta } from "../../../utils/ToastAlerta";

interface CardCaronaProps {
  carona: Carona;
}

function CardCarona({ carona }: CardCaronaProps) {
  const { usuario, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  async function comprarPassagem() {
    if (!usuario.token) {
      ToastAlerta(
        "Você precisa estar logado para comprar uma passagem.",
        "error"
      );
      navigate("/login");
      return;
    }

    const passagemParaComprar = {
      caronaId: carona.id,
    };

    try {
      await cadastrar(`/passagens/criar`, passagemParaComprar, {
        headers: {
          Authorization: usuario.token,
        },
      });

      ToastAlerta("Passagem comprada com sucesso!", "success");
      navigate("/passagens");
    } catch (error: any) {
      if (
        error.toString().includes("401") ||
        error.toString().includes("403")
      ) {
        ToastAlerta(
          "Seu token expirou, por favor, faça login novamente.",
          "error"
        );
        handleLogout();
      } else {
        const errorMessage =
          error.response?.data?.message ||
          "Erro ao comprar a passagem. Tente novamente.";
        alert(errorMessage);
        console.error(error);
      }
    }
  }

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <p>
        <strong>Origem:</strong> {carona.origem}
      </p>
      <p>
        <strong>Destino:</strong> {carona.destino}
      </p>
      <p>
        <strong>Data:</strong>{" "}
        {new Date(carona.dataViagem).toLocaleDateString()}
      </p>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={comprarPassagem}
      >
        Entrar na carona
      </button>
    </div>
  );
}

export default CardCarona;

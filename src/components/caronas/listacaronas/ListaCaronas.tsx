import { useContext, useEffect, useState } from "react";

import type Carona from "../../../models/Carona";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import CardCaronas from "../cardcaronas/CardCaronas";
import axios from "axios";

function ListaCaronas() {
  const navigate = useNavigate();
  const [caronas, setCaronas] = useState<Carona[]>([]);
  const { usuario } = useContext(AuthContext);
  const token = usuario.token;

  const [loading, setIsLoading] = useState(true);
  const [error] = useState<string | null>(null);

  useEffect(() => {
          window.scrollTo(0, 0);
      }, []);

  async function buscarCaronas() {
    setIsLoading(true);

    try {
      const resposta = await axios.get(
        `${import.meta.env.VITE_API_URL}/caronas`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const todasAsCaronas: Carona[] = resposta.data;
      setCaronas(todasAsCaronas);
    } catch (error) {
      console.error("Erro ao buscar caronas:", error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    if (token === "") {
      ToastAlerta("Voce precisa estar logado.", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    buscarCaronas();
  }, [caronas.length]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
        <p className="text-gray-700 text-lg mt-4">Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <p className="text-red-600 text-xl font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="py-22 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-4xl font-bold text-blue-900 mb-8 text-center">
          Caronas Disponíveis
        </h2>

        {caronas.length === 0 ? (
          <p className="text-center text-gray-600 text-xl">
            Nenhuma carona disponível no momento. Que tal oferecer uma?
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caronas.map((carona) => (
              <CardCaronas key={carona.id} carona={carona} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ListaCaronas;

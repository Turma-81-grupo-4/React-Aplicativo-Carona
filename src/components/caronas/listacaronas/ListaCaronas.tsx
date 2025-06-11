import { useContext, useEffect, useMemo, useState } from "react";

import type Carona from "../../../models/Carona";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import CardCaronas from "../cardcaronas/CardCaronas";
import axios from "axios";

function ListaCaronas() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const [caronas, setCaronas] = useState<Carona[]>([]);
  const [caronasFuturas, setCaronasFuturas] = useState<Carona[]>([]);
  const [caronasPassadas, setCaronasPassadas] = useState<Carona[]>([]);
  const { usuario } = useContext(AuthContext);
  const token = usuario.token;

  const [loading, setIsLoading] = useState(true);
  const [error] = useState<string | null>(null);

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

      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      const futuras: Carona[] = [];
      const passadas: Carona[] = [];

      const todasAsCaronas: Carona[] = resposta.data;

      todasAsCaronas.forEach((carona) => {
        if (carona && carona.dataViagem) {
          const dataViagem = new Date(`${carona.dataViagem}T00:00:00`);

          if (dataViagem >= hoje) {
            futuras.push(carona);
          } else {
            passadas.push(carona);
          }
        }
      });

      futuras.sort((a, b) => {
        const aDataViagem = new Date(`${a.dataViagem}T00:00:00`).getTime();
        const bDataViagem = new Date(`${b.dataViagem}T00:00:00`).getTime();
        return aDataViagem - bDataViagem;
      });

      passadas.sort((a, b) => {
        const aDataViagem = new Date(`${a.dataViagem}T00:00:00`).getTime();
        const bDataViagem = new Date(`${b.dataViagem}T00:00:00`).getTime();
        return bDataViagem - aDataViagem;
      });

      setCaronasFuturas(futuras);
      setCaronasPassadas(passadas);
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
    if (token) {
      buscarCaronas();
    }
  }, [token]);

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

        {caronasFuturas.length === 0 ? (
          <p className="text-center text-gray-600 text-xl">
            Nenhuma carona disponível no momento. Que tal oferecer uma?
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caronasFuturas.map((carona) => (
              <CardCaronas key={carona.id} carona={carona} />
            ))}
          </div>
        )}
      </div>
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-4xl font-bold text-blue-900 mb-8 text-center">
          Caronas Passadas
        </h2>

        {caronasPassadas.length === 0 ? (
          <p className="text-center text-gray-600 text-xl">
            Nenhuma carona passada.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caronasPassadas.map((carona) => (
              <CardCaronas key={carona.id} carona={carona} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ListaCaronas;

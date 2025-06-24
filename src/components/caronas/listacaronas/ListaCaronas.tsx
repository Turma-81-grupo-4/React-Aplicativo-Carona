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
  const [caronasFuturas, setCaronasFuturas] = useState<Carona[]>([]);
  const [caronasPassadas, setCaronasPassadas] = useState<Carona[]>([]);
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

     

      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      const futuras: Carona[] = [];
      const passadas: Carona[] = [];

      const todasAsCaronas = Array.isArray(resposta.data)
        ? resposta.data
        : resposta.data.caronas || resposta.data.data || [];

      if (!Array.isArray(todasAsCaronas)) {
        console.error("Resposta inesperada da API: não veio um array de caronas.");
        setIsLoading(false);
        return;
      }

      todasAsCaronas.forEach((carona) => {
        if (carona && carona.dataHoraPartida) {
          const dataDaCarona = new Date(carona.dataHoraPartida);
          if (dataDaCarona >= hoje) {
            futuras.push(carona);
          } else {
            passadas.push(carona);
          }
        }
      });


      futuras.sort(
        (a, b) =>
          new Date(a.dataHoraPartida).getTime() -
          new Date(b.dataHoraPartida).getTime()
      );

      passadas.sort(
        (a, b) =>
          new Date(b.dataHoraPartida).getTime() -
          new Date(a.dataHoraPartida).getTime()
      );

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
    <div className="min-h-screen bg-gray-50 py-16 flex justify-center items-start">
      <div className="container mx-auto px-4 max-w-6xl my-4 p-8 bg-white/5 border border-white/10 rounded-2xl shadow-2xl">
        <h2 className="text-4xl font-bold text-blue-900 mb-8 text-center">
          Caronas Disponíveis
        </h2>

        {caronasFuturas.length === 0 ? (
          <p className="text-center text-gray-600 text-xl">
            Nenhuma carona disponível no momento. Que tal oferecer uma?
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {caronasFuturas.map((carona) => (
              <CardCaronas key={carona.id} carona={carona} />
            ))}
          </div>
        )}
        <div className="container mx-auto px-4 max-w-6xl m-10">
        <h2 className="text-4xl font-bold text-gray-700 mb-8  text-center">
          Caronas Passadas
        </h2>

        {caronasPassadas.length === 0 ? (
          <p className="text-center text-gray-600 text-xl">
            Nenhuma carona passada.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {caronasPassadas.map((carona) => (
              <CardCaronas key={carona.id} carona={carona} />
            ))}
          </div>
        )}
      </div>
      </div>
      
    </div>
  );
}

export default ListaCaronas;

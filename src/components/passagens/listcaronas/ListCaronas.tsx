import { useNavigate } from "react-router-dom";
import CardCarona from "../cardcarona/CardCarona";
import { useContext, useEffect, useState } from "react";
import type Carona from "../../../models/Carona";
import { AuthContext } from "../../../contexts/AuthContext";
import axios from "axios";
import { CirclesWithBar } from "react-loader-spinner";

function ListCaronas() {
  const navigate = useNavigate();

  const [caronas, setCaronas] = useState<Carona[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

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
      alert("Você precisa estar logado para ver suas passagens.");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      buscarCaronas();
    }
  }, [token]);

  return (
    <>
      {isLoading && (
        <div className="flex justify-center w-full my-4">
          <CirclesWithBar
            height="200"
            width="200"
            color="#4fa94d"
            visible={true}
            ariaLabel="circles-with-bar-loading"
            wrapperClass="mx-auto"
          />
        </div>
      )}

      {!isLoading && (
        <div className="container mx-auto px-4 max-w-6xl pt-24 ">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-8 text-center">
              Próximas Caronas
            </h2>
            {caronas.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {caronas.map((carona) => (
                  <CardCarona key={carona.id} carona={carona} />
                ))}
              </div>
            ) : (
              <p className="text-center text-xl text-gray-600">
                Você não possui nenhuma carona futura agendada.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ListCaronas;

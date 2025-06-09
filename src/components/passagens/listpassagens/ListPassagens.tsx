import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import CardPassagem from "../cardpassagem/CardPassagem";
import type Passagem from "../../../models/Passagem";
import { CirclesWithBar } from "react-loader-spinner";
import axios from "axios";

function ListPassagens() {
  const navigate = useNavigate();
  const location = useLocation();

  const [passagensFuturas, setPassagensFuturas] = useState<Passagem[]>([]);
  const [passagensPassadas, setPassagensPassadas] = useState<Passagem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPassagens() {
    setIsLoading(true);

    try {
      const resposta = await axios.get(
        `${import.meta.env.VITE_API_URL}/passagens`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const agora = new Date();
      const futuras: Passagem[] = [];
      const passadas: Passagem[] = [];

      const todasAsPassagens: Passagem[] = resposta.data;

      todasAsPassagens.forEach((passagem) => {
        if (passagem.carona && passagem.carona.dataViagem) {
          const dataPassagem = new Date(passagem.carona.dataViagem);
          if (dataPassagem >= agora) {
            futuras.push(passagem);
          } else {
            passadas.push(passagem);
          }
        }
      });

      futuras.sort((a, b) => {
        const aDataViagem = a.carona?.dataViagem
          ? new Date(a.carona.dataViagem).getTime()
          : 0;
        const bDataViagem = b.carona?.dataViagem
          ? new Date(b.carona.dataViagem).getTime()
          : 0;
        return aDataViagem - bDataViagem;
      });
      passadas.sort(
        (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
      );

      setPassagensFuturas(futuras);
      setPassagensPassadas(passadas);
    } catch (error: any) {
      console.error("Detalhes erro Axios:", error);
      if (error.response) {
        console.error("Dados da resposta do erro:", error.response.data);
        console.error("Status do erro:", error.response.status);
        console.error("Cabeçalhos do erro:", error.response.headers);
      } else if (error.request) {
        console.error("Requisição do erro:", error.request);
      } else {
        console.error("Mensagem de erro:", error.message);
      }
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        alert("O token expirou, por favor, faça login novamente.");
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado para ver suas passagens.");
      navigate("/");
    }
  }, [token, location]);

  useEffect(() => {
    if (token) {
      buscarPassagens();
    }
  }, [token]);

  return (
    <>
      {isLoading && (
        <div className="flex justify-center w-full my-4 bg-gray-50">
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
        <div className="bg-gray-50 container mx-auto px-4 max-w-6xl pt-24 ">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-8 text-center">
              Próximas Caronas
            </h2>
            {passagensFuturas.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {passagensFuturas.map((passagem) => (
                  <CardPassagem key={passagem.id} passagem={passagem} />
                ))}
              </div>
            ) : (
              <p className="text-center text-xl text-gray-600">
                Você não possui nenhuma carona futura agendada.
              </p>
            )}
          </div>

          {/* Seção de Passagens Passadas */}
          <div>
            <h2 className="text-4xl font-bold text-gray-700 mb-8 text-center">
              Caronas Anteriores
            </h2>
            {passagensPassadas.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {passagensPassadas.map((passagem) => (
                  <CardPassagem key={passagem.id} passagem={passagem} />
                ))}
              </div>
            ) : (
              <p className=" py-6 text-center text-xl text-gray-600">
                Nenhuma carona anterior encontrada.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ListPassagens;

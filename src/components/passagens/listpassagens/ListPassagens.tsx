import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import CardPassagem from "../cardpassagem/CardPassagem";
import type Passagem from "../../../models/Passagem";
import { RotatingLines } from "react-loader-spinner";
import axios from "axios";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import ModalDeletarPassagem from "../deletarpassagem/ModalDeletarPassagem";
import Perfil from "../../../pages/perfil/Perfil";
import "./ListPassagens.css";

function ListPassagens() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const location = useLocation();

  const [passagensFuturas, setPassagensFuturas] = useState<Passagem[]>([]);
  const [passagensPassadas, setPassagensPassadas] = useState<Passagem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passagemParaDeletar, setPassagemParaDeletar] =
    useState<Passagem | null>(null);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      const futuras: Passagem[] = [];
      const passadas: Passagem[] = [];

      const todasAsPassagens = Array.isArray(resposta.data)
        ? resposta.data
        : resposta.data.passagens || resposta.data.data || [];

      if (!Array.isArray(todasAsPassagens)) {
        console.error(
          "Resposta inesperada da API: não veio um array de passagens."
        );
        setIsLoading(false);
        return;
      }
      todasAsPassagens.forEach((passagem) => {
        if (passagem.carona && passagem.carona.dataHoraPartida) {
          const dataViagem = new Date(passagem.carona.dataHoraPartida);

          if (dataViagem >= hoje) {
            futuras.push(passagem);
          } else {
            passadas.push(passagem);
          }
        }
      });

      futuras.sort(
        (a, b) =>
          new Date(a.carona?.dataHoraPartida ?? "").getTime() -
          new Date(b.carona?.dataHoraPartida ?? "").getTime()
      );

      passadas.sort(
        (a, b) =>
          new Date(b.carona?.dataHoraPartida ?? "").getTime() -
          new Date(a.carona?.dataHoraPartida ?? "").getTime()
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
        ToastAlerta(
          "O token expirou, por favor, faça login novamente.",
          "erro"
        );
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  }
  const handleOpenModal = (passagem: Passagem) => {
    setPassagemParaDeletar(passagem);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPassagemParaDeletar(null);
  };

  const handleDeleteSuccess = () => {
    setPassagensFuturas((prevPassagens) =>
      prevPassagens.filter((p) => p.id !== passagemParaDeletar?.id)
    );
    handleCloseModal();
  };

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado para ver suas passagens.", "erro");
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
      )}

      {!isLoading && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-4/12 xl:w-3/12">
              <Perfil variant="resumido" />
            </div>
            <div className="lg:w-8/12 xl:w-9/12 flex flex-col gap-16 mb-16  w-full flex-wrap items-center backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl">
              <div className="mb-16 items-center py-10">
                <h2 className="text-4xl font-bold text-blue-900 mb-8 text-center">
                  Próximas Passagens
                </h2>
                {passagensFuturas.length > 0 ? (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {passagensFuturas.map((passagem) => (
                      <CardPassagem
                        key={passagem.id}
                        passagem={passagem}
                        onDeleteClick={() => handleOpenModal(passagem)}
                      />
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
                <h2 className="text-4xl font-bold text-slate-700 mb-8 text-center">
                  Passagens Anteriores
                </h2>
                {passagensPassadas.length > 0 ? (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {passagensPassadas.map((passagem) => (
                      <CardPassagem key={passagem.id} passagem={passagem} />
                    ))}
                  </div>
                ) : (
                  <p className=" py-6 text-center text-xl text-gray-100 mb-16">
                    Nenhuma carona anterior encontrada.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <ModalDeletarPassagem
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirmDelete={handleDeleteSuccess}
        passagem={passagemParaDeletar}
      />
    </>
  );
}

export default ListPassagens;

import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type Carona from "../../../models/Carona";
import { AuthContext } from "../../../contexts/AuthContext";
import {
  Clock,
  Car,
  MapPin,
  User,
  Calendar1,
  Armchair,
  TicketCheckIcon,
} from "lucide-react";
import { RotatingLines } from "react-loader-spinner";
import FormAtualizarCarona from "../formcaronas/FormAtualizarCarona";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import ModalDeletarCarona from "../deletarcarona/ModalDeletarCarona";
import { buscar } from "../../../services/Service";
import type { AxiosError } from "axios";
import { formatFullDateTime } from "../../../utils/DateUtils";
import {
  MoneyIcon,
  SpeedometerIcon,
  StrategyIcon,
} from "@phosphor-icons/react";

function DetalhesCarona() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const [carona, setCarona] = useState<Carona | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mostrarFormAtualizacao, setMostrarFormAtualizacao] = useState(false);
  const [isPassageiro, setIsPassageiro] = useState(true);
  const isMotorista = useMemo(() => {
    return Number(usuario.id) === Number(carona?.motorista?.id);
  }, [usuario.id, carona?.motorista?.id]);

  const formattedTime = useMemo(() => {
    if (typeof carona?.tempoViagem === "number") {
      const horas = Math.floor(carona.tempoViagem);
      const minutos = Math.round((carona.tempoViagem - horas) * 60);
      if (minutos > 0) {
        return `${horas}h ${minutos}min`;
      }
      return `${horas}h`;
    }
    return "";
  }, [carona?.tempoViagem]);

  const formattedDateTimePartida = useMemo(() => {
    return formatFullDateTime(carona?.dataHoraPartida);
  }, [carona?.dataHoraPartida, formatFullDateTime]);

  const formattedDateTimeChegada = useMemo(() => {
    return formatFullDateTime(carona?.dataHoraChegada);
  }, [carona?.dataHoraChegada, formatFullDateTime]);

  const buscarCaronas = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const dadosCarona = await buscar(`/caronas/${id}`);
      setCarona(dadosCarona);
    } catch (error: any) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 403) {
        ToastAlerta("Sessão expirada. Faça login novamente.", "info");
        handleLogout();
      } else if (axiosError.response?.status === 404) {
        setError("Carona não encontrada.");
      } else {
        setError("Erro ao carregar detalhes da carona.");
      }
    } finally {
      setLoading(false);
    }
  }, [id, usuario.id, handleLogout]);

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado para ver os detalhes.", "info");
      navigate("/login");
      return;
    }
    if (id) {
      buscarCaronas();
    } else {
      setError("ID da carona não fornecido na URL.");
      setLoading(false);
    }
  }, [id, token, navigate, buscarCaronas]);

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

  if (!carona) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <p className="text-gray-600 text-xl font-semibold">
          Carona não encontrada.
        </p>
      </div>
    );
  }
  const handleSucessoAtualizacao = () => {
    setMostrarFormAtualizacao(false);
    buscarCaronas();
    ToastAlerta("Carona atualizada com sucesso!", "sucesso");
  };
  const handleSucessoDelecao = () => {
    navigate("/caronas");

    ToastAlerta("Carona deletada com sucesso!", "sucesso");
  };
  const alternarFormularioAtualizacao = () => {
    setMostrarFormAtualizacao(!mostrarFormAtualizacao);
  };

  async function comprarPassagem() {
    if (!usuario.token) {
      ToastAlerta(
        "Você precisa estar logado para comprar uma passagem.",
        "error"
      );
      navigate("/login");
      return;
    }

    if (usuario.tipo !== "passageiro") {
      setIsPassageiro(false);
      ToastAlerta("Apenas passageiros podem reservar caronas!", "info");
      navigate("/perfil");
      return;
    }
    if (
      usuario.id ===
      carona.passagensVendidas
        ?.map((p) => p.passageiro?.id)
        .find((id) => id === usuario.id)
    ) {
      return;
    }

    const passagemParaComprar = {
      caronaId: carona?.id,
    };

    try {
      const pagamento = {
        caronaId: carona?.id,
        nomeCliente: usuario.nome,
        emailCliente: usuario.email,
        valorEmCentavos: carona ? Number(carona.valorPorPassageiro) * 100 : 0,
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/passagens/pagamento/abacate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: usuario.token,
          },
          body: JSON.stringify(pagamento),
        }
      );

      if (!response.ok) {
        throw new Error(`Erro ao gerar pagamento: ${response.status}`);
      }

      const responseJson = await response.json();
      const linkPagamento = responseJson.data.url;

      window.location.href = linkPagamento;
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
        ToastAlerta("Erro ao gerar pagamento.", "error");
      }
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-22">
        <div className="ontainer mx-auto px-4 max-w-4xl bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-6 text-center">
            Detalhes da Carona
          </h1>

          <section
            id="details"
            className="border border-blue-100 rounded-lg p-6 mb-8 bg-blue-50"
          >
            <h3 className="text-2xl font-semibold text-blue-800 mb-4">
              Informações Principais
            </h3>
            <div className="space-y-3 text-gray-700">
              <p className="flex items-center space-x-2">
                <User className="w-5 h-5 text-blue-600" />
                <strong>Motorista:</strong>&nbsp;
                {carona.motorista ? carona.motorista.nome : "N/A"}
              </p>

              <p className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <strong>Origem:</strong>&nbsp; {carona.origem}
              </p>
              <p className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-blue-600 transform rotate-180" />
                <strong>Destino:</strong>&nbsp; {carona.destino}
              </p>
              <p className="flex items-center space-x-2">
                <Car className="w-5 h-5 text-blue-600" />
                <strong>Distância:</strong>&nbsp; {carona.distanciaKm} km
              </p>
              <p className="flex items-center space-x-2">
                <SpeedometerIcon className="w-5 h-5 text-blue-600" />
                <strong>Velocidade média:</strong>&nbsp; {carona.velocidade}{" "}
                km/h
              </p>
              <p className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <strong>Tempo de viagem:</strong>&nbsp; {formattedTime}
              </p>
              <p className="flex items-center space-x-2">
                <Calendar1 className="w-5 h-5 text-blue-600" />
                <strong>Data de saída: </strong>&nbsp;{" "}
                {formattedDateTimePartida}
              </p>

              <p className="flex items-center space-x-2">
                <Calendar1 className="w-5 h-5 text-blue-600" />
                <strong>Data de chegada: </strong>&nbsp;{" "}
                {formattedDateTimeChegada}
              </p>

              <p className="flex items-center space-x-2">
                <MoneyIcon className="w-5 h-5 text-blue-600" />
                <strong>Valor por passageiro: </strong>&nbsp; R${" "}
                {carona.valorPorPassageiro}
              </p>

              <p className="flex items-center space-x-2">
                <Armchair className="w-5 h-5 text-blue-600" />
                <strong>Vagas disponíveis:</strong>&nbsp; {carona.vagas}
              </p>

              <p className="flex items-center space-x-2">
                <TicketCheckIcon className="w-5 h-5 text-blue-600" />
                <strong>Passagens vendidas:</strong>&nbsp;
                {carona.passagensVendidas ? carona.passagensVendidas.length : 0}
              </p>
              <p className="flex items-center space-x-2">
                <StrategyIcon className="w-5 h-5 text-blue-600" />
                <strong>Status da carona: </strong>&nbsp; {carona.statusCarona}
              </p>
            </div>
          </section>

          <section id="tickets_sold">
            <h2 className="text-3xl font-bold text-blue-900 mb-5 text-center">
              Passagens Vendidas (
              {carona.passagensVendidas ? carona.passagensVendidas.length : 0})
            </h2>
            {carona.passagensVendidas && carona.passagensVendidas.length > 0 ? (
              <ul className="space-y-4">
                {carona.passagensVendidas.map((passagem) => (
                  <li
                    key={passagem.id}
                    className="bg-gray-100 rounded-md p-4 shadow-sm border border-gray-200"
                  >
                    <p className="font-semibold text-gray-800">
                      Passagem ID: {passagem.id}
                    </p>
                    {passagem.passageiro && (
                      <p className="text-sm text-gray-600">
                        Passageiro:{" "}
                        <span className="font-medium text-blue-700">
                          {passagem.passageiro.nome}
                        </span>
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-600 text-lg py-4">
                Nenhuma passagem vendida para esta carona ainda.
              </p>
            )}
          </section>

          {mostrarFormAtualizacao && (
            <FormAtualizarCarona
              caronaToUpdate={carona}
              onUpdateSuccess={handleSucessoAtualizacao}
              onCancel={() => setMostrarFormAtualizacao(false)}
            />
          )}
          <div className="flex flex-col items-center justify-center">
            {isMotorista ? (
              <div className="mt-8 text-center flex flex-col sm:flex-row justify-center gap-4 p-4 m-10">
                <button
                  disabled={carona.statusCarona !== "AGENDADA"}
                  onClick={alternarFormularioAtualizacao}
                  className="cursor-pointer py-3 px-8 bg-blue-900 hover:bg-blue-700 text-white font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {mostrarFormAtualizacao ? "Cancelar Edição" : "Editar Carona"}
                </button>
                <ModalDeletarCarona onDeleteSuccess={handleSucessoDelecao} />
              </div>
            ) : (
              <div className="mt-8 text-center flex justify-center p-4 m-10">
                <button
                  className="text-white py-3 px-8 bg-yellow-400 hover:bg-yellow-500 font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed disabled:hover:scale-100"
                  disabled={
                    carona.vagas <= 0 ||
                    carona.statusCarona !== "AGENDADA" ||
                    !isPassageiro
                  }
                  onClick={comprarPassagem}
                >
                  {carona.vagas <= 0 ? "Vagas Esgotadas" : "Comprar Passagem"}
                </button>
              </div>
            )}

            <Link
              to="/caronas"
              className=" cursor-pointer col-span-full mt-6 py-3 px-8 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Voltar
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetalhesCarona;

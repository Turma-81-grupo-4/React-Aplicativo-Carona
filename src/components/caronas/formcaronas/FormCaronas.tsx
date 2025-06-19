import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Carona from "../../../models/Carona";
import { cadastrar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { CalendarDays } from "lucide-react";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { MoneyIcon } from "@phosphor-icons/react";
import { NumericFormat } from "react-number-format";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import "./FormCaronas.css";

const libraries: ("places" | "geometry")[] = ["places", "geometry"];

function FormCaronas() {
  const navigate = useNavigate();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;
  const usuarioId = usuario.id;
  const [isMotorista, setIsMotorista] = useState(true);

  const [loading, setLoading] = useState(false);

  const browserLanguage = navigator.language || "pt-BR";
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_Maps_API_KEY,
    libraries,
    language: browserLanguage,
  });

  const [message, setMessage] = useState<string | null>(null);
  const [originAutocomplete, setOriginAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [destinationAutocomplete, setDestinationAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  type CaronaForm = Omit<
    Carona,
    | "id"
    | "tempoViagem"
    | "motorista"
    | "passagensVendidas"
    | "dataHoraChegada"
    | "statusCarona"
  > & {
    dataHoraPartida: string;
    valorPorPassageiro: number;
  };

  const [formData, setFormData] = useState<CaronaForm>({
    dataHoraPartida: "",
    origem: "",
    destino: "",
    distanciaKm: 0,
    velocidade: 0,
    vagas: 0,
    valorPorPassageiro: 0,
  });

  const calculateRoute = useCallback((origin: string, destination: string) => {
    if (!origin || !destination) return;
    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      { origin, destination, travelMode: google.maps.TravelMode.DRIVING },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          const route = result.routes[0].legs[0];
          if (route.distance) {
            const distanciaEmKm = parseFloat(
              (route.distance.value / 1000).toFixed(2)
            );
            setFormData((prev) => ({ ...prev, distanciaKm: distanciaEmKm }));
          }
        } else {
          ToastAlerta(
            `Não foi possível calcular a rota. Status: ${status}`,
            "erro"
          );
        }
      }
    );
  }, []);

  const onOriginLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setOriginAutocomplete(autocomplete);
  };

  const onDestinationLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setDestinationAutocomplete(autocomplete);
  };

  const onOriginPlaceChanged = () => {
    if (originAutocomplete !== null) {
      const place = originAutocomplete.getPlace();
      if (place.formatted_address) {
        const newOrigin = place.formatted_address;
        setFormData((prev) => ({ ...prev, origem: newOrigin }));
      }
    } else {
      console.error("Erro: Autocomplete de origem não está carregado.");
    }
  };

  const onDestinationPlaceChanged = () => {
    if (destinationAutocomplete !== null) {
      const place = destinationAutocomplete.getPlace();
      if (place.formatted_address) {
        const newDestination = place.formatted_address;
        setFormData((prev) => ({ ...prev, destino: newDestination }));
      }
    } else {
      console.error("Erro: Autocomplete de destino não está carregado.");
    }
  };

  useEffect(() => {
    if (formData.origem && formData.destino) {
      calculateRoute(formData.origem, formData.destino);
    }
  }, [formData.origem, formData.destino, calculateRoute]);
  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", "info");
      navigate("/login");
    } else if (usuario.tipo !== "motorista") {
      setIsMotorista(false);
      ToastAlerta("Apenas motoristas podem cadastrar caronas!", "info");
      navigate("/caronas");
    }
  }, [usuario, navigate, token]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "valorPorPassageiro") {
      const cleanedValue = value.replace(/[^0-9,-]/g, "").replace(",", ".");
      const numericValue = parseFloat(cleanedValue);
      setFormData({
        ...formData,
        [name]: isNaN(numericValue) ? 0 : numericValue,
      });
    } else if (["distanciaKm", "velocidade", "vagas"].includes(name)) {
      setFormData({ ...formData, [name]: parseInt(value, 10) || 0 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    if (
      !formData.dataHoraPartida ||
      !formData.origem ||
      !formData.destino ||
      formData.vagas <= 0 ||
      formData.distanciaKm <= 0 ||
      formData.velocidade <= 0 ||
      formData.valorPorPassageiro <= 0
    ) {
      ToastAlerta(
        "Por favor, preencha todos os campos obrigatórios corretamente!",
        "info"
      );
      setLoading(false);
      return;
    }

    const dataHoraParaBackend = formData.dataHoraPartida + ":00";

    try {
      const caronaParaCadastrar = {
        ...formData,
        dataHoraPartida: dataHoraParaBackend,
        motorista: {
          id: usuarioId,
        },
      };

      await cadastrar("/caronas", caronaParaCadastrar);
      ToastAlerta("Carona cadastrada com sucesso!", "sucesso");
      navigate("/caronas");
    } catch (error: any) {
      ToastAlerta(
        "Erro ao cadastrar carona. Verifique os dados e tente novamente.",
        "erro"
      );

      if (error.response && error.response.status === 403) {
        ToastAlerta("Sessão expirada. Faça login novamente.", "info");
        handleLogout();
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded || loading) {
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
  if (loadError) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-red-500 text-lg">
          Erro ao carregar o Google Maps. Verifique sua chave de API e conexão.
        </p>
      </div>
    );
  }

  return (
    <>
      <section
        id="formcaronas"
        className="bg-no-repeat min-h-screen bg-cover bg-center flex items-center justify-center p-4"
      >
        <div className="absolute inset-0 fundoCadastro bg-cover bg-center bg-no-repeat">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-700/80 backdrop-blur-[1px]"></div>
        </div>
        <div className="relative z-10 w-full max-w-5xl p-8 bg-white/20 backdrop-blur-md rounded-2xl shadow-xl border border-white/30 text-white">
          <h1 className="text-4xl font-bold mb-8 text-center text-white drop-shadow-lg">
            Oferecer Nova Carona
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {message && (
              <p className="success-message text-green-300 text-center col-span-full">
                {message}
              </p>
            )}

            <div className="flex flex-col gap-2 relative">
              <label htmlFor="dataHoraPartida" className="sr-only">
                Data da Viagem:
              </label>
              <div className="flex items-center bg-white/30 rounded-lg p-3 shadow-inner">
                <CalendarDays className="w-5 h-5 mr-3 text-white" />
                <input
                  type="datetime-local"
                  id="dataHoraPartida"
                  name="dataHoraPartida"
                  value={formData.dataHoraPartida}
                  onChange={handleChange}
                  required
                  className="flex-grow bg-transparent outline-none text-lg"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 relative">
              <div className="flex items-center bg-white/30 rounded-lg p-3 shadow-inner w-full">
                <Autocomplete
                  onLoad={onOriginLoad}
                  onPlaceChanged={onOriginPlaceChanged}
                >
                  <input
                    type="text"
                    placeholder="Origem"
                    className="w-full flex-grow bg-transparent outline-none placeholder-white text-white text-lg"
                  />
                </Autocomplete>
              </div>
            </div>

            <div className="flex flex-col gap-2 relative">
              <div className="flex items-center bg-white/30 rounded-lg p-3 shadow-inner w-full">
                <Autocomplete
                  onLoad={onDestinationLoad}
                  onPlaceChanged={onDestinationPlaceChanged}
                >
                  <input
                    type="text"
                    placeholder="Destino"
                    className="w-full flex-grow bg-transparent outline-none placeholder-white text-white text-lg"
                  />
                </Autocomplete>
              </div>
            </div>

            <div className="flex flex-col gap-2 relative">
              <label htmlFor="distancia" className="sr-only">
                Distância (km):
              </label>
              <div className="flex items-center bg-white/30 rounded-lg p-3 shadow-inner">
                <input
                  type="number"
                  id="distancia"
                  name="distanciaKm"
                  placeholder="Distância (km)"
                  value={formData.distanciaKm > 0 ? formData.distanciaKm : ""}
                  readOnly
                  className="flex-grow bg-transparent outline-none placeholder-white text-white text-lg cursor-not-allowed opacity-70"
                  required
                  min={1}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 relative">
              <label htmlFor="velocidade" className="sr-only">
                Velocidade Média (km/h):
              </label>
              <div className="flex items-center bg-white/30 rounded-lg p-3 shadow-inner">
                <input
                  type="number"
                  id="velocidade"
                  name="velocidade"
                  placeholder="Velocidade"
                  value={
                    formData.velocidade === 0 ? "" : String(formData.velocidade)
                  }
                  onChange={handleChange}
                  required
                  min={1}
                  className="flex-grow bg-transparent outline-none placeholder-white text-white text-lg"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 relative">
              <label htmlFor="vagas" className="sr-only">
                Número de Vagas:
              </label>
              <div className="flex items-center bg-white/30 rounded-lg p-3 shadow-inner">
                <input
                  type="number"
                  id="vagas"
                  name="vagas"
                  placeholder="Vagas"
                  value={formData.vagas || ""}
                  onChange={handleChange}
                  required
                  min={1}
                  className="flex-grow bg-transparent outline-none placeholder-white text-white text-lg"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 relative">
              <label htmlFor="valorPorPassageiro" className="sr-only">
                Valor por Passageiro:
              </label>
              <div className="flex items-center bg-white/30 rounded-lg p-3 shadow-inner">
                <MoneyIcon className="w-5 h-5 mr-3 text-white" />
                <NumericFormat
                  id="valorPorPassageiro"
                  name="valorPorPassageiro"
                  value={formData.valorPorPassageiro || ""}
                  placeholder="R$ 0,00"
                  thousandSeparator="."
                  decimalSeparator=","
                  decimalScale={2}
                  fixedDecimalScale
                  prefix="R$ "
                  allowNegative={false}
                  allowLeadingZeros={false}
                  onValueChange={(values) => {
                    const { floatValue } = values;
                    setFormData({
                      ...formData,
                      valorPorPassageiro: floatValue ?? 0,
                    });
                  }}
                  className="flex-grow bg-transparent outline-none text-lg placeholder-white text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="cursor-pointer col-span-full mt-6 py-3 px-8 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
              disabled={loading}
            >
              {loading ? "Cadastrando..." : "Cadastrar Carona"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default FormCaronas;
function setOriginAutocomplete(autocomplete: google.maps.places.Autocomplete) {
  throw new Error("Function not implemented.");
}

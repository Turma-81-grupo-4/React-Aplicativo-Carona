import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import type Carona from "../../../models/Carona";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { atualizar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { NumericFormat } from "react-number-format";

const libraries: ("places" | "geometry")[] = ["places", "geometry"];

interface FormAtualizarCaronaProps {
  caronaToUpdate: Carona;
  onUpdateSuccess: () => void;
  onCancel?: () => void;
}

function FormAtualizarCarona({
  caronaToUpdate,
  onUpdateSuccess,
  onCancel,
}: FormAtualizarCaronaProps) {
  const navigate = useNavigate();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const [formData, setFormData] = useState<Carona>(caronaToUpdate);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const browserLanguage = navigator.language || "pt-BR";
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_Maps_API_KEY,
    libraries,
    language: browserLanguage,
  });
  const [originAutocomplete, setOriginAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [destinationAutocomplete, setDestinationAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const calculateRoute = useCallback(
    (origin: string, destination: string) => {
      if (!isLoaded || !origin || !destination) return;
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
            ToastAlerta(`Não foi possível calcular a rota.`, "erro");
          }
        }
      );
    },
    [isLoaded]
  );

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
    }
  };

  const onDestinationPlaceChanged = () => {
    if (destinationAutocomplete !== null) {
      const place = destinationAutocomplete.getPlace();
      if (place.formatted_address) {
        const newDestination = place.formatted_address;
        setFormData((prev) => ({ ...prev, destino: newDestination }));
      }
    }
  };
  useEffect(() => {
    if (formData.origem && formData.destino) {
      calculateRoute(formData.origem, formData.destino);
    }
  }, [formData.origem, formData.destino, calculateRoute]);

  useEffect(() => {
    setFormData(caronaToUpdate);
  }, [caronaToUpdate]);

  useEffect(() => {
    if (!token) {
      ToastAlerta("Você precisa estar logado para atualizar caronas.", "info");
      handleLogout();
      navigate("/login");
    }
  }, [token, navigate, handleLogout]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "velocidade" || name === "vagas"
          ? parseFloat(value) || 0
          : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const dataSelecionada = new Date(`${formData.dataHoraPartida}T00:00:00`);

    if (dataSelecionada < hoje) {
      setError(
        "A data da viagem não pode ser no passado. Por favor, escolha uma data futura."
      );
      setLoading(false);
      return;
    }

    if (
      !formData.dataHoraPartida ||
      !formData.origem ||
      !formData.destino ||
      formData.vagas <= 0 ||
      formData.distanciaKm <= 0 ||
      (typeof formData.velocidade === "number" && formData.velocidade <= 0) ||
      formData.origem.length < 10 ||
      formData.destino.length < 10
    ) {
      setError(
        "Por favor, preencha todos os campos obrigatórios corretamente (origem/destino min 10 caracteres, vagas/distância/velocidade > 0)."
      );
      setLoading(false);
      return;
    }

    try {
      const payload = {
        dataHoraPartida: formData.dataHoraPartida,
        origem: formData.origem,
        destino: formData.destino,
        distanciaKm: formData.distanciaKm,
        velocidade: formData.velocidade,
        vagas: formData.vagas,
        valorPorPassageiro: formData.valorPorPassageiro,
      };

      await atualizar(`/caronas/${formData.id}`, payload);

      onUpdateSuccess();
    } catch (error: any) {
      console.error("Erro ao atualizar carona:", error);
      if (error.response?.status === 401) {
        setError("Sua sessão expirou. Por favor, faça login novamente.");
        handleLogout();
      } else if (error.response?.status === 403) {
        setError("Você não tem permissão para atualizar esta carona.");
      } else if (error.response?.status === 404) {
        setError("Carona não encontrada.");
      } else {
        setError(
          "Erro ao atualizar carona. Verifique os dados e tente novamente."
        );
      }
    } finally {
      setLoading(false);
    }
  };
  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center p-8">
        <p>Carregando mapa...</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex justify-center items-center p-8">
        <p>Erro ao carregar o mapa. Verifique sua conexão e tente novamente.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-md mb-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="dataHoraPartida"
            className="block text-sm font-medium text-gray-700"
          >
            Data da Viagem
          </label>
          <input
            type="datetime-local"
            id="dataHoraPartida"
            name="dataHoraPartida"
            value={formData.dataHoraPartida}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
          />
        </div>
        <div>
          <label
            htmlFor="origem"
            className="block text-sm font-medium text-gray-700"
          >
            Origem
          </label>
          <Autocomplete
            onLoad={onOriginLoad}
            onPlaceChanged={onOriginPlaceChanged}
          >
            <input
              type="text"
              id="origem"
              name="origem"
              placeholder="Digite o endereço de partida"
              defaultValue={formData.origem || ""}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
              required
            />
          </Autocomplete>
        </div>
        <div>
          <label
            htmlFor="destino"
            className="block text-sm font-medium text-gray-700"
          >
            Destino
          </label>
          <Autocomplete
            onLoad={onDestinationLoad}
            onPlaceChanged={onDestinationPlaceChanged}
          >
            <input
              type="text"
              id="destino"
              name="destino"
              placeholder="Digite o endereço de destino"
              defaultValue={formData.destino || ""}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
              required
            />
          </Autocomplete>
        </div>
        <div>
          <label
            htmlFor="distanciaKm"
            className="block text-sm font-medium text-gray-700"
          >
            Distância (km)
          </label>
          <input
            type="number"
            id="distanciaKm"
            name="distanciaKm"
            value={formData.distanciaKm > 0 ? formData.distanciaKm : ""}
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 bg-gray-200 cursor-not-allowed" // Estilo de desabilitado
            placeholder="A distância será calculada automaticamente"
            required
          />
        </div>
        <div>
          <label
            htmlFor="velocidade"
            className="block text-sm font-medium text-gray-700"
          >
            Velocidade Média (km/h)
          </label>
          <input
            type="number"
            id="velocidade"
            name="velocidade"
            value={
              typeof formData.velocidade === "number" ? formData.velocidade : 0
            }
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            min={1}
            required
          />
        </div>
        <div>
          <label
            htmlFor="vagas"
            className="block text-sm font-medium text-gray-700"
          >
            Vagas Disponíveis
          </label>
          <input
            type="number"
            id="vagas"
            name="vagas"
            value={formData.vagas || 0}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            min={1}
            required
          />
        </div>

        <div>
          <label
            htmlFor="vagas"
            className="bllock text-sm font-medium text-gray-700"
          >
            Valor por Passageiro
          </label>
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
              setFormData({ ...formData, valorPorPassageiro: floatValue ?? 0 });
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            min={1}
          />
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <div className="flex gap-4 justify-center">
          <button
            type="submit"
            className="cursor-pointer py-3 px-8 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
            disabled={loading}
          >
            {loading ? "Atualizando..." : "Atualizar Carona"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormAtualizarCarona;

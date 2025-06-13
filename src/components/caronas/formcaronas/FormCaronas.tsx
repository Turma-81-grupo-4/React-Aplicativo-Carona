import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Carona from "../../../models/Carona";
import { cadastrar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { CalendarDays } from "lucide-react";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { MoneyIcon } from "@phosphor-icons/react";

function FormCaronas() {
  const navigate = useNavigate();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;
  const usuarioId = usuario.id;

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  type CaronaForm = Omit<
    Carona,
    "id" | "tempoViagem" | "motorista" | "passagensVendidas" | "dataHoraChegada" | "statusCarona"
  > & {
    // Adicionando de volta as propriedades que você usa, mas que foram omitidas
    // ou que precisam de um tipo diferente no formulário (como dataHoraPartida)
    dataHoraPartida: string; // O input datetime-local lida com strings
    valorPorPassageiro: number; // Precisamos dela como número para cálculos
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

  useEffect(() => {
    if (token === "") {
      ToastAlerta(
        "Você precisa estar logado para cadastrar uma carona!",
        "info"
      );
      navigate("/login");
    }
  }, [token, navigate]);



  const formatCurrency = (value: number | undefined | null): string => {
    if (value === undefined || value === null) {
      return ""; 
    }
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };


  

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "valorPorPassageiro") {
      const cleanedValue = value.replace(/[^0-9,-]/g, '').replace(',', '.');
      const numericValue = parseFloat(cleanedValue);
      setFormData({ ...formData, [name]: isNaN(numericValue) ? 0 : numericValue });
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
      ToastAlerta("Por favor, preencha todos os campos obrigatórios corretamente!", "info");
      setLoading(false);
      return;
    }

    const dataHoraParaBackend = formData.dataHoraPartida + ':00';

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
              <label htmlFor="origem" className="sr-only">
                Origem:
              </label>
              <div className="flex items-center bg-white/30 rounded-lg p-3 shadow-inner">
                <input
                  type="text"
                  id="origem"
                  name="origem"
                  placeholder="Origem"
                  value={formData.origem}
                  onChange={handleChange}
                  required
                  minLength={10}
                  maxLength={255}
                  className="flex-grow bg-transparent outline-none placeholder-white text-white text-lg"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 relative">
              <label htmlFor="destino" className="sr-only">
                Destino:
              </label>
              <div className="flex items-center bg-white/30 rounded-lg p-3 shadow-inner">
                <input
                  type="text"
                  id="destino"
                  name="destino"
                  placeholder="Destino"
                  value={formData.destino}
                  onChange={handleChange}
                  required
                  minLength={10}
                  maxLength={255}
                  className="flex-grow bg-transparent outline-none placeholder-white text-white text-lg"
                />
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
                  placeholder="Distancia"
                  value={formData.distanciaKm || ""}
                  onChange={handleChange}
                  required
                  min={1}
                  className="flex-grow bg-transparent outline-none placeholder-white text-white text-lg"
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
                <input
                  type="text" 
                  id="valorPorPassageiro"
                  name="valorPorPassageiro"
                  value={formatCurrency(formData.valorPorPassageiro)}
                  onChange={handleChange}
                  onBlur={(e) => {
                      const numericValue = parseFloat(e.target.value.replace(/[^0-9,-]/g, '').replace(',', '.'));
                      setFormData(prevFormData => ({
                          ...prevFormData,
                          valorPorPassageiro: isNaN(numericValue) ? 0 : numericValue
                      }));
                  }}
                  required
                  className="flex-grow bg-transparent outline-none text-lg placeholder-white" 
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


import type Passagem from "../../../models/Passagem";
import { useMemo, useState } from "react";

interface CardPassagemProps {
  passagem: Passagem;
  onDeleteClick?: () => void;
  hideActions?: boolean;
}

function CardPassagem({
  passagem,
  onDeleteClick,
  hideActions = false,
}: CardPassagemProps) {
  const { passageiro, carona } = passagem;

  const hoje = useMemo(() => {
    const data = new Date();
    data.setHours(0, 0, 0, 0);
    return data;
  }, []);

  const dataViagem = useMemo(
    () => new Date(`${carona?.dataViagem}T00:00:00`),
    [carona?.dataViagem]
  );

  const isFutureRide = dataViagem >= hoje;

  const outerBgClass = isFutureRide ? "bg-blue-900" : "bg-slate-700";
  const accentBgClass = isFutureRide ? "bg-blue-900" : "bg-slate-700";
  const textColorClass = isFutureRide ? "text-blue-800" : "text-slate-600";
  const [buttonText, setButtonText] = useState("Finalizada");
  const formattedTime = useMemo(() => {
    if (typeof carona?.tempoViagem === "number") {
      const horas = Math.floor(carona.tempoViagem);
      const minutos = Math.round((carona.tempoViagem - horas) * 60);
      return minutos > 0 ? `${horas}h ${minutos}min` : `${horas}h`;
    }
    return carona?.tempoViagem || "N/A";
  }, [carona?.tempoViagem]);

  return (
    <div className="flex items-center justify-center p-4">
      <div
        className={`w-full max-w-2xl mx-auto rounded-3xl transition-colors duration-300 ${outerBgClass}`}
      >
        <div className="bg-white relative drop-shadow-2xl rounded-3xl p-6 m-4">
          {/* Seção Cabeçalho */}
          <div className="flex items-center justify-between">
            <h2 className="font-medium">
              Carona com: {carona?.motorista?.nome ?? "Desconhecido"}
            </h2>
            <div className="ml-auto text-blue-800 font-bold"></div>
          </div>

          <div className="relative border-b-2 border-dashed my-5">
            <div
              className={`border-0 absolute rounded-full w-5 h-5 -mt-2.5 -left-6 transform -translate-x-1/2 ${accentBgClass}`}
            ></div>
            <div
              className={`absolute rounded-full w-5 h-5 -mt-2.5 -right-6 transform translate-x-1/2 ${accentBgClass}`}
            ></div>
          </div>

          {/* Seção Origem e Destino */}
          <div className="flex items-center justify-between gap-5">
            <div className="w-2/5">
              <p className="text-gray-500">Origem</p>
              <p className={`text-lg font-bold ${textColorClass} break-words`}>
                {carona?.origem}
              </p>
            </div>
            <div className="text-xl font-bold text-blue-800">→</div>
            <div className="w-2/5">
              <p className="text-gray-500">Destino</p>
              <p className={`text-lg font-bold ${textColorClass} break-words`}>
                {carona?.destino}
              </p>
            </div>
          </div>

          <div className="relative border-b-2 border-dashed my-5">
            <div
              className={`absolute rounded-full w-5 h-5 -mt-2.5 -left-6 transform -translate-x-1/2 ${accentBgClass}`}
            ></div>
            <div
              className={`absolute rounded-full w-5 h-5 -mt-2.5 -right-6 transform translate-x-1/2 ${accentBgClass}`}
            ></div>
          </div>

          {/* Seção Detalhes da Viagem */}
          <div className="flex justify-around gap-4 items-start text-center">
            <div className="flex flex-col text-sm w-24">
              <span>Data</span>
              <span className="font-semibold mt-1">
                {carona?.dataViagem
                  ? new Date(
                      `${carona.dataViagem}T00:00:00`
                    ).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
            <div className="flex flex-col text-sm w-24">
              <span>Vagas</span>
              <span className="font-semibold mt-1">{carona?.vagas}</span>
            </div>
            <div className="flex flex-col text-sm w-24">
              <span>Distância</span>
              <span className="font-semibold mt-1">{carona?.distancia} km</span>
            </div>
            <div className="flex flex-col text-sm w-24">
              <span>Tempo</span>
              <span className="font-semibold mt-1">{formattedTime}</span>
            </div>
          </div>

          <div className="relative border-b-2 border-dashed my-5">
            <div
              className={`border-0 absolute rounded-full w-5 h-5 -mt-2.5 -left-6 transform -translate-x-1/2 ${accentBgClass}`}
            ></div>
            <div
              className={`absolute rounded-full w-5 h-5 -mt-2.5 -right-6 transform translate-x-1/2 ${accentBgClass}`}
            ></div>
          </div>

          {/* Seção Passageiro e Ações (com renderização condicional) */}
          <div className="flex items-center justify-between pt-2 text-sm">
            <div>
              <span>Passageiro</span>
              <p className="font-semibold text-base">{passageiro?.nome}</p>
            </div>

            {!hideActions &&
              (isFutureRide ? (
                <button
                  onClick={onDeleteClick}
                  className="cursor-pointer bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-colors"
                >
                  Desistir da carona
                </button>
              ) : (
                <div className="text-center">
                  <button
                    className="min-w-32 cursor-pointer font-semibold text-gray-600 hover:bg-gray-300
                   bg-gray-200 px-3 py-2 rounded-lg"
                    onMouseEnter={() => setButtonText("Veja os detalhes")}
                    onMouseLeave={() => setButtonText("Finalizada")}
                    onClick={() => {}}
                  >
                    {buttonText}
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardPassagem;

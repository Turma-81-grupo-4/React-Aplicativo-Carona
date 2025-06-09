import { CarProfileIcon } from "@phosphor-icons/react";
import { Link, useNavigate } from "react-router-dom";
import type Passagem from "../../../models/Passagem";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

interface CardPassagemProps {
  passagem: Passagem;
}

function CardPassagem({ passagem }: CardPassagemProps) {
  console.log("Dados recebidos no CardPassagem:", passagem);
  const { usuario, handleLogout } = useContext(AuthContext);
  const { carona, passageiro } = passagem;
  const token = usuario.token;

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const dataViagem = new Date(`${carona?.dataViagem}T00:00:00`);

  const isDeletando = window.location.pathname.includes("deletarpassagem");
  const isFutureRide = dataViagem >= hoje;

  const outerBgClass = isFutureRide ? "bg-blue-900" : "bg-slate-700";
  const accentBgClass = isFutureRide ? "bg-blue-900" : "bg-slate-700";
  const textColorClass = isFutureRide ? "text-blue-800" : "text-slate-600";

  return (
    <div className="flex items-center justify-center p-4">
      <div
        className={`w-full max-w-2xl mx-auto rounded-3xl transition-colors duration-300 ${outerBgClass}`}
      >
        <div className="bg-white relative drop-shadow-2xl rounded-3xl p-6 m-4">
          {/* Seção Cabeçalho */}
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Sua Carona</h2>
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
          <div className="flex items-center justify-between">
            <div className="text-center w-40">
              <p className="text-sm text-gray-500">Origem</p>
              <p className={`text-xl font-bold ${textColorClass}`}>
                {carona?.origem}
              </p>
            </div>
            <CarProfileIcon size={40} className={`${textColorClass}`} />
            <div className="text-center w-40">
              <p className="text-xs text-gray-500">Destino</p>
              <p className={`text-xl font-bold ${textColorClass}`}>
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
          <div className="flex justify-around items-start text-center">
            <div className="flex flex-col text-sm w-24">
              <span>Data</span>
              <span className="font-semibold mt-1">
                {carona?.dataViagem
                  ? new Date(carona.dataViagem).toLocaleDateString()
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
              <span className="font-semibold mt-1">
                {carona?.tempoViagem} horas
              </span>
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

            {!isDeletando &&
              (isFutureRide ? (
                <Link to={`/deletarpassagem/${passagem.id}`}>
                  <button className="cursor-pointer bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                    Desistir da carona
                  </button>
                </Link>
              ) : (
                <div className="text-center">
                  <p className="font-semibold text-gray-600 bg-gray-300 px-3 py-2 rounded-lg">
                    Viagem Finalizada
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardPassagem;

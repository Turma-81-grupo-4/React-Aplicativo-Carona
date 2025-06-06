import { CarProfileIcon } from "@phosphor-icons/react";
import type Passagem from "../../../models/Passagem";
import { Link } from "react-router-dom";
import { deletar } from "../../../services/Service";

interface CardPassagemProps {
  passagem: Passagem;
}
function CardPassagem({ passagem }: CardPassagemProps) {
  return (
    <div className="flex items-center justify-center h-auto bg-center bg-cover">
      <div className="max-w-2x1 w-full h-auto mx-auto z-10 bg-blue-900 rounded-3xl">
        <div className="flex">
          <div className="bg-white relative drop-shadow-2xl rounded-3xl p-4 m-4 flex-1 w-full">
            <div className="flex-none sm:flex">
              <div className="flex-auto justify-evenly">
                <div className="flex-auto justify-evenly">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <h2 className="font-medium">Caronas</h2>
                    </div>
                    <div className="ml-auto text-blue-800">A380</div>
                  </div>
                  <div className="border-b-2 border-dashed my-5"></div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <div className="flex-auto text-xs text-gray-400 my-1">
                        <span className="mr-1 ">Origem</span>
                      </div>
                      <div className="w-full flex-none text-lg text-blue-800 font-bold leading-none">
                        {passagem.carona?.origem}
                      </div>
                      <div className="text-xs">Cochi</div>
                    </div>
                    <div className="flex flex-col">
                      <CarProfileIcon size={32} />
                    </div>
                    <div className="flex flex-col text-right">
                      <div className="flex-auto text-xs text-gray-400 my-1">
                        <span className="mr-1">Destino</span>
                      </div>
                      <div className="w-full flex-none text-lg text-blue-800 font-bold leading-none">
                        {passagem.carona?.destino}
                      </div>
                      <div className="text-xs">Dubai</div>
                    </div>
                  </div>
                  <div className="border-b-2 border-dashed my-5 pt-5">
                    <div className="absolute rounded-full w-5 h-5 bg-blue-900 -mt-2 -left-2"></div>
                    <div className="absolute rounded-full w-5 h-5 bg-blue-900 -mt-2 -right-2"></div>
                  </div>
                  <div className="flex items-center px-5 justify-between">
                    <div className="flex flex-col text-sm">
                      <span>Data da partida</span>
                      <div className="font-semibold">
                        {passagem.carona?.dataViagem}
                      </div>
                    </div>
                    <div className="flex flex-col text-sm">
                      <span>Vagas</span>
                      <div className="font-semibold">
                        {passagem.carona?.vagas}
                      </div>
                    </div>
                    <div className="flex flex-col text-sm">
                      <span>Distância</span>
                      <div className="font-semibold">
                        {passagem.carona?.distancia} km
                      </div>
                    </div>
                    <div className="flex flex-col text-sm">
                      <span>Tempo previsto</span>
                      <div className="font-semibold">
                        {passagem.carona?.tempoViagem} horas
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-b-2 border-dashed my-3 pt-5">
                  <div className="absolute rounded-full w-5 h-5 bg-blue-900 -mt-2 -left-2"></div>
                  <div className="absolute rounded-full w-5 h-5 bg-blue-900 -mt-2 -right-2"></div>
                </div>
                <div className="flex items-center px-5 text-sm">
                  <div className="flex flex-col">
                    <span>Passageiro</span>
                    <div className="font-semibold">
                      {passagem.passageiro?.nome}
                    </div>
                  </div>
                  <div className="flex flex-col mx-auto">
                    <span></span>
                    <div className="font-semibold"></div>
                  </div>
                  <div className="flex flex-col">
                    <Link to={`/deletarpassagem/${passagem.id}`}>
                      <button className="bg-red-800 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                        Desistir da carona
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardPassagem;

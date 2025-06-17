import { Armchair, Calendar1, User } from "lucide-react";
import type Carona from "../../../models/Carona";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { formatFullDateTime } from "../../../utils/DateUtils";
import { MoneyIcon, StrategyIcon } from "@phosphor-icons/react";

interface CardCaronasProps {
  carona: Carona;
}
function CardCaronas({ carona }: CardCaronasProps) {
  const hoje = new Date();
  const isFutureRide =
    carona?.dataHoraPartida && new Date(carona.dataHoraPartida) >= hoje;
  const iconsColor = isFutureRide ? "text-blue-600" : "text-slate-700";
  const textColor = isFutureRide ? "text-blue-900" : "text-slate-600";
  
  const formattedDateTimePartida = useMemo(() => {
      return formatFullDateTime(carona?.dataHoraPartida);
    }, [carona?.dataHoraPartida, formatFullDateTime]);


  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition cursor-pointer
                w-full">
      <div className="flex items-center mb-4 space-x-3">
        <User className={`w-7 h-7 ${iconsColor}`} />
        <p className={`font-semibold text-lg ${textColor}`}>
          {carona.motorista ? carona.motorista.nome : "Motorista Indefinido"}
        </p>
      </div>
      <div className="mb-2">
        <p>
          <strong>De:</strong> {carona.origem}
        </p>
        <p>
          <strong>Para:</strong> {carona.destino}
        </p>
      </div>
      <div className="mb-2 text-sm text-gray-600">
        <p className="flex items-center space-x-2">
          <Calendar1 className={`w-5 h-5 ${iconsColor}`} />
          <strong>Data:</strong>{" "}&nbsp;
          {formattedDateTimePartida}
        </p>
        <p className="flex items-center space-x-2">
           <MoneyIcon className={`w-5 h-5 ${iconsColor}`}  />
          <strong>Valor: </strong>&nbsp; R$ {carona.valorPorPassageiro}
        </p>
        <p className="flex items-center space-x-2">
          <Armchair className={`w-5 h-5 ${iconsColor}`}  />
          <strong>Vagas disponíveis:</strong>&nbsp; {carona.vagas}
        </p>
        <p className="flex items-center space-x-2">
            <StrategyIcon className={`w-5 h-5 ${iconsColor}`}  />
            <strong>Status da carona: </strong>&nbsp; {carona.statusCarona}
        </p>
      </div>
      {isFutureRide ? (
        <Link
          to={`/caronas/${carona.id}`}
          className="mt-4 block text-center w-full bg-blue-900 text-white rounded-md py-2 font-semibold hover:bg-blue-700 transition"
        >
          Ver Detalhes
        </Link>
      ) : (
        <Link
          to=""
          className="mt-4 block text-center w-full bg-slate-700 text-white rounded-md py-2 font-semibold"
        >
          Ver Detalhes
        </Link>
      )}

      
    </div>
  );
}

export default CardCaronas;

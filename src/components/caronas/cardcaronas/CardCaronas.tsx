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
  
  const formattedDateTimePartida = useMemo(() => {
      return formatFullDateTime(carona?.dataHoraPartida);
    }, [carona?.dataHoraPartida, formatFullDateTime]);


  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition cursor-pointer">
      <div className="flex items-center mb-4 space-x-3">
        <User className="w-7 h-7 text-blue-600" />
        <p className="font-semibold text-lg text-blue-900">
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
          <Calendar1 className="w-5 h-5 text-blue-600" />
          <strong>Data:</strong>{" "}&nbsp;
          {formattedDateTimePartida}
        </p>
        <p className="flex items-center space-x-2">
           <MoneyIcon className="w-5 h-5 text-blue-600" />
          <strong>Valor: </strong>&nbsp; R$ {carona.valorPorPassageiro}
        </p>
        <p className="flex items-center space-x-2">
          <Armchair className="w-5 h-5 text-blue-600" />
          <strong>Vagas disponíveis:</strong>&nbsp; {carona.vagas}
        </p>
        <p className="flex items-center space-x-2">
            <StrategyIcon className="w-5 h-5 text-blue-600" />
            <strong>Status da carona: </strong>&nbsp; {carona.statusCarona}
        </p>
      </div>
      <Link
        to={`/caronas/${carona.id}`}
        className="mt-4 block text-center w-full bg-blue-900 text-white rounded-md py-2 font-semibold hover:bg-blue-700 transition"
      >
        Ver Detalhes
      </Link>
    </div>
  );
}

export default CardCaronas;

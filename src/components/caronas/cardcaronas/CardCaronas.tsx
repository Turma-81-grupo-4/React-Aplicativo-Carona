import { User } from "lucide-react";
import type Carona from "../../../models/Carona";
import { Link } from "react-router-dom";
import { useMemo } from "react";

interface CardCaronasProps {
  carona: Carona;
}

function CardCaronas({ carona }: CardCaronasProps) {
  const dataViagem = useMemo(
    () => new Date(`${carona?.dataViagem}T00:00:00`),
    [carona?.dataViagem]
  );

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
        <p>
          <strong>Data:</strong>{" "}
          {dataViagem.toLocaleDateString("pt-BR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </p>
        <p>
          <strong>Vagas disponíveis:</strong> {carona.vagas}
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

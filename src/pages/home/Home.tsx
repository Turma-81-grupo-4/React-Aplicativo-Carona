import React, { useEffect } from "react";
import { MapPin, Phone, Clock, User, Car } from "lucide-react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const rides = [
    {
      id: 1,
      driver: "Ana Souza",
      from: "São Paulo - Centro",
      to: "Campinas - Vila Industrial",
      date: "2025-06-10",
      time: "08:00",
      seatsAvailable: 3,
    },
    {
      id: 2,
      driver: "Carlos Lima",
      from: "São Paulo - Zona Sul",
      to: "Santos - Gonzaga",
      date: "2025-06-11",
      time: "09:30",
      seatsAvailable: 2,
    },
    {
      id: 3,
      driver: "Maria Oliveira",
      from: "São Paulo - Mooca",
      to: "São José dos Campos - Centro",
      date: "2025-06-12",
      time: "07:45",
      seatsAvailable: 4,
    },
  ];

  const googleMapsEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.197490458315!2d-46.65906922571362!3d-23.561349561589815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1748956969855!5m2!1spt-BR!2sbr";

  return (
    <div className="min-h-screen bg-gray-50">
      <section
        id="welcome"
        className="py-20 bg-gradient-to-b from-cyan-500 via-cyan-500 to-blue-800 text-white text-center"
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-5xl font-extrabold mb-4">
            Bem-vindo ao <span className="text-yellow-400">Carona</span>
          </h1>
          <p className="text-xl mb-8 max-w-xl mx-auto">
            Encontre caronas seguras e práticas para sua próxima viagem
            Conecte-se com motoristas e passageiros próximos
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/caronas"
              className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-semibold px-8 py-3 rounded-full transition transform hover:scale-105 shadow-lg"
            >
              Buscar Carona
            </Link>
            <Link
              to="/caronas/cadastrar"
              className="bg-transparent border-2 border-yellow-400 hover:border-yellow-300 text-yellow-400 hover:text-yellow-300 font-semibold px-8 py-3 rounded-full transition transform hover:scale-105 shadow-lg"
            >
              Oferecer Carona
            </Link>
          </div>
        </div>
      </section>

      <section id="rides" className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold text-blue-900 mb-8 text-center">
            Caronas Próximas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rides.map((ride) => (
              <div
                key={ride.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition"
              >
                <div className="flex items-center mb-4 space-x-3">
                  <User className="w-7 h-7 text-blue-600" />
                  <p className="font-semibold text-lg text-blue-900">
                    {ride.driver}
                  </p>
                </div>
                <div className="mb-2">
                  <p>
                    <strong>De:</strong> {ride.from}
                  </p>
                  <p>
                    <strong>Para:</strong> {ride.to}
                  </p>
                </div>
                <div className="mb-2 text-sm text-gray-600">
                  <p>
                    <strong>Data:</strong> {ride.date}
                  </p>
                  <p>
                    <strong>Horário:</strong> {ride.time}
                  </p>
                  <p>
                    <strong>Vagas disponíveis:</strong> {ride.seatsAvailable}
                  </p>
                </div>
                <Link
                  to="/caronas"
                  className="mt-4 block text-center w-full bg-blue-900 text-white rounded-md py-2 font-semibold hover:bg-blue-700 transition"
                >
                  Solicitar Carona
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="location" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h3 className="text-4xl font-bold text-blue-900 mb-6 text-center">
            Sugestões para você
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                city: "Campinas",
                reason: "Rota popular para quem sai de SP",
                rides: 12,
              },
              {
                city: "Santos",
                reason: "Muito procurada nos fins de semana",
                rides: 8,
              },
              {
                city: "São José dos Campos",
                reason: "Ideal para viagens a trabalho",
                rides: 10,
              },
            ].map((suggestion, index) => (
              <div
                key={index}
                className="bg-blue-50 p-6 rounded-lg shadow hover:shadow-lg transition"
              >
                <h4 className="text-xl font-semibold text-blue-800 mb-1">
                  {suggestion.city}
                </h4>
                <p className="text-gray-700 text-sm mb-1">
                  {suggestion.reason}
                </p>
                <p className="text-gray-600 text-sm">
                  Caronas disponíveis: <strong>{suggestion.rides}</strong>
                </p>
              </div>
            ))}
          </div>

          <h4 className="text-3xl font-bold text-blue-900 mb-6 text-center">
            O que estão dizendo
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                name: "João M.",
                rating: 5,
                comment: "Excelente serviço! Motorista muito pontual.",
              },
              {
                name: "Fernanda R.",
                rating: 4,
                comment:
                  "Boa experiência, mas o app poderia mostrar mais detalhes da rota.",
              },
              {
                name: "Lucas A.",
                rating: 5,
                comment: "Super recomendo! Fácil de usar e seguro.",
              },
            ].map((review, index) => (
              <div
                key={index}
                className="bg-white border border-blue-100 p-6 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <p className="font-semibold text-blue-800">{review.name}</p>
                <p className="text-yellow-500 mb-2">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </p>
                <p className="text-gray-700 text-sm">{review.comment}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-10 justify-center items-center">
            <div className="w-full lg:w-1/2 max-w-lg border-2 border-blue-200 rounded-lg p-6 shadow-md bg-gray-50">
              <h4 className="text-2xl font-semibold mb-4 text-blue-900">
                Contatos e Suporte
              </h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-6 h-6 text-blue-600" />
                  <p className="text-gray-800">Telefone: (11) 98765-4321</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-6 h-6 text-blue-600" />
                  <p className="text-gray-800">
                    Atendimento: Seg-Sex, 08h às 18h
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-6 h-6 text-blue-600" />
                  <p className="text-gray-800">
                    Sede: Av. Paulista, São Paulo - SP
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 max-w-lg rounded-lg overflow-hidden shadow-md">
              <iframe
                src={googleMapsEmbedUrl}
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa das caronas"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

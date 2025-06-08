import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import type Carona from "../../../models/Carona";
import { buscarComRetorno } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";
import { Clock, Car, MapPin, User } from "lucide-react";
import { RotatingLines } from "react-loader-spinner";
import FormAtualizarCarona from '../formcaronas/FormAtualizarCarona';
import { ToastAlerta } from "../../../utils/ToastAlerta";
import ModalDeletarCarona from "../deletarcarona/ModalDeletarCarona";


function DetalhesCarona() {

    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [carona, setCarona] = useState<Carona | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [mostrarFormAtualizacao, setMostrarFormAtualizacao] = useState(false);

    const { usuario, handleLogout } = useContext(AuthContext); 
    let token = usuario.token;


    const formattedDate = carona && carona.dataViagem ? new Date(carona.dataViagem).toLocaleDateString('pt-BR') : "N/A";
    const formattedTime = carona && carona.tempoViagem ? `${carona.tempoViagem.toFixed(1)}h` : "N/A";

    if (token) { // Verifica se o token não é nulo/vazio antes de tentar limpar
        token = token.trim(); 
    }

    useEffect(() => {
        if (id !== undefined && token !== '') { 
            buscarCaronas();
        } else if (token === '') { 
            if (!localStorage.getItem('alertShown')) { 
                alert("Você precisa estar logado para ver os detalhes da carona.");
                localStorage.setItem('alertShown', 'true');
                return;
            }
            handleLogout(); 
            navigate('/login');
        } else { 
            setLoading(false); 
            setError("ID da carona não fornecido na URL.");
        }

        return () => {
            localStorage.removeItem('alertShown');
        };
         
    }, [id, token, navigate, handleLogout]);

    async function buscarCaronas() {
        setLoading(true);
        setError(null);
            try {
                
                const response = await buscarComRetorno(`/caronas/${id}`, {
                    headers: {
                        Authorization: token,
                    },
                });
                setCarona(response.data);
            } catch (error: any) {
                    alert("Erro ao buscar detalhes da carona:");
                if (error.toString().includes('403')) {
                    alert("Sessão expirada. Faça login novamente.");
                    handleLogout();
                    navigate('/login');
                } else if (error.response && error.response.status === 404) {
                     setError("Carona não encontrada."); 
                } else {
                    setError('Erro ao carregar detalhes da carona. Tente novamente mais tarde.');
                }
            } finally {
                setLoading(false); 
            }
        }

        const alternarFormularioAtualizacao = () => {
                setMostrarFormAtualizacao(!mostrarFormAtualizacao);
          };

          const handleSucessoAtualizacao = () => {
            setMostrarFormAtualizacao(false); 
            buscarCaronas(); 
            alert("Carona atualizada com sucesso!");
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
    
        if (error) {
            return (
                <div className="min-h-screen bg-gray-50 flex justify-center items-center">
                    <p className="text-red-600 text-xl font-semibold">{error}</p>
                </div>
            );
        }

        if (!carona) {
            return (
                <div className="min-h-screen bg-gray-50 flex justify-center items-center">
                    <p className="text-gray-600 text-xl font-semibold">Carona não encontrada.</p>
                </div>
            );
        }

        const isMotorista = usuario && usuario.id && carona.motorista && carona.motorista && carona.motorista.id &&
                       (usuario.id === carona.motorista?.id);

     const handleSucessoDelecao = () => {
        navigate("/caronas");
                        
        ToastAlerta('Carona deletada com sucesso!', 'sucesso');
    };


  return (
    <>
        <div className="min-h-screen bg-gray-50 py-22">
            <div className="ontainer mx-auto px-4 max-w-4xl bg-white rounded-lg shadow-xl p-8">
                <h1 className="text-4xl font-bold text-blue-900 mb-6 text-center">Detalhes da Carona</h1>

                <section id="details" className="border border-blue-100 rounded-lg p-6 mb-8 bg-blue-50">
                    <h3 className="text-2xl font-semibold text-blue-800 mb-4">Informações Principais</h3>
                    <div className="space-y-3 text-gray-700">
                        <p className="flex items-center space-x-2">
                            <User className="w-5 h-5 text-blue-600" />
                            <strong>Motorista:</strong> {carona.motorista ? carona.motorista.nome : "N/A"}
                        </p>
                        <p className="flex items-center space-x-2">
                            <Clock className="w-5 h-5 text-blue-600" />
                            <strong>Data da Viagem:</strong> {formattedDate}
                        </p>
                        <p className="flex items-center space-x-2">
                            <MapPin className="w-5 h-5 text-blue-600" />
                            <strong>Origem:</strong> {carona.origem}
                        </p>
                        <p className="flex items-center space-x-2">
                            <MapPin className="w-5 h-5 text-blue-600 transform rotate-180" />
                            <strong>Destino:</strong> {carona.destino}
                        </p>
                        <p className="flex items-center space-x-2">
                            <Car className="w-5 h-5 text-blue-600" />
                            <strong>Distância:</strong> {carona.distancia} km
                        </p>
                        <p className="flex items-center space-x-2">
                            <span className="w-5 h-5 flex items-center justify-center text-blue-600 font-bold">~</span> {/* Ícone improvisado para velocidade */}
                            <strong>Velocidade Média:</strong> {carona.velocidade} km/h
                        </p>
                        
                        <p className="flex items-center space-x-2">
                            <span className="w-5 h-5 flex items-center justify-center text-blue-600 font-bold">💺</span> {/* Ícone de assento */}
                            <strong>Vagas Disponíveis:</strong> {carona.vagas}
                        </p>
                        <p className="flex items-center space-x-2">
                            <span className="w-5 h-5 flex items-center justify-center text-blue-600 font-bold">🕗</span> {/* Ícone de ticket */}
                            <strong>Tempo de viagem:</strong>{" "}
                           {carona.tempoViagem ? `${carona.tempoViagem.toFixed(1)}h` : "N/A"}
                        </p>
                        <p className="flex items-center space-x-2">
                            <span className="w-5 h-5 flex items-center justify-center text-blue-600 font-bold">🎟️</span> {/* Ícone de ticket */}
                            <strong>Passagens Vendidas:</strong>{" "}
                            {carona.passagemVendidaNessaCarona ? carona.passagemVendidaNessaCarona.length : 0}
                        </p>
                    </div>
                </section>

                <section id="tickets_sold">
                    <h2 className="text-3xl font-bold text-blue-900 mb-5 text-center">
                        Passagens Vendidas ({carona.passagemVendidaNessaCarona ? carona.passagemVendidaNessaCarona.length : 0})
                    </h2>
                    {carona.passagemVendidaNessaCarona && carona.passagemVendidaNessaCarona.length > 0 ? (
                    <ul className="space-y-4"> 
                        {carona.passagemVendidaNessaCarona.map((passagem) => (
                            <li key={passagem.id} className="bg-gray-100 rounded-md p-4 shadow-sm border border-gray-200">
                                <p className="font-semibold text-gray-800">
                                    Passagem ID: {passagem.id}
                                </p>
                                {passagem.passageiro && (
                                    <p className="text-sm text-gray-600">
                                        Passageiro: <span className="font-medium text-blue-700">{passagem.passageiro.nome}</span>
                                    </p>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-600 text-lg py-4">Nenhuma passagem vendida para esta carona ainda.</p>
                )}
            </section>

            {mostrarFormAtualizacao && (
                        <FormAtualizarCarona
                            caronaToUpdate={carona}
                            onUpdateSuccess={handleSucessoAtualizacao}
                            onCancel={() => setMostrarFormAtualizacao(false)}
                        />
                    )}
            <div className="flex flex-col items-center justify-center">
            {isMotorista ? (
                        <div className="mt-8 text-center flex flex-col sm:flex-row justify-center gap-4 p-4 m-10">
                            <button
                                onClick={alternarFormularioAtualizacao}
                                className="py-3 px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                            >
                                {mostrarFormAtualizacao ? "Cancelar Edição" : "Editar Carona"}
                            </button>
                            <ModalDeletarCarona onDeleteSuccess={handleSucessoDelecao} />
                        </div>
                    ) : (
                        // Se NÃO for o motorista, mostra botão de Comprar Passagem
                        <div className="mt-8 text-center flex justify-center p-4 m-10">
                            <button
                                onClick='' // Chama a função para comprar passagem
                                className="py-3 px-8 bg-yellow-400 hover:bg-yellow-500 font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
                                // Opcional: Desabilitar se não houver vagas
                                disabled={carona.vagas <= 0}
                            >
                                {carona.vagas <= 0 ? "Vagas Esgotadas" : "Comprar Passagem"}
                            </button>
                        </div>
                    )}
                    <Link
                        to="/caronas"
                        className=" cursor-pointer col-span-full mt-6 py-3 px-8 bg-gray-500 hover:bg-gray-600 text-gray-900 font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                        Voltar
                    </Link>
            </div>
           
                     
        </div>
    </div>
</>
  )}

export default DetalhesCarona


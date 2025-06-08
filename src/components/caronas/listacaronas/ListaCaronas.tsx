import { useContext, useEffect, useState } from "react"
import type Carona from "../../../models/Carona";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";
import { useNavigate } from "react-router-dom";
import CardCarona from "../cardcaronas/CardCaronas";
import { RotatingLines } from "react-loader-spinner";


function ListaCaronas() {

    const navigate = useNavigate();
    const [caronas, setCaronas] = useState<Carona[]>([]);
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function buscarCaronas() {
        setLoading(true);
        setError(null);

        try {
            await buscar('/caronas', setCaronas, {
                headers: {
                    Authorization: token,
                },
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            } else {
                setError('Erro ao carregar caronas. Tente novamente.');
            }
        } finally {
            setLoading(false);
        }
        }

    useEffect(() => {
        if (token === '') {
            alert ('Voce precisa estar logado.')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        buscarCaronas()
    }, [caronas.length])

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

  return (
    <div className="py-22 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-4xl font-bold text-blue-900 mb-8 text-center">Caronas Disponíveis</h2>

            {caronas.length === 0 ? (
                <p className="text-center text-gray-600 text-xl">Nenhuma carona disponível no momento. Que tal oferecer uma?</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {caronas.map(carona => (
                    <CardCarona key={carona.id} carona={carona} />
            ))}
          </div>
        )}
        </div>
    </div>
  )
}

export default ListaCaronas
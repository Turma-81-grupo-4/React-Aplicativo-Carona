import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deletar } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";
import Popup from "reactjs-popup"; 
import { ToastAlerta } from "../../../utils/ToastAlerta";

interface ModalDeletarCaronaProps {
    onDeleteSuccess?: () => void;
}

function ModalDeletarCarona({ onDeleteSuccess }: ModalDeletarCaronaProps) {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    
    const { id } = useParams<{ id: string }>();

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado para acessar esta página.', 'info');
            navigate('/login');
        }
    }, [token, navigate]);

    async function confirmarDelecao() {
        setIsLoading(true);

        try {
            await deletar(`/caronas/${id}`, {
                headers: {
                    'Authorization': token
                }
            });
            
            if (onDeleteSuccess) {
                onDeleteSuccess();
            }
            retornar();
        } catch (error: any) {
            if (error.toString().includes('403')) {
                ToastAlerta('Sessão expirada. Faça login novamente.', 'info');
                handleLogout();
                navigate('/login');
            } else {
                ToastAlerta('Erro ao deletar carona. Tente novamente.', 'erro');
            }
        } finally {
            setIsLoading(false);
        }
    }

    function retornar() {
        navigate("/caronas");
    }

    return (
        <Popup
            trigger={
                <button
                    className="py-3 px-8 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                    disabled={isLoading}
                >
                    {isLoading ? 'Excluindo...' : 'Excluir Carona'}
                </button>
            }
            modal
            nested
        >

            {((close: () => void) => (
                <div className="modal p-6 bg-white rounded-lg shadow-xl text-center">
                    <button className="close absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl" onClick={close}>
                        &times;
                    </button>
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Confirmar Exclusão</h2>
                    <p className="text-gray-600 mb-6">Tem certeza de que deseja excluir esta carona?</p>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => {
                                confirmarDelecao();
                                close();
                            } }
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Excluindo...' : 'Sim, Excluir'}
                        </button>
                        <button
                            onClick={close}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                        >
                            Não
                        </button>
                    </div>
                </div>
            )) as unknown as React.ReactNode}
        </Popup>
    );
}

export default ModalDeletarCarona;
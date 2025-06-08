import React, { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from 'react'; 
import type Carona from '../../../models/Carona';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import { atualizar } from '../../../services/Service';
import { ToastAlerta } from '../../../utils/ToastAlerta';

interface FormAtualizarCaronaProps {
    caronaToUpdate: Carona;
    onUpdateSuccess: () => void;
    onCancel?: () => void; 
}

function FormAtualizarCarona({ caronaToUpdate, onUpdateSuccess }: FormAtualizarCaronaProps) {

    const navigate = useNavigate();
    const { usuario, handleLogout } = useContext(AuthContext);
    let token = usuario.token;

    const [formData, setFormData] = useState<Carona>(caronaToUpdate);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    if (token) {
        token = token.trim(); 
    }

    useEffect(() => {
        setFormData(caronaToUpdate);
    }, [caronaToUpdate]);

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado para atualizar caronas.', 'info');
            handleLogout();
            navigate('/login');
        }
    }, [token, navigate, handleLogout]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'distancia' || name === 'velocidade' || name === 'vagas' || name === 'tempoViagem'
                ? parseFloat(value) || 0 
                : value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log('Submit chamado')
        
        setError(null);
        setLoading(true);

        
        if (!formData.dataViagem || !formData.origem || !formData.destino ||
            formData.vagas <= 0 || formData.distancia <= 0 || (typeof formData.velocidade === 'number' && formData.velocidade <= 0) ||
            formData.origem.length < 10 || formData.destino.length < 10) {
            setError('Por favor, preencha todos os campos obrigatórios corretamente (origem/destino min 10 caracteres, vagas/distância/velocidade > 0).');
            setLoading(false);
            return;
        }

        try {
            const {
                id,
                dataViagem,
                origem,
                destino,
                distancia,
                velocidade,
                vagas,
                tempoViagem,
              } = formData;
              
              const caronaParaAtualizar = {
                id,
                dataViagem,
                origem,
                destino,
                distancia,
                velocidade,
                vagas,
                tempoViagem,
                motorista: {
                  id: usuario.id,
                },
              };
              

            
            if (!usuario.id) {
                 setError("ID do usuário não encontrado. Não é possível atualizar a carona.");
                 setLoading(false);
                 return;
            }

            console.log(`Bearer token exato: "${token.trim()}"`);
            console.log(`Header Authorization: "Bearer ${token.trim()}"`);


            const tokenTrimmed = token.trim();

            await atualizar(
                `/caronas/${formData.id}`, 
                caronaParaAtualizar, 
                () => {}, 
                { headers: { Authorization: `Bearer ${tokenTrimmed}` } }
            );
            onUpdateSuccess();

        } catch (error: any) {
            console.error("Erro ao atualizar carona:", error);
            if (error.response?.status === 403) {
                setError("Você não tem permissão para atualizar esta carona.");
            } else if (error.response?.status === 404) {
                setError("Carona não encontrada.");
            } else if (error.response?.data) {
                setError(error.response.data.message || error.response.data.error || 'Erro desconhecido ao atualizar.');
            } else {
                setError('Erro ao atualizar carona. Tente novamente.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 p-8 rounded-lg shadow-md mb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="dataViagem" className="block text-sm font-medium text-gray-700">Data da Viagem</label>
                    <input
                        type="date"
                        id="dataViagem"
                        name="dataViagem"
                        value={formData.dataViagem ? new Date(formData.dataViagem).toISOString().split('T')[0] : ''}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="origem" className="block text-sm font-medium text-gray-700">Origem</label>
                    <input
                        type="text"
                        id="origem"
                        name="origem"
                        value={formData.origem || ''}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                        minLength={10}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="destino" className="block text-sm font-medium text-gray-700">Destino</label>
                    <input
                        type="text"
                        id="destino"
                        name="destino"
                        value={formData.destino || ''}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                        minLength={10}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="distancia" className="block text-sm font-medium text-gray-700">Distância (km)</label>
                    <input
                        type="number"
                        id="distancia"
                        name="distancia"
                        value={formData.distancia || 0}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                        min={1}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="velocidade" className="block text-sm font-medium text-gray-700">Velocidade Média (km/h)</label>
                    <input
                        type="number"
                        id="velocidade"
                        name="velocidade"
                        value={typeof formData.velocidade === 'number' ? formData.velocidade : 0}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                        min={1}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="vagas" className="block text-sm font-medium text-gray-700">Vagas Disponíveis</label>
                    <input
                        type="number"
                        id="vagas"
                        name="vagas"
                        value={formData.vagas || 0}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                        min={1}
                        required
                    />
                </div>
                

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
               

                <div className="flex gap-4 justify-center">
                    <button
                        type="submit"
                        className="py-3 px-8 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                        disabled={loading}
                    >
                        {loading ? "Atualizando..." : "Atualizar Carona"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FormAtualizarCarona;
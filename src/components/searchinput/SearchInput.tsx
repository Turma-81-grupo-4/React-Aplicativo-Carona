import { useState, type ChangeEvent } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function SearchInput() {

    const location = useLocation();
    const isLogin = location.pathname === '/login';
    const isCadastro = location.pathname === '/cadastro';
    const isPerfil = location.pathname === '/perfil';
    const isSobre = location.pathname === '/sobre';

    const navigate = useNavigate();
    const [buscar, setBuscar] = useState('');
    const [loading, setLoading] = useState(false);

    const podeExibirBuscar = () => {
        return !isLogin && !isCadastro && !isPerfil && !isSobre;
    };
    

    function handleInputChange (e: ChangeEvent<HTMLInputElement>) {
        setBuscar(e.target.value);
    }

    async function handleBuscar(e: React.FormEvent) {
        e.preventDefault()

        if (buscar.trim() === '') {
            alert ('Informe o termo que deseja pesquisar!')
            return;
        } 

        try {
            setLoading(true);
            navigate(`/busca/${buscar}`);
        } catch (error: any) {
            alert ('Ocorreu um erro na busca. Tente novamente.')
        } finally {
            setLoading(false);
        }
    }
  return (
    <>
        {podeExibirBuscar() && (
            <div className="w-full max-w-lg mx-auto">
            <form onSubmit={handleBuscar} className="relative">
                <input
                    type="text"
                    name="search_input" 
                    id="search_input" 
                    placeholder='Buscar'
                    autoComplete="off"
                    value={buscar} 
                    onChange={handleInputChange} 
                    className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#60B657] focus:border-transparent"
                />

            
                <button type="submit" className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </button>
            </form>

            {/*<div className="mt-4">
                    {loading ? (
                        <p className="text-gray-500">Carregando...</p>
                    ) : resultados.length > 0 ? (
                        <ul className="space-y-2">
                            {resultados.map((item) => (
                                <li key={item.id} className="p-2 bg-white dark:bg-gray-800 rounded shadow">
                                    <strong>{item.categoria}</strong>
                                </li>
                            ))}
                        </ul>
                    ) : buscar !== '' ? (
                        <p className="text-gray-500 mt-2">Nenhum resultado encontrado.</p>
                    ) : null}
                </div>*/}
            </div>
        )}
        
    </>
  )
}

export default SearchInput
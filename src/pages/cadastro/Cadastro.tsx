import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import type Usuario from '../../models/Usuario'
import { cadastrarUsuario } from '../../services/Service'
import './Cadastro.css'
import { RotatingLines } from 'react-loader-spinner'
import { ToastAlerta } from '../../utils/ToastAlerta'

function Cadastro() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [confirmaSenha, setConfirmaSenha] = useState<string>("")

    const [usuario, setUsuario] = useState<Usuario>({
        id: 0,
        nome: '',
        email: '',
        senha: '',
        tipo: '',
        foto: ''
    })

    useEffect(() => {
        if (usuario.id !== 0) {
            retornar()
        }
    }, [usuario])

    function retornar() {
        navigate('/login')
    }

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })

    }

    function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
        setConfirmaSenha(e.target.value)
    }

    async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (confirmaSenha === usuario.senha && usuario.senha.length >= 8) {

            setIsLoading(true)

            try {
                await cadastrarUsuario(
                    "/usuarios/cadastrar",
                    {
                        nome: usuario.nome,
                        email: usuario.email,
                        senha: usuario.senha,
                        tipo: usuario.tipo,
                    },
                    setUsuario
                );

                ToastAlerta("Usuário cadastrado com sucesso!", "sucesso")
            } catch (error) {
                ToastAlerta("Erro ao cadastrar o usuário!", "erro")
            }
        } else {
            ToastAlerta("Dados do usuário inconsistentes! Verifique as informações do cadastro.", "erro")
            setUsuario({ ...usuario, senha: '' })
            setConfirmaSenha('')
        }

        setIsLoading(false)
    }

    return (
        <>
            <div className="pt-25 relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 
                        flex items-center justify-center p-4 overflow-hidden">

                {/* Background Image with Overlay */}
                <div className="absolute inset-0 fundoCadastro bg-cover bg-center bg-no-repeat">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-700/80 backdrop-blur-[1px]"></div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-orange-500/20 to-blue-500/20 rounded-full blur-xl"></div>
                <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-blue-500/20 to-orange-500/20 rounded-full blur-xl"></div>
                <div className="absolute top-1/3 right-10 w-24 h-24 bg-gradient-to-r from-orange-400/30 to-blue-400/30 rounded-full blur-lg"></div>
                <div className="absolute bottom-1/4 left-16 w-28 h-28 bg-gradient-to-r from-blue-400/25 to-orange-400/25 rounded-full blur-lg"></div>

                {/* Register Form Container */}
                <div className="relative z-10 w-full max-w-lg">
                    {/* Glass Card Effect */}
                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8
                               before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br 
                               before:from-white/10 before:to-transparent before:pointer-events-none
                               hover:shadow-orange-500/10 hover:shadow-3xl transition-all duration-500">

                        {/* Welcome Section */}
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-white mb-2">Bem-vindo(a)!</h1>
                            <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                                Cadastre-se para aproveitar caronas de forma <span className="text-orange-400 font-semibold">fácil</span>, <span className="text-blue-400 font-semibold">segura</span> e <span className="text-orange-400 font-semibold">colaborativa</span>. Junte-se à nossa comunidade!
                            </p>
                        </div>

                        <form onSubmit={cadastrarNovoUsuario} className="space-y-5">
                            {/* Title with Gradient */}
                            <div className="text-center mb-6">
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 via-blue-400 to-orange-400 
                                         bg-clip-text text-transparent mb-2">
                                    Cadastrar
                                </h2>
                                <div className="w-20 h-1 bg-gradient-to-r from-blue-700 to-blue-500 mx-auto rounded-full"></div>
                            </div>

                            {/* Nome Field */}
                            <div className="space-y-2">
                                <label htmlFor="nome" className="block text-gray-200 font-medium text-sm">
                                    Nome
                                </label>
                                <div className="relative group">
                                    <input
                                        type="text"
                                        id="nome"
                                        name="nome"
                                        placeholder="Seu nome completo"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl
                                             text-white placeholder-gray-400 backdrop-blur-sm
                                             focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50
                                             hover:border-white/30 transition-all duration-300
                                             group-hover:bg-white/10"
                                        value={usuario.nome}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                                    />
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-orange-500/20 
                                              opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                </div>
                            </div>

                            {/* Foto Field */}
                            <div className="space-y-2">
                                <label htmlFor="foto" className="block text-gray-200 font-medium text-sm">
                                    Foto
                                </label>
                                <div className="relative group">
                                    <input
                                        type="text"
                                        id="foto"
                                        name="foto"
                                        placeholder="(Url da foto)"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl
                                             text-white placeholder-gray-400 backdrop-blur-sm
                                             focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50
                                             hover:border-white/30 transition-all duration-300
                                             group-hover:bg-white/10"
                                        value={usuario.foto}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                                    />
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/20 to-blue-500/20 
                                              opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                </div>
                            </div>

                            {/* Email Field */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-gray-200 font-medium text-sm">
                                    E-mail de acesso
                                </label>
                                <div className="relative group">
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        placeholder="exemplo@exemplo.com"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl
                                             text-white placeholder-gray-400 backdrop-blur-sm
                                             focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50
                                             hover:border-white/30 transition-all duration-300
                                             group-hover:bg-white/10"
                                        value={usuario.email}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                                    />
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-orange-500/20 
                                              opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                </div>
                            </div>

                            {/* Tipo Field */}
                            <div className="space-y-2">
                                <label htmlFor="tipo" className="text-gray-200 font-medium text-sm flex items-center gap-1">
                                    Tipo do usuário
                                    <div className="relative group cursor-pointer">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-orange-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                                            <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                d="M12 16h.01M12 12a2 2 0 1 0-2-2" />
                                        </svg>
                                        {/* Tooltip */}
                                        <span className="absolute left-8 top-1/2 -translate-y-1/2 w-64 bg-gray-900 text-gray-100 text-xs rounded px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-lg pointer-events-none">
                                            Você pode alterar o tipo de usuário sempre que quiser acessando o Perfil
                                        </span>
                                    </div>
                                </label>
                                <div className="relative group">
                                    <select
                                        id="tipo"
                                        name="tipo"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl
                                         text-white backdrop-blur-sm cursor-pointer
                                          focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50
                                         hover:border-white/30 transition-all duration-300
                                         group-hover:bg-white/10 appearance-none"
                                        value={usuario.tipo}
                                        onChange={(e: ChangeEvent<HTMLSelectElement>) => atualizarEstado(e as any)}
                                        required
                                    >
                                        <option value="" className="bg-gray-800 text-gray-300">Selecione...</option>
                                        <option value="motorista" className="bg-gray-800 text-white">Motorista</option>
                                        <option value="passageiro" className="bg-gray-800 text-white">Passageiro</option>
                                    </select>
                                    {/* Custom Arrow */}
                                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                </div>
                            </div>

                            {/* Senha Field */}
                            <div className="space-y-2">
                                <label htmlFor="senha" className="block text-gray-200 font-medium text-sm">
                                    Senha
                                </label>
                                <div className="relative group">
                                    <input
                                        type="password"
                                        id="senha"
                                        name="senha"
                                        placeholder="Senha (mínimo 8 caracteres)"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl
                                             text-white placeholder-gray-400 backdrop-blur-sm
                                             focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50
                                             hover:border-white/30 transition-all duration-300
                                             group-hover:bg-white/10"
                                        value={usuario.senha}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                                    />
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-orange-500/20 
                                              opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                </div>
                            </div>

                            {/* Confirmar Senha Field */}
                            <div className="space-y-2">
                                <label htmlFor="confirmarSenha" className="block text-gray-200 font-medium text-sm">
                                    Confirmar Senha
                                </label>
                                <div className="relative group">
                                    <input
                                        type="password"
                                        id="confirmarSenha"
                                        name="confirmarSenha"
                                        placeholder="Confirme sua senha"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl
                                             text-white placeholder-gray-400 backdrop-blur-sm
                                             focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50
                                             hover:border-white/30 transition-all duration-300
                                             group-hover:bg-white/10"
                                        value={confirmaSenha}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
                                    />
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/20 to-blue-500/20 
                                              opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-4">
                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="cursor-pointer flex-1 py-3 px-6 bg-gradient-to-r from-orange-500 to-blue-500 
                                         hover:from-orange-600 hover:to-blue-600 text-white font-semibold rounded-xl
                                         transform hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-500/25
                                         transition-all duration-300 flex items-center justify-center
                                         disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                                         relative overflow-hidden group"
                                >
                                    {/* Button Shimmer Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                                              -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                                    {isLoading ? (
                                        <RotatingLines
                                            strokeColor="white"
                                            strokeWidth="5"
                                            animationDuration="0.75"
                                            width="24"
                                            visible={true}
                                        />
                                    ) : (
                                        <span className="relative z-10">Cadastrar</span>
                                    )}
                                </button>

                                {/* Cancel Button */}
                                <button
                                    type="reset"
                                    className="cursor-pointer flex-1 py-3 px-6 bg-gradient-to-r from-red-500 to-red-600 
                                         hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl
                                         transform hover:scale-[1.02] hover:shadow-lg hover:shadow-red-500/25
                                         transition-all duration-300 flex items-center justify-center
                                         relative overflow-hidden group"
                                    onClick={retornar}
                                >
                                    {/* Button Shimmer Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                                              -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                    <span className="relative z-10">Cancelar</span>
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Bottom Glow Effect */}
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 h-8 
                               bg-gradient-to-r from-orange-500/30 to-blue-500/30 blur-xl rounded-full"></div>
                </div>
            </div>
        </>
    );
}
export default Cadastro;
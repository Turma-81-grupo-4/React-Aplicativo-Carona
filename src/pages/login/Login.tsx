import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext, useState, type ChangeEvent, useEffect } from 'react';
import type UsuarioLogin from '../../models/UsuarioLogin';
import { RotatingLines } from 'react-loader-spinner';
import { ToastAlerta } from '../../utils/ToastAlerta';

function Login() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const navigate = useNavigate();

    const { usuario, handleLogin, isLoading } = useContext(AuthContext)

    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
        {} as UsuarioLogin
    )

    useEffect(() => {
        if (usuario.token !== "") {
            navigate('/home')
            ToastAlerta("Usuário logado com sucesso!", "sucesso")
        }
    }, [usuario])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value
        })
    }

    function login(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        handleLogin(usuarioLogin).catch(() => {
            ToastAlerta("Falha ao fazer login. Verifique suas credenciais.", "erro");
        });
    }

    return (
        <>
            <div className="pt-20 relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 
                        flex items-center justify-center p-4 overflow-hidden">

                {/* Background Image with Overlay */}
                <div className="absolute inset-0 fundoLogin bg-cover bg-center bg-no-repeat">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-700/80 backdrop-blur-[1px]"></div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-orange-500/20 to-blue-500/20 rounded-full blur-xl"></div>
                <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-blue-500/20 to-orange-500/20 rounded-full blur-xl"></div>
                <div className="absolute top-1/3 right-10 w-24 h-24 bg-gradient-to-r from-orange-400/30 to-blue-400/30 rounded-full blur-lg"></div>

                {/* Login Form Container */}
                <div className="relative z-10 w-full max-w-md">
                    {/* Glass Card Effect */}
                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8
                               before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br 
                               before:from-white/10 before:to-transparent before:pointer-events-none
                               hover:shadow-orange-500/10 hover:shadow-3xl transition-all duration-500">

                        <form onSubmit={login} className="space-y-6">
                            {/* Title with Gradient */}
                            <div className="text-center mb-8">
                                <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-400 via-blue-400 to-orange-400 
                                         bg-clip-text text-transparent mb-2">
                                    Entrar
                                </h2>
                                <div className="w-20 h-1 bg-gradient-to-r from-blue-700 to-blue-500 mx-auto rounded-full"></div>
                            </div>

                            {/* Email Field */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-gray-200 font-medium text-sm">
                                    Email de acesso
                                </label>
                                <div className="relative group">
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        placeholder="exemplo@exemplo.com"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl
                                             text-white placeholder-gray-400 backdrop-blur-sm
                                             focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50
                                             hover:border-white/30 transition-all duration-300
                                             group-hover:bg-white/10"
                                        value={usuarioLogin.email}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                                    />
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/20 to-blue-500/20 
                                              opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <label htmlFor="senha" className="block text-gray-200 font-medium text-sm">
                                    Senha
                                </label>
                                <div className="relative group">
                                    <input
                                        type="password"
                                        id="senha"
                                        name="senha"
                                        placeholder="Digite sua senha"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl
                                             text-white placeholder-gray-400 backdrop-blur-sm
                                             focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50
                                             hover:border-white/30 transition-all duration-300
                                             group-hover:bg-white/10"
                                        value={usuarioLogin.senha}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                                    />
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-orange-500/20 
                                              opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="cursor-pointer w-full py-3 px-6 mt-8 bg-gradient-to-r from-orange-500 to-blue-500 
                                     hover:from-orange-600 hover:to-blue-600 text-white font-semibold rounded-xl
                                     transform hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-500/25
                                     transition-all duration-300 flex items-center justify-center
                                     disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                                     relative overflow-hidden group">

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
                                    <span className="relative z-10">Entrar</span>
                                )}
                            </button>

                            {/* Divider */}
                            <div className="relative my-8">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-white/20"></div>
                                </div>
                            </div>

                            {/* Register Link */}
                            <div className="text-center">
                                <p className="text-gray-300">
                                    Ainda não tem uma conta?{' '}
                                    <Link
                                        to="/cadastro"
                                        className="text-transparent bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text
                                             hover:from-orange-300 hover:to-blue-300 font-semibold
                                             transition-all duration-300 hover:scale-105 inline-block">
                                        Cadastre-se
                                    </Link>
                                </p>
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
export default Login;
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
            <div className="py-10 bg-gradient-to-t from-gray-800 to-gray-400 grid grid-cols-1 lg:grid-cols-2 min-h-screen place-items-center font-bold">
                <div className="fundoCadastro hidden lg:block"></div>
                <div className="flex flex-col items-center w-2/3">
                    <h1 className="text-3xl text-gray-900 mb-2">Bem-vindo(a)!</h1>
                    <p className="text-sm text-gray-900 mb-6 text-center">
                        Cadastre-se para aproveitar caronas de forma <u>fácil</u>, <u>segura</u> e <u>colaborativa</u>. Junte-se à nossa comunidade!
                    </p>
                    <form className='py-4 px-2 bg-gray-300 border-4 border-gray-800 flex justify-center items-center flex-col w-full gap-3'
                        onSubmit={cadastrarNovoUsuario}>
                        <h2 className='text-slate-900 text-5xl'>Cadastrar</h2>
                        <div className="flex flex-col w-full">
                            <label htmlFor="nome">Nome</label>
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                placeholder="Nome"
                                className="border-2 border-slate-700 rounded p-2"
                                value={usuario.nome}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="email">E-mail de acesso</label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="Exemplo@exemplo.com"
                                className="border-2 border-slate-700 rounded p-2"
                                value={usuario.email}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="tipo">Tipo do usuário</label>
                            <select
                                id="tipo"
                                name="tipo"
                                className="cursor-pointer border-2 border-slate-700 rounded p-2"
                                value={usuario.tipo}
                                onChange={(e: ChangeEvent<HTMLSelectElement>) => atualizarEstado(e as any)}
                                required
                            >
                                <option value="">Selecione...</option>
                                <option value="motorista">Motorista</option>
                                <option value="passageiro">Passageiro</option>
                            </select>
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="senha">Senha</label>
                            <input
                                type="password"
                                id="senha"
                                name="senha"
                                placeholder="Senha (mínimo 8 caracteres)"
                                className="border-2 border-slate-700 rounded p-2"
                                value={usuario.senha}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="confirmarSenha">Confirmar Senha</label>
                            <input
                                type="password"
                                id="confirmarSenha"
                                name="confirmarSenha"
                                placeholder="Confirmar Senha"
                                className="border-2 border-slate-700 rounded p-2"
                                value={confirmaSenha}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
                            />
                        </div>
                        <div className="flex justify-around w-full gap-8">

                            <button
                                type='submit'
                                className='cursor-pointer rounded text-white bg-gray-600 
                           hover:bg-gray-700 w-1/2 py-2
                           flex justify-center'
                            >
                                {isLoading ? <RotatingLines
                                    strokeColor="white"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    width="24"
                                    visible={true}
                                /> :
                                    <span>Cadastrar</span>
                                }

                            </button>
                            <button
                                type='reset'
                                className='cursor-pointer rounded text-white bg-red-600 
                hover:bg-red-700 w-1/2 py-2'
                                onClick={retornar}
                            >
                                Cancelar
                            </button>
                        </div>
            </form>
                </div>
            </div>
        </>
    );
}

export default Cadastro

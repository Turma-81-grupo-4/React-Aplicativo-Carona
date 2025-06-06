import { type ReactNode, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Navbar() {

    const navigate = useNavigate();

    const { usuario, handleLogout } = useContext(AuthContext)

    function logout() {

        handleLogout()
        ToastAlerta('O Usuário foi desconectado com sucesso!', 'info')
        navigate('/')
    }


    return (
        <>
            <div className='w-full bg-indigo-900 text-white
                flex justify-center py-4'>

                <div className="container flex justify-between text-lg">
                    <Link to='/home' className="text-2xl font-bold">Blog Pessoal</Link>

                    <div className='flex gap-4'>
                        <Link to='/login' className='hover:underline'>Login</Link>
                        <Link to='/home' className='hover:underline'>Home</Link>
                        <Link to='/sobre' className='hover:underline'>Sobre</Link>
                        <Link to='/' className='hover:underline'>Perfil</Link>
                        <Link to='/' onClick={logout} className='hover:underline'>Sair</Link>
                        <Link to='/' className='hover:underline'>Passagem</Link>
                        <Link to='/listpassagens' className='hover:underline'>ListPassagens</Link>
                        <Link to='/' className='hover:underline'>Carona</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className="w-full bg-black flex justify-between text-white border-t-4 border-[#60B657] flex-col items-center">
            <div className="">
                <img src="" alt="Logo Studix" className="h-30 w-30" />
            </div>

            <div className="container mx-auto flex flex-col md:flex-row justify-between items-start">

                <div className="flex flex-col gap-2">
                    <div className="font-bold text-lg">Sobre</div>
                    <ul className="space-y-1 text-sm">
                        <Link to='/sobre' className="hover:text-[#60B657] cursor-pointer">Quem somos</Link>
                        <li className="hover:text-[#60B657] cursor-pointer">Fale conosco</li>
                        <li className="hover:text-[#60B657] cursor-pointer">Ajuda e suporte</li>
                    </ul>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="font-bold text-lg">Jurídico e acessibilidade</div>
                    <ul className="space-y-1 text-sm">
                        <li className="hover:text-[#60B657] cursor-pointer">Termos</li>
                        <li className="hover:text-[#60B657] cursor-pointer">Política de privacidade</li>
                        <li className="hover:text-[#60B657] cursor-pointer">Declaração de acessibilidade</li>
                    </ul>
                </div>

                <div className="font-bold py-4">
                    <div className="flex flex-col items-end gap-2">
                        <h2 className="font-bold text-sm">© 2025 Aplicativo Carona</h2>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <h2 className="font-bold text-sm">🌐 Português</h2>
                    </div>
                </div>
            </div>


        </footer>
    )
}

export default Footer
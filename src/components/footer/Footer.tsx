import { Link } from 'react-router-dom'
import React from 'react'
const Footer: React.FC = () => {
    return (
    <footer className="bg-black text-white py-3">     
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Link adicional */}
        <Link to={"/sobre"} className='hover:text-gray-500'>Sobre</Link>
        <Link to={"/faleconosco"} className='hover:text-gray-500'>Fale conosco</Link>
        <Link to={"/ajudasuporte"} className='hover:text-gray-500'>Ajuda e suporte</Link>
        <Link to={"/termos"} className='hover:text-gray-500'>Termos</Link>
        {/* Logo + texto */}
        <div className="flex flex-col items-center mb-1 md:mb-0">
          <img
            src="/logocarona.png"
            alt="Logo da Empresa"
            className="h-15"
          />
          <span className="font-bold text-gray-400 text-lg mt-1">Carona</span>
          <p className="text-sm text-gray-400 mt-0.5">
            &copy; {new Date().getFullYear()} Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
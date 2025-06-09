import { type ReactNode, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Navbar() {
  const navigate = useNavigate();
  const { usuario, handleLogout } = useContext(AuthContext);

  function logout() {
    handleLogout();
    ToastAlerta("O Usuário foi desconectado com sucesso!", "sucesso");
    navigate("/");
  }

  let component: ReactNode;

  if (usuario.token !== "") {
    component = (
      <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-600 to-cyan-500 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/home"
            className="text-3xl font-extrabold tracking-tight text-blue-900 hover:text-yellow-400 transition duration-300"
          >
            Carona
          </Link>

          <nav className="flex gap-4 items-center text-blue-900 font-semibold">
            {[
              { to: "/home", label: "Home" },
              { to: "/passagens", label: "Viagem" },
              { to: "/perfil", label: "Perfil" },
              { to: "/sobre", label: "Sobre" },
            ].map((item, index) => (
              <Link
                key={index}
                to={item.to}
                className="px-3 py-2 rounded-md hover:text-yellow-400 transition duration-200"
              >
                {item.label}
              </Link>
            ))}

            <button
              onClick={logout}
              className="cursor-pointer ml-4 px-5 py-2 rounded-full bg-yellow-400 text-blue-900 font-bold hover:bg-yellow-300 transition duration-300"
            >
              Sair
            </button>
          </nav>
        </div>
      </header>
    );
  } else {
    component = (
      <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-600 to-cyan-500 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/caronas"
            className="text-3xl font-extrabold tracking-tight text-blue-900 hover:text-yellow-400 transition duration-300"
          >
            Carona
          </Link>
          <nav className="flex gap-4 items-center text-blue-900 font-semibold">
            <Link
              to="/login"
              className="px-3 py-2 rounded-md hover:text-yellow-400 transition duration-200"
            >
              Entrar
            </Link>
            <Link
              to="/cadastro"
              className="px-3 py-2 rounded-md hover:text-yellow-400 transition duration-200"
            >
              Cadastrar
            </Link>
          </nav>
        </div>
      </header>
    );
  }


  return <>{component}</>;
}

export default Navbar;

import { type ReactNode, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Navbar() {
  const navigate = useNavigate();
  const { usuario, handleLogout } = useContext(AuthContext);
  const isSobrePage = window.location.pathname.includes("/sobre");
  const isLogin = window.location.pathname.includes("/login");
  const isCadastrar = window.location.pathname.includes("/cadastro");
  const isCadastrarCarona = window.location.pathname.includes("/cadastrarcarona");
  const navTextColor = isSobrePage || isCadastrar || isLogin || isCadastrarCarona? "text-blue-600" : "text-blue-900";
  const linkHoverColor = isSobrePage || isCadastrar || isLogin || isCadastrarCarona? "hover:text-yellow-400" : "hover:text-yellow-400";


  function logout() {
    handleLogout();
    ToastAlerta("O Usuário foi desconectado com sucesso!", "sucesso");
    navigate("/");
  }

  let component: ReactNode;

  if (usuario.token !== "") {
    component =
      (<header className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/5 border border-white/10 rounded-b-2xl shadow-2xl
                               before:absolute before:inset-0 before:rounded-b-2xl before:bg-gradient-to-br 
                               before:from-white/10 before:to-transparent before:pointer-events-none
                               hover:shadow-orange-500/10 hover:shadow-3xl transition-all duration-500">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/home"
            className="text-3xl font-extrabold tracking-tight text-blue-900 hover:text-yellow-400 transition duration-300"
          >
            Carona
          </Link>

          <nav className={`flex gap-4 items-center font-semibold`}>
            {[
              { to: "/home", label: "Home" },
              { to: "/passagens", label: "Passagens" },
              { to: "/caronas", label: "Caronas" },
              { to: "/perfil", label: "Perfil" },
              { to: "/sobre", label: "Sobre" },
            ].map((item, index) => (
              <Link
                key={index}
                to={item.to}
                className={`px-3 py-2 rounded-md transition duration-200 ${navTextColor} ${linkHoverColor}`}
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
      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/5 border border-white/10 rounded-b-2xl shadow-2xl
                               before:absolute before:inset-0 before:rounded-b-2xl before:bg-gradient-to-br 
                               before:from-white/10 before:to-transparent before:pointer-events-none
                               hover:shadow-orange-500/10 hover:shadow-3xl transition-all duration-500">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="text-3xl font-extrabold tracking-tight text-blue-900 hover:text-yellow-400 transition duration-300"
          >
            Carona
          </Link>
          <nav className={`flex gap-4 items-center ${navTextColor} font-semibold`}>
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

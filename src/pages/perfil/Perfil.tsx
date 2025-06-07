import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import "./Perfil.css";

function Perfil() {
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    if (usuario.token === "") {
      alert("Você precisa estar logado");
      navigate("/");
    }
  }, [usuario.token]);
  return (
    <>
      <div
        className={`min-h-screen pt-16 bg-cover bg-center bg-no-repeat perfil-bg`}
      >
        <div className="w-full lg:w-4/12 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-gray-300/50 w-full mb-6 shadow-xl rounded-lg mt-16">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4 flex justify-center">
                  <div className="relative">
                    <img
                      alt="Foto de perfil"
                      src={usuario.foto} //implementar uma foto padrão
                      className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                    />
                  </div>
                </div>
              </div>
              <div className="text-center mt-12">
                <h3 className="text-xl font-semibold leading-normal text-blueGray-700 mb-2">
                  {usuario.nome}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="mr-2 text-lg text-blueGray-400"></i>
                  {usuario.email}
                </div>
                <div className="mb-2 text-blueGray-600 mt-5">
                  <i className="mr-2 text-lg text-blueGray-400"></i>
                  {usuario.tipo}
                </div>
              </div>
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="flex flex-col w-full lg:w-9/12 px-4">
                    <button className="mb-2 bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-950 transition-colors">
                      Editar perfil
                    </button>
                    <button className="mb-2 bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-950 transition-colors">
                      Alterar senha
                    </button>
                    <button className="mb-2 bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-950 transition-colors">
                      Minhas viagens passadas
                    </button>
                    <button className="mb-2 bg-red-800 text-white px-4 py-2 rounded-lg hover:bg-red-950 transition-colors">
                      Houve algum problema?
                    </button>

                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700"></p>
                    <Link to={`/caronas`}>
                      <button className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-950 transition-colors">
                        Viaje conosco!
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Perfil;

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { buscar } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";
import CardPassagem from "../cardpassagem/CardPassagem";
import type Passagem from "../../../models/Passagem";
import { CirclesWithBar } from "react-loader-spinner";

function ListPassagens() {
  const navigate = useNavigate();
  const [passagens, setPassagens] = useState<Passagem[]>([]);
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPassagens() {
    try {
      await buscar("/passagens", setPassagens, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (
        error.toString().includes("403") ||
        error.toString().includes("401")
      ) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    buscarPassagens();
  }, [passagens.length]);

  return (
    <>
      <div className="flex justify-center w-full my-4">
        {passagens.length === 0 && (
          <CirclesWithBar
            height="200"
            width="200"
            color="#4fa94d"
            outerCircleColor="#4fa94d"
            innerCircleColor="#4fa94d"
            barColor="#4fa94d"
            ariaLabel="circles-with-bar-loading"
            wrapperStyle={{}}
            wrapperClass="mx-auto"
            visible={true}
          />
        )}
      </div>
      <div className="flex flex-col justify-center w-1/3 my-4">
        <div>
          <h2 className="text-center text-3xl">Minhas passagens</h2>
          <div className="text-center">Fazer menu de pesquisa</div>
        </div>
        <div className="container flex mx-2">
          <div
            className="container mx-auto my-4 
                        grid grid-rows-1 md:grid-rows-2 lg:grid-rows-3 gap-4"
          >
            {passagens.map((passagem) => {
              return <CardPassagem key={passagem.id} passagem={passagem} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListPassagens;

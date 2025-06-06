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
      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col mx-2">
          <div
            className="container mx-auto my-4 
                        grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
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

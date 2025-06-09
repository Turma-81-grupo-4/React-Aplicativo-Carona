import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Passagem from "../../../models/Passagem";
import { buscar, deletar } from "../../../services/Service";
import { CirclesWithBar, RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import CardPassagem from "../cardpassagem/CardPassagem";
import { ArrowUUpLeftIcon, TrashSimpleIcon } from "@phosphor-icons/react";



function DeletarPassagem() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [pageIsLoading, setPageIsLoading] = useState<boolean>(true);
  const [deleteIsLoading, setDeleteIsLoading] = useState<boolean>(false);
  const [passagem] = useState<Passagem>({} as Passagem);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPorId(id: string) {
    setPageIsLoading(true);
    try {
      await buscar(`/passagens/${id}`, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        ToastAlerta(
          "O token expirou, por favor, faça login novamente.",
          "info"
        );
        handleLogout();
      }
    } finally {
      setPageIsLoading(false);
    }
  }

  useEffect(() => {
    if (token === "") {

      ToastAlerta("Você precisa estar logado.", "info");

      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      console.log("PÁGINA DE DELEÇÃO: buscando dados para o ID:", id);
      buscarPorId(id);
    }
  }, [id]);

  async function deletarPassagem() {
    setDeleteIsLoading(true);

    try {
      await deletar(`/passagens/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      ToastAlerta("Passagem cancelada com sucesso!", "sucesso");

      setTimeout(() => {
        navigate("/passagens");
      }, 2000);

    } catch (error: any) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        ToastAlerta(
          "O token expirou, por favor, faça login novamente.",
          "info"
        );
        handleLogout();
      } else {

        ToastAlerta(
          "Erro ao cancelar a passagem. Verifique se ela ainda existe.",
          "erro"
        );

      }
      setDeleteIsLoading(false);
    }
  }

  function retornar() {
    navigate("/passagens");
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center pt-24 pb-12 px-4">
      {pageIsLoading ? (
        <CirclesWithBar
          height="200"
          width="200"
          color="#1e3a8a"
          visible={true}
          ariaLabel="circles-with-bar-loading"
        />
      ) : (
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="text-4xl font-bold text-red-700 mb-4 text-center">
            Cancelar Passagem
          </h1>
          <p className="text-center text-xl text-gray-700 font-semibold mb-8">
            Você tem certeza de que deseja desistir da carona a seguir?
            <br />
            <span className="font-normal text-base">
              Esta ação não poderá ser desfeita.
            </span>
          </p>

          <div className="w-full mb-8">
            {passagem.id && <CardPassagem passagem={passagem} />}
          </div>

          <div className="flex flex-col md:flex-row gap-6 w-full max-w-md">
            <button
              className="flex-1 text-slate-800 bg-gray-300 hover:bg-gray-400 font-bold w-full py-3 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300"
              onClick={retornar}
            >
              <ArrowUUpLeftIcon size={20} />
              Não, voltar
            </button>
            <button
              className="flex-1 text-white bg-red-600 hover:bg-red-800 font-bold w-full py-3 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300"
              onClick={deletarPassagem}
              disabled={deleteIsLoading}
            >
              {deleteIsLoading ? (
                <RotatingLines
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="24"
                  visible={true}
                />
              ) : (
                <>
                  <TrashSimpleIcon size={20} />
                  Sim, quero desistir
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeletarPassagem;
